<template>
	<div class="wplat-root">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="扫码验证完成页面" name="first">
				<first>
					<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/has.png" alt="" />
				</first>
			</el-tab-pane>
			<el-tab-pane label="未扫码页面" name="second">
				<second>
					<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/not.png" alt="" />
				</second>
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
		img {
			width: 300px;
			margin-top: 10px;
			margin-left: 20px;
		}
	}
</style>