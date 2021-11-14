<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item label="选择档位：" :size="'small'" prop="shopGearList">
          <el-select size="small"  v-model="search.shopGear" placeholder="请选择">
            <el-option value="" label="全部">全部</el-option>
            <el-option value="1" label="1档">1档</el-option>
            <el-option value="2" label="2档">2档</el-option>
            <el-option value="3" label="3档">3档</el-option>
            <el-option value="4" label="4档">4档</el-option>
            <el-option value="5" label="5档">5档</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择等级：" :size="'small'" prop="shopLevelList">
          <el-select size="small"  v-model="search.shopLevel" placeholder="请选择">
            <el-option value="" label="全部">全部</el-option>
            <el-option value="1" label="1级">1级</el-option>
            <el-option value="2" label="2级">2级</el-option>
            <el-option value="3" label="3级">3级</el-option>
            <el-option value="4" label="4级">4级</el-option>
            <el-option value="5" label="5级">5级</el-option>
            <el-option value="6" label="6级">6级</el-option>
            <el-option value="7" label="7级">7级</el-option>
            <el-option value="8" label="8级">8级</el-option>
          </el-select>
        </el-form-item>
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
        <el-table-column prop="shopGear" label="档位" align="center"></el-table-column>
        <el-table-column prop="shopLevel" label="等级" align="center"></el-table-column>
        <el-table-column prop="licenseNo" label="烟草专卖号" align="center"></el-table-column>
        <el-table-column prop="shopName" label="门店名称" width="150" align="center"></el-table-column>
        <el-table-column prop="contactName" label="经营人姓名"  align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系人电话" align="center"></el-table-column>
        <el-table-column
            prop="detailAddr"
            label="门店地址"
            width="120">
          <template slot-scope="scope">
            {{ scope.row.provName + scope.row.cityName + scope.row.countyName + scope.row.detailAddr }}
          </template>
        </el-table-column>
        <el-table-column property="saleZoneCode" label="销区" align="center" width="180px">
          <template slot-scope="scope">
            {{ getSaleZoneName(scope.row.saleZoneCode) }}
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
      saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      search: {
        page: 1,
        pageSize: 10,
        shopLevel:null,
        shopGear:null,
        keywordType:null,
        keyword:"",
        saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],
      saleZone: [],

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
    this.getSaleZone();
    this.list();
  },
  methods: {
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
        shopLevel:null,
        shopGear:null,
        keywordType:null,
        keyword:"",
        saleZoneCode:null
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
      this.$request.post('/saasHbseller/groupManager/query', this.search, true, (res)=>{
        if (res.code == '200') {
          this.tableList = res.data.infoList.records || [];
          this.initPagination(res.data.infoList.total);
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
