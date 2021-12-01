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
        provinceCode:null
      },
      saleZone:[],
      saleZoneProv:[],
      showBtn:false,
      listLoading:false,
      dimAgeLevel:[],
      ageList:[],
      genderList:[]
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
      this.search.provinceCode = null
      let params = {
        saleZoneCode:type === 'allZone'?'all':null,
        provinceCode:type === 'allProv'?'all':null,
      }
      this.$request.post('/dataStats/statHbsSeller/fansDs/ageGenderDistribution', params, false, (res) => {
        if (res.code == '200') {
          this.dimAgeLevel = res.data.dimAgeLevel
          this.ageList = res.data.ageList
          this.genderList = res.data.genderList
          this.handleDrawMap1()
          this.handleDrawMap2()
        }
      })
    },
    handleDrawMap1(){
      let myChart1 = this.$echarts.init(document.getElementById('echart-1'))
      console.log(myChart1)
      const data = this.genderList.map(i=>{
        return {
          value:i.num,
          name:i.fanGender == 1?'男':i.fanGender == 2?'女':'未知'
        }
      })
      let option = {
        color:['#00a3ff','#ffd135','#00ce7b'],
        title: {
          text: '性别',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: '40%',
          formatter: function (name) {
            return   name ;
          }
        },
        series: [
          {
            name: '性别',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart1.setOption(option);
    },
    handleDrawMap2(){
      let myChart2 = this.$echarts.init(document.getElementById('echart-2'))
      const data = this.ageList.map(i=>{
        if(i.ageLevel === undefined) return
        return {
          value:i.num,
          name:this.dimAgeLevel.find(j=>{
            return j.ageLevel ===i.ageLevel
          }).levelName
        }
      })
      console.log(data)
      let option = {
        color:['#00a3ff','#ffd135','#00ce7b','#a15ee3','#00cece','#ff3559'],
        title: {
          text: '年龄',
          left: '40%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: '30%',
          formatter: function (name) {
            return   name ;
          }
        },
        series: [
          {
            name: '年龄',
            type: 'pie',
            radius: '50%',
            data: data,
            center: ["45%","50%"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart2.setOption(option);
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
    getData() {
      let params = {
        saleZoneCode:this.search.saleZoneCode,
        provCode:this.search.provinceCode,
      }
      if(!params.saleZoneCode&&!params.provCode){
        this.$message.warning("提示：请选择销区或省份进行查询！");
        return
      }
      this.$request.post('/dataStats/statHbsSeller/fansDs/ageGenderDistribution', params, false, (res) => {
        if (res.code == '200') {
          if(res.data){
            this.dimAgeLevel = res.data.dimAgeLevel
            this.ageList = res.data.ageList
            this.genderList = res.data.genderList
            this.handleDrawMap1()
            this.handleDrawMap2()
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.echart-container{
  overflow: auto;
  #echart-1{
    float: left;
    width: 480px;
    height: 300px;
    margin-right: 20px;
  }
  #echart-2{
    float: left;
    width: 480px;
    height: 300px;
  }
}


</style>
