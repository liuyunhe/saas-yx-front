<template>
  <div>
    <el-card class="box-card">
        <!-- 数据查询条件 -->
        <el-form :inline="true" :model="form">
            <el-form-item label="活动名称">
                <el-input v-model="form.activityName"></el-input>
            </el-form-item>
            <el-form-item label="品牌" class="ml15">
                <el-select v-model="form.productBrand" placeholder="全部" @change="brandChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格">
                <el-select v-model="form.productSn" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in snList" :key="item.sn" :label="item.name" :value="item.sn"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="奖品类别">
                <el-select v-model="form.awardType" :default-first-option="true">
                    <el-option v-for="item in awardList" :key="item.awardTypeId" :label="item.awardTypeName" :value="item.awardTypeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="抽检状态">
                <el-select v-model="form.checkStatus" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(label,code) in visitLabels" :key="code" :label="label" :value="code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="抽检人">
                <el-input v-model="form.checkPerson"></el-input>
            </el-form-item>
            <div></div>
            <el-form-item>
                <el-button type="primary" @click="list">查询</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <div class="space"></div>
    <el-card class="box-card">
        <!-- 数据表格 -->
        <el-table v-loading="loading" :data="tableList" style="width: 100%">
            <el-table-column label="序号" type="index" width="60">
                <template slot-scope="scope">
                    {{ (form.page-1)*form.pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单号" width="300"></el-table-column>
            <el-table-column prop="activityName" label="活动名称" width="200"></el-table-column>
            <el-table-column prop="productName" label="产品规格" width="150"></el-table-column>
            <el-table-column prop="awardType" label="奖品类别" width="80"></el-table-column>
            <el-table-column prop="awardName" label="奖品名称" width="120"></el-table-column>
            <el-table-column prop="awardCnt" label="数量" width="50"></el-table-column>
            <el-table-column prop="awardFee" label="小计金额" width="100"></el-table-column>
            <el-table-column prop="userId" label="会员ID" width="280"></el-table-column>
            <el-table-column prop="mobileNo" label="手机号" width="120"></el-table-column>
            <el-table-column prop="openId" label="第三方ID" width="280"></el-table-column>
            <el-table-column prop="cityName" label="用户所属地区" width="130"></el-table-column>
            <el-table-column prop="acceptTime" label="领奖时间" width="160"></el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" width="120"></el-table-column>
            <el-table-column prop="checkStatus" label="抽检状态" width="100">
                <template slot-scope="scope">
                    {{visitLabels[scope.row.checkStatus]}}
                </template>
            </el-table-column>
            <el-table-column prop="checkTime" label="抽检时间" width="160"></el-table-column>
            <el-table-column prop="checkPerson" label="抽检人" width="150"></el-table-column>
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
            awardList: [], // 奖品类别
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
            form: { // 查询区域
                page: 1,
                pageSize: 10, 
                activityName: "",
                awardType: "",
                productBrand: "",
                productSn: "",
                checkStatus: "",
                checkPerson: ""
            },
            tableList: [],
            pagination: { // 分页
                total: 0
            }
        }
    },
    created() {
        const cluserStr = sessionStorage.getItem("cluser");
        this.cluser = JSON.parse(cluserStr);
        if(!this.cluser||!this.cluser.account) {
            this.clearLoginSession();
            return false;
        }
        this.getBrandList();
        this.getSnList();
        this.getAwardList();// 有初始化下拉框的内容
    },
    methods: {
        // 清空当前登录用户信息缓存
        clearLoginSession() {
            sessionStorage.removeItem("cluser");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("access_loginId");
        },
        currentChange(pageNo) {
            this.form.page = pageNo;
            // 分页pageNo变更监听
            this.list();
        },
        sizeChange(pageSize) {
            // 分页pageSize变更监听
            this.form.pageSize = pageSize;
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
        getAwardList() {
            this.$request.post('/record/statistics/getAwardType', {}, true, (res)=>{
                this.awardList = res||[];
                if(this.awardList.length>0) {
                    this.form.awardType = this.awardList[0].awardTypeId;
                }
                this.list();
            });
        },
        // 重置查询
        resetForm() {
            this.form = { // 查询区域
                page: 1,
                pageSize: 10, 
                activityName: "",
                awardType: "",
                productBrand: "",
                productSn: "",
                checkStatus: "",
                checkPerson: ""
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
        list() {
            this.loading = true;
            // 加载列表数据
            this.$request.post('/record/statistics/getPerformAppoint', this.form, true, (res)=>{
                this.loading = false;
                this.tableList = res || [];
            });
            // 加载列表数据总条数
            this.$request.post('/record/statistics/getPerformAppointCount', this.form, true, (res)=>{
                let page = res||{}; // {Count: 0}
                this.initPagination(page);
            });
        }
    }
}
</script>

<style>
    .ml15 {margin-left:15px;}
    .space {position:relative;width:100%;height:20px;}
    .el-table th>.cell, .el-table {
        text-align: center;
    }
    .el-input, .el-select, .el-upload-list {
        width: 200px;
    }
    .el-table img {
        width: 80px;
        height: 80px;
    }
    .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: -6px;
        cursor: pointer;
        border: 8px solid transparent;
        border-top: 8px solid #888A88;
    }
    ul.oper-list {
        position: absolute;
        font-size: 14px;
        left: 55px;
        top: 60%;
        background: #fff;
        display: none;
        z-index: 30;
        box-shadow: 1px 1px 20px #000;
    }
    ul.oper-list li {
        width: 81px;
        line-height: 28px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }
</style>
