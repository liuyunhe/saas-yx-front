<template>
	<div class="scan-root">
		<div class="add-part">
			<div class="title">扫码落地页配置</div>
			<el-tabs v-model="activeName" @tab-click="tabPartClick">
				<el-tab-pane label="模板设置" name="third">
					<div class="tplInfo">
						<span class='left-name'>
								<span class='require'>*</span>模板名称：
						</span>

						<el-input v-model="addlist.name" placeholder="请输入模板名称" maxlength='15' class='tpl-name' size='small'></el-input>
						<br /><br />
						<span class='left-name'>
								模板说明：
							</span>
						<el-input v-model="addlist.note" placeholder="请输入模板说明" maxlength='20' class='tpl-name' size='small'></el-input>
						<br /><br />
						<span class='left-name'>
							<span class='require'>*</span>请选择品牌：
							</span>
						<el-select class="filter-item" multiple v-model="selectBrand" placeholder="请选择品牌" size='small' @change='changeBr'>
							<el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
							</el-option>
						</el-select>
						<br /><br />
						<span class='left-name'>
							<span class='require'>*</span>请选择规格：
							</span>
						<el-select size='small' class="filter-item" multiple v-model="addlist.snArr" @visible-change='snCallback' placeholder="请选择规格">
							<el-option v-for="item in snList" :key="item.id" :label="item.allName" :value="item.sn">
							</el-option>
						</el-select>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Loading页设置" name="fourth">
					<div class="phone">
						<div class="has loading-show">
							<div class="phone-top"></div>
							<div class="loading-bg">
								<img :src="addlist.conf.loading.bg" alt="" />
								<div class="loading-box" :style="{border:'1px solid '+addlist.conf.loading.color+''}">
									<div class="inner-box" :style="{background:''+addlist.conf.loading.color+''}"></div>
								</div>
							</div>
							<div class="phone-bottom"></div>
						</div>
						<div class="loading-edit">
							<p class='title'>Loading页配置</p>
							<div class='edit-con'>
								<span class='labels'>loading页状态：</span>
						        <el-radio v-model="addlist.conf.loading.flag" :label="1">开启</el-radio>
						  		<el-radio v-model="addlist.conf.loading.flag" :label="0">关闭</el-radio>
							</div>
							<div class='edit-con' v-show="addlist.conf.loading.flag">
								<span class='labels'>更换图片：</span>
								<div class="img-div"><img :src="addlist.conf.loading.bg" alt="" /></div>
						        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadLoad">
									<el-button type="primary" v-if='addlist.conf.loading.bg'>更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*1204px格式为jpg\bmp\png\gif</div>
							</div>
							<div class='edit-con' v-show="addlist.conf.loading.flag">
								<span class='labels'>加载进度条设置：</span>
								<el-color-picker v-model="addlist.conf.loading.color" class='color-select'></el-color-picker>
							</div>
						</div>
						
					</div>
				</el-tab-pane>
				<el-tab-pane label="扫码落地页面设置" name="first">
					<div class='has clearfix'>
						<div class="phone">
							<div class="phone-top">
								<div class="title">
									<el-popover placement="right" width="400" trigger="click" class='title-click'>
										<div class="title-info">
											<p>标题配置</p>
											<br />
											<div class="detail">
												<div><span class='require'>*</span>页面名称:</div>
												<el-input v-model="addlist.conf.has.title.name" size='small' placeholder="请输入页面名称" maxlength='15'></el-input>
											</div>
											<br />
											<div class="detail">
												<div>页面描述:</div>
												<el-input v-model="addlist.conf.has.title.note" size='small' placeholder="请输入页面描述" maxlength='20'></el-input>
											</div>
											<br />
										</div>
										<el-button slot="reference"></el-button>
									</el-popover>
									<span class='click-tip' v-show='!addlist.conf.has.title.name'> <span class='require'>*</span> 点击编辑页面名称</span> {{addlist.conf.has.title.name}}
								</div>
							</div>
							<div class="yz">
								<el-popover placement="right" width="426" trigger="click" class='yz-click' v-if='addlist.conf.has.yz.botFlag'>
									<div class="yz-info">
										<p class='info-title'>验真模块配置</p>
										<div class="detail">
											<span class='labels'>主图样式</span>
											<el-radio v-model="addlist.conf.has.yz.botFlag" :label="1">半屏</el-radio>
						  					<el-radio v-model="addlist.conf.has.yz.botFlag" :label="0">全屏</el-radio>
										</div>
										<div class='edit-con' v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'><span class='require'>*</span>主图背景：</span>
											<div class="img-div">
												<img :src="addlist.conf.has.yz.productImg" v-show='addlist.conf.has.yz.productImg' alt="" />
												<p v-show='!addlist.conf.has.yz.productImg'>+</p>
											</div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadPro">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*500px格式为jpg\bmp\png\gif</div>
										</div>
										<div class='edit-con' v-show='!addlist.conf.has.yz.botFlag'>	
											<span class='labels'><span class='require'>*</span>主图背景：</span>
											<div class="img-div">
												<img :src="addlist.conf.has.yz.productImgBig" v-show='addlist.conf.has.yz.productImgBig' alt="" />
												<p v-show='!addlist.conf.has.yz.productImgBig'>+</p>
											</div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadProBig">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*730px格式为jpg\bmp\png\gif</div>
										</div>
										<div class="edit-con">
											<span class='labels'>详情按钮</span>
											<el-checkbox v-model="addlist.conf.has.yz.detailFlag"></el-checkbox>
											<span class='labels'></span>
											<span class='color-labels'>扫码落地页风格</span>
											<el-color-picker v-model="addlist.conf.has.yz.color" class='color-select'></el-color-picker>
										</div>										
										<div class="edit-con">
											<span class='labels'>提示语：</span>
											<el-input size='mini' v-model="addlist.conf.has.yz.note" class='note' placeholder="请输入内容" maxlength='26'></el-input>
										</div>
										<div class='edit-con'>
											<span class='labels'>一键反馈</span>
											<el-radio v-model="addlist.conf.has.yz.feedbackFlag" :label="1">显示</el-radio>
						  					<el-radio v-model="addlist.conf.has.yz.feedbackFlag" :label="0">不显示</el-radio>	
						  					<div class='line'></div>
						  					<div v-show='addlist.conf.has.yz.feedbackFlag'>
						  						<span class='labels'><span class='require'>*</span>反馈图片：</span>
												<div class="img-div">
													<img :src="addlist.conf.has.yz.feedbackImg" v-show='addlist.conf.has.yz.feedbackImg' alt="" />
													<p v-show='!addlist.conf.has.yz.feedbackImg'>+</p>
												</div>
										        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadFeed">
													<el-button type="primary">更换图片</el-button>
												</el-upload>
												<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 94*136px格式为jpg\bmp\png\gif</div>
						  					</div>
											
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<el-popover placement="right" width="426" trigger="click" class='yz-click-big' v-if='!addlist.conf.has.yz.botFlag'>
									<div class="yz-info">
										<p class='info-title'>验真模块配置</p>
										<div class="detail">
											<span class='labels'>主图样式</span>
											<el-radio v-model="addlist.conf.has.yz.botFlag" :label="1">半屏</el-radio>
						  					<el-radio v-model="addlist.conf.has.yz.botFlag" :label="0">全屏</el-radio>
										</div>
										<div class='edit-con' v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'><span class='require'>*</span>主图背景：</span>
											<div class="img-div">
												<img :src="addlist.conf.has.yz.productImg" v-show='addlist.conf.has.yz.productImg' alt="" />
												<p v-show='!addlist.conf.has.yz.productImg'>+</p>
											</div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadPro">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*500px格式为jpg\bmp\png\gif</div>
										</div>
										<div class='edit-con' v-show='!addlist.conf.has.yz.botFlag'>	
											<span class='labels'><span class='require'>*</span>主图背景：</span>
											<div class="img-div">
												<img :src="addlist.conf.has.yz.productImgBig" v-show='addlist.conf.has.yz.productImgBig' alt="" />
												<p v-show='!addlist.conf.has.yz.productImgBig'>+</p>
											</div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadProBig">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*730px格式为jpg\bmp\png\gif</div>
										</div>
									
										<div class="edit-con">
											<span class='labels'>详情按钮</span>
											<el-checkbox v-model="addlist.conf.has.yz.detailFlag"></el-checkbox>
											<span class='labels'></span>
											<span class='color-labels'>扫码落地页风格</span>
											<el-color-picker v-model="addlist.conf.has.yz.color" class='color-select'></el-color-picker>
										</div>										
										<div class="edit-con">
											<span class='labels'>提示语：</span>
											<el-input size='mini' v-model="addlist.conf.has.yz.note" class='note' placeholder="请输入内容" maxlength='20'></el-input>
										</div>
										<div class='edit-con'>
											<span class='labels'>一键反馈</span>
											<el-radio v-model="addlist.conf.has.yz.feedbackFlag" :label="1">显示</el-radio>
						  					<el-radio v-model="addlist.conf.has.yz.feedbackFlag" :label="0">不显示</el-radio>
						  					<div class='line'></div>
						  					<div v-show='addlist.conf.has.yz.feedbackFlag'>
						  						<span class='labels'><span class='require'>*</span>反馈图片：</span>
												<div class="img-div">
													<img :src="addlist.conf.has.yz.feedbackImg" v-show='addlist.conf.has.yz.feedbackImg' alt="" />
													<p v-show='!addlist.conf.has.yz.feedbackImg'>+</p>
												</div>
										        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadFeed">
													<el-button type="primary">更换图片</el-button>
												</el-upload>
												<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 94*136px格式为jpg\bmp\png\gif</div>
						  					</div>
											
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<div class="img-top" v-show='addlist.conf.has.yz.botFlag'>
									<img src="http://qoss.qrmkt.cn/new_platform/scan-002-imgB.png" alt="" v-show='!addlist.conf.has.yz.productImg' />
									<img :src="addlist.conf.has.yz.productImg" v-show='addlist.conf.has.yz.productImg' alt="" />
								</div>
								<div class="img-top-big" v-show='!addlist.conf.has.yz.botFlag'>
									<img src="http://qoss.qrmkt.cn/new_platform/scan-002-img.png" v-show='!addlist.conf.has.yz.productImgBig' alt="" />
									<img :src="addlist.conf.has.yz.productImgBig" v-show='addlist.conf.has.yz.productImgBig' alt="" />
								</div>
								<div class="yz-text">
									<p :style="{color:''+addlist.conf.has.yz.color+''}">尊敬的用户</p>
									<p :style="{color:''+addlist.conf.has.yz.color+''}">您扫描的【产品名称】是正品</p>
									<p class='time'>首扫时间：2018-09-23 12:34:56<span v-show='addlist.conf.has.yz.detailFlag' :style="{color:''+addlist.conf.has.yz.color+'',border:'1px solid '+addlist.conf.has.yz.color+''}">详情</span></p>
									<div class="tip">{{addlist.conf.has.yz.note}}</div>
									<img :src="addlist.conf.has.yz.feedbackImg" class='feedback' v-show='addlist.conf.has.yz.feedbackFlag' alt="" />
								</div>								
							</div>	
							<div class="bot-img" v-show='addlist.conf.has.yz.botFlag'>
								<el-popover placement="right" width="426" trigger="click" class='bot-click'>
									<div class="bot-info">
										<p class='info-title'>广告图配置</p>
										<div class='edit-con' v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'><span class='require'>*</span>广告图：</span>
											<div class="img-div">
												<img :src="addlist.conf.has.yz.botImg" v-show='addlist.conf.has.yz.botImg' alt="" />
												<p v-show='!addlist.conf.has.yz.botImg'>+</p>
											</div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadBot">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*200px格式为jpg\bmp\png\gif</div>
										</div>
									</div>								
									<el-button slot="reference"></el-button>
								</el-popover>
								<img src="http://qoss.qrmkt.cn/new_platform/scan-002-bot.png" v-show='!addlist.conf.has.yz.botImg' alt="" />
								<img :src="addlist.conf.has.yz.botImg" v-show='addlist.conf.has.yz.botImg' alt="" />
							</div>
							<div class="act-part">
								<img src="http://qoss.qrmkt.cn/new_platform/hehua-act.png" alt="" />
							</div>
							<div class="menu-part">
								<img src="http://qoss.qrmkt.cn/new_platform/pc/menu.png" alt="" />
							</div>
							<div class="phone-bottom"></div>

						</div>
					</div>
				</el-tab-pane>

			</el-tabs>
			<div class="save">
				<div class="save-con">
					<el-button type="primary" @click='saveAdd'>启用</el-button>
					<el-button type="primary" @click='save'>保存</el-button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['type','id'],
		data() {
			return {
				type:this.type,
				activeName: 'third',
				uploadAdd: location.origin + '/api/wiseqr/attach/commonAliUpload',
				imgHead: {
					token: sessionStorage.getItem('access_token'),
					loginId: sessionStorage.getItem('access_loginId')
				},
				brandList: [],
				brandNameList: [],
				selectBrand: [],
				snList: [],
				initList: {
					id: '',
					name: '',
					note: '',
					type: '',
					snArr: [],
					conf: {
						loading:{
							flag:1,
							bg:'http://qoss.qrmkt.cn/new_platform/loading-bg.png',
							color:'#ccc'
						},
						has: {
							title: {
								name: '',
								note: ''
							},
							yz: {
								botFlag:1,
								botImg:'',
								detailFlag: true,
								color:'#00ffff',
								productImgBig:'',
								productImg:'',
								note: '本页面产品信息，未满十八周岁请勿访问',	
								feedbackFlag:1,
								feedbackImg:'',
							}							
						}
					},
					publish: 0
				},
				addlist: {
					id: '',
					name: '',
					note: '',
					type: '',
					snArr: [],
					conf: {
						loading:{
							flag:1,
							bg:'http://qoss.qrmkt.cn/new_platform/loading-bg.png',
							color:'#ccc'
						},
						has: {
							title: {
								name: '',
								note: ''
							},
							yz: {
								botFlag:1,
								botImg:'',
								detailFlag: true,
								color:'#00ffff',
								productImgBig:'',
								productImg:'',
								note: '本页面产品信息，未满十八周岁请勿访问',	
								feedbackFlag:1,
								feedbackImg:'',
							}
							
						}
					},
					publish: 0
				},
				loading: true,
			}
		},

		created() {
			this.$request.post(
				'/api/wiseqr/prod/listBrand', {
					pageSize: -1
				},
				true,
				res => {
					if(res.ret == '200000') {
						var data = res.data.list || [];
						this.brandList = data;
					}
				},
				err => {
					console.log(err)
				}
			)
			this.addlist.type=this.type;
			this.initList.type=this.type;
		},
		mounted(){
			if(this.id){
				this.$request.post(
					'/api/wiseqr/orgtpl/detail', {
						id: this.id
					},
					true,
					res => {
						if(res.ret == '200000') {
							var data = res.data || [];
							this.addlist.id = data.id;
							this.addlist.name = data.name;
							this.addlist.note = data.note;
							this.addlist.type = data.type;
							this.addlist.conf = JSON.parse(data.conf);
							var list = [];
							var blist = [];
							data.snArr.forEach((item, i) => {
								list.push({
									allName: data.snNameArr[i],
									sn: item
								})
							})
							data.brandNameArr.forEach((val, j) => {
								blist.push({
									name: val,
									brandCode: data.brandArr[j]
								})
							})
							this.snList = list;
							this.addlist.snArr = data.snArr;
							this.brandList = blist;
							this.selectBrand = data.brandArr;

						} else {
							this.$message.error(res.message);
						}
					},
					err => {
						console.log(err)
					}
				)
			}

		},
		methods: {
			changeBr(){
				this.addlist.snArr=[];
			},
			snCallback(flag) {
				var that = this;
				if(flag) {
					if(that.selectBrand.length == 0) {
						that.$message({
							message: '请先选择品牌',
							type: 'warning'
						});
					} else {
						this.$request.post(
							'/api/wiseqr/prod/list', {
								pageSize: -1,
								brandCodeArr: that.selectBrand
							},
							true,
							res => {
								if(res.ret == '200000') {
									var data = res.data.list || [];
									that.snList = data;
								}
							},
							err => {
								console.log(err)
							}
						)
					}
				} else {
					console.log(that.addlist.snArr)
				}

			},
			tabPartClick(tab, event) {
				console.log(tab, event);
			},
			uploadBot(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.botImg = imgUrl;
			},
			uploadLoad(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.loading.bg = imgUrl;
			},
			uploadPro(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.productImg = imgUrl;
			},
			uploadProBig(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.productImgBig = imgUrl;
			},
			uploadFeed(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.feedbackImg = imgUrl;
			},
			uploadYz1(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.gzh.qrIcon = imgUrl;
			},
			uploadYz2(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.gzh.bg = imgUrl;
			},
			save() {
				var that = this;
				if(!that.addlist.name) {
					this.$message({
						message: '请填写模板名称',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.snArr.length==0){
					this.$message({
						message: '请选择产品规格',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.has.title.name) {

					this.$message({
						message: '请填写页面的标题名称',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.conf.has.yz.botFlag && !that.addlist.conf.has.yz.productImg) {
					this.$message({
						message: '主图未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.has.yz.botFlag && !that.addlist.conf.has.yz.productImgBig) {
					this.$message({
						message: '主图片未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.conf.has.yz.botFlag && !that.addlist.conf.has.yz.botImg) {
					this.$message({
						message: '广告图未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.conf.has.yz.feedbackFlag == 1 && !that.addlist.conf.has.yz.feedbackImg) {
					console.log(that.addlist.conf.has.yz.feedbackFlag)
					this.$message({
						message: '反馈图片未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}		
				var savelist = {};
				savelist.id = that.addlist.id;
				savelist.name = that.addlist.name;
				savelist.note = that.addlist.note;
				savelist.type = that.addlist.type
				savelist.conf = that.addlist.conf;
				savelist.snArr = that.addlist.snArr;
				savelist.conf = JSON.stringify(savelist.conf);
				savelist.publish = 0;
				this.$request.post(
					'/api/wiseqr/orgtpl/saveOrModify', savelist,
					true,
					res => {
						if(res.ret == '200000') {
							this.$message({
								message: '保存成功',
								type: 'success'
							});																					
							this.$router.push('/weplat/down');
						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							});
						}
					},
					err => {
						console.log(err)
					}
				)
			},
			saveAdd() {
				var that = this;
				if(!that.addlist.name) {
					this.$message({
						message: '请填写模板名称',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.snArr.length==0){
					this.$message({
						message: '请选择产品规格',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.has.title.name) {
					this.$message({
						message: '请填写页面的标题名称',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.conf.has.yz.botFlag && !that.addlist.conf.has.yz.productImg) {
					this.$message({
						message: '主图未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.has.yz.botFlag && !that.addlist.conf.has.yz.productImgBig) {
					this.$message({
						message: '主图片未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.conf.has.yz.botFlag && !that.addlist.conf.has.yz.botImg) {
					this.$message({
						message: '广告图未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				if(that.addlist.conf.has.yz.feedbackFlag == 1 && !that.addlist.conf.has.yz.feedbackImg) {
					console.log(that.addlist.conf.has.yz.feedbackFlag)
					this.$message({
						message: '反馈图片未上传，请上传后再保存~',
						type: 'warning'
					});
					return;
				}
				var savelist = {};
				savelist.id = that.addlist.id;
				savelist.name = that.addlist.name;
				savelist.note = that.addlist.note;
				savelist.type = that.addlist.type
				savelist.conf = that.addlist.conf;
				savelist.snArr = that.addlist.snArr;
				savelist.conf = JSON.stringify(savelist.conf);
				savelist.publish = 1;
				this.$request.post(
					'/api/wiseqr/orgtpl/saveOrModify', savelist,
					true,
					res => {
						if(res.ret == '200000') {
							this.$message({
								message: '保存成功',
								type: 'success'
							});																					
							this.$router.push('/weplat/down');
						} else {
							this.$message.error(res.message);
						}
					},
					err => {
						console.log(err)
					}
				)
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './css/ScanConf2.scss';
</style>