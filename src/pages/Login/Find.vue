<template>
	<div class="findRoot">
		<nav class="ui-navbar-bgcolor navbar navbar-fixed-top">
			<div class="container-fluid">
				<div class="row">
					<div class="ui-navbar-header navbar-header">
						<img src="../../assets/img/logo-new.png" class="ui-navbar-logo">
					</div>
				</div>
			</div>
		</nav>
		<div class="content">
			<div class="title" v-show="flag=='f'">找回密码</div>
			<div class="title" v-show="flag=='m'">修改密码</div>
			<div class="form-part">
				<div class="form-find" v-show='next'>
					<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
						<el-form-item prop="phone" label="手机号码" :rules="[
							{ required: true, message: '请输入手机号', trigger: 'blur' },
							{ pattern:/^1[2-9]{1}[0-9]{9}$/, message: '请输入正确的手机号', trigger: ['blur'] } ]">
							<el-input v-model="dynamicValidateForm.phone" class='style_phone'></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }] " class='code-input'>
							<el-input v-model="dynamicValidateForm.code" class='style_code'></el-input>
							<el-button @click.prevent="checkSyshasPhone" class='{active:active}'>{{timeText}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('dynamicValidateForm')">下一步</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="form-find" v-show='!next'>
					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="user">
							<el-input v-model="ruleForm2.user" class='style_user' name="account" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass">
							<el-input type="password" v-model="ruleForm2.pass" class='style_user' name="pwd" autocomplete="new-password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="pass">
							<el-input type="password" v-model="ruleForm2.checkPass" class='style_user'></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="submitf('ruleForm2')">完成</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: ['f', 'account'],
		data() {
			var checkAccount = (rule, value, callback) => {
				if(!value) {
					callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else if(!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*?]{8,16}$/.test(value)) {
					callback(new Error('8-16位字符(至少包含字母、数字、符号中的两种形式)'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			return {
				dynamicValidateForm: {
					code: '',
					phone: ''
				},
				timeText: '获取验证码',
				active: '',
				next: true,
				ruleForm2: {
					pass: '',
					checkPass: '',
					user: '',
					oldPwd: "123456"
				},
				flag: "m", // 页面功能标识：f-找回密码；m-修改密码
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					user: [{
						validator: checkAccount,
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.flag = this.f;
			if(this.f=='m') {
				this.ruleForm2.user = this.account || "";
			}
		},
		methods: {
			submitForm(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let t = new Date().getTime();
						let mobile = that.dynamicValidateForm.phone;
						var params = {
							t: t,
							encrypt: this.$md5("wiseqr"+t+mobile),
							mobile: mobile,
							code: that.dynamicValidateForm.code
						};
						this.$request.post('/api/sms/checkCode', params, true, function(res) {
							if(res.ret == '200000') {
								that.next = false;
							} else {
								alert(res.message || "验证码不正确！");
							}
						}, function() {
							alert(res.message || "验证码不正确！");
						})
					} else {
						alert('请输入正确的手机号和验证码！')
						return false;
					}
				});
			},
			checkSyshasPhone () {
				let mobile = this.dynamicValidateForm.phone;
				if(!mobile) return;
				if(this.active) return;
				// 验证手机号在系统中是否存在
				this.$request.post('/api/public/qbm', {mobile: mobile}, true,(res)=>{
					if(res.ret == '200000') {
						let users = res.data || [];
						if (users.length==0) {
							this.$message.error("此手机号不在系统中！");
						} else {
							let judgeMobileCode = false;
							for (let i=0; i<users.length; i++) {
								let data = users[i];
								if (mobile === data.mobile) {
									judgeMobileCode = true; // 手机号相同说明在系统中存在
									if (this.account && data.account!==this.account) {
										judgeMobileCode = false; // 手机号相同说明在系统中存在
										this.$message.error("此手机号与修改密码账号绑定的手机号不符！");
									}
									break
								}
							}
							// 运行获取及验证手机动态码
							if (judgeMobileCode) {
								this.time()
							}
						}
					} else {
						this.$message.error(res.message);
					}
				})
			},
			time() {
				if(!this.dynamicValidateForm.phone) return;
				if(this.active) return;
				var that = this;
				var times = 60;
				console.log(this.dynamicValidateForm.phone)
				var interval = setInterval(function() {
					if(--times < 0) {
						clearInterval(interval);
						interval = null;
						times = 60;
						that.timeText = '获取验证码';
						that.active = '';
						return;
					}
					that.active = 'ddd'
					that.timeText = '重新获取' + times + 's';
				}, 1000);

				let t = new Date().getTime();
				let mobile = that.dynamicValidateForm.phone;
				var params = {
					t: t,
					encrypt: this.$md5("wiseqr"+t+mobile),
					mobile: mobile
				};
				this.$request.post('/api/sms/getCode', params, true,(res)=>{})
			},
			submitf(formName) {
				var that = this;
				that.$refs[formName].validate((valid) => {
					if(valid) {
						var params = {
							oldPwd: '',
							account: that.ruleForm2.user,
							newPwd: that.ruleForm2.pass,
							mobile: that.dynamicValidateForm.phone
						}
						params.newPwd=that.$md5(params.newPwd);
						that.$request.post('/api/sys/login/findPwd', params, true, (res)=>{
							if(res.ret == '200000') {
								this.$message({type:'success', message: "找回密码成功，请重新登陆！"});
								this.$router.push({path:"/login"});
							} else {
								that.$message.error(res.message || "验证码不正确！")
							}
						}, (err)=>{
							that.$message.error(res.message || "找回密码失败！")
						});
					} else {
						that.$message.error('请输入正确的信息')
						return false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.findRoot {
		height: 100%;
		background: #D1DBE5;
		overflow: hidden;
	}
	
	.navbar {
		background: #283543;
		height: 50px;
		img {
			margin-top: 6px;
			margin-left: 50px;
			width:40px;
			height: 40px;
			object-fit: contain;
		}
	}
	
	.content {
		width: 100%;
		height: 100%;
		padding: 0 50px;
		box-sizing: border-box;
		.title {
			font-size: 14px;
			border-left: 5px solid #44c2ed;
			margin-top: 10px;
			color: #707478;
			padding-left: 10px;
		}
		.form-part {
			height: 80%;
			background: #fff;
			border-radius: 10px;
			margin-top: 10px;
			.form-find {
				width: 60%;
				margin: 0 auto;
				padding-top: 20px;
				.code-input {
					.el-input__inner{
						width:80% !important;
					}
				}
			}
			.style_phone {
				width:300px;
			}
			.style_code {
				width:205px;
			}
			.style_user {
				width:300px;
			}
		}
	}
</style>