<template>
  <!--
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动基础设置
  -->
  <div class="actSetConf-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-show='form!="act-501"'>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>基础设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    	<el-steps :active="stepActive" finish-status="success" align-center class='step-style' v-show='form=="act-501"'>
			  <el-step title="基础设置"></el-step>
			  <el-step title="题目设置"></el-step>
			  <el-step title="投放设置"></el-step>
			</el-steps>
      <el-form ref="actSetConfRef" :model="confData" label-width="150px" :rules="confRules">
        <el-form-item label="活动名称：" prop="actName">
          <el-input v-model="confData.actName" maxLength='15' placeholder='请输入活动名称，15字以内'></el-input>
        </el-form-item>
        <el-form-item label="活动描述：" prop="note">
          <el-input type="textarea" v-model="confData.note" :rows="3" resize="none" maxLength='15' placeholder='请输入活动描述，15字以内'></el-input>
        </el-form-item>
        <el-form-item label="优先级：" prop="idx" v-if="form != 'act-301'">
          <el-select v-model="confData.idx" placeholder="请选择">
            <el-option v-for="(val, key, index) in idxSelect" :key="index" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否投放销区活动：" v-if="isAllSaleZone == 1" >
          <el-switch
              v-model="showSaleZone"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="id ? true : false"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="销区：" prop="saleZoneCode" v-if="showSaleZone" >
          <el-select size="small" v-model="confData.saleZoneCode" @change="handleChangeSaleZone" :disabled="id ? true : false" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动标签：" prop="actTag" >
          <el-radio v-for="(item,index) in actTagGroup" :key="index" :disabled="id ? true : false" v-model="confData.actTag" :label="item.id" @click.native.prevent="changeRadio(item.id)">{{ item.name }}</el-radio>
          <span v-if="showNoneActTag">无</span>
          <div class="">(非销区活动时为非必选项)</div>
        </el-form-item>

        <el-form-item label="活动时间：" prop="date">
          <!-- <el-date-picker v-model="actTime" :time-arrow-control="true" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
          <el-date-picker v-model="confData.stimeStr" :disabled="timeDisable" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
          至
          <el-date-picker v-model="confData.etimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" :picker-options="pickerOptions"></el-date-picker>
          （提示：配置跨季度销区活动，需拆分活动时间配置2个相同活动）
        </el-form-item>
        <!-- 常规图片上传 -->
        <el-form-item label="活动图片：" prop="banner" v-if="form !== 'act-301'">
          <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
            <img v-if="confData.banner" :src="confData.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*160像素；格式png、jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <!-- 红包雨图片上传 -->
        <el-form-item label="活动图片：" prop="banner" v-else>
          <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
            <img v-if="confData.banner" :src="confData.banner" class="avatar red-packet">
            <i v-else class="el-icon-plus avatar-uploader-icon red-packet"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：200像素*200像素；格式png、jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动弹窗：" prop=" popInfo">
          <el-upload class="avatar-uploader-popup" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upPopInfoImg" :show-file-list="false">
            <img v-if="confData.popInfo" :src="confData.popInfo" class="avatar-popup">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：600像素*700像素；格式png、jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="form == 'act-301'" label="参与次数：" prop="number">
          每人每场可参与
          <el-input-number v-model="redConf.joinNum" :precision="0" :min="1" controls-position="right"></el-input-number>
          次
        </el-form-item>
        <el-form-item label="是否开启引流：" >
          <el-switch
              v-model="jumpConf.jump"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="跳转地址：" prop="jumpUrl" v-if="jumpConf.jump == 1">
          <el-input v-model="jumpConf.jumpUrl"  placeholder='请输入跳转地址'></el-input>
        </el-form-item>
        <el-form-item label="引流弹框图：" v-if="jumpConf.jump == 1">
          <el-upload class="avatar-uploader-popup" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upPopJumpImg" :show-file-list="false">
            <img v-if="jumpConf.jumpImg" :src="jumpConf.jumpImg" class="avatar-popup">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：600像素*700像素；格式png、jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="shareAct[form]" label="分享设置：" prop="isShare">
          <el-radio v-model="redConf.share" :label="1">开启分享</el-radio>
          <el-radio v-model="redConf.share" :label="0">关闭分享</el-radio>
        </el-form-item>
        <el-form-item label="活动说明：" prop="desc">
          <quill-editor ref="myTextEditor" v-model="confData.actDesc" :options="editorOption" placeholder="请输入活动说明，300字以内" @blur="onEditorBlur($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="答题时间：" prop="quesTime" v-if='form=="act-501"'>
        	<el-radio v-model="extInfo.limited" :label="1">不限</el-radio>
  				<el-radio v-model="extInfo.limited" :label="2">总时间限<input v-model="extInfo.time" type='number' class='limited-time' @input='limitNum'/>秒</el-radio>
        </el-form-item>
        <!-- <el-form-item label="是否在落地页显示：">
          <el-radio v-model="confData.showStatus" :label="1">是</el-radio>
          <el-radio v-model="confData.showStatus" :label="0">否</el-radio>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="nextStep">保存并进入下一步</el-button>
          <el-button @click="back">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import Config from '@/pages/Market/datas/conf'
export default {
  props: ['form', 'tplCode', 'id', 'clone'],
  components: {
    quillEditor
  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (!this.confData.stimeStr || !this.confData.etimeStr) {
        callback(new Error('请选择活动时间'))
      } else if (this.confData.stimeStr >= this.confData.etimeStr){
        callback(new Error('开始时间必须小于结束时间'))
      } else if(this.confData.saleZoneFlag) {
        let month = new Date(this.confData.stimeStr).getMonth()
        let year = new Date(this.confData.stimeStr).getFullYear()
        if(month < 3){
          if(new Date(this.confData.etimeStr).getTime() > new Date(`${year}-04-01 00:00:00`)){
            callback(new Error('配置销区活动时间不支持跨季度'))
          }else {
            callback()
          }
        }else if(month >= 3 && month < 6 ) {
          if(new Date(this.confData.etimeStr).getTime() > new Date(`${year}-07-01 00:00:00`)){
            callback(new Error('配置销区活动时间不支持跨季度'))
          }else {
            callback()
          }
        }else if(month >= 6 && month < 9 ) {
          if(new Date(this.confData.etimeStr).getTime() > new Date(`${year}-10-01 00:00:00`)){
            callback(new Error('配置销区活动时间不支持跨季度'))
          }else {
            callback()
          }
        }else if(month >= 9 ) {
          if(new Date(this.confData.etimeStr).getTime() > new Date(`${year+1}-01-01 00:00:00`)){
            callback(new Error('配置销区活动时间不支持跨季度'))
          }else {
            callback()
          }
        }
      }
      else {
        callback()
      }
    }
    var validateActTag = (rule, value, callback) =>{
      if(this.confData.saleZoneCode){
        if(value == null){
          callback(new Error('请选择活动标签'))
        }else {
          callback()
        }
      }else {
        callback()
      }
    }
    var validateIdx = (rule, value, callback) => {
      if (value == '0') {
        callback(new Error('请选择活动优先级'))
      } else {
        callback()
      }
    }
    var validateBanner = (rule, value, callback) => {
      if (!this.confData.banner) {
        callback(new Error('请选择活动图片'))
      } else {
        callback()
      }
    }
    var validateDesc = (rule, value, callback) => {
      if (!this.confData.actDesc) {
        callback(new Error('请输入活动说明'))
      } else {
        callback()
      }
    }
    var valideShare = (rules, value, callback) => {
      callback()
    }
    var valideNumber = (rules, value, callback) => {
      if (this.redConf.joinNum) {
        callback()
      } else {
        callback(new Error('请输入参与次数'))
      }
    }
    var valideJumpUrl = (rules, value, callback) => {
      if (this.jumpConf.jumpUrl) {
        callback()
      } else {
        callback(new Error('请输入跳转地址'))
      }
    }
    return {
      isAllSaleZone: sessionStorage.isAllSaleZone,
      showSaleZone:true,
      showYL:true,
      showNoneActTag:false,
      pickerOptions: {},
      // 富文本设置
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
      extInfo:{
      	limited:1,
      	time:60
      },
      idxSelect: {},
      confData: {
        actTag: null,
        actDesc: '',
        actName: '',
        banner: '',
        popInfo:'',
        form: '',
        idx: '1',
        note: '',
        stimeStr: '',
        etimeStr: '',
        showStatus: 1,
        tplCode: '',
        extInfo: '',
        number: '',
        status:'',
        saleZoneFlag:1,
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      },
      saleZone:[],
      actTagGroup:[],
      redConf: {
        joinNum: 1,
        share: 0
      },
      jumpConf:{
        jump: 1,   // 0:不跳转，1:跳转。如果不跳转，则不需要后面两个字段。
        jumpUrl: "", // 跳转地址
        jumpImg: "" // 图片地址
      },
      confRules: {
        actName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        note: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
        saleZoneCode: [{ required: true, message: '请选择销区', trigger: 'change' }],
        actTag: [{ required: true, validator:validateActTag, trigger: 'change' }],
        date: [{ required: true, validator: validateDate, trigger: 'change' }],
        idx: [{ required: true, validator: validateIdx, trigger: 'change' }],
        banner: [{ required: true, validator: validateBanner }],
        desc: [{ required: true, validator: validateDesc }],
        number: [{ required: true, validator: valideNumber }],
        isShare: [{ required: true, validator: valideShare }],
        jumpUrl: [{ required: true, validator: valideJumpUrl, trigger: 'blur' }],
      },
      // actTime: [],
      timeDisable: false,
      uploadURL: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      stepActive:0,
      shareAct: {
        'act-701': 1,
        'act-702': 1,
        'act-703': 1,
        'act-704': 1,
        'act-705': 1,
        'act-301': 1,
        'act-111': 1,
        'act-112': 1,
        'act-113': 1,
      },
      noShareAct:{
        'act-100': 1,
        'act-101': 1,
        'act-102': 1,
        'act-103': 1,
        'act-104': 1,
      }
    }
  },
  // watch: {
  //   actTime: function(val) {
  //     if (val && val.length === 2) {
  //       this.confData.stimeStr = this.actTime[0]
  //       this.confData.etimeStr = this.actTime[1]
  //     } else {
  //       this.confData.stimeStr = ''
  //       this.confData.etimeStr = ''
  //     }
  //   }
  // },
  created() {

  },
  watch:{
    showSaleZone(n,o){
      if(!n){
        this.confData.saleZoneCode = null
        this.confData.saleZoneFlag = 0
        this.getActTag()
      }else {
        this.confData.saleZoneFlag = 1
      }
    }
  },
  mounted() {
    if (!this.id) {
      this.confData.banner = Config.banner[this.form]
      this.getActTag()
    } else {
      const loading = this.$loading({
        target: '.actSetConf-container'
      })
      this.getDetail(() => loading.close())
    }
    this.getIdxSelect()
    this.getSaleZone()

  },
  methods: {
    changeRadio(val) {
      this.confData.actTag= this.confData.actTag== val ? null : val
      // this.radioKey= ! this.radioKey
    },
      getSaleZone() {
        this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
          if (res.code == '200') {
            this.saleZone = res.data || []
          }
        })
      },
      getActTag() {
        if(!this.id){
          this.$request.post('/api/actTag/query/saleZoneTag', {saleZoneCode:this.confData.saleZoneCode}, false, (res) => {
            if (res.code == '200') {
              this.actTagGroup = res.data.tagList || []
            }
          })
        }else {
          this.$request.post('/api/actTag/query/saleZoneTag', {saleZoneCode:null}, false, (res) => {
            if (res.code == '200') {
              let actTag = res.data.tagList.find((item)=>{
                return item.id == this.confData.actTag
              })
              if(actTag){
                this.actTagGroup = [actTag]
              }else {
                this.actTagGroup = []
              }
            }
          })
        }

      },
      handleChangeSaleZone(code){
        this.confData.actTag = null
          this.getActTag()
      },
     datetime_to_unix(datetime){
        var tmp_datetime = datetime.replace(/:/g,'-');
        tmp_datetime = tmp_datetime.replace(/ /g,'-');
        var arr = tmp_datetime.split("-");
        var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
        return parseInt(now.getTime());
    },
    limitNum(){
  		var len=4;
  		if(this.extInfo.time.length>len){
  			var str=this.extInfo.time.slice(0,len);
  			this.extInfo.time=parseInt(str);
  		}

  	},
    getDetail(callback) {
      this.$request.post('/api/wiseqr/act/detail', { id: this.id }, true, res => {
        if (res.ret == '200000') {
          if (this.clone == '1') {
            for (let key in this.confData) {
              this.confData[key] = res.data.act[key]
              if(this.confData.etimeStr){
                // 复制的时候结束日期不能小于当前时间
                if(this.datetime_to_unix(this.confData.etimeStr)<Date.now()){
                console.log(Date.now()>Date.parse(new Date(this.confData.etimeStr)))
                  this.confData.etimeStr = ''

                }
              }
              this.pickerOptions = {
                disabledDate(time) {
                  return time.getTime() <= Date.now();
                },
              }
            }
          } else {
            this.confData = res.data.act
          }
          if(!res.data.act.saleZoneFlag){
            this.showSaleZone = false
          }
          if (this.shareAct[this.form]) this.redConf = this.confData.extInfo?JSON.parse(this.confData.extInfo):''
          this.confData.idx = this.confData.idx + ''
          if (this.redConf.extInfo) this.extInfo=this.confData.extInfo?JSON.parse(this.confData.extInfo):''
          if (this.confData.stimeStr && this.confData.etimeStr) {
            this.handleDisableTime()
          }
          if(this.form == 'act-501'){
            this.extInfo=this.confData.extInfo?JSON.parse(this.confData.extInfo):{limited:1, time:60}
          }
          this.jumpConf  = this.confData.extInfo?JSON.parse(this.confData.extInfo):{
            jump: 1,   // 0:不跳转，1:跳转。如果不跳转，则不需要后面两个字段。
            jumpUrl: "", // 跳转地址
            jumpImg: "" // 图片地址
          },
          // this.actTime.push(this.confData.stimeStr)
          // this.actTime.push(this.confData.etimeStr)
          this.getActTag()
          if(!this.confData.actTag){
            this.showNoneActTag = true
          }
          callback && callback()
          return
        }
        callback && callback()
        this.$message.error(res.message)
      })
    },
    handleDisableTime() {
      let newTime = new Date().getTime(),
        stime = new Date(this.confData.stimeStr).getTime()
        if (newTime >= stime && this.confData.status == 1) {    //1-进行中，2-未发布，4-已结束，

          this.timeDisable = true
        }
        if(this.clone == '1'){
          this.timeDisable = false
        }
    },
    // 获取优先级
    getIdxSelect() {
      this.$request.post('/api/wiseqr/act/idxSelect', {}, true, res => {
        if (res.ret === '200000') return this.idxSelect = res.data
      })
    },
    // 上传活动图片
    upBannerImg(resule) {
      if (resule.ret === '200000') {
        this.confData.banner = resule.data.accessUrl
        this.$refs.actSetConfRef.validateField('banner', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
    upPopInfoImg(resule) {
      if (resule.ret === '200000') {
        this.confData.popInfo = resule.data.accessUrl
        // this.$refs.actSetConfRef.validateField('banner', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
    upPopJumpImg(resule) {
      if (resule.ret === '200000') {
        this.jumpConf.jumpImg = resule.data.accessUrl
        // this.$refs.actSetConfRef.validateField('banner', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
    // 富文本框失焦
    onEditorBlur() {
      this.$refs.actSetConfRef.validateField('desc', valid => {})
    },
    nextStep() {
      this.$refs.actSetConfRef.validate(valid => {
        if (!valid) return this.$message.error('请完善表单数据!')
        if(this.form=='act-501'){
        	if(this.extInfo.limited==1){
	        	if(this.extInfo.time<=0 || !this.extInfo.time){
	        		 return this.$message.error('请填写时间限制的具体值!')
	        	}
	        }
        }
        let jumpConf
        if(this.jumpConf.jump == 1){
          jumpConf = this.jumpConf
        }else {
          jumpConf = {
            jump : 0,
            jumpUrl: "", // 跳转地址
            jumpImg: "" // 图片地址
          }
        }
        if (!this.id) {
          this.confData.form = this.form;
          if(this.form=='act-501'){
          	this.confData.extInfo=JSON.stringify(Object.assign(this.extInfo,jumpConf));
          }
          this.confData.tplCode = this.tplCode
        }else {
        	if(this.form=='act-501'){
          	this.confData.extInfo=JSON.stringify(Object.assign(this.extInfo,jumpConf));
          }
        }
        if (this.shareAct[this.form]) this.confData.extInfo = JSON.stringify(Object.assign(this.redConf,jumpConf))
        if (this.noShareAct[this.form]) this.confData.extInfo = JSON.stringify(Object.assign(jumpConf))
        this.$request.post('/api/wiseqr/act/saveOrModify', this.confData, true, res => {
          if (res.ret === '200000') {
          	if(this.form=='act-501'){
          		return this.$router.push(
              '/market/actTpl/quesActSetConf?id=' + res.data.id + '&actCode=' + res.data.actCode+'&form='+this.form
            	)
          	} else if (this.form=='act-301') {
              return this.$router.push(`/market/actTpl/redPut?id=${res.data.id}&actCode=${res.data.actCode}`)
            } else {
          		return this.$router.push(
              '/market/actTpl/actPutConf?id=' + res.data.id + '&actCode=' + res.data.actCode+'&form='+this.form
            	)
          	}

          }
          this.$message.error(res.message)
        })
      })
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
    back() {
      if (this.id) {
        this.$router.back()
      } else {
        this.$router.push('/market/actTpl')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input,
.el-textarea {
  width: 300px;
}
.step-style {
	margin-bottom: 40px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  &.red-packet {
    width: 100px;
    height: 100px;
    line-height: 100px
  }
}
.avatar {
  width: 300px;
  height: 64px;
  display: block;
  &.red-packet {
     width: 100px;
    height: 100px;
    line-height: 100px
  }
}
.avatar-uploader-popup{
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 140px;
    line-height: 140px;
    text-align: center;
    &.red-packet {
      width: 100px;
      height: 100px;
      line-height: 100px
    }
  }
}

.avatar-popup {
  width: 120px;
  height: 140px;
  display: block;
  &.red-packet {
     width: 100px;
    height: 100px;
    line-height: 100px
  }
}
.quill-editor {
  width: 420px;
}
.limited-time {
	width:60px;
	margin-left: 10px;
	margin-right: 10px;
	height: 24px;
	border-radius: 4px;
	border:none;
	border:1px solid #ccc;
}
.el-date-editor {
  width: 210px;
}
</style>
