<template>
    <div class="seller-review-container" v-loading="loading">
        <el-card class="box-card">
            <div class="space"></div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="关键词：">
                    <el-input size="small" placeholder="请输入关键词" v-model="search.keywords" class="input-with-select">
                        <el-select v-model="search.keyType" slot="prepend" placeholder="请选择">
                            <el-option v-for="(name, key) in keyTypeList" :key="key" :value="key" :label="name"></el-option>
                        </el-select>
                    </el-input>
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
                <el-table-column prop="licenseNo" label="烟草专卖号" align="center"></el-table-column>
                <el-table-column prop="shopName" label="门店名称" align="center"></el-table-column>
                <el-table-column prop="ownerName" label="联系人姓名" align="center"></el-table-column>
                <el-table-column prop="ownerMobile" label="联系人电话" width="150" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="100">
                    <template slot-scope="scope">
                    <span v-if="scope.row.status==1">上架中</span>
                    <span v-if="scope.row.status==2">下架中</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ctime" label="申请时间" align="center" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ctime">{{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="250">
                    <template slot-scope="scope">
                    <el-button size="mini" @click="dataForm(scope.$index, scope.row)">查看详情</el-button>
                    <el-button type="danger" v-if="scope.row.status==1" size="mini" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
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
                <div style="text-align: left">
                    <el-form-item label="烟草专卖号：" label-width="150px" style="width: 330px">{{ form.licenseNo }}</el-form-item>
                    <el-form-item label="门店名称：" label-width="150px" style="width: 330px">
                        <span
                            style="overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: inline-block;
                            width: 170px;"
                            :title="form.shopName"
                        >
                            {{ form.shopName }}
                        </span>
                    </el-form-item>
                    <el-form-item label="注册时间：" label-width="150px" style="width: 330px">{{ form.ctime }}</el-form-item>
                </div>
                <div style="text-align: left">
                    <el-form-item label="联系人：" label-width="150px" style="width: 330px">{{ form.ownerName }}</el-form-item>
                    <el-form-item label="联系电话：" label-width="150px" style="width: 330px">{{ form.ownerMobile }}</el-form-item>
                    <el-form-item label="图片审核时间：" label-width="150px" style="width: 330px">{{ form.utime }}</el-form-item>
                </div>
                <el-form-item>
                    <div style="margin-bottom: 20px">门头照片：</div>
                    <img :src="form.shopImg" style="display: block" width="500" alt="">
                </el-form-item>
                <el-form-item>
                    <div style="margin-bottom: 20px">烟草专卖零售许可证照：</div>
                    <img :src="form.licenseImg" style="display: block" width="500" alt="">
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer" style="text-align: center">
                <el-button size="small" type="primary" @click="form.show=false">确 定</el-button>
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
                keywords: "",
                keyType:""
            },
            pagination: { // 分页
                total: 0
            },
            tableList: [],
            keyTypeList:{
                "shopName": "门店名称",
                "ownerName": "联系人姓名",
                "ownerMobile": "联系人电话",
                "licenseNo": "烟草证号"
            },
            form: {
                show: false, // 增库弹框是否展示
                id: '',
                licenseNo:"",
                shopName:"",
                ownerMobile:"",
                ownerName:"",
                ctime:"",
                utime:"",
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
                keywords: "",
                keyType:""
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

            let params = {
                pageNo:this.search.pageNo,
                pageSize:this.search.pageSize
            }
            if(!this.search.keyType && this.search.keywords){
                this.$message.error('请选择关键词！');
                return
            }else {
                if(this.search.keyType){
                    params[this.search.keyType] = this.search.keywords
                }
            }
            this.$request.post('/api/hsUser/list', params, true, (res)=>{
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
            this.form.licenseNo = ""
            this.form.ownerName = ""
            this.form.ownerMobile = ""
            this.form.shopName = ""
            this.form.ctime = ""
            this.form.utime = ""
        },
        dataForm(index, row) {
            this.loading = true
            this.form.id = "";
            if(row&&row.id) {
                this.form.id = row.id;
            }
            console.log(row)
            this.$request.post('/api/hsUser/detail', { itemId: this.form.id }, false, (res)=>{
                this.loading = false
                this.form.show = true;
                if (res.code == '200') {
                    this.form.licenseNo = res.data.hsUser.licenseNo
                    this.form.ownerName = res.data.hsUser.ownerName
                    this.form.ownerMobile = res.data.hsUser.ownerMobile
                    this.form.shopName = res.data.hsUser.shopName
                    this.form.ctime = res.data.hsUser.ctime
                    this.form.utime = res.data.hsUser.utime

                    this.form.licenseImg = res.data.hsUser.licenseImg
                    this.form.shopImg = res.data.hsUser.shopImg
                } else {
                    this.$message.error(res.msg);
                }
            });

        },
        // 下架confirm弹框
        handleDelete(index, row) {
            this.$confirm('下架后，将不在提供上架功能，确认操作吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                console.log(row)
                this.modifyData(row.id);// 确定停用
            }).catch(() => {/** 取消 */});
        },
        modifyData(id) {
            let params = {itemId:id}
            this.$request.post('/api/hsUser/ban', params, false, (res)=>{
                if (res.code == '200') {
                    this.list(event, this.search.pageNo);
                    this.$message({type: 'success', message: '操作成功!'});
                } else {
                    this.$message.error(res.message);
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
<style lang="scss" scoped>
    .seller-review-container{
        .input-with-select {
            width: 400px;
            .el-select {
                width: 130px;
            }
        }
    }
</style>
