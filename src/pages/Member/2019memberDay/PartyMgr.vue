<template>
  <div class="QA-container">
    <div >
      <div style="margin-bottom: 30px;color: #0B1019">
        <el-button type="primary" @click="handleOpen">开奖</el-button>（可开奖时间每周六20:30）
      </div>
      <el-form ref="actSetConfRef" :model="config" label-width="150px" :rules="confRules">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>基本设置：</span>
          </div>
            <el-form-item label='活动时间：' prop="date">
              <el-date-picker v-model="config.stime"  :disabled="!newAct" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
              至
              <el-date-picker v-model="config.etime" :disabled="!newAct" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" ></el-date-picker>
            </el-form-item>
            <el-form-item label='参与条件：' prop="scanCont">
              本周连续
              <el-input-number v-model="config.scanCont" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              天扫码可参与1荷石币抢大礼活动
            </el-form-item>
        </el-card>
        <div style="height: 30px"></div>
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>商品设置：</span>
          </div>
          <template v-for="(ai,key) in awardConf" >
            <div  style="height: 30px;font-size: 18px;line-height: 30px;margin: 30px 0;color: #409EFF">奖项{{ key + 1 }}:</div>
            <el-form-item label="奖品类型:">
              <el-select :disabled="!!ai.id" @change="handleSelectChange(ai)" v-model="ai.awardType"  placeholder="请选择">
                <el-option
                    v-for="i in awardType"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="ai.awardType&&!ai.id">
              <div>选择{{ ai.awardType == '1' ? '实物' : ai.awardType == '3' ? '红包' : '荷石币' }}:
                <el-button size="" style="margin-left: 20px"  @click="getList(ai.awardType,key)">选择</el-button>
              </div>
            </el-form-item>
            <el-form-item v-if="ai.awardType&&ai.awardName">
              <span v-if="ai.awardType !== 1 " style="margin-right: 20px">名称: {{ ai.awardName }}</span>
              {{ ai.awardType == 3 || ai.awardType == 6 ? "面额:" : "名称:" }}
              <el-input-number v-if="ai.awardType == 3 || ai.awardType == 6" v-model="ai.awardPrice" :disabled="!!ai.id ? true : false" :precision="2" :min="0" controls-position="right"></el-input-number>
              {{ ai.awardType == 1 ? ai.awardName : ai.awardType == 3 ? "元" : "荷石币" }}
              <span style="margin-right: 20px"></span>

              投放数量<el-input-number v-model="ai.totalNum" :disabled="ai.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个
              <span v-if="ai.id ? true : false">
                <span style="margin-right: 20px"></span>
                剩余{{ ai.totalNum - ai.outNum }}个
              </span>
              <span style="margin-right: 20px"></span>


            </el-form-item>
          </template>
          <div style="margin-bottom: 20px">选择实物:<el-button size="" style="margin-left: 20px"  @click="getList(1)">选择</el-button></div>
            <el-form-item label='物料名称：' prop="awardName">
              <el-input style="width: 400px" disabled v-model="config.awardName"></el-input>
            </el-form-item>
            <el-form-item label='商品图片：' prop="awardPic">
              <img width="355" height="289" v-if="config.awardPic" :src="config.awardPic" alt="">

              <el-upload :action="uploadURL" :headers="headerObj" :on-success="upClockImgUrlSuccess" :show-file-list="false">
                <el-button size="small" type="primary">上传图片</el-button>
                <span style="margin-left: 20px">上传商品图片尺寸（630x348px）</span>
              </el-upload>
            </el-form-item>
            <el-form-item label='商品描述：' prop="awardDesc">
              <el-input type="textarea" style="width: 400px"  v-model="config.awardDesc"></el-input>
            </el-form-item>
        </el-card>
      </el-form>
      <div style="height: 30px"></div>
    </div>


    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="confirmSubmit">保存</el-button>
    </div>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px" @close="handleColseList">
      <el-table :data="list" border :stripe="true" style="width: 100%">
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
            <el-button size="mini" @click="selectPrize(scope.row,title,awardNo)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "PartyMgr",
    data(){
      var validateDate = (rule, value, callback) => {
        if (!this.config.stime || !this.config.etime) {
          callback(new Error('请选择活动时间'))
        } else if (this.config.stime >= this.config.etime){
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      }

      var validateScanCont = (rule, value, callback) => {
        if (!this.config.scanCont) {
          callback(new Error('请输入连续扫码天数'))
        } else {
          callback()
        }
      }
      var validateAwardName = (rule, value, callback) => {
        if (!this.config.awardName) {
          callback(new Error('请选择物料'))
        } else {
          callback()
        }
      }
      var validateAwardPic = (rule, value, callback) => {
        if (!this.config.awardPic) {
          callback(new Error('请上传商品图片'))
        } else {
          callback()
        }
      }
      var validateAwardDesc = (rule, value, callback) => {
        if (!this.config.awardDesc) {
          callback(new Error('请输入活动说明'))
        } else {
          callback()
        }
      }
      return {
        uploadURL: '/api/wiseqr/attach/commonAliUpload',
        headerObj: {
          loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
          token: sessionStorage.getItem('access_token'),
          CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
        },

        newAct: false,
        config:{
          stime:'',
          etime:'',
          scanCont:'',
          awardName:'',
          marketMoney:'',
          awardPic:'',
          awardDesc:''
        },

        awardConf:[{"awardType":6,"awardName":"456","awardPrice":1,"awardPic":"https://qoss.qrmkt.cn/saas_platform/test/DC7DE1D112BD4873816ECCC62CDC1A03.png","totalNum":50,"outNum":0,"status":1}],


        title: '选择物品',
        list: [],
        params: {
          metraFlag: '',
          pageNo: 1,
          pageSize: 10,
          status: 1
        },
        listTotal: 0,
        listVisible: false,


        confRules: {
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          scanCont: [{ required: true, validator: validateScanCont, trigger: 'change' }],
          awardName: [{ required: true, validator: validateAwardName, trigger: 'change' }],
          awardPic: [{ required: true, validator: validateAwardPic }],
          awardDesc: [{ required: true, validator: validateAwardDesc,trigger:'blur' }],
        },

        awardType:[
          {
            value: 1,
            label:'实物'
          },
          {
            value: 3,
            label:'红包'
          },
          {
            value: 6,
            label:'荷石币'
          },
        ],
        awardDemo:{
          "awardType": null,
          "awardName": "",
          "awardPrice": null,
          "awardPic": "",
          "totalNum": null,
        },
        awardNo:'',
      }
    },
    created() {
      this.getDetail()
    },
    mounted() {
    },
    methods:{
      // 当前正在进行的活动查询
      getDetail() {
        this.$request.post('/hbact/one/points/sass/act/config', {}, true, res => {
          if (res.code == '200') {
            this.config = res.data
            this.newAct = false
            return
          }else if(res.code == '500'){
            this.newAct = true
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      // getList(type) {
      //   if (type == '1') {
      //     this.params.metraFlag = 'object'
      //     this.title = '选择实物'
      //   } else if (type == '2') {
      //     this.params.metraFlag = 'virtual'
      //     this.title = '选择虚拟'
      //   } else if (type == '3') {
      //     this.params.metraFlag = 'redpack'
      //     this.title = '选择红包'
      //   } else if (type == '6') {
      //     this.params.metraFlag = 'integral'
      //     this.title = '选择荷石币'
      //   }
      //   this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
      //     if (res.ret === '200000') {
      //       this.list = []
      //       this.list = res.data.list
      //       this.listTotal = res.data.page.count
      //       this.listVisible = true
      //       return
      //     }
      //     this.$message.error(res.message)
      //   })
      // },
      handleOpen(){
        this.$request.post('/hbact/one/points/sass/open/award', {}, true, res => {
          if (res.code == '200') {
            this.$message.success("开奖成功！")
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      confirmSubmit() {
        this.$refs.actSetConfRef.validate(valid => {
          if(valid){
            let params = {
              stime : this.config.stime,
              etime : this.config.etime,
              scanCont : this.config.scanCont,
              awardName : this.config.awardName,
              marketMoney : this.config.marketMoney,
              awardPic : this.config.awardPic,
              awardDesc : this.config.awardDesc,
              id : this.config.id ? this.config.id : ""
            };
            this.$request.post('/hbact/one/points/sass/act/add', params, false, res => {
              if (res.code == '200') {
                this.$message({type: 'success', message: '操作成功!'});
                this.getDetail()
              } else {
                this.$message.error(res.msg);
              }
            })
          }
        })
      },
      // 选择奖品
      selectPrize(obj,title,awardNo) {
        // let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        // newAwae.awardPic = obj.pic
        // newAwae.poolName = obj.name
        // newAwae.prizeName = obj.name
        // newAwae.poolId = obj.id
        console.log(awardNo)
        this.awardConf[awardNo].awardName = obj.name
        this.awardConf[awardNo].awardPrice = obj.marketMoney
        this.awardConf[awardNo].awardPic = obj.pic
        this.handleColseList()
      },
      handleColseList(){
        this.listVisible = false
        this.params.pageNo = 1
      },
      handleSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handleCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
      upClockImgUrlSuccess(resule) {
        if (resule.ret === '200000')
          return (this.config.awardPic = resule.data.accessUrl)
        this.$message.error(resule.message)
      },


      handleSelectChange(item){
        console.log(item)
        item.awardName = ""
        item.awardPic = ""
        item.totalNum = null
      },
      getList(type,key) {
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
        }

        if(key != -1){
          this.awardNo = key
        }
        this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
          if (res.ret === '200000') {
            this.list = []
            this.list = res.data.list
            this.listTotal = res.data.page.count
            this.listVisible = true
            return
          }
          this.$message.error(res.message)
        })
      },
    }

  }
</script>

<style lang="scss" scoped>
  .QA-container{
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
  }
</style>