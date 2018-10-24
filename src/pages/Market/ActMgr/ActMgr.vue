<template>
  <div class="actMgr-container">
    <el-card>
      <el-button type="primary">新建活动</el-button>
      <el-form label-width="80px" label-position="left">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="选择品牌:">
              <el-select v-model="queryActParams.brandCodeArr" multiple placeholder="请选择" @change="getSonBrandList">
                <el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.brandCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择规格:">
              <el-select v-model="queryActParams.snArr" multiple placeholder="请选择">
                <el-option v-for="item in sonBrandList" :key="item.brandCode" :label="item.name" :value="item.brandCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动状态:">
              <el-select v-model="queryActParams.status" placeholder="请选择">
                <el-option v-for="(value, key) in actStatusObj" :key="key" :label="value" :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="关键词:">
              <el-input v-model="queryActParams.keywords" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="2">
            <el-form-item label="地区:">
              <el-select :disabled="isDisabled" v-model="selectProvList" multiple collapse-tags placeholder="请选择" @change="getCityList">
                <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <el-select :disabled="isDisabled" v-model="selectCityList" multiple collapse-tags placeholder="请选择">
                <el-option v-if="cityList" v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="时间段:">
              <el-date-picker v-model="actTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="4">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="actList" border style="width: 100%" :stripe="true">
        <el-table-column type="index" width="50" label="序号" align="center">
        </el-table-column>
        <el-table-column property="hdCode" label="活动编号" align="center" width="180px">
        </el-table-column>
        <el-table-column property="actName" label="活动名称" align="center">
        </el-table-column>
        <el-table-column label="活动时间" align="center">
          <template slot-scope="scope">
            {{scope.row.stimeStr}}至{{scope.row.etimeStr}}
          </template>
        </el-table-column>
        <el-table-column property="statusName" label="状态" align="center" width="100px">
        </el-table-column>
        <el-table-column label="操作" align="center" width="260px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini">复制</el-button>
            <el-dropdown>
              <el-button type="primary" size="mini" style="margin-left: 10px;">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>投放日志</el-dropdown-item>
                <el-dropdown-item>暂停</el-dropdown-item>
                <el-dropdown-item>结束</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryActParams: {
        allFormCode: '',
        brandCodeArr: [],
        cityCodeArr: [],
        etime: '',
        form: '',
        hdCode: '',
        keywords: '',
        pageNo: 1,
        pageSize: 10,
        provinceCodeArr: [],
        snArr: [],
        status: '0',
        stime: ''
      },
      actList: [], // 活动列表
      actStatusObj: {}, // 活动状态
      brandList: [], // 品牌列表
      sonBrandList: [], // 子品牌列表
      provList: [], // 省列表
      selectProvList: [],
      cityList: [], // 市列表
      selectCityList: [],
      isDisabled: false,
      value: '',
      actTime: ''
    }
  },
  created() {
    this.init()
  },
  watch: {
    isDisabled: function(newQuestion, oldQuestion) {
      if (newQuestion) {
        this.selectProvList = []
        this.selectCityList = []
      }
    }
  },
  methods: {
    // 初始化
    init() {
      this.getActList()
      this.getProvList()
      this.getActStatus()
      this.getBrandList()
    },
    // 获取活动列表
    getActList() {
      this.$request.post('/api/saotx/act/list', this.queryActParams, true, res => {
        if (res.ret === '200000') return (this.actList = res.data.list)
        this.$message.error(res.message)
      })
    },
    // 获取活动状态
    getActStatus() {
      this.$request.post('/api/saotx/act/statusSelect', {}, true, res => {
        if (res.ret === '200000') {
          this.actStatusObj = res.data
          this.actStatusObj['0'] = '全部'
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/saotx/prod/listBrand', { pageSize: '-1' }, true, res => {
        if (res.ret === '200000') return this.brandList = res.data.list
      })
    },
    getSonBrandList() {
      if (this.queryActParams.brandCodeArr.length === 0) {
        this.sonBrandList = []
        this.queryActParams.snArr = []
        return
      }
      this.$request.post('/api/saotx/prod/list', { brandCodeArr: this.queryActParams.brandCodeArr, pageSize: '-1' }, true, res => {
        if (res.ret === '200000') return this.sonBrandList = res.data.list
        this.$message.error(res.message)
      })
    },
    // 获取省
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', { parentArr: [] }, true, res => {
        if (res.ret === '200000') {
          this.provList = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取市
    getCityList() {
      if (this.selectProvList.length == 0) {
        this.cityList = []
        this.selectCityList = []
        return
      }
      this.$request.post(
        '/api/saotx/dim/regionByMultiParent',
        { parentArr: this.selectProvList },
        true,
        res => {
          if (res.ret === '200000') {
            this.cityList = res.data
            return
          }
          this.$message.error(res.message)
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  margin: 20px;
}
.el-col {
  vertical-align: middle;
}
</style>
