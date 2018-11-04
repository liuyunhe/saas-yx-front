<template>
    <div class="zxwm-setting">
        <el-card class="setting-card">
            <ul class="">
                <li>
                    <p class="title">店铺与消费者关联时间设置：</p>
                    <div>
                        是否开启：
                        <el-switch size="small" v-model="form.time" active-color="#13ce66" inactive-color="#eeeeee"></el-switch>
                        <el-input-number size="small" v-show="form.time" v-model="form.timeText" controls-position="right" :min="1" :max="2147483647"></el-input-number>
                        <span class="unit-info" v-show="form.time">单位：分钟</span>
                    </div>
                </li>
                <li>
                    <p class="title">零售户首页是否显示领取店码标牌设置：</p>
                    <div>
                        是否显示：
                        <el-switch size="small" v-model="form.showGetQr" active-color="#13ce66" inactive-color="#eeeeee"></el-switch>
                    </div>
                </li>
                <li>
                    <p class="title">店码二维码打印设置：</p>
                    <div>
                        是否收费（含运费和税费）：
                        <el-switch size="small" v-model="form.printQr" active-color="#13ce66" inactive-color="#eeeeee"></el-switch>
                        <el-input-number size="small" v-show="form.printQr" v-model="form.printMoney" controls-position="right" :min="0" :max="2147483647"></el-input-number>
                        <span class="unit-info" v-show="form.printQr">单位：元</span>
                    </div>
                </li>
                <li class="last">
                    <p class="title">提现申请阀值设置：</p>
                    <div>
                        提现需申请阀值金额：
                        <el-input-number size="small" v-model="form.auditingMoney" controls-position="right" :min="0" :max="2147483647"></el-input-number>
                        <span class="unit-info">单位：元</span>
                    </div>
                </li>
            </ul>
            <div class="oper-block">
                <el-button size="small" type="primary" @click="save">保存</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                time: false, // 是否开启店铺与消费者关联时间
                timeText: "", // 开启时，店铺与消费者关联时间分钟数
                showGetQr: false, // 是否显示领取店码标牌
                printQr: false, // 是否收费店码的打印
                printMoney: "", // 收费店码的打印金额（含运费和税费）
                auditingMoney: "" // 提现申请阀值
            }
        }
    },
    created() {
        this.initSettings();
    },
    methods: {
        initSettings() {
            this.$request.post('/lsh/seller-manager/setting/querySysSetting', {}, true, (res)=>{
                if (res.ok) {
                    let datas = res.data||{};
                    this.form.time = datas.SELLER_CONSUMER_ISSET==1?true:false;
                    this.form.timeText = datas.SELLER_CONSUMER_THRESHOLD||"";
                    this.form.showGetQr = datas.SELLER_QRPRINT_SHOW_ISSET==1?true:false;
                    this.form.printQr = datas.SELLER_QRPRINT_CHARGE_ISSET==1?true:false;
                    this.form.printMoney = datas.SELLER_QRPRINT_CHARGE_STANDARD||"";
                    this.form.auditingMoney = datas.SELLER_TX_AMOUNT_AUTH||"";
                }
            });
        },
        save() {
            let params = {SELLER_CONSUMER_ISSET:0,SELLER_CONSUMER_THRESHOLD:'',SELLER_QRPRINT_SHOW_ISSET:0,SELLER_QRPRINT_CHARGE_ISSET:0,SELLER_QRPRINT_CHARGE_STANDARD:'',SELLER_TX_AMOUNT_AUTH:this.form.auditingMoney};
            if(this.form.time) { // 店铺与消费者关联时间：设置开启
                params.SELLER_CONSUMER_ISSET = 1;
                if(!this.form.timeText) {
                    this.$message.error("店铺与消费者关联时间不能为空，并且必须大于0！");
                    return false;
                }
                params.SELLER_CONSUMER_THRESHOLD = this.form.timeText;
            }
            if(this.form.showGetQr) { // 零售户首页是否显示领取店码标牌：设置开启
                params.SELLER_QRPRINT_SHOW_ISSET = 1;
            }
            if(this.form.printQr) { // 店码二维码打印：设置开启
                params.SELLER_QRPRINT_CHARGE_ISSET = 1;
                params.SELLER_QRPRINT_CHARGE_STANDARD = this.form.printMoney;
            }
            this.$request.post('/lsh/seller-manager/setting/sellerSysSetting', {settings:params}, true, (res)=>{
                if (res.ok) {
                    this.$message({type: 'success', message: '保存成功!'});
                } else {
                    this.$message.error("保存失败，请稍候再试或联系管理员！");
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .zxwm-setting {
        .setting-card {
            min-height: 500px;
            ul {
                li {
                    padding-bottom: 20px;
                    border-bottom: 1px solid #888888;
                    line-height: 40px;
                    p.title {
                        font-weight: 400;
                        font-size: 16px;
                    }
                    div {
                        padding-left: 30px;
                        .el-input-number {
                            margin-left: 20px;
                            min-width: 200px;
                        }
                        .unit-info {
                            margin-left: 20px;
                            color: #888888;
                        }
                    }
                }
                li.last {
                    border: none;
                }
            }
            .oper-block {
                width: 100%;
                text-align: center;
                margin-top: 30px;
            }
        }
    }
</style>