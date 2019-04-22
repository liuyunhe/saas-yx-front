<template>
  <div class="container">
    <el-card>
      <el-card>
        <el-form :model="queryParams" inline>
          <el-form-item label="用户名称：">
            <el-input placeholder="请输入用户名称" v-model="queryParams.nickName"></el-input>
          </el-form-item>
          <el-form-item label="发货状态：">
            <el-select v-model="queryParams.orderStatus">
              <el-option v-for="(item, index) in orderStatusList" :key="index" :label="item.name" :value="item.val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户等级：">
            <el-select v-model="queryParams.gradeCode">
              <el-option v-for="(item, index) in lvlList" :key="index" :label="item.gradeNumber" :value="item.gradeCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号：">
            <el-input placeholder="请输入订单号" v-model="queryParams.orderId"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="getOrderList(1)">查询</el-button>
          <el-button plain @click="reset">重置</el-button>
        </div>
      </el-card>
      <div class="btn mt20 mb20">
        <el-button type="primary" plain @click="exportData">导出搜索结果</el-button>
        <el-upload
          class="upload"
          action="/api/wiseqr/mborder/importOrder"
          :headers="headers"
          :on-success="handleSourceFileSuccess"
          :on-remove="handleSourceFileRemove"
          :file-list="sourceFiles"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true">
            <el-button type="primary" plain>导入物流信息</el-button>
        </el-upload>
      </div>
      <el-table v-loading="load" border :data="orderList">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="orderId" label="订单号" align="center"></el-table-column>
        <el-table-column prop="nickName" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="mobile" label="用户手机号" align="center"></el-table-column>
        <el-table-column prop="gradeName" label="用户等级" align="center"></el-table-column>
        <el-table-column prop="rightName" label="权益名称" align="center"></el-table-column>
        <el-table-column prop="giftName" label="奖品" align="center"></el-table-column>
        <el-table-column prop="name" label="订单状态" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus == 0 ? '待发货' : scope.row.orderStatus == 1 ? '已发货' : '已领取'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push(`/orders/member/detail?id=${scope.row.orderId}`)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt20" background @current-change="handleCurrentChange" :current-page="this.queryParams.pageNo" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      load: true,
      queryParams: {
        orderId:'',
        orderStatus:'',
        gradeCode:'',
        nickName:'',
        pageNo: 1,
        pageSize: 10
      },
      orderStatusList: [
        {name: '待发货', val: 0},
        {name: '已发货', val: 1},
        {name: '已领取', val: 2}
      ],
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      sourceFiles: [],
      total: 0,
      currentPage4: 0,
      orderList: [],
      lvlList: []
    }
  },
  mounted() {
    this.getOrderList()
    this.getLvlList()
  },
  methods: {
    getOrderList(flg) {
      if (flg) {
        this.queryParams.pageNo = 1
        this.pageSize = 10
      }
      this.load = true
      this.$request.post('/api/wiseqr/mborder/list', this.queryParams, true, res => {
        if (res.ret === '200000') {
          this.orderList = res.data.list
          this.total = res.data.page.pageCount
          this.load = false
          return
        }
        this.$message.error(res.message)
      })
    },
    getLvlList() {
      this.$request.post('/api/wiseqr/mbgrade/list', {}, true, res => {
        if (res.ret === '200000') {
          this.lvlList = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    reset() {
      this.queryParams.orderId = ''
      this.queryParams.orderStatus = ''
      this.queryParams.gradeCode = ''
      this.queryParams.nickName = ''
      this.getOrderList(1)
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNo = newPage
      this.getOrderList()
    },
    // 文件上传控制。成功之后的回调
    handleSourceFileSuccess(res, file) {
      if(res.ret==200000) {
        // this.$message({type:'success', message:res.data})
        this.$message.succecc('上传成功')
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
    },
    exportData(){//导出
      var that = this
      var url = "/api/wiseqr/mborder/exportOrder"
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
  }
}
</script>

<style lang="scss" scoped>
.elinput {
  max-width: 300px;
}
.upload {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
</style>
