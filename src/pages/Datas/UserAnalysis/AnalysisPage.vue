<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">用户分析/用户群体分析</div></el-col>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间" size="small" >
                        <el-date-picker  v-model="form.statDate" type="month" placeholder="选择日期" format="yyyy-MM" value-format="yyyy-MM"> </el-date-picker>
                    </el-form-item>
                    <el-form-item size="small">
                        <el-row>
                            <el-button  size="small" type="primary" v-on:click="queryData">查询</el-button>
                        </el-row>
                    </el-form-item>
                </el-row>
            </el-form>
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-card shadow="always">
                        <div align="center">
                            <h1>扫码用户数</h1>
                            <ul>
                                <li>当月 ：{{kpikData.monaddScanUv}}人</li>
                                <li>上月 ：{{kpikData.retMonaddScanUv}}人</li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="always">
                        <div align="center">
                            <h1>月活用户数</h1>
                            <ul>
                                <li>当月 ：{{kpikData.monaddScanActUv}}人</li>
                                <li>上月 ：{{kpikData.retMonaddScanActUv}}人</li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="always">
                        <div align="center">
                            <h1>新增用户数</h1>
                            <ul>
                                <li>当月 ：{{kpikData.monaddScanNewUv}}人</li>
                                <li>上月 ：{{kpikData.retMonaddScanNewUv}}人</li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="space"></div>
            <span>当月不同香烟类别扫码用户分布</span>
            <el-row :gutter="12" >
                <el-col :span="12">
                    <el-card shadow="always">
                        <div id="smokeChartPie" class="myecharts"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always" style="height: 80%">
                        <div align="center">
                            <el-table :data="listData" style="width: 100%;" border>
                                <el-table-column prop="smokeLevelName" label="类别" width="150" ></el-table-column>
                                <el-table-column prop="monaddScanUv" label="本月用户数" width="100"></el-table-column>
                                <el-table-column prop="retMonaddScanUv" label="上月扫码用户数" ></el-table-column>
                                <el-table-column  label="环比" width="80">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.huanBi > 0" >{{scope.row.huanBi}}</span>
                                        <span v-else-if="scope.row.huanBi<0" style="color:#FF9A2F">{{scope.row.huanBi}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="space"></div>
            <el-row>
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="品牌规格" size="small" >
                        <el-select   v-model="selectAllBrands" placeholder="请选择">
                            <el-option v-for="(item,index) in allBrandsData" :key="item.brandCode" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="small">
                        <el-select  v-model="selectSpeciSns" placeholder="请选择"   >
                            <el-option v-for="(item,index) in allSpecisData" :key="item.sn" :label="item.name" :value="item.sn"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <hr />
            <div class="space"></div>
            <span>不同扫码频次用户分布</span>
            <el-row :gutter="12" >
                <el-col :span="12">
                    <el-card shadow="always">
                        <div id="smokeChartBarLeft" class="myecharts"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="always">
                        <div id="smokeChartBarRight" class="myecharts"></div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="space"></div>
            <span>用户发展日趋势</span>
            <el-row :gutter="12" >
                <el-col :span="24">
                    <el-card shadow="always">
                        <div id="smokeChartBarDayLine" class="myecharts"></div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="space"></div>
            <span>用户发展月趋势</span>
            <el-row :gutter="12" >
                <el-col :span="24">
                    <el-card shadow="always">
                        <div id="smokeChartBarMonLine" class="myecharts"></div>
                    </el-card>
                </el-col>
            </el-row>
            <span>当月扫码次数排名前十</span>
            <el-row :gutter="12" >
                <el-col :span="24">
                    <el-card shadow="always">
                        <div align="center">
                            <el-table :data="listDataTopTen" style="width: 100%;" border>
                                <el-table-column type="index"  label="排名" ></el-table-column>
                                <el-table-column prop="productBrand" label="规格"  ></el-table-column>
                                <el-table-column prop="nickName" label="昵称"  ></el-table-column>
                                <el-table-column prop="mobileNo" label="手机号"  ></el-table-column>
                                <el-table-column prop="scanPv" label="扫码次数"  ></el-table-column>
                                <el-table-column prop="effectScanPv" label="扫码烟包数" ></el-table-column>
                                <el-table-column prop="drawPv" label="中奖次数"  ></el-table-column>
                                <el-table-column prop="drawCash" label="中奖现金总金额"  ></el-table-column>
                                <el-table-column prop="drawObPv" label="中奖实物个数	"  ></el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button v-on:click="Datail(scope.row.mobileNo)" type="text" size="small">点击查看用户详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        components: {
            draggable
        },
        name: "AnalysisPage",
        data(){
            return{
                tagData:[],
                kpikData:{},
                listData:[],
                allBrandsData:[],
                allSpecisData:[],
                listDataTopTen:[],
                selectAllBrands:'',
                selectSpeciSns:'',
                form:{
                    statDate:this.Format('yyyy-MM'),
                    productSn:''
                }
            }
        },
        created(){
            this.inits();
        },
        watch:{//监听品牌，规格，地域
            selectAllBrands(nval, oval){
                if(nval&&nval!=oval) {
                    this.allSpecisList(nval);
                }
            },
            selectSpeciSns(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.productSn  = '';
                    this.form.productSn = nval;
                    this.loadSmokeChartLeft();
                    this.loadSmokeChartRight();
                    this.loadSmokeChartBarDayLine();
                    this.loadSmokeChartBarMonLine();
                    this.loadSmokeTopTenList();
                }
            }
        },
        methods:{
            inits(){
                this.allBrandsList();
                this.kpikDataList();
                //this.tagDataList();
                this.loadSmokeChartPie();
                this.loadSmokeTable();
                //this.loadSmokeChartLeft();
                //this.loadSmokeChartRight();
                //this.loadSmokeChartBarDayLine();
                //this.loadSmokeChartBarMonLine();
                //this.loadSmokeTopTenList();
            },
            kpikDataList(){
                this.$request.post('/record/consumer/getScanNumberUsers', this.form, true, (res)=>{
                    let datas = res||{};
                     // datas = {"monaddScanActUv":197483,"monaddScanNewUv":185108,"monaddScanUv":303563,"retMonaddScanActUv":366904,"retMonaddScanNewUv":853478,"retMonaddScanUv":1130839};
                    this.kpikData=datas
                });
            },
    /*        tagDataList(){
                this.$request.post('/record/consumer/getTagName', { }, true, (res)=>{
                    let datas = res||[];
                    datas = [{"tagId":"10001","tagName":"扫码用户数"},{"tagId":"10002","tagName":"月活用户数"},{"tagId":"10003","tagName":"新增用户数"}];
                    this.tagData=datas
                });
            },*/
            loadSmokeChartPie(){
                this.$request.post('/record/consumer/getSmokeTypePie', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"monaddScanUv":14224,"smokeType":"1","smokeTypeName":"一类烟"},{"monaddScanUv":26678,"smokeType":"2","smokeTypeName":"二类烟"},{"monaddScanUv":76329,"smokeType":"3","smokeTypeName":"三类烟"},{"monaddScanUv":0,"smokeType":"4","smokeTypeName":"四类烟"}];
                    let legendDatas= [];
                    let pieDatas = []; // 数据内容数组
                    for(let i=0;i<datas.length;i++) {
                        pieDatas.push({value:datas[i].monaddScanUv, name:datas[i].smokeTypeName});
                        legendDatas.push(datas[i].smokeTypeName);
                    }
                    let option = {
                        color:["#3EDAFA","#FF8300","#FFCC24","#244AFF"],
                        tooltip:{"trigger":"item","formatter":"{a} <br/>{b}: {c} ({d}%)"},
                        legend:{orient:"horizontal",x:"center",y:"bottom",padding:15,data:legendDatas},

                        series:[{
                            name:"扫码用户分布",
                            type:"pie",
                            radius:["0%","70%"],
                            label:{            //饼图图形上的文本标签
                                normal:{
                                    show:true,
                                    position:'outer', //标签的位置
                                    textStyle : {
                                        fontWeight : 300 ,
                                        fontSize : 16    //文字的字体大小
                                    },
                                    formatter:'{d}%'
                                }
                            },
                            //center: ['50%', '30%'],//饼图的位置
                            avoidLabelOverlap:false,
                            data:pieDatas
                        }]
                    };
                    var myChart = this.$echarts.init(document.getElementById('smokeChartPie'));
                    myChart.setOption(option);
                });
            },
            loadSmokeTable(){
                this.$request.post('/record/consumer/getSmokeTypePie', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"huanBi":-486.1,"monaddScanUv":48686,"retMonaddScanUv":285349,"smokeLevelName":"一类烟"},{"huanBi":-640.37,"monaddScanUv":109,"retMonaddScanUv":807,"smokeLevelName":"一类烟(其中:超高端)"},{"huanBi":-514.44,"monaddScanUv":2916,"retMonaddScanUv":17917,"smokeLevelName":"一类烟(其中:高一类)"},{"huanBi":-505.66,"monaddScanUv":41456,"retMonaddScanUv":251083,"smokeLevelName":"一类烟(其中:中一类)"},{"huanBi":-317.7,"monaddScanUv":4877,"retMonaddScanUv":20371,"smokeLevelName":"一类烟(其中:普一类)"},{"huanBi":-364.13,"monaddScanUv":78189,"retMonaddScanUv":362901,"smokeLevelName":"二类烟"},{"huanBi":-197.89,"monaddScanUv":191383,"retMonaddScanUv":570113,"smokeLevelName":"三类烟"},{"monaddScanUv":0,"retMonaddScanUv":0,"smokeLevelName":"四类烟"}];
                    this.listData=datas
                });
            },
            allBrandsList(){
                this.$request.post(`/record/public/getUserBrandByUserId`,{ },true,res => {
                        let datas = res || [];
                         // datas=[{"brandCode":"0f01c777243143bbb1928f8ea86abcde","name":"钻石"},{"brandCode":"9ein239nds8enga9ne34kdafsfdsa34d","name":"荷花"}];
                        this.allBrandsData = datas;
                        if(datas.length>0){
                            this.selectAllBrands=datas[0].name;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allSpecisList(nval){//所有规格
                this.$request.post(`/record/statistics/getProduct`,{
                        productBrand:nval
                    },true,res => {
                        let datas = res || [];
                        // datas = [{"name":"盒-钻石（金石）","sn":"6901028250790"},{"name":"盒-钻石（金玉兰）","sn":"6901028250979"},{"name":"盒-钻石（软绿硬化版）","sn":"6901028077699"},{"name":"盒-钻石（西柏坡）","sn":"6901028079815"},{"name":"盒-钻石（自在·八仙）","sn":"6901028079075"},{"name":"盒-钻石（绿石2代）","sn":"6901028250757"},{"name":"盒-钻石（经典浓情）红","sn":"6901028250234"},{"name":"盒-钻石（细支西柏坡）","sn":"6901028107198"},{"name":"盒-钻石（细支玫瑰之旅）","sn":"1111111111113"},{"name":"盒-钻石（细支洪荒之绿）","sn":"6901028250351"},{"name":"盒-钻石（细支心世界）","sn":"6901028250955"},{"name":"盒-钻石（细支尚风）","sn":"6901028250320"},{"name":"盒-钻石（硬珍品）","sn":"6901028250597"},{"name":"盒-钻石（硬玫瑰紫）","sn":"6901028080019"},{"name":"盒-钻石（盛世迎宾）","sn":"6901028250412"},{"name":"盒-钻石（玫瑰之旅）","sn":"1111111111114"},{"name":"盒-钻石（洪荒之绿）","sn":"1111111111111"},{"name":"盒-钻石（洪荒之绿薄荷）","sn":"1111111111112"},{"name":"盒-钻石（时尚）新版","sn":"6901028250789"},{"name":"盒-钻石（时尚蓝）","sn":"6901028250788"},{"name":"盒-钻石（时尚红）","sn":"6901028078245"},{"name":"盒-钻石（扁蓝时尚）","sn":"6901028107105"},{"name":"盒-钻石（传奇·子龙）","sn":"1111111111115"},{"name":"盒-经典醇和","sn":"6901028250009"},{"name":"盒-经典浓情","sn":"6901028250382"},{"name":"盒-烟波致爽","sn":"6901028079693"},{"name":"盒-Test","sn":"11111111010123456"},{"name":"条-钻石（金石）","sn":"6901028250795"},{"name":"条-钻石（金玉兰）","sn":"6901028250986"},{"name":"条-钻石（软绿）硬化版","sn":"6901028077705"},{"name":"条-钻石（西柏坡）","sn":"6901028079938"},{"name":"条-钻石（自在八仙）","sn":"1111111111118"},{"name":"条-钻石（绿石2代）","sn":"6901028250764"},{"name":"条-钻石（细支西柏坡）","sn":"6901028107211"},{"name":"条-钻石（细支玫瑰之旅）","sn":"1111111111138"},{"name":"条-钻石（细支洪荒之绿）","sn":"1111111111136"},{"name":"条-钻石（细支心世界）","sn":"6901028250962"},{"name":"条-钻石（细支尚风）","sn":"6901028250337"},{"name":"条-钻石（硬珍品）","sn":"6901028250849"},{"name":"条-钻石（硬玫瑰紫）","sn":"6901028080026"},{"name":"条-钻石（盛世迎宾）","sn":"6901028250429"},{"name":"条-钻石（玫瑰之旅）","sn":"1111111111139"},{"name":"条-钻石（洪荒之绿）","sn":"1111111111117"},{"name":"条-钻石（洪荒之绿薄荷）","sn":"1111111111137"},{"name":"条-钻石（时尚）新版","sn":"1111111111143"},{"name":"条-钻石（时尚蓝）","sn":"1111111111141"},{"name":"条-钻石（时尚红）","sn":"1111111111140"},{"name":"条-钻石（扁蓝时尚）","sn":"6901028107112"},{"name":"条-钻石（传奇子龙）","sn":"6901028000000"},{"name":"条-经典醇和","sn":"1111111111142"}];
                        this.allSpecisData = datas;
                        if(datas.length>0){
                            this.selectSpeciSns=datas[0].sn;
                            this.form.productSn=this.selectSpeciSns;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            loadSmokeChartLeft(){
                this.$request.post('/record/consumer/getThrMonScanSmokeBar', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"mon3addEffScanPv":1011364,"scanPvid":"1","scanPvname":"0-1"},{"mon3addEffScanPv":154811,"scanPvid":"2","scanPvname":"2-7"},{"mon3addEffScanPv":68800,"scanPvid":"3","scanPvname":"8-30"},{"mon3addEffScanPv":20692,"scanPvid":"4","scanPvname":"30以上"}]
                    let yAxisData = []; // x轴内容数组
                    let seriesData = []; // 数据内容数组
                    for(let i=0;i<datas.length;i++) {
                        yAxisData.push(datas[i].scanPvname);
                        seriesData.push(datas[i].mon3addEffScanPv);
                    }
                    let option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['扫码用户数']
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: false},
                                dataView : {show: false, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore : {show: false},
                                saveAsImage : {show: false}
                            }
                        },
                        grid:{
                            x:70
                        },
                        calculable : true,
                        color:['#3BDAFA'],
                        xAxis : [
                            {
                                type : 'value',
                                boundaryGap : [0, 0.01]
                            }
                        ],
                        yAxis : [
                            {
                                name : '近三个月扫码烟包数',
                                type : 'category',
                                data : yAxisData
                            }
                        ],
                        series : [
                            {
                                name:'扫码用户数',
                                type:'bar',
                                data:seriesData
                            }
                        ]
                    };
                    var myChart = this.$echarts.init(document.getElementById('smokeChartBarLeft'));
                    myChart.setOption(option);
                });
            },
            loadSmokeChartRight(){
                this.$request.post('/record/consumer/getMonScanSmokeBar', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"monaddEffScanPv":1217189,"scanPvid":"1","scanPvname":"0-1"},{"monaddEffScanPv":36782,"scanPvid":"2","scanPvname":"2-7"},{"monaddEffScanPv":1616,"scanPvid":"3","scanPvname":"8-30"},{"monaddEffScanPv":80,"scanPvid":"4","scanPvname":"30以上"}];
                    let yAxisData = []; // x轴内容数组
                    let seriesData = []; // 数据内容数组
                    for(let i=0;i<datas.length;i++) {
                        yAxisData.push(datas[i].scanPvname);
                        seriesData.push(datas[i].monaddEffScanPv);
                    }
                    let option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['扫码用户数']
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: false},
                                dataView : {show: false, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore : {show: false},
                                saveAsImage : {show: false}
                            }
                        },
                        calculable : true,
                        color:['#3BDAFA'],
                        xAxis : [
                            {
                                type : 'value',
                                boundaryGap : [0, 0.01]
                            }
                        ],
                        yAxis : [
                            {   name : '当月扫码烟包数',
                                type : 'category',
                                data : yAxisData
                            }
                        ],
                        series : [
                            {
                                name:'扫码用户数',
                                type:'bar',
                                data:seriesData
                            }
                        ]
                    };
                    var myChart = this.$echarts.init(document.getElementById('smokeChartBarRight'));
                    myChart.setOption(option);
                });
            },
            loadSmokeChartBarDayLine(){
                this.$request.post('/record/consumer/getDayTrendScanUserBar', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"day3EffScanAvgUV":33211,"scanNewUv":2679,"scanUv":33275,"statDate":"2018-11-01"},{"day3EffScanAvgUV":33121,"scanNewUv":2622,"scanUv":33300,"statDate":"2018-11-02"},{"day3EffScanAvgUV":33367,"scanNewUv":2794,"scanUv":33527,"statDate":"2018-11-03"},{"day3EffScanAvgUV":32778,"scanNewUv":2449,"scanUv":31507,"statDate":"2018-11-04"}];
                    let dataZoom=[];
                    if (datas.length>=8) {
                        dataZoom.push({
                            "type": "inside",
                            "show": true,
                            "start":0,
                            "end": 30,
                            "zoomLock":true
                        })
                    }
                    let xAxisData = []; // x轴内容数组
                    let seriesLineData = []; // 数据内容数组
                    let seriesBarData1 = []; // 数据内容数组
                    let seriesBarData2 = []; // 数据内容数组
                    for(let i=0;i<datas.length;i++) {
                        xAxisData.push(datas[i].statDate);
                        seriesLineData.push(datas[i].day3EffScanAvgUV);
                        seriesBarData1.push(datas[i].scanUv);
                        seriesBarData2.push(datas[i].scanNewUv);
                    }
                    let option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            show:true,
                            data:['本日扫码用户数','本日新增扫码用户数','近三日扫码用户平均值']
                        },
                        dataZoom:dataZoom,
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: false},
                                dataView : {show: false, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore : {show: false},
                                saveAsImage : {show: false}
                            }
                        },
                        calculable : true,
                        color:['#00DFFB','#FF7800','#FFCA45'],
                        xAxis : [
                            {
                                type : 'category',
                                data : xAxisData
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series : [

                            {   barGap:0,
                                barWidth:20,
                                name:'本日扫码用户数',
                                type:'bar',
                                data:seriesBarData1
                            },
                            {   barGap:0,
                                barWidth:20,
                                name:'本日新增扫码用户数',
                                type:'bar',
                                data:seriesBarData2
                            },
                            {
                                name:'近三日扫码用户平均值',
                                type:'line',
                                yAxisIndex: 0,
                                data:seriesLineData
                            }
                        ]
                    };
                    var myChart = this.$echarts.init(document.getElementById('smokeChartBarDayLine'));
                    myChart.setOption(option);
                });
            },
            loadSmokeChartBarMonLine(){
                this.$request.post('/record/consumer/getMonthTrendScanUserBar', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"day3EffScanAvgUV":106917,"scanNewUv":361256,"scanUv":492390,"statDate":"2018-05"},{"day3EffScanAvgUV":148007,"scanNewUv":150098,"scanUv":298104,"statDate":"2018-06"},{"day3EffScanAvgUV":157569,"scanNewUv":101699,"scanUv":277650,"statDate":"2018-07"},{"day3EffScanAvgUV":147915,"scanNewUv":89694,"scanUv":274436,"statDate":"2018-08"},{"day3EffScanAvgUV":143051,"scanNewUv":78539,"scanUv":267101,"statDate":"2018-09"},{"day3EffScanAvgUV":141750,"scanNewUv":91044,"scanUv":290126,"statDate":"2018-10"},{"day3EffScanAvgUV":68348,"scanNewUv":10544,"scanUv":88194,"statDate":"2018-11"}];
                    let dataZoom=[];
                    if (datas.length>=8) {
                        dataZoom.push({
                            "type": "inside",
                            "show": true,
                            "start":0,
                            "end": 30,
                            "zoomLock":true
                        })
                    }
                    let xAxisData = []; // x轴内容数组
                    let seriesBarData1 = []; // 数据内容数组
                    let seriesBarData2 = []; // 数据内容数组
                    let seriesBarData3 = []; // 数据内容数组
                    for(let i=0;i<datas.length;i++) {
                        xAxisData.push(datas[i].statDate);
                        seriesBarData1.push(datas[i].scanUv);
                        seriesBarData2.push(datas[i].scanNewUv);
                        seriesBarData3.push(datas[i].day3EffScanAvgUV);
                    }
                    let option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            show:true,
                            data:['当月扫码用户数','当月新增扫码用户数','当月月活用户数']
                        },
                        dataZoom:dataZoom,
                        toolbox: {
                            show : false
                        },
                        calculable : true,
                        color:['#00DFFB','#FF7800','#FFCA45'],
                        xAxis : [
                            {
                                type : 'category',
                                data : xAxisData
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series : [

                            {   barGap:0,
                                barWidth:20,
                                name:'当月扫码用户数',
                                type:'bar',
                                data:seriesBarData1
                            },
                            {   barGap:0,
                                barWidth:20,
                                name:'当月新增扫码用户数',
                                type:'bar',
                                data:seriesBarData2
                            },
                            {   barGap:0,
                                barWidth:20,
                                name:'当月月活用户数',
                                type:'bar',
                                data:seriesBarData3
                            }
                        ]
                    };
                    var myChart = this.$echarts.init(document.getElementById('smokeChartBarMonLine'));
                    myChart.setOption(option);
                });

            },
            loadSmokeTopTenList(){
                this.$request.post('/record/consumer/getMonthToptenTable', this.form, true, (res)=>{
                    let datas = res||[];
                    // datas = [{"drawCash":265.88,"drawObPv":0,"drawPv":711,"effectScanPv":214,"mobileNo":"15227968616","nickName":"想起朋友！15227968616","productBrand":"钻石（绿石2代）盒","scanPv":284},{"drawCash":174.72,"drawObPv":0,"drawPv":371,"effectScanPv":105,"mobileNo":"15032150638","nickName":"五星红旗🇨🇳","productBrand":"钻石（绿石2代）盒","scanPv":148},{"drawCash":219.34,"drawObPv":0,"drawPv":460,"effectScanPv":78,"mobileNo":"17383095388","nickName":"张业术","productBrand":"钻石（绿石2代）盒","scanPv":98},{"drawCash":185.08,"drawObPv":0,"drawPv":480,"effectScanPv":11,"mobileNo":"15100963797","nickName":"感悟人生享受生活","productBrand":"钻石（绿石2代）盒","scanPv":98},{"drawCash":372.48,"drawObPv":0,"drawPv":1003,"effectScanPv":74,"mobileNo":"13073181793","nickName":"红苹果","productBrand":"钻石（绿石2代）盒","scanPv":95},{"drawCash":32.56,"drawObPv":0,"drawPv":63,"effectScanPv":50,"mobileNo":"18632095502","nickName":"黑暗的我^O^","productBrand":"钻石（绿石2代）盒","scanPv":94},{"drawCash":23.32,"drawObPv":0,"drawPv":76,"effectScanPv":86,"mobileNo":"13739720810","nickName":"人生若只如初见","productBrand":"钻石（绿石2代）盒","scanPv":87},{"drawCash":320.46,"drawObPv":0,"drawPv":765,"effectScanPv":59,"mobileNo":"15932655082","nickName":" 平安","productBrand":"钻石（绿石2代）盒","scanPv":85},{"drawCash":273.6,"drawObPv":0,"drawPv":700,"effectScanPv":70,"mobileNo":"15830143701","nickName":"太阳宋","productBrand":"钻石（绿石2代）盒","scanPv":83},{"drawCash":113.66,"drawObPv":0,"drawPv":242,"effectScanPv":40,"mobileNo":"15130062456","nickName":"海卫","productBrand":"钻石（绿石2代）盒","scanPv":78}];
                    this.listDataTopTen=datas
                });
            },
            Datail(mobileNo){
                sessionStorage.setItem('mobileNo',mobileNo);
                this.$router.push({path:'/datas/userAnalysis/portraitu?mobileNo='+mobileNo})
            },
            queryData(){
                this.kpikDataList();
                this.loadSmokeChartPie();
                this.loadSmokeTable();
                this.loadSmokeChartLeft();
                this.loadSmokeChartRight();
                this.loadSmokeChartBarDayLine();
                this.loadSmokeChartBarMonLine();
                this.loadSmokeTopTenList();
            },
            Format(fmt) { //author: meizz
                var da = new Date();
                var o = {
                    "M+": da.getMonth() + 1, //月份
                    "d+": da.getDate(), //日
                    "h+": da.getHours(), //小时
                    "m+": da.getMinutes(), //分
                    "s+": da.getSeconds(), //秒
                    "q+": Math.floor((da.getMonth() + 3) / 3), //季度
                    "S": da.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (da.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
        }
    }
</script>

<style scoped>
    .space {position:relative;width:100%;height:20px;}
    .myecharts {
        width: 100%;
        height: 300px;
    }
</style>
