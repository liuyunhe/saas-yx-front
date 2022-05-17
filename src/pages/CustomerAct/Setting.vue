<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-col class="mb20">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>提现申请阈值设置：</span>
          </div>
          <el-form :model="info" :rules="rules" ref="ruleForm1" label-width="150px"  class="demo-ruleForm">
            <el-form-item label="提现申请阈值金额：" prop="redpack">
              <el-input-number  :step="1" :precision="2":min="0" controls-position="right" v-model="info.redpack"></el-input-number>
              <span style="margin-left: 20px;color: #8a8a8a">单位：元</span>
            </el-form-item>
            <el-form-item label="提现申请阈值积分：" prop="points">
              <el-input-number  :step="1" :precision="0":min="0" controls-position="right" v-model="info.points"></el-input-number>
              <span style="margin-left: 20px;color: #8a8a8a">单位：荷石璧</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm1')">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col class="mb20">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>零售户佣金提现设置：</span>
          </div>
          <el-form :model="tx1" :rules="rules" ref="ruleForm2" label-width="150px"  class="demo-ruleForm">
            <el-form-item label="是否开启：">
              <el-switch
                  v-model="tx1.open"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  style="margin-top: -4px;"
                  :active-value="1"
                  :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="提现时间：" prop="txTime">
              <el-time-select
                v-model="tx1.txTime"
                :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
                placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <el-form-item label="重复日期：" prop="cron">
              <el-select v-model="tx1.cron" multiple placeholder="请选择">
                <el-option
                    v-for="item in crons"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col class="mb20">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>零售户积分提现设置：</span>
          </div>
          <el-form :model="tx2" :rules="rules" ref="ruleForm3" label-width="150px"  class="demo-ruleForm">
            <el-form-item label="是否开启：">
              <el-switch
                  v-model="tx2.open"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  style="margin-top: -4px;"
                  :active-value="1"
                  :inactive-value="0"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="提现时间：" prop="txTime">
              <el-time-select
                  v-model="tx2.txTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:01',
                    end: '23:59'
                  }"
                  placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <el-form-item label="重复日期：" prop="cron">
              <el-select v-model="tx2.cron" multiple placeholder="请选择">
                <el-option
                    v-for="item in crons"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm3')">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      var validateRedpack = (rule, value, callback) => {
        if (!this.info.redpack) {
          callback(new Error('请输入红包金额'))
        } else {
          callback()
        }
      }
      var validatePoints = (rule, value, callback) => {
        if (!this.info.points) {
          callback(new Error('请输入积分数额'))
        } else {
          callback()
        }
      }
      return {
        loading:true,
        utime:'',
        crons:[
          {label:'星期一',value:"1"},
          {label:'星期二',value:"2"},
          {label:'星期三',value:"3"},
          {label:'星期四',value:"4"},
          {label:'星期五',value:"5"},
          {label:'星期六',value:"6"},
          {label:'星期日',value:"7"},
        ],
        info:{
          "redpack": null, // 第一次配置为 null 或者 不传递
          "points": null, // 活动参与结束时间
        },
        tx1:{
          "type": 3, //类型，,3:红包 6:积分
          "open": 1, //是否开启 0:未开启 1:开启
          "txTime": null, //提现时间
          "cron": [], //提现周期
        },
        tx2:{
          "type": 6, //类型，,3:红包 6:积分
          "open": 1, //是否开启 0:未开启 1:开启
          "txTime": null, //提现时间
          "cron": [], //提现周期
        },
        rules: {
          redpack: [{required: true, validator: validateRedpack, trigger: 'blur'}],
          points: [{required: true, validator: validatePoints, trigger: 'blur'}],
          cron: [{required: true, message: "请选择重复日期", trigger: 'change'}],
          txTime: [{required: true, message: "请选择提现时间", trigger: 'change'}],
        },
      }
    },
    created() {
      this.getInfo()
      this.getTX1Info()
      this.getTX2Info()
    },
    methods: {
      handleOpen(value) {
        console.log(value)
      },
      getInfo() {
        this.$request.get('/saasHbseller/sellerRebate/threshold/query',{}, res => {
          this.loading = false
          if (res.code == '200') {
            this.info.redpack = res.data.redpack
            this.info.points = res.data.points
            return
          }
          this.$message.error(res.msg)
        })
      },
      getTX1Info() {
        this.$request.post('/saasHbseller/sellerRebate/tx/query',{type:3},false, res => {
          this.loading = false
          if (res.code == '200') {
            this.tx1.open = res.data.open
            this.tx1.txTime = res.data.txTime
            this.tx1.cron = res.data.cron.split(",")
            return
          }
          this.$message.error(res.msg)
        })
      },
      getTX2Info() {
        this.$request.post('/saasHbseller/sellerRebate/tx/query',{type:6},false, res => {
          this.loading = false
          if (res.code == '200') {
            this.tx2.open = res.data.open
            this.tx2.txTime = res.data.txTime
            this.tx2.cron = res.data.cron.split(",")
            return
          }
          this.$message.error(res.msg)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save(formName)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      save(formName){
        this.loading = true
        if(formName == 'ruleForm1'){
          let params = {
            "redpack":  this.info.redpack,
            "points": this.info.points
          }
          this.$request.post('/saasHbseller/sellerRebate/threshold/setting', params, false, res => {
            this.loading = false
            if (res.code == '200') {
              this.$message.success("保存成功！")
              this.getInfo()
              return
            }
            this.$message.error(res.msg)
          })
        }
        if(formName == 'ruleForm2'){
          let params = {
            "type": this.tx1.type, //类型，,3:红包 6:积分
            "open": this.tx1.open, //是否开启 0:未开启 1:开启
            "txTime": this.tx1.txTime, //提现时间
            "cron": this.tx1.cron.join(','), //提现周期
          }
          this.$request.post('/saasHbseller/sellerRebate/tx/setting', params, false, res => {
            this.loading = false
            if (res.code == '200') {
              this.$message.success("保存成功！")
              this.getTX1Info()
              return
            }
            this.$message.error(res.msg)
          })
        }
        if(formName == 'ruleForm3'){
          let params = {
            "type": this.tx2.type, //类型，,3:红包 6:积分
            "open": this.tx2.open, //是否开启 0:未开启 1:开启
            "txTime": this.tx2.txTime, //提现时间
            "cron": this.tx2.cron.join(','), //提现周期
          }
          this.$request.post('/saasHbseller/sellerRebate/tx/setting', params, false, res => {
            this.loading = false
            if (res.code == '200') {
              this.$message.success("保存成功！")
              this.getTX2Info()
              return
            }
            this.$message.error(res.msg)
          })
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
  .select-num-dialog {
    .con {
      text-align: center;
      user-select: none;
      .warpper {
        padding: 20px 40px;
      }
      .num {
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 10px 10px;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          color: #fff;
          background-color: #409EFF;
        }
        &.active:hover {
          color: #fff;
        }
      }
      .num:hover {
        color: #409EFF;
        border: 1px solid #409EFF;
      }
    }
  }
  .selected-dialog {
    .con {
      width: 400px;
      height: 60px;
      display: flex;
      margin: 0 auto 40px;
      .num {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        background-color: #409EFF;
        border-radius: 50%;
      }
      .num:first-child {
        margin: 0 40px 0 120px;
      }
    }
    .btn {
      text-align: center;
    }
  }
</style>
