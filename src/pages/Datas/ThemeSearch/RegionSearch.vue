<template>
	<div class="region-root">
		<div class="region-title"><span class='el-icon-search'></span>&nbsp;地域查询</div>
		<div class="search-con">
			类型：
			<el-select v-model="type1" placeholder="请选择" size='small' style='width:200px' @change='selectType'>
				<el-option label="日" value="日"></el-option>
				<el-option label="周" value="周"></el-option>
				<el-option label="月" value="月"></el-option>
			</el-select>
			<div class="date" v-show='searchShow=="日"'>
				查询日期：
				<el-date-picker v-model="date1" type="date" size='small' placeholder="选择日期" class='date-input'>
				</el-date-picker>
			</div>
			<div class="date" v-show='searchShow=="周"'>
				查询日期：
				<el-select v-model="week" placeholder="请选择" size='small' style='width:200px' @change='selectType'>
					<el-option v-for='item in weekList' :label="item.weekNo" :value="item.weekNo"></el-option>
				</el-select>
			</div>
			<div class="date" v-show='searchShow=="月"'>
				查询时间：
				<el-date-picker v-model="month" type="month" size='small' placeholder="选择月份" class='date-input'>
				</el-date-picker>
			</div>
			省份：
			<el-select v-model="provice" placeholder="请选择省份" size='small' style='width:200px' @change='cityChange'>
				<el-option v-for='item in proviceList' :label="item.name" :value="item.code"></el-option>
			</el-select>
			城市：
			<el-select v-model="city" placeholder="请选择城市" size='small' style='width:200px'>
				<el-option v-for='item in cityList' :label="item.cityName" :value="item.cityId"></el-option>
			</el-select>
			<div class="input-btns">
				<el-button type="primary" size='small' class='pri-btn' @click='search'>查询</el-button>
				<el-button type="primary" size='small' class='pri-btn' @click='resetSearch'>重置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type1: '日',
				searchShow: '日',
				date1: '',
				week: '',
				month: '',
				weekList: [],
				provice:'',
				proviceList:[],
				city:'',
				cityList:[]
			};
		},
		methods: {
			selectType(value) {
				var that = this;
				this.searchShow = value;
				if(value == '周') {
					this.$request.post(
						'/eee/statistics/getWeeks', {},
						true,
						res => {
							if(res.ret == '200000') {
								var data = res || [];
								that.weekList = res;
							}
						},
						err => {
							console.log(err)
						}
					)
				}
			},
			search(){
				
			},
			resetSearch(){
				
			},
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
	}
</style>