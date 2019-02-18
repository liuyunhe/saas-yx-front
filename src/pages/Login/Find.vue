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
			<div class="title">找回密码</div>
			<div class="form-part">
				<div class="form-find" v-show='next'>
					<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
						<el-form-item prop="phone" label="手机号码" :rules="[
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern:/^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号', trigger: ['blur'] }
    ]">
							<el-input v-model="dynamicValidateForm.phone"class='style_phone'></el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code" :rules="[
      { required: true, message: '请输入验证码', trigger: 'blur' }]"class='code-input'>
							<el-input v-model="dynamicValidateForm.code"class='style_code'></el-input>
							<el-button @click.prevent="time" class='{active:active}'>{{timeText}}</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('dynamicValidateForm')">下一步</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="form-find" v-show='!next'>
					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="user":rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' }]">
							<el-input v-model="ruleForm2.user"class='style_user'></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass">
							<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"class='style_user'></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPass">
							<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"class='style_user'></el-input>
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
		data() {
			var checkAge = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('用户名不能为空'));
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
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
					user: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					user: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var params = {
							mobile: that.dynamicValidateForm.phone,
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
			time(item) {

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
				var params = {
					mobile: that.dynamicValidateForm.phone
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
						console.log(params)
						that.$request.post('/api/sys/login/findPwd', params, true, function(res) {
							if(res.ret == '200000') {
								this.$message({
						          message: "密码修改成功，请重新登陆！",
						          type: 'success'
						       });
								that.$router.push({
									name: 'Login'
								})
							} else {
								that.$message.error(res.message || "验证码不正确！")
							}
						}, function(err) {
							that.$message.error(res.message || "找回密码失败！")
						})
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