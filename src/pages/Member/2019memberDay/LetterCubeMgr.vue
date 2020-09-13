<template>
  <div class="QA-container">
    <div >
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>奖品设置：</span>
        </div>
        <template v-for="(ai,key) in awardConf">
          <div  style="height: 30px;font-size: 18px;line-height: 30px;margin:20px;color: #409EFF">
            中奖人数：闯关正确次数排名前
            <span style="color: red" v-if="key == 0">{{ '1' }}</span>
            <span style="color: red" v-if="key == 1">{{ '2-3' }}</span>
            <span style="color: red" v-if="key == 2">{{ '4-10' }}</span>
            <span style="color: red" v-if="key == 3">{{ '11-50' }}</span>
            <span style="color: red" v-if="key == 4">{{ '51-100' }}</span>
            <span style="color: red" v-if="key == 5">{{ '101-500' }}</span>
            名
          </div>

          <el-form ref="awardConf" :model="ai" label-width="150px" :rules="confRules" :disabled="isStart">

            <el-form-item label="奖品类型：" prop="awardType">
              <el-select :disabled="!!ai.id" @change="handleSelectChange(ai)" v-model="ai.awardType" style="width: 300px" placeholder="请选择">
                <el-option
                    v-for="i in awardType"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-show="ai.awardType&&!ai.id" :label="`选择${ ai.awardType == '1' ? '实物' : ai.awardType == '3' ? '红包' : '积分' }：`">
              <el-button size="" @click="getList(ai.awardType,key)">选择</el-button>
            </el-form-item>

            <el-form-item label="物料名称：" prop="awardName">
              <el-input style="width: 300px" disabled v-model="ai.awardName"></el-input>
            </el-form-item>

            <el-form-item v-if="ai.awardType==3" label='红包：' prop="redpackValue">
              <el-input-number :step="0.01" :precision="2":min="0" controls-position="right" v-model="ai.redpackValue"></el-input-number>
              <span>元</span>
            </el-form-item>

            <el-form-item v-if="ai.awardType==6" label='积分：' prop="scoreValue">
              <el-input-number :step="1" :precision="0":min="0" controls-position="right" v-model="ai.scoreValue"></el-input-number>
              <span>积分</span>
            </el-form-item>

            <el-form-item label='奖品图片：' prop="awardPic">
              <el-input v-model="ai.awardPic" style="display: none" ></el-input>
              <img height="100" v-if="ai.awardPic" :src="ai.awardPic" alt="">
              <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{uploadImgUrlSuccess(res,key)}" :show-file-list="false">
                <el-button size="small" type="primary">上传图片</el-button>
<!--                <span style="margin-left: 20px">上传商品图片尺寸（630x348px）</span>-->
              </el-upload>
            </el-form-item>


            <div style="height: 30px"></div>
          </el-form>

        </template>
        <div style="margin-bottom: 50px"></div>
      </el-card>

    </div>


    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" v-if="!isStart" @click="confirmSubmit">保存</el-button>
    </div>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px" @close="handleColseList">
      <el-table :data="list" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="剩余库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectPrize(scope.row,title,awardNo)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "LetterCubeMgr",
    data(){
      return {
        uploadURL: '/api/wiseqr/attach/commonAliUpload',
        headerObj: {
          loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
          token: sessionStorage.getItem('access_token'),
          CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
        },

        id: null,
        isStart:false,
        newAct: false,
        config:{
          stime:'',
          etime:'',
          scanCont:'',
        },

        awardConf:[
          {
            "awardName": "",
            "marketMoney": null,
            "awardPic": "",
            "awardType": null,
            "scoreValue":null,  //积分值
            "redpackValue":null, //红包金额
          },
          {
            "awardName": "",
            "marketMoney": null,
            "awardPic": "",
            "awardType": null,
            "scoreValue":null,  //积分值
            "redpackValue":null, //红包金额
          },
          {
            "awardName": "",
            "marketMoney": null,
            "awardPic": "",
            "awardType": null,
            "scoreValue":null,  //积分值
            "redpackValue":null, //红包金额
          },
          {
            "awardName": "",
            "marketMoney": null,
            "awardPic": "",
            "awardType": null,
            "scoreValue":null,  //积分值
            "redpackValue":null, //红包金额
          },
          {
            "awardName": "",
            "marketMoney": null,
            "awardPic": "",
            "awardType": null,
            "scoreValue":null,  //积分值
            "redpackValue":null, //红包金额
          },
          {
            "awardName": "",
            "marketMoney": null,
            "awardPic": "",
            "awardType": null,
            "scoreValue":null,  //积分值
            "redpackValue":null, //红包金额
          }
        ],
        title: '选择物品',
        list: [],
        params: {
          metraFlag: '',
          pageNo: 1,
          pageSize: 10,
          status: 1
        },
        listTotal: 0,
        listVisible: false,

        brandList:[],


        confRules: {
          awardType: [{ required: true, message: '请选择奖品类型', trigger: 'change' }],
          awardName: [{ required: true, message: '请选择物料', trigger: 'change' }],
          awardPic: [{ required: true, message: '请上传奖品图片' ,trigger: 'change'}],
          scoreValue: [{ required: true, message: '请输入面额',trigger:'blur' }],
          redpackValue: [{ required: true, message: '请输入面额',trigger:'blur' }],
        },

        awardType:[
          {
            value: 1,
            label:'实物'
          },
        ],
        awardNo:'',
        startNumArr:[1,2,4,11,51,101],
        endNumArr:[1,3,10,50,100,500],
      }
    },
    created() {
      // this.getBrandList()
      this.getDetail()
    },
    mounted() {
    },
    methods:{
      addItem(){
        const awardDemo = {
          "awardName": "",
          "marketMoney": null,
          "awardPic": "",
          "awardType": null,
          "scoreValue":null,  //积分值
          "redpackValue":null, //红包金额
        }
        this.awardConf.push(awardDemo)
      },
      delItem(index){
        this.awardConf.splice(index,1)
      },
      getBrandList() {
        // 关联品牌
        this.$request.post(
          '/api/wiseqr/prod/list', {
            brandCodeArr: ["BRAND-7D41JAAAAA"],
            pageSize: '-1'
          },
          true,
          res => {
            if (res.ret === '200000') {
              this.brandList = res.data.list.map(item=>{
                return {
                  sn:item.sn,
                  productName:item.allName
                }
              })
              return
            }
            this.$message.error(res.message)
          }
        )
      },
      // 当前正在进行的活动查询
      getDetail() {
        this.$request.post('/hbact/jhPuzzle/saas/prizeConf/list', {}, true, res => {
          if (res.code == '200') {
            // this.newAct = false
            // this.id = res.data.conf.id
            // this.isStart = res.data.isStart
            if(res.data.length > 0){
              this.awardConf = []
              res.data.forEach(item => {
                this.awardConf.push(
                  {
                    "awardName": item.awdName,
                    // "marketMoney": item.marketMoney,
                    "awardPic": item.awdPicture,
                    "awardType": item.awdType,
                    // "scoreValue":item.scoreValue,  //积分值
                    // "redpackValue":item.redpackValue, //红包金额
                  }
                )
              })
            }
            return
          }else if(res.code == '500'){
            this.newAct = true
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      confirmSubmit() {
        let awardConfig = true
        this.$refs.awardConf.forEach(item => {
          item.validate(valid => {
            if(valid){

            }else {
              awardConfig = false
            }
          })
        })

        if (!awardConfig) return
        let params = this.awardConf.map((item,index) => {
          return {
            "confLevel": index + 1,
            "startNum": this.startNumArr[index],
            "endNum": this.endNumArr[index],
            "awdType": item.awardType,
            "awdName": item.awardName,
            "awdPicture": item.awardPic,
          }
        })
        console.log(params)
        this.$request.post('/hbact/jhPuzzle/saas/prizeConf/save', params, true, res => {
          if (res.code == '200') {
            this.$message({type: 'success', message: '操作成功!'});
            this.getDetail()
          } else {
            this.$message.error(res.msg);
          }
        })

      },
      // 选择奖品
      selectPrize(obj,title,awardNo) {
        // let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        // newAwae.awardPic = obj.pic
        // newAwae.poolName = obj.name
        // newAwae.prizeName = obj.name
        // newAwae.poolId = obj.id
        console.log(awardNo)
        this.awardConf[awardNo].awardName = obj.name
        this.awardConf[awardNo].awardPrice = obj.marketMoney
        this.awardConf[awardNo].marketMoney = obj.marketMoney
        this.awardConf[awardNo].awardPic = obj.pic
        this.handleColseList()
      },
      handleColseList(){
        this.listVisible = false
        this.params.pageNo = 1
      },
      handleSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handleCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
      uploadImgUrlSuccess(resule,index) {
        if (resule.ret === '200000')
          return (this.awardConf[index].awardPic = resule.data.accessUrl)
        this.$message.error(resule.message)
      },


      handleSelectChange(item){
        console.log(item)
        item.awardName = ""
        item.awardPic = ""
      },
      getList(type,key) {
        if (type == '1') {
          this.params.metraFlag = 'object'
          this.title = '选择实物'
        } else if (type == '2') {
          this.params.metraFlag = 'virtual'
          this.title = '选择虚拟'
        } else if (type == '3') {
          this.params.metraFlag = 'redpack'
          this.title = '选择红包'
        } else if (type == '6') {
          this.params.metraFlag = 'integral'
          this.title = '选择荷石币'
        } else if (type == '7') {
          this.params.metraFlag = 'cdDisc'
          this.title = '选择折扣卡'
        } else if (type == '8') {
          this.params.metraFlag = 'cdDouble'
          this.title = '选择翻倍卡'
        }
        if(key != undefined){
          if(key != -1){
            this.awardNo = key
          }
        }
        this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
          if (res.ret === '200000') {
            this.list = []
            this.list = res.data.list
            this.listTotal = res.data.page.count
            this.listVisible = true
            return
          }
          this.$message.error(res.message)
        })
      },
    }

  }
</script>

<style lang="scss" scoped>
  .QA-container{
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
  }
</style>
