<template>
  <div class="container">
    <el-card>
      <el-form label-width="110px" :rules="rules">
        <el-form-item label="品牌规格：" prop="brand">
          <selected-brand v-if="isShow" @done="brandDone" :data="{
            brandArr: data.strategyArr[0].brandArr,
            snArr: data.strategyArr[0].snArr
          }" :saleZone="saleZoneCode" :id="id"></selected-brand>
        </el-form-item>
        <el-form-item label="地区：" prop="area">
          <selected-area v-if="isShow" @done="areaDone" :data="{
            cityArr: data.strategyArr[0].areas.cityArr,
            districtArr: data.strategyArr[0].areas.districtArr,
            provinceArr: data.strategyArr[0].areas.provinceArr
          }" :isDis="isDisabled" :saleZone="saleZoneCode" :id="id" @isAllSelect="(flag)=>{isDisabled = flag}"></selected-area>
        </el-form-item>
        <put-conf v-if="isShow" :astrictRedflg="astrictRedflg" :data="data" :saleZone="saleZoneCode" :budgetTime="actSTime" ></put-conf>
        <el-form-item class="mt20" label="是否立即发布：">
          <el-switch v-model="data.act.status" :disabled="statusDisabled" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button plain @click="$router.push('/market/actMgr')">取消</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import selectedBrand from '@/components/selectedBrand.module'
import selectedArea from '@/components/seleckedArea.module'
import putConf from './components/PutConfItem'
export default {
  props: ['id', 'actCode','form'],
  inject: ['routerRefresh'], //在子组件中注入在父组件中出创建的属性
  components: {
    selectedArea,
    selectedBrand,
    putConf
  },
  data() {
    var tips = (rule, value, callback) => {
      // callback()
    }
    return {
      rules: {
        brand: [{required: true, validator: tips}],
        area: [{required: true, validator: tips}],
        time: [{required: true, validator: tips}]
      },
      data: {
        act: {
          actCode: '',
          id: '',
          status: 2
        },
        strategyArr: [
          {
            areas: {
              cityArr: [],
              districtArr: [],
              provinceArr: []
            },
            awardArr: [
              {
                awardPic: '',
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
              }
            ],
            brandArr: [],
            snArr: [],
            tf: {
              stimeStr: '', // yyyy-MM-dd HH:mm:ss
              etimeStr: ''
            },
            tfType: 'common',
          }
        ]
      },
      selectedBrandArr: [],
      selectedSnArr: [],
      selectedPrevArr: [],
      selectedCityArr: [],
      selectedAreaArr: [],
      saleZoneCode:null,
      actSTime: '', // 活动开始时间
      isDisabled: false,
      isShow: false,
      statusDisabled: false,
      isChange: false,
      astrictRedflg: false, // 红包限制  为true 红包最高金额为0.3
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    brandDone(arr) {
      this.isChange = true
      this.selectedBrandArr = arr.selectB
      this.selectedSnArr = arr.selectSB
    },
    areaDone(arr) {
      this.isChange = true
      this.selectedPrevArr = arr.selectP
      this.selectedCityArr = arr.selectC
      this.selectedAreaArr = arr.selectA
    },
    getDetail() {
      this.$request.post('/api/wiseqr/act/detail', {id: this.id}, true, res => {
        if (res.ret === '200000') {
          this.data.act = res.data.act
          this.saleZoneCode = res.data.act.saleZoneCode
          this.actSTime = res.data.act.stimeStr
          if (this.data.act.orgId === 'guest') this.astrictRedflg = true
          if (res.data.strategyArr.length !== 0) {
            if (res.data.strategyArr[0].areas.provinceArr[0] == '000000' && res.data.strategyArr[0].areas.cityArr[0] == '000000') this.isDisabled = true
            if (res.data.act.status == 1) this.statusDisabled = true
            this.data = res.data
          }
          this.isShow = true
        }
      })
    },
    // 返回列表
    backList() {
      this.$router.push('/market/actMgr')
      this.routerRefresh() // 调用home.vue的 routerRefresh
    },
    save() {
      // if (this.selectedBrandArr.length == 0 || this.selectedSnArr.length == 0) return this.$message.error('请选择品牌')
      // if (this.selectedPrevArr.length == 0 || this.selectedCityArr.length == 0) return this.$message.error('请选择地区')
      // 不是全部地区  清除选中地区里面的全部选项
      if (!this.isDisabled) {
        console.log(this.selectedCityArr)
        if(this.selectedCityArr.indexOf('000000') != -1 && this.selectedCityArr.length > 1) {
          this.selectedCityArr.splice(this.selectedCityArr.indexOf('000000'), 1)
          console.log(this.selectedCityArr)
        }
        if(this.selectedAreaArr.indexOf('000000') != -1 && this.selectedAreaArr.length > 1) {
          this.selectedAreaArr.splice(this.selectedAreaArr.indexOf('000000'), 1)
        }
        if(this.selectedPrevArr.indexOf('000000') != -1 && this.selectedPrevArr.length > 1) {
          this.selectedPrevArr.splice(this.selectedPrevArr.indexOf('000000'), 1)
        }
      }
      // 给每个场次都添加地区和品牌
      if (this.isChange) {
        this.data.strategyArr.map(item => {
          item.areas.provinceArr = this.selectedPrevArr
          item.areas.cityArr = this.selectedCityArr
          item.areas.districtArr = this.selectedAreaArr
          item.brandArr = this.selectedBrandArr
          item.snArr = this.selectedSnArr
        })
      }
      this.$request.post('/api/wiseqr/act/somRedtf', this.data, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功')
          this.$router.push('/market/actMgr')
          this.routerRefresh() // 调用home.vue的 routerRefresh
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 1000px;
  margin: 0 auto;
}
.high {
  height: 40px;
  line-height: 40px;
  background: #f0f0f0;
  padding: 0 20px;
  border-radius: 4px;
  .el-switch {
    float: right;
    margin-top: 10px;
  }
}
.share {
  padding: 20px 40px;
  border: 1px solid #e4e7ed;
  border-top-color: transparent;
}
</style>


