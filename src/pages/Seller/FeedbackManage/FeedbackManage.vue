<template>
  <div v-loading="loading">
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="50">
          <template slot-scope="scope">
            {{ (search.page-1)*search.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="feedContent" label="反馈内容" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.feedContent&&scope.row.feedContent.length>10" :title="scope.row.feedContent">{{scope.row.feedContent.substring(0,10)}}...</span>
            <span v-else>{{scope.row.feedContent}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="openid" label="反馈人" align="center"></el-table-column>
        <el-table-column prop="phoneNo" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="ctime" label="反馈时间" width="150" align="center"></el-table-column>
        <el-table-column prop="feedFrom" label="反馈来源" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.feedFrom == 1">消费者</span>
            <span v-if="scope.row.feedFrom == 2">零售户</span>
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
        shopImg: '',
        licenseImg: '',
        auditStatus: ''
      },
      loading:false
    }
  },
  created() {
    this.list();
  },
  methods: {
    inputWithSelectChange(val){
      this.search.keyword = ""
    },
    currentChange(page) {
      // 分页pageNo变更监听
      this.list(event, page);
    },
    sizeChange(pageSize) {
      // 分页pageNo变更监听
      this.list(event, null, pageSize);
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(total) {
      if(total) {
        this.pagination.total = total;
      }
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
      this.$request.post('/saasHbseller/feedback/queryList', this.search, false, (res)=>{
        if (res.code == '200') {
          this.tableList = res.data.records || [];
          this.initPagination(res.data.total);
        }else {
          this.$message.error(res.msg);
        }
      });
    },
  }
}
</script>

<style scoped>
.space {position:relative;width:100%;height:20px;}
.el-input, .el-select {
  width: 200px;
}
</style>
