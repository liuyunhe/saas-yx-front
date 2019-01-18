<template>
    <div id="root">
        <el-card class="card" v-if="editData">
            <div slot="header" class="header">
                <h3>编辑图片</h3>
            </div>
            <div v-if="type == 'normal' || (type == 'item' &&itemRepeat) || type == 'common'" class="edit normal-pic">
                <div class="edit-container" v-for="(img, index) in editData" :key="index + img">
                    <h4>编辑{{img.name}}：</h4>
                    <div class="img-container">
                        <img :src="img.url + '?v=1.1'" alt="">
                    </div>
                    <el-upload 
                    :action="uploadApi" 
                    :headers="headerObj" 
                    class="upload" 
                    :show-file-list="showFile" 
                    :on-success="uploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-error="uploadError">
                        <el-button type="primary" size="small" @click="onUploadClick(itemRepeat && type == 'item' ? 'item0' : img.index)">点击上传</el-button>
                        
                    </el-upload>
                    <div slot="tip" class="el-upload__tip">* 图片建议尺寸为 {{img.size[0]}}*{{img.size[1]}}px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
                </div>
            </div>
            <div v-if="type == 'item' && !itemRepeat" class="edit item-pic">
                <div class="edit-container" v-for="(img, index) in editData" :key="index + img">
                    <h4>编辑{{img.name}}：</h4>
                    <div class="img-container">
                        <img :src="img.url + '?v=1.1'" alt="">
                    </div>
                    <el-upload 
                    :action="uploadApi" 
                    :headers="headerObj" 
                    class="upload" 
                    :show-file-list="showFile" 
                    :on-success="uploadSuccess"
                    :before-upload="beforeAvatarUpload"
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
    },
    itemRepeat: {
      type: Boolean
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
  created() {
  	console.log()
  },
  methods: {
      uploadSuccess (res, file, fileList) {
        let that = this;
        let url = res.data.accessUrl;
        that.$emit('picChange', {type: that.type, index: that.editIndex, url: url, itemRepeat: that.itemRepeat});
      },
      uploadError (err) {
          let that = this;
          console.log(err)
          alert('图片上传失败')
      },
      onUploadClick (index) {
          let that = this;
          that.editIndex = index;
      },
      beforeAvatarUpload(file) {
        const IMGTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif'
        if (!IMGTYPE) {
          this.$message.error('上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!')
        }
        return IMGTYPE
      },
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
}
</style>

