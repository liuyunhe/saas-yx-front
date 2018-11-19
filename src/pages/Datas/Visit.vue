<template>
  <div>
    <el-card class="box-card">
        <!-- 数据查询条件 -->
        <el-form :inline="true" :model="form">
            <el-form-item label="奖品">
                <el-input size="small" v-model="form.awardName"></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-input size="small" v-model="form.cityName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input size="small" v-model="form.mobileNo"></el-input>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input size="small" v-model="form.orderId"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select size="small" v-model="form.productBrand" placeholder="全部" @change="brandChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格">
                <el-select size="small" v-model="form.productSn" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in snList" :key="item.sn" :label="item.name" :value="item.sn"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" class="ml15">
                <el-select size="small" v-model="form.checkStatus" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label,code) in visitLabels" :key="code" :label="label" :value="code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <div class="block">
                    <el-date-picker size="small"
                        v-model="form.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
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
            <el-table-column label="序号" type="index" align="center" width="60">
                <template slot-scope="scope">
                    {{ (form.page-1)*form.pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center" width="120"></el-table-column>
            <el-table-column prop="orderId" label="订单号" align="center" width="300"></el-table-column>
            <el-table-column prop="wechatName" label="微信昵称" align="center" ></el-table-column>
            <el-table-column prop="statTime" label="领奖时间" align="center" width="160"></el-table-column>
            <el-table-column prop="cityName" label="城市" align="center" width="130"></el-table-column>
            <el-table-column prop="awardName" label="奖品（金额）" align="center" width="120"></el-table-column>
            <el-table-column label="标签" align="center" >
                <template slot-scope="scope">
                    {{visitLabels[scope.row.feedbackStatus]}}
                    <el-dropdown v-if="scope.row.feedbackStatus==1" trigger="click" :hide-on-click="false" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="scope.row.id+',2'">已核实</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.id+',3'">不属实</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.id+',4'">联系不上</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
  </div>
</template>

<script>
export default {
    data() {
        return {
            visitLabels: { // 标签选择维值
                "1": "待核实",
                "2": "已核实",
                "3": "不属实",
                "4": "联系不上"
            },
            loading: false, // 是否查询中
            brandList: [], // 品牌
            snList: [], // 产品规格
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() >= Date.now();
                },
                // selectDate = { maxDate, minDate }
                onPick(selectDate) {
                    //console.log(selectDate.minDate);
                    //console.log(selectDate.maxDate);
                }
            },
            yesterday: "",
            form: { // 查询区域
                page: 1,
                pageSize: 10, 
                awardName: "",
                cityName: "",
                mobileNo: "",
                orderId: "",
                productBrand: "",
                productSn: "",
                checkStatus: "",
                time: [], // 查询时间
                startTime: "", // 开始时间：年-月-日
                endTime: "" // 结束时间：年-月-日
            },
            tableList: [],
            pagination: { // 分页
                total: 0
            }
        }
    },
    created() {
        // const cluserStr = sessionStorage.getItem("cluser");
        const cluserStr = this.$store.state.cluser
        this.cluser = JSON.parse(cluserStr);
        if(!this.cluser||!this.cluser.account) {
            this.clearLoginSession();
            return false;
        }
        let _now = new Date();
        _now.setTime(_now.getTime()-24*60*60*1000);
        this.yesterday = _now.getFullYear()+"-" + (_now.getMonth()+1) + "-" + _now.getDate();
        this.form.time = [this.yesterday, this.yesterday];
        this.getBrandList();
        this.getSnList();
        this.list();
    },
    methods: {
        // 清空当前登录用户信息缓存
        clearLoginSession() {
            // sessionStorage.removeItem("cluser");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("access_loginId");
        },
        currentChange(pageNo) {
            // 分页pageNo变更监听
            this.list(event, pageNo);
        },
        sizeChange(pageSize) {
            // 分页pageSize变更监听
            this.list(event, null, pageSize);
        },
        // 查询所有的品牌
        getBrandList() {
            this.$request.post('/record/public/getUserBrandByUserId', {}, true, (res)=>{
                this.brandList = res||[];
            });
        },
        // 品牌选择变化
        brandChange() {
            this.getSnList();
        },
        getSnList() {
            this.$request.post('/record/statistics/getProduct', {productBrand: this.form.productBrand}, true, (res)=>{
                this.snList = res||[];
            });
        },
        // 重置查询
        resetForm() {
            this.form = { // 查询区域
                page: 1,
                pageSize: 10, 
                awardName: "",
                cityName: "",
                mobileNo: "",
                orderId: "",
                productBrand: "",
                productSn: "",
                checkStatus: "",
                time: [this.yesterday, this.yesterday], // 查询时间
                startTime: "", // 开始时间：年-月-日
                endTime: "" // 结束时间：年-月-日
            };
            this.list();
        },
        // 分页
        initPagination(page) {
            if(page) {
                this.pagination.total = page.Count;
            }
        },
        // 查询列表数据
        list(_event, pageNo, pageSize) {
            this.loading = true;
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
            if(this.form.time&&this.form.time.length==2) {
                this.form.startTime = new Date(this.form.time[0]).Format("yyyy-MM-dd");
                this.form.endTime = new Date(this.form.time[1]).Format("yyyy-MM-dd");
            } else {
                this.form.startTime = this.form.endTime = "";
            }
            // 加载列表数据
            this.$request.post('/record/statistics/getFeedBack', this.form, true, (res)=>{
                this.loading = false;
                this.tableList = res || [];
            });
            // 加载列表数据总条数
            this.$request.post('/record/statistics/feedbackCount', this.form, true, (res)=>{
                let page = res||{}; // {Count: 0}
                this.initPagination(page);
            });
        },
        handleCommand(command) {
            if(!command) return false;

            let id = command.split(",")[0];
            let idCheckStatus = command.split(",")[1];
            this.$confirm('您确认需要更改此用户的状态吗？<span style="color:red">(一经确认无法修改)</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true,
                center: true
            }).then(() => {
                // 确认对数据修改
                // {id: "28118890", checkStatus: 2, checkPerson: "hebei_cuiguochao", checkTime: "2018-10-24 15:21:08"}
                let updateForm = {id:id, checkStatus:idCheckStatus, checkTime:new Date().Format("yyyy-MM-dd hh:mm:ss"), checkPerson: this.cluser.name};
                this.$request.post('/record/statistics/updateFeddBackStatus', updateForm, true, (res)=>{
                    this.list();
                });
            }).catch(() => {/** 取消 */});
        }
    }
}
</script>

<style scoped>
    .ml15 {margin-left:15px;}
    .space {position:relative;width:100%;height:20px;}
    .el-input, .el-select {
        width: 200px;
    }
</style>
