<template>
  <div class="container">
    <el-card>
       <el-form ref="prizeConfRef" :model="form" label-width="100px" :rules="confRules">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="form.name" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="礼品分类" prop="subType" v-if="params.type == 2">
            <el-select v-model="form.subType" placeholder="请选择分类">
              <el-option label="翻倍卡" :value="202"></el-option>
              <el-option label="折扣卡" :value="201"></el-option> 
            </el-select>
          </el-form-item>
          <el-form-item label="活动图片" prop="icon">
            <el-upload class="avatar-uploader" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
              <img v-if="form.icon" :src="form.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：360像素*270像素；格式png、jpg；大小不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="翻倍倍数" prop="value" v-if="params.type == 2 && form.subType == 202">
            <el-input-number controls-position="right" :min="0" :max="10" :precision="0" v-model="form.value"></el-input-number> 倍
            <!-- <el-input style="width: 100px;" v-model="form.value"></el-input> 倍 -->
          </el-form-item>
          <el-form-item label="折扣值" prop="value" v-if="params.type == 2 && form.subType == 201">
            <el-input-number controls-position="right" :min="0.00" :max="1.00" :precision="2" :step="0.1" v-model="form.value"></el-input-number> 折
          </el-form-item>
          <el-form-item label="红包面额" prop="value" v-if="params.type == 3">
            <el-input-number controls-position="right" :min="0.00" :precision="2" v-model="form.value"></el-input-number> 元
          </el-form-item>
          <el-form-item label="积分面额" prop="value" v-if="params.type == 6">
            <el-input-number controls-position="right" :min="0" :precision="0" v-model="form.value"></el-input-number> 分
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input type="textarea" v-model="form.note" :rows="3" resize="none"></el-input>
          </el-form-item>
          <el-form-item class="mt20">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button plain @click="goBack">取消</el-button>
          </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  // props: ['type', 'detailId'],
  props: ['params'],
  data() {
    var validateBanner = (rule, value, callback) => {
      if (!this.form.icon) {
        callback(new Error('请选择活动图片'))
      } else {
        callback()
      }
    }
    return {
      form: {
        id: this.params.id,
        type: this.params.type,
        subType: 202,
        name: '',
        icon: '',
        value: 0,
        note: ''
      },
      confRules: {
        subType: [{ required: true, message: '请选择礼品分类', trigger: 'blur' }],
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        value: [{ required: true, message: '请输入数值', trigger: 'blur' }],
        icon: [{ required: true, validator: validateBanner }]
      },
      uploadURL: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId'),
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      detailData: {}
    }
  },
  created () {
    this.prizeDetail()
    console.log(this.params.type)
    console.log(this.params.id)
  },
  methods: {
    prizeDetail() {
      if (this.params.id) {
        this.$request.post('/api/saotx/md/detailMaterial', { id: this.params.id }, true, res => {
          if (res.ret === '200000') {
            this.form = res.data
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    save() {
      if (this.params.type != 2) {
        this.form.subType = ''
      }
      this.$refs.prizeConfRef.validate(valid => {
        if (!valid) return this.$message.error('请完善表单数据!')
        this.$request.post('/api/saotx/md/somMaterial', this.form, true, res => {
          if (res.ret === '200000') {
            if (this.params.id) {
              this.$message.success('修改成功')
            } else {
              this.$message.success('添加成功')
            }
            this.$router.push('/memberday/material/prizeList?type=' + this.params.type)
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    goBack() {
      this.$router.push('/memberday/material/prizeList?type=' + this.params.type)
    },
    upBannerImg(resule) {
      if (resule.ret === '200000') {
        this.form.icon = resule.data.accessUrl
        this.$refs.prizeConfRef.validateField('icon', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 500px;
  margin: 20px
}
.el-input {
  width: 300px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 108px;
  display: block;
}
.quill-editor {
  width: 420px;
}
</style>
