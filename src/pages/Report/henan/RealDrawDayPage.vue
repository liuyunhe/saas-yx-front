<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">实物奖品中奖统计日报</div></el-col>
                <el-button size="small" type="primary" v-on:click="rollBak"> >返回</el-button>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间" size="small">
                        <el-date-picker  v-model="form.dt" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动名称" size="small">
                        <el-select  v-model="selectAllAct" placeholder="全部">
                            <el-option v-for="item in allActData" :key="item.activityId" :label="item.activityName" :value="item.activityId" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地市" size="small">
                        <el-select  v-model="selectCity" placeholder="全部"   :multiple="true"  >
                            <el-option v-for="item in allCityData" :key="item.cityId" :label="item.cityName" :value="item.cityName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="奖品" size="small">
                        <el-input v-model="form.awardName"></el-input>
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
                <el-table-column align="center" :label="'实物中奖情况('+ form.dt+')'">
                    <el-table-column prop="activityName" label="活动名称"></el-table-column>
                    <el-table-column prop="cityName" label="地市"></el-table-column>
                    <el-table-column prop="awardName" label="奖品"></el-table-column>
                    <el-table-column prop="drawPv" label="本期中奖数量"></el-table-column>
                    <el-table-column prop="yearDrawPv" label="本年累计中奖数量"></el-table-column>
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
        name: "RealDrawDayPage",
        data(){
            return{
                listData:[],
                allActData:[],
                allCityData:[],
                selectAllAct:'',
                selectCity:'',
                form:{
                    awardName:'',
                    cityName:'',
                    dt:this.Format("yyyy-MM-dd"),
                    activityId:'08e8736932104925be739eb49ccb9ade'
                }
            }
        },
        created(){
            this.init();
        },
        watch:{
            selectAllAct(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.activityId  = '';
                    this.form.activityId = nval;
                }
            },
            selectCity(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.cityName  = '';
                    this.form.cityName = nval.join(',');
                }
            }
        },
        methods:{
            init(){
                this.allActList();
                this.allCityList();
            },
            allActList(){
                this.$request.post(`/record/actAnalysis/getActyDownBox`,{ },true,res => {
                        let datas = res || [];
                        datas=[{"activityId":"08e8736932104925be739eb49ccb9ade","activityName":"爱”尚“翻牌子--黄金叶（爱尚）条","sn":"6901028165242"},{"activityId":"2cdecc75576b41169601c08ddba06da0","activityName":"爱”尚“翻牌子--黄金叶（爱尚）条","sn":"6901028165242"},{"activityId":"a4ca964f6cf149389f0ae9932c3ac739","activityName":"爱”尚“翻牌子--黄金叶（爱尚）条","sn":"6901028165242"},{"activityId":"5e8fe02c9740430494714393f327c892","activityName":"爱”尚“翻牌子--黄金叶（爱尚）盒","sn":"6901028165235"},{"activityId":"a154acdd2bd6429eb08d9b4b5111e898","activityName":"爱”尚“翻牌子--黄金叶（爱尚）盒","sn":"6901028165235"},{"activityId":"bd227e13de6d4dc49db1a2e79ffe9408","activityName":"爱”尚“翻牌子--黄金叶（爱尚）盒","sn":"6901028165235"},{"activityId":"6a38a42e4c9f406884a6c07c3c55485a","activityName":"爱尚音乐节，圣诞砸金蛋--黄金叶（爱尚）盒","sn":"6901028165235"},{"activityId":"8d50e78af6664e87a18bc0f70b1717c5","activityName":"验真砸金蛋--黄金叶（爱尚）盒","sn":"6901028165235"}];
                        this.allActData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allCityList(){//所有市
                this.$request.post(`/record/statistics/getCitysByProvince`,{ },true,res => {
                        let datas = res || [];
                        datas = [{"cityId":"141000","cityName":"临汾市"},{"cityId":"130600","cityName":"保定市"},{"cityId":"141100","cityName":"吕梁市"},{"cityId":"130200","cityName":"唐山市"},{"cityId":"140200","cityName":"大同市"},{"cityId":"120100","cityName":"天津市"},{"cityId":"140100","cityName":"太原市"},{"cityId":"131000","cityName":"廊坊市"},{"cityId":"130700","cityName":"张家口市"},{"cityId":"140900","cityName":"忻州市"},{"cityId":"130800","cityName":"承德市"},{"cityId":"140700","cityName":"晋中市"},{"cityId":"140500","cityName":"晋城市"},{"cityId":"140600","cityName":"朔州市"},{"cityId":"130900","cityName":"沧州市"},{"cityId":"130100","cityName":"石家庄市"},{"cityId":"130300","cityName":"秦皇岛市"},{"cityId":"131100","cityName":"衡水市"},{"cityId":"140800","cityName":"运城市"},{"cityId":"130500","cityName":"邢台市"},{"cityId":"130400","cityName":"邯郸市"},{"cityId":"140400","cityName":"长治市"},{"cityId":"140300","cityName":"阳泉市"}]
                        this.allCityData = datas;
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allTableDataList(){
                this.$request.post(`/record/henanreport/getObjectReportData`,this.form,true,res => {
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
                var url = "/record/henanreport/importObjectReportData";
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
