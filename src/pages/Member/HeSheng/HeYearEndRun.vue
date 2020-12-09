<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-col class="mb20">
        <el-button type="primary" @click="open" :disabled="!openAwardTime">开奖</el-button>
        <span style="margin-left: 20px"></span>
        <span v-if="info.lottoryStatus == 1">活动进行中，不可开奖（在结束参与时间后，可操作开奖）</span>
        <span v-if="info.lottoryStatus == 2">开奖中</span>
        <span v-if="info.lottoryStatus == 3">已开奖</span>
        <span v-if="info.lottoryStatus == 4">开奖失败</span>
      </el-col>
      <el-col class="mb20">
        <div>当前已有<span style="color: #409EFF">{{ userNum }}</span>人获得瓜分大奖资格</div>
      </el-col>
      <el-col class="mb20">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>活动设置：</span>
          </div>
          <el-form :model="info" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="跑步活动ID：" prop="actCode">
              <el-input :disabled="!!info.id" v-model="info.actCode" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="跑步活动结束参与时间：" prop="joinEtime">
              <el-date-picker :disabled="!!info.id" v-model="info.joinEtime"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="单个用户可瓜分获得金额：" prop="redpackMoney">
              <el-input-number :disabled="info.lottoryStatus > 1" :step="0.01" :precision="2":min="0" controls-position="right" v-model="info.redpackMoney"></el-input-number> 元
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
      return {
        loading:true,
        info:{
          "id": null, // 第一次配置为 null 或者 不传递
          "joinEtime": "", // 活动参与结束时间
          "actCode": "", // 活动code
          "redpackMoney": 0 ,// 红包金额
          "lottoryStatus": 0
        },
        addNum :0,
        userNum:0,
        openAwardTime:false,
        rules: {
          actCode: [{required: true, message: '请输入跑步活动ID', trigger: 'blur'}],
          joinEtime: [{required: true, message: '请输入结束时间', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.$request.post('/hbact/saas/runAct/configInfo', {}, true, res => {
          this.loading = false
          if (res.code == '200') {
            console.log(res.data)
            if(res.data.nowConfig){
              this.info = res.data.nowConfig
            }
            this.openAwardTime = res.data.openAwardTime
            this.userNum = res.data.userNum
            return
          }
          this.$message.error(res.msg)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      save(){
        this.loading = true
        let params = {
          "id": this.info.id,
          "joinEtime":  this.info.joinEtime,
          "actCode": this.info.actCode,
          "redpackMoney": this.info.redpackMoney,
        }
        this.$request.post('/hbact/saas/runAct/configUpdate', params, true, res => {
          this.loading = false
          if (res.code == '200') {
            this.$message.success("保存成功！")
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
        })
      },
      open(){
        this.$request.post('/hbact/saas/runAct/awardOpen', {configId:this.info.id}, false, res => {
          if (res.code == '200') {
            this.$message.success(res.msg)
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
          this.getInfo()
        })
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
