<template>
  <el-form ref="baseConfRef" :model="form" label-width="140px" :rules="confRules">
    <el-form-item label="活动名称：" prop="activityName">
      <el-input v-model="form.activityName" :maxlength="15"></el-input>
    </el-form-item>
    <el-form-item label="活动描述：" prop="activityDec">
      <el-input class="textarea" type="textarea" v-model="form.activityDec" :rows="3" resize="none"></el-input>
    </el-form-item>
    <el-form-item label="优先级：" prop="idx">
      <el-select v-model="form.idx" placeholder="请选择">
        <el-option v-for="item in idxSelect" :key="item.idx" :label="item.name" :value="item.idx">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间：" prop="date">
      <!-- <el-date-picker v-model="actTime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker> -->
      <el-date-picker v-model="form.stimeStr" value-format="yyyy-MM-dd HH:mm" :disabled="timeDisable" type="datetime" placeholder="选择开始时间"></el-date-picker>
      至
      <el-date-picker v-model="form.etimeStr" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择结束时间"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动图片：" prop="banner">
      <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :on-error="upBannerImgErr" :show-file-list="false">
        <img v-if="form.activityEntrance" :src="form.activityEntrance" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*270像素；格式png、jpg；大小不超过2M</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="活动说明：" prop="desc">
      <quill-editor ref="myTextEditor" v-model="form.activityDoc" :options="editorOption" placeholder="请输入活动说明" @blur="onEditorBlur($event)">
      </quill-editor>
    </el-form-item>
    <el-form-item label="是否在落地页显示">
      <el-radio v-model="form.showStatus" :label="1">是</el-radio>
      <el-radio v-model="form.showStatus" :label="0">否</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="nextStep">保存并进入下一步</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (!this.form.stimeStr || !this.form.etimeStr) {
        callback(new Error('请选择活动时间'))
      } else if (this.form.stimeStr >= this.form.etimeStr){
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
      if (!this.form.activityEntrance) {
        callback(new Error('请选择活动图片'))
      } else {
        callback()
      }
    }
    var validateDesc = (rule, value, callback) => {
      if (!this.form.activityDoc) {
        callback(new Error('请输入活动说明'))
      } else {
        callback()
      }
    }
    return {
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
      active: 0,
      value1: '',
      value2: '',
      form: {
        activityCode: '', 
        activityName: '',
        stimeStr: '',
        etimeStr: '',
        activityDec: '',
        activityForm: 'act-12', // 会员日
        activityEntrance: '',
        idx: '',
        activityDoc: '',
        showStatus: 1
      },
      backupsForm: {},
      idxSelect: [
        { name: '高', idx: 500 },
        { name: '中', idx: 300 },
        { name: '低', idx: 100 },
      ],
      confRules: {
        activityName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activityDec: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
        date: [{ required: true, validator: validateDate, trigger: 'change' }],
        idx: [{ required: true, validator: validateIdx, trigger: 'change' }],
        banner: [{ required: true, validator: validateBanner }],
        desc: [{ required: true, validator: validateDesc }]
      },
      // actTime: [],
      timeDisable: false,
      uploadURL: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId'),
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      }
    }
  },
  // watch: {
  //   actTime: function(val) {
  //     if (val && val.length === 2) {
  //       this.form.stimeStr = this.actTime[0]
  //       this.form.etimeStr = this.actTime[1]
  //     } else {
  //       this.form.stimeStr = ''
  //       this.form.etimeStr = ''
  //     }
  //   },
  // },
  created() {
    this.getActData()
  },
  methods: {
    // 获取活动数据
    getActData() {
      this.$request.post('/api/wiseqr/md/queryBase', {}, true, res => {
        if (res.ret === '200000') {
          this.form = res.data
          this.backupsForm = JSON.parse(JSON.stringify(res.data))
          if (this.form.stimeStr) {
            this.handleDisableTime()
          }
          // this.actTime.push(this.form.stimeStr)
          // this.actTime.push(this.form.etimeStr)
        }
      })
    },
    handleDisableTime() {
      let newTime = new Date().getTime(),
          stime = new Date(this.form.stimeStr).getTime()
          if (newTime >= stime) {
            this.timeDisable = true
          }
    },
    // 上传活动图片
    upBannerImg(resule) {
      if (resule.ret === '200000') {
        this.form.activityEntrance = resule.data.accessUrl
        this.$refs.baseConfRef.validateField('banner', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
    upBannerImgErr(err) {
      this.$message.error('上传图片失败, 请重试!')
    },
    // 富文本框失焦
    onEditorBlur() {
      this.$refs.baseConfRef.validateField('desc', valid => {})
    },
    nextStep() {
      if (JSON.stringify(this.form) === JSON.stringify(this.backupsForm)) {
        this.$emit('nextStep', this.form.activityCode)
      } else {
        this.$refs.baseConfRef.validate(valid => {
          if (!valid) return this.$message.error('请完善表单数据!')
          this.$request.post('/api//saotx/md/somBase', this.form, true, res => {
            if (res.ret === '200000') return this.$emit('nextStep', this.form.activityCode)
            this.$message.error(res.message)
          })
        })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 600px;
  margin: 40px auto;
}
.el-input {
  width: 300px;
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

.textarea /deep/ .el-textarea__inner{
  width: 300px;
 font-family:"Microsoft" !important;
}
.el-date-editor {
  width: 210px;
}
</style>

