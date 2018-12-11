<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖时间">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名/手机号">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
      <el-upload
        class="upload"
        action="/api/saotx/order/import"
        :headers="headers"
        :on-success="handleSourceFileSuccess"
        :on-remove="handleSourceFileRemove"
        :file-list="sourceFiles"
        :auto-upload="true">
          <el-button type="primary" plain>导入物流信息</el-button>
      </el-upload>
      <el-button type="primary" plain @click="exportData">导出搜索结果</el-button>
    </el-card>
    <el-card class="mt20">
      <el-table border :stripe="true" :data="awardList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="订单号"></el-table-column>
        <el-table-column align="center" prop="name" label="中将人"></el-table-column>
        <el-table-column align="center" prop="name" label="中将人手机号"></el-table-column>
        <el-table-column align="center" prop="name" label="奖品类型"></el-table-column>
        <el-table-column align="center" prop="name" label="奖品名称"></el-table-column>
        <el-table-column align="center" label="中奖时间">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="中奖地区"></el-table-column>
        <el-table-column align="center" prop="name" label="状态"></el-table-column>
        <el-table-column align="center" label="操作项">
          <template slot-scope="scope"><el-button type="text" v-if="scope.row.status == 2 || scope.row.status == 3">详情</el-button></template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      awardList: [
        /**
         * 模拟数据
         * 状态 
         * status = 1 => 已领取
         * status = 2 => 待发货
         * status = 3 => 已发货
         * status = 4 => 待领取
         * status = 5 => 待审核
         * status = 6 => 审核通过
         * status = 7 => 审核不通过 
         */
        { name: 'test', status: 1 },
        { name: 'test', status: 2 },
        { name: 'test', status: 6 },
        { name: 'test', status: 1 },
        { name: 'test', status: 4 },
        { name: 'test', status: 3 },
        { name: 'test', status: 5 },
        { name: 'test', status: 3 },
        { name: 'test', status: 6 },
        { name: 'test', status: 3 },
        { name: 'test', status: 7 },
      ],
      params: {
        pageNo: 1,
        pageSize: 10,
        pcode: ''
      },
      total: 11,
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      sourceFiles: []
    }
  },
  methods: {
    getAwardList() {},
    exportData(){//导出
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
    // 文件上传控制。成功之后的回调
    handleSourceFileSuccess(res, file) {
      if(res.ret==200000) {
        this.$message({type:'success', message:res.data})
        let obj = {name:res.data.sourceFile, sourceCode:res.data.sourceCode, count:res.data.successCount}
        this.sourceFiles.push(obj)
      } else {
        this.$message.error(res.message)
      }
    },
    // 卡密文件上传之后，删除文件
    handleSourceFileRemove(file, fileList) {
      this.sourceFiles = []; // 清空上传文件内容的引用
    },
    handleSizeChange(newSize) {
      this.params.pagesize = newSize
      this.getAwardList()
    },
    handleCurrentChange(newPage) {
      this.params.pageNo = newPage
      this.getAwardList()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  max-width: 300px;
}
.upload {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
</style>
