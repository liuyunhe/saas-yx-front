<template>
	<div class="region-root">
		<div class="region-title"><span class='el-icon-search'></span>&nbsp;地域查询</div>
		<div class="search-con">
			类型：
			<el-select v-model="type1" placeholder="请选择" size='small' style='width:200px' @change='selectType'>
				<el-option label="日" value="day"></el-option>
				<el-option label="周" value="week"></el-option>
				<el-option label="月" value="month"></el-option>
			</el-select>
			<div class="date" v-show='searchShow=="day"'>
				查询日期：
				<el-date-picker v-model="date1" type="date" size='small' placeholder="选择日期" class='date-input' @change='selectDay'>
				</el-date-picker>
			</div>
			<div class="date" v-show='searchShow=="week"'>
				查询星期：
				<el-select v-model="week" placeholder="请选择" size='small' style='width:200px' @change='selectWeek'>
					<el-option v-for='(item,key) in weekList' :key='key' :label="item.weekNo" :value="item.weekNo"></el-option>
				</el-select>
			</div>
			<div class="date" v-show='searchShow=="month"'>
				查询月份：
				<el-date-picker v-model="month" type="month" size='small' placeholder="选择月份" class='date-input' @change='selectMonth'>
				</el-date-picker>
			</div>
			省份：
			<el-select v-model="provice" placeholder="请选择省份" size='small' style='width:200px' @change='cityChange'>
				<el-option v-for='(item,key) in proviceList' :key='key' :label="item.name" :value="item.name"></el-option>
			</el-select>
			城市：
			<el-select v-model="city" placeholder="请选择城市" size='small' style='width:200px'>
				<el-option v-for='(item,key) in cityList' :key='key' :label="item.cityName" :value="item.cityName"></el-option>
			</el-select>
			<div class="input-btns">
				<el-button type="primary" size='small' class='pri-btn' @click='search'>查询</el-button>
				<el-button type="primary" size='small' class='pri-btn' @click='resetSearch'>重置</el-button>
			</div>
		</div>
		<div class="echarts">
			<div class="yibiao" v-loading='loading1'>
				<div class="title">仪表盘中间值确定方式：往前推7天（包括当天）的均值</div>
				<div class="yi1" id="yibiao1" style="width:30%; height:300px">
				</div>
				<div class="yi1" id="yibiao2" style="width:30%; height:300px">
				</div>
				<div class="yi1" id="yibiao3" style="width:30%; height:300px">
				</div>
			</div>
			<div class="scan-time" v-loading='loading2'>
				<div class="title">扫码次数时刻趋势<span class="line"></span></div>
				<div id="scanTime" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-date" v-loading='loading3'>
				<div class="title">扫码日期趋势<span class="line"></span></div>
				<div id="scanDate" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-result" v-loading='loading4'>
				<div class="title">促销效果趋势分析<span class="line"></span></div>
				<div id="scanResult" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-num-time" v-loading='loading5'>
				<div class="title">扫描烟包数时间趋势<span class="line"></span></div>
				<div id="scanNumTime" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-range" v-loading='loading6'>
				<div class="title">前十五规格扫码次数<span class="line"></span></div>
				<div id="scanRange" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-cities" v-loading='loading7'>
				<div class="title">各城市扫码次数<span class="line"></span></div>
				<div class="unit">&nbsp;&nbsp;(单位:次)</div>
				<div id="scanCities" style="width:100%; height:300px">
					<div class="tr-title">
						<div class="city-name">
							<div>城市</div>
						</div>
						<div class="scan-num">
							<div @click='getOrder(1)'>扫码次数<span :class="{'el-icon-caret-bottom':true,'active':active==1}"></span></div>
						</div>
						<div class="scan-pack">
							<div @click='getOrder(2)'>扫码烟包数<span :class="{'el-icon-caret-bottom':true,'active':active==2}"></span></div>
						</div>
						<div class="scan-peo">
							<div @click='getOrder(3)'>扫码人数<span :class="{'el-icon-caret-bottom':true,'active':active==3}"></span></div>
						</div>
					</div>
					<ul>
						<li v-for='(item,key) in cityScanList' :key='key'>
							<div>
								<div>{{item.cityName}}</div>
							</div>
							<div>
								<div>
									<el-progress :text-inside="false" :show-text='false' :stroke-width="18" :percentage="item.per1"></el-progress>
									<span class='show-num'>No{{item.rownum}}:{{item.scanPv}}</span>
								</div>
							</div>
							<div>
								<div>
									<el-progress :text-inside="false" :show-text='false' :stroke-width="18" :percentage="item.per2"></el-progress>
									<span class='show-num'>No{{item.rownum2}}:{{item.scanCode}}</span>
								</div>
							</div>
							<div>
								<div>
									<el-progress :text-inside="false" :show-text='false' :stroke-width="18" :percentage="item.per3"></el-progress>
									<span class='show-num'>No{{item.rownum3}}:{{item.scanUv}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '../../../common/js/dateFormat.js'
	import DATA from './data.js'
	export default {
		data() {
			return {
				type1: 'day',
				searchShow: 'day',
				date1: new Date().Format('yyyy-MM-dd'),
				week: '',
				month: '',
				weekList: [],
				provice: '',
				defaultProvice:'',
				proviceList: [],
				city: '',
				cityList: [],
				startTime: new Date().Format('yyyy-MM-dd'),
				cityMax:1,
				cityScanList:[],
				active:1,
				loading1:true,
				loading2:true,
				loading3:true,
				loading4:true,
				loading5:true,
				loading6:true,
				loading7:true
				
			};
		},
		created() {
			this.getDefaultPro(this.getProvice);
			this.search();
		},
		mounted() {
			var that=this;
			var inter=setInterval(()=>{
				if(that.provice){
					this.drawyibiao();
					this.drawScanTime();
					this.drawScanDate();
					this.drawScanResult();
					this.drawNumTime();
					this.drawRange();
					this.getCityItems('pv');
					this.cityChange()
					clearInterval(inter);
					inter=null;
				}
			},10)
		},
		methods: {
			//			获取省份
			getProvice(proId) {
				var that = this;
				this.$request.post(
					'/record/public/getUserProvByUserId', {},
					true,
					res => {
						var data = res || [];
						data.unshift({name:'全国'})
						that.proviceList = data;
						that.proviceList.forEach((item) => {
							if(item.code == proId) {
								that.provice = item.name;
								that.defaultProvice=item.name;
							}
						})
					},
					err => {
						console.log(err)
					}
				)
			},
			//			获取默认的省份
			getDefaultPro(fn) {
				var that = this;
				this.$request.post(
					'/record/public/getDefaultProvByorgId', {},
					true,
					res => {
						var data = res || [];
						if(data.length!=0){
							var proviceId = data[0].orgRegion;
						}					
						if(typeof fn == 'function') {
							fn(proviceId)
						}
					},
					err => {
						console.log(err)
					}
				)
			},
			selectType(value) { //日，周，月的切换时调用的方法
				var that = this;
				this.searchShow = value;
				if(value == 'week') {
					this.$request.post(
						'/record/statistics/getWeeks', {},
						true,
						res => {
							var data = res || [];
							that.weekList = data;
							that.week = that.weekList[0].weekNo;
						},
						err => {
							console.log(err)
						}
					)
				}
				if(value == 'month') {
					that.startTime = new Date().Format('yyyy-MM');
					that.month = new Date().Format('yyyy-MM');
				}

			},
			selectDay(day) {
				this.startTime = day.Format('yyyy-MM-dd');
			},
			selectWeek(week) {
				var index = week.indexOf('(');
				week = week.substr(index + 1, 10)
				week = week.replace(/\./g, '-')
				this.startTime = week;
			},
			selectMonth(month) {
				this.startTime = month.Format('yyyy-MM');;
			},
			cityChange() {
				var that = this;
				this.city='';
				this.$request.post(
					'/record/statistics/getCitysByProvince', {
						provinceName: that.provice
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
			search() {
				this.loading1=true;
				this.loading2=true;
				this.loading3=true;
				this.loading4=true;
				this.loading5=true;
				this.loading6=true;
				this.loading7=true;
				this.drawyibiao();
				this.drawScanTime();
				this.drawScanDate();
				this.drawScanResult();
				this.drawNumTime();
				this.drawRange();
				this.getCityItems('pv');
			},
			resetSearch() {
				if(this.type1=='month'){
					this.startTime=new Date().Format('yyyy-MM');
				}else {
					this.startTime=new Date().Format('yyyy-MM-dd');
				}
				this.type1 = 'day';
				this.date1 = new Date().Format('yyyy-MM-dd');
				this.month=new Date().Format('yyyy-MM');
				this.provice = this.defaultProvice;
				this.city = '';
				this.week=this.weekList[0].weekNo;
			},
			drawyibiao() {
				var that = this;
				this.$request.post(
					'/record/statistics/getScanDataCity', {
						kpiType: "pv",
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city
					},
					true,
					res => {
						that.loading1=false;
						var data = res || [];
						if(data.length != 0) {
							var scanAvgPv = !!data[0].scanAvgPv ? data[0].scanAvgPv/10000 : 0; //次数
							var scanAvgCode = !!data[0].scanAvgCode ? data[0].scanAvgCode/10000 : 0; //烟包数
							var scanAvgUv = !!data[0].scanAvgUv ? data[0].scanAvgUv/10000 : 0; //人数
						} else {
							var scanAvgPv = 0; //次数
							var scanAvgCode = 0; //烟包数
							var scanAvgUv = 0;
						}
						let myChart = this.$echarts.init(document.getElementById('yibiao1'))
						// 绘制图表
						myChart.setOption({
							tooltip: {
								formatter: "{a} <br/>{c} {b}"
							},
							title: {
								text: '扫码次数(单位：万)',
								subtext: '扫码总次数(包含重复扫码的情况)',
								x: 'center',
								y: 220,
								textStyle: {
									fontSize: 12,
									fontWeight: 'lighter',
								},
								subtextStyle: {
									fontSize: 12,
									color: '#666'
								}
							},
							series: [{
								name: '速度',
								type: 'gauge',
								z: 3,
								min: 0,
								max: scanAvgPv == 0 ? 172786 : scanAvgPv * 2,
								splitNumber: 10,
								radius: '70%',

								axisLine: { // 坐标轴线
									lineStyle: { // 属性lineStyle控制线条样式
										width: 8,
										color: [
											[0.2, '#c23531'],
											[0.8, '#63869e'],
											[1, '#91c7ae']
										]
									}

								},
								axisTick: { // 坐标轴小标记
									length: 5, // 属性length控制线长
									lineStyle: { // 属性lineStyle控制线条样式
										color: 'auto'
									}
								},
								splitLine: { // 分隔线
									length: 15, // 属性length控制线长
									lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
										color: 'auto'
									}
								},
								axisLabel: {
									backgroundColor: '#fff',
									borderRadius: 2,
									color: '#666'
								},
								detail: {
									// 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontFamily: 'Arial',
									width: 0.1,
									color: '#666',
									fontSize: '14'
								},
								data: [{
									value: scanAvgPv
								}]
							}]
						});
						let myChart2 = this.$echarts.init(document.getElementById('yibiao2'))
						// 绘制图表
						myChart2.setOption({
							tooltip: {
								formatter: "{a} <br/>{c} {b}"
							},
							title: {
								text: '扫码烟包数(单位：万)',
								subtext: '扫码总条数和总包数(不包含重复扫码的情况)',
								x: 'center',
								y: 220,
								textStyle: {
									fontSize: 12,
									fontWeight: 'lighter',
								},
								subtextStyle: {
									fontSize: 12,
									color: '#666'
								}
							},
							series: [{
								name: '速度',
								type: 'gauge',
								z: 3,
								min: 0,
								max: scanAvgCode == 0 ? 134480 : scanAvgCode * 2,
								splitNumber: 10,
								radius: '70%',

								axisLine: { // 坐标轴线
									lineStyle: { // 属性lineStyle控制线条样式
										width: 8,
										color: [
											[0.2, '#c23531'],
											[0.8, '#63869e'],
											[1, '#91c7ae']
										]
									}

								},
								axisTick: { // 坐标轴小标记
									length: 5, // 属性length控制线长
									lineStyle: { // 属性lineStyle控制线条样式
										color: 'auto'
									}
								},
								splitLine: { // 分隔线
									length: 15, // 属性length控制线长
									lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
										color: 'auto'
									}
								},
								axisLabel: {
									backgroundColor: '#fff',
									borderRadius: 2,
									color: '#666'
								},
								detail: {
									// 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontFamily: 'Arial',
									width: 0.1,
									color: '#666',
									fontSize: '14'
								},
								data: [{
									value: scanAvgCode
								}]
							}]
						});
						let myChart3 = this.$echarts.init(document.getElementById('yibiao3'))
						// 绘制图表
						myChart3.setOption({
							tooltip: {
								formatter: "{a} <br/>{c} {b}"
							},
							title: {
								text: '扫码人数(单位：万)',
								subtext: '时间段内扫码用户去重后总人数',
								x: 'center',
								y: 220,
								textStyle: {
									fontSize: 12,
									fontWeight: 'lighter',
								},
								subtextStyle: {
									fontSize: 12,
									color: '#666'
								}
							},
							series: [{
								name: '速度',
								type: 'gauge',
								z: 3,
								min: 0,
								max: scanAvgUv == 0 ? 86105 : scanAvgUv * 2,
								splitNumber: 10,
								radius: '70%',

								axisLine: { // 坐标轴线
									lineStyle: { // 属性lineStyle控制线条样式
										width: 8,
										color: [
											[0.2, '#c23531'],
											[0.8, '#63869e'],
											[1, '#91c7ae']
										]
									}

								},
								axisTick: { // 坐标轴小标记
									length: 5, // 属性length控制线长
									lineStyle: { // 属性lineStyle控制线条样式
										color: 'auto'
									}
								},
								splitLine: { // 分隔线
									length: 15, // 属性length控制线长
									lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
										color: 'auto'
									}
								},
								axisLabel: {
									backgroundColor: '#fff',
									borderRadius: 2,
									color: '#666',
									interval: 5,
								},
								detail: {
									// 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontFamily: 'Arial',
									width: 0.1,
									color: '#666',
									fontSize: '14'
								},
								data: [{
									value: scanAvgUv
								}]
							}]
						});

					},
					err => {
						console.log(err)
					}
				)

			},
			drawScanTime(){
				var that = this;
				let flag=1;
				if(that.city){
					flag=3
				}else {
					flag=1
				}
				this.$request.post(
					'/record/statistics/scanTimesHourTrendCtiy', {
						kpiType: "pv",
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city,
						flag:flag
					},
					true,
					res => {
						that.loading2=false;
						var data = res || [];
//						data=DATA.no1;
						var showArr=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showArr.push(item.scanPv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanTime'));
						// 绘制图表
						myChart.setOption({
							xAxis: {
								name:'时刻（时）',
        						type: 'category',
        						data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15','16','17','18','19','20','21','22','23','24']
   							},
    						yAxis: {
    							name:'(单位：次)',
						        type: 'value'
						    },
						    series: [{
						        data: showArr,
						        type: 'line'
						    }]						
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawScanDate(){
				var that=this;
				this.$request.post(
					'/record/statistics/scanDaysTrendCtiy', {
						kpiType: "pv",
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city
					},
					true,
					res => {
						that.loading3=false;
						var data = res || [];
//						data=DATA.no2;
						var showDateArr=[];
						var scanPvArr=[];
						var scanCodeArr=[];
						var scanUvArr=[];
						if(data.length != 0) {
							data.forEach(item=>{
								if(item.statTime) {
									showDateArr.push(item.statTime);
								}else {
									showDateArr.push(item.weekNo);
								}								
								scanPvArr.push(item.scanPv);
								scanCodeArr.push(item.scanCode);
								scanUvArr.push(item.scanUv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanDate'));
						// 绘制图表
						myChart.setOption({
						    legend: {
						    	x:0,
						        data:['扫码次数','扫码烟包数','扫码人数']
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis: {
						    	name:'日期',
						        type: 'category',
						        boundaryGap: false,
						        data: showDateArr
						    },
						    yAxis: {
						    	name:'(单位：次)',
						        type: 'value'
						    },
						    series: [
						        {
						            name:'扫码次数',
						            type:'line',
						            data:scanPvArr
						        },
						        {
						            name:'扫码烟包数',
						            type:'line',
						            data:scanCodeArr
						        },
						        {
						            name:'扫码人数',
						            type:'line',
						            data:scanUvArr
						        }
						    ]						
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawScanResult(){
				var that=this;
				this.$request.post(
					'/record/statistics/scanTimesTrendCity', {
						kpiType: "pv",
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city
					},
					true,
					res => {
						that.loading4=false;
						var data = res || [];
//						data=DATA.no3;
						var awardPayPvArr=[];
						var awardPutPvArr=[];
						var drawPvArr=[];
						var drawResultPvArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								if(item.statTime) {
									showX.push(item.statTime);
								}else {
									showX.push(item.weekNo);
								}
								awardPayPvArr.push(item.awardPayPv);
								awardPutPvArr.push(item.awardPutPv);
								drawPvArr.push(item.drawPv);
								drawResultPvArr.push(item.drawResultPv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanResult'));
						// 绘制图表
						myChart.setOption({
						    legend: {
						    	x:0,
						        data:['领取数量','促销计划','抽奖次数','中奖数量']
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis: {
						    	name:'日期',
						        type: 'category',
						        boundaryGap: false,
						        data: showX
						    },
						    yAxis: {
						    	name:'(单位：次/个)',
						        type: 'value'
						    },
						    series: [
						        {
						            name:'领取数量',
						            type:'line',
						            data:awardPayPvArr
						        },
						        {
						            name:'促销计划',
						            type:'line',
						            data:awardPutPvArr
						        },
						        {
						            name:'抽奖次数',
						            type:'line',
						            data:drawPvArr
						        },
						        {
						            name:'中奖数量',
						            type:'line',
						            data:drawResultPvArr
						        }
						    ]						
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawNumTime(){
				var that=this;
				this.$request.post(
					'/record/statistics/scanCodesOfProvinceCity', {
						kpiType: "pv",
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city
					},
					true,
					res => {
						that.loading5=false;
						var data = res || [];
//						data=DATA.no4;
						var scanCodeArr=[];
						var scanPairArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								if(item.statTime) {
									showX.push(item.statTime);
								}else {
									showX.push(item.weekNo);
								}
								scanCodeArr.push(item.scanCode);
								scanPairArr.push(item.scanPair);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanNumTime'));
						// 绘制图表
						myChart.setOption({
						    legend: {
						    	x:0,
						        data:['盒','条']
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis: {
						    	name:'日期',
						        type: 'category',
						        boundaryGap: false,
						        data: showX
						    },
						    yAxis: {
						    	name:'(单位：盒/条)',
						        type: 'value'
						    },
						    series: [
						        {
						            name:'盒',
						            type:'line',
						            data:scanCodeArr
						        },
						        {
						            name:'条',
						            type:'line',
						            data:scanPairArr
						        }
						    ]						
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawRange(){
				var that=this;
				this.$request.post(
					'/record/statistics/scanTimesOfProvAndSpecCity', {
						kpiType: "pv",
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city
					},
					true,
					res => {
						that.loading6=false;
						var data = res || [];
//						data=DATA.no5;
						var scanPvArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.productName);
								scanPvArr.push(item.scanPv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanRange'));
						// 绘制图表
						myChart.setOption({
						    color: ['#3398DB'],
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis : [
						        {	name:'规格',
						            type : 'category',
						            data : showX,
						            axisTick: {
						                alignWithLabel: true
						            },
						            axisLabel: {
                                           interval:0,
                                           rotate:-40
                                      }
						        }
						    ],
						    yAxis : [
						        {	name:'(单位：次)',
						            type : 'value'
						        }
						    ],
						    series : [
						        {
						            name:'扫码次数',
						            type:'bar',
						            barWidth: '60%',
						            data:scanPvArr
						        }
						    ]					
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			getCityItems(kpiType){
				var that=this;
				this.$request.post(
					'/record/statistics/scanCityRandings', {
						kpiType: kpiType,
						provinceName: that.provice,
						statTime: that.startTime,
						statType: that.type1,
						cityName: that.city
					},
					true,
					res => {
						that.loading7=false;
						var data = res || [];
//						data=DATA.no6;
						var allDataArr=[];
						if(data.length != 0) {
							data.forEach(item=>{
								allDataArr.push(item.scanCode);
								allDataArr.push(item.scanPv);
								allDataArr.push(item.scanUv);
							})
							that.cityMax=Math.max.apply(null,allDataArr);
							console.log(that.cityMax)
							data.forEach(item=>{
								item.per1=item.scanPv/that.cityMax*100;
								item.per2=item.scanCode/that.cityMax*100;
								item.per3=item.scanUv/that.cityMax*100;
							})
							that.cityScanList=data;
						}else {
							that.cityScanList=data;
						}
						
					},
					err => {
						console.log(err)
					}
				)
			},
			getOrder(num){
				if(num==1){
					this.active=1;
					this.getCityItems('pv');
				}else if(num==2){
					this.active=2;
					this.getCityItems('code');
				}else if(num==3){
					this.active=3;
					this.getCityItems('uv');
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.region-root {
		color: #666;
		.region-title {
			line-height: 30px;
			font-size: 16px;
			color: #888;
		}
		.search-con {
			height: 100px;
			background: #fff;
			padding: 10px;
			border-radius: 4px;
			.date {
				display: inline-block;
				.date-input {
					padding-left: 10px;
				}
			}
			.input-btns {
				margin-top: 10px;
			}
		}
		.echarts {
			min-height: 300px;
			background: #fff;
			padding: 10px;
			border-radius: 4px;
			margin-top: 20px;
			.yi1 {
				position: relative;
				display: inline-block;
			}
		}
		.scan-time,.scan-date,.scan-result,.scan-num-time,.scan-range,.scan-cities {
			.title {
				.line {
					width:80%;
					height: 2px;
					background: #ccc;
					vertical-align: middle;
					margin-left: 10px;
					display: inline-block;
				}
			}
			.tr-title {
				width:100%;
				white-space: nowrap;
				&>div {
					display: inline-block;
					div {
						width:96%;
						margin: 0 auto;
						height: 30px;
						line-height: 30px;
						text-align: center;
						background: linear-gradient(to bottom,#f1f1f1,#bbb);
						border-radius: 5px;
						position: relative;
						font-size: 14px;
						.el-icon-caret-bottom {
							color:#fff;
							&.active {
								color:#666;
							}
						}
					}
				}
				.city-name {
					width:17%;
					cursor: pointer;
				}
				.scan-num {
					width:27%;
					cursor: pointer;
				}
				.scan-pack {
					width:27%;
					cursor: pointer;
				}
				.scan-peo {
					width:27%;
					cursor: pointer;
				}
			}
			ul {
				width:100%;
				margin-top: 20px;
				overflow-y: auto;
				height: 200px;
				li {
					width:100%;
					margin-bottom: 10px;
					&>div {
						display:inline-block;
						white-space: nowrap;
						text-align: center;
						vertical-align: middle;
						div {
							width:98%;
							margin: 0 auto;
							position: relative;
							.show-num {
								position: absolute;
								left: 50%;
								transform: translateX(-50%);
								-webkit-transform: translateX(-50%);
								top:0;
								color:#FF7525;
							}
						}
						&:nth-child(1){
							width:17%;
						}
						&:nth-child(2){
							width:27%;
						}
						&:nth-child(3){
							width:27%;
						}
						&:nth-child(4){
							width:27%;
						}
					}
				}
			}
		}
	}
</style>