<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="queryParams" label-width="90px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="活动名称：">
              <el-select v-model="queryParams.activityCode">
                <el-option v-for="(item, index) in actName" :label="item.name" :value="item.code" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <time-module :queryParams="queryParams" @init="init"></time-module>
          </el-col>
          <el-col :span="8">
            <el-form-item label="奖品类型：">
              <el-select :clearable="true" v-model="queryParams.awardType" placeholder="请选择活动区域">
                <el-option v-for="(item, index) in awardTypeList" :label="item.name" :value="item.type" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态：">
              <el-select :clearable="true" v-model="queryParams.status" placeholder="请选择">
                <el-option v-for="(item, index) in orderStatusList" :key="index" :label="item.name" :value="item.status"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="关键词：">
              <el-col :span="10">
                <el-select :clearable="true" v-model="queryParams.selType" placeholder="请选择">
                  <el-option v-for="(item, index) in keywordsTypeList" :value="item.type" :label="item.name" :key="index"></el-option>
                </el-select>
              </el-col>
              <el-col :span="14">
                <el-input v-model="queryParams.keywords" :disabled="queryParams.selType ? false : true" placeholder="请输入"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="中奖地区：">
              <region-select :queryParams="queryParams"></region-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <form-btn :num="2" :isBaseAward="true" :queryParams="queryParams" @init="init"></form-btn>
    </el-card>
    <el-card class="mt20">
      <common-list :awardList="awardList" :loading="loading"></common-list>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNo" :page-size="queryParams.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import commonList from './components/commonList'
import timeModule from './components/timeModule'
import formBtn from './components/formBtn'
import regionSelect from './components/regionSelect'
export default {
  components: {
    commonList,
    timeModule,
    formBtn,
    regionSelect
  },
  data() {
    return {
      queryParams: {
        activityCode: 'ACT-ZCQ2JKDU6EP8',
        awardProv: [],
        awardCity: [],
        stime: '',
        etime: '',
        orderCode: '',
        awardType: '',
        selType: '',
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        status: '',
        queryTimeArr: [],
        oldDate: '',
        nowDate: '',
        selectedOptions: []
      },
      actName: [
        {name: '会员日活动', code: 'ACT-ZCQ2JKDU6EP8'},
        {name: '大转盘', code: 'ACT-VS6X49FJ5357'},
        {name: '答题', code: 'ACT-1911YB84P681'},
      ],
      orderStatusList: [
        {name: '待领取', status: 1},
        {name: '已发货', status: 2},
        // {name: '接口类奖品调用异常', status: 3},
        {name: '已领取', status: 6},
        // {name: '待发货', status: 7},
      ],
      awardTypeList: [
        {name: '实物', type: 1},
        {name: '翻倍卡', type: 202},
        {name: '折扣卡', type: 201},
        {name: '红包', type: 3},
        {name: '积分', type: 6},
      ],
      keywordsTypeList: [
        {name: '订单号', type: 1},
        {name: '姓名/手机号', type: 2},
      ],
      form: {},
      awardList: [],
      total: 0,
      loading: true
    }
  },
  created() {
    
  },
  methods: {
    init(arr) {
      if (arr) {
        this.queryParams.nowDate = arr[0]
        this.queryParams.oldDate = arr[1]
      }
      this.getAwardList()
    },
    getAwardList() {
      this.$request.post('/api/saotx/md/orders', this.queryParams, true, res => {
        if (res.ret === '200000') {
          this.awardList = res.data.list
          this.total = res.data.page.count
          this.loading = false
          return
        }
        this.$message.error(res.message)
      })
    },
    handleSizeChange(newSize) {
      this.queryParams.pageSize = newSize
      this.getAwardList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNo = newPage
      this.getAwardList()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-card {
  min-width: 1100px;
}
.el-input {
  max-width: 300px;
}
</style>
