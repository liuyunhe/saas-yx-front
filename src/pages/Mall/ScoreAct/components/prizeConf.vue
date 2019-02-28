<template>
  <div class="content">
    <el-form class="mb20">
      <el-form-item v-for="(item, index) in num" :key="index">
        <img :src="imgURL" width="40px">
        <p>大撒大撒大撒</p>
        奖品数量：
        <el-input-number :controls="false" :min="1" :precision="0"></el-input-number>
        个
        <span>*</span>
        中奖概率
        <el-input-number :controls="false" :min="0" :max="100"></el-input-number>
        %
        <el-button type="danger">删除</el-button>
        <el-button type="primary">增库</el-button>
        <span class="residual">剩余181111111111个</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
      imgURL: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  display: inline-block;
  min-width: 715px;
  border: 1px solid #ccc;
  padding: 0 10px;
  .el-form-item {
    position: relative;
    height: 70px;
    margin-bottom: 0;
  }
  .el-form-item + .el-form-item {
    border-top: 1px solid #ccc;
  }
}
.el-form-item /deep/ .el-form-item__content {
  line-height: 60px;
}
img {
  vertical-align: middle;
  margin-left: 10px;
}
p {
  display: inline-block;
  width: 110px;
  // text-align: center;
  margin: 0;
}
span {
  color: red;
  margin-left: 10px
}
.el-input-number {
  width: 100px;
}
.residual {
  position: absolute;
  left: 160px;
  top: 50px;
  color: #a0a0a0;
  font-size: 12px;
  line-height: 1;
}
</style>
