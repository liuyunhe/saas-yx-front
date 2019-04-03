<template>
  <section class="edit-jd-product-container">
    <div class="edit-jd-product-msg-container">
        <div class="title">基本信息：</div>
        <div class="edit-jd-product-msg">
          <div class="left-side">
            <div class="line"><span class="imp">*</span>主图：</div>
            <div class="img">
              <img :src="basicMsg.imagePath" width="200" height="200" alt="">
            </div>
          </div>
          <div class="right-side">
            <div class="lines" style="width: 80%" :title="basicMsg.name"><span class="imp">*</span>商品名称：{{ basicMsg.name }}</div>
            <div class="line"><span class="imp">*</span>SKU：{{ basicMsg.sku }}</div>
            <div class="line"><span class="imp">*</span>上下架状态：{{ basicMsg.state == 1 ? "上架中" : "下架中" }}</div>
            <div class="line"><span class="imp">*</span>品牌：{{ basicMsg.brandName }}</div>
            <div class="line"><span class="imp">*</span>产地： {{ basicMsg.productArea }} </div>
            <div class="line"><span class="imp">*</span>销售单位： {{ basicMsg.saleUnit }} </div>
            <div class="line"><span class="imp">*</span>类别：{{ basicMsg.category }}</div>
            <div class="line"><span class="imp">*</span>京东价格：{{ basicMsg.jdPrice }}</div>
            <div class="line"><span class="imp">*</span>内部价格：{{ basicMsg.price }}</div>
          </div>
        </div>
      </div>
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="edit-jd-product-form-container">
          <el-form-item label="商品ID：" prop="productId" size="small">
            <el-input v-model="ruleForm.productId" disabled style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="销量：" prop="saleNum" size="small">
            <el-input v-model="ruleForm.saleNum" disabled style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：" prop="updateTime" size="small">
            <el-input v-model="ruleForm.createTime" disabled style="width: 200px"></el-input>
          </el-form-item>
          <div></div>
          <el-form-item label="商品名称：" prop="memo" size="small">
            <el-input v-model="ruleForm.memo" style="width: 200px"></el-input>
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
            <el-input type="number" disabled v-model="ruleForm.score" style="width: 200px"></el-input>
          </el-form-item>
          <div></div>
          <el-form-item  label="运费：" prop="deliveryScore" size="small">
            <el-input type="number" v-model="ruleForm.deliveryScore" style="width: 200px"></el-input>
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
          <div class="edit-jd-product-form-bt">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="returnJDProduct">取消</el-button>
            </el-form-item>
          </div>

        </div>
      </el-form>
  </section>
</template>

<style lang="scss" scoped>
  .edit-jd-product-container{
    background-color:#fff;
    padding: 30px 15px;
    color:#606266;
    .imp{
      color: red;
    }
    .edit-jd-product-msg-container{
      width: 910px;
      margin: 0 auto;
      background: #ddd;
      margin-bottom: 30px;
      padding: 20px;
      .title{
        width: 100%;
        line-height: 30px;
        margin-bottom: 10px;
      }
      .edit-jd-product-msg{
        display: flex;
        flex-wrap: nowrap;
        .left-side{
          width: 350px;
          display: flex;
          flex-wrap: nowrap;
          .line{
            flex: 1;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .img{
            width: 200px;
            height: 200px;
            margin-right: 50px;
            img{
              display: block;
            }
          }
        }
        .right-side{
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          align-content: flex-start;
          .line{
            width: 50%;
            height: 40px;
            line-height: 40px;

          }
          .lines{
            width: 200px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;/*加宽度width属来兼容部分浏览*/
          }
        }
      }

    }
    .edit-jd-product-form-container{
      width: 940px;
      margin: 0 auto;
    }
    .edit-jd-product-form-bt{
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
<style>
</style>
<script>
  export default {
    name: "",
    props:["id"],
    data() {
      return {
        //商品状态下拉
        productList:[
          {name: "全部", id: ""}
        ],
        //商品类型下拉
        productTypeList:[],
        //分类列表
        cateLvl1List:[
          {name: "全部", id: -1}
        ],
        cateLvl2List:[
          {name: "全部", id: -1}
        ],
        cateLvl3List:[
          {name: "全部", id: -1}
        ],
        cateLvl4List:[
          {name: "全部", id: -1}
        ],
        basicMsg:{
          imagePath:'',
          name:'',
          sku:'',
          state:'',
          brandName:'',
          productArea:'',
          saleUnit:'',
          category:'',
          jdPrice:'',
          price: '',
        },
        ruleForm: {
          id:'',
          //商品ID
          productId:'',
          //销量
          saleNum:'',
          //创建时间
          createTime:'',


          //商品名称
          memo: '',
          //商品类型
          giftType:'',
          //分类
          cateLvl1Id: '',
          cateLvl2Id: '',
          cateLvl3Id: '',
          cateLvl4Id: '',
          //兑换值
          score:'',
          //运费
          deliveryScore:'',
          //状态
          status:'1',
          //是否为热门商品0否，1是
          isHostGood:'0'
        },
        rules: {
          memo: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
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
          deliveryScore: [
            { required: true, message: '请输入运费', trigger: 'blur' },
          ],
        }
      }
    },
    created(){
      this.getProductType()
      this.getOneCategory()
      this.getJDProductDetail()
    },
    methods:{
      getJDProductDetail(){
        this.$request.post('/sc/saotx/mall/product/detail',{id:this.id},true,res => {
          if (res.ret == '200000') {
            let params = {sku:res.data.outSourceId}
            this.queryJDSKU(params)

            this.ruleForm.id = res.data.id
            this.ruleForm.productId = res.data.productId
            this.ruleForm.saleNum = res.data.saleNum
            this.ruleForm.createTime = new Date(res.data.createTime).Format('yyyy-MM-dd hh:mm:ss')

            //商品名称
            this.ruleForm.memo = res.data.memo
            //商品类型
            this.ruleForm.giftType = res.data.giftType
            //分类
            this.ruleForm.cateLvl1Id = res.data.cateLvl1Id
            this.ruleForm.cateLvl2Id = res.data.cateLvl2Id
            this.ruleForm.cateLvl3Id = res.data.cateLvl3Id
            this.ruleForm.cateLvl4Id = res.data.cateLvl4Id
            this.getTwoCategory()
            this.getThreeCategory()
            this.getFourCategory()
            //兑换值
            this.ruleForm.score = res.data.score
            //运费
            this.ruleForm.deliveryScore = res.data.deliveryScore
            //状态
            this.ruleForm.status = res.data.status+""
            this.ruleForm.isHostGood=res.data.isHostGood+""
          }
        })
      },
      queryJDSKU(params){
        this.$request.post('/sc/saotx/mall/product/queryJDSKU',params, true, (res) => {
          if (res.ret == '200000') {
            this.basicMsg.imagePath = res.data.propertiesObject.imagePath
            this.basicMsg.name = res.data.propertiesObject.name
            this.basicMsg.sku = res.data.propertiesObject.sku
            this.basicMsg.state = res.data.propertiesObject.state
            this.basicMsg.brandName = res.data.propertiesObject.brandName
            this.basicMsg.productArea = res.data.propertiesObject.productArea
            this.basicMsg.saleUnit = res.data.propertiesObject.saleUnit
            this.basicMsg.category = res.data.propertiesObject.category
            this.basicMsg.jdPrice = res.data.propertiesObject.jdPrice
            this.basicMsg.price = res.data.propertiesObject.price
            this.ruleForm.score = res.data.propertiesObject.score
          }else {
            this.$message({
              message:res.message,
              type: 'warning'
            })
          }
        })
      },
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
        this.ruleForm.cateLvl2Id = -1
        this.cateLvl2List = [{name: "全部", id: -1}]
        this.ruleForm.cateLvl3Id = -1
        this.cateLvl3List = [{name: "全部", id: -1}]
        this.ruleForm.cateLvl4Id = -1
        this.cateLvl4List = [{name: "全部", id: -1}]
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.ruleForm.cateLvl1Id  == -1)return
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.ruleForm.cateLvl1Id}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl2List = [...this.cateLvl2List,...res.data]
          }
        })
      },
      selectBrand2(){
        this.ruleForm.cateLvl3Id = -1
        this.cateLvl3List = [{name: "全部", id: -1}]
        this.ruleForm.cateLvl4Id = -1
        this.cateLvl4List = [{name: "全部", id: -1}]
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.ruleForm.cateLvl2Id == -1)return
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.ruleForm.cateLvl2Id}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl3List = [...this.cateLvl3List,...res.data]
          }
        })
      },
      selectBrand3(){
        this.ruleForm.cateLvl4Id = -1
        this.cateLvl4List = [{name: "全部", id: -1}]
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

              deliveryScore: this.ruleForm.deliveryScore,
              giftType: this.ruleForm.giftType,
              id: this.id,
              image: this.basicMsg.imagePath,
              memo: this.ruleForm.memo,
              outSourceId: this.basicMsg.sku,
              price:this.basicMsg.price,
              score: this.ruleForm.score,
              status: this.ruleForm.status,
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
        this.$request.post('/sc/saotx/mall/product/saveOrModifyJD',params,true,res => {
          if(res.ret == '200000'){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.returnJDProduct()
          }else{
            this.$message({
              message:res.message,
              type: 'warning'
            })
          }
        },err => {

        })
      },
      returnJDProduct(){
        this.$router.push({
          path:'/mall/product/jd'
        })
      }
    }
  }
</script>
