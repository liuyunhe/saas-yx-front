<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="wrapper">
      <el-card>
        <p class="title">订单详情</p>
        <div class="con">
          <!-- <span>订单号：{{data.orderId}}</span> -->
          <span>订单号：{{data.orderId}}</span>
          <span>用户名称：{{data.nickName}}</span>
          <span>微信号：{{data.nickName}}</span>
          <span>领取时间：{{new Date(data.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
          <span>获奖地区：郑州市</span>
        </div>
      </el-card>
      <el-form label-width="130px" class="mt20 ml20">
        <el-form-item label="礼品名称：">
          <el-input :disabled="data.orderStatus >= 1" v-model="data.giftName"></el-input>
        </el-form-item>
        <div class="title mb20">收货人信息</div>
        <el-form-item label="收货人：">
          <el-input :disabled="data.orderStatus >= 1" v-model="data.getUserName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input :disabled="data.orderStatus >= 1" type="tel" v-model="data.mobile" :maxlength="13"></el-input>
        </el-form-item>
        <el-form-item label="收货地址：">
          <el-select :disabled="data.orderStatus >= 1" v-model="selectProvList" placeholder="请选择" @change="getCityList">
            <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select :disabled="data.orderStatus >= 1" v-model="selectCityList" placeholder="请选择" @change="getAreaList">
            <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select :disabled="data.orderStatus >= 1" v-model="selectAreaList" placeholder="请选择">
            <el-option v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-input :disabled="data.orderStatus >= 1" v-model="data.address"></el-input>
        </el-form-item>
      </el-form>
      <div class="title mb20 ml20">订单跟踪</div>
      <div class="info">
        <p v-if="data.orderStatus >= 0"><span>下单时间：{{new Date(data.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</span><span>订单状态：待发货</span></p>
        <p v-if="data.orderStatus >= 1"><span>发货时间：{{new Date(data.shipTime).Format('yyyy-MM-dd hh:mm:ss')}}</span><span>订单状态：已发货</span><span>物流号：{{data.trackingNumber}}</span></p>
        <!-- <p v-if="data.orderStatus >= 2"><span>收货时间：2016.09.16 12:11:56</span><span>订单状态：已完成</span></p> -->
      </div>
      <div class="btn mt20">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button plain @click="$router.back(-1)">返回列表</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      data: {
        orderId: '',
        nickName: '',
        ctime: '',
        giftName: '',
        getUserName: '',
        mobile: '',
        orderStatus: '',
        address: ''
      },
      provList: [],
      cityList: [],
      areaList: [],
      selectProvList: [],
      selectCityList: [],
      selectAreaList: [],
    }
  },
  created() {
    this.getProvList()
  },
  mounted() {
    if (!this.id) return this.$router.push('/orders/member')
    const loading = this.$loading({target: '.wrapper'})
    this.getDetail(() => loading.close())
    // this.getDetail()
  },
  methods: {
    getDetail(callback) {
      this.$request.post('/api/saotx/mborder/detail', {orderId: this.id}, true, res => {
        if (res.ret === '200000') {
          this.data = res.data
          if (this.data.provinceCode) {
            this.selectProvList = this.data.provinceCode + ''
            this.getCityList(() => {
              if (this.data.cityCode) {
                this.selectCityList = this.data.cityCode + ''
                this.getAreaList(() => {
                  if (this.data.countyCode) {
                    this.selectAreaList = this.data.countyCode + ''
                    callback && callback()
                  } else {
                    callback && callback()
                  }
                })
              } else {
                callback && callback()
              }
            })
          } else {
            callback && callback()
          }
          return
        }
        this.$message.error(res.message)
      })
    },
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: [] }, true, res => {
        if (res.ret === '200000') {
          this.provList = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    getCityList(callback) {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: [this.selectProvList] }, true, res => {
        if (res.ret === '200000' && res.data.length > 0) {
          this.cityList = res.data
          callback && callback()
          return
        }
        this.message.error(res.message)
        }
      )
    },
    getAreaList(callback) {
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent', { parentArr: [this.selectCityList] }, true, res => {
          if (res.ret === '200000' && res.data.length > 0) {
            this.areaList = res.data
            callback && callback()
            return
          }
          this.message.error(res.message)
        }
      )
    },
    save() {
      this.data.provinceCode = this.selectProvList
      this.data.cityCode = this.selectCityList
      this.data.countyCode = this.selectAreaList
      if (this.data.mobile && !(/^1[34578]\d{9}$/.test(this.data.mobile))) return this.$message.error('手机号填写错误')
      this.$request.post('/api/saotx/mborder/modifyReceiptInfo', this.data, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功')
          setTimeout(() => {
            this.$router.push('/orders/member')
          }, 500);
          return
        }
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p.title {
  margin-bottom: 0;
}
.con {
  span {
    margin-top: 20px;
    display: inline-block;
    margin-left: 60px;
  }
}
.el-input {
  width: 300px;
}
.el-input-number {
  width: 300px;
}
.info {
  padding-left: 65px;
  span + span {
    margin-left: 50px;
  }
}
.btn {
  text-align: center;
}
.el-select {
  width: 140px;
}
</style>
