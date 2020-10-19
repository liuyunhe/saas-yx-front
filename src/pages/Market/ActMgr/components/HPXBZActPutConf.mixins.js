export default {
  props: ['id', 'configId','form','awardArr'],
  inject:['routerRefresh'], //在子组件中注入在父组件中出创建的属性
  data() {
    return {
      stepActive:2,
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
        tfType: '' // 投放策略类型 common；special定投；sn_first首扫必中；n_mwin必中
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
        integralPool: null, // 赠送积分池主键id
        integralPoolName: null,
        integralPoolPic: null,
        isGiveScore: false,
        isGuideGzh: false,
        isPdMaxOut: false,
        isWarn: false,
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
      firstScanConf: [{
        awardPic: '',
        awardType: 1,
        curActive: true,
        giveScore: 0,
        guideGzh: 0,
        hasPdMaxOut: false,
        hasWarn: false,
        integral: '',
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        outNum: '',
        pdMaxOut: '',
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: ''
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
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        n: '',
        outNum: '',
        pdMaxOut: '',
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: ''
      }], // n次选项
      nWinTfId: '',
      fixationPutConf: [{
        awardPic: '',
        awardType: 1,
        curActive: true,
        giveScore: 0,
        guideGzh: 0,
        hasPdMaxOut: false,
        hasWarn: false,
        integral: '',
        integralPool: '',
        integralPoolName: '',
        integralPoolPic: '',
        isGiveScore: false,
        outNum: '',
        pdMaxOut: '',
        poolId: 1,
        poolName: '',
        prizeName: '',
        probability: '',
        redMoney: '',
        redTotalMoney: '',
        remainNum: 0,
        totalNum: '',
        warnValue: ''
      }], // 定投选项
      fixationPutTfId: '',
      normalTabsValue: '1', // 正常tabs
      normalTabs: [{
        title: '奖项1',
        name: '1'
      }],
      firstScanTabsValue: '1', // 首扫
      firstScanTabs: [{
        title: '奖项1',
        name: '1'
      }],
      nWinTabsValue: '1', // n次
      nWinTabs: [{
        title: '奖项1',
        name: '1'
      }],
      fixationPutTabsValue: '1', // 定投
      fixationPutTabs: [{
        title: '奖项1',
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
          name: '红包',
          type: 3
        },
        {
          name: '积分',
          type: 6
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
      selectCityList: [], // 市
      oldSelectCityList: ['1'],
      selectAreaList: [], // 区
      oldSelectAreaList: ['1'],
      brandList: [], // 品牌列表
      brandSonList: [], // 子品牌
      specialBrandList: [], // 定投品牌
      specialBrandSonList: [],
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
      firstScanFlag: false,
      nWinFlag: false,
      fixationPutFlag: false,
      isPut: false, // 是否投放
      // 时间限制
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.actSTime).getTime() || time.getTime() > new Date(this.actETime).getTime()
        }
      },
      astrictRedflg: false // 红包限制  为true 红包最高金额为0.3
    }
  },
  created() {
    // this.getBrandList()
    // this.getProvList()
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
    awardArr(val) {
      this.normalTabs = [{
        title: '奖项1',
        name: '1'
      }]
      this.normalConf = [{ // 正常选项
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
      }]
      if(val.length>0){
        val.forEach((sonItem, i) => {
          if (i != 0) {
            this.normalTabs.push({
              title: '奖项' + (i + 1),
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
      }
    },
    status: function (val) {
      if (val) {
        this.act.status = 1
      } else {
        this.act.status = 2
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
      this.$request.post(
        '/api/wiseqr/prod/list', {
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
    },
    // 获取省
    getProvList() {
      this.$request.post('/api/wiseqr/dim/regionByMultiParent', {
        parentArr: []
      }, true, res => {
        if (res.ret === '200000') {
          this.provList.push(...res.data)
          // this.provList.unshift({
          //   code: '000000',
          //   name: '全部'
          // })
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取市
    getCityList(val) {
      if (this.provList.length == 1) {
        setTimeout(() => {
          this.getCityList(val)
        }, 1000)
        return
      }
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
      if (val.includes('000000')) this.selectProvList = allValue
      // 取消全部选择
      if (oldVal.includes('000000') && !val.includes('000000')) this.selectProvList = []
      // 全选之后取消单个
      if (oldVal.includes('000000') && val.includes('000000')) {
        // 全选也跟着取消
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectProvList = val
      }
      // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectProvList = ['000000'].concat(val)
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
      this.$request.post(
        '/api/wiseqr/dim/regionByMultiParent', {
          parentArr: this.selectProvList
        },
        true,
        res => {
          if (res.ret === '200000') {
            this.cityList = [{ code: '000000', name: '全部'}]
            this.cityList.push(...res.data)
            // 定点投放地区限制
            this.restrictProv()
            // this.cityList.unshift({
            //   code: '000000',
            //   name: '全部'
            // })
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
      let allValue = []
      for (let item of this.cityList) {
        allValue.push(item.code)
      }
      const oldVal = this.oldSelectCityList.length === 1 ? [] : this.oldSelectCityList[1]
      if (val.includes('000000')) this.selectCityList = allValue
      if (oldVal.includes('000000') && !val.includes('000000')) this.selectCityList = []
      if (oldVal.includes('000000') && val.includes('000000')) {
        const index = val.indexOf('000000')
        val.splice(index, 1)
        this.selectCityList = val
      }
      if (!oldVal.includes('000000') && !val.includes('000000')) {
        if (val.length === allValue.length - 1) {
          this.selectCityList = ['000000'].concat(val)
        }
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
            this.areaList = [{ code: '000000', name: '全部'}]
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
      let data = this.normalConf
      let flag = false
      data.forEach((e,i)=>{
        if(!e.prizeName) {
          this.$message.error('请选择奖品')
          flag = true
          return false
        }

        if(!e.totalNum) {
          this.$message.error('请输入投放数量')
          flag = true
        }
      })
      if(!flag) {
        this.$emit('modifyAwardArrError',true)
        this.$emit('modifyAwardArr',data)
      }else {
        this.$emit('modifyAwardArrError',false)
        this.$emit('modifyAwardArr',data)
      }


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
      //   let newTabTitle = '奖项' + ++this.normalIndex
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
        let newTabTitle = '奖项' + this[confName + 'Conf'].length
        this[confName + 'Tabs'].push({
          title: newTabTitle,
          name: this[confName + 'Conf'].length + ''
        })
        this[confName + 'TabsValue'] = this[confName + 'Conf'].length + ''
      }
      if (action === 'remove') {
        if (this[confName + 'Conf'].length == 1) return
        let tabs = this[confName + 'Tabs']
        // let activeName = this[confName + 'TabsValue']
        // let removeIndex = tabs.indexOf(targetName)
        this[confName + 'Conf'].splice(targetName - 1, 1)
        this[confName + 'Tabs'] = []
        for (var i = 1; i <= this[confName + 'Conf'].length; i++) {
          this[confName + 'Tabs'].push({ title: '奖项' + i, name: i + ''})
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
          if (speciaItem.code == item) {
            speciaItem['disabled'] = false
          }
        })
      })
    },
    restrictCity() {
      this.specialCityList = JSON.parse(JSON.stringify(this.cityList))
      // if (this.selectCityList == ['000000']) return
      this.specialCityList.forEach(speciaItem => {
        speciaItem['disabled'] = true
        this.selectCityList.forEach(item => {
          if (speciaItem.code == item) {
            speciaItem['disabled'] = false
          }
        })
      })
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
