<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="queryParams" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态：">
              <el-select :clearable="true" v-model="checkedStatus" placeholder="请选择活动区域">
                <el-option v-for="(item, index) in statusList" :label="item.name" :value="item.status" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖时间：">
              <el-date-picker  @change="handleTimeLimit" v-model="queryTimeArr" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单号：">
              <el-input v-model="queryParams.orderCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名/手机号：">
              <el-input v-model="queryParams.keywords" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区：">
              <el-cascader  :clearable="true" :options="provList" @change="handleRegion" v-model="selectedOptions" @active-item-change="handleItemChange" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="queryAwardList">查询</el-button>
      <el-button @click="reset">重置</el-button>
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
      <el-table border :stripe="true" :v-loading="loading" :data="awardList" tooltip-effect="dark" style="width: 100%">
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
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.authStatus" :class="statusColor[scope.row.authStatus]">{{statusType[scope.row.authStatus]}}</span>
            <span v-else :class="statusColor[scope.row.status]">{{statusType[scope.row.status]}}</span>
          </template>
        </el-table-column>
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
        selType: 2,
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        status: '',
        authStatus: ''
      },
      statusList: [
        {name: '待领取', status: 1},
        {name: '已发货', status: 2},
        {name: '已领取', status: 6},
        {name: '待审核', status: 11},
        {name: '审核通过', status: 12},
        {name: '审核不通过', status: 14},
      ],
      statusType: {
        1: '待领取',
        2: '已发货',
        6: '已领取',
        7: '待发货',
        11: '待审核',
        12: '审核通过',
        14: '审核不通过',
      },
      statusColor: {
        1: 'yellow',
        7: 'yellow',
        11: 'yellow',
        14: 'red'
      },
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
      loading: true,
      queryTimeArr: []
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
    this.getProvList()
  },
  methods: {
    getAwardList() {
      this.$request.post('/api/saotx/md/orders', this.queryParams, true, res => {
        if (res.ret === '200000') {
          this.awardList = res.data.list
          this.total = res.data.page.count
          this.loading = false
          return
        }
        this.$message.error(res.message)
      })
    },
    goDetailPage(code) {
      // this.$router.push('/memberday/superAwardDetail?orderCode=' + code)
       this.$router.push('/memberday/order/commonAwardDetail?orderCode=' + code)
    },
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', {
        parentArr: []
      }, true, res => {
        if (res.ret === '200000') {
          res.data.map((item) => {
            item.children = []
          })
          this.provList = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    getCityList(val, index) {
      this.cityList = []
      let params = []
      params.push(val)
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: params }, true, res => {
          if (res.ret === '200000') {
            this.cityList = res.data
            this.$set(this.provList[index], 'children', this.cityList)
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    queryAwardList() {
      this.queryParams.pageNo = 1
      this.queryParams.pageSize = 10
      this.getAwardList()
    },
    reset() {
      this.queryParams.awardProv = []
      this.queryParams.awardCity = []
      this.queryParams.stime = ''
      this.queryParams.etime = ''
      this.queryParams.status = ''
      this.queryParams.orderCode = ''
      this.queryParams.awardType = ''
      this.queryParams.keywords = ''
      this.queryParams.pageNo = 1
      this.queryParams.pageSize = 10
      this.queryTimeArr = ''
      this.selectedOptions = []
      this.checkedStatus = ''
      this.getAwardList()
    },
    handleTimeLimit() {
      if (!this.queryTimeArr) {
        this.queryParams.stime = ''
        this.queryParams.etime = ''
      } else {
        let stime = new Date(this.queryTimeArr[0]).getTime()
        let etime = new Date(this.queryTimeArr[1]).getTime()
        if (((etime - stime) / 1000 / 3600 /24) > 30) {
          this.$message.error('中奖时段间隔查询不能超过30天')
          this.queryTimeArr = ''
          this.queryParams.stime = ''
          this.queryParams.etime = ''
        } else {
          this.queryParams.stime = this.queryTimeArr[0]
          this.queryParams.etime = this.queryTimeArr[1]
        }
      }
    },
    handleRegion() {
      if (this.selectedOptions.length != 0) {
        // 省份要传名称
        this.queryParams.awardProv = [this.selectedOptions[0]]
        this.queryParams.awardCity = [this.selectedOptions[1]]
      } else {
        this.queryParams.awardProv = []
        this.queryParams.awardCity = []
      }
    },
    async handleItemChange(val) {
      this.provList.forEach((item, index) => {
        if (val.indexOf(item.name) > -1 && !item.children.length) {
          this.getCityList(item.code, index)
          return
        }
      })
    },
    exportData(){//导出
      var url = "/api/saotx/md/orderExport"
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
.yellow {
  color: #FF9900;
}
.red {
  color: rgba(255, 0, 0, 0.647058823529412);
}
</style>
