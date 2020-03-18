<template>
  <div class="audit-manage-container">
    <div class="box-container">
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <div style="margin-bottom: 20px">
          <el-button type="primary" size="small" @click="jumpAddDiscount">添加限时折扣</el-button>
        </div>
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="标题名称">
            <el-input v-model="filters.keywords" style="width: 200px" placeholder="请输入标题名称"></el-input>
          </el-form-item>
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
            :data="discountList"
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="id"
              label="ID">
          </el-table-column>
          <el-table-column
              prop="actName"
              label="标题名称">
          </el-table-column>
          <el-table-column
              label="折扣时间"
              width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.stime }}至{{ scope.row.etime }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="jdOrderStatus"
              label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">{{ '启用' }}</span>
              <span v-else-if="scope.row.status == 2">{{ '禁用' }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
              <el-button
                  v-if="scope.row.status == 1"
                  size="mini"
                  @click="jumpEditDiscount(scope.row.id,1)"
              >详情</el-button>
              <el-button
                  v-if="scope.row.status == 2"
                  size="mini"
                  @click="jumpEditDiscount(scope.row.id,0)"
              >编辑</el-button>
              <el-button
                  v-if="scope.row.status == 2"
                  size="mini"
                  type="primary"
                  @click="modifyAuthOrder(scope.row.id,'1')"
              >启用</el-button>
              <el-button
                  v-if="scope.row.status == 1"
                  size="mini"
                  type="danger"
                  @click="modifyAuthOrder(scope.row.id,'2')"
              >禁用</el-button>
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
          keywords:'',
          //订单审核状态：0-待审核；1-审核通过；2-审核不通过
          jdOrderStatus :'0',
          //开始时间
          startTime:'',
          //结束时间
          endTime:'',


        },
        //表单内容
        discountList:[],

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
      jumpAddDiscount(){
        this.$router.push('/mall/addDiscount')
      },
      jumpEditDiscount(id,n){
        this.$router.push(`/mall/editDiscount?id=${id}&disable=${n}`)
      },
      //获取列表
      getDiscountList() {
        let params = {
          jdOrderStatus: this.filters.jdOrderStatus,
          startTime: this.filters.startTime,
          endTime: this.filters.endTime,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderType:4    //苏宁
        };
        this.postSearch(params)
      },


      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/sc/discount/act/select//list', {}, true, (res) => {
          if (res.code == '200') {
            console.log(res.data)
            this.listLoading = false;
            this.discountList = res.data
            this.total = res.data.page.count
            this.pageNo = res.data.page.pageNo
          }
        })
      },
      //查询按钮
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getDiscountList()
      },
      //radio按钮,重置
      getStatus() {
        this.filters.jdOrderStatus = ''
        this.filters.startTime = ''
        this.filters.endTime = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getDiscountList()
      },
      //编辑
      handleEdit(index, row) {
        this.$router.push({path:'/product/editSupplier?id='+row.id})
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getDiscountList()
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

      },
      modifyAuthOrder(id,status) {
        let params = {
          id,
          status
        }
        let flag = "启用"
        if(status == '2'){
          flag = "禁用"
        }
        this.$confirm(`您确定${flag}此折扣活动？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$request.post('/sc/saotx/mall/order/authOrder',params,true,res => {
          this.$request.post('/sc/discount/act/update/status',params,false,res => {
            if(res.code == "200"){
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

    },
    created(){
      this.getDiscountList()
    }
  }
</script>
