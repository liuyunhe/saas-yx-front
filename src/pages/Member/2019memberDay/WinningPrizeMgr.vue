<template>
  <div class="WinningPrizeMgr-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>上传图片：</span>
      </div>
      <el-form>
        <el-upload
            :action="uploadURL"
            :headers="headerObj"
            list-type="picture-card"
            :file-list="uploadList"
            :on-success="uploadImgUrlSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" title="图片预览">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form>
    </el-card>
    <div style="height: 30px"></div>
    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="handleSaveImg">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WinningPrizeMgr",
    data(){
      return{
        uploadURL: '/api/wiseqr/attach/commonAliUpload',
        headerObj: {
          loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
          token: sessionStorage.getItem('access_token'),
          CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
        },
        dialogImageUrl: '',
        dialogVisible: false,
        uploadList:[],
        imgList:[]
      }
    },
    created(){
      this.getImages()

    },
    methods:{
      getImages(){
        this.$request.post('/hbact/one/points/sass/prize/images', {}, false, res => {
          if (res.code == '200') {
            let data = res.data
            this.imgList = data.map(item=>{
              return {url:item.imageUrl}
            })
            this.imgList.forEach(item => {
              this.uploadList.push(item)
            })
            return
          }
          this.$message.error(res.message)
        })
      },
      handleSaveImg(){
        let params = []
        if(!this.imgList.length) return this.$message.error("请上传要保存的图片！")
        this.imgList.forEach(item=>{
          params.push(item.url)
        })
        console.log(params)
        this.$request.post('/hbact/one/points/sass/prize/image/save', params, true, res => {
          if (res.code == '200') {
            this.$message.success("保存成功！")
            return
          }
          this.$message.error(res.message)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        let index = this.imgList.findIndex(item => {
          return item.uid === file.uid
        })
        this.uploadList.splice(index,1)
        this.imgList.splice(index,1)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadImgUrlSuccess(response, file) {
        console.log(response, file)
        if (response.ret === '200000') {
          this.uploadList.push(
            {
              'name': file.name,
              'uid': file.uid,
              'url': file.url
            }
          )
          this.imgList.push(
            {
              'uid': file.uid,
              'url': response.data.accessUrl
            }
          )
          return
        }
        this.$message.error(response.message)
      },
    }
  }
</script>

<style lang="scss" scoped>
.WinningPrizeMgr-container{
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
}
</style>