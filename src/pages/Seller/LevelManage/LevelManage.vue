<template>
  <div class="container">
    <el-card v-loading="loading">

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      info:{},
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$request.post('/hbact/card/act/info', {}, true, res => {
        if (res.code == '200') {
          this.info = res.data
          this.loading = false
          return
        }
        this.$message.error(res.msg)
      })
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
