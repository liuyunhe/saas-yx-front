<template>
  <div class="hpx-actSetConf-container">
    <el-card>
      <el-form ref="actSetConfRef" :model="confData" label-width="150px" :rules="confRules">
        <el-form-item label="浇水设置：" prop="dayNum">
          每人每天可浇水<el-input-number v-model="confData.dayNum" :disabled="actStatus>1" :min="0" controls-position="right"></el-input-number> 次；
        </el-form-item>
        <el-form-item label="" prop="blossomNum">
          浇水<el-input-number v-model="confData.blossomNum" :disabled="actStatus>1" :min="0" controls-position="right"></el-input-number> 次，可以养成一朵花；
        </el-form-item>
        <el-form-item label="" prop="flowerNum">
          集齐<el-input-number v-model="confData.flowerNum" :disabled="actStatus>1" :min="0" controls-position="right"></el-input-number> 朵花，可以瓜分奖池；
        </el-form-item>
        <el-form-item label="浇水结束时间：" prop="JSEtimeStr">
          <el-date-picker v-model="confData.JSEtimeStr" :disabled="actStatus>1"value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择浇水时间"></el-date-picker>
        </el-form-item>
        <BZActPutConf :form-name="'浇水必中奖池：'" ref="awardArr" :configId="confData.id" :awardArr="awardArr" :editable="actStatus<2" @modifyAwardArr = "modifyAwardArr" @modifyAwardArrError="modifyAwardArrError"></BZActPutConf>
        <div style="margin-bottom: 30px"></div>

        <el-card>
          <div slot="header" class="clearfix">
            <span>瓜分奖池:</span>
          </div>
          <el-form-item label="开奖时间：" prop="OpenTimeStr">
            <el-date-picker v-model="confData.OpenTimeStr" :disabled="actStatus>1"value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开奖时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="总奖池：" prop="totalMoney">
            红包总金额：<el-input-number v-model="confData.totalMoney" :disabled="actStatus>=4" :min="0" controls-position="right"></el-input-number>元<span style="margin-left: 20px" v-if="confData.id">（集齐人数：{{ finishUser }}人）</span>
          </el-form-item>
          <el-form-item v-if="jcType == 1" label="总奖池：" prop="totalWinnerNum">
            瓜分总人数：<el-input-number v-model="confData.totalWinnerNum" :min="0" :max="100000"  :disabled="actStatus>=4" controls-position="right"></el-input-number>人<span style="margin-left: 20px">（瓜分金额等于红包总金额除以配置的瓜分总人数）</span>
          </el-form-item>
          <el-form-item label="奖池类型：" >
            <el-select   v-model="jcType" :disabled="actStatus>=4" style="width: 220px" placeholder="请选择">
              <el-option
                  v-for="i in jcTypeArr"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value">
              </el-option>
            </el-select>
          </el-form-item>
          <template v-if="jcType == 1">
            <el-form ref="ZawardArr" :model="ZawardArr" label-width="150px" :rules="confRules" >
              <el-form-item label="奖品类型：" prop="awardType">
                <el-select :disabled="!!confData.id" @change="handleSelectChange(ZawardArr)" v-model="ZawardArr.awardType" style="width: 220px" placeholder="请选择">
                  <el-option
                      v-for="i in awardType"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item  label="选择红包：" v-if="actStatus < 4">
                <el-button size="" @click="getList(ZawardArr.awardType)">选择</el-button>
              </el-form-item>

              <el-form-item label="物料名称：" prop="awardName">
                <el-input style="width: 220px" disabled v-model="ZawardArr.awardName"></el-input>
              </el-form-item>

<!--              <el-form-item v-if="ZawardArr.awardType==3" label='红包金额：' prop="redpackValue">-->
<!--                <el-input-number :step="0.01" :precision="2":min="0" controls-position="right" v-model="ZawardArr.redpackValue"></el-input-number>-->
<!--                <span>元</span>-->
<!--              </el-form-item>-->
              <el-form-item>
                <el-checkbox v-model="ZawardArr.guideGzh" :checked="ZawardArr.guideGzh == 1 ? true : false" :true-label=1 :false-label=0>中奖后引导关注公众号</el-checkbox>
              </el-form-item>

              <div style="height: 30px"></div>
            </el-form>
          </template>
            <ActPutConf v-show="jcType == 2" ref="GFAwardArr" :form-name="'多奖品类奖池：'" :configId="confData.id" :editable="actStatus<4" :awardArr="GFAwardArr" @modifyAwardArr = "modifyGFAwardArr" @modifyAwardArrError="modifyGFAwardArrError"></ActPutConf>

        </el-card>
        <el-form-item>
          <el-row class="mt20">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="backList">返回列表</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>

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
            <el-button size="mini" @click="selectPrize(scope.row,title)">选择</el-button>
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
  import ActPutConf from './components/HPXActPutConf'
  import BZActPutConf from './components/HPXBZActPutConf'
  export default {
    name: "HPXSetConf",
    props: ['form', 'actCode', 'id',],
    components: {
      ActPutConf,
      BZActPutConf
    },
    data() {
      var validateDayNum = (rule, value, callback) => {
        if (!this.confData.dayNum) {
          callback(new Error('请输入每人每天可浇水次数'))
        } else {
          callback()
        }
      }
      var validateBlossomNum = (rule, value, callback) => {
        if (!this.confData.blossomNum) {
          callback(new Error('请输入养成一朵花浇水次数'))
        } else {
          callback()
        }
      }
      var validateFlowerNum = (rule, value, callback) => {
        if (!this.confData.flowerNum) {
          callback(new Error('请输入集齐花朵次数'))
        } else {
          callback()
        }
      }
      var validateTotalMoney = (rule, value, callback) => {
        if (!this.confData.totalMoney) {
          callback(new Error('请输红包总金额'))
        } else {
          callback()
        }
      }
      var validateTotalWinnerNum = (rule, value, callback) => {
        if (!this.confData.totalWinnerNum) {
          callback(new Error('请输瓜分总人数'))
        } else {
          callback()
        }
      }
      var validateRedpackValue = (rule, value, callback) => {
        if (!this.ZawardArr.redpackValue) {
          callback(new Error('请输红包金额'))
        } else {
          callback()
        }
      }
      return {
        actStatus:0,   //   1：未开始 ，2：进行中，3：等待开奖，4：已开奖
        confData: {
          id: '', // 活动数据主键id
          actCode: '', // 活动唯一编码
          dayNum:'',  // 每人每天可浇水
          blossomNum:'',
          flowerNum:'',
          JSEtimeStr: '', //

          OpenTimeStr: '', //
          totalMoney: '', //
          totalWinnerNum: ''


        },
        confRules: {
          dayNum: [{ required: true, validator: validateDayNum, trigger: 'change' }],
          blossomNum: [{ required: true, validator:validateBlossomNum, trigger: 'change' }],
          flowerNum: [{ required: true, validator:validateFlowerNum, trigger: 'change' }],
          JSEtimeStr: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
          OpenTimeStr: [{ required: true, message: '请选择开奖时间', trigger: 'change' }],
          totalMoney: [{ required: true, validator: validateTotalMoney, trigger: 'change' }],
          totalWinnerNum: [{ required: true, validator: validateTotalWinnerNum, trigger: 'change' }],

          awardType: [{ required: true, message: '请选择奖品类型', trigger: 'change' }],
          awardName: [{ required: true, message: '请选择物料', trigger: 'change' }],
          redpackValue: [{ required: true, validator:validateRedpackValue,trigger:'change' }],
        },

        awardArr:[],
        awardArrFlag:true,
        ZawardArr:{
          "awdCode": "",
          "awardName": "",
          "redpackValue": null,
          "awardPic": "",
          "awardType": 3,
          "guideGzh":0
        },
        GFAwardArr:[],
        GFAwardArrFlag:true,
        finishUser:'',
        awardType:[
          {
            value: 3,
            label:'红包'
          },
        ],
        jcTypeArr:[
          {
            value: 1,
            label:'总奖池'
          },
          {
            value: 2,
            label:'多奖品类奖池'
          },
        ],
        jcType:1,

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
      }
    },
    created(){
      this.getActDetail()
    },
    methods: {
      getActDetail(){
        this.$request.post('/api/flower/config/select', {actCode:this.actCode}, false, res => {
          if (res.code === '200') {
            if(res.data.config != null){
              this.actStatus = res.data.actStatus
              this.confData.id = res.data.config.id
              this.confData.JSEtimeStr = res.data.config.joinEndTime
              this.confData.OpenTimeStr = res.data.config.awdBeginTime
              this.confData.dayNum = res.data.config.dayMaxNum
              this.confData.blossomNum = res.data.config.oneFlowerNeedNum
              this.confData.flowerNum = res.data.config.finishNeedNum

              this.jcType =  res.data.config.openAwardType
              this.confData.totalMoney = res.data.config.totalAmount
              this.finishUser = res.data.finishUser


              this.awardArr = res.data.prizeList.map((item)=>{
                return {
                  "id": item.id,
                  "actCode":item.actCode,
                  "prizeName":item.awdName,
                  // "awardName":"0.8元鼓励金",
                  "totalNum":item.totalNum,
                  "outNum":item.outNum,
                  "redMoney":item.redpackValue,
                  "awardType":item.awdType,
                  "awardPic":item.awdPicture,
                  "goodsPrice":item.goodsPrice,
                  "integral": item.scoreValue,
                  "poolId":item.awdCode,
                }
              })

              if(this.jcType == 1){
                this.confData.totalWinnerNum = res.data.config.totalWinnerNum
                this.ZawardArr.awardName = res.data.config.prizeName
                this.ZawardArr.awardPic =  res.data.config.prizePicture
              }
              if(this.jcType == 2){
                this.GFAwardArr = res.data.awardList.map((item)=>{
                  return {
                    "id": item.id,
                    "awardType":3,
                    "prizeName":item.awardName,
                    "awardPic":item.awdPicture,
                    "redMoney":item.awardMoney,
                    "totalNum":item.awardNum, //奖品投放数量
                    "outNum":item.outNum
                  }

                })
              }
            }

          }else {
            this.$message.error(res.msg)
          }
        })
      },
      modifyAwardArrError(data){
        this.awardArrFlag = data
      },
      modifyGFAwardArrError(data){
        this.GFAwardArrFlag = data
      },
      modifyAwardArr(data){
        this.awardArr = data
        this.confirmSubmit()
      },
      modifyGFAwardArr(data){
        this.GFAwardArr = data
        this.confirmSubmit()
      },
      confirmSubmit(){
      },
      judgeDivisor(m, n) {
        var num = {};
        var i = 0;
        var x = parseInt(m / n);
        m = m % n;
        var result = "";
        while (m != 0 && !(m in num)) {
          num[m] = i++;
          result += parseInt(m * 10 / n);
          m = m * 10 % n;
        }
        return m == 0;
      },
      save(){
        this.$refs['awardArr'].save()
        if(!this.awardArrFlag){
          return
        }
        if(this.jcType == 2){
          this.$refs['GFAwardArr'].save()
          if(!this.GFAwardArrFlag){
            return
          }
        }
        // console.log(this.awardArr,this.GFAwardArr)
        let awardConfig = true
        this.$refs.actSetConfRef.validate(valid => {
          if(valid){

          }else {
            awardConfig = false
          }
        })
        if(this.jcType == 1){
          this.$refs.ZawardArr.validate(valid => {
            if(valid){

            }else {
              awardConfig = false
            }
          })
        }
        if(!awardConfig) return
        console.log(this.confData.JSEtimeStr - this.confData.OpenTimeStr)
        if(new Date(this.confData.OpenTimeStr).getTime() - new Date(this.confData.JSEtimeStr)< 60 *60 *1000){
          this.$message.error('开奖时间必须大于浇花截止时间1小时')
          return
        }
        if(this.jcType == 1){
          let flag = this.judgeDivisor(this.confData.totalMoney-0, this.confData.totalWinnerNum-0)
          if(!flag){
            this.$message.error('红包总金额除不尽配置的瓜分总人数')
            return
          }
        }
        let flowerPrizeList = this.awardArr.map((item)=>{
          if(item.awardType == 1){
            return {
              "awdCode":item.poolId,
              "awdType":item.awardType,
              "awdName":item.prizeName,
              "awdPicture":item.awardPic,
              "goodsPrice":item.goodsPrice,
              "scoreValue":0,
              "redpackValue":0,
              "totalNum":item.totalNum //奖品投放数量
            }
          }
          if(item.awardType == 3){
            return {
              "awdCode":item.poolId,
              "awdType":item.awardType,
              "awdName":item.prizeName,
              "awdPicture":item.awardPic,
              "goodsPrice":0,
              "scoreValue":0,
              "redpackValue":item.redMoney,
              "totalNum":item.totalNum //奖品投放数量
            }
          }
          if(item.awardType == 6){
            return {
              "awdCode":item.poolId,
              "awdType":item.awardType,
              "awdName":item.prizeName,
              "awdPicture":item.awardPic,
              "goodsPrice":0,
              "scoreValue":item.integral,
              "redpackValue":0,
              "totalNum":item.totalNum //奖品投放数量
            }
          }

        })
        let params
        if(this.jcType == 1){
          params = {
            "flowerConfig":{
              "actCode":this.actCode, //活动code
              "joinEndTime":this.confData.JSEtimeStr, //浇花截止时间
              "awdBeginTime":this.confData.OpenTimeStr, //开奖时间
              "dayMaxNum":this.confData.dayNum, //每天的最多参与次数
              "oneFlowerNeedNum":this.confData.blossomNum, //养成一朵花需要浇水几次
              "finishNeedNum":this.confData.flowerNum, //完成任务需要几朵花

              "openAwardType":this.jcType, //开奖类型 1表示瓜分总奖池 2表示多种奖品奖池
              "totalAmount":this.confData.totalMoney, //奖池总金额
              "totalWinnerNum":this.confData.totalWinnerNum, //奖池总金额
              "prizeName": this.ZawardArr.awardName,
              "prizePicture": this.ZawardArr.awardPic
            },
            flowerPrizeList
          }
        }
        if(this.jcType == 2){
          let flowerAwardList = this.GFAwardArr.map((item)=>{
            return {
              "awardName":item.prizeName,
              "awdPicture":item.awardPic,
              "awardMoney":item.redMoney,
              "awardNum":item.totalNum //奖品投放数量
            }
          })
          params = {
            "flowerConfig":{
              "actCode":this.actCode, //活动code
              "joinEndTime":this.confData.JSEtimeStr, //浇花截止时间
              "awdBeginTime":this.confData.OpenTimeStr, //开奖时间
              "dayMaxNum":this.confData.dayNum, //每天的最多参与次数
              "oneFlowerNeedNum":this.confData.blossomNum, //养成一朵花需要浇水几次
              "finishNeedNum":this.confData.flowerNum, //完成任务需要几朵花

              "openAwardType":this.jcType, //开奖类型 1表示瓜分总奖池 2表示多种奖品奖池
              "totalAmount":this.confData.totalMoney, //奖池总金额
            },
            flowerPrizeList,
            flowerAwardList
          }
        }
        console.log(params)
        if(this.confData.id){
          params.flowerConfig.id = this.confData.id
          this.$request.post('/api/flower/config/update', params, true, res => {
            if (res.code === '200') {
              this.$message({type: 'success', message: '操作成功!'});
              this.backList()
              return
            }
            this.$message.error(res.msg)
          })
        }else {
          this.$request.post('/api/flower/config/add', params, true, res => {
            if (res.code === '200') {
              this.$message({type: 'success', message: '操作成功!'});
              this.backList()
              return
            }
            this.$message.error(res.msg)
          })
        }
      },
      backList(){
        this.$router.push('/market/actMgr')
      },
      // 选择奖品
      selectPrize(obj,title) {
        this.ZawardArr.awardName = obj.name
        this.ZawardArr.awdCode = obj.id
        this.ZawardArr.awardPrice = obj.marketMoney
        this.ZawardArr.awardPic = obj.pic
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
      handleSelectChange(item){
        console.log(item)
        item.awardName = ""
        item.awardPic = ""
        item.redpackValue = ""

      },
      getList(type) {
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

<style scoped>
  .hpx-actSetConf-container{
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
  }
</style>
