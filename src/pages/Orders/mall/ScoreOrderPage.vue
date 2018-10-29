<template>


    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">积分商城/积分活动订单</div></el-col>
            </el-row>
            <div class="space"></div>

        </el-card>
    </div>

</template>

<script>
    export default {
        name: "ScoreOrderPage",
        data(){
            return{

            }
        },
        created() {
            this.init()
        },
        methods:{
            init(){
                var crtTime = new Date();
                var beginTime=20181025000000;
                var endTime=20181025235959
                var nowTime = this.dateFtt("yyyyMMddhhmmss",crtTime)
                var flag = false;
                var discount=1;
                if(nowTime>=beginTime && nowTime<=endTime){
                    flag=true
                    discount=0.8
                }
            },
             dateFtt(fmt,date){ //author: meizz
                var o = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "h+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }

    }


    }
</script>

<style scoped>

</style>
