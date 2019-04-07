<template>
  <div>
    <el-card class="box-card">
        <!-- 数据查询条件 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="操作类型">
              <el-select size="small" v-model="form.operType" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(label, value) in types" :key="value" :label="label" :value="value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <div class="block">
                    <el-date-picker  size="small"
                        v-model="form.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input size="small" v-model="form.userName"></el-input>
            </el-form-item>
            <div></div>
            <el-form-item>
                <el-button size="small" type="primary" @click="list">查询</el-button>
                <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
      </el-card>
      <div class="space"></div>
      <el-card class="box-card">
        <!-- 数据表格 -->
        <el-table v-loading="loading" :data="tableList" style="width: 100%">
          <el-table-column label="序号" type="index" align="center">
            <template slot-scope="scope">
              {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="operUsername" label="用户名" align="center" width="140"></el-table-column>
          <el-table-column label="时间" align="center" width="160">
            <template slot-scope="scope">
              {{new Date(scope.row.operTime).Format("yyyy-MM-dd hh:mm:ss")}}
            </template>
          </el-table-column>
          <el-table-column prop="clientIp" label="IP" align="center" width="130"></el-table-column>
          <el-table-column prop="operName" label="操作类型" align="center" width="80"></el-table-column>
          <el-table-column prop="operBusiness" label="模块" align="center" width="120"></el-table-column>
          <el-table-column prop="operContent" label="操作详情" align="center"></el-table-column>
        </el-table>
        <div class="space"></div>
        <!-- 分页组件 -->
        <el-pagination background layout="total, prev, pager, next, jumper"
            @size-change="sizeChange" @current-change="currentChange"
            :current-page="form.pageNo" :page-size="form.pageSize"
            :total="pagination.total">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        loading: false, // 是否查询中
        types: [],
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            // selectDate = { maxDate, minDate }
            onPick(selectDate) {
                //console.log(selectDate.minDate);
                //console.log(selectDate.maxDate);
            }
        },
        form: { // 查询区域
            pageNo: 1,
            pageSize: 10, 
            operType: "", // 操作类型
            time: [], // 查询时间
            stime: "", // 开始时间：年-月-日 时:分:秒
            etime: "", // 结束时间：年-月-日 时:分:秒
            userName: "" // 用户名
        },
        tableList: [],
        pagination: { // 分页
            total: 0
        }
    }
  },
  created() {
      let _now = new Date();
      this.form.time = [_now.Format("yyyy-MM-dd")+" 00:00:00", _now];
      this.getTypes();
      this.list();
  },
  methods: {
    currentChange(pageNo) {
      // 分页pageNo变更监听
      this.list(event, pageNo);
    },
    sizeChange(pageSize) {
      // 分页pageSize变更监听
      this.list(event, null, pageSize);
    },
    // 查询所有的操作类型
    getTypes() {
      this.$request.post('/api/wiseqr/log/types', {pageSize:-1}, true, (res)=>{
        if (res.ret == '200000') {
          this.types = res.data||{};
        }
      });
    },
    // 重置查询
    resetForm() {
      this.form = {
        pageNo: 1,
        pageSize: 10, 
        operType: "", // 操作类型
        stime: "", // 开始时间：年-月-日 时:分:秒
        etime: "", // 结束时间：年-月-日 时:分:秒
        userName: "" // 用户名
      };
      let _now = new Date();
      this.form.time = [_now.Format("yyyy-MM-dd")+" 00:00:00", _now];
      this.list();
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(page) {
      if(page) {
        this.pagination.total = page.count;
      }
    },
    // 查询礼品库列表数据
    list(_event, pageNo, pageSize) {
      if(pageNo) {
        this.form.pageNo = pageNo;
      } else {
        this.form.pageNo = 1;
      }
      if(pageSize) {
        this.form.pageSize = pageSize;
      } else {
        this.form.pageSize = 10;
      }

      this.loading = true;
      if(this.form.time&&this.form.time.length==2) {
          this.form.stime = new Date(this.form.time[0]).Format("yyyy-MM-dd hh:mm:ss");
          this.form.etime = new Date(this.form.time[1]).Format("yyyy-MM-dd hh:mm:ss");
      } else {
          this.form.stime = this.form.etime = "";
      }
      this.$request.post('/api/wiseqr/log/list', this.form, true, (res)=>{
          this.loading = false;
          if (res.ret == '200000') {
              this.tableList = res.data.list || [];
              this.initPagination(res.data.page||{});
          } else {
              this.$message.error(res.message);
          }
      });
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
