<template>
  <!--
  Author: chenxin
  Create Date: 2019-01-18
  Description: 红包雨活动投放设置组件
  -->
  <div class="pond">
    <el-form ref="form" :model="awae" label-width="100px" :rules="rules">
      <el-form-item label="奖品类型:" prop="type">
        <el-select v-model="awae.awardType" :disabled="isDisable ? true : false" placeholder="请选择" @change="resetPrize">
          <el-option v-for="item in prizeList" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="奖品名称:" prop="name">
        <el-col :span="10">
          <el-input v-model="awae.prizeName" :disabled="isDisable ? true : false" placeholder="奖品名称"></el-input>
        </el-col>
      </el-form-item> -->
      <template>
        <el-form-item :label="typeObj.checkName[awae.awardType]" prop="pool">
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" class="prize-img" :src="awae.awardPic" :style="isDisable ? '' : imgStyle" :title="isDisable ? '' : '点击更换'" @click="!isDisable && getList()">
        </el-form-item>
        <el-form-item label="奖品名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName" :disabled="true" placeholder="奖品名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="红包面额:" v-if="awae.awardType == 3" prop="redNum">
          <el-input-number v-model="awae.redMoney" :disabled="isDisable ? true : false" :precision="2" :min="0" :max="astrict ? 0.3 : Infinity" :step="0.1" controls-position="right" @change="countRedTotal"></el-input-number> 元
          <span class="ml20" style="color: #ccc; font-size: 12px" v-if="astrict">开放试用平台，仅支持0.3元红包面额</span>
        </el-form-item>
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :precision="0" :disabled="isDisable ? true : false" :min="0" controls-position="right" @change="countRedTotal"></el-input-number> 个
          <span v-if="isDisable ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
          </span>
        </el-form-item>
        <el-form-item label="红包金额:" v-if="awae.awardType == 3" prop="redTotal">
          <el-input-number disabled v-model="totalRed" :min="0" controls-position="right"></el-input-number> 元
        </el-form-item>
        <el-form-item v-if="awae.awardType == 6" label="积分面额:" prop="intTotal">
          <el-input-number v-model="awae.integral" :disabled="isDisable ? true : false" :min="0" :precision="0" controls-position="right"></el-input-number> 分
        </el-form-item>
      </template>
      <el-form-item v-if="awae.awardType !== 6">
        <el-checkbox v-model="awae.giveScore" :checked="awae.giveScore == 1 ? true : false" :true-label=1 :false-label=0 @change="resetScore">同时送积分</el-checkbox>
        <span v-if="awae.giveScore">
          <el-button class="ml20 mr20" v-if="!awae.integralPool" @click="giveIntegral">选择</el-button>
          <el-button class="ml20 mr20" type="info" v-else @click="giveIntegral">已选择</el-button>
          <el-input-number v-model="awae.integral" :precision="0" :min="0" controls-position="right"></el-input-number> 积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="awae.guideGzh" :checked="awae.guideGzh == 1 ? true : false" :true-label=1 :false-label=0>中奖后引导关注公众号</el-checkbox>
      </el-form-item>
    </el-form>

    <!-- 通用 -->
    <el-dialog :title="typeObj.titleObj[awae.awardType]" :visible.sync="listVisible" width="800px">
      <el-table :data="list" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img class="list-img" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column  prop="stock" label="剩余库存" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.budget_value">
              {{ scope.row.budget_value - scope.row.budget_used}}
            </span>
            <span v-else>
              {{ scope.row.stock }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectPrize(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" v-if="listTotal > 1">
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>

    <!-- 送积分 -->
    <el-dialog title="选择积分" :visible.sync="integralVisible" width="800px">
      <el-table :data="integralList" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="剩余库存" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.budget_value">
              {{ scope.row.budget_value - scope.row.budget_used}}
            </span>
            <span v-else>
              {{ scope.row.stock }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="awae.integralPool !== scope.row.id" @click="selectIntegral(scope.row)">选择</el-button>
            <el-button type="info" v-else @click="selectIntegral(scope.row)">已选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" v-if="integralTotal > 1">
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="integralTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['awae', 'prizeType', 'isDisable', 'astrict','saleZone','budgetTime'],
  data() {
    var validateImgUrl = (rule, value, callback) => {
      if (this.awae.awardPic) {
        callback()
      } else {
        callback(new Error('请选择奖品'))
      }
    }
    var tips = (rule, value, callback) => {
      // callback()
    }
    return {
      // awae: this.awae,
      prizeList: this.prizeType,
      // isDisable: false,
      rules: {
        n: [{required: true, validator: tips}],
        type: [{required: true, validator: tips}],
        name: [{required: true, validator: tips}],
        probability: [{required: true, validator: tips}],
        redNum: [{required: true, validator: tips}],
        pool: [{required: true, validator: tips}],
        putNum: [{required: true, validator: tips}],
        intTotal: [{required: true, validator: tips}],
        redTotal: [{required: true, validator: tips}],
        // pool: [{required: true, validator: tips}],
      },
      typeObj: {
        checkName: {
          1: '选择物品:',
          2: '选择物品:',
          3: '红包池:：',
          6: '选择积分:'
        },
        titleObj: {
          1: '选择实物',
          2: '选择虚拟',
          3: '选择红包',
          6: '选择积分'
        },
        metraObj: {
          1: 'object',
          2: 'virtual',
          3: 'redpack',
          6: 'integral'
        }
      },
      list: [],
      params: {
        metraFlag: 'object',
        materialType: '',
        pageNo: 1,
        pageSize: 10,
        status: 1,
        saleZoneCode:null,
        budgetTime: null,
      },
      listTotal: 0,
      listVisible: false,

      integralList: [],
      integralTotal: 0,
      integralVisible: false,
      // nowTime: this.time.sysTime,
      imgStyle: { cursor: 'pointer' }
    }
  },
  computed: {
    residue: {
      get: function() {
        return this.awae.totalNum - this.awae.outNum
      },
      set: function(newValue) {
        // console.log(newValue)
      }
    },
    totalRed: {
      get: function() {
        return this.awae.redMoney * this.awae.totalNum
      },
      set: function(newValue) {
        // console.log(newValue)
      }
    }
  },
  watch:{     //监听value的变化，进行相应的操作即可
    saleZone(a,b){     //a是value的新值，b是旧值
      console.log(a,b)
      this.saleZone = a;
      this.params.saleZoneCode = a
    },
    budgetTime(a,b){     //a是value的新值，b是旧值
      console.log(a,b)
      this.budgetTime = a;
      this.params.budgetTime = a
    }
  },
  created() {
    // if (this.awae.id) {
    //   this.isEdit = true
    // } else {
    //   this.isEdit = false
    // }
    // this.handleIsDisable()
    this.params.saleZoneCode = this.saleZone
    this.params.budgetTime = this.budgetTime
    console.log(this.astrict)
  },
  methods: {
    // 选择奖品
    selectPrize(obj) {
      this.awae.awardPic = obj.pic
      this.awae.poolName = obj.name
      this.awae.prizeName = obj.name
      this.awae.poolId = obj.id
      if(this.saleZone){
        this.awae.budgetId = obj.id
        this.awae.poolId = obj.material_pool_id
      }
      this.listVisible = false
    },
    // 重置奖品
    resetPrize(val) {
      this.awae.awardPic = ''
      this.awae.prizeName = ''
      this.awae.poolName = ''
      this.awae.totalNum = ''
      this.awae.probability = ''
      this.awae.redMoney = ''
      this.awae.redTotalMoney = ''
      this.awae.integral = ''
      this.awae.budgetId = ''
      this.awae.integralBudgetId = ''
      this.params.metraFlag = this.typeObj.metraObj[val]
    },
    handleIsDisable() {
      if (!this.awae.id) return
      let stime = new Date(this.time.stimeStr).getTime()
      if (stime - this.nowTime < 900000) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
    },
    getList() {
      if (this.awae.awardType == '1') {
        this.params.materialType = '1'
        this.params.metraFlag = 'object'
      } else if (this.awae.awardType == '2') {
        this.params.metraFlag = 'virtual'
        this.params.materialType = '2'
      } else if (this.awae.awardType == '3') {
        this.params.metraFlag = 'redpack'
        this.params.materialType = '3'
      } else if (this.awae.awardType == '6') {
        this.params.metraFlag = 'integral'
        this.params.materialType = '6'
      }
      console.log(this.params.saleZoneCode)
      let url = "/api/materialBudget/materialList"
      if(!this.params.saleZoneCode){
        url = "/api/wiseqr/metra/list"
      }
      this.$request.post(url, this.params, true, res => {
        if ((res.code && res.code == '200')||(res.ret && res.ret == '200000')) {
          this.list = []
          this.list = res.data.list
          this.listTotal = res.data.page.count
          this.listVisible = true
          return
        }
        this.$message.error(res.message || res.msg)
      })
    },
    // 同时送积分
    giveIntegral() {
      console.log(this.saleZone)
      if(this.saleZone){
        this.$request.post(
          '/api/materialBudget/materialList',
          {
            metraFlag: 'integral',
            materialType: '6',
            budgetTime: this.budgetTime,
            saleZoneCode: this.saleZone,
            pageNo: 1,
            pageSize: 10,
            status: 1
          },
          true,
          res => {
            if (res.code == '200') {
              this.list = []
              this.integralList = res.data.list
              this.integralTotal = res.data.page.count
              this.integralVisible = true
              return
            }
            this.$message.error(res.msg)
          }
        )
      }else {
        this.$request.post('/api/wiseqr/metra/list',
          {
            metraFlag: 'integral',
            pageNo: 1,
            pageSize: 10,
            status: 1
          },
          true,
          res => {
            if (res.ret === '200000') {
              this.list = []
              this.integralList = res.data.list
              this.integralTotal = res.data.page.count
              this.integralVisible = true
              return
            }
            this.$message.error(res.message)
          }
        )
      }
    },
    // 选择积分
    selectIntegral(obj) {
      if(this.saleZone){
        this.awae.integralBudgetId = obj.id
        this.awae.integralPool = obj.material_pool_id
      }else {
        this.awae.integralPool = obj.id
      }
      this.integralVisible = false
    },
    handSizeChange(newSize) {
      this.params.pageSize = newSize
      this.getList()
    },
    handCurrentChange(newSize) {
      this.params.pageNo = newSize
      this.getList()
    },
    // 重置积分
    resetScore(val) {
      if (!val) {
        this.awae.integralPool = null
        this.awae.integral = ''
        this.awae.giveScore = 0
      } else {
        this.awae.giveScore = 1
      }
    },
    countRedTotal(val) {
      const redMoney = this.awae.redMoney
      const totalNum = this.awae.totalNum
      if (redMoney != 0 && totalNum != 0) return this.awae.redTotalMoney = redMoney * totalNum
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
.el-input {
  width: 210px;
}
.prize-img {
  width: 100px;
  height: 100px;
}
.list-img {
  max-height: 40px;
}
</style>
