<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-col class="mb20">
        新增特殊卡片数量：<el-input-number v-model="addNum" :precision="0" :min="0" controls-position="right" ></el-input-number><span style="margin-left:30px"></span><el-button type="primary" @click="save">新增</el-button>
      </el-col>
      <el-col class="mb20">
        <div style="margin-bottom: 20px">
          开奖状态：{{info.lotteryStatus == 1 ? '等待开奖':info.lotteryStatus == 2 ? '开奖中': info.lotteryStatus == 3 ? '已开奖' : ''}}
        </div>
        <div style="margin-bottom: 20px">
          开奖时间：{{ info.awdBeginTime }}
        </div>
        <div>
          活动结束时间：{{ info.joinEndTime }}
        </div>
      </el-col>
      <el-button type="primary" @click="open" :disabled="info.lotteryStatus !== 1">开奖</el-button>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading:true,
        info:{},
        addNum :0
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.$request.post('/hbact/lc/saas/act/info', {}, true, res => {
          if (res.code == '200') {
            this.info = res.data
            this.loading = false
            return
          }
          this.$message.error(res.msg)
        })
      },
      save(){
        this.loading = true
        this.$request.post('/hbact/lc/saas/update/cardNum', {addNum: this.addNum}, false, res => {
          this.loading = false
          if (res.code == '200') {
            this.addNum = 0
            this.$message.success("新增成功！")
            return
          }
          this.$message.error(res.msg)
        })
      },
      open(){
        this.$request.post('/hbact/lc/saas/award/open', {}, true, res => {
          if (res.code == '200') {
            this.$message.success(res.msg)
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
          this.getInfo()
        })
      },
    }
  };
</script>
<style lang="scss" scoped>
  .select-num-dialog {
    .con {
      text-align: center;
      user-select: none;
      .warpper {
        padding: 20px 40px;
      }
      .num {
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 10px 10px;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          color: #fff;
          background-color: #409EFF;
        }
        &.active:hover {
          color: #fff;
        }
      }
      .num:hover {
        color: #409EFF;
        border: 1px solid #409EFF;
      }
    }
  }
  .selected-dialog {
    .con {
      width: 400px;
      height: 60px;
      display: flex;
      margin: 0 auto 40px;
      .num {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        background-color: #409EFF;
        border-radius: 50%;
      }
      .num:first-child {
        margin: 0 40px 0 120px;
      }
    }
    .btn {
      text-align: center;
    }
  }
</style>
