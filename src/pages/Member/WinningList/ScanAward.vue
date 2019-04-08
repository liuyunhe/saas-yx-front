<template>
  <div class="container">
    <el-card>
      <el-form :model="queryParams" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名/手机号:">
              <el-input :clearable="true" v-model="queryParams.keywords" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <time-module :queryParams="queryParams" @init="init"></time-module>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区:">
              <region-select :queryParams="queryParams"></region-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <form-btn :num="1" :queryParams="queryParams" @init="init"></form-btn>
    </el-card>
    <el-card class="mt20">
      <el-table border :v-loading="loading" :stripe="true" :data="awardList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="activityName" label="活动名称"></el-table-column>
        <el-table-column align="center" prop="termName" label="中奖周期"></el-table-column>
        <el-table-column align="center" prop="prizeWinner" label="中奖人"></el-table-column>
        <el-table-column align="center" prop="mobile" label="中奖人手机"></el-table-column>
        <el-table-column align="center" prop="awardType" label="奖品类型"></el-table-column>
        <el-table-column align="center" prop="awardName" label="奖品名称"></el-table-column>
        <el-table-column align="center" prop="term" label="中奖时间"></el-table-column>
        <el-table-column align="center" label="中奖地区">
          <template slot-scope="scope">
            <span>{{scope.row.awardProvince}}-{{scope.row.awardCity}}{{scope.row.awardDistrict ? '-' + scope.row.awardDistrict : ''}}</span>
          </template>
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
        activityCode: 'ACT-ZCQ2JKDBBBBB',
        awardProv: [],
        awardCity: [],
        stime: '',
        etime: '',
        orderCode: '',
        awardType: '',
        selType: '2',
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        status: '',
        queryTimeArr: [],
        oldDate: '',
        nowDate: ''
      },
      total: null,
      form: {},
      awardList: [],
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
      this.$request.post('/api/wiseqr/md/orders', this.queryParams, true, res => {
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

