<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item :size="'small'" label="关键词：">
          <el-input placeholder="请输入内容" v-model="search.keyValue" class="input-with-select" style="width: 300px">
            <el-select v-model="search.keyType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
              <el-option label="烟草证号" value="1"></el-option>
              <el-option label="联系人姓名" value="2"></el-option>
              <el-option label="联系人手机号" value="3"></el-option>
              <el-option label="门店名称" value="4"></el-option>
              <el-option label="业务员名称" value="5"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="销区：" prop="saleZoneCode">
          <el-select size="small" v-model="search.saleZoneCode" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
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
        <el-table-column prop="title" label="邀约模板" align="center"></el-table-column>
        <el-table-column prop="msgContent" label="详细内容" align="center"></el-table-column>
        <el-table-column prop="licenseNo" label="烟草专卖号" align="center"></el-table-column>
        <el-table-column prop="shopName" label="门店名称" width="150" align="center"></el-table-column>
        <el-table-column prop="contactName" label="发起人"  align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系人电话" align="center"></el-table-column>
        <el-table-column prop="saleZoneName" label="所属销区" align="center"></el-table-column>
        <el-table-column prop="ctime" label="发起时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">已通过</span>
            <span v-if="scope.row.status == 2">未通过</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button
                type="text"
                size="mini"
                @click="getDetail(scope.row.id)"
            >查看</el-button>
            <el-button
                v-if="scope.row.status == '0'"
                type="text"
                size="mini"
                @click="getDetail(scope.row.id)"
            >审核通过</el-button>
            <el-button
                v-if="scope.row.status == '0'"
                type="text"
                size="mini"
                @click="getDetail(scope.row.id)"
            >审核不通过</el-button>

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
    <el-dialog
        title=" 活动邀约审核"
        :visible.sync="dialogVisible"
        width="900px"
        center
        :before-close="cancelDialog">
      <div style="text-align: center" v-if="hbsSeller&&sellerInvite">
        <div class="basic-msg-broad" >
          <div class="basic-msg-item"><span class="title">烟草专卖号：</span>{{ hbsSeller.licenseNo }}</div>
          <div class="basic-msg-item"><span class="title">门店名称：</span>{{ hbsSeller.shopName }}</div>
          <div class="basic-msg-item"><span class="title">发起人：</span>{{ hbsSeller.contactName }}</div>
          <div class="basic-msg-item"><span class="title">联系电话：</span>{{ hbsSeller.contactPhone }}</div>
          <div class="basic-msg-item"><span class="title">所属销区：</span>{{ getSaleZoneName(hbsSeller.saleZoneCode) }}</div>
          <div class="basic-msg-item"><span class="title">发起时间：</span>{{ sellerInvite.ctime }}</div>
        </div>
        <div class="basic-title">邀约模板</div>
        <div class="basic-msg"><span class="title">主标题：</span>{{ sellerInvite.title }}</div>
        <div class="basic-msg"><span class="title">副标题：</span>{{ sellerInvite.subTitle }}</div>
        <div class="basic-msg"><span class="title">详细内容：</span><span class="content">{{ sellerInvite.msgContent }}</span></div>
        <div></div>
        <el-form label-width="162px" v-if="sellerInvite.status == 0">
          <el-form-item label="审核状态："  prop="status" size="small" style="width: 385px">
            <el-input v-model="ruleForm.status" style="display: none" ></el-input>
            <el-radio v-model="ruleForm.status" label="1" >审核通过</el-radio>
            <el-radio v-model="ruleForm.status" label="2" >审核不通过</el-radio>
          </el-form-item>
          <el-form-item  label="审核不通过理由：" v-if="ruleForm.status == 2" prop="auditMsg" size="small" style="width: 400px">
            <el-input v-model="ruleForm.auditMsg" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <el-button size="small" @click="cancelDialog">关闭</el-button>
        <el-button size="small" type="primary" v-if="sellerInvite.status == 0" @click="approval">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      search: {
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
        page: 1,
        pageSize: 10,
        keyType:'',
        keyValue:'',
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],
      saleZone:[],
      form: {
        show: false, // 增库弹框是否展示
        id: '',
        shopImg: '',
        licenseImg: '',
        auditStatus: ''
      },
      loading:false,
      txId:null,
      dialogVisible:false,
      hbsSeller:null,
      sellerInvite:null,
      ruleForm:{
        status:null,
        auditMsg:null,
      }
    }
  },
  created() {
    this.getSaleZone();
    this.list();
  },
  methods: {
    cancelDialog(){
      this.dialogVisible = false
      this.ruleForm.status = null
      this.ruleForm.auditMsg = null
    },
    getDetail(id){
      this.txId = id
      this.$request.post('/saasHbseller/sellerInvite/detail', {id}, false, (res) => {
        if (res.code == '200') {
          this.hbsSeller = res.data.hbsSeller
          this.sellerInvite = res.data.sellerInvite
          this.dialogVisible = true
        }else {
          this.$message({
            message: res.msg ,
            type: 'warning'
          });
        }
      })
    },
    approval(){
      if(!this.ruleForm.status) {
        this.$message({
          message: '请选择是否通过此邀约',
          type: 'warning'
        });
        return
      }
      let params = {id:this.txId,status:this.ruleForm.status,auditMsg:this.ruleForm.auditMsg}
      this.$confirm(`您确定${this.ruleForm.status == 1?'':'不'}通过此邀约审核？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.post('/saasHbseller/sellerInvite/audit',params,false,res => {
          if(res.code == 200){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.dialogVisible = false
            this.ruleForm.status = null
            this.ruleForm.auditMsg = null
            this.list();
          }else{
            console.log(res)
            this.$message({
              message: res.msg,
              type: 'warning'
            });
            this.dialogVisible = false
            this.ruleForm.status = null
            this.ruleForm.auditMsg = null
            this.list();
          }
        })
      })
    },
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
        if (res.code == '200') {
          this.saleZone = res.data || []
          if (this.isAllSaleZone == 1) {
          } else {
            this.search.saleZoneCode = this.saleZoneCode
          }
        }
      })
    },
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
    inputWithSelectChange(val){
      this.search.keyValue = ""
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
        saleZoneCode: this.saleZoneCode,
        keyType:'',
        keyValue:'',
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
      this.$request.post('/saasHbseller/sellerInvite/list', this.search, true, (res)=>{
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

<style lang="scss" scoped>
.space {position:relative;width:100%;height:20px;}
.el-input, .el-select {
  width: 200px;
}
.basic-msg-broad{
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  color:#606266;
  margin: 0 30px 20px;
  .basic-msg-item{
    width: 33.3%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow:ellipsis ;
    white-space: nowrap;
    text-align: left;
    .title{
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 20px;
    }
  }

}
.basic-title{
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}
.basic-msg {
  text-align: left;
  line-height: 40px;
  .title{
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 20px;
    vertical-align: top;
  }
  .content{
    display: inline-block;
    width: 400px;
    text-align: left;
  }
}
</style>
