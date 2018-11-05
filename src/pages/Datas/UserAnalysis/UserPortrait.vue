<template>
	<div class="userPortrait-root">
		<div class="portrait-title"><span></span>&nbsp;用户头息画像</div>
		<div class="search-con">
			<div class="title">筛选条件</div>
			<div class="inputs">
				用户手机号：
				<el-input v-model="phone" placeholder="请输入手机号码" size='small' class='phone-input'></el-input>
				<el-button type="primary" size='small' @click='search'>查询</el-button>
				<el-dialog title="选择所需查询的微信ID" :visible.sync="dialogTableVisible">
					<div class="tpl-con">
						<el-radio-group v-model="idInfo">
							<el-radio v-for='(item,key) in idList' :label="key" :key='key'>
								<span>微信ID：{{item.openId}}</span>&nbsp;&nbsp;
								<span>昵称：{{item.nickName}}</span>
							</el-radio>
						</el-radio-group>
					</div>
					<div class="oper">
						<el-button type="primary" size='small' @click='sure'class='sure'>确定</el-button>
					</div>
				</el-dialog>
			</div>

		</div>
		<div class="result-con">
			<div class="user-info"v-loading='loading1'>
				<div class="title">
					用户基本信息<span>(用户微信ID：{{openId}})</span>
				</div>
				<div class="info-con">
					<div class="left">
						<p>用户微信昵称：<span>{{nickName}}</span></p>
						<p>用户首次扫码时间：<span>{{firstScanTime}}</span></p>
						<p>用户最新扫码时间：<span>{{newTime}}</span></p>
						<p>用户首次抽奖时间：<span>{{firstAwardTime}}</span></p>
					</div>
					<div class="right">
						<p>是否关注公众号：<span>{{isSee}}</span></p>
						<p>用户累计扫码次数：<span>{{totalScanCount}}</span></p>
						<p>用户累计扫码烟包数：<span>{{totalScanNum}}</span></p>
						<p>用户累计抽奖次数：<span>{{totalAwardCount}}</span></p>
					</div>
				</div>
			</div>
			<div class="scan-time">
				<div id="scanTime" style="width:98%; height:300px"v-loading='loading2'></div>
			</div>
			<div class="pie-part">
				<div id="pie"v-loading='loading3'></div>
				<div id="pieRight"v-loading='loading4'></div>
			</div>
			<div class="thirty">
				<div id="thirty"style='width:90%;height: 300px;'v-loading='loading5'></div>
			</div>
			<div class="table"v-loading='loading6'>
				<div class="title">用户各规格扫码烟包数</div>
				<el-table :data="tableData"border class='table' >
						<el-table-column prop="productName" label="规格" width="200">
						</el-table-column>
						<el-table-column prop="monthPv" label="(当月)扫码烟包数" width="200">
						</el-table-column>
						<el-table-column prop="lastMonthPv" label="(上月)扫码烟包数" width="200">
						</el-table-column>
						<el-table-column prop="llastMontHPv" label="(上上月)扫码烟包数" width="200">
						</el-table-column>				
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import '../../../common/js/dateFormat.js';
	export default {
		data() {
			return {
				phone: '',
				dialogTableVisible: false,
				idInfo: 0,
				idList: [],
				openId:'',
				nickName:'',
				firstScanTime:'',
				newTime:'',
				firstAwardTime:'',
				isSee:'',
				totalScanCount:'',
				totalScanNum:'',
				totalAwardCount:'',
				endTime:new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd'),
				tableData:[],
				loading1:true,
				loading2:true,
				loading3:true,
				loading4:true,
				loading5:true,
				loading6:true,
				
			}
		},
		created() {
			var phoneNum = sessionStorage.getItem('mobileNo');
			if(phoneNum) {
				this.phone = phoneNum;
				that.getIdByPhone1();
			} else {
				if(sessionStorage.account === "hebei") {
					this.phone = "18601948480";
				} else {
					this.phone = "17702147500";
				}
				this.openId = "osPmCv1yeLHfAOaFJcoMMgu-izJg";
			}
		},
		mounted() {
			var that=this;
			var inter=setInterval(()=>{
				if(that.openId){
					that.getUserInfo();
					that.drawScanTime();
					that.drawPie();
					that.drawPieRight();
					that.drawTable();
					that.drawThirty();
					clearInterval(inter);
					inter=null;
				}
			},10)
			
		},
		methods: {
			getIdByPhone(phone) {
				var that=this;
				if(phone.match(/^1[34578]\d{9}$/)) {
					this.$request.post(
						'/record/consumer/getOpenIdBymobile',{
							mobileNo:phone
						},
						true,
						res => {
							var data = res || [];
							data=[{"addEffScanPv":8,"addRaffPv":6,"addScanPv":35,"darwFirstTime":"2018-09-07 14:19:29","mobileNo":"17702147500","nickName":"龙","openId":"o0HJV0qDdDzs8nFkiG91I6eoW-Bc","scanFirstTime":"2018-09-07 14:17:37","scanLateTime":"2018-10-31 16:21:23","woas":"1"}]
							if(data.length == 0) {
								this.$message.error('该手机号查不到微信号');
								return;
							} else {
								that.dialogTableVisible = true;
								that.idList = data;
							}
						},
						err => {
							console.log(err)
						}
					)
				} else {
					this.$message.error('该手机号查不到相应的微信号');
				}
			},
			getIdByPhone1(phone) {
				var that=this;
					this.$request.post(
						'/record/consumer/getOpenIdBymobile',{
							mobileNo:phone
						},
						true,
						res => {
							var data = res || [];
							data=[{"addEffScanPv":8,"addRaffPv":6,"addScanPv":35,"darwFirstTime":"2018-09-07 14:19:29","mobileNo":"17702147500","nickName":"龙","openId":"o0HJV0qDdDzs8nFkiG91I6eoW-Bc","scanFirstTime":"2018-09-07 14:17:37","scanLateTime":"2018-10-31 16:21:23","woas":"1"}]
							if(data.length == 0) {
								this.$message.error('该手机号查不到微信号');
								return;
							} else {
								that.openId=data[0].openId;
							}
						},
						err => {
							console.log(err)
						}
					)
			},
			sure(){
				let index=this.idInfo;
				this.openId=this.idList[index].openId;
				this.dialogTableVisible=false;
				this.loading1=true;
				this.loading2=true;
				this.loading3=true;
				this.loading4=true;
				this.loading5=true;
				this.loading6=true;
				
				this.getUserInfo();
				this.drawScanTime();
				this.drawPie();
				this.drawPieRight();
				this.drawTable();
				this.drawThirty();
			},
			search() {
				this.getIdByPhone(this.phone)
				
			},
			getUserInfo(){
				var that=this;
				this.$request.post(
					'/record/consumer/getUserBasicInfo', {
						mobileNo:that.phone,
						openId:that.openId,
						endTime:that.endTime
					},
					true,
					res => {
						var data=res || [];
						that.loading1=false;
						that.nickName=data[0].nickName;
						that.firstScanTime=data[0].scanFirstTime;
						that.newTime=data[0].scanLateTime;
						that.firstAwardTime=data[0].darwFirstTime;
						that.isSee=data[0].woas;
						if(data[0].woas==1){
							that.isSee='是';
						}else {
							that.isSee='否';
						}
						that.totalScanCount=data[0].addScanPv;
						that.totalScanNum=data[0].addEffScanPv;
						that.totalAwardCount=data[0].addRaffPv;
					},
					err => {
						console.log(err)
					}
				)
			},
			drawScanTime(){
				var that=this;
				this.$request.post(
						'/record/consumer/getUserScanFree',{
							mobileNo:that.phone,
							openId:that.openId,
							endTime:that.endTime
						},
						true,
						res => {
							var data = res || [];
							that.loading2=false;
							var scanPvArr=[];
							var showX=[];
							if(data.length != 0) {
								data.forEach(item=>{
									showX.push(item.statDate);
									scanPvArr.push(item.scanPv);
								})
							}
							let myChart = this.$echarts.init(document.getElementById('scanTime'));
						// 绘制图表
							myChart.setOption({
								title:{
									text:'用户扫码频度分析',
									subtext:'近30天每天扫码次数'
								},
							    color: ['#3398DB'],
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '5%',
							        containLabel: true
							    },
							    xAxis : [
							        {	name:'日期',
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
							        {	
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
			drawPie(){
				var that=this;
				this.$request.post(
						'/record/consumer/getUserScanHourPie',{
							mobileNo:that.phone,
							openId:that.openId,
							endTime:that.endTime
						},
						true,
						res => {
							var data=res || [];
							that.loading3=false;
							var scanPvArr=[];
							if(data.length != 0) {
								data.forEach(item=>{
									scanPvArr.push({
										name:item.timeh,
										value:item.scanPv
									});
								})
								
							}
							let myChart = this.$echarts.init(document.getElementById('pie'));

						// 绘制图表
							myChart.setOption({
								title: {
							        text: '用户扫码时段分析',
							        subtext: '每时刻近7天扫码次数之和',
							        left:0
							    },
							    tooltip : {
							        trigger: 'item',
							        formatter: function(d){
							        	return d.data.name+'<br/>'+'扫码次数之和：'+d.data.value
							        }
							    },
							    series : [
						        {
						            type: 'pie',
						            radius : '65%',
						            center: ['50%', '50%'],
						            data:scanPvArr,
						            itemStyle: {
						                normal: {
						                    label: {        //此处为指示线文字
						                        show: true,
						                        position: 0, //标签的位置
						                        textStyle: {
						                            fontWeight: 200,
						                            fontSize: 10    //文字的字体大小
						                        }
						                    },
						                    labelLine: {    //指示线状态
						                        show: true,
						                        smooth: 0,
						                        length: 5,
						                        length2: 0,
						                        color:'#fff'
						                    }
						                }
						            },
						        }
						    	],
						    	color: {
								    type: 'linear',
			                        x: 0.01,
			                        y: 0.01,
			                        x2: 1,
			                        y2: 1,
								    colorStops: [{
								        offset: 0, color: '#fff' // 0% 处的颜色
								    }, {
								        offset: 1, color: 'blue' // 100% 处的颜色
								    }],
								    globalCoord: false // 缺省为 false

								}

							});
						},
						err => {
							console.log(err)
						}
					)
			},
			drawPieRight(){
				var that=this;
				this.$request.post(
						'/record/consumer/getUserScandayBar',{
							mobileNo:that.phone,
							openId:that.openId,
							endTime:that.endTime
						},
						true,
						res => {
							var data = res || [];
							that.loading4=false;
							var scanPvArr=[];
							var showX=[];
							if(data.length != 0) {
								data.forEach(item=>{
									showX.push(item.statDate);
									scanPvArr.push(item.scanSmokeAvgVlue);
								})
							}
							let myChart = this.$echarts.init(document.getElementById('pieRight'));
						// 绘制图表
							myChart.setOption({
								title:{
									text:'用户扫码结构分析',
									subtext:'(近7日每日扫码烟包结构分析)',
									left:'center'
								},
							    color: ['#3398DB'],
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '5%',
							        containLabel: true
							    },
							    xAxis : [
							        {	name:'日期',
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
							        {	
							        	name:'单包结构 (元)',
							            type : 'value'
							        }
							    ],
							    series : [
							        {
							            name:'扫码次数',
							            type:'line',
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
			drawTable(){
				var that=this;
				this.$request.post(
					'/record/consumer/getUserBrandScanTable', {
						mobileNo:that.phone,
						openId:that.openId,
						endTime:that.endTime
					},
					true,
					res => {
						var data=res || [];
						that.loading5=false;
						that.tableData=data;
					},
					err => {
						console.log(err)
					}
				)
			},
			drawThirty(){
				var that=this;
				var myChart4 = this.$echarts.init(document.getElementById("thirty"));
						var optionFour = {
							"title":{
								"text":'用户扫码轨迹'
							},
							"xAxis": {
								"type": "category",
								"splitLine": {
									"show": "true",
									"lineStyle": {
										"color": [
											"#e2e2e2"
										],
										"type": "solid"
									}
								},
								"data": [
								"2017-01-01",
								"2017-01-02",
								"2017-01-03",
								"2017-01-04",
								"2017-01-05",
								"2017-01-06",
								"2017-01-07",
								"2017-01-08",
								"2017-01-09",
								"2017-01-10"
								]
							},
							"yAxis": {
								"splitLine": {
									"show": "true",
									"lineStyle": {
										"color": [
											"#e2e2e2"
										],
										"type": "solid"
									}
								},
								"scale": "true",
								"data":[
									""
								],
								"axisLabel": {
									"interval": 0,
									"rotate":50
								}
							},
							"dataZoom": [
						          {
						            "type": "slider",
						            "show": true,
						            "xAxisIndex": [0],
						            "start": 0,
						            "end": 100
						        },
						        {
						            "type": "slider",
						            "show": true,
						            "yAxisIndex": [0],
						            "left": "93%",
						            "start": 0,
						            "end": 100,
						            "right":80
						        },
						        {
						            "type": "inside",
						            "xAxisIndex": [0],
						            "start": 0,
						            "end": 50
						        },
						        {
						            "type":"inside",
						            "yAxisIndex": [0],
						            "start": 0,
						            "end": 50,
						            "right":80
						        }
						      ],
							"series": {
								"name":"扫码烟包数",		
								"type": "scatter",
								"symbolSize": "symbolSize",
								"data": [""]
							},
							"label": {
								"emphasis": {
									"show": "true",
									"formatter":"formatter",
									 "position": "top"
									
								}
							},
							"itemStyle": {
								"normal": {
									"shadowBlur": 10,
									"shadowColor": "rgba(25, 100, 150, 0.5)",
									"shadowOffsetY": 5,
									"color": "rgb(25, 183, 207)"
								}
							}
						}
						var dataX = dataX = []
						var datamdg = [
							['2017-01-01', '芙蓉王（硬细支）', 1],
							['2017-01-02', '白沙(精品二代)', 2],
							['2017-01-03', '芙蓉王（硬细支）', 1],
							['2017-01-04', '芙蓉王（硬细支）', 3],
							['2017-01-05', '芙蓉王（硬细支）', 1],
							['2017-01-06', '白沙(精品二代)', 1],
							['2017-01-07', '芙蓉王（硬细支）', 2],
							['2017-01-08', '芙蓉王（硬细支）', 0],
							['2017-01-09', '白沙(硬精品三代)', 0],
							['2017-01-10', '白沙(硬红运当头)', 1]
						];
						//						console.log(datamdg)
						var data = [];
						var dataY = [];
						optionFour.xAxis.data = [];
						optionFour.yAxis.data = [];
						optionFour.series.data = [];
				this.$request.post(
					'/record/consumer/getUserScanBrandThirty', {
						mobileNo:that.phone,
						openId:that.openId,
						endTime:that.endTime
					},
					true,
					res => {
						var data=res || [];
						data=[{"effectScanPv":2,"productName":"钻石（洪荒之绿）盒","statDate":"2018-10-31"}]
						
						var sum = 0;
						var EffectScanPv=data;
						for(var i = 0; i < data.length; i++) {
							sum = sum + data[i].effectScanPv;
						}
					},
					err => {
						console.log(err)
					}
				)
				this.$request.post(
					'/record/consumer/getUserScanLocus', {
						mobileNo:that.phone,
						openId:that.openId,
						endTime:that.endTime
					},
					true,
					res => {
						var str = "";
						var str2 = "";
						var str3 = "";
						var res = res || [];
						res=[{"effectScanPv":0,"productName":"-","statDate":"2018-10-03"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-04"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-05"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-06"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-07"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-08"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-09"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-10"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-11"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-12"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-13"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-14"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-15"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-16"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-17"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-18"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-19"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-20"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-21"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-22"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-23"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-24"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-25"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-26"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-27"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-28"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-29"},{"effectScanPv":0,"productName":"-","statDate":"2018-10-30"},{"effectScanPv":2,"productName":"钻石（洪荒之绿）盒","statDate":"2018-10-31"},{"effectScanPv":0,"productName":"-","statDate":"2018-11-01"}]
						//							console.log(optionFour.series.data)
						//去重
						Array.prototype.unique3 = function() {
							var res = [];
							var json = {};
							for(var j = 0; j < this.length; j++) {
								if(!json[this[j]]) {
									res.push(this[j]);
									json[this[j]] = 1;
								}
							}
							return res;
						}
						var result = [];
						var result2 = [];
						var result3 = [];
						for(var i = 0; i < res.length; i++) {
							str = res[i].productName;
							str2 = res[i].statDate;
							str3 = res[i].effectScanPv;
							result.push(str);
							result2.push(str2);
							result3.push(str3);
						}
						dataY = result.unique3();
						dataX = result2;
						var dataInfo = []
						var datalist=[];
						for(var e = 0; e < res.length; e++) {

							data = result2[e] + ',' + result[e] + ',' + result3[e];
							datalist = data.split(",");
							//							console.log(data)

							dataInfo.push(datalist)
						}
						//							console.log(dataInfo)

						//循环遍历三组数据
						for(var a = 0; a < dataX.length; a++) {
							optionFour.xAxis.data.push(dataX[a])
						} //X轴
						for(var b = 0; b < dataY.length; b++) {
							optionFour.yAxis.data.push(dataY[b])
						} //Y轴
						for(var z = 0; z < dataInfo.length; z++) {
							optionFour.series.data.push(dataInfo[z])
						} //数据
						optionFour.series.symbolSize = function(data) {
							return Math.sqrt(data[2]) * 5;
						}

						optionFour.label.emphasis.formatter = function(param) {
							//							console.log(data)
							return param.data;
						};
						that.loading6=false;
						myChart4.setOption(optionFour, true);
					},
					err => {
						console.log(err)
					}
				)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.userPortrait-root {
		color: #707478;
		.portrait-title {
			line-height: 30px;
			font-size: 16px;
			color: #888;
			margin-bottom: 10px;
		}
		.search-con {
			height: 80px;
			background: #fff;
			padding: 10px;
			border-radius: 4px;
			.title {
				font-size: 16px;
				line-height: 40px;
				padding-left: 20px;
			}
			.inputs {
				margin-left: 30px;
				.phone-input {
					width: 240px;
				}
				.tpl-con {
					height: 100px;
					overflow-y: auto;
					padding: 10px 0 10px 0;
					.el-radio {
						display: block;
						margin-bottom: 20px;
					}
					.el-radio+.el-radio {
						margin-left: 0;
					}
				}
				.oper {
					height: 30px;
					position: relative;
					.sure {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top:0;
					}
				}
			}
		}
		.result-con {
			background: #fff;
			padding: 10px;
			border-radius: 4px;
			margin-top: 20px;
			.user-info {
				width:60%;
				border:1px solid #ccc;
				margin: 0 auto;
				padding: 0 20px 20px 20px;
				.title {
					color:#3d467d;
					font-size: 14px;
					line-height: 25px;
					height: 25px;
					border-bottom: 1px solid #ccc;
					margin-bottom: 20px;
					span {
						font-size: 12px;
						color:#707478;
					}
				}
				.info-con {
					border:1px solid #ccc;
					background: #fcfcfc;
					overflow: hidden;
					padding: 20px 0 20px 0;
					p {
						margin: 0;
					}
					.left {
						float: left;
						padding-left: 40px;
					}
					.right {
						float: left;
						padding-left: 50px;
						border-left: 1px solid #ccc;
						margin-left: 60px;
					}
				}
			}
			.pie-part {
				overflow: hidden;
				margin-top: 20px;
				#pie {
					width:30%;
					height: 300px;
					float: left;
				}
				#pieRight {
					width:70%;
					height: 300px;
					float: left;
				}
			}
			.table {
				width:801px;
				margin: 40px auto;
			}
		}
	}
</style>