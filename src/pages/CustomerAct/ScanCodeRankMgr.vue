<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-form :inline="true" :model="search">
          <el-form-item label="零售户手机号：">
            <el-input size="small"  v-model="search.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="零售户烟草证号：">
            <el-input size="small"  v-model="search.licenseNo"></el-input>
          </el-form-item>
          <el-form-item label="门店名称：">
            <el-input size="small"  v-model="search.shopName"></el-input>
          </el-form-item>
          <div></div>
          <el-form-item>
            <el-button size="small" type="primary" @click="list">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
            <el-button  size="small" type="primary" plain  :click="exportData" >导出列表</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 数据查询条件 -->
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center">

        </el-table-column>
        <el-table-column prop="licenseNo" label="烟草专卖证号" align="center"></el-table-column>
        <el-table-column prop="shopName" label="门店名称" align="center"></el-table-column>
        <el-table-column prop="addr" label="门店地址" align="center"></el-table-column>
        <el-table-column prop="contactName" label="经营人姓名" align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系人电话" align="center"></el-table-column>
        <el-table-column prop="rebateNum" label="累计扫码次数" align="center"></el-table-column>
        <el-table-column prop="redpackTotalIncome" label="累计返现金额" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.redpackTotalIncome }}
          </template>
        </el-table-column>
        <el-table-column prop="pointsTotalIncome" label="累计返现积分" align="center">
          <template slot-scope="scope">
            {{ scope.row.pointsTotalIncome }}荷石璧
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
        contactPhone: "", //联系电话
        licenseNo: "", //烟草证号
        shopName: "" //店铺名称
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
    exportData(){//导出
      var url = "/sc/saotx/mall/order/exportOrder";
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      for(var attr in this.search) {
        formData.append(attr, this.search[attr]);
      }
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
      xhr.open('POST', url, true);
      xhr.responseType = "blob";
      xhr.responseType = "arraybuffer"
      xhr.setRequestHeader("token", sessionStorage.getItem('access_token'));
      xhr.setRequestHeader("loginId", sessionStorage.getItem('access_loginId'));
      xhr.onload = function(res) {
        if (this.status == 200) {
          var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
          var respHeader = xhr.getResponseHeader("Content-Disposition");
          var fileName = decodeURI(respHeader.match(/filename=(.*?)(;|$)/)[1]);
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        }
      }
      xhr.send(formData);
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
    initPagination(page) {
        this.pagination.total = page;
    },
    // 重置查询
    reset() {
      this.search = {
        page: 1,
        pageSize: 10,
        contactPhone: "", //联系电话
        licenseNo: "", //烟草证号
        shopName: "" //店铺名称
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

      this.$request.post('/saasHbseller/sellerRebate/statics/rankByScanCodeNum', this.search, true, (res)=>{
          console.log(res.records)
          this.tableList = res.records || [];
          this.initPagination(res.total||0);
      });
    },
    modifyData(actCode, status) {
      this.$confirm(`您确认${status == 0 ? '删除':'启用'}此活动吗？ `, '提示', {
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
