<template>
	<!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 新建活动模板
  -->
	<div class="addActTamConf-container">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>活动</el-breadcrumb-item>
			<el-breadcrumb-item>活动模板配置</el-breadcrumb-item>
			<el-breadcrumb-item>模板设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-tabs v-model="activeName">
				<el-tab-pane label="首页" name="home" class="clearfix">
					<div class="ipone">
						<div class="header">
							<p>{{addActParams.name}}</p>
						</div>
						<div class="content phone">
							<div class="bg"><img :src="configItem.bgImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 1"></div>
							<div class="top"><img :src="configItem.headerImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 2"></div>
							<div class="game-con">
								<div class="game-item" v-for="item in iconUrl" :key="item.key"><img :src="item.imgUrl" alt=""></div>
							</div>
							<div class="tip">
								<img :src="configItem.actTip" @click="showEditConIndex = 3" alt="" />
							</div>
						</div>
						<div class="footer"></div>
					</div>
					<div class="edit-box">
						<el-form :model="addActParams" :rules="addActRules" ref="ruleForm" label-width="100px" label-position="top">
							<el-form-item label="模板名称" prop="name">
								<el-input v-model="addActParams.name" placeholder="请输入模板名称" maxLength='15'></el-input>
							</el-form-item>
							<el-form-item label="模板说明">
								<el-input type="textarea" :rows="3" v-model="addActParams.note" maxLength='20' placeholder="请输入模板描述" maxlength="50" resize="none"></el-input>
							</el-form-item>
						</el-form>
						<el-card class="edit-img" shadow="hover">
							<div slot="header" class="clearfix">
								<span>编辑图片</span>
							</div>
							<div class="edit-con">
								<div class="edit-bg-img" v-if="showEditConIndex == 1">
									<p class="img-title">背景图片:</p>
									<div class="img-con"><img :src="configItem.bgImgUrl" alt=""></div>
									<div class="btn-con">
										<el-upload :action="uploadURL" :headers="headerObj" :on-success="upBgImgSuccess" :show-file-list="false">
											<el-button size="small" type="primary">更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<div class="edit-top-img" v-if="showEditConIndex == 2">
									<p class="img-title">活动标题:</p>
									<div class="img-con"><img :src="configItem.headerImgUrl" alt=""></div>
									<div class="btn-con">
										<el-upload :action="uploadURL" :headers="headerObj" :on-success="upTopImgSuccess" :show-file-list="false">
											<el-button size="small" type="primary">更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<div class="edit-game-img" v-if="showEditConIndex == 3">
									<div>
										<p class="img-title">活动说明</p>
										<div class="img-con act-tip-img"><img :src="configItem.actTip" alt=""></div>
										<div class="btn-con">
											<el-upload :action="uploadURL" :headers="headerObj" :on-success="upTipImgSuccess" :show-file-list="false">
												<el-button size="small" type="primary">更换图片</el-button>
											</el-upload>
										</div>
									</div>
								</div>
								<p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 750*1208px格式为jpg\bmp\png\gif</p>
								<p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 730*280px格式为jpg\bmp\png\gif</p>
								<p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 74*90px格式为jpg\bmp\png\gif</p>
							</div>

						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="活动说明页面" name="actDesc" class="clearfix">
					<div class="ipone">
						<div class="header"></div>
						<div class="content">
							<div class="bg"><img src="https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/huodongshuoming.png"></div>
						</div>
						<div class="footer"></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="我的奖品页面" name="myPrize" class="clearfix">
					<div class="ipone">
						<div class="header"></div>
						<div class="content">
							<div class="bg"><img src="https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/wodedjiangpin.png"></div>
						</div>
						<div class="footer"></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="中奖页面" name="winning" class="clearfix">
					<div class="ipone">
						<div class="header"></div>
						<div class="content">
							<div class="bg"><img :src="configItem.bgImgUrl"></div>
							<div class="winning">
								<div class="prize-con award-con">
									<img :src="configItem.drawBgUrl" class='award-alert' alt="" />
									<div class="close">X</div>
									<img class="pic" :src="configItem.drawImgUrl" alt="">
									<div class="award-text">
										<h3>奖品名称</h3>
										<p>请在24小时内领取</p>
									</div>
									<img class="prize-btn" :src="configItem.drawBtnUrl" alt="">
								</div>
							</div>
						</div>
						<div class="footer"></div>
					</div>
					<div class="edit-box">
						<el-card class="edit-img" shadow="hover">
							<div slot="header" class="clearfix">
								<span>编辑图片</span>
							</div>
							<div class="edit-con">
								<div class="edit-winning-img">
									<p class="img-title">弹框:</p>
									<div class="img-con"><img :src="configItem.drawBgUrl" alt=""></div>
									<div class="btn-con">
										<el-upload :action="uploadURL" :headers="headerObj" :on-success="upWinningBgSuccess" :show-file-list="false">
											<el-button size="small" type="primary">更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<p class="tips">* 图片建议尺寸为 562*638px,格式为jpg\bmp\png\gif</p>
							</div>
							<div class="edit-con">
								<div class="edit-winning-img">
									<p class="img-title">按钮:</p>
									<div class="img-con"><img :src="configItem.drawBtnUrl" alt=""></div>
									<div class="btn-con">
										<el-upload :action="uploadURL" :headers="headerObj" :on-success="upWinningBtnSuccess" :show-file-list="false">
											<el-button size="small" type="primary">更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<p class="tips">* 图片建议尺寸为 280*60px,格式为jpg\bmp\png\gif</p>
							</div>
							
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="未中奖页面" name="notWinning" class="clearfix">
					<div class="ipone">
						<div class="header"></div>
						<div class="content">
							<div class="bg"><img :src="configItem.bgImgUrl"></div>
							<div class="not-winning">								
								<div class="prize-con award-con">
									<div class="close">X</div>
									<img class="award-alert" :src="configItem.cryImgUrl" alt="">
									<div class="award-no-text">
										<h3>很遗憾，未中奖</h3>
									</div>
									<img class="prize-btn" :src="configItem.cryBtnUrl" alt="">
								</div>
							</div>
						</div>
						<div class="footer"></div>
					</div>
					<div class="edit-box">
						<el-card class="edit-img" shadow="hover">
							<div slot="header" class="clearfix">
								<span>编辑图片</span>
							</div>
							<div class="edit-con">
								<div class="edit-notWinning-img">
									<p class="img-title">弹框:</p>
									<div class="img-con"><img :src="configItem.cryImgUrl" alt=""></div>
									<div class="btn-con">
										<el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningImgSuccess" :show-file-list="false">
											<el-button size="small" type="primary">更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<p class="tips">* 图片建议尺寸为 562*638px，格式为jpg\bmp\png\gif</p>
							</div>
							<div class="edit-con">
								<div class="edit-notWinning-img">
									<p class="img-title">按钮:</p>
									<div class="img-con"><img :src="configItem.cryBtnUrl" alt=""></div>
									<div class="btn-con">
										<el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningBtnSuccess" :show-file-list="false">
											<el-button size="small" type="primary">更换图片</el-button>
										</el-upload>
									</div>
								</div>
								<p class="tips">* 图片建议尺寸为 280*60px，格式为jpg\bmp\png\gif</p>
							</div>
						</el-card>
					</div>
				</el-tab-pane>
				<div class="btn">
					<p>是否投放:
						<el-switch v-model="isPut">
						</el-switch>
					</p>
					<el-button size="small" type="primary" @click="saveActTpl">保存</el-button>
				</div>
			</el-tabs>
		</el-card>
	</div>
</template>
<script>
	export default {
		props: ['id', 'edit'],
		data() {
			return {
				activeName: 'home',
				addActParams: {
					conf: '',
					form: 'act-103',
					id: '',
					name: '',
					note: ''
				},
				addActRules: {
					name: [{
							required: true,
							message: '请输入模板名称',
							trigger: 'blur'
						},
						{
							max: 15,
							message: '长度不能超过 15 个字符',
							trigger: 'blur'
						}
					]
				},
				iconUrl: [{
						key: 1,
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
						$$hashKey: 'object:378'
					},
					{
						key: 2,
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
						$$hashKey: 'object:379'
					},
					{
						key: 3,
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
						$$hashKey: 'object:380'
					},
					{
						key: 4,
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
						$$hashKey: 'object:381'
					},
					{
						key: 5,
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
						$$hashKey: 'object:382'
					},
					{
						key: 6,
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
						$$hashKey: 'object:383'
					}
				],
				configItem: {
					title: '',
					description: '',
					headerImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg-title.png',
					bgImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/eggBg.png',
					actTip: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg-top.png',
					awardUrl: [{
						imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zhongjiang74@2x.png'
					}],
					drawBgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg-award-bg.png',
					drawImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/award_img.png',
					drawBtnUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg-award-btn.png',
					cryImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg-no-award-bg.png',
					cryBtnUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/egg-no-award-btn.png'
				},
				uploadURL: '/api/saotx/attach/commonAliUpload',
				headerObj: {
					loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
					token: sessionStorage.getItem('access_token'),
					CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
				},
				gameIndex: null, // 游戏区域图片索引
				showEditConIndex: 1, // 显示图片编辑器的序号
				isPut: true // 是否投放 默认投放
			}
		},
		computed: {},
		created() {
			this.getActDetail()
		},
		methods: {
			getActDetail() {
				if(this.id) {
					this.$request.post('/api/saotx/acttpl/detail', {
						id: this.id
					}, true, res => {
						if(res.ret === '200000') {
							this.addActParams = res.data
							this.configItem = JSON.parse(res.data.conf)
							if(res.data.statusName == '未投放') {
								this.isPut = false
							} else {
								this.isPut = true
							}
						} else {
							this.$message.error(res.message)
						}
					})
				} else if(this.edit) {
					this.$request.post('/api/saotx/act/pubTpl', {
						actCode: this.edit
					}, true, res => {
						if(res.ret === '200000') {
							this.addActParams = res.data
							this.addActParams.name = JSON.parse(res.data.conf).title
							this.addActParams.note = JSON.parse(res.data.conf).description
							// this.defaultConf = JSON.parse(res.data.conf)
							this.configItem = JSON.parse(res.data.conf)
							if(res.data.statusName == '未投放') {
								this.isPut = false
							} else {
								this.isPut = true
							}
						} else {
							this.$message.error(res.message)
						}
					})
				}
			},
			// 上传背景
			upBgImgSuccess(resule) {
				console.log(resule)
				if(resule.ret === '200000') return(this.configItem.bgImgUrl = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			// 上传头部标题
			upTopImgSuccess(resule) {
				if(resule.ret === '200000') return(this.configItem.headerImgUrl = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			// 获取点击的游戏区域图片的索引
			getGameIndex(index) {
				this.gameIndex = index
			},
			// 上传游戏图片
			upTipImgSuccess(resule) {
				if(resule.ret === '200000')
					return(this.configItem.actTip = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			// 上传未中奖图片
			upNotWinningImgSuccess(resule) {
				if(resule.ret === '200000') return(this.configItem.cryImgUrl = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			// 上传未中奖按钮图片
			upNotWinningBtnSuccess(resule) {
				if(resule.ret === '200000') return(this.configItem.cryBtnUrl = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			// 上传中奖按钮图片
			upWinningBtnSuccess(resule) {
				if(resule.ret === '200000') return(this.configItem.drawBtnUrl = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			upWinningBgSuccess(resule) {
				if(resule.ret === '200000') return(this.configItem.drawBgUrl = resule.data.accessUrl)
				this.$message.error(resule.message)
			},
			// 保存进入下一步
			saveActTpl() {
				if(!this.addActParams.name) return this.$message.warning('请输入模板名称')
				this.configItem.title = this.addActParams.name;
				this.configItem.description = this.addActParams.note
				this.addActParams.conf = JSON.stringify(this.configItem)
				if(this.edit) {
					this.$request.post('/api/saotx/act/mpubTpl', this.addActParams, true, res => {
						if(res.ret === '200000') {
							this.$message.success('保存成功')
							this.$router.push('/market/actMgr')
						} else {
							this.$message.error(res.message)
						}
					})
					return
				}
				this.$request.post('/api/saotx/acttpl/saveOrModify', this.addActParams, true, res => {
					if(res.ret === '200000') {
						// 投放
						if(this.isPut) {
							// 跳到活动基本信息页
							this.$router.push(
								'/market/actTpl/actSetConf?form=' + res.data.form + '&tplCode=' + res.data.tplCode
							)
						} else {
							// 不投放
							// 跳到活动模板
							this.$router.push('/market/actTpl')
						}
						this.$message.success('保存成功!')
						return
					}
					this.$message.error(res.message)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-tabs {
		padding: 0 20px;
		.el-tab-pane {
			padding: 30px;
			.ipone {
				float: left;
				width: 299px;
				margin: 0 20px;
				.header {
					position: relative;
					width: 100%;
					height: 66px;
					background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/937@2x.png') center no-repeat;
					p {
						position: absolute;
						bottom: 0;
						width: 100%;
						text-align: center;
						color: #fff;
						margin: 0;
					}
				}
				.phone {
					position: relative;
				}
				.content {
					position: relative;
					width: 100%;
					height: 483px;
					// background-color: red;
					.bg {
						width: 100%;
						height: 100%;
						transition: all 0.2s;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.top {
						position: absolute;
						top: 30px;
						left: 49%;
						transform: translateX(-50%);
						width: 250px;
						height: 122px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.tip {
						width: 30px;
						height: 50px;
						position: absolute;
						right: 5px;
						top: 10px;
						img {
							width: 100%;
							height: 100%;
							object-fit: contain;
						}
					}
					.game-con {
						position: absolute;
						left: 0;
						bottom: 42px;
						width: 100%;
						height: 200px;
						display: flex;
						justify-content: space-around;
						align-items: center;
						flex-wrap: wrap;
						.game-item {
							width: 33%;
							height: 50%;
							text-align: center;
							img {
								width: 70%;
								height: 100%;
							}
						}
					}
					.winning,
					.not-winning {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.5);
						.prize-con {
							width: 100%;
							height: 100%;
							color: #fff;
							text-align: center;
							&.award-con {
								.award-alert {
									width: 220px;
									height: 280px;
									position: absolute;
									left: 50%;
									transform: translate(-50%);
									top: 80px;
								}
								.close {
									position: absolute;
									transform: translate(236px, 80px);
									width: 20px;
									height: 20px;
									line-height: 20px;
									text-align: center;
									border: 1px solid #fff;
									border-radius: 50%;
								}
								.pic {
									max-width: 120px;
									// max-height: 200px;
									margin-top: 84px;
									margin-right: 20px;
									position: absolute;
									top: 70px;
									left: 50%;
									transform: translate(-50%);
								}
								.award-text {
									position: absolute;
									top: 240px;
									left: 50%;
									transform: translate(-50%);
								}
								.award-no-text {
									position: absolute;
									top: 255px;
									left: 50%;
									transform: translate(-50%);
									color: #666;
								}
								h3 {
									margin-bottom: 5px;
								}
								p {
									color: #fff;
									margin: 0;
								}
								.prize-btn {
									margin-top: 20px;
									max-width: 138px;
									max-height: 34px;
									position: absolute;
									top: 290px;
									transform: translate(-50%);
									left: 50%;
								}
							}
							.award-alert {
								width: 220px;
								height: 280px;
								position: absolute;
								left: 50%;
								transform: translate(-50%);
								top: 80px;
							}
							.close {
								position: absolute;
								transform: translate(232px, 56px);
								width: 20px;
								height: 20px;
								line-height: 20px;
								text-align: center;
								border: 1px solid #fff;
								border-radius: 50%;
								z-index: 9;
							}
							.pic {
								max-width: 196px;
								// max-height: 200px;
								margin-top: 84px;
								margin-right: 20px;
							}
							p {
								color: #fff;
							}
							.prize-btn {
								margin-top: 20px;
								max-width: 138px;
								max-height: 34px;
							}
						}
					}
					.not-winning {
						.prize-con {
							.pic {
								margin-right: 0;
							}
						}
					}
				}
				.footer {
					width: 100%;
					height: 64px;
					background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png') center no-repeat;
				}
			}
			.edit-box {
				float: left;
				width: 50%;
				margin: 0 20px;
				.edit-con {
					// 公共样式
					.img-con {
						width: 30%;
						height: 130px;
						line-height: 130px;
						text-align: center;
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						margin: 0 10px;
					}
					.act-tip-img {
						height: 100%;
					}
					.btn-con {
						position: relative;
						.el-button {
							position: absolute;
							bottom: 0;
						}
					}
					.edit-bg-img {
						display: flex;
						img {
							align-items: center;
							height: 100%;
						}
					}
					.edit-top-img {
						display: flex;
						.img-con {
							width: 40%;
							display: flex;
							justify-content: center;
							align-items: center;
							img {
									max-width: 90%;
							    max-height: 90%;
							    margin-top: 5%;
							    object-fit: contain;	
							}
						}
					}
					.edit-game-img>div {
						display: flex;
						margin-bottom: 10px;
						.img-con {
							display: flex;
							justify-content: center;
							align-items: center;
							img {
								max-width: 90%;
						    max-height: 90%;
						    margin-top: 5%;
						    object-fit: contain;
							}
						}
					}
					.edit-winning-img {
						display: flex;
						img {
							max-width: 90%;
					    max-height: 90%;
					    margin-top: 5%;
					    object-fit: contain;
						}
					}
					.edit-notWinning-img {
						display: flex;
						.img-con {
							display: flex;
							justify-content: center;
							align-items: center;
							img {
								max-width: 90%;
						    max-height: 90%;
						    margin-top: 5%;
						    object-fit: contain;
							}
						}
					}
				}
				.tips {
					color: #999;
					margin-top: 10px;
					margin-bottom: 10px;
				}
			}
		}
	}
	
	// 只有首页有效果
	.el-tabs .el-tab-pane:first-child {
		.bg:hover,
		.tip:hover,
		.top:hover {
			transform: scale(0.99);
			cursor: pointer;
			filter: brightness(60%);
			border: 2px dotted #fff;
			box-sizing: border-box;
		}
		.top:hover {
			transform: translateX(-50%) scale(0.99);
		}
	}
	
	.btn {
		text-align: center;
		p {
			font-size: 16px;
			margin-bottom: 20px;
		}
		.el-button {
			width: 130px;
			height: 40px;
		}
	}
</style>