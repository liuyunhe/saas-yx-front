<template>
  <div class="container">
    <el-card>
      <el-col class="mb20">
        <span>中奖周期：</span>
        <el-select v-model="selectedDrawCircle" placeholder="请选择" @change='clg'>
          <el-option v-for="item in drawCircleData" :key="item.id" :label="item.time" :value="item.name"></el-option>
        </el-select>
      </el-col>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </el-card>
    <el-card class="mt20">
      <el-table border :stripe="true" :data="drawList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="中奖周期"></el-table-column>
        <el-table-column align="center" prop="name" label="开奖周期">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="开奖号码"></el-table-column>
        <el-table-column align="center" prop="name" label="操作人"></el-table-column>
        <el-table-column align="center" prop="name" label="操作时间">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="操作项">
          <template slot-scope="scope"><el-button type="text" @click="openDrawDialog(scope.row)">开奖</el-button></template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
    <el-dialog custom-class="select-num-dialog" title="选择中奖号码" :close-on-click-modal="false" :center="true" :visible.sync="selectedNumDialogVisible" width="650px">
      <div class="con">
        <p>当前开奖周期时间段为{{nowDrawCircleTime}}</p>
        <div class="warpper mb20">
          <div :class="item.selected ? 'num active' : 'num'" v-for="(item, index) in numArr" @click="selectedStatus(index)" :key="index">{{item.num}}</div>
        </div>
        <el-button type="primary" size="medium" @click="save">保存</el-button>
        <el-button size="medium" @click="resetSelectedNum">取消</el-button>
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
        pcode: ''
      },
      total: 5,
      drawCircleData: [
        { name: '123', time: '第1234期', id: 1 },
        { name: '1223', time: '第123234期', id: 2 },
        { name: '12323', time: '第123234期', id: 3 }
      ],
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
      selectedNumArr: [],
      selectedDrawCircle: '',
      drawList: [
        { name: 'test' },
        { name: 'test' },
        { name: 'test' },
        { name: 'test' },
        { name: 'test' },
      ],
      nowDrawCircleTime: '',
      selectedNumDialogVisible: false,
      confirmDialogVisible: false
    }
  },
  methods: {
    getDrawList() {

    },
    clg() {
      console.log(this.selectedDrawCircle)
    },
    openDrawDialog(row) {
      this.selectedNumDialogVisible = true
      this.nowDrawCircleTime = row.name
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

    },
    resetSelectedNum() {
      this.selectedNumDialogVisible = false
      this.numArr.map((value) => {
        value.selected = false
      })
      this.selectedNumArr = []
    },
    handleSizeChange(newSize) {
      this.params.pagesize = newSize
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
