<template>
  <div class="content">
    <el-table border :v-loading="loading" :stripe="true" :data="awardList" tooltip-effect="dark" style="width: 100%">
      <el-table-column align="center" prop="orderCode" label="订单号"></el-table-column>
      <el-table-column align="center" prop="activityName" label="活动名称"></el-table-column>
      <el-table-column align="center" prop="prizeWinner" label="中奖人"></el-table-column>
      <el-table-column align="center" prop="mobile" label="中奖人手机号"></el-table-column>
      <el-table-column align="center" prop="awardType" label="奖品类型">
        <template slot-scope="scope">
          <span>{{prizeType[scope.row.awardType]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="awardName" label="奖品名称"></el-table-column>
      <el-table-column align="center" prop="term" label="中奖时间">
        <template slot-scope="scope">
          {{new Date(scope.row.ctime).Format('yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="中奖地区">
        <template slot-scope="scope">
          <span>{{scope.row.awardProvince}}{{scope.row.awardCity ? '-' + scope.row.awardCity : ''}}{{scope.row.awardDistrict ? '-' + scope.row.awardDistrict : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="orderStatus" label="状态"></el-table-column>
      <el-table-column align="center" label="操作项">
        <template slot-scope="scope"><el-button type="text" v-if="scope.row.awardType == 1 && scope.row.status != 1" @click="goDetailPage(scope.row.orderCode)">详情</el-button></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ['awardList', 'loading'],
  data() {
    return {
      prizeType: {
        '1': '实物',
        '201': '折扣卡',
        '202': '翻倍卡',
        '3': '红包',
        '6': '积分'
      },
    }
  },
  methods: {
    goDetailPage(code) {
      this.$router.push('/memberday/order/commonAwardDetail?orderCode=' + code)
    }
  }
}
</script>
