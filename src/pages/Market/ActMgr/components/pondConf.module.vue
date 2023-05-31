<template>
  <!--
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动投放设置组件
  -->
  <div class="pond">
    <el-form ref="form" :model="awae" label-width="100px" :rules="rules">
      <el-form-item label="N次必中:" v-if="nWin" prop="n">
        用户第 <el-input-number v-model="awae.n" :min="0" controls-position="right" @input="handleChangeN(awae.n)"></el-input-number> 个抽奖必中
      </el-form-item>
      <el-form-item label="奖品类型:" prop="type">
        <el-select v-model="awae.awardType" :disabled="awae.id ? true : false" placeholder="请选择" @change="resetPrize">
          <el-option v-for="item in prizeList" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="奖品名称:" prop="name">
        <el-col :span="10">
          <el-input v-model="awae.prizeName" :disabled="awae.id ? true : false" placeholder="请输入奖品名称"></el-input>
        </el-col>
      </el-form-item> -->
      <template v-if="awae.awardType == '1'">
        <el-form-item label="选择物品:" prop="pool">
          <!-- <el-button  @click="getEntityList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img style="border: 1px dotted #ccc" v-if="awae.awardPic" :src="awae.awardPic" @click="!awae.id && getList()">
        </el-form-item>
        <el-form-item label="物料名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName" :disabled="true" placeholder="奖品名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '2'">
        <el-form-item label="选择物品:" prop="pool">
          <!-- <el-button  @click="getVirtualList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="!awae.id && getList()">
        </el-form-item>
        <el-form-item label="物料名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName" :disabled="true" placeholder="奖品名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '3'">
        <el-form-item label="红包池:" prop="pool">
          <!-- <el-button  @click="getRedpacklList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="!awae.id && getList()">
        </el-form-item>
        <el-form-item label="物料名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName" :disabled="true" placeholder="奖品名称"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-col :span="10"> -->
        <el-form-item label="红包面额:" prop="redNum">
          <el-input-number v-model="awae.redMoney" :disabled="awae.id ? true : false" :precision="2" :min="0" :max="astrict ? 0.3 : Infinity" :step="0.1" controls-position="right" @change="countRedTotal"></el-input-number> 元
          <span class="ml20" style="color: #ccc; font-size: 12px" v-if="astrict">开放试用平台，仅支持0.3元红包面额</span>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="14"> -->
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :disabled="awae.id ? true : false" :min="0" controls-position="right" @change="countRedTotal"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
        <!-- </el-col> -->
        <el-form-item label="红包金额:" prop="redTotal">
          <el-input-number disabled v-model="totalRed" :min="0" controls-position="right"></el-input-number> 元
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '6'">
        <el-form-item label="选择积分:" prop="pool">
          <!-- <el-button  @click="getIntegrallList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="!awae.id && getList()">
        </el-form-item>
        <el-form-item label="物料名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName" :disabled="true" placeholder="奖品名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :precision="0" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
        <el-form-item label="积分面额:" prop="intTotal">
          <el-input-number v-model="awae.integral" :disabled="awae.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number> 分
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '7'">
        <el-form-item label="选择折扣卡:" prop="pool">
          <!-- <el-button  @click="getIntegrallList">选择</el-button> -->
          <el-button v-if="!awae.awardPic" @click="getList">选择</el-button>
          <img v-if="awae.awardPic" :src="awae.awardPic" @click="!awae.id && getList()">
        </el-form-item>
        <el-form-item label="物料名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName" :disabled="true" placeholder="奖品名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :precision="0" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
        <el-form-item label="折扣值:" prop="awardPrice">
          <el-input-number v-model="awae.awardPrice" :disabled="awae.id ? true : false" :precision="2" :min="0" :max="1" controls-position="right"></el-input-number>
        </el-form-item>
      </template>
      <template v-if="awae.awardType == '9'">
        <el-form-item label="奖品图片:" prop="pool">
          <el-input v-model="awae.awardPic" style="display: none" ></el-input>
          <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :on-success="(res)=>{uploadImgUrlSuccess(res,'2')}" :show-file-list="false">
            <img v-if="awae.awardPic" :src="awae.awardPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span>* 图片建议尺寸为380*280px，格式为*.jpg\ *.bmp\ *.png\ *.gif</span>
        </el-form-item>
        <el-form-item label="奖品名称:" prop="name">
          <el-col :span="10">
            <el-input v-model="awae.prizeName"  placeholder="奖品名称" :disabled="awae.id ? true : false"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="投放数量:" prop="putNum">
          <el-input-number v-model="awae.totalNum" :precision="0" :disabled="awae.id ? true : false" :min="0" controls-position="right"></el-input-number> 个
          <span v-if="awae.id ? true : false">
            剩余<el-input-number v-model="residue" :disabled="true"></el-input-number>个
            <el-button @click="addRepertory">增库</el-button>
          </span>
        </el-form-item>
        <el-form-item label="奖品面额:" prop="intTotal">
          <el-input-number v-model="awae.integral" :disabled="awae.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number> 分
        </el-form-item>
      </template>
      <el-form-item v-if="!hide" label="中奖概率:" prop="probability">
        <el-input-number v-model="awae.probability" :min="0" :max="100" controls-position="right"></el-input-number> %
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="awae.hasWarn" @change="resetWarn">阈值预警</el-checkbox>
        <span v-if="awae.hasWarn">
          <el-input-number v-model="awae.warnValue" :min="0" controls-position="right"></el-input-number> 个
        </span>
      </el-form-item>
      <el-form-item v-if="awae.awardType != '6'">
        <el-checkbox v-model="awae.giveScore" :checked="awae.giveScore == 1 ? true : false" :true-label=1 :false-label=0 @change="resetScore">同时送积分</el-checkbox>
        <span v-if="awae.giveScore">
          <el-button class="ml20 mr20" v-if="!awae.integralPool" @click="giveIntegral">选择</el-button>
          <el-button size="mini" type="info" v-else @click="giveIntegral">已选择</el-button>
          <el-input-number v-model="awae.integral" :min="0" :precision="0" controls-position="right"></el-input-number> 积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="awae.guideGzh" :checked="awae.guideGzh == 1 ? true : false" :true-label=1 :false-label=0>中奖后引导关注公众号</el-checkbox>
        <el-checkbox v-if="!isRed" v-model="awae.hasPdMaxOut" @change="resetPdMaxOut">每天出奖总次数限制</el-checkbox>
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
        <el-table-column prop="budget_value" label="剩余库存" align="center">
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
  props: ['awae', 'prizeType', 'nWin', 'isRed', 'hide', 'astrict','saleZone','budgetTime','index'],
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
      uploadURL: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      // awae: this.awae,
      prizeList: this.prizeType,
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
        awardPrice: [{required: true, validator: tips}],
        // pool: [{required: true, validator: tips}],
      },
      title: '选择物品',
      list: [],
      params: {
        metraFlag: '',
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
    },
    index(a,b){
      this.index = a
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
        return parseFloat((this.awae.redMoney * this.awae.totalNum).toPrecision(12))
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
    // console.log(this.awae)
    this.params.saleZoneCode = this.saleZone
    this.params.budgetTime = this.budgetTime
  },
  methods: {
    handleChangeN(n){
      this.$emit('handleChangeN',{n,index:this.index})
    },
    uploadImgUrlSuccess(resule,index) {
      if (resule.ret === '200000')
      return (this.awae.awardPic = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 选择奖品
    selectPrize(obj) {
      console.log(obj)
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
    resetPrize() {
      this.awae.awardPic = ''
      this.awae.prizeName = ''
      this.awae.poolName = ''
      this.awae.totalNum = ''
      this.awae.probability = ''
      this.awae.redMoney = ''
      this.awae.redTotalMoney = ''
      this.awae.integral = ''
      this.awae.awardPrice = ''
      this.awae.budgetId = ''
      this.awae.integralBudgetId = ''
    },
    getList() {
      if (this.awae.awardType == '1') {
        this.params.materialType = '1'
        this.params.metraFlag = 'object'
        this.title = '选择实物'
      } else if (this.awae.awardType == '2') {
        this.params.metraFlag = 'virtual'
        this.params.materialType = '2'
        this.title = '选择虚拟'
      } else if (this.awae.awardType == '3') {
        this.params.metraFlag = 'redpack'
        this.params.materialType = '3'
        this.title = '选择红包'
      } else if (this.awae.awardType == '6') {
        this.params.metraFlag = 'integral'
        this.params.materialType = '6'
        this.title = '选择积分'
      } else if (this.awae.awardType == '7') {
        this.params.metraFlag = 'cdDisc'
        this.params.materialType = '7'
        this.title = '选择折扣卡'
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
        this.$request.post(
          '/api/wiseqr/metra/list',
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
    // 重置阈值预警
    resetWarn(val) {
      if (!val) {
        this.awae.hasWarn = null
        this.awae.warnValue = ''
      }
    },
    resetPdMaxOut(val) {
      if (!val) {
        this.awae.pdMaxOut = 0
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
          this.$request.post('/api/wiseqr/act/addNum', {
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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>
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
