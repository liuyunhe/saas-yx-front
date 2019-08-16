<template>
  <div class="SignMgr-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>打卡设置：</span>
      </div>
      <el-form>
        <el-form-item label="连续签到奖励：">
          连续签到
          <el-input-number v-model="ctnDay" :precision="0" :min="0" controls-position="right" />
          天，额外可获得
          <el-input-number v-model="points" :precision="0" :min="0" controls-position="right"/>
          积分
        </el-form-item>
      </el-form>
    </el-card>
    <div style="height: 30px"></div>
    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="confUpdate">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SignMgr",
    data(){
      return{
        ctnDay:'7',
        points:0,
      }
    },
    created(){
      this.getTimeConf()
    },
    methods:{
      // 扫码奖励查询
      getTimeConf(){
        this.$request.post('/hbact/hyr/sign/confQuery', {}, false, res => {
          if (res.code == '200') {
            this.ctnDay = res.data.signConf.ctnDay
            this.points = res.data.signConf.points
            return
          }
          this.$message.error(res.msg)
        })
      },
      confUpdate(){
        this.$request.post('/hbact/hyr/sign/confUpdate', {ctnDay:this.ctnDay,points:this.points}, false, res => {
          if (res.code == '200') {
            this.$message.success('操作成功！')
            this.getTimeConf()
            return
          }
          this.$message.error(res.msg)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.SignMgr-container{
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
}
</style>