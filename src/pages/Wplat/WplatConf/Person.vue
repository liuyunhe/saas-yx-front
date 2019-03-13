<template>
	<div class="wplat-root">
		<div class='left'>
			<div class="phone">
				<img src="http://qoss.qrmkt.cn/common/wplat/person_top.png" alt="" />
				<div class="person-top">
					<img src="http://qoss.qrmkt.cn/common/wplat/person_banner1.png" alt="" />
					<div class="header-img">
						<img src="http://qoss.qrmkt.cn/common/wplat/person_img.png" alt="" />
					</div>
				</div>
				
				
				<img src="http://qoss.qrmkt.cn/common/wplat/person_bot_02.png" alt="" />
			</div>
		</div>
		<div class="right">
			<div class="box">
				<p class='title'>背景设置</p>
				<ul>
					<li v-for='(item,index) in backgroundList'>
						<span>{{item.name}}</span>
						<el-color-picker v-model="item.color" class='color-select'></el-color-picker>
						<el-button size='small' @click='reset'>重置</el-button>
					</li>
				</ul>
			</div>
			<div class="save">
				<div class="save-con">							
					<el-button type="primary" @click='save'>保存</el-button>
					<el-button type="primary" @click='init'>取消</el-button>
				</div>		
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss"scoped>
	.wplat-root {
		background: #fff;
		border-radius: 4px;
		min-height: 1200px;
		color: #666;
		position: relative;
		.left {
			float: left;
			width: 300px;
			padding-left: 50px;
			padding-top:40px;
			img {
				width: 100%;				
			}
			.person-top {
				position: relative;
			}
			.header-img {
				width:80px;
				height: 40px;
				position: absolute;
				left: 20px;
				bottom:20px;
			}
		}
		.right {
			height: 900px;
			margin-left: 320px;
			overflow: hidden;
			.box {
				border:1px solid #ccc;
				margin:40px;
				.title {
					padding-left: 20px;
					font-size: 20px;
					font-weight: bold;
				}
				ul {
					li {
						height: 100px;
						border-top: 1px solid #ccc;
						line-height: 100px;
						padding-left: 20px;
						span {
							vertical-align: middle;
							font-weight: bold;
							font-size: 16px;
							width:130px;
							display: inline-block;
							text-align: right;
							margin-right: 20px;
						}
						.color-select {
							vertical-align: middle;
							margin-right: 20px;
						}
					}
				}
			}	
			.save {
			    width:100%;
			    height: 50px;
			    background: #fff;
			    position: absolute;
			    bottom: 0;
			    left: 0;
			    .save-con {
			        display: inline-block;
			        margin: 0 auto;
			        position: absolute;
			        left: 50%;
			        top:0;
			        margin-left: -97px;
			    }
			}		
		}
	}
</style>