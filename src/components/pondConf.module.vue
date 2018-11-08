<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动投放设置组件
  -->
  <div class="pond">
    <el-form ref="form" :model="pondConf" label-width="100px">
      <el-form-item label="N次必中:" v-if="nWin">
        用户第 <el-input-number  v-model="pondConf.n" :min="0" controls-position="right"></el-input-number> 个抽奖必中
      </el-form-item>
      <el-form-item label="奖品类型:">
        <el-select  v-model="pondConf.awardType" placeholder="请选择" @change="resetPrize">
          <el-option v-for="item in prizeList" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖品名称:">
        <el-col :span="10">
          <el-input  v-model="pondConf.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-col>
      </el-form-item>
      <template v-if="pondConf.awardType == '1'">
        <el-form-item label="选择物品:">
          <!-- <el-button  @click="getEntityList">选择</el-button> -->
          <el-button  v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic"  @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number  v-model="pondConf.totalNum" :min="0" controls-position="right"></el-input-number> 个
        </el-form-item>
      </template>
      <template v-if="pondConf.awardType == '2'">
        <el-form-item label="选择物品:">
          <!-- <el-button  @click="getVirtualList">选择</el-button> -->
          <el-button  v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic"  @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number  v-model="pondConf.totalNum" :min="0" controls-position="right"></el-input-number> 个
        </el-form-item>
      </template>
      <template v-if="pondConf.awardType == '3'">
        <el-form-item label="红包池:">
          <!-- <el-button  @click="getRedpacklList">选择</el-button> -->
          <el-button  v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic"  @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-col :span="10">
          <el-form-item label="红包面额:">
            <el-input-number  v-model="pondConf.redMoney" :min="0" controls-position="right"></el-input-number> 元
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="投放数量:">
            <el-input-number  v-model="pondConf.totalNum" :min="0" controls-position="right"></el-input-number> 个
          </el-form-item>
        </el-col>
        <el-form-item label="红包金额:">
          <el-input-number  disabled v-model="pondConf.redTotalMoney" :min="0" controls-position="right"></el-input-number> 元
        </el-form-item>
      </template>
      <template v-if="pondConf.awardType == '6'">
        <el-form-item label="选择积分:">
          <!-- <el-button  @click="getIntegrallList">选择</el-button> -->
          <el-button  v-if="!pondConf.awardPic" @click="getList">选择</el-button>
          <img v-if="pondConf.awardPic" :src="pondConf.awardPic"  @click="getList">
          <span>{{pondConf.poolName}}</span>
        </el-form-item>
        <el-form-item label="投放数量:">
          <el-input-number  v-model="pondConf.remainNum" :min="0" controls-position="right"></el-input-number> 个
        </el-form-item>
        <el-form-item label="积分面额:">
          <el-input-number  v-model="pondConf.remainNum" :min="0" controls-position="right"></el-input-number> 分
        </el-form-item>
      </template>
      <el-form-item label="中奖概率:">
        <el-input-number  v-model="pondConf.probability" :min="0" :max="100" controls-position="right"></el-input-number> %
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.isWarn">阈值预警</el-checkbox>
        <span v-if="pondConf.isWarn">
          <el-input-number  v-model="pondConf.warnValue" :min="0" controls-position="right"></el-input-number> 个
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.isGiveScore">同时送积分</el-checkbox>
        <span v-if="pondConf.isGiveScore">
          <el-button  class="ml20 mr20" v-if="!pondConf.integralPool" @click="giveIntegral">选择</el-button>
          <el-button size="mini" type="info" v-if="pondConf.integralPool" @click="giveIntegral">已选择</el-button>
          <el-input-number  v-model="pondConf.integral" :min="0" controls-position="right"></el-input-number> 积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.guideGzh">中奖后引导关注公众号</el-checkbox>
        <el-checkbox v-model="pondConf.hasPdMaxOut">每天出奖总次数限制</el-checkbox>
        <span v-if="pondConf.hasPdMaxOut">
          <el-input-number  v-model="pondConf.pdMaxOut" :min="0" controls-position="right"></el-input-number> 次
        </span>
      </el-form-item>
    </el-form>
    <!-- 实物弹窗 -->
    <!-- <el-dialog title="选择实物" :visible.sync="entityVisible" width="800px">
      <el-table :data="entityList" border :stripe="true" style="width: 100%">
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
            <el-button size="mini">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="entitySizeChange" @current-change="entityCurrentChange" :current-page="entityParams.pageNo" layout="total, prev, pager, next, jumper" :total="entityTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog> -->

    <!-- 虚拟弹窗 -->
    <!-- <el-dialog title="选择虚拟" :visible.sync="virtualVisible" width="800px">
      <el-table :data="virtualList" border :stripe="true" style="width: 100%">
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
            <el-button size="mini">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="virtualSizeChange" @current-change="virtualCurrentChange" :current-page="virtualParams.pageNo" layout="total, prev, pager, next, jumper" :total="virtualTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog> -->

    <!-- 红包弹窗 -->
    <!-- <el-dialog title="选择虚拟" :visible.sync="redpackVisible" width="800px">
      <el-table :data="redpackList" border :stripe="true" style="width: 100%">
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
            <el-button size="mini">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="redpackSizeChange" @current-change="redpackCurrentChange" :current-page="redpackParams.pageNo" layout="total, prev, pager, next, jumper" :total="redpackTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog> -->

    <!-- 积分弹窗 -->
    <!-- <el-dialog title="选择虚拟" :visible.sync="integralVisible" width="800px">
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
            <el-button size="mini">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="integralSizeChange" @current-change="integralCurrentChange" :current-page="integralParams.pageNo" layout="total, prev, pager, next, jumper" :total="integralTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog> -->

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
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo"  :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
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
            <el-button size="mini" v-if="pondConf.integralPool" @click="selectIntegral(scope.row)">选择</el-button>
            <el-button size="mini" type="info" v-if="!pondConf.integralPool" @click="selectIntegral(scope.row)">已选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo"  :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="integralTotal">
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
      pondRules: {
        // nNum: [{required: true, message: '请输入多少次必中', trigger: 'blur'}],
        // type: [{required: true, message: '请选择奖品类型', trigger: 'blur'}],
        // name: [{required: true, message: '请输入奖品名称', trigger: 'blur'}],
        // prize: [{required: true, validator: validateImgUrl}],
        // putNum: [{required: true, message: '请选择投放数量', trigger: 'blur'}],
        // probability: [{required: true, message: '请选择中奖概率', trigger: 'blur'}],
        // redMoney: [{required: true, message: '请选择红包面额', trigger: 'blur'}],
        // remainNum: [{required: true, message: '请选择积分面额', trigger: 'blur'}]
      },
      // entityVisible: false,
      // entityList: [],
      // entityParams: {
      //   metraFlag: 'object',
      //   pageNo: 1,
      //   pageSize: 10,
      //   status: 1
      // },
      // entityTotal: 0,
      
      // virtualVisible: false,
      // virtualList: [],
      // virtualParams: {
      //   metraFlag: 'virtual',
      //   pageNo: 1,
      //   pageSize: 10,
      //   status: 1
      // },
      // virtualTotal: 0,

      // redpackVisible: false,
      // redpackList: [],
      // redpackParams: {
      //   metraFlag: 'redpack',
      //   pageNo: 1,
      //   pageSize: 10,
      //   status: 1
      // },
      // redpackTotal: 0,

      // integralVisible: false,
      // integralList: [],
      // integralParams: {
      //   metraFlag: 'integral',
      //   pageNo: 1,
      //   pageSize: 10,
      //   status: 1
      // },
      // integralTotal: 0,


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
      this.pondConf.poolName = ''
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
          this.listTotal= res.data.page.count
          this.listVisible = true
          return
        }
        this.$message.error(res.message)
      })
    },
    // 同时送积分
    giveIntegral() {
      this.$request.post('/api/saotx/metra/list', {
        metraFlag: 'integral',
        pageNo: 1,
        pageSize: 10,
        status: 1
      }, true, res => {
        if (res.ret === '200000') {
          this.list = []
          this.integralList = res.data.list
          this.integralTotal= res.data.page.count
          this.integralVisible = true
          return
        }
        this.$message.error(res.message)
      })
    },
    // 选择积分
    selectIntegral(obj) {
      this.pondConf.integralPool = obj.id
    },
    handSizeChange(newSize) {
      this.params.pageSize = newSize
      this.getList()
    },
    handCurrentChange(newSize) {
      this.params.pageNo = newSize
      this.getList()
    },



    //   // 实物
    // getEntityList() {
    //   this.$request.post('/api/saotx/metra/list', this.entityParams, true, res => {
    //     if (res.ret === '200000') {
    //       this.entityList = res.data.list
    //       this.entityTotal = res.data.page.count
    //       this.entityVisible = true
    //       return
    //     }
    //     this.$message.error(res.message)
    //   })
    // },
    // // 实物
    // entitySizeChange(newSize) {
    //   this.entityParams.pageSize = newSize
    //   this.getEntityList()
    // },
    // // 实物
    // entityCurrentChange(newSize) {
    //   this.entityParams.pageNo = newSize
    //   this.getEntityList()
    // },

    // // 虚拟
    // getVirtualList() {
    //   this.$request.post('/api/saotx/metra/list', this.virtualParams, true, res => {
    //     if (res.ret === '200000') {
    //       this.virtualList = res.data.list
    //       this.virtualTotal = res.data.page.count
    //       this.virtualVisible = true
    //       return
    //     }
    //     this.$message.error(res.message)
    //   })
    // },
    //  // 虚拟
    // virtualSizeChange(newSize) {
    //   this.virtualParams.pageSize = newSize
    //   this.getVirtualList()
    // },
    // // 虚拟
    // virtualCurrentChange(newSize) {
    //   this.virtualParams.pageNo = newSize
    //   this.getVirtualList()
    // },

    // // 红包
    // getRedpacklList() {
    //   this.$request.post('/api/saotx/metra/list', this.redpackParams, true, res => {
    //     if (res.ret === '200000') {
    //       this.redpackList = res.data.list
    //       this.redpackTotal= res.data.page.count
    //       this.redpackVisible = true
    //       return
    //     }
    //     this.$message.error(res.message)
    //   })
    // },
    //  // 红包
    // redpackSizeChange(newSize) {
    //   this.redpackParams.pageSize = newSize
    //   this.getRedpacklList()
    // },
    // // 红包
    // redpackCurrentChange(newSize) {
    //   this.redpackParams.pageNo = newSize
    //   this.getRedpacklList()
    // },

    // // 积分
    // getIntegrallList() {
    //   this.$request.post('/api/saotx/metra/list', this.integralParams, true, res => {
    //     if (res.ret === '200000') {
    //       this.integralList = res.data.list
    //       this.integralTotal= res.data.page.count
    //       this.integralVisible = true
    //       return
    //     }
    //     this.$message.error(res.message)
    //   })
    // },
    //  // 积分
    // integralSizeChange(newSize) {
    //   this.integralParams.pageSize = newSize
    //   this.getIntegrallList()
    // },
    // // 积分
    // integralCurrentChange(newSize) {
    //   this.integralParams.pageNo = newSize
    //   this.getIntegrallList()
    // },
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
