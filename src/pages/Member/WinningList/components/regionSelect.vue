<template>
  <div>
    <el-cascader  :clearable="true" :options="provList" @change="handleRegion" v-model="queryParams.selectedOptions" @active-item-change="handleItemChange" :props="props"></el-cascader>
  </div>
</template>
<script>
export default {
  props: {
    queryParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      provList: [],
      cityList: [],
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      },
    }
  },
  created() {
    this.getProvList()
  },
  methods: {
    handleRegion() {
      if (this.queryParams.selectedOptions.length != 0) {
        // 省份要传名称
        // this.provList.forEach(item => {
        //   if (this.selectedOptions[0] == item.code) {
        //     this.queryParams.awardProv = [item.name]
        //     return
        //   }
        // })
        this.queryParams.awardProv = [this.queryParams.selectedOptions[0]]
        this.queryParams.awardCity = [this.queryParams.selectedOptions[1]]
      } else {
        this.queryParams.awardProv = []
        this.queryParams.awardCity = []
      }
    },
    async handleItemChange(val) {
      this.provList.forEach((item, index) => {
        if (val.indexOf(item.name) > -1 && !item.children.length) {
          this.getCityList(item.code, index)
          return
        }
      })
    },
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', {
        parentArr: []
      }, true, res => {
        if (res.ret === '200000') {
          res.data.map((item) => {
            item.children = []
          })
          this.provList = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    getCityList(val, index) {
      this.cityList = []
      let params = []
      params.push(val)
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: params }, true, res => {
          if (res.ret === '200000') {
            this.cityList = res.data
            this.$set(this.provList[index], 'children', this.cityList)
            return
          }
          this.$message.error(res.message)
        }
      )
    },
  }
}
</script>