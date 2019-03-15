<template>
  <div class="container">
    <el-card>
      <el-form inline>
        <el-form-item label="昵称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input-number :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="用户等级：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary">查询</el-button>
        <el-button plain>重置</el-button>
      </div>
    </el-card>
    <el-button plain class="mt20 mb20">导出</el-button>
    <el-card>
      <el-table v-loading="load" border>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="头像" align="center"></el-table-column>
        <el-table-column label="手机号" align="center"></el-table-column>
        <el-table-column label="性别" align="center"></el-table-column>
        <el-table-column label="等级" align="center"></el-table-column>
        <el-table-column label="积分" align="center"></el-table-column>
        <el-table-column label="成长值" align="center"></el-table-column>
        <el-table-column label="地区" align="center"></el-table-column>
        <el-table-column label="注册时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>
       <el-pagination class="mt20" background @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage4: 10,
      total: 100,
      load: true
    }
  },
  methods: {
    handleCurrentChange() {}
  }
}
</script>
<style lang="scss" scoped>
.el-input-number {
  width: 200px;
}
</style>
