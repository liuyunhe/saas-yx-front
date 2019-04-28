<template>
	<div class="wplat-root">
		<div class='left'>
			<div class="phone":style='{background:conf.wholeColor}'v-show='activeName=="one"'>
				<img src="http://qoss.qrmkt.cn/common/wplat/person_top.png" alt="" />
				<div class="person-top">
					<img :src="conf.bgImg" alt="" />
					<div class="header-img">
						<img src="http://qoss.qrmkt.cn/common/wplat/person_img.png" alt="" />
					</div>
				</div>
				<div class="icons":style='{background:conf.iconColor}'>
					<ul>
						<li v-for='(item,index) in saveList' :class='{"two": count==2,"three":count==3,"four":count>3}' v-if ='item.module == "i"'>
							<img :src="item.pic" alt="" />
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
				<div class="banner-part">
					<div class="fen-banner" v-for = '(item,index) in saveList' v-show = 'item.module == "b"'>
						<img :src="item.pic" alt="" />
					</div>			
				</div>
				
				<img src="http://qoss.qrmkt.cn/common/wplat/person_bot_02.png" class='bottom' alt="" />
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
								<el-color-picker v-model="conf.wholeColor" class='color-select'></el-color-picker>
								<el-button size='small' @click='reset("whole")'>重置</el-button>
							</div>
							<div class='edit-con'>
								<span class='labels'>背景图片：</span>
								<div class="img-div">
									<img :src="conf.bgImg" alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadTop">
									<el-button type="primary">更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*284px格式为jpg\bmp\png\gif</div>
							</div>
							<div class="template-con">
								<!--<span>选择模板：</span>
								<div class="template-right">
									<ul>
										<li v-for='(item,index) in template'@click='selectTpl(index)':class='{active:index==showTplIndex}'>
											<div class="show">
												<div v-for='i in item.count'></div>
											</div>									
											<p>{{item.text}}</p>
										</li>
									</ul>
								</div>-->
								<div class="template-up">
									<span class='title'>编辑图标：</span>
									<!--<div v-for='i in count':class='{"icon-index":true,"active":showTabIndex+1 == i}'@click='tabToggle(i)'>图标{{i}}</div>-->
									<div class="icon-up"v-for='(item,index) in saveList' v-show='item.module == "i"'>
										<div class="icon-close" @click = 'removeIcon(index)'>×</div>
										<div class="img-div">
											<p v-show='!item.pic'>+</p>
											<img :src="item.pic" v-show='item.pic' alt="" />
										</div>
										<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadIcon">
											<el-button type="primary"@click='getIndex(index)'>更换图片</el-button>
										</el-upload>
										<div class="select-jump">
											<span>标题:</span>
											<el-input v-model="item.name" placeholder="图标名称" maxlength='5' class='icon-name' size='small' @input = 'changeName(item.name,index)'></el-input>
											<div class = 'fenge'></div>
											<span>链接:</span>
											<el-select class="filter-item" v-model="item.type" placeholder="请选择跳转的页面" size='small'@change='selectChange(index,item.type)'>
												<el-option v-for="v in iconList" :key="v.name" :label="v.name" :value="v.type">
												</el-option>
											</el-select>
										</div>	
									</div>
									<div class="add" v-show='count <= 8' @click='addFn()'><span>+</span>添加导航</div>
								</div>
								<div class="whole-color">
									<span>编辑底色：</span>
									<el-color-picker v-model="conf.iconColor" class='color-select'></el-color-picker>
									<el-button size='small' @click='reset("icon")'>重置</el-button>
								</div>
							</div>
							<div class='edit-con up-con' v-for='(item,index) in saveList' v-show='item.module == "b"'>
								<span class='labels'>{{item.name}}：</span>
								<div class="img-div">
									<p v-show='!item.pic'>+</p>
									<img :src="item.pic" v-show='item.pic' alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadBanner">
									<el-button type="primary" @click='getIndex(index)'>更换图片</el-button>
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
									<p v-show='!share.url'>+</p>
									<img :src="share.url" v-show='share.url' alt="" />
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="shareUp">
									<el-button type="primary">更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 200*200px格式为jpg\bmp\png\gif</div>
							</div>
							
						</div>
						<div class="save">
							<div class="save-con">							
								<el-button type="primary" @click='saveShare'>保存</el-button>
								<el-button type="primary" @click='initShare'>取消</el-button>
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
					url:''
				},
				conf:{
					wholeColor:'',
					iconColor:'',
					bgImg:''
				},		
				initWholeColor:'',
				initIconColor:'',
				uploadAdd: location.origin + '/api/wiseqr/attach/commonAliUpload',
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
				count:0,//选了几个图标
				showTabIndex:0,//点击了哪个图标
				showTplIndex:0,
				iconList:[],//图标列表(后端接口)，可编辑
				editIndex:0,//编辑图标的索引
				saveList:{},//icon和bannerlist
				addShow:true,//添加按钮显示
			}
		},
		created() {
			this.init();
			this.initShare();
		},
		methods: {
//			tabToggle(index){
//				this.iconList.forEach((item,i)=>{
//					if (index == i+1) {
//						this.showTabIndex=i;
//					}
//				})
//				
//			},
//			selectTpl(index){
//				this.count=index+2;
//				this.showTplIndex=index;
//				this.showTabIndex=1;
//				for(let i=0;i<this.count;i++){
//					this.iconList.push({
//						url:''
//					})
//				}
//			},
			reset(str){
				if(str == 'whole') {
					this.conf.wholeColor = '#fff';					
				}else if (str == 'icon'){
					this.conf.iconColor = '#fff';
				}
			},
			changeName(name,index){
				this.saveList[index].name = name;
//				let type = this.saveList[index].type;
//				this.saveList.forEach((v,i) => {
//					if (v.type == type) {
//						v.name = name;
//					}
//				})				
//				this.iconList.forEach((v,i) => {
//					if (v.type == type) {
//						v.name = name;
//						return;
//					}
//				})
			},
			selectChange(index,type){				
				let name = '';
				let url = '';
				this.iconList.forEach((v,i)=>{
					if(v.type == type) {
						name = v.name;
						url = v.url;
					}
				})
				this.saveList[index].url = url;
				this.saveList[index].name = name;
			},//选择完跳转页面
			getIndex(index){
				this.editIndex=index;
			},
			uploadIcon(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;				
				this.saveList[this.editIndex].pic=imgUrl;
			},
			uploadTop(res){//上传头部背景
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.conf.bgImg = imgUrl;
			},
			uploadBanner (res){//上传头部背景
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.saveList[this.editIndex].pic = imgUrl;
			},
			shareUp(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.share.url = imgUrl;
			},
			addFn(){//添加
				this.saveList.push({
						module: "i",
						name: "",
						pic: "",
						type: "",
				})
				this.count++;
			},
			removeIcon(i) {
				this.$confirm('确定删除该菜单？')
					.then(_ => {
						this.saveList.splice(i,1)
						this.count--;
					})				
			},
			save() {
				var that = this;
				let conf = JSON.stringify(this.conf)
				let errorFlag = 0;
				this.saveList.forEach((item,i)=>{
					if (!item.name || !item.pic || !item.type) {
						errorFlag = 1;
						return;
					}
				})
				if (errorFlag == 1) {
					this.$message({
							message: '请完善图标编辑内容~',
							type: 'warning'
					});
					return;
				}
				this.$request.post('/api/wiseqr/weplat/sompc', {
					ocpConf: this.saveList,
					conf: conf					
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
				this.$request.post('/api/wiseqr/weplat/dpc', {}, true, (res) => {
					if(res.ret === '200000') {
						var DATA = res.data || {};
						if (DATA.orgPconfs.length == 0) {
							this.saveList = JSON.parse(JSON.stringify(DATA.sysPconfs));
						} else {
							if(DATA.sysPconfs.length == 0) {
								this.saveList = [];
								let conf = DATA.personalConf || '{}';
								this.conf = JSON.parse(conf);
								if (Object.keys(this.conf).length == 0) {
									this.conf = {
										wholeColor:'#eee',
										iconColor:'#fff',
										bgImg:'http://qoss.qrmkt.cn/common/wplat/person_bg.png'
									}
								}
								this.initWholeColor = this.conf.wholeColor;
								this.initIconColor = this.conf.iconColor;
								return;
							}
							let tempList = JSON.parse(JSON.stringify(DATA.orgPconfs));
							this.saveList = JSON.parse(JSON.stringify(DATA.orgPconfs));
							this.saveList.forEach((item,index)=>{
								let has = 0;
								DATA.sysPconfs.forEach((v,i)=>{
									if (item.type == v.type) {
										has = 1;
									}
								})
								if(has == 0) {
									this.saveList.splice(index,1)
								}
							})
//							DATA.sysPconfs.forEach((item,index)=>{
//								let ishas = 0;
//								tempList.forEach((v,i)=>{
//									if (item.type == v.type) {
//										ishas = 1;
//									}
//								})
//								if(ishas == 0) {
//									this.saveList.splice(index, 0 ,item)
//								}
//							})							
						}
						let count = 0;
						let iconList = [];
						DATA.sysPconfs.forEach((item,index)=>{								
							if(item.module == 'i') {				
								iconList.push(item)
							}
						})
						this.iconList = JSON.parse(JSON.stringify(iconList));
						this.saveList.forEach((item,index)=>{								
							if(item.module == 'i') {
								count ++;
							}							
						})						
						this.count = count;
//						初始化背景图片
						let conf = DATA.personalConf || '{}';
						this.conf = JSON.parse(conf);
						if (Object.keys(this.conf).length == 0) {
							this.conf = {
								wholeColor:'#eee',
								iconColor:'#fff',
								bgImg:'http://qoss.qrmkt.cn/common/wplat/person_bg.png'
							}
						}
						this.initWholeColor = this.conf.wholeColor;
						this.initIconColor = this.conf.iconColor;
					}
				})
			},
			saveShare(){
				let that = this;
				if (!this.share.title) {
					this.$message({
						message: '请输入分享标题~',
						type: 'warning'
					});
					return;
				}
				if (!this.share.desc) {
					this.$message({
						message: '请输入分享描述~',
						type: 'warning'
					});
					return;
				}
				if (!this.share.url) {
					this.$message({
						message: '请添加分享图片~',
						type: 'warning'
					});
					return;
				}
				let conf = JSON.stringify(this.share)
				this.$request.post('/api/wiseqr/org/somProp', {
					propKey:'personal_share',
					propValue:conf
				}, true, (res) => {
					if(res.ret === '200000') {
						that.$message({
							message: '保存成功',
							type: 'success'
						});
						that.initShare();
					}
				})
			},
			initShare(){
				var that = this;
				this.$request.post('/api/wiseqr/org/prop', {
					propKey:'personal_share'
				}, true, (res) => {
					if(res.ret === '200000') {
						var DATA = res.data || {};
						if(!DATA) {
							this.share={
								title:'',
								desc:'',
								url:''
							}
						} else {
							this.share = JSON.parse(DATA)
						}
					}
				})
			},

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
			.phone {
				width:300px;
				height: 600px;
				position: relative;
				padding-bottom: 50px;
			}
			.person-top {
				max-height: 95px;
				position: relative;
			}
			.icons {
				min-height: 47px;
				background: #fff;
				margin-top: 20px;
				margin-bottom: 10px;
				padding-top: 5px;
				ul {
					font-size:0;
					li {
						display: inline-block;
						text-align: center;
						height: 30px;
						width:50%;
						img {
							width:20px;
							height: 20px;
							object-fit: contain;							
						}
						p {
							font-size: 12px;
							margin-top: 4px;
							transform: scale(.7);
						}
						&.two {
							width:50%;
						}
						&.three {
							width:33.3%;
						}
						&.four {
							width:25%;
						}
					}
				}
			}
			.banner-part {
				height: 200px;
			}
			.fen-banner {
				margin-bottom: 10px;
			}
			.vip-banner {
				margin-bottom: 10px;
			}
			.bottom {
				position: absolute;
				left: 0;
				width:100%;
				bottom:0;
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
						min-height: 60px;
						width:210px;
						padding: 10px 10px 10px 10px;
						.share-title {
							width:140px;
							font-weight: bold;
						}
						.share-desc {
							width:140px;
							word-wrap:break-word;
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
			margin-left: 350px;
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
			                p {
						        margin: 0;
						        line-height: 100px;						           
						        border:none;
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
			                p {
						        margin: 0;
						        line-height: 80px;						           
						        border:none;
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
							.add {
								margin-left: 50px;
								height: 50px;
								border: 1px solid #ccc;
								font-size: 20px;
								text-align: center;
								line-height: 50px;
								margin-top: 20px;
								cursor: pointer;
								border-radius: 4px;
								background: #fff;
								&:hover {
									background: #F5F5f5;
								}
								 span {
									font-size: 32px;
									color: #ccc;
									font-weight: bold;
									margin-right: 10px;
									width:auto;
									display: inline-block;
									vertical-align: middle;
									transform: translateY(-5px);
								}
							}
							
							.icon-up {
								height: 130px;
								margin-left: 50px;
								padding-top: 10px;
								padding-left: 40px;
								position: relative;
								background: #fff;
								border-radius: 6px;
								border: 1px dashed #666;
								margin-top: 10px;
								.icon-close {
									width:20px;
									height: 20px;
									background: #E8E8E8;
									border: 1px solid #ccc;
									border-radius: 50%;
									text-align: center;
									font-size: 16px;
									line-height: 18px;
									position: absolute;
									cursor: pointer;
									right:10px;
									top:10px;
								}
								.select-jump {
									position: absolute;
									left: 200px;
									top:25px;
									span {
										text-align: left;
										width:40px;
										line-height: 30px;
										display: inline-block;
										height: 30px;
									}
									.icon-name {
										width:120px;
										vertical-align: middle;
									}
									.filter-item {
										vertical-align: middle;
										width:120px;
									}
									.fenge {
										height: 15px;
									}
								}
								.img-div {
									width:80px;
						            height: 80px;
						            border:1px dashed #d9d9d9;
						            border-radius: 4px;						       
						            background: #fff;
						            font-size: 50px;
						            text-align: center;
						            color:#d9d9d9;
						            font-weight: 100;	
						            text-align:center;						      
						            img {
						            	width:90%;
						            	height: 90%;
						            	margin-top: 5%;
						            	object-fit: contain;
						            }
						            p {
						            	margin: 0;
						            	line-height: 80px;						           
						                border:none;
						            }					        
								}
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