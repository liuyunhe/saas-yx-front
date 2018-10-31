<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">区县扫码活跃度月报</div></el-col>
                <el-button size="small" type="primary" v-on:click="rollBak"> >返回</el-button>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间"  size="small">
                        <el-date-picker v-model="form.statDate" type="month" placeholder="选择日期" format="yyyy-MM" value-format="yyyy-MM"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="品牌选择" size="small">
                        <el-select  v-model="selectAllBrands" placeholder="全部" multiple>
                            <el-option v-for="item in allBrandsData" :key="item.brandCode" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="省"  size="small">
                        <el-select v-model="selectProvince" placeholder="全部"  :multiple="true"  >
                            <el-option v-for="item in allProvinceData" :key="item.code" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="市" size="small" >
                        <el-select  v-model="selectCity" placeholder="全部"   :multiple="true"  >
                            <el-option v-for="item in allCityData" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
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
                <el-table-column align="center" :label="'开启GPS用户区县扫码活跃度('+statTimeName+')'">
                    <el-table-column prop="brandName" label="品牌"></el-table-column>
                    <el-table-column prop="districtName" label="区县"></el-table-column>
                    <el-table-column prop="scanOpenidP" label="扫码次数"></el-table-column>
                    <el-table-column prop="scanNumP" label="扫码人数"></el-table-column>
                    <el-table-column prop="scanCodeP" label="扫码烟包数"></el-table-column>
                    <el-table-column prop="cityName" label="所在地市"></el-table-column>
                    <el-table-column prop="provinceName" label="所在省"></el-table-column>
                    <el-table-column prop="scanNum" label="所在地市扫码次数"></el-table-column>
                    <el-table-column prop="scanOpenid" label="所在地市扫码人数"></el-table-column>
                    <el-table-column prop="scanCode" label="所在地市扫码烟包数"></el-table-column>
                    <el-table-column prop="toScanCodes" label="区县扫码活跃度"></el-table-column>
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
                allBrandsData:[],
                allProvinceData:[],
                allCityData:[],
                selectAllBrands:'',
                selectProvince:'',
                selectCity:'',
                statTimeName:'',
                defaultPrvCode:'',
                allBrandsLenth:0,
                form:{
                     statDate:this.Format("yyyy-MM"),
                     brandName:'全部',
                     provinceCode:'',
                     cityCode:'',
                     statType:'m6'
                }
            }
        },
        created(){
            this.init()
        },
        watch:{//监听品牌，规格，地域
            selectAllBrands(nval, oval){
                if(nval&&nval!=oval) {
                    if(this.allBrandsLenth==nval.length){
                        this.form.brandName = "全部";
                        this.form.statType="m6";
                    }else{
                        this.form.brandName  = '';
                        this.form.brandName = nval.join(',');
                        this.form.statType="m5";
                    }
                }
            },
            selectProvince(nval, oval){
                if(nval&&nval!=oval) {
                    var curWeekPro = {
                        name : [],
                        code : []
                    };
                    if(nval.length>0){
                        for(var i=0;i<nval.length;i++){
                            var code=nval[i];
                            for(var k=0;k<this.allProvinceData.length;k++){
                                if(code==this.allProvinceData[k].code){
                                    curWeekPro.name.push(this.allProvinceData[k].name);
                                }
                            }
                        }
                        this.allCityList(curWeekPro.name.join(','));
                    }
                    this.form.provinceCode='';
                    this.form.provinceCode=nval.join(',');
                }
            },
            selectCity(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.cityCode='';
                    this.form.cityCode=nval.join(',');
                }
            }

        },
        methods:{
            init(){
                this.allDefaultProvinceList();
                this.allBrandsList();
                this.allProvinceList();
             //   this.allTableDataList();
            },
            allDefaultProvinceList(){//组织默认省份
                this.$request.post(`/record/public/getDefaultProvByorgId`,{ },true,res => {
                        let datas = res || [];
                        if(datas.length>0){
                            for(var i=0;i<datas.length;i++){
                                this.defaultPrvCode=datas[i].orgRegion;
                            }
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allBrandsList(){//所有品牌
                this.$request.post(`/record/public/getUserBrandByUserId`,{ },true,res => {
                    let datas = res || [];
                    this.allBrandsData = datas;
                    this.allBrandsLenth=datas.length;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allProvinceList(){//所有省
                this.$request.post(`/record/public/getUserProvByUserId`,{ },true,res => {
                        let datas = res || [];
                        this.allProvinceData = datas;
                        this.selectProvince[0]=this.defaultPrvCode;
                        this.form.provinceCode=this.defaultPrvCode;
                        var curWeekPro = {
                            name : [],
                            code : []
                        };
                        for(var k=0;k<this.allProvinceData.length;k++){
                            if(this.defaultPrvCode==this.allProvinceData[k].code){
                                curWeekPro.name.push(this.allProvinceData[k].name);
                            }
                        }
                        this.allCityList(curWeekPro.name.join(','));
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allCityList(provinceName){//所有市
                this.$request.post(`/record/statistics/getCitysByProvince`,{provinceName:provinceName },true,res => {
                        let datas = res || [];
                         this.allCityData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allTableDataList(){
                this.$request.post(`/record/fixatreport/getMonthGpsScanData`,{
                    brandName:this.form.brandName,
                    cityCode:this.form.cityCode,
                    provinceCode:this.form.provinceCode,
                    statDate:this.form.statDate+'-01',
                    statType:this.form.statType
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
                var url = "/record/fixatreport/getMonthGpsScanDataExcel";
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                this.form ={
                    brandName:this.form.brandName,
                    cityCode:this.form.cityCode,
                    provinceCode:this.form.provinceCode,
                    statDate:this.form.statDate+'-01',
                    statType:this.form.statType
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
