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
        <el-form-item label="活动时间：" prop="date">
          <!-- <el-date-picker v-model="actTime" :time-arrow-control="true" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
          <el-date-picker v-model="confData.stimeStr" :disabled="timeDisable" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
          至
          <el-date-picker v-model="confData.etimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
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
        <el-form-item v-if="form == 'act-301'" label="参与次数：" prop="number">
          每人每场可参与
          <el-input-number v-model="redConf.joinNum" :precision="0" :min="1" controls-position="right"></el-input-number>
          次
        </el-form-item>
        <el-form-item v-if="shareAct[form]" label="分享设置：" prop="isShare">
          <el-radio v-model="redConf.share" :label="1">开启分享</el-radio>
          <el-radio v-model="redConf.share" :label="0">关闭分享</el-radio>
        </el-form-item>
        <el-form-item label="活动说明：" prop="desc">
          <quill-editor ref="myTextEditor" v-model="confData.actDesc" :options="editorOption" placeholder="请输入活动说明，300字以内" @blur="onEditorBlur($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="答题时间：" prop="quesTime" v-show='form=="act-501"'>
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
      } else {
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
    return {
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
        actDesc: '',
        actName: '',
        banner: '',
        form: '',
        idx: '1',
        note: '',
        stimeStr: '',
        etimeStr: '',
        showStatus: 1,
        tplCode: '',
        extInfo: '',
        number: ''
      },
      redConf: {
        joinNum: 1,
        share: 0
      },
      confRules: {
        actName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        note: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
        date: [{ required: true, validator: validateDate, trigger: 'change' }],
        idx: [{ required: true, validator: validateIdx, trigger: 'change' }],
        banner: [{ required: true, validator: validateBanner }],
        desc: [{ required: true, validator: validateDesc }],
        number: [{ required: true, validator: valideNumber }],
        isShare: [{ required: true, validator: valideShare }]
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
        'act-301': 1
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
  mounted() {
    if (!this.id) {
      this.confData.banner = Config.banner[this.form]
    } else {
      const loading = this.$loading({
        target: '.actSetConf-container'
      })
      this.getDetail(() => loading.close())
    }
    this.getIdxSelect()
  },
  methods: {
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
            }
          } else {
            this.confData = res.data.act
          }
          if (this.shareAct[this.form]) this.redConf = JSON.parse(this.confData.extInfo)
          this.confData.idx = this.confData.idx + ''
          if (this.redConf.extInfo) this.extInfo=JSON.parse(this.confData.extInfo)
          if (this.confData.stimeStr && this.confData.etimeStr) {
            this.handleDisableTime()
          }
          // this.actTime.push(this.confData.stimeStr)
          // this.actTime.push(this.confData.etimeStr)
          callback && callback()
          return
        }
        this.$message.error(res.messgae)
      })
    },
    handleDisableTime() {
      let newTime = new Date().getTime(),
        stime = new Date(this.confData.stimeStr).getTime()
        if (newTime >= stime) {
          this.timeDisable = true
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
        if (!this.id) {
          this.confData.form = this.form;
          if(this.form=='act-501'){
          	this.confData.extInfo=JSON.stringify(this.extInfo);
          }         
          this.confData.tplCode = this.tplCode
        }else {
        	if(this.form=='act-501'){
          	this.confData.extInfo=JSON.stringify(this.extInfo);
          } 
        }
        if (this.shareAct[this.form]) this.confData.extInfo = JSON.stringify(this.redConf)
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
              '/market/actTpl/actPutConf?id=' + res.data.id + '&actCode=' + res.data.actCode
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
