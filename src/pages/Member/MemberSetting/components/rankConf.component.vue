<template>
  <div class="content">
    <el-form-item label="名次设置：" prop="srange">
      <div class="mb20" v-for="(item, i) in params" :key="i">
        <div v-if="item.rangeType == 1">
          <el-input-number style="width: 90px;" v-model="item.srange" :precision="0" :min="1" controls-position="right" @change="calculate(i)"></el-input-number>
          —
          <el-input-number style="width: 90px;" v-model="item.erange" :precision="0" :min="1" controls-position="right" @change="calculate(i)"></el-input-number>
          名，红包面额
          <!-- <el-input-number v-model="item.awardValue" :precision="2" :min="0" :max="500" controls-position="right" @change="calculate(item)"></el-input-number>
          元 -->
          <span v-if="!item.materialId">
            <el-button icon="el-icon-plus" @click="getPrizeList(3, i)" ></el-button>
            元
          </span>
          <span v-if="item.materialId">
            {{item.awardName}}
            <el-button type="text" @click="getPrizeList(3, i)">更换</el-button>  
          </span>
          <!-- <span class="ml20 mr20">总金额 {{item.money ? '' : (item.last - item.first + 1) * item.money)}} 元</span> -->
          <span class="ml20 mr20">
            总金额
            <el-input disabled :value="isNaN(totlaMoney[i]) ? '' : totlaMoney[i]" style="width: 80px"></el-input>
            元
          </span>
          <el-button type="danger" v-if="i !== 0" @click="del(i)">删除</el-button>
          <el-button type="primary" v-if="i === params.length - 1" @click="add">新增</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="排名以外：" prop="awardName">
      <!-- <el-checkbox class="mr20" v-model="type" :true-label="2" :false-label="1" @change="toggle">排名以外</el-checkbox> -->
      <!-- <div>排名以外</div> -->
      <div>
        可获得
        <span v-if="!outRange[0].materialId">
          <el-button icon="el-icon-plus" @click="getPrizeList(6)"></el-button>
          荷石币
        </span>
        <span v-if="outRange[0].materialId">
          {{outRange[0].awardValue}}
          荷石币
          <el-button type="text" @click="getPrizeList(6)">更换</el-button>  
        </span>
        <!-- <el-input-number v-model="form.score" :precision="0" :min="0" :max="1000" controls-position="right"></el-input-number> -->
      </div>
    </el-form-item>
    <el-dialog :title="titleName" :close-on-click-modal="false" :visible.sync="prizeListVisible" width="800px">
      <el-table class="mb20" ref="doubleCardTable" :data="dataList" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="50" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="checked(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['params', 'outRange'],
  data() {
    return {
      type: 1,
      index: null,
      prizeListVisible: false,
      dataList: [],
      totlaMoney: [],
      titleName: ''
    }
  },
  created () {
    if (this.params.length == 0) {
      this.params.push({
        awardName: null,
        awardType: 3,
        awardValue: null,
        rangeType: 1,
        srange: null,
        erange: null,
        materialId: null
      })
    }
    if (this.outRange.length == 0) {
      this.outRange.push({
        awardName: null,
        awardType: 6,
        awardValue: null,
        rangeType: 2,
        srange: null,
        erange: null,
        materialId: null
      })
    }
    this.calculate()
  },
  methods: {
    calculate(index) {
      if (index != undefined) {
        let total = ((this.params[index].erange - this.params[index].srange + 1) *  this.params[index].awardValue).toFixed(2)
        this.totlaMoney.splice(index, 1, total)
      } else {
        this.params.forEach(item => {
          let total = ((item.erange - item.srange + 1) * item.awardValue).toFixed(2)
          this.totlaMoney.push(total)
        })
      }
    },
    // toggle(val) {
    //   if (val == 2) {
    //     this.outRange.push({
    //       awardName: null,
    //       awardType: 6,
    //       awardValue: null,
    //       rangeType: 2,
    //       srange: null,
    //       erange: null,
    //       materialId: null
    //     })
    //   } else {
    //     this.outRange.splice(0, 1)
    //   }
    // },
    checkScore() {
      this.prizeListVisible = true
    },
    checked(row) {
      if (row.type == 3) {
        this.params[this.index].materialId = row.id
        this.params[this.index].awardName = row.name
        this.params[this.index].awardValue = row.value
        this.calculate(this.index)
      } else {
        this.outRange[0].materialId = row.id
        this.outRange[0].awardName = row.name
        this.outRange[0].awardValue = row.value
      }
      this.prizeListVisible = false
    },
    getPrizeList(type, index) {
      if(type === 3) {
        this.titleName = '选择红包'
      } else if (type === 6) {
        this.titleName = '选择荷石币'
      }
      let queryParams = {
        type: type,
        pageSize: -1
      }
      if (index != undefined) {
        this.index = index
      }
      this.prizeListVisible = true
      this.$request.post('/api/wiseqr/md/listMaterial', queryParams, true, res=> {
        if (res.ret === '200000') {
          this.dataList = res.data.list
          return
        }
        this.$message.error(res.message)
      })
    },
    add() {
      this.params.push({
        awardName: null,
        awardType: 3,
        awardValue: null,
        rangeType: 1,
        srange: null,
        erange: null,
        materialId: null
      })
    },
    del(index) {
      this.$confirm('是否删除该项规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.params.splice(index, 1)
        this.params.map((item, index) => {
          if (item.rangeType == 2) return this.index = index
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
    }
  }
}
</script>
