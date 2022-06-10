<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-form :inline="true" :model="search">
          <el-form-item label="状态:" >
            <el-select  v-model="search.status" placeholder="请选择">
              <el-option  label="待审核" value="1"></el-option>
              <el-option  label="提现完成" value="2"></el-option>
              <el-option  label="审核未通过" value="3"></el-option>
              <el-option  label="待转账" value="4"></el-option>
              <el-option  label="转账失败，但还在重试中" value="5"></el-option>
              <el-option  label="多次转账失败，不再重试" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="零售户手机号：">
            <el-input size="small"  v-model="search.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="零售户烟草证号：">
            <el-input size="small"  v-model="search.licenseNo"></el-input>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
                v-model="search.txTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到账时间：">
            <el-date-picker
                v-model="search.optFinishTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <div></div>
          <el-form-item>
            <el-button size="small" type="primary" @click="list">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
            <el-button  size="small" type="primary" plain  @click="exportData" >导出列表</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 数据查询条件 -->
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList"  @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column
            v-if="showSelection"
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column prop="licenseNo" label="烟草专卖证号" align="center"></el-table-column>
        <el-table-column prop="addr" label="门店地址" align="center"></el-table-column>
        <el-table-column prop="contactName" label="经营人姓名" align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系人电话" align="center"></el-table-column>

        <el-table-column prop="rebateNum" label="账户剩余荷石璧" align="center">
          <template slot-scope="scope">
<!--            ￥{{ scope.row.txAmount }}-->
          </template>
        </el-table-column>
        <el-table-column prop="txAmount" label="提现荷石璧" align="center">
          <template slot-scope="scope">
            {{ scope.row.txAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="txTime" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="optFinishTime" label="到账时间" align="center"></el-table-column>
        <el-table-column prop="status" label="提现状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-if="scope.row.status == 2">提现完成</span>
            <span v-if="scope.row.status == 3">审核未通过</span>
            <span v-if="scope.row.status == 4">待转账 </span>
            <span v-if="scope.row.status == 5">转账失败，但还在重试中</span>
            <span v-if="scope.row.status == 6">多次转账失败，不再重试</span>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
        >
          <template slot-scope="scope" >
            <el-button
                v-if="scope.row.status == '1'"
                type="text"
                size="mini"
                @click="approval(scope.row.id)"
            >审核通过</el-button>
            <el-button
                v-if="scope.row.status == '1'"
                type="text"
                size="mini"
                @click="disapprovalDialog(scope.row.id)"
            >审核不通过</el-button>
            <el-popover
                v-if="scope.row.status == '5' || scope.row.status == '6'"
                placement="bottom"
                title="失败原因："
                width="200"
                trigger="click"
                :content="scope.row.errMsg">
              <el-button
                  slot="reference"
                  type="text"
                  size="mini"
              >失败原因</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
      <el-col :span="24" class="footer-toolbar" style="height: 50px">
        <el-button
            v-if="showSelection"
            type="primary"
            size="small"
            :disabled="batchOperations"
            @click="modifyAuthOrder(ids,true)"
            style="float: left"
        >批量通过</el-button>
        <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                       @size-change="sizeChange" @current-change="currentChange"
                       :current-page="search.page" :page-size="search.pageSize"
                       :total="pagination.total">
        </el-pagination>
      </el-col>
    </el-card>

    <el-dialog
        title="请输入审核不通过理由"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="cancelDialog">
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="failReason">
      </el-input>
      <div style="text-align: center;margin-top: 30px">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="disapproval">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSelection:false,
      search: {
        page: 1,
        pageSize: 10,
        contactPhone: "", //联系电话
        licenseNo: "", //烟草证号
        status:null,
        txTime:null, //提现时间
        optFinishTime:null //到账时间
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],

      form: {
        show: false, // 增库弹框是否展示
        id: '',
        name: ''
      },
      dialogVisible:false,
      failReason:'',
      txId:'',
      ids:'',
      batchOperations:true,
    }
  },
  created() {
    this.list();
  },
  methods: {
    exportData(){//导出
      var url = "/saasHbseller/sellerRebate/statics//tx/points/list/ExportData";
      var xhr = new XMLHttpRequest();
      // var formData = new FormData();
      // for(var attr in this.search) {
      //   formData.append(attr, this.search[attr]);
      // }
      var formData = JSON.stringify(this.search)
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
      xhr.open('POST', url, true);
      xhr.responseType = "blob";
      xhr.responseType = "arraybuffer";
      xhr.setRequestHeader('Content-Type','application/json');
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
    handleClickFailNotes(msg){

    },
    handleSelectionChange(val) {
      let arr = val
      console.log(arr)
      let idsArr = []
      if(arr.length > 0 ){
        this.batchOperations = false
        arr.map((e,i) => {
          idsArr.push(e.id)
        })
        this.ids = idsArr.join(",")
      }else{
        this.ids = ""
        this.batchOperations = true
      }

    },
    approval(sellerId){
      let params = {ids:sellerId}
      this.$confirm(`您确定审核通过？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.post('/saasHbseller/sellerRebate/tx/points/agree',params,false,res => {
          if(res.code == "200" && !res.data.failList.length){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.list()
          }else{
            this.$message({
              message: res.msg ? res.msg : `id为${res.data.failList.join(',')}的条目操作失败！`,
              type: 'warning'
            });
          }
        })
      })
    },
    disapproval(){
      let params = {id:this.txId,authNote:this.failReason}
      this.$confirm(`您确定审核不通过？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.post('/saasHbseller/sellerRebate/tx/points/unAgree',params,false,res => {
          if(res.code == 200){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.dialogVisible = false
            this.failReason = ""
            this.list()
          }else{
            console.log(res)
            this.$message({
              message: res.msg,
              type: 'warning'
            });
            this.dialogVisible = false
            this.failReason = ""
            this.list()
          }
        })
      })
    },
    modifyAuthOrder(ids,batch) {
      let params = {ids:ids}
      let _batch = ""
      if(batch){
        _batch = "批量"
      }
      this.$confirm(`您确定${_batch}审核通过？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$request.post('/sc/saotx/mall/order/authOrder',params,true,res => {
        this.$request.post('/saasHbseller/sellerRebate/tx/redpack/agree',params,false,res => {
          if(res.code == "200" && !res.data.failList.length){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.list()
          }else{
            this.$message({
              message: res.msg || `操作失败：id为 ${res.data.failList.join(',')}`,
              type: 'warning'
            });
          }
        })
      })
    },
    disapprovalDialog(id){
      this.dialogVisible = true
      this.txId = id
    },
    cancelDialog(){
      this.dialogVisible = false
      this.failReason = ""
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
        status:null, //提现时间
        txTime:null, //提现时间
        optFinishTime:null //到账时间
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

      this.$request.post('/saasHbseller/sellerRebate/statics//tx/points/list', this.search, true, (res)=>{
        console.log(res.records)
        this.tableList = res.records || [];
        this.initPagination(res.total||0);
        if(this.search.status == 1){
          this.showSelection = true
        }else {
          this.showSelection = false
        }
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
