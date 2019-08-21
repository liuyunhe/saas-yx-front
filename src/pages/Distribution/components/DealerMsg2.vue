<template>
  <div class="seller-manage-container">
    <div class="box-container">
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="90px">
          <el-form-item class="mr0" :size="'small'">
            <el-button type="primary" size="small" @click="querySellerFans(1)">按申请成功时间</el-button>
            <el-button type="primary" size="small" @click="querySellerFans(2)">按团队数量排序</el-button>
            <el-button type="primary" size="small" @click="querySellerFans(3)">按积累佣金排序</el-button>
            <el-button type="primary" size="small" @click="querySellerFans(3)">按可提现金额排序</el-button>
            <el-button type="primary" size="small" @click="querySellerFans(3)">按已提现金额排序</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <div class="box-container">
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            :data="fansList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
            prop="wxId"
            label="微信ld"
            width="200">
          </el-table-column>
          <el-table-column
            prop="salerName"
            label="经销商姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phoneNo"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
              prop="phoneNo"
              label="微信号"
              width="120">
          </el-table-column>
          <el-table-column
              prop="region"
              width="200"
              label="位置">
            <template slot-scope="scope">
              <span>{{ scope.row.provinceName }}{{ scope.row.cityName }}{{ scope.row.areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="invitCode"
              label="推荐码">
          </el-table-column>
          <el-table-column
              prop="totalIncome"
              label="累积佣金">
          </el-table-column>
          <el-table-column
              prop="balance"
              width="100"
              label="可提现金额">
          </el-table-column>
          <el-table-column
              prop="totalPay"
              width="100"
              label="已提现金额">
          </el-table-column>
          <el-table-column
              prop="ctime"
              label="申请时间"
              width="200">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="申请通过时间"
              width="200"
          >
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.appPassTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">

        <!--<el-button type="primary" class="btn-jump-to" @click="jumpTo">跳转</el-button>-->
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
      <div style="text-align: center">
        <el-button type="primary" size="small"  @click="returnMgr">返回列表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['sellerId','returnPath'],
    name: "SellerManage",
    data(){
      return{
        listLoading:false,

        //状态列表

        filters: {
          //查询排序类型
          orderBy:1,

        },
        //表单内容
        fansList:[],

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0,

      }

    },
    created(){
      this.querySellerFans()
    },
    methods:{
      querySellerFans(type) {
        let params = {

          sellerId:this.sellerId,

          orderBy:this.filters.orderBy,


          pageNo: this.pageNo,
          pageSize: 10,

        };
        if(type){
          params.orderBy = type
          params.pageNo = 1
          this.pageNo = 1
          this.filters.orderBy = type
        }

        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/fxweb/fxsaas/getTeamList', params, true, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.fansList = res.data.listData
            this.total = res.data.pageResult.count
            this.pageNo = res.data.pageResult.pageNo
        })
      },

      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.querySellerFans()
      },
      returnMgr(){
        this.$router.push({
          path:this.returnPath
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .seller-manage-container{
  .box-container{
    background-color: #fff;
    padding: 15px;
    margin-bottom: 30px;
    add-new-seller{
      margin-bottom: 30px;
    }
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
<style >
  .seller-manage-container .el-table{text-align: center}
  .seller-manage-container .el-table th{text-align: center}
  .seller-manage-container .el-table td{text-align: center}
  .seller-manage-container .mini .el-form-item__label {width: 40px!important;}
  .seller-manage-container .large .el-form-item__label {width: 120px!important;}
</style>