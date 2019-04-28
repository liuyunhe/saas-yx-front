<template>
  <div class="container">
    <el-card>
      <el-table class="mt20" v-loading="load" border :data="taskList" style="width: 100%">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
        <el-table-column prop="score" label="获得积分数" align="center">
          <template slot-scope="scope">
            {{scope.row.taskCode != 'MEMBER_SCAN' ? scope.row.score : '/'}}
          </template>
        </el-table-column>
        <el-table-column prop="growth" label="获得成长值" align="center">
          <template slot-scope="scope">
            {{scope.row.taskCode != 'MEMBER_SCAN' ? scope.row.growth : '/'}}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            {{scope.row.utime ? new Date(scope.row.utime).Format('yyyy-MM-dd hh:mm:ss') : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="openOrClose(scope)" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <!-- TODO 暂不做 -->
            <!-- <el-button type="text" @click="detail(scope.row.id)">查看明细</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" width="600px">
      <div class="score" v-if="form.mbTask">
        <span>首次{{dialogTitle}}, 可获得</span>
        <el-input-number v-model="form.mbTask.score" :controls="false" :min="0" :max="1000000" :precision="0"></el-input-number> 积分
      </div>
      <div class="growth" v-if="form.mbTask">
        <el-input-number v-model="form.mbTask.growth" :controls="false" :min="0" :max="1000000" :precision="0"></el-input-number> 成长值
      </div>
      <div class="btn mt20">
        <el-button type="primary" @click="saveTask">保存</el-button>
        <el-button palin @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: true,
      taskList: [],
      dialogVisible: false,
      dialogTitle: '',
      form: {}
    }
  },
  created() {
    this.getTaskList()
  },
  methods: {
    getTaskList() {
      this.load = true
      this.$request.post('/api/wiseqr/mber/listBasic', {type: 1}, true, res => {
        if (res.ret === '200000') {
          this.taskList = res.data
          this.load = false
          return
        }
        this.$message.error(res.message)
      })
    },
    openOrClose(scope) {
      if (!scope.row.status) {
        this.$confirm('关闭后消费者将不能享受当前的级别的权益，未避免投诉，请谨慎操作。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.switchAPI(scope.row.status, scope.row.id)
        }).catch(() => {
          // this.getTaskList()
          // this.taskList[0].status = 1
          this.$set(this.taskList[scope.$index], 'status', 1)
          this.$message({
            type: 'info',
            message: '已取消关闭'
          })          
        })
      } else {
        this.switchAPI(scope.row.status, scope.row.id)
      }
    },
    switchAPI(status, id) {
      this.$request.post('/api/wiseqr/mber/upTaskStatus', {status, id}, true, res => {
        if (res.ret === '200000') {
          this.$message.success(status ? '开启成功' : '关闭成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    detail(id) {
      this.$router.push(`/customer/task/detail?id=${id}`)
    },
    edit(row) {
      if (row.taskCode != 'MEMBER_SCAN') {
        this.$request.post('/api/wiseqr/mber/detTaskById', {id: row.id}, true, res => {
          if (res.ret === '200000') {
            this.form = res.data
            this.dialogTitle = row.taskName
            this.dialogVisible = true
            return
          }
          this.$message.error(res.message)
        })
      } else {
        this.$router.push(`/customer/task/scanEdit?id=${row.id}`)
      }
    },
    saveTask() {
      if (!this.form.mbTask.score || !this.form.mbTask.growth) return this.$message.error('请完善表单数据!')
      this.$request.post('/api/wiseqr/mber/saveBasic', this.form, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功')
          this.dialogVisible = false
          this.getTaskList()
          return
        }
        this.$message.error(res.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.conf-act-list li {
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
.conf-act-list li + .conf-act-list li {
  margin-left: 20px;
}
.el-dialog {
  .score span {
    display: inline-block;
    width: 170px;
    text-align: right;
    margin-left: 30px;
    padding-right: 10px;
  }
  .growth {
    margin: 10px 0 10px 215px;
  }
  .status {
    margin-left: 30px;
    span {
      display: inline-block;
      width: 180px;
      text-align: right;
    }
    .el-switch {
      margin-bottom: 2px;
    }
  }
  .btn {
    text-align: center;
  }
}
</style>


