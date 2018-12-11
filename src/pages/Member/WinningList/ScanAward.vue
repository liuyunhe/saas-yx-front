<template>
  <div class="container">
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名/手机号:">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖时间:">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区:">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
      <el-button type="primary" plain @click="exportData">导出搜索结果</el-button>
    </el-card>
    <el-card class="mt20">
      <el-table border :stripe="true" :data="awardList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="活动名称"></el-table-column>
        <el-table-column align="center" prop="name" label="中奖周期"></el-table-column>
        <el-table-column align="center" prop="name" label="中奖人"></el-table-column>
        <el-table-column align="center" prop="name" label="中奖人手机"></el-table-column>
        <el-table-column align="center" prop="name" label="奖品类型"></el-table-column>
        <el-table-column align="center" prop="name" label="奖品名称"></el-table-column>
        <el-table-column align="center" label="中奖时间">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="中奖地区"></el-table-column>
      </el-table>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 10,
        pcode: ''
      },
      total: 11,
      form: {},
      awardList: [
        { name: 'test', status: 1 },
        { name: 'test', status: 2 },
        { name: 'test', status: 2 },
        { name: 'test', status: 1 },
        { name: 'test', status: 4 },
        { name: 'test', status: 3 },
        { name: 'test', status: 3 },
        { name: 'test', status: 3 },
        { name: 'test', status: 3 },
        { name: 'test', status: 3 },
        { name: 'test', status: 3 },
      ]
    }
  },
  methods: {
    getAwardList() {},
    handleSizeChange(newSize) {
      this.params.pagesize = newSize
      this.getAwardList()
    },
    handleCurrentChange(newPage) {
      this.params.pageNo = newPage
      this.getAwardList()
    },
    //导出
    exportData(){
      var url = "/api/saotx/order/export"
      var xhr = new XMLHttpRequest()
      var formData = new FormData()
      for(var attr in this.form) {
        formData.append(attr, this.form[attr])
      }
      xhr.overrideMimeType("text/plain; charset=x-user-defined")
      xhr.open('POST', url, true)
      xhr.responseType = "blob"
      xhr.responseType = "arraybuffer"
      xhr.setRequestHeader("token", sessionStorage.getItem('access_token'))
      xhr.setRequestHeader("loginId", sessionStorage.getItem('access_loginId'))
      xhr.onload = function(res) {
        if (this.status == 200) {
          var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'})
          var respHeader = xhr.getResponseHeader("Content-Disposition")
          var fileName = decodeURI(respHeader.match(/filename=(.*?)(;|$)/)[1])
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
          } else {
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        }
      }
      xhr.send(formData)
    },
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  max-width: 300px;
}
</style>

