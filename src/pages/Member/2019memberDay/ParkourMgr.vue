<template>
  <div class="QA-container">
    <div >
      <div style="margin-bottom: 30px;color: #0B1019">
        <el-button type="primary" @click="handleOpen">开奖</el-button>（可开奖时间每周日00:00-23:59）
      </div>
      <el-form ref="actSetConfRef" :model="config" label-width="150px" :rules="confRules">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>基本设置：</span>
          </div>
            <el-form-item label='活动时间：' prop="date">
              <el-date-picker v-model="config.stime"  :disabled="!newAct" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
              至
              <el-date-picker v-model="config.etime" :disabled="!newAct" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" ></el-date-picker>(每周可参与获得幸运值时间，结束时间注意配置在开奖日期0:00之前)；
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item label='参与条件：' prop="dayJoinCount">
              用户每周扫码（首扫）后即可获得参与资格，每人每天
              <el-input-number v-model="config.dayJoinCount" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              次参与资格；
            </el-form-item>
            <el-form-item label='' prop="exchangeCount">
              限制每天可兑换
              <el-input-number v-model="config.exchangeCount" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              次 (值为0时即不限兑换次数)；
            </el-form-item>
            <el-form-item label='' prop="exchangePoints">
              消耗
              <el-input-number v-model="config.exchangePoints" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              荷石璧，可额外获得一次参与资格；
            </el-form-item>
            <el-form-item label='幸运值配置：' prop="sysLuckyScore">
              系统PK获胜方一次可获得
              <el-input-number v-model="config.sysLuckyScore" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              幸运值；
            </el-form-item>
            <el-form-item label='' prop="inviteLuckyScore">
              邀请PK获胜方一次可获得
              <el-input-number v-model="config.inviteLuckyScore" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              幸运值；
            </el-form-item>
            <el-form-item label='分享设置：' prop="invitedDayCount">
              每天最多应战次数：
              <el-input-number v-model="config.invitedDayCount" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
            </el-form-item>
          <el-form-item label='' prop="discountCardNum">
              本期新用户可获得折扣卡数量：
              <el-input-number v-model="config.discountCardNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label='' prop="discountCardValue">
              折扣值：
              <el-input-number v-model="config.discountCardValue" :disabled="!newAct" :step="0.01" :precision="2":min="0" :max="1" controls-position="right"></el-input-number>
            </el-form-item>
        </el-card>
        <div style="height: 30px"></div>

      </el-form>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>奖品配置：</span>
        </div>
        <div>
        </div>
        <template v-for="(ai,key) in awardConf">
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

            <el-form-item v-if="ai.awardType&&!ai.id" :label="`选择${ ai.awardType == '1' ? '实物' : ai.awardType == '6' ? '积分' : ai.awardType == '3' ? '红包' :ai.awardType == '7' ? '折扣卡' : ai.awardType == '8' ? '翻倍卡' : ''  }：`">
              <el-button size="" @click="getList(ai.awardType,key)">选择</el-button>
            </el-form-item>

            <el-form-item label="物料名称：" prop="awardName">
              <el-input style="width: 300px" disabled v-model="ai.awardName"></el-input>
            </el-form-item>

            <el-form-item label='奖品图片：' prop="awardPic">
              <el-input v-model="ai.awardPic" style="display: none" ></el-input>
              <img width="271" height="200" v-if="ai.awardPic" :src="ai.awardPic" alt="">
              <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{uploadImgUrlSuccess(res,key)}" :show-file-list="false">
                <el-button size="small" type="primary">上传图片</el-button>
                <span style="margin-left: 20px">上传商品图片尺寸（380x280px）</span>
              </el-upload>
            </el-form-item>

            <el-form-item v-if="ai.awardType==3" label='红包：' prop="redpackValue">
              <el-input-number :step="0.01" :precision="2":min="0" controls-position="right" v-model="ai.redpackValue"></el-input-number>
              <span>元</span>
            </el-form-item>

            <el-form-item v-if="ai.awardType==6" label='积分：' prop="scoreValue">
              <el-input-number :step="1" :precision="0":min="0" controls-position="right" v-model="ai.scoreValue"></el-input-number>
              <span>积分</span>
            </el-form-item>

            <el-form-item v-if="ai.awardType==7" label='折扣值：' prop="cardValue">
              <el-input-number :step="0.01" :precision="2":min="0" :max="1" controls-position="right" v-model="ai.cardValue"></el-input-number>
              <span>折兑换折扣卡</span>
            </el-form-item>

            <el-form-item v-if="ai.awardType==8"  label='翻倍值：' prop="cardValue">
              <el-input-number :step="0.01" :precision="2" :min="1" controls-position="right" v-model="ai.cardValue"></el-input-number>
              <span>倍红包翻倍卡</span>
            </el-form-item>


            <el-form-item label='中奖人数：' prop="winnerNum">
              幸运值排名前
              <el-input style="width: 100px" type="number"   v-model="ai.winnerNum"></el-input>
              个，可获得奖励
            </el-form-item>
            <div style="height: 30px"></div>
          </el-form>

        </template>
        <div style="margin-bottom: 50px"></div>
      </el-card>

    </div>


    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" v-if="!isStart" @click="confirmSubmit">保存</el-button>
      <el-button type="danger" v-if="id" @click="handleDelete">删除</el-button>
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
    name: "ParkourMgr",
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
        if (!this.config.dayJoinCount) {
          callback(new Error('请输入连续扫码天数'))
        } else {
          callback()
        }
      }
      var validateExchangePoints = (rule, value, callback) => {
        if (!this.config.exchangePoints) {
          callback(new Error('请输入兑换所需积分'))
        } else {
          callback()
        }
      }
      var validateExchangeCount = (rule, value, callback) => {
        if (this.config.exchangeCount === "") {
          console.log(this.config.exchangeCount )
          callback(new Error('请输入兑换次数'))
        } else {
          callback()
        }
      }
      var validateSysLuckyScore = (rule, value, callback) => {
        if (!this.config.sysLuckyScore) {
          callback(new Error('请输入幸运值'))
        } else {
          callback()
        }
      }
      var validateInviteLuckyScore = (rule, value, callback) => {
        if (!this.config.inviteLuckyScore) {
          callback(new Error('请输入幸运值'))
        } else {
          callback()
        }
      }
      var validateInvitedDayCount = (rule, value, callback) => {
        if (!this.config.invitedDayCount) {
          callback(new Error('请输入每天最多应战次数'))
        } else {
          callback()
        }
      }
      var validateDiscountCardNum = (rule, value, callback) => {
        if (!this.config.discountCardNum) {
          callback(new Error('请输入折扣卡数量'))
        } else {
          callback()
        }
      }
      var validateDiscountCardValue = (rule, value, callback) => {
        if (!this.config.discountCardValue) {
          callback(new Error('请输入折扣值'))
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
          dayJoinCount:'',
          exchangeCount:'',
          exchangePoints:'',
          sysLuckyScore:'',
          inviteLuckyScore:'',
          invitedDayCount:'',
          discountCardNum:'',
          discountCardValue:''
        },

        awardConf:[
          {
            "awdCode": "",
            "awardName": "",
            "marketMoney": null,
            "cardValue": null,
            "awardPic": "",
            "awardType": null,
            "winnerNum": null,
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


        confRules: {
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          dayJoinCount: [{ required: true, validator: validateScanCont, trigger: 'change' }],
          sysLuckyScore: [{ required: true, validator: validateSysLuckyScore, trigger: 'change' }],
          inviteLuckyScore: [{ required: true, validator: validateInviteLuckyScore, trigger: 'change' }],
          exchangeCount: [{ required: true, validator: validateExchangeCount, trigger: 'change' }],
          exchangePoints: [{ required: true, validator: validateExchangePoints, trigger: 'change' }],
          invitedDayCount: [{ required: true, validator: validateInvitedDayCount, trigger: 'change' }],
          discountCardNum: [{ required: true, validator: validateDiscountCardNum, trigger: 'change' }],
          discountCardValue: [{ required: true, validator: validateDiscountCardValue, trigger: 'change' }],

          awardType: [{ required: true, message: '请选择奖品类型', trigger: 'change' }],
          awardName: [{ required: true, message: '请选择物料', trigger: 'change' }],
          awardPic: [{ required: true, message: '请上传奖品图片' ,trigger: 'change'}],
          winnerNum: [{ required: true, message: '请输入中奖人数',trigger:'blur' }],
          cardValue: [{ required: true, message: '请输入面额',trigger:'blur' }],
          scoreValue: [{ required: true, message: '请输入面额',trigger:'blur' }],
          redpackValue: [{ required: true, message: '请输入面额',trigger:'blur' }],
        },

        awardType:[
          {
            value: 1,
            label:'实物'
          },
          {
            value: 6,
            label:'积分'
          },
          {
            value: 3,
            label:'红包'
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
          "winnerNum": null
        }
        this.awardConf.push(awardDemo)
      },
      delItem(index){
        this.awardConf.splice(index,1)
      },
      handleDelete(){
        this.$request.post('/hbact/pk/saas/act/delete', {pkActId:this.id}, false, res => {
          if (res.code == '200') {
            this.$message.success("删除成功！")
            this.getDetail()
            this.id = null
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      // 当前正在进行的活动查询
      getDetail() {
        this.$request.post('/hbact/pk/saas/act/info', {}, true, res => {
          if (res.code == '200') {
            this.config.stime = res.data.conf.stime
            this.config.etime = res.data.conf.etime
            this.config.dayJoinCount = res.data.conf.dayJoinCount
            this.config.exchangeCount = res.data.conf.exchangeCount
            this.config.exchangePoints = res.data.conf.exchangePoints
            this.config.sysLuckyScore = res.data.conf.sysLuckyScore
            this.config.inviteLuckyScore = res.data.conf.inviteLuckyScore
            this.config.invitedDayCount = res.data.conf.invitedDayCount
            this.config.discountCardNum = res.data.conf.discountCardNum
            this.config.discountCardValue = res.data.conf.discountCardValue
            this.newAct = false
            this.id = res.data.conf.id
            this.isStart = res.data.isStart
            if(res.data.prize){
              this.awardConf = []
              this.awardConf.push(
                {
                  "awdCode":res.data.prize.awdCode,
                  "awardName": res.data.prize.awdName,
                  "marketMoney": res.data.prize.goodsPrice,
                  "cardValue": res.data.prize.cardValue,
                  "awardPic": res.data.prize.awdPicture,
                  "awardType": res.data.prize.awdType,
                  "winnerNum": res.data.prize.winnerNum,
                  "scoreValue": res.data.prize.scoreValue,  //积分值
                  "redpackValue": res.data.prize.redpackValue, //红包金额
                }
              )
            }
            return
          }else if(res.code == '500'){
            this.newAct = true
            this.id = null
            this.isStart = false
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      handleOpen(){
        this.$request.post('/hbact/pk/saas/open/award', {}, true, res => {
          if (res.code == '200') {
            this.$message.success("开奖成功！")
            this.getDetail()
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
              pkConfig:this.config,
              pkPrize:{
                "awdCode":this.awardConf[0].awdCode,
                "awdType":this.awardConf[0].awardType,   //奖品类型 1实物 3 红包.
                "awdName":this.awardConf[0].awardName,
                "awdPicture":this.awardConf[0].awardPic,
                "goodsPrice":this.awardConf[0].marketMoney,  //市场价.
                "scoreValue":this.awardConf[0].scoreValue,  //积分值
                "redpackValue":this.awardConf[0].redpackValue, //红包金额
                "cardValue":this.awardConf[0].cardValue,//卡片值
                "winnerNum":this.awardConf[0].winnerNum//排名前多少的可获取奖品
              }
            };
            if(this.id){
              params['pkConfig'].id = this.id
            }
            console.log(params)
            this.$request.post('/hbact/pk/saas/act/save', params, true, res => {
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
        this.awardConf[awardNo].awdCode = obj.id
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
        item.redpackValue = ""
        item.cardValue = ""
        item.scoreValue = ""
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
