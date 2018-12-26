<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="queryParams" label-width="90px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="活动名称：">
              <el-select v-model="queryParams.activityCode">
                <el-option v-for="(item, index) in actName" :label="item.name" :value="item.code" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="中奖时段：">
              <el-date-picker @change="handleTimeLimit" v-model="queryTimeArr" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="奖品类型：">
              <el-select :clearable="true" v-model="queryParams.awardType" placeholder="请选择活动区域">
                <el-option v-for="(item, index) in awardTypeList" :label="item.name" :value="item.type" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态：">
              <el-select :clearable="true" v-model="queryParams.status" placeholder="请选择">
                <el-option v-for="(item, index) in orderStatusList" :key="index" :label="item.name" :value="item.status"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="关键词：">
              <el-col :span="10">
                <el-select :clearable="true" v-model="queryParams.selType" placeholder="请选择">
                  <el-option v-for="(item, index) in keywordsTypeList" :value="item.type" :label="item.name" :key="index"></el-option>
                </el-select>
              </el-col>
              <el-col :span="14">
                <el-input v-model="queryParams.keywords" :disabled="queryParams.selType ? false : true" placeholder="请输入"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
        action="/api/saotx/md/import"
        :headers="headers"
        :on-success="handleSourceFileSuccess"
        :on-remove="handleSourceFileRemove"
        :file-list="sourceFiles"
        :before-upload="beforeAvatarUpload"
        :auto-upload="true">
          <el-button type="primary" plain>导入物流信息</el-button>
      </el-upload>
      <el-button type="primary" plain @click="exportData">导出搜索结果</el-button>
    </el-card>
    <el-card class="mt20">
      <common-list :awardList="awardList" :loading="loading"></common-list>
      <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNo" :page-size="queryParams.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import commonList from './components/commonList'
export default {
  components: {
    commonList
  },
  data() {
    return {
      queryParams: {
        activityCode: 'ACT-ZCQ2JKDU6EP8',
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
        status: ''
      },
      queryTimeArr: [],
      actName: [
        {name: '会员日活动', code: 'ACT-ZCQ2JKDU6EP8'},
        {name: '大转盘', code: 'ACT-VS6X49FJ5357'},
        {name: '答题', code: 'ACT-1911YB84P681'},
      ],
      orderStatusList: [
        {name: '待领取', status: 1},
        {name: '已发货', status: 2},
        // {name: '接口类奖品调用异常', status: 3},
        {name: '已领取', status: 6},
        // {name: '待发货', status: 7},
      ],
      awardTypeList: [
        {name: '实物', type: 1},
        {name: '翻倍卡', type: 202},
        {name: '折扣卡', type: 201},
        {name: '红包', type: 3},
        {name: '积分', type: 6},
      ],
      keywordsTypeList: [
        {name: '订单号', type: 1},
        {name: '姓名/手机号', type: 2},
      ],
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      },
      selectedOptions: [],
      provList: [],
      cityList: [],
      form: {},
      awardList: [],
      total: 0,
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      sourceFiles: [],
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
      this.queryParams.activityCode = 'ACT-ZCQ2JKDU6EP8'
      this.queryParams.awardProv = []
      this.queryParams.awardCity = []
      this.queryParams.stime = ''
      this.queryParams.etime = ''
      this.queryParams.status = ''
      this.queryParams.orderCode = ''
      this.queryParams.awardType = ''
      this.queryParams.selType = null
      this.queryParams.keywords = ''
      this.queryParams.pageNo = 1
      this.queryParams.pageSize = 10
      this.queryTimeArr = ''
      this.selectedOptions = []
      this.getAwardList()
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
    handleRegion() {
      if (this.selectedOptions.length != 0) {
        // 省份要传名称
        // this.provList.forEach(item => {
        //   if (this.selectedOptions[0] == item.code) {
        //     this.queryParams.awardProv = [item.name]
        //     return
        //   }
        // })
        this.queryParams.awardProv = [this.selectedOptions[0]]
        this.queryParams.awardCity = [this.selectedOptions[1]]
      } else {
        this.queryParams.awardProv = []
        this.queryParams.awardCity = []
      }
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
    async handleItemChange(val) {
      this.provList.forEach((item, index) => {
        if (val.indexOf(item.name) > -1 && !item.children.length) {
          this.getCityList(item.code, index)
          return
        }
      })
    },
    exportData(){//导出
      var that = this
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
.el-input {
  max-width: 300px;
}
.upload {
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
}
</style>
