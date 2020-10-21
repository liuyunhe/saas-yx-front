<template>
    <div v-loading="loading">
        <el-card class="box-card">
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="状态：" >
                    <el-select size="small" v-model="search.status" placeholder="全部">
                        <el-option label="提现中" value="1"></el-option>
                        <el-option label="提现成功" value="2"></el-option>
                        <el-option label="提现失败" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="转账时间：">
                    <el-date-picker
                        v-model="search.time"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width: 200px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobile">
                    <el-input v-model="search.mobile"></el-input>
                </el-form-item>
                <div></div>
                <div style="width: 100%">
                    <el-button size="small" type="primary" @click="list">查询</el-button>
                    <el-button size="small" @click="reset">重置</el-button>
                    <el-button size="small" type="primary" @click="exportData" style="float: right">导出转账失败列表</el-button>
                    <el-button size="small" type="primary" @click="showTransferAccounts = true" style="float: right">重新转帐</el-button>
                </div>
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
                    <span v-if="scope.row.status==1">待审核</span>
                    <span v-if="scope.row.status==3">审核失败</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ctime" label="申请时间" align="center" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ctime">{{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                    <el-button v-if="scope.row.status==1" size="mini" @click="dataForm(scope.$index, scope.row)">查看详情</el-button>
                    <span v-if="scope.row.status==3">无</span>
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
        <el-dialog title="查看详情" width="400px" :visible.sync="form.show" center @close="handleCloseForm">
            <div style="width: 300px; text-align: center;margin: 0 auto">{{ form.tips }}</div>
            <span slot="footer" class="dialog-footer" style="text-align: center">
                <el-button size="small" @click="form.show=false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="重新转账" width="400px" :visible.sync="showTransferAccounts" center @close="">
            <div style="width: 300px; text-align: center;margin: 0 auto">当前系统检测到有19条转账失败记 录，是否重新提现？</div>
            <span slot="footer" class="dialog-footer" style="text-align: center">
                <el-button size="small" @click="showTransferAccounts = false">取 消</el-button>
                <el-button size="small" type="primary" @click="">确 定</el-button>
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
                status: "1",
                mobile:"",
                time:""
            },
            pagination: { // 分页
                total: 0
            },
            tableList: [],

            form: {
                show: false, // 增库弹框是否展示
                id: '',
                tips: '',
            },
            loading:false,
            showTransferAccounts: false
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
                status: '1',
                mobile: "",
                time:""
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
            this.form.tips = ""
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
                    this.form.tips = res.data.hsUser.licenseImg
                } else {
                    this.$message.error(res.msg);
                }
            });

        },
        exportData(){//导出
            var url = "/api/wiseqr/order/export";
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            for(var attr in this.form) {
                formData.append(attr, this.form[attr]);
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
    }
}
</script>

<style scoped>
    .space {position:relative;width:100%;height:20px;}
    .el-input, .el-select {
        width: 200px;
    }
</style>
