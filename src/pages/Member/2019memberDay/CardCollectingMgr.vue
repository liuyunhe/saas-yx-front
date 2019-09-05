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
          <template v-for="(ai,key) in card1.award" >
            <div :key="key">
              <div  style="height: 30px;font-size: 18px;line-height: 30px;margin: 30px 0">奖项{{ key + 1 }}:</div>
              <el-form-item label="奖品类型:">
                <el-select v-model="card1.award[key].awardType" placeholder="请选择">
                  <el-option
                      v-for="i in awardType"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="card1.award[key].awardType">
                <div>选择{{ card1.award[key].awardType == '1' ? '实物' : card1.award[key].awardType == '3' ? '红包' : '荷石币' }}:
                  <el-button size="" style="margin-left: 20px"  @click="getList(card1.award[key].awardType)">选择</el-button>
                </div>
              </el-form-item>
              <el-form-item>
                面额 <el-input-number v-model="ai.integral" :disabled="ai.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>荷石币
                <span style="margin-right: 20px"></span>
                投放数量<el-input-number v-model="ai.totalNum" :disabled="ai.id ? true : false" :precision="0" :min="0" controls-position="right"></el-input-number>个
                <span v-if="ai.id ? true : false">
                  <span style="margin-right: 20px"></span>
                  剩余{{ ai.totalNum - ai.outNum }}个
                </span>
                <span style="margin-right: 20px"></span>
                <span v-if="awardType == 3">总金额:{{ parseFloat((ai.redMoney*ai.totalNum).toPrecision(12))  }}元</span>
                <span v-if="ai.awardType == 6">总荷石币:{{ ai.integral*ai.totalNum }}</span>
                <span style="margin-right: 20px"></span>
                中奖概率<el-input-number v-model="ai.probability" :precision="0" :min="0" controls-position="right"></el-input-number>%
                <span v-if="ai.id ? true : false">
                  <span style="margin-right: 20px"></span>
                  <el-button type="primary" @click="addRepertory(ai)">增库</el-button>
                </span>
                <span v-if="ai.id ? true : false">
                  <span style="margin-right: 20px"></span>
                  <el-button type='danger' @click="deleteAward(key)">删除</el-button>
                </span>
                <span v-if="ai.id ? true : false">
                  <span style="margin-right: 20px"></span>
                  <el-button type='danger' @click="forbiddenAward(key)">禁用</el-button>
                </span>

              </el-form-item>
            </div>
          </template>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
    </div>

    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>


    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px">
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
            value:'1',
            label:'实物'
          },
          {
            value:'3',
            label:'红包'
          },
          {
            value:'6',
            label:'荷石币'
          },
        ],
        card1:{
          award:[
            {
              awardType:"",
            },
            {
              awardType:"",
            },
            {
              awardType:"",
            },
          ]
        },

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
      },


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
      // 选择奖品
      selectPrize(obj,title) {
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        newAwae.awardPic = obj.pic
        newAwae.poolName = obj.name
        newAwae.prizeName = obj.name
        newAwae.poolId = obj.id
        if(title == '选择红包'){
          newAwae.awardType = 3
          this.hb.push(newAwae)
        }
        if(title == '选择荷石币'){
          newAwae.awardType = 6
          this.hsb.push(newAwae)
        }
        if(title == '选择折扣卡'){
          newAwae.awardType = 7
          this.zkk.push(newAwae)
        }
        this.listVisible = false
      },
      deleteAward(list,index){
        this[list].splice(index,1)
      },
      handSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
      addRepertory(item) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入数字'
        }).then(({ value }) => {
          if (value == 0) return this.$message.error('数字不能为0')
          this.$request.post('/api/wiseqr/act/addNum', {
            id: item.id ,
            increment: value
          }, true, res => {
            if (res.ret === '200000') {
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
      deleteAward(){

      },
      forbiddenAward(){

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