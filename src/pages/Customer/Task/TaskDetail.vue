<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>任务明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-card>
        <el-form inline>
          <el-form-item label="任务名称：">
            <el-input placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <el-form-item label="任务类型：">
            <el-select v-model="selectedType">
              <el-option v-for="(val, key) in options" :key="val" :label="key" :value="val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker @change="c" v-model="selectedTime" type="daterange" format="yyyy/MM/dd" value-format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary">查询</el-button>
          <el-button palin>重置</el-button>
        </div>
      </el-card>
      <el-button type="primary" class="mt20 mb20">导出</el-button>
      <el-table border>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column label="任务名称" align="center"></el-table-column>
        <el-table-column label="任务类型" align="center"></el-table-column>
        <el-table-column label="用户昵称" align="center"></el-table-column>
        <el-table-column label="手机号" align="center"></el-table-column>
        <el-table-column label="用户等级" align="center"></el-table-column>
        <el-table-column label="参与时间" align="center"></el-table-column>
        <el-table-column label="获得积分" align="center"></el-table-column>
        <el-table-column label="获得成长值" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedType: 1,
      selectedTime: '',
      options: {
        '绑定手机号': 1,
        '扫码赚成长值': 2,
        '完善个人资料': 3,
        '关注': 4,
        '签到': 5,
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>

