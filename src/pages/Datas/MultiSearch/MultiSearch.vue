<template>
	<div class="multi-root">
		<div class="search-condition">
			<div class="title" @click='toggleShow'>查询条件&nbsp;<span :class='{"el-icon-caret-bottom":true,active:!conditionShow}'></span></div>
			<div class="condition-con" v-show='conditionShow'>
				<div class="inputs">
					查询时间：
					<el-date-picker v-model="startDate"format="yyyy-MM-dd" type="date" placeholder="选择日期" size='small'@change='selectStartDay' :clearable="false">
					</el-date-picker>
					<!--<el-time-select v-model="startTime" size='small' :picker-options="{start: '00:00',step: '01:00',end: '23:59'}" @change="selectTime" placeholder="选择时间" :clearable="false">
					</el-time-select>-->
					<span>~</span>
					<el-date-picker v-model="endDate" type="date" placeholder="选择日期" size='small'@change='selectEndDay' :clearable="false">
					</el-date-picker>
					<!--<el-time-select v-model="endTime" size='small' :picker-options="{start: '00:00',step: '01:00',end: '23:59'}" @click="selectTime" placeholder="选择时间" :clearable="false">
					</el-time-select>-->
					<br /><br />
					品牌：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<el-select v-model="brand" multiple filterable placeholder="请选择" size='small'>
						<el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					规格：
					<el-select v-model="spec" multiple filterable placeholder="请选择" size='small' @focus='getSpec()'>
						<el-option v-for="item in specList" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					包装：
					<el-select v-model="packing" multiple filterable placeholder="请选择" size='small'>
						<el-option v-for="item in packList" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
					<br /><br />
					销区：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<el-select v-model="area" multiple filterable placeholder="请选择" size='small'>
						<el-option v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					省份：
					<el-select v-model="pro" multiple filterable placeholder="请选择" size='small'@focus='getPro'>
						<el-option v-for="item in proList" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					城市：
					<el-select v-model="city" multiple filterable placeholder="请选择" size='small'@focus='getCity'>
						<el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityName">
						</el-option>
					</el-select>
					<br /><br />
					<span  v-show="displayInOut==1">区县：</span>
					<el-select v-model="county" v-show="displayInOut==1" multiple filterable placeholder="请选择" size='small'@focus='getCounty'>
						<el-option v-for="item in countyList" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</div>
				<div class="search-result">
					查询结果：
					<el-tag type="info">{{transformStart}}</el-tag>
					<el-tag type="info">{{transformEnd}}</el-tag>
					<el-tag type="info"v-show='brand.length!=0'closable @close="handleClose(0)">{{transformBrand}}</el-tag>
					<el-tag type="info"v-show='spec.length!=0'closable @close="handleClose(1)">{{transformSpec}}</el-tag>
					<el-tag type="info"v-show='packing.length!=0'closable @close="handleClose(2)">{{transformPack}}</el-tag>
					<el-tag type="info"v-show='area.length!=0'closable @close="handleClose(3)">{{transformAreaShow}}</el-tag>
					<el-tag type="info"v-show='pro.length!=0'closable @close="handleClose(4)">{{transformPro}}</el-tag>
					<el-tag type="info"v-show='city.length!=0'closable @close="handleClose(5)">{{transformCity}}</el-tag>
					<el-tag type="info"v-show='county.length!=0'closable @close="handleClose(6)">{{transformCounty}}</el-tag>
				</div>
				<div class="search-oper">
					<div class="oper-btn">
						<el-button type="primary"size='small' round @click='search'>查询</el-button>
					</div>
					<div class="oper-btn">
						<el-button type="primary"size='small' round @click='saveTpl'>保存</el-button>
					</div>
					<div class="oper-btn">
						<el-button type="primary"size='small' round @click="load">载入</el-button>
						<el-dialog title="模板选择":visible.sync="dialogTableVisible">
							<div class="tpl-con">
								<el-radio-group v-model="loadValue"@change='tplChange'>
									<el-radio v-for='(item,key) in loadList' :label="key":key='key'>
										<span>{{item.startTime}}+</span>
										<span>{{item.endTime}}</span>
										<span>+{{item.productBrand}}</span>
										<span>+{{item.productName}}</span>
										<span v-show='item.productPack.length!=0'>+{{item.productPack}}</span>
										<span v-show='item.saleZone.length!=0'>+{{transformAreaCommon(item.saleZone)}}</span>
										<span>+{{item.provinceName}}</span>
										<span v-show='item.cityName.length!=0'>+{{item.cityName}}</span>
										<template v-if="item.countyName">
											<span v-show='item.countyName.length!=0'>+{{item.countyName}}</span>
										</template>

									</el-radio>
								</el-radio-group>
							</div>
						</el-dialog>
					</div>
					<div class="oper-btn">
						<el-button type="primary"size='small' round @click="getHistory">历史</el-button>
						<el-dialog title="历史选择":visible.sync="dialogTableVisible1">
							<div class="tpl-con">
								<el-radio-group v-model="historyValue"@change='hisChange'>
									<el-radio v-for='(item,key) in historyList' :label="key":key='key'>
										<span>{{item.startTime}}+</span>
										<span>{{item.endTime}}</span>
										<span>+{{item.productBrand}}</span>
										<span>+{{item.productName}}</span>
										<span v-show='item.productPack.length!=0'>+{{item.productPack}}</span>
										<span v-show='item.saleZone.length!=0'>+{{transformAreaCommon(item.saleZone)}}</span>
										<span>+{{item.provinceName}}</span>
										<span v-show='item.cityName.length!=0'>+{{item.cityName}}</span>
										<template v-if="item.countyName">
											<span v-show='item.countyName.length!=0'>+{{item.countyName}}</span>
										</template>
									</el-radio>
								</el-radio-group>
							</div>
						</el-dialog>
					</div>
					<div class="oper-btn">
						<el-button type="primary"size='small' round @click='exportExcel'>导出</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="result-part">
			<div class="result-tab">
				<ul>
					<li v-for='(item,key) in tabList':class='{active:tabActive==key}'@click='itemSearch(key)'>{{item}}</li>
				</ul>
			</div>
			<div class="result-table" >
				<el-table :data="tableData"v-loading="loading" style="width: 100%" v-if="selectTab==1" >
					<el-table-column prop="startTime" label="开始时间" width="200">
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间" width="200">
					</el-table-column>
					<el-table-column prop="productBrand" label="品牌" width="120">
					</el-table-column>
					<el-table-column prop="productName" label="规格" width="150">
					</el-table-column>
					<el-table-column prop="productPack" label="包装" width="120">
					</el-table-column>
					<el-table-column prop="saleZone" label="销区" width="200">
					</el-table-column>
					<el-table-column prop="provinceName" label="省" width="100">
					</el-table-column>
					<el-table-column prop="cityName" label="市" width="100">
					</el-table-column>
					<el-table-column prop="streetName" label="区县" width="100">
					</el-table-column>
					<el-table-column prop="scanPv" label="扫码次数" width="100">
					</el-table-column>
					<el-table-column prop="effectScanPv" label="扫码烟包数" width="100">
					</el-table-column>
					<el-table-column prop="scanUv" label="扫码用户数" width="100">
					</el-table-column>
					<el-table-column prop="newScanUv" label="新增扫码用户数" width="200">
					</el-table-column>
					<el-table-column prop="drawPv" label="中奖人次" width="100">
					</el-table-column>
					<el-table-column prop="acptPv" label="领奖人次" width="100">
					</el-table-column>
					<el-table-column prop="drawUv" label="中奖用户数" width="100">
					</el-table-column>
					<el-table-column prop="drawUv" label="领奖用户数" width="100">
					</el-table-column>
					<el-table-column prop="redpacketCost" label="中奖红包总额（元）" width="100">
					</el-table-column>
					<el-table-column prop="acptRedpCost" label="领奖红包总额（元）" width="100">
					</el-table-column>
					<el-table-column prop="scoreValue" label="中奖积分总额（分）" width="100">
					</el-table-column>
					<el-table-column prop="acptScoreValue" label="领奖积分总额（分）" width="100">
					</el-table-column>
					<el-table-column prop="salePromotionCost" label="中奖实物奖品总额（元）" width="100">
					</el-table-column>
					<el-table-column prop="acptSalePromCost" label="领奖实物奖品总额（元）" width="100">
					</el-table-column>
				</el-table>
				<el-table :data="tableData2"v-loading="loading" style="width: 100%" v-if="selectTab==2" >
					<el-table-column prop="startTime" label="开始时间" width="200">
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间" width="200">
					</el-table-column>
					<el-table-column prop="productBrand" label="品牌" width="120">
					</el-table-column>
					<el-table-column prop="productName" label="规格" width="150">
					</el-table-column>
					<el-table-column prop="productPack" label="包装" width="120">
					</el-table-column>
					<el-table-column prop="saleZone" label="销区" width="200">
					</el-table-column>
					<el-table-column prop="provinceName" label="省" width="100">
					</el-table-column>
					<el-table-column prop="cityName" label="市" width="100">
					</el-table-column>
					<el-table-column prop="streetName" label="区县" width="100">
					</el-table-column>
					<el-table-column prop="activeCost" label="活动成本" width="100">
					</el-table-column>
					<el-table-column prop="saomalv" label="扫码率" width="100">
					</el-table-column>
					<el-table-column prop="zhongjianglv" label="中奖率" width="100">
					</el-table-column>
					<el-table-column prop="zhongjiangmian" label="中奖面" width="200">
					</el-table-column>
					<el-table-column prop="rjyouxiaosaomacishu" label="人均扫码烟包数" width="100">
					</el-table-column>
					<el-table-column prop="rjzhongjiangcishu" label="人均中奖次数" width="100">
					</el-table-column>
					<el-table-column prop="rjlingjiangcishu" label="人均领奖次数" width="100">
					</el-table-column>
					<el-table-column prop="juncicuxiaochengben" label="均次促销成本" width="100">
					</el-table-column>
					<el-table-column prop="rjcuxiaochengben" label="人均促销成本" width="100">
					</el-table-column>
					<!--	<el-table-column prop="juncicuxiaolidu" label="均次促销力度" width="100">
                        </el-table-column>
                        <el-table-column prop="lingshoufeixiaobi" label="零售费效比" width="100">
                        </el-table-column>-->
				</el-table>
				<el-table :data="tableData3"v-loading="loading" style="width: 100%" v-if="selectTab==3" >
					<el-table-column prop="startTime" label="开始时间" width="200">
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间" width="200">
					</el-table-column>
					<el-table-column prop="productBrand" label="品牌" width="120">
					</el-table-column>
					<el-table-column prop="productName" label="规格" width="150">
					</el-table-column>
					<el-table-column prop="productPack" label="包装" width="120">
					</el-table-column>
					<el-table-column prop="saleZone" label="销区" width="200">
					</el-table-column>
					<el-table-column prop="provinceName" label="省" width="100">
					</el-table-column>
					<el-table-column prop="cityName" label="市" width="100">
					</el-table-column>
					<el-table-column prop="streetName" label="区县" width="100">
					</el-table-column>
					<el-table-column prop="awardName" label="奖品名称" width="100">
					</el-table-column>
					<el-table-column prop="awardCnt" label="中奖数量" width="100">
					</el-table-column>
					<el-table-column prop="awardFee" label="中奖金额" width="100">
					</el-table-column>
					<el-table-column prop="acptAwardCnt" label="领奖数量" width="100">
					</el-table-column>
					<el-table-column prop="acptAwardFee" label="领奖金额" width="100">
					</el-table-column>
				</el-table>
				<el-table :data="tableData4"v-loading="loading" style="width: 100%" v-if="selectTab==4" >
					<el-table-column prop="startTime" label="开始时间" width="200">
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间" width="200">
					</el-table-column>
					<el-table-column prop="productBrand" label="品牌" width="120">
					</el-table-column>
					<el-table-column prop="productName" label="规格" width="150">
					</el-table-column>
					<el-table-column prop="productPack" label="包装" width="120">
					</el-table-column>
					<el-table-column prop="saleZone" label="销区" width="200">
					</el-table-column>
					<el-table-column prop="provinceName" label="省" width="100">
					</el-table-column>
					<el-table-column prop="cityName" label="市" width="100">
					</el-table-column>
					<el-table-column prop="streetName" label="区县" width="100">
					</el-table-column>
					<el-table-column prop="awardName" label="奖品名称" width="100">
					</el-table-column>
					<el-table-column prop="awardPice" label="奖品价格" width="100">
					</el-table-column>
					<el-table-column prop="awardCnt" label="中奖数量" width="100">
					</el-table-column>
					<el-table-column prop="awardFee" label="中奖金额" width="100">
					</el-table-column>
					<el-table-column prop="acptAwardCnt" label="领奖数量" width="100">
					</el-table-column>
					<el-table-column prop="acptAwardFee" label="领奖金额" width="100">
					</el-table-column>
				</el-table>
				<el-table :data="tableData5"v-loading="loading" style="width: 100%" v-if="selectTab==5" >
					<el-table-column prop="startTime" label="开始时间" width="200">
					</el-table-column>
					<el-table-column prop="endTime" label="结束时间" width="200">
					</el-table-column>
					<el-table-column prop="productBrand" label="品牌" width="120">
					</el-table-column>
					<el-table-column prop="productName" label="规格" width="150">
					</el-table-column>
					<el-table-column prop="productPack" label="包装" width="120">
					</el-table-column>
					<el-table-column prop="saleZone" label="销区" width="200">
					</el-table-column>
					<el-table-column prop="provinceName" label="省" width="100">
					</el-table-column>
					<el-table-column prop="cityName" label="市" width="100">
					</el-table-column>
					<el-table-column prop="streetName" label="区县" width="100">
					</el-table-column>
					<el-table-column prop="awardName" label="奖品名称" width="100">
					</el-table-column>
					<el-table-column prop="awardCnt" label="中奖数量" width="100">
					</el-table-column>
					<el-table-column prop="awardFee" label="中奖金额" width="100">
					</el-table-column>
					<el-table-column prop="acptAwardCnt" label="领奖数量" width="100">
					</el-table-column>
					<el-table-column prop="acptAwardFee" label="领奖金额" width="100">
					</el-table-column>
				</el-table>
			</div>
		</div>

	</div>
</template>

<script>
    import '@/common/js/dateFormat.js';
    let userInfo=JSON.stringify(sessionStorage.getItem('cluser'));
    export default {
        data() {
            return {
                selectTab:1,
                displayInOut:1,
                startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd'),//开始日期
                startTime: '00:00',//开始时间
                endDate: new Date().Format('yyyy-MM-dd'),//结束日期
                endTime: '00:00',//结束时间
                conditionShow: true,//查询条件是否显示的标志位
                brand: [],//选中的品牌列表
                brandList: [],//品牌列表
                spec: [],//选中的规格列表
                specList: [],//规格列表
                packing:[],//选中的包装列表
                packList:[{name:'盒'},{name:'条'}],//包装列表
                area:[],//选中的销区
                areaList:[],//销区列表
                pro:[],//选中的省份列表
                proList:[],//省份列表,
                city:[],//选中的城市列表
                cityList:[],//城市列表，
                county:[],//选中的区县列表
                countyList:[],//区县列表，
                dialogTableVisible: false,//载入弹框显示标志位
                dialogTableVisible1: false,//历史弹框显示标志位
                loadValue:-1,//载入模板中选的值的索引
                historyValue:-1,//历史模板中选的值的索引
                loadList:[],//载入模板列表
                historyList:[],//历史模板列表
                tabActive:0,//tab栏中样式标识符
                tabList:['扫码数据','成本数据','现金红包数据','实物奖励数据','积分数据'],//tab栏列表
                loading:true,//table的加载样式
                tableData:[],//扫码表格数据
                tableData2:[],//成本表格数据
                tableData3:[],//红包表格数据
                tableData4:[],//实物表格数据
                tableData5:[],//积分表格数据
                startDateTime: new Date().getTime() - 24 * 60 * 60 * 1000,
                endDateTime: new Date().getTime(),
            };
        },
        mounted() {
            this.getProvInout();
            this.getBrand();
            this.getArea();
            var that=this;
            var inter=setInterval(()=>{
                if(that.brand.length!=0){
                    this.itemSearch(0);
                    clearInterval(inter);
                    inter=null;
                }
            },10)

        },
        computed:{
            transformStart(){
                // var str=this.startDate+'_'+this.startTime.substr(0,2);
                var str=this.startDate;
                return str;
            },
            transformEnd(){
                // var str=this.endDate+'_'+this.endTime.substr(0,2);
                var str=this.endDate;
                return str;
            },
            transformBrand(){
                var str='';
                if(this.brand.length!=0){
                    str=this.brand.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformSpec(){
                var str='';
                if(this.spec.length!=0){
                    str=this.spec.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformPack(){
                var str='';
                if(this.packing.length!=0){
                    str=this.packing.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformAreaShow(){
                if(this.area.length!=0){
                    var c=this.area;
                    let obj = [];
                    c.forEach((val,i)=>{
                        obj.push(this.areaList.find((item)=>{//这里的userList就是上面遍历的数据源
                            return item.code == val;//筛选出匹配数据
                        }).name) ;
                    })
                    return obj.join(',')
                }else {
                    return '';
                }


                console.log(obj);//我这边的name就是对应label的
            },
            transformArea(){
                var str='';
                if(this.area.length!=0){
                    str=this.area.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformPro(){
                var str='';
                if(this.pro.length!=0){
                    str=this.pro.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformCity(){
                var str='';
                if(this.city.length!=0){
                    str=this.city.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformCounty(){
                var str='';
                if(this.county.length!=0){
                    str=this.county.join(',')
                }else {
                    str=''
                }
                return str;
            },
            transformAreaCommon(){
                var that=this;
                return function(str){
                    if(str.length!=0){
                        let tempArr=str.split(',');
                        let obj = [];
                        tempArr.forEach((val)=>{
                            obj.push(that.areaList.find((item)=>{//这里的userList就是上面遍历的数据源
                                return item.code == val;//筛选出匹配数据
                            }).name) ;
                        })
                        return obj.join(',')
                    }else {
                        return '';
                    }
                }
            }

        },
        methods: {
            //判断省内省外
            getProvInout(){
                var that = this;
                this.$request.post(
                    '/record/public/getDefaultProvInout', {},
                    true,
                    res => {
                        var data = res || [];
                        if(data.length != 0) {
                            this.displayInOut=data[0].code;
                        }
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            selectStartDay(day) {//日期格式化
                this.startDateTime =  day.getTime()
                if(this.endDateTime<this.startDateTime){
                    alert("结束时间不能小于开始时间")
                    this.startDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd')
                    this.startDateTime =  new Date().getTime() - 24 * 60 * 60 * 1000
                }else{
                    this.startDate = day.Format('yyyy-MM-dd');
                }
                this.selectTime()
            },
            selectTime(){
                if(this.startDate == this.endDate){
                    let st = this.startTime.split(":")[0] - ""
                    let et = this.endTime.split(":")[0] - ""
                    if(st>et){
                        alert("结束时间不能小于开始时间")
                        this.startTime = "00:00"
                        this.endTime = "00:00"
                    }
                }
            },

            selectEndDay(day) {
                this.endDateTime = day.getTime()
                if(this.endDateTime<this.startDateTime){
                    alert("结束时间不能小于开始时间")
                    this.endDate = new Date().Format('yyyy-MM-dd')
                    this.endDateTime =  new Date().getTime()
                }else {
                    this.endDate = day.Format('yyyy-MM-dd');
                }
                this.selectTime()
            },
            toggleShow() {//查询部分的隐藏和显示切换
                if(this.conditionShow) {
                    this.conditionShow = false;
                } else {
                    this.conditionShow = true;
                }
            },
            getBrand() {//获取品牌数据
                var that = this;
                this.$request.post(
                    '/record/public/getUserBrandByUserId', {

                    },
                    true,
                    res => {
                        var data = res || [];
                        that.brandList = data;
                        if(data.length != 0) {
                            that.brand.push(data[0].name);
                        }

                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            getSpec(flag) {//获取规格数据
                var that = this;
                var params = that.brand.join(',');
                this.$request.post(
                    '/record/statistics/getProductOfNoNuit', {
                        productBrand:params
                    },
                    true,
                    res => {
                        var data = res || [];
                        that.specList = data;

                    },
                    err => {
                        console.log(err)
                    }
                )

            },
            getArea(){//获取销区数据
                var that = this;
                this.$request.post(
                    '/record/public/getUserSaleByUserId', {
                    },
                    true,
                    res => {
                        var data = res || [];
//						data=[{"code":"BJ","name":"北京大区"},{"code":"DB","name":"东北大区"},{"code":"DN","name":"东南大区"},{"code":"GXYN","name":"广西云南大区"},{"code":"HD","name":"华东大区"},{"code":"HN","name":"华南大区"},{"code":"HNHB","name":"河南湖北大区"},{"code":"NM","name":"内蒙大区"},{"code":"O","name":"其他"},{"code":"Q","name":"全国"},{"code":"SD","name":"山东大区"},{"code":"SN","name":"省内销区"},{"code":"SX","name":"山西大区"},{"code":"TJ","name":"天津大区"},{"code":"XB","name":"西北大区"},{"code":"XN","name":"西南大区"}];
                        that.areaList = data;

                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            getPro(){//获取省份数据
                var that = this;
                if(that.area.length!=0){
                    var params=that.area.join(',')
                }else {
                    var params='';
                }
                this.$request.post(
                    '/record/public/getUserProvByUserId', {
                        saleZone:params
                    },
                    true,
                    res => {
                        var data = res || [];
                        that.proList = data;

                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            getCity(){//获取城市数据
                var that = this;
                if(that.pro.length!=0){
                    var params=that.pro.join(',')
                }else {
                    var params='';
                }
                this.$request.post(
                    '/record/statistics/getCitysByProvince', {
                        provinceName:params
                    },
                    true,
                    res => {
                        var data = res || [];
                        that.cityList = data;

                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            getCounty(){//获取区县数据
                var that = this;
                if(that.city.length!=0){
                    var params=that.city.join(',')
                }else {
                    var params='';
                }
                this.$request.post(
                    '/record/public/getUserCountyByUserId', {
                        cityName:params
                    },
                    true,
                    res => {
                        var data = res || [];
                        that.countyList = data;

                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            saveTpl(){//手动保存查询条件
                var that = this;
                var specName='所有';
                var proName='合计';
                var ctName='合计';
                var cyName='合计';
                if(that.transformSpec.length!=0){
                    specName=that.transformSpec;
                }
                if(that.transformPro.length!=0){
                    proName=that.transformPro;
                }
                if(that.transformCity.length!=0){
                    ctName=that.transformCity;
                }
                if(that.transformCounty.length!=0){
                    cyName=that.transformCounty;
                }
                this.$request.post(
                    '/record/statistics/saveQueryRecord', {
                        cityName:ctName,
                        ctime:new Date().getTime(),
                        startTime:that.transformStart,
                        endTime:that.transformEnd,
                        opType:1,
                        productBrand:that.transformBrand,
                        productName:specName,
                        productPack:that.transformPack,
                        provinceName:proName,
                        saleZone:that.transformArea,
                        countyName:cyName
                    },
                    true,
                    res => {
                        if(res==1){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            load(){//载入查询条件
                var that=this;
                that.dialogTableVisible = true
                this.$request.post(
                    '/record/statistics/getQueryRecord', {
                        userId:userInfo.account,
                        opType:1
                    },
                    true,
                    res => {
                        var data=res || [];
                        that.loadList=data;
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            tplChange(){//选择查询条件后使用查询条件
                this.dialogTableVisible = false;
                let index=this.loadValue;
                let arr=this.loadList;
                this.startDate=arr[index].startTime.substr(0,10);
                this.endDate=arr[index].endTime.substr(0,10);
                this.startTime=arr[index].startTime.substr(11,2);
                this.endTime=arr[index].endTime.substr(11,2);
                this.brand=arr[index].productBrand.split(',');
                this.spec=arr[index].productName=='所有'?[]:arr[index].productName.split(',');
                this.packing=arr[index].productPack==''?[]:arr[index].productPack.split(',');
                this.area=arr[index].saleZone==''?[]:arr[index].saleZone.split(',');
                this.pro=arr[index].provinceName=='合计'?[]:arr[index].provinceName.split(',');
                this.city=arr[index].cityName=='合计'?[]:arr[index].cityName.split(',');
								this.county=arr[index].countyName?(arr[index].countyName=='合计'?[]:arr[index].countyName.split(',')):'';
            },
            search(){//点击查询按钮，将查询条件保存到历史数据中，并获取查询结果数据
                var that = this;
                var specName='所有';
                var proName='合计';
                var ctName='合计';
                var cyName='合计';
                if(that.transformSpec.length!=0){
                    specName=that.transformSpec;
                }
                if(that.transformPro.length!=0){
                    proName=that.transformPro;
                }
                if(that.transformCity.length!=0){
                    ctName=that.transformCity;
                }
                if(that.transformCounty.length!=0){
                    cyName=that.transformCounty;
                }
                this.$request.post(
                    '/record/statistics/saveQueryRecord', {
                        cityName:ctName,
                        ctime:new Date().getTime(),
                        startTime:that.transformStart,
                        endTime:that.transformEnd,
                        opType:2,
                        productBrand:that.transformBrand,
                        productName:specName,
                        productPack:that.transformPack,
                        provinceName:proName,
                        saleZone:that.transformArea,
                        userId:userInfo.account,
                        countyName:cyName
                    },
                    true,
                    res => {
                        if(res==1){
                            console.log('记入历史成功')
                        }
                    },
                    err => {
                        console.log(err)
                    }
                )
                this.itemSearch(this.tabActive)
            },
            getHistory(){//获取历史查询条件数据
                this.dialogTableVisible1 = true;
                var that=this;
                this.$request.post(
                    '/record/statistics/getQueryRecord', {
                        userId:userInfo.account,
                        opType:2
                    },
                    true,
                    res => {
                        var data=res || [];
                        that.historyList=data;
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            hisChange(){//选择历史查询数据后进行查询
                this.dialogTableVisible1 = false;
                let index=this.historyValue;
                let arr=this.historyList;
                this.startDate=arr[index].startTime.substr(0,10);
                this.endDate=arr[index].endTime.substr(0,10);
                this.startTime=arr[index].startTime.substr(11,2);
                this.endTime=arr[index].endTime.substr(11,2);
                this.brand=arr[index].productBrand.split(',');
                this.spec=arr[index].productName=='所有'?[]:arr[index].productName.split(',');
                this.packing=arr[index].productPack==''?[]:arr[index].productPack.split(',');
                this.area=arr[index].saleZone==''?[]:arr[index].saleZone.split(',');
                this.pro=arr[index].provinceName=='合计'?[]:arr[index].provinceName.split(',');
                this.city=arr[index].cityName=='合计'?[]:arr[index].cityName.split(',');
                this.county=arr[index].countyName?(arr[index].countyName=='合计'?[]:arr[index].countyName.split(',')):'';
            },
            itemSearch(index){//点击相应的类型获取相应的查询结果
                this.loading=true;
                this.tabActive=index;
                let url='';
                var that=this;
                if(index==0){
                    this.selectTab=1;
                    url='getMultiScanData'
                }else if(index==1){
                    this.selectTab=2;
                    url='getMultiKPIData'
                }else if(index==2){
                    this.selectTab=3;
                    url='getMultiCashData'
                }else if(index==3){
                    this.selectTab=4;
                    url='getMultiGoodData'
                }else if(index==4){//增加积分
                    this.selectTab=5;
                    url='getMultiScoreData'
                }
                var specName='所有';
                var proName='合计';
                var ctName='合计';
                var cyName='合计';
                if(that.transformSpec.length!=0){
                    specName=that.transformSpec;
                }
                if(that.transformPro.length!=0){
                    proName=that.transformPro;
                }
                if(that.transformCity.length!=0){
                    ctName=that.transformCity;
                }
                if(that.transformCounty.length!=0){
                    cyName=that.transformCounty;
                }
                this.$request.post(
                    '/record/statistics/'+url, {
                        cityName:ctName,
                        ctime:new Date().getTime(),
                        startTime:that.transformStart,
                        endTime:that.transformEnd,
                        opType:2,
                        productBrand:that.transformBrand,
                        productName:specName,
                        productPack:that.transformPack,
                        provinceName:proName,
                        saleZone:that.transformArea,
                        userId:userInfo.account,
                        countyName:cyName
                    },
                    true,
                    res => {
                        var data=res || [];
                        that.loading=false;
//						data=[{"cityName":"合计","drawPv":41,"drawUv":37,"effectScanPv":48,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":22,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"东北大区","saomalv":0,"scanPv":65,"scanUv":46,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":28,"drawUv":28,"effectScanPv":34,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":19,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"东南大区","saomalv":0,"scanPv":48,"scanUv":38,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":11361,"drawUv":7726,"effectScanPv":12092,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":2125,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":1.0800,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"全国","saomalv":0,"scanPv":15860,"scanUv":9097,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":57,"drawUv":56,"effectScanPv":75,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":25,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"内蒙大区","saomalv":0,"scanPv":105,"scanUv":81,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":56,"drawUv":49,"effectScanPv":74,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":30,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"北京大区","saomalv":0,"scanPv":98,"scanUv":73,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":38,"drawUv":36,"effectScanPv":50,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":25,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"华东大区","saomalv":0,"scanPv":62,"scanUv":51,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":210,"drawUv":201,"effectScanPv":233,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":112,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"华南大区","saomalv":0,"scanPv":280,"scanUv":238,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":18,"drawUv":16,"effectScanPv":31,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":18,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"天津大区","saomalv":0,"scanPv":40,"scanUv":29,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":36,"drawUv":22,"effectScanPv":37,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":16,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"山东大区","saomalv":0,"scanPv":47,"scanUv":25,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":95,"drawUv":87,"effectScanPv":111,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":49,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"山西大区","saomalv":0,"scanPv":154,"scanUv":125,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":12,"drawUv":12,"effectScanPv":24,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":18,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"广西云南大区","saomalv":0,"scanPv":42,"scanUv":27,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":26,"drawUv":24,"effectScanPv":33,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":21,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"河南湖北大区","saomalv":0,"scanPv":45,"scanUv":33,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":10687,"drawUv":7108,"effectScanPv":11267,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":1743,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":1.0800,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"省内销区","saomalv":0,"scanPv":14777,"scanUv":8289,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":13,"drawUv":13,"effectScanPv":25,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":19,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"西北大区","saomalv":0,"scanPv":33,"scanUv":28,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":43,"drawUv":40,"effectScanPv":50,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":23,"productBrand":"钻石","productName":"所有","productPack":"条","provinceName":"合计","redpacketCost":0.0000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"西南大区","saomalv":0,"scanPv":64,"scanUv":51,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":290,"drawUv":265,"effectScanPv":560,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":228,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":226.8800,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"东北大区","saomalv":0,"scanPv":757,"scanUv":530,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":901,"drawUv":825,"effectScanPv":1623,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":1055,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":150.7400,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"东南大区","saomalv":0,"scanPv":2093,"scanUv":1571,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":59066,"drawUv":50434,"effectScanPv":136347,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":21831,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":33756.9800,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"全国","saomalv":0,"scanPv":179537,"scanUv":114204,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":635,"drawUv":558,"effectScanPv":1191,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":324,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":426.5600,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"内蒙大区","saomalv":0,"scanPv":1593,"scanUv":1086,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":583,"drawUv":530,"effectScanPv":1328,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":410,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":333.6000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"北京大区","saomalv":0,"scanPv":1644,"scanUv":1225,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":436,"drawUv":340,"effectScanPv":954,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":350,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":228.6400,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"华东大区","saomalv":0,"scanPv":1246,"scanUv":769,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":3124,"drawUv":2928,"effectScanPv":5254,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":2936,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":628.2200,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"华南大区","saomalv":0,"scanPv":6500,"scanUv":5114,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":266,"drawUv":181,"effectScanPv":517,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":204,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":101.8000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"天津大区","saomalv":0,"scanPv":644,"scanUv":438,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":255,"drawUv":224,"effectScanPv":692,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":300,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":157.3600,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"山东大区","saomalv":0,"scanPv":955,"scanUv":622,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":1054,"drawUv":729,"effectScanPv":1768,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":503,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":471.7800,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"山西大区","saomalv":0,"scanPv":2348,"scanUv":1447,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":126,"drawUv":108,"effectScanPv":315,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":184,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":62.3800,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"广西云南大区","saomalv":0,"scanPv":392,"scanUv":300,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":351,"drawUv":335,"effectScanPv":706,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":508,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":99.7000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"河南湖北大区","saomalv":0,"scanPv":956,"scanUv":729,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":50308,"drawUv":42869,"effectScanPv":120064,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":14420,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":30637.9200,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"省内销区","saomalv":0,"scanPv":158714,"scanUv":99895,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":143,"drawUv":128,"effectScanPv":420,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":226,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":87.7000,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"西北大区","saomalv":0,"scanPv":546,"scanUv":385,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0},{"cityName":"合计","drawPv":576,"drawUv":461,"effectScanPv":937,"endTime":"2018-10-30_00","juncicuxiaochengben":0,"juncicuxiaolidu":0,"lingshoufeixiaobi":0,"newScanUv":433,"productBrand":"钻石","productName":"所有","productPack":"盒","provinceName":"合计","redpacketCost":141.5400,"rjcuxiaochengben":0,"rjyouxiaosaomacishu":0,"rjzhongjiangcishu":0,"salePromotionCost":0.0000,"saleZone":"西南大区","saomalv":0,"scanPv":1126,"scanUv":797,"startTime":"2018-10-29_00","zhongjianglv":0,"zhongjiangmian":0}]
                        data.forEach((item)=>{
                            item.startTime=item.startTime.substr(0,10)+' '+item.startTime.substr(11,2);
                            item.endTime=item.endTime.substr(0,10)+' '+item.endTime.substr(11,2);

                        })
                        if(index==0){

                            that.tableData=data;
                        }else if(index==1){
                            that.tableData2=data;
                        }else if(index==2){
                            that.tableData3=data;
                        }else if(index==3){
                            that.tableData4=data;
                        }else if(index==4){
                            that.tableData5=data;
                        }

                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            handleClose(tag){//查询结果中点击关闭按钮删除相应的查询条件
                if(tag==0){
                    this.brand=[];
                }else if(tag==1){
                    this.spec=[];
                }else if(tag==2){
                    this.packing=[];
                }else if(tag==3){
                    this.area=[];
                }else if(tag==4){
                    this.pro=[];
                }else if(tag==5){
                    this.city=[];
                }else if(tag==6){
                    this.county=[];
                }
            },
            exportExcel(){//导出
                var url = "getMultiScanDataExcel";
                if(this.selectTab==1){//扫码
                    url = "getMultiScanDataExcel";
                }else if(this.selectTab==2){//成本
                    url = "getMultiKPIDataExcel";
                }else if(this.selectTab==3){//现金红包
                    url = "getMultiCashDataExcel";
                }else if(this.selectTab==4){//实物奖励数据
                    url = "getMultiGoodDataExcel";
                }else if(this.selectTab==5){//积分数据数据
                    url = "getMultiScoreDataExcel";
                }
                var that = this;
                var specName='所有';
                var proName='合计';
                var ctName='合计';
                var cyName='合计';
                if(that.transformSpec.length!=0){
                    specName=that.transformSpec;
                }
                if(that.transformPro.length!=0){
                    proName=that.transformPro;
                }
                if(that.transformCity.length!=0){
                    ctName=that.transformCity;
                }
                if(that.transformCounty.length!=0){
                    cyName=that.transformCounty;
                }
                var params={
                    cityName:ctName,
                    startTime:that.transformStart,
                    endTime:that.transformEnd,
                    productBrand:that.transformBrand,
                    productName:specName,
                    productPack:that.transformPack,
                    provinceName:proName,
                    saleZone:that.transformArea,
                    countyName:cyName
                }
                var url = "/record/fixatreport/"+url;
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                for(var attr in params) {
                    formData.append(attr, params[attr]);
                }
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
                xhr.open('POST', url, true);
                xhr.responseType = "blob";
                xhr.responseType = "arraybuffer"
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
                xhr.send(formData);
            }

        }
    }
</script>

<style lang="scss" scoped>
	.multi-root {
		color: #515151;
		.search-condition {
			background: #fff;
			border-radius: 4px;
			padding: 0 20px 20px 20px;
			.title {
				text-align: center;
				height: 60px;
				line-height: 60px;
				border-bottom: 1px solid #ccc;
				cursor: pointer;
				span {
					transition: All 0.4s ease-in-out;
					-webkit-transition: All 0.4s ease-in-out;
					-moz-transition: All 0.4s ease-in-out;
					-o-transition: All 0.4s ease-in-out;
					&.active {
						transform: rotateZ(180deg);
						-webkit-transform: rotateZ(180deg);
					}
				}
			}
			.condition-con {
				padding: 20px 10px 10px 10px;
				.search-result {
					margin: 20px 0 0 0;
					padding-top: 20px;
					border-top:1px solid #ccc;
					span {
						margin-bottom: 10px;
					}
				}
				.search-oper {
					white-space: nowrap;
					.oper-btn {
						width:70px;
						display: inline-block;
						vertical-align: middle;
						height: 60px;
						button {
							margin:20px auto;
							margin-left: 50%;
							transform: translateX(-50%);
						}
						.tpl-con {
							height: 300px;
							overflow-y: auto;
							.el-radio {
								display: block;
								margin-bottom: 20px;
							}
							.el-radio+.el-radio{
								margin-left: 0;
							}
						}
					}
				}
			}
		}
		.result-part {
			background: #fff;
			border-radius: 4px;
			padding: 20px 20px 20px 20px;
			margin-top: 20px;
			.result-tab {
				ul {
					height: 32px;
					li {
						float: left;
						font-size: 16px;
						line-height: 32px;
						padding: 0 10px;
						position: relative;
						cursor:pointer;
						&:before {
							content: '';
							width:85%;
							height: 1px;
							position: absolute;
							bottom:0;
							left: 50%;
							transform: translateX(-50%);
							background: #4A7DE1;
							display: none;
						}
						&:hover {
							color:#4A7DE1;
							&:before {
								display: inline-block;
							}
						}
						&.active {
							color:#0077FF;
							&:before {
								background: #0077FF;
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}
</style>
