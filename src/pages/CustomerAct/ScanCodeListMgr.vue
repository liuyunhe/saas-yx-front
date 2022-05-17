<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-form :inline="true" :model="search">
          <el-row>
            <el-form-item label="零售户手机号：">
              <el-input size="small"  v-model="search.contactPhone"></el-input>
            </el-form-item>
            <el-form-item label="零售户烟草证号：">
              <el-input size="small"  v-model="search.licenseNo"></el-input>
            </el-form-item>
            <el-form-item label="门店名称：">
              <el-input size="small"  v-model="search.shopName"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="领奖时段:"  size="small">
              <el-date-picker  v-model="search.timeStart" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
            <el-form-item label="至" size="small" >
              <el-date-picker  v-model="search.timeEnd" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
            <el-form-item label="扫码单位:" size="small" >
              <el-select  v-model="search.unitType" placeholder="请选择">
                <el-option  label="全部" value=""></el-option>
                <el-option  label="盒" value="1"></el-option>
                <el-option  label="条" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="关联规格:">
              <el-select size="small" v-model="brandCode"  placeholder="请选择" @change="handleBrandChange">
                <el-option label="全部" value="all" ></el-option>
                <el-option v-for="item in brandList"  :label="item.name" :value="item.code" :key="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="brandCode !== 'all'">
              <el-select size="small" v-model="search.sn"  placeholder="请选择">
                <el-option v-for="item in (productList[brandCode] || [])" :key="item.sn" :label="item.allName" :value="item.sn">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
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
        <el-table-column prop="scanOpenid" label="微信openld" align="center"></el-table-column>
        <el-table-column prop="scanNickname" label="昵称" align="center"></el-table-column>
        <el-table-column prop="scanTime" label="扫烟码时间" align="center"></el-table-column>
        <el-table-column prop="prodName" label="关联规格" align="center"></el-table-column>
        <el-table-column prop="unitType" label="扫码单位" align="center"></el-table-column>
        <el-table-column prop="rebateValue" label="返现值" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 3">￥{{ scope.row.rebateValue }}</span>
            <span v-if="scope.row.type == 6">{{ scope.row.rebateValue }}荷石璧</span>
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
      brandCode:null,
      search: {
        page: 1,
        pageSize: 10,
        contactPhone: null, //联系电话
        licenseNo: null, //烟草证号
        shopName: null, //店铺名称
        timeStart: null, //开始时间
        timeEnd: null, //结束时间
        unitType: "", //扫码单位
        sn: null //规格
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],
      brandList:[],
      productList:[],
      form: {
        show: false, // 增库弹框是否展示
        id: '',
        name: ''
      }
    }
  },
  created() {
    this.getActSn()
    this.list()
  },
  methods: {
    getActSn(){
      this.$request.post('/saasHbseller/actCommon/actSn', {}, false, res => {
        if (res.code == '200') {
          this.brandList = Object.keys(res.data).map((item)=>{
            if(item === 'hebeizhongyan'){
              return {
                name:'钻石',
                code:item
              }
            }else if(item === 'hebeihehua') {
              return {
                name:'荷花',
                code:item
              }
            }
          })
          this.productList = res.data
          console.log(this.brandList)
          console.log(this.productList)
          return
        }
        this.$message.error(res.msg)
      })
    },
    handleBrandChange(value){
      console.log(value)
      this.search.sn = null
    },
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
      this.brandCode = null
      this.search = {
        page: 1,
        pageSize: 10,
        contactPhone: null, //联系电话
        licenseNo: null, //烟草证号
        shopName: null, //店铺名称
        timeStart: null, //开始时间
        timeEnd: null, //结束时间
        unitType: null, //扫码单位
        sn: null //规格
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

      this.$request.post('/saasHbseller/sellerRebate/statics/rebateDetail', this.search, true, (res)=>{
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
