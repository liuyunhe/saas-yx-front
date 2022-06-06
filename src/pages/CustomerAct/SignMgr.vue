<template>
  <div class="QA-container">
    <div >
      <el-form>
        <el-form-item label="活动ID:" v-if="actCode"><div style="color:#606266;">{{actCode}}</div></el-form-item>
        <el-form-item label="是否立即启用：">
          <el-switch
              v-model="openFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-top: -4px;"
              :disabled="useOpen"
              @change="handleOpen"
          >
          </el-switch>
          <span style="color:#c0c4cc;margin-left: 20px">开启后可在C端展示，单独控制，不需保存提交</span>
        </el-form-item>
      </el-form>

      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>基本设置：</span>
        </div>
        <el-form ref="actSetConfRef" :model="config" label-width="150px" :rules="confRules">

          <el-form-item label='活动名称：' prop="actName">
            <el-input v-model="config.actName"  controls-position="right" style="width: 300px;" maxlength="15" placeholder="限最多15个汉字"></el-input>
          </el-form-item>
          <el-form-item label="活动入口图：" prop="actPic">
            <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :data="{channel:'hebei-sellerInfo '}"  :on-success="uploadImgUrlSuccess" :show-file-list="false">
              <img v-if="config.actPic" :src="config.actPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
              <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*160像素；格式png、jpg</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动说明：" prop="desc">
            <quill-editor ref="myTextEditor" v-model="config.actRuleDesc" style="width: 420px;" :options="editorOption" placeholder="请输入活动说明，300字以内">
            </quill-editor>
          </el-form-item>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>签到设置：</span>
        </div>
        <el-form ref="signConfRef" :model="config" label-width="150px" :rules="confRules">

          <el-form-item label='常规签到奖励：' prop="daySignPoints">
            每日签到获得
            <el-input-number v-model="config.daySignPoints" :precision="0" :min="0" controls-position="right"></el-input-number>
            积分
          </el-form-item>
          <el-form-item label="是否开启连续签到：">
            <el-switch
                :disabled="actStart"
                v-model="config.contSignFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin-top: -4px;"
                :active-value="1"
                :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="" v-if="config.contSignFlag == 1" prop="selectProductList" >
            <div v-for="(item,index) in config.hbsSignContConfList" :key="index" style="margin-bottom: 10px">
              连续签到
              <el-input-number :disabled="actStart" v-model="config.hbsSignContConfList[index].contSignDays" :precision="0" :min="0" controls-position="right"></el-input-number>
              天，额外可获得
              <el-input-number :disabled="actStart" v-model="config.hbsSignContConfList[index].points" :precision="0" :min="0" controls-position="right"></el-input-number>
              积分
              <el-button v-if="!actStart" type="danger" @click="deleteProduct(index)">删除规则</el-button>
            </div>
            <div> <el-button v-if="!actStart" type="primary" @click="addProduct">增加规则</el-button></div>
            <div v-if="actStart&&config.contSignFlag == 1&&config.hbsSignContConfList.length>0">每{{config.hbsSignContConfList[config.hbsSignContConfList.length - 1].contSignDays}}天一个循环，最多连续签到{{config.hbsSignContConfList[config.hbsSignContConfList.length - 1].contSignDays}}天，断签从第一天开始从新计算</div>
          </el-form-item>

        </el-form>
      </el-card>
      <div style="height: 40px;text-align: center;margin-top: 30px">
        <el-button type="primary" @click="confirmSubmit">保存</el-button>
      </div>
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>抽奖设置：</span>
        </div>
        <el-form ref="drawConf" :model="config" label-width="150px" :rules="confRules">
          <el-form-item label="是否关联抽奖：" prop="date" :show-message="false">
            <el-switch
                :disabled="actStart"
                v-model="config.drawFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin-top: -4px;"
                :active-value="1"
                :inactive-value="0"
                @change="handleDrawFlag"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="活动时间：" prop="date" v-if="config.drawFlag == 1">
            <el-date-picker v-model="config.drawStime" :disabled="actStart" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
            至
            <el-date-picker v-model="config.drawEtime" :disabled="actStart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
          </el-form-item>
          <el-form-item label='抽奖限制：' prop="drawContDays" v-if="config.drawFlag == 1">
            签到满
            <el-input-number v-model="config.drawContDays"  :precision="0" :min="0" controls-position="right"></el-input-number>
            天，可参与抽奖
          </el-form-item>
          <div style="height: 40px;text-align: center;margin-top: 30px">
            <el-button type="primary" @click="confirmSubmitDrawConf">保存</el-button>
          </div>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }" v-if="config.drawFlag == 1">
        <div slot="header" class="clearfix">
          <span>实物：</span>
        </div>
        <div style="margin-bottom: 20px">选择实物:<el-button :disabled="actStart" size="" style="margin-left: 20px"  @click="getList(1)">选择</el-button></div>
        <el-form>
          <el-form-item v-for="(item,index) in sw" :key="index" label='名称：'>
            <!--            面额 <el-input-number v-model="item.redMoney" :disabled="item.id ? true : false" :precision="2" :min="0" controls-position="right"></el-input-number>元-->
            <!--            <span style="margin-right: 20px"></span>-->
            <span style="margin-right: 20px">{{ item.prizeName }}</span>
            <el-upload :disabled="item.id ? true : false" class="avatar-uploader2" :action="uploadURL1" :headers="headerObj" :on-success="(res)=>{uploadSWImgUrlSuccess(res,index)}" :show-file-list="false">
              <img v-if="item.awardPic" :src="item.awardPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>* 图片建议尺寸为280*280px，格式为*.jpg\ *.bmp\ *.png\ *.gif</span>
            <div></div>
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
      <el-card :body-style="{ padding: '20px' }" v-if="config.drawFlag == 1">
        <div slot="header" class="clearfix">
          <span>红包：</span>
        </div>
        <div style="margin-bottom: 20px">选择红包:<el-button :disabled="actStart" size="" style="margin-left: 20px"  @click="getList(3)">选择</el-button></div>
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
      <div style="height: 30px"></div>
      <el-card :body-style="{ padding: '20px' }" v-if="config.drawFlag == 1">
        <div slot="header" class="clearfix">
          <span>荷石币：</span>
        </div>
        <div style="margin-bottom: 20px">选择荷石币:<el-button :disabled="actStart" style="margin-left: 20px"  @click="getList(6)">选择</el-button></div>
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
    </div>


    <div style="height: 40px;text-align: center;margin-top: 30px" v-if="config.drawFlag == 1">
      <el-button type="primary" @click="saveJC">保存</el-button>
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
    name: "ScanMgr",
    data(){
      var validateDate = (rule, value, callback) => {
        if (!this.config.drawStime || !this.config.drawEtime) {
          callback(new Error('请选择活动时间'))
        } else if (this.config.drawStime >= this.config.drawEtime){
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      }

      var validateDrawNum = (rule, value, callback) => {
        if (!this.config.dayJoinLimit) {
          callback(new Error('请输入抽奖次数'))
        } else {
          callback()
        }
      }
      var validateDrawContDays = (rule, value, callback) => {
        if (!this.config.drawContDays) {
          callback(new Error('请输入天数'))
        } else {
          callback()
        }
      }
      var validateSignPoints = (rule, value, callback) => {
        if (!this.config.daySignPoints) {
          callback(new Error('请输入积分数量'))
        } else {
          callback()
        }
      }
      var validateDesc = (rule, value, callback) => {
        if (!this.config.actRuleDesc) {
          callback(new Error('请输入活动说明'))
        } else {
          callback()
        }
      }
      var validateActPic = (rule, value, callback) => {
        if (!this.config.actPic) {
          callback(new Error('请上传活动入口图'))
        } else {
          callback()
        }
      }
      var valideSelectProductList = (rules, value, callback) => {
        if (this.config.hbsSignContConfList.length>0) {
          let flag = false
          this.config.hbsSignContConfList.forEach(item=>{
            if(item.contSignDays == null || item.points == null) {
              flag = true
            }
          })
          if(flag){
            callback(new Error('请完整填写奖励规则'))
          }else {
            callback()
          }
        } else {
          callback(new Error('请填写奖励规则'))
        }
      }
      return {
        uploadURL1: '/api/wiseqr/attach/commonAliUpload',
        uploadURL: '/api/wiseqr/attach/commonNewUpload',
        headerObj: {
          loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
          token: sessionStorage.getItem('access_token'),
          CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
        },
        editorOption: {
          modules: {
            toolbar: [
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['bold', 'italic', 'underline', 'strike', , 'blockquote'],
              [{ color: [] }, { background: [] }, { align: [] }]
            ]
          },
          placeholder: '请输入活动说明'
        },
        openFlag:true,
        useOpen:false,
        id:'',
        actCode:null,
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
          actName: null, //活动名称
          actPic: null, //图片
          actPicCode: null, //图片code
          actRuleDesc: null, //活动描述
          dayJoinLimit:null,

          contSignFlag:1,
          daySignPoints:null,
          hbsSignContConfList:[{
            contSignDays: null, //连续签到天数
            points: null //连续签到送的积分
          }],
          outStatus:null,
          drawFlag: 1, //开关 1:打开 0:关闭。 关闭时候无需传递其它参数
          drawStime: null, //开始时间
          drawEtime: null, //截止时间
          drawContDays: null //需签到天数
        },
        confRules: {
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          actPic: [{ required: true, validator: validateActPic,trigger: 'change' }],
          actName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          desc: [{ required: true, validator: validateDesc,trigger: 'blur' }],
          selectProductList: [{ required: true, validator: valideSelectProductList,trigger: 'blur'}],
          dayJoinLimit: [{ required: true, validator: validateDrawNum, trigger: 'change' }],
          drawContDays: [{ required: true, validator: validateDrawContDays, trigger: 'change' }],
          daySignPoints: [{ required: true, validator: validateSignPoints, trigger: 'change' }],
        },
        brandList:[],
        productList:[],
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
      uploadSWImgUrlSuccess(resule,index) {
        if (resule.ret === '200000')
          return (this.sw[index].awardPic = resule.data.accessUrl)
        this.$message.error(resule.message)
      },
      handleOpen(value){
        console.log(value)
        let params = {
          actCode:this.actCode,
          openFlag:this.openFlag ? "1" : "3"
        }
        this.$request.post('/saasHbseller/actCommon/actOpenSwitch',params, false, res => {
          if (res.code == '200') {
            this.$message.success('操作成功')
            if(value){
              this.actStart = true
            }else {
              this.actStart = false
            }
            return
          }
          this.$message.error(res.msg)
          this.getConfShow()
        })
      },
      handleDrawFlag(value){
        if(value == 0){
          // this.sw = []
          // this.hb = []
          // this.hsb = []
        }
      },
      beforeAvatarUpload(file) {
        const JPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!JPGOrPNG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return JPGOrPNG && isLt2M;
      },
      uploadImgUrlSuccess(resule) {
        if (resule.ret === '200000'){
          console.log(resule)
          this.config.actPicCode = resule.data.rdmCode
          this.config.actPic = resule.data.filePath
          return
        }
        this.$message.error(resule.message)
      },
      getConfShow(){
        this.$request.get('/saasHbseller/actSign/queryConf', {}, res => {
          if (res.code == '200') {
            if(res.data){
              this.actCode = res.data.actBaseInfo.actCode
              this.actStart = res.data.actBaseInfo.status == 1 ? true : false  //状态,1:启用, 2:未启用(或暂停)
              this.openFlag = this.actStart
              this.config.actName = res.data.actBaseInfo.actName
              this.config.actPic = res.data.actBaseInfo.actPic
              this.config.actPicCode = res.data.actBaseInfo.actPicCode
              this.config.actRuleDesc = res.data.actBaseInfo.actRuleDesc
              this.config.contSignFlag = res.data.signDrawConf.contSignFlag
              this.config.daySignPoints = res.data.signDrawConf.daySignPoints
              this.config.drawFlag = res.data.signDrawConf.drawFlag
              this.config.drawStime = res.data.signDrawConf.drawStime
              this.config.drawEtime = res.data.signDrawConf.drawEtime
              this.config.drawContDays = res.data.signDrawConf.drawContDays
              if(res.data.signContConfs.length){
                this.config.hbsSignContConfList = res.data.signContConfs
              }
              this.getDetail()
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

      // 扫码奖励查询

      addProduct(){
        this.config.hbsSignContConfList.push({
          contSignDays: null, //连续签到天数
          points: null //连续签到送的积分
        })
      },
      deleteProduct(index){
        this.config.hbsSignContConfList.splice(index,1)
      },

      getDetail() {
        this.$request.post('/saasHbseller/actCommon/actAwdList', { actCode: this.actCode }, false, res => {
          if (res.code == '200') {
            let awardArr = res.data.awdList
            console.log(awardArr)
            this.hb = []
            this.sw = []
            this.hsb = []
            this.zkk = []
            this.fbk = []
            this.hd = []
            awardArr.forEach((e,i)=>{
              if(e.awdType == 3){
                this.hb.push({
                  id: e.id,
                  awardPic: e.awdPic,
                  awardPrice:'',
                  awardType: 3, // 奖项类型
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
                  outNum: e.numUsed,
                  pdMaxOut: '', // 奖项每天最多出奖个数
                  poolId: 1, // 奖项物料池主键id
                  poolName: '',
                  prizeName: e.awdName, // 奖项名称
                  probability: e.awdPr, // 中奖概率
                  redMoney: e.awdValue, // 投放红包面额
                  redTotalMoney: '',
                  remainNum: 0,
                  totalNum: e.numTotal, // totalNum
                  warnValue: '' //告警阀值 非空且大于0时为设置告警
                })
              }
              if(e.awdType == 1){
                this.sw.push({
                  id: e.id,
                  awardPic: e.awdPic,
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
                  outNum: e.numUsed,
                  pdMaxOut: '', // 奖项每天最多出奖个数
                  poolId: 1, // 奖项物料池主键id
                  poolName: '',
                  prizeName: e.awdName, // 奖项名称
                  probability: e.awdPr, // 中奖概率
                  redMoney:'', // 投放红包面额
                  redTotalMoney: '',
                  remainNum: 0,
                  totalNum: e.numTotal, // totalNum
                  warnValue: '' //告警阀值 非空且大于0时为设置告警
                })
              }
              else if(e.awdType == 6){
                this.hsb.push({
                  id: e.id,
                  awardPic: e.awdPic,
                  awardPrice:'',
                  awardType: 6, // 奖项类型
                  curActive: true,
                  giveScore: 0, // 是否赠送积分 0-否 1-是
                  guideGzh: 0, // 是否引导关注公众号 0-否 1-是
                  hasPdMaxOut: false,
                  hasWarn: false,
                  integral: e.awdValue, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
                  integralPool: null, // 赠送积分池主键id
                  integralPoolName: null,
                  integralPoolPic: null,
                  isGiveScore: false,
                  isGuideGzh: false,
                  isPdMaxOut: false,
                  isWarn: false,
                  n: '',
                  outNum: e.numUsed,
                  pdMaxOut: '', // 奖项每天最多出奖个数
                  poolId: 1, // 奖项物料池主键id
                  poolName: '',
                  prizeName: e.awdName, // 奖项名称
                  probability: e.awdPr, // 中奖概率
                  redMoney:'', // 投放红包面额
                  redTotalMoney: '',
                  remainNum: 0,
                  totalNum: e.numTotal, // totalNum
                  warnValue: '' //告警阀值 非空且大于0时为设置告警
                })
              }
              else if(e.awdType == 7){
                this.zkk.push(
                    {
                      id: e.id,
                      awardPic: e.awdPic,
                      awardPrice:'',
                      awardType: 7, // 奖项类型
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
                      outNum: e.numUsed,
                      pdMaxOut: '', // 奖项每天最多出奖个数
                      poolId: 1, // 奖项物料池主键id
                      poolName: '',
                      prizeName: e.awdName, // 奖项名称
                      probability: e.awdPr, // 中奖概率
                      redMoney:'', // 投放红包面额
                      redTotalMoney: '',
                      remainNum: 0,
                      totalNum: e.numTotal, // totalNum
                      warnValue: '' //告警阀值 非空且大于0时为设置告警
                    }
                )
              }
              else if(e.awdType == 8){
                this.fbk.push(
                    {
                      id: e.id,
                      awardPic: e.awdPic,
                      awardPrice:'',
                      awardType: 8, // 奖项类型
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
                      outNum: e.numUsed,
                      pdMaxOut: '', // 奖项每天最多出奖个数
                      poolId: 1, // 奖项物料池主键id
                      poolName: '',
                      prizeName: e.awdName, // 奖项名称
                      probability: e.awdPr, // 中奖概率
                      redMoney:'', // 投放红包面额
                      redTotalMoney: '',
                      remainNum: 0,
                      totalNum: e.numTotal, // totalNum
                      warnValue: '' //告警阀值 非空且大于0时为设置告警
                    }
                )
              }
              else if(e.awdType == 9){
                this.hd.push(
                    {
                      id: e.id,
                      awardPic: e.awdPic,
                      awardPrice:'',
                      awardType: 9, // 奖项类型
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
                      outNum: e.numUsed,
                      pdMaxOut: '', // 奖项每天最多出奖个数
                      poolId: 1, // 奖项物料池主键id
                      poolName: '',
                      prizeName: e.awdName, // 奖项名称
                      probability: e.awdPr, // 中奖概率
                      redMoney:'', // 投放红包面额
                      redTotalMoney: '',
                      remainNum: 0,
                      totalNum: e.numTotal, // totalNum
                      warnValue: '' //告警阀值 非空且大于0时为设置告警
                    }
                )
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
          this.$request.post('/saasHbseller/actCommon/actAwdAdd', {
            actCode:this.actCode,
            id: item.id ,
            addValue: value
          }, false, res => {
            if (res.code === '200') {
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
        let params = [...this.hb,...this.hsb,...this.sw].map((item)=>{
          let i = {
            "actCode": this.actCode,
            "awdName": item.prizeName,
            "awdPic": item.awardPic,
            "awdType": item.awardType,
            "awdPr": item.probability,
            "awdValue": item.awardPrice || 0,
            "numTotal": item.totalNum
          }
          if(item.id){
            i.id = item.id
          }
          if(item.awardType == 3){
            i.awdValue = item.redMoney
          }
          if(item.awardType == 6){
            i.awdValue = item.integral
          }
          return i
        })
        console.log(params)
        this.$request.post('/saasHbseller/actCommon/actAwdSave', params, true, res => {
          if (res.code == '200') {
            this.getDetail()
            this.$message({type: 'success', message: '操作成功!'});
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      saveConf(){
        let params = {}
        params.hbsSignConf = {
          "contSignFlag": this.config.contSignFlag, //是否开启连续启动 1:开启 0:不开启
          "daySignPoints": this.config.daySignPoints//每天签到送的积分数量
        }
        params.actBaseInfoParam = {
          "actName": this.config.actName, //活动名称
          "actPicCode": this.config.actPicCode,
          "actRuleDesc":  this.config.actRuleDesc//活动规则
        }
        params.hbsSignContConfList = this.config.contSignFlag == 1 ? this.config.hbsSignContConfList : []
        console.log(params)
        this.$request.post('/saasHbseller/actSign/saveConf', params, true, res => {
          if (res.code == '200') {
            this.$message({type: 'success', message: '操作成功!'});
            this.getConfShow()
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      confirmSubmit() {
        this.$refs.actSetConfRef.validate(valid => {
          if(valid){
            this.$refs.signConfRef.validate(valid => {
              if(valid){
                this.saveConf()
              }
            })
          }
        })
      },
      saveDrawConf(){
        let params = {
          "drawFlag": this.config.drawFlag, //开关 1:打开 0:关闭。 关闭时候无需传递其它参数
          "drawStime": this.config.drawStime, //开始时间
          "drawEtime": this.config.drawEtime, //截止时间
          "drawContDays": this.config.drawContDays //需签到天数
        }
        console.log(params)
        this.$request.post('/saasHbseller/actSign/saveDrawConf', params, true, res => {
          if (res.code == '200') {
            this.$message({type: 'success', message: '操作成功!'});
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      confirmSubmitDrawConf(){
        this.$refs.drawConf.validate(valid => {
          if(valid){
            this.saveDrawConf()
          }
        })
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
.avatar-uploader-icon1 {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
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
  width: 300px;
  height: 64px;
  line-height: 64px;
  display: block;
}
.avatar-uploader2 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader2 .avatar {
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
