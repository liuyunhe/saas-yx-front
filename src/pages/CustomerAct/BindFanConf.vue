<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-col class="mb20">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>拉新设置：<span style="color: #7c7f83;">（上次配置时间：{{ utime }}）</span></span>
          </div>
          <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="绑定奖励：" prop="pointsPerFan">
              零售户完成1个粉丝绑定，可获得<el-input-number  :step="1" :precision="0":min="0" controls-position="right" v-model="info.pointsPerFan"></el-input-number>荷石币
            </el-form-item>
            <el-form-item label="绑定人数：" prop="bindFlag">
              <el-radio-group v-model="info.bindFlag">
                <el-radio label="0">不限</el-radio>
                <el-radio label="1">
                  每天最多绑定人数限
                  <el-input-number  :step="1" :precision="0":min="0" controls-position="right" v-model="info.limitNum"></el-input-number>
                  人
                </el-radio>
              </el-radio-group>
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
      var validateBindFlag = (rule, value, callback) => {
        if (this.info.bindFlag == '1') {
          if(!this.info.limitNum){
            callback(new Error('请输入限制人数'))
          }else {
            callback()
          }
        }else {
          callback()
        }
      }
      return {
        loading:true,
        utime:'',
        info:{
          "id": null, // 第一次配置为 null 或者 不传递
          "pointsPerFan": "", // 活动参与结束时间
          "bindFlag": 0, // 活动code
          "limitNum": 0 ,// 红包金额
        },
        rules: {
          bindFlag: [{required: true, validator: validateBindFlag, trigger: 'change'}],
          pointsPerFan: [{required: true, message: '请输入红包金额', trigger: 'blur'}],
        },
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.$request.get('/saasHbseller/bindFanConf/info',{}, res => {
          this.loading = false
          if (res.code == '200') {
            if(res.data.bindConf){
              this.utime = res.data.bindConf.utime
              this.info.pointsPerFan = res.data.bindConf.pointsPerFan
              if(res.data.bindConf.bindFlag == 0){
                this.info.bindFlag = "0"
                this.info.limitNum = 0
                setTimeout(()=>{
                  this.$refs.ruleForm.clearValidate()
                },200)

              }else {
                this.info.bindFlag = "1"
                this.info.limitNum = res.data.bindConf.limitNum
              }
            }
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
          "pointsPerFan":  this.info.pointsPerFan,
          "bindFlag": this.info.bindFlag,
          "limitNum": this.info.bindFlag == 1 ? this.info.limitNum : 0,
        }
        this.$request.post('/saasHbseller/bindFanConf/update', params, true, res => {
          this.loading = false
          if (res.code == '200') {
            this.$message.success("保存成功！")
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
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
