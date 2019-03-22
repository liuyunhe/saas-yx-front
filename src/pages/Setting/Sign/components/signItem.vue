<template>
  <div class="content">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        连续签到
        <el-input-number v-model="item.continuSignDay" @change="noRepeat(item.continuSignDay, index)" :controls="false" :min="0" :precision="0"></el-input-number>
        天，额外可获得
        <el-input-number v-model="item.extraScore" :controls="false" :min="0" :precision="0"></el-input-number>
        积分
        <el-input-number v-model="item.extraGrowth" :controls="false" :min="0" :precision="0"></el-input-number>
        成长值
        <el-button icon="el-icon-plus" circle @click="add(index)"></el-button>
        <el-button icon="el-icon-minus" circle v-if="index !== 0" @click="del(index)"></el-button>
      </li>
    </ul>
    <p class="tips">每 <span>{{maxDay}}</span> 天为一个循环, 最多连续签到 <span>{{maxDay}}</span> 天, 断签则从第一天开始重新计算</p>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      maxDay: null
    }
  },
  data() {
    return {}
  },
  created() {
    this.data.sort(this.compare('continuSignDay'))
    this.maxDay = this.data[this.data.length - 1].continuSignDay
  },
  methods: {
    noRepeat(val, i) {
      let flag = true
      this.data.forEach((item, index) => {
        if (i == index) return
        if (item.continuSignDay == val) {
          flag = false
          this.$message.error('连续签到天数不能重复!')
          return
        }
      })
      // 排序
      if (flag) {
        this.data.sort(this.compare('continuSignDay'))
        this.maxDay = this.data[this.data.length - 1].continuSignDay
      }
    },
    add(i) {
      if (this.data.length >= 10) return this.$message.error('连续签到设置不能超过10项!')
      this.data.push({continuSignDay: 0, extraScore: 0, extraGrowth: 0})
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
    },
    compare(property) {
      return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;     // 升序
      }
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
  transition: all 0.1s;
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
.tips {
  span {
    color: #FF0000;
  }
}
</style>

