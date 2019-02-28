<template>
  <div class="content">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        连续签到
        <el-input-number v-model="item.continuSignDay" :controls="false" :min="0" :precision="0"></el-input-number>
        天，额外可获得
        <el-input-number v-model="item.extraScore" :controls="false" :min="0" :precision="0"></el-input-number>
        积分
        <el-input-number v-model="item.extraGrowth" :controls="false" :min="0" :precision="0"></el-input-number>
        成长值
        <el-button icon="el-icon-plus" circle @click="add(index)"></el-button>
        <el-button icon="el-icon-minus" circle v-if="index !== 0" @click="del(index)"></el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
    console.log(this.data)
  },
  methods: {
    add(i) {
      this.data.push({continuSignDay: null, extraScore: null, extraGrowth: null})
    },
    del(i) {
      this.$confirm('是否删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.data.splice(i, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 10px;
}
li {
  display: inline-block;
  min-width: 610px;
  height: 70px;
  line-height: 70px;
  border: 1px solid #d9d9d9;
  padding: 0 10px;
  box-sizing: border-box;
  .el-input-number {
    width: 80px;
  }
  .el-button {
    margin-left: 10px;
    border: 1px solid #606266;
  }
}
li + li {
  margin-top: 10px;
}
</style>

