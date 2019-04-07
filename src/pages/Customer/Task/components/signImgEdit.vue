<template>
  <div class="content">
    <el-card class="card" v-if="imgObj">
      <div slot="header" class="header">
          <h3>编辑图片</h3>
      </div>
      <div class="edit">
        <div class="edit-container" v-for="(item, index) in imgObj" :key="index">
          <div v-if="item.type == type">
            <h4>编辑{{item.name}}：</h4>
            <div class="img-container">
                <img :src="item.url" alt="">
            </div>
            <el-upload 
            :action="uploadApi" 
            :headers="headerObj" 
            class="upload" 
            :show-file-list="showFile" 
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError">
              <el-button type="primary" size="small" @click="onUploadClick(item.index)">点击上传</el-button>
            </el-upload>
            <div slot="tip" class="el-upload__tip">* 图片建议尺寸为 {{item.size[0]}}*{{item.size[1]}}px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
          </div>
        </div>
        <div class="edit-container" v-if="type == 3">
          <h4>编辑日期背景：</h4>
          <div class="img-container">
            <el-color-picker v-model="color.background" show-alpha></el-color-picker>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    imgObj: {
      type: Object,
      required: true
    },
    type: {
      default: 1
    },
    color: {
      required: true
    }
  },
  data() {
    return {
      uploadApi: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      showFile: false,
      editIndex: ""
    }
  },
  methods: {
    uploadSuccess (res, file, fileList) {
      let that = this;
      let url = res.data.accessUrl;
      that.$emit('picChange', {url: url, index: that.editIndex});
    },
    uploadError (err) {
        let that = this;
        console.log(err)
        alert('图片上传失败')
    },
    onUploadClick (index) {
        let that = this;
        that.editIndex = index;
        // console.log(that.editIndex)
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
.card {
  margin-top: 40px;
  .el-card__header {
    background: rgba($color: #f3f3f3, $alpha: 1);
  }
  .header {
    & h3 {
      margin: 0;
    }
  }
  .edit-container {
    margin-top: 20px;
    & h4 {
      display: inline-block;
      vertical-align: top;
    }
    .img-container {
      display: inline-block;
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      margin: 0 10px;
      & > img {
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
  }
}
.el-color-picker {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
}
.el-color-picker /deep/  .el-color-picker__trigger {
    width: 100%;
    height: 100%;
  }
</style>
