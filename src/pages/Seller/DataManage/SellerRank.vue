<template>
  <div class="seller-rank-container" v-loading="loading">
    <el-card class="box-card">
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item>
          <el-form-item label="销区：" prop="saleZoneCode">
            <el-select size="small" v-model="search.saleZoneCode" placeholder="请选择销区" @change="handleSaleZoneCodeChange">
              <el-option
                  v-for="(item,index) in saleZone"
                  :key="index"
                  :label="item.zoneName"
                  :value="item.zoneCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-form-item label="省份：" prop="saleZoneCode">
            <el-select size="small" v-model="search.provinceCode" placeholder="请选择省份">
              <el-option
                  v-for="(item,index) in saleZoneProv"
                  :key="index"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-form-item label="日期类型：" prop="dateType">
            <el-select size="small" v-model="search.dateType" @change="handleSelectDateType" placeholder="请选择日期类型">
              <el-option
                  v-for="(item,index) in dateType"
                  :key="index"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-form-item label="日期：" prop="opDate">
            <el-date-picker
                v-if="search.dateType == 'day'"
                v-model="search.opDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
            <el-select  v-if="search.dateType != 'day'" size="small" v-model="search.opDate" placeholder="选择日期">
              <el-option
                  v-for="(item,index) in dates"
                  :key="index"
                  :label="item.dateShow"
                  :value="item.opDate">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-button size="small" type="primary" @click="getSellerRank">查询</el-button>
        <el-button size="small" v-if="showBtn" @click="handleClickALL('allZone')">全部销区</el-button>
        <el-button size="small" v-if="showBtn" @click="handleClickALL('allProv')">全部省份</el-button>
      </el-form>
    </el-card>
    <div style="height: 20px"></div>
    <el-card>
      <div class="form-container">
        <div class="rank-form">
          <div class="title">注册排名</div>
          <template v-if="!showMore1">
            <el-table
                :data="sellerNumRank"
                style="width: 300px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="curNum"
                  label="注册数量"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="name"
                  label="销区/地区"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore1 = true">点击查看更多</div>
          </template>
          <template v-else>
            <el-table
                v-if="showMore1"
                :data="sellerNumRank"
                max-height="600"
                style="width: 300px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="curNum"
                  label="注册数量"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="name"
                  label="销区/地区"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore1 = false">收起</div>
          </template>
        </div>
        <div class="rank-form">
          <div class="title">扫码量排名</div>
          <template v-if="!showMore2">
            <el-table
                :data="sellerScanRank"
                style="width: 300px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="sellerScan"
                  label="扫码次数"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="name"
                  label="销区/地区"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore2 = true">点击查看更多</div>
          </template>
          <template v-else>
            <el-table
                v-if="showMore2"
                :data="sellerScanRank"
                max-height="600"
                style="width: 300px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="sellerScan"
                  label="扫码次数"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="name"
                  label="销区/地区"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore2 = false">收起</div>
          </template>
        </div>
        <div class="rank-form">
          <div class="title">各规格扫码量排名</div>
          <template v-if="!showMore3">
            <el-table
                :data="sellerSnScanRank"
                style="width: 300px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="sellerScan"
                  label="扫码包数"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="snName"
                  label="规格"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore3 = true">点击查看更多</div>
          </template>
          <template v-else>
            <el-table
                v-if="showMore3"
                :data="sellerSnScanRank"
                max-height="600"
                style="width: 300px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="sellerScan"
                  label="扫码包数"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="snName"
                  label="规格"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore3 = false">收起</div>
          </template>
        </div>

      </div>
      <div class="form-container">
        <div class="rank-form" style="width: 400px">
          <div class="title">零售户店铺排名</div>
          <template v-if="!showMore4">
            <el-table
                :data="sellerShopFansNumRank"
                style="width: 400px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="shopName"
                  label="店铺名称"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="zoneProvName"
                  label="销区/地区"
              >
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="fansNum"
                  label="粉丝数量"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.fansNum">0</span>
                  <span v-else>{{scope.row.fansNum}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore4 = true">点击查看更多</div>
          </template>
          <template v-else>
            <el-table
                v-if="showMore4"
                :data="sellerShopFansNumRank"
                max-height="600"
                style="width: 400px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="shopName"
                  label="店铺名称"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="zoneProvName"
                  label="销区/地区"
              >
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="fansNum"
                  label="粉丝数量"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.fansNum">0</span>
                  <span v-else>{{scope.row.fansNum}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore4 = false">收起</div>
          </template>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
const  RankData =  {
  "sellerScanRank": [
    {
      "name": "河北石家庄",
      "sellerScan": 56
    },
    {
      "name": "西南大区",
      "sellerScan": 26
    },
    {
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },{
      "name": "西南大区",
      "sellerScan": 26
    },
  ],
  "sellerNumRank": [
    {
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },{
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },{
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },{
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },{
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },{
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },{
      "curNum": 22,
      "name": "河北石家庄"
    },
    {
      "curNum": 12,
      "name": "西北大区"
    },
  ],
  "sellerShopFansNumRank": [
    {
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },{
      "zoneProvName": "东北大区",
      "fansNum": 120,
      "shopName": "name2"
    },
    {
      "zoneProvName": "石家庄",
      "fansNum": 100,
      "shopName": "name1"
    },
  ],
  "sellerSnScanRank": [
    {
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },{
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },{
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },{
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },{
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },{
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },{
      "snName": "马尔斯绿",
      "sellerScan": 120
    },
    {
      "snName": "软荷花",
      "sellerScan": 103
    },
  ]
}
export default {
  name: "SellerRank",
  data(){
    return{
      loading:false,
      saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      search:{
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
        provinceCode:null,
        opDate:new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd'),
        dateType:'day'
      },
      dateType:[
        {
          name:'日',
          code:'day'
        },{
          name:'周',
          code:'week'
        },{
          name:'月',
          code:'month'
        },
      ],
      dates:[],
      saleZone:[],
      saleZoneProv:[],
      sellerScanRank:[],
      sellerNumRank:[],
      sellerSnScanRank:[],
      sellerShopFansNumRank:[],
      showBtn:false,
      listLoading:false,
      showMore1:false,
      showMore2:false,
      showMore3:false,
      showMore4:false,
    }
  },
  mounted() {
    if(this.saleZoneCode === null){
      this.showBtn = true
    }
    this.getSaleZone();
    if(this.saleZoneCode === null){
      this.handleClickALL('allZone');
    }else {
      this.getSellerRank()
    }
  },
  methods:{
    handleSelectDateType(type){
      console.log(type)
      this.search.opDate = null
      this.dates = []
      if(type!='day'){
        let params = {
          type
        }
        this.$request.post('/dataStats/dim/dataShow/select', params, false, (res) => {
          if (res.code == '200') {
            this.dates = res.data
          }
        })
      }
    },
    handleClickALL(type){
      this.search.saleZoneCode = null
      this.search.provinceCode = null
      let params = {
        type,
        optDate:this.search.opDate,
        dateType: this.search.dateType
      }
      if(!params.optDate){
        this.$message.warning("提示：请选择日期进行查询！");
        return
      }
      this.$request.post('/dataStats/statHbsSeller/sellerRank/allRankData', params, false, (res) => {
        if (res.code == '200') {
          this.sellerScanRank = res.data.sellerScanRank.length?res.data.sellerScanRank: []
          this.sellerNumRank = res.data.sellerNumRank.length?res.data.sellerNumRank: []
          this.sellerShopFansNumRank = res.data.sellerShopFansNumRank.length?res.data.sellerShopFansNumRank: []
          this.sellerSnScanRank = res.data.sellerSnScanRank.length?res.data.sellerSnScanRank: []
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSaleZoneCodeChange(saleZone){
      this.search.provinceCode = null
      this.$request.post('/api/saleZone/saleZoneProv', {saleZone}, false, (res) => {
        if (res.code == '200') {
          this.saleZoneProv = res.data || []
        }
      })
    },
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
        if (res.code == '200') {
          this.saleZone = res.data || []
          if (this.isAllSaleZone == 1) {
          } else {
            this.search.saleZoneCode = this.saleZoneCode
          }
        }
      })
    },
    getSellerRank() {
      let params = {
        saleZoneCode:this.search.saleZoneCode,
        provCode:this.search.provinceCode,
        optDate:this.search.opDate,
        dateType: this.search.dateType
      }
      if(!params.saleZoneCode&&!params.provCode){
        this.$message.warning("提示：请选择销区或省份进行查询！");
        return
      }
      if(!params.optDate){
        this.$message.warning("提示：请选择日期进行查询！");
        return
      }
      this.$request.post('/dataStats/statHbsSeller/sellerRank/regionRankData', params, false, (res) => {
        if (res.code == '200') {

          if(!res.data){
            res.data = RankData
          }
          this.sellerScanRank = res.data.sellerScanRank
          this.sellerNumRank = res.data.sellerNumRank
          this.sellerShopFansNumRank = res.data.sellerShopFansNumRank
          this.sellerSnScanRank = res.data.sellerSnScanRank
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.seller-rank-container{
  .form-container{
    display: flex;
  }
  .rank-form{
    width: 300px;
    border: 1px solid #e1e1e1;
    margin-left: 30px;
    margin-bottom: 30px;
    height: fit-content;
    .title{
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      background-color: #e1e1e1;
    }
    .more{
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
