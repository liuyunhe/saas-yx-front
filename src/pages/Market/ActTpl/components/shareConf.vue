<template>
  <div class="edit-share">
    <el-card class="card">
      <div slot="header" class="header">
        <h3>编辑图片</h3>
      </div>
      <el-form label-width="100px">
        <el-form-item label="分享标题：">
          <el-input v-model="shareConf.shareTitle" type="text" :maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="分享说明：">
          <el-input maxlength="30" v-model="shareConf.shareDesc" style="width: 70%;" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="分享图标：">
          <div>
            <div class="img">
              <img :src="editData[0].url">
            </div>
            <el-upload 
            :action="uploadApi" 
            :headers="headerObj" 
            class="upload" 
            :show-file-list="false" 
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError">
              <el-button type="primary" size="small">更换图片</el-button>
            </el-upload>
            <div slot="tip" class="el-upload__tip">* 图片建议尺寸为 91*91px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['editData', 'shareConf'],
  data() {
    return {
      uploadApi: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
    }
  },
  created() {
    // console.log(this.editData[0])
  },
  methods: {
    uploadSuccess (res, file, fileList) {
      let that = this;
      let url = res.data.accessUrl;
      this.editData[0].url = url
      that.$emit('shareChange', {url: url});
    },
    uploadError (err) {
        let that = this;
        alert('图片上传失败')
    },
    beforeAvatarUpload(file) {
      const IMGTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif'
      if (!IMGTYPE) {
        this.$message.error('上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!')
      }
      return IMGTYPE
    },
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 40px;
  .header {
    & h3 {
      margin: 0;
    }
  }
}
.el-card /deep/ .el-card__header {
  background: rgba($color: #f3f3f3, $alpha: 1);
}
.el-input {
  width: 70%;
}
.img {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  img {
    position: absolute;
    top:50%; 
    left:50%;
    transform: translate(-50%,-50%);
    max-width: 90%;
    max-height: 90%;
  }
}
.upload {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 20px;
}
</style>
