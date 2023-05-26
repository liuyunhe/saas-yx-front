<template>
    <div>
        <el-card class="box-card" v-if="false">
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="对接方名称:">
                    <el-input size="small" v-model="search.name"></el-input>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="list">查询</el-button>
                    <el-button size="small" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
<!--        <div class="space"></div>-->
        <el-card>
            <!-- 数据表格 -->
            <el-table :data="tableList" style="width: 100%">
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="note" label="对接方名称" align="center"></el-table-column>
                <el-table-column prop="channel" label="渠道编码" align="center"></el-table-column>
                <el-table-column prop="pointsTotalAmount" label="累计积分总额度" align="center"></el-table-column>
                <el-table-column  label="可使用积分值" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.pointsTotalAmount - scope.row.pointsOutAmount }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ctime" label="对接时间" align="center" width="154px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.stime }}</span><br>
                        <span>至</span><br>
                        <span>{{ scope.row.etime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="220">
                    <template slot-scope="scope">
                    <el-button  size="mini" @click="dataForm(scope.$index, scope.row)">增库</el-button>
                    <el-button  size="mini" @click="dataTimeForm(scope.row.id, scope.row)"> 延长时间</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="space"></div>
            <!-- 分页组件 -->
            <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                @size-change="sizeChange" @current-change="currentChange"
                :current-page="search.pageNo" :page-size="search.pageSize"
                :total="pagination.total">
            </el-pagination>
        </el-card>
        <el-dialog title="积分增库" width="40%" :visible.sync="form.show">
            <el-form label-width="170px">
                <el-form-item label="对接方名称:">
                    <span>{{ form.name }}</span>
                </el-form-item>
                <el-form-item label="可使用积分值:">
                    <span>{{ form.points }}</span>
                </el-form-item>
                <el-form-item label="增加积分值:">
                  <el-input-number size="small" controls-position="right" :min="0"  v-model="form.pointsAdd" placeholder="请输入增库积分值"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="form.show=false;form.pointsAdd = null">取 消</el-button>
                <el-button size="small" type="primary" @click="saveForm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="延长时间" width="40%" :visible.sync="timeForm.show">
          <el-form label-width="170px">
            <el-form-item label="对接方名称:">
              <span>{{ timeForm.name }}</span>
            </el-form-item>
            <el-form-item label="对接结束时间:">
              <span>{{ timeForm.etime }}</span>
            </el-form-item>
            <el-form-item label="延长时间:">
              <el-date-picker
                  v-model="timeForm.newEndTime"
                  type="datetime"
                  :picker-options="pickerOptions"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
                  <el-button size="small" @click="timeForm.show=false;timeForm.newEndTime = null">取 消</el-button>
                  <el-button size="small" type="primary" @click="saveTimeForm">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: {
                pageNo: 1,
                pageSize: 10,
                name: '',
            },
            pagination: { // 分页
                total: 0
            },
            tableList: [],

            form: {
                show: false, // 增库弹框是否展示
                name: '',
                id: '',
                points:null,
                pointsAdd:null
            },
            timeForm: {
                show: false, // 增库弹框是否展示
                name: '',
                id: '',
                etime:null,
                newEndTime:null
            },
            pickerOptions: {},
        }
    },
    created() {
        this.list();
    },
    methods: {
        currentChange(pageNo) {
            // 分页pageNo变更监听
            this.list(event, pageNo);
        },
        sizeChange(pageSize) {
            // 分页pageNo变更监听
            this.list(event, null, pageSize);
        },
        // page = {"pageCount":总页数, "count":总数据条数}
        initPagination(page) {
            if(page) {
                this.pagination.total = page.count;
            }
        },
        // 重置查询
        reset() {
            this.search = {
                pageNo: 1,
                pageSize: 10,
                name: '',
            }
            this.list();
        },
        // 查询礼品库列表数据
        list(_event, pageNo, pageSize) {
            let _pageNo = 1;
            if(pageNo) _pageNo = pageNo;
            this.search.pageNo = _pageNo;
            let _pageSize = 10;
            if(pageSize) _pageSize = pageSize;
            this.search.pageSize = _pageSize;

            this.$request.post('/api/apiAuth/config/list', this.search, true, (res)=>{
                if (res.code == '200') {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                }
            });
        },
        dataForm(index, row) {
            this.form.id = row.id;
            this.form.name = row.note;
            this.form.points = row.pointsTotalAmount - row.pointsOutAmount
            this.form.show = true;
        },

        saveForm() {
          if(this.form.pointsAdd <= 0) {
            this.$message.error("增库值不能为空且必须是大于0的整数！");
            return false;
          }
            this.$request.post('/api/apiAuth/config/addPoints', {id:this.form.id,pointsAdd:this.form.pointsAdd}, false, (res)=>{
                if (res.code == '200') {
                    this.list();
                    this.form.show = false;
                    this.form.pointsAdd = null
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        dataTimeForm(index, row) {
          this.timeForm.id = row.id;
          this.timeForm.name = row.note;
          this.timeForm.etime = row.etime
          this.pickerOptions = {
            disabledDate:(time) => {
              return time.getTime() <= new Date(row.stime).getTime()
            },
          }
          this.timeForm.show = true;
        },
        saveTimeForm() {
          if(!this.timeForm.newEndTime ) {
            this.$message.error("请选择结束时间！");
            return false;
          }
            this.$request.post('/api/apiAuth/config/updateEtime', {id:this.timeForm.id,newEndTime:this.timeForm.newEndTime}, false, (res)=>{
                if (res.code == '200') {
                    this.list();
                    this.timeForm.show = false;
                    this.timeForm.newEndTime = null
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
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
