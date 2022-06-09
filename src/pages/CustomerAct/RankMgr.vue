<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="dataForm('',0)">新建排名活动</el-button>
      </el-row>
      <!-- 数据查询条件 -->
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center">

        </el-table-column>
        <el-table-column prop="actName" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="actCode" label="活动code" align="center"></el-table-column>
        <el-table-column prop="stime" label="活动时间" align="center">
          <template slot-scope="scope"  width="300">
            {{ scope.row.stime }}至{{ scope.row.etime }}
          </template>
        </el-table-column>
        <el-table-column prop="actJoinEtime" label="活动截止时间" align="center"></el-table-column>
        <el-table-column prop="outStatus" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.outStatus==0">已删除</span>
            <span v-if="scope.row.outStatus==1">启用尚未开始</span>
            <span v-if="scope.row.outStatus==2">进行中</span>
            <span v-if="scope.row.outStatus==3">未启用(或暂停)</span>
            <span v-if="scope.row.outStatus==4">已结束(定时任务设置)</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <span style="color:#409EFF;cursor: pointer;margin: 0 5px" v-if="scope.row.outStatus==1" size="mini" @click="modifyData(scope.row.actCode, 3)">暂停</span>
            <span style="color:#409EFF;cursor: pointer;margin: 0 5px" v-if="scope.row.outStatus==1||scope.row.outStatus==2||scope.row.outStatus==3" size="mini" @click="dataForm(scope.row.actCode, 1)">编辑</span>
            <span style="color:#409EFF;cursor: pointer;margin: 0 5px" v-if="scope.row.outStatus==3" size="mini" @click="modifyData(scope.row.actCode, 1)">启用</span>
            <span style="color:red;cursor: pointer;margin: 0 5px" v-if="scope.row.outStatus==3 || scope.row.outStatus==4" size="mini" @click="modifyData(scope.row.actCode, 0)">删除</span>
            <span style="color:#409EFF;cursor: pointer;margin: 0 5px" v-if="scope.row.outStatus==4" size="mini" @click="dataForm(scope.row.actCode, 2)">查看详情</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
      <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="currentChange"
                     :current-page="search.page" :page-size="search.pageSize"
                     :total="pagination.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        page: 1,
        pageSize: 10,
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],

      form: {
        show: false, // 增库弹框是否展示
        id: '',
        name: ''
      }
    }
  },
  created() {
    this.list();
  },
  methods: {
    currentChange(page) {
      // 分页pageNo变更监听
      this.list(event, page);
    },
    sizeChange(pageSize) {
      // 分页pageNo变更监听
      this.list(event, null, pageSize);
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(page) {
        this.pagination.total = page;
    },
    // 重置查询
    reset() {
      this.search = {
        page: 1,
        pageSize: 10,
      }
      this.list();
    },
    // 查询礼品库列表数据
    list(_event, page, pageSize) {
      let _pageNo = 1;
      if(page) _pageNo = page;
      this.search.page = _pageNo;
      let _pageSize = 10;
      if(pageSize) _pageSize = pageSize;
      this.search.pageSize = _pageSize;

      this.$request.post('/saasHbseller/seller/actRank/list', this.search, true, (res)=>{
        if (res.code == '200') {
          this.tableList = res.data.list.records || [];
          this.initPagination(res.data.list.total||0);
        }
      });
    },
    dataForm(actCode, type) {
      this.$router.push(`/customerAct/rankConf?actCode=${actCode}&type=${type}`)
    },
    modifyData(actCode, status) {
      let t = ''
      if(status == 0) t ='删除'
      if(status == 1) t ='启用'
      if(status == 3) t ='暂停'
      this.$confirm(`您确认${t}此活动吗？ `, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {actCode:actCode, status:status}
        this.$request.post('/saasHbseller/seller/actRank/statModify', params, false, (res)=>{
          if (res.code == '200') {
            this.list();
            this.$message({type: 'success', message: '操作成功!'});
          } else {
            this.$message.error(res.msg);
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.space {position:relative;width:100%;height:20px;}
.el-input, .el-select {
  width: 200px;
}
</style>
