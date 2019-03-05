<template>
	<div class="wplat-root">
		<div class="jump-set">
			<router-link to='/weplat/down'>去设置扫码落地页<span class='el-icon-arrow-right'></span></router-link>
		</div>
		<img src="http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc/activity.png" alt="" />
	</div>
</template>

<script>
</script>

<style lang="scss"scoped>
	.wplat-root {
		background: #fff;
		border-radius: 4px;
		min-height: 500px;
		color: #666;
		position: relative;
		img {
			width:300px;
			margin-top: 40px;
			margin-left: 50px;
			margin-bottom: 40px;
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