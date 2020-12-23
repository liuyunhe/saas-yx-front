<template>
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>码源过期时间设置：</span>
            </div>
            <!-- 数据查询条件 -->
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker v-model="time" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择时间"></el-date-picker>
                    （在“设置时间”前已参加过活动的的码源作废，不可参与此时间后发布的任意活动）
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="handleClickSave">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="space"></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>操作记录：</span>
            </div>
            <!-- 数据查询条件 -->
            <el-form :inline="true" :model="search">
                <el-form-item label="操作时间：">
                    <el-date-picker v-model="search.time" value-format="yyyy-MM-dd" type="date" placeholder="选择时间"></el-date-picker>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="list">查询</el-button>
                    <el-button size="small" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="space"></div>
            <!-- 数据表格 -->
            <el-table :data="tableList" style="width: 100%">
                <el-table-column label="序号" type="index" align="center">
                    <template slot-scope="scope">
                        {{ (search.pageNo-1)*search.pageSize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="optName" label="操作用户" align="center"></el-table-column>
                <el-table-column prop="timeLimit" label="码源过期时间" align="center"></el-table-column>
                <el-table-column prop="ctime" label="操作时间" align="center"></el-table-column>
            </el-table>
            <div class="space"></div>
            <!-- 分页组件 -->
            <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                           @size-change="sizeChange" @current-change="currentChange"
                           :current-page="search.pageNo" :page-size="search.pageSize"
                           :total="pagination.total">
            </el-pagination>
        </el-card>
        <div class="space"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: "",
            search: {
                pageNo: 1,
                pageSize: 10,
                time: '',
            },
            pagination: { // 分页
                total: 0
            },
            tableList: [],
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
                time: '',
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

            this.$request.post('/api/act/set/codeTime/list', this.search, true, (res)=>{
                if (res.code == '200') {
                    this.tableList = res.data.list || [];
                    this.initPagination(res.data.page||{});
                }
            });
        },
        handleClickSave() {
            this.$request.post('/api/act/set/codeTime/add', {time: this.time}, false, (res)=>{
                if (res.code == '200') {
                    this.$message({type: 'success', message: res.msg});
                    this.reset()
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
