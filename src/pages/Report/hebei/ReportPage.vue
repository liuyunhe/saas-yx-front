<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">固定报表列表</div></el-col>
            </el-row>
            <div class="space"></div>
            <el-table :data="listData" style="width: 100%" border>
                <el-table-column label="序号" type="index" style="width: 50%"align="center">
                    <template slot-scope="scope">
                        {{scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column  label="列表名称" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.reportUrl)" type="text" size="small">{{scope.row.reportName}}</el-button>
                    </template>
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
        name: "ReportPage",
        data(){
            return{
                listData:[]
            }
        },
        created (){
            this.init();
        },
        methods:{
            init(){
                this.allKeyWordList();
            },
            allKeyWordList(){
                this.$request.post(`/api/saotx/report/list`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                                this.listData=res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            handleClick(url){
                alert(url);
                this.$router.push({path:url});
            }
        }
    }
</script>

<style scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
