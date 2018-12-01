<template>
    <div>
        <el-card>
            <el-row>
                <el-button size="small" type="primary" @click="newWhitelist">添加</el-button>
            </el-row>
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="form" class="search-block">
                <el-form-item label="关键词">
                    <el-input size="small" placeholder="请输入关键词" v-model="form.keywords" class="input-with-select">
                        <el-select v-model="form.keyType" slot="prepend" placeholder="请选择">
                            <el-option v-for="(name, value) in keyTypeList" :key="value" :value="value" :label="name"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="list">查询</el-button>
                    <el-button size="small" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="space"></div>
        <el-card>
            <!-- 数据表格 -->
            <el-table :data="tableList" style="width: 100%">
                <el-table-column label="序号" type="index" align="center" width="80px">
                    <template slot-scope="scope">
                        {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="shopName" label="门店名称" align="center"></el-table-column>
                <el-table-column prop="licenceNo" label="专卖许可证" align="center"></el-table-column>
                <el-table-column prop="ownerName" label="联系人姓名" align="center"></el-table-column>
                <el-table-column prop="phoneNo" label="联系人电话" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="modifySeller(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="text" @click="removeSeller(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="space"></div>
            <!-- 分页组件 -->
            <el-pagination background layout="total, prev, pager, next, jumper"
                @size-change="sizeChange" @current-change="currentChange"
                :current-page="form.pageNo" :page-size="form.pageSize"
                :total="pagination.total">
            </el-pagination>
        </el-card>

        <el-dialog center title="白名单管理" :visible.sync="modifyForm.show" width="30%" @closed="resetModifyForm">
            <div>
                <el-form class="search-block" label-width="100px">
                    <el-form-item label="门店名称">
                        <el-input size="small" v-model="modifyForm.shopName" :disabled="false&&!modifyForm.isNew" class="audit-score" placeholder="请输入门店名称"></el-input>
                    </el-form-item>
                    <el-form-item label="专卖许可证">
                        <el-input size="small" type="number" v-model="modifyForm.licenceNo" :disabled="false&&!modifyForm.isNew" class="audit-score" placeholder="请输入专卖许可证"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人姓名">
                        <el-input size="small" v-model="modifyForm.ownerName" class="audit-score" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" :required="true">
                        <el-input size="small" type="number" v-model="modifyForm.phoneNo" class="audit-score" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="modifyConfirm">确 定</el-button>
                <el-button size="small" @click="modifyForm.show=false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            keyTypeList: {
                1: "门店名称",
                2: "联系人姓名",
                3: "手机号",
                4: "专卖许可证"
            },
            form: {
                pageNo: 1,
                pageSize: 10,
                status: 1,
                keyType: "3",
                keywords: ""
            },
            pagination: {
                total: 0
            },
            tableList: [],
            
            modifyForm: {
                isNew: true,
                show: false,
                id: "",
                shopName: "",
                licenceNo: "",
                ownerName: "",
                phoneNo: ""
            }
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
            // 分页pageSize变更监听
            this.list(event, null, pageSize);
        },
        // page = {"pageCount":总页数, "count":总数据条数}
        initPagination(page) {
            if(page) {
                this.pagination.total = page.count;
            }
        },
        // 重置查询
        resetForm() {
            this.form = {
                pageNo: 1,
                pageSize: 10,
                status: 1,
                keyType: "3",
                keywords: ""
            };
            this.list();
        },
        // 查询礼品库列表数据
        list(_event, pageNo, pageSize) {
            let _pageNo = 1;
            if(pageNo) _pageNo = pageNo;
            this.form.pageNo = _pageNo;
            let _pageSize = 10;
            if(pageSize) _pageSize = pageSize;
            this.form.pageSize = _pageSize;

            this.loading = true;
            this.$request.post('/api/saotx/seller/whitelist', this.form, true, (res)=>{
                this.loading = false;
                if (res.ret==200000) {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        resetModifyForm() {
            this.modifyForm = {
                isNew: true,
                show: false,
                id: "",
                shopName: "",
                licenceNo: "",
                ownerName: "",
                phoneNo: ""
            }
        },
        removeSeller(index, row) {
            let params = {id: row.id, status: 0};
            this.$confirm('确认要删除白名单数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$request.post('/api/saotx/seller/mstatus', params, true, (res)=>{
                    if (res.ret==200000) {
                        this.list(null, this.form.pageNo, this.form.pageSize);
                    } else {
                        this.$message.error(res.message);
                    }
                });
            }).catch(() => {
                //this.addPool.show = false;
            });
        },
        modifySeller(index, row) {
            this.modifyForm = {
                isNew: false,
                show: true,
                id: row.id,
                shopName: row.shopName,
                licenceNo: row.licenceNo,
                ownerName: row.ownerName,
                phoneNo: row.phoneNo
            }
        },
        newWhitelist() {
            this.resetModifyForm();
            this.modifyForm.show = true;
        },
        modifyConfirm() {
            if(!/^1[0-9]{10}$/.test(this.modifyForm.phoneNo)) {
                this.$message.error("手机号格式错误！");
                return;
            }

            let url = "/api/saotx/seller/somWhitelist";
            if(this.modifyForm.isNew) {
                //if(!this.modifyForm.shopName||this.modifyForm.shopName.length>9) {
                //    this.$message.error("店铺名称不能为空，并且长度不能超过9个字！");
                //    return;
                //}
                //if(!this.modifyForm.licenceNo||this.modifyForm.licenceNo.length!=12) {
                //    this.$message.error("专卖许可证号不能为空，并且长度为12位！");
                //    return;
                //}
                //if(!this.modifyForm.ownerName) {
                //    this.$message.error("联系人姓名不能为空，并且长度不能超过9个字！");
                //    return;
                //}
            }
            this.$request.post(url, this.modifyForm, true, (res)=>{
                this.loading = false;
                if (res.ret==200000) {
                    this.resetModifyForm();
                    this.list();
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .space {position:relative;width:100%;height:20px;}
    .input-with-select {
        width: 300px;
        .el-select {
            width: 120px;
        }
    }
    .el-input {
        min-width: 20%;
        max-width: 90%;
    }
</style>
