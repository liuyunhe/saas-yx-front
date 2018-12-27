<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>折扣卡</span>
    </div>
    <el-form>
      <el-form-item>
        选择折扣卡：
        <el-button icon="el-icon-plus" @click="getDoubleCardList"></el-button>
      </el-form-item>
      <el-form-item v-if="params" v-for="(item, index) in params" :key="index">
        <span style="display: inline-block; width: 70px">{{item.awardName}}</span>
        投放数量：
        <el-input-number :disabled="item.id ? true : false" v-model="item.totalNum" :precision="0" :min="0" controls-position="right"></el-input-number>
        <span class="mr20" v-if="item.id" style="font-size: 12px; color: #aaa;">
          剩余数量：{{item.totalNum - item.stockNum}}个
        </span>
        中奖概率：
        <el-input-number v-model="item.probability" style="width: 90px" :precision="0" :min="0" :max="100" controls-position="right"></el-input-number>%
        <el-button class="ml20" type="danger" @click="del(item, index)">删除</el-button>
        <el-button type="primary" v-if="item.id" @click="add(item.id, index)">增库</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择折扣卡" :close-on-click-modal="false" :visible.sync="dataListVisible" width="800px">
      <el-table class="mb20" ref="doubleCardTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @select-all="handleSelectionAllChange" @select="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="valueAlias" label="倍数"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="50" alt="">
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="medium" @click="confirmChecked">选择勾选的折扣卡</el-button>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  props: ['params'],
  data() {
    return {
      queryParams: {
        type: 2,
        subType: 201,
        pageNo: 1,
        pageSize: -1
      },
      dataList: [],
      dataListVisible: false,
      total: null,
      selectedItem: [],
    }
  },
  created () {
    this.getCheckedCard()
  },
  methods: {
    getCheckedCard() {
      if (this.params.length != 0) {
        this.params.forEach(item => {
          this.selectedItem.push({id: item.poolId})
        })
      }
    },
    handleSelectionChange(selection, row) {
      this.selectedItem = selection
      // console.log(this.selectedItem)
    },
    handleSelectionAllChange(selection) {
      this.selectedItem = selection
    },
    confirmChecked() {
      this.dataListVisible = false
      this.selectedItem.forEach((item, index) => {
        if (JSON.stringify(this.params).indexOf('"poolId":' + item.id + ',') === -1) { 
          this.params.push({
            awardName: item.name,
            awardPicUrl: item.icon,
            totalNum: null,
            stockNum: null,
            probability: null,
            score: null,
            minred: null,
            redTotalMoney: null,
            redNum: null,
            poolId: item.id,
            awardType: 201
          })
        }
      })
    },
    add(id, index) {
      this.$prompt('请输入数字', '增库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{1,}$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        if (value == 0) return this.$message.error('数字不能为0')
        this.$request.post('/api/saotx/md/addAward', {
          id: id,
          increment: value
        }, true, res => {
          if (res.ret === '200000') {
            this.$message.success('增库成功')
            this.params[index].totalNum += Number(value)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    del(row, index) {
      this.$confirm('是否删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.params.splice(index, 1)
        this.selectedItem.forEach((item, i) => {
          if (item.id == row.poolId) return this.selectedItem.splice(i, 1)
        })
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
    getDoubleCardList() {
      this.dataListVisible = true
      this.$request.post('/api/saotx/md/listMaterial', this.queryParams, true, res=> {
        if (res.ret === '200000') {
          this.dataList = res.data.list
          this.total = res.data.page.count
          this.$nextTick(_ => {
            this.selectedItem.forEach(item => {
              this.$refs.doubleCardTable.toggleRowSelection(this.dataList.find(d => d.id == item.id), true)
            })
          })
          return
        }
        this.$message.error(res.message)
      })
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNo = newPage
      this.getDoubleCardList()
    }
  }
}
</script>
