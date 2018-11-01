<template>
  <div class="seller-manage-container">
    <div class="box-container">
      <div class="add-new-seller clearfix">
        <el-button type="primary" size="small fr"  @click="addNewSeller()">新建零售户</el-button>
      </div>
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="90px">
          <el-form-item :size="'small'" label="状态：">
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
          <el-form-item :size="'small'" label="业态：">
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
          <el-form-item :size="'small'" label="区域：">
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
          <el-form-item :size="'small'" label="关键词：">
            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 300px">
              <el-select v-model="filters.searchType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
                <el-option label="联系人名称" value="1"></el-option>
                <el-option label="联系人电话" value="2"></el-option>
                <el-option label="烟草证号" value="3"></el-option>
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
          <el-form-item class="large" :size="'small'" label="是否打印店码：">
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
            <el-button type="primary" size="small" @click="getListNewList(1)">按入驻时间排序</el-button>
            <el-button type="primary" size="small" @click="getListNewList(2)">按粉丝数排序</el-button>
            <el-button type="primary" size="small" @click="getListNewList(3)">按业绩排序</el-button>
            <el-button type="primary" size="small" @click="getListNewList(5)">按积分排序</el-button>
            <el-button type="primary" size="small" @click="exportSeller">导出零售户</el-button>
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
              prop="licenceNo"
              label="烟草专卖号	"
              width="200">
          </el-table-column>
          <el-table-column
              prop="shopName"
              label="门店名称"
              width="120">
          </el-table-column>
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
          <el-table-column
              prop="contactName"
              label="联系人姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="联系人电话"
              width="120">
          </el-table-column>
          <el-table-column
              prop="salesManNames"
              label="业务员">
          </el-table-column>

          <el-table-column
              prop="score"
              label="积分">
          </el-table-column>
          <el-table-column
              prop="applyTime"
              label="入驻时间"
              width="200">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.applyTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
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
          <el-table-column
              prop="status"
              label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.authOrg.status == '0'">{{ "下架中" }}</span>
              <span v-else-if="scope.row.authOrg.status == '1'">{{ "上架中" }}</span>

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
                  @click="sellerDetail(scope.row.sellerId)"
              >查看详情</el-button>
              <el-button
                  v-if="scope.row.authOrg.status == '0'"
                  type="text"
                  size="mini"
                  @click="approval(scope.row.sellerId)"
              >上架</el-button>
              <el-button
                  v-else-if="scope.row.authOrg.status == '1'"
                  type="text"
                  size="mini"
                  @click="disapproval(scope.row.sellerId)"
              >下架</el-button>
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
  </div>
</template>

<script>
  export default {
    name: "SellerManage",
    data(){
      return{
        listLoading:false,

        //状态列表
        statusList:[
          {
            code:"0",
            name:"下架"
          },
          {
            code:"1",
            name:"上架"
          },
          {
            code:"4",
            name:"待激活"
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

        filters: {
          //零售户在某组织公司的状态
          status:'1',
          //审核状态：1-待审核；2-审核通过；3-审核未通过；4-待激活
          authStatus :'4',
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
          //零售户是否打印过店码
          isPrint:'',

          //查询排序类型
          sortType:1,
          sortValue:1,


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
      this.getListNewList()
      this.getOneCategory()
    },
    methods:{
      addNewSeller(){
        this.$router.push({
          'path':'/seller/addSeller'
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
      //获取列表
      getListNewList(type) {
        let params = {
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

          isPrint:this.filters.isPrint,
          //排序
          sortType: 1,
          sortValue: this.filters.sortValue,

          pageNo: this.pageNo,
          pageSize: 10,

        };
        if(type){
          params.sortType = type
          if(this.filters.sortValue==1){
            this.filters.sortValue = 0
          }else {
            this.filters.sortValue = 1
          }
        }
        if(this.filters.status == 4){
          //审核状态
          params.authStatus = this.filters.authStatus
        }else{
          params.status = this.filters.status
        }

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
        this.filters.authStatus = '1'
        //业态 : 1-食杂店；2-便利店；3-超市；4-商场；5-烟酒商店；6-娱乐服务；7-其他
        this.filters.commercial = ''
        //区域: 1-城镇；2-乡村
        this.filters.district = ''
        //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
        this.filters.searchType = ''
        //模糊搜索内容
        this.filters.keywords = ''
        //开始时间
        this.filters.appStartTime = ''
        //结束时间
        this.filters.appEndTime = ''

        //门店所在省份编码
        this.filters.addrProvince = ''
        //门店所在城市编码
        this.filters.addrCity = ''
        //门店所在区县编码
        this.filters.addrArea = ''

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
        let params = {sellerId,status:1}
        this.$confirm(`您确定上架此商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/modifyAuthOrg',params,false,res => {
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

      //下架
      disapproval(sellerId){
        let params = {sellerId,status:0}
        this.$confirm(`您确定下架此商品？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/modifyAuthOrg',params,false,res => {
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

              this.getListNewList()
            }
          })
        })
      },
      sellerDetail(sellerId){
        this.$router.push({
          path:'/seller/sellerDetail?sellerId='+sellerId
        })
      },

      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getListNewList()
      },
      exportSeller(){
        // var url = `api/private/1.0/deliveryStatistics/importExcle?type=${res.data.data.type}&name=${res.data.data.name}`
        // window.location.href = _this.GLOBAL.config.exportH+url;
        let params = {
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

          isPrint:this.filters.isPrint,
          //排序
          sortType: 1,
          sortValue: this.filters.sortValue,

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