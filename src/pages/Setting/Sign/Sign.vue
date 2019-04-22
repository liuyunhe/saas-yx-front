<template>
  <div class="container">
    <el-card>
      <div class="sign" v-for="(item, index) in actList" :key="index">
        <div class="img"  @click="goToDetail(item)" :style="{'background': `url(${item.taskImg}) no-repeat center / 100% 100%`}"></div>
          <div class="con">
            <div class="text">
              <div class="title">{{item.taskName}}</div>
              <div class="switch">
                <el-switch v-model="item.status" @change="openOrClose(item.status, item.id)" :active-value="1" :inactive-value="0"></el-switch>
              </div>
            </div>
            <div class="desc">{{item.taskDetail}}</div>
          </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actList: []
    }
  },
  created() {
    
  },
  mounted() {
    const loading = this.$loading({
      target: '.el-card'
    })
    this.getTaskList(() => loading.close())
  },
  methods: {
    getTaskList(callback) {
      this.$request.post('/sc/saotx/act/findList', {}, true, res => {
        if (res.ret === '200000') {
          this.actList = res.data
        }
        callback && callback()
      })
    },
    goToDetail(item) {
      this.$router.push(`/setting/sign/detail?code=${item.taskCode}&id=${item.id}`)
    },
    openOrClose(status, id) {
      if (!status) {
        this.$confirm('是否关闭签到活动?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.switchAPI(status, id)
        }).catch(() => {
          this.getTaskList()
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
      this.$request.post('/sc/saotx/act/update', {id, status}, true, res => {
        if (res.ret === '200000') {
          this.$message.success(status ? '开启成功' : '关闭成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sign {
  display: inline-block;
  width: 300px;
  height: 280px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  .img {
    display: block;
    width: 100%;
    height: 180px;
    cursor: pointer;
  }
  .con {
    position: relative;
    width: 100%;
    height: 100px;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
    .text {
      margin: 6px 0 10px;
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .switch {
        position: absolute;
        height: 20px;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      }
    }
    .desc {
      color: #515151;
    }
  }
}
</style>

