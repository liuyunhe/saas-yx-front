<template>
	<div class="spec-root">
		<div class="spec-title"><span class='el-icon-search'></span>&nbsp;规格查询</div>
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
			品牌：
			<el-select v-model="brand" placeholder="请选择品牌" size='small' style='width:200px' @change='specChange'>
				<el-option v-for='(item,key) in brandList' :key='key' :label="item.name" :value="item.name"></el-option>
			</el-select>
			规格：
			<el-select v-model="spec" placeholder="请选择规格" size='small' style='width:200px'>
				<el-option v-for='(item,key) in specList' :key='key' :label="item.name" :value="item.sn"></el-option>
			</el-select>
			<div class="input-btns">
				<el-button type="primary" size='small' class='pri-btn' @click='search'>查询</el-button>
				<el-button type="primary" size='small' class='pri-btn' @click='resetSearch'>重置</el-button>
			</div>
		</div>
		<div class="echarts">
			<div class="brief"v-for='(item,key) in briefList':key='key'>
				<div class="img-con">
					<img :src="item.image" alt="" />
				</div>
				<div class="text">
					<p>本日扫码次数：<span>{{item.scanPv}}</span>次</p>
					<p>本日连续月活用户：<span>{{item.activeUv}}</span>次</p>
				</div>
				<div class="text">
					<p>本日扫码烟包数：<span>{{item.scanCode}}</span>次</p>
					<p>本日连续周活用户：<span>{{item.weekActiveUv}}</span>次</p>
				</div>
			</div>
			<div class="scan-time"v-loading='loading2'>
				<div class="title">扫码次数时刻趋势<span class="line"></span></div>
				<div id="scanTime" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-date"v-loading='loading3'>
				<div class="title">扫码人数时间趋势<span class="line"></span></div>
				<div id="scanDate" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-result"v-loading='loading4'>
				<div class="title">促销效果趋势分析<span class="line"></span></div>
				<div id="scanResult" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-area">
				<div class="title">扫描地域分布<span class="line"></span></div>
				<div id="map" style="width:40%; height:600px"v-loading='loading5'></div>
				<div class="map-data">
					<div id="mapTimes" style="width:100%; height:300px"v-loading='loading6'></div>
					<div id="mapRange" style="width:100%; height:300px"v-loading='loading7'></div>
				</div>	
			</div>
			<div class="scan-all-range"v-loading='loading8'>
				<div id="scanAllRange" style="width:98%; height:300px"></div>
			</div>
			<div class="scan-award">
				<div class="title">奖品分布<span class="line"></span></div>
				<div id="money" style="width:50%; height:300px"v-loading='loading9'></div>
				<div id="product" style="width:50%; height:300px"v-loading='loading10'></div>
			</div>
		</div>

	</div>
</template>

<script>
	import '../../../common/js/dateFormat.js';
	import DATA from './data.js';
	import 'echarts/map/js/china.js';
	export default {
		data() {
			return {
				type1: 'day',
				searchShow: 'day',
				date1: new Date().Format('yyyy-MM-dd'),
				week: '',
				month: '',
				weekList: [],
				brand: '',
				brandList: [],
				spec: '',
				specList: [],
				startTime: new Date().Format('yyyy-MM-dd'),
				loading1:true,
				loading2:true,
				loading3:true,
				loading4:true,
				loading5:true,
				loading6:true,
				loading7:true,
				loading8:true,
				loading9:true,
				loading10:true,
				briefList:[],
				tempPro:''
				
			};
		},
		created() {
				this.getBrand();
				this.specChange()
		},
		watch: {
			spec(n, o) {
				if(n != '') {
					this.getBrief();
					this.drawScanTime();
					this.drawScanDate();
					this.drawScanResult();
					this.drawNumTime();
					this.drawmapTime('');
					this.drawmapRange('');
					this.drawScanAllRange();
					this.drawMoney();
					this.drawProduct();
					
				}
			}
		},
		methods: {
			//			获取省份
			getBrand() {
				var that = this;
				this.$request.post(
					'/record/public/getUserBrandByUserId', {},
					true,
					res => {
						var data = res || [];
						that.brandList = data;
						that.brand=data[0].name;
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
				this.startTime = day;
			},
			selectWeek(week) {
				var index = week.indexOf('(');
				week = week.substr(index + 1, 10)
				week = week.replace(/\./g, '-')
				this.startTime = week;
			},
			selectMonth(month) {
				this.startTime = month;
			},
			specChange() {
				var that = this;
				this.$request.post(
					'/record/statistics/getProduct', {
						productBrand: that.brand
					},
					true,
					res => {
						var data = res || [];
						that.specList = data;
						that.spec=data[0].sn;
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
				this.brand = this.brandList[0].name;
				this.spec = '';
				this.week=this.weekList[0].weekNo;
			},
			getBrief(){
				var that = this;
				this.$request.post(
					'/record/statistics/specificationKPI', {},
					true,
					res => {
						var data = res || [];
						data=DATA.s1;
						if(data.length!=0){
							that.briefList=data;
						}
					},
					err => {
						console.log(err)
					}
				)
			},
		
			drawScanTime(){
				var that = this;
				this.$request.post(
					'/record/statistics/scanTimesHourTrendCtiy', {
						flag: 2,
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1
					},
					true,
					res => {
						that.loading2=false;
						var data = res || [];
						data=DATA.s2;
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
					'/record/statistics/specifScanNumbers', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1
					},
					true,
					res => {
						that.loading3=false;
						var data = res || [];
						data=DATA.s3;
						var showDateArr=[];
						var scanAddUvArr=[];
						var scanHistoryUvArr=[];
						var scanTotalUvArr=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showDateArr.push(item.statTime);
								scanAddUvArr.push(item.scanAddUv);
								scanHistoryUvArr.push(item.scanHistoryUv);
								scanTotalUvArr.push(item.scanTotalUv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanDate'));
						// 绘制图表
						myChart.setOption({
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
						    xAxis: {
						    		name:'日期',
						        data:  showDateArr
						    },
						    yAxis: {
						    	name:'(单位：次)',
						        type: 'value'
						    },
						    series: [
						    		{
						            name:'历史扫码人数',
						            type:'bar',
						            stack: '广告',
						            barWidth : 20,
						            data:scanHistoryUvArr
						        },
						        {
						            name:'新增扫码人数',
						            type:'bar',
						            stack: '广告',
						            barWidth : 20,
						            data:scanAddUvArr
						        },
						        
						        {
						            name:'扫码总人数',
						            type:'bar',
						            barWidth : 0.1,
						            data:scanTotalUvArr,
						            itemStyle:{
                                    normal:{
                                        color:'#fff'
                                    }
                        }
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
					'/record/statistics/scanTimesTrendOfSpec', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1
					},
					true,
					res => {
						that.loading4=false;
						var data = res || [];
						data=DATA.s4;
						var awardPayPvArr=[];
						var awardPutPvArr=[];
						var drawPvArr=[];
						var drawResultPvArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.statTime);
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
					'/record/statistics/specifMapData', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1
					},
					true,
					res => {
						that.loading5=false;
						var data = res || [];
						data=DATA.s5;
						var mydata=[];
						data.forEach((item,i)=>{
							mydata[i]=new Object();						
							mydata[i].value=item.scanCode;
							if(item.provinceName.indexOf('省')!=-1){
								mydata[i].name=item.provinceName.substring(0,item.provinceName.indexOf('省'));
							}else if(item.provinceName.indexOf('区')!=-1){
								mydata[i].name=item.provinceName.substring(0,item.provinceName.indexOf('区'));
							}else if(item.provinceName.indexOf('市')!=-1){
								mydata[i].name=item.provinceName.substring(0,item.provinceName.indexOf('市'));
							}else {
								mydata[i].name=item.provinceName;
							}
							
						})
						
						mydata;
						if(data.length != 0) {
							
							let myChart = this.$echarts.init(document.getElementById('map'));
						// 绘制图表
							myChart.setOption({
							    backgroundColor: '#FFFFFF',  
	                title: {  
	                    text: '分省分析',  
	                    subtext: '',  
	                    x:0  
	                },  
	                tooltip : {  
	                    trigger: 'item'  
	                },  
	                
	                //左侧小导航图标
	                visualMap: {  
	                    show : true,  
	                    x: 'left',  
	                    y: 'center',  
	                    min: 0,
	              			max: 600,
	                    calculable : true,//颜色呈条状
	            				text:['高','低'],
	                    color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']  
	                },  
	                
	                //配置属性
	                series: [{  
	                    name: '扫码烟包数',  
	                    type: 'map',  
	                    mapType: 'china',   
	                    roam: true,  
	                    label: {  
	                        normal: {  
	                            show: true  //省份名称  
	                        },  
	                        emphasis: {  
	                            show: false  
	                        }  
	                    },  
	                    data:mydata  //数据
	                }]  				
							});
							myChart.on('click',function(params){
								var proName = params.name;
	        			if(proName){
	        				that.loading6=true;
	        				that.loading7=true;
	        				var proTrue='';
	        				console.log(proName)
	        				data.forEach((item,i)=>{
	        					if(item.provinceName.indexOf(proName)!=-1){
	        						
	        						proTrue=item.provinceName;
	        						that.drawmapTime(proTrue);
	        						that.drawmapRange(proTrue);
	        					}
	        				})
	        				
	        				
	        			}
							})
						}
						 
						
						
					},
					err => {
						console.log(err)
					}
				)
			},
			drawmapTime(pro){
				var that=this;
				this.$request.post(
					'/record/statistics/specifAllProvScancode', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1,
						provinceName:pro
					},
					true,
					res => {
						that.loading6=false;
						var data = res || [];
						data=DATA.s6;
						var scanCodeArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.statTime);
								scanCodeArr.push(item.scanCode);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('mapTimes'));
						// 绘制图表
						myChart.setOption({
								title: {  
	                    text: '',  
	                    subtext: '全省扫码烟包数时间趋势',  
	                    x:0  
	               }, 
						    xAxis: {
								name:'日期',
        						type: 'category',
        						data: showX
   							},
    						yAxis: {
    							name:'(单位：次)',
						        type: 'value'
						    },
						    series: [{
						        data: scanCodeArr,
						        type: 'line'
						    }]				
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawmapRange(pro){
				var that=this;
				this.$request.post(
					'/record/statistics/specifInterProvScancode', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1,
						provinceName:pro
					},
					true,
					res => {
						that.loading7=false;
						var data = res || [];
						data=DATA.s7;
						var scanCodeArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.cityName);
								scanCodeArr.push(item.scanCode);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('mapRange'));
						// 绘制图表
						myChart.setOption({
							title: {  
	                    text: '',  
	                    subtext: '省市各地市扫码烟包数排名',  
	                    x:0  
	               }, 
						    xAxis: {
						    		name:'市',
						        data:  showX
						    },
						    yAxis: {
						    	name:'(单位：次)',
						        type: 'value'
						    },
						    series: [
						    		{
						            name:'扫码烟包数',
						            type:'bar',
						            barWidth : 20,
						            data:scanCodeArr
						        }
						    ]				
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawScanAllRange(){
				var that=this;
				this.$request.post(
					'/record/statistics/specifScanTimesOfCity', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1
					},
					true,
					res => {
						that.loading8=false;
						var data = res || [];
						data=DATA.s8;
						var scanCodeArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.cityName);
								scanCodeArr.push(item.scanCode);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('scanAllRange'));
						// 绘制图表
						myChart.setOption({
							title: {  
	                    text: '',  
	                    subtext: '全国地市扫码烟包数排名',  
	                    x:0  
	               }, 
						    xAxis: {
						    		name:'市',
						        data:  showX
						    },
						    yAxis: {
						    	name:'(单位：次)',
						        type: 'value'
						    },
						    series: [
						    		{
						            name:'扫码烟包数',
						            type:'bar',
						            barWidth : 20,
						            data:scanCodeArr
						        }
						    ]				
						});
					},
					err => {
						console.log(err)
					}
				)
			},
			drawMoney(){
				var that=this;
				this.$request.post(
					'/record/statistics/specifAwardDistribute', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1,
						awardFlag:2
					},
					true,
					res => {
						that.loading9=false;
						var data = res || [];
						data=DATA.s9;
						var awardPayPvArr=[];
						var drawResultPvArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.awardName);
								awardPayPvArr.push(item.awardPayPv);
								drawResultPvArr.push(item.drawResultPv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('money'));
						// 绘制图表
						myChart.setOption({
							tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    grid: {
						        left: '5%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
							title: {  
	                    text: '现金红包',  
	                    subtext: '',  
	                    x:0  
	               }, 
						    xAxis: {
						    		name:'(单位：类型)',
						        type: 'value'
						    },
						    yAxis: {
						    		name:'个',
						        data:  showX
						    	
						    },
						    series: [
						    		{
						            name:'中奖数量',
						            type:'bar',
						            barWidth : 20,
						            data:awardPayPvArr
						        },
						        {
						            name:'领奖数量',
						            type:'bar',
						            barWidth : 20,
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
			drawProduct(){
				var that=this;
				this.$request.post(
					'/record/statistics/specifAwardDistribute', {
						productSn: that.spec,
						statTime: that.startTime,
						statType: that.type1,
						awardFlag:1
					},
					true,
					res => {
						that.loading10=false;
						var data = res || [];
						data=DATA.s9;
						var awardPayPvArr=[];
						var drawResultPvArr=[];
						var showX=[];
						if(data.length != 0) {
							data.forEach(item=>{
								showX.push(item.awardName);
								awardPayPvArr.push(item.awardPayPv);
								drawResultPvArr.push(item.drawResultPv);
							})
						}
						
						let myChart = this.$echarts.init(document.getElementById('product'));
						// 绘制图表
						myChart.setOption({
							tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
							title: {  
	                    text: '实物奖品',  
	                    subtext: '',  
	                    x:0  
	               }, 
	               grid: {
						        left: '5%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis: {
						    		name:'(单位：类型)',
						        type: 'value'
						    		
						    },
						    yAxis: {
						    		name:'个',
						        data:  showX
						    },
						    series: [
						    		{
						    				name:'中奖数量',
						            type:'bar',
						            barWidth : 20,
						            data:awardPayPvArr
						        },
						        {
						        		name:'领奖数量',
						            type:'bar',
						            barWidth : 20,
						            data:drawResultPvArr
						        }
						    ]				
						});
					},
					err => {
						console.log(err)
					}
				)
			}

		
		}
	};
</script>

<style lang="scss" scoped>
	.spec-root {
		color: #707478;
		.spec-title {
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
			.brief {
				width:100%;
				height: 100px;
				margin:10px;
				box-sizing:border-box;
				white-space:nowrap;
				.img-con {
					width:20%;
					height: 100%;
					display: inline-block;
					text-align: center;
					vertical-align: middle;
					img {
						width:67px;
						height: 100px;
					}
				}
				.text {
					width:30%;
					height: 100%;
					display: inline-block;
					vertical-align: middle;
					p{
						color: #707478;
						font-size: 15px;
						line-height: 46px;
						span {
							color:#8CD7F7;
						}
					}
					
				}
			}
			.yi1 {
				position: relative;
				display: inline-block;
			}
		}
		.scan-area {
			white-space: nowrap;
			#map {
				display: inline-block;
				vertical-align: middle;
			}
			.map-data {
				width:60%;
				display: inline-block;
				vertical-align: middle;
			}
		}
		.scan-award {
			white-space: nowrap;
			#money {
				display: inline-block;
				vertical-align: middle;
			}
			#product {
				display: inline-block;
				vertical-align: middle;
			}
		}
		.scan-time,.scan-date,.scan-result,.scan-area,.scan-range,.scan-award {
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
