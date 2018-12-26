<template>
  <section class="add-product-container">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="add-product-form-container">
        <el-form-item label="商品名称：" prop="memo" size="small">
          <el-input v-model="ruleForm.memo" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="主图：" prop="image" size="small">
          <el-input v-model="ruleForm.image" style="display: none" ></el-input>
          <el-upload
              action="/api/saotx/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm.image" width="200" height="125" :src="ruleForm.image" class="avatar">
          </el-upload>
          <div class="pic-tips">上传图片的最佳尺寸：750像素*468像素；格式png、jpg；大小不超过2M</div>
        </el-form-item>
        <div></div>
        <el-form-item size="small" label="商品类型：" prop="giftType">
          <el-select
              v-model="ruleForm.giftType"
              placeholder="请选择"
              style="width: 200px">
            <el-option
                v-for="item in productTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item size="small" label="分类：" prop="cateLvl1Id">
          <el-select
              v-model="ruleForm.cateLvl1Id"
              placeholder="请选择"
              @change="selectBrand1"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl1List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="" prop="cateLvl2Id">
          <el-select
              v-model="ruleForm.cateLvl2Id"
              placeholder="请选择"
              @change="selectBrand2"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl2List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="" prop="cateLvl3Id">
          <el-select
              v-model="ruleForm.cateLvl3Id "
              placeholder="请选择"
              @change="selectBrand3"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl3List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="" prop="cateLvl4Id">
          <el-select
              v-model="ruleForm.cateLvl4Id"
              placeholder="请选择"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl4List"
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
        <el-form-item  label="库存：" prop="quantity" size="small">
          <el-input type="number" v-model="ruleForm.quantity" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="商品详情：" prop="url" size="small">
          <el-input v-model="ruleForm.url" style="display: none" ></el-input>
          <el-upload
              action="/api/saotx/attach/commonAliUpload"
              list-type="picture-card"
              class="product-url"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccessUrl"
          >
            <img v-if="ruleForm.url" width="200" height="200" :src="ruleForm.url" class="avatar">
          </el-upload>
          <div class="pic-tips">此图用于商品详情展示；尺寸：宽750像素；格式png、jpg；大小不超过2M</div>
        </el-form-item>
        <div></div>
        <el-form-item label="状态：" prop="status" size="small">
          <el-radio v-model="ruleForm.status" label="1">上架</el-radio>
          <el-radio v-model="ruleForm.status" label="-1">下架</el-radio>
        </el-form-item>
        <div></div>
        <el-form-item label="是否热门：" prop="isHostGood" size="small" >
          <el-radio v-model="ruleForm.isHostGood" label="0">否</el-radio>
          <el-radio v-model="ruleForm.isHostGood" label="1">是</el-radio>
        </el-form-item>
        <div></div>
        <div class="add-product-form-bt">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
    width: 202px;
    height: 127px;

  }
  .product-url .el-upload {
    width: 202px;
    height: 202px;

  }
</style>
<script>
  export default {
    name: "",
    data() {
      return {
        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },
        //商品状态下拉
        productList:[
          {name: "全部", id: ""}
        ],
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
          //商品名称
          memo: '',
          //主图
          image:'',
          //商品类型
          giftType:'',
          //分类
          cateLvl1Id: '',
          cateLvl2Id: '',
          cateLvl3Id: '',
          cateLvl4Id: '',
          //兑换值
          score:'',
          //库存
          quantity:'',
          //商品详情
          url:'',
          //状态
          status:'1',
          //是否为热门商品0否，1是
          isHostGood:'0'
        },
        rules: {
          memo: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          image: [
            { required: true, message: '请上传主图', trigger: 'change' },
          ],
          giftType: [
            { required: true, message: '请选择商品类型', trigger: 'change' },
          ],
          cateLvl1Id: [
            { required: true, message: '请选择一级分类', trigger: 'change' },
          ],
          cateLvl2Id: [
            { required: true, message: '请选择二级分类', trigger: 'change' },
          ],
          cateLvl3Id: [
            { required: true, message: '请选择三级分类', trigger: 'change' },
          ],
          cateLvl4Id: [
            { required: true, message: '请选择四级分类', trigger: 'change' },
          ],
          score: [
            { required: true, message: '请输入兑换值', trigger: 'blur' },
          ],
          quantity: [
            { required: true, message: '请输入库存', trigger: 'blur' },
          ],
          url: [
            { required: true, message: '请上传商品详情', trigger: 'change' },
          ],
        }
      }
    },
    created(){
      this.getProductType()
      this.getOneCategory()
    },
    methods:{
      //从后台拿取商品状态列表
      getProductList(){
        this.$request.post('/sc/saotx/mall/statusMap',{}, true, (res) => {
          if (res.ret == '200000') {
            this.productList = [...this.productList,...res.data]
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
              cateLvl1Id: this.ruleForm.cateLvl1Id,
              cateLvl2Id: this.ruleForm.cateLvl2Id,
              cateLvl3Id: this.ruleForm.cateLvl3Id,
              cateLvl4Id: this.ruleForm.cateLvl4Id,
              // deliveryScore: 0
              giftType: this.ruleForm.giftType,
              image: this.ruleForm.image,
              memo: this.ruleForm.memo,
              quantity: this.ruleForm.quantity,
              score: this.ruleForm.score,
              status: this.ruleForm.status,
              url: this.ruleForm.url,
              isHostGood: this.ruleForm.isHostGood
            }
            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/sc/saotx/mall/product/saveOrModifyZJ',params,true,res => {
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
        this.ruleForm.url = imgUrl;
      },
      returnZJProduct(){
        this.$router.push({
          path:'/mall/product/zj'
        })
      }
    }
  }
</script>
