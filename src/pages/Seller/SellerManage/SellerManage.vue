<template>
  <div class="seller-manage-container">
    <div class="box-container">
<!--      <div class="add-new-seller clearfix">-->
<!--        <el-button type="primary" size="small"  @click="addNewSeller()">新建零售户</el-button>-->
<!--      </div>-->
<!--      <div style="height:20px"></div>-->
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="90px">
<!--          <el-form-item :size="'small'" label="状态：">-->
<!--            <el-select-->
<!--                v-model="filters.status"-->
<!--                placeholder="请选择"-->
<!--                style="width: 200px">-->
<!--              <el-option-->
<!--                  v-for="item in statusList"-->
<!--                  :key="item.code"-->
<!--                  :label="item.name"-->
<!--                  :value="item.code">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item :size="'small'" label="业态：" style="display:none">
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
          <el-form-item label="销区：" prop="saleZoneCode">
            <el-select size="small" v-model="filters.saleZoneCode" placeholder="请选择">
              <el-option
                  v-for="(item,index) in saleZone"
                  :key="index"
                  :label="item.zoneName"
                  :value="item.zoneCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="区域：" >
            <el-select
                v-model="filters.areaType"
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
          <el-form-item :size="'small'" label="关键词：">
            <el-input placeholder="请输入内容" v-model="filters.keyword" class="input-with-select" style="width: 300px">
              <el-select v-model="filters.keywordType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
                <el-option label="烟草证号" value="1"></el-option>
                <el-option label="联系人姓名" value="2"></el-option>
                <el-option label="联系人手机号" value="3"></el-option>
                <el-option label="门店名称" value="4"></el-option>
                <el-option label="业务员名称" value="5"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="时间区间：">
            <el-date-picker
                v-model="filters.time"
                type="datetimerange"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 350px">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="small" label="位置：" prop="provCode">
            <el-select
                v-model="filters.provCode"
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
          <el-form-item size="small" label="" prop="cityCode">
            <el-select
                v-model="filters.cityCode"
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
          <el-form-item size="small" label="" prop="countyCode">
            <el-select
                v-model="filters.countyCode "
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
          <el-form-item class="large" :size="'small'" label="是否打印店码：" style="display:none">
            <el-select
                v-model="filters.isPrint"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in isPrintList"
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
            <!--
            <el-button type="primary" size="small" @click="getListNewList(1)">按入驻时间排序</el-button>
            <el-button type="primary" size="small" @click="getListNewList(2)">按粉丝数排序</el-button>
            <el-button type="primary" size="small" @click="getListNewList(3)">按业绩排序</el-button>
            <el-button type="primary" size="small" @click="getListNewList(5)">按积分排序</el-button>
            -->
<!--            <el-button type="primary" size="small" @click="exportSeller">导出零售户</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <div class="box-container">
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            @selection-change="handleSelectionChange"
            :data="newList"
            style="width: 100%">
          <el-table-column
              v-if="showSelection"
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="licenseNo"
              label="烟草专卖号	"
              width="200">
          </el-table-column>
          <el-table-column
              prop="shopName"
              label="门店名称"
              width="120">
          </el-table-column>
          <el-table-column
              prop="contactName"
              label="经营人姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="areaType"
              label="区域"
              width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.areaType == '1' ">{{ "城镇" }}</span>
              <span v-if="scope.row.areaType == '2' ">{{ "乡村" }}</span>
            </template>
          </el-table-column>
<!--          <el-table-column-->
<!--              prop="commercial"-->
<!--              label="业态"-->
<!--              width="120">-->
<!--            <template slot-scope="scope">-->
<!--              <span v-if="scope.row.commercial == '1'">{{ "食杂店" }}</span>-->
<!--              <span v-else-if="scope.row.commercial == '2'">{{ "便利店" }}</span>-->
<!--              <span v-else-if="scope.row.commercial == '3'">{{ "超市" }}</span>-->
<!--              <span v-else-if="scope.row.commercial == '4'">{{ "商场" }}</span>-->
<!--              <span v-else-if="scope.row.commercial == '5'">{{ "烟酒商店" }}</span>-->
<!--              <span v-else-if="scope.row.commercial == '6'">{{ "娱乐服务" }}</span>-->
<!--              <span v-else-if="scope.row.commercial == '7'">{{ "其他" }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column
              prop="detailAddr"
              label="门店地址"
              width="120">
            <template slot-scope="scope">
              {{ scope.row.provName + scope.row.cityName + scope.row.countyName + scope.row.detailAddr }}
            </template>
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="联系人电话"
              width="120">
          </el-table-column>
          <el-table-column
              prop="salesman"
              label="业务员">
          </el-table-column>
          <el-table-column property="saleZoneCode" label="销区" align="center" width="180px">
            <template slot-scope="scope">
              {{ getSaleZoneName(scope.row.saleZoneCode) }}
            </template>
          </el-table-column>
          <el-table-column
              prop="ctime"
              label="申请时间">
          </el-table-column>
          <!--
          <el-table-column
              prop="score"
              label="积分">
          </el-table-column>
          -->
<!--          <el-table-column sortable="custom"-->
<!--              prop="passTime"-->
<!--              label="入驻时间"-->
<!--              width="200">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{ new Date(scope.row.applyTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <!--
          <el-table-column
              prop="printQrCodeCount"
              label="是否打印二维码">
            <template slot-scope="scope">
              <span v-if="scope.row.printQrCodeCount && scope.row.printQrCodeCount > 0">{{ "是" }}</span>
              <span v-else>{{ "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="printQrCodeCount"
              label="打印次数">
            <template slot-scope="scope">
              <span v-if="scope.row.printQrCodeCount == null">{{ "0" }}</span>
              <span v-else>{{ scope.row.printQrCodeCount }}</span>
            </template>
          </el-table-column>

          <el-table-column
              prop="scanCount"
              label="扫码次数">
          </el-table-column>
          <el-table-column
              prop="fansCount"
              label="店铺粉丝">
          </el-table-column>
          <el-table-column
              prop="balance"
              label="账户余额">
            <template slot-scope="scope">
              <span >{{ `￥${scope.row.wallet.balance}` }}</span>
            </template>
          </el-table-column>
          -->
          <el-table-column
              prop="status"
              label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">{{ "审核通过" }}</span>
              <span v-else-if="scope.row.status == '2'">{{ "待审核" }}</span>
              <span v-else-if="scope.row.status == '3'">{{ "审核不通过" }}</span>

            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150"
          >
            <template slot-scope="scope" >
              <el-button
                  type="text"
                  size="mini"
                  @click="sellerDetail(scope.row.id)"
              >查看详情</el-button>
<!--              <el-button-->
<!--                  v-if="scope.row.status == '2'"-->
<!--                  type="text"-->
<!--                  size="mini"-->
<!--                  @click="approval(scope.row.id)"-->
<!--              >审核通过</el-button>-->
<!--              <el-button-->
<!--                  v-if="scope.row.status == '2'"-->
<!--                  type="text"-->
<!--                  size="mini"-->
<!--                  @click="disapprovalDialog(scope.row.id)"-->
<!--              >审核不通过</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
        <el-button
            v-if="showSelection"
            type="primary"
            size="small"
            :disabled="batchOperations"
            @click="modifyAuthOrder(ids,true)"
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
  </div>
</template>

<script>
  export default {
    name: "SellerManage",
    data(){
      return{
        showSelection:false,
        ids:'',
        batchOperations:true,
        //审批不通过原因
        dialogVisible:false,
        failReason:'',
        txId:'',
        saleZone:[],
        listLoading:false,

        //状态列表
        statusList:[
          {
            code:"1",
            name:"审核通过"
          },
          {
            code:"2",
            name:" 待审核"
          },
          {
            code:"3",
            name:"审核不通过"
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
        isPrintList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"0",
            name:"无"
          },
          {
            code:"1",
            name:"有"
          },

        ],

        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
        filters: {
          saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
          //零售户在某组织公司的状态
          status:'1',
          //审核状态：1: 审核通过, 2: 待审核, 3: 审核不通过
          authStatus :'4',
          //业态 : 1-食杂店；2-便利店；3-超市；4-商场；5-烟酒商店；6-娱乐服务；7-其他
          commercial:'',
          //区域: 1-城镇；2-乡村
          areaType:'',
          //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
          keywordType:null,
          //模糊搜索内容
          keyword:null,
          //开始时间
          startDate:'',
          // //结束时间
          endDate:'',
          time:[],

          //门店所在省份编码
          provCode:null,
          //门店所在城市编码
          cityCode:null,
          //门店所在区县编码
          countyCode:null,
          //零售户是否打印过店码
          isPrint:'',

          //查询排序类型
          sortType:1,
          sortValue:1


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

      }

    },
    created(){
      this.getSaleZone()
      this.getListNewList()
      this.getOneCategory()
    },
    methods:{
      modifyAuthOrder(ids,batch) {
        let params = {idList:ids}
        let _batch = ""
        if(batch){
          _batch = "批量"
        }
        this.$confirm(`您确定${_batch}审核通过？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$request.post('/sc/saotx/mall/order/authOrder',params,true,res => {
          this.$request.post('/saasHbseller/audit/agree',params,false,res => {
            if(res.code == "200" && !res.data.failList.length){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListNewList()
            }else{
              this.$message({
                message: res.msg || `操作失败：零售户id为 ${res.data.failList.join(',')}`,
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
        if(arr.length > 0 ){
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
      getSaleZone() {
        this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
          if (res.code == '200') {
            this.saleZone = res.data || []
            if (this.isAllSaleZone == 1) {
            } else {
              this.filters.saleZoneCode = this.saleZoneCode
            }
          }
        })
      },
      getSaleZoneName(saleZoneCode){
        if(!saleZoneCode) return ""
        let zoneName = ""
        let item = this.saleZone.find((i) => {
          if(i.zoneCode == saleZoneCode){
            return i
          }
        })
        // console.log(item)
        zoneName = item ? item.zoneName : ''
        return zoneName
      },
      addNewSeller(){
        this.$router.push({
          'path':'/seller/mgr/addSeller'
        })
      },
      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/saasHbseller/region/province',{}, true, (res) => {
          this.cateLvl1List = [...res]
        })
      },
      selectBrand1(){
        this.filters.cityCode = ''
        this.cateLvl2List = []
        this.filters.countyCode = ''
        this.cateLvl3List = []
        this.getTwoCategory()
      },
      getTwoCategory(){
        if(this.filters.provCode  == '')return
        this.$request.post('/saasHbseller/region/city',{parentCode:this.filters.provCode}, false, (res) => {
          this.cateLvl2List = [...res]
        })
      },
      selectBrand2(){
        this.filters.countyCode = ''
        this.cateLvl3List = []
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.filters.cityCode == '')return
        this.$request.post('/saasHbseller/region/district',{parentCode:this.filters.cityCode}, false, (res) => {
          this.cateLvl3List = [...res]
        })
      },
      // //按销量排序
      // sortBySales(){
      //   this.getListJD("bySales")
      // },
      // sortByScore(){
      //   this.getListJD("byScore")
      // },
      // sortByTime(){
      //   this.getListJD("byTime")
      // },
      sortDatasChange({column, prop, order}) {
        if("descending"==order) {
          this.filters.sortValue = 1;
        } else {
          this.filters.sortValue = 0;
        }
        this.getListNewList(1);
      },
      //获取列表
      getListNewList(type) {
        let params = {
          // status:this.filters.status,
          saleZoneCode:this.filters.saleZoneCode,
          //业态
          // commercial:this.filters.commercial,
          //地区
          areaType:this.filters.areaType,

          keywordType:this.filters.keywordType,
          //关键词
          keyword:this.filters.keyword,

          //地区
          provCode: this.filters.provCode,
          cityCode: this.filters.cityCode,
          countyCode: this.filters.countyCode,
          //时间
          startDate: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          endDate: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',

          // isPrint:this.filters.isPrint,
          //排序
          // sortType: 1,
          // sortValue: this.filters.sortValue,

          page: this.pageNo,
          pageSize: 10,

        };
        // if(type){
        //   params.sortType = type
        //   if(this.filters.sortValue==1){
        //     this.filters.sortValue = 0
        //   }else {
        //     this.filters.sortValue = 1
        //   }
        // }
        // if(this.filters.status == 4){
        //   //审核状态
        //   params.authStatus = this.filters.authStatus
        // }else{
        //   params.status = this.filters.status
        // }

        // 根据关键词搜索条件，传不同数据
        // if(this.filters.searchType == '3') {
        //   params.licenceNo = this.filters.keywords || ''; // 烟草证号
        // } else if(this.filters.searchType == '1') {
        //   params.ownerName = this.filters.keywords || ''; // 联系人信息
        // } else if(this.filters.searchType == '2') {
        //   params.phoneNo = this.filters.keywords || ''; // 联系人手机号
        // } else if(this.filters.searchType == '4') {
        //   params.shopName = this.filters.keywords || ''; // 门店名称
        // } else if(this.filters.searchType == '5') {
        //   params.salesmanName = this.filters.keywords || ''; // 业务员
        // }

        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/saasHbseller/seller/manager/queryList', params, true, (res) => {

            console.log(res)
            // this.listLoading = false;
            this.newList = res.data.infoList.records
            this.total = res.data.infoList.total
            this.pageNo = res.data.infoList.current
            if(params.status == 2){
              this.showSelection = true
            }else {
              this.showSelection = false
            }

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
        //审核状态：1-审核通过；2-待审核；3-审核未通过
        this.filters.status = '1'
        this.filters.saleZoneCode = this.saleZoneCode
        //区域: 1-城镇；2-乡村
        this.filters.areaType = ''
        //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
        this.filters.keywordType = ''
        //模糊搜索内容
        this.filters.keyword = ''

        this.filters.time = [];
        //开始时间
        this.filters.startDate = ''
        //结束时间
        this.filters.endDate = ''

        //门店所在省份编码
        this.filters.provCode = ''
        //门店所在城市编码
        this.filters.cityCode = ''
        //门店所在区县编码
        this.filters.countyCode = ''

        this.filters.status = '1'
        this.filters.isPrint = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getListNewList()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
      },

      //上架
      approval(sellerId){
        let params = {idList:sellerId}
        this.$confirm(`您确定通过此零售户的审核？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/saasHbseller/audit/agree',params,false,res => {
            if(res.code == "200" && !res.data.failList.length){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListNewList()
            }else{
              this.$message({
                message: res.msg || `操作失败：零售户id为 ${res.data.failList.join(',')}`,
                type: 'warning'
              });
            }
          })
        })
      },

      //下架
      disapproval(){
        let params = {id:this.txId,appStatus:2,auditMsg:this.failReason}
        this.$confirm(`您确定审核不通过？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/saasHbseller/audit/unAgree',params,false,res => {
            if(res.code == 200){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListNewList()
            }else{
              console.log(res)
              this.$message({
                message: res.msg,
                type: 'warning'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListNewList()
            }
          })
        })
      },
      //审批不通过
      disapprovalDialog(id){
        this.dialogVisible = true
        this.txId = id
      },
      cancelDialog(){
        this.dialogVisible = false
        this.failReason = ""
      },
      sellerDetail(sellerId){
        this.$router.push({
          path:'/seller/mgr/sellerDetail?sellerId='+sellerId
        })
      },

      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getListNewList()
      },
      exportSeller(){
        let params = {
          //业态
          status:this.filters.status,
          saleZoneCode:this.filters.saleZoneCode,
          //地区
          areaType:this.filters.areaType,

          keywordType:this.filters.keywordType,
          //关键词
          keyword:this.filters.keyword,

          //地区
          provCode: this.filters.provCode,
          cityCode: this.filters.cityCode,
          countyCode: this.filters.countyCode,
          //时间
          startDate: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          endDate: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',

          isPrint:this.filters.isPrint,
          //排序
          sortType: 1,
          sortValue: this.filters.sortValue,

          pageNo: this.pageNo,
          pageSize: 10,
        };
        if(this.filters.status == 4){
          //审核状态
          params.authStatus = this.filters.authStatus
        }else{
          params.status = this.filters.status
        }
        // 根据关键词搜索条件，传不同数据
        // if(this.filters.searchType == '3') {
        //   params.licenceNo = this.filters.keywords || ''; // 烟草证号
        // } else if(this.filters.searchType == '1') {
        //   params.ownerName = this.filters.keywords || ''; // 联系人信息
        // } else if(this.filters.searchType == '2') {
        //   params.phoneNo = this.filters.keywords || ''; // 联系人手机号
        // } else if(this.filters.searchType == '4') {
        //   params.shopName = this.filters.keywords || ''; // 门店名称
        // } else if(this.filters.searchType == '5') {
        //   params.salesmanName = this.filters.keywords || ''; // 业务员
        // }


        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        for(var attr in params) {
          formData.append(attr, params[attr]);
        }
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.open('POST', '/lsh/seller-manager/seller/exportDatas', true);
        xhr.responseType = "arraybuffer";
        xhr.setRequestHeader("token", sessionStorage.getItem('access_token'));
        xhr.setRequestHeader("loginId", sessionStorage.getItem('access_loginId'));
        xhr.onload = function(res) {
          if (this.status == 200) {
            var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            var respHeader = xhr.getResponseHeader("Content-Disposition");
            var fileName = decodeURI(respHeader.match(/filename=(.*?)(;|$)/)[1]);
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          }
        }
        return xhr.send(formData);
      }
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
