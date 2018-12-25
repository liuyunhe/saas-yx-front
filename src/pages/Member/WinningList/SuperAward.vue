<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="queryParams" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态：">
              <el-select v-model="checkedStatus" placeholder="请选择活动区域">
                <el-option v-for="(item, index) in statusList" :label="item.name" :value="item.status" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖时间：">
              <el-select v-model="queryParams.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单号：">
              <el-input v-model="queryParams.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名/手机号：">
              <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区：">
              <!-- <el-cascader  :clearable="true" :options="provList" @change="handleRegion" v-model="selectedOptions" @active-item-change="handleItemChange" :props="props"></el-cascader> -->
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
            <span>{{scope.row.awardProvince}}-{{scope.row.awardCity}}{{scope.row.awardDistrict ? '-' + scope.row.awardDistrict : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="状态"></el-table-column>
        <el-table-column align="center" label="操作项">
          <template slot-scope="scope"><el-button type="text" v-if="scope.row.awardType == 1 && scope.row.status != 1" @click="goDetailPage(scope.row.orderCode)">详情</el-button></template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNo" :page-size="queryParams.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
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
        selType: '',
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        status: '',
        authStatus: ''
      },
      statusList: [
        {name: '待领取', status: 1},
        {name: '已发货', status: 2},
        // {name: '接口类奖品调用异常', status: 3},
        {name: '已领取', status: 6},
        // {name: '待发货', status: 7},
        {name: '待审核', status: 11},
        {name: '审核通过', status: 12},
        {name: '审核不通过', status: 14},
      ],
      checkedStatus: '',
      awardList: [],
      total: null,
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      sourceFiles: [],
      selectedOptions: [],
      provList: [],
      cityList: [],
      areaList: [],
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      },
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
    this.getAwardList()
  },
  methods: {
    getAwardList() {
      this.$request.post('/api/saotx/md/orders', this.queryParams, true, res => {
        if (res.ret === '200000') {
          this.awardList = res.data.list
          this.total = res.data.page.count
          return
        }
        this.$message.error(res.message)
      })
    },
    goDetailPage(code) {
      // this.$router.push('/memberday/superAwardDetail?orderCode=' + code)
       this.$router.push('/memberday/baseAwardDetail?orderCode=' + code)
    },
    exportData(){//导出
      var url = "/api/saotx/order/export"
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
.el-input {
  max-width: 300px;
}
.upload {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
</style>
