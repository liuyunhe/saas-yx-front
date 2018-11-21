<template>
	<div class="style-root clearfix">
		<div class="nav-img">

			<div class='nav-item'>
				<div class="right_btn" :style="{background:colorValue}">立即兑换</div>
				<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/pro_detail.png" alt="" />
			</div>
			<div class='nav-item'>
				<div class="click-con" :style="{background:colorValue}">
					确认领取
				</div>
				<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/pro_btn.png" alt="" />
			</div>

		</div>
		<div class="set">
			<label for="">平台风格: </label>
			<el-color-picker v-model="colorValue" class='color-select'></el-color-picker>
			<br />
			<br />
			<br />
			<div>
				<el-button type="primary" size='small' @click='save'>保存</el-button>
				<el-button type="primary" size='small' @click='colorValue=initValue' plain>重置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				colorValue: '#297873',
				initValue: '',
				id: ''
			}
		},
		created() {
			this.init()
		},
		methods: {
			save() {
				var that = this;
				var conf = JSON.stringify({
					bgColor: that.colorValue
				})
				this.$request.post('/api/saotx/weplat/styleSaveOrModify', {
					id: that.id,
					conf: conf,
					publish: 1
				}, true, (res) => {
					if(res.ret === '200000') {
						that.$message({
							message: '保存成功',
							type: 'success'
						});
						that.init();
					}
				})
			},
			init() {
				var that = this;
				this.$request.post('/api/saotx/weplat/style', {}, true, (res) => {
					if(res.ret === '200000') {
						var DATA = res.data || {};
						if(!DATA.id) {
							that.colorValue = '#297873';
						} else {
							var conf = JSON.parse(DATA.conf)
							if(!conf.bgColor){
								that.colorValue='#297873'
							}else {
								that.colorValue = conf.bgColor;
							}						
							that.id = DATA.id;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clearfix:after {
		content: " ";
		display: block;
		line-height: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	
	.style-root {
		background: #fff;
		border-radius: 4px;
		color: #666;
		padding: 40px 20px 20px 20px;
		.nav-img {
			float: left;
			width: 720px;
			position: relative;
			.nav-item {
				float: left;
				width: 300px;
				position: relative;
				&:nth-child(2) {
					margin-left: 40px;
				}
				&>img {
					width: 300px;
					height: 550px;
					/*margin-top: 25px;*/
				}
				.click-con {
					width: 280px;
					height: 38px;
					text-align: center;
					line-height: 38px;
					position: absolute;
					bottom: 19px;
					left: 10px;
					border-radius: 4px;
					color: #fff;
				}
				.right_btn {
					width: 80px;
					height: 37px;
					position: absolute;
					right: 0;
					bottom: 3px;
					text-align: center;
					line-height: 37px;
					color: #fff;
				}
			}
		}
		.set {
			float: left;
		}
	}
</style>