<template>
  <div class="container">
    <span>奖项设置：</span>
    <el-card class="mt20">
      <div slot="header" class="clearfix">
        <span>省内</span>
      </div>
      <el-form label-width="100px" :rules="rules">
        <el-form-item label="销区：" prop="areas">
          河北省
          <el-select v-model="areas" multiple collapse-tags class="ml20" placeholder="请选择区" @change="checkAll">
            <el-option v-if="cityList" v-for="(item, index) in cityList" :key="index" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <rank-conf v-if="flag" :params="form[0].awards" :outRange="form[0].outRange"></rank-conf>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <div slot="header" class="clearfix">
        <span>省外</span>
      </div>
      <el-form label-width="100px" :rules="rules2">
        <el-form-item label="投放类型：" prop="awards">
          <div class="mt20 mb20">
            <!-- <el-checkbox class="mr20" v-model="defaultPond">默认奖池</el-checkbox> -->
            <div>默认奖池</div>
            <rank-conf v-if="flag" :params="form[1].awards" :outRange="form[1].outRange"></rank-conf>
          </div>
          <div>
            <el-checkbox class="mr20" v-model="TfPond" @change="addTf">定投奖池</el-checkbox>
            <div v-if="TfPond">
              <el-form-item label="地区：" prop="prov">
                <el-select v-model="prov" multiple collapse-tags placeholder="请选择区">
                  <el-option v-if="provList" :disabled="item.disable ? true : false" v-for="(item, index) in provList" :key="index" :label="item.name" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <rank-conf :params="form[2].awards" :outRange="form[2].outRange"></rank-conf>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="btn mt20">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import rankConf from './rankConf.component'
export default {
  components: {
    rankConf
  },
  props: ['activityCode'],
  data() {
    // 只是为了显示表单的必填标识 *  没实质性用处
    var tips = (rule, value, callback) => {
      // callback()
    }
    return {
      rules: {
        areas: [{required: true, validator: tips}],
        srange: [{required: true, validator: tips}],
        awardName: [{required: true, validator: tips}]
      },
      rules2: {
        awards: [{required: true, validator: tips}],
        prov: [{required: true, validator: tips}],
        srange: [{required: true, validator: tips}],
        awardName: [{required: true, validator: tips}]
      },
      areas: [],
      prov: [],
      cityList: [],
      selectedCity: [],
      provList: [],
      defaultPond: true,
      TfPond: false,
      form: {},
      flag: false,
      stop: false,
      oldSelectList: ['1']
    }
  },
  watch: {
    // defaultPond: function(val) {
    //   if (!val) {
    //     this.form.splice(1, 1)
    //   } else {
    //     this.form.splice(1, 0, {
    //       activityCode: this.activityCode,
    //       areas: [],
    //       awards: [],
    //       outRange: [],
    //       awardType: null,
    //       awardSubType: null,
    //       rangeType: null,
    //       tfType: '1',
    //       tfStrategy: '23'
    //     })
    //   }
    // },
    // TfPond: function(val) {
    //   if (!val) {
    //     this.form.splice(2, 1)
    //   } else {
    //     this.form.splice(2, 0, {
    //       activityCode: this.activityCode,
    //       areas: [],
    //       awards: [],
    //       outRange: [],
    //       awardType: null,
    //       awardSubType: null,
    //       rangeType: null,
    //       tfType: '1',
    //       tfStrategy: '22'
    //     })
    //   }
    // }
  },
  created () {
    this.getActDetail()
    this.getCityList()
    this.getProvList()
  },
  methods: {
    getActDetail() {
      this.$request.post('/api/wiseqr/md/queryBaseAward', {activityCode: this.activityCode}, true, res => {
        if (res.ret === '200000') {
          this.flag = true
          this.form = res.data
          this.form[0].areas.forEach(item => {
            this.areas.push(item.cityCode)
            this.oldSelectList.push(item.cityCode)
          })
          if (this.form.length > 2) {
            this.form[2].areas.forEach(item => {
              this.prov.push(item.provCode)
            })
            this.TfPond = true
          }
          return
        }
        this.$message.error(res.message)
      })
    },
    getProvList() {
      this.$request.post('/api/wiseqr/dim/regionByMultiParent', { parentArr: [] }, true, res => {
        if (res.ret === '200000') {
          res.data.map((item, index) => {
            if (item.code == '130000') {
              res.data.splice(index, 1)
            }
          })
          this.provList = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    getCityList() {
      this.$request.post('/api/wiseqr/dim/regionByMultiParent', { parentArr: ['130000'] }, true, res => {
        if (res.ret === '200000') {
          this.cityList = [{ code: '000000', name: '全部'}]
          this.cityList.push(...res.data)
          return
        }
        this.$meaasge.error(res.message)
      })
    },
    // 添加定投
    addTf(val) {
      if (!val) {
        this.form.splice(2, 1)
      } else {
        this.form.splice(2, 0, {
          activityCode: this.activityCode,
          areas: [],
          awards: [],
          outRange: [],
          awardType: null,
          awardSubType: null,
          rangeType: null,
          tfType: '1',
          tfStrategy: '22'
        })
      }
    },
    // 防止用户输入重复的名次
    handleRepetitive(list, index) {
      var sNum = list.awards[index].srange
      var eNum = list.awards[index].erange
      for (let i = index + 1; i < list.awards.length; i++) {
        var erange = list.awards[i].erange
        var srange = list.awards[i].srange
        if ((sNum <= srange && eNum >= srange) || (sNum <= erange && eNum >= erange)) {
          this.$message.error('名次不能重复')
          this.stop = true
          // console.log('重复的名次：' + srange + '-' + erange + `\n` + '被重复的名次：' + sNum + '-' + eNum)
          return
        } else {
          this.stop = false
        }
      }
      if (index < list.awards.length - 1) {
        index++
        this.handleRepetitive(list, index)
      }
    },
    // 之前的全选逻辑
    checkAll(val) {
      let allValue = []
      for (let item of this.cityList) {
        allValue.push(item.code)
      }
      const oldVal = this.oldSelectList.length === 1 ? [] : this.oldSelectList[1]
      if (val.includes('000000')) this.areas = allValue
      if (oldVal.includes('000000') && !val.includes('000000')) this.areas = []
      if (oldVal.includes('000000') && val.includes('000000')) {
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.areas = val
      }
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.areas = ['000000'].concat(val)
        }
      }
      this.oldSelectList[1] = this.areas
      if (this.areas.length == 0) {
        this.areaList = []
        this.selectAreaList = []
        return
      }
    },
    save() {
      // this.form.map(item => {
      //   item.outRange[0].srange = item.awards[item.awards.length - 1].erange + 1
      // })
      // this.handleRepetitive(this.form[0], 0)
      this.form.forEach((item, index) => {
        if (index != 0 && this.stop) return
        this.handleRepetitive(item, 0)
      })
      if (this.stop) return
      this.form[0].areas = []
      this.cityList.map(item => {
        this.areas.forEach(d => {
          if (d == item.code) {
            this.form[0].areas.push({
              provCode: '130000',
              cityCode: d
            })
          }
        })
      })
      if (this.TfPond) {
        this.form[2].areas = []
        this.provList.map(item => {
          this.prov.forEach(d => {
            if (d == item.code) {
              this.form[2].areas.push({
                provCode: d
              })
            }
          })
        })
      }
      this.$request.post('/api/wiseqr/md/somBaseAward', { activityCode: this.activityCode, strategy: this.form }, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功')
          this.$emit('back')
          return
        }
        this.$message.error(res.message)
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
.el-input-number {
  width: 100px;
}
.btn {
  text-align: center;
}
</style>
