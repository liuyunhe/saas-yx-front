<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{prizeType[type].title}}</span>
        <span v-if="type == 3" style="color: #999;">投入总金额：{{totalRedNum}}元  剩余总金额：{{totalSurplusNul}}元</span>
      </div>
      <el-form>
        <el-form-item>
          <span>{{prizeType[type].titleName}}</span>
          <el-button icon="el-icon-plus" @click="getMaterialList"></el-button>
        </el-form-item>
        <el-form-item v-if="params" v-for="(item, index) in params" :key="index">
          <!-- <span v-if="type == 1">
            <el-input style="width: 90px" :disabled="true" :value="prizeType[type].awardName"></el-input>
          </span>
          <span v-else>{{prizeType[type].awardName}}</span> -->
          <span>{{prizeType[type].awardName}}</span>
          <!-- <span v-if="item.awardType == 1">{{item.awardName}}</span> -->
          <span v-if="item.awardType == 1">
            <el-input style="width: 120px" :disabled="true" :value="item.awardName"></el-input>
          </span>
          <!-- <span v-else>{{item.minred}}</span> -->
          <span v-else>
            <el-input style="width: 80px" :disabled="true" :value="item.minred"></el-input>
          </span>
          <span>{{prizeType[type].units}}</span>
          投放数量：
          <el-input-number :disabled="item.id ? true : false" v-if="type == 1 || type == 202 || type == 201" v-model="item.totalNum" :precision="0" :min="0" controls-position="right"></el-input-number>
          <el-input-number :disabled="item.id ? true : false" v-if="type == 3" v-model="item.totalNum" @change="calculate(index)" :precision="0" :min="0" controls-position="right"></el-input-number>
          <el-input-number :disabled="item.id ? true : false" v-if="type == 6" v-model="item.totalNum" @change="calculate(index)" :precision="0" :min="0" controls-position="right"></el-input-number>
          <span class="mr20" v-if="item.id" style="font-size: 12px; color: #aaa;">
            <span v-if="type == 3">剩余数量：{{item.totalNum - item.redNumStock}}个</span>
            <span v-else>剩余数量：{{item.totalNum - item.stockNum}}个</span>
          </span>
          <!-- <span v-if="type == 3">总金额{{isNaN(totlaMoney[index]) ? '' : totlaMoney[index]}}元</span> -->
          <span v-if="type == 3">
            总金额
            <el-input style="width: 100px" :value="isNaN(totlaMoney[index]) ? '' : totlaMoney[index]" :disabled="true"></el-input>
            元
          </span>
          <!-- <span v-if="type == 6">总荷石币{{isNaN(totlaMoney[index]) ? '' : totlaMoney[index]}}</span> -->
          <span v-if="type == 6">
            总荷石币
            <el-input style="width: 100px" :value="isNaN(totlaMoney[index]) ? '' : totlaMoney[index]" :disabled="true"></el-input>
          </span>
          中奖概率：
          <el-input-number v-model="item.probability" :precision="2" :min="0" :max="100" controls-position="right"></el-input-number>%
          <el-button class="ml20" type="danger" @click="del(item, index)">删除</el-button>
          <el-button type="primary" v-if="item.id" @click="add(item.id, index)">增库</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :close-on-click-modal="false" :visible.sync="dataListVisible" width="800px">
        <el-form inline label-width="40px">
          <el-form-item label="名称">
            <el-input v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getMaterialList">查询</el-button>
            <el-button plain @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div style="height: 500px; overflow: auto;">
          <el-table  v-loading="loading" class="mb20" ref="doubleCardTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @select-all="handleSelectionAllChange" @select="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="valueAlias" :label="prizeType[type].tableName"></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.icon" width="50">
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button type="primary" size="medium" @click="confirmChecked">{{prizeType[type].btnText}}</el-button>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['params', 'type'],
  data() {
    return {
      loading: true,
      queryParams: {
        name: '',
        type: 2,
        subType: null,
        pageNo: 1,
        pageSize: -1
      },
      prizeType: {
        1: {tableName: '', btnText: '选择勾选的实物', titleName: '选择实物：', title: '实物', awardName: '实物名称', units: ''},
        3: {tableName: '金额', btnText: '选择勾选的红包', titleName: '选择红包：', title: '红包', awardName: '面额', units: '元'},
        202: {tableName: '倍数', btnText: '选择勾选的翻倍卡', titleName: '选择翻倍卡：', title: '翻倍卡', awardName: '翻倍卡', units: '倍'},
        201: {tableName: '折扣', btnText: '选择勾选的折扣卡', titleName: '选择折扣卡：', title: '折扣卡', awardName: '折扣值', units: '折'},
        6: {tableName: '荷石币', btnText: '选择勾选的积分', titleName: '选择荷石币：', title: '荷石币', awardName: '面额', units: '荷石币'},
      },
      dataList: [],
      dataListVisible: false,
      total: null,
      selectedItem: [],
      totlaMoney: [],
      totalRedNum: null,
      totalSurplusNul: null
    }
  },
  created() {
    
  },
  mounted () {
    this.getCheckedCard()
    this.calculate()
  },
  methods: {
    calculate(index) {
      if (this.type == 3) {
        if (index != undefined) {
          let total = (this.params[index].totalNum * this.params[index].minred).toFixed(2)
          this.totlaMoney.splice(index, 1, total)
        } else {
          this.params.forEach(item => {
            let total = (item.totalNum * item.minred).toFixed(2)
            this.totlaMoney.push(total)
          })
        }
        this.totalRedNum = null
        this.totalSurplusNul = null
        this.params.map(item => {
          this.totalSurplusNul += (item.totalNum - item.redNumStock) * item.minred.toFixed(2)
          this.totalRedNum += item.totalNum * item.minred.toFixed(2)
        })
        this.totalSurplusNul = this.totalSurplusNul.toFixed(2)
        this.totalRedNum = this.totalRedNum.toFixed(2)
      } else if (this.type == 6) {
        if (index != undefined) {
          let total = (this.params[index].totalNum * this.params[index].score)
          this.totlaMoney.splice(index, 1, total)
        } else {
          this.params.forEach(item => {
            let total = (item.totalNum * item.score)
            this.totlaMoney.push(total)
          })
        }
      }
    },
    getCheckedCard() {
      if (this.params.length != 0) {
        this.params.forEach(item => {
          this.selectedItem.push({id: item.poolId})
        })
      }
    },
    handleSelectionChange(selection, row) {
      this.selectedItem = selection
      console.log(this.selectedItem)
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
            // awardValue: item.value,
            totalNum: null,
            stockNum: null,
            probability: null,
            score: item.value,
            minred: item.value,
            redTotalMoney: null,
            redNum: null,
            poolId: item.id,
            awardType: this.type
          })
        }
      })
      this.calculate()
    },
    add(id, index) {
      this.$prompt('请输入数字', '增库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{1,}$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        if (value == 0) return this.$message.error('数字不能为0')
        this.$request.post('/api/wiseqr/md/addAward', {
          id: id,
          increment: value
        }, true, res => {
          if (res.ret === '200000') {
            this.$message.success('增库成功')
            this.params[index].totalNum += Number(value)
            this.calculate(index)
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
    getMaterialList() {
      switch (this.type) {
        case 1:
          this.queryParams.type = 1
          break;
        case 201:
          this.queryParams.type = 2
          this.queryParams.subType = 201
          break;
        case 202:
          this.queryParams.type = 2
          this.queryParams.subType = 202
          break;
        case 3:
          this.queryParams.type = 3
          break;
        case 6:
          this.queryParams.type = 6
          break;
      }
      this.dataListVisible = true
      this.$request.post('/api/wiseqr/md/listMaterial', this.queryParams, true, res=> {
        this.loading = false
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
    reset() {
      this.queryParams.name = ''
      this.getMaterialList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNo = newPage
      this.getMaterialList()
    }
  }
}
</script>
