<template>
	<div class="menu-root">
		<div class="menu-content clearfix" v-show='listShow'>
			<div class="nav-img" @click='contentShow=true'>
				<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/top.png" alt="" />
				<div class="click-con" :style="{background:colorValue}">
					<ul>
						<li v-for='(value,key) in typeArr' @click='activeShow(value)' :class='{active:activeFlag==value.type}'>
							<img :src="value.icon" alt="" class='first' />
							<img :src="value.activeIcon" class='second' alt="" />
						</li>
					</ul>
				</div>
			</div>
			<div class="content" v-show='contentShow' v-loading='loading'>
				<div class="title">菜单栏</div>
				<div class="select-btn">
					<label for="">底色: </label>
					<el-color-picker v-model="colorValue" @change="colorChange" class='color-select'></el-color-picker>
					<el-button type="primary" plain @click='resetColor' size='small'>重置</el-button>
				</div>
				<ul class="icon-con">
					<li v-for='(value,key) in typeArr'>
						<span class='close' :dataId='key' @click='handleClose' v-if="value.del==1">×</span>
						<div class="icon-text"><span>{{value.name}}</span></div>
						<div class="icon-init">
							初始状态
							<div class="img-con" :style='{background:colorValue}'>
								<img :src="value.icon" class='img-pre' alt="" />
								<!--<div>{{value.name}}</div>-->
							</div>
							<button class='btn btn-primary edit' :num='key' @click='getCurr(key)' flag='0'>修改</button>
						</div>
						<div class="icon-active">
							按下状态
							<div class="img-con" :style='{background:colorValue}'>
								<img :src="value.activeIcon" alt="" />
								<!--<div>{{value.name}}</div>-->
							</div>
							<button class='btn btn-primary edit' :num='key' @click='getCurr(key)' flag='1'>修改</button>
						</div>
					</li>
				</ul>
				<div class="add" v-show='addShow' @click='addShowFn()'><span>+</span>添加导航</div>

			</div>

		</div>
		<div class="add-menu" v-show='addListShow'>
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
			<!-- /.modal-content -->
		</div>
		<div class="save">
			<el-button type="primary" @click='navSave()' size='small'>保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addShow: true,
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
				editImg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png',
				addImg1: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png',
				addImg2: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png',
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
				loading: true
			}
		},
		created() {
			console.log(this.imgHead)
			this.init()

		},
		methods: {
			init() {
				var that = this;
				this.$request.post('/api/saotx/weplat/menus', {}, true, (res) => {
					if(res.ret === '200000') {
						var DATA = res.data || {};
						that.typeArr = DATA.orgMenus;
						that.navArr = DATA.sysMenus;
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
						that.loading = false;
					}
				})
			},
			back() {
				if(this.addListShow) {
					this.addImg1 = 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png';
					this.addImg2 = 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png';
					this.editImg = 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png';
				}
				this.listShow = true;
				this.addListShow = false;
				this.editListShow = false;
			},
			colorChange() {},
			resetColor() {
				this.colorValue = '#ffffff';
			},
			remove1() {},
			getCurr(index) {
				this.listShow = false;
				this.editListShow = true;
				this.addListShow = false;
				this.editId = index;
				this.flag = parseInt(event.currentTarget.getAttribute('flag'))
				console.log(this.flag)
				if(this.flag) {
					this.editImg = this.typeArr[index].activeIcon;
				} else {
					this.editImg = this.typeArr[index].icon;
				}
			},
			addShowFn() {
				var that = this;
				that.listShow = false;
				that.addListShow = true;
				that.editListShow = false;
				that.addImg1='http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png';
				that.addImg2='http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png';
				that.selectValue='';
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
			save() {
				var that = this;
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
					var tempType = '';
					that.navArr.forEach(function(item) {
						if(item.name == that.selectValue) {
							tempType = item.type;
						}
					})
					var addObj={
						id: '',
						name: that.selectValue,
						type: tempType,
						bgColor: that.colorValue,
						icon: that.addImg1,
						activeIcon: that.addImg2,
						del: 1
					};
					if(!addObj.type){
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
					that.submitArr.forEach((item) => {
						item.bgColor = that.colorValue;
					})
				}
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
				this.editImg = imgUrl;
			},
			handleClose(done) {
				console.log(event.currentTarget.getAttribute('dataId'))
				var id = parseInt(event.currentTarget.getAttribute('dataId'));
				var that = this;
				this.$confirm('确定删除该菜单？')
					.then(_ => {
						that.submitArr.splice(id, 1);
						that.save();
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
	}
	
	.title {
		font-size: 20px;
		line-height: 35px;
		height: 35px;
		color: #242A30;
		border-bottom: 1px solid #eee;
	}
	
	.icon-con {
		/*border-bottom: 1px solid #ccc;*/
	}
	
	.icon-con li {
		height: 125px;
		background: #eee;
		margin-top: 10px;
		position: relative;
		border: 1px solid #ccc;
		/*border-bottom: none;*/
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
		top: 10px;
	}
	
	.icon-con li .img-con {
		width: 100px;
		height: 60px;
		margin: 0 auto;
		border: 1px solid #ccc;
		background: #fff;
	}
	
	.icon-con li .img-con img {
		width: 55px;
		height: 55px;
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
	
	.icon-con li .edit {
		border: none;
		cursor: pointer;
		width: 100px;
		margin: 0 auto;
	}
	
	.icon-con li .icon-active {
		padding-top: 5px;
		width: 200px;
		float: left;
		height: 100px;
		text-align: center;
	}
	
	.add {
		width: 480px;
		margin: 0 auto;
		height: 50px;
		border: 1px solid #ccc;
		font-size: 20px;
		text-align: center;
		line-height: 50px;
		margin-top: 10px;
		cursor: pointer;
	}
	
	.add span {
		font-size: 32px;
		color: #ccc;
		font-weight: bold;
		line-height: 50px;
		margin-right: 10px;
		display: inline-block;
		height: 50px;
		vertical-align: middle;
	}
	
	.close {
		width: 20px;
		height: 20px;
		background: #ccc;
		border: 1px solid #000;
		border-radius: 50%;
		text-align: center;
		line-height: 20px;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}
	
	.save {
		height: 50px;
		padding: 0 20px;
		padding-top: 10px;
		position: relative;
		border: 1px solid #ccc;
		background: #fff;
		border-radius: 10px;
		margin-bottom: 50px;
	}
	
	.save button {
		position: absolute;
		left: 50%;
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