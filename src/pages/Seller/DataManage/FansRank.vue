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
          <div class="title">粉丝数量排名</div>
          <template v-if="!showMore1">
            <el-table
                :data="fansNumRankList"
                style="width: 300px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="totalFans"
                  label="粉丝数量"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.totalFans">0</span>
                  <span v-else>{{scope.row.totalFans}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="displayName"
                  label="销区/地区"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore1 = true">点击查看更多</div>
          </template>
          <template v-else>
            <el-table
                v-if="showMore1"
                :data="fansNumRankList"
                max-height="600"
                style="width: 300px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="totalFans"
                  label="粉丝数量"
              >
                <template slot-scope="scope">
                  <span v-if="!scope.row.totalFans">0</span>
                  <span v-else>{{scope.row.totalFans}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="displayName"
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
                :data="fansScanNumRankList"
                style="width: 300px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="totalScanCount"
                  label="扫码次数"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="displayName"
                  label="销区/地区"
              >
              </el-table-column>
            </el-table>
            <div class="more" @click="showMore2 = true">点击查看更多</div>
          </template>
          <template v-else>
            <el-table
                v-if="showMore2"
                :data="fansScanNumRankList"
                max-height="600"
                style="width: 300px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="totalScanCount"
                  label="扫码次数"
              >
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="displayName"
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
                :data="fansScanSnNumRankList"
                style="width: 300px;height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="totalScanCount"
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
                :data="fansScanSnNumRankList"
                max-height="600"
                style="width: 300px;min-height: 440px">
              <el-table-column
                  align="center"
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="totalScanCount"
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
    </el-card>
  </div>
</template>

<script>
const  RankData =  {
  "fansScanSnNumRankList": [ //扫码规格排名
    {
      "totalScanCount": 705,
      "snName": "测试规格1"
    },
    {
      "totalScanCount": 411,
      "snName": "测试规格2"
    },
    {
      "totalScanCount": 203,
      "snName": "测试规格3"
    },{
      "totalScanCount": 705,
      "snName": "测试规格1"
    },
    {
      "totalScanCount": 411,
      "snName": "测试规格2"
    },
    {
      "totalScanCount": 203,
      "snName": "测试规格3"
    },{
      "totalScanCount": 705,
      "snName": "测试规格1"
    },
    {
      "totalScanCount": 411,
      "snName": "测试规格2"
    },
    {
      "totalScanCount": 203,
      "snName": "测试规格3"
    },{
      "totalScanCount": 705,
      "snName": "测试规格1"
    },
    {
      "totalScanCount": 411,
      "snName": "测试规格2"
    },
    {
      "totalScanCount": 203,
      "snName": "测试规格3"
    },
  ],
  "fansNumRankList": [  //粉丝数量排名
    {
      "totalFans": 160,
      "displayName": "东北大区"
    },
    {
      "totalFans": 130,
      "displayName": "石家庄"
    },{
      "totalFans": 160,
      "displayName": "东北大区"
    },
    {
      "totalFans": 130,
      "displayName": "石家庄"
    },{
      "totalFans": 160,
      "displayName": "东北大区"
    },
    {
      "totalFans": 130,
      "displayName": "石家庄"
    },{
      "totalFans": 160,
      "displayName": "东北大区"
    },
    {
      "totalFans": 130,
      "displayName": "石家庄"
    },{
      "totalFans": 160,
      "displayName": "东北大区"
    },
    {
      "totalFans": 130,
      "displayName": "石家庄"
    },
  ],
  "fansScanNumRankList": [ //扫码烟包数排名
    {
      "totalScanCount": 800,
      "displayName": "石家庄"
    },
    {
      "totalScanCount": 519,
      "displayName": "广西云南大区"
    },{
      "totalScanCount": 800,
      "displayName": "石家庄"
    },
    {
      "totalScanCount": 519,
      "displayName": "广西云南大区"
    },{
      "totalScanCount": 800,
      "displayName": "石家庄"
    },
    {
      "totalScanCount": 519,
      "displayName": "广西云南大区"
    },{
      "totalScanCount": 800,
      "displayName": "石家庄"
    },
    {
      "totalScanCount": 519,
      "displayName": "广西云南大区"
    },{
      "totalScanCount": 800,
      "displayName": "石家庄"
    },
    {
      "totalScanCount": 519,
      "displayName": "广西云南大区"
    },{
      "totalScanCount": 519,
      "displayName": "广西云南大区"
    },{
      "totalScanCount": 519,
      "displayName": "广西云南大区"
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
      fansScanSnNumRankList:[],
      fansNumRankList:[],
      fansScanNumRankList:[],
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
        saleZoneCode:type === 'allZone'?'all':null,
        provCode:type === 'allProv'?'all':null,
        opDate:this.search.opDate,
        dateType: this.search.dateType
      }
      if(!params.opDate){
        this.$message.warning("提示：请选择日期进行查询！");
        return
      }
      this.$request.post('/dataStats/statHbsSeller/fansDs/rank', params, false, (res) => {
        if (res.code == '200') {
          this.fansScanSnNumRankList = res.data.fansScanSnNumRankList.length?res.data.fansScanSnNumRankList: []
          this.fansNumRankList = res.data.fansNumRankList.length?res.data.fansNumRankList: []
          this.fansScanNumRankList = res.data.fansScanNumRankList.length?res.data.fansScanNumRankList: []
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
        opDate:this.search.opDate,
        dateType: this.search.dateType
      }
      if(!params.saleZoneCode&&!params.provCode){
        this.$message.warning("提示：请选择销区或省份进行查询！");
        return
      }
      if(!params.opDate){
        this.$message.warning("提示：请选择日期进行查询！");
        return
      }
      this.$request.post('/dataStats/statHbsSeller/fansDs/rank', params, false, (res) => {
        if (res.code == '200') {

          if(!res.data){
            res.data = RankData
          }
          this.fansScanSnNumRankList = res.data.fansScanSnNumRankList
          this.fansNumRankList = res.data.fansNumRankList
          this.sellerShopFansNumRank = res.data.sellerShopFansNumRank
          this.fansScanNumRankList = res.data.fansScanNumRankList
        }else {
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
