<template>
  <div class="review-manage-container">
    <div class="box-container">
      <div class="add-new-seller">
        <el-button type="primary" size="small" style="display:none;margin-bottom:15px "  @click="addNewSeller()">新建零售户</el-button>
      </div>
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="90px">
          <el-form-item :size="'small'" label="审核状态：">
            <el-select
                v-model="filters.authStatus"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in authStatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item :size="'small'" label="关键词：">
            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 300px">
              <el-select v-model="filters.searchType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
                <el-option label="经销商姓名" value="salerName"></el-option>
                <el-option label="手机号" value="phoneNo"></el-option>
                <el-option label="微信ID" value="wxOpenId"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <div></div>

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
            :data="newList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="salerName"
              label="申请人姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="phoneNo"
              label="手机号"
              width="120">
          </el-table-column>
          <el-table-column
              prop="region"
              width="200"
              label="位置">
          </el-table-column>
          <el-table-column
              prop="invitCode"
              label="推荐码">
          </el-table-column>
          <el-table-column
              prop="higherName"
              label="推荐人">
          </el-table-column>

          <el-table-column
              prop="ctime"
              label="申请时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="ownerName"
              label="联系人姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="phoneNo"
              label="联系人电话"
              width="120">
          </el-table-column>
          <el-table-column
              prop="ctime"
              label="申请时间"
              width="200">
          </el-table-column>
          <el-table-column label="位置">
            <template slot-scope="scope">
              <span>{{scope.row.addrProvinceName}}</span><span v-if="scope.row.addrProvinceName!=scope.row.addrCityName">{{scope.row.addrCityName}}</span><span>{{scope.row.addrAreaName}}</span><span>{{scope.row.addrDetail}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="authStatus"
              label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.appStatus == '1'">{{ "待审核" }}</span>
              <span v-else-if="scope.row.appStatus == '2'">{{ "审核通过" }}</span>
              <span v-else-if="scope.row.appStatus == '3'">{{ "审核未通过" }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
<!--              <el-button-->
<!--                  type="text"-->
<!--                  size="mini"-->
<!--                  @click="sellerDetail(scope.row.saler_id)"-->
<!--              >查看详情</el-button>-->
              <el-button
                  :disabled="scope.row.appStatus !== 1"
                  type="text"
                  size="mini"
                  @click="disapprovalDialog(scope.row.saler_id)"
              >审核不通过</el-button>
              <el-button
                  :disabled="scope.row.appStatus !== 1"
                  type="text"
                  size="mini"
                  @click="approval(scope.row.saler_id)"
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
    name: "DistributionMgr",
    // beforeRouteLeave(to, from, next) {
    //   // console.log(to.path)
    //   if (to.path !== '/seller/review/addSeller') {
    //     next()
    //   }else {
    //     next("/seller/review/")
    //   }
    // },
    data(){
      return{
        listLoading:false,

        //状态列表
        authStatusList:[
          {
            code:null,
            name:"全部"
          },
          {
            code:"1",
            name:"未审核"
          },
          {
            code:"2",
            name:"审核通过"
          },
          {
            code:"3",
            name:"审核未通过"
          },
        ],
        districtList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"1",
            name:"城镇"
          },
          {
            code:"2",
            name:"乡村"
          },
        ],

        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],

        filters: {
          //审核状态：1-待审核；2-审核通过；3-审核未通过；4-待激活
          authStatus :null,
          //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
          searchType:'',
          //模糊搜索内容
          keywords:'',
          addrProvince:'',
          //门店所在城市编码
          addrCity:'',
          //门店所在区县编码
          addrArea:'',
        },
        //表单内容
        newList:[],

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0,

        //批量通过
        batchPass : true,
        ids:'',

        //审批不通过原因
        dialogVisible:false,
        failReason:'',
        sellerIds:''
      }

    },
    created(){
      this.getListNewList()
      this.getOneCategory()
    },
    methods:{
      addNewSeller(){
        this.$router.push({
          'path':'/seller/review/addSeller'
        })
      },
      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/fxweb/fxsaas/getProvince ',{}, false, (res) => {
          this.cateLvl1List = [...res.data]
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
        this.$request.post('/fxweb/fxsaas/getCity ',{parentCode:this.filters.addrProvince}, false, (res) => {
          this.cateLvl2List = [...res.data]
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
        this.$request.post('/fxweb/fxsaas/getCounty',{parentCode:this.filters.addrCity}, false, (res) => {
          this.cateLvl3List = [...res.data]
        })
      },
      //获取列表
      getListNewList() {
        let params = {
          //审核状态
          appStatus:this.filters.authStatus,

          provinceName: this.filters.addrProvince,
          cityName: this.filters.addrCity,
          areaName: this.filters.addrArea,

          pageNo: this.pageNo,
          pageSize: 10,

        };
        if(this.filters.searchType&&this.filters.keywords){
          params[this.filters.searchType] = this.filters.keywords
        }
        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/fxweb/fxsaas/getSalers', params, true, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.newList = res.data.salerList
            this.total = res.data.pageResult.count
            this.pageNo = res.data.pageResult.pageNo

        })
      },
      //查詢
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getListNewList()
      },
      //重置
      getStatus() {
        //审核状态：1-待审核；2-审核通过；3-审核未通过；4-待激活
        this.filters.authStatus = '1',
        //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
        this.filters.searchType = '',
        //模糊搜索内容
        this.filters.keywords = '',
        //门店所在省份编码
        this.filters.addrProvince = '',
        //门店所在城市编码
        this.filters.addrCity = '',
        //门店所在区县编码
        this.filters.addrArea = '',

        this.pageNo = 1
        this.currentPage = 1
        this.getListNewList()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
      },

      //审批通过
      approval(salerId){
        let params = {salerId,appStatus:2}
        this.$confirm(`您确定审核通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/fxweb/fxsaas/approvalSalers',params,true,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListNewList()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        })
      },
      //审批不通过
      disapprovalDialog(salerId){
        this.dialogVisible = true
        this.sellerIds = salerId
      },
      disapproval(){
        let params = {salerId:this.sellerIds,appStatus:3,appNote:this.failReason}
        this.$confirm(`您确定审核不通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/fxweb/fxsaas/approvalSalers',params,true,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListNewList()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListNewList()
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
          path:'/seller/review/reviewDetail?sellerId='+sellerId
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
        this.getListNewList()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .review-manage-container{
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
  .review-manage-container .el-table{text-align: center}
  .review-manage-container .el-table th{text-align: center}
  .review-manage-container .el-table td{text-align: center}
  .review-manage-container .mini .el-form-item__label {width: 40px!important;}
</style>