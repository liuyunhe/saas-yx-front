<template>
  <div class="container">
    <el-card>
      <el-form>
        <el-form-item label="荷石币消耗：">
          消耗
          <el-input-number :precision="0" :min="0" controls-position="right"></el-input-number>
          荷石币可抽一次奖
          <span class="ml20">
            每周首次抽奖免费
          </span>
        </el-form-item>
        <el-form-item label="大转盘投放奖品设置：">
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
