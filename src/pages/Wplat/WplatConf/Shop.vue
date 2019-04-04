<template>
	<div class="wplat-root">		
		<div class='left'>
			<div class="phone" :style='{background:backgroundList[0].color}'v-show='activeName=="one"'>
				<img src="http://qoss.qrmkt.cn/common/wplat/banner-top.png" alt="" />
				<img src="http://qoss.qrmkt.cn/common/wplat/navs.png"class='navs' alt="" />
				<div class="hot">
					<img src="http://qoss.qrmkt.cn/common/wplat/hot.png" alt="" />
				</div>
				<div class="hot-title">
					<div class="hot-box":style='{background:backgroundList[1].list[0].color}'>
						
					</div>
					<p :style='{color:backgroundList[1].list[1].color}'>最热销款*积分兑换即可到手</p>
				</div>
				<div class="hot-circle":style='{background:backgroundList[1].list[0].color}'>
					<img src="http://qoss.qrmkt.cn/common/wplat/hot.png" alt="" />
				</div>		
				<div class="item-title">
					<p :style='{background:backgroundList[2].color}'>电子专场</p>
				</div>
				<img src="http://qoss.qrmkt.cn/common/wplat/item.png" class='item' alt="" />
				<img src="http://qoss.qrmkt.cn/common/wplat/shop_bot.png" alt="" />
			</div>
			<div class="phone" v-show='activeName=="second"'>
				<img src="http://qoss.qrmkt.cn/common/wplat/share_top.png" alt="" />
				<div class="content">
					<div class="share-show">
						<div class="header"></div>
						<div class="text">
							<div class="share-title">{{share.title}}</div>
							<div class="share-desc">{{share.desc}}</div>
							<div class="share-img">
								<img :src="share.url" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right" >
			<div class="box">
				<p class='title'>编辑积分商城</p>
				<el-tabs v-model="activeName" @tab-click="tabPartClick" class='tab-con'>
					<el-tab-pane label="页面设置" name="one">	
						<ul>
							<li v-for='(item,index) in backgroundList'>		
								<div v-if='index==0 || index==2'>
									<span>{{item.name}}</span>
									<el-color-picker v-model="item.color" class='color-select'></el-color-picker>
									<el-button size='small' @click='reset'>重置</el-button>
								</div>		
								<div class="title"v-if='index==1'>热销商品</div>
								<div class="title"v-if='index==2'>推荐位</div>
								<div v-for='(v,i) in item.list'class='child-div'>
									<span>{{v.name}}</span>
									<el-color-picker v-model="v.color" class='color-select'></el-color-picker>
									<el-button size='small' @click='reset'>重置</el-button>
								</div>
							</li>
						</ul>
						<div class="save">
							<div class="save-con">							
								<el-button type="primary" @click='save'>保存</el-button>
								<el-button type="primary" @click='init'>取消</el-button>
							</div>		
						</div>
					</el-tab-pane>
					<el-tab-pane label="分享设置" name="second">	
						<div class="share-set">
							<div class='edit-con'>
								<span class='labels'>分享标题：</span>
								<el-input v-model="share.title" placeholder="请输入分享标题" maxlength='15' class='tpl-name' size='small'></el-input>
							</div>
							<div class='edit-con'>
								<span class='labels'>分享说明：</span>
								<el-input type="textarea" :rows="3" v-model="share.desc" placeholder="请输入分享说明" maxlength="30" resize="none" class='tpl-name'></el-input>
							</div>
							<div class='edit-con'>
								<span class='labels'>分享图标：</span>
								<div class="img-div">
									<img :src="share.url" alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="shareUp">
									<el-button type="primary">更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*204px格式为jpg\bmp\png\gif</div>
							</div>
							
						</div>
						<div class="save">
							<div class="save-con">							
								<el-button type="primary" @click='save'>保存</el-button>
								<el-button type="primary" @click='init'>取消</el-button>
							</div>		
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uploadAdd: location.origin + '/api/saotx/attach/commonAliUpload',
				imgHead: {
					token: sessionStorage.getItem('access_token'),
					loginId: sessionStorage.getItem('access_loginId')
				},
				backgroundList:[{
					name:'整体背景色',
					color:'#efefef',					
				},
				{					
					list:[{
						name:'背景色',
						color:'#faedd3'
					},{
						name:'标题色',
						color:'#ea7d5e'
					}]					
				},{
					name:'标题背景色',
					color:'#ff7e27'
				}],
				activeName: 'one',
				share:{
					title:'',
					desc:'',
					url:'http://qoss.qrmkt.cn/common/wplat/person_banner1.png'
				}
			}
		},
		created() {
			this.init();
		},
		methods: {
			save() {
				let that = this;
				let conf = JSON.stringify(this.backgroundList)
				this.$request.post('/api/saotx/org/somProp', {
					propKey:'shop_style',
					propValue:conf
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
				this.$request.post('/api/saotx/org/prop', {
					propKey:'shop_style'
				}, true, (res) => {
					if(res.ret === '200000') {
						var DATA = res.data || {};
						if(!DATA) {
							this.backgroundList=[{
								name:'整体背景色',
								color:'#efefef',					
							},
							{					
								list:[{
									name:'背景色',
									color:'#faedd3'
								},{
									name:'标题色',
									color:'#ea7d5e'
								}]					
							},{
								name:'标题背景色',
								color:'#ff7e27'
							}]
						} else {
							this.backgroundList = JSON.parse(DATA)
						}
					}
				})
			},
			shareUp(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.share.url = imgUrl;
			},
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
			.content {
				height: 400px;
				border:1px solid #efefef;
				border-top:none;
				.share-show {
					width:200px;
					padding-left: 40px;
					margin-left: 20px;
					padding-top: 20px;
					position:relative;
					.header {
						position: absolute;
						left: 0px;
						width:35px;
						height: 35px;
						top:30px;
						background: url('http://qoss.qrmkt.cn/common/wplat/person_img.png') no-repeat left / auto 35px;
					}
					.text {
						border:1px solid #eee;
						position: relative;
						font-size: 12px;
						min-height: 50px;
						padding: 10px 5px 10px 10px;
						.share-title {
							width:140px;
							font-weight: bold;
						}
						.share-desc {
							width:140px;
						}
						.share-img {
							width:40px;
							height: 40px;
							position: absolute;
							right:5px;
							top:10px;
							img {
								height: 100%;
								object-fit: contain;
							}
						}
					}
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
				>.title {
					padding-left: 20px;
					font-size: 20px;
					font-weight: bold;
					border-bottom: 1px solid #ccc;
					margin-bottom: 0;
					padding-bottom: 18px;
				}
				.tab-con{
					padding: 0 20px !important;
				}
				.share-set {
					background: #efefef;
					padding-top: 10px;
					margin-bottom: 100px;
					.tpl-name {
						width:420px;
						vertical-align: middle;
					}
					.edit-con {
						padding: 20px 20px 20px 0;
						background: #efefef;
						box-sizing: border-box;
						border-radius: 4px;
			            .labels {
			                width:130px;
			                font-weight: bold;
							font-size: 16px;
			                display: inline-block;
			                text-align: right;
			                margin-right: 20px;
			            }
			            .img-div {
			            	width:100px;
				            height: 100px;
				            border:1px dashed #d9d9d9;
				            border-radius: 4px;
				            display: inline-block;
				            vertical-align: middle;
				            background: #fff;
				            font-size: 60px;
				            text-align: center;
				            color:#d9d9d9;
				            font-weight: 100;
				            margin-right: 20px;
			                img {
			                    width:90%;
			                    height: 90%;
			                    margin-top: 5%;
			                    object-fit: contain;
			                }
			            }
			            .avatar-uploader {
			                display: inline-block;
			                vertical-align: middle;
			            }
			            .el-upload__tip {
			            	margin-left: 48px;
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
				ul {
					margin-bottom: 100px;
					li {
						height: 100px;
						line-height: 100px;
						padding-left: 20px;
						position: relative;
						border-radius: 4px;
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
						&:nth-child(2) {
							height: 180px;
							padding-top: 60px;
							background: #efefef;
							box-sizing: border-box;
						}
						&:nth-child(3) {
							padding-top: 40px;
							background: #efefef;
							box-sizing: border-box;
							margin: 20px 0;
							line-height: 50px;
						}
						.title {
							position: absolute;
							top:0;
							left: 20px;
							font-size: 17px;
							font-weight: bold;
							line-height: 40px;
						}
						.child-div {
							line-height: 50px;
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