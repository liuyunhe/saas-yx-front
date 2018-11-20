<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动投放设置组件
  -->
  <div class="pond">
    <el-form ref="form" :model="pondConf" label-width="100px">
      <el-form-item label="N次必中:" v-if="nWin">
        用户第 <el-input-number v-model="pondConf.n" :min="0" controls-position="right"></el-input-number> 个抽奖必中
      </el-form-item>
      <el-form-item label="奖品类型:">
        <el-select v-model="pondConf.awardType" placeholder="请选择" @change="resetPrize">
          <el-option v-for="item in prizeList" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖品名称:">
        <el-col :span="10">
          <el-input v-model="pondConf.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-col>
      </el-form-item>
      <template v-if="pondConf.awardType == '1'">
        <el-form-item label="选择物品:">
          <!-- <el-button  @click="getEntityList">选择</el-button> -->
          <el-button v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic" @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number v-model="pondConf.totalNum" :min="0" controls-position="right"></el-input-number> 个
        </el-form-item>
      </template>
      <template v-if="pondConf.awardType == '2'">
        <el-form-item label="选择物品:">
          <!-- <el-button  @click="getVirtualList">选择</el-button> -->
          <el-button v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic" @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number v-model="pondConf.totalNum" :min="0" controls-position="right"></el-input-number> 个
        </el-form-item>
      </template>
      <template v-if="pondConf.awardType == '3'">
        <el-form-item label="红包池:">
          <!-- <el-button  @click="getRedpacklList">选择</el-button> -->
          <el-button v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic" @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <!-- <el-col :span="10"> -->
        <el-form-item label="红包面额:">
          <el-input-number v-model="pondConf.redMoney" :min="0" controls-position="right" @change="countRedTotal"></el-input-number> 元
        </el-form-item>
        <!-- </el-col>
        <el-col :span="14"> -->
        <el-form-item label="投放数量:">
          <el-input-number v-model="pondConf.totalNum" :min="0" controls-position="right" @change="countRedTotal"></el-input-number> 个
        </el-form-item>
        <!-- </el-col> -->
        <el-form-item label="红包金额:">
          <el-input-number disabled v-model="pondConf.redTotalMoney" :min="0" controls-position="right"></el-input-number> 元
        </el-form-item>
      </template>
      <template v-if="pondConf.awardType == '6'">
        <el-form-item label="选择积分:">
          <!-- <el-button  @click="getIntegrallList">选择</el-button> -->
          <el-button v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic" @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number v-model="pondConf.totalNum" :min="0" controls-position="right"></el-input-number> 个
        </el-form-item>
        <el-form-item label="积分面额:">
          <el-input-number v-model="pondConf.integral" :min="0" controls-position="right"></el-input-number> 分
        </el-form-item>
      </template>
      <el-form-item label="中奖概率:">
        <el-input-number v-model="pondConf.probability" :min="0" :max="100" controls-position="right"></el-input-number> %
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.isWarn" @change="resetWarn">阈值预警</el-checkbox>
        <span v-if="pondConf.isWarn">
          <el-input-number v-model="pondConf.warnValue" :min="0" controls-position="right"></el-input-number> 个
        </span>
      </el-form-item>
      <el-form-item v-if="pondConf.awardType !== '6'">
        <el-checkbox v-model="pondConf.isGiveScore" @change="resetScore">同时送积分</el-checkbox>
        <span v-if="pondConf.isGiveScore">
          <el-button class="ml20 mr20" v-if="!pondConf.integralPool" @click="giveIntegral">选择</el-button>
          <el-button size="mini" type="info" v-else @click="giveIntegral">已选择</el-button>
          <el-input-number v-model="pondConf.integral" :min="0" controls-position="right"></el-input-number> 积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.isGuideGzh" @change="isGuideGzh">中奖后引导关注公众号</el-checkbox>
        <el-checkbox v-model="pondConf.hasPdMaxOut" @change="resetPdMaxOut">每天出奖总次数限制</el-checkbox>
        <span v-if="pondConf.hasPdMaxOut">
          <el-input-number v-model="pondConf.pdMaxOut" :min="0" controls-position="right"></el-input-number> 次
        </span>
      </el-form-item>
    </el-form>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px">
      <el-table :data="list" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="剩余库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectPrize(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
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
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="pondConf.integralPool !== scope.row.id" @click="selectIntegral(scope.row)">选择</el-button>
            <el-button size="mini" type="info" v-else @click="selectIntegral(scope.row)">已选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="integralTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['awae', 'prizeType', 'nWin'],
  data() {
    var validateImgUrl = (rule, value, callback) => {
      if (this.pondConf.awardPic) {
        callback()
      } else {
        callback(new Error('请选择奖品'))
      }
    }
    return {
      pondConf: this.awae,
      prizeList: this.prizeType,

      title: '选择物品',
      list: [],
      params: {
        metraFlag: '',
        pageNo: 1,
        pageSize: 10,
        status: 1
      },
      listTotal: 0,
      listVisible: false,

      integralList: [],
      integralTotal: 0,
      integralVisible: false,

    }
  },
  created() {},
  methods: {
    // 选择奖品
    selectPrize(obj) {
      this.pondConf.awardPic = obj.pic
      this.pondConf.poolName = obj.name
      this.pondConf.poolId = obj.id
      this.listVisible = false
    },
    // 重置奖品
    resetPrize() {
      this.pondConf.awardPic = ''
      this.pondConf.prizeName = ''
      this.pondConf.poolName = ''
      this.pondConf.totalNum = ''
      this.pondConf.probability = ''
      this.pondConf.redMoney = ''
      this.pondConf.redTotalMoney = ''
      this.pondConf.integral = ''
    },
    getList() {
      if (this.pondConf.awardType == '1') {
        this.params.metraFlag = 'object'
        this.title = '选择实物'
      } else if (this.pondConf.awardType == '2') {
        this.params.metraFlag = 'virtual'
        this.title = '选择虚拟'
      } else if (this.pondConf.awardType == '3') {
        this.params.metraFlag = 'redpack'
        this.title = '选择红包'
      } else if (this.pondConf.awardType == '6') {
        this.params.metraFlag = 'integral'
        this.title = '选择积分'
      }
      this.$request.post('/api/saotx/metra/list', this.params, true, res => {
        if (res.ret === '200000') {
          this.list = []
          this.list = res.data.list
          this.listTotal = res.data.page.count
          this.listVisible = true
          return
        }
        this.$message.error(res.message)
      })
    },
    // 同时送积分
    giveIntegral() {
      this.$request.post(
        '/api/saotx/metra/list',
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
    },
    // 选择积分
    selectIntegral(obj) {
      this.pondConf.integralPool = obj.id
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
        this.pondConf.integralPool = null
        this.pondConf.integral = ''
        this.pondConf.giveScore = 0
      } else {
        this.pondConf.giveScore = 1
      }
    },
    // 重置阈值预警
    resetWarn(val) {
      if (!val) {
        this.pondConf.isWarn = null
        this.pondConf.warnValue = ''
      }
    },
    resetPdMaxOut(val) {
      if (!val) {
        this.pondConf.pdMaxOut = ''
      }
    },
    countRedTotal(val) {
      const redMoney = this.pondConf.redMoney
      const totalNum = this.pondConf.totalNum
      if (redMoney != 0 && totalNum != 0) return this.pondConf.redTotalMoney = redMoney * totalNum
    },
    // 是否引导关注公众号
    isGuideGzh(val) {
      if (val) {
        this.pondConf.guideGzh = 1
      } else {
        this.pondConf.guideGzh = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
// .el-form-item {
//   margin-bottom: 10px;
// }
img {
  width: 120px;
  height: 90px;
}
</style>
