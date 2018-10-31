export default {
  props: ['id', 'actCode'],
  data() {
    return {
      act: {
        id: null,
        actCode: '', // 编码
        dwnum: '',
        status: null, // 活动状态 1-发布 0-未发布
      },
      strategyArr: [{
        areas: {
          provinceArr: [],
          cityArr: [],
          districtArr: []
        },
        awaeArr: [],
        brandArr: [],
        snArr: [],
        tfType: '' // 投放策略类型 common常规；special定投；sn_first首扫必中；n_mwin必中
      }],
      normalConf: [{ // 正常选项
        awardPic: '',
        awardType: '1', // 奖项类型
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
      defaultAwae: { // 给个默认 好复制
        awardPic: '',
        awardType: '1',
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
      },
      firstScanConf: [{
        awardPic: '',
        awardType: '1',
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
      nWinConf: [{
        awardPic: '',
        awardType: '1',
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
      }], // n次选项
      fixationPutConf: [{
        awardPic: '',
        awardType: '1',
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
          type: '1'
        },
        {
          name: '虚拟礼品',
          type: '2'
        },
        {
          name: '红包',
          type: '3'
        },
        {
          name: '积分',
          type: '6'
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
      provList: [], // 省
      cityList: [], // 市
      areaList: [], // 区
      regionVisible: false, // 地区明细窗口
      brandVisible: false, // 品牌
      specialRuleConfFlag: false, // 特殊规则开关
      prizeLimitFlag: false, // 抽奖限制开关
      firstScanFlag: false,
      nWinFlag: false,
      fixationPutFlag: false,
      isPut: false, // 是否投放
      isDisabled: false, // 是否禁用
    }
  },
  created() {
    this.getBrandList()
    this.getProvList()
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
  methods: {
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/saotx/prod/listBrand', {
        pageSize: '-1'
      }, true, res => {
        if (res.ret === '200000') return (this.brandList = res.data.list)
        this.$message.error(res.message)
      })
    },
    // 获取子品牌列表
    getBrandSonList() {
      this.$request.post(
        '/api/saotx/prod/list', {
          brandCodeArr: this.selectBrand,
          pageSize: '-1'
        },
        true,
        res => {
          if (res.ret === '200000') return (this.brandSonList = res.data.list)
          this.$message.error(res.message)
        }
      )
    },
    // 获取省
    getProvList() {
      this.$request.post('/api/saotx/dim/regionByMultiParent', {
        parentArr: []
      }, true, res => {
        if (res.ret === '200000') {
          this.provList = res.data
          this.provList.unshift({
            code: '000000',
            name: '全部'
          })
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取市
    getCityList(val) {
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
        '/api/saotx/dim/regionByMultiParent', {
          parentArr: this.selectProvList
        },
        true,
        res => {
          if (res.ret === '200000') {
            this.cityList = res.data
            this.cityList.unshift({
              code: '000000',
              name: '全部'
            })
            return
          }
          this.message.error(res.message)
        }
      )
    },
    // 获取区
    getAreaList(val) {
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
        '/api/saotx/dim/regionByMultiParent', {
          parentArr: this.selectCityList
        },
        true,
        res => {
          if (res.ret === '200000') {
            this.areaList = res.data
            this.areaList.unshift({
              code: '000000',
              name: '全部'
            })
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    // 选择区
    selectAll(val) {
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
      this.addRoRemove('normal', targetName, action)
    },
    firstScanTabsEdit(targetName, action) {
      this.addRoRemove('firstScan', targetName, action)
    },
    nWinTabsEdit(targetName, action) {
      this.addRoRemove('nWin', targetName, action)
    },
    fixationPutTabsEdit(targetName, action) {
      this.addRoRemove('fixationPut', targetName, action)
    },
    addRoRemove(confName, targetName, action) {
      if (action === 'add') {
        if (this[confName + 'Conf'].length == 10) return
        // 深拷贝 防止数据相互串通
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        this[confName + 'Conf'].push(newAwae)
        let newTabTitle = '常规奖项' + ++this[confName + 'Index']
        this[confName + 'Tabs'].push({
          title: newTabTitle,
          name: this[confName + 'Index'] + ''
        })
        this[confName + 'TabsValue'] = this[confName + 'Index'] + ''
      }
      if (action === 'remove') {
        if (this[confName + 'Conf'].length == 1) return
        let tabs = this[confName + 'Tabs']
        let activeName = this[confName + 'TabsValue']
        let removeIndex = tabs.indexOf(activeName)
        this[confName + 'Conf'].splice(removeIndex, 1)
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }we
            }
          });
        }
        this[confName + 'TabsValue'] = activeName;
        this[confName + 'Tabs'] = tabs.filter(tab => tab.name !== targetName)
      }
    }
  }
}