<template>
	<div class="style-root clearfix">
		<div class="nav-img">
			<img src="../../../assets/img/nav-edit.png" alt="" />
			<div class="click-con" :style="{background:colorValue}">
				保存
			</div>
		</div>
		<div class="set">
			<label for="">平台风格: </label>
			<el-color-picker v-model="colorValue" class='color-select'></el-color-picker>
			<br />
			<br />
			<br />
			<div>
				<el-button type="primary" size='small'@click='save'>保存</el-button>
				<el-button type="primary"size='small'@click='colorValue=initValue'plain>重置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				colorValue: '#fff',
				initValue: ''
			}
		},
		created() {

		},
		methods: {
			save(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clearfix:after {
		content: " ";
		display: block;
		;
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
			width: 383px;
			position: relative;
			&>img {
				width: 300px;
				height: 550px;
				/*margin-top: 25px;*/
				margin-left: 20px;
			}
			.click-con {
				width:280px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				position: absolute;
				bottom: 60px;
				left:30px;
				border-radius: 4px;
			}
		}
		.set {
			float: left;
		}
	}
</style>