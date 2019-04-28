<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">运营小工具/二维码激活</div></el-col>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="CODE" size="small" >
                        <el-input v-model="form.code" placeholder="请输入关键词"></el-input>
                    </el-form-item>
                    <el-form-item  size="small" label="SN/验证码">
                        <el-input v-model="form.verifycode" placeholder="请输入关键词"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="商品状态:" >
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-form-item>
                    <el-row><el-button type="primary" v-on:click="queryData">查询</el-button></el-row>
                </el-form-item>
            </el-form>
            <el-table :data="listData" style="width: 100%" border>
                <el-table-column  label="操作" >
                    <template slot-scope="scope">
                        <a v-if="scope.row.lableStatus == 0" href="javascript:void(0)"  v-on:click="activeFn">激活</a>
                        <span v-else-if="scope.row.lableStatus == 1">已激活</span>
                    </template>
                </el-table-column>
                <el-table-column  label="状态" >
                    <template slot-scope="scope">
                        {{['未激活','已激活'][scope.row.lableStatus]}}
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                        <template slot-scope="scope">
                            {{['','内码','外码'][scope.row.type]}}
                        </template>
                </el-table-column>
                <el-table-column prop="code" label="CODE"></el-table-column>
                <el-table-column prop="verifycode" label="验证码"></el-table-column>
                <el-table-column prop="sn" label="SN"></el-table-column>
                <el-table-column prop="batch" label="内部批次号"></el-table-column>
                <el-table-column prop="subbatch" label="印刷厂返回子批次号"></el-table-column>
                <el-table-column prop="productname" label="规格"></el-table-column>
                <el-table-column prop="count" label="扫码次数"></el-table-column>
                <el-table-column prop="lastcreatetime" label="生成时间"></el-table-column>
                <el-table-column prop="firstscantime" label="首扫时间"></el-table-column>
                <el-table-column prop="printShop" label="生产厂家"></el-table-column>
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
        name: "QrcodeActive",
        data(){
            return{
                listData:[],
                options: [{
                    value: '1',
                    label: '内码'
                }, {
                    value: '2',
                    label: '外码'
                }],
                form:{
                    code:'',
                    verifycode:'',
                    type:'1'
                }
            }
        },
        created(){
        },
        methods:{
            getDataList(){
                this.$request.post(`/api/wiseqr/codeActivate/queryCode`,this.form,false,res => {
                    console.log(res.data);
                        if (res.ret === '200000') {
                            this.listData.push( res.data);
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },

            queryData(){
                if(this.form.code==''){
                    this.$message.error("code不能为空！");
                    return;
                }
                /*if(this.form.verifycode==''){
                    this.$message.error("验证码不能为空！");
                    return;
                }*/
                this.getDataList();
            },
            activeFn(){
                this.$request.post(`/api/wiseqr/codeActivate/updateDate`,this.form,false,res => {
                        console.log(res.data);
                        if (res.ret === '200000') {
                            this.getDataList();
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }

            }
        }
    }
</script>

<style scoped>

</style>
