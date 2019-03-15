<template>
  <div class="container">
    <el-card>
      <div class="wrapper" v-if="showListFlg">
        <div class="item" v-for="(item, index) in 10" :key="index">
          <p class="name">{{item}}.{{rigthsList[index] ? rigthsList[index].gradeName : '普通用户'}}</p>
          <img :src="rigthsList[index] ? rigthsList[index].gradeImg : defaultImgUrl" width="83" height="83">
          <p class="growth">需要{{rigthsList[index] ? rigthsList[index].gradeUpper : ''}}成长值</p>
          <div class="rights">
            <p v-if="index < listLen"><span>等级权益</span><span>{{rigthsList[index] ? rigthsList[index].rightsNum : 0}}</span></p>
          </div>
          <div class="btn" v-if="index <= listLen">
            <el-switch v-if="index < listLen" v-model="rigthsList[index].status" @change="openOrClose(rigthsList[index].status, rigthsList[index].id, index)" :active-value="1" :inactive-value="0"></el-switch>
            <el-button type="text" @click="edit(rigthsList[index], index)">编辑</el-button>
          </div>
        </div>
        <!-- <div class="item">
          <p class="name">1.普通用户</p>
          <img src="" width="83" height="83">
          <p class="growth">需要成长值</p>
          <div class="rights"> 
            <p><span>等级权益</span><span>1</span></p>
          </div>
          <el-button type="text">编辑</el-button>
        </div>
        <div class="item">
          <p class="name">1.普通用户</p>
          <img src="" width="83" height="83">
          <p class="growth">需要成长值</p>
          <div class="rights">
            <p><span>等级权益</span><span>1</span></p>
          </div>
          <el-button type="text">编辑</el-button>
        </div>
        <div class="item">
          <p class="name">1.普通用户</p>
          <img src="" width="83" height="83">
          <p class="growth">需要成长值</p>
          <div class="rights">
            <p><span>等级权益</span><span>1</span></p>
          </div>
          <el-button type="text">编辑</el-button>
        </div> -->

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
      showListFlg: false,
      listLen: 0,
      defaultImgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/rifhts-default-img.png'
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    getRightsList() {
      this.$request.post(`/api/saotx/mbgrade/lists?_=${new Date().getTime()}`, {}, true, res => {
        if (res.ret === '200000') {
          this.rigthsList = res.data
          this.listLen = this.rigthsList.length
          this.showListFlg = true
        }
      })
    },
    openOrClose(status, id, i) {
      if (!status) {
        if (this.rigthsList.length - 1 > i) {
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
          this.switchAPI(status, id)
        }).catch(() => {
          this.getRightsList()
          this.$message({
            type: 'info',
            message: '已取消关闭'
          })          
        })
      } else {
        this.switchAPI(status, id)
      }
    },
    switchAPI(status, id) {
      this.$request.post('/api/saotx/mbgrade/updateStatus', {id, status}, true, res => {
        if (res.ret === '200000') {
          this.$message.success(status ? '开启成功' : '关闭成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    edit(item, i) {
      if (item) return this.$router.push(`/customer/lvl/edit?id=${item.id}`)
      if (this.rigthsList.length != 0) {
        let lowestGrowth = this.rigthsList[i - 1].gradeUpper
        this.$router.push(`/customer/lvl/edit?lowGrowth=${lowestGrowth}`)
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

