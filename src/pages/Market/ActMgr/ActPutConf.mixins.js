export default {
  props: ['id', 'actCode'],
  data() {
    return {
      act: {
        id: '',
        actCode: ''
      },
      strategyArr: [{
        areas: {},
        awaeArr: [],
        brandArr: [],
        snArr: [],
        tfType: ''
      }],
      awaeArr: [{
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
      }],
      defaultAwae: {
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
      editableTabsValue: '1',
      editableTabs: [{
        title: '常规奖项1',
        name: '1'
      }],
      prizeTypeArr: [
        [{
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
            type: '4'
          }
        ]
      ],
      prizeType: [{
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
          type: '4'
        }
      ],
      tabIndex: 1,
      selectBrand: [],
      selectSonBrand: [],
      selectProvList: [],
      oldSlectProvList: ['1'], // 给个默认值 不然会报错
      selectCityList: [],
      oldSelectCityList: ['1'],
      selectAreaList: [],
      oldSelectAreaList: ['1'],
      brandList: [],
      brandSonList: [],
      provList: [],
      cityList: [],
      areaList: [],
      regionVisible: false,
      brandVisible: false,
      specialRuleConfFlag: false,
      prizeLimitFlag: false,
      isPut: false,
      isDisabled: false
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
            code: 'all',
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
      if (val.includes('all')) this.selectProvList = allValue
      // 取消全部选择
      if (oldVal.includes('all') && !val.includes('all')) this.selectProvList = []
      // 全选之后取消单个
      if (oldVal.includes('all') && val.includes('all')) {
        // 全选也跟着取消
        const index = val.indexOf('all')
        val.splice(index, 1)
        this.selectProvList = val
      }
      // 全选未选 其它全部选上 则全选选上(上次和当前都没有全选)
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allValue.length - 1) {
          this.selectProvList = ['all'].concat(val)
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
              code: 'all',
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
      if (val.includes('all')) this.selectCityList = allValue
      if (oldVal.includes('all') && !val.includes('all')) this.selectCityList = []
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1)
        this.selectCityList = val
      }
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allValue.length - 1) {
          this.selectCityList = ['all'].concat(val)
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
              code: 'all',
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
      if (val.includes('all')) this.selectAreaList = allValue
      if (oldVal.includes('all') && !val.includes('all')) this.selectAreaList = []
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1)
        this.selectAreaList = val
      }
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allValue.length - 1) {
          this.selectAreaList = ['all'].concat(val)
        }
      }
      this.oldSelectAreaList[1] = this.selectAreaList
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        if (this.awaeArr.length == 10) return
        // 深拷贝 防止数据相互串通
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        this.awaeArr.push(newAwae)
        this.prizeTypeArr.push(this.prizeTypeArr[0])
        let newTabTitle = '常规奖项' + ++this.tabIndex
        this.editableTabs.push({
          title: newTabTitle,
          name: this.tabIndex + ''
        })
        this.editableTabsValue = this.tabIndex + ''
      }
      if (action === 'remove') {
        if (this.awaeArr.length == 1) return
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        let removeIndex = tabs.indexOf(activeName)
        this.awaeArr.splice(removeIndex, 1)
        this.prizeTypeArr.splice(removeIndex, 1)
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    }
  }
}