<template>
  <div class="amount-examine-container">
    <div class="box-container">
      
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="订单状态">
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
          <el-form-item :size="'small'" label="关键词">
            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 300px">
              <el-select v-model="filters.searchType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
                <el-option label="联系人名称" value="1"></el-option>
                <el-option label="联系人电话" value="2"></el-option>
                <el-option label="门店名称" value="4"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="时间区间">
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

          <div></div>
          <el-form-item size="small" label="位置：" prop="addrProvince">
            <el-select
                v-model="filters.addrProvince"
                placeholder="请选择"
                @change="selectBrand1"
                style="width: 160px">
              <el-option
                  v-for="item in cateLvl1List"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="" prop="addrCity">
            <el-select
                v-model="filters.addrCity"
                placeholder="请选择"
                @change="selectBrand2"
                style="width: 160px">
              <el-option
                  v-for="item in cateLvl2List"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="" prop="addrArea">
            <el-select
                v-model="filters.addrArea "
                placeholder="请选择"
                style="width: 160px">
              <el-option
                  v-for="item in cateLvl3List"
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
            :data="TxList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="sellerInfo.shopName"
              label="门店名称	"
              width="200">
          </el-table-column>
          <el-table-column
              prop="sellerInfo.ownerName"
              label="联系人姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="sellerInfo.phoneNo"
              label="联系人电话"
              width="120">
          </el-table-column>
          <el-table-column
              prop="balance"
              label="账户余额"
              width="120">
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
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.txTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="txTime"
              label="到账时间"
              width="200">
            <template slot-scope="scope">
              <!--<span>{{ new Date(scope.row.txTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>-->
            </template>
          </el-table-column>
          <el-table-column
              prop="authStatus"
              label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">{{ "未审核" }}</span>
              <span v-else-if="scope.row.status == '2'">{{ "已到账" }}</span>
              <span v-else-if="scope.row.status == '3'">{{ "申请失败" }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
              <el-button
                  type="text"
                  size="mini"
                  @click="sellerDetail(scope.row.sellerId)"
              >查看详情</el-button>
              <el-button
                  :disabled="scope.row.status !== 1"
                  type="text"
                  size="mini"
                  @click="disapprovalDialog(scope.row.id)"
              >审核不通过</el-button>
              <el-button
                  :disabled="scope.row.status !== 1"
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
            code:"",
            name:"全部"
          },
          {
            code:"1",
            name:"未审核"
          },
          {
            code:"2",
            name:"已到账"
          },
          {
            code:"3",
            name:"申请失败"
          },
        ],
        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],

        filters: {
          //审核状态：1-未审核；2-已到账；3-申请失败
          status :'1',

          //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
          searchType:'',
          //模糊搜索内容
          keywords:'',
          //开始时间
          // appStartTime:'',
          // //结束时间
          // appEndTime:'',
          time:[],

          //门店所在省份编码
          addrProvince:'',
          //门店所在城市编码
          addrCity:'',
          //门店所在区县编码
          addrArea:'',



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
      this.getOneCategory()
    },
    methods:{
      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/lsh/seller-manager/region/province',{}, true, (res) => {
          this.cateLvl1List = [...res]
        })
      },
      selectBrand1(){
        this.filters.addrCity = ''
        this.cateLvl2List = []
        this.filters.addrArea = ''
        this.cateLvl3List = []
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.filters.addrProvince  == '')return
        this.$request.post('/lsh/seller-manager/region/newCity',{parentCode:this.filters.addrProvince}, true, (res) => {
          this.cateLvl2List = [...res]
        })
      },
      selectBrand2(){
        this.filters.addrArea = ''
        this.cateLvl3List = []
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.filters.addrCity == '')return
        this.$request.post('/lsh/seller-manager/region/newDistrict',{parentCode:this.filters.addrCity}, true, (res) => {
          this.cateLvl3List = [...res]
        })
      },
      //获取列表
      getListTx() {
        let params = {
          //审核状态
          status:this.filters.status,


          searchType:this.filters.searchType,
          //关键词
          keywords:this.filters.keywords,

          //地区
          addrProvince: this.filters.addrProvince,
          addrCity: this.filters.addrCity,
          addrArea: this.filters.addrArea,
          //时间
          stime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          etime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',


          pageNo: this.pageNo,
          pageSize: 10,

        };

        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/lsh/seller-manager/seller/txList', params, false, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.TxList = res.data.list
            this.total = res.data.page.count
            this.pageNo = res.data.page.pageNo

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
        this.filters.status = '1'

        this.filters.searchType = ''
        //模糊搜索内容
        this.filters.keywords = ''
        this.filters.time = []

        //门店所在省份编码
        this.filters.addrProvince = ''
        //门店所在城市编码
        this.filters.addrCity = ''
        //门店所在区县编码
        this.filters.addrArea = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getListTx()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
      },

      //审批通过
      approval(txId){
        let params = {txId,authResult:1}
        this.$confirm(`您确定为此账户转账？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/txAuth',params,false,res => {
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
      disapprovalDialog(txId){
        this.dialogVisible = true
        this.txId = txId
      },
      disapproval(){
        let params = {txId:this.txId,authResult:0,authDesc:this.failReason}
        this.$confirm(`您确定审核不通过？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/txAuth',params,false,res => {
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