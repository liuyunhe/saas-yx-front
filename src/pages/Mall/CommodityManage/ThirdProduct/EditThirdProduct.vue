<template>
  <section class="add-product-container">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <div class="add-product-form-container">
        <el-form-item label="商品ID：" prop="outSourceId" size="small">
          <el-input v-model="ruleForm.outSourceId" style="width: 200px" :maxlength="20"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="商品名称：" prop="memo" size="small">
          <el-input v-model="ruleForm.memo" style="width: 200px" :maxlength="20"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="主图：" prop="image" size="small">
          <el-input v-model="ruleForm.image" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm.image" width="100" height="75" :src="ruleForm.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">* 图片建议尺寸为 750*468px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
        </el-form-item>
        <div></div>
        <el-form-item size="small" label="请选择供应商：" prop="sourceType">
          <el-select
              v-model="ruleForm.sourceType"
              placeholder="请选择"
              style="width: 200px">
            <el-option
                v-for="item in supplyList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="兑换值：" prop="score" size="small">
          <el-input type="number" v-model="ruleForm.score" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="角标：" prop="url" size="small">
          <el-input v-model="ruleForm.cornerUrl" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-url"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccessUrl"
          >
            <img v-if="ruleForm.cornerUrl" width="100" height="100" :src="ruleForm.cornerUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">* 图片建议尺寸为 长200px，宽200px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
          <el-button type="primary" v-if="ruleForm.cornerUrl" @click="handleDeleteCornerUrl">清除角标</el-button>
        </el-form-item>
        <div></div>
        <el-form-item label="状态：" prop="status" size="small">
          <el-radio v-model="ruleForm.status" label="1">上架</el-radio>
          <el-radio v-model="ruleForm.status" label="-1">下架</el-radio>
        </el-form-item>
        <div></div>
        <!--    <el-form-item label="是否热门：" prop="isHostGood" size="small" >
              <el-radio v-model="ruleForm.isHostGood" label="0">否</el-radio>
              <el-radio v-model="ruleForm.isHostGood" label="1">是</el-radio>
            </el-form-item>-->
        <div></div>
        <div class="add-product-form-bt">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="returnZJProduct">取消</el-button>
          </el-form-item>
        </div>

      </div>
    </el-form>
  </section>
</template>

<style lang="scss" scoped>
.add-product-container{
  background-color:   #fff;
  padding: 30px 15px;
  .add-product-form-container{
    width: 910px;
    margin: 0 auto;
    .pic-tips{
      color: #ccc;
    }
  }
  .add-product-form-bt{
    margin-top: 30px;
    text-align: center;
  }
}
</style>
<style>
.product-img .el-upload {
  width: 102px;
  height: 77px;
  line-height: 85px;
}
.product-url .el-upload {
  width: 102px;
  height: 102px;
  line-height: 110px;

}
</style>
<script>
export default {
  name: "",
  props:["id"],
  data() {
    return {
      headers:{
        'loginId':sessionStorage.getItem('access_loginId'),
        'token':sessionStorage.getItem('access_token')
      },
      supplyList:[],
      //商品类型下拉
      productTypeList:[],
      //分类列表
      cateLvl1List:[
        {name: "全部", id: "-1"}
      ],
      cateLvl2List:[
        {name: "全部", id: "-1"}
      ],
      cateLvl3List:[
        {name: "全部", id: "-1"}
      ],
      cateLvl4List:[
        {name: "全部", id: "-1"}
      ],
      ruleForm: {
        outSourceId:'',
        //商品名称
        memo: '',
        //主图
        image:'',
        //供应商
        sourceType:'',

        score:'',
        //状态
        status:'1',
        //是否为热门商品0否，1是
        // isHostGood:'0'
        cornerUrl:null,
      },
      rules: {
        outSourceId: [
          { required: true, message: '请输入商品ID', trigger: 'blur' },
        ],
        memo: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        image: [
          { required: true, message: '请上传主图', trigger: 'change' },
        ],
        sourceType: [
          { required: true, message: '请选择供应商', trigger: 'change' },
        ],
        score: [
          { required: true, message: '请输入兑换值', trigger: 'blur' },
        ],
      }
    }
  },
  created(){
    this.getSupplierList()
    this.getProductDetail()
  },
  methods:{
    handleDeleteCornerUrl(){
      this.ruleForm.cornerUrl = null
    },
    getProductDetail(){
      this.$request.post('/sc/saotx/mall/product/detail',{id:this.id},true,res => {
        if (res.ret == '200000') {
          this.ruleForm.id = res.data.id
          this.ruleForm.outSourceId = res.data.outSourceId
          //商品名称
          this.ruleForm.memo = res.data.memo
          //主图
          this.ruleForm.image = res.data.image
          //商品类型
          this.ruleForm.sourceType = res.data.sourceType + ""
          //分类
          //兑换值
          this.ruleForm.score = res.data.score
          //库存
          //商品详情
          this.ruleForm.cornerUrl = res.data.cornerUrl
          //状态
          this.ruleForm.status = res.data.status+""
          //是否热门
          // this.ruleForm.isHostGood = res.data.isHostGood+""
        }
      })
    },
    //从后台拿取商品状态列表
    getSupplierList(){
      this.$request.post('/sc/product/supplier/list',{}, true, (res) => {
        if (res.ret == '200000') {
          let data = res.data.map(item=>{
            return {
              id:Object.keys(item)[0],
              name:Object.values(item)[0]
            }
          })
          this.supplyList = [...this.supplyList,...data]

        }
      })
    },
    //从后台拿取商品类型列表
    getProductType(){
      this.$request.post('/sc/saotx/mall/giftTypeMap',{}, true, (res) => {
        if (res.ret == '200000') {
          this.productTypeList = [...this.productTypeList,...res.data]
        }
      })
    },
    //从后台拿取商品分类1
    getOneCategory(){
      this.$request.post('/sc/saotx/mall/cate/oneCategory',{}, true, (res) => {
        if (res.ret == '200000') {
          this.cateLvl1List = [...this.cateLvl1List,...res.data]
        }
      })
    },
    selectBrand1(){
      this.ruleForm.cateLvl2Id = "-1"
      this.cateLvl2List = [{name: "全部", id: "-1"}]
      this.ruleForm.cateLvl3Id = "-1"
      this.cateLvl3List = [{name: "全部", id: "-1"}]
      this.ruleForm.cateLvl4Id = "-1"
      this.cateLvl4List = [{name: "全部", id: "-1"}]
      this.getTwoCategory()
    },
    //从后台拿取商品分类2
    getTwoCategory(){
      if(this.ruleForm.cateLvl1Id  == "-1")return
      this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.ruleForm.cateLvl1Id}, true, (res) => {
        if (res.ret == '200000') {
          this.cateLvl2List = [...this.cateLvl2List,...res.data]
        }
      })
    },
    selectBrand2(){
      this.ruleForm.cateLvl3Id = "-1"
      this.cateLvl3List = [{name: "全部", id: "-1"}]
      this.ruleForm.cateLvl4Id = "-1"
      this.cateLvl4List = [{name: "全部", id: "-1"}]
      this.getThreeCategory()
    },
    //从后台拿取商品分类3
    getThreeCategory(){
      if(this.ruleForm.cateLvl2Id == "-1")return
      this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.ruleForm.cateLvl2Id}, true, (res) => {
        if (res.ret == '200000') {
          this.cateLvl3List = [...this.cateLvl3List,...res.data]
        }
      })
    },
    selectBrand3(){
      this.ruleForm.cateLvl4Id = "-1"
      this.cateLvl4List = [{name: "全部", id: "-1"}]
      this.getFourCategory()
    },
    //从后台拿取商品分类4
    getFourCategory(){
      this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.ruleForm.cateLvl3Id}, true, (res) => {
        if (res.ret == '200000') {
          this.cateLvl4List = [...this.cateLvl4List,...res.data]
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id : this.ruleForm.id,
            sourceType: this.ruleForm.sourceType,
            image: this.ruleForm.image,
            memo: this.ruleForm.memo,
            outSourceId: this.ruleForm.outSourceId,
            score: this.ruleForm.score,
            status: this.ruleForm.status,
            cornerUrl: this.ruleForm.cornerUrl,
            // isHostGood: this.ruleForm.isHostGood
          }
          this.postParams(params)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    postParams(params){
      this.$request.post('/sc/mall/product/updateThirdPartProduct',params,true,res => {
        if(res.ret == '200000'){
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.returnZJProduct()
        }else{
          this.$message({
            message:res.message,
            type: 'warning'
          })
        }
      },err => {

      })
    },
    handleAvatarSuccess(res, file) {
      var data = res.data || {};
      var imgUrl = data && data.accessUrl;
      this.ruleForm.image = imgUrl;
    },
    handleAvatarSuccessUrl(res, file){
      var data = res.data || {};
      var imgUrl = data && data.accessUrl;
      this.ruleForm.cornerUrl = imgUrl;
    },
    returnZJProduct(){
      this.$router.push({
        path:'/mall/product/third'
      })
    }
  }
}
</script>
