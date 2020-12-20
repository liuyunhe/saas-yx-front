<template>
    <div v-loading="loading">
        <el-card class="box-card">
            <el-row>
                <el-button size="small" type="primary" @click="dataNewForm">新建活动类型</el-button>
            </el-row>
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="ID：">
                    <el-input size="small" v-model="search.id"></el-input>
                </el-form-item>
                <el-form-item label="类型名称：">
                    <el-input size="small" v-model="search.name"></el-input>
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
                <el-table-column prop="id" label="活动类型ID" align="center"></el-table-column>
                <el-table-column prop="name" label="活动类型名称" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="dataForm(scope.$index, scope.row)">绑定销区</el-button>
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
        <el-dialog title="新增活动类型" width="380px" :visible.sync="showNewForm">
            <el-form label-width="100px">
                <el-form-item label="类型名称：">
                    <el-input size="small" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="关联销区：">
                    <el-select size="small" v-model="form.saleZones" multiple collapse-tags filterable placeholder="请选择">
                        <el-option
                            v-for="(item,index) in saleZone"
                            :key="index"
                            :label="item.zoneName"
                            :value="item.zoneCode"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="showNewForm = false">取 消</el-button>
                <el-button size="small" type="primary" @click="saveNewForm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="绑定销区" width="380px" :visible.sync="form.show">
            <el-form label-width="100px">
                <el-form-item label="类型名称：">
                    <el-input readonly size="small" v-model="form.name"></el-input>
                </el-form-item>
              <el-form-item label="关联销区：">
                <el-select size="small" v-model="form.saleZones" multiple collapse-tags filterable placeholder="请选择">
                  <el-option
                      v-for="(item,index) in saleZoneUsed"
                      :key="index"
                      :label="item.zone_name"
                      :value="item.zone_code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="form.show=false">取 消</el-button>
                <el-button size="small" type="primary" @click="saveForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            search: {
                pageNo: 1,
                pageSize: 10,
                name: '',
                status: ''
            },
            pagination: { // 分页
                total: 0
            },
            tableList: [],

            form: {
                show: false, // 绑定销区弹框是否展示
                id: '',
                saleZones: []
            },
            saleZone:[],
            saleZoneUsed:[],
            showNewForm: false
        }
    },
    created() {
        this.getSaleZone()
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
        getSaleZone() {
            this.$request.post('/api/saleZone/listNoQ ', {}, true, (res)=>{
                if (res.code == '200') {
                    this.saleZone = res.data||[];
                }
            });
        },
        // 重置查询
        reset() {
            this.search = {
                pageNo: 1,
                pageSize: 10,
                name: '',
                status: ''
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

            this.$request.post('/api/actTag/list', this.search, true, (res)=>{
                if (res.code == '200') {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                }
            });
        },
        dataNewForm() {
            this.form.id = "";
            this.form.name = "";
            this.form.saleZones = [];
            this.showNewForm = true;
        },
        saveNewForm() {
            let params = {
                name: this.form.name,
                saleZones: this.form.saleZones.join(","),
            }
            this.$request.post('/api/actTag/add', params, false, (res)=>{
                if (res.code && res.code == '200') {
                    this.list();
                    this.showNewForm = false;
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
                    this.$message.error(res.message||res.msg);
                }
            });
        },
        dataForm(index, row) {
            this.form.id = "";
            this.form.saleZones = [];
            if(row&&row.id) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.loading = true
                this.$request.post('/api/actTag/actType/zoneList', {id: row.id}, false, (res)=>{
                  this.loading = false
                  this.form.show = true;
                  if (res.code && res.code == '200') {
                    this.saleZoneUsed = res.data||[];
                    this.saleZoneUsed.forEach((item) => {
                      if(item.checked == 1){
                        this.form.saleZones.push(item.zone_code)
                      }
                    })
                  } else {
                    this.$message.error(res.msg || res.message);
                  }
                });
            }

        },
        saveForm() {
            if(this.form.saleZones.length == 0){
              this.$message.error("绑定销区不能为空");
              return
            }
            let params = {
              id: this.form.id,
              saleZones:this.form.saleZones.join(",")
            }
            this.$request.post('/api/actTag/update/saleZone', params, false, (res)=>{
                if (res.code && res.code == '200') {
                    this.list();
                    this.form.show = false;
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
                    this.$message.error(res.msg || res.message);
                }
            });
        },
        // 修改数据状态：status=1启用；status=0停用
        modifyData(id, status) {
            let params = {id:id, status:status}
            this.$request.post('/api/wiseqr/prod/brand/mstatus', params, true, (res)=>{
                if (res.code == '200') {
                    this.list();
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
                    this.$message.error(res.msg);
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
