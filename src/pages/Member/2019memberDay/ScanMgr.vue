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
<!--          <span class="ml20">-->
<!--            每周首次抽奖免费-->
<!--          </span>-->
        </el-form-item>
      </el-form>
    </el-card>
    <div style="height: 30px"></div>
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <span>红包：</span>
      </div>
      <div style="margin-bottom: 20px">选择红包:<el-button size="" style="margin-left: 20px"  @click="getList(3)">选择</el-button></div>
      <el-form>
        <el-form-item v-for="(item,index) in hb" :key="index" label='名称：'>
          面额 <el-input-number v-model="item.awardPrice" :disabled="item.id ? true : false" :precision="2" :min="0" controls-position="right"></el-input-number>元
          <span style="margin-right: 20px"></span>
          投放数量 <el-input-number v-model="item.totalNum" :disabled="item.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个

          <span v-if="item.id ? true : false">
               <span style="margin-right: 20px"></span>
            剩余{{ item.totalNum - item.outNum }}个
            </span>
          <span style="margin-right: 20px"></span>
          总金额:{{ parseFloat((item.awardPrice*item.totalNum).toPrecision(12))  }}元
          <span style="margin-right: 20px"></span>
          中奖概率 <el-input-number v-model="item.prizePert" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>
          %
          <span v-if="item.id ? true : false">
              <span style="margin-right: 20px"></span>
              <el-button type='primary' @click="addRepertory(item)">增库</el-button>
            </span>
          <span style="margin-right: 20px"></span>
          <el-button type='danger' @click="deleteAward(item,index)">删除</el-button>
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


    <el-dialog :title="title" :visible.sync="listVisible" width="800px">
      <el-table :data="awdList" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="剩余库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectPrize(scope.row,title)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
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
            sn:'11111111010123456',
            snName:'Test盒',
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
          {
            sn:'6901028107280',
            snName:'钻石（玫瑰）二代盒',
            points:0
          },
          {
            sn:'6901028107259',
            snName:'钻石（一九零二中支）盒',
            points:0
          },
          {
            sn:'6901028107341',
            snName:'钻石（君子中支）盒',
            points:0
          },

        ],
        hb:[],
        form:{
          num:0,
          contDay5:0,
          contDay6:0,
          contDay7:0,
        },
        title: '选择物品',
        awdList: [],
        params: {
          metraFlag: '',
          pageNo: 1,
          pageSize: 10,
          status: 1
        },
        listTotal: 0,
        listVisible: false,

        defaultAwae: { // 给个默认 好复制
          "awardPrice": 0,
          "prizePert": 0,
          "totalNum": 0,
          "awardPic": "",
        },
      }
    },
    created() {
      this.getScanConf()
      this.getContConf()
      this.getRedpackConf()
    },
    mounted() {
    },
    methods:{
      getList(type) {
        if (type == '1') {
          this.params.metraFlag = 'object'
          this.title = '选择实物'
        } else if (type == '2') {
          this.params.metraFlag = 'virtual'
          this.title = '选择虚拟'
        } else if (type == '3') {
          this.params.metraFlag = 'redpack'
          this.title = '选择红包'
        } else if (type == '6') {
          this.params.metraFlag = 'integral'
          this.title = '选择荷石币'
        } else if (type == '7') {
          this.params.metraFlag = 'cdDisc'
          this.title = '选择折扣卡'
        } else if (type == '8') {
          this.params.metraFlag = 'cdDouble'
          this.title = '选择翻倍卡'
        }
        this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
          if (res.ret === '200000') {
            this.awdList = []
            this.awdList = res.data.list
            this.listTotal = res.data.page.count
            this.listVisible = true
            return
          }
          this.$message.error(res.message)
        })
      },
      addRepertory(item) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          if (value == 0) return this.$message.error('数字不能为0')
          this.$request.post('/hbact/dayscan/redpack/stock', {
            id: item.id ,
            addNum : value
          }, false, res => {
            if (res.code == '200') {
              this.$message.success('增库成功')
              this.getRedpackConf()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      // 选择奖品
      selectPrize(obj,title) {
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        newAwae.awardPic = obj.pic
        this.hb.push(newAwae)
        this.listVisible = false
      },
      deleteAward(item,index){
        this.$request.post('/hbact/dayscan/redpack/delete', {
          id: item.id ,
        }, false, res => {
          if (res.code == '200') {
            this.$message.success('删除成功')
            this.getRedpackConf()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
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
      getRedpackConf(){
        this.$request.post('/hbact/dayscan/redpack/query', {}, true, res => {
          if (res.code == '200') {
            this.hb = res.data
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
      setRedpack(){
        return new Promise ((resolve,reject)=>{
          let params = this.hb.map( e =>{
            if(e.id){
              return {
                id:e.id,
                awardPrice:e.awardPrice,
                prizePert:e.prizePert,
                totalNum:e.totalNum,
                awardPic:e.awardPic
              }
            }else{
              return {
                awardPrice:e.awardPrice,
                prizePert:e.prizePert,
                totalNum:e.totalNum,
                awardPic:e.awardPic
              }
            }
          })
          this.$request.post('/hbact/dayscan/redpack/set', params, true, res => {
            resolve(res)
          })
        })
      },
      handleSave(){
        Promise.all([
          this.dayscanUpdate(),
          this.contDayUpdate(),
          this.setRedpack()
        ])
        .then(([dayscan, contDay,setRedpack]) => {
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
          if (setRedpack.code == '200') {
            console.log(setRedpack.data)
          }else {
            this.$message.error(setRedpack.msg)
            return
          }
          this.$message.success('保存成功！')
          this.getScanConf()
          this.getContConf()
          this.getRedpackConf()
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
