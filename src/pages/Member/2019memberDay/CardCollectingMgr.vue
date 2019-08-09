<template>
  <div class="sign-container">
    <div v-for="(item,index) in list" :key="index" >
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>卡片{{ index+1 }}设置（卡片兑换时间每月20日-25日）</span>
        </div>
        <el-form>
          <el-form-item label='名称：'>
            {{ item.name }}
            <span style="margin-right: 20px"></span>
            投放数量<el-input-number v-model="item.totalNum" :precision="0" :min="0" controls-position="right"></el-input-number>个
            <span style="margin-right: 20px"></span>
            剩余数量{{ item.outNum }}个
            <span style="margin-right: 20px"></span>
            中奖概率<el-input-number v-model="item.prizePert" :precision="0" :min="0" controls-position="right"></el-input-number>
            %
          </el-form-item>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
    </div>


<!--    <el-card :body-style="{ padding: '20px' }">-->
<!--      <div slot="header" class="clearfix">-->
<!--        <span>连续扫码奖励设置（不区分规格）</span>-->
<!--      </div>-->
<!--      <el-form>-->
<!--        <el-form-item label="连续扫码奖励："></el-form-item>-->
<!--        <el-form-item label="连续扫码第5天：">-->
<!--          额外奖励-->
<!--          <el-input-number v-model="form.contDay5" :precision="0" :min="0" controls-position="right"></el-input-number>-->
<!--          荷石币-->
<!--        </el-form-item>-->
<!--        <el-form-item label="连续扫码第6天：">-->
<!--          额外奖励-->
<!--          <el-input-number v-model="form.contDay6" :precision="0" :min="0" controls-position="right"></el-input-number>-->
<!--          荷石币-->
<!--        </el-form-item>-->
<!--        <el-form-item label="连续扫码第7天：">-->
<!--          额外奖励-->
<!--          <el-input-number v-model="form.contDay7" :precision="0" :min="0" controls-position="right"></el-input-number>-->
<!--          荷石币-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-card>-->
    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CardColletingMgr",
    data(){
      return {
        list:[],
        form:{
          num:0,
          contDay5:0,
          contDay6:0,
          contDay7:0,
        }
      }
    },
    created() {
      this.getScanConf()
    },
    mounted() {
    },
    methods:{
      // 扫码奖励查询
      getScanConf(){
        this.$request.post('/hbact/commucard/queryConfig', {}, true, res => {
          if (res.code == '200') {
            this.list = res.data
            // console.log(res.data)
            return
          }
          this.$message.error(res.msg)
        })
      },

      //扫码奖励更新
      dayscanUpdate(){
        return new Promise ((resolve,reject)=>{
          let params = this.list.map((e,i)=>{
            return {
              "code": e.code,
              "totalNum": e.totalNum,
              "prizePert": e.prizePert
            }
          })
          this.$request.post('/hbact/commucard/setConfig', params, true, res => {
            resolve(res)
          })
        })
      },

      handleSave(){
        Promise.all([
          this.dayscanUpdate(),

        ])
        .then(([dayscan]) => {
          if (dayscan.code == '200') {
            console.log(dayscan.data)
          }else {
            this.$message.error(dayscan.msg)
            return
          }
          this.$message.success('保存成功！')
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .sign-container{
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
  }
</style>