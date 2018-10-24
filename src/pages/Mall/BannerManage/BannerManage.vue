<template>
    <section class="banner-manage-container clearfix">
      <div class="box-container">
        <el-col :span="24" class="breadcrumb-container">
          <el-button size="small" type="primary" @click="addBanner">新增banner</el-button>
        </el-col>
        <!--列表-->
        <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
          <el-table
              :data="bannerlist"
              style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="70">
            </el-table-column>
            <el-table-column
                label="略缩图"
                width="120">
              <template slot-scope="scope">
                <img :src="scope.row.image" height="48" style="display: block;margin: 0 auto" alt="">
              </template>
            </el-table-column>
            <el-table-column
                prop="typeName"
                label="链接类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="typeVal"
                label="链接地址/商品ID	"
                width="180">
            </el-table-column>
            <el-table-column
                prop="idx"
                label="排序值">
            </el-table-column>
            <el-table-column
                prop="ctime"
                label="创建时间"
                width="150">
              <template slot-scope="scope">
                <span>{{ new Date(scope.row.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="editBanner(scope.row.id)">
                  编辑</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="deleteBanner(scope.row.id)">
                  删除</el-button>
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
    .banner-manage-container{
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

</style>
<style>
  .banner-manage-container .el-table{text-align: center}
  .banner-manage-container .el-table th{text-align: center}
</style>
<script>
  export default {
    name: "",
    data() {
      return {
        //载入动画显示
        listLoading: false,

        //链接类型列表
        bannerTypeList:[],

        //table内容
        bannerlist: [],
        //数据总条数
        total: 0,
        //分页器当前选中页码
        currentPage: 1,

        pageNo: 1,
        pageSize: 10,

        addBannerFormVisible: false,
      }
    },
    methods: {
      //从后台拿取链接类型bannerTypeMap
      getListBrand(){
        this.$request.post('/sc/saotx/mall/bannerTypeMap',{}, true, (res) => {
          if (res.ret == '200000') {
            this.bannerTypeList = res.data
          }
        })
      },
      addBanner(){
        this.$router.push({
          path:"/mall/banner/addBanner"
        })
      },
      //获取列表
      getBannerList() {
        let params = {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,
        };
        this.postSearch(params)
      },
      //传送查询条件
      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/sc/saotx/mall/banner/list', params, true, (res) => {
          if (res.ret == '200000') {
            this.bannerlist = res.data.list
            this.total = res.data.page.count
            this.pageSize = res.data.page.pageSize
            this.pageNo = res.data.page.pageNo
            this.listLoading = false;
          }
        })
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getBannerList()
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      editBanner(id){
        this.$router.push({
          path:'/mall/banner/editBanner?id='+id
        })
      },
      deleteBanner(id){
        console.log(id)
      }
    },
    created(){
      this.getBannerList()


    },

  }
</script>