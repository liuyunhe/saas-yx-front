<template>
  <div class="container">
    <el-card>
      <el-form :model="queryParams" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名/手机号:">
              <el-input :clearable="true" v-model="queryParams.keywords" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="中奖时间:">
               <el-date-picker @change="handleTimeLimit" v-model="queryTimeArr" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中奖地区:">
              <el-cascader  :clearable="true" :options="provList" @change="handleRegion" v-model="selectedOptions" @active-item-change="handleItemChange" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="queryAwardList">查询</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" plain @click="exportData">导出搜索结果</el-button>
    </el-card>
    <el-card class="mt20">
      <el-table border :v-loading="loading" :stripe="true" :data="awardList" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="activityName" label="活动名称"></el-table-column>
        <el-table-column align="center" prop="termName" label="中奖周期"></el-table-column>
        <el-table-column align="center" prop="prizeWinner" label="中奖人"></el-table-column>
        <el-table-column align="center" prop="mobile" label="中奖人手机"></el-table-column>
        <el-table-column align="center" prop="awardType" label="奖品类型"></el-table-column>
        <el-table-column align="center" prop="awardName" label="奖品名称"></el-table-column>
        <el-table-column align="center" prop="term" label="中奖时间"></el-table-column>
        <el-table-column align="center" label="中奖地区">
          <template slot-scope="scope">
            <span>{{scope.row.awardProvince}}-{{scope.row.awardCity}}{{scope.row.awardDistrict ? '-' + scope.row.awardDistrict : ''}}</span>
          </template>
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
        activityCode: 'ACT-ZCQ2JKDBBBBB',
        awardProv: [],
        awardCity: [],
        stime: '',
        etime: '',
        orderCode: '',
        awardType: '',
        selType: '2',
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        status: ''
      },
      total: null,
      form: {},
      awardList: [],
      queryTimeArr: [],
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      },
      selectedOptions: [],
      provList: [],
      cityList: [],
      loading: true
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
      this.getAwardList()
    },
    handleSizeChange(newSize) {
      this.queryParams.pageSize = newSize
      this.getAwardList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNo = newPage
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
    async handleItemChange(val) {
      this.provList.forEach((item, index) => {
        if (val.indexOf(item.name) > -1 && !item.children.length) {
          this.getCityList(item.code, index)
          return
        }
      })
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
    //导出
    exportData(){
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
  }
}
</script>
<style lang="scss" scoped>
.el-card {
  min-width: 1100px;
}
.el-input {
  max-width: 300px;
}
</style>

