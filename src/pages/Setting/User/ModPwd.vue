<template>
  <div>
    <el-card class="box-card">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" status-icon class="mod-pwd">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input size="small" type="password" v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input size="small" type="password" v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input size="small" type="password" v-model="form.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*?]{8,16}$/.test(value)) {
                callback(new Error('8-16位字符(至少包含字母、数字、符号中的两种形式)'));
            } else {
                if (this.form.checkPass !== '') {
                    this.$refs.form.validateField('checkPass');
                }
                callback();
            }
        };
        var checkNewPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else if (value !== this.form.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            cluser: {},
            form: {
                oldPwd: '',
                newPwd: '',
                checkPass: ''
            },
            rules: {
                oldPwd: [{required:true, message:'原密码不能为空', trigger:'blur'}],
                newPwd: [{required:true, validator:validatePass, trigger:'blur'}],
                checkPass: [{required:true, validator:checkNewPwd, trigger:'blur'}]
            }
        };
    },
    created() {
        const cluserStr = sessionStorage.getItem("cluser");
        this.cluser = JSON.parse(cluserStr);
        if(!this.cluser||!this.cluser.account) {
            this.clearLoginSession();
            return false;
        }
    },
    methods: {
        // 清空当前登录用户信息缓存
        clearLoginSession() {
            sessionStorage.removeItem("cluser");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("access_loginId");
        },
        // 提交表单
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let params = {};
                    params.account = this.cluser.account;
                    params.oldPwd = this.form.oldPwd;
                    params.newPwd = this.$md5(this.form.newPwd);
                    this.$request.post('/api/saotx/user/modifyPwd', params, true, (res)=>{
                        if (res.ret == '200000') {
                            this.clearLoginSession();
                            this.$router.push({path:"/login"});
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
    .mod-pwd .el-input {
        width: 400px;
    }
</style>
