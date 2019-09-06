<template>
  <div class="sign-container">
    <div v-for="(item,index) in list" :key="index" >
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px;font-weight: bolder">卡片{{ index+1 }}设置（卡片兑换时间每月20日-25日）</span>
        </div>
        <el-form>
          <el-form-item label='名称：'>
            {{ item.cardConf.name }}
            <span style="margin-right: 20px"></span>
            投放数量<el-input-number v-model="item.cardConf.totalNum" :precision="0" :min="0" controls-position="right"></el-input-number>个
            <span style="margin-right: 20px"></span>
            剩余数量{{ item.cardConf.outNum }}个
            <span style="margin-right: 20px"></span>
            中奖概率<el-input-number v-model="item.cardConf.prizePert" :precision="0" :min="0" controls-position="right"></el-input-number>
            %
          </el-form-item>
          <template v-for="(ai,key) in item.awardConf" >
            <div  style="height: 30px;font-size: 18px;line-height: 30px;margin: 30px 0;color: #409EFF">奖项{{ key + 1 }}:</div>
            <el-form-item label="奖品类型:">
              <el-select :disabled="!!ai.id" v-model="ai.awardType" placeholder="请选择">
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
                <el-button size="" style="margin-left: 20px"  @click="getList(ai.awardType,index,key)">选择</el-button>
              </div>
            </el-form-item>
            <el-form-item v-if="ai.awardType">
                <span v-if="ai.awardType !== 1 " style="margin-right: 20px">名称: {{ ai.awardName }}</span>
                {{ ai.awardType == 3 || ai.awardType == 6 ? "面额:" : "名称:" }}
                <el-input-number v-if="ai.awardType == 3 || ai.awardType == 6" v-model="ai.awardPrice" :disabled="!!ai.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>
                {{ ai.awardType == 1 ? ai.awardName : ai.awardType == 3 ? "元" : "荷石币" }}
                <span style="margin-right: 20px"></span>

              投放数量<el-input-number v-model="ai.totalNum" :disabled="ai.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个
              <span v-if="ai.id ? true : false">
                <span style="margin-right: 20px"></span>
                剩余{{ ai.totalNum - ai.outNum }}个
              </span>
              <span style="margin-right: 20px"></span>
              <span v-if="ai.awardType == 3">总金额:{{ parseFloat((ai.awardPrice*ai.totalNum).toPrecision(12))  }}元</span>
              <span v-if="ai.awardType == 6">总荷石币:{{ ai.awardPrice*ai.totalNum }}</span>
              <span style="margin-right: 20px"></span>
              <span v-if="ai.id ? true : false">
                <span style="margin-right: 20px"></span>
                <el-button type="primary" @click="addRepertory(ai.id)">增库</el-button>
              </span>
              <span v-if="ai.id ? true : false">
                <span style="margin-right: 20px"></span>
                <el-button type='danger' @click="deleteAward(ai.id)">删除</el-button>
              </span>
              <span v-if="ai.id ? true : false">
                <span style="margin-right: 20px"></span>
                <el-button type='danger' @click="forbiddenAward(ai.id)">禁用</el-button>
              </span>
            </el-form-item>
          </template>
        </el-form>
        <div>
          <div style="height: 30px;font-size: 18px;line-height: 30px;margin: 60px 0 30px;color: red">已禁用：</div>
          <div v-for="(bi,i) in item.banConf" :key="i" style="height: 30px;font-size: 16px;line-height: 30px;margin: 30px 0">
            <span style="margin-right: 20px">名称:{{ bi.awardName }}</span>
            <span style="margin-right: 20px">奖品类型:{{ bi.awardType == 1 ? "实物" : bi.awardType == 3 ? "红包" : "积分" }}</span>
            <span style="margin-right: 20px">投放数量:{{ bi.totalNum }}</span>
            <span style="margin-right: 20px">剩余数量:{{ bi.totalNum - bi.outNum }}</span>
            <span style="margin-right: 20px" v-if="bi.awardType == 3">总金额:{{ parseFloat((bi.awardPrice*bi.totalNum).toPrecision(12))  }}元</span>
            <span style="margin-right: 20px" v-if="bi.awardType == 6">总荷石币:{{ bi.awardPrice*bi.totalNum }}</span>
          </div>
        </div>
      </el-card>
      <div style="height: 30px"></div>
    </div>

    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>


    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px">
      <el-table :data="metraList" border :stripe="true" style="width: 100%">
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
            <el-button size="mini" @click="selectPrize(scope.row,title,cardNo,awardNo)">选择</el-button>
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
    name: "CardColletingMgr",
    components: {},

    data(){
      return {
        list:[],
        form:{
          num:0,
          contDay5:0,
          contDay6:0,
          contDay7:0,
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
        title: '选择物品',
        metraList: [],
        params: {
          metraFlag: '',
          pageNo: 1,
          pageSize: 10,
          status: 1
        },
        listTotal: 0,
        listVisible: false,

        cardNo: null,
        awardNo: null
      }
    },
    created() {
      this.getDetail()
    },
    mounted() {
    },
    methods:{
      // 扫码奖励查询
      getDetail(){
        this.$request.post('/hbact/commucard/saas/queryConfig', {}, true, res => {
          if (res.code == '200') {
            this.list = res.data
            this.list.map((item,index)=>{
              if(item.awardConf.length < 3){
                let length = item.awardConf.length
                for(let i = 0 ; i < 3 ; i++){
                  if(i > length - 1){
                    item.awardConf.push(
                      {
                        "awardType": null,
                        "awardName": "",
                        "awardPrice": null,
                        "awardPic": "",
                        "totalNum": null,
                      }
                    )
                  }
                }
              }
            })
            return
          }
          this.$message.error(res.msg)
        })
      },

      //扫码奖励更新
      dayscanUpdate(){
        let params = this.list.map((e,i)=>{
          let awardConf = []
            e.awardConf.forEach((ele,i)=>{
              if(ele.awardType){
                if(ele.awardName){
                  if(ele.awardPrice){
                    if(ele.totalNum>0){
                      awardConf.push(ele)
                    }else {
                      if(ele.id){
                        awardConf.push(ele)
                      }else {
                        this.$message.error("配置的奖品数量不能为0！")
                        throw '请完善配置的奖品信息1!'
                      }
                    }
                  }else {
                    if(ele.awardPrice == 0){
                      this.$message.error("奖品面额不能为0！")
                      throw '请完善配置的奖品信息2!'
                    }
                    this.$message.error("请完善配置的奖品信息！")
                    throw '请完善配置的奖品信息2!'
                  }
                }else {
                  this.$message.error("请完善配置的奖品信息！")
                  throw '请完善配置的奖品信息3!'
                }
              }
            })
          return {
            cardConf:e.cardConf,
            awardConf
          }
        })
        console.log(params)
        return new Promise ((resolve,reject)=>{
          this.$request.post('/hbact/commucard/saas/setConfig', params, true, res => {
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
          this.getDetail()
        })
      },


      getList(type,index,key) {
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
        if(index != -1){
          this.cardNo = index
        }
        if(key != -1){
          this.awardNo = key
        }
        this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
          if (res.ret === '200000') {
            this.metraList = []
            this.metraList = res.data.list
            this.listTotal = res.data.page.count
            this.listVisible = true
            return
          }
          this.$message.error(res.message)
        })
      },
      // 选择奖品
      selectPrize(obj,title,cardNo,awardNo) {
        // let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        // newAwae.awardPic = obj.pic
        // newAwae.poolName = obj.name
        // newAwae.prizeName = obj.name
        // newAwae.poolId = obj.id
        let card = this.list[cardNo]
        console.log(this.list)
        card.awardConf[awardNo].awardName = obj.name
        card.awardConf[awardNo].awardPrice = obj.marketMoney
        card.awardConf[awardNo].awardPic = obj.pic
        this.listVisible = false
      },
      deleteAward(id){
        this.$confirm('此操作将删除该奖品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/hbact/commucard/saas/delete', {id}, false, res => {
            if (res.code === '200') {
              this.$message.success('删除成功！')
              this.getDetail()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {

        })

      },
      forbiddenAward(id){
        this.$confirm('此操作将禁用该奖品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/hbact/commucard/saas/ban', {id}, false, res => {
            if (res.code === '200') {
              this.$message.success('禁用成功！')
              this.getDetail()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {

        });
      },
      handSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
      addRepertory(id) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          if (value == 0) return this.$message.error('数字不能为0')
          this.$request.post('/hbact/commucard/saas/stock/add', {
            id,
            addNum: value
          }, false, res => {
            if (res.code === '200') {
              this.$message.success('增库成功')
              this.getDetail()
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