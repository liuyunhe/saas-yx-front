<template>
  <div class="content">
    <el-form class="mb20">
      <el-form-item v-for="(item, index) in data" :key="index">
        <img :src="item.image" width="40px">
        <p>{{item.productName}}</p>
        奖品数量：
        <el-input-number @change="sync(index)" :disabled="item.id ? true : false" v-model="item.allquantity" :controls="false" :min="0" :precision="0"></el-input-number>
        个
        <span>*</span>
        中奖概率
        <el-input-number v-model="item.probability" :controls="false" :min="0" :max="100"></el-input-number>
        %
        <el-button type="danger" @click="del(index)">删除</el-button>
        <el-button type="primary" v-if="item.id" @click="addRepertory(index)">增库</el-button>
        <span class="residual">剩余{{item.quantity}}个</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      num: 1,
      imgURL: 'http://qoss.qrmkt.cn/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png'
    }
  },
  methods: {
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
    sync(i) {
      this.data[i].quantity = this.data[i].allquantity
    },
    addRepertory(i) {
      this.$prompt('请输入数字', '增库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{1,}$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        if (value == 0) return this.$message.error('数字不能为0')
        this.$request.post('/sc/saotx/game/addQuality', {
          id: this.data[i].id,
    		  shopQuantity: value
        }, true, res => {
          if (res.code == 200) {
            this.$message.success('增库成功')
            // this.awae.totalNum += Number(value)
            this.data[i].allquantity += Number(value)
            this.data[i].quantity += Number(value)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    }
  },
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
  text-align: center;
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
