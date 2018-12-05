<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动基础设置
  -->
  <div class="actSetConf-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>基础设置</el-breadcrumb-item>
    </el-breadcrumb>   
    <el-card>
    	<el-steps :active="stepActive" finish-status="success"align-center class='step-style'v-show='form=="act-501"'>
			  <el-step title="基础设置"></el-step>
			  <el-step title="题目设置"></el-step>
			  <el-step title="投放设置"></el-step>
			</el-steps>
      <el-form ref="actSetConfRef" :model="confData" label-width="150px" :rules="confRules">
        <el-form-item label="活动名称" prop="actName">
          <el-input v-model="confData.actName" :maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="note">
          <el-input type="textarea" v-model="confData.note" :rows="3" resize="none"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="idx">
          <el-select v-model="confData.idx" placeholder="请选择">
            <el-option v-for="(val, key, index) in idxSelect" :key="index" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker v-model="actTime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动图片" prop="banner">
          <el-upload class="avatar-uploader" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
            <img v-if="confData.banner" :src="confData.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*270像素；格式png、jpg；大小不超过2M</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="活动说明" prop="desc">
          <quill-editor ref="myTextEditor" v-model="confData.actDesc" :options="editorOption" placeholder="请输入活动说明" @blur="onEditorBlur($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="答题时间" prop="quesTime"v-show='form=="act-501"'>
        	<el-radio v-model="extInfo.limited" :label="1">不限</el-radio>
  				<el-radio v-model="extInfo.limited" :label="2">总时间限<input v-model="extInfo.time" type='number'class='limited-time'@input='limitNum'/>秒</el-radio>
        </el-form-item>
        <el-form-item label="是否在落地页显示">
          <el-radio v-model="confData.showStatus" :label="1">是</el-radio>
          <el-radio v-model="confData.showStatus" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep">保存并进入下一步</el-button>
          <el-button @click="$router.push('/market/actTpl')">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  props: ['form', 'tplCode', 'id', 'clone'],
  components: {
    quillEditor
  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (this.actTime && this.actTime.length === 2) {
        callback()
      } else {
        callback(new Error('请选择活动时间'))
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
        idx: '',
        note: '',
        stimeStr: '',
        etimeStr: '',
        showStatus: 1,
        tplCode: '',
        extInfo:''
      },
      confRules: {
        actName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        note: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
        date: [{ required: true, validator: validateDate, trigger: 'change' }],
        idx: [{ required: true, validator: validateIdx, trigger: 'change' }],
        banner: [{ required: true, validator: validateBanner }],
        desc: [{ required: true, validator: validateDesc }]
      },
      actTime: [],
      uploadURL: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      stepActive:0,
    }
  },
  watch: {
    actTime: function(val) {
      if (val && val.length === 2) {
        this.confData.stimeStr = this.actTime[0]
        this.confData.etimeStr = this.actTime[1]
      } else {
        this.confData.stimeStr = ''
        this.confData.etimeStr = ''
      }
    }
  },
  created() {
    this.getDetail()
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
    getDetail() {
      if (!this.id) return
      this.$request.post('/api/saotx/act/detail', { id: this.id }, true, res => {
        if (res.ret == '200000') {
          if (this.clone == '1') {
            for (let key in this.confData) {
              this.confData[key] = res.data.act[key]
            }
            console.log(this.confData)
          } else {
            this.confData = res.data.act
          }
          this.confData.idx = this.confData.idx + ''
          this.actTime.push(this.confData.stimeStr)
          this.actTime.push(this.confData.etimeStr)
          return
        }
        this.$message.error(res.messgae)
      })
    },
    // 获取优先级
    getIdxSelect() {
      this.$request.post('/api/saotx/act/idxSelect', {}, true, res => {
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
        if(this.extInfo.limited==1){
        	if(this.extInfo.time<=0 || !this.extInfo.time){
        		 return this.$message.error('请填写时间限制的具体值!')
        	}
        }
        if (!this.id) {
          this.confData.form = this.form;
          this.confData.extInfo=JSON.stringify(this.extInfo);
          this.confData.tplCode = this.tplCode
        }
        this.$request.post('/api/saotx/act/saveOrModify', this.confData, true, res => {
          if (res.ret === '200000') {
            return this.$router.push(
              '/market/actTpl/quesActSetConf?id=' + res.data.id + '&actCode=' + res.data.actCode+'&form='+this.form
            )
          }
          this.$message.error(res.message)
        })
      })
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
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 108px;
  display: block;
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
</style>
