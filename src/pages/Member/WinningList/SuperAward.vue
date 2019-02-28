<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="queryParams" label-width="110px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="状态：">
              <el-select :clearable="true" v-model="checkedStatus" placeholder="请选择活动区域">
                <el-option v-for="(item, index) in statusList" :label="item.name" :value="item.status" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <time-module :queryParams="queryParams" @init="init"></time-module>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单号：">
              <el-input v-model="queryParams.orderCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名/手机号：">
              <el-input v-model="queryParams.keywords" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区：">
              <region-select :queryParams="queryParams"></region-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <form-btn :num="2" :queryParams="queryParams" @init="init"></form-btn>
    </el-card>
    <el-card class="mt20">
      <el-table border :stripe="true" :v-loading="loading" :data="awardList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="index" width="55" label="序号"></el-table-column>
        <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
        <!-- <el-table-column align="center" prop="orderCode" label="订单号"></el-table-column> -->
        <el-table-column align="center" prop="activityName" label="活动名称"></el-table-column>
        <el-table-column align="center" prop="prizeWinner" label="中奖人"></el-table-column>
        <el-table-column align="center" prop="mobile" label="中奖人手机号"></el-table-column>
        <el-table-column align="center" prop="awardTypeName" label="奖品类型"></el-table-column>
        <el-table-column align="center" prop="awardName" label="奖品名称"></el-table-column>
        <el-table-column align="center" prop="term" label="中奖时间"></el-table-column>
        <el-table-column align="center" label="中奖地区">
          <template slot-scope="scope">
            <span>{{scope.row.awardProvince}}{{scope.row.awardCity ? '-' + scope.row.awardCity : ''}}{{scope.row.awardDistrict ? '-' + scope.row.awardDistrict : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.authStatus" :class="statusColor[scope.row.authStatus]">{{statusType[scope.row.authStatus]}}</span>
            <span v-else :class="statusColor[scope.row.status]">{{statusType[scope.row.status]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作项">
          <template slot-scope="scope"><el-button type="text" v-if="scope.row.awardType == 1 && scope.row.status != 1" @click="goDetailPage(scope.row.orderCode, scope.row.tsUuid)">详情</el-button></template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNo" :page-size="queryParams.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import timeModule from './components/timeModule'
import formBtn from './components/formBtn'
import regionSelect from './components/regionSelect'
export default {
  components: {
    timeModule,
    formBtn,
    regionSelect
  },
  data() {
    return {
      queryParams: {
        activityCode: 'ACT-ZCQ2JKDAAAAA',
        awardProv: [],
        awardCity: [],
        stime: '',
        etime: '',
        orderCode: '',
        awardType: '',
        selType: 2,
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        status: '',
        authStatus: '',
        queryTimeArr: [],
        oldDate: '',
        nowDate: ''
      },
      statusList: [
        {name: '待领取', status: 1},
        {name: '已领取', status: 6},
        {name: '已发货', status: 2},
        {name: '待审核', status: 11},
        {name: '审核通过', status: 12},
        {name: '审核不通过', status: 14},
      ],
      statusType: {
        1: '待领取',
        2: '已发货',
        6: '已领取',
        7: '待发货',
        11: '待审核',
        12: '审核通过',
        14: '审核不通过',
      },
      statusColor: {
        1: 'yellow',
        7: 'yellow',
        11: 'yellow',
        14: 'red'
      },
      checkedStatus: '',
      awardList: [],
      total: null,
      loading: true
    }
  },
  watch: {
    checkedStatus(val) {
      if (val <= 6) {
        this.queryParams.authStatus = ''
        this.queryParams.status = val
      } else {
        this.queryParams.status = ''
        this.queryParams.authStatus = val
      }
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
    goDetailPage(code, tsUuid) {
      // this.$router.push('/memberday/superAwardDetail?orderCode=' + code)
      let toUrl = "/memberday/order/commonAwardDetail";
      toUrl += "?orderCode=" + (code?code:"");
      toUrl += "&tsUuid=" + (tsUuid?tsUuid:"");
      this.$router.push(toUrl);
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
.upload {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
.yellow {
  color: #FF9900;
}
.red {
  color: rgba(255, 0, 0, 0.647058823529412);
}
</style>
