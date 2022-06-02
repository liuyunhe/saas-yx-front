<template>
  <div class="QA-container">
    <div>
      <el-form>
        <el-form-item label="是否立即启用：">
          <el-switch
              v-model="openFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-top: -4px;"
              :disabled="useOpen"
              @change="handleOpen"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>基本设置：</span>
        </div>
        <el-form ref="actSetConfRef" :model="config" label-width="130px" :rules="confRules">
          <el-form-item label='返佣次数设置：' prop="oneUserMaxNum" >
            单用户每天前
            <el-input-number v-model="config.hbsRebateConf.oneUserMaxNum" :precision="0" :min="0"
                             controls-position="right"></el-input-number>
            次首扫,绑定店铺可获得返佣奖励；
          </el-form-item>
          <el-form-item label='' prop="dayMaxNum">
            绑定的店铺每天限可获得
            <el-input-number v-model="config.hbsRebateConf.dayMaxNum" :precision="0" :min="0"
                             controls-position="right"></el-input-number>
            次返佣奖励；
          </el-form-item>
          <el-form-item label="参与活动规格：" prop="oneUserMaxNum"  :show-message="false" style="margin-bottom: 20px">
            <el-button type="primary" @click="addProduct">增加规格</el-button>
            <span style="margin-left: 20px;color: #8a8a8a">返佣奖励默认为0</span>
          </el-form-item>
          <el-form-item  v-for="(item,index) in config.hbsRebateSnConfList" :key="index"
                        style="margin-bottom: 20px">
            <el-select v-model="config.hbsRebateSnConfList[index].snOrgCode" placeholder="请选择"
                       @change="()=>getBrandList(index)" class="select-two">
              <el-option v-for="item in brandList" :label="item.name" :value="item.code" :key="item.code">
              </el-option>
            </el-select>
            <el-select v-model="config.hbsRebateSnConfList[index].sn" placeholder="请选择" class="select-two"
                       @change="(value)=>getProductList(value,index)">
              <el-option v-for="item in (productList[config.hbsRebateSnConfList[index].snOrgCode] || [])" :key="item.sn"
                         :label="item.allName" :value="item.sn">
              </el-option>
            </el-select>
            <div style="margin: 10px 0">
              <span>返佣给零售户奖励:</span>
              <el-input-number v-if="config.hbsRebateSnConfList[index].awdType == 3" :step="1" :precision="2" :min="0" controls-position="right"
                               v-model="config.hbsRebateSnConfList[index].awdValue"
                               style="margin-right: 20px"></el-input-number>
              <el-input-number v-if="config.hbsRebateSnConfList[index].awdType == 6" :step="1" :precision="0" :min="0" controls-position="right"
                               v-model="config.hbsRebateSnConfList[index].awdValue"
                               style="margin-right: 20px"></el-input-number>
              <el-radio-group v-model="config.hbsRebateSnConfList[index].awdType">
                <el-radio :label="3">
                  元鼓励金
                </el-radio>
                <el-radio :label="6">
                  荷石璧
                </el-radio>
              </el-radio-group>
            </div>

            <el-button type="danger" @click="deleteProduct(index)">删除规格</el-button>
          </el-form-item>
          <div style="height: 40px;text-align: center;margin-top: 30px">
            <el-button type="primary" @click="confirmSubmit">保存</el-button>
          </div>
        </el-form>
      </el-card>
      <div style="height: 30px"></div>
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
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange"
                       :current-page="params.pageNo" :page-size="params.pageSize"
                       layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ScanMgr",
  data() {
    var validateOneUserMaxNum = (rule, value, callback) => {
      if (!this.config.hbsRebateConf.oneUserMaxNum) {
        callback(new Error('请输入首扫次数'))
      } else {
        callback()
      }
    }
    var validateDayMaxNum = (rule, value, callback) => {
      if (!this.config.hbsRebateConf.dayMaxNum) {
        callback(new Error('请输入返佣奖励'))
      } else {
        callback()
      }
    }
    var valideSelectProductList = (rules, value, callback) => {
      console.log(this.config.hbsRebateSnConfList.length ,value)
      if (this.config.hbsRebateSnConfList.length > 0) {
        let flag = false
        this.config.hbsRebateSnConfList.forEach(item => {
          if (item.sn == null || item.snOrgCode == null || item.awdValue == null) {
            flag = true
          }
        })
        if (flag) {
          callback(new Error('请完整填写活动规格及返佣奖励'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      uploadURL: '/api/wiseqr/attach/commonNewUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      editorOption: {
        modules: {
          toolbar: [
            [{header: 1}, {header: 2}],
            [{list: 'ordered'}, {list: 'bullet'}],
            ['bold', 'italic', 'underline', 'strike', , 'blockquote'],
            [{color: []}, {background: []}, {align: []}]
          ]
        },
        placeholder: '请输入活动说明'
      },
      openFlag: true,
      useOpen: true,
      id: '',
      actCode: '',
      strategyArr: {},
      act: {},

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
      actStart: false,
      config: {
        "hbsRebateConf": {
          "oneUserMaxNum": null, //单用户，每天扫码返佣的次数
          "dayMaxNum": null //店铺每天可以获得返佣的总次数
        },
        "hbsRebateSnConfList": [
          {
            "sn": null, //规格
            "snOrgCode": null, //规格
            "snName": null, //规格名称
            "awdType": 3, //奖品类型 3:红包 6:积分
            "awdValue": null //奖品值 。 积分只能为整数, 红包类型可以有浮点数.
          },
        ]
      },
      confRules: {
        selectProductList: [{required: true, validator: valideSelectProductList, trigger: 'change'}],
        oneUserMaxNum: [{required: true, validator: validateOneUserMaxNum, trigger: 'change'}],
        dayMaxNum: [{required: true, validator: validateDayMaxNum, trigger: 'change'}],
      },
      brandList: [],
      productList: [],
      hb: [],
      sw: [],
      hsb: [],
      zkk: [],
      fbk: [],
      hd: [],
      defaultAwae: { // 给个默认 好复制
        awardPic: '',
        awardPrice: '',
        awardType: 1, // 奖项类型
        curActive: true,
        giveScore: 0, // 是否赠送积分 0-否 1-是
        guideGzh: 0, // 是否引导关注公众号 0-否 1-是
        hasPdMaxOut: false,
        hasWarn: false,
        integral: null, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
        integralPool: null, // 赠送积分池主键id
        integralPoolName: null,
        integralPoolPic: null,
        isGiveScore: false,
        isGuideGzh: false,
        isPdMaxOut: false,
        isWarn: false,
        n: '',
        outNum: '',
        pdMaxOut: '', // 奖项每天最多出奖个数
        poolId: 1, // 奖项物料池主键id
        poolName: '',
        prizeName: '', // 奖项名称
        probability: '', // 中奖概率
        redMoney: '', // 投放红包面额
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '', // totalNum
        warnValue: '' //告警阀值 非空且大于0时为设置告警
      },
    }
  },
  created() {
    this.getActSn()
    this.getConfShow()
    // this.getDetail()
  },
  mounted() {
  },
  computed: {
    residue: {
      get: function () {
        return this.awae.totalNum - this.awae.outNum
      },
      set: function (newValue) {
        // console.log(newValue)
      }
    },
    totalRed: {
      get: function () {
        return this.awae.redMoney * this.awae.totalNum
      },
      set: function (newValue) {
        // console.log(newValue)
      }
    }
  },
  methods: {
    handleOpen(value) {
      console.log(value)
      let params = {
        actCode: this.actCode,
        openFlag: this.openFlag ? "1" : "2"
      }
      this.$request.post(' /saasHbseller/actCommon/actOpenSwitch', params, false, res => {
        if (res.code == '200') {
          this.$message.success('操作成功')
          return
        }
        this.$message.error(res.msg)
        this.getConfShow()
      })
    },
    beforeAvatarUpload(file) {
      const JPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!JPGOrPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return JPGOrPNG && isLt2M
    },
    uploadImgUrlSuccess(resule) {
      if (resule.ret === '200000') {
        console.log(resule)
        this.config.actPicCode = resule.data.rdmCode
        this.config.actPic = resule.data.filePath
        return
      }
      this.$message.error(resule.message)
    },
    getConfShow() {
      this.$request.get('/saasHbseller/sellerRebate/queryInfo', {}, res => {
        if (res.code == '200') {
          if (res.data) {
            if (res.data.actBaseInfo == null) {
              this.useOpen = true
            } else {
              this.useOpen = false
            }
            this.actCode = res.data.actBaseInfo.actCode
            this.actStart = res.data.actBaseInfo.status == 1 ? true : false
            this.openFlag = this.actStart
            this.config.hbsRebateConf.oneUserMaxNum = res.data.rebateConf.oneUserMaxNum
            this.config.hbsRebateConf.dayMaxNum = res.data.rebateConf.dayMaxNum
            if (res.data.rebateSnConf.length) {
              this.config.hbsRebateSnConfList = res.data.rebateSnConf
            }
          }
          return
        }
        this.$message.error(res.msg)
      })
    },
    addHD() {
      let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
      newAwae.awardType = 9
      this.hd.push(newAwae)
    },

    // 扫码奖励查询

    getBrandList(index) {
      this.config.hbsRebateSnConfList[index].sn = null
    },
    getProductList(value, index) {
      let flag = 0
      this.config.hbsRebateSnConfList.forEach((item) => {
        if (item.sn === value) {
          flag++
        }
      })
      console.log(flag)
      if (flag > 1) {
        this.config.hbsRebateSnConfList[index].sn = null
        this.$message.error("已选择当前规格!")
        return
      }
      this.config.hbsRebateSnConfList[index].sn = value
      const product = this.productList[this.config.hbsRebateSnConfList[index].snOrgCode].find((item => {
        return item.sn === value
      }))
      this.config.hbsRebateSnConfList[index].snOrgCode = product.orgId
      this.config.hbsRebateSnConfList[index].snName = product.allName
    },
    addProduct() {
      this.config.hbsRebateSnConfList.push({
        "sn": null, //规格
        "snOrgCode": null, //规格
        "snName": null, //规格名称
        "awdType": 3, //奖品类型 3:红包 6:积分
        "awdValue": null //奖品值 。 积分只能为整数, 红包类型可以有浮点数.
      })
    },
    deleteProduct(index) {
      this.config.hbsRebateSnConfList.splice(index, 1)
    },
    getActSn() {
      this.$request.post('/saasHbseller/actCommon/actSn', {}, false, res => {
        if (res.code == '200') {
          this.brandList = Object.keys(res.data).map((item) => {
            if (item === 'hebeizhongyan') {
              return {
                name: '钻石',
                code: item
              }
            } else if (item === 'hebeihehua') {
              return {
                name: '荷花',
                code: item
              }
            }
          })
          this.productList = res.data
          console.log(this.brandList)
          console.log(this.productList)
          return
        }
        this.$message.error(res.msg)
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
      } else if (type == '8') {
        this.params.metraFlag = 'cdDouble'
        this.title = '选择翻倍卡'
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
    addRepertory(item) {
      this.$prompt('请输入数字', '增库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{1,}$/,
        inputErrorMessage: '请输入数字'
      }).then(({value}) => {
        if (value == 0) return this.$message.error('数字不能为0')
        this.$request.post('/saasHbseller/actCommon/actAwdAdd', {
          actCode: this.actCode,
          id: item.id,
          addValue: value
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
        })
      })
    },
    saveJC() {
      let params = [...this.hb, ...this.hsb].map((item) => {
        let i = {
          "actCode": this.actCode,
          "awdName": item.prizeName,
          "awdPic": item.awardPic,
          "awdType": item.awardType,
          "awdPr": item.probability,
          "awdValue": item.awardPrice,
          "numTotal": item.totalNum
        }
        if (item.id) {
          i.id = item.id
        }
        if (item.awardType == 3) {
          i.awdValue = item.redMoney
        }
        if (item.awardType == 6) {
          i.awdValue = item.integral
        }
        return i
      })
      console.log(params)
      this.$request.post('/saasHbseller/actCommon/actAwdSave', params, true, res => {
        if (res.code == '200') {
          this.getDetail()
          this.$message({type: 'success', message: '操作成功!'})
        } else {
          this.$message.error(res.message)
        }
      })
    },
    saveConf() {
      let params = {
        "hbsRebateConf": {
          "oneUserMaxNum": this.config.hbsRebateConf.oneUserMaxNum, //单用户，每天扫码返佣的次数
          "dayMaxNum": this.config.hbsRebateConf.dayMaxNum //店铺每天可以获得返佣的总次数
        },
        "hbsRebateSnConfList": this.config.hbsRebateSnConfList.map(item=>{
          return {
            "sn": item.sn, //规格
            "snOrgCode": item.snOrgCode,
            "snName": item.snName, //规格名称
            "awdType": item.awdType, //奖品类型 3:红包 6:积分
            "awdValue": item.awdValue //奖品值 。 积分只能为整数, 红包类型可以有浮点数.
          }
        })
      }
      console.log(params)
      this.$request.post('/saasHbseller/sellerRebate/updateConf', params, true, res => {
        if (res.code == '200') {
          this.$message({type: 'success', message: '操作成功!'})
          this.getConfShow()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmSubmit() {
      this.$refs.actSetConfRef.validate(valid => {
        if (valid) {
          // this.saveConf()
          if (this.config.hbsRebateSnConfList.length > 0) {
            let flag = false
            this.config.hbsRebateSnConfList.forEach(item => {
              if (item.sn == null || item.snOrgCode == null || item.awdValue == null || item.awdValue == 0) {
                flag = true
              }
            })
            if (flag) {
              this.$message.error("请完整填写活动规格及返佣奖励!")
            } else {
              this.saveConf()
            }
          } else {
            this.saveConf()
          }
        }
      })
    },
    // 选择奖品
    selectPrize(obj, title) {
      let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
      newAwae.awardPic = obj.pic
      newAwae.poolName = obj.name
      newAwae.prizeName = obj.name
      newAwae.poolId = obj.id
      if (title == '选择红包') {
        newAwae.awardType = 3
        this.hb.push(newAwae)
      }
      if (title == '选择实物') {
        newAwae.awardType = 1
        this.sw.push(newAwae)
      }
      if (title == '选择荷石币') {
        newAwae.awardType = 6
        this.hsb.push(newAwae)
      }
      if (title == '选择折扣卡') {
        newAwae.awardType = 7
        this.zkk.push(newAwae)
      }
      if (title == '选择翻倍卡') {
        newAwae.awardType = 8
        this.fbk.push(newAwae)
      }
      this.listVisible = false
    },
    deleteAward(list, index) {
      this[list].splice(index, 1)
    },
    handSizeChange(newSize) {
      this.params.pageSize = newSize
      this.getList()
    },
    handCurrentChange(newSize) {
      this.params.pageNo = newSize
      this.getList()
    },
  }

}
</script>
<style>
.avatar-uploader-icon1 {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}

.avatar {
  width: 300px;
  height: 64px;
  line-height: 64px;
  display: block;
}
</style>
<style lang="scss" scoped>
.QA-container {
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
}
</style>
