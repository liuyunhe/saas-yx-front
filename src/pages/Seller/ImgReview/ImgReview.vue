<template>
    <div v-loading="loading">
        <el-card class="box-card">
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="审核状态：" >
                    <el-select size="small" v-model="search.auditStatus" placeholder="全部">
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="审核失败" value="3"></el-option>
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
                    {{ (search.pageNo-1)*search.pageSize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="license_no" label="烟草专卖号" align="center"></el-table-column>
                <el-table-column prop="shop_name" label="门店名称" align="center"></el-table-column>
                <el-table-column prop="owner_name" label="联系人姓名" align="center"></el-table-column>
                <el-table-column prop="owner_mobile" label="联系人电话" width="150" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="100">
                    <template slot-scope="scope">
                    <span v-if="scope.row.audit_status==1">待审核</span>
                    <span v-if="scope.row.audit_status==3">审核失败</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ctime" label="申请时间" align="center" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ctime">{{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                    <el-button v-if="scope.row.audit_status==1" size="mini" @click="dataForm(scope.$index, scope.row)">查看详情</el-button>
                    <span v-if="scope.row.audit_status==3">无</span>
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
        <el-dialog title="查看详情" width="1100px" :visible.sync="form.show" center @close="handleCloseForm">
            <el-form  :inline="true" style="text-align: center">
                <el-form-item>
                    <div style="margin-bottom: 20px">门头照片：</div>
                    <img :src="form.shopImg" style="display: block" width="500" alt="">
                </el-form-item>
                <el-form-item>
                    <div style="margin-bottom: 20px">烟草专卖零售许可证照：</div>
                    <img :src="form.licenseImg" style="display: block" width="500" alt="">
                </el-form-item>
                <div style="text-align: center">
                    <el-radio v-model="form.auditStatus" label="2">审核通过</el-radio>
                    <el-radio v-model="form.auditStatus" label="3">审核不通过</el-radio>
                </div>

            </el-form>
            <span slot="footer" class="dialog-footer" style="text-align: center">
                <el-button size="small" @click="form.show=false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
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
                auditStatus: "1"
            },
            pagination: { // 分页
                total: 0
            },
            tableList: [],

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
                auditStatus: '1'
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

            this.$request.post('/api/hsInfoAudit/list', this.search, true, (res)=>{
                if (res.code == '200') {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                }else {
                    this.$message.error(res.msg);
                }
            });
        },
        handleCloseForm(){
            this.form.id = "";
            this.form.shopImg = ""
            this.form.licenseImg = ""
            this.form.auditStatus = ""
        },
        dataForm(index, row) {
            this.loading = true
            this.form.id = "";
            if(row&&row.id) {
                this.form.id = row.id;
            }
            console.log(row)
            this.$request.post('/api/hsInfoAudit/detail', { itemId: this.form.id }, false, (res)=>{
                this.loading = false
                this.form.show = true;
                if (res.code == '200') {
                    this.form.licenseImg = res.data.hsUser.licenseImg
                    this.form.shopImg = res.data.hsUser.shopImg
                } else {
                    this.$message.error(res.msg);
                }
            });

        },
        submitForm() {
            if(!this.form.auditStatus){
                this.$message.error("请选择审核状态！");
                return
            }
            let params = {
                auditItemId: this.form.id,
                auditStatus: this.form.auditStatus
            }
            this.$request.post(' /api/hsInfoAudit/doAudit', params, false, (res)=>{
                if (res.code == '200') {
                    this.list();
                    this.form.show = false;
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
