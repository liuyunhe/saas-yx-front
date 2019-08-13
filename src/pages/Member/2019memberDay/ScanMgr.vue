<template>
  <div class="sign-container">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <span>每天扫码奖励设置（每天首扫前3次奖励）</span>
      </div>
      <el-form>
        <el-form-item label="奖励设置："></el-form-item>
        <el-form-item v-for="(item,index) in list" :key="index" label='规格：'>
         {{ item.snName }} 奖励
          <el-input-number v-model="item.points" :precision="0" :min="0" controls-position="right"></el-input-number>
          荷石币
          <span class="ml20">
            每周首次抽奖免费
          </span>
        </el-form-item>
      </el-form>
    </el-card>
    <div style="height: 30px"></div>
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <span>连续扫码奖励设置（不区分规格）</span>
      </div>
      <el-form>
        <el-form-item label="连续扫码奖励："></el-form-item>
        <el-form-item label="连续扫码第5天：">
          额外奖励
          <el-input-number v-model="form.contDay5" :precision="0" :min="0" controls-position="right"></el-input-number>
          荷石币
        </el-form-item>
        <el-form-item label="连续扫码第6天：">
          额外奖励
          <el-input-number v-model="form.contDay6" :precision="0" :min="0" controls-position="right"></el-input-number>
          荷石币
        </el-form-item>
        <el-form-item label="连续扫码第7天：">
          额外奖励
          <el-input-number v-model="form.contDay7" :precision="0" :min="0" controls-position="right"></el-input-number>
          荷石币
        </el-form-item>
      </el-form>
    </el-card>
    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SignMgr",
    data(){
      return {
        list:[
          {
            sn:'1234567',
            snName:'河北测试（变长一点）',
            points:0
          },
          {
            sn:'6901028250009',
            snName:'经典醇和',
            points:0
          },
          {
            sn:'6901028250382',
            snName:'经典浓情',
            points:0
          },
          {
            sn:'6901028250234',
            snName:'钻石（经典浓情）红',
            points:0
          },
          {
            sn:'6901028250351',
            snName:'钻石（细支洪荒之绿）',
            points:0
          },
          {
            sn:'1111111111111',
            snName:'钻石（洪荒之绿）',
            points:0
          },
          {
            sn:'1111111111112',
            snName:'钻石（洪荒之绿薄荷）',
            points:0
          },
          {
            sn:'1111111111114',
            snName:'钻石（玫瑰之旅）',
            points:0
          },
          {
            sn:'6901028078245',
            snName:'钻石（时尚红）',
            points:0
          },
          {
            sn:'6901028079075',
            snName:'钻石（自在·八仙）',
            points:0
          },
          {
            sn:'6901028250788',
            snName:'钻石（时尚蓝）',
            points:0
          },
          {
            sn:'1111111111115',
            snName:'钻石（传奇·子龙）',
            points:0
          },
          {
            sn:'6901028077699',
            snName:'钻石（软绿硬化版）',
            points:0
          },
          {
            sn:'6901028080019',
            snName:'钻石（硬玫瑰紫）',
            points:0
          },
          {
            sn:'6901028250757',
            snName:'钻石（绿石2代）',
            points:0
          },
          {
            sn:'6901028079815',
            snName:'钻石（西柏坡）',
            points:0
          },
          {
            sn:'6901028250320',
            snName:'钻石（细支尚风）',
            points:0
          },
          {
            sn:'6901028250412',
            snName:'钻石（盛世迎宾）',
            points:0
          },
          {
            sn:'6901028250979',
            snName:'钻石（金玉兰）',
            points:0
          },
          {
            sn:'6901028250597',
            snName:'钻石（硬珍品）',
            points:0
          },
          {
            sn:'6901028107105',
            snName:'钻石（扁蓝时尚）',
            points:0
          },
          {
            sn:'6901028250955',
            snName:'钻石（细支心世界）',
            points:0
          },
          {
            sn:'6901028107198',
            snName:'钻石（细支西柏坡）',
            points:0
          },
          {
            sn:'6901028250790',
            snName:'钻石（金石）',
            points:0
          },
          {
            sn:'6901028077460',
            snName:'钻石(冰雪大好河山)',
            points:0
          },

        ],
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
      this.getContConf()
    },
    mounted() {
    },
    methods:{
      // 扫码奖励查询
      getScanConf(){
        this.$request.post('/hbact/dayscan/conf/list', {}, true, res => {
          if (res.code == '200') {
              this.list.forEach((e)=>{
                let data = res.data
                data.forEach((i)=>{
                  if(e.sn == i.sn){
                    e.points = i.points
                  }
                })
              })
            // console.log(res.data)
            return
          }
          this.$message.error(res.msg)
        })
      },
      // 连续签到查询
      getContConf(){
        this.$request.post('/hbact/dayscan/cont/list', {}, true, res => {
          if (res.code == '200') {
            let data = res.data
            data.forEach((e,i)=>{
              if(e.contDay == 5){
                this.form.contDay5 = e.points
              }
              else if(e.contDay == 6) {
                this.form.contDay6 = e.points
              }
              else if(e.contDay == 7) {
                this.form.contDay7 = e.points
              }
            })
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
              "sn": e.sn,
              "snName": e.snName,
              "points": e.points
            }
          })
          this.$request.post('/hbact/dayscan/conf/update', params, true, res => {
            resolve(res)
          })
        })
      },
      //连续签到更新
      contDayUpdate(){
        return new Promise ((resolve,reject)=>{
          this.$request.post('/hbact/dayscan/cont/update', [
            {
              "contDay":5,
              "points": this.form.contDay5
            },
            {
              "contDay":6,
              "points": this.form.contDay6
            },
            {
              "contDay":7,
              "points": this.form.contDay7
            }
          ], true, res => {
            resolve(res)
          })
        })
      },
      handleSave(){
        Promise.all([
          this.dayscanUpdate(),
          this.contDayUpdate(),

        ])
        .then(([dayscan, contDay]) => {
          if (dayscan.code == '200') {
            console.log(dayscan.data)
          }else {
            this.$message.error(dayscan.msg)
            return
          }
          if (contDay.code == '200') {
            console.log(contDay.data)
          }else {
            this.$message.error(contDay.msg)
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