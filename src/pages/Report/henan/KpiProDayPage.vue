<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">KPI数据分省统计日报</div></el-col>
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
                    <el-form-item label="省" size="small" >
                        <el-select  v-model="selectProvince" placeholder="全部"  :multiple="true"  >
                            <el-option v-for="item in allProvinceData" :key="item.code" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="市" size="small">
                        <el-select  v-model="selectCity" placeholder="全部"   :multiple="true"  >
                            <el-option v-for="item in allCityData" :key="item.cityId" :label="item.cityName" :value="item.cityName"></el-option>
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
                    <el-table-column prop="provinceName" label="省份"></el-table-column>
                    <el-table-column prop="cityName" label="地市"></el-table-column>
                    <el-table-column prop="scanPv" label="扫码次数"></el-table-column>
                    <el-table-column prop="effectScanPv" label="扫码烟包数"></el-table-column>
                    <el-table-column prop="scanUv" label="扫码人数"></el-table-column>
                    <el-table-column prop="yearScanPv" label="本年累计扫码次数"></el-table-column>
                    <el-table-column prop="yearEffectScanPv" label="本年累计扫码包数"></el-table-column>
                    <el-table-column prop="yearScanUv" label="本年累计扫码人数	"></el-table-column>
                    <el-table-column prop="rafflePv" label="抽奖次数"></el-table-column>
                    <el-table-column prop="drawPv" label="中奖次数(包含实物和红包)	"></el-table-column>
                    <el-table-column prop="drawRate" label="扫码中奖率(中奖次数/扫码烟包数)"></el-table-column>
                    <el-table-column prop="drawUv" label="中奖人数	"></el-table-column>
                    <el-table-column prop="redpacketFee" label="红包发放金额	"></el-table-column>
                    <el-table-column prop="yearRedpacketFee" label="本年累计发放金额"></el-table-column>
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
        name: "KpiProDayPage",
        data(){
            return{
                flagA:false,
                flagB:false,
                listData:[],
                allBrandsData:[],
                allSpecisData:[],
                allProvinceData:[],
                allCityData:[],
                selectAllBrands:'',
                selectSpeciSns:'',
                selectSpeciName:'盒-黄金叶（爱尚）',
                selectProvince:'',
                selectCity:'',
                form:{
                    dt:this.Format("yyyy-MM-dd"),
                    cityName:'',
                    productBrand:'',
                    productSn:'',
                    provinceName:''
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
            selectProvince(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.provinceName='';
                    this.form.provinceName=nval.join(',');
                    this.allCityList(this.form.provinceName);
                }
            },
            selectCity(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.cityName='';
                    this.form.cityName=nval.join(',');
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
                this.allProvinceList();
               // this.allTableDataList();
            },
            allBrandsList(){
                this.$request.post(`/record/public/getUserBrandByUserId`,{ },true,res => {
                        let datas = res || [];
                        datas=[{"brandCode":"0f01c777243143bbb1928f8ea86f07d8","name":"黄金叶"},{"brandCode":"83fb28434f97455f8cba3d509b047f94","name":"帝豪"},{"brandCode":"b7dc34c1422a4bf6bad77772d997bbae","name":"红旗渠"}];
                        this.allBrandsData = datas;
                        if(datas.length>0){
                            this.selectAllBrands=datas[0].name;
                            this.form.productBrand=this.selectAllBrands;
                            this.flagA=true;
                            this.allTableDataList(this.flagA,this.flagB);
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
                        // datas = [{"name":"盒-黄金叶（爱尚）","sn":"6901028165235"},{"name":"盒-爱尚测试","sn":"1234567891234"},{"name":"条-黄金叶（爱尚）","sn":"6901028165242"},{"name":"条-爱尚测试","sn":"1234567890123"}]
                        this.allSpecisData = datas;
                        if(datas.length>0){
                            this.selectSpeciSns=datas[0].sn;
                            this.form.productSn=this.selectSpeciSns;
                            this.flagB=true;
                            this.allTableDataList(this.flagA,this.flagB);
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allProvinceList(){
                this.$request.post(`/record/public/getUserProvByUserId`,{ },true,res => {
                        let datas = res || [];
                        // datas = [{"code":"110000","name":"北京市"},{"code":"120000","name":"天津市"},{"code":"130000","name":"河北省"},{"code":"140000","name":"山西省"},{"code":"150000","name":"内蒙古"},{"code":"210000","name":"辽宁省"},{"code":"220000","name":"吉林省"},{"code":"230000","name":"黑龙江"},{"code":"310000","name":"上海市"},{"code":"320000","name":"江苏省"},{"code":"330000","name":"浙江省"},{"code":"340000","name":"安徽省"},{"code":"350000","name":"福建省"},{"code":"360000","name":"江西省"},{"code":"370000","name":"山东省"},{"code":"410000","name":"河南省"},{"code":"420000","name":"湖北省"},{"code":"430000","name":"湖南省"},{"code":"440000","name":"广东省"},{"code":"450000","name":"广西区"},{"code":"460000","name":"海南省"},{"code":"500000","name":"重庆市"},{"code":"510000","name":"四川省"},{"code":"520000","name":"贵州省"},{"code":"530000","name":"云南省"},{"code":"540000","name":"西藏区"},{"code":"610000","name":"陕西省"},{"code":"620000","name":"甘肃省"},{"code":"630000","name":"青海省"},{"code":"640000","name":"宁夏区"},{"code":"650000","name":"新疆区"}]
                        this.allProvinceData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allCityList(provinceName){//所有市
                this.$request.post(`/record/statistics/getCitysByProvince`,{provinceName:provinceName },true,res => {
                        let datas = res || [];
                        // datas = [{"cityId":"141000","cityName":"临汾市"},{"cityId":"130600","cityName":"保定市"},{"cityId":"141100","cityName":"吕梁市"},{"cityId":"130200","cityName":"唐山市"},{"cityId":"140200","cityName":"大同市"},{"cityId":"120100","cityName":"天津市"},{"cityId":"140100","cityName":"太原市"},{"cityId":"131000","cityName":"廊坊市"},{"cityId":"130700","cityName":"张家口市"},{"cityId":"140900","cityName":"忻州市"},{"cityId":"130800","cityName":"承德市"},{"cityId":"140700","cityName":"晋中市"},{"cityId":"140500","cityName":"晋城市"},{"cityId":"140600","cityName":"朔州市"},{"cityId":"130900","cityName":"沧州市"},{"cityId":"130100","cityName":"石家庄市"},{"cityId":"130300","cityName":"秦皇岛市"},{"cityId":"131100","cityName":"衡水市"},{"cityId":"140800","cityName":"运城市"},{"cityId":"130500","cityName":"邢台市"},{"cityId":"130400","cityName":"邯郸市"},{"cityId":"140400","cityName":"长治市"},{"cityId":"140300","cityName":"阳泉市"}]
                        this.allCityData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allTableDataList(A,B){
                if(A&&B){
                    this.$request.post(`/record/henanreport/getProvReportData`,this.form,true,res => {
                            let datas = res || [];
                            this.listData = datas;
                        }
                    ),
                        err => {
                            console.log(err)
                        }
                }
            },
            queryData(){
                this.allTableDataList(this.flagA,this.flagB);
            },
            exportData(){
                var url = "/record/henanreport/importProvReportData";
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
