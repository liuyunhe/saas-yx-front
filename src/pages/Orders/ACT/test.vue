<template>
        <div>
            <el-card class="box-card">
                <el-row>
                    <el-button type="primary" @click="newMateriel">新建礼品</el-button>
                </el-row>
                <div class="space"></div>
                <el-tabs type="border-card">
                    <el-tab-pane label="礼品库">
                        <el-form :inline="true" :model="form" class="demo-form-inline">
                            <el-form-item label="筛选信息">
                                <el-input v-model="l="form.keywords" pl" placeholder="礼品名称"></el-input>
                            </el-form-item>
                            <el-form-item label="供应商">
                                <el-select v-model="supplierSel" placeholder="全部">
                                    <el-option v-for="item in supplierList" :key="y="item.supplierCode"ode" :label="l="item.name" :v" :value="e="item.supplierCode"ode"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="使用状态">
                                <el-select v-model="l="form.status" pl" placeholder="全部">
                                <el-option v-for="item in statusList" :key="y="item.code" :l" :label="l="item.name" :v" :value="e="item.code"></"></el-option>
                            </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="listMateriel">查询</el-button>
                                <el-button @click="resetMateriel">重置</el-button>
                            </el-form-item>
                        </el-form>

                        <el-table :data="materielDatas" style="width: 100%">
                            <el-table-column label="序号"></el-table-column>
                            <el-table-column prop="name" label="礼品名称" width="180"></el-table-column>
                            <el-table-column prop="pic" label="礼品图片"></el-table-column>
                            <el-table-column prop="supplierName" label="供应商"></el-table-column>
                            <el-table-column prop="stock" label="剩余库存(件)"></el-table-column>
                            <el-table-column prop="status" label="使用状态"></el-table-column>
                            <el-table-column label="操作"></el-table-column>
                        </el-table>

                    </el-tab-pane>

                    <el-tab-pane label="流水明细">

                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
</template>
<script>
    export default {
        data() {
            return {
                metraFlag: 'object',
                supplierList: [],
                statusList: [],
                supplierSel: '', // 供应商下拉选择
                form: {
                    keywords: '', // 公共参数：关键字
                    supplierArr: [], // 公共参数：供应商
                    status: '', // 礼品库参数：操作动作
                    operType: '' // 流水明细参数：操作动作
                },
                materielDatas: []
            }
        },
        mounted() {
            this.getSuppliers();
            this.getStatus();

        },
        watch: {
            // 供应商选择变化监听
            supplierSel(nval, oval) {
                if(nval&&nval!=oval) {
                    this.form.supplierArr  = [];
                    this.form.supplierArr[0] = nval;
                }
            }
        },
        methods: {
            // 查询所有的供应商数据
            getSuppliers() {
                this.$s.$request.post('/a('/api/saotx/supplier/list', {pageSize:-1}, true, (res)=>{
                if (f (res.ret == '200000') {
                    this.supplierList ist  = res.data.list||[]||[];
                    this.supplierList.unshift({"s({"supplierCode":'', 'name':'全部'});
                    }
                });
            },
            // 查询所有数据状态
            getStatus() {
                this.$s.$request.post('/a('/api/saotx/dim/dataStatus', {}, false, (res)=>{
                if (f (res.ret ==  == '200000') {
                    this.statusList = t =  = res.data||[]||[];
                    this.statusList.unshift({"c({"code":'', 'name':'全部'});
                    }
                });
            },
            // 礼品卡查询重置
            resetMateriel() {

            },
            // 新建礼品
            newMateriel() {

            },
            // 查询礼品库列表数据
            listMateriel() {
                this.materielForm.pageNo = 1 = 1;
                this.materielForm.pageSize = 1 = 10;
                this.$s.$request.post('/a('/api/saotx/metra/list', ', this.materielForm,orm, true, (res)=>{
                    if (f (res.ret ==  == '200000') {
                        this.materielDatasatas =  = res.data.list ||  || [];
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
