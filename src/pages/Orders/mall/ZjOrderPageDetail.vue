<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">积分商城/自建订单明细/订单明细查询</div></el-col>
            </el-row>
            <div class="space"></div>
            <div><h1>订单信息</h1></div>
            <el-form :inline="true" :model="formDetail" class="demo-form-inline">
                <el-row>
                    <el-form-item size="small"  label="订单号:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.orderId" ></el-input>
                    </el-form-item>
                    <el-form-item size="small"  label="下单时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.create_time" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="商品名称:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.awardName" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="分类:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.category" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="兑换值:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.score" ></el-input>
                    </el-form-item>
                </el-row>
                <div><h1>收货人信息</h1></div>
                <el-row>
                    <el-form-item size="small" label="联系人姓名:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=0?true:false"  v-model="formDetail.username" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="联系人电话:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=0?true:false"  v-model="formDetail.mobile" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="收货地址:省:">
                        <el-select v-model="selectallPro" placeholder="请选择" :disabled="formDetail.status!=0?true:false"    >
                            <el-option v-for="(item,index) in allProvinceData" :key="item.code" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                        <!--<el-input class="tobacco-input" :disabled="formDetail.status!=0?true:false"  v-model="formDetail.province" placeholder="请输入内容"></el-input>-->
                    </el-form-item>

                    <el-form-item size="small" label="市:">
                        <el-select v-model="selectallCity" placeholder="请选择" :disabled="formDetail.status!=0?true:false"  >
                            <el-option v-for="(item,index) in allCityData" :key="item.code" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                        <!--<el-input class="tobacco-input" :disabled="formDetail.status!=0?true:false"  v-model="formDetail.city" placeholder="请输入内容"></el-input>-->
                    </el-form-item>
                    <el-form-item size="small" label="区:">
                        <el-select v-model="selectallDistrict" placeholder="请选择" :disabled="formDetail.status!=0?true:false"    >
                            <el-option v-for="(item,index) in allDistrictData" :key="item.code" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                        <!--<el-input class="tobacco-input" :disabled="formDetail.status!=0?true:false"  v-model="formDetail.district" placeholder="请输入内容"></el-input>-->
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="详细地址:">
                        <el-input class="tobacco-input" :disabled="formDetail.status!=0?true:false"  v-model="formDetail.address" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-row>
                <div><h1>订单跟踪</h1></div>
                <el-row>
                    <el-form-item size="small" label="下单时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.ctime" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="订单状态:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.orderStatus"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="发货时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.create_time" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="订单状态:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.orderWLoad" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="物流号:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.waybill" ></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item size="small" label="收货时间:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.finish_time" ></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="订单状态:">
                        <el-input class="tobacco-input" disabled  v-model="formDetail.orderFLoad"></el-input>
                    </el-form-item>
                </el-row>
                <div class="add-tobaccomgr-form-bt">
                    <el-form-item>
                        <el-button  size="small" type="primary"  @click="submitFormSave" :disabled="formDetail.status!=0?true:false">保存</el-button>
                        <el-button size="small" @click="returnObjectPage">返回列表</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-card>
    </div>

</template>

<script>
    export default {
        props: ['orderCode'],
        name: "ZjOrderPageDetail",
        data(){
            return{
                allProvinceData:[],
                allCityData:[],
                allDistrictData:[],
                selectallPro:'',
                selectallCity:'',
                selectallDistrict:'',
                formDetail:{
                    orderId:'',
                    create_time:'',
                    category:'',
                    awardName:'',
                    score:'',
                    username:'',
                    mobile:'',
                    province:'',
                    city:'',
                    district:'',
                    address:'',
                    status:0,
                    ctime:'',
                    orderStatus:'',
                    orderWLoad:'',
                    waybill:'',
                    finish_time:'',
                    orderFLoad:''

                }
            }
        },
        created(){
            this.getObjectPageDetail(this.orderCode)
            this.init()
        },
        watch:{//监听品牌，规格，地域
            selectallPro(nval, oval){//省
                if(nval&&nval!=oval) {
                    this.formDetail.province=nval;
                    this.allMoreRightRegionList(nval,2);
                }
            },
            selectallCity(nval, oval){//市
                if(nval&&nval!=oval) {
                    this.formDetail.city=nval;
                    this.allMoreRightRegionList(nval,3);
                }
            },
            selectallDistrict(nval, oval){//区
                if(nval&&nval!=oval) {
                    this.formDetail.district=nval;
                }
            }


        },
        methods:{
            init(){
                this.allRightRegionList()
            },
            allRightRegionList(){//所有省
                this.$request.post(`/api/saotx/dim/regionByPCode`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allProvinceData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allMoreRightRegionList(parentCode,type){//根据父编码找下级数据
                this.$request.post(`/api/saotx/dim/regionByPCode`,{parentCode: parentCode},true,res => {
                        if (res.ret === '200000') {
                            if(type==2){
                                this.allCityData = res.data;
                            }
                            if(type==3){
                                this.allDistrictData = res.data;
                            }
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            submitFormSave(){
                let params = {
                    userName: this.formDetail.username,
                    mobile: this.formDetail.mobile,
                    province: this.formDetail.province,
                    city: this.formDetail.city,
                    district: this.formDetail.district,
                    adddress: this.formDetail.address,
                    orderId: this.formDetail.orderId
                }
                this.$request.post('/sc/saotx/mall/order/modifyReceiptInfo',params,true,res => {
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
            returnObjectPage(){//返回列表
                this.$router.push({
                    path:'/Orders/mall/zj'
                })
            },
            getObjectPageDetail(orderCode){//详情数据
                this.$request.post('/sc/saotx/mall/order/selfOrderDetail',{orderId:orderCode}, true, (res) => {
                    if (res.ret == '200000') {
                        console.log(res.data)
                        this.formDetail.orderId = res.data.orderInfo.orderid;
                        this.formDetail.create_time = this.formatDateTime(res.data.orderInfo.create_time);
                        this.formDetail.category = res.data.orderInfo.category;
                        this.formDetail.awardName = res.data.orderInfo.awardName;
                        this.formDetail.score = res.data.orderInfo.score;
                        this.formDetail.status = res.data.orderInfo.status;

                        this.formDetail.username = res.data.ReceiptInfo.username;
                        this.formDetail.mobile = res.data.ReceiptInfo.mobile;
                        this.formDetail.province = res.data.ReceiptInfo.province;
                        this.selectallPro = res.data.ReceiptInfo.province + '';
                        this.formDetail.city = res.data.ReceiptInfo.city;
                        this.selectallCity = res.data.ReceiptInfo.city + '';
                        this.formDetail.district = res.data.ReceiptInfo.district;
                        this.selectallDistrict = res.data.ReceiptInfo.district+'';
                        this.formDetail.address = res.data.ReceiptInfo.address;

                        this.formDetail.ctime = this.formatDateTime(res.data.orderTrackingInfo.ctime);
                        this.formDetail.orderStatus = res.data.orderTrackingInfo.orderStatus;
                        this.formDetail.orderWLoad = res.data.orderTrackingInfo.orderWLoad;
                        this.formDetail.waybill = res.data.orderTrackingInfo.waybill;
                        this.formDetail.finish_time = this.formatDateTime(res.data.orderTrackingInfo.finish_time);
                        this.formDetail.orderFLoad = res.data.orderTrackingInfo.orderFLoad;

                    }
                })
            },
            formatDateTime(inputTime){//时间格式化
                if(inputTime!=null){
                    var date = new Date(inputTime);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    var minute = date.getMinutes();
                    var second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
                }
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
