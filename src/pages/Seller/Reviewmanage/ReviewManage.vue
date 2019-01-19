<template>
  <div class="review-manage-container">
    <div class="box-container">
      <div class="add-new-seller">
        <el-button type="primary" size="small" style="display:none;margin-bottom:15px "  @click="addNewSeller()">新建零售户</el-button>
      </div>
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="审核状态">
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
          <el-form-item :size="'small'" label="业态" style="display:none">
            <el-select
                v-model="filters.commercial"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in commercialList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="区域" style="display:none">
            <el-select
                v-model="filters.district"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in districtList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
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
          <el-form-item :size="'small'" label="关键词">
            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 300px">
              <el-select v-model="filters.searchType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
                <el-option label="联系人名称" value="1" style="display:none"></el-option>
                <el-option label="联系人电话" value="2"></el-option>
                <el-option label="烟草证号" value="3"></el-option>
                <el-option label="门店名称" value="4" style="display:none"></el-option>
                <el-option label="业务员名称" value="5" style="display:none"></el-option>
              </el-select>
            </el-input>
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
            :data="newList"
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="licenceNo"
              label="烟草专卖号	"
              width="200">
          </el-table-column>
          <el-table-column
              prop="shopName"
              label="门店名称"
              width="120">
          </el-table-column>
          <!-- 
          <el-table-column
              prop="ownerName"
              label="经营人姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="district"
              label="区域"
              width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.district == "1" ? "城镇":"乡村"}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="commercial"
              label="业态"
              width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.commercial == '1'">{{ "食杂店" }}</span>
              <span v-else-if="scope.row.commercial == '2'">{{ "便利店" }}</span>
              <span v-else-if="scope.row.commercial == '3'">{{ "超市" }}</span>
              <span v-else-if="scope.row.commercial == '4'">{{ "商场" }}</span>
              <span v-else-if="scope.row.commercial == '5'">{{ "烟酒商店" }}</span>
              <span v-else-if="scope.row.commercial == '6'">{{ "娱乐服务" }}</span>
              <span v-else-if="scope.row.commercial == '7'">{{ "其他" }}</span>
            </template>
          </el-table-column>
          -->
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
          <!--
          <el-table-column
              prop="salesManNames"
              label="业务员">
          </el-table-column>
          -->
          <el-table-column
              prop="applyTime"
              label="申请时间"
              width="200">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.applyTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="authStatus"
              label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.authStatus == '1'">{{ "待审核" }}</span>
              <span v-else-if="scope.row.authStatus == '2'">{{ "审核通过" }}</span>
              <span v-else-if="scope.row.authStatus == '3'">{{ "审核未通过" }}</span>
              <span v-else-if="scope.row.authStatus == '4'">{{ "待激活" }}</span>
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
                  type="text"
                  size="mini"
                  @click="disapprovalDialog(scope.row.sellerId)"
              >审核不通过</el-button>
              <el-button
                  type="text"
                  size="mini"
                  @click="approval(scope.row.sellerId)"
              >审核通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
        <el-button
            type="primary"
            size="small"
            :disabled="batchPass"
            @click="passBatch(ids)"
        >批量通过</el-button>
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
            code:"1",
            name:"待审核"
          },
          {
            code:"3",
            name:"审核未通过"
          },
        ],
        commercialList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"1",
            name:"食杂店"
          },
          {
            code:"2",
            name:"便利店"
          },
          {
            code:"3",
            name:"超市"
          },
          {
            code:"4",
            name:"商场"
          },
          {
            code:"5",
            name:"烟酒商店"
          },
          {
            code:"6",
            name:"娱乐服务"
          },
          {
            code:"7",
            name:"其他"
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
          authStatus :'1',
          //业态 : 1-食杂店；2-便利店；3-超市；4-商场；5-烟酒商店；6-娱乐服务；7-其他
          commercial:'',
          //区域: 1-城镇；2-乡村
          district:'',
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
      getListNewList() {
        let params = {
          //审核状态
          authStatus:this.filters.authStatus,
          //业态
          commercial:this.filters.commercial,
          //地区
          district:this.filters.district,

          searchType:this.filters.searchType,
          //关键词
          // keywords:this.filters.keywords,

          //地区
          addrProvince: this.filters.addrProvince,
          addrCity: this.filters.addrCity,
          addrArea: this.filters.addrArea,
          //时间
          appStartTime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          appEndTime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',
          //排序
          sortType: 1,
          sortValue: 1,

          pageNo: this.pageNo,
          pageSize: 10,

        };
        // 根据关键词搜索条件，传不同数据
        if(this.filters.searchType == '3') {
          params.licenceNo = this.filters.keywords || ''; // 烟草证号
        } else if(this.filters.searchType == '1') {
          params.ownerName = this.filters.keywords || ''; // 联系人信息
        } else if(this.filters.searchType == '2') {
          params.phoneNo = this.filters.keywords || ''; // 联系人手机号
        } else if(this.filters.searchType == '4') {
          params.shopName = this.filters.keywords || ''; // 门店名称
        } else if(this.filters.searchType == '5') {
          params.salesmanName = this.filters.keywords || ''; // 业务员
        }
        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/lsh/seller-manager/seller/select/newList', params, false, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.newList = res.list
            this.total = res.page.count
            this.pageNo = res.page.pageNo

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
        //业态 : 1-食杂店；2-便利店；3-超市；4-商场；5-烟酒商店；6-娱乐服务；7-其他
        this.filters.commercial = '',
        //区域: 1-城镇；2-乡村
        this.filters.district = '',
        //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
        this.filters.searchType = '',
        //模糊搜索内容
        this.filters.keywords = '',
        //开始时间
        this.filters.appStartTime = '',
        //结束时间
        this.filters.appEndTime = '',

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
      handleSelectionChange(val) {
        let arr = val
        console.log(arr)
        let idsArr = []
        if(arr.length > 0){
          this.batchPass = false
          arr.map((e,i) => {
            idsArr.push(e.sellerId)
          })
          this.ids = idsArr.join(",")
        }else{
          this.ids = ""
          this.batchPass = true
        }
      },
      //审批通过
      approval(sellerIds){
        let params = {sellerIds,authResult:1}
        this.$confirm(`您确定审核通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/approvalBatch',params,false,res => {
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
      disapprovalDialog(sellerIds){
        this.dialogVisible = true
        this.sellerIds = sellerIds
      },
      disapproval(){
        let params = {sellerIds:this.sellerIds,authResult:2,failReason:this.failReason}
        this.$confirm(`您确定审核不通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/approvalBatch',params,false,res => {
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
      //批量通过
      passBatch(){
        this.$confirm(`您确定批量审核通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/approvalBatch',{sellerIds:this.ids,authResult:1},false,res => {
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