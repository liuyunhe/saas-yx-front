<template>
  <div class="seller-manage-container">
    <div class="box-container">
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="90px">
          <el-form-item :size="'small'" label="时间区间：">
            <el-date-picker
                v-model="filters.time"
                type="datetimerange"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 350px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :size="'small'" label="交易类型：">
            <el-select
                v-model="filters.type"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in typeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <div></div>
          <el-form-item class="mr0" :size="'small'">
            <el-button type="primary" size="small" @click="commitForm">查询</el-button>
            <el-button size="small" class="important" @click="getStatus">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <div class="box-container">
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            :data="accountFlowList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="type"
              label="交易类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">{{"扫码返现"}}</span>
              <span v-else-if="scope.row.type == 2">{{"提现"}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="amount"
              label="金额">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 2" style="color: red">-￥{{ scope.row.amount }}</span>
              <span v-else-if="scope.row.type == 1" style="color: #0c9b0d">+￥{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="time"
              label="交易时间">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.time).Format('yyyy-MM-dd hh:mm:ss')}}</span>
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

        typeList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"1",
            name:"扫码返现"
          },
          {
            code:"2",
            name:"提现"
          },

        ],

        filters: {
          type:'',


          time:[]

        },
        //表单内容
        accountFlowList:[],

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
      this.getAccountFlowList()
    },
    methods:{
      getAccountFlowList() {
        let params = {

          sellerId:this.sellerId,
          type:this.filters.type,

          //时间
          startTime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          endTime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',

          pageNo: this.pageNo,
          pageSize: 10,

        };


        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/lsh/seller-manager/seller/accountFlow', params, false, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.accountFlowList = res.data.list
            this.total = res.data.page.count
            this.pageNo = res.data.page.pageNo
        })
      },
      //查詢
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getAccountFlowList()
      },
      //重置
      getStatus() {

        this.filters.type = ''
        this.filters.time = []



        this.pageNo = 1
        this.currentPage = 1
        this.getAccountFlowList()
      },



      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getAccountFlowList()
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