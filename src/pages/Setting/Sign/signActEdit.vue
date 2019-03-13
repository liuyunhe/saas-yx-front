<template>
  <div>
    <menu-conf :menuArr="menuArr" :page="page" @updataPage="updataPage"></menu-conf>
    <el-card :body-style="{padding:'40px'}">
      <!-- <div class="data-module">
        <div class="header">{{nowMonth}}</div>
        <div class="body">
          <div class="item" v-for="(item, i) in weekArr" :key="i">{{item}}</div>
          <div class="item" v-for="(item, i) in days" :key="i"></div>
          <div class="item" v-for="(item, i) in dayArr" :key="i" :style="signDayArr.includes(i + 1) ? activeStyle : {}">{{item}}</div>
        </div>
      </div> -->
      <el-row>
        <el-col :span="8">
          <phone-module v-if="isShow" @changeImg="changeImg" :conf="conf" :page="page"></phone-module>
        </el-col>
        <el-col :span="15" class="ml20">
          <div v-if="page < 7">
              <activity-info :title="conf.title" :desc="conf.description" @titleInput="titleInput" @descInput="descInput" v-if="page == 1 && isShow"></activity-info>
              <activity-image-editor v-if="page > 3 && isShow" :editData="conf.imgObj['page' + page]" type="normal" :itemRepeat = "false" @picChange="editPic"></activity-image-editor>
              <activity-img-page1 @picChange="editPic" v-if="page == 1 && isShow" :imgObj="conf.imgObj.page1" :color="conf.activeStyle" :type="imgType"></activity-img-page1>
          </div>
          <div v-if="page == 7">
            <share-conf v-if="editData" @shareChange="editPic" :shareConf="conf.share" :editData="editData"></share-conf>
          </div>
          <div v-if="page == 8">
            <sign-conf v-if="data.sactBset" :conf="data" @getPrize="getPrize"></sign-conf>
          </div>
        </el-col>
      </el-row>
      <div class="btn mt20">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button plain @click="$router.go(-1)">返回</el-button>
      </div>
    </el-card>
    <el-dialog width="800px" :close-on-click-modal="false" :visible.sync="dialogVisible">
      <dialog-module @getSelectedGoodsArr="getSelectedGoodsArr" @close="close"></dialog-module>
    </el-dialog>
  </div>
</template>
<script>
import menuConf from '@/components/activity/activityMenuConf'
import phoneModule from './components/signPhoneModule'
import activityInfo from '@/components/activity/activityInfo'
import activityImageEditor from '@/components/activity/activityImageEditor'
import img from '@/pages/Market/ActTpl/imageConf'
import shareConf from '@/pages/Market/ActTpl/components/shareConf'
import signConf from './components/signConf'
import dialogModule from './components/dialogModule'
import activityImgPage1 from './components/signImgEdit'
export default {
  props: ['code', 'id'],
  components: {
    menuConf,
    phoneModule,
    activityInfo,
    activityImageEditor,
    shareConf,
    signConf,
    dialogModule,
    activityImgPage1
  },
  data() {
    return {
      menuArr: ['首页', '活动说明页', '我的奖品页面', '中奖页面', '未中奖页面','签到成功弹窗',  '分享', '活动设置'],
      nowMonth: `${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
      weekArr: ['日', '一', '二', '三', '四', '五', '六'],
      page: 1,
      days: null,
      dayArr: [],
      
      signDayArr: [1, 2, 4, 5, 6, 7, 10, 20],
      conf: {
        // form: '',
        // id: '',
        description: '',
        title: '',
        imgObj: {},
        share: {shareTitle: '', shareDesc: ''},
        actCode: '',
        activeStyle: {
          'background': 'rgba(240,203,40,1)',
          'color': '#fff'
        }
      },
      dialogVisible: false,
      imgType: 1,
      editData: [],
      selectedGoodsArr: [],
      data: {},
      sactBset:{
        taskCode: this.code,
        actName: '', // 活动名称
        signNote: '', // 签到规则
        share: null, // 分享：0-不分享；1-分享
        score: null, // 常规-积分
        growth: null, // 常规-成长值
        drawChanceFlg: null, // 是否关联抽奖：0不关联，1关联
        continuSignFlg: null, // 连续签到奖励是否开启：0否, 1是
        initBtImage: 'http://qoss.qrmkt.cn/common/qd/center-sign-btn.png', // 按钮初始图片
        pressBtImage: 'http://qoss.qrmkt.cn/common/qd/center-signEnd-btn.png', // 按钮按下图片
        drawSignDay: null, //累计签到N天可参与抽奖
        pageInfo: ''
      },
      contItems: [
        {
          continuSignDay: null, // 累计签到N天可获得奖励
          extraScore: null, // 额外-获得积分
          extraGrowth: null // 额外-获得成长值
        }
      ],
      isShow: false
    }
  },
  watch: {
    // page(val) {
    //   if (val == 1) {
    //     console.log(this.data.sactBset.pageInfo)
    //     this.data.sactBset.pageInfo ? this.conf = JSON.parse(this.data.sactBset.pageInfo) : ''
    //   }
    // }
  },
  created() {
    this.handleDayNum()
    this.days = new Date(this.nowMonth + '.1').getDay()
    // this.firstStyle['margin-left'] = this.days * 40 + 9 + 'px'
    // console.log(this.conf.imgObj)
    this.getPutDetail()
  },
  methods: {
    getPutDetail() {
      this.$request.post('/sc/saotx/act/bsDetail', {id: this.id}, true, res => {
        if (res.ret === '200000') {
          this.data = res.data
          if (!this.data.contItems) {
            this.data.contItems = []
            this.data.contItems.push(
              {
                continuSignDay: 0,
                extraScore: 0,
                extraGrowth: 0
              } 
            )
          }
          if (!this.data.sactBset) {
            // this.data.sactBset = JSON.parse(JSON.stringify(this.sactBset))
            this.$set(this.data, 'sactBset', JSON.parse(JSON.stringify(this.sactBset)))
          }
          res.data.sactBset.pageInfo ? this.conf = JSON.parse(res.data.sactBset.pageInfo) : this.conf.imgObj = JSON.parse(JSON.stringify(img.img.ACT_SIGN))
          // if (!this.conf) {
          //   this.conf.imgObj = JSON.parse(JSON.stringify(img.img.ACT_SIGN))
          // }
          this.editData.push(this.conf.imgObj.page7.icon)
          this.isShow = true
        }
      })
    },
    editPic(e) {
      let index = e.index || '',
          url = e.url
      if (this.page <= 6) {
        this.conf.imgObj['page' + this.page][index].url = url
      } else if (this.page == 7) {
        this.conf.imgObj.page7.icon.url = url
      }
    },
    getPrize() {
      this.dialogVisible = true
    },
    updataPage(key) {
      this.page = key
    },
    a() {
      this.signDayArr.push(21)
    },
    getSelectedGoodsArr(arr) {
      this.selectedGoodsArr = arr
      this.dialogVisible = false
      let idArr = []
      if (this.data.gameItems && this.data.gameItems.length > 0) {
        this.data.gameItems.forEach(item => {
          idArr.push(item.id)
        })
      }
      this.selectedGoodsArr.map(item => {
        let i = idArr.indexOf(item.id)
        if (i != -1) {
          return this.$message.warning('请不要选择重复的奖品')
        } else {
          if (!this.data.gameItems) {
            this.$set(this.data, 'gameItems', [])
          }
          this.data.gameItems.push({
            orgId: item.orgId,
            gameId: this.code,
            gameName: '',
            productId: item.productId,
            productName: item.productName,
            image: item.image,
            status: item.status,
            probability: 0,
            type: item.giftType,
            score: item.score,
            bingo_image: item.image,
            shopQuantity: item.shopQuantity,
            quantity: null,
            allquantity: 0
          })
        }
      })
    },
    close() {
      this.dialogVisible = false
    },
    handleDayNum() {
      let month = new Date().getMonth() + 1,
          year = new Date().getFullYear(),
          num = 0
      switch (month) {
        case 2:
          if (year % 4 !== 0 || ( year % 100 == 0 && year % 400 !== 0) || year % 3200 == 0) {
            num = 28
          } else {
            num = 29
          }
          break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          num = 31
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          num = 30
          break;
      }
      this.forDay(num)
    },
    changeImg(val) {
      this.imgType = val
    },
    forDay(num) {
      this.dayArr = []
      for (let i = 1; i <= num; i++) {
        this.dayArr.push(i)
      }
      // console.log(this.dayArr)
    },
    titleInput(e) {
      let value = e.value;
      value ? this.conf.title = value : this.conf.title = "";
    },
    descInput (e) {
      let value = e.value;
      value ? this.conf.description = value : this.description = '';
    },
    save() {
      if (this.conf.description == '' || this.conf.title == '') return this.$message.error('首页/模板名称或描述不能为空!')
      if (this.isRepeat(this.data.contItems, 'continuSignDay')) return this.$message.error('连续签到天数不能重复!')
      let jsonStr = JSON.stringify(this.conf)
      this.data.sactBset.pageInfo = jsonStr
      this.$request.post('/sc/saotx/act/saveBSet', this.data, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功')
          setTimeout(() => {
            this.$router.push('/setting/sign')
          }, 1000)
        }
      })
    },
    isRepeat(obj, d) {
      let hash = [],
          flag = false
      obj.forEach((item, i) => {
        if (hash.indexOf(item[d]) == -1) {
          hash.push(item[d])
        } else {
          flag = true
        }
      })
      return flag
    }
  }
}
</script>
<style lang="scss" scoped>
.data-module {
  width: 320px;
  height: 280px;
  // background: #ccc;
  border-radius: 10px;
  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  .body {
    width: 100%;
    height: 240px;
    padding: 20px;
    box-sizing: border-box;
    // display: flex;
    .item {
      float: left;
      width: 22px;
      height: 22px;
      line-height: 24px;
      text-align: center;
      // background: skyblue;
      margin-right: 9px;
      margin-left: 9px;
      margin-bottom: 10px;
      border-radius: 50%;
      color: #606060;
      transition: all 0.2s linear;
    }
  }
  .title {
    font-weight: bold;
  }
}
.btn {
  text-align: center;
}
</style>
