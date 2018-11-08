<template>
	<div class="wplat-root">
		<div class="jump-set">
			<router-link to='/weplat/down'>去设置扫码落地页<span class='el-icon-arrow-right'></span></router-link>
		</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="扫码验证完成页面" name="first">
				<div>
					<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/has.png" alt="" />
				</div>
			</el-tab-pane>
			<el-tab-pane label="未扫码页面" name="second">
				<div>
					<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/not.png" alt="" />
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wplat-root {
		background: #fff;
		border-radius: 4px;
		min-height: 500px;
		color: #666;
		padding: 20px 20px 20px 20px;
		position: relative;
		img {
			width: 300px;
			margin-top: 10px;
			margin-left: 20px;
		}
		.jump-set {
			a {
				font-size: 16px;
				color: #666;
				line-height: 30px;
				height: 30px;
				text-shadow: 0 0 3px #ccc;
				position: absolute;
				right:30px;
				top:15px;
				cursor: pointer;
				z-index: 3;
				&:hover {
					color:#ccc;
					text-shadow: 0 0 3px #666;
				}
			}
			
		}
	}
</style>