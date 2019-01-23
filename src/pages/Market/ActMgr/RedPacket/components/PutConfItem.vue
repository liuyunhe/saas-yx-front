<template>
  <div class="root">
    <div class="content mt20" v-for="(item, index) in data.strategyArr" :key="index">
      <el-form-item label="场次时间：" prop="time">
        <el-date-picker v-model="timeObj[index]" :disabled="isDisableObj[index]" @change="time(index)" :time-arrow-control="true" :picker-options="pickerOptions" arrow-control format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="查看状态：">
        <el-button plain type="primary" @click="initStatus(item.tf, index)">刷新状态</el-button>
        <span class="ml20 info">{{statusInfoObj[index]}}</span>
      </el-form-item>
      <div @mouseover="tabsIndex = index">
        <el-tabs v-model="putTabsValue[index]" type="card" editable @edit="putTabsEdit">
          <el-tab-pane :key="i" v-for="(tab, i) in putTabs[index]" :label="tab.title" :name="tab.name">
            <pond-conf :awae="item.awardArr[i]" :prizeType="prizeType" :isDisable="isDisableObj[index]"></pond-conf>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-button class="mt20" type="primary" icon="el-icon-plus" @click="add">新增场次</el-button>
  </div>
</template>
<script>
import pondConf from './redPondConf'
export default {
  props: {
    data: { type: Object, required: true }
  },
  components: {
    pondConf
  },
  data() {
    return {
      tabsIndex: null,
      timeObj: {},
      statusInfoObj: {},
      prizeType: [
        { name: '实物礼品', type: 1 },
        { name: '虚拟礼品', type: 2 },
        { name: '红包', type: 3 },
        { name: '积分', type: 6 }
      ],
      putTabs: [
        [
          {title: '常规奖项1', name: '0'}
        ]
      ],
      putTabsValue: ['0'],
      // 时间限制
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.data.act.stimeStr).getTime() || time.getTime() > new Date(this.data.act.etimeStr).getTime()
        }
      },
      defaultAwae: {
        areas: {
          cityArr: [],
          districtArr: [],
          provinceArr: []
        },
        awardArr: [
          {
            awardPic: '',
            awardType: 1, // 奖项类型
            curActive: true,
            giveScore: 0, // 是否赠送积分 0-否 1-是
            guideGzh: 0, // 是否引导关注公众号 0-否 1-是
            hasPdMaxOut: false,
            hasWarn: false,
            integral: null, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
            integralPool: null, // 赠送积分池主键id
            integralPoolName: null,
            integralPoolPic: null,
            isGiveScore: false,
            isGuideGzh: false,
            isPdMaxOut: false,
            isWarn: false,
            n: '',
            outNum: '',
            pdMaxOut: '', // 奖项每天最多出奖个数
            poolId: 1, // 奖项物料池主键id
            poolName: '',
            prizeName: '', // 奖项名称
            probability: '', // 中奖概率
            redMoney: '', // 投放红包面额
            redTotalMoney: '',
            remainNum: 0,
            totalNum: '', // totalNum
            warnValue: '' //告警阀值 非空且大于0时为设置告警
          }
        ],
        brandArr: [],
        snArr: [],
        tf: {
          stimeStr: '', // yyyy-MM-dd HH:mm:ss
          etimeStr: ''
        },
        tfType: 'common',
      },
      isDisableObj: {},
      initData: {}
    }
  },
  created() {
    this.handleTabs()
    this.handleTime()
  },
  methods: {
    initStatus(d, i) {
      let msg
      this.$request.post('/api/saotx/act/initRedWin', {actCode: d.actCode, tfCode: d.tfCode}, true, res => {
        this.initData = JSON.parse(res.data).content
        // console.log(this.initData.data.ts)
        if (this.initData.code == '200') {
          if (this.initData.data.init) {
            msg = `${this.initData.data.ts}, 初始化成功! 奖品数：${this.initData.data.rrTfInfo.totalNum}, 剩余：${this.initData.data.rrTfInfo.restNum}`
          } else {
            msg = `${this.initData.data.ts}, 未初始化!`
          }
        } else {
          msg = `${this.initData.data.ts}, ${this.initData.msg}`
        }
        this.$set(this.statusInfoObj, i, msg)
      })
    },
    handleTabs() {
      this.data.strategyArr.forEach((item, index) => {
        this.$set(this.isDisableObj, index, Boolean)
        this.handleDisable(item, index)
        this.$set(this.timeObj, index, [])
        if (index !== 0) {
          this.putTabs.push([{ title: '常规奖项1', name: '0'}])
          // this.$set(this.putTabs, index, [{ title: '常规奖项1', name: '0'}])
          this.putTabsValue.push('0')
        }
        item.awardArr.forEach((d, i) => {
          if (i == 0) return 
          this.putTabs[index].push({ title: '常规奖项' + (i + 1), name: i + ''})
        })
      })
    },
    handleTime() {
      this.data.strategyArr.forEach((d, i) => {
        if (d.tf.stimeStr && d.tf.etimeStr) {
          this.$set(this.timeObj, i, [])
          this.timeObj[i].push(d.tf.stimeStr)
          this.timeObj[i].push(d.tf.etimeStr)
        }
      })
    },
    time(i) {
      this.data.strategyArr[i].tf.stimeStr = this.timeObj[i][0]
      this.data.strategyArr[i].tf.etimeStr = this.timeObj[i][1]
    },
    handleDisable(item, i) {
      let nowTime = item.tf.sysTime
      let stime = new Date(item.tf.stimeStr)
      if (stime - nowTime  < 900000) {
        this.isDisableObj[i] = true
      } else {
        this.isDisableObj[i] = false
      }
    },
    putTabsEdit(targetName, action) {
      let len = this.data.strategyArr[this.tabsIndex].awardArr.length
      if (action === 'add') {
        if (len == 10) return
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae.awardArr[0]))
        this.data.strategyArr[this.tabsIndex].awardArr.push(newAwae)
        let newTabTitle = '常规奖项' + (len + 1)
        this.putTabs[this.tabsIndex].push({
          title: newTabTitle,
          name: len + ''
        })
        this.putTabsValue[this.tabsIndex] = len + ''
      }
      if (action === 'remove') {
        if (len == 1) return
        this.putTabs[this.tabsIndex] = []
        for (var i = 1; i < len; i++) {
          this.putTabs[this.tabsIndex].push({ title: '常规奖项' + i, name: i - 1 + ''})
        }
        this.putTabsValue[this.tabsIndex] = '0'
        this.data.strategyArr[this.tabsIndex].awardArr.splice(targetName, 1)
      }
    },
    add() {
      let newData = JSON.parse(JSON.stringify(this.defaultAwae))
      // let len = this.data.strategyArr.length
      // this.$set(this.data.strategyArr, len, newData)
      this.data.strategyArr.push(newData)
      this.putTabs.push([{ title: '常规奖项1', name: '0'}])
      this.putTabsValue.push('0')
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 10px 0;
  border: 1px solid #e4e7ed;
}
.el-tabs /deep/ .el-tabs__new-tab {
  margin-right: 10px;
}
.info {
  font-size: 12px;
  color: #c0c4cc;
}
</style>

