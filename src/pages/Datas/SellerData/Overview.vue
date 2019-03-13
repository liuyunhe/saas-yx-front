<template>
    <div>
        <el-card class="box-card">
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="form">
                <el-form-item label="类型">
                    <el-select size="small" v-model="form.statType" class="mycust-sel">
                        <el-option v-for="(label, value) in statTypeList" :key="value" :label="label" :value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询时间" v-show="form.statType=='day'">
                    <div class="block">
                        <el-date-picker size="small"
                            v-model="form.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="查询时间" v-show="form.statType=='week'">
                    <div class="block">
                        <el-select size="small" v-model="form.weekStaTime" class="the-time">
                            <el-option v-for="item in weeks" :key="item.weekNo" :label="item.weekNo" :value="item.startWeek"></el-option>
                        </el-select>
                        <span class="split">至</span>
                        <el-select size="small" v-model="form.weekEndTime" class="the-time">
                            <el-option v-for="item in weeks" :key="item.weekNo" :label="item.weekNo" :value="item.endWeek"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="查询时间" v-show="form.statType=='month'">
                    <div class="block">
                        <el-date-picker size="small" v-model="form.monStaTime" type="month" value-format="yyyy-MM"></el-date-picker>
                        <span class="split">至</span>
                        <el-date-picker size="small" v-model="form.monEndTime" type="month" value-format="yyyy-MM"></el-date-picker>
                    </div>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="space"></div>
        <el-card class="box-card">
            <div class="panel-body">
                <div class="ui-detail-box">
                    <div>
                        <div class="box">
                            <em class="ng-binding">{{showNum.total}}</em>家<br>累计零售户
                        </div>
                        <img src="http://qoss.qrmkt.cn/new_platform/ic-total.png">
                    </div>
                    <div style="display: none;">
                        <div class="box">
                            <em class="ng-binding">{{showNum.active}}</em>家<br>参与活动零售户
                        </div>
                        <img src="statics/assets/image/i-join.png">
                    </div>
                    <div>
                        <div class="box">
                            <em class="ng-binding">{{showNum.new}}</em>家<br>新增零售户
                        </div>
                        <img src="http://qoss.qrmkt.cn/new_platform/ic-new.png">
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="title">零售户增长趋势</div>
                <div id="chart1" class="myecharts"></div>
            </div>
            <div class="panel-body">
                <div class="title">零售户业态分布</div>
                <div class="">
                    <div class="half-inline">
                        <div id="chart2" class="myecharts"></div>
                    </div>
                    <div class="half-inline">
                        <div class="biz-sel-block">
                            <el-select size="small" v-model="form.bizType" class="mycust-sel biz-sel" @change="loadChart3">
                                <el-option v-for="item in bizs" :key="item.bizCode" :label="item.bizName" :value="item.bizCode"></el-option>
                            </el-select>
                        </div>
                        <div id="chart3" class="myecharts"></div>
                    </div>
                </div>
            </div>
             <div class="panel-body">
                <div class="half-inline">
                    <div class="title">零售户省内外分布</div>
                    <div id="chart4" class="myecharts"></div>
                </div>
                <div class="half-inline">
                    <div class="title">零售户城乡分布</div>
                    <div id="chart5" class="myecharts"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            statTypeList: {
                "day": "日",
                "week": "周",
                "month": "月"
            },
            loading: false, // 是否查询中
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() >= Date.now();
                },
                // selectDate = { maxDate, minDate }
                onPick(selectDate) {
                    //console.log(selectDate.minDate);
                    //console.log(selectDate.maxDate);
                }
            },
            weeks: [], // 后台接口返回可选周：{weekId: "201843", weekNo: "2018年第43周(2018.10.22~2018.10.28)", startWeek: "2018.10.22", endWeek: "2018.10.28"}
            bizs: [], // 业态维值
            yesterday: "",
            form: { // 查询区域
                statType: "day", // 查询时间类型
                time: [this.yesterday, this.yesterday], // 查询时间
                beginTime: "", // 日开始时间。格式：yyyy-MM-dd
                endTime: "", // 日结束时间。格式：yyyy-MM-dd
                weekStaTime: "", // 周开始时间。格式：yyyy-MM-dd
                weekEndTime: "", // 周结束时间。格式：yyyy-MM-dd
                monStaTime: "", // 月开始时间。格式：yyyy-MM
                monEndTime: "",  // 月结束时间。格式：yyyy-MM
                bizType: ""
            },
            showNum: {
                total: "", // 累计数
                active: "", // 参与活动数
                new: "" // 新增数
            }
        }
    },
    created() {
        this.initTime();
        this.initWeeks();
        this.initBizs();
        this.search();
    },
    methods: {
        // 初始化页面时间查询组件
        initTime() {
            let _now = new Date();
            this.form.monStaTime = this.form.monEndTime = _now.Format("yyyy-MM");
            _now.setTime(_now.getTime()-24*60*60*1000);
            this.yesterday = _now.getFullYear()+"-" + (_now.getMonth()+1) + "-" + _now.getDate();
            this.form.time = [this.yesterday, this.yesterday];
        },
        // 初始化加载周数
        initWeeks() {
            this.$request.post('/record/statistics/getWeeks', {}, true, (res)=>{
                this.weeks = res||[];
                if(this.weeks.length>0) {
                    for(let i=0;i<this.weeks.length;i++) {
                        let week = this.weeks[i]; // {weekId: "201829", weekNo: "2018年第29周(2018.07.16~2018.07.22)"}
                        let weekBetween = week.weekNo.substr(week.weekNo.length-22, 21);
                        let startWeek = new Date(weekBetween.split("~")[0]).Format("yyyy-MM-dd");
                        week.startWeek = new Date(weekBetween.split("~")[0]).Format("yyyy-MM-dd");
                        week.endWeek = new Date(weekBetween.split("~")[1]).Format("yyyy-MM-dd");
                    }
                    // 默认第一个选中
                    this.form.weekStaTime = this.weeks[0].startWeek;
                    this.form.weekEndTime = this.weeks[0].endWeek;
                }
            });
        },
        // 初始化加载业态维值数据
        initBizs() {
            this.$request.post('/record/shopKeeper/getShopDownBox', {}, true, (res)=>{
                this.bizs = res || [];
                //this.bizs = [{"bizCode":"1","bizName":"食杂店"},{"bizCode":"2","bizName":"便利店"},{"bizCode":"3","bizName":"超市"},{"bizCode":"4","bizName":"商场"},{"bizCode":"5","bizName":"酒店服务"},{"bizCode":"6","bizName":"娱乐服务"},{"bizCode":"7","bizName":"其他"}];
                if(this.bizs.length>0) {
                    this.form.bizType = this.bizs[0].bizCode;
                    this.loadChart3();
                }
            });
        },
        // 获取当前查询区域的条件
        getParams() {
            let params = {statType: this.form.statType};
            if(this.form.statType=='day') {
                params.beginTime = new Date(this.form.time[0]).Format("yyyy-MM-dd");
                params.endTime = new Date(this.form.time[1]).Format("yyyy-MM-dd");
            } else if(this.form.statType=='week') {
                params.weekStaTime = this.form.weekStaTime;
                params.weekEndTime = this.form.weekEndTime;
            } else if(this.form.statType=='month') {
                params.monStaTime = this.form.monStaTime;
                params.monEndTime = this.form.monEndTime;
            }
            return params;
        },
        // 查询整个页面内容
        search() {
            this.getTotal();
            this.getActive();
            this.getNew();
            this.loadChart1();
            this.loadChart2();
            this.loadChart3();
            this.loadChart4();
            this.loadChart5();
        },
        // 加载累计零售户数
        getTotal() {
            this.$request.post('/record/shopKeeper/getShopTotalFamily', this.getParams(), true, (res)=>{
                let datas = res||[];
                //datas = [{"arriveNum":"5344"}];
                if(datas.length>0&&datas[0]) {
                    this.showNum.total = datas[0].arriveNum;
                }
            });
        },
        // 加载参与活动零售户数
        getActive() {
            this.$request.post('/record/shopKeeper/getShopActiyFamily', this.getParams(), true, (res)=>{
                let datas = res||[];
                //datas = [{"dayPart":"16"}];
                if(datas.length>0&&datas[0]) {
                    this.showNum.active = datas[0].dayPart;
                }
            });
        },
        // 加载新增零售户数
        getNew() {
            this.$request.post('/record/shopKeeper/getShopNewFamily', this.getParams(), true, (res)=>{
                let datas = res||[];
                //datas = [{"dayJoin":3879}];
                if(datas.length>0&&datas[0]) {
                    this.showNum.new = datas[0].dayJoin;
                }
            });
        },
        // 加载零售户增长趋势：线、柱图
        loadChart1() {
            this.$request.post('/record/shopKeeper/getShopGrowthTrend', this.getParams(), true, (res)=>{
                let xAxisData = []; // x轴内容数组
                let seriesData1 = []; // 累计零售户数据内容数组
                let seriesData2 = []; // 新增零售户数据内容数组
                let datas = res||[];
                //datas = [{"arriveNum":"1376","dayJoin":1376,weekNo: "201847"},{"arriveNum":"1420","dayJoin":44,"statTime":"2018-02"},{"arriveNum":"1515","dayJoin":86,"statTime":"2018-03"},{"arriveNum":"3847","dayJoin":1391,"statTime":"2018-04"},{"arriveNum":"4586","dayJoin":458,"statTime":"2018-05"},{"arriveNum":"4856","dayJoin":199,"statTime":"2018-06"},{"arriveNum":"5069","dayJoin":182,"statTime":"2018-07"},{"arriveNum":"5147","dayJoin":58,"statTime":"2018-08"},{"arriveNum":"5281","dayJoin":83,"statTime":"2018-09"},{"arriveNum":"5344","dayJoin":2,"statTime":"2018-10"}];
                for(let i=0;i<datas.length;i++) {
                    if(this.form.statType=="week") {
                        xAxisData.push(datas[i].weekNo.substr(0,4)+"第"+datas[i].weekNo.substr(4)+"周");
                    } else {
                        xAxisData.push(datas[i].statTime);
                    }
                    seriesData1.push(datas[i].arriveNum);
                    seriesData2.push(datas[i].dayJoin);
                }
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'cross', crossStyle: {color: '#999'}}
                    },
                    legend: {
                        data:['累计零售户','新增零售户']
                    },
                    xAxis: [{
                        type: 'category',
                        data: xAxisData,
                        axisPointer: {type: 'shadow'}
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {formatter: '{value}'}
                    }],
                    series: [{
                        name:'累计零售户',
                        type:'bar',
                        barWidth: 5,//柱图宽度
                        itemStyle: {normal:{color:'#44c2ed'}},
                        data: seriesData1
                    },
                    {
                        name:'新增零售户',
                        type:'line',
                        itemStyle: {normal:{color:'#ff8b23'}},
                        data: seriesData2
                    }]
                };
                var myChart = this.$echarts.init(document.getElementById('chart1'));
                myChart.setOption(option);
            });
        },
        // 加载零售户业态分别：左侧饼图
        loadChart2() {
            this.$request.post('/record/shopKeeper/getShopBizFormatPie', this.getParams(), true, (res)=>{
                let datas = res||[];
                //datas = [{"arriveNum":"1545","bizName":"便利店"},{"arriveNum":"38","bizName":"其他"},{"arriveNum":"12","bizName":"商场"},{"arriveNum":"12","bizName":"娱乐服务"},{"arriveNum":"911","bizName":"超市"},{"arriveNum":"2412","bizName":"酒店服务"},{"arriveNum":"414","bizName":"食杂店"}];
                let pieDatas = []; // 数据内容数组
                let legend = [];
                for(let i=0;i<datas.length;i++) {
                    pieDatas.push({value:datas[i].arriveNum, name:datas[i].bizName});
                    legend.push(datas[i].bizName);
                }
                let option = {
                    tooltip:{trigger:"item", formatter:"{a} <br/>{b} : {c} ({d}%)"},
                    legend:{orient:"vertical",x:"right",y:"center",padding:15,data:legend},
                    toolbox:{show:false},
                    calculable:true,
                    series: [{
                        name:'业态分布',
                        type:'pie',
                        radius : [20,110],
                        center: ["40%","50%"],
                        roseType: 'radius',
                        label: {normal:{show: false},emphasis: {show: true}},
                        lableLine: {normal:{show: false},emphasis: {show: true}},
                        //data: pieDatas.sort(function (a, b) { return a.value - b.value; }),
                        data: pieDatas
                    }]
                };
                var myChart = this.$echarts.init(document.getElementById('chart2'));
                myChart.setOption(option);
            });
        },
        // 加载零售户业态分别：右侧柱、线图
        loadChart3() {
            let params = this.getParams();
            params.bizType = this.form.bizType;
            this.$request.post('/record/shopKeeper/getShopGrowthTrendById', params, true, (res)=>{
                let xAxisData = []; // x轴内容数组
                let seriesData1 = []; // 累计零售户数据内容数组
                let seriesData2 = []; // 新增零售户数据内容数组
                let datas = res||[];
                //datas = [{"arriveNum":"1376","dayJoin":1376,"statTime":"2018-01"},{"arriveNum":"1420","dayJoin":44,"statTime":"2018-02"},{"arriveNum":"1515","dayJoin":86,"statTime":"2018-03"},{"arriveNum":"3847","dayJoin":1391,"statTime":"2018-04"},{"arriveNum":"4586","dayJoin":458,"statTime":"2018-05"},{"arriveNum":"4856","dayJoin":199,"statTime":"2018-06"},{"arriveNum":"5069","dayJoin":182,"statTime":"2018-07"},{"arriveNum":"5147","dayJoin":58,"statTime":"2018-08"},{"arriveNum":"5281","dayJoin":83,"statTime":"2018-09"},{"arriveNum":"5344","dayJoin":2,"statTime":"2018-10"}];
                for(let i=0;i<datas.length;i++) {
                    if(this.form.statType=="week") {
                        xAxisData.push(datas[i].weekNo.substr(0,4)+"第"+datas[i].weekNo.substr(4)+"周");
                    } else {
                        xAxisData.push(datas[i].statTime);
                    }
                    seriesData1.push(datas[i].arriveNum);
                    seriesData2.push(datas[i].dayJoin);
                }
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'cross', crossStyle: {color: '#999'}}
                    },
                    legend: {
                        x:"right",
                        data:['累计零售户','新增零售户']
                    },
                    xAxis: [{
                        type: 'category',
                        data: xAxisData,
                        axisPointer: {type: 'shadow'}
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {formatter: '{value}'}
                    }],
                    series: [{
                        name:'累计零售户',
                        type:'bar',
                        barWidth: 5,//柱图宽度
                        itemStyle: {normal:{color:'#44c2ed'}},
                        data: seriesData1
                    },
                    {
                        name:'新增零售户',
                        type:'line',
                        itemStyle: {normal:{color:'#ff8b23'}},
                        data: seriesData2
                    }]
                };
                var myChart = this.$echarts.init(document.getElementById('chart3'));
                myChart.setOption(option);
            });
        },
        // 加载零售户省内外分布
        loadChart4() {
            this.$request.post('/record/shopKeeper/getShopInoutProvPie', this.getParams(), true, (res)=>{
                let datas = res||[];
                //datas = [{"arriveNum":"5319","saleZone":"省内"},{"arriveNum":"25","saleZone":"省外"}];
                let pieDatas = []; // 数据内容数组
                for(let i=0;i<datas.length;i++) {
                    pieDatas.push({value:datas[i].arriveNum, name:datas[i].saleZone});
                }
                let option = {
                    color:["#ffce23","#77d7f7"],
                    tooltip:{"trigger":"item","formatter":"{a} <br/>{b}: {c} ({d}%)"},
                    series:[{
                        name:"省内外分布",
                        type:"pie",
                        radius:["30%","70%"],
                        avoidLabelOverlap:false,
                        data:pieDatas
                    }]
                };
                var myChart = this.$echarts.init(document.getElementById('chart4'));
                myChart.setOption(option);
            });
        },
        // 加载零售户城乡分布
        loadChart5() {
            this.$request.post('/record/shopKeeper/getShopInoutCityPie', this.getParams(), true, (res)=>{
                let datas = res||[];
                //datas = [{"arriveNum":"5206","cityClass":"城镇"},{"arriveNum":"138","cityClass":"乡村"}];
                let pieDatas = []; // 数据内容数组
                for(let i=0;i<datas.length;i++) {
                    pieDatas.push({value:datas[i].arriveNum, name:datas[i].cityClass});
                }
                let option = {
                    color:["#ffce23","#77d7f7"],
                    tooltip:{"trigger":"item","formatter":"{a} <br/>{b}: {c} ({d}%)"},
                    series:[{
                        name:"城乡分布",
                        type:"pie",
                        radius:["30%","70%"],
                        avoidLabelOverlap:false,
                        data:pieDatas
                    }]
                };
                var myChart = this.$echarts.init(document.getElementById('chart5'));
                myChart.setOption(option);
            });
        }
    }
}
</script>
<style scoped>
    .space {position:relative;width:100%;height:20px;}
    .mycust-sel {
        width: 150px;
    }
    .split {
        padding: 0px 10px;
    }
    .the-time {
        width: 220px;
    }

    .panel-body {
        font-family: 'Open Sans',"Helvetica Neue",Helvetica,Arial,sans-serif;
        color: #707478;
        font-size: 12px;
        padding: 15px;
        font-weight: normal;
    }
    .ui-detail-box {
        display: flex;
        justify-content: space-around;
    }
    .ui-detail-box>div {
        height: 80px;
        width: 200px;
        border: 1px solid #ddd;
    }
    .ui-detail-box .box {
        height: 100%;
        display: inline-block;
        width: calc(100% - 90px);
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        padding: 10px;
        float: left;
    }
    .ui-detail-box em {
        font-style: normal;
        font-size: 26px;
        color: #44c2ed;
    }
    .ui-detail-box img {
        height: 50px;
        width: 50px;
        margin: 15px 0;
        float: left;
    }

    .panel-body .title {
        font-size: 18px;
        color: #3d467d;
        line-height: 40px;
    }

    .myecharts {
        width: 100%;
        height: 350px;
    }

    .half-inline {
        display:inline-block;
        width: 48%;
    }
    .biz-sel .el-input__inner {
        height:30px;
    }
</style>