<template>
  <section class="add-banner-container">
    <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item size="small" label="链接类型：" prop="type">
        <el-select
            v-model="ruleForm.type"
            placeholder="请选择"
            @change="selectType"
            style="width: 200px">
          <el-option
              v-for="item in bannerTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <div></div>
      <el-form-item v-show="productIdShow" size="small" label="商品ID：" prop="type">
        <el-select
            v-model="ruleForm.productId"
            placeholder="请选择"
            style="width: 200px">
          <el-option
              v-for="item in productIdList"
              :key="item.productId"
              :label="item.memo"
              :value="item.productId">
          </el-option>
        </el-select>
      </el-form-item>
      <div></div>
      <el-form-item v-show="linkShow" label="链接地址：" prop="link" size="small">
        <el-input v-model="ruleForm.link" style="width: 200px"></el-input>
      </el-form-item>
      <div></div>
      <el-form-item v-show="cateLvlShow"  size="small" label="分类：" prop="cateLvl1Id">
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
      <el-form-item v-if="cateLvlShow" size="small" label="" prop="cateLvl2Id">
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
      <el-form-item v-if="cateLvlShow" size="small" label="" prop="cateLvl3Id">
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
      <el-form-item v-if="cateLvlShow" size="small" label="" prop="cateLvl4Id">
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
      <el-form-item label="排序值：" prop="idx" size="small">
        <el-input type="number" v-model="ruleForm.idx" style="width: 200px"></el-input>
      </el-form-item>
      <div></div>
      <el-form-item label="主图：" prop="image" size="small">
        <el-input v-model="ruleForm.image" style="display: none" ></el-input>
        <el-upload
            action="/api/saotx/attach/commonAliUpload"
            list-type="picture-card"
            class="banner-img"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="ruleForm.image" width="100" height="100" :src="ruleForm.image" class="avatar">
          <div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*420px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
        </el-upload>
      </el-form-item>
      <div></div>
      <div class="add-banner-form-bt">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="returnBannerMannage">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </section>
</template>

<style lang="scss" scoped>
  .add-banner-container{
    background-color:   #fff;
    padding: 30px 15px;
    .add-banner-form-bt{
      margin-top: 30px;
      text-align: center;
    }
  }
</style>

<style>
  .add-banner-container .banner-img .el-upload {
    width: 110px;
    height: 100px;

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

        bannerTypeList:[],

        productIdList:[],

        //表单展示
        productIdShow:false,
        linkShow:false,
        cateLvlShow:false,
        //分类列表
        cateLvl1List:[
          {name: "全部", id: ""}
        ],
        cateLvl2List:[
          {name: "全部", id: ""}
        ],
        cateLvl3List:[
          {name: "全部", id: ""}
        ],
        cateLvl4List:[
          {name: "全部", id: ""}
        ],

        ruleForm: {
          //链接类型
          type: '',
          // 商品ID
          productId:'',
          // 链接地址
          link:'',
          //分类
          cateLvl1Id: '',
          cateLvl2Id: '',
          cateLvl3Id: '',
          cateLvl4Id: '',

          typeVal:'',

          // 排序值
          idx:'',

          image:''

        },
        rules: {
          type: [
            { required: true, message: '请选择链接类型', trigger: 'change' },
          ],
          productId: [
            { required: true, message: '请选择商品ID', trigger: 'change' },
          ],
          link: [
            { required: true, message: '请输入链接地址', trigger: 'blur' },
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
          idx:[
            { required: true, message: '请输入排序值', trigger: 'blur' },
          ],
          image: [
            { required: true, message: '请上传主图', trigger: 'change' },
          ],
        }
      }
    },
    created(){
      this.getBannerTypeList()
      this.getProductIdList()
      this.getOneCategory()
    },
    methods:{
      //从后台拿取链接类型
      getBannerTypeList(){
        this.$request.post('/sc/saotx/mall/bannerTypeMap',{}, true, (res) => {
          if (res.ret == '200000') {
            this.bannerTypeList = [...this.bannerTypeList,...res.data]
          }
        })
      },
      //从后台拿取链接类型
      getProductIdList(){
        this.$request.post('/sc/saotx/mall/product/downBox',{}, true, (res) => {
          if (res.ret == '200000') {
            this.productIdList = [...this.productIdList,...res.data]
          }
        })
      },
      selectType(val){
        console.log(val)
        if(val == 1){
          this.productIdShow = true
          this.rules.productId = [{ required: true, message: '请选择商品ID', trigger: 'change' }]
          this.linkShow = false
          this.rules.link = []
          this.cateLvlShow = false
          this.rules.cateLvl1Id = []
          this.rules.cateLvl2Id = []
          this.rules.cateLvl3Id = []
          this.rules.cateLvl4Id = []
        }else if(val == 2){
          this.productIdShow = false
          this.rules.productId = []
          this.linkShow = true
          this.rules.link = [{ required: true, message: '请输入链接地址', trigger: 'blur' }]
          this.cateLvlShow = false
          this.rules.cateLvl1Id = []
          this.rules.cateLvl2Id = []
          this.rules.cateLvl3Id = []
          this.rules.cateLvl4Id = []
        }else if(val == 3){
          this.productIdShow = false
          this.rules.productId = []
          this.linkShow = false
          this.rules.link = []
          this.cateLvlShow = true
          this.rules.cateLvl1Id = [{ required: true, message: '请选择一级分类', trigger: 'change' }]
          this.rules.cateLvl2Id = [{ required: true, message: '请选择二级分类', trigger: 'change' }]
          this.rules.cateLvl3Id = [{ required: true, message: '请选择三级分类', trigger: 'change' }]
          this.rules.cateLvl4Id = [{ required: true, message: '请选择四级分类', trigger: 'change' }]
        }
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
              "type":this.ruleForm.type,
              "idx":this.ruleForm.idx,
              "image":this.ruleForm.image
            }
            if(this.ruleForm.type == 1){
              params.typeVal = this.ruleForm.productId
            }else if(this.ruleForm.type == 2){
              params.typeVal = this.ruleForm.link
            }else if(this.ruleForm.type == 3){
              params.cate1Id = this.ruleForm.cateLvl1Id
              params.cate2Id = this.ruleForm.cateLvl2Id
              params.cate3Id = this.ruleForm.cateLvl3Id
              params.cate4Id = this.ruleForm.cateLvl4Id
              let arr = [this.ruleForm.cateLvl1Id,this.ruleForm.cateLvl2Id,this.ruleForm.cateLvl3Id,this.ruleForm.cateLvl4Id].filter((e,i)=>{
                return e !== ""|| null
              })
              params.typeVal = arr.join('@')
            }
            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/sc/saotx/mall/banner/saveOrModify',params,true,res => {
          if(res.ret == '200000'){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.returnBannerMannage()
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
      returnBannerMannage(){
        this.$router.push({
          path:'/mall/banner'
        })
      }
    }
  }
</script>
