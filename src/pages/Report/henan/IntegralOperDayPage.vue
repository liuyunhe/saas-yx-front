<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">积分操作情况统计日报</div></el-col>
                <el-button size="small" type="primary" v-on:click="rollBak"> >返回</el-button>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="查询时间" size="small">
                        <el-date-picker  v-model="form.dt" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
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
                <el-table-column align="center" :label="'活动积分情况('+ form.dt+')'">
                    <el-table-column prop="cityName" label="地市"></el-table-column>
                    <el-table-column label="积分操作">
                        <template slot-scope="scope">
                            <span>{{scope.row.integralType == 0 ? "实物礼品":scope.row.integralType == 1 ?  "盒包扫码获得积分":scope.row.integralType == 2 ?  "条包扫码获得积分":scope.row.integralType == 3 ?  "兑奖消耗积分":"抽奖消耗积分"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="integralValue" label="当日积分值"></el-table-column>
                    <el-table-column prop="addIntegralValue" label="累计积分值"></el-table-column>
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
        name: "IntegralOperDayPage",
        data(){
            return{
                listData:[],
                form:{
                    dt:this.Format("yyyy-MM-dd")
                }
            }
        },
        created(){
            this.init();
        },
        watch:{

        },
        methods:{
            init(){
                this.allTableDataList();
            },
            allTableDataList(){
                this.$request.post(`/record/henanreport/getIntegralDarwReportData`,this.form,true,res => {
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
                var url = "/record/henanreport/importIntegralDarwReportData";
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
