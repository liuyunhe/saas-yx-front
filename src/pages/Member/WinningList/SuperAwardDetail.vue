<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>实物领奖明细</span>
      </div>
      <span>订单信息</span>
      <el-form class="ml20 mt20" label-position="left" :model="form" inline>
        <el-col>
          <el-form-item label="订单编号：">
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="活动名称：">
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="中奖人：">
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="中奖人手机号：">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="微信号：">
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="奖品类型：">
            <span>{{ form.name }}</span>
          </el-form-item>
          <el-form-item label="奖项名称：">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-form-item label="中奖时间：">
          <span>2018-06-08 12:26:18</span>
        </el-form-item>
        <el-form-item label="中奖地区：">
          <span>浙江省/杭州市/西湖区</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <span>收货人信息</span>
      <el-form class="ml20 mt20 edit-form"  label-width="100px" :model="form">
        <el-form-item label="收货人：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称：">
          <el-cascader :options="provList" @change="clg" v-model="selectedOptions" @active-item-change="handleItemChange" :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input type="textarea" autosize resize="none" placeholder="请输入内容" v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <el-col><span>收货人信息</span></el-col>
      <el-col class="mt20 mb20 ml20">
        <span class="mr20">下单时间：2018-06-08 12:26:18</span>
        <span>状态：发货</span>
      </el-col>
      <el-col class="ml20 mb20">
        <el-button type="primary">确认发货</el-button>
        <el-button>返回</el-button>
      </el-col>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: 'test'
      },
      provList: [],
      cityList: [],
      areaList: [],
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
      selectedOptions: []
    }
  },
  created() {
    this.getProvList()
  },
  methods: {
    getOrderDetail() {
      
    },
    clg() {
      console.log(this.selectedOptions)
    },
    async handleItemChange(val) {
      if (val.length == 1) {
        this.provList.forEach((item, index) => {
          if (val.indexOf(item.code) > -1 && !item.children.length) {
            this.getCityList(val, index)
            // this.test()
            return
          }
        })
      } else if (val.length == 2) {
        this.cityList.forEach((item, index) => {
          if (val.indexOf(item.code) > -1 && !item.children.length) {
            this.getAreaList(val, index)
            return
          }
        })
      }
    },
    test(index) {
      
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
      params.push(val[0])
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent', {
          parentArr: params
        },
        true,
        res => {
          if (res.ret === '200000') {
            res.data.map((item) => {
              item.children = []
            })
            this.cityList = res.data
            this.$set(this.provList[index], 'children', this.cityList)
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    getAreaList(val, index) {
      this.areaList = []
      let params = []
      params.push(val[1])
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent', {
          parentArr: params
        },
        true,
        res => {
          if (res.ret === '200000') {
            this.areaList = res.data
            this.$set(this.cityList[index], 'children', this.areaList)
            // this.children[index].children.push(...this.areaList)
            // this.provList[index].children = []
            // this.provList[index].children.push(...this.cityList)
            return
          }
          this.$message.error(res.message)
        }
      )
    },
  }
}
</script>
<style lang="scss" scoped>
.edit-form {
  width: 400px;
}
.el-form-item {
  margin-right: 20px;
}
</style>
