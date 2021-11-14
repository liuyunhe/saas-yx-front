<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div class="space"></div>
        <div class="add-new-seller clearfix">
          <el-button type="primary" size="small"  @click="addNewMessage()">新建消息</el-button>
        </div>
        <div style="height:20px"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item :size="'small'" label="消息名称：">
          <el-input placeholder="请输入内容" v-model="search.title"  style="width: 200px" />


        </el-form-item>
        <el-form-item label="目标销区：" prop="saleZoneCode">
          <el-select size="small" v-model="search.saleZoneCode" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :size="'small'" label="状态：">
          <el-select
              v-model="search.status"
              placeholder="请选择"
              style="width: 200px">
            <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :size="'small'" label="接受人：">
          <el-select
              v-model="search.msgTarget"
              placeholder="请选择"
              style="width: 200px">
            <el-option
                v-for="item in msgTargetList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
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
        <el-table-column prop="title" label="消息主标题" align="center"></el-table-column>
        <el-table-column prop="saleZoneCode" label="目标销区" align="center">
          <template slot-scope="scope">
            {{ getSaleZoneName(scope.row.saleZoneCode) }}
          </template>
        </el-table-column>
        <el-table-column prop="optAccount" label="创建人" align="center"></el-table-column>
        <el-table-column prop="msgTarget" label="接收人" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.msgTarget == 1">零售户</span>
            <span v-if="scope.row.msgTarget == 2">消费者</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间"  align="center"></el-table-column>
        <el-table-column prop="sendTime" label="发送时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">待发送</span>
            <span v-if="scope.row.status == 1">已发送</span>
            <span v-if="scope.row.status == 2">已作废</span>
          </template>
        </el-table-column>
        <el-table-column prop="scanCodeNum" label="操作" align="center">
          <template slot-scope="scope" >
            <el-button
                v-if="scope.row.status == '0'"
                type="text"
                size="mini"
                @click="editMessage(scope.row.id)"
            >编辑</el-button>
            <el-button
                v-if="scope.row.status == '0' || scope.row.status == '1'"
                type="text"
                size="mini"
                @click="disapproval(scope.row.id)"
            >作废</el-button>
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
        title: '',
        status:null,
        msgTarget:null,
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? 'ZXQ' : sessionStorage.getItem('saleZoneCode'),
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],
      saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? 'ZXQ' : sessionStorage.getItem('saleZoneCode'),
      saleZone:[],
      statusList:[
        {
          code:null,
          name:"全部"
        },
        {
          code:"0",
          name:"待发送"
        },
        {
          code:"1",
          name:" 已发送"
        },
        {
          code:"2",
          name:"已作废"
        },
      ],
      msgTargetList:[
        {
          code:null,
          name:"全部"
        },
        {
          code:"1",
          name:"零售户"
        },
        {
          code:"2",
          name:" 消费者"
        },
      ],
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
    this.getSaleZone()
    this.list();
  },
  methods: {
    addNewMessage(){
      this.$router.push('/seller/addMessage')
    },
    editMessage(id){
      this.$router.push(`/seller/editMessage?id=${id}`)
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
    disapproval(msgId){
      let params = {msgId}
      this.$confirm(`您确定作废此条信息？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(params)
        this.$request.post('/saasHbseller/msg/system/del',params,false,res => {
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
    inputWithSelectChange(val){
      this.filters.keywords = ""
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
        title: '',
        status:null,
        msgTarget:null,
        saleZoneCode: this.saleZoneCode,
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
      this.$request.post('/saasHbseller/msg/system/query', this.search, true, (res)=>{
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
