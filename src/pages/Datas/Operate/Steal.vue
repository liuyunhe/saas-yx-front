<template>
    <div>
        <div v-show="!isScanCodeDetail">
            <el-card class="box-card">
                <!-- 数据查询条件 -->
                <el-form :inline="true" :model="form">
                    <el-form-item label="user_id">
                        <el-input size="small" v-model="form.userid"></el-input>
                    </el-form-item>
                    <el-form-item label="SN">
                        <el-input size="small" v-model="form.productSn"></el-input>
                    </el-form-item>
                    <el-form-item label="扫码时间">
                        <div class="block">
                            <el-date-picker size="small" type="date" v-model="form.date" placeholder="选择日期" :clearable="false" :editable="false"></el-date-picker>
                            <el-time-picker size="small" is-range v-model="form.time" :clearable="false"  :editable="false"
                                value-format="HH:mm:ss"
                                range-separator="至" 
                                start-placeholder="开始时间" 
                                end-placeholder="结束时间" 
                                placeholder="选择时间范围">
                            </el-time-picker>
                        </div>
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
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="scanCodeDetail(scope.$index, scope.row)">查询CODE相关扫码明细</el-button>
                        </template>
                    </el-table-column>
                    <!--
                    <el-table-column label="序号" type="index" align="center" width="60">
                        <template slot-scope="scope">
                            {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    -->
                    <el-table-column prop="code" label="烟码CODE" align="center"></el-table-column>
                    <el-table-column prop="memo" label="规格" align="center"></el-table-column>
                    <el-table-column prop="userid" label="用户ID" align="center"></el-table-column>
                    <el-table-column prop="productSn" label="SN" align="center"></el-table-column>
                    <el-table-column prop="ctime" label="扫码时间点" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ctime">{{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="space"></div>
                <!-- 分页组件 -->
                <!--
                <el-pagination background layout="total, prev, pager, next, jumper"
                    @size-change="sizeChange" @current-change="currentChange"
                    :current-page="form.pageNo" :page-size="form.pageSize"
                    :total="pagination.total">
                </el-pagination>
                -->
            </el-card>
        </div>
        <div v-show="isScanCodeDetail">
            <el-card class="box-card">
                <div class="scancode-detail-header">
                    <span>烟码：{{detailForm.code}} 扫码记录</span>
                    <a href="javascript:;" @click="goSearch">返回</a>
                </div>
                <div class="space"></div>
                <!-- 数据表格 -->
                <el-table v-loading="loading" :data="detailTable" style="width: 100%">
                    <el-table-column label="序号" type="index" align="center">
                        <template slot-scope="scope">
                            {{ (detailForm.page-1)*detailForm.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
                    <el-table-column prop="region" label="省份" align="center"></el-table-column>
                    <el-table-column prop="city" label="地市" align="center"></el-table-column>
                    <el-table-column prop="batch" label="批次" align="center"></el-table-column>
                    <el-table-column prop="productSn" label="SN" align="center"></el-table-column>
                    <el-table-column prop="ctime" label="扫码时间" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ctime">{{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="space"></div>
                <!-- 分页组件 -->
                <el-pagination background layout="total, prev, pager, next, jumper"
                    @size-change="sizeChange" @current-change="currentChange"
                    :current-page="detailForm.page" :page-size="detailForm.pageSize"
                    :total="pagination.total">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isScanCodeDetail: false, // 页面展示是否为扫码明细
            loading: false, // 是否查询中
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() >= Date.now();
                }
            },
            form: { // 查询区域
                //pageNo: 1,
                //pageSize: 10,
                userid: "",
                productSn: "",
                date: "",
                time: ["00:00:00", "00:59:59"], // 查询时间
                beginTime: "", // 开始时间：年-月-日
                endTime: "" // 结束时间：年-月-日
            },
            tableList: [],

            detailForm: {
                page: 1,
                pageSize: 10,
                code: ""
            },
            detailTable: [],
            pagination: { // 分页
                total: 0
            }
        }
    },
    created() {
        this.initDate();
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
        initDate() {
            let _now = new Date();
            this.form.date = _now.Format("yyyy-MM-dd");
            this.form.time = ["00:00:00", "00:59:59"];
        },
        // 重置查询
        resetForm() {
            this.form = { // 查询区域
                //pageNo: 1,
                //pageSize: 10,
                userid: "",
                productSn: "",
                date: "",
                time: [], // 查询时间
                beginTime: "", // 开始时间：年-月-日 时:分:秒
                endTime: "" // 结束时间：年-月-日 时:分:秒
            };
            this.initDate();
            this.tableList = []
        },
        // 分页
        initPagination(page) {
            if(page) {
                this.pagination.total = page.count;
            }
        },
        // 查询列表数据
        list() {
            if( !this.form.userid ) {
                this.$message.error("请输入user_id查询内容！");
                return false;
            }
            if( !this.form.productSn ) {
                this.$message.error("请输入SN查询内容！");
                return false;
            }

            this.loading = true;

            this.form.beginTime = this.form.date + " " + this.form.time[0];
            this.form.endTime = this.form.date + " " + this.form.time[1];

            // 加载列表数据
            this.$request.post('/record/fixatreport/getDetailHome', this.form, true, (res)=>{
                this.loading = false;
                this.tableList = res || [];
                //this.tableList = [{code:"123",memo:"规格盒",userid:"12312312312312312312312312312312",productSn:"123123123123",ctime:""}];
            });
        },
        goSearch() {
            this.detailForm.code = "";
            this.isScanCodeDetail = false;
        },
        // 切换到查询CODE相关扫码明细
        scanCodeDetail(index, row) {
            if( row.code ) {
                this.detailForm.code = row.code;
                this.listScanCodeDetail();
            }
        },
        listScanCodeDetail() {
            this.loading = true;
            // 加载列表数据
            this.$request.post('/record/fixatreport/getDetailByCodeId', this.detailForm, true, (res)=>{
                this.loading = false;
                //res = {Count:1, data:[{mobile:"12345678901",region:"黑龙江省",city:"哈尔滨市",batch:"2018011022112",productSn:"1234567890123",ctime:""}]};
                this.detailTable = res.data || [];
                let page = {count:res.Count};
                this.initPagination(page);
                this.isScanCodeDetail = true;
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
    .scancode-detail-header {
        position: relative;
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        color: #606266;
    }
    .scancode-detail-header a {
        position: absolute;
        right: 30px;
    }
</style>
