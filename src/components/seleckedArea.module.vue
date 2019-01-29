<template>
  <div class="content">
    <el-select v-model="selectProvList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="getCityList">
      <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="selectCityList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="getAreaList">
      <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="selectAreaList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="selectAll">
      <el-option v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code">
      </el-option>
    </el-select>
    <el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox>
  </div>
</template>
<script>
export default {
  props: ['data', 'isDis'],
  data() {
    // var tips = (rule, value, callback) => {
    //   // callback()
    // }
    return {
      provList: [{ code: '000000', name: '全部' }],
      cityList: [],
      areaList: [],
      selectProvList: [],
      selectCityList: [],
      selectAreaList: [],
      oldSlectProvList: ['1'],
      oldSelectCityList: ['1'],
      oldSelectAreaList: ['1'],
      isDisabled: false, // 是否禁用
      // rules: {
      //   area: [{required: true, validator: tips}]
      // }
    }
  },
  watch: {
    isDisabled: function (val) {
      if (val) {
        this.cityList = [{ code: '000000', name: '全部' }]
        this.areaList = [{ code: '000000', name: '全部' }]
        this.selectProvList = ['000000']
        this.selectCityList = ['000000']
        this.selectAreaList = ['000000']
        this.done()
      } else {
        this.selectProvList = []
        this.selectCityList = []
        this.selectAreaList = []
        this.cityList = []
        this.areaList = []
      }
    },
  },
  created() {
    this.getProvList()
    this.handleArea()
    if (this.isDis) {
      this.isDisabled = true
    }
  },
  methods: {
    handleArea() {
      if (this.data.provinceArr.length !== 0) {
        this.selectProvList = this.data.provinceArr
        this.getCityList(this.data.provinceArr)
      }
      if (this.data.cityArr.length !== 0) {
        this.selectCityList = this.data.cityArr
        this.getAreaList(this.data.cityArr)
      }
      if (this.data.districtArr.length !== 0) {
        this.selectAreaList = this.data.districtArr
      }
    },
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: [] }, true, res => {
        if (res.ret === '200000') {
          this.provList.push(...res.data)
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取市
    getCityList(val) {
      if (this.provList.length == 1) {
        setTimeout(() => {
          this.getCityList(val)
        }, 1000)
        return
      }
      let allValue = []
      // 保存所有的值
      for (let item of this.provList) {
        allValue.push(item.code)
      }
      // 储存上一次的值 用来进行对比
      const oldVal = this.oldSlectProvList.length === 1 ? [] : this.oldSlectProvList[1]
      if (val.includes('000000')) this.selectProvList = allValue
      // 取消全部选择
      if (oldVal.includes('000000') && !val.includes('000000')) this.selectProvList = []
      // 全选之后取消单个
      if (oldVal.includes('000000') && val.includes('000000')) {
        // 全选也跟着取消
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectProvList = val
      }
      // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectProvList = ['000000'].concat(val)
        }
      }
      this.oldSlectProvList[1] = this.selectProvList
      if (this.selectProvList.length == 0) {
        this.cityList = []
        this.selectCityList = []
        this.areaList = []
        this.selectAreaList = []
        return
      }
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent', { parentArr: this.selectProvList }, true, res => {
          if (res.ret === '200000' && res.data.length > 0) {
            this.cityList = [{ code: '000000', name: '全部'}]
            this.cityList.push(...res.data)
            this.done()
            return
          }
          this.message.error(res.message)
        }
      )
    },
    // 获取区
    getAreaList(val) {
      if (this.cityList.length == 1) {
        setTimeout(() => {
          this.getAreaList(val)
        }, 1000)
        return
      }
      let allValue = []
      for (let item of this.cityList) {
        allValue.push(item.code)
      }
      const oldVal = this.oldSelectCityList.length === 1 ? [] : this.oldSelectCityList[1]
      if (val.includes('000000')) this.selectCityList = allValue
      if (oldVal.includes('000000') && !val.includes('000000')) this.selectCityList = []
      if (oldVal.includes('000000') && val.includes('000000')) {
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectCityList = val
      }
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectCityList = ['000000'].concat(val)
        }
      }
      this.oldSelectCityList[1] = this.selectCityList
      if (this.selectCityList.length == 0) {
        this.areaList = []
        this.selectAreaList = []
        return
      }
      this.$request.post( '/api/saotx/dim/regionByMultiParent', { parentArr: this.selectCityList }, true, res => {
          if (res.ret === '200000' && res.data.length > 0) {
            this.areaList = [{ code: '000000', name: '全部'}]
            this.areaList.push(...res.data)
            this.done()
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    // 选择区
    selectAll(val) {
      if (this.areaList.length == 1) {
        setTimeout(() => {
          this.selectAll(val)
        }, 1000)
        return
      }
      let allValue = []
      for (let item of this.areaList) {
        allValue.push(item.code)
      }
      const oldVal = this.oldSelectAreaList.length === 1 ? [] : this.oldSelectAreaList[1]
      if (val.includes('000000')) this.selectAreaList = allValue
      if (oldVal.includes('000000') && !val.includes('000000')) this.selectAreaList = []
      if (oldVal.includes('000000') && val.includes('000000')) {
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectAreaList = val
      }
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectAreaList = ['000000'].concat(val)
        }
      }
      this.oldSelectAreaList[1] = this.selectAreaList
      this.done()
    },
    done() {
      this.$emit('done', {selectP: this.selectProvList, selectC: this.selectCityList, selectA: this.selectAreaList})
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 180px;
}
</style>

