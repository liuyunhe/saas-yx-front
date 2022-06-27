<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="list">刷新</el-button>
      </el-row>
      <el-row style="margin-top: 20px">
        <span >列表中展示为“不限扫码次数和领奖次数”的活动相关信息</span>
      </el-row>
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
        <el-table-column prop="actCode" label="活动code" align="center"></el-table-column>
        <el-table-column prop="note" label="活动备注名称" align="center"></el-table-column>
        <el-table-column prop="utime" label="添加时间" align="center"></el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: { // 分页
        total: 0
      },
      tableList: [],

      form: {
        show: false, // 增库弹框是否展示
        id: '',
        shopImg: '',
        licenseImg: '',
        auditStatus: ''
      },
      loading:false
    }
  },
  created() {
    this.list();
  },
  methods: {
    currentChange(page) {
      // 分页pageNo变更监听
      this.list(event, page);
    },
    sizeChange(pageSize) {
      // 分页pageNo变更监听
      this.list(event, null, pageSize);
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(total) {
      if(total) {
        this.pagination.total = total;
      }
    },
    // 重置查询
    reset() {
      this.list();
    },
    // 查询礼品库列表数据
    list() {
      this.$request.post('/api/wiseqr/actSpecialConf/awdRcvLimitList', {}, false, (res)=>{
        if (res.ret == '200000') {
          this.tableList = res.data.confList || [];
        }else {
          this.$message.error(res.msg);
        }
      });
    },
  }
}
</script>

<style scoped>
.space {position:relative;width:100%;height:20px;}
.el-input, .el-select {
  width: 200px;
}
</style>
