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
          <el-input v-model="shareConf.shareDesc" style="width: 70%;" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="分享图标：">
          <div class="img">
            <img :src="editData[0].url">
          </div>
          <el-upload 
          :action="uploadApi" 
          :headers="headerObj" 
          class="upload" 
          :show-file-list="false" 
          :on-success="uploadSuccess"
          :on-error="uploadError">
            <el-button type="primary" size="small">点击上传</el-button>
          </el-upload>
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
      uploadApi: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
    }
  },
  methods: {
    uploadSuccess (res, file, fileList) {
      let that = this;
      let url = res.data.accessUrl;
      that.$emit('shareChange', {url: url});
    },
    uploadError (err) {
        let that = this;
        alert('图片上传失败')
    }
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
  width: 114px;
  height: 102px;
  line-height: 102px;
  text-align: center;
  border: 1px solid rgb(223, 223, 223);
  img {
    width: 74px;
    height: 74px;
    vertical-align: middle;
  }
}
.upload {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 20px;
}
</style>
