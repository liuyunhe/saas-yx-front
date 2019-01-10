<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动投放设置组件
  -->
  <div class="pond">
    <el-form ref="form" :model="awae" label-width="100px">
      <el-form-item label="N次必中:" v-if="nWin">
        用户第 <el-input-number v-model="awae.n" :min="0" controls-position="right"></el-input-number> 个抽奖必中
      </el-form-item>
      <el-form-item label="奖品类型:">
        <el-select v-model="awae.awardType" :disabled="awae.id ? true : false" placeholder="请选择" @change="resetPrize">
          <el-option v-for="item in prizeList" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖品名称:">
        <el-col :span="10">
          <el-input v-model="awae.prizeName" :disabled="awae.id ? true : false" placeholder="请输入奖品名称"></el-input>
        </el-col>
      </el-form-item>
      <template v-if="awae.awardType == '1'">
        <el-form-item label="选择物品:">
          <!-- <el-button  @click="getEntityList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img style="border: 1px dotted #ccc" v-if="awae.awardPic" :src="awae.awardPic" @click="isEdit && getList">
          <span>{{awae.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '2'">
        <el-form-item label="选择物品:">
          <!-- <el-button  @click="getVirtualList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="awae.id ? true : false && getList">
          <span>{{awae.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '3'">
        <el-form-item label="红包池:">
          <!-- <el-button  @click="getRedpacklList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="awae.id ? true : false && getList">
          <span>{{awae.poolName}}</span>
        </el-form-item>
        <!-- <el-col :span="10"> -->
        <el-form-item label="红包面额:">
          <el-input-number v-model="awae.redMoney" :disabled="awae.id ? true : false" :precision="2" :min="0" controls-position="right" @change="countRedTotal"></el-input-number> 元
        </el-form-item>
        <!-- </el-col>
        <el-col :span="14"> -->
        <el-form-item label="投放数量:">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right" @change="countRedTotal"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
        <!-- </el-col> -->
        <el-form-item label="红包金额:">
          <el-input-number disabled v-model="totalRed" :min="0" controls-position="right"></el-input-number> 元
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '6'">
        <el-form-item label="选择积分:">
          <!-- <el-button  @click="getIntegrallList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="awae.id ? true : false && getList">
          <span>{{awae.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
        <el-form-item label="积分面额:">
          <el-input-number v-model="awae.integral" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 分
        </el-form-item>
      </template>
      <el-form-item label="中奖概率:">
        <el-input-number v-model="awae.probability" :min="0" :max="100" controls-position="right"></el-input-number> %
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="awae.hasWarn" @change="resetWarn">阈值预警</el-checkbox>
        <span v-if="awae.hasWarn">
          <el-input-number v-model="awae.warnValue" :min="0" controls-position="right"></el-input-number> 个
        </span>
      </el-form-item>
      <el-form-item v-if="awae.awardType !== '6'">
        <el-checkbox v-model="awae.giveScore" :checked="awae.giveScore == 1 ? true : false" :true-label=1 :false-label=0 @change="resetScore">同时送积分</el-checkbox>
        <span v-if="awae.giveScore">
          <el-button class="ml20 mr20" v-if="!awae.integralPool" @click="giveIntegral">选择</el-button>
          <el-button size="mini" type="info" v-else @click="giveIntegral">已选择</el-button>
          <el-input-number v-model="awae.integral" :min="0" controls-position="right"></el-input-number> 积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="awae.guideGzh" :checked="awae.guideGzh == 1 ? true : false" :true-label=1 :false-label=0>中奖后引导关注公众号</el-checkbox>
        <el-checkbox v-model="awae.hasPdMaxOut" @change="resetPdMaxOut">每天出奖总次数限制</el-checkbox>
        <span v-if="awae.hasPdMaxOut">
          <el-input-number v-model="awae.pdMaxOut" :min="0" controls-position="right"></el-input-number> 次
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
            <el-button size="mini" v-if="awae.integralPool !== scope.row.id" @click="selectIntegral(scope.row)">选择</el-button>
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
      if (this.awae.awardPic) {
        callback()
      } else {
        callback(new Error('请选择奖品'))
      }
    }
    return {
      // awae: this.awae,
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
  created() {
    // if (this.awae.id) {
    //   this.isEdit = true
    // } else {
    //   this.isEdit = false
    // }
  },
  methods: {
    // 选择奖品
    selectPrize(obj) {
      this.awae.awardPic = obj.pic
      this.awae.poolName = obj.name
      this.awae.poolId = obj.id
      this.listVisible = false
    },
    // 重置奖品
    resetPrize() {
      this.awae.awardPic = ''
      this.awae.prizeName = ''
      this.awae.poolName = ''
      this.awae.totalNum = ''
      this.awae.probability = ''
      this.awae.redMoney = ''
      this.awae.redTotalMoney = ''
      this.awae.integral = ''
    },
    getList() {
      if (this.awae.awardType == '1') {
        this.params.metraFlag = 'object'
        this.title = '选择实物'
      } else if (this.awae.awardType == '2') {
        this.params.metraFlag = 'virtual'
        this.title = '选择虚拟'
      } else if (this.awae.awardType == '3') {
        this.params.metraFlag = 'redpack'
        this.title = '选择红包'
      } else if (this.awae.awardType == '6') {
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
      this.awae.integralPool = obj.id
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
    // 重置阈值预警
    resetWarn(val) {
      if (!val) {
        this.awae.hasWarn = null
        this.awae.warnValue = ''
      }
    },
    resetPdMaxOut(val) {
      if (!val) {
        this.awae.pdMaxOut = ''
      }
    },
    countRedTotal(val) {
      const redMoney = this.awae.redMoney
      const totalNum = this.awae.totalNum
      if (redMoney != 0 && totalNum != 0) return this.awae.redTotalMoney = redMoney * totalNum
    },
    // 增库
    addRepertory() {
      this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          if (value == 0) return this.$message.error('数字不能为0')
          this.$request.post('/api/saotx/act/addNum', {
            id: this.awae.id,
            increment: value
          }, true, res => {
            if (res.ret === '200000') {
              this.$message.success('增库成功')
              this.awae.totalNum += Number(value)
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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
