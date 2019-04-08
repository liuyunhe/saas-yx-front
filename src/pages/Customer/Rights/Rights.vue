<template>
  <div class="container">
    <el-card>
      <div class="wrapper">
        <div class="item" v-for="(item, index) in 10" :key="index">
          <p class="name">{{item}}.{{rigthsList[index] ? rigthsList[index].gradeName : '普通用户'}}</p>
          <img :src="rigthsList[index] ? rigthsList[index].gradeImg : `https://qoss.qrmkt.cn/new_platform/pc_front/rifhts-default-img${item}.png`" width="83" height="83">
          <p class="growth">需要{{rigthsList[index] != undefined ? rigthsList[index].gradeLower : ''}}成长值</p>
          <div class="rights">
            <p v-if="index < listLen"><span>等级权益</span><span>{{rigthsList[index] ? rigthsList[index].rightsNum : 0}}</span></p>
          </div>
          <div class="btn" v-if="index <= listLen">
            <el-switch v-if="index < listLen" v-model="rigthsList[index].status" @change="openOrClose(rigthsList[index], index)" :active-value="1" :inactive-value="0"></el-switch>
            <el-button type="text" @click="edit(rigthsList[index], index)">编辑</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultList: [
        {name: '普通用户'}
      ],
      rigthsList: [],
      listLen: 0,
      // defaultImgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/rifhts-default-img.png',
      openGradeList: []
    }
  },
  created () {
    // this.getRightsList()
  },
  mounted() {
    const loading = this.$loading({
      target: '.el-card'
    })
    this.getRightsList(() => loading.close())
  },
  methods: {
    getRightsList(callback) {
      this.$request.post(`/api/wiseqr/mbgrade/lists?_=${new Date().getTime()}`, {}, true, res => {
        if (res.ret === '200000') {
          this.rigthsList = res.data
          this.openGradeList = res.data.filter(item =>  item.status > 0)
          // console.log(this.openGradeList)
          this.listLen = this.rigthsList.length
          callback && callback()
        }
      })
    },
    openOrClose(item, i) {
      let status = item.status,
          id = item.id
      if (item.gradeLower >= item.gradeUpper && status) {
        this.$message.error('请修改成长值上限')
        this.$set(this.rigthsList[i], 'status', 0)
        return
      }
      if (!status) {
        if (this.rigthsList.length != i + 1 && this.rigthsList[i + 1].status) {
          this.$alert('请先关闭高等级，在关闭当前等级。', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.getRightsList()
          return
        }
        this.$confirm('关闭后消费者将不能享受当前的级别的权益，未避免投诉，请谨慎操作。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.switchAPI(status, id, i)
        }).catch(() => {
          // this.getRightsList()
          this.$set(this.rigthsList[i], 'status', 1)
          this.$message({
            type: 'info',
            message: '已取消关闭'
          })          
        })
      } else {
        let flg = true
        this.rigthsList.forEach((item, index) => {
          if (index < i) {
            if (!item.status) {
              this.$alert('请先开启低等级，在开启当前等级。', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
              this.$set(this.rigthsList[i], 'status', status ? 0 : 1)
              flg = false
              return
            }
          }
        })
        if (flg) this.switchAPI(status, id, i)
      }
    },
    switchAPI(status, id, i) {
      this.$request.post('/api/wiseqr/mbgrade/updateStatus', {id, status}, true, res => {
        if (res.ret === '200000') {
          this.$message.success(status ? '开启成功' : '关闭成功')
        } else {
          this.$message.error(res.message)
          this.$set(this.rigthsList[i], 'status', status ? 0 : 1)
        }
      })
    },
    edit(item, i) {
      let highGrowth = null
      if (this.rigthsList[i + 1]) {
        highGrowth = this.rigthsList[i + 1].gradeUpper - 1
      }
      if (i == 0 && item) return this.$router.push(`/customer/lvl/edit?id=${item.id}&highGrowth=${highGrowth}`)
      let lowestGrowth = this.rigthsList[i - 1].gradeUpper
      if (item) return this.$router.push(`/customer/lvl/edit?id=${item.id}&lowGrowth=${lowestGrowth}&highGrowth=${highGrowth}`)
      if (this.rigthsList.length != 0) {
        this.$router.push(`/customer/lvl/edit?lowGrowth=${lowestGrowth}&highGrowth=${highGrowth}`)
      } else {
        this.$router.push(`/customer/lvl/edit`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-width: 1100px;
}
.item {
  float: left;
  width: 210px;
  height: 310px;
  margin: 20px 30px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(102, 102, 102, 0.349019607843137);
  .rights {
    height: 60px;
    margin: 0 20px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    p {
      display: flex;
      color: #aaa;
      justify-content: space-between;
      margin: 20px 0 0;
    }
  }
  // .el-button {
  //   margin-top: 10px;
  // }
  .btn {
    height: 70px;
    line-height: 70px;
    .el-switch {
      margin-right: 30px;
    }
  }
}
</style>

