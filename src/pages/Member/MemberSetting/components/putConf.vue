<template>
  <div class="container">
    <span>奖项设置：</span>
    <el-card class="mt20">
      <div slot="header" class="clearfix">
        <span>省内</span>
      </div>
      <el-form label-width="90px">
        <el-form-item label="销区：">
          河北省
          <el-select v-model="areas" multiple collapse-tags class="ml20" placeholder="请选择区">
            <el-option v-if="cityList" v-for="(item, index) in cityList" :key="index" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="名次设置：">
          <div class="mb20" v-for="(item, index) in form.arr" :key="index">
            <el-input-number v-model="item.first" :precision="0" :min="0" controls-position="right"></el-input-number>
            —
            <el-input-number v-model="item.last" :precision="0" :min="0" controls-position="right"></el-input-number>
            名，红包面额
            <el-input-number v-model="item.money" :precision="2" :min="0" :max="500" controls-position="right" @change="calculate(item)"></el-input-number>
            元
            <span class="ml20 mr20">
              总金额
              <el-input disabled v-model="item.totlaMoney" style="width: 80px"></el-input>
              元
            </span>
            <el-button type="primary" v-if="index === form.arr.length - 1" @click="add">新增</el-button>
            <el-button type="danger" v-if="index!== 0 && index === form.arr.length - 1" @click="del(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="mr20" v-model="radio">排名以外</el-checkbox>
          可获得
          <el-input-number v-model="form.score" :disabled="!radio" :precision="0" :min="0" :max="1000" controls-position="right"></el-input-number>
          荷石币
        </el-form-item> -->
        <rank-conf :params="form[0].awards" :outRange="form[0].outRange"></rank-conf>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <div slot="header" class="clearfix">
        <span>省外</span>
      </div>
      <el-form label-width="90px">
        <el-form-item label="投放类型：">
          <div class="mt20 mb20">
            <!-- <el-checkbox class="mr20" v-model="defaultPond">默认奖池</el-checkbox> -->
            <div>默认奖池</div>
            <rank-conf :params="form[1].awards" :outRange="form[1].outRange"></rank-conf>
          </div>
          <div>
            <el-checkbox class="mr20" v-model="TfPond" @change="addTf">定投奖池</el-checkbox>
            <div v-if="TfPond">
              <el-form-item label="地区：">
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
    return {
      areas: [],
      prov: [],
      cityList: [],
      selectedCity: [],
      provList: [],
      defaultPond: true,
      TfPond: false,
      form: {}
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
      this.$request.post('/api/saotx/md/queryBaseAward', {activityCode: this.activityCode}, true, res => {
        if (res.ret === '200000') {
          this.form = res.data
          this.form[0].areas.forEach(item => {
            this.areas.push(item.cityCode)
          })
          if (this.form.length == 3) {
            this.form[2].areas.forEach(item => {
              this.prov.push(item.provCode)
            })
            this.TfPond = true
            console.log(this.prov)
          }
          return
        }
        this.$message.error(res.message)
      })
    },
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: [] }, true, res => {
        if (res.ret === '200000') {
          res.data.map((item, index) => {
            if (item.code == '130000') {
              res.data.splice(index, 1)
            }
          })
          this.provList = res.data
        }
        this.$meaasge.error(res.message)
      })
    },
    getCityList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: ['130000'] }, true, res => {
        if (res.ret === '200000') return this.cityList = res.data
        this.$meaasge.error(res.message)
      })
    },
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
    save() {
      // this.form.map(item => {
      //   item.outRange[0].srange = item.awards[item.awards.length - 1].erange + 1
      // })
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
      this.form[0].areas
      this.$request.post('/api/saotx/md/somBaseAward', { activityCode: this.activityCode, strategy: this.form }, true, res => {
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
  width: 1200px;
  margin: 20px auto 0;
}
.el-input-number {
  width: 100px;
}
.btn {
  text-align: center;
}
</style>
