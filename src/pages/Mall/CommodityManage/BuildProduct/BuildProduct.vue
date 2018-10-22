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
                style="width: 200px">
              <el-option
                  v-for="item in productTypeList"
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
                  v-for="item in productTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div></div>
          <el-form-item class="mr0" :size="'small'">
            <el-button type="primary" size="small" @click="">查询</el-button>
            <el-button size="small" class="important" @click="getStatus">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </section>
</template>

<script>
  export default {
    name: "BuildProduct",
    data() {
      return {
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

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0
      }
    },
    created(){
      this.getProductList()
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
        this.filters.cateLvl2 = ""
        this.filters.cateLvl3 = ""
        this.filters.cateLvl4 = ""
        this.getMoreCategory()
      },
      //从后台拿取商品分类2
      getMoreCategory(){
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.filters.cateLvl1}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl2List = [...this.cateLvl2List,...res.data]
          }
        })
      },
      selectBrand2(){
        this.filters.cateLvl3 = ""
        this.filters.cateLvl4 = ""
        this.getMoreCategory()
      },
      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/sc/saotx/mall/cate/oneCategory',{}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl1List = [...this.cateLvl1List,...res.data]
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

      //获取列表
      getAuthList() {
        let params = {
          jdOrderStatus: this.filters.jdOrderStatus,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
          currentPageNumber: this.pageNo,
          pageSize: this.pageSize

        };
        this.postSearch(params)
      },


      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/sc/saotx/mall/order/authList', params, true, (res) => {
          if (res.ret == '200000') {
            console.log(res.data)
            this.listLoading = false;
            this.authList = res.data.list
            this.total = res.data.page.count
            this.pageNo = res.data.page.pageNo
          }
        })
      },
      //radio按钮,重置
      getStatus() {
        this.filters.jdOrderStatus = ''
        this.filters.startTime = ''
        this.filters.endTime = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getAuthList()
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