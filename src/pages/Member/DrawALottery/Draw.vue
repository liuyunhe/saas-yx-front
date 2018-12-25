<template>
  <div class="container">
    <el-card>
      <el-col class="mb20">
        <span>中奖周期：</span>
        <el-select v-model="params.termName" placeholder="请选择">
          <el-option v-if="drawCircleData" v-for="item in drawCircleData" :key="item.termName" :label="item.termName" :value="item.termName"></el-option>
        </el-select>
      </el-col>
      <el-button type="primary" @click="queryDraw">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-card>
    <el-card class="mt20">
      <el-table border  v-loading="loading" :stripe="true" :data="drawList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="termName" label="中奖周期"></el-table-column>
        <el-table-column align="center" label="开奖周期">
          <template slot-scope="scope">
            {{scope.row.term}}—{{scope.row.termEnd}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="result" label="开奖号码"></el-table-column>
        <el-table-column align="center" prop="drawUser" label="操作人"></el-table-column>
        <el-table-column align="center" label="操作时间">
          <template slot-scope="scope" v-if="scope.row.drawTime">
            {{new Date(scope.row.drawTime).Format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开奖状态">
          <template slot-scope="scope">
            <span v-if="scope.row.drawStatus == 1">待开奖</span>
            <span v-if="scope.row.drawStatus == 2">开奖中</span>
            <span v-if="scope.row.drawStatus == 3">开奖完成</span>
            <span v-if="scope.row.drawStatus == 4">开奖异常</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="操作项">
          <template slot-scope="scope" v-if="scope.row.drawStatus == 1"><el-button type="text" @click="openDrawDialog(scope.row)">开奖</el-button></template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
    <el-dialog custom-class="select-num-dialog" title="选择中奖号码" @close="resetSelectedNum" :close-on-click-modal="false" :center="true" :visible.sync="selectedNumDialogVisible" width="650px">
      <div class="con">
        <p>当前开奖周期时间段为{{nowDrawCircleTime}}</p>
        <div class="warpper mb20">
          <div :class="item.selected ? 'num active' : 'num'" v-for="(item, index) in numArr" @click="selectedStatus(index)" :key="index">{{item.num}}</div>
        </div>
        <el-button type="primary" size="medium" @click="save">保存</el-button>
        <el-button size="medium" @click="selectedNumDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog custom-class="selected-dialog" width="500px" title="当前已选中奖号码" :close-on-click-modal="false" :visible.sync="confirmDialogVisible">
      <div class="con">
        <div class="num">{{selectedNumArr[0]}}</div>
        <div class="num">{{selectedNumArr[1]}}</div>
      </div>
      <div class="btn">
        <el-button type="primary" size="medium" @click="drawALottery">确认开奖</el-button>
        <el-button size="medium" @click="confirmDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 10,
        termName: ''
      },
      loading: true,
      total: 5,
      drawCircleData: [],
      numArr: [
        { num: 1, selected: false },
        { num: 2, selected: false },
        { num: 3, selected: false },
        { num: 4, selected: false },
        { num: 5, selected: false },
        { num: 6, selected: false },
        { num: 7, selected: false },
        { num: 8, selected: false },
        { num: 9, selected: false },
        { num: 10, selected: false },
        { num: 11, selected: false },
        { num: 12, selected: false },
      ],
      nowId: null,
      selectedNumArr: [],
      selectedDrawCircle: '',
      drawList: [],
      nowDrawCircleTime: '',
      selectedNumDialogVisible: false,
      confirmDialogVisible: false
    }
  },
  created() {
    this.getDrawList()
    this.getQueryList()
  },
  methods: {
    getDrawList() {
      this.$request.post('/api/saotx/md/listRsl', this.params, true, res => {
        if (res.ret === '200000') {
          this.drawList = res.data.list
          this.loading = false
          return
        }
        this.$message.error(res.message)
      })
    },
    getQueryList() {
      this.$request.post('/api/saotx/md/terms', {}, true, res => {
        if (res.ret === '200000') return this.drawCircleData = res.data
        this.$message.error(res.message)
      })
    },
    queryDraw() {
      this.params.pageNo = 1
      this.params.pageSize = 10
      this.loading = true
      this.getDrawList()
    },
    reset() {
      this.params.termName = ''
      this.params.pageNo = 1
      this.params.pageSize = 10
      this.loading = true
      this.getDrawList()
    },
    openDrawDialog(row) {
      this.selectedNumDialogVisible = true
      this.nowDrawCircleTime = row.term + '—' + row.termEnd
      this.nowId = row.id
    },
    selectedStatus(i) {
      if (this.numArr[i].selected) {
        this.numArr[i].selected = false
        if (this.selectedNumArr[0] === this.numArr[i].num) {
          this.selectedNumArr.shift()
        }  else {
          this.selectedNumArr.pop()
        }
      } else {
        this.numArr[i].selected = true
        this.selectedNumArr.push(this.numArr[i].num)
        if (this.selectedNumArr.length > 2) {
          this.numArr[this.selectedNumArr[0] - 1].selected = false
          this.selectedNumArr.shift()
        }
      }
    },
    save() {
      if (this.selectedNumArr.length !== 2) return this.$message.warning('请选择2个中奖号码')
      this.selectedNumArr.sort(function(a, b) {
        return a - b
      })
      this.confirmDialogVisible = true
    },
    drawALottery() {
      let drawNum = this.selectedNumArr.join(',')
      this.$request.post('/api/saotx/md/draw', {id: this.nowId, result: drawNum}, true, res => {
        if (res.ret === '200000') {
          this.reset()
        } else {
          this.$message.error(res.message)
        }
        this.selectedNumDialogVisible = false,
        this.confirmDialogVisible = false
        this.selectedNumArr = []
      })
    },
    resetSelectedNum() {
      this.selectedNumDialogVisible = false
      this.numArr.map((value) => {
        value.selected = false
      })
      this.selectedNumArr = []
    },
    handleSizeChange(newSize) {
      this.params.pageSize = newSize
      this.getDrawList()
    },
    handleCurrentChange(newPage) {
      this.params.pageNo = newPage
      this.getDrawList()
    }
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
