<template>
  <!--
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动模板
  -->
  <div class="actTpl-container" v-cloak>
    <el-card>
      <el-button type="primary" size="small" @click="addAct()">新建活动模板</el-button>
      <el-form ref="form" :model="actListParams" label-width="100px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="模板类型：">
              <el-select size="small" v-model="actListParams.form">
                <el-option v-for="item in selectOption" :key="item.form" :label="item.name" :value="item.form"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="创建时间：">
              <el-col>
                <el-date-picker size="small" type="date" placeholder="开始时间" v-model="actListParams.ctime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="销区：" prop="saleZoneCode">
              <el-select size="small" v-model="actListParams.saleZone" placeholder="请选择">
                <el-option
                    v-for="(item,index) in saleZone"
                    :key="index"
                    :label="item.zoneName"
                    :value="item.zoneCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="关键词：">
              <el-input size="small" v-model="actListParams.keywords" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <!-- 按钮 -->
            <el-button type="primary" size="small" @click="queryActList()">查询</el-button>
            <el-button type="primary" size="small" @click="resetSearch()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <el-table v-loading="loading" border :data="actList" style="width: 100%" @select-all="handleSelectionAllChange" @select="handleSelectionChange" class="mt20">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="tplCode" label="模板编号" width="200" align="center"></el-table-column>
        <el-table-column prop="saleZone" label="销区" width="150" align="center">
          <template slot-scope="scope">
            {{ getSaleZoneName(scope.row.saleZone) }}
          </template>
        </el-table-column>
        <el-table-column prop="tplCode" label="模板编号" width="200" align="center"></el-table-column>
        <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="note" label="模板说明" width="200" align="center"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" align="center" width="200">
          <template slot-scope="scope">
            {{new Date(scope.row.ctime).Format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="150" align="center"></el-table-column>
        <el-table-column prop="statusName" label="状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="goAddActTpl(scope.row.form,scope.row.id)">编辑</el-button>
            <el-button size="mini" type="success" @click="$router.push('/market/actTpl/actSetConf?form=' + scope.row.form + '&tplCode=' + scope.row.tplCode)">投放</el-button>
            <el-button size="mini" @click="delAct(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt20" type="danger" @click="batchDel">批量删除</el-button>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="actListParams.pageNo" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 新建活动模板弹框 -->
    <el-dialog class="addDialog" :visible.sync="addActDialogVisible" width="900px" :close-on-click-modal="false">
      <div class="act-wrap">
        <div class="title">
          <ul>
            <li v-for="(item, index) in actFormName" :key="index" @click="getCheckedAct(item, index)" :class="index == nowActiveIndex ? 'active' : ''">{{item.name}}</li>
          </ul>
          <div style="clear: both"></div>
        </div>
        <div v-if="actForms.length !== 0">
          <div class="act-item" v-for="item in actForms" :key="item.id" v-if="item.code!='act-601'">
            <img style="height: 282px;" :src="item.extUrl" :alt="item.name">
            <p>{{item.name}}<i class="el-icon-circle-plus" @click="goAddActTpl(item.code, '')"></i></p>
          </div>
          <!-- <div v-if="actForms">
            <div class="act-item" v-for="item in actForms" :key="item.id">
              <img :src="item.extUrl" :alt="item.name">
              <p>{{item.name}}<i class="el-icon-circle-plus" @click="goAddActTpl()"></i></p>
            </div>
          </div> -->
        </div>
        <div v-else>暂无</div>
        <el-col :span="24" v-if="actForms">
          <el-pagination class="mt20" background @size-change="actHandleSizeChange" @current-change="actHandleCurrentChange" :current-page="actParams.pageNo" :page-size="actParams.pageSize" layout="total, prev, pager, next, jumper" :total="actTotal">
          </el-pagination>
        </el-col>
        <div style="clear: both"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import addAct from './AddAct'
export default {
  components: {
    addAct
  },
  data() {
    return {
      orgHasSaleZone: sessionStorage.orgHasSaleZone,   // 组织公司是否含有销区
      isAllSaleZone: sessionStorage.isAllSaleZone,     // 是否有所有销区权限
      saleZoneCode: sessionStorage.saleZoneCode,     // 销区code
      selectOption: [],
      saleZone:[],
      keywords: '',
      actListParams: {
        ctime: '',
        form: '',
        keywords: '',
        saleZone:null,
        pageNo: 1,
        pageSize: 10
      },
      batchRemoveIdList: [],
      flag: {},
      total: null,
      actList: [],
      addActDialogVisible: false, // 显示/隐藏新建活动模板弹窗
      delDialogVisible: false, // 显示/隐藏删除弹窗
      actFormName: [
        { name: '全部', code: '' }
      ],
      nowActiveIndex: 0,
      actParams: {
        pageNo: 1,
        pageSize: 4,
        pcode: ''
      },
      actTotal: null,
      actForms: [],
      loading: true,
      formPath: {
        'act-101': '/market/actTpl/AddActSudoku?id=',
        'act-102': '/market/actTpl/AddWingAct?id=',
        'act-103': '/market/actTpl/addActEgg?id=',
        'act-104': '/market/actTpl/addActFanpaizi?id=',
        'act-111': '/market/actTpl/addHePiaoXiang?id=',
        'act-112': '/market/actTpl/addRockPaperScissors?id=',
        'act-113': '/market/actTpl/addBoating?id=',
        'act-501': '/market/actTpl/addActQuestion?id=',
        'act-301': '/market/actTpl/addActRedPacked?id=',
        'act-105': '/market/actTpl/addRound?id=',
        'act-100': '/market/actTpl/addAct?id=',
        'act-701': '/market/actTpl/addCapsuleToys?id=',
        'act-702': '/market/actTpl/addDadishu?id=',
        'act-703': '/market/actTpl/addDaqiqiu?id=',
        'act-704': '/market/actTpl/addJiawawa?id=',
        'act-705': '/market/actTpl/addDiaohongbao?id='
      }
    }
  },
  created() {
    this.getSaleZone()
    this.getActType()
    this.getActCodeList()
  },
  // 进入路由之前执行的函数
  beforeRouteEnter(to, from, next) {
    // console.log(to.path)
    next()
  },
  // 离开路由之前执行的函数
  beforeRouteLeave(to, from, next) {
    // console.log(to)
    // console.log(from)
    // console.log(to.path)
    // if (to.path == '/market/actTpl/addAct') return next()
    next()
  },
  methods: {
    getSaleZoneName(saleZoneCode){
      if(!saleZoneCode) return ""
      let zoneName = ""
      let item = this.saleZone.find((i) => {
        if(i.zoneCode == saleZoneCode){
          return i
        }
      })
      // console.log(item)
      zoneName = item ? item.zoneName : ''
      return zoneName
    },
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
        if (res.code == '200') {
          this.saleZone = res.data || []
          if (this.isAllSaleZone == 1) {
            this.getActList()
          } else {
            this.actListParams.saleZone = this.saleZoneCode
            this.getActList()
          }
        }
      })
    },
    // 获取活动list
    getActList() {
      this.loading = true
      this.$request.post(
        '/api/wiseqr/acttpl/list',
        this.actListParams,
        true,
        res => {
          if (res.ret === '200000') {
            this.actList = res.data.list
            this.total = res.data.page.count
            this.loading = false
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 获取活动模板类型
    getActType() {
      this.$request.post(
        '/api/wiseqr/act/allForms',
        this.actParams,
        true,
        res => {
          if (res.ret == '200000') {
            this.selectOption = res.data.list
            this.selectOption.unshift({ name: '全部', form: '' })
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 打开新建活动弹窗
    addAct() {
      this.addActDialogVisible = true
      this.actParams.pcode = ''
      this.actParams.pageNo = 1
      this.nowActiveIndex = 0
      const loading = this.$loading({
        target: '.el-dialog'
      })
      this.getAct(() => loading.close())
    },
    // 查询当前活动
    getAct(callback) {
      this.$request.post(
        '/api/wiseqr/act/allForms',
        this.actParams,
        true,
        res => {
          if (res.ret == '200000') {
            this.actForms = []
            this.actForms = res.data.list
            this.actTotal = res.data.page.count
          } else {
            this.$message.error(res.message)
          }
          callback && callback()
        },
        err => {
          console.log(err)
        }
      )
    },
    // 获取活动名称列表
    getActCodeList() {
      this.$request.post(
        '/api/wiseqr/act/formByPCode',
        {
          pCode: '',
          pageNo: 1,
          pageSize: -1
        },
        true,
        res => {
          if (res.ret == '200000') {
            res.data.list.forEach(item => {
              if (item.code != 'form-cate6') {
                this.actFormName.push(item)
              }
            })
            // this.getAct()
          } else {
            this.$message.error(res.message)
          }
        }
      )
    },
    // 新建活动模板tab切换
    getCheckedAct(item, index) {
      this.nowActiveIndex = index
      this.actParams.pcode = item.code
      this.actParams.pageNo = 1
      const loading = this.$loading({
        target: '.el-dialog'
      })
      this.getAct(() => loading.close())
    },
    // 按条件查询活动模板
    queryActList() {
      this.actListParams.pageNo = 1
      this.getActList()
    },
    // 重置条件查询活动模板
    resetSearch() {
      this.actListParams.ctime = ''
      this.actListParams.form = ''
      this.actListParams.keywords = ''
      this.actListParams.pageNo = 1
      if(this.isAllSaleZone == 1){
        this.actListParams.saleZone = null
      }
      this.getActList()
    },
    // 删除模板
    async delAct(id) {
      let idArr = []
      if (Array.isArray(id)) {
        idArr = id
      } else {
        idArr.push(id)
      }
      const confirmResult = await this.$confirm('您确定删除此模板？', '删除提示', {
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
      this.$request.post(
        '/api/wiseqr/acttpl/remBatch',
        { idArr: idArr },
        true,
        res => {
          if (res.ret === '200000') {
            this.$message.success('删除成功')
            this.getActList()
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 批量删除
    async batchDel() {
      if (this.batchRemoveIdList.length == 0) return
      const confirmResult = await this.$confirm(
        '您确定删除' + this.batchRemoveIdList.length + '条模板？',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      this.$request.post(
        '/api/wiseqr/acttpl/remBatch',
        { idArr: this.batchRemoveIdList },
        true,
        res => {
          if (res.ret === '200000') {
            this.$message.success('删除成功')
            this.actListParams.ctime = ''
            this.actListParams.form = ''
            this.actListParams.keywords = ''
            this.actListParams.pageNo = 1
            this.actListParams.pageSize = 10
            this.getActList()
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 多选框选择
    handleSelectionChange(selection) {
      this.batchRemoveIdList = []
      selection.forEach(item => {
        this.batchRemoveIdList.push(item.id)
      })
    },
    // 多选框全选/全不选
    handleSelectionAllChange(selection) {
      this.batchRemoveIdList = []
      selection.forEach(item => {
        this.batchRemoveIdList.push(item.id)
      })
    },
    // 每当 pageSize 变化，会触发 这个函数
    handleSizeChange(newSize) {
      this.actListParams.pageSize = newSize
      this.getActList()
    },
    // 每当 页码值发生变化，会触发这个函数
    handleCurrentChange(newPage) {
      this.actListParams.pageNo = newPage
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
    // 跳转到新建活动模板页面
    goAddActTpl(code,id){
      this.$router.push(this.formPath[code] + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.actTpl-container {
  .search-box {
    margin-top: 20px;
    .el-col {
      .el-input {
        width: 80%;
      }
      // .el-date-picker {
      //   // width: 80%;
      // }
      .el-select {
        width: 70%;
      }
    }
  }
  .el-form {
    margin-top: 20px;
  }
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
    width: 200px;
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
        // position: relative;
        // top: 20px;
        float: right;
        font-size: 20px;
        color: #409eff;
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }
}
</style>
