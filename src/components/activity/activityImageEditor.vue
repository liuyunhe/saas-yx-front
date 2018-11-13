<template>
    <div id="root">
        <el-card class="card">
            <div slot="header" class="header">
                <h3>编辑图片</h3>
            </div>
            <div v-if="type == 'normal'" class="edit normal-pic">
                <div class="edit-container">
                    <h4>编辑{{editData.name}}：</h4>
                    <div class="img-container">
                        <img :src="editData.url" alt="">
                    </div>
                    <el-upload action="/api/saotx/attach/commonAliUpload" class="upload">
                        <el-button type="primary" size="small" @click="onUploadClick(editData.index)">点击上传</el-button>
                    </el-upload>
                </div>
            </div>
            <div v-if="type == 'item'" class="edit item-pic">
                <div class="edit-container" v-for="(img, index) in editData" :key="index + img">
                    <h4>编辑{{img.name}}：</h4>
                    <div class="img-container">
                        <img :src="img.url" alt="">
                    </div>
                    <el-upload 
                    :action="uploadApi" 
                    :headers="headerObj" 
                    class="upload" 
                    :show-file-list="showFile" 
                    :on-success="uploadSuccess"
                    :on-error="uploadError">
                        <el-button type="primary" size="small" @click="onUploadClick(index)">点击上传</el-button>
                    </el-upload>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
  props: {
    editData: {
      type: [Object, Array]
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      uploadApi: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      showFile: false,
      editIndex: ""
    };
  },
  created() {},
  methods: {
      uploadSuccess (res, file, fileList) {
        let url = res.data.accessUrl;
        console.log(file)
      },
      uploadError (err) {
          console.log(err)
          alert('图片上传失败')
      },
      onUploadClick (e) {
          this.editIndex = e;
      }
  }
};
</script>
<style lang="scss">
#root {
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
        width: 200px;
        height: 140px;
        text-align: center;
        border: 1px solid rgb(223, 223, 223);
        line-height: 140px;
        margin-left: 20px;
        & > img {
          max-width: 90%;
          max-height: 90%;
          vertical-align: middle;
        }
      }
      .upload {
        display: inline-block;
        vertical-align: bottom;
        margin-left: 20px;
      }
    }
  }
}
</style>

