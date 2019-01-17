<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建活动</el-breadcrumb-item>
      <el-breadcrumb-item>模板设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-menu mode="horizontal" :default-active="defaultActive" @select="switchMenu">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">活动预热页</el-menu-item>
      <el-menu-item index="3">活动倒计时</el-menu-item>
      <el-menu-item index="4">活动说明</el-menu-item>
      <el-menu-item index="5">我的奖品</el-menu-item>
      <el-menu-item index="6">中奖页面</el-menu-item>
      <el-menu-item index="7">未中奖页面</el-menu-item>
      <el-menu-item index="8">提示语弹窗</el-menu-item>
      <el-menu-item index="9">分享</el-menu-item>
    </el-menu>
    <el-card :body-style="{padding:'40px'}">
      <el-row>
        <el-col :span="8">
          <phone-model :title="conf.title" :commonImg="conf.commonImg" :shareConf="conf.share" :titleLength="30" :page = "page" :imgData="conf.img"></phone-model>
        </el-col>
        <el-col :span="12">
          <activity-info :title = "conf.title" :desc = "conf.description" @titleInput="titleInput" @descInput="descInput" v-show="page == 1"/>
          <activity-image-editor v-show="page != 4 && page != 5 && page != 9" :editData="editData" :type="editType" :itemRepeat = "itemRepeat" @picChange = "editPic"/>
          <share-conf v-show="page == 9" :editData="editData" :shareConf="conf.share" @shareChange="editPic"></share-conf>
        </el-col>
      </el-row>
      <div class="btn mt20">
        <p>
          是否投放: <el-switch v-model="isPublish"></el-switch>
        </p>
        <el-button size="small" type="primary" @click="saveActTpl">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import img from './imageConf.js'
import phoneModel from './components/redPhoneModel'
import activityInfo from "@/components/activity/activityInfo"
import activityImageEditor from "@/components/activity/activityImageEditor"
import shareConf from './components/shareConf'
export default {
  props: ['id'],
  components: {
    activityInfo,
    activityImageEditor,
    phoneModel,
    shareConf
  },
  data() {
    return {
      defaultActive: "1",
      editData: [],
      editType: "normal",
      itemRepeat: false,   //元素格子是否重复，重复是true， 不重复为false
      page: '1',
      isPublish: true,
      conf : {
        form: 'act-301',
        id: '',
        description: '',
        title: '',
        img: img.img.ACT_HONGBAOYU,
        commonImg: img.commonImg,
        conf: {img: '', commonImg: '', title: '', desc: ''},
        name: '',
        note: '',
        share: {shareTitle: '', shareDesc: ''}
      }
    }
  },
  created() {
    this.getDetail()
    this.editData = [
      this.conf.img.normal.bg,
      this.conf.img.normal.redPacket,
    ]
  },
  methods: {
    getDetail() {
      if (this.id) {
        let conf
        this.$request.post('/api/saotx/acttpl/detail', { id: this.id }, true, res => {
          if (res.ret === '200000') {
              conf = JSON.parse(res.data.conf)
              this.conf.img = JSON.parse(conf.img)
              this.conf.commonImg = JSON.parse(conf.commonImg)
              this.conf.description = res.data.note
              this.conf.title = res.data.name
              this.conf.id = res.data.id
              this.conf.share = JSON.parse(conf.share)
            if (res.data.statusName == '未投放') {
              this.isPublish = false
            } else {
              this.isPublish = true
            }
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.edit) {
        this.$request.post('/api/saotx/act/pubTpl', {actCode: this.edit}, true, res => {
          if (res.ret === '200000') {
            conf = JSON.parse(res.data.conf);
            this.conf.img = JSON.parse(conf.img);
            this.conf.commonImg = JSON.parse(conf.commonImg);
            this.conf.description = res.data.note;
            this.conf.title = res.data.name;
            this.conf.id = res.data.id;
            if (res.data.statusName == '未投放') {
                this.isPublish = false
            } else {
                this.isPublish = true
            }
          } else {
            this.$message.error(res.message)
          }
        })
        }
    },
    switchMenu(key, keyPath) {
      this.page = key
      switch (key) {
        case '1':
          this.editData = [
            this.conf.img.normal.bg,
            this.conf.img.normal.redPacket,
          ]
          break;
        case '2':
          // this.editType = 'rules'
          this.editData = [
            this.conf.img.rules.bg,
            this.conf.img.rules.rulesBtn,
            this.conf.img.rules.btnImg
          ]
          break;
      
        case '3':
          this.editData = [
            this.conf.img.downCount.bg,
            this.conf.img.downCount.num1,
            this.conf.img.downCount.num2,
            this.conf.img.downCount.num3,
          ]
          break;
        case '6':
          this.editData = [
            this.conf.img.tips.winningImg,
            this.conf.img.tips.drawBtn1,
          ]
          break;
        case '7':
          this.editData = [
            this.conf.img.tips.notWinImg,
            this.conf.img.tips.drawBtn1,
          ]
          break;
        case '8':
          this.editData = [
            this.conf.img.tips.tipsImg,
            this.conf.img.tips.tipsBtn1,
            this.conf.img.tips.tipsBtn2,
          ]
          break;
        case '9':
          this.editData = [
            this.conf.img.share.icon
          ]
          break;
      }
    },
    titleInput(e) {
      let value = e.value;
      value ? this.conf.title = value : this.conf.title = ""
    },
    descInput (e) {
        let value = e.value
        value ? this.conf.description = value : this.description = ''
    },
    editPic (e) {
      let index = e.index || '', 
          url = e.url
      if(!url) return
      switch (this.page) {
        case '1':
          this.conf.img['normal'][index].url = url
          this.editData[0].url = url
          break;
        case '2':
          this.conf.img['rules'][index].url = url
          break;
        case '3':
          this.conf.img['downCount'][index].url = url
          break;
        case '6':
        case '7':
        case '8':
          this.conf.img['tips'][index].url = url
          break;
        case '9':
          this.conf.img['share']['icon'].url = url
          break;
      }
    },
    saveActTpl() {
      if (!this.conf.title) return this.$message.warning('请输入模板名称')
      this.conf.conf.img = JSON.stringify(this.conf.img)
      this.conf.conf.commonImg = JSON.stringify(this.conf.commonImg)
      this.conf.conf.title = this.conf.title
      this.conf.conf.desc = this.conf.desc
      this.conf.conf['share'] = JSON.stringify(this.conf.share)
      this.conf.conf = JSON.stringify(this.conf.conf)
      this.conf.name = this.conf.title
      this.conf.note = this.conf.description
      this.$request.post('/api/saotx/acttpl/saveOrModify', this.conf, true, res => {
        if (res.ret === '200000') {
          // 投放
          if (this.isPublish) {
            // 跳到活动基本信息页
            this.$router.push('/market/actTpl/actSetConf?form=' + res.data.form + '&tplCode=' + res.data.tplCode)
          } else {
            // 不投放
            // 跳到活动模板
            this.$router.push('/market/actTpl')
          }
          this.$message.success('保存成功!')
          return
        }
        this.$message.error(res.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  padding: 0 30px;
}
.btn {
  text-align: center;
}
</style>

