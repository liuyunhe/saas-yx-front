<template>
	<div class="menu-root">
		<div class="menu-content clearfix" v-show='listShow'>
			<div class="nav-img" @click='contentShow=true'>
				<img src="http://qoss.qrmkt.cn/new_platform/pc/top.png" alt="" />
				<div class="click-con" :style="{background:colorValue}">
					<ul>
						<li v-for='(value,key) in typeArr' :key="key" @click='activeShow(value)' :class='{active:activeFlag==value.type}'>
							<img :src="value.icon" alt="" class='first' />
							<img :src="value.activeIcon" class='second' alt="" />
						</li>
					</ul>
				</div>
			</div>
			<div class="content" v-show='contentShow' v-loading='loading'>
				<div class="title">菜单栏<span>(*图片建议尺寸为80*70px,格式为*.jpg\*.bmp\*.png\*.gif)</span></div>
				<div class="select-btn">
					<label for="">底色: </label>
					<el-color-picker v-model="colorValue" @change="colorChange" class='color-select'></el-color-picker>
					<el-button type="primary" plain @click='resetColor' size='small'>重置</el-button>
				</div>
				<ul class="icon-con">
					<li v-for='(value,key) in typeArr' :key="key">
						<div class="up-icon">
							<span class='close' :dataId='key' @click='handleClose' v-if="value.del==1">×</span>
							<div class="icon-text"><span>图标 {{key+1}}</span></div>
							<div class="icon-init">
								初始状态
								<div class="img-con" :style='{background:colorValue}'>
									<img :src="value.icon" class='img-pre' width="56" height="49" alt="" />
									<!--<div>{{value.name}}</div>-->
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="handleAvatarSuccess2">
									<el-button type="primary" plain @click='getCurr(key,0)'>修改</el-button>
								</el-upload>
								<!--<button class='btn btn-primary edit' :num='key' @click='getCurr(key)' flag='0'>修改</button>-->
							</div>
							<div class="icon-active">
								按下状态
								<div class="img-con" :style='{background:colorValue}'>
									<img :src="value.activeIcon" width="56" height="49" alt="" />
									<!--<div>{{value.name}}</div>-->
								</div>
								<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" @click='getCurr(key,1)' :on-success="handleAvatarSuccess2">
									<el-button type="primary" plain @click='getCurr(key,1)'>修改</el-button>
								</el-upload>
								<!--<button class='btn btn-primary edit' :num='key' @click='getCurr(key)' flag='1'>修改</button>-->
							</div>

						</div>
						<div class="select-jump">
							<span>选择跳转的页面:</span>
							<el-select class="filter-item" v-model="value.name" placeholder="请选择跳转的页面" size='small'@change='selectChange'>
								<el-option v-for="item in navArr" :key="item.name" :label="item.name" :value="item.name">
								</el-option>
							</el-select>
						</div>						
					</li>
				</ul>				
				<div class="add" v-show='addShow' @click='addShowFn()'><span>+</span>添加导航</div>
			</div>

		</div>
		<!--<div class="add-menu" v-show='addListShow'>
			<span class='back' @click='back'>返回</span>
			<div class="modal-header">
				<h4 class="modal-title">添加菜单</h4>
			</div>
			<div class="modal-body">
				菜单名称：
				<el-select v-model="selectValue" placeholder="请选择" size='small'>
					<el-option v-for='(value,key) in noArr' :key="value.name" :label="value.name" :value="value.name">
					</el-option>
				</el-select>
			</div>

			<div class="modal-body">
				<h2>初始状态</h2> 菜单图片：
				<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="handleAvatarSuccess">
					<img v-if="addImg1" :src="addImg1" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>

			<div class="modal-body">
				<h2>按下状态</h2> 菜单图片：
				<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="handleAvatarSuccess1">
					<img v-if="addImg2" :src="addImg2" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<br />
				<div class="fail-tip" v-if='tipShow'>*请填写完整的菜单信息</div>
			</div>
		</div>
		<div class="edit-menu" v-show='editListShow'>
			<span class='back' @click='back'>返回</span>
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">修改菜单</h4>
				</div>
				<div class="modal-body">
					图标图片： <img :src="editImg" alt="" class='edit-image' />
					<br />
					<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="handleAvatarSuccess2">
						<div class="edit-img">修改图片</div>
					</el-upload>
				</div>
			</div>
			 /.modal-content -->
		<!--</div>-->
		<div class="save">
			<el-button type="primary" @click='navSave()' size='small'>保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addShow: false,
				navArr: [],
				submitArr: [],
				currText: '',
				jumpDi: '',
				addType: '',
				addtext: '',
				editId: 0,
				removeId: 0,
				contentShow: true,
				colorValue: '#ffffff',
				editImg: 'http://qoss.qrmkt.cn/new_platform/pc/detail_default.png',
				addImg1: 'http://qoss.qrmkt.cn/new_platform/pc/detail_default.png',
				addImg2: 'http://qoss.qrmkt.cn/new_platform/pc/detail_default.png',
				isAdd: false,
				tipShow: false,
				typeArr: [],
				noArr: [],
				flag: 0,
				listShow: true,
				addListShow: false,
				editListShow: false,
				selectValue: '',
				uploadAdd: location.origin + '/api/saotx/attach/commonAliUpload',
				imgHead: {
					token: sessionStorage.getItem('access_token'),
					loginId: sessionStorage.getItem('access_loginId')
				},
				activeFlag: 'scan',
				loading: true,
				initUrl:'http://qoss.qrmkt.cn/new_platform/pc/detail_default.png',
				editKey:0,
				editFlag:0,
				initLength:0
			}
		},
		created() {
			this.init()

		},
		methods: {
			selectChange(name){
				let type='';
				let menuUrl='';
				let menuHost='';
				let del = 0;
				let index=0;
				for(let i = 0; i < this.navArr.length; i++) {
					if(this.navArr[i].name==name){
						type=this.navArr[i].type;
						menuUrl=this.navArr[i].menuUri;
						menuHost=this.navArr[i].menuHost;
						del = this.navArr[i].del;
						break;
					}
				}
				for(let i = 0; i < this.typeArr.length; i++) {
					if(this.typeArr[i].name==name){
						index=i;
						break;
					}
				}
				this.typeArr[index].menuUri=menuUrl;
				this.typeArr[index].menuHost=menuHost;
				this.typeArr[index].type=type;
				this.typeArr[index].del=del;
//				this.getNoArr();
			},
			getNoArr(){
				let that=this;
				that.noArr=[];
				for(let i = 0; i < that.navArr.length; i++) {
					let flag = false;
					for(let j = 0; j < that.typeArr.length; j++) {
						if(that.typeArr[j].type == that.navArr[i].type) {
							flag = true;
							break;
						}
					}
					if(flag == false) {
						that.noArr.push(that.navArr[i])
					}
				}
			},
			init() {
				var that = this;
				this.$request.post('/api/saotx/weplat/menus', {}, true, (res) => {
					if(res.ret === '200000') {
						var DATA = res.data || {};
						that.typeArr = DATA.orgMenus;
						that.navArr = DATA.sysMenus;
						that.initLength=DATA.orgMenus.length;
						if(that.typeArr.length >= 4) {
							that.addShow = false;
						} else {
							that.addShow = true;
						}
						that.submitArr = DATA.orgMenus;
						if(that.typeArr.length == 0) {
							that.colorValue = '#ffffff';
						} else {
							that.colorValue = that.typeArr[0].bgColor || '#ffffff';
						}
						that.getNoArr();
						that.loading = false;
					}
				})
			},
			resetColor() {
				this.colorValue = '#ffffff';
			},
			getCurr(index,flag) {
				this.editId = index;
				this.flag = parseInt(flag);
			},
			addShowFn() {
				var that = this;
				that.addImg1='http://qoss.qrmkt.cn/new_platform/pc/detail_default.png';
				that.addImg2='http://qoss.qrmkt.cn/new_platform/pc/detail_default.png';
				that.noArr=[];
				for(let i = 0; i < that.navArr.length; i++) {
					let flag = false;
					for(let j = 0; j < that.typeArr.length; j++) {
						if(that.typeArr[j].type == that.navArr[i].type) {
							flag = true;
							break;
						}
					}
					if(flag == false) {
						that.noArr.push(that.navArr[i])
					}
				}
				var tempType = '';
				that.selectValue=that.noArr[0].name;
				that.navArr.forEach(function(item) {
					if(item.name == that.selectValue) {
						tempType = item.type;
					}
				})
				var addIcon={
					id: '',
					name: that.selectValue,
					type: tempType,
					bgColor: that.colorValue,
					icon: that.addImg1,
					activeIcon: that.addImg2,
					del: 1
				};
				that.typeArr.push(addIcon);
				if(that.typeArr.length >= 4) {
					that.addShow = false;
				} else {
					that.addShow = true;
				}
			},
			save() {
				var that = this;
				var flag=1;
				that.submitArr.forEach((item)=>{
					if(!item.type || item.icon==that.initUrl || item.activeIcon==that.initUrl){
						flag=0;
						return;
					}
				})
				if(!flag){
					this.$message({
						message: '请填写完整的菜单信息',
						type: 'warning'
					});
					return;
				}
				
				that.$request.post('/api/saotx/weplat/msom', that.submitArr, true, (res) => {
					if(res.ret === '200000') {
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						that.addListShow = false;
						that.editListShow = false;
						that.init();
						that.listShow = true;
					}
				})
			},
			navSave() {
				var that = this;
				if(this.addListShow) {
					
					var addObj={
						id: '',
						name: that.selectValue,
						type: tempType,
						bgColor: that.colorValue,
						icon: that.addImg1,
						activeIcon: that.addImg2,
						del: 1
					};
					if(!addObj.type || addObj.icon==that.initUrl || addObj.activeIcon==that.initUrl){
						this.$message({
							message: '请填写完整的菜单信息',
							type: 'warning'
						});
						return;
					}
					that.submitArr.push(addObj)
					

				} else if(that.editListShow) {
					if(!that.flag) {
						that.submitArr[that.editId].icon = that.editImg;
					} else {
						that.submitArr[that.editId].activeIcon = that.editImg;
					}
				} else {
					
				}
				that.submitArr.forEach((item) => {
					item.bgColor = that.colorValue;
				})
				that.save();

			},
			handleAvatarSuccess(res, file) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addImg1 = imgUrl;
			},
			handleAvatarSuccess1(res, file) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addImg2 = imgUrl;
			},
			handleAvatarSuccess2(res, file) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				if(this.flag){
					this.typeArr[this.editId].activeIcon = imgUrl;
				}else {
					this.typeArr[this.editId].icon = imgUrl;
				}
				
			},
			handleClose(done) {
				var id = parseInt(event.currentTarget.getAttribute('dataId'));
				var that = this;
					this.$confirm('确定删除该菜单？')
					.then(_ => {
						
						if(that.initLength<that.submitArr.length) {
							that.typeArr.splice(id, 1);
							if(that.typeArr.length >= 4) {
								that.addShow = false;
							} else {
								that.addShow = true;
							}
						}else {
							that.submitArr.splice(id, 1);
							if(that.typeArr.length >= 4) {
								that.addShow = false;
							} else {
								that.addShow = true;
							}
						}
						that.getNoArr();
					})
					.catch(_ => {})
				
			},
			activeShow(item) {
				this.activeFlag = item.type;
			}
		}
	}
</script>

<style scoped>
	.menu-root {
		background: #fff;
		border-radius: 4px;
		color: #666;
	}
	
	.color-select {
		width: 80px;
		vertical-align: middle;
		margin-left: 10px;
	}
	
	.color-select .el-color-picker__trigger {
		width: 80px;
	}
	
	.menu-content {
		border: none;
		padding-bottom: 20px;
	}
	
	.clearfix:after {
		content: " ";
		display: block;
		;
		line-height: 0;
		height: 0;
		visibility: hidden;
		clear: both;
	}
	
	.nav-img {
		float: left;
		width: 300px;
		height: 500px;
		position: relative;
		margin-top: 105px;
		margin-left: 60px;
		margin-right: 30px;
		border: 1px solid #eee;
	}
	
	.nav-img>img {
		width: 300px;
		height: 50px;
	}
	
	.nav-img .click-con {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 300px;
		height: 37px;
		border: 1px dashed #0099FF;
		display: flex;
		justify-content: space-around;
	}
	
	.click-con li {
		float: left;
		width: 74px;
		height: 37px;
		text-align: center;
	}
	
	.click-con li .first {
		display: inline-block;
	}
	
	.click-con li .second {
		display: none;
	}
	
	.click-con li.active .first {
		display: none;
	}
	
	.click-con li.active .second {
		display: inline-block;
	}
	
	.click-con li img {
		width: 30px;
		height: 30px;
		object-fit: contain;
		margin-top: 3px;
		cursor: pointer;
	}
	
	.content {
		float: left;
		border: 1px solid #eee;
		padding: 0 20px 20px 20px;
		width: 500px;
		margin-left: 50px;
		margin-top: 20px;
		border-radius: 4px;
	}
	
	.title {
		font-size: 20px;
		line-height: 35px;
		height: 35px;
		color: #242A30;
		margin-bottom: 10px;
		border-bottom: 1px solid #eee;
	}
	.title span {
		font-size: 12px;
		color:#aaa;
		margin-left: 10px;
	}
	.icon-con {
		/*border-bottom: 1px solid #ccc;*/
	}
	
	.icon-con li {
		height: 190px;
		background: #eee;
		margin-top: 10px;
		position: relative;
		border: 1px solid #ccc;
		border-radius: 4px;
		/*border-bottom: none;*/
	}
	.icon-con li .up-icon {
		height: 140px;
	}
	.icon-con li .select-jump {
		padding-left: 19px;
	}
	.icon-con li:last-child {
		border-bottom: 1px solid #ccc;
	}
	
	.icon-con li .icon-text {
		width: 100px;
		float: left;
		height: 120px;
		line-height: 120px;
		text-align: center;
	}
	
	.icon-con li .icon-init {
		padding-top: 5px;
		width: 150px;
		float: left;
		height: 100px;
		text-align: center;
		position: relative;
	}
	
	.icon-con li .icon-init:before {
		content: '';
		width: 1px;
		background: #ccc;
		height: 100px;
		position: absolute;
		right: 0;
		top: 25px;
	}
	
	.icon-con li .img-con {
		width: 98px;
		height: 60px;
		margin: 0 auto;
		border: 1px solid #ccc;
		background: #fff;
		padding-top: 4px;
		overflow: hidden;
		margin-top: 4px;
		border-radius: 4px;
	}
	
	.icon-con li .img-con img {
		/* width: 55px; */
		/* height: 55px; */
		object-fit: contain;
	}
	
	.icon-con li .file-select {
		width: 100px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		background: #ccc;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		cursor: pointer;
	}
	
	.icon-con li .avatar-uploader {
		width: 100px;
		margin: 0px auto;
	}
	.icon-con li .avatar-uploader button{
		width: 100px;
	}
	.icon-con li .icon-active {
		padding-top: 5px;
		width: 200px;
		float: left;
		height: 100px;
		text-align: center;
	}
	
	.add {
		width: 500px;
		margin: 0 auto;
		height: 50px;
		border: 1px solid #ccc;
		font-size: 20px;
		text-align: center;
		line-height: 50px;
		margin-top: 10px;
		cursor: pointer;
		border-radius: 4px;
		background: #E8E8E8;
	}
	.add:hover {
		background: #eee;
	}
	.add span {
		font-size: 32px;
		color: #ccc;
		font-weight: bold;
		margin-right: 10px;
		display: inline-block;
		vertical-align: middle;
		transform: translateY(-5px);
	}
	
	.close {
		width: 20px;
		height: 20px;
		background: #E8E8E8;
		border: 1px solid #ccc;
		border-radius: 50%;
		text-align: center;
		font-size: 16px;
		line-height: 20px;
		position: absolute;
		right: 5px;
		top: 5px;
		cursor: pointer;
	}
	.close:hover {
		background: #eee;
	}
	.save {
		height: 50px;
		padding: 0 20px;
		padding-top: 10px;
		position: relative;
		border: 1px solid #ccc;
		background: #fff;
		margin-bottom: 50px;
	}
	
	.save button {
		position: absolute;
		left: 50%;
		width:80px;
		margin-left: -27px;
	}
	
	.edit-image {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}
	/*模态框*/
	/*增加*/
	
	.add-menu,
	.edit-menu {
		padding: 20px 0 20px 20px;
		position: relative;
	}
	
	.back {
		position: absolute;
		top: 10px;
		right: 20px;
		color: #aaa;
		font-size: 16px;
		cursor: pointer;
	}
	
	.modal-title {
		font-size: 20px;
	}
	
	.space {
		height: 20px;
	}
	
	.edit-img {
		margin-top: 10px;
		width: 80px;
		height: 30px;
		position: relative;
		line-height: 30px;
		text-align: center;
		background: #3388FF;
		border-radius: 3px;
		color: #fff;
	}
	
	.edit-img input {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	.fail-tip {
		font-size: 14px;
		color: #FF4444;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>