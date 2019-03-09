<template>
	<div class="wplat-root">		
		<div class='left'>
			<div class="phone" :style='{background:backgroundList[0].color}'>
				<img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/common/wplat/banner-top.png" alt="" />
				<img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/common/wplat/navs.png"class='navs' alt="" />
				<div class="hot">
					<img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/common/wplat/hot.png" alt="" />
				</div>
				<div class="hot-title">
					<div class="hot-box":style='{background:backgroundList[1].color}'>
						
					</div>
					<p>最热销款*积分兑换即可到手</p>
				</div>
				<div class="hot-circle":style='{background:backgroundList[1].color}'>
					<img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/common/wplat/hot.png" alt="" />
				</div>		
				<div class="item-title">
					<p :style='{background:backgroundList[2].color}'>电子专场</p>
				</div>
				<img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/common/wplat/item.png" class='item' alt="" />
				<img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/common/wplat/shop_bot.png" alt="" />
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
	export default {
		data() {
			return {
				backgroundList:[{
					name:'整体背景色',
					color:'#efefef'
					
				},
				{
					name:'热销商品背景色',
					color:'#faedd3'
					
				},{
					name:'推荐位标题背景色',
					color:'#ff7e27'
				}]
			}
		},
		created() {
			
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
			img{
				width: 100%;				
			}
			.navs {
				margin-top: 20px;
			}
			.hot {
				overflow: hidden;
				img {
					margin-top: -150px;
				}
			}
			.hot-circle {
				overflow: hidden;
				height: 150px;
			}
			.item {
				margin-bottom: 20px;
			}
			.hot-title {
				height: 50px;
				position: relative;
				overflow: hidden;
				.hot-box {
					position: absolute;
					top:0;
					left: 50%;
					transform: translateX(-50%);
					width:115%;
					height: 170px;
					border-radius: 50% 50% 0 0;
				}
				p {
					color:#ea7d5e;
					position: absolute;
					text-align: center;
					width:100%;
					padding-top: 5px;
				}
			}
			.item-title {
				height: 30px;
				line-height: 30px;
				p {
					float: left;
					height: 100%;
					border-radius: 0 20px 20px 0;
					color:#fff;
					padding-left: 20px;
					padding-right: 30px;
				}
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