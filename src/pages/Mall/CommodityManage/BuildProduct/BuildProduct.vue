<template>
  <section class="build-product-container">
    <div class="box-container">
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="商品状态">
            <el-select
                v-model="filters.status"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in productList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="商品类型">
            <el-select
                v-model="filters.giftType"
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
          <el-form-item :size="'small'" label="关键词">
            <el-input v-model="filters.keywords" style="width: 200px" placeholder="请输入关键词"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="分类">
            <el-select
                v-model="filters.cateLvl1"
                placeholder="请选择"
                @change="selectBrand1"
                style="width: 200px">
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
                @change="selectBrand2"
                style="width: 200px">
              <el-option
                  v-for="item in cateLvl2List"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
            <el-select
                v-model="filters.cateLvl3"
                placeholder="请选择"
                @change="selectBrand3"
                style="width: 200px">
              <el-option
                  v-for="item in cateLvl3List"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
            <el-select
                v-model="filters.cateLvl4"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in cateLvl4List"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div></div>
          <el-form-item class="mr0" :size="'small'">
            <el-button type="primary" size="small" @click="commitForm">查询</el-button>
            <el-button size="small" class="important" @click="getStatus">重置</el-button>
            <el-button type="primary" size="small" @click="sortBySales">按销量排序</el-button>
            <el-button type="primary" size="small" @click="sortByScore">按兑换值排序</el-button>
            <el-button type="primary" size="small" @click="sortByTime">按创建时间排序</el-button>
            <el-button type="primary" size="small" @click="addProduct">新建商品</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="box-container">
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            :data="listZJ"
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="productId"
              label="商品ID"
              width="200">
          </el-table-column>
          <el-table-column
              prop="memo"
              label="商品名称"
              width="120">
          </el-table-column>
          <el-table-column
              prop="giftType"
              label="商品类型">
            <template slot-scope="scope">
              <span>{{ scope.row.giftType == "1" ? "虚拟商品":"实物商品"}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="cate1Name"
              label="一级分类"
              width="120">
          </el-table-column>
          <el-table-column
              prop="cate2Name"
              label="二级分类"
              width="120">
          </el-table-column>
          <el-table-column
              prop="cate3Name"
              label="三级分类"
              width="120">
          </el-table-column>
          <el-table-column
              prop="cate4Name"
              label="四级分类"
              width="120">
          </el-table-column>
          <el-table-column
              prop="score"
              label="兑换值">
          </el-table-column>
          <el-table-column
              prop="shopQuantity"
              label="库存">
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="创建时间"
              width="200">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.createTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="status"
              label="商品类型">
            <template slot-scope="scope">
              <span>{{ scope.row.status == "1" ? "上架中":"下架中"}}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
              <el-button
                  size="mini"
                  @click="editProduct(scope.row.id)"
              >编辑</el-button>
              <el-button
                  v-if="scope.row.status == '1'"
                  size="mini"
                  @click="productOffline(scope.row.id)"
              >下架</el-button>
              <el-button
                  v-else
                  size="mini"
                  @click="productOnline(scope.row.id)"
              >上架</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteProduct(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
        <el-button
            type="primary"
            size="small"
            :disabled="batchDelete"
            @click="removeBatch(ids)"
        >批量删除</el-button>
        <el-button type="primary" class="btn-jump-to" @click="jumpTo">跳转</el-button>
        <el-pagination
            background
            layout="total,prev, pager, next,jumper"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="total"
            style="float:right;">
        </el-pagination>
      </el-col>
    </div>
  </section>
</template>

<script>
  export default {
    name: "BuildProduct",
    data() {
      return {
        //载入条
        listLoading:false,
        //商品状态下拉
        productList:[
          {name: "全部", id: ""}
        ],
        //商品类型下拉
        productTypeList:[
          {name: "全部", id: ""}
        ],
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
        filters:{
          //商品状态
          status:"",
          //商品类型
          giftType:"",
          //关键词
          keywords:"",
          //分类
          cateLvl1:"",
          cateLvl2:"",
          cateLvl3:"",
          cateLvl4:"",
        },
        //自建商品列表
        listZJ:[],
        //升序：1，降序：0
        sort:0,
        //批量选择
        ids:"",
        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0,

        //批量删除
        batchDelete:true,
      }
    },
    created(){
      this.getProductList()
      this.getProductType()
      this.getOneCategory()
      this.getListZJ()
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
        this.filters.cateLvl2 = ""
        this.cateLvl2List = [{name: "全部", id: ""}]
        this.filters.cateLvl3 = ""
        this.cateLvl3List = [{name: "全部", id: ""}]
        this.filters.cateLvl4 = ""
        this.cateLvl4List = [{name: "全部", id: ""}]
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
      selectBrand2(){
        this.filters.cateLvl3 = ""
        this.cateLvl3List = [{name: "全部", id: ""}]
        this.filters.cateLvl4 = ""
        this.cateLvl4List = [{name: "全部", id: ""}]
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.filters.cateLvl2 == "")return
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.filters.cateLvl2}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl3List = [...this.cateLvl3List,...res.data]
          }
        })
      },
      selectBrand3(){
        this.filters.cateLvl4 = ""
        this.cateLvl4List = [{name: "全部", id: ""}]
        this.getFourCategory()
      },
      //从后台拿取商品分类4
      getFourCategory(){
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.filters.cateLvl3}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl4List = [...this.cateLvl4List,...res.data]
          }
        })
      },
      //升降序判断
      modiifySort(){
        if(this.sort == 1){
          this.sort = 0
        }else {
          this.sort = 1
        }
      },
      //获取列表
      getListZJ(type) {
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
          cateLvl3:this.filters.cateLvl3,
          cateLvl4:this.filters.cateLvl4,

          pageSize:this.pageSize,
          currentPageNumber:this.pageNo
        };
        if(type == "bySales"){
          params.order = 1
          params.sort = this.sort
          this.modiifySort()
        }else if(type == "byScore"){
          params.order = 2
          params.sort = this.sort
          this.modiifySort()
        }else if(type == "byTime"){
          params.order = 3
          params.sort = this.sort
          this.modiifySort()
        }
        this.postSearch(params)
      },
      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/sc/saotx/mall/product/listZJ', params, true, (res) => {
          if (res.ret == '200000') {
            console.log(res.data)
            this.listLoading = false;
            this.listZJ = res.data.list
            this.total = res.data.page.count
            this.pageNo = res.data.page.pageNo
          }
        })
      },
      //radio按钮,重置
      getStatus() {
        //商品状态
        this.filters.status = ''
        //商品类型
        this.filters.giftType = ''
        //关键词
        this.filters.keywords = ''
        //分类
        this.filters.cateLvl1 = ''
        this.filters.cateLvl2 = ''
        this.filters.cateLvl3 = ''
        this.filters.cateLvl4 = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getListZJ()
      },
      //查询按钮
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getListZJ()
      },
      //按销量排序
      sortBySales(){
        this.getListZJ("bySales")
      },
      sortByScore(){
        this.getListZJ("byScore")
      },
      sortByTime(){
        this.getListZJ("byTime")
      },
      addProduct(){
        this.$router.push({
          path:'/mall/product/zj/addProduct'
        })
      },
      //删除商品
      deleteProduct(id){
        let params = {id}
        this.$confirm(`您确定刪除此商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/sc/saotx/mall/product/remove',params,true,res => {
            if(res.ret == "200000"){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListZJ()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        })
      },
      //编辑商品
      editProduct(id){
        this.$router.push({
          path:'/mall/product/zj/editProduct?id='+id
        })
      },
      //上架商品
      productOnline(id){
        let params = {id}
        this.$request.post('/sc/saotx/mall/product/online',params,true,res => {
          if(res.ret == "200000"){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.getListZJ()
          }else{
            this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        })
      },//下架商品
      productOffline(id){
        let params = {id}
        this.$request.post('/sc/saotx/mall/product/offline',params,true,res => {
          if(res.ret == "200000"){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.getListZJ()
          }else{
            this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        })
      },
      handleSelectionChange(val) {
        let arr = val
        console.log(arr)
        let idsArr = []
        if(arr.length > 0){
          this.batchDelete = false
          arr.map((e,i) => {
            idsArr.push(e.id)
          })
          this.ids = idsArr.join(",")
        }else{
          this.ids = ""
          this.batchDelete = true
        }
      },
      //批量删除
      removeBatch(){
        this.$confirm(`您确定批量刪除商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/sc/saotx/mall/product/removeBatch',{ids:this.ids},true,res => {
            if(res.ret == "200000"){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListZJ()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        })
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getListZJ()
      },
    }
  }
</script>

<style lang="scss" scoped>
 .build-product-container{
   .box-container{
     background-color: #fff;
     padding: 15px;
     margin-bottom: 30px;
     &:after{
       content: '';
       display: block;
       width: 0;
       height: 0;
       clear: both;
     }
   }
 }
 .el-form-item {
    margin-bottom: 20px;
 }
</style>
<style>
  .build-product-container .el-table{text-align: center}
  .build-product-container .el-table th{text-align: center}
  .build-product-container .el-table td{text-align: center}
  .build-product-container .mini .el-form-item__label {width: 40px!important;}
</style>