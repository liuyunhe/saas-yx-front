<template>
  <section class="system-layout-container">
    <div class="box-container">
      <el-form ref="ruleForm" :inline="true" :rules="rules"  :model="filters" label-width="150px">
        <div class="system-layout-form-title">金叶币值配置：</div>
        <div class="system-layout-form-container">
          <el-form-item :size="'small'" label="金叶币值配置：" prop="integral">
            <el-input class="tobacco-input" v-model="filters.integral" placeholder="请输入内容"></el-input>
          </el-form-item>
          <span style="color: #111;line-height: 32px">金叶币=￥{{Number(money).toFixed(2)}}</span>
        </div>
        <div class="system-layout-form-bt">
          <el-form-item>
            <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
  export default {
    name: "SystemLayout",
    data() {
      return {
        filters:{
          integral:'',
        },
        //比例
        money:'',
        rules:{
          integral: [
            { required: true, message: '金叶币值配置', trigger: 'change' },
          ],
        }
      }
    },
    created(){
      this.queryIntegralMoney()
    },
    methods:{
      queryIntegralMoney(){
        this.$request.post('/sc/saotx/mall/queryIntegralMoney',{},true,res => {
          if(res.ret == '200000'){
            this.filters.integral = res.data.integral
            this.money = res.data.money
          }else{
            this.$message({
              message:res.message,
              type: 'warning'
            })
          }
        },err => {

        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              integral:this.filters.integral,
              money:this.money
            }
            this.$request.post('/sc/saotx/mall/setIntegralMoney',params,true,res => {
              if(res.ret == '200000'){
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                });
              }else{
                this.$message({
                  message:res.message,
                  type: 'warning'
                })
              }
            },err => {

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .system-layout-container{
    .box-container{
      background-color: #fff;
      padding: 15px;
      margin-bottom: 30px;
      &:after{
        content: '';
        display: block;
        width: 0;
        height: 0;
        clear: both;
      }
      .system-layout-form-bt{
        margin-top: 30px;
        text-align: center;
      }
    }
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>