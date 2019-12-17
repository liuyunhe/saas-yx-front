<template>
  <div class="QA-container">
    <div >
      <div style="margin-bottom: 30px;color: #0B1019">
        <el-button type="primary" @click="handleOpen">开奖</el-button>（可开奖时间每周六20:30）
      </div>
      <el-form ref="actSetConfRef" :model="config" label-width="150px" :rules="confRules">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>基本设置：</span>
          </div>
            <el-form-item label='活动时间：' prop="date">
              <el-date-picker v-model="config.stime"  :disabled="!newAct" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
              至
              <el-date-picker v-model="config.etime" :disabled="!newAct" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" ></el-date-picker>
            </el-form-item>
            <el-form-item label='参与条件：' prop="scanCont">
              本周连续
              <el-input-number v-model="config.scanCont" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              天扫码可参与1荷石币抢大礼活动
            </el-form-item>
        </el-card>
        <div style="height: 30px"></div>

      </el-form>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>商品设置：</span>
        </div>
        <div>
          <el-button size="small" type="primary" @click="addItem" v-if="awardConf.length<5 && !isStart">新增商品</el-button>
        </div>
        <template v-for="(ai,key) in awardConf">
          <div  style="height: 30px;font-size: 18px;line-height: 30px;margin:20px;color: #409EFF">
            奖项{{ key + 1 }}:
            <el-button size="mini" type="danger" style="margin-left: 450px" @click="delItem(key)" v-if="key>0 && !isStart">删除奖品</el-button>
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

            <el-form-item v-if="ai.awardType&&!ai.id" :label="`选择${ ai.awardType == '1' ? '实物' : ai.awardType == '7' ? '折扣卡' : '翻倍卡' }：`">
              <el-button size="" @click="getList(ai.awardType,key)">选择</el-button>
            </el-form-item>

            <el-form-item label="物料名称：" prop="awardName">
              <el-input style="width: 300px" disabled v-model="ai.awardName"></el-input>
            </el-form-item>

            <el-form-item label='奖品图片：' prop="awardPic">
              <el-input v-model="ai.awardPic" style="display: none" ></el-input>
              <img width="300" height="165" v-if="ai.awardPic" :src="ai.awardPic" alt="">
              <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{uploadImgUrlSuccess(res,key)}" :show-file-list="false">
                <el-button size="small" type="primary">上传图片</el-button>
                <span style="margin-left: 20px">上传商品图片尺寸（630x348px）</span>
              </el-upload>
            </el-form-item>

            <el-form-item v-if="ai.awardType==7" label='折扣值：' prop="cardValue">
              <el-input-number :step="0.01" :precision="2":min="0" :max="1" controls-position="right" v-model="ai.cardValue"></el-input-number>
              <span>折兑换折扣卡</span>
            </el-form-item>

            <el-form-item v-if="ai.awardType==8"  label='翻倍值：' prop="cardValue">
              <el-input-number :step="0.01" :precision="2" :min="1" controls-position="right" v-model="ai.cardValue"></el-input-number>
              <span>倍红包翻倍卡</span>
            </el-form-item>

            <el-form-item label='奖品描述：' prop="awardDesc">
              <el-input type="textarea" style="width: 300px"  v-model="ai.awardDesc"></el-input>
            </el-form-item>

            <el-form-item label='中奖人数：' prop="prizeNum">
              <el-input style="width: 300px" type="number"   v-model="ai.prizeNum"></el-input>
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
            "cardValue": null,
            "awardPic": "",
            "awardDesc": "",
            "awardType": null,
            "prizeNum": null
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


        confRules: {
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          scanCont: [{ required: true, validator: validateScanCont, trigger: 'change' }],
          awardType: [{ required: true, message: '请选择奖品类型', trigger: 'change' }],
          awardName: [{ required: true, message: '请选择物料', trigger: 'change' }],
          awardPic: [{ required: true, message: '请上传奖品图片' ,trigger: 'change'}],
          awardDesc: [{ required: true, message: '请输入奖品描述',trigger:'blur' }],
          prizeNum: [{ required: true, message: '请输入中奖人数',trigger:'blur' }],
          cardValue: [{ required: true, message: '请输入面额',trigger:'blur' }],
        },

        awardType:[
          {
            value: 1,
            label:'实物'
          },
          {
            value: 7,
            label:'折扣卡'
          },
          {
            value: 8,
            label:'翻倍卡'
          },
        ],
        awardNo:'',
      }
    },
    created() {
      this.getDetail()
    },
    mounted() {
    },
    methods:{
      addItem(){
        const awardDemo = {
          "awardName": "",
          "marketMoney": null,
          "cardValue": null,
          "awardPic": "",
          "awardDesc": "",
          "awardType": null,
          "prizeNum": null
        }
        this.awardConf.push(awardDemo)
      },
      delItem(index){
        this.awardConf.splice(index,1)
      },
      // 当前正在进行的活动查询
      getDetail() {
        this.$request.post('/hbact/one/points/sass/act/config', {}, true, res => {
          if (res.code == '200') {
            this.config.stime = res.data.conf.stime
            this.config.etime = res.data.conf.etime
            this.config.scanCont = res.data.conf.scanCont
            this.newAct = false
            this.id = res.data.conf.id
            this.isStart = res.data.isStart
            if(res.data.prizeList.length > 0){
              this.awardConf.splice(0,1)
              res.data.prizeList.forEach(item => {
                this.awardConf.push(
                  {
                    "awardName": item.awardName,
                    "marketMoney": item.marketMoney,
                    "cardValue": item.cardValue,
                    "awardPic": item.awardPic,
                    "awardDesc": item.awardDesc,
                    "awardType": item.awardType,
                    "prizeNum": item.prizeNum
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
      handleOpen(){
        this.$request.post('/hbact/one/points/sass/open/award', {}, true, res => {
          if (res.code == '200') {
            this.$message.success("开奖成功！")
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
        this.$refs.actSetConfRef.validate(valid => {
          if(valid){
            if (!awardConfig) return
            let params = {
              conf:this.config,
              prizeList:this.awardConf
            };
            console.log(params)
            if(this.id){
              params['conf'].id = this.id
            }
            this.$request.post('/hbact/one/points/sass/act/save', params, true, res => {
              if (res.code == '200') {
                this.$message({type: 'success', message: '操作成功!'});
                this.getDetail()
              } else {
                this.$message.error(res.msg);
              }
            })
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

        if(key != -1){
          this.awardNo = key
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