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
            <el-select size="small" v-model="search.provCode" placeholder="请选择省份">
              <el-option
                  v-for="(item,index) in saleZoneProv"
                  :key="index"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-button size="small" type="primary" @click="getData">查询</el-button>
        <el-button size="small" v-if="showBtn" @click="handleClickALL('allZone')">全部销区</el-button>
        <el-button size="small" v-if="showBtn" @click="handleClickALL('allProv')">全部省份</el-button>
      </el-form>
    </el-card>
    <div style="height: 20px"></div>
    <el-card>
      <div class="echart-container">
        <div id="echart-1"></div>
        <div id="echart-2"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "FansAge",
  data(){
    return{
      loading:false,
      saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      search:{
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
        provCode:null
      },
      saleZone:[],
      saleZoneProv:[],
      showBtn:false,
      listLoading:false,
      curAllNum:'',
      newAllNum:'',
      listData:[]
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
      this.getData()
    }
  },
  methods:{
    handleClickALL(type){
      this.search.saleZoneCode = null
      this.search.provCode = null
      let params = {
        type
      }
      this.$request.post('/dataStats/statHbsSeller/sellerNumber/allData', params, false, (res) => {
        if (res.code == '200') {
          const data = {
            "curAllNum": 44,
            "newAllNum": 16,
            "listData": [
              {
                "curNum": 12,
                "name": "西北大区",
                "newNum": 5
              },
              {
                "curNum": 10,
                "name": "西南大区",
                "newNum": 3
              },
              {
                "curNum": 12,
                "name": "东北大区",
                "newNum": 5
              },
              {
                "curNum": 10,
                "name": "北京销区",
                "newNum": 3
              },
            ]
          }
          this.curAllNum = res.data.curAllNum?res.data.curAllNum:data.curAllNum
          this.newAllNum = res.data.newAllNum? res.data.newAllNum:data.newAllNum
          this.listData = res.data.listData.length?res.data.listData:data.listData
          this.handleDrawMap1()
        }
      })
    },
    handleDrawMap1(){
      let myChart1 = this.$echarts.init(document.getElementById('echart-1'))
      console.log(myChart1)
      let seriesData1 = []
      let seriesData2 = []
      const xAxisData = this.listData.map(i=>{
        seriesData1.push(i.curNum)
        seriesData2.push(i.newNum)
        return i.name
      })
      const curAllNum = this.curAllNum
      const newAllNum = this.newAllNum
      let option = {
        color: ['#00a3ff','#d5d5d5'],
        title: {
          text: '零售户区域分布',
          left: 'center',
          subtext:`新增零售户:${newAllNum}家   累计零售户:${curAllNum}家`
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: 'bottom',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top:'15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name:'数量'
          }
        ],
        series: [
          {
            name: '新增零售户',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            barMaxWidth:40,
            data: seriesData2
          },
          {
            name: '累计零售户',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            barMaxWidth:40,
            data: seriesData1
          },
        ]
      };
      myChart1.setOption(option);
    },
    handleSaleZoneCodeChange(saleZone){
      this.search.provCode = null
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
    getData() {
      let params = {
        saleZoneCode:this.search.saleZoneCode,
        provCode:this.search.provCode,
      }
      if(!params.saleZoneCode&&!params.provCode){
        this.$message.warning("提示：请选择销区或省份进行查询！");
        return
      }
      this.$request.post('/dataStats/statHbsSeller/sellerNumber/regionData', params, false, (res) => {
        if (res.code == '200') {
          if(res.data){
            this.curAllNum = res.data.curAllNum
            this.newAllNum = res.data.newAllNum
            this.listData = res.data.listData
            this.handleDrawMap1()
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.echart-container{
  padding-top: 30px;
  #echart-1{
    width: 100%;
    height: 500px;
    margin-bottom: 20px;
  }
}
</style>
