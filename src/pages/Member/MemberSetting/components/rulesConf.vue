<template>
  <div class="container">
    <el-form :modal="form" :rules="rules">
      <el-form-item label="选号设置：" prop="scanTimes">
        <span>每扫</span>
        <el-input-number controls-position="right" :min="0" v-model="form.scanTimes" :precision="0"></el-input-number>
        <span>包烟可参与一次选号</span>
      </el-form-item>
      <el-form-item label="开奖时间：" prop="lotteryStime">
        <span>每周六</span>
        <el-time-picker style="width: 130px;" align="center" :editable="false" v-model="form.lotteryStime" format="HH:mm" value-format="HH:mm" placeholder="请选择时间"></el-time-picker>
      </el-form-item>
      <el-form label-position="top" :rules="rules2">
        <el-form-item label="规格参数：" prop="snGiveSets">
          <norm-conf class="ml40" v-if="status" :params="form.snGiveSets"></norm-conf>
        </el-form-item>
        <el-form-item label="分享设置：" prop="form">
          <share-conf class="ml40" v-if="status" :params="form" :double="doubleArr" :discount="discountArr"></share-conf>
        </el-form-item>
        <el-form-item label="转赠设置：">
          <make-conf class="ml40" v-if="status" :params="form.giveSets"></make-conf>
        </el-form-item>
        <el-form-item label="中奖地区黑名单设置：">
          <div class="ml40">
            <el-select v-model="selectedProv" placeholder="请选择">
              <el-option  value="130000" label="河北省"></el-option>
            </el-select>
            <el-select v-model="selectedCityIndex" placeholder="请选择"  @change="getAreaList">
              <el-option v-if="cityList" v-for="(item, index) in cityList" :key="item.code" :label="item.name" :value="index"></el-option>
            </el-select>
            <el-select v-model="selectedAreaIndex" placeholder="请选择" no-data-text="请先选择市" @change="selectDisable">
              <el-option v-if="areaList" v-for="(item, index) in areaList" :disabled="item.disable" :key="item.code" :label="item.name" :value="index"></el-option>
            </el-select>
            <el-col class="mt20">
              <el-tag v-if="disableAreaName.length != 0" v-for="(item, index) in disableAreaName" :key="index" @close="handleClose(item)" type="info" color="#fff" :closable="true" size="medium">{{item}}</el-tag>
            </el-col>
          </div>
        </el-form-item>
      </el-form>
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="nextStep">下一步</el-button>
        <el-button plain @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import normConf from './normConf.component'
import shareConf from './shareConf.component'
import makeConf from './makeConf.component'
export default {
  components: {
    normConf,
    shareConf,
    makeConf
  },
  props: ['activityCode'],
  data() {
    // 只是为了显示表单的必填标识 *  没实质性用处
    var tips = (rule, value, callback) => {
      // callback()
    }
    return {
      rules: {
        scanTimes: [{required: true, validator: tips}],
        lotteryStime: [{required: true, validator: tips}]
      },
      rules2: {
        snGiveSets: [{required: true, validator: tips}],
        form: [{required: true, validator: tips}]
      },
      form: {
        // activityCode: this.activityCode,
        // scanTimes: null,
        // lotteryStime: '',
        // snGiveSets: [
        //   { snArr: [], score: null, luck: null, }
        // ],
        // shareLuck: null,
        // shareMaxpwLuck: null,
        // shareAwards: [
        //   {
        //     awardName: '', // 奖品名称
        //     awardPicUrl: '', // 奖品图片
        //     totalNum: null, // 奖品数量
        //     stockNum: null, // 奖品剩余
        //     probability: null, // 概率
        //     score: null, // 积分
        //     minred: null, // 红包
        //     redTotalMoney: null, // 红包金额
        //     redNum: null, // 红包总数
        //     awardType: null, // 1实物；2虚拟；3红包；6积分；201折扣卡；202翻倍卡
        //     poolId: null // 来源于物料表的id主键
        //   }
        // ],
        // giveSets: [
        //   {
        //     type: null, // 1实物；2虚拟；3红包；6积分；201折扣卡；202翻倍卡
        //     typeName: '', // 类型对应的名称
        //     give: null, // 是否允许转赠 1允许 0 不允许
        //     isRecieveMax: null, // 是否接受最大数量限制 1 有 0 无
        //     recieveMaxNum: null // 最大数量
        //   }
        // ],
        // districtBlacklist: []
      },
      selectedProv: '130000',
      selectedCityIndex: '',
      selectedAreaIndex: '',
      cityList: [],
      areaList: [],
      disableAreaName: [],
      doubleArr: [],
      discountArr: [],
      status: false,
      // stop: true
    }
  },
  watch: {
    // doubleArr: function(val) {
    //   this.form.shareAwards.map((item, index) => {
    //     if (item.awardType == 202) {
    //       this.form.shareAwards.splice(index, 1)
    //     }
    //   })
    //   this.form.shareAwards.push(...val)
    // },
    // discountArr: function(val) {
    //   this.form.shareAwards.map((item, index) => {
    //     if (item.awardType == 201) {
    //       this.form.shareAwards.splice(index, 1)
    //     }
    //   })
    //   this.form.shareAwards.push(...val)
    // }
  },
  created () {
    this.getActDetail()
    this.getCityList()
  },
  methods: {
    // 获取活动详情
    getActDetail() {
      this.$request.post('/api/wiseqr/md/queryExt', { activityCode: this.activityCode }, true, res => {
        if (res.ret === '200000') {
          this.status = true
          this.form = res.data
          if (this.form.blackList.length != 0) this.handleBlack()
          if (this.form.snGiveSets.length == 0) this.form.snGiveSets.push({ snArr: [], score: null, luck: null, })
          if (this.form.giveSets.length == 0) {
            this.form.giveSets.push(
              {
                type: 202,
                typeName: '翻倍卡',
                give: null,
                isRecieveMax: null,
                recieveMaxNum: null
              },
              {
                type: 201,
                typeName: '折扣卡',
                give: null,
                isRecieveMax: null,
                recieveMaxNum: null
              }
            )
          }
          if (this.form.shareAwards && this.form.shareAwards.length != 0) {
            this.form.shareAwards.forEach(item => {
              if (item.awardType == 201) {
                this.discountArr.push(item)
              } else if (item.awardType == 202) {
                this.doubleArr.push(item)
              }
            })
          }
        } 
      })
    },
    // 获取市级列表
    getCityList() {
      this.$request.post('/api/wiseqr/dim/regionByMultiParent', { parentArr: [this.selectedProv] }, true, res => {
        if (res.ret === '200000') return this.cityList = res.data
        this.$meaasge.error(res.message)
      })
    },
    // 获取县级列表
    getAreaList(index) {
      this.$request.post('/api/wiseqr/dim/regionByMultiParent', { parentArr: [this.cityList[index].code] }, true, res => {
        if (res.ret === '200000') {
          res.data.map(item => {
            item.disable = false
          })
          this.areaList = res.data
          this.areaListDisable(index)
          return
        }
        this.$meaasge.error(res.message)
      })
    },
    nextStep() {
      if (!this.form.lotteryStime) return this.$message.error('请选择开奖时间')
      this.form.lotteryStime = this.form.lotteryStime.split(':').join('')
      this.form.shareAwards = []
      this.form.shareAwards = [...this.discountArr, ...this.doubleArr]
      this.$request.post('/api/wiseqr/md/somExt', this.form, true, res => {
        if (res.ret === '200000') return this.$emit('nextStep', this.form.activityCode)
        this.$message.error(res.message)
      })
    },
    back() {
      this.$emit('back')
    },
    // 中奖地区黑名单选择
    selectDisable(index) {
      let disableArea = '河北省 ' + this.cityList[this.selectedCityIndex].name + ' ' + this.areaList[index].name
      if (this.disableAreaName.indexOf(disableArea) == -1) {
        this.disableAreaName.push(disableArea)
        if (this.form.districtBlacklist) {
          this.form.districtBlacklist.push(this.areaList[index].code)
        } else {
          this.form.districtBlacklist = []
          this.form.districtBlacklist.push(this.areaList[index].code)
        }
      }
      this.selectedCityIndex = ''
      this.selectedAreaIndex = ''
      this.areaList = []
    },
    // 删除黑名单
    handleClose(tag) {
      let index = this.disableAreaName.indexOf(tag)
      this.disableAreaName.splice(index, 1)
      this.form.districtBlacklist.splice(index, 1)
    },
    areaListDisable(index) {
      var DisableCityList = []
      this.disableAreaName.forEach(item => {
        if (item.indexOf(this.cityList[index]) !== 1) {
          DisableCityList.push(item)
        }
      })
      DisableCityList.forEach(item => {
        this.areaList.forEach(d => {
          if (item.indexOf(d.name) != -1) {
            d.disable = true
          }
        })
      })
    },
    handleBlack() {
      this.form.blackList.map(item => {
        let disableArea = item.provName + ' ' + item.cityName + ' ' + item.districtName
        this.disableAreaName.push(disableArea)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 20px auto 0;
}
.el-form {
  // width: 900px;
  margin: 40px auto;
}
.el-select {
  width: 120px;
}
.ml40 {
  margin-left: 40px;
}
.warn label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>

