<template>
	<div class="menu-root">
		<div class="menu-content clearfix">
			<div class="nav-img">
				<img src="statics/assets/image/nav-edit.png" alt="" />
				<div class="click-con"></div>
			</div>
			<div class="content" ng-show='contentShow'>
				<div class="title">菜单栏</div>
				<div class="select-btn">
					<label for="">底色: </label>
					<input type="color" v-model='colorValue' v-change="colorChange" />
					<button class='btn btn-primary' v-click='resetColor'>重置</button>
				</div>
				<ul class="icon-con">
					<li v-for='(value,key) in typeArr'>
						<span class='close' :data-id='key' v-click='remove1()' v-if="value.del==1">×</span>
						<div class="icon-text"><span>{{value.name}}</span></div>
						<div class="icon-init">
							初始状态
							<div class="img-con" :style='{background:colorValue}'>
								<img :src="value.icon" class='img-pre' alt="" />
								<!--<div>{{value.name}}</div>-->
							</div>
							<button class='btn btn-primary edit' num='key' @click='getCurr()' flag='0'>修改</button>
						</div>
						<div class="icon-active">
							按下状态
							<div class="img-con" :style='{background:colorValue}'>
								<img :src="value.activeIcon" alt="" />
								<!--<div>{{value.name}}</div>-->
							</div>
							<button class='btn btn-primary edit' num='key' @click='getCurr()' flag='1'>修改</button>
						</div>
					</li>
				</ul>
				<div class="add" v-show='addShow' @click='addShowFn()'><span>+</span>添加导航</div>

			</div>

		</div>
		<div class="save">
			<button class='btn btn-primary' @click='navSave()'>保存</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addShow: true,
				initNav: initNav,
				navArr: [],
				submitArr: [],
				currText: '',
				jumpDi: '',
				addType: '',
				addtext: '',
				editId: 0,
				removeId: 0,
				contentShow: false,
				colorValue: '#ffffff',
				editImg: '../../../assets/img/detail_default.png',
				addImg1: '../../../assets/img/detail_default.png',
				addImg2: '../../../assets/img/detail_default.png',
				isAdd: false,
				tipShow: false,
				typeArr: [],
				noArr: [],
				flag:0
			}
		},
		created() {
		},
		methods: {
			colorChange	(){},
			resetColor(){},
			remove1(){},
			getCurr(){},
			addShowFn(){},
			navSave(){}
		}
	}
</script>

<style>
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
		width: 383px;
		position: relative;
	}
	
	.nav-img img {
		width: 300px;
		height: 550px;
		margin-top: 95px;
		margin-left: 20px;
	}
	
	.nav-img .click-con {
		position: absolute;
		bottom: 0;
		left: 20px;
		width: 300px;
		height: 37px;
		border: 1px dashed #0099FF;
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
	
	.edit-img {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}
	/*模态框*/
	
	.space {
		height: 20px;
	}
	
	.edit-img {
		margin-top: 10px;
		width: 80px;
		position: relative;
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
</style>