<template>
  <div class="amount-examine-container">
    <div class="box-container">
      
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="提现状态">
            <el-select
                v-model="filters.status"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item :size="'small'" label="关键词">-->
<!--            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 300px">-->
<!--              <el-select v-model="filters.searchType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">-->
<!--                <el-option label="联系人名称" value="1"></el-option>-->
<!--                <el-option label="联系人电话" value="2"></el-option>-->
<!--                <el-option label="门店名称" value="4"></el-option>-->
<!--              </el-select>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item :size="'small'" label="时间区间">-->
<!--            <el-date-picker-->
<!--                v-model="filters.time"-->
<!--                type="datetimerange"-->
<!--                placeholder="选择日期时间"-->
<!--                value-format="yyyy-MM-dd HH:mm"-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--                style="width: 350px">-->
<!--            </el-date-picker>-->
<!--          </el-form-item>-->

          <div></div>
<!--          <el-form-item size="small" label="位置：" prop="addrProvince">-->
<!--            <el-select-->
<!--                v-model="filters.addrProvince"-->
<!--                placeholder="请选择"-->
<!--                @change="selectBrand1"-->
<!--                style="width: 160px">-->
<!--              <el-option-->
<!--                  v-for="item in cateLvl1List"-->
<!--                  :key="item.code"-->
<!--                  :label="item.name"-->
<!--                  :value="item.code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item size="small" label="" prop="addrCity">-->
<!--            <el-select-->
<!--                v-model="filters.addrCity"-->
<!--                placeholder="请选择"-->
<!--                @change="selectBrand2"-->
<!--                style="width: 160px">-->
<!--              <el-option-->
<!--                  v-for="item in cateLvl2List"-->
<!--                  :key="item.code"-->
<!--                  :label="item.name"-->
<!--                  :value="item.code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item size="small" label="" prop="addrArea">-->
<!--            <el-select-->
<!--                v-model="filters.addrArea "-->
<!--                placeholder="请选择"-->
<!--                style="width: 160px">-->
<!--              <el-option-->
<!--                  v-for="item in cateLvl3List"-->
<!--                  :key="item.code"-->
<!--                  :label="item.name"-->
<!--                  :value="item.code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
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
            :data="TxList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="salerName"
              label="经销商姓名"
              width="200">
          </el-table-column>
          <el-table-column
              prop="phoneNo"
              label="手机号"
              width="200">
          </el-table-column>
          <el-table-column
              prop="totalNum"
              label="返佣数量"
              width="120">
          </el-table-column>
          <el-table-column
              prop="balance"
              label="累积佣金"
              width="120">
            <template slot-scope="scope">
              <span>￥{{ scope.row.totalNum }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="ktxAmount"
              label="可提现金额"
              width="120">
            <template slot-scope="scope">
              <span>￥{{ scope.row.ktxAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="txAmount"
              label="提现金额"
              width="120">
            <template slot-scope="scope">
              <span style="color: red">￥{{ scope.row.txAmount }}</span>
            </template>
          </el-table-column>

          <el-table-column
              prop="txTime"
              label="申请时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="finishTime"
              label="到账时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="txStatus"
              label="状态">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
              <el-button
                  :disabled="scope.row.appStatus !== 0"
                  type="text"
                  size="mini"
                  @click="disapprovalDialog(scope.row.id)"
              >审核不通过</el-button>
              <el-button
                  :disabled="scope.row.appStatus !== 0"
                  type="text"
                  size="mini"
                  @click="approval(scope.row.id)"
              >审核通过</el-button>
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
    </div>
    <el-dialog
        title="请输入不通过理由"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="cancelDialog">
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="failReason">
      </el-input>
      <div style="text-align: center;margin-top: 30px">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="disapproval">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "Reviewmanage",
    data(){
      return{
        listLoading:false,

        //状态列表
        statusList:[
          {
            code:null,
            name:"全部"
          },
          {
            code:"1",
            name:"待审核"
          },
          {
            code:"2",
            name:"提现完成"
          },
          {
            code:"3",
            name:"审核未通过"
          },
          {
            code:"4",
            name:"审核通过未到账"
          },
        ],
        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],

        filters: {
          //审核状态：1-未审核；2-已到账；3-申请失败
          status :null,

        },
        //表单内容
        TxList:[],

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0,


        //审批不通过原因
        dialogVisible:false,
        failReason:'',
        txId:''
      }

    },
    created(){
      this.getListTx()
      // this.getOneCategory()
    },
    methods:{
      //从后台拿取商品分类1
      // getOneCategory(){
      //   this.$request.post('/lsh/seller-manager/region/province',{}, true, (res) => {
      //     this.cateLvl1List = [...res]
      //   })
      // },
      // selectBrand1(){
      //   this.filters.addrCity = ''
      //   this.cateLvl2List = []
      //   this.filters.addrArea = ''
      //   this.cateLvl3List = []
      //   this.getTwoCategory()
      // },
      // //从后台拿取商品分类2
      // getTwoCategory(){
      //   if(this.filters.addrProvince  == '')return
      //   this.$request.post('/lsh/seller-manager/region/newCity',{parentCode:this.filters.addrProvince}, true, (res) => {
      //     this.cateLvl2List = [...res]
      //   })
      // },
      // selectBrand2(){
      //   this.filters.addrArea = ''
      //   this.cateLvl3List = []
      //   this.getThreeCategory()
      // },
      // //从后台拿取商品分类3
      // getThreeCategory(){
      //   if(this.filters.addrCity == '')return
      //   this.$request.post('/lsh/seller-manager/region/newDistrict',{parentCode:this.filters.addrCity}, true, (res) => {
      //     this.cateLvl3List = [...res]
      //   })
      // },
      //获取列表
      getListTx() {
        let params = {
          //审核状态
          appStatus:this.filters.status,


          // searchType:this.filters.searchType,
          // //关键词
          // keywords:this.filters.keywords,
          //
          // //地区
          // addrProvince: this.filters.addrProvince,
          // addrCity: this.filters.addrCity,
          // addrArea: this.filters.addrArea,
          // //时间
          // stime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          // etime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',


          pageNo: this.pageNo,
          pageSize: 10,

        };

        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/fxweb/fxsaas/tx/list', params, true, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.TxList = res.data.dataList
            this.total = res.data.pageResult.count
            this.pageNo = res.data.pageResult.pageNo

        })
      },
      //查詢
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getListTx()
      },
      //重置
      getStatus() {
        this.filters.status = null

        this.pageNo = 1
        this.currentPage = 1
        this.getListTx()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
      },

      //审批通过
      approval(id){
        let params = {id,appStatus:1}
        this.$confirm(`您确定审核通过？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/fxweb/fxsaas/tx/audit',params,true,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListTx()
            }else{
              console.log(res)
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          })
        })
      },
      //审批不通过
      disapprovalDialog(id){
        this.dialogVisible = true
        this.txId = id
      },
      disapproval(){
        let params = {id:this.txId,appStatus:2,failReason:this.failReason}
        this.$confirm(`您确定审核不通过？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/fxweb/fxsaas/tx/audit',params,true,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListTx()
            }else{
              console.log(res)
              this.$message({
                message: res.msg,
                type: 'warning'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListTx()
            }
          })
        })
      },
      cancelDialog(){
        this.dialogVisible = false
        this.failReason = ""
      },
      sellerDetail(sellerId){
        this.$router.push({
          path:'/seller/tx/sellerDetail?sellerId='+sellerId
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
        this.getListTx()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .amount-examine-container{
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
  .amount-examine-container .el-table{text-align: center}
  .amount-examine-container .el-table th{text-align: center}
  .amount-examine-container .el-table td{text-align: center}
  .amount-examine-container .mini .el-form-item__label {width: 40px!important;}
</style>