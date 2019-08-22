<template>
  <div class="SystemMgr-container">
    <el-form>
      <el-card>
        <div slot="header" class="clearfix">
          <span>申请经销商设置：</span>
        </div>
        <el-form-item label="申请经销商时，推荐码是否为必填：">
          <el-radio-group v-model="ruleForm.radio">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-card>
      <div style="height: 30px"></div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>返佣金额设置：</span>
        </div>
        <el-form-item label="一级经销商返佣金：">
          <el-input-number style="width: 200px;" v-model="ruleForm.aaa" :precision="2" :min="0" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="二级经销商返佣金：">
          <el-input-number style="width: 200px;" v-model="ruleForm.aaa" :precision="2" :min="0" controls-position="right"></el-input-number>
        </el-form-item>
      </el-card>
      <div style="height: 30px"></div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>提现申请阀值设置：</span>
        </div>
        <el-form-item label="提现需申请阀值金额：">
          <el-input-number style="width: 200px;" v-model="ruleForm.aaa" :precision="2" :min="0" controls-position="right"></el-input-number>
        </el-form-item>
      </el-card>
      <div style="height: 30px"></div>
      <div></div>
      <div style="height: 40px;text-align: center;margin-top: 30px">
        <el-button type="primary" @click="">确定</el-button>
        <el-button @click="">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SystemMgr",
    data(){
      return {
        ruleForm:{
          radio:'0',
          aaa:''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .SystemMgr-container{
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
  }
</style>