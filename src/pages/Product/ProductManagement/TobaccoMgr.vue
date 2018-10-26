<template>
    <section class="tobacco-container clearfix">
      <div class="box-container">
        <!--面包屑-->
        <el-col :span="24" class="breadcrumb-container">
          <el-button size="small" type="primary" @click="addTobaccoMgr">新增卷烟</el-button>
        </el-col>
        <!--查询表单-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item :size="'small'" label="品牌">
              <el-select
                  v-model="filters.brandCodeArr"
                  multiple
                  collapse-tags
                  filterable
                  style="width: 200px"
                  placeholder="请选择"
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
            <el-form-item :size="'small'" label="规格">
              <el-select
                  v-model="filters.snArr"
                  multiple
                  collapse-tags
                  filterable
                  style="width: 200px"
                  placeholder="请选择">
                <el-option
                    v-for="item in snList"
                    :key="item.sn"
                    :label="item.name"
                    :value="item.sn">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :size="'small'" label="包装">
              <el-select
                  v-model="filters.packArr"
                  multiple
                  collapse-tags
                  filterable
                  style="width: 200px"
                  placeholder="请选择">
                <el-option
                    v-for="item in packArrList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :size="'small'" label="价类">
              <el-select
                  v-model="filters.gradeArr"
                  multiple
                  collapse-tags
                  filterable
                  style="width: 200px"
                  placeholder="请选择">
                <el-option
                    v-for="item in gradeArrList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :size="'small'" label="价格" style="margin-right: 10px">
              <el-input v-model="filters.minPrice" style="width: 80px" placeholder="最大值"></el-input>
            </el-form-item>
            <el-form-item :size="'small'" label="至">
              <el-input v-model="filters.maxPrice" style="width: 80px" placeholder="最小值"></el-input>
            </el-form-item>
            <div></div>
            <el-form-item class="mr0" :size="'small'">
              <el-button type="primary" size="small" @click="commitForm">查询</el-button>
              <el-button size="small" class="important" @click="getStatus">重置</el-button>
            </el-form-item>
            、
          </el-form>
        </el-col>
      </div>
      <div class="box-container">
        <!--列表-->
        <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
          <el-table
              :data="listTbc"
              style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="70">
            </el-table-column>
            <el-table-column
                type="index"
                label="略缩图"
                width="120">
              <template slot-scope="scope">
                <img :src="scope.row.product.bigPic" width="23" style="display: block;margin: 0 auto" alt="">
              </template>
            </el-table-column>
            <el-table-column
                prop="product.brandName"
                label="品牌"
                width="120">
            </el-table-column>
            <el-table-column
                prop="product.allName"
                label="规格"
                width="180">
            </el-table-column>
            <el-table-column
                prop="product.sn"
                label="SN码">
            </el-table-column>
            <el-table-column
                prop="gradeName"
                label="价类"
                width="80">
            </el-table-column>
            <el-table-column
                prop="packName"
                label="包装"
                width="80">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格（元）"
                width="100">
            </el-table-column>
            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <!--工具条-->
        <el-col :span="24" class="footer-toolbar">
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

<style lang="scss" scoped>
    .tobacco-container{
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
    .el-dropdown {
        color: #8A96A0 !important;
        cursor: pointer;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .crm-tag {
        float: left;
        height: 24px;
        font-size: 12px;
        line-height: 22px;
        border: 1px solid #DCE0E6;
        border-radius: 2px;
        color: #5E6D82;
        margin-top: 8px;
        margin-right: 20px;
        .ms {
            float: left;
            padding: 0 12px;
        }
        .del {
            float: left;
            width: 24px;
            text-align: center;
            border-left: 1px solid #DCE0E6;
            cursor: pointer;
        }
    }
</style>
<style>
  .tobacco-container .el-table{text-align: center}
  .tobacco-container .el-table th{text-align: center}
</style>
<script>
  export default {
    name: "",
    data() {
      return {
        //品牌列表
        brandList:[],
        //规格列表
        snList:[],
        //包装列表
        packArrList:[],
        //价类列表
        gradeArrList:[],
        //载入动画显示
        listLoading: false,
        //表单
        filters: {
          brandCodeArr: [],
          snArr: [],
          packArr:[],
          gradeArr: [],
          minPrice:'',
          maxPrice:''
        },
        //table内容
        listTbc: [],
        //数据总条数
        total: 0,
        //分页器当前选中页码
        currentPage: 1,

        pageNo: 1,
        pageSize: 10,
      }
    },
    methods: {
      addTobaccoMgr(){
        this.$router.push({
          path:"/product/mgr/addTobaccoMr"
        })
      },
      //获取列表
      getTbcList() {
        let params = {
          "brandCodeArr": this.filters.brandCodeArr,
          "snArr": this.filters.snArr,
          "gradeArr": this.filters.gradeArr,
          "maxPrice": this.filters.maxPrice,
          "minPrice": this.filters.minPrice,
          "packArr": this.filters.packArr,
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,

        };
        this.postSearch(params)
      },
      selectBrand(selected){
        this.filters.snArr = []
        this.getListSN()
      },
      //从后台拿取品牌列表listBrand
      getListBrand(){
        this.$request.post('/api/saotx/prod/listBrand',{}, true, (res) => {
          if (res.ret == '200000') {
            this.brandList = res.data.list
          }
        })
      },
      //从后台拿取规格1列表listBrand
      getListSN(){
        this.$request.post('/api/saotx/prod/list',{"brandCodeArr":this.filters.brandCodeArr}, true, (res) => {
          if (res.ret == '200000') {
            this.snList = res.data.list
          }
        })
      },
      //从后台拿取包装列表tobaccoPack
      getTobaccoPack(){
        this.$request.post('/api/saotx/dim/tobaccoPack', {}, true, (res) => {
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
      //传送查询条件
      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/api/saotx/prod/listTbc', params, true, (res) => {
          if (res.ret == '200000') {
            this.listTbc = res.data.list
            this.total = res.data.page.count
            this.pageSize = res.data.page.pageSize
            this.pageNo = res.data.page.pageNo
            this.listLoading = false;
          }
        })
      },
      //查询按钮
      commitForm() {
        this.page = 1
        this.currentPage = 1
        this.getTbcList()
      },
      //radio按钮,重置
      getStatus() {
        this.filters.brandCodeArr = []
        this.filters.snArr = []
        this.filters.packArr = []
        this.filters.gradeArr = []
        this.filters.minPrice = ''
        this.filters.maxPrice = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getTbcList()
      },
      //编辑
      handleEdit(index, row) {
        this.$router.push({path:'/product/mgr/editTobaccoMr?id='+row.id})
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getTbcList()
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //超过十个字添加title属性
      // istitle(value) {
      //   if (value) {
      //     if (value.length > 5) {
      //       return value
      //     } else {
      //       return ""
      //     }
      //   }
      // },
      //新增按钮
      addTemplate() {

      },
    },
    created(){
      this.getListBrand()
      this.getTobaccoPack()
      this.getTobaccoGrade()

    },
    mounted() {
      this.getTbcList()
    }
  }
</script>