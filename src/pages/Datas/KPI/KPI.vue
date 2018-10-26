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
              <li v-for="item in rollDatas" :key="item">{{item}}</li>
            </ul>
          </div>
          <div class="ui-scan-box">
            <div class="ui-scan-times ui-scan-detail">
              <el-tooltip class="item" popper-class="mytip" content="从当天零点开始到当前时间，总共产生的扫码次数的实时数值，包含重复扫码的情况" placement="top">
                <p>
                  当日扫码总次数：<span id="scan_day">{{timeScanData.scanTimes_of_day}}</span><em>&nbsp;次</em>
                </p>
              </el-tooltip>
              <el-tooltip class="item" popper-class="mytip" content="从系统有数据记录开始到前一天，总共产生的扫码次数的实时数值，包含重复扫码的情况" placement="top">
                <p>
                  历史扫码总次数：<span id="scan_day_rate">{{hisScanData.totalCode}}</span><em>&nbsp;次</em>
                </p>
              </el-tooltip>
            </div>
            <div class="ui-scan-total ui-scan-detail">
              <el-tooltip class="item" popper-class="mytip" content="从当天零点开始到当前时间，参与扫码活动的总用户数的实时数值，对当天的扫码用户的id进行了去重处理" placement="top">
                <p>
                  当日扫码总人数：<span id="scan_user">{{timeScanData.scanUsers_of_day}}</span><em>&nbsp;人</em>
                </p>
              </el-tooltip>
              <el-tooltip class="item" popper-class="mytip" content="从系统有数据记录开始到前一天，参与扫码活动的总用户数的实时数值，对历史所有扫码用户的id进行了去重处理" placement="top">
                <p>
                  历史扫码总人数：<span id="scan_user_rate">{{hisScanData.totalPv}}</span><em>&nbsp;人</em>
                </p>
              </el-tooltip>
            </div>
            <div class="ui-scan-rate ui-scan-detail">
              <el-tooltip class="item" popper-class="mytip" content="从当天零点开始到当前时间，总共产生的扫码总烟包数的实时数值，去除当天重复扫码后的扫码数" placement="top">
                <p>
                  当日扫码总烟包数：<span id="scan_code">{{timeScanData.scanCodes_of_day}}</span><em>&nbsp;个</em>
                </p>
              </el-tooltip>
              <el-tooltip class="item" popper-class="mytip" content="从系统有数据记录开始到前一天，总共产生的扫码总烟包数的实时数值，去除历史重复扫码后的扫码数" placement="top">
                <p>
                  历史扫码总烟包数：<span id="scan_code_rate">{{hisScanData.totalUv}}</span><em>&nbsp;个</em>
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销区指标" name="first">销区指标</el-tab-pane>
        <el-tab-pane label="规格指标" name="second">规格指标</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import ChinaMapEcharts from './ChinaMapEcharts'
export default {
  data() {
    return {
      loadDuration: 10000, // n秒加载一次页面地图及扫码数据
      scrollLoadDuration: 9000, // n秒加载一次实时滚动列表数据
      tableLoadDuration: 60*60*1000, // n秒加载一次表格数据
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
      rollDatas: [] // 实时滚动数据
    }
  },
  created() {
    this.loadJsonDatas();

    // 下面开始为循环加载
    this.getPageTopDatas();
    this.getRollData();
  },
  methods: {
    // 加载json数据
    loadJsonDatas() {
      // 动态加载百度地图配置数据
      this.$request.get('/record/statics/home/kpi/china.json', {}, (res)=>{
        this.chinaJson = res || {};
        this.chinaJsonLoaded = true;
        this.initMap();
        //console.log("this.chinaJson");
        //console.log(this.chinaJson);
        //console.log( JSON.stringify(this.chinaJson));
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
        //console.log("this.latlngJson");
        //console.log(this.latlngJson);
      });
      this.$request.get('/record/statics/home/kpi/salesTblConf.json', {}, (res)=>{
        this.salesTblConf = res || {};
        //console.log("this.salesTblConf");
        //console.log(this.salesTblConf);
      });
      this.$request.get('/record/statics/home/kpi/formatTblConf.json', {}, (res)=>{
        this.formatTblConf = res || {};
        //console.log("this.formatTblConf");
        //console.log(this.formatTblConf);
      });
      this.$request.get('/record/statics/home/kpi/sfTblConf.json', {}, (res)=>{
        this.sfTblConf = res || {};
        //console.log("this.sfTblConf");
        //console.log(this.sfTblConf);
      });
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
        this.mapData = [
          {"city":"石家庄市","cityCode":"130100","info":"石家庄市扫码量:45103","latitude":"38.042228","longitude":"114.514793","scantimes":"45103","type":"1"},
          {"city":"邢台市","cityCode":"130500","info":"邢台市扫码量:9180","latitude":"37.070834","longitude":"114.504677","scantimes":"9180","type":"1"},
          {"city":"邯郸市","cityCode":"130400","info":"邯郸市扫码量:1954","latitude":"36.625594","longitude":"114.538959","scantimes":"1954","type":"1"},
          {"city":"张家口市","cityCode":"130700","info":"张家口市扫码量:1566","latitude":"40.768493","longitude":"114.886252","scantimes":"1566","type":"1"},
          {"city":"唐山市","cityCode":"130200","info":"唐山市扫码量:1398","latitude":"39.630867","longitude":"118.180193","scantimes":"1398","type":"1"},
          {"city":"保定市","cityCode":"130600","info":"保定市扫码量:1397","latitude":"38.874434","longitude":"115.464589","scantimes":"1397","type":"1"},
          {"city":"","cityCode":"900000","info":"扫码量:1221","latitude":"undefined","longitude":"undefined","scantimes":"1221","type":"1"},
          {"city":"沧州市","cityCode":"130900","info":"沧州市扫码量:1044","latitude":"38.304477","longitude":"116.838834","scantimes":"1044","type":"1"},
          {"city":"衡水市","cityCode":"131100","info":"衡水市扫码量:943","latitude":"37.73892","longitude":"115.670177","scantimes":"943","type":"1"},
          {"city":"秦皇岛市","cityCode":"130300","info":"秦皇岛市扫码量:680","latitude":"39.888701","longitude":"119.518197","scantimes":"680","type":"1"},
          {"city":"北京市","cityCode":"110100","info":"北京市扫码量:658","latitude":"39.904211","longitude":"116.407394","scantimes":"658","type":"1"},
          {"city":"承德市","cityCode":"130800","info":"承德市扫码量:632","latitude":"40.952942","longitude":"117.962749","scantimes":"632","type":"1"},
          {"city":"廊坊市","cityCode":"131000","info":"廊坊市扫码量:450","latitude":"39.538047","longitude":"116.683752","scantimes":"450","type":"1"},
          {"city":"深圳市","cityCode":"440300","info":"深圳市扫码量:388","latitude":"22.67801","longitude":"113.9421","scantimes":"388","type":"1"},
          {"city":"东莞市","cityCode":"441900","info":"东莞市扫码量:311","latitude":"23.020673","longitude":"113.751799","scantimes":"311","type":"1"},
          {"city":"广州市","cityCode":"440100","info":"广州市扫码量:270","latitude":"23.12911","longitude":"113.264385","scantimes":"270","type":"1"},
          {"city":"天津市","cityCode":"120100","info":"天津市扫码量:223","latitude":"39.084158","longitude":"117.200983","scantimes":"223","type":"1"},
          {"city":"重庆市","cityCode":"500100","info":"重庆市扫码量:200","latitude":"29.562849","longitude":"106.551643","scantimes":"200","type":"1"},
          {"city":"汕头市","cityCode":"440500","info":"汕头市扫码量:189","latitude":"23.354091","longitude":"116.681972","scantimes":"189","type":"1"},
          {"city":"泉州市","cityCode":"350500","info":"泉州市扫码量:182","latitude":"24.874132","longitude":"118.675676","scantimes":"182","type":"1"},
          {"city":"惠州市","cityCode":"441300","info":"惠州市扫码量:167","latitude":"23.112381","longitude":"114.415612","scantimes":"167","type":"1"},
          {"city":"呼和浩特市","cityCode":"150100","info":"呼和浩特市扫码量:155","latitude":"40.842356","longitude":"111.749995","scantimes":"155","type":"1"},
          {"city":"德州市","cityCode":"371400","info":"德州市扫码量:136","latitude":"37.436657","longitude":"116.359381","scantimes":"136","type":"1"},
          {"city":"汕尾市","cityCode":"441500","info":"汕尾市扫码量:130","latitude":"22.96194","longitude":"115.3094","scantimes":"130","type":"1"},
          {"city":"佛山市","cityCode":"440600","info":"佛山市扫码量:125","latitude":"23.021478","longitude":"113.121435","scantimes":"125","type":"1"},
          {"city":"揭阳市","cityCode":"445200","info":"揭阳市扫码量:117","latitude":"23.549701","longitude":"116.372708","scantimes":"117","type":"1"},
          {"city":"大同市","cityCode":"140200","info":"大同市扫码量:112","latitude":"40.076763","longitude":"113.300129","scantimes":"112","type":"1"},
          {"city":"中山市","cityCode":"442000","info":"中山市扫码量:111","latitude":"22.589874","longitude":"113.2614","scantimes":"111","type":"1"},
          {"city":"巴彦淖尔市","cityCode":"150800","info":"巴彦淖尔市扫码量:104","latitude":"40.743213","longitude":"107.387657","scantimes":"104","type":"1"},
          {"city":"晋中市","cityCode":"140700","info":"晋中市扫码量:98","latitude":"37.038230895996094","longitude":"111.9148941040039","scantimes":"98","type":"1"},
          {"city":"阳泉市","cityCode":"140300","info":"阳泉市扫码量:96","latitude":"37.857685","longitude":"113.45541","scantimes":"96","type":"2"},
          {"city":"湛江市","cityCode":"440800","info":"湛江市扫码量:90","latitude":"21.270145","longitude":"110.356639","scantimes":"90","type":"2"},
          {"city":"忻州市","cityCode":"140900","info":"忻州市扫码量:90","latitude":"39.314293","longitude":"113.7029","scantimes":"90","type":"2"},
          {"city":"温州市","cityCode":"330300","info":"温州市扫码量:89","latitude":"27.912863","longitude":"120.818","scantimes":"89","type":"2"},
          {"city":"鄂尔多斯市","cityCode":"150600","info":"鄂尔多斯市扫码量:79","latitude":"39.608266","longitude":"109.781327","scantimes":"79","type":"2"},
          {"city":"梅州市","cityCode":"441400","info":"梅州市扫码量:78","latitude":"24.288578","longitude":"116.122523","scantimes":"78","type":"2"},
          {"city":"厦门市","cityCode":"350200","info":"厦门市扫码量:74","latitude":"24.479664","longitude":"118.089204","scantimes":"74","type":"2"},
          {"city":"太原市","cityCode":"140100","info":"太原市扫码量:73","latitude":"37.851673","longitude":"112.4926","scantimes":"73","type":"2"},
          {"city":"运城市","cityCode":"140800","info":"运城市扫码量:71","latitude":"35.0708","longitude":"110.63454","scantimes":"71","type":"2"},
          {"city":"漳州市","cityCode":"350600","info":"漳州市扫码量:67","latitude":"24.513025","longitude":"117.647093","scantimes":"67","type":"2"},
          {"city":"葫芦岛市","cityCode":"211400","info":"葫芦岛市扫码量:60","latitude":"40.08268","longitude":"119.92051","scantimes":"60","type":"2"},
          {"city":"临沂市","cityCode":"371300","info":"临沂市扫码量:60","latitude":"35.104673","longitude":"118.356414","scantimes":"60","type":"2"},
          {"city":"锡林郭勒盟","cityCode":"152500","info":"锡林郭勒盟扫码量:59","latitude":"43.933454","longitude":"116.048222","scantimes":"59","type":"2"},
          {"city":"江门市","cityCode":"440700","info":"江门市扫码量:59","latitude":"22.57899","longitude":"113.081542","scantimes":"59","type":"2"},
          {"city":"宁波市","cityCode":"330200","info":"宁波市扫码量:59","latitude":"29.859971","longitude":"121.622485","scantimes":"59","type":"2"},
          {"city":"潮州市","cityCode":"445100","info":"潮州市扫码量:56","latitude":"23.657262","longitude":"116.622444","scantimes":"56","type":"2"},
          {"city":"大连市","cityCode":"210200","info":"大连市扫码量:54","latitude":"38.914086","longitude":"121.614848","scantimes":"54","type":"2"},
          {"city":"包头市","cityCode":"150200","info":"包头市扫码量:54","latitude":"40.621157","longitude":"109.953504","scantimes":"54","type":"2"},
          {"city":"晋城市","cityCode":"140500","info":"晋城市扫码量:50","latitude":"35.490684","longitude":"112.851486","scantimes":"50","type":"2"},
          {"city":"临汾市","cityCode":"141000","info":"临汾市扫码量:50","latitude":"36.088005","longitude":"111.518975","scantimes":"50","type":"2"},
          {"city":"朔州市","cityCode":"140600","info":"朔州市扫码量:47","latitude":"39.331855","longitude":"112.432991","scantimes":"47","type":"2"},
          {"city":"福州市","cityCode":"350100","info":"福州市扫码量:44","latitude":"26.075302","longitude":"119.306239","scantimes":"44","type":"2"},
          {"city":"武汉市","cityCode":"420100","info":"武汉市扫码量:44","latitude":"30.593175","longitude":"114.305469","scantimes":"44","type":"2"},
          {"city":"郑州市","cityCode":"410100","info":"郑州市扫码量:40","latitude":"34.746611","longitude":"113.625328","scantimes":"40","type":"2"},
          {"city":"乐山市","cityCode":"511100","info":"乐山市扫码量:40","latitude":"29.552115","longitude":"103.765678","scantimes":"40","type":"2"},
          {"city":"吕梁市","cityCode":"141100","info":"吕梁市扫码量:38","latitude":"37.2734","longitude":"111.787025","scantimes":"38","type":"2"},
          {"city":"渭南市","cityCode":"610500","info":"渭南市扫码量:37","latitude":"34.52044","longitude":"109.471094","scantimes":"37","type":"2"},
          {"city":"赤峰市","cityCode":"150400","info":"赤峰市扫码量:36","latitude":"42.257843","longitude":"118.88694","scantimes":"36","type":"2"},
          {"city":"乌兰察布市","cityCode":"150900","info":"乌兰察布市扫码量:34","latitude":"40.994785","longitude":"113.132584","scantimes":"34","type":"2"},
          {"city":"茂名市","cityCode":"440900","info":"茂名市扫码量:31","latitude":"21.662991","longitude":"110.925439","scantimes":"31","type":"2"},
          {"city":"徐州市","cityCode":"320300","info":"徐州市扫码量:31","latitude":"34.205768","longitude":"117.284124","scantimes":"31","type":"3"},
          {"city":"兴安盟","cityCode":"152200","info":"兴安盟扫码量:31","latitude":"46.082462","longitude":"122.037657","scantimes":"31","type":"3"},
          {"city":"通辽市","cityCode":"150500","info":"通辽市扫码量:30","latitude":"43.652889","longitude":"122.243444","scantimes":"30","type":"3"},
          {"city":"昆明市","cityCode":"530100","info":"昆明市扫码量:28","latitude":"24.880095","longitude":"102.832891","scantimes":"28","type":"3"},
          {"city":"成都市","cityCode":"510100","info":"成都市扫码量:28","latitude":"30.572893","longitude":"104.066794","scantimes":"28","type":"3"},
          {"city":"榆林市","cityCode":"610800","info":"榆林市扫码量:27","latitude":"38.29284","longitude":"109.734505","scantimes":"27","type":"3"},
          {"city":"宝鸡市","cityCode":"610300","info":"宝鸡市扫码量:27","latitude":"34.363184","longitude":"107.237743","scantimes":"27","type":"3"},
          {"city":"呼伦贝尔市","cityCode":"150700","info":"呼伦贝尔市扫码量:27","latitude":"49.211576","longitude":"119.765558","scantimes":"27","type":"3"},
          {"city":"自贡市","cityCode":"510300","info":"自贡市扫码量:26","latitude":"29.33903","longitude":"104.778442","scantimes":"26","type":"3"},
          {"city":"济南市","cityCode":"370100","info":"济南市扫码量:26","latitude":"36.6512","longitude":"117.120098","scantimes":"26","type":"3"},
          {"city":"上海市","cityCode":"310100","info":"上海市扫码量:26","latitude":"31.32219886779785","longitude":"121.6484146118164","scantimes":"26","type":"3"},
          {"city":"达州市","cityCode":"511700","info":"达州市扫码量:24","latitude":"31.209121","longitude":"107.467758","scantimes":"24","type":"3"},
          {"city":"珠海市","cityCode":"440400","info":"珠海市扫码量:24","latitude":"22.270978","longitude":"113.576677","scantimes":"24","type":"3"},
          {"city":"河源市","cityCode":"441600","info":"河源市扫码量:24","latitude":"23.415943145751953","longitude":"115.19393157958984","scantimes":"24","type":"3"},
          {"city":"永州市","cityCode":"431100","info":"永州市扫码量:24","latitude":"26.419641","longitude":"111.613418","scantimes":"24","type":"3"},
          {"city":"三明市","cityCode":"350400","info":"三明市扫码量:24","latitude":"26.263406","longitude":"117.638678","scantimes":"24","type":"3"},
          {"city":"韶关市","cityCode":"440200","info":"韶关市扫码量:23","latitude":"24.97372817993164","longitude":"113.13761901855469","scantimes":"23","type":"3"},
          {"city":"遂宁市","cityCode":"510900","info":"遂宁市扫码量:23","latitude":"30.53292","longitude":"105.592803","scantimes":"23","type":"3"},
          {"city":"哈尔滨市","cityCode":"230100","info":"哈尔滨市扫码量:23","latitude":"45.803775","longitude":"126.534967","scantimes":"23","type":"3"},
          {"city":"西安市","cityCode":"610100","info":"西安市扫码量:22","latitude":"34.341574","longitude":"108.93977","scantimes":"22","type":"3"},
          {"city":"衡阳市","cityCode":"430400","info":"衡阳市扫码量:21","latitude":"26.893368","longitude":"112.572018","scantimes":"21","type":"3"},
          {"city":"肇庆市","cityCode":"441200","info":"肇庆市扫码量:21","latitude":"23.13839","longitude":"112.5634","scantimes":"21","type":"3"},
          {"city":"清远市","cityCode":"441800","info":"清远市扫码量:21","latitude":"23.681774","longitude":"113.056042","scantimes":"21","type":"3"},
          {"city":"常州市","cityCode":"320400","info":"常州市扫码量:20","latitude":"31.70629","longitude":"119.8506","scantimes":"20","type":"3"},
          {"city":"合肥市","cityCode":"340100","info":"合肥市扫码量:20","latitude":"31.820591","longitude":"117.227219","scantimes":"20","type":"3"},
          {"city":"沈阳市","cityCode":"210100","info":"沈阳市扫码量:19","latitude":"41.677284","longitude":"123.465035","scantimes":"19","type":"3"},
          {"city":"昌吉回族自治州","cityCode":"652300","info":"昌吉回族自治州扫码量:19","latitude":"44.011182","longitude":"87.308224","scantimes":"19","type":"3"},
          {"city":"北海市","cityCode":"450500","info":"北海市扫码量:19","latitude":"21.481291","longitude":"109.120161","scantimes":"19","type":"3"},
          {"city":"苏州市","cityCode":"320500","info":"苏州市扫码量:18","latitude":"31.267309188842773","longitude":"120.51351165771484","scantimes":"18","type":"3"},
          {"city":"桂林市","cityCode":"450300","info":"桂林市扫码量:18","latitude":"25.234479","longitude":"110.179953","scantimes":"18","type":"3"},
          {"city":"泰州市","cityCode":"321200","info":"泰州市扫码量:17","latitude":"32.455536","longitude":"119.922933","scantimes":"17","type":"4"},
          {"city":"驻马店市","cityCode":"411700","info":"驻马店市扫码量:16","latitude":"32.861751556396484","longitude":"114.81051635742188","scantimes":"16","type":"4"},
          {"city":"洛阳市","cityCode":"410300","info":"洛阳市扫码量:16","latitude":"34.67952","longitude":"112.4423","scantimes":"16","type":"4"},
          {"city":"平顶山市","cityCode":"410400","info":"平顶山市扫码量:16","latitude":"33.766169","longitude":"113.192661","scantimes":"16","type":"4"},
          {"city":"枣庄市","cityCode":"370400","info":"枣庄市扫码量:15","latitude":"34.810488","longitude":"117.323725","scantimes":"15","type":"4"},
          {"city":"阳江市","cityCode":"441700","info":"阳江市扫码量:14","latitude":"21.857887","longitude":"111.982589","scantimes":"14","type":"4"},
          {"city":"海口市","cityCode":"460100","info":"海口市扫码量:14","latitude":"20.032255172729492","longitude":"110.33992004394531","scantimes":"14","type":"4"},
          {"city":"台州市","cityCode":"331000","info":"台州市扫码量:14","latitude":"28.65638","longitude":"121.42076","scantimes":"14","type":"4"},
          {"city":"龙岩市","cityCode":"350800","info":"龙岩市扫码量:13","latitude":"25.075119","longitude":"117.017295","scantimes":"13","type":"4"},
          {"city":"青岛市","cityCode":"370200","info":"青岛市扫码量:13","latitude":"36.067131","longitude":"120.382621","scantimes":"13","type":"4"},
          {"city":"许昌市","cityCode":"411000","info":"许昌市扫码量:13","latitude":"34.035771","longitude":"113.852454","scantimes":"13","type":"4"},
          {"city":"南充市","cityCode":"511300","info":"南充市扫码量:13","latitude":"30.837793","longitude":"106.110698","scantimes":"13","type":"4"},
          {"city":"鞍山市","cityCode":"210300","info":"鞍山市扫码量:12","latitude":"41.108647","longitude":"122.994329","scantimes":"12","type":"4"},
          {"city":"聊城市","cityCode":"371500","info":"聊城市扫码量:12","latitude":"36.456684","longitude":"115.985389","scantimes":"12","type":"4"},
          {"city":"盐城市","cityCode":"320900","info":"盐城市扫码量:12","latitude":"33.347708","longitude":"120.163107","scantimes":"12","type":"4"},
          {"city":"烟台市","cityCode":"370600","info":"烟台市扫码量:12","latitude":"37.14083480834961","longitude":"119.88929748535156","scantimes":"12","type":"4"},
          {"city":"湘潭市","cityCode":"430300","info":"湘潭市扫码量:12","latitude":"27.712578","longitude":"112.81877","scantimes":"12","type":"4"},{"city":"济宁市","cityCode":"370800","info":"济宁市扫码量:12","latitude":"35.414982","longitude":"116.587282","scantimes":"12","type":"4"},{"city":"朝阳市","cityCode":"211300","info":"朝阳市扫码量:12","latitude":"41.573762","longitude":"120.450879","scantimes":"12","type":"4"},{"city":"南通市","cityCode":"320600","info":"南通市扫码量:12","latitude":"31.981143","longitude":"120.894676","scantimes":"12","type":"4"},{"city":"玉林市","cityCode":"450900","info":"玉林市扫码量:11","latitude":"22.654032","longitude":"110.18122","scantimes":"11","type":"4"},{"city":"濮阳市","cityCode":"410900","info":"濮阳市扫码量:11","latitude":"35.761829","longitude":"115.029216","scantimes":"11","type":"4"},{"city":"潍坊市","cityCode":"370700","info":"潍坊市扫码量:11","latitude":"36.706962","longitude":"119.161748","scantimes":"11","type":"4"},{"city":"杭州市","cityCode":"330100","info":"杭州市扫码量:11","latitude":"30.24692","longitude":"120.209789","scantimes":"11","type":"4"},{"city":"安阳市","cityCode":"410500","info":"安阳市扫码量:11","latitude":"36.097577","longitude":"114.392392","scantimes":"11","type":"4"},{"city":"南阳市","cityCode":"411300","info":"南阳市扫码量:11","latitude":"32.68861389160156","longitude":"112.1111831665039","scantimes":"11","type":"4"},{"city":"齐齐哈尔市","cityCode":"230200","info":"齐齐哈尔市扫码量:10","latitude":"47.354348","longitude":"123.918186","scantimes":"10","type":"4"},{"city":"遵义市","cityCode":"520300","info":"遵义市扫码量:10","latitude":"28.827667236328125","longitude":"107.57479095458984","scantimes":"10","type":"4"},{"city":"通化市","cityCode":"220500","info":"通化市扫码量:10","latitude":"42.25344467163086","longitude":"125.70533752441406","scantimes":"10","type":"4"},{"city":"本溪市","cityCode":"210500","info":"本溪市扫码量:10","latitude":"41.28892517089844","longitude":"123.78628540039062","scantimes":"10","type":"4"},{"city":"新乡市","cityCode":"410700","info":"新乡市扫码量:10","latitude":"35.19745","longitude":"113.79425","scantimes":"10","type":"4"},{"city":"延边朝鲜族自治州","cityCode":"222400","info":"延边朝鲜族自治州扫码量:10","latitude":"42.909408","longitude":"129.471868","scantimes":"10","type":"4"},{"city":"商丘市","cityCode":"411400","info":"商丘市扫码量:10","latitude":"34.414961","longitude":"115.656339","scantimes":"10","type":"4"},{"city":"周口市","cityCode":"411600","info":"周口市扫码量:10","latitude":"33.626149","longitude":"114.69695","scantimes":"10","type":"4"},{"city":"内江市","cityCode":"511000","info":"内江市扫码量:10","latitude":"29.580228","longitude":"105.058432","scantimes":"10","type":"4"},{"city":"信阳市","cityCode":"411500","info":"信阳市扫码量:10","latitude":"31.934208","longitude":"115.86901","scantimes":"10","type":"4"},{"city":"乌鲁木齐市","cityCode":"650100","info":"乌鲁木齐市扫码量:10","latitude":"43.825592","longitude":"87.616848","scantimes":"10","type":"4"},{"city":"长治市","cityCode":"140400","info":"长治市扫码量:9","latitude":"36.195409","longitude":"113.116404","scantimes":"9","type":"4"},{"city":"长春市","cityCode":"220100","info":"长春市扫码量:9","latitude":"43.921783447265625","longitude":"125.33255767822266","scantimes":"9","type":"4"},{"city":"辽阳市","cityCode":"211000","info":"辽阳市扫码量:9","latitude":"41.267794","longitude":"123.236974","scantimes":"9","type":"4"},{"city":"舟山市","cityCode":"330900","info":"舟山市扫码量:9","latitude":"29.963367462158203","longitude":"122.31409454345703","scantimes":"9","type":"4"},{"city":"绍兴市","cityCode":"330600","info":"绍兴市扫码量:9","latitude":"30.030192","longitude":"120.580364","scantimes":"9","type":"4"},{"city":"淄博市","cityCode":"370300","info":"淄博市扫码量:9","latitude":"36.63188552856445","longitude":"117.92831420898438","scantimes":"9","type":"4"},{"city":"柳州市","cityCode":"450200","info":"柳州市扫码量:9","latitude":"24.326291","longitude":"109.428608","scantimes":"9","type":"4"},{"city":"扬州市","cityCode":"321000","info":"扬州市扫码量:9","latitude":"32.394209","longitude":"119.412939","scantimes":"9","type":"4"},{"city":"南京市","cityCode":"320100","info":"南京市扫码量:9","latitude":"32.05957","longitude":"118.796682","scantimes":"9","type":"4"},{"city":"云浮市","cityCode":"445300","info":"云浮市扫码量:9","latitude":"22.915094","longitude":"112.044491","scantimes":"9","type":"4"},{"city":"莆田市","cityCode":"350300","info":"莆田市扫码量:8","latitude":"25.454084","longitude":"119.007777","scantimes":"8","type":"4"},{"city":"泰安市","cityCode":"370900","info":"泰安市扫码量:8","latitude":"36.182644","longitude":"117.125465","scantimes":"8","type":"4"},{"city":"日照市","cityCode":"371100","info":"日照市扫码量:8","latitude":"35.416734","longitude":"119.526925","scantimes":"8","type":"4"},{"city":"南宁市","cityCode":"450100","info":"南宁市扫码量:8","latitude":"22.817002","longitude":"108.366543","scantimes":"8","type":"4"},{"city":"兰州市","cityCode":"620100","info":"兰州市扫码量:8","latitude":"36.061089","longitude":"103.834303","scantimes":"8","type":"4"},{"city":"鸡西市","cityCode":"230300","info":"鸡西市扫码量:7","latitude":"45.295075","longitude":"130.969333","scantimes":"7","type":"4"},{"city":"阿坝藏族羌族自治州","cityCode":"513200","info":"阿坝藏族羌族自治州扫码量:7","latitude":"31.682863","longitude":"103.85223","scantimes":"7","type":"4"},{"city":"郴州市","cityCode":"431000","info":"郴州市扫码量:7","latitude":"25.770532","longitude":"113.014984","scantimes":"7","type":"4"},{"city":"赣州市","cityCode":"360700","info":"赣州市扫码量:7","latitude":"25.830694","longitude":"114.933546","scantimes":"7","type":"4"},{"city":"菏泽市","cityCode":"371700","info":"菏泽市扫码量:7","latitude":"35.23375","longitude":"115.480656","scantimes":"7","type":"4"},{"city":"滨州市","cityCode":"371600","info":"滨州市扫码量:7","latitude":"37.38198","longitude":"117.970699","scantimes":"7","type":"4"},{"city":"开封市","cityCode":"410200","info":"开封市扫码量:7","latitude":"34.797966","longitude":"114.307677","scantimes":"7","type":"4"},{"city":"巴中市","cityCode":"511900","info":"巴中市扫码量:7","latitude":"31.867903","longitude":"106.747477","scantimes":"7","type":"4"},{"city":"娄底市","cityCode":"431300","info":"娄底市扫码量:7","latitude":"27.742067337036133","longitude":"112.01182556152344","scantimes":"7","type":"4"},{"city":"莱芜市","cityCode":"371200","info":"莱芜市扫码量:6","latitude":"36.213813","longitude":"117.676723","scantimes":"6","type":"4"},{"city":"白城市","cityCode":"220800","info":"白城市扫码量:6","latitude":"45.619884","longitude":"122.838714","scantimes":"6","type":"4"},{"city":"宜春市","cityCode":"360900","info":"宜春市扫码量:6","latitude":"27.815743","longitude":"114.416785","scantimes":"6","type":"4"},{"city":"宜昌市","cityCode":"420500","info":"宜昌市扫码量:6","latitude":"30.691865","longitude":"111.286445","scantimes":"6","type":"4"},{"city":"安康市","cityCode":"610900","info":"安康市扫码量:6","latitude":"32.68481","longitude":"109.029113","scantimes":"6","type":"4"},{"city":"咸阳市","cityCode":"610400","info":"咸阳市扫码量:6","latitude":"34.32987","longitude":"108.709136","scantimes":"6","type":"4"},{"city":"亳州市","cityCode":"341600","info":"亳州市扫码量:6","latitude":"33.86834","longitude":"115.78271","scantimes":"6","type":"4"},{"city":"衢州市","cityCode":"330800","info":"衢州市扫码量:5","latitude":"28.970079","longitude":"118.859457","scantimes":"5","type":"4"},{"city":"无锡市","cityCode":"320200","info":"无锡市扫码量:5","latitude":"31.84445","longitude":"120.4187","scantimes":"5","type":"4"},
          {"city":"拉萨市","cityCode":"540100","info":"拉萨市扫码量:5","latitude":"29.652341","longitude":"91.172148","scantimes":"5","type":"4"},{"city":"十堰市","cityCode":"420300","info":"十堰市扫码量:5","latitude":"32.629462","longitude":"110.799291","scantimes":"5","type":"4"},{"city":"乌海市","cityCode":"150300","info":"乌海市扫码量:5","latitude":"39.655248","longitude":"106.794216","scantimes":"5","type":"4"},{"city":"马鞍山市","cityCode":"340500","info":"马鞍山市扫码量:4","latitude":"31.341115951538086","longitude":"118.60198211669922","scantimes":"4","type":"4"},{"city":"镇江市","cityCode":"321100","info":"镇江市扫码量:4","latitude":"32.187849","longitude":"119.425836","scantimes":"4","type":"4"},{"city":"锦州市","cityCode":"210700","info":"锦州市扫码量:4","latitude":"41.095685","longitude":"121.126846","scantimes":"4","type":"4"},{"city":"铜陵市","cityCode":"340700","info":"铜陵市扫码量:4","latitude":"30.945515","longitude":"117.81154","scantimes":"4","type":"4"},{"city":"连云港市","cityCode":"320700","info":"连云港市扫码量:4","latitude":"34.596653","longitude":"119.221611","scantimes":"4","type":"4"},{"city":"贵阳市","cityCode":"520100","info":"贵阳市扫码量:4","latitude":"26.647661","longitude":"106.630153","scantimes":"4","type":"4"},{"city":"西宁市","cityCode":"630100","info":"西宁市扫码量:4","latitude":"36.617134","longitude":"101.778223","scantimes":"4","type":"4"},{"city":"营口市","cityCode":"210800","info":"营口市扫码量:4","latitude":"40.625364","longitude":"122.219458","scantimes":"4","type":"4"},{"city":"荆门市","cityCode":"420800","info":"荆门市扫码量:4","latitude":"31.035395","longitude":"112.199427","scantimes":"4","type":"4"},{"city":"汉中市","cityCode":"610700","info":"汉中市扫码量:4","latitude":"33.163177490234375","longitude":"106.67514038085938","scantimes":"4","type":"4"},{"city":"毕节市","cityCode":"520500","info":"毕节市扫码量:4","latitude":"27.283908","longitude":"105.291702","scantimes":"4","type":"4"},{"city":"梧州市","cityCode":"450400","info":"梧州市扫码量:4","latitude":"23.476962","longitude":"111.279115","scantimes":"4","type":"4"},{"city":"德阳市","cityCode":"510600","info":"德阳市扫码量:4","latitude":"31.126855","longitude":"104.397894","scantimes":"4","type":"4"},{"city":"岳阳市","cityCode":"430600","info":"岳阳市扫码量:4","latitude":"28.971973","longitude":"113.743225","scantimes":"4","type":"4"},{"city":"宜宾市","cityCode":"511500","info":"宜宾市扫码量:4","latitude":"28.784578323364258","longitude":"104.66434478759766","scantimes":"4","type":"4"},{"city":"安庆市","cityCode":"340800","info":"安庆市扫码量:4","latitude":"30.531919","longitude":"117.115101","scantimes":"4","type":"4"},{"city":"大理白族自治州","cityCode":"532900","info":"大理白族自治州扫码量:4","latitude":"25.606486","longitude":"100.267638","scantimes":"4","type":"4"},{"city":"四平市","cityCode":"220300","info":"四平市扫码量:4","latitude":"43.8016357421875","longitude":"124.60113525390625","scantimes":"4","type":"4"},{"city":"嘉兴市","cityCode":"330400","info":"嘉兴市扫码量:4","latitude":"30.746191","longitude":"120.75547","scantimes":"4","type":"4"},{"city":"吉林市","cityCode":"220200","info":"吉林市扫码量:4","latitude":"43.811981201171875","longitude":"126.4985122680664","scantimes":"4","type":"4"},{"city":"佳木斯市","cityCode":"230800","info":"佳木斯市扫码量:4","latitude":"46.799777","longitude":"130.318878","scantimes":"4","type":"4"},{"city":"上饶市","cityCode":"361100","info":"上饶市扫码量:4","latitude":"28.454863","longitude":"117.943433","scantimes":"4","type":"4"},{"city":"黔西南布依族苗族自治州","cityCode":"522300","info":"黔西南布依族苗族自治州扫码量:3","latitude":"25.087856","longitude":"104.906397","scantimes":"3","type":"4"},{"city":"铁岭市","cityCode":"211200","info":"铁岭市扫码量:3","latitude":"42.21484","longitude":"123.76823","scantimes":"3","type":"4"},{"city":"资阳市","cityCode":"512000","info":"资阳市扫码量:3","latitude":"30.128901","longitude":"104.627636","scantimes":"3","type":"4"},{"city":"蚌埠市","cityCode":"340300","info":"蚌埠市扫码量:3","latitude":"32.91663","longitude":"117.388512","scantimes":"3","type":"4"},{"city":"芜湖市","cityCode":"340200","info":"芜湖市扫码量:3","latitude":"31.25826","longitude":"118.61133","scantimes":"3","type":"4"},{"city":"白山市","cityCode":"220600","info":"白山市扫码量:3","latitude":"41.943972","longitude":"126.41473","scantimes":"3","type":"4"},{"city":"琼海市","cityCode":"469002","info":"琼海市扫码量:3","latitude":"19.259134","longitude":"110.474497","scantimes":"3","type":"4"},{"city":"滁州市","cityCode":"341100","info":"滁州市扫码量:3","latitude":"32.255636","longitude":"118.327944","scantimes":"3","type":"4"},{"city":"湖州市","cityCode":"330500","info":"湖州市扫码量:3","latitude":"30.547481536865234","longitude":"120.05594635009766","scantimes":"3","type":"4"},{"city":"泸州市","cityCode":"510500","info":"泸州市扫码量:3","latitude":"28.871805","longitude":"105.442285","scantimes":"3","type":"4"},{"city":"池州市","cityCode":"341700","info":"池州市扫码量:3","latitude":"30.664779","longitude":"117.491592","scantimes":"3","type":"4"},{"city":"株洲市","cityCode":"430200","info":"株洲市扫码量:3","latitude":"27.827986","longitude":"113.133853","scantimes":"3","type":"4"},{"city":"松原市","cityCode":"220700","info":"松原市扫码量:3","latitude":"45.141548","longitude":"124.825042","scantimes":"3","type":"4"},{"city":"昌都市","cityCode":"540300","info":"昌都市扫码量:3","latitude":"31.140969","longitude":"97.17202","scantimes":"3","type":"4"},{"city":"恩施土家族苗族自治州","cityCode":"422800","info":"恩施土家族苗族自治州扫码量:3","latitude":"30.272156","longitude":"109.488172","scantimes":"3","type":"4"},{"city":"庆阳市","cityCode":"621000","info":"庆阳市扫码量:3","latitude":"35.70898","longitude":"107.643571","scantimes":"3","type":"4"},{"city":"广安市","cityCode":"511600","info":"广安市扫码量:3","latitude":"30.456224","longitude":"106.633088","scantimes":"3","type":"4"},{"city":"广元市","cityCode":"510800","info":"广元市扫码量:3","latitude":"32.435435","longitude":"105.843357","scantimes":"3","type":"4"},{"city":"宁德市","cityCode":"350900","info":"宁德市扫码量:3","latitude":"26.665617","longitude":"119.547932","scantimes":"3","type":"4"},{"city":"孝感市","cityCode":"420900","info":"孝感市扫码量:3","latitude":"30.917766","longitude":"113.957037","scantimes":"3","type":"4"},{"city":"吴忠市","cityCode":"640300","info":"吴忠市扫码量:3","latitude":"37.981021881103516","longitude":"106.19584655761719","scantimes":"3","type":"4"},{"city":"凉山彝族自治州","cityCode":"513400","info":"凉山彝族自治州扫码量:3","latitude":"27.88157","longitude":"102.267712","scantimes":"3","type":"4"},{"city":"伊春市","cityCode":"230700","info":"伊春市扫码量:3","latitude":"46.98524475097656","longitude":"128.03541564941406","scantimes":"3","type":"4"},{"city":"黔南布依族苗族自治州","cityCode":"522700","info":"黔南布依族苗族自治州扫码量:2","latitude":"26.578343","longitude":"106.713478","scantimes":"2","type":"4"},{"city":"黔东南苗族侗族自治州","cityCode":"522600","info":"黔东南苗族侗族自治州扫码量:2","latitude":"26.96427345275879","longitude":"108.66609954833984","scantimes":"2","type":"4"},{"city":"黄石市","cityCode":"420200","info":"黄石市扫码量:2","latitude":"30.201038","longitude":"115.038962","scantimes":"2","type":"4"},{"city":"随州市","cityCode":"421300","info":"随州市扫码量:2","latitude":"32.161258697509766","longitude":"113.25384521484375","scantimes":"2","type":"4"},{"city":"陇南市","cityCode":"621200","info":"陇南市扫码量:2","latitude":"33.37068","longitude":"104.960851","scantimes":"2","type":"4"},{"city":"阿拉善盟","cityCode":"152900","info":"阿拉善盟扫码量:2","latitude":"38.851921","longitude":"105.728957","scantimes":"2","type":"4"},
          {"city":"阜阳市","cityCode":"341200","info":"阜阳市扫码量:2","latitude":"32.91511917114258","longitude":"115.82473754882812","scantimes":"2","type":"4"},{"city":"长沙市","cityCode":"430100","info":"长沙市扫码量:2","latitude":"28.16771125793457","longitude":"112.97958374023438","scantimes":"2","type":"4"},{"city":"银川市","cityCode":"640100","info":"银川市扫码量:2","latitude":"38.487193","longitude":"106.230909","scantimes":"2","type":"4"},{"city":"钦州市","cityCode":"450700","info":"钦州市扫码量:2","latitude":"21.979933","longitude":"108.654146","scantimes":"2","type":"4"},{"city":"重庆郊县","cityCode":"500200","info":"重庆郊县扫码量:2","latitude":"30.9788","longitude":"108.8892","scantimes":"2","type":"4"},{"city":"鄂州市","cityCode":"420700","info":"鄂州市扫码量:2","latitude":"30.391141","longitude":"114.894935","scantimes":"2","type":"4"},{"city":"贵港市","cityCode":"450800","info":"贵港市扫码量:2","latitude":"23.522560119628906","longitude":"110.5263900756836","scantimes":"2","type":"4"},{"city":"襄阳市","cityCode":"420600","info":"襄阳市扫码量:2","latitude":"32.009016","longitude":"112.122426","scantimes":"2","type":"4"},{"city":"益阳市","cityCode":"430900","info":"益阳市扫码量:2","latitude":"28.554349","longitude":"112.355129","scantimes":"2","type":"4"},{"city":"玉溪市","cityCode":"530400","info":"玉溪市扫码量:2","latitude":"24.347324","longitude":"102.527197","scantimes":"2","type":"4"},{"city":"牡丹江市","cityCode":"231000","info":"牡丹江市扫码量:2","latitude":"44.551653","longitude":"129.633168","scantimes":"2","type":"4"},{"city":"漯河市","cityCode":"411100","info":"漯河市扫码量:2","latitude":"33.580873","longitude":"114.016536","scantimes":"2","type":"4"},{"city":"淮安市","cityCode":"320800","info":"淮安市扫码量:2","latitude":"33.551052","longitude":"119.113185","scantimes":"2","type":"4"},{"city":"海东市","cityCode":"630200","info":"海东市扫码量:2","latitude":"36.502039","longitude":"102.104287","scantimes":"2","type":"4"},{"city":"河池市","cityCode":"451200","info":"河池市扫码量:2","latitude":"24.692931","longitude":"108.085261","scantimes":"2","type":"4"},{"city":"抚顺市","cityCode":"210400","info":"抚顺市扫码量:2","latitude":"41.880872","longitude":"123.957208","scantimes":"2","type":"4"},{"city":"山南市","cityCode":"540500","info":"山南市扫码量:2","latitude":"29.237137","longitude":"91.773134","scantimes":"2","type":"4"},{"city":"宿州市","cityCode":"341300","info":"宿州市扫码量:2","latitude":"33.647309","longitude":"116.964195","scantimes":"2","type":"4"},{"city":"宣城市","cityCode":"341800","info":"宣城市扫码量:2","latitude":"30.940195","longitude":"118.75868","scantimes":"2","type":"4"},{"city":"威海市","cityCode":"371000","info":"威海市扫码量:2","latitude":"37.513412","longitude":"122.120282","scantimes":"2","type":"4"},{"city":"大庆市","cityCode":"230600","info":"大庆市扫码量:2","latitude":"46.589309","longitude":"125.103784","scantimes":"2","type":"4"},{"city":"哈密市","cityCode":"650500","info":"哈密市扫码量:2","latitude":"42.819541","longitude":"93.515224","scantimes":"2","type":"4"},{"city":"咸宁市","cityCode":"421200","info":"咸宁市扫码量:2","latitude":"29.841362","longitude":"114.322616","scantimes":"2","type":"4"},{"city":"和田地区","cityCode":"653200","info":"和田地区扫码量:2","latitude":"37.114157","longitude":"79.922211","scantimes":"2","type":"4"},{"city":"南昌市","cityCode":"360100","info":"南昌市扫码量:2","latitude":"28.682892","longitude":"115.858198","scantimes":"2","type":"4"},{"city":"黄冈市","cityCode":"421100","info":"黄冈市扫码量:1","latitude":"30.774336","longitude":"115.37668","scantimes":"1","type":"4"},{"city":"鹤壁市","cityCode":"410600","info":"鹤壁市扫码量:1","latitude":"35.748325","longitude":"114.297309","scantimes":"1","type":"4"},{"city":"雅安市","cityCode":"511800","info":"雅安市扫码量:1","latitude":"30.010602","longitude":"103.042375","scantimes":"1","type":"4"},{"city":"陵水黎族自治县","cityCode":"469028","info":"陵水黎族自治县扫码量:1","latitude":"18.438282012939453","longitude":"109.84841918945312","scantimes":"1","type":"4"},{"city":"防城港市","cityCode":"450600","info":"防城港市扫码量:1","latitude":"21.544540405273438","longitude":"107.95718383789062","scantimes":"1","type":"4"},{"city":"阜新市","cityCode":"210900","info":"阜新市扫码量:1","latitude":"42.08602","longitude":"121.78179","scantimes":"1","type":"4"},{"city":"铜仁市","cityCode":"520600","info":"铜仁市扫码量:1","latitude":"27.731514","longitude":"109.189598","scantimes":"1","type":"4"},{"city":"金华市","cityCode":"330700","info":"金华市扫码量:1","latitude":"28.911333","longitude":"120.02956","scantimes":"1","type":"4"},{"city":"邵阳市","cityCode":"430500","info":"邵阳市扫码量:1","latitude":"27.23895","longitude":"111.467674","scantimes":"1","type":"4"},{"city":"辽源市","cityCode":"220400","info":"辽源市扫码量:1","latitude":"42.887766","longitude":"125.14366","scantimes":"1","type":"4"},{"city":"贺州市","cityCode":"451100","info":"贺州市扫码量:1","latitude":"24.403528","longitude":"111.566871","scantimes":"1","type":"4"},{"city":"西双版纳傣族自治州","cityCode":"532800","info":"西双版纳傣族自治州扫码量:1","latitude":"22.009113","longitude":"100.796984","scantimes":"1","type":"4"},{"city":"萍乡市","cityCode":"360300","info":"萍乡市扫码量:1","latitude":"27.658373","longitude":"113.887083","scantimes":"1","type":"4"},{"city":"荆州市","cityCode":"421000","info":"荆州市扫码量:1","latitude":"30.335184","longitude":"112.239746","scantimes":"1","type":"4"},{"city":"绵阳市","cityCode":"510700","info":"绵阳市扫码量:1","latitude":"31.549911","longitude":"104.54989","scantimes":"1","type":"4"},{"city":"绥化市","cityCode":"231200","info":"绥化市扫码量:1","latitude":"46.06213","longitude":"125.9685","scantimes":"1","type":"4"},{"city":"盘锦市","cityCode":"211100","info":"盘锦市扫码量:1","latitude":"40.719847","longitude":"122.170584","scantimes":"1","type":"4"},{"city":"百色市","cityCode":"451000","info":"百色市扫码量:1","latitude":"23.90233","longitude":"106.618202","scantimes":"1","type":"4"},{"city":"湘西土家族苗族自治州","cityCode":"433100","info":"湘西土家族苗族自治州扫码量:1","latitude":"28.31195","longitude":"109.738906","scantimes":"1","type":"4"},{"city":"淮南市","cityCode":"340400","info":"淮南市扫码量:1","latitude":"32.60304260253906","longitude":"117.03422546386719","scantimes":"1","type":"4"},{"city":"海南藏族自治州","cityCode":"632500","info":"海南藏族自治州扫码量:1","latitude":"36.296529","longitude":"100.622692","scantimes":"1","type":"4"},{"city":"新余市","cityCode":"360500","info":"新余市扫码量:1","latitude":"27.778826","longitude":"114.872185","scantimes":"1","type":"4"},{"city":"怀化市","cityCode":"431200","info":"怀化市扫码量:1","latitude":"27.569517","longitude":"110.001923","scantimes":"1","type":"4"},{"city":"德宏傣族景颇族自治州","cityCode":"533100","info":"德宏傣族景颇族自治州扫码量:1","latitude":"24.79055404663086","longitude":"98.23745727539062","scantimes":"1","type":"4"},{"city":"张掖市","cityCode":"620700","info":"张掖市扫码量:1","latitude":"38.772057","longitude":"101.10979","scantimes":"1","type":"4"},{"city":"张家界市","cityCode":"430800","info":"张家界市扫码量:1","latitude":"29.117013","longitude":"110.479148","scantimes":"1","type":"4"},{"city":"常德市","cityCode":"430700","info":"常德市扫码量:1","latitude":"29.344079971313477","longitude":"112.15655517578125","scantimes":"1","type":"4"},{"city":"巴音郭楞蒙古自治州","cityCode":"652800","info":"巴音郭楞蒙古自治州扫码量:1","latitude":"41.764115","longitude":"86.145297","scantimes":"1","type":"4"},{"city":"崇左市","cityCode":"451400","info":"崇左市扫码量:1","latitude":"22.055465698242188","longitude":"106.74661254882812","scantimes":"1","type":"4"},
          {"city":"定安县","cityCode":"469021","info":"定安县扫码量:1","latitude":"19.681404","longitude":"110.359339","scantimes":"1","type":"4"},{"city":"吉安市","cityCode":"360800","info":"吉安市扫码量:1","latitude":"27.090763","longitude":"114.966567","scantimes":"1","type":"4"},{"city":"南平市","cityCode":"350700","info":"南平市扫码量:1","latitude":"26.641774","longitude":"118.17771","scantimes":"1","type":"4"},{"city":"丽水市","cityCode":"331100","info":"丽水市扫码量:1","latitude":"28.46763","longitude":"119.922796","scantimes":"1","type":"4"},{"city":"丹东市","cityCode":"210600","info":"丹东市扫码量:1","latitude":"40.000787","longitude":"124.35445","scantimes":"1","type":"4"},{"city":"临沧市","cityCode":"530900","info":"临沧市扫码量:1","latitude":"23.883955","longitude":"100.08879","scantimes":"1","type":"4"},{"city":"东营市","cityCode":"370500","info":"东营市扫码量:1","latitude":"37.4232","longitude":"118.6765","scantimes":"1","type":"4"},{"city":"东方市","cityCode":"469007","info":"东方市扫码量:1","latitude":"19.095351","longitude":"108.651815","scantimes":"1","type":"4"},{"city":"三门峡市","cityCode":"411200","info":"三门峡市扫码量:1","latitude":"34.57933","longitude":"110.48633","scantimes":"1","type":"4"},{"city":"三亚市","cityCode":"460200","info":"三亚市扫码量:1","latitude":"18.253135","longitude":"109.511772","scantimes":"1","type":"4"},{"city":"万宁市","cityCode":"469006","info":"万宁市扫码量:1","latitude":"18.795143","longitude":"110.391073","scantimes":"1","type":"4"},{"city":"七台河市","cityCode":"230900","info":"七台河市扫码量:1","latitude":"45.756967","longitude":"126.642464","scantimes":"1","type":"4"}
          ];
          let option = this.mapEchart.getOption();
          let sortData = this.convertData(this.mapData.sort(function (a, b) {
              return b.scantimes - a.scantimes;
          }));
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
      this.$request.post('/record/statistics/getHistoryScanUv', {key: "scantimes"}, true, (res)=>{
        let datas = res || [];
        datas = [{"scanTotalCode":34323151,"scanTotalPv":47093856,"scanTotalUv":4325241}];
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
        datas = {"scanTimes_of_day":"109236"};
        this.timeScanData = Object.assign({}, this.timeScanData, datas);
        this.timeScanData.timesOfDay = this.fixData(this.timeScanData.scanTimes_of_day, 0);
      });
      // 当日扫码总人数
      this.$request.post('/record/data/dayScanUsers', {}, true, (res)=>{
        let datas = res || {};
        datas = {"scanUsers_of_day":"61327"};
        this.timeScanData = Object.assign({}, this.timeScanData, datas);
        this.timeScanData.usersOfDay = this.fixData(this.timeScanData.scanUsers_of_day, 0);
      });
      // 当日扫码总烟包数
      this.$request.post('/record/data/dayScanCodes', {}, true, (res)=>{
        let datas = res || {};
        datas = {"scanCodes_of_day":"90579"};
        this.timeScanData = Object.assign({}, this.timeScanData, datas);
        this.timeScanData.codesOfDay = this.fixData(this.timeScanData.scanCodes_of_day, 0);
      });
      // top排名
      this.$request.post('/record/data/topTen', {}, true, (res)=>{
        let datas = res || [];
        datas = ["石家庄市","邢台市","邯郸市","张家口市","保定市","唐山市","null","沧州市","衡水市","北京市"];
        if(datas.length>0) {
          this.tops = datas.join("、");
        }
      });
    },
    // 实时滚动数据
    getRollData() {
      this.$request.post('/record/data/rollingData', {}, true, (res)=>{
        this.rollDatas = res || [];
        this.rollDatas = ["河北省石家庄市用户正在访问: 钻石（绿石2代）的扫码验真页面 16:08:07","河北省唐山市用户正在参与: 钻石（细支尚风）的抽奖活动 16:08:06","河北省石家庄市用户正在访问: 钻石（硬玫瑰紫）的扫码验真页面 16:08:06"];
      });
    }
  }
}
</script>
<style>
  .space {
    height: 20px;
  }
  .mytip {
    font-weight: 300;
    max-width: 200px;
    text-align: center;
  }
  .data-home {
    font-weight: 300;
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

