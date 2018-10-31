<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">红包投入数据月报</div></el-col>
                <el-button size="small" type="primary" v-on:click="rollBak"> >返回</el-button>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间" size="small" >
                        <el-date-picker  v-model="form.statTime" type="month" placeholder="选择日期" format="yyyy-MM" value-format="yyyy-MM"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="品牌选择" size="small" >
                        <el-select v-model="selectAllBrands" placeholder="全部"  :multiple="true" >
                            <el-option v-for="item in allBrandsData" :key="item.productBrand" :label="item.productBrandName" :value="item.productBrand"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格选择" size="small" >
                        <el-select   v-model="selectSpeciSns" placeholder="全部" :disabled="id?true:false" :clearable="id?true:false" :multiple="true"  >
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
                <el-table-column align="center" :label="'红包投入数据月报('+form.statTime+')'">
                    <el-table-column prop="col0" label="规格" ></el-table-column>
                    <el-table-column prop="col1" label="销区" ></el-table-column>
                    <el-table-column prop="col2" label="省份"></el-table-column>
                    <el-table-column prop="col3" label="地市"></el-table-column>
                    <el-table-column prop="col4" label="本月通过GPS定位的扫码量"></el-table-column>
                    <el-table-column prop="col5" label="本月扫码量"></el-table-column>
                    <el-table-column prop="col6" label="上月扫码量"></el-table-column>
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
                     statTime:this.Format("yyyy-MM"),
                     productBrand:'',
                     productSn:'P001,P002,P003,P004,P005,P006,P007,P008,P009,P010,P011',
                     staType:'month'
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
                this.allBrandsList();
                this.allTableDataList();
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
                this.$request.post(`/record/fixatreport/rptScanRedDateMonth`,{
                    statTime:this.form.statTime+'-01',
                    productBrand:this.form.productBrand,
                    productSn:this.form.productSn,
                    staType:'month'
                    },true,res => {
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
                var url = "/record/fixatreport/getRptScanRedDateMonthExcel";
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                this.form ={
                    statTime:this.form.statTime+'-01',
                    productBrand:this.form.productBrand,
                    productSn:this.form.productSn,
                    staType:'month'
                }
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
            Format(fmt) { //author: meizz
                var da = new Date();
                var o = {
                    "M+": da.getMonth() + 1, //月份
                    "d+": da.getDate(), //日
                    "h+": da.getHours(), //小时
                    "m+": da.getMinutes(), //分
                    "s+": da.getSeconds(), //秒
                    "q+": Math.floor((da.getMonth() + 3) / 3), //季度
                    "S": da.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (da.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
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
