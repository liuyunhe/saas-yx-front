<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">红包投入数据周报</div></el-col>
                <el-button size="small" type="primary" v-on:click="rollBak"> >返回</el-button>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间" size="small">
                        <el-select  v-model="form.statTime" placeholder="请选择">
                            <el-option v-for="item in weekData" :key="item.weekId" :label="item.weekNo" :value="item.weekId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌选择" size="small">
                        <el-select  v-model="selectAllBrands" placeholder="全部"  :multiple="true" >
                            <el-option v-for="item in allBrandsData" :key="item.productBrand" :label="item.productBrandName" :value="item.productBrand"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格选择" size="small">
                        <el-select v-model="selectSpeciSns" placeholder="全部" :disabled="id?true:false" :clearable="id?true:false" :multiple="true"  >
                            <el-option v-for="item in allSpecisData" :key="item.productSn" :label="item.productName" :value="item.productSn"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-form-item>
                    <el-row>
                        <el-button  size="small" type="primary" v-on:click="queryData">查询</el-button>
                        <el-button  size="small" plain  v-on:click="exportData" >导出搜索结果</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
            <el-table :data="listData" style="width: 100%" border>
                <el-table-column align="center" :label="'红包投入数据周报('+statTimeName+')'">
                    <el-table-column prop="col0" label="规格" ></el-table-column>
                    <el-table-column prop="col1" label="销区" ></el-table-column>
                    <el-table-column prop="col2" label="省份"></el-table-column>
                    <el-table-column prop="col3" label="地市"></el-table-column>
                    <el-table-column prop="col4" label="本周红包投入（元）"></el-table-column>
                    <el-table-column prop="col5" label="上周红包投入（元）"></el-table-column>
                    <el-table-column prop="col6" label="截至本周末历史累计红包投入（元）"></el-table-column>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        components: {
            draggable
        },
        name: "ScanWeekPage",
        data(){
            return{
                id:'',
                listData:[],
                weekData:[],
                allBrandsData:[],
                allSpecisData:[],
                selectAllBrands:'',
                selectSpeciSns:'',
                statTimeName:'',
                form:{
                     statTime:'',
                     productBrand:'',
                     productSn:'P001,P002,P003,P004,P005,P006,P007,P008,P009,P010,P011',
                     staType:'week'
                }
            }
        },
        created(){
            this.init()
        },
        watch:{//监听品牌，规格，地域
            selectAllBrands(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.productBrand  = '';
                    this.form.productBrand = nval.join(',');
                    this.id='';
                    this.allSpecisList(this.form.productBrand);
                }
            },
            selectSpeciSns(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.productSn  = '';
                    this.form.productSn = nval.join(',');//数组转字符串
                }
            }
        },
        methods:{
            init(){
                this.allWeekList();
                this.allBrandsList();
             //   this.allTableDataList();
            },
            allWeekList(){//周
                this.$request.post(`/record/statistics/getWeeks`,{ },true,res => {
                        let datas = res || [];
                        this.weekData = datas;
                        this.form.statTime=datas[0].weekId;
                        this.statTimeName=datas[0].weekNo
                        this.allTableDataList();
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allBrandsList(){//所有品牌
                this.$request.post(`/record/fixatreport/getProductBrandDown`,{ },true,res => {
                    let datas = res || [];
                    this.allBrandsData = datas;
                    // this.selectAllBrands = datas[0].productBrand;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allSpecisList(nval){//所有规格
                this.$request.post(`/record/fixatreport/getProductSnDown`,{
                    productBrand:nval
                    },true,res => {
                        let datas = res || [];
                        this.allSpecisData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allTableDataList(){
                this.$request.post(`/record/fixatreport/rptScanRedDateWeek`,this.form,true,res => {
                        let datas = res || [];
                        this.listData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },

            queryData(){
                this.allTableDataList();
            },
            exportData(){
                var url = "/record/fixatreport/getRptScanRedDateWeekExcel";
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
            rollBak(){
                this.$router.push({path:'/datas/Report'})
            }
        }
    }
</script>

<style scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
