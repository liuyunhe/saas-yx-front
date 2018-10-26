<template>
  <div>
    <el-card class="box-card">
        <!-- 数据查询条件 -->
        <el-form :inline="true" :model="form">
            <el-form-item label="品牌" class="ml40">
                <el-select size="small" v-model="form.productBrand" placeholder="全部" @change="brandChange">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格">
                <el-select size="small" v-model="form.productSnArr" placeholder="全部" :multiple="true" :collapse-tags="true" @change="snChange">
                    <el-option label="全部" value="all"></el-option>
                    <el-option v-for="item in snList" :key="item.sn" :label="item.productName" :value="item.sn"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市">
                <el-input size="small" v-model="form.cityName"></el-input>
            </el-form-item>
            <el-form-item label="业态" class="ml15">
                <el-select size="small" v-model="form.bizCode" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in commercialList" :key="item.bizCode" :label="item.bizName" :value="item.bizCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="零售户名称">
                <el-input size="small" v-model="form.shopName"></el-input>
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
            <el-table-column label="序号" type="index" width="50">
                <template slot-scope="scope">
                    <!-- {{ (form.page-1)*form.pageSize + scope.$index + 1 }} -->
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="statTime" label="日期" width="100"></el-table-column>
            <el-table-column prop="shopName" label="名称" width="150"></el-table-column>
            <el-table-column prop="bizName" label="零售户类型" width="100"></el-table-column>
            <el-table-column prop="cityName" label="城市" width="130"></el-table-column>
            <el-table-column prop="productBrand" label="品牌" width="100"></el-table-column>
            <el-table-column prop="productName" label="规格" width="160"></el-table-column>
            <el-table-column prop="customerShould" label="返回金额" width="80"></el-table-column>
            <el-table-column prop="scanCustomer" label="扫码人数" width="80"></el-table-column>
            <el-table-column prop="repeatCustomer" label="复购人数" width="80"></el-table-column>
            <el-table-column prop="scanCodeNum" label="烟码扫码数量" width="110"></el-table-column>
            <el-table-column prop="scanSellerNum" label="店码扫码总数" width="110"></el-table-column>
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
</template>

<script>
export default {
    data() {
        return {
            loading: false, // 是否查询中
            brandList: [], // 品牌
            snList: [], // 产品规格
            commercialList: [], // 业态
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
                //page: 1,
                //pageSize: 10,
                cityName: "",
                bizCode: "",
                shopName: "",
                productBrand: "",
                productSnArr: "", // 页面select选择变化时获取选中值
                productSn: "", // 查询接口时，使用的参数
                time: [this.yesterday, this.yesterday], // 查询时间
                beginTime: "", // 开始时间：年-月-日
                endTime: "" // 结束时间：年-月-日
            },
            tableList: [],
            pagination: { // 分页
                total: 0
            }
        }
    },
    created() {
        let _now = new Date();
        _now.setTime(_now.getTime()-24*60*60*1000);
        this.yesterday = _now.getFullYear()+"-" + (_now.getMonth()+1) + "-" + _now.getDate();
        this.form.time = [this.yesterday, this.yesterday];
        this.getBrandList();
        this.getSnList();
        this.getCommercialList();
        this.list();
    },
    methods: {
        currentChange(pageNo) {
            //this.form.page = pageNo;
            // 分页pageNo变更监听
            this.list();
        },
        sizeChange(pageSize) {
            // 分页pageSize变更监听
            //this.form.pageSize = pageSize;
        },
        // 查询所有的品牌
        getBrandList() {
            this.$request.post('/record/public/getUserBrandByUserId', {}, true, (res)=>{
                this.brandList = res||[];
            });
        },
        // 品牌选择变化
        brandChange() {
            this.form.productSnArr = [];
            this.getSnList();
        },
        getSnList() {
            this.$request.post('/record/actAnalysis/getActyProductDownBox', {productBrand: this.form.productBrand}, true, (res)=>{
                this.snList = res||[];
            });
        },
        snChange() {
            let len = this.form.productSnArr.length;
            if(len>0&&this.form.productSnArr[len-1]=="all") {// 说明选择的全部
                this.form.productSnArr = [];
                if(this.snList.length!=len-1) { // 说明非全部选中状态
                    for(let i=0;i<this.snList.length;i++) {
                        this.form.productSnArr.push(this.snList[i].sn);
                    }
                }
            }
        },
        getCommercialList() {
            this.$request.post('/record/shopKeeper/getShopDownBox', {productBrand: this.form.productBrand}, true, (res)=>{
                this.commercialList = res||[];
            });
        },
        // 重置查询
        resetForm() {
            this.form = { // 查询区域
                //page: 1,
                //pageSize: 10,
                cityName: "",
                bizCode: "",
                shopName: "",
                productBrand: "",
                productSnArr: "",
                productSn: "",
                time: [this.yesterday, this.yesterday], // 查询时间
                beginTime: "", // 开始时间：年-月-日
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
        list() {
            this.loading = true;
            if(this.form.time&&this.form.time.length==2) {
                this.form.beginTime = new Date(this.form.time[0]).Format("yyyy-MM-dd");
                this.form.endTime = new Date(this.form.time[1]).Format("yyyy-MM-dd");
            } else {
                this.form.beginTime = this.form.endTime = "";
            }
            if(this.form.productSnArr) {
                this.form.productSn = this.form.productSnArr.join(",");
            }
            // 加载列表数据
            this.$request.post('/record/shopKeeper/getRetailuserDetail', this.form, true, (res)=>{
                this.loading = false;
                this.tableList = res || [];
            });
            // 加载列表数据总条数
            //this.$request.post('/record/statistics/feedbackCount', this.form, true, (res)=>{
            //    let page = res||{}; // {Count: 0}
            //    this.initPagination(page);
            //});
        }
    }
}
</script>

<style scoped>
    .ml40 {margin-left:40px;}
    .space {position:relative;width:100%;height:20px;}
    .el-table th>.cell, .el-table {
        text-align: center;
    }
    .el-input, .el-select, .el-upload-list {
        width: 200px;
    }
</style>
