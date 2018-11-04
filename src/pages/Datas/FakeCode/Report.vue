<template>
  <div>
    <el-card class="box-card">
        <!-- 数据查询条件 -->
        <el-form :inline="true" :model="form">
             <el-form-item label="品牌" class="pl14">
                <el-select size="small" v-model="form.brandCodeArr" placeholder="请选择" @change="brandChange" :multiple="true" :collapse-tags="true">
                    <el-option v-show="brandList.length>0" label="全部" value="all"></el-option>
                    <el-option v-for="item in brandList" :key="item.brandCode" :label="item.name" :value="item.brandCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格" class="pl11">
                <el-select size="small" v-model="form.snArr" placeholder="请选择" :multiple="true" :collapse-tags="true" @change="snChange">
                    <el-option v-show="brandList.length>0" label="全部" value="all"></el-option>
                    <el-option v-for="item in snList" :key="item.sn" :label="item.allName" :value="item.sn"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户姓名">
                <el-input size="small" v-model="form.rptName"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号">
                <el-input size="small" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="所在地">
                <el-input size="small" v-model="form.cityName"></el-input>
            </el-form-item>
            <el-form-item label="CODE">
                <el-input size="small" v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="举报时间">
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
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="removeData(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <!--
            <el-table-column label="序号" type="index" align="center" width="60">
                <template slot-scope="scope">
                    {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>
            -->
            <el-table-column prop="codeTypeName" label="类型" align="center" width="60"></el-table-column>
            <el-table-column label="二维码图片" align="center" width="100">
                <template slot-scope="scope">
                    <el-popover v-if="scope.row.rptCodeImg" trigger="hover" placement="right">
                        <p><img :src="scope.row.rptCodeImg" class="hover-img"/></p>
                        <div slot="reference" >
                            <img :src="scope.row.rptCodeImg" />
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="验证码图片" align="center" width="100">
                <template slot-scope="scope">
                    <el-popover v-if="scope.row.rptVerifyImg" trigger="hover" placement="right">
                        <p><img :src="scope.row.rptVerifyImg" class="hover-img"/></p>
                        <div slot="reference" >
                            <img :src="scope.row.rptVerifyImg" />
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="verifyCode" label="正确验证码" align="center" width="100"></el-table-column>
            <el-table-column prop="code" label="CODE" align="center" width="280"></el-table-column>
            <el-table-column prop="brandName" label="品牌" align="center" width="80"></el-table-column>
            <el-table-column prop="unitName" label="规格" align="center" width="50"></el-table-column>
            <el-table-column prop="firstScanTime" label="首扫时间" align="center" width="160"></el-table-column>
            <el-table-column prop="scanCount" label="扫码次数（次）" align="center" width="120"></el-table-column>
            <el-table-column prop="areaCity" label="所在地" align="center" width="100"></el-table-column>
            <el-table-column prop="rptName" label="举报用户姓名" align="center" width="120"></el-table-column>
            <el-table-column prop="rptPhone" label="举报用户手机号" align="center" width="120"></el-table-column>
            <el-table-column prop="rptTime" label="举报时间" align="center" width="160">
                <template slot-scope="scope">
                    {{new Date(scope.row.rptTime).Format("yyyy-MM-dd hh:mm:ss")}}
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
            loading: false, // 是否查询中
            brandList: [], // 品牌
            snList: [], // 产品规格
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() >= Date.now();
                }
            },
            yesterday: "",
            form: { // 查询区域
                pageNo: 1,
                pageSize: 10,
                brandCodeArr: [],
                brandCode: "",
                snArr: [],
                sn: "",
                rptName: "",
                phone: "",
                cityName: "",
                code: "",
                time: [], // 查询时间
                stime: "", // 开始时间：年-月-日
                etime: "" // 结束时间：年-月-日
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
        // 查询所有的品牌
        getBrandList() {
            this.$request.post('/api/saotx/prod/listBrand', {}, true, (res)=>{
                if(res.ret==200000) {
                    let datas = res.data.list||[];
                    if(datas.length>0) {
                        this.brandList = datas;
                    }
                }
            });
        },
        // 品牌选择变化
        brandChange() {
            let len = this.form.brandCodeArr.length;
            if(len>0&&this.form.brandCodeArr[len-1]=="all") {// 说明选择的全部
                this.form.brandCodeArr = [];
                if(this.brandList.length!=len-1) { // 说明非全部选中状态
                    for(let i=0;i<this.brandList.length;i++) {// 去掉第一个全部内容
                        this.form.brandCodeArr.push(this.brandList[i].brandCode);
                    }
                }
            }
            this.getSnList();
        },
        getSnList() {
            this.$request.post('/api/saotx/prod/list', {brandCodeArr: this.form.brandCodeArr}, true, (res)=>{
                if(res.ret==200000) {
                    let datas = res.data.list||[];
                    if(datas.length>0) {
                        this.snList = datas;
                    }
                }
            });
        },
        snChange() {
            let len = this.form.snArr.length;
            if(len>0&&this.form.snArr[len-1]=="all") {// 说明选择的全部
                this.form.snArr = [];
                if(this.snList.length!=len-1) { // 说明非全部选中状态
                    for(let i=0;i<this.snList.length;i++) {// 去掉第一个全部内容
                        this.form.snArr.push(this.snList[i].sn);
                    }
                }
            }
        },
        // 重置查询
        resetForm() {
            this.form = { // 查询区域
                pageNo: 1,
                pageSize: 10, 
                brandCodeArr: [],
                brandCode: "",
                snArr: [],
                sn: "",
                rptName: "",
                phone: "",
                cityName: "",
                code: "",
                time: [this.yesterday, this.yesterday], // 查询时间
                stime: "", // 开始时间：年-月-日
                etime: "" // 结束时间：年-月-日
            };
            this.list();
        },
        // 分页
        initPagination(page) {
            if(page) {
                this.pagination.total = page.count;
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
                this.form.stime = new Date(this.form.time[0]).Format("yyyy-MM-dd");
                this.form.etime = new Date(this.form.time[1]).Format("yyyy-MM-dd");
            } else {
                this.form.stime = this.form.etime = "";
            }
            // 加载列表数据
            this.$request.post('/api/saotx/fake/list', this.form, true, (res)=>{
                this.loading = false;
                if(res.ret == 200000) {
                    this.tableList = res.data.list || [];
                    let page = res.data.page || {};
                    this.initPagination(page);
                } else {
                    this.$message.error(res.message);
                }
            });
        },
        // 删除某条数据
        removeData(index, row) {
            this.$confirm('确认删除数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request.post('/api/saotx/fake/remove', {id: row.id}, true, (res)=>{
                    if(res.ret == 200000) {
                        this.$message({type:'success', message: "操作成功！"});
                        this.list();
                    } else {
                        this.$message.error(res.message);
                    }
                });
            }).catch(() => {/** 取消 */});
        }
    }
}
</script>

<style scoped>
    .pl11 {padding-left:11px;}
    .pl14 {padding-left:14px;}
    .space {position:relative;width:100%;height:20px;}
    .el-input, .el-select {
        width: 200px;
    }
    .el-table img {
        width: 80px;
        max-height: 100px;
    }
    img.hover-img {
        width: 200px;
    }
</style>
