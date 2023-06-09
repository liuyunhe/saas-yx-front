export default {
  props: ['id', 'actCode', 'form'],
  inject: ['routerRefresh'], //在子组件中注入在父组件中出创建的属性
  data() {
    return {
      stepActive: 2,
      act: {
        id: null,
        actCode: '', // 编码
        dwnum: null,
        status: null, // 活动状态 1-发布 0-未发布
      },
      // firstScanTabsEdit: false,
      status: false, // 是否立即发布
      statusDisabled: false, // 立即发布开关禁用
      actSTime: '', // 活动开始时间
      actETime: '', // 结束
      strategy: {
        areas: {
          provinceArr: [],
          cityArr: [],
          districtArr: []
        },
        awardArr: [],
        brandArr: [],
        snArr: [],
        tfType: '' // 投放策略类型 common常规；special定投；sn_first首扫必中；n_mwin必中
      },
      specialAreas: {
        provinceArr: [],
        cityArr: [],
        districtArr: []
      },
      specialBrand: {
        brandArr: [],
        snArr: []
      },
      normalConf: [{ // 正常选项
        awardPic: '',
        awardType: 1, // 奖项类型
        curActive: true,
        giveScore: 0, // 是否赠送积分 0-否 1-是
        guideGzh: 0, // 是否引导关注公众号 0-否 1-是
        hasPdMaxOut: false,
        hasWarn: false,
        integral: null, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
        awardPrice: null, // 折扣卡折扣值
        integralPool: null, // 赠送积分池主键id
        integralPoolName: null,
        integralPoolPic: null,
        isGiveScore: false,
        isGuideGzh: false,
        isPdMaxOut: false,
        isWarn: false,
        outNum: '',
        pdMaxOut: 0, // 奖项每天最多出奖个数
        poolId: 1, // 奖项物料池主键id
        poolName: '',
        prizeName: '', // 奖项名称
        probability: '', // 中奖概率
        redMoney: '', // 投放红包面额
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '', // totalNum
        warnValue: '', //告警阀值 非空且大于0时为设置告警
        budgetId: null,
        integralBudgetId: null
      }],
      normalTfId: '',
      defaultAwae: { // 给个默认 好复制
        awardPic: '',
        awardType: 1, // 奖项类型
        curActive: true,
        giveScore: 0, // 是否赠送积分 0-否 1-是
        guideGzh: 0, // 是否引导关注公众号 0-否 1-是
        hasPdMaxOut: false,
        hasWarn: false,
        integral: null, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
        awardPrice: null, // 折扣卡折扣值
        integralPool: null, // 赠送积分池主键id
        integralPoolName: null,
        integralPoolPic: null,
        isGiveScore: false,
        isGuideGzh: false,
        isPdMaxOut: false,
        isWarn: false,
        n: '',
        outNum: '',
        pdMaxOut: 0, // 奖项每天最多出奖个数
        poolId: 1, // 奖项物料池主键id
        poolName: '',
        prizeName: '', // 奖项名称
        probability: '', // 中奖概率
        redMoney: '', // 投放红包面额
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '', // totalNum
        warnValue: '', //告警阀值 非空且大于0时为设置告警
        budgetId: null,
        integralBudgetId: null
      },
      firstScanConf: [{
        awardPic: '',
        awardType: 1,
        curActive: true,
        giveScore: 0,
        guideGzh: 0,
        hasPdMaxOut: false,
        hasWarn: false,
        integral: '',
        awardPrice: null, // 折扣卡折扣值
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        outNum: '',
        pdMaxOut: 0,
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: '',
        budgetId: null,
        integralBudgetId: null
      }], // 首扫选项
      firstScanTfId: '',
      nWinConf: [{
        awardPic: '',
        awardType: 1,
        curActive: true,
        giveScore: 0,
        guideGzh: 0,
        hasPdMaxOut: false,
        hasWarn: false,
        integral: '',
        awardPrice: null, // 折扣卡折扣值
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        n: '',
        outNum: '',
        pdMaxOut: 0,
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: '',
        budgetId: null,
        integralBudgetId: null
      }], // n次选项
      nWinTfId: '',
      nWinAward: {
        n: 0
      },
      fixationPutConf: [{
        awardPic: '',
        awardType: 1,
        curActive: true,
        giveScore: 0,
        guideGzh: 0,
        hasPdMaxOut: false,
        hasWarn: false,
        integral: '',
        awardPrice: null, // 折扣卡折扣值
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        outNum: '',
        pdMaxOut: 0,
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: '',
        budgetId: null,
        integralBudgetId: null
      }], // 定投选项
      fixationPutTfId: '',
      normalTabsValue: '1', // 正常tabs
      normalTabs: [{
        title: '常规奖项1',
        name: '1'
      }],
      firstScanTabsValue: '1', // 首扫
      firstScanTabs: [{
        title: '常规奖项1',
        name: '1'
      }],
      nWinTabsValue: '1', // n次
      nWinTabs: [{
        title: '常规奖项1',
        name: '1'
      }],
      fixationPutTabsValue: '1', // 定投
      fixationPutTabs: [{
        title: '常规奖项1',
        name: '1'
      }],
      tfId: '', // 投放策略主键id
      tfTimeArr: [], // 投放策略开始/结束时间 0-开始时间 1-结束时间
      tfDurationArr: [], // 投放策略开始/结束时段(发放时间) 0-开始时间 1-结束时间
      prizeType: [{ // 类型
        name: '实物礼品',
        type: 1
      },
      {
        name: '虚拟礼品',
        type: 2
      },
      {
        name: '红包',
        type: 3
      },
      {
        name: '积分',
        type: 6
      },
      {
        name: '折扣卡',
        type: 7
      },
      {
        name: '自定义礼品',
        type: 9
      }
      ],
      normalIndex: 1,
      firstScanIndex: 1,
      nWinIndex: 1,
      fixationPutIndex: 1,
      selectBrand: [], // 选中的品牌
      selectSonBrand: [], // 子品牌
      selectProvList: [], // 省
      oldSlectProvList: ['1'], // 上次选中的省  给个默认值 不然会报错
      oldSlectProvList1: ['1'], // 上次选中的省  给个默认值 不然会报错
      selectCityList: [], // 市
      oldSelectCityList: ['1'],
      oldSelectCityList1: ['1'],
      selectAreaList: [], // 区
      oldSelectAreaList: ['1'],
      oldSelectAreaList1: ['1'],
      brandList: [], // 品牌列表
      brandSonList: [], // 子品牌
      specialBrandList: [], // 定投品牌
      specialBrandSonList: [],
      saleZoneCode: null,
      saleZone: [],
      provList: [{
        code: '000000',
        name: '全部'
      }], // 省
      cityList: [{
        code: '000000',
        name: '全部'
      }], // 市
      areaList: [{
        code: '000000',
        name: '全部'
      }], // 区
      specialProvList: [], // 定投地区
      specialCityList: [],
      specialAreaList: [],
      regionVisible: false, // 地区明细窗口
      brandVisible: false, // 品牌
      specialRuleConfFlag: false, // 特殊规则开关
      prizeLimitFlag: false, // 抽奖限制开关
      NprizeLimitFlag: false, // 抽奖限制开关
      nLimit: {
        nlimit: 0,
        nlimitNum: null,
        nlimitProb: null,
      },
      firstScanFlag: false,
      nWinFlag: false,
      fixationPutFlag: false,
      isPut: false, // 是否投放
      isDisabled: false, // 是否禁用
      saleZoneDisabled: false,
      // 时间限制
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.actSTime).getTime() || time.getTime() > new Date(this.actETime).getTime()
        }
      },
      astrictRedflg: false, // 红包限制  为true 红包最高金额为0.3
      showSaleZone: sessionStorage.getItem('account').indexOf('shankun') == -1
    }
  },
  created() {
    this.getActDetail()
    this.getBrandList()
    this.getSaleZone()
  },
  computed: {
    // TODO 暂时不做
    // regionDetail: function() {
    //   let regionStr = ''
    //   this.selectProvList.forEach(item => {
    //     regionStr += item
    //   })
    // }
  },
  watch: {
    status: function (val) {
      if (val) {
        this.act.status = 1
      } else {
        this.act.status = 2
      }
    },
    isDisabled: function (val) {
      // console.log(val)
      if (val) {
        this.selectProvList = ['000000']
        this.selectCityList = ['000000']
        this.selectAreaList = ['000000']
      } else {
        this.selectProvList = []
        this.selectCityList = []
        this.selectAreaList = []
      }
    },
    fixationPutFlag: function (val) {
      if (val) {
        this.restrictArea()
      } else {
        this.selectProvList = []
        this.selectCityList = []
        this.selectAreaList = []
      }
    }
  },
  methods: {
    handleChangeN({ n, index }) {
      this.nWinTabs[index].title = `${n}次必中`
    },
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
        if (res.code == '200') {
          this.saleZone = res.data || [];
        }
      });
    },
    // 获取活动详情
    getActDetail() {
      if (this.id) {
        this.$request.post('/api/wiseqr/act/detail', {
          id: this.id
        }, true, res => {
          if (res.ret !== '200000') return this.$message.error(res.message)
          if (res.data.act.orgId === 'guest') this.astrictRedflg = true
          if (res.data.act.status == 1) {
            this.statusDisabled = true
          } else {
            this.statusDisabled = false
          }
          if (res.data.act.status == 2) {
            this.saleZoneDisabled = false
          } else {
            this.saleZoneDisabled = true
          }
          if (res.data.act.tfExtInfo != null && 'nlimit' in JSON.parse(res.data.act.tfExtInfo)) {
            if (JSON.parse(res.data.act.tfExtInfo)['nlimit'] == 1) {
              this.nLimit.nlimit = 1
              this.nLimit.nlimitNum = JSON.parse(res.data.act.tfExtInfo)['nlimitNum']
              this.nLimit.nlimitProb = JSON.parse(res.data.act.tfExtInfo)['nlimitProb']
              this.NprizeLimitFlag = true
            }
          }
          this.status = res.data.act.status == 1 ? true : false
          this.prizeLimitFlag = res.data.act.dwnum ? true : false
          this.act.dwnum = res.data.act.dwnum
          this.actSTime = res.data.act.stimeStr
          this.actETime = res.data.act.etimeStr
          this.saleZoneCode = res.data.act.saleZoneCode
          this.getProvList()
          console.log(res.data)
          if (res.data.strategyArr.length != 0) {
            // this.isEdit = true
            res.data.strategyArr.forEach((item, index) => {
              if (item.tfType == 'common') {
                if (item.awardArr.length == 0) return
                this.normalTfId = item.tf.id
                // let data = item.awardArr
                item.awardArr.forEach((sonItem, i) => {
                  if (i != 0) {
                    this.normalTabs.push({
                      title: '常规奖项' + (i + 1),
                      name: '' + (i + 1)
                    })
                  }
                  if (i == 0) {
                    for (let k in sonItem) {
                      this.normalConf[0][k] = sonItem[k]
                    }
                  } else {
                    this.normalConf.push(sonItem)
                  }
                })
                // this.normalConf = item.awardArr

                // console.log(this.normalConf)
                if (item.areas.provinceArr[0] == '000000' && item.areas.cityArr[0] == '000000') {
                  this.isDisabled = true
                  this.restrictProv()
                  this.restrictCity()
                } else {
                  this.selectProvList = item.areas.provinceArr
                  this.selectCityList = item.areas.cityArr
                  this.getCityList(this.selectProvList)
                  // this.getAreaList(this.selectCityList)
                  // this.selectAreaList = item.areas.districtArr
                  // this.selectAll(this.selectAreaList)
                }
                this.selectBrand = item.brandArr
                this.getBrandSonList()
                this.selectSonBrand = item.snArr
                // this.restrictSonBrand()
              }
              if (item.tfType == 'sn_first') {
                this.firstScanTfId = item.tf.id
                item.awardArr.forEach((sonItem, i) => {
                  if (i != 0) {
                    this.firstScanTabs.push({
                      title: '常规奖项' + (i + 1),
                      name: '' + (i + 1)
                    })
                  }
                  // for (let k in sonItem) {
                  //   this.firstScanTabs[i][k] = sonItem[k]
                  // }
                  if (i == 0) {
                    for (let k in sonItem) {
                      this.firstScanConf[0][k] = sonItem[k]
                    }
                  } else {
                    this.firstScanConf.push(sonItem)
                  }
                })
                this.specialRuleConfFlag = true
                this.firstScanFlag = true
                this.firstScanConf = item.awardArr
              }
              if (item.tfType == 'n_mwin') {
                this.nWinTfId = item.tf.id
                this.nWinTabs = []
                item.awardArr.forEach((sonItem, i) => {
                  this.nWinTabs.push({
                    title: sonItem.n + '次必中',
                    name: '' + (i + 1)
                  })
                  // for (let k in sonItem) {
                  //   this.nWinTabs[i][k] = sonItem[k]
                  // }
                  if (i == 0) {
                    for (let k in sonItem) {
                      this.nWinConf[0][k] = sonItem[k]
                    }
                  } else {
                    this.nWinConf.push(sonItem)
                  }
                })
                this.specialRuleConfFlag = true
                this.nWinFlag = true
                this.nWinConf = item.awardArr
              }
              if (item.tfType == 'special') {
                console.log(item)
                this.fixationPutTfId = item.tf.id
                item.awardArr.forEach((sonItem, i) => {
                  if (i != 0) {
                    this.fixationPutTabs.push({
                      title: '常规奖项' + (i + 1),
                      name: '' + (i + 1)
                    })
                  }
                  // for (let k in sonItem) {
                  //   console.log(this.normalConf[i][k])
                  //   this.fixationPutTabs[i][k] = sonItem[k]
                  // }
                  if (i == 0) {
                    for (let k in sonItem) {
                      this.fixationPutConf[0][k] = sonItem[k]
                    }
                  } else {
                    this.fixationPutConf.push(sonItem)
                  }
                })
                this.specialRuleConfFlag = true
                this.fixationPutFlag = true
                this.fixationPutConf = item.awardArr
                this.specialAreas = item.areas
                console.log(this.specialAreas, item.areas)
                this.specialBrand.brandArr = item.brandArr
                this.specialBrand.snArr = item.snArr
                this.tfDurationArr.push(item.tf.sduration)
                this.tfDurationArr.push(item.tf.eduration)
                this.tfTimeArr.push(item.tf.stimeStr)
                this.tfTimeArr.push(item.tf.etimeStr)
              }
            })
          }
        })
      } else {
        this.$router.push('/market/actMgr')
      }
    },
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/wiseqr/prod/listBrand', {
        pageSize: '-1'
      }, true, res => {
        if (res.ret === '200000') {
          this.brandList = res.data.list
          this.restrictBrand()
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取子品牌列表
    getBrandSonList() {
      // 定投限制品牌
      this.restrictBrand()
      if (this.saleZoneCode) {
        this.$request.post(
          '/api/actSale/product/sn', {
          id: this.id,
          brandCode: this.selectBrand.join(","),
        },
          false,
          res => {
            if (res.code === '200') {
              this.brandSonList = res.data
              this.restrictSonBrand()
              return
            }
            this.$message.error(res.msg)
          }
        )
      } else {
        this.$request.post(
          '/api/wiseqr/prod/list', {
          status: "1",
          brandCodeArr: this.selectBrand,
          pageSize: '-1'
        },
          true,
          res => {
            if (res.ret === '200000') {
              this.brandSonList = res.data.list
              this.restrictSonBrand()
              return
            }
            this.$message.error(res.message)
          }
        )
      }
    },
    // 获取省
    getProvList() {
      if (this.saleZoneCode) {
        this.$request.post('/api/actSale/province/list', {
          id: this.id
        }, false, res => {
          if (res.code === '200') {
            this.provList.push(...res.data)
            this.restrictProv()
            // this.provList.unshift({
            //   code: '000000',
            //   name: '全部'
            // })
            return
          }
          this.$message.error(res.msg)
        })
      } else {
        this.$request.post('/api/wiseqr/dim/regionByMultiParent', {
          parentArr: []
        }, true, res => {
          if (res.ret === '200000') {
            this.provList.push(...res.data)
            this.restrictProv()
            // this.provList.unshift({
            //   code: '000000',
            //   name: '全部'
            // })
            return
          }
          this.$message.error(res.message)
        })
      }
    },
    hanldeRemoveProv(val) {
      console.log(val)
    },
    // 获取市
    getCityList(val) {
      console.log(val)
      if (this.provList.length == 1 && !this.saleZoneCode) {
        setTimeout(() => {
          console.log(111)
          this.getCityList(val)
        }, 1000)
        return
      }
      // this.specialAreas.provinceArr = []
      // this.specialAreas.cityArr = []
      this.restrictProv()
      let allValue = []
      // 保存所有的值
      for (let item of this.provList) {
        allValue.push(item.code)
      }
      // 储存上一次的值 用来进行对比
      const oldVal = this.oldSlectProvList.length === 1 ? [] : this.oldSlectProvList[1]
      // 点击全部选择
      /**
       * Array.includes()
       * ES6方法 用于判断是否包含某一元素 返回布尔值
       */
      if (val.includes('000000')) {
        this.selectProvList = allValue
        this.specialAreas.provinceArr = []
        this.specialAreas.cityArr = []
        this.restrictProv()
      }
      // 取消全部选择
      if (oldVal.includes('000000') && !val.includes('000000')) {
        this.selectProvList = []
        this.specialAreas.provinceArr = []
        this.specialAreas.cityArr = []
        this.restrictProv()
      }
      // 全选之后取消单个
      if (oldVal.includes('000000') && val.includes('000000')) {
        // 全选也跟着取消
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectProvList = val
        this.specialAreas.provinceArr = []
        this.specialAreas.cityArr = []
        this.restrictProv()
      }
      // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectProvList = ['000000'].concat(val)
          this.specialAreas.provinceArr = []
          this.specialAreas.cityArr = []
          this.restrictProv()
        }
      }
      this.oldSlectProvList[1] = this.selectProvList
      if (this.selectProvList.length == 0) {
        this.cityList = []
        this.selectCityList = []
        this.areaList = []
        this.selectAreaList = []
        return
      }
      let params = {
        parentArr: this.selectProvList
      }
      if (this.saleZoneCode) {
        params.saleZoneCode = this.saleZoneCode
      }
      this.$request.post(
        '/api/wiseqr/dim/regionByMultiParent',
        params,
        true,
        res => {
          if (res.ret === '200000') {
            this.cityList = [{ code: '000000', name: '全部' }]
            this.cityList.push(...res.data)
            // 定点投放地区限制
            this.restrictProv()
            this.restrictCity()
            // this.cityList.unshift({
            //   code: '000000',
            //   name: '全部'
            // })
            let arr = []
            this.selectCityList.forEach((item, index) => {
              const city = this.cityList.find(i => {
                return i.code == item
              })
              console.log(city)
              if (city) {
                arr.push(item)
              }
            })
            this.selectCityList = arr
            let l = arr.length
            if (arr.includes('000000')) {
              l = l - 1
            }
            console.log(arr, l, this.cityList.length)
            if (l + 1 != this.cityList.length) {
              this.selectCityList.forEach((item, index) => {
                if (item == '000000') {
                  this.selectCityList.splice(index, 1)
                }
              })
            } else {
              if (!this.selectCityList.includes('000000')) {
                this.selectCityList = ['000000'].concat(this.selectCityList)
              }
            }
            this.oldSelectCityList[1] = this.selectCityList
            return
          }
          this.message.error(res.message)
        }
      )
    },
    // 获取区
    getAreaList(val) {
      if (this.cityList.length == 1) {
        setTimeout(() => {
          this.getAreaList(val)
        }, 1000)
        return
      }
      // this.specialAreas.cityArr = []
      this.restrictCity()
      let allValue = []
      for (let item of this.cityList) {
        allValue.push(item.code)
      }
      const oldVal = this.oldSelectCityList.length === 1 ? [] : this.oldSelectCityList[1]
      if (val.includes('000000')) {
        console.log(111)
        this.selectCityList = allValue
        this.specialAreas.cityArr = []
        this.restrictCity()
      }
      if (oldVal.includes('000000') && !val.includes('000000')) {
        console.log(222)
        this.selectCityList = []
        this.specialAreas.cityArr = []
        this.restrictCity()
      }
      if (oldVal.includes('000000') && val.includes('000000')) {
        console.log(333)
        console.log(this.selectCityList)
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectCityList = val
        this.specialAreas.cityArr = []
        this.restrictCity()
      }
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        console.log(444)
        if (val.length === allValue.length - 1) {
          this.selectCityList = ['000000'].concat(val)
        }
        this.specialAreas.cityArr = []
        this.restrictCity()
      }
      this.oldSelectCityList[1] = this.selectCityList
      if (this.selectCityList.length == 0) {
        this.areaList = []
        this.selectAreaList = []
        return
      }
      this.$request.post(
        '/api/wiseqr/dim/regionByMultiParent', {
        parentArr: this.selectCityList
      },
        true,
        res => {
          if (res.ret === '200000') {
            this.areaList = [{ code: '000000', name: '全部' }]
            this.areaList.push(...res.data)
            // 定点投放地区限制
            this.restrictCity()
            // this.areaList.unshift({
            //   code: '000000',
            //   name: '全部'
            // })
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    // 选择区
    selectAll(val) {
      if (this.areaList.length == 1) {
        setTimeout(() => {
          this.selectAll(val)
        }, 1000)
        return
      }
      this.restrictArea()
      let allValue = []
      for (let item of this.areaList) {
        allValue.push(item.code)
      }
      const oldVal = this.oldSelectAreaList.length === 1 ? [] : this.oldSelectAreaList[1]
      if (val.includes('000000')) this.selectAreaList = allValue
      if (oldVal.includes('000000') && !val.includes('000000')) this.selectAreaList = []
      if (oldVal.includes('000000') && val.includes('000000')) {
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectAreaList = val
      }
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectAreaList = ['000000'].concat(val)
        }
      }
      this.oldSelectAreaList[1] = this.selectAreaList
    },

    // 保存
    save() {
      // console.log(this.normalConf)
      if (this.selectBrand.length == 0 || this.selectSonBrand.length == 0) return this.$message.error('请选择品牌规格')
      if (this.selectProvList.length == 0 || this.selectCityList.length == 0) return this.$message.error('请选择地区')
      if (!this.isDisabled) {
        if (this.selectCityList.indexOf('000000') != -1) {
          this.selectCityList.splice(this.selectCityList.indexOf('000000'), 1)
        }
        if (this.selectAreaList.indexOf('000000') != -1) {
          this.selectAreaList.splice(this.selectAreaList.indexOf('000000'), 1)
        }
        if (this.selectProvList.indexOf('000000') != -1) {
          this.selectProvList.splice(this.selectProvList.indexOf('000000'), 1)
        }
      }
      this.act.id = this.id
      this.act.actCode = this.actCode
      this.act.tfExtInfo = JSON.stringify(this.nLimit)
      let data = {
        act: {},
        strategyArr: []
      }
      data.act = this.act
      data.act.saleZoneCode = this.saleZoneCode
      data.strategyArr.push(JSON.parse(JSON.stringify(this.strategy)))
      data.strategyArr[0].awardArr = this.normalConf
      data.strategyArr[0].areas.cityArr = this.selectCityList
      data.strategyArr[0].areas.districtArr = this.selectAreaList
      data.strategyArr[0].areas.provinceArr = this.selectProvList
      data.strategyArr[0].brandArr = this.selectBrand
      data.strategyArr[0].snArr = this.selectSonBrand
      data.strategyArr[0].tfType = 'common'
      data.strategyArr[0].tf = { id: this.normalTfId }
      let index = 0
      if (this.firstScanFlag) {
        data.strategyArr.push(JSON.parse(JSON.stringify(this.strategy)))
        index = data.strategyArr.length
        data.strategyArr[index - 1].awardArr = this.firstScanConf
        data.strategyArr[index - 1].confOpen = true
        data.strategyArr[index - 1].tfType = 'sn_first'
        data.strategyArr[index - 1].tf = { id: this.firstScanTfId }
      }
      if (this.nWinFlag) {
        data.strategyArr.push(JSON.parse(JSON.stringify(this.strategy)))
        index = data.strategyArr.length
        data.strategyArr[index - 1].awardArr = this.nWinConf
        data.strategyArr[index - 1].confOpen = true
        data.strategyArr[index - 1].tfType = 'n_mwin'
        data.strategyArr[index - 1].tf = { id: this.nWinTfId }
      }
      if (this.fixationPutFlag) {
        data.strategyArr.push(JSON.parse(JSON.stringify(this.strategy)))
        index = data.strategyArr.length

        data.strategyArr[index - 1].areas = this.specialAreas
        if (data.strategyArr[index - 1].areas.provinceArr[0] == '000000') {
          data.strategyArr[index - 1].areas.provinceArr.splice(0, 1)
        }
        if (data.strategyArr[index - 1].areas.cityArr[0] == '000000') {
          data.strategyArr[index - 1].areas.cityArr.splice(0, 1)
        }

        data.strategyArr[index - 1].awardArr = this.fixationPutConf
        data.strategyArr[index - 1].confOpen = true
        data.strategyArr[index - 1].brandArr = this.specialBrand.brandArr
        data.strategyArr[index - 1].snArr = this.specialBrand.snArr
        // data.strategyArr[index - 1].tf.sduration = this.tfDurationArr[0]
        // data.strategyArr[index - 1].tf.eduration = this.tfDurationArr[1]
        // data.strategyArr[index - 1].tf.stimeStr = this.tfTimeArr[0]
        // data.strategyArr[index - 1].tf.etimeStr = this.tfTimeArr[1]
        data.strategyArr[index - 1].tf = {
          sduration: this.tfDurationArr[0],
          eduration: this.tfDurationArr[1],
          stimeStr: this.tfTimeArr[0],
          etimeStr: this.tfTimeArr[1],
          id: this.fixationPutTfId
        }
        data.strategyArr[index - 1].tfType = 'special'
        // data.strategyArr[index - 1].tf = { id: this.fixationPutTfId }
      }
      this.$request.post('/api/wiseqr/act/somtf', data, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功')
          if (this.form == "act-111") {
            return this.$router.push(
              '/market/actTpl/HPXSetConf?id=' + this.id + '&actCode=' + this.actCode + '&form=' + this.form + '&saleZone=' + (this.saleZoneCode || '') + '&budgetTime=' + this.actSTime
            )
          }
          this.$router.push('/market/actMgr')
          this.routerRefresh() // 调用home.vue的 routerRefresh
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回列表
    backList() {
      this.$router.push('/market/actMgr')
      this.routerRefresh() // 调用home.vue的 routerRefresh
    },
    normalTabsEdit(targetName, action) {
      // if (action === 'add') {
      //   if (this.normalConf.length == 10) return
      //   // 深拷贝 防止数据相互串通
      //   let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
      //   this.normalConf.push(newAwae)
      //   let newTabTitle = '常规奖项' + ++this.normalIndex
      //   this.normalTabs.push({
      //     title: newTabTitle,
      //     name: this.normalIndex + ''
      //   })
      //   this.normalTabsValue = this.normalIndex + ''
      // }
      // if (action === 'remove') {
      //   if (this.normalConf.length == 1) return
      //   let tabs = this.normalTabs
      //   let activeName = this.normalTabsValue
      //   let removeIndex = tabs.indexOf(activeName)
      //   this.normalConf.splice(removeIndex, 1)
      //   if (activeName === targetName) {
      //     tabs.forEach((tab, index) => {
      //       if (tab.name === targetName) {
      //         let nextTab = tabs[index + 1] || tabs[index - 1];
      //         if (nextTab) {
      //           activeName = nextTab.name;
      //         }
      //       }
      //     });
      //   }
      //   this.normalTabsValue = activeName;
      //   this.normalTabs = tabs.filter(tab => tab.name !== targetName)
      // }
      this.addOrRemove('normal', targetName, action)
    },
    firstScanTabsEdit(targetName, action) {
      this.addOrRemove('firstScan', targetName, action)
    },
    nWinTabsEdit(targetName, action) {
      this.addOrRemove('nWin', targetName, action)
    },
    fixationPutTabsEdit(targetName, action) {
      this.addOrRemove('fixationPut', targetName, action)
    },
    addOrRemove(confName, targetName, action) {
      if (action === 'add') {
        if (this[confName + 'Conf'].length == 15) return
        // 深拷贝 防止数据相互串通
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        this[confName + 'Conf'].push(newAwae)
        if (confName == 'nWin') {
          let newTabTitle = 'n次必中'
          this[confName + 'Tabs'].push({
            title: newTabTitle,
            name: this[confName + 'Conf'].length + ''
          })
        } else {
          let newTabTitle = '常规奖项' + this[confName + 'Conf'].length
          this[confName + 'Tabs'].push({
            title: newTabTitle,
            name: this[confName + 'Conf'].length + ''
          })
        }
        this[confName + 'TabsValue'] = this[confName + 'Conf'].length + ''
      }
      if (action === 'remove') {
        if (this[confName + 'Conf'].length == 1) return
        let tabs = this[confName + 'Tabs']
        // let activeName = this[confName + 'TabsValue']
        // let removeIndex = tabs.indexOf(targetName)

        if (confName == 'nWin') {
          this[confName + 'Conf'].splice(targetName - 1, 1)
          this[confName + 'Tabs'] = []
          for (let i = 0; i < this[confName + 'Conf'].length; i++) {
            this[confName + 'Tabs'].push({ title: `${this[confName + 'Conf'][i].n}次必中`, name: i + 1 + '' })
          }
        } else {
          this[confName + 'Conf'].splice(targetName - 1, 1)
          this[confName + 'Tabs'] = []
          for (let i = 1; i <= this[confName + 'Conf'].length; i++) {
            this[confName + 'Tabs'].push({ title: '常规奖项' + i, name: i + '' })
          }
        }

        // if (activeName === targetName) {
        //   tabs.forEach((tab, index) => {
        //     if (tab.name === targetName) {
        //       let nextTab = tabs[index + 1] || tabs[index - 1];
        //       if (nextTab) {
        //         activeName = nextTab.name;
        //       }
        //     }
        //   });
        // }
        this[confName + 'TabsValue'] = '1'
        // this[confName + 'Tabs'] = tabs.filter(tab => tab.name !== targetName)
      }
    },
    // 定点投放地区限制
    restrictProv() {
      this.specialProvList = JSON.parse(JSON.stringify(this.provList))
      // if (this.selectProvList == ['000000']) return
      this.specialProvList.forEach(speciaItem => {
        speciaItem['disabled'] = true
        this.selectProvList.forEach(item => {
          if (speciaItem.code == item || speciaItem.code == '000000') {
            speciaItem['disabled'] = false
          }
        })
      })
      if (this.specialProvList[0].code == '000000') {
        this.specialProvList[0].name = "全选"
      } else {
        this.specialProvList.unshift(
          {
            code: '000000',
            name: '全选'
          }
        )
      }
    },
    getCityListSpecial(val) {
      let allValue = []
      // 保存所有的值
      for (let item of this.specialProvList) {
        if (!item.disabled) {
          allValue.push(item.code)
        }
      }
      // 储存上一次的值 用来进行对比
      const oldVal = this.oldSlectProvList1.length === 1 ? [] : this.oldSlectProvList1[1]
      // 点击全部选择
      /**
       * Array.includes()
       * ES6方法 用于判断是否包含某一元素 返回布尔值
       */
      if (val.includes('000000')) {
        this.specialAreas.provinceArr = allValue
      }
      // 取消全部选择
      if (oldVal.includes('000000') && !val.includes('000000')) {
        this.specialAreas.provinceArr = []
      }
      // 全选之后取消单个
      if (oldVal.includes('000000') && val.includes('000000')) {
        // 全选也跟着取消
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.specialAreas.provinceArr = val
      }
      // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.specialAreas.provinceArr = ['000000'].concat(val)
        }
      }
      this.oldSlectProvList1[1] = this.specialAreas.provinceArr
    },
    restrictCity() {
      this.specialCityList = JSON.parse(JSON.stringify(this.cityList))
      // if (this.selectCityList == ['000000']) return
      this.specialCityList.forEach(speciaItem => {
        speciaItem['disabled'] = true
        this.selectCityList.forEach(item => {
          if (speciaItem.code == item || speciaItem.code == '000000') {
            speciaItem['disabled'] = false
          }
        })
      })
      if (this.specialCityList[0].code == '000000') {
        this.specialCityList[0].name = "全选"
      } else {
        this.specialCityList.unshift(
          {
            code: '000000',
            name: '全选'
          }
        )
      }

    },
    getAreaListSpecial(val) {
      let allValue = []
      // 保存所有的值
      for (let item of this.specialCityList) {
        if (!item.disabled) {
          allValue.push(item.code)
        }
      }
      // 储存上一次的值 用来进行对比
      const oldVal = this.oldSelectCityList1.length === 1 ? [] : this.oldSelectCityList1[1]
      // 点击全部选择
      /**
       * Array.includes()
       * ES6方法 用于判断是否包含某一元素 返回布尔值
       */
      if (val.includes('000000')) {
        this.specialAreas.cityArr = allValue
      }
      // 取消全部选择
      if (oldVal.includes('000000') && !val.includes('000000')) {
        this.specialAreas.cityArr = []
      }
      // 全选之后取消单个
      if (oldVal.includes('000000') && val.includes('000000')) {
        // 全选也跟着取消
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.specialAreas.cityArr = val
      }
      // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.specialAreas.cityArr = ['000000'].concat(val)
        }
      }
      this.oldSelectCityList1[1] = this.specialAreas.cityArr
    },
    restrictArea() {
      this.specialAreaList = JSON.parse(JSON.stringify(this.areaList))
      // if (this.selectAreaList == ['000000']) return
      this.specialAreaList.forEach(speciaItem => {
        speciaItem['disabled'] = true
        this.selectAreaList.forEach(item => {
          if (speciaItem.code == item) {
            speciaItem['disabled'] = false
          }
        })
      })
    },
    // 定点投放品牌限制
    restrictBrand() {
      // console.log(this.selectBrand)
      this.specialBrandList = JSON.parse(JSON.stringify(this.brandList))
      this.specialBrandList.forEach(speciaItem => {
        speciaItem['disabled'] = true
        this.selectBrand.forEach(item => {
          if (speciaItem.brandCode == item) {
            speciaItem['disabled'] = false
          }
        })
      })
      // console.log(this.specialBrandList)
    },
    restrictSonBrand() {
      this.specialBrandSonList = JSON.parse(JSON.stringify(this.brandSonList))
      this.specialBrandSonList.forEach(speciaItem => {
        speciaItem['disabled'] = true
        this.selectSonBrand.forEach(item => {
          if (speciaItem.sn == item) {
            speciaItem['disabled'] = false
          }
        })
      })
    }

  }
}
