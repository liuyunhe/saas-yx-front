<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">实物领奖明细/领奖明细查询</div></el-col>
            </el-row>
            <div class="space"></div>
            <div><h1>订单信息</h1></div>
            <el-form :inline="true" :model="formDetail" class="demo-form-inline">
                <el-row>
                    <el-form-item size="small"  label="订单号:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.orderCode" ></el-input>
                    </el-form-item>
                    <el-form-item size="small"  label="活动ID:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.actCode" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="活动名称:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.actName" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="中奖人:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.nickname" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="中奖人手机号:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.winnerMobile" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="微信号:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.nickname" ></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="奖项名称:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.prizeName" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="关联规格:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.snName" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="获奖时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.ctime" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="获奖地区:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.getaddress" ></el-input>
                    </el-form-item>
                </el-row>
                <div><h1>收货人信息</h1></div>
                <el-row>
                    <el-form-item size="small" label="收货人:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=2?true:false"  v-model="formDetail.receiver" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="手机号:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=2?true:false"  v-model="formDetail.mobile" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="收货地址:省:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=2?true:false"  v-model="formDetail.province" placeholder="请输入内容"></el-input>
                    </el-form-item>

                    <el-form-item size="small" label="市:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=2?true:false"  v-model="formDetail.city" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="区:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=2?true:false"  v-model="formDetail.district" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="详细地址:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=2?true:false"  v-model="formDetail.detail" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <div><h1>订单跟踪</h1></div>
                <el-row>
                    <el-form-item size="small" label="下单时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.stepTime1" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="订单状态:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.stepStatusName1"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="发货时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.stepTime2" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="订单状态:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.stepStatusName2" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="物流号:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.logistics" ></el-input>
                    </el-form-item>
                </el-row>
                <div class="add-tobaccomgr-form-bt">
                    <el-form-item>
                        <el-button type="primary" size="small" @click="submitFormSave" :disabled="formDetail.status!=2?true:false">保存</el-button>
                        <el-button size="small" @click="returnObjectPage">返回列表</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-card>
    </div>

</template>

<script>
    export default {
        props: ['orderId'],
        name: "ObjectPageDetail",
        data(){
            return{

                formDetail:{
                    orderCode:'',
                    actCode:'',
                    winnerMobile:'',
                    actName:'',
                    nickname:'',
                    prizeName:'',
                    snName:'',
                    ctime:'',
                    getaddress:'',
                    receiver:'',
                    mobile:'',
                    province:'',
                    city:'',
                    district:'',
                    detail:'',
                    logistics:'',
                    stepTime1:'',
                    stepTime2:'',
                    status:2,
                    stepStatusName1:'',
                    stepStatusName2:''
                }
            }
        },
        created(){
            this.getObjectPageDetail(this.orderId)
        },
        methods:{
            submitFormSave(){
                let params = {
                    province: this.formDetail.province,
                    city: this.formDetail.city,
                    district: this.formDetail.district,
                    detail: this.formDetail.detail,
                    mobile: this.formDetail.mobile,
                    receiver: this.formDetail.receiver,
                    orderCode: this.formDetail.orderCode
                }
                this.$request.post('/api/saotx/order/save',params,true,res => {
                    if(res.ret == '200000'){
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.returnObjectPage()
                    }else{
                        this.$message({
                            message:res.message,
                            type: 'warning'
                        })
                    }
                },err => {

                })
            },
            returnObjectPage(){
                this.$router.push({
                    path:'/Orders/ACT/object'
                })
            },
            getObjectPageDetail(orderId){
                this.$request.post('/api/saotx/order/detail',{orderCode:orderId}, true, (res) => {
                    if (res.ret == '200000') {
                        console.log(res.data)
                        this.formDetail.orderCode = res.data.orderCode;
                        this.formDetail.actCode = res.data.actCode;
                        this.formDetail.winnerMobile = res.data.winnerMobile;
                        this.formDetail.actName = res.data.actName;
                        this.formDetail.nickname = res.data.nickname;
                        this.formDetail.prizeName = res.data.prizeName;
                        this.formDetail.snName = res.data.snName;
                        this.formDetail.ctime = res.data.ctime;
                        this.formDetail.getaddress = res.data.getaddress;
                        this.formDetail.receiver = res.data.receiver;
                        this.formDetail.mobile = res.data.mobile;
                        this.formDetail.province = res.data.province;
                        this.formDetail.city = res.data.city;
                        this.formDetail.district = res.data.district;
                        this.formDetail.detail = res.data.detail;
                        this.formDetail.logistics = res.data.logistics;
                        this.formDetail.status=res.data.status;
                        this.formDetail.stepTime1 = res.data.logs[0].stepTime;
                        this.formDetail.stepTime2 = res.data.logs[0].stepTime;
                        this.formDetail.stepStatusName1 = res.data.logs[0].stepStatusName;
                        this.formDetail.stepStatusName2 = res.data.logs[1].stepStatusName;

                    }
                })
            }
        }
    }
</script>

<style scoped>
    .space {position:relative;width:100%;height:20px;}
    .add-tobaccomgr-form-bt{
        margin-top: 30px;
        text-align: center;
    }
</style>
