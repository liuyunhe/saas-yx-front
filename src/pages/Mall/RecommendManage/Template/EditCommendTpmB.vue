<template>
  <section class="add-commend-container">
    <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <div class="add-commend-form-container">
        <el-form-item label="推荐位名称：" prop="name" size="small">
          <el-input v-model="ruleForm.name" style="width: 200px" :maxlength="10"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="排序值：" prop="idx" size="small">
          <el-input type="number" v-model="ruleForm.idx" style="width: 200px"  min="0" max="99999" @input="checkIdx(ruleForm.idx)"></el-input>
        </el-form-item>
        <div></div>


        <el-form-item label="选择商品：" prop="product1Name" size="small">
          <el-input v-model="ruleForm.product1Name" disabled placeholder="请选择商品" style="width: 200px"></el-input>
          <el-button type="primary" @click="chooseProduct('1')" style="margin-left: 30px">选择商品</el-button>
        </el-form-item>
        <div></div>
        <el-form-item label="图1：" prop="image1" size="small">
          <el-input v-model="ruleForm.image1" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
          >
            <img v-if="ruleForm.image1" width="100" height="63" :src="ruleForm.image1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">* 图片建议尺寸为 120*148px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
        </el-form-item>
        <div></div>

        <el-form-item label="商品2：" prop="product2Name" size="small">
          <el-input v-model="ruleForm.product2Name" disabled placeholder="请选择商品" style="width: 200px"></el-input>
          <el-button type="primary" @click="chooseProduct('2')" style="margin-left: 30px">选择商品</el-button>
        </el-form-item>
        <div></div>
        <el-form-item label="图2：" prop="image2" size="small">
          <el-input v-model="ruleForm.image2" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
          >
            <img v-if="ruleForm.image2" width="100" height="63" :src="ruleForm.image2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">* 图片建议尺寸为 120*148px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
        </el-form-item>
        <div></div>

        <el-form-item label="商品3：" prop="product3Name" size="small">
          <el-input v-model="ruleForm.product3Name" disabled placeholder="请选择商品" style="width: 200px"></el-input>
          <el-button type="primary" @click="chooseProduct('3')" style="margin-left: 30px">选择商品</el-button>
        </el-form-item>
        <div></div>
        <el-form-item label="图3：" prop="image3" size="small">
          <el-input v-model="ruleForm.image3" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
          >
            <img v-if="ruleForm.image3" width="100" height="63" :src="ruleForm.image3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">* 图片建议尺寸为 120*148px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
        </el-form-item>
        <div></div>

        <el-form-item label="商品4：" prop="product4Name" size="small">
          <el-input v-model="ruleForm.product4Name" disabled placeholder="请选择商品" style="width: 200px"></el-input>
          <el-button type="primary" @click="chooseProduct('4')" style="margin-left: 30px">选择商品</el-button>
        </el-form-item>
        <div></div>
        <el-form-item label="图4：" prop="image4" size="small">
          <el-input v-model="ruleForm.image4" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess4"
          >
            <img v-if="ruleForm.image4" width="100" height="63" :src="ruleForm.image4" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="pic-tips">* 图片建议尺寸为 120*148px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
        </el-form-item>
        <div></div>

        <!--        额外增加商品-->
        <template v-for="(item,index) in ruleForm.addItem">
          <el-form :model="item" :inline="true" :rules="addItemRules" ref="addItem" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="`商品${index + 5}：`" :prop="`productName`" size="small">
              <el-input v-model="item.productName" disabled placeholder="请选择商品" style="width: 200px"></el-input>
              <el-button type="primary" @click="chooseProduct(`${index+5}`)" style="margin-left: 30px">选择商品</el-button>
              <el-button type="danger" @click="delProduct(index)" style="margin-left: 30px">删除商品</el-button>
            </el-form-item>
            <div></div>
            <el-form-item :label="`图${index + 5}：`" prop="image" size="small">
              <el-input v-model="item.image" style="display: none" ></el-input>
              <el-upload
                  action="/api/wiseqr/attach/commonAliUpload"
                  list-type="picture-card"
                  class="product-img"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="(res)=> handleSuccess(index, res)"
              >
                <img v-if="item.image" width="100" height="63" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="pic-tips">* 图片建议尺寸为 120*148px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
            </el-form-item>
            <div></div>
          </el-form>
        </template>
        <div class="add-commend-form-bt">
          <el-form-item>
            <el-button type="primary" @click="handleAddItem">新增商品</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="returnRecommend">取消</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>


    <el-dialog title="选择商品" :visible.sync="dialogTableVisible" width="850px">

      <el-form :inline="true" :model="filters" label-width="80px">
        <el-form-item :size="'small'" label="关键词">
          <el-input placeholder="请输入内容" v-model="filters[filters.select]" class="input-with-select" style="width: 300px">
          <el-select v-model="filters.select" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 100px">
            <el-option label="商品名称" value="keywords"></el-option>
            <el-option label="商品ID" value="productId"></el-option>
          </el-select>
        </el-input>
        </el-form-item>
        <el-form-item :size="'small'" label="分类">
          <el-select
              v-model="filters.cateLvl1"
              placeholder="请选择"
              @change="selectBrand1"
              style="width: 100px">
            <el-option
                v-for="item in cateLvl1List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <el-select
              v-model="filters.cateLvl2"
              placeholder="请选择"
              style="width: 100px">
            <el-option
                v-for="item in cateLvl2List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mr0" :size="'small'">
          <el-button type="primary" size="small" @click="commitForm">查询</el-button>
        </el-form-item>
      </el-form>

      <el-tabs v-model="listType" type="card" @tab-click="handleClick">
        <el-tab-pane label="苏宁商品" name="JD">
          <el-table :data="listJD" ref="JDTable" v-loading="listLoading" highlight-current-row @current-change="handleSelectProduct"  @row-click = "showRowJD" >
            <el-table-column label="选择" width="50" align="center">
              <template slot-scope="scope">
                <el-radio class="radio"  v-model="radiojd"  :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="productId" label="商品ID" width="200"></el-table-column>
            <el-table-column property="memo" label="商品名称" width="200"></el-table-column>
            <el-table-column property="cate1Name" label="一级分类"></el-table-column>
            <el-table-column property="cate2Name" label="二级分类"></el-table-column>
            <el-table-column property="cate3Name" label="三级分类"></el-table-column>
            <el-table-column property="cate4Name" label="四级分类"></el-table-column>
          </el-table>
          <div class="footer-toolbar clearfix">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :current-page="currentPage"
                @current-change="handleCurrentChangeJD"
                :page-size="filters.pageSize"
                :total="filters.total"
                style="float:right;">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自建商品" name="ZJ">
          <el-table :data="listZJ" ref="ZJTable" v-loading="listLoading" highlight-current-row @current-change="handleSelectProduct"  @row-click = "showRowZJ">
            <el-table-column label="选择" width="50" align="center">
              <template slot-scope="scope">
                <el-radio class="radio"  v-model="radiozj"  :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="productId" label="商品ID" width="200"></el-table-column>
            <el-table-column property="memo" label="商品名称"  width="200"></el-table-column>
            <el-table-column property="cate1Name" label="一级分类"></el-table-column>
            <el-table-column property="cate2Name" label="二级分类"></el-table-column>
            <el-table-column property="cate3Name" label="三级分类"></el-table-column>
            <el-table-column property="cate4Name" label="四级分类"></el-table-column>
          </el-table>
          <div class="footer-toolbar clearfix">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :current-page="currentPage"
                @current-change="handleCurrentChangeZJ"
                :page-size="filters.pageSize"
                :total="filters.total"
                style="float:right;">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div style="margin-top: 30px;text-align: center">
        <el-button type="primary" size="small" @click="confirmDialog">确定</el-button>
        <el-button size="small" @click="cancelDialog">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<style lang="scss" scoped>
  .add-commend-container{
    background-color:   #fff;
    padding: 30px 15px;
    .add-commend-form-container{
      width: 910px;
      margin: 0 auto;
      .pic-tips{
        color: #ccc;
      }
    }
    .add-commend-form-bt{
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
<style>
.add-commend-form-container .product-img .el-upload {
  width: 102px;
  height: 65px;
  line-height: 73px;
}
.add-commend-form-container .product-img .el-upload .avatar{
  width: 102px;
  height: 65px;
  line-height: 73px;
}
.add-commend-form-container .main-product-img .el-upload {
  width: 102px;
  height: 36px;
  line-height: 44px;

}
.add-commend-form-container .main-product-img .el-upload .avatar{
  width: 102px;
  height: 36px;
  line-height: 44px;

}
.add-commend-container .el-table{text-align: center}
.add-commend-container .el-table th{text-align: center}
.add-commend-container .el-table td{text-align: center}
</style>
<script>
  export default {
    props:["id"],
    name: "",
    data() {
      return {
        //载入条
        listLoading:false,
        //选择商品时的表格对话框
        dialogTableVisible:false,
        //对话框表格类型
        listType: 'JD',
        radiojd:'',
        radiozj:'',
        listJD: [],
        listZJ: [],

        ProductIndex:"",

        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },

        //分类列表
        cateLvl1List:[
          {name: "全部", id: ""}
        ],
        cateLvl2List:[
          {name: "全部", id: ""}
        ],

        ruleForm: {
          //推荐位展示类型
          type:"2",
          //推荐位名称
          name: '',
          //排序值
          idx:'',


          //商品1
          product1Id:'',
          product1Name:'',
          image1:'',
          //商品2
          product2Id:'',
          product2Name:'',
          image2:'',
          //商品3
          product3Id:'',
          product3Name:'',
          image3:'',
          //商品4
          product4Id:'',
          product4Name:'',
          image4:'',
          addItem:[],

        },
        rules: {
          name: [
            { required: true, message: '请输入推荐位名称', trigger: 'blur' },
          ],
          idx: [
            { required: true, message: '请输入排序值', trigger: 'blur' },
          ],

          product1Name: [
            { required: true, message: '请选择商品', trigger: 'change' },
          ],
          image1: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],

          product2Name: [
            { required: true, message: '请选择商品', trigger: 'change' },
          ],
          image2: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],

          product3Name: [
            { required: true, message: '请选择商品', trigger: 'change' },
          ],
          image3: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],
          product4Name: [
            { required: true, message: '请选择商品', trigger: 'change' },
          ],
          image4: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],

        },
        addItemRules:{
          productName: [
            { required: true, message: '请选择商品', trigger: 'change' },
          ],
          image: [
            { required: true, message: '请上传图片', trigger: 'change' },
          ],
        },
        filters:{
          inputWithSelect:"",
          select:"",
          //商品状态
          status:1,
          //商品类型
          giftType:"",
          //是否有运费
          hasDelivery:"",
          //关键词
          keywords:"",
          //分类
          cateLvl1:"",
          cateLvl2:"",
          productId:"",
          //每页条数
          pageSize:5,

          pageNo: 1,


          //总条数
          total:0,
        },
        //当前页码
        currentPage:1,

        selectProduct:{
          productId : "",
          productName : "",
          image:""
        }

      }
    },
    created(){
      this.getOneCategory()
      this.getListJD()
      this.getListZJ()
      this.getRecommendDetail()
    },
    methods:{
        showRowJD(row){
            //赋值给radio
            this.radiojd = this.listJD.indexOf(row);
        },
        showRowZJ(row){
            //赋值给radio
            this.radiozj = this.listZJ.indexOf(row);
        },
        checkIdx(value){
            if (value) {
                if (value > 99999 ) {
                    this.ruleForm.idx ='';
                }
            }
        },
      getRecommendDetail() {
        this.$request.post('/sc/saotx/mall/recommend/detail',{id:this.id},true,res => {
          if (res.ret == '200000') {
            this.ruleForm.name = res.data.name
            this.ruleForm.idx = res.data.idx
            let recommendProducts = res.data.recommendProducts
            recommendProducts.map((e,i)=>{
              if(i<4){
                this.ruleForm['product'+e.idx+'Id'] = e.productId
                this.ruleForm['product'+e.idx+'Name'] = e.productName
                this.ruleForm['image'+e.idx] = e.productImage
              }else {
                this.ruleForm.addItem.push(
                  {
                    productId:e.productId,
                    productName:e.productName,
                    image:e.productImage
                  }
                )
              }

            })

          }
        })
      },
      //从后台拿取京东商品列表
      getListJD() {
        let params = {
          //商品状态
          status:this.filters.status,
          //商品类型
          giftType:this.filters.giftType,
          //是否有运费
          hasDelivery:this.filters.hasDelivery,
          //关键词
          keywords:this.filters.keywords,
          //分类
          cateLvl1:this.filters.cateLvl1,
          cateLvl2:this.filters.cateLvl2,

          productId:this.filters.productId,

          pageSize:this.filters.pageSize,
          pageNo:this.filters.pageNo
        };

        this.postSearchJD(params)
      },
      postSearchJD(params) {
        this.listLoading = true;
        // this.$request.post('/sc/saotx/mall/product/listJD', params, true, (res) => {
        this.$request.post('/sc/mall/suning/product/list', params, true, (res) => {
          if (res.ret == '200000') {
            this.listLoading = false;
            this.listJD = res.data.list
            this.filters.total = res.data.page.count
            this.filters.pageNo = res.data.page.pageNo
          }
        })
      },
      //从后台拿取自建商品列表
      getListZJ() {
        let params = {
          //商品状态
          status:this.filters.status,
          //商品类型
          giftType:this.filters.giftType,
          //关键词
          keywords:this.filters.keywords,
          //分类
          cateLvl1:this.filters.cateLvl1,
          cateLvl2:this.filters.cateLvl2,
          productId:this.filters.productId,
          pageSize:this.filters.pageSize,
          pageNo:this.filters.pageNo
        };
        this.postSearchZJ(params)
      },
      postSearchZJ(params) {
        this.listLoading = true;
        this.$request.post('/sc/saotx/mall/product/listZJ', params, true, (res) => {
          if (res.ret == '200000') {
            console.log(res.data)
            this.listLoading = false;
            this.listZJ = res.data.list
            this.filters.total = res.data.page.count
            this.filters.pageNo = res.data.page.pageNo
          }
        })
      },
      commitForm() {
        this.handleClick()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
        this.filters.productId = ""
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
        this.filters.cateLvl2 = ""
        this.cateLvl2List = [{name: "全部", id: ""}]
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.filters.cateLvl1 == "")return
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.filters.cateLvl1}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl2List = [...this.cateLvl2List,...res.data]
          }
        })
      },

      chooseProduct(index){
        this.dialogTableVisible = true
        this.ProductIndex = index
      },
      handleAddItem(){
        this.ruleForm.addItem.push(
          {
            productId:'',
            productName:'',
            image:'',
          }
        )
      },
      delProduct(index){
        this.ruleForm.addItem.splice(index,1)
      },
      submitForm(formName) {
        let $this = this
        let flag = true
        console.log($this.$refs['addItem'] && $this.$refs['addItem'].length)
        if($this.$refs['addItem'] && $this.$refs['addItem'].length){
          let arr = []
          $this.$refs['addItem'].forEach((e,i)=>{
            let func = function () {
              return new Promise((resolve, reject) => {
                e.validate((valid1) =>{
                  if(valid1){
                    resolve()
                  }else {
                    flag = false
                    resolve()
                  }
                })
              })
            }
            arr.push(func)
          })
          console.log(arr)
          let queue = (arr)=>{
            let sequence = Promise.resolve()
            arr.forEach((item)=>{
              sequence = sequence.then(item())
            })
            return sequence
          }
          queue(arr)

        }
        this.$refs[formName].validate((valid) => {
          console.log(flag)
          if (valid && flag) {
            let addItem = []
            if(this.ruleForm.addItem.length){
              addItem = this.ruleForm.addItem.map((e,i)=>{
                return {
                  productId: e.productId,
                  productName:e.productName,
                  productImage:e.image,
                  idx: i+5
                }
              })
            }
            let params = {
              id:this.id,
              type:2,
              name:this.ruleForm.name,
              idx:this.ruleForm.idx,
              recommendProducts:[
                {
                  productId: this.ruleForm.product1Id,
                  productName:this.ruleForm.product1Name,
                  productImage:this.ruleForm.image1,
                  idx: 1
                },
                {
                  productId: this.ruleForm.product2Id,
                  productName:this.ruleForm.product2Name,
                  productImage:this.ruleForm.image2,
                  idx: 2
                },
                {
                  productId: this.ruleForm.product3Id,
                  productName:this.ruleForm.product3Name,
                  productImage:this.ruleForm.image3,
                  idx: 3
                },
                {
                  productId: this.ruleForm.product4Id,
                  productName:this.ruleForm.product4Name,
                  productImage:this.ruleForm.image4,
                  idx: 4
                },
                ...addItem
              ]

            }
            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/sc/saotx/mall/recommend/saveOrModify',params,true,res => {
          if(res.ret == '200000'){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.returnRecommend()
          }else{
            this.$message({
              message:res.message,
              type: 'warning'
            })
          }
        },err => {

        })
      },




      handleAvatarSuccess1(res, file) {
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.image1 = imgUrl;
      },
      handleAvatarSuccess2(res, file) {
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.image2 = imgUrl;
      },
      handleAvatarSuccess3(res, file) {
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.image3 = imgUrl;
      },
      handleAvatarSuccess4(res, file) {
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.image4 = imgUrl;
      },
      handleSuccess(idx,res){
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.addItem[idx].image = imgUrl;
      },
      returnRecommend(){
        this.$router.push({
          path:'/mall/recommend'
        })
      },
      handleSelectProduct(val) {
        console.log(val)
        if(val){
          let product = val
          this.selectProduct.productId = product.productId
          this.selectProduct.productName = product.memo
          this.selectProduct.image = product.image
        }


      },
      //tabs切换
      handleClick(tab, event) {
        this.filters.pageNo = 1
        this.currentPage = 1
        this.radiojd = ''
        this.radiozj = ''
        if(this.listType == "JD"){
          this.getListJD()
        }else if(this.listType == "ZJ"){
          this.getListZJ()
        }
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //分页器功能
      handleCurrentChangeZJ(val) {
        this.radiojd = ''
        this.radiozj = ''
        this.filters.pageNo = val
        this.currentPage = val
        this.getListZJ()
      },handleCurrentChangeJD(val) {
        this.radiojd = ''
        this.radiozj = ''
        this.filters.pageNo = val
        this.currentPage = val
        this.getListJD()
      },

      confirmDialog(){
        if(this.ruleForm.product1Id == this.selectProduct.productId || this.ruleForm.product2Id == this.selectProduct.productId || this.ruleForm.product3Id == this.selectProduct.productId || this.ruleForm.product4Id == this.selectProduct.productId || this.ruleForm.addItem.findIndex((e)=>e.productId == this.selectProduct.productId) > -1){
          this.$message({
            message:"已选择当前商品",
            type: 'warning'
          })
        }else {
          if(this.ProductIndex <= 4){
            this.ruleForm["product"+this.ProductIndex+"Id"] = this.selectProduct.productId
            this.ruleForm["product"+this.ProductIndex+"Name"] = this.selectProduct.productName
            this.ruleForm["image"+this.ProductIndex] = this.selectProduct.image
          }else {
            this.ruleForm.addItem[this.ProductIndex -5].productId = this.selectProduct.productId
            this.ruleForm.addItem[this.ProductIndex -5].productName = this.selectProduct.productName
            this.ruleForm.addItem[this.ProductIndex -5].image = this.selectProduct.image
          }
          this.$refs.JDTable.setCurrentRow();
          this.$refs.ZJTable.setCurrentRow();
          this.dialogTableVisible = false
          this.filters.select = ""
          this.filters.productId = ""
          this.filters.keywords = ""
          this.filters.cateLvl1 = ""
          this.filters.cateLvl2 = ""
          this.filters.pageNo = 1
          this.currentPage = 1
          this.listType ='JD'
          this.getListJD()
          this.selectProduct.productName = ""
          this.selectProduct.productId = ""
          this.selectProduct.image = ""
          this.radiojd = ''
          this.radiozj = ''
        }
      },
      cancelDialog() {
        this.$refs.JDTable.setCurrentRow();
        this.$refs.ZJTable.setCurrentRow();
        this.dialogTableVisible = false
        this.filters.select = ""
        this.filters.productId = ""
        this.filters.keywords = ""
        this.filters.cateLvl1 = ""
        this.filters.cateLvl2 = ""
        this.filters.pageNo = 1
        this.currentPage = 1
        this.listType ='JD'
        this.getListJD()
        this.selectProduct.productName = ""
        this.selectProduct.productId = ""
        this.selectProduct.image = ""
        this.dialogTableVisible = false
        this.radiojd = ''
        this.radiozj = ''
      }
    }
  }
</script>
