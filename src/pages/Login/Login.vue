<template>
	<div class="loginRoot">
		<div class="ui-wrapper">
			<div class="header">
<!--				<img src="../../assets/img/logo-new.png" />欢迎登录-->
			</div>
			<div class="ui-login-form">
				<!--用户名-->
				<div class="ui-label">
					<label>用户名</label><input type="text" name="username" placeholder="" v-model='username' />
				</div>
				<!--密码-->
				<div class="ui-label">
					<label>登录密码</label><input type="password" name="password" placeholder="" v-model="password" />
				</div>
				<!--验证码-->
				<div class="ui-label ui-code">
					<label class="check">验证码</label>
					<input type="text" name="verifyCode" placeholder="" v-model="verifyCode" @keyup.enter="submitLogin">
					<img :src="codeSrc" @click="srcClick" id="verifyCode">
					<div id="drag" style="display: none;"></div>
				</div>
				<!--记住用户名-->
				<div class="ui-label ui-checkbox">
					<label for="remmber">
						<input type="checkbox" name="remmber" v-model='isRem' />记住用户名
					</label>
					<span @click="forget">忘记密码?</span>
				</div>
				<!--登陆-->
				<button type="button" name="login" @click="submitLogin">登 录</button>
				<el-alert :title="errorTip" type="error" show-icon v-show="error">
				</el-alert>
			</div>
		</div>
		<div class="footer">
<!--			<img src="../../assets/img/login-footer.png" />-->
		</div>
	</div>

</template>

<script>
//import NProgress from 'nprogress'
import store from '@/store/index'
export default {
  props: ['message'],
	store,
  data() {
    return {
      username: localStorage.getItem('username'),
      password: '',
      verifyCode: '',
      codeSrc: '',
      isRem: true,
      errorTip: '用户名不能为空!',
      error: false,
      ran:1
    }
  },
  created() {
    var num = ''
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('access_loginId')
    var that = this
    for (let i = 0; i < 6; i++) {
      num += Math.floor(Math.random() * 10)
    }
    var date = new Date().getTime()
    this.$cookies.set('CLIENTSESSIONID', date + num, '1y', '/')
    sessionStorage.setItem('CLIENTSESSIONID', date + num)
    if(sessionStorage.getItem('ran')){
    	console.log(sessionStorage.getItem('ran'))
    	var ran=sessionStorage.getItem('ran')+1;
    	this.ran=ran;
    	this.codeSrc = location.origin + '/api/sys/login/verifyCode?'+this.ran
    }else {
    	this.codeSrc = location.origin + '/api/sys/login/verifyCode?'+this.ran
    }

    if(this.message) {
      this.$message.error(this.message);
    }
  },
  methods: {
    submitLogin() {
      var postData = {}
      var that = this
      postData.account = this.username || ''
      postData.pwd = this.password || ''
      postData.verifyCode = this.verifyCode || ''
      if (!postData.account) {
        this.errorTip = '用户名不能为空!'
        this.error = true
        return
      }
      if (this.isRem) {
        localStorage.setItem('username', this.username)
      } else {
        localStorage.removeItem('username')
      }
      if (!postData.pwd) {
        this.errorTip = '密码不能为空!'
        this.error = true
        return
      }
      if (!postData.verifyCode) {
        this.errorTip = '验证码不能为空!'
        this.error = true
        return
      }
      postData.pwd = this.$md5(postData.pwd)
      this.errorTip = '用户名不能为空!'
      this.error = false
      this.$request.post('/api/sys/login/verification', postData, true, function(res) {
        if (res.ret == '200000') {
          var data = res.data || {}
          sessionStorage.setItem('access_token', data.token)
          sessionStorage.setItem('access_loginId', data.loginId)
          sessionStorage.setItem('orgHasSaleZone', res.orgHasSaleZone ? "1" : "0")
          sessionStorage.setItem('isAllSaleZone', res.isAllSaleZone ? "1" : "0")
          sessionStorage.setItem('saleZoneCode', res.saleZoneCode ? res.saleZoneCode : "0")
					that.$store.commit('setRoleOptList', res.roleOptList)
					let roleOptList = res.roleOptList.map(item=>{
						return item.optCode
					})
					sessionStorage.setItem('roleOptList', roleOptList.join(","))
          // that.getMenuList()
          sessionStorage.setItem('ran',that.ran+1)
          that.$router.replace({name: '首页'})
        } else if (res.ret == '100409') {
          that.$message.error(res.message)
          that.$router.push({
            name: 'Find'
          })
        } else if (res.ret == '100411') {// 初始密码需要修改
          //var data = res.data || {}
          //sessionStorage.setItem('access_token', data.token)
          //sessionStorage.setItem('access_loginId', data.loginId)
          that.$confirm(res.message).then(() => {
            that.modifyPwd();
          }).catch(() => {});
        } else {
          that.$message.error(res.message)
          that.srcClick()
        }
      })
    },

    srcClick(e) {
      this.ran+=1;
      this.codeSrc += this.ran
    },
    forget() {
      this.$router.push({path:'/find?f=f&account='});
    },
    modifyPwd() {
      this.$router.push({path:'/find?f=m&account='+this.username});
    }
  },
  watch: {
    isRem(n, o) {
      if (n) {
        localStorage.setItem('username', this.username)
      } else {
        localStorage.removeItem('username')
      }
    }
  }
}
</script>

<style scoped>
@import 'http://qoss.qrmkt.cn/common/css/font-awesome.min.css'
  /**
 * Create Date: 2018-09-25
 * Description: login
 */ * {
  -webkit-tap-highlight-color: transparent;
}

body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
li,
ol,
p,
ul {
  margin: 0;
  padding: 0;
}

body {
  font-family: STHeiti, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:focus {
  outline: 0;
}

li,
ol,
ul {
  list-style: none;
}

address,
em,
i {
  font-style: normal;
}

button,
input {
  border: 0 none;
  outline: none;
}

input[type='button'],
input[type='submit'] {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input,
textarea {
  /* -webkit-appearance: none;*/
  -webkit-user-modify: read-write-plaintext-only;
}

a,
img {
  -webkit-touch-callout: none;
}

article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}

body,
html {
  height: 100%;
}

body {
  background: #d9e0e7;
  font-size: 12px;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #707478;
}

.ie8 body {
  font-family: Arial, sans-serif;
}

.loginRoot {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login_bg.png') no-repeat;
  background-size: 100% 100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
  color: #242a30;
}

h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small {
  font-size: 60%;
  font-weight: 300;
  color: #7c7f83;
}

a {
  transition: color 0.1s ease-in-out;
  -o-transition: color 0.1s ease-in-out;
  -ms-transition: color 0.1s ease-in-out;
  -moz-transition: color 0.1s ease-in-out;
  -webkit-transition: color 0.1s ease-in-out;
}

input::-webkit-input-placeholder {
  color: #858593;
}

.ui-wrapper {
  position: absolute;
  width: 80%;
  height: 60%;
  max-width: 400px;
  min-height: 330px;
  max-height: 360px;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 9;
}

.ui-wrapper h4 {
  font-size: 24px;
  color: #6e80ff;
  margin-top: -40px;
}

.ui-login-form {
  position: relative;
  height: 100%;
  /*border: 1px solid #44444e;*/
  border-radius: 3px;
  padding: 5px 40px;
  /*background: #292126;
      opacity: .7;*/
  background: #fff;
  filter: alpha(opacity=100);
  -moz-opacity: 1;
  opacity: 1;
  padding-top: 10px;
}

.ui-label {
  position: relative;
  margin: 15px 0;
  height: 13%;
  max-height: 50px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}

.ui-label label {
  position: relative;
  width: 20%;
  height: 100%;
  color: #000;
  font-size: 14px;
  top: 46%;
  font-weight: bold;
}

.ui-label input {
  position: absolute;
  right: 0;
  bottom: 0px;
  width: 70%;
  height: 30px;
  padding: 0 10px;
  /*background: #353351;
      color: #fff;*/
  color: #333;
  font-size: 12px;
  border: 0px solid #000;
}

.ui-code label {
  position: relative;
  height: 100%;
}

.ui-code input {
  right: 35%;
  width: 35%;
}

.ui-code img {
  position: absolute;
  right: 0;
  bottom: 5px;
  margin-left: 15px;
  width: 30%;
  background: #fff;
  cursor: pointer;
  border: 1px solid;
}

.ui-code button {
  position: relative;
  float: right;
  width: 15%;
  height: 100%;
  padding: 0;
  margin-left: 5px;
  color: #fff;
  background: #292126;
  cursor: pointer;
}

.ui-code button:hover {
  border-bottom: 1px solid #fff;
}

.ui-checkbox {
  border: 0;
  font-size: 12px;
}

.ui-checkbox input {
  position: relative;
  width: 16px;
  height: 16px;
  background: #6e80ff;
  padding: 0;
  margin: 0 5px 0 0;
  cursor: pointer;
  top: 2px;
}

.ui-checkbox label {
  position: relative;
  width: 50%;
  text-align: left;
  font-size: 12px;
  color: #939393;
}

.ui-checkbox span {
  position: absolute;
  right: 0;
  top: 25px;
  margin-left: 3px;
  text-decoration: underline;
  cursor: pointer;
  color: #939393;
  text-decoration: none;
}

.ui-login-form > button {
  position: relative;
  height: 32px;
  width: 100%;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  background: #3287ff;
  border-radius: 0px;
  border: 1px solid rgba(22, 104, 221, 1);
}

.ui-login-form > button[disabled] {
  background: #6e80ff;
  opacity: 0.2;
}

#drag {
  position: relative;
  background-color: #e8e8e8;
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
}

#drag .handler {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 32px;
  border: 1px solid #ccc;
  cursor: move;
}

.handler_bg {
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==')
    no-repeat center;
}

.handler_ok_bg {
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==')
    no-repeat center;
}

#drag .drag_bg {
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
}

#drag .drag_text {
  position: absolute;
  top: 0px;
  width: 100%;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}

.ui-wrapper .header {
  font-size: 12px;
  text-align: left;
  margin-bottom: 30px;
  position: relative;
  bottom: 0;
  color: #fff;
}

.ui-wrapper .header img {
  position: relative;
  width: 42px;
  height: 42px;
  margin-right: 10px;
  object-fit: cover;
}

.footer {
  position: absolute;
  bottom: 5%;
  width: 100%;
  text-align: center;
}

.footer img {
  width: 13%;
  min-width: 130px;
  max-width: 170px;
}
.el-alert {
  height: 30px;
  margin-top: 10px;
}
</style>
