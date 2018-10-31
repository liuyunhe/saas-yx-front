<template>
  <div class="actMgr-container">
    <el-card>
      <el-button type="primary" class="ml20" @click="addAct">新建活动</el-button>
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
          <el-col>
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
    <!-- 新建活动弹框 -->
    <el-dialog :visible.sync="addActDialogVisible" width="900px" :close-on-click-modal="false">
      <div class="act-wrap">
        <div class="title">
          <ul>
            <li v-for="(item, index) in actFormName" :key="index" @click="getCheckedAct(item, index)" :class="index == nowActiveIndex ? 'active' : ''">{{item.name}}</li>
          </ul>
          <div style="clear: both"></div>
        </div>
        <div v-if="actForms">
          <div class="act-item" v-for="item in actForms" :key="item.id">
            <img :src="item.extUrl" :alt="item.name">
            <p>{{item.name}}<i class="el-icon-circle-plus" @click="goAddActTpl()"></i></p>
          </div>
        </div>
        <div v-else>暂无</div>
      </div>
      <el-col :span="24" v-if="actForms">
        <el-pagination background @size-change="actHandleSizeChange" @current-change="actHandleCurrentChange" :current-page="actParams.pageNo" :page-size="actParams.pageSize" layout="total, prev, pager, next, jumper" :total="actTotal">
        </el-pagination>
      </el-col>
      <div style="clear: both"></div>
    </el-dialog>
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
      addActDialogVisible: false,
      actFormName: [
        { name: '全部', code: '' },
        // { name: '抽奖活动' },
        // { name: '集道具活动' },
        // { name: '红包雨活动' },
        // { name: '竞猜活动' },
        // { name: '问答活动' },
        // { name: '自定义活动' }
      ],
      actParams: {
        pageNo: 1,
        pageSize: 4,
        pcode: ''
      },
      actForms: [],
      actTotal: 0,
      nowActiveIndex: 0,
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
      this.getActCodeList()
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
        if (res.ret === '200000') return (this.brandList = res.data.list)
      })
    },
    getSonBrandList() {
      if (this.queryActParams.brandCodeArr.length === 0) {
        this.sonBrandList = []
        this.queryActParams.snArr = []
        return
      }
      this.$request.post(
        '/api/saotx/prod/list',
        { brandCodeArr: this.queryActParams.brandCodeArr, pageSize: '-1' },
        true,
        res => {
          if (res.ret === '200000') return (this.sonBrandList = res.data.list)
          this.$message.error(res.message)
        }
      )
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
    },
    // 打开新建活动弹窗
    addAct() {
      this.addActDialogVisible = true
      this.actParams.pcode = ''
      this.nowActiveIndex = 0
      this.getAct()
    },
    getCheckedAct(item, index) {
      this.nowActiveIndex = index
      this.actParams.pcode = item.code
      // if (index == 0) {
      //   this.actParams.pcode = ''
      // } else {
      //   this.actParams.pcode = 'form-cate' + index
      // }
      this.getAct()
    },
    // 获取活动名称列表
    getActCodeList() {
      this.$request.post('/api/saotx/act/formByPCode', {
        pCode: '',
        pageNo: 1,
        pageSize: -1
      }, true, res => {
        if (res.ret == '200000') {
            this.actFormName.push(...res.data.list)
            this.getAct()
          } else {
            this.$message.error(res.message)
          }
      })
    },
    // 查询当前活动
    getAct() {
      this.$request.post(
        '/api/saotx/acttpl/list',
        this.actParams,
        true,
        res => {
          if (res.ret == '200000') {
            this.actForms = res.data.list
            this.actTotal = res.data.page.count
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 活动弹窗分页
    actHandleSizeChange(newSize) {
      this.actParams.pagesize = newSize
      this.getAct()
    },
    // 活动弹窗分页
    actHandleCurrentChange(newPage) {
      this.actParams.pageNo = newPage
      this.getAct()
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

// 新建活动弹窗
.title {
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  li {
    float: left;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
  }
  li.active {
    color: #409eff;
  }
}
.el-dialog__body {
  padding-top: 10px !important;
}
.act-item {
  float: left;
  width: 185px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 8px 12px 10px 11px;
  margin: 0px 15px 0px 0px;
  box-sizing: border-box;
  img {
    width: 100%;
  }
  p {
    i {
      float: right;
      font-size: 20px;
      color: #409eff;
      cursor: pointer;
      margin-top: 5px;
    }
  }
}
</style>
