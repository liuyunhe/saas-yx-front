<template>
  <div class="container">
    <el-card>
      <el-form>
        <el-form-item label="每人每周参与答题抽奖次数：">
          <el-input-number :precision="0" :min="0" controls-position="right"></el-input-number>
          次
        </el-form-item>
        <el-form-item label="答题投放奖品设置：">
          <span>必须配置一项奖品类型</span>
        </el-form-item>
        <common-conf :type="1"></common-conf>
        <common-conf :type="2"></common-conf>
        <common-conf :type="3"></common-conf>
        <common-conf :type="6"></common-conf>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import commonConf from './components/commonConf'
export default {
  components: {
    commonConf
  }
}
</script>
<style lang="scss" scoped>
span {
  color: #999999;
}
</style>

