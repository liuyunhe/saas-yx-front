<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动模板
  -->
  <div class="actTpl-container" v-cloak>
    <el-card>
      <el-button type="primary" size="medium" @click="addAct()">新建活动模板</el-button>
      <el-form ref="form" :model="actListParams" label-width="80px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="模板类型">
              <el-select v-model="actListParams.form">
                <el-option v-for="item in selectOption" :key="item.form" :label="item.name" :value="item.form"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="时间段">
              <el-col>
                <el-date-picker type="date" placeholder="开始时间" v-model="actListParams.ctime" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="关键词">
              <el-input v-model="actListParams.keyword" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <!-- 按钮 -->
            <el-button type="primary" @click="getActList()">查询</el-button>
            <el-button type="primary" @click="resetSearch()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table v-loading="loading" border :data="actList" style="width: 100%" @select="test(actList)" class="mt20">
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="tplCode" label="模板编号" align="center"></el-table-column>
        <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="note" label="模板说明" align="center"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" align="center">
          <template slot-scope="scope">
            {{new Date(scope.row.ctime).Format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建人" align="center"></el-table-column>
        <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="220px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="$router.push('/market/actTpl/addAct?id=' + scope.row.id)">编辑</el-button>
            <el-button size="mini" type="success" @click="$router.push('/market/actTpl/actSetConf?form=' + scope.row.form + '&tplCode=' + scope.row.tplCode)">投放</el-button>
            <el-button size="mini" @click="delAct(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="actListParams.pageNo" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 新建活动模板弹框 -->
      <el-dialog :visible.sync="addActDialogVisible" width="900px" :close-on-click-modal="false">
        <div class="act-wrap">
          <div class="title">
            <ul>
              <li v-for="(item, index) in actFormName" :key="index" @click="getCheckedAct(index)" :class="index == nowActiveIndex ? 'active' : ''">{{item.name}}</li>
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
          <el-pagination background @size-change="actHandleSizeChange" @current-change="actHandleCurrentChange" :current-page="actParams.pageNo" layout="total, prev, pager, next, jumper" :total="actTotal">
          </el-pagination>
        </el-col>
        <div style="clear: both"></div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectOption: [],
      keyword: '',
      actListParams: {
        ctime: '',
        form: '',
        keyword: '',
        pageNo: 1,
        pageSize: 10
      },
      total: null,
      actList: [],
      addActDialogVisible: false, // 显示/隐藏新建活动模板弹窗
      delDialogVisible: false, // 显示/隐藏删除弹窗
      actFormName: [
        { name: '全部' },
        { name: '抽奖活动' },
        { name: '集道具活动' },
        { name: '红包雨活动' },
        { name: '竞猜活动' },
        { name: '问答活动' },
        { name: '自定义活动' }
      ],
      nowActiveIndex: 0,
      actParams: {
        pageNo: 1,
        pageSize: 4,
        pcode: ''
      },
      actTotal: null,
      actForms: [],
      loading: true
    }
  },
  created() {
    this.getActList()
    this.getActType()
  },
  methods: {
    getActList() {
      this.$request.post(
        '/api/saotx/acttpl/list',
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
          // // 测试
          // if (res.ret === '200000') {
          //   for (let i = 0; i < 10; i++) {
          //     this.actList.push(res.data.list[0])
          //   }
          //   console.log(this.actList)
          //   this.actListParams.pageNo = 1
          //   this.pageSize = 10
          //   this.total = 30
          // }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 获取活动模板类型
    getActType() {
      this.$request.post(
        '/api/saotx/act/allForms',
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
      this.nowActiveIndex = 0
      this.getAct()
    },
    // 查询当前活动
    getAct() {
      this.$request.post(
        '/api/saotx/act/allForms',
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
    getCheckedAct(index) {
      this.nowActiveIndex = index
      if (index == 0) {
        this.actParams.pcode = ''
      } else {
        this.actParams.pcode = 'form-cate' + index
      }
      this.getAct()
    },
    // 重置条件查询活动模板
    resetSearch() {
      this.actListParams.ctime = ''
      this.actListParams.form = ''
      this.actListParams.keyword = ''
      this.getActList()
    },
    // 删除模板
    async delAct(id) {
      // console.log(id)
      // this.delDialogVisible = true
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
        '/api/saotx/acttpl/remBatch',
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
    // 复选框测试
    test(id) {
      console.log('勾选了')
      console.log(id[0].id)
    },
    // 跳转到新建活动模板页面
    goAddActTpl() {
      this.$router.push('/market/actTpl/addAct')
    },
    // 每当 pagesize 变化，会触发 这个函数
    handleSizeChange(newSize) {
      this.actListParams.pagesize = newSize
      this.getActList()
    },
    // 每当 页码值发生变化，会触发这个函数
    handleCurrentChange(newPage) {
      this.actListParams.pageNo = newPage
      this.getActList()
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
  .el-pagination {
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
}
</style>