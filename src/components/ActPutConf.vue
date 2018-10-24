<template>
  <div class="actPutConf-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>投放设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="form" :model="strategyArr[0].awaeArr[0]" label-width="100px">
        <el-form-item label="品牌规格：">
          <el-select v-model="selectBrand" multiple placeholder="请选择" @change="getBrandSonList">
            <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-select v-model="selectSonBrand" multiple placeholder="请选择">
            <el-option v-if="brandSonList" v-for="item in brandSonList" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-button type="primary" @click="brandVisible = true" class="ml20">已选明细</el-button>
        </el-form-item>
        <el-form-item label="地区：">
          <el-select v-model="selectProvList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="getCityList">
            <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="selectCityList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="getAreaList">
            <el-option v-if="cityList" v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="selectAreaList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="selectAll">
            <el-option v-if="areaList" v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox>
          <el-button type="primary" @click="regionVisible = true" class="ml20">已选明细</el-button>
        </el-form-item>
        <el-form-item>
          <div class="prize-conf">
            <div class="title">常规奖池</div>
            <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
              <el-tab-pane :key="item.name" v-for="item in editableTabs" :label="item.title" :name="item.name">
                <pond-conf :awae="awae" :prizeType="prizeType"></pond-conf>
                <!-- <el-form ref="form" :model="strategyArr[0].awaeArr[0]" label-width="100px">
                  <el-form-item label="奖品类型:">
                    <el-select size="medium" v-model="strategyArr[0].tfType" multiple placeholder="请选择">
                      <el-option v-for="item in prizeType" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="奖品名称:">
                    <el-col :span="10">
                      <el-input size="medium" v-model="strategyArr[0].awaeArr.prizeName" placeholder="请输入奖品名称"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="选择物品:">
                    <el-button size="medium">选择</el-button>
                  </el-form-item>
                  <el-form-item label="投放数量:">
                    <el-input-number size="small" v-model="strategyArr[0].awaeArr.remainNum" :min="0" controls-position="right"></el-input-number> 个
                  </el-form-item>
                  <el-form-item label="中奖概率:">
                    <el-input-number size="small" v-model="strategyArr[0].awaeArr.remainNum" :min="0" :max="100" controls-position="right"></el-input-number> %
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="strategyArr[0].awaeArr.hasWarn">阈值预警</el-checkbox>
                    <span v-if="strategyArr[0].awaeArr.hasWarn">
                      <el-input-number size="small" v-model="strategyArr[0].awaeArr.remainNum" :min="0" controls-position="right"></el-input-number> 个
                    </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="strategyArr[0].awaeArr.isGiveScore">同时送积分</el-checkbox>
                    <span v-if="strategyArr[0].awaeArr.isGiveScore">
                      <el-button size="medium" class="ml20 mr20">选择</el-button>
                      <el-input-number size="small" v-model="strategyArr[0].awaeArr.remainNum" :min="0" controls-position="right"></el-input-number> 积分
                    </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="strategyArr[0].awaeArr.isGiveScore">中奖后引导关注公众号</el-checkbox>
                    <el-checkbox v-model="strategyArr[0].awaeArr.hasPdMaxOut">每天出奖总次数限制</el-checkbox>
                    <span v-if="strategyArr[0].awaeArr.hasPdMaxOut">
                      <el-input-number size="small" v-model="strategyArr[0].awaeArr.remainNum" :min="0" controls-position="right"></el-input-number> 次
                    </span>
                  </el-form-item>
                </el-form> -->
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="special-rule-conf">
            <div class="title">
              <span>特殊规则设置</span>
              <el-switch v-model="specialRuleConfFlag">
              </el-switch>
            </div>
            <div class="con" v-if="specialRuleConfFlag">
              <el-row>
                <el-checkbox v-model="strategyArr[0].awaeArr.isGiveScore">首扫必中奖</el-checkbox>
                <div class="conf" v-if="strategyArr[0].awaeArr.isGiveScore">
                  配置
                </div>
              </el-row>
              <el-row>
                <el-checkbox v-model="strategyArr[0].awaeArr.isGiveScore">N次必中奖</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox v-model="strategyArr[0].awaeArr.isGiveScore">定点投放奖</el-checkbox>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="prize-limit">
            <div class="title">
              <span>抽奖限制</span>
              <el-switch v-model="prizeLimitFlag">
              </el-switch>
            </div>
            <div class="con" v-if="prizeLimitFlag">
              <el-row>
                <el-col :span="6" class="label">每日中奖机会限制:</el-col>
                每人每日<el-input-number size="small" v-model="strategyArr[0].awaeArr.remainNum" :min="0" controls-position="right"></el-input-number>
                次抽奖后，不再有中奖机会
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          是否立即发布
          <el-switch class="ml20" v-model="isPut">
          </el-switch>
          <el-row class="mt20">
            <el-button type="primary">保存</el-button>
            <el-button>返回列表</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="选择的品牌及对应的规格" :visible.sync="brandVisible" width="500px">
      <span>暂时不做</span>
    </el-dialog>
    <el-dialog title="常规奖池选择的地区明细" :visible.sync="regionVisible" width="500px">
      <span>暂时不做</span>
    </el-dialog>
  </div>
</template>
<script>
import pondConf from '../components/pondConf.module'
export default {
  props: ['id', 'actCode'],
  components: {
    pondConf
  },
  data() {
    return {
      act: {
        id: '',
        actCode: ''
      },
      strategyArr: [
        {
          areas: {},
          awaeArr: [
            {
              awardPic: '',
              awardType: '1',
              curActive: true,
              giveScore: 0,
              guideGzh: 0,
              hasPdMaxOut: false,
              hasWarn: false,
              integral: '',
              integralPool: '',
              integralPoolName: '',
              integralPoolPic: '',
              isGiveScore: false,
              outNum: '',
              pdMaxOut: '',
              poolId: 1,
              poolName: '',
              prizeName: '',
              probability: '',
              redMoney: '',
              redTotalMoney: '',
              remainNum: 0,
              totalNum: '',
              warnValue: ''
            }
          ],
          brandArr: [],
          snArr: [],
          tfType: ''
        }
      ],
      awae: {
        awardPic: '',
        awardType: '1',
        curActive: true,
        giveScore: 0,
        guideGzh: 0,
        hasPdMaxOut: false,
        hasWarn: false,
        integral: '',
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        outNum: '',
        pdMaxOut: '',
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: ''
      },
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }
      ],
      prizeType: [
        { name: '实物礼品', type: '1' },
        { name: '虚拟礼品', type: '2' },
        { name: '红包', type: '3' },
        { name: '积分', type: '4' }
      ],
      tabIndex: 2,
      selectBrand: [],
      selectSonBrand: [],
      selectProvList: [],
      // oldSlectProvList: ['1'], // 给个默认值 不然会报错
      selectCityList: [],
      // oldSelectCityList: ['1'],
      selectAreaList: [],
      // oldSelectAreaList: ['1'],
      brandList: [],
      brandSonList: [],
      provList: [],
      cityList: [],
      areaList: [],
      regionVisible: false,
      brandVisible: false,
      specialRuleConfFlag: false,
      prizeLimitFlag: false,
      isPut: false,
      isDisabled: false
    }
  },
  created() {
    this.getBrandList()
    this.getProvList()
  },
  computed: {
    // TODO 暂时不做
    // regionDetail: function() {
    //   let regionStr = ''
    //   this.selectProvList.forEach(item => {
    //     regionStr += item
    //   })
    // }
  },
  methods: {
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/saotx/prod/listBrand', { pageSize: '-1' }, true, res => {
        if (res.ret === '200000') return (this.brandList = res.data.list)
        this.$message.error(res.message)
      })
    },
    // 获取子品牌列表
    getBrandSonList() {
      this.$request.post(
        '/api/saotx/prod/list',
        { brandCodeArr: this.selectBrand, pageSize: '-1' },
        true,
        res => {
          if (res.ret === '200000') return (this.brandSonList = res.data.list)
          this.$message.error(res.message)
        }
      )
    },
    // 获取省
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: [] }, true, res => {
        if (res.ret === '200000') {
          this.provList = res.data
          // this.provList.unshift({ code: 'all', name: '全部' })
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取市
    getCityList(val) {
      // let allValue = []
      // // 保存所有的值
      // for (let item of this.provList) {
      //   allValue.push(item.code)
      // }
      // // 储存上一次的值 用来进行对比
      // const oldVal = this.oldSlectProvList.length === 1 ? [] : this.oldSlectProvList[1]
      // // 点击全部选择
      // /**
      //  * Array.includes()
      //  * ES6方法 用于判断是否包含某一元素 返回布尔值
      //  */
      // if (val.includes('all')) this.selectProvList = allValue
      // // 取消全部选择
      // if (oldVal.includes('all') && !val.includes('all')) this.selectProvList = []
      // // 全选之后取消单个
      // if (oldVal.includes('all') && val.includes('all')) {
      //   // 全选也跟着取消
      //   const index = val.indexOf('all')
      //   val.splice(index, 1)
      //   this.selectProvList = val
      // }
      // // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      // if (!oldVal.includes('all') && !val.includes('all')) {
      //   if (val.length === allValue.length - 1) {
      //     this.selectProvList = ['all'].concat(val)
      //   }
      // }
      // this.oldSlectProvList[1] = this.selectProvList
      if (this.selectProvList.length == 0) {
        this.cityList = []
        this.selectCityList = []
        this.areaList = []
        this.selectAreaList = []
        return
      }
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent',
        { parentArr: this.selectProvList },
        true,
        res => {
          if (res.ret === '200000') {
            this.cityList = res.data
            // this.cityList.unshift({ code: 'all', name: '全部' })
            return
          }
          this.message.error(res.message)
        }
      )
    },
    // 获取区
    getAreaList(val) {
      // let allValue = []
      // for (let item of this.cityList) {
      //   allValue.push(item.code)
      // }
      // const oldVal = this.oldSelectCityList.length === 1 ? [] : this.oldSelectCityList[1]
      // if (val.includes('all')) this.selectCityList = allValue
      // if (oldVal.includes('all') && !val.includes('all')) this.selectCityList = []
      // if (oldVal.includes('all') && val.includes('all')) {
      //   const index = val.indexOf('all')
      //   val.splice(index, 1)
      //   this.selectCityList = val
      // }
      // if (!oldVal.includes('all') && !val.includes('all')) {
      //   if (val.length === allValue.length - 1) {
      //     this.selectCityList = ['all'].concat(val)
      //   }
      // }
      // this.oldSelectCityList[1] = this.selectCityList
      if (this.selectCityList.length == 0) {
        this.areaList = []
        this.selectAreaList = []
        return
      }
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent',
        { parentArr: this.selectCityList },
        true,
        res => {
          if (res.ret === '200000') {
            this.areaList = res.data
            // this.areaList.unshift({ code: 'all', name: '全部' })
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    // 选择区
    selectAll(val) {
      // let allValue = []
      // for (let item of this.areaList) {
      //   allValue.push(item.code)
      // }
      // const oldVal = this.oldSelectAreaList.length === 1 ? [] : this.oldSelectAreaList[1]
      // if (val.includes('all')) this.selectAreaList = allValue
      // if (oldVal.includes('all') && !val.includes('all')) this.selectAreaList = []
      // if (oldVal.includes('all') && val.includes('all')) {
      //   const index = val.indexOf('all')
      //   val.splice(index, 1)
      //   this.selectAreaList = val
      // }
      // if (!oldVal.includes('all') && !val.includes('all')) {
      //   if (val.length === allValue.length - 1) {
      //     this.selectAreaList = ['all'].concat(val)
      //   }
      // }
      // this.oldSelectAreaList[1] = this.selectAreaList
    },
    handleTabsEdit() {}
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  .prize-conf {
    max-width: 800px;
  }
}
.title {
  height: 40px;
  padding-left: 20px;
  background: #f0f0f0;
}
.prize-conf {
  .el-tabs {
    border: 1px solid #ebeef5;
    .el-tab-pane {
      padding: 0 30px;
    }
  }
}
.special-rule-conf,
.prize-limit {
  width: 100%;
  max-width: 800px;
  .title {
    position: relative;
    .el-switch {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.special-rule-conf {
  .con {
    background: rgb(243, 247, 255);
    .el-row {
      padding: 0 20px;
    }
  }
}
.prize-limit {
  .con {
    padding: 0 20px;
    margin-top: 10px;
    .label {
      color: #707478;
      font-weight: 700;
    }
  }
}
</style>
