<template>
  <div class="root">
    <div class="content mt20" v-for="(item, index) in data.strategyArr" :key="index">
      <el-form-item label="场次时间：" prop="time">
        <el-date-picker v-model="timeObj[index]" :disabled="isDisableArr[index]" @change="time(index)" :time-arrow-control="true" :picker-options="pickerOptions" arrow-control format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button type="danger" class="del-btn" v-if="index !== 0 && !item.tf.id" @click="del(index)">删除场次</el-button>
      </el-form-item>
      <el-form-item label="初始化奖池：">
        <el-button plain type="primary" :disabled="btnDisableArr[index]" @click="initStatus(item.tf, index)">初始化奖池</el-button>
        <span class="ml20 info">{{statusInfoArr[index]}}</span>
      </el-form-item>
      <div @mouseover="tabsIndex = index">
        <el-tabs v-model="putTabsValue[index]" type="card" editable @edit="putTabsEdit">
          <el-tab-pane :key="i" v-for="(tab, i) in putTabs[index]" :label="tab.title" :name="tab.name">
            <pond-conf :awae="item.awardArr[i]" :prizeType="prizeType" :isDisable="isDisableArr[index]"></pond-conf>
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
      timeObj: [],
      statusInfoArr: [],
      isDisableArr: [],
      btnDisableArr: [],
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
          stimeStr: '', // yyyy-MM-dd HH:mm
          etimeStr: ''
        },
        tfType: 'common',
      },
      initData: {}
    }
  },
  created() {
    this.handleTabs()
    // this.handleTime()
  },
  methods: {
    initStatus(d, i) {
      let msg
      this.$request.post('/api/saotx/act/initRedWin', {actCode: d.actCode, tfCode: d.tfCode}, true, res => {
        this.initData = JSON.parse(res.data).content
        // console.log(this.initData.data.ts)
        if (this.initData.code == '200') {
          if (this.initData.data.init) {
            msg = `${this.initData.data.ts}, 初始化成功! 奖品总数：${this.initData.data.rrTfInfo.totalNum}, 剩余：${this.initData.data.rrTfInfo.restNum}`
          } else {
            msg = `${this.initData.data.ts}, 未初始化!`
          }
        } else {
          msg = `${this.initData.data.ts}, ${this.initData.msg}`
        }
        this.$set(this.statusInfoArr, i, msg)
      })
    },
    // 处理后台返回的数据 渲染出来
    handleTabs() {
      this.data.strategyArr.forEach((item, index) => {
        // this.$set(this.isDisableArr, index, Boolean)
        // this.$set(this.btnDisableArr, index, Boolean)
        this.handleDisable(item, index)
        this.handleTime(item)
        // this.$set(this.timeObj, index, [])
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
    // 处理时间
    handleTime(d) {
      // this.data.strategyArr.forEach((d, i) => {
        if (d.tf.stimeStr && d.tf.etimeStr) {
          this.timeObj.push([d.tf.stimeStr, d.tf.etimeStr])
        }
      // })
    },
    time(i) {
      console.log(this.timeObj)
      if (this.timeObj.length >= 2) {
        let currentTimeArr = this.timeObj[i]
        this.timeObj.forEach((item, index) => {
          if (index == i) return
          if (!item) return
          let booleanA = item[0] <= currentTimeArr[0] && item[1] >= currentTimeArr[0],
              booleanB = item[0] <= currentTimeArr[1] && item[1] >= currentTimeArr[1]
          if (booleanA || booleanB) {
            this.$message.error('场次时间不能重复!')
            // this.timeObj[i] = null
            this.$set(this.timeObj, i, null)
            console.log(this.timeObj)
            return
          }
        })
      }
      if (!this.timeObj[i]) {
        this.data.strategyArr[i].tf.stimeStr = ''
        this.data.strategyArr[i].tf.etimeStr = ''
        return
      }
      this.data.strategyArr[i].tf.stimeStr = this.timeObj[i][0]
      this.data.strategyArr[i].tf.etimeStr = this.timeObj[i][1]
    },
    // 处理时间和刷新按钮禁用状态
    handleDisable(item, i) {
      let nowTime = item.tf.sysTime,
          stime = new Date(item.tf.stimeStr).getTime(),
          etime = new Date(item.tf.etimeStr).getTime()
      // 小于15分钟内不允许编辑
      if (stime - nowTime  < 900000) {
        this.isDisableArr.push(true)
      } else {
        this.isDisableArr.push(false)
      }
      // 保存并且发布 才能刷新状态
      if (item.tf.actCode && item.tf.tfCode && this.data.act.status == 1) {
        // 场次时间结束也不能刷新
        if (nowTime >= etime) {
          this.btnDisableArr.push(true)
        } else {
          this.btnDisableArr.push(false)
        }
      } else {
        this.btnDisableArr.push(true)
      }
    },
    // tabs的添加和删除
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
    // 添加场次
    add() {
      let newData = JSON.parse(JSON.stringify(this.defaultAwae))
      // let len = this.data.strategyArr.length
      // this.$set(this.data.strategyArr, len, newData)
      this.data.strategyArr.push(newData)
      this.putTabs.push([{ title: '常规奖项1', name: '0'}])
      this.putTabsValue.push('0')
      this.$set(this.btnDisableArr,  this.data.strategyArr.length - 1, true)
    },
    // 删除场次
    del(i) {
      // 第一场不删
      if (i == 0) return
      this.$confirm('是否删除该场次?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.timeObj.splice(i, 1)
        this.data.strategyArr.splice(i, 1)
        this.putTabs.splice(i, 1)
        this.putTabsValue.splice(i, 1)
        this.statusInfoArr.splice(i, 1)
        this.isDisableArr.splice(i, 1)
        this.btnDisableArr.splice(i, 1)
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
.del-btn {
    float: right;
    margin-right: 20px;
}
</style>

