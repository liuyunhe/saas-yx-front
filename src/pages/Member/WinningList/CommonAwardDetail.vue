<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>实物领奖明细</span>
      </div>
      <span>订单信息</span>
      <el-form class="ml20 mt20" label-position="right" label-width="120px" :model="orderData" inline>
        <el-col>
          <el-form-item label="订单编号：">
            <p style="width: 290px">{{ orderData.orderCode }}</p>
          </el-form-item>
          <el-form-item label="活动名称：">
            <p style="width: 180px">{{ orderData.activityName }}</p>
          </el-form-item>
          <el-form-item label="中奖人：">
            <p>{{ orderData.prizeWinner }}</p>
          </el-form-item>
          <el-form-item label="中奖人手机号：">
            <p>{{ orderData.winnerMobile }}</p>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="微信号：">
            <p style="width: 290px">{{ orderData.prizeWinner }}</p>
          </el-form-item>
          <el-form-item label="奖品类型：">
            <p style="width: 180px">{{ orderData.awardTypeName }}</p>
          </el-form-item>
          <el-form-item label="奖项名称：">
            <p>{{ orderData.awardName }}</p>
          </el-form-item>
        </el-col>
        <el-form-item label="中奖时间：">
          <p style="width: 290px">{{new Date(orderData.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</p>
        </el-form-item>
        <el-form-item label="中奖地区：">
            <p>{{orderData.awardProvince}}/{{orderData.awardCity}}{{!orderData.awardDistrict ? '' : '/' + orderData.awardDistrict}}</p>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <span>收货人信息</span>
      <el-form class="ml20 mt20 edit-form"  label-width="100px" :rules="rules" :model="orderData">
        <el-form-item label="收货人：">
          <el-input :disabled="orderData.status == 2" v-model="orderData.receiver"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input :disabled="orderData.status == 2" v-model="orderData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="收货地址：">
          <el-cascader :disabled="orderData.status == 2" :options="provList" :clearable="true" @change="checkedAddress" v-model="selectedOptions" @active-item-change="handleItemChange" :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input :disabled="orderData.status == 2" type="textarea" autosize resize="none" placeholder="请输入内容" v-model="orderData.detail"></el-input>
        </el-form-item>
      </el-form>
      <el-col><span>收货人信息</span></el-col>
      <el-col class="mt20 mb20 ml20">
        <span class="mr20">下单时间：{{new Date(orderData.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
        <span>状态：{{orderData.orderStatus}}</span>
      </el-col>
      <el-col class="btn">
        <el-button type="primary" v-if="orderData.activityCode == 'ACT-ZCQ2JKDAAAAA' && orderData.status == 2" @click="save">订单跟踪</el-button>
        <el-button type="primary" v-if="orderData.activityCode == 'ACT-ZCQ2JKDAAAAA' && orderData.status !== 2" @click="save">确认发货</el-button>
        <el-button type="primary" v-if="orderData.activityCode !== 'ACT-ZCQ2JKDAAAAA' && orderData.status !== 2" @click="save">保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-col>
    </el-card>
    <super-pop v-if="superConfVisible" @taggle="taggle" @refresh="refresh" :params="orderData"></super-pop>
  </div>
</template>
<script>
import superPop from './components/superPop'
export default {
  props: ['orderCode', 'tsUuid'],
  components: {
    superPop
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号码有误，请重填'));
      } else {
        callback();
      }
    }
    return {
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }]
      },
      orderData: {},
      provList: [],
      cityList: [],
      areaList: [],
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      },
      selectedOptions: [],
      superConfVisible: false
    }
  },
  created() {
    this.getProvList()
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      this.$request.post('/api/saotx/md/orderd', { orderCode: this.orderCode, tsUuid: this.tsUuid }, true, res => {
        if (res.ret === '200000') {
          this.orderData = res.data
          if (this.orderData.province) this.selectedOptions.push(this.orderData.province)
          if (this.orderData.city) {
            this.selectedOptions.push(this.orderData.city)
            this.reverseCheckedCity()
          }
          if (this.orderData.district) this.selectedOptions.push(this.orderData.district)
          return
        }
        this.$message.error(res.message)
      })
    },
    checkedAddress() {
      if (this.selectedOptions.length == 0) {
        this.orderData.province = ''
        this.orderData.city = ''
        this.orderData.district = ''
        return
      } else {
        this.orderData.province = this.selectedOptions[0] ? this.selectedOptions[0] : ''
        this.orderData.city = this.selectedOptions[1] ? this.selectedOptions[1] : ''
        this.orderData.district = this.selectedOptions[2] ? this.selectedOptions[2] : ''
      }
    },
    async handleItemChange(val) {
      if (val.length == 1) {
        this.provList.forEach((item, index) => {
          if (val.indexOf(item.name) > -1 && !item.children.length) {
            this.getCityList(item.code, index)
            return
          }
        })
      } else if (val.length == 2) {
        this.cityList.forEach((item, index) => {
          if (val.indexOf(item.name) > -1 && !item.children.length) {
            this.getAreaList(item.code, index)
            return
          }
        })
      }
    },
    save() {
      if (this.orderData.activityCode != 'ACT-ZCQ2JKDAAAAA') {
        this.$request.post('/api/saotx/md/modifyOrder', this.orderData, true, res => {
          if (res.ret === '200000') return this.$message.success('保存成功')
          this.$message.error(res.message)
        })
        return
      }
      this.orderData.send = 1
      this.superConfVisible = true
    },
    taggle() {
      this.superConfVisible = false
    },
    refresh() {
      this.getOrderDetail()
    },
    reverseCheckedCity() {
      if (this.provList.length != 0) {
        this.provList.forEach((item, index) => {
          if (item.name == this.orderData.province) {
            this.getCityList(item.code, index)
          }
        })
        if (this.orderData.district) this.reverseCheckedArea()
      } else {
        setTimeout(this.reverseCheckedCity, 100)
      }
    },
    reverseCheckedArea() {
      if (this.cityList.length != 0) {
        this.cityList.forEach((item, index) => {
          if (item.name == this.orderData.city) {
            this.getAreaList(item.code, index)
          }
        })
      } else {
        setTimeout(this.reverseCheckedArea, 100)
      }
    },
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', {
        parentArr: []
      }, true, res => {
        if (res.ret === '200000') {
          res.data.map((item) => {
            // 台湾省没有市区
            if (item.code != '710000') {
              item.children = []
            }
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
      params.push(val)
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: params }, true, res => {
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
p {
  margin: 0;
  padding: 0;
}
.edit-form {
  width: 400px;
}
.btn {
  margin: 0 0 20px 200px;
}
.el-form-item {
  margin-right: 20px;
}
.el-cascader {
  width: 280px;
}
</style>
