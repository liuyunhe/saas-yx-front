<template>
  <section class="add-supplier-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="供应商名称" prop="name" size="small">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact" size="small">
        <el-input v-model="ruleForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile" size="small">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="addr" size="small">
        <el-input v-model="ruleForm.addr"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note" size="small">
        <el-input v-model="ruleForm.note" placeholder="请输入备注(主营商品、品牌等)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="returnSupplier">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<style lang="scss" scoped>
  .add-supplier-container{
    background-color:   #fff;
    padding: 30px 15px;
  }
</style>
<style>
  .add-supplier-container .el-input{
    width: 300px;
  }
</style>

<script>
  export default {
    name: "",
    data() {
      return {
        ruleForm: {
          name: '',
          contact:'',
          mobile:'',
          addr:'',
          note:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],

        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              addr: this.ruleForm.addr,
              contact: this.ruleForm.contact,
              mobile: this.ruleForm.mobile,
              name: this.ruleForm.name,
              note: this.ruleForm.note
            }
            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/api/wiseqr/supplier/saveOrModify',params,true,res => {
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
      },
      returnSupplier(){
        this.$router.push({
          path:'/product/supply'
        })
      }
    }
  }
</script>