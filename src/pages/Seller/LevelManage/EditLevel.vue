<template>
  <div class="container">
    <el-card >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="levelName" style="width: 350px">
          <el-input v-model="ruleForm.levelName"></el-input>
        </el-form-item>
        <el-form-item label="最小等级值：" prop="levelScoreMin" style="width: 350px">
          <el-input type="number" v-model="ruleForm.levelScoreMin"></el-input>
        </el-form-item>
        <el-form-item label="最大等级值：" prop="levelScoreMax" style="width: 350px">
          <el-input type="number" v-model="ruleForm.levelScoreMax"></el-input>
        </el-form-item>
        <el-form-item label="等级图标："  prop="levelIcon" >
          <el-input v-model="ruleForm.levelIcon" style="display: none" ></el-input>
          <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :data="{channel:'hebei-sellerInfo '}"  :on-success="uploadImgUrlSuccess" :show-file-list="false">
            <img v-if="ruleForm.levelIcon" :src="ruleForm.levelIcon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">图标格式要求：png、jpg，尺寸：100x100px</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button  @click="$router.back()">返回</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditLevel",
  props:['id'],
  data(){
    return{
      uploadURL: '/api/wiseqr/attach/commonNewUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      rules: {
        levelName: [
          {required: true, message: '请输入等级名称', trigger: 'blur'},
        ],
        levelScoreMin: [
          {required: true, message: '请输入最小等级值', trigger: 'blur'},
        ],
        levelScoreMax: [
          {required: true, message: '请输入最大等级值', trigger: 'blur'},
        ],
        levelIcon: [{ required: true, message: '请上传卡片图片', trigger: 'change' }],
      },
      ruleForm:{
        id:'',
        levelName:'',
        levelScoreMin:'',
        levelScoreMax:'',
        levelIcon:'',
        rdmCode:''
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$request.post('/saasHbseller/shopLevel/detail', {id:this.id}, false, res => {
        if (res.code == '200') {
          this.ruleForm.id = res.data.data.id
          this.ruleForm.levelName = res.data.data.levelName
          this.ruleForm.levelScoreMin = res.data.data.levelScoreMin
          this.ruleForm.levelScoreMax = res.data.data.levelScoreMax
          this.ruleForm.levelIcon = res.data.data.levelIconUrl
          this.ruleForm.rdmCode = res.data.data.rdmCode
          return
        }
        this.$message.error(res.msg)
      })
    },

    uploadImgUrlSuccess(resule) {
      if (resule.ret === '200000'){
        console.log(resule)
        this.ruleForm.rdmCode = resule.data.rdmCode
        this.ruleForm.levelIcon = resule.data.filePath
        return
      }
      this.$message.error(resule.message)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if((this.ruleForm.levelScoreMin-0)>=(this.ruleForm.levelScoreMax-0)){
            this.$message.error('最小等级值不能超过最大等级值！')
            return
          }
          let {levelName,levelScoreMin,levelScoreMax,rdmCode} = this.ruleForm
          let params = {
            id:this.id,levelName,levelScoreMin,levelScoreMax,rdmCode
          }
          this.$request.post('/saasHbseller/shopLevel/edit', params, false, res => {
            if (res.code == '200') {
              this.$message.success('保存成功！')
              this.$router.back()
              return
            }
            this.$message.error(res.msg)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style >
.pic-tips{
  color: #ccc;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>
