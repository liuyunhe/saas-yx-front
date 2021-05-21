<template>
  <div class="audit-manage-container">
    <div class="box-container">
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="审核状态">
            <el-select
                v-model="filters.jdOrderStatus"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in jdOrderStatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="时间区间">
            <el-date-picker
                v-model="filters.startTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm"
                style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :size="'small'" label="至" class="mini">
            <el-date-picker
                v-model="filters.endTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm"
                style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input size="small"  v-model="filters.userName"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input size="small"  v-model="filters.mobile"></el-input>
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
            :data="authList"
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="jdOrderStatus"
              label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.jdOrderStatus == 0">{{ '待审核' }}</span>
              <span v-else-if="scope.row.jdOrderStatus == 1">{{ '审核通过' }}</span>
              <span v-else>{{ '审核不通过' }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="orderId"
              label="订单号"
              width="300">
          </el-table-column>
          <el-table-column
              prop="awardName"
              label="商品名称">
          </el-table-column>
          <el-table-column
              prop="score"
              label="兑换币">
          </el-table-column>
          <el-table-column
              prop="originScore"
              label="原兑换币">
          </el-table-column>
          <el-table-column
              prop="openId"
              label="下单人opid"
              width="300">
          </el-table-column>
          <el-table-column
              prop="userName"
              label="收货人姓名"
              width="100px">
          </el-table-column
          ><el-table-column
              prop="mobile"
              label="手机号">
          </el-table-column>
          <el-table-column
              prop="mobile"
              label="收货地址"
              width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.provinceName + scope.row.cityName + scope.row.countryName + scope.row.address  }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="下单时间"
              width="200">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.createTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>


          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
              <el-button
                  v-if="scope.row.jdOrderStatus == 0"
                  size="mini"
                  @click="modifyAuthOrder(scope.row.id,'1')"
              >审核通过</el-button>
              <el-button
                  v-if="scope.row.jdOrderStatus == 0"
                  size="mini"
                  type="danger"
                  @click="modifyAuthOrder(scope.row.id,'2')"
              >审核不通过</el-button>
              <span v-else>无</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
        <el-button
            type="primary"
            size="small"
            :disabled="batchOperations"
            @click="modifyAuthOrder(ids,'1',true)"
        >批量通过</el-button>
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
  </div>
</template>

<style lang="scss" scoped>
  .audit-manage-container{
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
  .audit-manage-container .el-table{text-align: center}
  .audit-manage-container .el-table th{text-align: center}
  .audit-manage-container .el-table td{text-align: center}
  .audit-manage-container .mini .el-form-item__label {width: 40px!important;}
</style>

<script>
  export default {
    data() {
      return {
        //载入条
        listLoading:false,
        //批量操作按钮状态
        batchOperations:true,
        //批量选择
        ids:'',
        //审核状态下拉列表
        jdOrderStatusList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"0",
            name:"待审核"
          },
          {
            code:"1",
            name:"审核通过"
          },
          {
            code:"2",
            name:"审核不通过"
          }
        ],
        filters: {
          //订单审核状态：0-待审核；1-审核通过；2-审核不通过
          jdOrderStatus :'0',
          //开始时间
          startTime:'',
          //结束时间
          endTime:'',
          mobile:'',
          userName:''

        },
        //表单内容
        authList:[],

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0
      }
    },
    methods:{
      //获取列表
      getAuthList() {
        let params = {
          jdOrderStatus: this.filters.jdOrderStatus,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          mobile:this.filters.mobile,
          userName:this.filters.userName,
          orderType:4    //苏宁
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
      //查询按钮
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getAuthList()
      },
      //radio按钮,重置
      getStatus() {
        this.filters.jdOrderStatus = ''
        this.filters.startTime = ''
        this.filters.endTime = ''
        this.filters.userName = ''
        this.filters.mobile = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getAuthList()
      },
      //编辑
      handleEdit(index, row) {
        this.$router.push({path:'/product/editSupplier?id='+row.id})
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getAuthList()
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
      modifyAuthOrder(ids,jdOrderStatus,batch) {
        let params = {
          ids,
          jdOrderStatus
        }
        let flag = ""
        if(jdOrderStatus == '2'){
          flag = "不"
        }
        let _batch = ""
        if(batch){
          _batch = "批量"
        }
        this.$confirm(`您确定审核${flag}通过此${_batch}订单？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.$request.post('/sc/saotx/mall/order/authOrder',params,true,res => {
              this.$request.post('/sc/saotx/mall/order/authOrder/suning',params,true,res => {
            if(res.ret == "200000"){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getStatus()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
            })
        })
      },
      handleSelectionChange(val) {
        let arr = val
        console.log(arr)
        let idsArr = []
        if(arr.length > 0 && this.filters.jdOrderStatus == "0"){
          this.batchOperations = false
          arr.map((e,i) => {
            idsArr.push(e.id)
          })
          this.ids = idsArr.join(",")
        }else{
          this.ids = ""
          this.batchOperations = true
        }

      }

    },
    created(){
      this.getAuthList()
    }
  }
</script>
