<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item :size="'small'" label="关键词：">
          <el-input placeholder="请输入内容" v-model="search.keyword" class="input-with-select" style="width: 300px">
            <el-select v-model="search.keywordType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
              <el-option label="烟草证号" value="1"></el-option>
              <el-option label="联系人姓名" value="2"></el-option>
              <el-option label="联系人手机号" value="3"></el-option>
              <el-option label="门店名称" value="4"></el-option>
              <el-option label="业务员名称" value="5"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button size="small" type="primary" @click="list">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="50">
          <template slot-scope="scope">
            {{ (search.page-1)*search.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="fanNickName" label="昵称" align="center"></el-table-column>
        <el-table-column prop="fanGender" label="性别" align="center"></el-table-column>
        <el-table-column prop="birthday" label="出生年月" align="center"></el-table-column>
        <el-table-column prop="fanMobile" label="手机号" width="150" align="center"></el-table-column>
        <el-table-column prop="licenseNo" label="烟草专卖证号"  align="center"></el-table-column>
        <el-table-column prop="shopName" label="所属门店" align="center"></el-table-column>
        <el-table-column prop="ctime" label="绑定时间" align="center"></el-table-column>
        <el-table-column prop="scanCodeNum" label="扫烟码次数" align="center"></el-table-column>
        <el-table-column prop="shopScanActNum" label="核销次数" align="center"></el-table-column>


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
        keywordType:'',
        keyword:'',
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
        keywordType:'',
        keyword:'',
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
      this.$request.post('/saasHbseller/fans/select', this.search, false, (res)=>{
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
