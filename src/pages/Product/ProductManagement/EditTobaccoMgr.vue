<template>
  <section class="add-tobaccomgr-container clearfix">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form ref="ruleForm" :inline="true" :rules="rules"  :model="filters" label-width="110px">
        <div class="add-tobaccomgr-form-title">基本信息</div>
        <div class="add-tobaccomgr-form-container">
          <el-form-item :size="'small'" label="关联品牌：" prop="brandCode">
            <el-select
                class="tobacco-input"
                v-model="filters.brandCode"
                placeholder="请选择"
                disabled
                @change="selectBrand">
              <el-option
                  v-for="item in brandList"
                  :key="item.brandCode"
                  :label="item.name"
                  :value="item.brandCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="规格名称：" prop="prodName">
            <el-input class="tobacco-input" v-model="filters.prodName" disabled  placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="SN码：" prop="sn">
            <el-input class="tobacco-input" v-model="filters.sn" disabled  placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="包装单位：" prop="unitType">
            <el-select
                class="tobacco-input"
                v-model="filters.unitType"
                disabled
                placeholder="请选择">
              <el-option
                  v-for="item in prodTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="产品全称：" prop="allName">
            <el-input class="tobacco-input" disabled  v-model="filters.allName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="价格：" prop="price">
            <el-input class="tobacco-input" v-model="filters.price" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
        <div class="add-tobaccomgr-form-title">产品图片</div>
        <div class="add-tobaccomgr-form-container" style="padding-bottom: 30px">
          <el-upload
              action="/api/saotx/attach/commonAliUpload"
              list-type="picture-card"
              class="tobacco-pic"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus"></i>
            <img v-if="filters.smallPic" width="53" height="100" :src="filters.smallPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">* 图片建议尺寸为 160*300px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
          </el-upload>
        </div>
        <div class="add-tobaccomgr-form-title">产品信息</div>
        <div class="add-tobaccomgr-form-container">
          <el-form-item :size="'small'" label="卷烟类型：" prop="typeCode">
            <el-select
                class="tobacco-input"
                v-model="filters.typeCode"
                placeholder="请选择"
                >
              <el-option
                  v-for="item in typeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="焦油量：" prop="oil">
            <el-input class="tobacco-input" v-model="filters.oil" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="烟碱量：" prop="nicotine">
            <el-input class="tobacco-input" v-model="filters.nicotine" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="一氧化碳量：" prop="carbonMonoxide">
            <el-input class="tobacco-input" v-model="filters.carbonMonoxide" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="烟支长度：" prop="length">
            <el-input class="tobacco-input" v-model="filters.length" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="烟支数量：" prop="num">
            <el-input class="tobacco-input" v-model="filters.num" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="包裝：" prop="pack">
            <el-select
                class="tobacco-input"
                v-model="filters.pack"
                placeholder="请选择">
              <el-option
                  v-for="item in packArrList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="价类：" prop="grade">
            <el-select
                class="tobacco-input"
                v-model="filters.grade"
                @change="selectGrade"
                placeholder="请选择">
              <el-option
                  v-for="item in gradeArrList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="二级价类：" prop="gradeLevel">
            <el-select
                class="tobacco-input"
                v-model="filters.gradeLevel"
                placeholder="请选择">
              <el-option
                  v-for="item in gradeLevelArrList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="add-tobaccomgr-form-bt">
          <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
          <el-button size="small" @click="returnTobaccoMgr">取消</el-button>
        </el-form-item>
        </div>
      </el-form>
    </el-col>
  </section>
</template>

<style lang="scss" scoped>
  .add-tobaccomgr-container{
    background-color: #fff;
    padding: 15px;
    .add-tobaccomgr-form-title{
      width: 1000px;
      margin: 0 auto;
      height: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      color:#000000;
    }
    .add-tobaccomgr-form-container{
      width: 910px;
      margin: 0 auto;
      .el-form-item{
        width: 280px;

      }
    }
    .add-tobaccomgr-form-bt{
      margin-top: 30px;
      text-align: center;
    }
  }

  .tobacco-input{
    width: 170px;
  }
  .needed{
    color: red;
    display: inline-block;
    line-height: 33px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
<style>
  .tobacco-pic .el-upload {
    width: 55px;
    height: 102px;
    line-height: 110px;
  }
</style>
<script>
  export default {
    props: ['id'],
    data() {
      return {
        //香烟信息

        //品牌列表
        brandList:[],
        //包装单位列表
        prodTypeList:[],
        //包装列表
        packArrList:[],
        //烤烟类型
        typeList:[],
        //一级价类
        gradeArrList:[],
        //二级价类
        gradeLevelArrList:[],

        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },

        //上传图片
        dialogImageUrl: '',
        dialogVisible: false,


        filters:{
          brandCode:'',
          prodName:'',
          sn:'',
          unitType:'',
          allName:'',
          price:'',

          smallPic:'',

          typeCode:'',
          oil:'',
          nicotine:'',
          carbonMonoxide:'',
          length:'',
          num:'',
          pack:'',
          grade:'',
          gradeLevel:'',



        },
        rules:{
          brandCode: [
            { required: true, message: '请选择关联品牌', trigger: 'change' },
          ],
          prodName:[
            { required: true, message: '请输入规格名称', trigger: 'change' },
          ],
          sn:[
            { required: true, message: '请输入SN码名称', trigger: 'change' },
          ],
          unitType:[
            { required: true, message: '请选择包装单位', trigger: 'change' },
          ],
          price:[
            { required: true, message: '请输入价格', trigger: 'change' },
          ],
          typeCode:[
            { required: true, message: '请选择卷烟类型', trigger: 'change' },
          ],
          oil:[
            { required: true, message: '请输入焦油量', trigger: 'change' },
          ],
          nicotine:[
            { required: true, message: '请输入烟碱量', trigger: 'change' },
          ],
          carbonMonoxide:[
            { required: true, message: '请输入一氧碳量', trigger: 'change' },
          ],
          length:[
            { required: true, message: '请输入烟支长度', trigger: 'change' },
          ],
          num:[
            { required: true, message: '请输入烟支数量', trigger: 'change' },
          ],
          pack:[
            { required: true, message: '请选择包装', trigger: 'change' },
          ],
          grade:[
            { required: true, message: '请选择价类', trigger: 'change' },
          ],
          gradeLevel:[
            { required: true, message: '请选择二级价类', trigger: 'change' },
          ],


        }

      }
    },
    created(){
      this.getListBrand()
      this.getTobaccoPack()
      this.getTobaccoGrade()
      this.getTobaccoStyle()
      this.getProdType()
      this.getTobaccoMsg(this.id)
    },
    methods:{
      //烟类产品数据详情
      getTobaccoMsg(id){
        this.$request.post('/api/saotx/prod/detailTbc',{id:id}, true, (res) => {
          if (res.ret == '200000') {
            console.log(res.data)
            this.filters.carbonMonoxide = res.data.carbonMonoxide
            this.filters.grade = res.data.grade+''
            this.getListGradeLevel({parentCode: this.filters.grade})
            this.filters.gradeLevel = res.data.gradeLevel+''
            this.filters.id = res.data.id
            this.filters.length = res.data.length
            this.filters.nicotine = res.data.nicotine
            this.filters.num = res.data.num
            this.filters.oil = res.data.oil
            this.filters.pack = res.data.pack+''
            this.filters.price = res.data.price
            this.filters.sn = res.data.sn
            this.filters.typeCode = res.data.typeCode+''
            this.filters.allName = res.data.product.allName
            this.filters.brandCode = res.data.product.brandCode+''
            this.filters.prodName = res.data.product.prodName+''
            this.filters.smallPic = res.data.product.smallPic
            this.filters.unitType = res.data.product.unitType+''
            // product:{
            //   allName: this.filters.allName,
            //     brandCode: this.filters.brandCode,
            //     prodName: this.filters.prodName,
            //     //   smallPic: "http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/7BF882CD2DB24E958ABF5CFB29FF0CAE.png"
            //     type: "prod1",
            //     unitType: this.filters.unitType
            // },
          }
        })
      },
      //从后台拿取品牌列表listBrand
      getListBrand(){
        this.$request.post('/api/saotx/prod/listBrand',{}, true, (res) => {
          if (res.ret == '200000') {
            this.brandList = res.data.list
          }
        })
      },
      selectBrand(selected){
        // alert(selected)
      },
      //从后台拿取包装列表tobaccoPack
      getTobaccoPack(){
        this.$request.post('/api/saotx/dim/tobaccoPack', {parentCode: ""}, true, (res) => {
          if (res.ret == '200000') {
            this.packArrList = res.data
          }
        })
      },
      //从后台拿取价类列表tobaccoGrade
      getTobaccoGrade(){
        this.$request.post('/api/saotx/dim/tobaccoGrade', {}, true, (res) => {
          if (res.ret == '200000') {
            this.gradeArrList = res.data
          }
        })
      },
      //从后台拿取烟草类型tobaccoStyle
      getTobaccoStyle(){
        this.$request.post('/api/saotx/dim/tobaccoStyle', {}, true, (res) => {
          if (res.ret == '200000') {
            this.typeList = res.data
          }
        })
      },
      //从后台拿取包装单位prodType
      getProdType(){
        this.$request.post('/api/saotx/dim/prodType', {parentCode: "prod1"}, true, (res) => {
          if (res.ret == '200000') {
            this.prodTypeList = res.data
          }
        })
      },
      selectGrade(selected){
        this.filters.gradeLevel = ""
        this.getListGradeLevel({parentCode: this.filters.grade})
      },
      getListGradeLevel(params){
        this.$request.post('/api/saotx/dim/tobaccoGrade',params , true, (res) => {
          if (res.ret == '200000') {
            this.gradeLevelArrList = res.data
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              carbonMonoxide: this.filters.carbonMonoxide,
              grade: this.filters.grade,
              gradeLevel: this.filters.gradeLevel,
              id: this.filters.id,
              length: this.filters.length,
              nicotine: this.filters.nicotine,
              num: this.filters.num,
              oil: this.filters.oil,
              pack: this.filters.pack,
              price: this.filters.price,
              sn: this.filters.sn,
              product:{
                allName: this.filters.allName,
                brandCode: this.filters.brandCode,
                prodName: this.filters.prodName,
                smallPic: this.filters.smallPic,
                type: "prod1",
                unitType: this.filters.unitType
              },
              typeCode: "1"
            }
            this.$request.post('/api/saotx/prod/saveOrModifyTbc',params,true,res => {
              if(res.ret == '200000'){
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                });
               this.returnTobaccoMgr()
              }else{
                this.$message({
                  message:res.message,
                  type: 'warning'
                })
              }
            },err => {

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.filters.smallPic = imgUrl;
      },
      returnTobaccoMgr(){
        this.$router.push({
          path:'/product/mgr/tobacco'
        })
      }
    }
  }
</script>