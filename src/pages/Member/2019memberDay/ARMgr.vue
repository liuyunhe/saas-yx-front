<template>
  <div class="QA-container">
    <div >
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>基本设置：</span>
        </div>
        <el-form ref="actSetConfRef" :model="config" label-width="150px" :rules="confRules">
          <el-form-item label='活动时间：' prop="date">
            <el-date-picker v-model="config.stime"  :disabled="actStart" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
            至
            <el-date-picker v-model="config.etime" :disabled="actStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" ></el-date-picker>
          </el-form-item>
          <el-form-item label='抽奖限制：' prop="drawNum">
            每人每期可参与
            <el-input-number v-model="config.drawNum" :disabled="actStart" :precision="0" :min="0" controls-position="right"></el-input-number>
            次抽奖
          </el-form-item>
          <el-form-item label='获取海报概率：' prop="postProbility">
            每人每期获取海报的概率为
            <el-input-number v-model="config.postProbility"  :precision="0" :min="0" controls-position="right"></el-input-number>
            %
          </el-form-item>
          <el-form-item label='上传海报URL地址：' prop="postUrl">
            <el-input v-model="config.postUrl" :disabled="actStart" controls-position="right" style="width: 300px;"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>红包：</span>
        </div>
        <div style="margin-bottom: 20px">选择红包:<el-button size="" style="margin-left: 20px"  @click="getList(3)">选择</el-button></div>
        <el-form>
          <el-form-item v-for="(item,index) in hb" :key="index" label='名称：'>
            面额 <el-input-number v-model="item.redMoney" :disabled="item.id ? true : false" :precision="2" :min="0" controls-position="right"></el-input-number>元
            <span style="margin-right: 20px"></span>
            投放数量 <el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个

            <span v-if="item.id ? true : false">
               <span style="margin-right: 20px"></span>
            剩余{{ item.totalNum - item.outNum }}个
            </span>
            <span style="margin-right: 20px"></span>
            总金额:{{ parseFloat((item.redMoney*item.totalNum).toPrecision(12))  }}元
            <span style="margin-right: 20px"></span>
            中奖概率 <el-input-number v-model="item.probability" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>
            %
            <span v-if="item.id ? true : false">
              <span style="margin-right: 20px"></span>
              <el-button type='primary' @click="addRepertory(item)">增库</el-button>
            </span>
            <span style="margin-right: 20px"></span>
            <el-button type='danger' @click="deleteAward('hb',index)">删除</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>实物：</span>
        </div>
        <div style="margin-bottom: 20px">选择实物:<el-button size="" style="margin-left: 20px"  @click="getList(1)">选择</el-button></div>
        <el-form>
          <el-form-item v-for="(item,index) in sw" :key="index" label='名称：'>
<!--            面额 <el-input-number v-model="item.redMoney" :disabled="item.id ? true : false" :precision="2" :min="0" controls-position="right"></el-input-number>元-->
<!--            <span style="margin-right: 20px"></span>-->
            投放数量 <el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个

            <span v-if="item.id ? true : false">
               <span style="margin-right: 20px"></span>
            剩余{{ item.totalNum - item.outNum }}个
            </span>
<!--            <span style="margin-right: 20px"></span>-->
<!--            总金额:{{ parseFloat((item.redMoney*item.totalNum).toPrecision(12))  }}元-->
            <span style="margin-right: 20px"></span>
            中奖概率 <el-input-number v-model="item.probability" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>
            %
            <span v-if="item.id ? true : false">
              <span style="margin-right: 20px"></span>
              <el-button type='primary' @click="addRepertory(item)">增库</el-button>
            </span>
            <span style="margin-right: 20px"></span>
            <el-button type='danger' @click="deleteAward('sw',index)">删除</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>荷石币：</span>
        </div>
        <div style="margin-bottom: 20px">选择荷石币:<el-button style="margin-left: 20px"  @click="getList(6)">选择</el-button></div>
        <el-form>
          <el-form-item v-for="(item,index) in hsb" :key="index" label='名称：'>
            面额 <el-input-number v-model="item.integral" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>荷石币
            <span style="margin-right: 20px"></span>
            投放数量<el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个
            <span v-if="item.id ? true : false">
               <span style="margin-right: 20px"></span>
            剩余{{ item.totalNum - item.outNum }}个
            </span>
            <span style="margin-right: 20px"></span>
            总荷石币:{{ item.integral*item.totalNum }}
            <span style="margin-right: 20px"></span>
            中奖概率<el-input-number v-model="item.probability" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>
            %
            <span v-if="item.id ? true : false">
              <span style="margin-right: 20px"></span>
              <el-button type="primary" @click="addRepertory(item)">增库</el-button>
            </span>
            <span style="margin-right: 20px"></span>
            <el-button type='danger' @click="deleteAward('hsb',index)">删除</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>折扣卡：</span>
        </div>
        <div style="margin-bottom: 20px">选择折扣卡:<el-button style="margin-left: 20px"  @click="getList(7)">选择</el-button></div>
        <el-form>
          <el-form-item v-for="(item,index) in zkk" :key="index" label='名称：'>
            <el-input-number v-model="item.awardPrice" :disabled="item.id ? true : false" :step="0.01" :precision="2" :min="0" :max="1" controls-position="right"></el-input-number>折扣卡
            <span style="margin-right: 20px"></span>
            投放数量<el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个
            <span v-if="item.id ? true : false">
               <span style="margin-right: 20px"></span>
            剩余{{ item.totalNum - item.outNum }}个
            </span>
            <span style="margin-right: 20px"></span>
            中奖概率<el-input-number v-model="item.probability" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>
            %
            <span v-if="item.id ? true : false">
              <span style="margin-right: 20px"></span>
              <el-button type="primary" @click="addRepertory(item)">增库</el-button>
            </span>
            <span style="margin-right: 20px"></span>
            <el-button type='danger' @click="deleteAward('zkk',index)">删除</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>翻倍卡：</span>
        </div>
        <div style="margin-bottom: 20px">选择翻倍卡:<el-button style="margin-left: 20px"  @click="getList(8)">选择</el-button></div>
        <el-form>
          <el-form-item v-for="(item,index) in fbk" :key="index" label='名称：'>
            <el-input-number v-model="item.awardPrice" :disabled="item.id ? true : false" :step="0.01" :precision="2" :min="1" controls-position="right"></el-input-number>翻倍卡
            <span style="margin-right: 20px"></span>
            投放数量<el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个
            <span v-if="item.id ? true : false">
               <span style="margin-right: 20px"></span>
            剩余{{ item.totalNum - item.outNum }}个
            </span>
            <span style="margin-right: 20px"></span>
            中奖概率<el-input-number v-model="item.probability" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>
            %
            <span v-if="item.id ? true : false">
              <span style="margin-right: 20px"></span>
              <el-button type="primary" @click="addRepertory(item)">增库</el-button>
            </span>
            <span style="margin-right: 20px"></span>
            <el-button type='danger' @click="deleteAward('fbk',index)">删除</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
<!--      <el-card :body-style="{ padding: '20px' }">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span>荷点：</span>-->
<!--          <el-button type="primary" @click="addHD">新增</el-button>-->
<!--        </div>-->

<!--        <el-form>-->
<!--          <el-form-item v-for="(item,index) in hd" :key="index" label='奖品图片：'>-->
<!--            <el-input v-model="item.awardPic" style="display: none" ></el-input>-->
<!--            <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :on-success="(res)=>{uploadImgUrlSuccess(res,index)}" :show-file-list="false">-->
<!--              <img v-if="item.awardPic" :src="item.awardPic" class="avatar">-->
<!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--            </el-upload>-->
<!--            <span>* 图片建议尺寸为380*280px，格式为*.jpg\ *.bmp\ *.png\ *.gif</span>-->
<!--            <div></div>-->
<!--            名称：<el-input style="width: 130px" v-model="item.prizeName"  placeholder="奖品名称" :disabled="item.id ? true : false"></el-input>-->
<!--            <span style="margin-right: 20px"></span>-->
<!--            投放数量<el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个-->
<!--            <span v-if="item.id ? true : false">-->
<!--               <span style="margin-right: 20px"></span>-->
<!--            剩余{{ item.totalNum - item.outNum }}个-->
<!--            </span>-->
<!--            <span style="margin-right: 20px"></span>-->
<!--            中奖概率<el-input-number v-model="item.probability" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>-->
<!--            %-->
<!--            <span style="margin-right: 20px"></span>-->
<!--            面额<el-input-number v-model="item.integral" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number> 分-->
<!--            <span v-if="item.id ? true : false">-->
<!--              <span style="margin-right: 20px"></span>-->
<!--              <el-button type="primary" @click="addRepertory(item)">增库</el-button>-->
<!--            </span>-->
<!--            <span style="margin-right: 20px"></span>-->
<!--            <el-button type='danger' @click="deleteAward('hd',index)">删除</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-card>-->
    </div>


    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="confirmSubmit">保存</el-button>
    </div>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px">
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
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "QAMgr",
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

      var validateDrawNum = (rule, value, callback) => {
        if (!this.config.drawNum) {
          callback(new Error('请输入抽奖次数'))
        } else {
          callback()
        }
      }
      var validatePostProbility = (rule, value, callback) => {
        if (!this.config.postProbility) {
          callback(new Error('请输入获取海报概率'))
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
        id:'',
        actCode:'',
        strategyArr:{},
        act:{},

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
        actStart:false,
        config:{
          id:'-1',
          confCode:'"20220216-171800"',
          stime:'',
          etime:'',
          drawNum:null,
          postProbility:null,
          postUrl:null,
        },

        confRules: {
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          drawNum: [{ required: true, validator: validateDrawNum, trigger: 'change' }],
          postProbility: [{ required: true, validator: validatePostProbility, trigger: 'change' }],
          postUrl: [{ required: true, message: '请输入海报url', trigger: 'blur' }],
        },

        hb:[],
        sw:[],
        hsb:[],
        zkk:[],
        fbk:[],
        hd:[],
        defaultAwae: { // 给个默认 好复制
          awardPic: '',
          awardPrice:'',
          awardType: 1, // 奖项类型
          curActive: true,
          giveScore: 0, // 是否赠送积分 0-否 1-是
          guideGzh: 0, // 是否引导关注公众号 0-否 1-是
          hasPdMaxOut: false,
          hasWarn: false,
          integral: null, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
          integralPool: null, // 赠送积分池主键id
          integralPoolName: null,
          integralPoolPic: null,
          isGiveScore: false,
          isGuideGzh: false,
          isPdMaxOut: false,
          isWarn: false,
          n: '',
          outNum: '',
          pdMaxOut: '', // 奖项每天最多出奖个数
          poolId: 1, // 奖项物料池主键id
          poolName: '',
          prizeName: '', // 奖项名称
          probability: '', // 中奖概率
          redMoney: '', // 投放红包面额
          redTotalMoney: '',
          remainNum: 0,
          totalNum: '', // totalNum
          warnValue: '' //告警阀值 非空且大于0时为设置告警
        },
      }
    },
    created() {
      this.getConfShow()
      this.getActCode()
    },
    mounted() {
    },
    computed: {
      residue: {
        get: function() {
          return this.awae.totalNum - this.awae.outNum
        },
        set: function(newValue) {
          // console.log(newValue)
        }
      },
      totalRed: {
        get: function() {
          return this.awae.redMoney * this.awae.totalNum
        },
        set: function(newValue) {
          // console.log(newValue)
        }
      }
    },
    methods:{
      getConfShow(){
        this.$request.post('/hbact/hyr/saas/ar/confShow', {}, false, res => {
          if (res.code == '200') {
            if(res.data){
              this.actStart = res.data.actStart
              this.config = res.data.nowConfig
            }
            return
          }
          this.$message.error(res.msg)
        })
      },
      addHD(){
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        newAwae.awardType = 9
        this.hd.push(newAwae)
      },
      uploadImgUrlSuccess(resule,index) {
        if (resule.ret === '200000')
          return (this.hd[index].awardPic = resule.data.accessUrl)
        this.$message.error(resule.message)
      },
      // 扫码奖励查询
      getActCode(){
        this.$request.post('/hbact/hyr/home/actCode', {actType:11}, false, res => {
          if (res.code == '200') {
            this.actCode = res.data.actCode
            this.id = res.data.id
            this.getDetail()
            return
          }
          this.$message.error(res.msg)
        })
      },
      getDetail() {
        this.$request.post('/api/wiseqr/act/detail', { id: this.id }, true, res => {
          if (res.ret == '200000') {

            this.strategyArr = res.data.strategyArr[0];
            this.act = res.data.act
            let awardArr = this.strategyArr.awardArr
            this.hb = []
            this.sw = []
            this.hsb = []
            this.zkk = []
            this.fbk = []
            this.hd = []
            awardArr.forEach((e,i)=>{
              if(e.awardType == 3){
                this.hb.push(e)
              }
              if(e.awardType == 1){
                this.sw.push(e)
              }
              else if(e.awardType == 6){
                this.hsb.push(e)
              }
              else if(e.awardType == 7){
                this.zkk.push(e)
              }
              else if(e.awardType == 8){
                this.fbk.push(e)
              }
              else if(e.awardType == 9){
                this.hd.push(e)
              }
            })
            return
          }
          this.$message.error(res.messgae)
        })
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
      addRepertory(item) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          if (value == 0) return this.$message.error('数字不能为0')
          this.$request.post('/api/wiseqr/act/addNum', {
            id: item.id ,
            increment: value
          }, true, res => {
            if (res.ret === '200000') {
              this.$message.success('增库成功')
              this.getDetail()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      saveJC(){
        let params = {};
        // params.act = {
        //   actCode: this.act.actCode,
        //   actDesc: this.act.actDesc,
        //   actName: this.act.actName,
        //   banner: this.act.banner,
        //   etimeStr: this.act.etimeStr,
        //   extInfo: this.act.extInfo,
        //   form: this.act.form,
        //   id: this.act.id,
        //   idx: this.act.idx,
        //   note: this.act.note,
        //   selectBrand: this.strategyArr.brandArr,
        //   selectCityList: this.strategyArr.areas.cityArr,
        //   selectDistrictList: this.strategyArr.areas.districtArr,
        //   selectProductList: this.strategyArr.snArr,
        //   selectProvList: this.strategyArr.areas.provinceArr,
        //   showStatus: this.act.showStatus,
        //   status: this.act.status,
        //   stimeStr: this.act.stimeStr,
        //   tplCode: this.act.tplCode,
        // }
        params.act = {
          actCode: this.act.actCode,
          dwnum: this.act.dwnum,
          id: this.act.id,
          status: this.act.status,
        }
        params.strategyArr = [
          {
            areas:{
              provinceArr:this.strategyArr.areas.provinceArr,
              cityArr:this.strategyArr.areas.cityArr,
              districtArr:this.strategyArr.areas.districtArr,
            },
            awardArr:[...this.hb,...this.sw,...this.hsb,...this.zkk,...this.fbk],
            snArr:this.strategyArr.snArr,
            brandArr:this.strategyArr.brandArr,
            tf:{
              id:this.strategyArr.tf.id,
              tfCode:this.strategyArr.tf.tfCode,
            },
            tfType: this.strategyArr.tfType,
          }
        ]
        this.$request.post('/api/wiseqr/act/somtf', params, true, res => {
          if (res.ret == '200000') {
            this.getDetail()
            this.$message({type: 'success', message: '操作成功!'});

          } else {
            this.$message.error(res.message);
          }
        })
      },
      saveConf(){
        let params = this.config
        this.$request.post('/hbact/hyr/saas/ar/confSave', params, true, res => {
          if (res.code == '200') {
            this.getConfShow()
            this.$message({type: 'success', message: '操作成功!'});
          } else {
            this.$message.error(res.message);
          }
        })
      },
      confirmSubmit() {
        this.saveConf()
        this.saveJC()
      },
      // 选择奖品
      selectPrize(obj,title) {
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        newAwae.awardPic = obj.pic
        newAwae.poolName = obj.name
        newAwae.prizeName = obj.name
        newAwae.poolId = obj.id
        if(title == '选择红包'){
          newAwae.awardType = 3
          this.hb.push(newAwae)
        }
        if(title == '选择实物'){
          newAwae.awardType = 1
          this.sw.push(newAwae)
        }
        if(title == '选择荷石币'){
          newAwae.awardType = 6
          this.hsb.push(newAwae)
        }
        if(title == '选择折扣卡'){
          newAwae.awardType = 7
          this.zkk.push(newAwae)
        }
        if(title == '选择翻倍卡'){
          newAwae.awardType = 8
          this.fbk.push(newAwae)
        }
        this.listVisible = false
      },
      deleteAward(list,index){
        this[list].splice(index,1)
      },
      handSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
    }

  }
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>
<style lang="scss" scoped>
  .QA-container{
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
  }
</style>
