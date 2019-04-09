<template>
  <div>
    <el-button type="primary" @click="queryAwardList">查询</el-button>
    <el-button @click="reset">重置</el-button>
    <el-upload
      v-if="num == 2"
      class="upload"
      action="/api/wiseqr/md/import"
      :headers="headers"
      :on-success="handleSourceFileSuccess"
      :on-remove="handleSourceFileRemove"
      :file-list="sourceFiles"
      :before-upload="beforeAvatarUpload"
      :auto-upload="true">
        <el-button type="primary" plain>导入物流信息</el-button>
    </el-upload>
    <el-button type="primary" plain @click="exportData">导出搜索结果</el-button>
  </div>
</template>
<script>
export default {
  props: {
    isBaseAward: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      required: true
    },
    selectedOptions: {
      type: Array,
      required: true
    },
    queryParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      sourceFiles: [],
    }
  },
  methods: {
    queryAwardList() {
      this.queryParams.pageNo = 1
      this.queryParams.pageSize = 10
      this.$emit('init')
    },
    reset() {
      if (this.isBaseAward) {
        this.queryParams.activityCode = 'ACT-ZCQ2JKDU6EP8'
      }
      this.queryParams.awardProv = []
      this.queryParams.awardCity = []
      this.queryParams.stime = this.queryParams.oldDate
      this.queryParams.etime = this.queryParams.nowDate
      this.queryParams.status = ''
      this.queryParams.orderCode = ''
      this.queryParams.awardType = ''
      this.queryParams.selType = null
      this.queryParams.keywords = ''
      this.queryParams.pageNo = 1
      this.queryParams.pageSize = 10
      this.queryTimeArr = [this.queryParams.oldDate, this.queryParams.nowDate]
      this.queryParams.selectedOptions = []
      this.$emit('init')
    },
    exportData(){//导出
      var that = this
      var url = "/api/wiseqr/md/orderExport"
      var xhr = new XMLHttpRequest()
      var formData = new FormData()
      for(var attr in this.queryParams) {
        formData.append(attr, this.queryParams[attr])
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
    beforeAvatarUpload(file) {
      const xlsOrXlsx = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!xlsOrXlsx) {
        this.$message.error('上传文件的格式只支持 XLS 或 XLSX !')
      }
      return xlsOrXlsx
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  display: inline-block;
}
.upload {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
</style>

