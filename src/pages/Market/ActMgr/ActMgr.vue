<template>
  <div class="actMgr-container">
    <el-card>
      <el-button type="primary" size="small" class="ml20" @click="addAct">新建活动</el-button>
      <el-form label-width="80px" label-position="left">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="选择品牌:">
              <el-select size="small" v-model="queryActParams.brandCodeArr" multiple placeholder="请选择" @change="getSonBrandList">
                <el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.brandCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择规格:">
              <el-select size="small" v-model="queryActParams.snArr" multiple placeholder="请选择">
                <el-option v-for="item in sonBrandList" :key="item.sn" :label="item.allName" :value="item.sn">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动状态:">
              <el-select size="small" v-model="queryActParams.status" placeholder="请选择">
                <el-option v-for="(value, key) in actStatusObj" :key="key" :label="value" :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="关键词:">
              <el-input size="small" v-model="queryActParams.keywords" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="2">
            <el-form-item label="地区:">
              <el-select size="small" :disabled="isDisabled" v-model="selectProvList" multiple collapse-tags placeholder="请选择" @change="getCityList">
                <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <el-select size="small" :disabled="isDisabled" v-model="selectCityList" multiple collapse-tags placeholder="请选择" @change="selectArea">
                <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
              <el-checkbox size="small" v-model="isDisabled" label="全部地区" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="时间段:">
              <el-date-picker size="small" v-model="actTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-button type="primary" size="small" @click="queryActList">查询</el-button>
            <el-button type="primary" size="small" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <el-table v-loading="loading" :data="actList" border style="width: 100%" :stripe="true">
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
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status != 4" @click="edit(scope.row.id,scope.row.form)">编辑</a>
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status == 2" @click="post(scope.row.id)">发布</a>
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status == 3" @click="post(scope.row.id)">发布</a>
            <a style="color: #347ab7" href="javascript:;" @click="clone(scope.row.id,scope.row.form)">复制</a>
            <a style="color: #347ab7" href="javascript:;" @click="getLogList(scope.row.actCode)">投放日志</a>
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status == 1" @click="stop(scope.row.id)">暂停</a>
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status == 1" @click="over(scope.row.id)">结束</a>
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status == 4" @click="del(scope.row.id)">删除</a>
            <a style="color: #347ab7" href="javascript:;" v-if="scope.row.status != 4 && scope.row.status != 0" @click="editTpl(scope.row.form, scope.row.actCode)">活动模板</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="actForms" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryActParams.pageNo" :page-size="queryActParams.pageSize" layout="total, prev, pager, next, jumper" :total="actListTotal">
      </el-pagination>
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
        <div v-if="actForms.length !== 0">
          <div class="act-item" v-for="item in actForms" :key="item.id">
            <img style="height: 282px;" :src="item.extUrl" :alt="item.name">
            <p class="act-name">{{item.name}}</p>
            <p class="desc">{{item.note ? item.note : '暂无活动说明~'}}</p>
            <div class="btn">
              <el-button type="primary" size="small">预览</el-button>
              <el-button type="primary" size="small" @click="goPut(item)">投放</el-button>
            </div>
          </div>
        </div>
        <div v-else>暂无</div>
      </div>
      <el-col :span="24" v-show="actForms">
        <el-pagination background @size-change="actHandleSizeChange" @current-change="actHandleCurrentChange" :current-page="actParams.pageNo" :page-size="actParams.pageSize" layout="total, prev, pager, next, jumper" :total="actTotal">
        </el-pagination>
      </el-col>
      <div style="clear: both"></div>
    </el-dialog>
    <!-- 日志弹窗 -->
    <el-dialog :visible.sync="putLogVisible" width="900px" :close-on-click-modal="false">
      <el-row>
        <el-col :span="8">
          投放时间
          <el-select v-model="putLogTime" placeholder="请选择" @change="logDetail(nowActCode, putLogTime)">
            <el-option v-for="(item, index) in putTimeList" :key="index" :label="new Date(item.time).Format('yyyy-MM-dd hh:mm:ss')" :value="item.version">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" :offset="3">
          投放日志
        </el-col>
      </el-row>
      <div>
        <div class="mt20">常规奖池</div>
        <el-table :data="normalLogList" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="awardName" label="奖项名称">
          </el-table-column>
          <el-table-column prop="totalNum" label="奖品数量">
          </el-table-column>
          <el-table-column prop="outNum" label="已发数量">
          </el-table-column>
          <el-table-column label="剩余数量">
            <template slot-scope="scope">
              {{scope.row.totalNum - scope.row.outNum}}
            </template>
          </el-table-column>
          <el-table-column label="中奖概率">
            <template slot-scope="scope">
              {{scope.row.probability + '%'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="firstScanLogList.length != 0">
        <div class="mt20">首扫奖池</div>
        <el-table :data="normalLogList" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="awardName" label="奖项名称">
          </el-table-column>
          <el-table-column prop="totalNum" label="奖品数量">
          </el-table-column>
          <el-table-column prop="outNum" label="已发数量">
          </el-table-column>
          <el-table-column label="剩余数量">
            <template slot-scope="scope">
              {{scope.row.totalNum - scope.row.outNum}}
            </template>
          </el-table-column>
          <el-table-column label="中奖概率">
            <template slot-scope="scope">
              {{scope.row.probability + '%'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="nWinLogList.length != 0">
        <div class="mt20">n次必中奖池</div>
        <el-table :data="normalLogList" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="awardName" label="奖项名称">
          </el-table-column>
          <el-table-column prop="totalNum" label="奖品数量">
          </el-table-column>
          <el-table-column prop="outNum" label="已发数量">
          </el-table-column>
          <el-table-column label="剩余数量">
            <template slot-scope="scope">
              {{scope.row.totalNum - scope.row.outNum}}
            </template>
          </el-table-column>
          <el-table-column label="中奖概率">
            <template slot-scope="scope">
              {{scope.row.probability + '%'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="fixationLogList.length != 0">
        <div class="mt20">定投奖池</div>
        <el-table :data="normalLogList" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="awardName" label="奖项名称">
          </el-table-column>
          <el-table-column prop="totalNum" label="奖品数量">
          </el-table-column>
          <el-table-column prop="outNum" label="已发数量">
          </el-table-column>
          <el-table-column label="剩余数量">
            <template slot-scope="scope">
              {{scope.row.totalNum - scope.row.outNum}}
            </template>
          </el-table-column>
          <el-table-column label="中奖概率">
            <template slot-scope="scope">
              {{scope.row.probability + '%'}}
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        status: '',
        stime: ''
      },
      actListTotal: 0,
      addActDialogVisible: false,
      actFormName: [
        { name: '全部', code: '' }
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
      actTime: '',
      nowActCode: '', // 当前活动code
      putLogVisible: false,
      putTimeList: [],
      putLogTime: '',
      normalLogList: [],
      firstScanLogList: [],
      nWinLogList: [],
      fixationLogList: [],
      loading: true,
      formPath: {
        'act-101': '/market/actTpl/AddActSudoku?edit=',
        'act-102': '/market/actTpl/AddWingAct?edit=',
        'act-103': '/market/actTpl/addActEgg?edit=',
        'act-104': '/market/actTpl/addActFanpaizi?edit=',
        'act-501': '/market/actTpl/addActQuestion?edit=',
        'act-301': '/market/actTpl/addActRedPacked?edit=',
        'act-105': '/market/actTpl/addRound?edit=',
        'act-100': '/market/actTpl/addAct?edit='
      }
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
        this.queryActParams.provinceCodeArr = ['000000']
        this.queryActParams.cityCodeArr = ['000000']
      } else {
        this.queryActParams.provinceCodeArr = []
        this.queryActParams.cityCodeArr = []
      }
    },
    actTime: function(val) {
      if (val && val.length === 2) {
        this.queryActParams.stime = this.actTime[0]
        this.queryActParams.etime = this.actTime[1]
      } else {
        this.queryActParams.stime = ''
        this.queryActParams.etime = ''
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
      // if (this.queryActParams.status == '0') this.queryActParams.status = ''
      this.$request.post('/api/saotx/act/list', this.queryActParams, true, res => {
        if (res.ret === '200000') {
          this.actList = res.data.list
          this.actListTotal = res.data.page.count
          this.loading = false
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取活动状态
    getActStatus() {
      this.$request.post('/api/saotx/act/statusSelect', {}, true, res => {
        if (res.ret === '200000') {
          this.actStatusObj = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    selectArea() {
      this.queryActParams.provinceCodeArr = this.selectProvList
      this.queryActParams.cityCodeArr = this.selectCityList
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
      this.actParams.pageNo = 1
      this.nowActiveIndex = 0
      this.getAct()
    },
    // 新建活动tab切换
    getCheckedAct(item, index) {
      this.nowActiveIndex = index
      this.actParams.pcode = item.code
      this.actParams.pageNo = 1
      // if (index == 0) {
      //   this.actParams.pcode = ''
      // } else {
      //   this.actParams.pcode = 'form-cate' + index
      // }
      this.getAct()
    },
    // 获取活动名称列表
    getActCodeList() {
      this.$request.post(
        '/api/saotx/act/formByPCode',
        {
          pCode: '',
          pageNo: 1,
          pageSize: -1
        },
        true,
        res => {
          if (res.ret == '200000') {
            this.actFormName.push(...res.data.list)
            // this.getAct()
          } else {
            this.$message.error(res.message)
          }
        }
      )
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
    // 按条件查询活动
    queryActList() {
      this.queryActParams.pageNo = 1
      this.getActList()
    },
    // 重置
    resetForm() {
      this.queryActParams.keywords = ''
      this.queryActParams.brandCodeArr = []
      this.queryActParams.snArr = []
      this.queryActParams.status = ''
      this.queryActParams.stime = ''
      this.queryActParams.etime = ''
      this.selectProvList = []
      this.selectCityList = []
      this.queryActParams.provinceCodeArr = []
      this.queryActParams.cityCodeArr = []
      this.actTime = []
      this.queryActParams.pageNo = 1
      this.getActList()
    },
    // 投放日志
    getLogList(code) {
      this.$request.post('/api/saotx/act/hisVers', { actCode: code }, true, res => {
        if (res.ret == '200000') {
          this.putLogVisible = true
          this.normalLogList = []
          this.firstScanLogList = []
          this.nWinLogList = []
          this.fixationLogList = []
          this.putTimeList = []
          this.putLogTime = ''
          if (res.data.length > 0) {
            this.nowActCode = code
            this.putTimeList = res.data
            this.putLogTime = res.data[0].version
            this.logDetail(code, this.putLogTime)
          }
          return
        }
        this.$message.error(res.message)
      })
    },
    // 日志详情
    logDetail(code, time) {
      this.$request.post(
        '/api/saotx/act/hisDetail',
        {
          actCode: code,
          version: time
        },
        true,
        res => {
          if (res.ret === '200000') {
            res.data.strategyArr.forEach(item => {
              if (item.tfType == 'common') this.normalLogList = item.awardArr
              if (item.tfType == 'sn_first') this.firstScanLogList = item.awardArr
              if (item.tfType == 'n_mwin') this.nWinLogList = item.awardArr
              if (item.tfType == 'special') this.fixationLogList = item.awardArr
            })
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    // 活动列表分页
    handleSizeChange(newSize) {
      this.queryActParams.pageSize = newSize
      this.getActList()
    },
    // 活动列表分页
    handleCurrentChange(newPage) {
      this.queryActParams.pageNo = newPage
      this.getActList()
    },
    // 活动弹窗分页
    actHandleSizeChange(newSize) {
      this.actParams.pageSize = newSize
      this.getAct()
    },
    // 活动弹窗分页
    actHandleCurrentChange(newPage) {
      this.actParams.pageNo = newPage
      this.getAct()
    },
    // 投放
    goPut(item) {
      this.$router.push(
        '/market/actTpl/actSetConf?form=' +
          item.form +
          '&tplCode=' +
          item.tplCode
      )
    },

    // 编辑
    edit(id,form) {
    	// if(form=='act-501'){
    		this.$router.push('/market/actTpl/actSetConf?id=' + id+'&form='+form)
    	// }else {
    		// this.$router.push('/market/actTpl/actSetConf?id=' + id)
    	// }
    },
    // 复制
    clone(id,form) {
      this.$router.push('/market/actTpl/actSetConf?id=' + id + '&clone=1&form='+form)
    },
    // 发布
    async post(id) {
      const confirmResult = await this.$confirm('确定发布此活动吗？', '发布提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消发布'
        })
      }
      this.$request.post('/api/saotx/act/modifyStatus', { id: id, status: 1 }, true, res => {
        if (res.ret == '200000') {
          this.$message.success('发布成功')
          this.getActList()
          return
        }
        this.$message.error(res.message)
      })
    },
    // 结束
    async over(id) {
      const confirmResult = await this.$confirm(
        '确定要结束此活动吗？结束后活动将会下线哦！',
        '结束提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消'
        })
      }
      this.$request.post('/api/saotx/act/modifyStatus', { id: id, status: 4 }, true, res => {
        if (res.ret == '200000') {
          this.$message.success('已结束')
          this.getActList()
          return
        }
        this.$message.error(res.message)
      })
    },
    // 暂停
    async stop(id) {
      const confirmResult = await this.$confirm(
        '确定要暂停此活动吗？暂停后活动将会下线哦！',
        '暂停提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消'
        })
      }
      this.$request.post('/api/saotx/act/modifyStatus', { id: id, status: 3 }, true, res => {
        if (res.ret == '200000') {
          this.$message.success('已暂停')
          this.getActList()
          return
        }
        this.$message.error(res.message)
      })
    },
    // 删除
    async del(id) {
      const confirmResult = await this.$confirm('您确定删除这些模板？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      this.$request.post('/api/saotx/act/remBatch', { idArr: [id] }, true, res => {
        if (res.ret == '200000') {
          this.$message.success('删除成功')
          this.getActList()
          return
        }
        this.$message.error(res.message)
      })
    },
    editTpl(form, code) {
      this.$router.push(this.formPath[form] + code)
      //  switch (form) {
      //   case 'act-101':
      //     this.$router.push('/market/actTpl/AddActSudoku?edit=' + code)
      //     break; 
      //   case 'act-102':
      //     this.$router.push('/market/actTpl/AddWingAct?edit=' + code)
      //     break;
      //   case 'act-103':
      //     this.$router.push('/market/actTpl/addActEgg?edit=' + code)
      //     break;
      //   case 'act-104':
      //     this.$router.push('/market/actTpl/addActFanpaizi?edit=' + code)
      //     break;
      //   case 'act-501':
      //     this.$router.push('/market/actTpl/addActQuestion?edit=' + code)
      //     break;
      //   case 'act-301':
      //     this.$router.push('/market/actTpl/addActRedPacked?edit=' + code)
      //     break;
      //   case 'act-100':
      //     this.$router.push('/market/actTpl/addAct?edit=' + code)
      //     break;
      //   case 'act-105':
      //     this.$router.push('/market/actTpl/addRound?edit=' + code)
      //     break;
      // }
      // this.$request.post('/api/saotx/act/pubTpl', {actCode: code}, true, res => {
      //   if (res.ret === '200000') {
      //     console.dir(JSON.parse(res.data.conf).img)
      //   }
      // })
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
.act-name {
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-dialog__body {
  padding-top: 10px !important;
}
.act-item {
  float: left;
  width: 200px;
  text-align: center;
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
.el-pagination {
  margin-top: 20px;
}
.desc {
  color: #a0a0a0;
  margin: 0;
  margin-bottom: 10px;
  // margin: 14px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-select {
  width: 180px;
}
</style>
