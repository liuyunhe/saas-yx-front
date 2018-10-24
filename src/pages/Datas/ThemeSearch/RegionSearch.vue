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
					<el-option v-for='item in weekList' :label="item.weekNo" :value="item.weekNo"></el-option>
				</el-select>
			</div>
			<div class="date" v-show='searchShow=="month"'>
				查询月份：
				<el-date-picker v-model="month" type="month" size='small' placeholder="选择月份" class='date-input' @change='selectMonth'>
				</el-date-picker>
			</div>
			省份：
			<el-select v-model="provice" placeholder="请选择省份" size='small' style='width:200px' @change='cityChange'>
				<el-option v-for='item in proviceList' :label="item.name" :value="item.name"></el-option>
			</el-select>
			城市：
			<el-select v-model="city" placeholder="请选择城市" size='small' style='width:200px'>
				<el-option v-for='item in cityList' :label="item.cityName" :value="item.cityName"></el-option>
			</el-select>
			<div class="input-btns">
				<el-button type="primary" size='small' class='pri-btn' @click='search'>查询</el-button>
				<el-button type="primary" size='small' class='pri-btn' @click='resetSearch'>重置</el-button>
			</div>
		</div>
		<div class="echarts">
			<div class="yibiao">
				<div class="title">仪表盘中间值确定方式：往前推7天（包括当天）的均值</div>
				<div class="yi1" id="yibiao1" style="width:30%; height:300px">
				</div>
				<div class="yi1" id="yibiao2" style="width:30%; height:300px">
				</div>
				<div class="yi1" id="yibiao3" style="width:30%; height:300px">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type1: 'day',
				searchShow: 'day',
				date1: '',
				week: '',
				month: '',
				weekList: [],
				provice: '',
				proviceList: [],
				city: '',
				cityList: [],
				startTime: '',
			};
		},
		beforeMount() {
			this.getDefaultPro(this.getProvice);

		},
		mounted() {
			this.drawyibiao()
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
						that.proviceList = data;
						that.proviceList.forEach((item) => {
							if(item.code == proId) {
								that.provice = item.name;
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
						var proviceId = data[0].orgRegion;
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
						},
						err => {
							console.log(err)
						}
					)
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
			cityChange() {
				var that = this;
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

			},
			resetSearch() {
				this.type1 = '';
				this.date1 = '';
				this.provice = '';
				this.city = ''
			},
			drawyibiao() {
				console.log(document.getElementById('yibiao1'))
				let myChart = this.$echarts.init(document.getElementById('yibiao1'))
				// 绘制图表
				myChart.setOption({
					tooltip: {
						formatter: "{a} <br/>{c} {b}"
					},
					title: {
							text: '扫码次数(单位：万)',
							subtext: '扫码总次数(包含重复扫码的情况)',
							x:'center',
							y:220,
							textStyle:{
								fontSize: 12,
								fontWeight:'lighter',
							},
							subtextStyle:{
								fontSize:12,
								color:'#666'
							}
						},
					series: [{
						name: '速度',
						type: 'gauge',
						z: 3,
						min: 0,
						max: 220,
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
							formatter: function(value) {
								value = (value + '').split('.');
								value.length < 2 && (value.push('00'));
								return('00' + value[0]).slice(-2) +
									'.' + (value[1] + '00').slice(0, 2);
							},
							fontFamily: 'Arial',
							width: 0.1,
							color: '#666',
							fontSize: '14'
						},
						data: [{
							value: 20
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
							x:'center',
							y:220,
							textStyle:{
								fontSize: 12,
								fontWeight:'lighter',
							},
							subtextStyle:{
								fontSize:12,
								color:'#666'
							}
						},
					series: [{
						name: '速度',
						type: 'gauge',
						z: 3,
						min: 0,
						max: 220,
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
							formatter: function(value) {
								value = (value + '').split('.');
								value.length < 2 && (value.push('00'));
								return('00' + value[0]).slice(-2) +
									'.' + (value[1] + '00').slice(0, 2);
							},
							fontFamily: 'Arial',
							width: 0.1,
							color: '#666',
							fontSize: '14'
						},
						data: [{
							value: 20
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
							x:'center',
							y:220,
							textStyle:{
								fontSize: 12,
								fontWeight:'lighter',
							},
							subtextStyle:{
								fontSize:12,
								color:'#666'
							}
						},
					series: [{
						name: '速度',
						type: 'gauge',
						z: 3,
						min: 0,
						max: 220,
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
							interval:5,
						},
						detail: {
							// 其余属性默认使用全局文本样式，详见TEXTSTYLE
							formatter: function(value) {
								value = (value + '').split('.');
								value.length < 2 && (value.push('00'));
								return('00' + value[0]).slice(-2) +
									'.' + (value[1] + '00').slice(0, 2);
							},
							fontFamily: 'Arial',
							width: 0.1,
							color: '#666',
							fontSize: '14'
						},
						data: [{
							value: 20
						}]
					}]
				});

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
				display:inline-block;
			}
		}
	}
</style>