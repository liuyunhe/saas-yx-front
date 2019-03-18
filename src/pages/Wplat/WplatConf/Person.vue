<template>
	<div class="wplat-root">
		<div class='left'>
			<div class="phone":style='{background:wholeColor}'v-show='activeName=="one"'>
				<img src="http://qoss.qrmkt.cn/common/wplat/person_top.png" alt="" />
				<div class="person-top">
					<img :src="topImg" alt="" />
					<div class="header-img">
						<img src="http://qoss.qrmkt.cn/common/wplat/person_img.png" alt="" />
					</div>
				</div>
				<div class="icons":style='{background:iconColor}'>
					<ul>
						<li></li>
					</ul>
				</div>
				<div class="fen-banner">
					<img src="http://qoss.qrmkt.cn/common/wplat/person_banner1.png" alt="" />
				</div>
				<div class="vip-banner">
					<img src="http://qoss.qrmkt.cn/common/wplat/person_banner2.png" alt="" />
				</div>
				<img src="http://qoss.qrmkt.cn/common/wplat/person_bot_02.png" alt="" />
			</div>
			<div class="phone" v-show='activeName=="second"'>
				<img src="http://qoss.qrmkt.cn/common/wplat/share_top.png" alt="" />
				<div class="content-phone">
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
		<div class="right">
			<div class="box">
				<p class='title'>编辑个人中心</p>
				<el-tabs v-model="activeName" @tab-click="tabPartClick" class='tab-con'>
					<el-tab-pane label="页面设置" name="one">
						<div class="content">
							<div class="whole-color">
								<span>背景底色：</span>
								<el-color-picker v-model="wholeColor" class='color-select'></el-color-picker>
								<el-button size='small' @click='reset'>重置</el-button>
							</div>
							<div class='edit-con'>
								<span class='labels'>背景图片：</span>
								<div class="img-div">
									<img :src="topImg" alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadTop">
									<el-button type="primary">更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*284px格式为jpg\bmp\png\gif</div>
							</div>
							<div class="template-con">
								<span>选择模板：</span>
								<div class="template-right">
									<ul>
										<li v-for='(item,index) in template'@click='selectTpl(index)':class='{active:index==showTplIndex}'>
											<div class="show">
												<div v-for='i in item.count'></div>
											</div>									
											<p>{{item.text}}</p>
										</li>
									</ul>
								</div>
								<div class="template-up">
									<span class='title'>编辑图标：</span>
									<div v-for='i in count':class='{"icon-index":true,"active":showTabIndex==i}'@click='tabToggle(i)'>图标{{i}}</div>
									<div class="icon-up"v-for='i in count'v-show='showTabIndex==i'>
										<div class="img-div">
											<img :src="iconList[i-1].url" alt="" />
										</div>
										<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadIcon">
											<el-button type="primary"@click='getIndex(i-1)'>更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<div class="whole-color">
									<span>编辑底色：</span>
									<el-color-picker v-model="iconColor" class='color-select'></el-color-picker>
									<el-button size='small' @click='reset'>重置</el-button>
								</div>
							</div>
							<div class='edit-con up-con'>
								<span class='labels'>积分中心：</span>
								<div class="img-div">
									<img :src="integralImg" alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadjifen">
									<el-button type="primary">更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*204px格式为jpg\bmp\png\gif</div>
							</div>
							<div class='edit-con up-con'>
								<span class='labels'>会员中心：</span>
								<div class="img-div">
									<img :src="vipImg" alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadVip">
									<el-button type="primary">更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*204px格式为jpg\bmp\png\gif</div>
							</div>
							<div class="save">
							<div class="save-con">							
								<el-button type="primary" @click='save'>保存</el-button>
								<el-button type="primary" @click='init'>取消</el-button>
							</div>		
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
				activeName:'one',//tab栏切换（和分享切换）
				share:{
					title:'',
					desc:'',
					url:'http://qoss.qrmkt.cn/common/wplat/person_banner1.png'
				},
				wholeColor:'',//背景颜色
				iconColor:'',//图标背景颜色
				topImg:'http://qoss.qrmkt.cn/common/wplat/person_banner1.png',
				integralImg:'http://qoss.qrmkt.cn/common/wplat/person_banner1.png',
				vipImg:'http://qoss.qrmkt.cn/common/wplat/person_banner2.png',
				uploadAdd: location.origin + '/api/saotx/attach/commonAliUpload',
				imgHead: {
					token: sessionStorage.getItem('access_token'),
					loginId: sessionStorage.getItem('access_loginId')
				},
				template:[{
					text:'1行2个',
					count:2
				},
				{
					text:'1行3个',
					count:3
				},
				{
					text:'1行4个',
					count:4
				},
				{
					text:'2行5个',
					count:5
				},
				{
					text:'2行6个',
					count:6
				},
				{
					text:'2行7个',
					count:7
				},
				{
					text:'2行8个',
					count:8
				}],
				count:2,//选了几个图标
				showTabIndex:1,//点击了哪个图标
				showTplIndex:0,
				iconList:[{
					url:''
				},{
					url:''
				}],//图标列表
				editIndex:0,//编辑图标的索引
			}
		},
		created() {
			
		},
		methods: {
			tabToggle(index){
				this.showTabIndex=index;
			},
			selectTpl(index){
				this.iconList=[];
				this.count=index+2;
				this.showTplIndex=index;
				for(let i=0;i<this.count;i++){
					this.iconList.push({
						url:''
					})
				}
			},
			getIndex(index){
				this.editIndex=index;
			},
			uploadIcon(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.iconList[this.editIndex].url=imgUrl;
			},
			uploadTop(res){//上传头部背景
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.topImg = imgUrl;
			},
			uploadjifen(res){//上传头部背景
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.integralImg = imgUrl;
			},
			uploadVip(res){//上传头部背景
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.vipImg = imgUrl;
			},
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
	* {
		box-sizing: border-box;
	}
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
			.icons {
				min-height: 60px;
				background: #fff;
				margin-top: 10px;
				margin-bottom: 10px;
			}
			.fen-banner {
				margin-bottom: 10px;
			}
			.vip-banner {
				margin-bottom: 10px;
			}
			.header-img {
				width:80px;
				height: 40px;
				position: absolute;
				left: 20px;
				bottom:20px;
			}
			.content-phone {
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
			height: 1500px;
			margin-left: 320px;
			overflow: hidden;
			.box {
				border:1px solid #ccc;
				padding-bottom: 20px;
				margin:40px;
				.title {
					padding-left: 20px;
					font-size: 20px;
					font-weight: bold;
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
				.content {
					/*padding-left: 20px;
					padding-right: 20px;*/
					margin-bottom: 100px;
					.whole-color {
						margin-bottom:20px;
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
			            }
			            .el-upload__tip {
			            	margin-left: 48px;
			            }
					}
					.template-con {
						margin-top: 20px;
						background: #efefef;
						border-radius: 4px;
						padding-top: 20px;
						padding-right: 20px;
						padding-bottom: 10px;
						span {
							vertical-align: middle;
							font-weight: bold;
							font-size: 16px;
							width:130px;
							display: inline-block;
							text-align: right;
							margin-right: 20px;
						}
						.template-right {
							display: inline-block;
							vertical-align: top;
							ul {
								width:430px;
								li {
									width:120px;
									height: 120px;
									border:1px solid #ccc;
									display: inline-block;
									background: #fff;
									margin-right: 20px;
									margin-bottom: 20px;
									vertical-align: top;
									cursor: pointer;
									&.active{
										border:1px solid #999;
										background: #F0F0F0;
									}
									&:hover {
										border:1px solid #999;
										background: #F0F0F0;
									}
									.show {
										height: 80px;
										div {
											background: #e6eff8;
										}
									}
									p {
										margin: 0;
										margin-top:6px;
										text-align: center;
									}
									&:nth-child(1){
										.show {
											padding: 5px;
											height: 85px;
											div {
												width:51px;
												height: 80px;
												float: left;
												&:nth-child(1) {
													margin-right: 5px;
												}
												
											}
										}
									}
									&:nth-child(2){
										.show {
											padding: 5px;
											height: 85px;
											div {
												width:32px;
												height: 80px;
												float: left;
												&:nth-child(1) {
													margin-right: 5px;
												}	
												&:nth-child(2) {
													margin-right: 5px;
												}											
											}
										}
									}
									&:nth-child(3){
										.show {
											padding: 5px;
											height: 85px;
											div {
												width:23px;
												height: 80px;
												float: left;
												margin-right: 5px;	
												&:last-child {
													margin-right: 0;
												}											
											}
										}
									}
									&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7){
										.show {
											padding: 5px;
											height: 85px;
											div {
												width:23px;
												height: 36px;
												float: left;
												margin-right: 5px;	
												margin-bottom: 5px;
												&:nth-child(4) {
													margin-right: 0;
												}
												&:nth-child(8) {
													margin-right: 0;
												}											
											}
										}
									}
								}
							}
						}
						.template-up{
							margin-bottom: 20px;
							.icon-index {
								display: inline-block;
								vertical-align: middle;
								cursor: pointer;
								margin-right: 20px;
								border-bottom: 2px solid #efefef;
								&.active {
									border-bottom:2px solid #5c88da;
								}
							}
							.icon-up {
								height: 130px;
								background: red;
							}
						}
					}
					.up-con {
						margin-top: 20px;
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