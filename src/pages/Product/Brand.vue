<template>
    <div>
        <el-card class="box-card">
            <el-row>
                <el-button size="small" type="primary" @click="dataForm">新建</el-button>
            </el-row>
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="品牌名称">
                    <el-input size="small" v-model="search.name"></el-input>
                </el-form-item>
                <el-form-item label="使用状态">
                    <el-select size="small" v-model="search.status" placeholder="全部">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="list">查询</el-button>
                    <el-button size="small" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
            <!-- 数据表格 -->
            <el-table :data="tableList" style="width: 100%">
                <el-table-column label="序号" type="index" align="center">
                    <template slot-scope="scope">
                    {{ (search.pageNo-1)*search.pageSize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="品牌名称" align="center"></el-table-column>
                <el-table-column prop="status" label="使用状态" align="center">
                    <template slot-scope="scope">
                    {{scope.row.status==1?"已启用":"已停用"}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="220">
                    <template slot-scope="scope">
                    <el-button v-if="scope.row.status==1" size="mini" @click="dataForm(scope.$index, scope.row)">编辑</el-button>
                    <el-button v-if="scope.row.status==1" size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">停用</el-button>
                    <el-button v-if="scope.row.status==0" size="mini" @click="modifyData(scope.row.id, 1)">启用</el-button>
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
        <el-dialog title="品牌管理" width="30%" :visible.sync="form.show">
            <el-form label-width="100px">
                <el-form-item label="品牌名称">
                    <el-input size="small" v-model="form.name"></el-input>
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
                show: false, // 增库弹框是否展示
                id: '',
                name: ''
            }
        }
    },
    created() {
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

            this.$request.post('/api/saotx/prod/brands', this.search, true, (res)=>{
                if (res.ret == '200000') {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                }
            });
        },
        dataForm(index, row) {
            this.form.id = "";
            this.form.name = "";
            if(row&&row.id) {
                this.form.id = row.id;
                this.form.name = row.name;
            }
            this.form.show = true;
        },
        saveForm() {
            this.$request.post('/api/saotx/prod/brand/saveOrModify', this.form, true, (res)=>{
                if (res.ret == '200000') {
                    this.list();
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 修改数据状态：status=1启用；status=0停用
        modifyData(id, status) {
            let params = {id:id, status:status}
            this.$request.post('/api/saotx/prod/brand/mstatus', params, true, (res)=>{
                if (res.ret == '200000') {
                    this.list();
                    this.$message({type: 'success', message: '操作成功!'});
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
