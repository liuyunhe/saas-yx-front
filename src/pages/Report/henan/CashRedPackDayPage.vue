<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">现金红包中奖统计日报</div></el-col>
                <el-button size="small" type="primary" v-on:click="rollBak"> >返回</el-button>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间" size="small">
                        <el-date-picker  v-model="form.dt" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="品牌选择" size="small">
                        <el-select  v-model="selectAllBrands" placeholder="全部">
                            <el-option v-for="item in allBrandsData" :key="item.brandCode" :label="item.name" :value="item.name" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格选择" size="small">
                        <el-select v-model="selectSpeciSns" placeholder="全部"  >
                            <el-option v-for="item in allSpecisData" :key="item.sn" :label="item.name" :value="item.sn"></el-option>
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
                <el-table-column align="center" :label="'规格('+this.selectSpeciName+ form.dt+')'">
                    <el-table-column prop="cityName" label="地市"></el-table-column>
                    <el-table-column prop="awardName" label="奖品名称"></el-table-column>
                    <el-table-column prop="awardPrice" label="单价"></el-table-column>
                    <el-table-column prop="drawPv" label="本期中奖数量	"></el-table-column>
                    <el-table-column prop="drawFee" label="本期中奖金额"></el-table-column>
                    <el-table-column prop="yearDrawPv" label="本年累计中奖数量"></el-table-column>
                    <el-table-column prop="yearDrawFee" label="本年累计中奖金额"></el-table-column>
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
        name: "CashRedPackDayPage",
        data(){
            return{
                listData:[],
                allBrandsData:[],
                allSpecisData:[],
                selectAllBrands:'',
                selectSpeciSns:'',
                selectSpeciName:'盒-黄金叶（爱尚）',
                form:{
                    dt:this.Format("yyyy-MM-dd"),
                    productBrand:'黄金叶',
                    productSn:'6901028165242'
                }
            }
        },
        created(){
            this.init();
        },
        watch:{
            selectAllBrands(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.productBrand  = '';
                    this.form.productBrand = nval;
                    this.allSpecisList(this.form.productBrand);
                }
            },
            selectSpeciSns(nval, oval){
                if(nval&&nval!=oval) {
                    if(this.allSpecisData.length>0){
                        for(var i=0;i<this.allSpecisData.length;i++){
                            if(nval==this.allSpecisData[i].sn){
                                this.selectSpeciName=this.allSpecisData[i].name;
                            }
                        }
                    }
                }
            }

        },
        methods:{
            init(){
                this.allBrandsList();
                this.allTableDataList();
            },
            allBrandsList(){
                this.$request.post(`/record/public/getUserBrandByUserId`,{ },true,res => {
                        let datas = res || [];
                        datas=[{"brandCode":"0f01c777243143bbb1928f8ea86f07d8","name":"黄金叶"},{"brandCode":"83fb28434f97455f8cba3d509b047f94","name":"帝豪"},{"brandCode":"b7dc34c1422a4bf6bad77772d997bbae","name":"红旗渠"}];
                        this.allBrandsData = datas;
                        if(datas.length>0){
                            this.selectAllBrands=datas[0].name;
                            this.form.productBrand=this.selectAllBrands;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allSpecisList(nval){//所有规格
                this.$request.post(`/record/statistics/getProduct`,{
                        productBrand:nval
                    },true,res => {
                        let datas = res || [];
                        datas = [{"name":"盒-黄金叶（爱尚）","sn":"6901028165235"},{"name":"盒-爱尚测试","sn":"1234567891234"},{"name":"条-黄金叶（爱尚）","sn":"6901028165242"},{"name":"条-爱尚测试","sn":"1234567890123"}]
                        this.allSpecisData = datas;
                        if(datas.length>0){
                            this.selectSpeciSns=datas[0].sn;
                            this.form.productSn=this.selectSpeciSns;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allTableDataList(){
                this.$request.post(`/record/henanreport/getRedPacketReportData`,this.form,true,res => {
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
                var url = "/record/henanreport/importRedPacketReportData";
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
