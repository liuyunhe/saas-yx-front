<template>
  <div class="container">
    <el-card>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基础设置"></el-step>
        <el-step title="规则设置"></el-step>
        <el-step title="投放设置"></el-step>
      </el-steps>
       <base-conf v-if="active == 0" @nextStep="next"></base-conf>
       <rules-conf v-if="active == 1" :activityCode="actCode" @nextStep="next" @back="back"></rules-conf>
       <put-conf v-if="active == 2" :activityCode="actCode" @back="back"></put-conf>
    </el-card>
  </div>
</template>
<script>
import baseConf from './components/baseConf'
import rulesConf from './components/rulesConf'
import putConf from './components/putConf'
export default {
  components: {
    baseConf,
    rulesConf,
    putConf
  },
  data() {
    return {
      active: 0,
      actCode: ''
    }
  },
  created() {
  },
  methods: {
    next(code) {
      if (code) {
        this.actCode = code
        this.active++
        return
      }
      this.$message.error('系统繁忙，请重试!')
    },
    back() {
      this.active = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 520px;
  margin: 40px auto;
}
.el-input {
  width: 300px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 108px;
  display: block;
}
.quill-editor {
  width: 420px;
}
</style>

