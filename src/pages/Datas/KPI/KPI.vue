<template>
  <div class="data-home">
    <div class="ui-panel-title hot"><i class="hot"></i><span>总体指标展示</span></div>
    <el-card>
      <div class="panel-body">
        <p class="ui-scan-city">扫码次数当前10城市</p>
        <p class="ui-scan-hot-city ellipsis" id="scan_top">
          {{tops}}
        </p>
        <div class="ui-map-content-box">
          <div id="baiduChinaMap" class="china-map"></div>
          <div class="ui-real-time">
            <p>实时数据</p>
            <ul class="ui-real-time-data" id="scroll_data">
              <li v-for="(item,index) in rollDatas" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="ui-scan-box">
            <div class="ui-scan-times ui-scan-detail">
              <el-tooltip popper-class="mytooltip" content="从当天零点开始到当前时间，总共产生的扫码次数的实时数值，包含重复扫码的情况" placement="top">
                <p>
                  当日扫码总次数：<span id="scan_day">{{timeScanData.scanTimes_of_day}}</span><em>&nbsp;次</em>
                </p>
              </el-tooltip>
              <el-tooltip popper-class="mytooltip" content="从系统有数据记录开始到前一天，总共产生的扫码次数的实时数值，包含重复扫码的情况" placement="top">
                <p>
                  历史扫码总次数：<span id="scan_day_rate">{{hisScanData.totalPv}}</span><em>&nbsp;次</em>
                </p>
              </el-tooltip>
            </div>
            <div class="ui-scan-total ui-scan-detail">
              <el-tooltip popper-class="mytooltip" content="从当天零点开始到当前时间，参与扫码活动的总用户数的实时数值，对当天的扫码用户的id进行了去重处理" placement="top">
                <p>
                  当日扫码总人数：<span id="scan_user">{{timeScanData.scanUsers_of_day}}</span><em>&nbsp;人</em>
                </p>
              </el-tooltip>
              <el-tooltip popper-class="mytooltip" content="从系统有数据记录开始到前一天，参与扫码活动的总用户数的实时数值，对历史所有扫码用户的id进行了去重处理" placement="top">
                <p>
                  历史扫码总人数：<span id="scan_user_rate">{{hisScanData.totalUv}}</span><em>&nbsp;人</em>
                </p>
              </el-tooltip>
            </div>
            <div class="ui-scan-rate ui-scan-detail">
              <el-tooltip popper-class="mytooltip" content="从当天零点开始到当前时间，总共产生的扫码总烟包数的实时数值，去除当天重复扫码后的扫码数" placement="top">
                <p>
                  当日扫码总烟包数：<span id="scan_code">{{timeScanData.scanCodes_of_day}}</span><em>&nbsp;个</em>
                </p>
              </el-tooltip>
              <el-tooltip popper-class="mytooltip" content="从系统有数据记录开始到前一天，总共产生的扫码总烟包数的实时数值，去除历史重复扫码后的扫码数" placement="top">
                <p>
                  历史扫码总烟包数：<span id="scan_code_rate">{{hisScanData.totalCode}}</span><em>&nbsp;个</em>
                </p>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="space"></div>
    <div class="ui-panel-title"><i class="total"></i><span>指标一览表</span></div>
    <el-card>
      <el-tabs v-model="tableActiveTab" @tab-click="tabClick">
        <el-tab-pane label="销区指标" name="first">
          <el-table class="kpi-page-table" v-show="!sortTable" border ref="unsortTable" style="width:100%" stripe row-class-name="tableClass" tooltip-effect="dark"
            :span-method="objectSpanMethod" :data="tableDatas" 
            @sort-change="sortDatas" @cell-click="arrowCellClick">
            <el-table-column label="地域" align="center">
              <el-table-column label="统计" prop="overview" align="center"></el-table-column>
              <el-table-column label="省市" align="center">
                <template slot-scope="scope">
                    {{scope.row.provOrCity}}
                    <i v-if="scope.row.province?true:false" :class="arrowTop[scope.row.province]?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="saleType" label="所属销区" align="center"></el-table-column>
            <el-table-column prop="scantimes" label="扫码次数" align="center" width="180" sortable="custom" :render-header="scantimesHeader"></el-table-column>
            <el-table-column prop="scanUsers" label="扫码人数" align="center" width="180" sortable="custom" :render-header="scanusersHeader"></el-table-column>
            <el-table-column prop="scanCodes" label="扫码烟包数" align="center" width="180" sortable="custom" :render-header="scancodesHeader"></el-table-column>
          </el-table>
          <el-table v-show="sortTable" border ref="areaSortTable" :data="tableSortDatas" style="width:100%" stripe @sort-change="sortDatasChange" @cell-click="sortArrowCellClick">
            <el-table-column label="省市" align="center">
              <template slot-scope="scope">
                  {{scope.row.provOrCity}}
                  <i v-if="scope.row.province?true:false" :class="sortArrowTop[scope.row.province]?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
              </template>
            </el-table-column>
            <el-table-column prop="saleType" label="所属销区" align="center"></el-table-column>
            <el-table-column prop="scantimes" label="扫码次数" align="center" width="180" sortable="custom"></el-table-column>
            <el-table-column prop="scanUsers" label="扫码人数" align="center" width="180" sortable="custom"></el-table-column>
            <el-table-column prop="scanCodes" label="扫码烟包数" align="center" width="180" sortable="custom"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="规格指标" name="second">
          <el-table class="kpi-page-table" v-show="!prodSort" border ref="prodUnsortTable" :span-method="prodSpan" :data="prodTableDatas" style="width:100%" stripe show-summary row-class-name="tableClass" @sort-change="prodSortDatas">
            <el-table-column label="产品" align="center">
              <el-table-column label="品牌" prop="brand" align="center"></el-table-column>
              <el-table-column label="规格" prop="specification" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="scantimes" label="扫码次数" align="center" width="180" sortable="custom" :render-header="scantimesHeader"></el-table-column>
            <el-table-column prop="scanUsers" label="扫码人数" align="center" width="180" sortable="custom" :render-header="scanusersHeader"></el-table-column>
            <el-table-column prop="scanCodes" label="扫码烟包数" align="center" width="180" sortable="custom" :render-header="scancodesHeader"></el-table-column>
            <el-table-column prop="drawTimes" label="抽奖次数" align="center" width="180" sortable="custom" :render-header="drawtimesHeader"></el-table-column>
          </el-table>
          <el-table v-show="prodSort" border ref="prodSortTable" :data="prodTableDatas" style="width:100%" stripe show-summary @sort-change="prodSortDatasChange">
            <el-table-column prop="specification" label="规格" align="center"></el-table-column>
            <el-table-column prop="scantimes" label="扫码次数" align="center" width="180" sortable="custom"></el-table-column>
            <el-table-column prop="scanUsers" label="扫码人数" align="center" width="180" sortable="custom"></el-table-column>
            <el-table-column prop="scanCodes" label="扫码烟包数" align="center" width="180" sortable="custom"></el-table-column>
            <el-table-column prop="drawTimes" label="抽奖次数" align="center" width="180" sortable="custom"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import ChinaMapEcharts from './ChinaMapEcharts'
export default {
  data() {
    return {
      intervalLoad: true, // 开发时使用，是否开启每隔指定时间进行动态加载数据
      loadDuration: 3000, // n秒加载一次页面地图及扫码数据
      scrollLoadDuration: 9000, // n秒加载一次实时滚动列表数据
      tableLoadDuration: 60*60*1000, // n秒加载一次表格数据
      // 页面中定时调度句柄监控
      intervalHandle: {
        topDatasHandle: "", // 定时加载地图部分数据的句柄
        rollHandle: "", // 定时加载实时数据部分数据的句柄
        rollScrollHandle: "", // 实时数据滚动句柄
        bottomTableHandle: "" // 定时加载底部表格数据的句柄
      },
      chinaJson: {},
      echartsConf: {},
      latlngJson: {},

      chinaJsonLoaded: false, // 标识数据加载的状态
      echartsConfLoaded: true, // 标识百度地图配置加载的状态。目前使用js文件，所以支持为true
      latlngJsonLoaded: false, // 标识地图经纬度加载状态

      salesTblConf: {},
      formatTblConf: {},
      sfTblConf: {},
      mapEchart: {}, // 中国地图
      tops: "", // 地图上方的top10排名
      mapData: [], // 地图上的数据
      hisScanData: { // 地图右侧历史扫码数据:{"scanTotalCode":34323151,"scanTotalPv":47093856,"scanTotalUv":4325241}
        scanTotalCode: 0, // 接口返回值历史扫码总次数
        scanTotalPv: 0, // 接口返回值历史扫码总人数
        scanTotalUv: 0, // 接口返回值历史扫码总烟包数
        totalCode: 0, // 程序处理值历史扫码总次数
        totalPv: 0, // 程序处理值历史扫码总人数
        totalUv: 0 // 程序处理值历史扫码总烟包数
      },
      timeScanData: { // 地图右侧时时扫码数据
        scanTimes_of_day: 0, // 接口返回值当日扫码总次数：{"scanTimes_of_day":"109236"}
        scanUsers_of_day: 0, // 接口返回值当日扫码总人数：{"scanUsers_of_day":"61327"}
        scanCodes_of_day: 0, // 接口返回值当日扫码总烟包数：{"scanCodes_of_day":"90579"}
        timesOfDay: 0, // 程序处理值当日扫码总次数
        usersOfDay: 0, // 程序处理值当日扫码总人数
        codesOfDay: 0 // 程序处理值当日扫码总烟包数
      },
      rollDatas: [], // 实时滚动数据
      // 首页底部表格区域定义
      tableActiveTab: "first",
       // 动态生成每个省份数据下拉箭头：省份名称:boolean(是否向上的箭头)
      arrowTop: {},
      sortTable: false, // 销区指标中是否为排序展示
      // 合并单元格使用
      spanTable: [{min:1, max:1}],
      tableDatas: [], // 处理后表格要展示的数据：{"overview":"销区或总计","provOrCity":"","province":"","city":"","saleType":"销区名称","scanCodes":"0","scanUsers":"0","scantimes":"0"}
      sortArrowTop: {}, // 排序表格中箭头
      sortInfo: {prop:'scanCodes',order:'descending'}, // 默认排序：prop-排序列；order：排序类型：descending-降序；ascending-升序
      tableSortDatas: [], // 排序表格数据
      // ===================== 规格指标列表 =======================
      prodSort: false,
      prodSortInfo: {prop:'scanCodes',order:'descending'},
      prodTableDatas: [],
      yesterday: ""
    }
  },
  created() {
    let _now = new Date();
    _now.setTime(_now.getTime()-24*60*60*1000);
    let month = _now.getMonth() + 1; // 月份从0开始
    let day = _now.getDate();
    this.yesterday = _now.getFullYear() + "-" + (month<10?("0"+month):month) + "-" + (day<10?("0"+day):day);

    let _this = this;
    _this.loadJsonDatas();

    // 下面开始为循环加载
    _this.getPageTopDatas();
    _this.getRollData();
    _this.getProvDatas();

    if(_this.intervalLoad) {
      // 页面定时调度加载上面地图数据
      _this.intervalHandle.topDatasHandle = setInterval(function() {
        _this.getPageTopDatas();
      }, _this.loadDuration);
      // 页面定时调度加载上面实时数据块
      _this.intervalHandle.rollHandle = setInterval(function() {
        _this.getRollData();
      }, _this.scrollLoadDuration);
      // 页面定时调度加载底部表格数据
      _this.intervalHandle.bottomTableHandle = setInterval(function() {
        _this.getProvDatas();
      }, _this.tableLoadDuration);
    }
  },
  // 路由离开当前页之前执行的函数
  beforeRouteLeave(to, from, next) {
    if(this.intervalLoad) {
      clearInterval( this.intervalHandle.topDatasHandle );
      clearInterval( this.intervalHandle.rollHandle );
      clearInterval( this.intervalHandle.bottomTableHandle );
    }
    clearInterval( this.intervalHandle.rollScrollHandle );
    next();
  },
  methods: {
    // 加载json数据
    loadJsonDatas() {
      // 动态加载百度地图配置数据
      this.$request.get('/record/statics/home/kpi/china.json', {}, (res)=>{
        this.chinaJson = res || {};
        this.chinaJsonLoaded = true;
        this.initMap();
      });
      // 动态加载百度地图echart配置
      //this.$request.get('/record/statics/home/kpi/echartConf.json', {}, (res)=>{
      //  this.echartsConf = res || {};
      //  this.echartsConfLoaded = true;
      //  this.initMap();
      //});
      // 动态加载经纬度数据
      this.$request.get('/record/statics/home/kpi/latlng.json', {}, (res)=>{
        this.latlngJson = res || {};
        this.latlngJsonLoaded = true;
        this.initMap();
      });
      //this.$request.get('/record/statics/home/kpi/salesTblConf.json', {}, (res)=>{
      //  this.salesTblConf = res || {};
      //});
      //this.$request.get('/record/statics/home/kpi/formatTblConf.json', {}, (res)=>{
      //  this.formatTblConf = res || {};
      //});
      //this.$request.get('/record/statics/home/kpi/sfTblConf.json', {}, (res)=>{
      //  this.sfTblConf = res || {};
      //});
    },
    // 初始化页面地图
    initMap() {
      if( !this.chinaJsonLoaded || !this.echartsConfLoaded || !this.latlngJsonLoaded ) {// 任何一个为加载完成，则不做地图的初始化
        return false;
      }
      this.$echarts.registerMap('china', this.chinaJson);
      let myChart = this.$echarts.init(document.getElementById('baiduChinaMap'));
      window.onresize = myChart.resize;
      this.mapEchart = myChart;
      // 自定义tooltip
      ChinaMapEcharts.tooltip.formatter = function (params) {
        return params.name + '扫码量: ' + params.value[2] + '次';
      }
      myChart.setOption(ChinaMapEcharts);

      this.getMapData();
      let _this = this;
      // 定时执行加载地图数据
      //let mapDataHandle = setInterval(function(){
      //  _this.getMapData();
      //}, _this.loadDuration);
    },
    // 格式化地图数据
    convertData(data) {
      let res = [];
      let _latlng = this.latlngJson;
      data.forEach(function (d) {
        res.push({
          name: d.city,
          value: (_latlng[d.cityCode] &&
            [_latlng[d.cityCode].lng, _latlng[d.cityCode].lat, d.scantimes]) ||
            [d.longitude, d.latitude, d.scantimes]
        });
      });
      return res;
    },
    // 计算处理数字展示格式
    fixData (o, v) {
      var result = 0;
      o = o || 0;
      v = v || 0;
      o = Number(o);
      v = Number(v);
      result = o + v;
      if (result > 10000) {
        result = '' + Math.round(result/10000)+'万';
      }
      return result;
    },
    // 动态加载地图数据
    getMapData() {
      this.$request.post('/record/data/mapdata', {}, false, (res)=>{
        this.mapData = res || [];
        let option = this.mapEchart.getOption();
        let sortData = this.convertData(this.mapData);
        let top0_30 = sortData.slice(0, 30);
        let top30_60 = sortData.slice(30, 60);
        let top60_90 = sortData.slice(60, 90);
        option.series[0].data = sortData;
        option.series[1].data = top60_90;
        option.series[2].data = top30_60;
        option.series[3].data = top0_30;
        this.mapEchart.setOption(option);
      });
    },
    // 同一周期进行查询
    getPageTopDatas() {
      // 历史扫码情况数据
      this.$request.post('/record/statistics/getHistoryScanUv', {statTime: this.yesterday}, true, (res)=>{
        let datas = res || [];
        //datas = [{"scanTotalCode":34323151,"scanTotalPv":47093856,"scanTotalUv":4325241}];
        if(datas.length>0&&datas[0]) {
          this.hisScanData = Object.assign({}, this.hisScanData, datas[0]);
          this.hisScanData.totalCode = this.fixData(this.hisScanData.scanTotalCode, 0);
          this.hisScanData.totalPv = this.fixData(this.hisScanData.scanTotalPv, 0);
          this.hisScanData.totalUv = this.fixData(this.hisScanData.scanTotalUv, 0);
        }
      });
      // 当日扫码总次数
      this.$request.post('/record/data/dayScanTimes', {}, true, (res)=>{
        let datas = res || {};
        //datas = {"scanTimes_of_day":"109236"};
        this.timeScanData = Object.assign({}, this.timeScanData, datas);
        this.timeScanData.timesOfDay = this.fixData(this.timeScanData.scanTimes_of_day, 0);
      });
      // 当日扫码总人数
      this.$request.post('/record/data/dayScanUsers', {}, true, (res)=>{
        let datas = res || {};
        //datas = {"scanUsers_of_day":"61327"};
        this.timeScanData = Object.assign({}, this.timeScanData, datas);
        this.timeScanData.usersOfDay = this.fixData(this.timeScanData.scanUsers_of_day, 0);
      });
      // 当日扫码总烟包数
      this.$request.post('/record/data/dayScanCodes', {}, true, (res)=>{
        let datas = res || {};
        //datas = {"scanCodes_of_day":"90579"};
        this.timeScanData = Object.assign({}, this.timeScanData, datas);
        this.timeScanData.codesOfDay = this.fixData(this.timeScanData.scanCodes_of_day, 0);
      });
      // top排名
      this.$request.post('/record/data/topTen', {}, true, (res)=>{
        this.tops = "";
        let datas = res || [];
        //datas = ["石家庄市","邢台市","邯郸市","张家口市","保定市","唐山市","null","沧州市","衡水市","北京市"];
        if(datas.length>0) {
          for(let i=0;i<datas.length;i++) {
            if(datas[i]) {
              this.tops += (this.tops?"、":"") + datas[i];
            }
          }
        }
      });
    },
    // 实时滚动数据
    getRollData() {
      clearInterval( this.intervalHandle.rollScrollHandle );
      this.$request.post('/record/data/rollingData', {}, true, (res)=>{
        let datas = res || [];
        //datas = ["河北省石家庄市用户正在访问: 钻石（绿石2代）的扫码验真页面 16:08:07","河北省唐山市用户正在参与: 钻石（细支尚风）的抽奖活动 16:08:06","河北省石家庄市用户正在访问: 钻石（硬玫瑰紫）的扫码验真页面 16:08:06"];
        let _this = this;
        _this.rollDatas = datas;
        if(datas.length>0) {
          _this.intervalHandle.rollScrollHandle = setInterval(function() {
            datas.push(datas[0]);
            datas.splice(0, 1);
            _this.rollDatas = datas;
          }, 3000);
        }
      });
    },

    // 底部表格上多个tab点击时的事件
    tabClick(tab) {
      this.tabIdx = tab.index;
      if(tab.index==0) {
        this.sortTable = false;
        this.getProvDatas();
      } else if(tab.index==1) {
        this.prodSort = false;
        this.getProdDatas();
      }
    },
    // el-table表格中表头鼠标悬浮展示内容
    renderHeaderHandler(h, { column, $index }, index, content) {
      return h('div', {}, [
        h('el-tooltip', {
        	props: {
            placement:'top',
            'popper-class': 'mytooltip',
          	content: content
           }
         }, [h('span', {}, column.label)])
       ]);
    },
    // el-table表格中扫码次数表头鼠标悬浮展示内容
    scantimesHeader(h, { column, $index },index) {
      return this.renderHeaderHandler(h, { column, $index }, index, '从当天零点开始到当前，产生的扫码的实时数值，包含重复扫码的情况');
    },
    // el-table表格中扫码人数表头鼠标悬浮展示内容
    scanusersHeader(h, { column, $index },index) {
      return this.renderHeaderHandler(h, { column, $index }, index, '从当天零点开始到当前，参与扫码活动用户数的实时数值，对当天的扫码用户的id进行了去重处理');
    },
    // el-table表格中扫码烟包数表头鼠标悬浮展示内容
    scancodesHeader(h, { column, $index },index) {
      return this.renderHeaderHandler(h, { column, $index }, index, '从当天零点开始到当前，产生的扫码总烟包数的实时数值，去除当天重复扫码后的扫码数');
    },
    // el-table表格中抽奖次数表头鼠标悬浮展示内容
    drawtimesHeader(h, { column, $index },index) {
      return this.renderHeaderHandler(h, { column, $index }, index, '从当天零点开始到当前，参与扫码抽奖活动的总次数');
    },
    /**
     * 加载底部表格省份数据：[{"provCode":"130000","province":"河北省","saleType":"省内销区","scanCodes":"85626","scanUsers":"55536","scantimes":"102505","type":"1"}]
     */
    getProvDatas(prop, sortBy) {
      if(!prop) prop = "scantimes";
      let params = {key: prop};
      if(sortBy) {
        params.sortBy = sortBy;
      }
      this.$request.post('/record/data/getProvinceKPI', params, true, (res)=>{
        let datas = res || [];
        let arrows = {};
        for(let i=0;i<datas.length;i++) {
          arrows[datas[i].province] = false; // 默认都为向下的箭头
        }
        if(this.sortTable) {
          this.sortArrowTop = arrows;
        } else {
          this.arrowTop = arrows;
        }
        this.dealTableDatas(datas);
      });
    },
    /**
     * 加载城市数据：[{"city":"石家庄市","saleType":"省内销区","scanCodes":"88155","scanUsers":"52225","scantimes":"105148"}]
     * 获取数据后需要简单加工，在使用处理表格数据的方法
     */ 
    getCityDatas(province, prop, sortBy) {
      if(!province) {
        console.log("查询城市数据时，省份名称不能为空！");
        return false;
      }
      let params = {provName:province};
      if(!prop) prop = "scantimes";
      params.key = prop;
      if(sortBy) {
        params.sortBy = sortBy;
      }
      this.$request.post('/record/data/getCityKPI', params, true, (res)=>{
        let datas = res || [];
        if(datas.length>0) {
          let newTable = [];
          let datasource = this.tableDatas;
          if(this.sortTable) {
            datasource = this.tableSortDatas;
          }
          for(let i=0;i<datasource.length;i++) {
            if("总计"!=datasource[i].overview) {// 总计数据不处理
              newTable.push(datasource[i]);
            }
            let provinceName = datasource[i].province;
            if(provinceName==province) { //
              for(let j=0;j<datas.length;j++) {
                datas[j].overview = datasource[i].saleType;
                datas[j].provCode = datasource[i].provCode;// 设置城市对应的省份编码。方便删除数据
                newTable.push(datas[j]);
              }
            }
          }
          this.dealTableDatas(newTable);
        }
      });
    },
    // 表格中合起省份对应的城市数据
    removeCityDatas(provCode) {
      let newTable = [];
      let datasource = this.tableDatas;
      if(this.sortTable) {
        datasource = this.tableSortDatas;
      }
      for(let i=0;i<datasource.length;i++) {
        let temp = datasource[i];
        if((provCode!=temp.provCode||temp.province)&&"总计"!=temp.overview) {
          newTable.push(temp);
        }
      }
      this.dealTableDatas(newTable);
    },
    /**
     * 处理表格数据：
     * @params datas
     * 1. 只含有省份数据
     * 2. 含有省份+城市数据
     */
    dealTableDatas(_datas) {
      let newDatas = [];
      if(_datas.length>0) {
        let lastSale = ""; // 如果当前销区，与之前的销区不同，则进行添加总计汇总
        this.spanTable = [];
        let totalData = {"overview":"总计","provOrCity":"","provCode":"","province":"","city":"","saleType":"","scanCodes":"","scanUsers":"","scantimes":"","type":""};
        for(let i=0;i<_datas.length;i++) {
          let data = _datas[i];
          let saleType = data.saleType; // 获取当前数据的销区名称
          data.overview = saleType; // 统计概率字段设置为销区名称
          data.provOrCity = data.province?data.province:data.city; // 省市列内容处理
          let tmpIdx = newDatas.length;// 此行内容需要放在下行代码的上面
          newDatas.push(data);
          
          if(!this.sortTable) {
            let sameSales = 0;
            for(let j=i+1;j<_datas.length;j++) { // 查询相同销区省份数据
              let sameSaleData = _datas[j];
              let sameOverview = sameSaleData.overview;
              if(!sameOverview) {
                sameOverview = sameSaleData.saleType;
                sameSaleData.overview = sameOverview;
              }

              if(saleType==sameOverview) {
                if(sameSaleData.province) { // 说明当前数据为省份数据
                  this.countAdd(totalData, 'scanCodes', sameSaleData);
                  this.countAdd(totalData, 'scanUsers', sameSaleData);
                  this.countAdd(totalData, 'scantimes', sameSaleData);
                }
                sameSales++;
                sameSaleData.provOrCity = sameSaleData.province?sameSaleData.province:sameSaleData.city;
                newDatas.push(sameSaleData);
                _datas.splice(j, 1); // 当前位置删除一个元素
                j--;
              }
            }
            this.countAdd(totalData, 'scanCodes', data);
            this.countAdd(totalData, 'scanUsers', data);
            this.countAdd(totalData, 'scantimes', data);
            if(sameSales>0) { // 合并单元格使用
              this.spanTable.push({min:tmpIdx, max:tmpIdx+sameSales});
            }
            if(lastSale!=saleType) {
              if(!this.sortTable) { // 排序表格中，没有总计行的展示
                newDatas.push(totalData);
              }
              totalData = {"overview":"总计","provOrCity":"","provCode":"","province":"","city":"","saleType":"","scanCodes":"","scanUsers":"","scantimes":"","type":""};
              lastSale = saleType;
            }
          }
        }
        if(this.sortTable) {// 排序列表
          if("ascending"==this.sortInfo.order) {// 升序
            let compProp = this.sortInfo.prop;
            newDatas.sort(function(data1, data2) {
              return data1[compProp] - data2[compProp];
            });
          }
          this.tableSortDatas = newDatas;
        } else {
          this.tableDatas = newDatas;
        }
      }
    },
    // 表格中总计内容的累计计算
    countAdd(totalData, attr, data) {
      try {
        totalData[attr] = parseInt(totalData[attr]?totalData[attr]:0) + parseInt(data[attr]?data[attr]:0);
      } catch (error) {
        console.log(error);
      }
    },
    // 销区指标表格 - 合并单元格的处理
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      if(this.spanTable.length>0) {
        if (columnIndex===0) {
          for(let i=0;i<this.spanTable.length;i++) {
            let spanConf = this.spanTable[i];
            let min = spanConf.min;
            let max = spanConf.max;
            if(rowIndex==min) {
              return {rowspan:(max-min+1), colspan:1};
            } else if (rowIndex>min&&rowIndex<=max) {
              return {rowspan:1,colspan: 0};
            }
          }
        }
      }
    },
    // 省份箭头的点击事件
    arrowCellClick(row, column, cell, event) {
      let province = row.province;
      if(province&&column.label=='省市') {
        let arrow = this.arrowTop[province];
        this.arrowTop[province] = !this.arrowTop[province];
        if(!arrow) {// 箭头向下，点击变更为向上，进行加载城市数据
          this.getCityDatas(province);
        } else {// 箭头向上，点击变更为向下，删除当前省份下的城市数据
          this.removeCityDatas(row.provCode);
        }
      }
    },
    // 根据table表格排序值获取接口查询使用值
    getSortBy(order) {
      let sortBy = "ASC";
      if("descending"==order) {
        sortBy = "DESC";
      }
      return sortBy;
    },
    /**
     * 表格点击列上排序时的监听
     * column = {} 点击排序的列信息
     * prop = 表格列上引用
     * order = 排序类型：ascending、descending
     */
    sortDatas({column, prop, order}) {
      this.sortTable = true;
      this.$refs.unsortTable.clearSort();
      this.sortInfo = {prop:prop, order:order};
      this.$refs.areaSortTable.sort(prop, order);
      //let sortBy = this.getSortBy(order);
      //this.getProvDatas(prop, sortBy);
    },
    // 排序表格中省份箭头的点击事件
    sortArrowCellClick(row, column, cell, event) {
      let province = row.province;
      if(province&&column.label=='省市') {
        let arrow = this.sortArrowTop[province];
        this.sortArrowTop[province] = !this.sortArrowTop[province];
        if(!arrow) {// 箭头向下，点击变更为向上，进行加载城市数据
          this.getCityDatas(province);
        } else {// 箭头向上，点击变更为向下，删除当前省份下的城市数据
          this.removeCityDatas(row.provCode);
        }
      }
    },
    /**
     * 排序表格中点击列上排序时的监听
     * column = {} 点击排序的列信息
     * prop = 表格列上引用
     * order = 排序类型：ascending、descending
     */
    sortDatasChange({column, prop, order}) {
      this.sortInfo = {prop:prop, order:order};
      let sortBy = this.getSortBy(order);
      this.getProvDatas(prop, sortBy);
    },
    // ================================================ 规格指标表格 ==========================================
    prodSpan({row, column, rowIndex, columnIndex}) {
      if(columnIndex==0) {
        if(rowIndex==0) {
          return {rowspan:this.prodTableDatas.length, colspan:1};
        } else {
          return {rowspan:1,colspan: 0};
        }
      }
    },
    getProdDatas(prop, sortBy) {
      if(!prop) prop = "scantimes";
      let params = {key: prop};
      if(sortBy) {
        params.sortBy = sortBy;
      }
      this.$request.post('/record/data/getSpecificationKPI', params, true, (res)=>{
        let datas = res || [];
        this.dealProdDatas(datas);
      });
    },
    dealProdDatas(_datas) {
      let newDatas = [];
      if(_datas.length>0) {
        let lastBrand = ""; // 比对品牌分组
        for(let i=0;i<_datas.length;i++) {
          let data = _datas[i];
          let brand = data.brand;
          newDatas.push(data);
          
          if(!this.prodSort) {
            for(let j=i+1;j<_datas.length;j++) { // 查询相同销区省份数据
              let afterData = _datas[j];
              let afterBrand = afterData.brand;
              if(brand==afterBrand) {
                newDatas.push(afterData);
                _datas.splice(j, 1); // 当前位置删除一个元素
                j--;
              }
            }
            if(lastBrand!=brand) {
              lastBrand = brand;
            }
          }
        }
        if(this.prodSort) {// 排序列表
          if("ascending"==this.prodSortInfo.order) {// 升序
            let compProp = this.prodSortInfo.prop;
            newDatas.sort(function(data1, data2) {
              return data1[compProp] - data2[compProp];
            });
          }
        }
        this.prodTableDatas = newDatas;
      }
    },
    prodSortDatas({column, prop, order}) {
      this.prodSort = true;
      this.$refs.prodUnsortTable.clearSort();
      this.$refs.prodSortTable.sort(prop, order);
      this.prodSortInfo = {prop:prop, order:order};
      //let sortBy = this.getSortBy(order);
      //this.getProdDatas(prop, sortBy);
    },
    prodSortDatasChange({column, prop, order}) {
      this.prodSortInfo = {prop:prop, order:order};
      let sortBy = this.getSortBy(order);
      this.getProdDatas(prop, sortBy);
    }
  }
}
</script>
<style scoped>
  .data-home {
    font-weight: 300;
  }
  .space {position:relative;width:100%;height:20px;}
  .el-table .caret-wrapper {
    top: -15px;
  }
  .mytip {
    font-weight: 300;
    max-width: 200px;
    text-align: center;
  }
  em {
    font-style: normal;
  }
  .ui-panel-title {
    position: relative;
    padding-left: 30px;
    font-size: 18px;
    color: #8a8a8a;
    margin-bottom: 2px;
  }
  .ui-panel-title .hot, .ui-panel-title .total {
    position: absolute;
    left: 7px;
    top: 5px;
    height: 14px;
  }
  .ui-panel-title .hot {
    width: 16px;
    background: url('../../../assets/img/hot.png') no-repeat;
    background-size: 100% 100%;
  }
  .ui-panel-title .total {
    width: 14px;
    background: url('../../../assets/img/total.png') no-repeat;
    background-size: 100% 100%;
  }
  .panel-body {
    font-size: 14px;
    padding: 0px;
  }
  .panel-body p {
    margin: 0;
  }
  .panel-body .ui-map-content-box {
    position: relative;
    margin-top: 5px;
  }
  .ui-scan-city {
    font-size: 14px;
    color: #515151;
    margin-bottom: 2px;
  }
  .ui-scan-hot-city {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #707478;
    margin-bottom: 2px;
    cursor: pointer;
  }
  .china-map {
    width: 100%;
    height: 400px;
  }
  .ui-real-time {
    position: absolute;
    padding: 5px 10px;
    color: #44c2ed;
    bottom: -5px;
    right: 0px;
    height: 100px;
  }
  .ui-real-time>p {
    font-size: 16px;
    color: #eaf130;
  }
  .ui-real-time-data {
    position: absolute;
    border: 1px solid #eaf130;
    padding: 3px 5px;
    min-width: 463px;
    height: 65px;
    right: 5px;
  }
  .ui-real-time-data li {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #eaf130;
  }
  .ui-scan-box {
    position: absolute;
    width: 280px;
    height: 400px;
    top: -5px;
    right: 0;
    padding: 20px 0;
  }
  .ui-scan-detail {
    padding: 15px 0;
    font-size: 14px;
  }
  .ui-scan-detail p {
    color: #fff;
    cursor: pointer;
  }
  .ui-scan-detail span {
    font-size: 24px;
    color: #eaf130;
  }
  .ui-scan-detail em {
    color: #44c2ed;
  }
</style>

