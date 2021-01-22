<template>
  <div class="QA-container">
    <div >
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>荷家好礼-奖品设置：</span>
        </div>
        <div>
          <el-button size="small" type="primary" @click="addItem" v-if="awardConf.length<5 && !isStart">新增商品</el-button>
        </div>
        <template v-for="(ai,key) in awardConf">
          <div  style="height: 30px;font-size: 18px;line-height: 30px;margin:20px;color: #409EFF">
            奖项{{ key + 1 }}:
            <el-button size="mini" type="danger" style="margin-left: 450px" @click="delItem(key)" v-if="!isStart">删除奖品</el-button>
          </div>

          <el-form ref="awardConf" :model="ai" label-width="150px" :rules="confRules" :disabled="isStart">

            <el-form-item label="奖品类型：" prop="awdType">
              <el-select :disabled="!!ai.id" @change="handleSelectChange(ai)" v-model="ai.awdType" style="width: 300px" placeholder="请选择">
                <el-option
                    v-for="i in awardType"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>

<!--            <el-form-item v-show="ai.awardType&&!ai.id" :label="`选择${ ai.awardType == '1' ? '实物' : ai.awardType == '7' ? '折扣卡' : '翻倍卡' }：`">-->
<!--              <el-button size="" @click="getList(ai.awardType,key)">选择</el-button>-->
<!--            </el-form-item>-->

            <el-form-item label="物料名称：" prop="awdName">
              <el-input style="width: 300px" :disabled="!!ai.id" v-model="ai.awdName"></el-input>
            </el-form-item>

            <el-form-item label='奖品图片：' prop="awdPic">
              <el-input v-model="ai.awdPic" style="display: none" ></el-input>
              <img width="100" height="100" v-if="ai.awdPic" :src="ai.awdPic" alt="" style="border: 1px dashed #e4e7ed;">
              <el-upload :disabled="!!ai.id" :action="uploadURL" :headers="headerObj" :on-success="(res)=>{uploadImgUrlSuccess(res,key)}" :show-file-list="false">
                <el-button size="small" type="primary" :disabled="!!ai.id">上传图片</el-button>
                <span style="margin-left: 20px">上传商品图片尺寸（233x233px）</span>
              </el-upload>
            </el-form-item>

            <el-form-item v-if="ai.awdType==3" label='红包：' prop="awdValue">
              <el-input-number :disabled="!!ai.id" :step="0.01" :precision="2":min="0" controls-position="right" v-model="ai.awdValue"></el-input-number>
              <span>元</span>
            </el-form-item>

            <el-form-item v-if="ai.awdType==6" label='积分：' prop="awdValue">
              <el-input-number :disabled="!!ai.id" :step="1" :precision="0":min="0"  controls-position="right" v-model="ai.awdValue"></el-input-number>
              <span></span>
            </el-form-item>

            <el-form-item label='奖品数量：' prop="numTotal">
              <el-input-number :disabled="!!ai.id" :step="1" :precision="0":min="0"  controls-position="right"  v-model="ai.numTotal"></el-input-number>
              <span v-if="!!ai.id" style="margin-left: 20px">剩余：{{ ai.numTotal - ai.numUsed }}</span>
              <el-button size="small" type="primary" v-if="!!ai.id" style="margin-left: 20px" @click="addRepertory(ai)">增库</el-button>
            </el-form-item>

            <el-form-item label='中奖概率：' prop="awdPr">
              <el-input-number :disabled="!!ai.id" controls-position="right" :precision="1" :step="0.1" :min="0" :max="100" v-model="ai.awdPr"></el-input-number>
              <span>%</span>
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
    name: "PartyMgr",
    data(){
      var validateDate = (rule, value, callback) => {
        if (!this.config.stime || !this.config.etime) {
          callback(new Error('请选择活动时间'))
        } else if (this.config.stime >= this.config.etime){
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      }

      var validateScanCont = (rule, value, callback) => {
        if (!this.config.scanCont) {
          callback(new Error('请输入连续扫码天数'))
        } else {
          callback()
        }
      }
      var validatePrizeProductList = (rule, value, callback) => {
        if (value.length<1) {
          callback(new Error('请输入连续扫码天数'))
        } else {
          callback()
        }
      }

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
            "awdName": "",
            "awdPic": "",
            "awdType": null,
            "awdValue": 0,
            "awdPr": 0,
            "numTotal":0
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
          awdType: [{ required: true, message: '请选择奖品类型', trigger: 'change' }],
          awdName: [{ required: true, message: '请选择物料', trigger: 'change' }],
          awdPic: [{ required: true, message: '请上传奖品图片' ,trigger: 'change'}],
          numTotal: [{ required: true, message: '请输入中奖人数',trigger:'blur' }],
          awdPr: [{ required: true, message: '请输入中奖概率',trigger:'blur' }],
          awdValue: [{ required: true, message: '请输入中奖概率',trigger:'blur' }],
        },

        awardType:[
          {
            value: 1,
            label:'实物'
          },
          {
            value: 3,
            label:'红包'
          },
          {
            value: 6,
            label:'积分'
          },
        ],
        awardNo:'',
        actCode:''
      }
    },
    created() {
      this.getActDetail()
    },
    mounted() {
    },
    methods:{
      addItem(){
        const awardDemo = {
          "awdName": "",
          "awdPic": "",
          "awdType": null,
          "awdValue": 0,
          "awdPr": 0,
          "numTotal":0
        }
        this.awardConf.push(awardDemo)
      },
      delItem(index){
        this.awardConf.splice(index,1)
      },
      getActDetail(){
        this.$request.post('/hbact/saas/zt/ht/hejiaAct', {}, true, res => {
          if (res.code == '200') {
            this.actCode = res.data.act.actCode
            this.getAwardDetail(this.actCode)
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      // 当前正在进行的活动查询
      getAwardDetail(actCode) {
        this.$request.post('/hbact/saas/zt/actAwdList', {actCode}, false, res => {
          if (res.code == '200') {
            this.newAct = false
            if(res.data.awList.length > 0){
              this.awardConf = []
              res.data.awList.forEach(item => {
                this.awardConf.push(item)
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
      addRepertory(item) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          if (value == 0) return this.$message.error('数字不能为0')
          this.$request.post('/hbact/saas/zt/ztActAwdAdd', {
            id: item.id ,
            actCode: this.actCode,
            addValue: value
          }, false, res => {
            if (res.code == '200') {
              this.$message.success('增库成功')
              this.getActDetail()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
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
        if(!awardConfig) return
        let params = this.awardConf.map((item)=>{
          if(!item.prizeName){
            item.prizeName = item.awdName
          }
          item.actCode = this.actCode
          return item
        });
        console.log(params)
        this.$request.post(' /hbact/saas/zt/ztActAwdSave', params, true, res => {
          if (res.code == '200') {
            this.$message({type: 'success', message: '操作成功!'});
            this.getActDetail()
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      // 选择奖品
      selectPrize(obj,title,awardNo) {
        // let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        // newAwae.awdPic = obj.pic
        // newAwae.poolName = obj.name
        // newAwae.prizeName = obj.name
        // newAwae.poolId = obj.id
        console.log(awardNo)
        this.awardConf[awardNo].awardName = obj.name
        this.awardConf[awardNo].awardPrice = obj.marketMoney
        this.awardConf[awardNo].marketMoney = obj.marketMoney
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
          return (this.awardConf[index].awdPic = resule.data.accessUrl)
        this.$message.error(resule.message)
      },
      handleSelectChange(item){
        console.log(item)
        item.awdName = ""
        item.awdPic = ""
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
