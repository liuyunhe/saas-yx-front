<template>
  <!--
  Author: chenxin
  Create Date: 2018-10-18
  Description: 新建活动模板
  -->
  <div class="addActTamConf-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动</el-breadcrumb-item>
      <el-breadcrumb-item>活动模板配置</el-breadcrumb-item>
      <el-breadcrumb-item>模板设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="首页" name="home" class="clearfix">
          <div class="ipone">
            <div class="header">
              <p>{{addActParams.name}}</p>
            </div>
            <div class="content phone">
              <div class="bg"><img :src="configItem.bgImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 1"></div>
              <div class="top"><img :src="configItem.headerImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 2"></div>
              <div class="clock" @click="showEditConIndex = 3"><img :src="configItem.clockImgUrl" title="点击编辑" alt="" /></div>
              <div class="tip"><img :src="configItem.actTip" title="点击编辑" @click="showEditConIndex = 4"alt="" /></div>
              <div
                v-for="(item,index) in configItem.balloonImgUrl"
                class="balloon"
                :class="`ps-${index + 1}`"
                title="点击编辑"
                @click="showEditConIndex = 5;ballonIndex = index"
              >
                <img :src="item.src" alt="">
              </div>
              <div class="star"><img :src="configItem.starImgUrl" title="点击编辑" @click="showEditConIndex = 6" alt=""></div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-form :model="addActParams" :rules="addActRules" ref="ruleForm" label-width="100px" label-position="top">
              <el-form-item label="模板名称" prop="name">
                <el-input v-model="addActParams.name" placeholder="请输入模板名称"maxLength='15'></el-input>
              </el-form-item>
              <el-form-item label="模板说明">
                <el-input type="textarea" :rows="3" v-model="addActParams.note"maxLength='20' placeholder="请输入模板描述" maxlength="50" resize="none"></el-input>
              </el-form-item>
            </el-form>
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-bg-img" v-if="showEditConIndex == 1">

                  <p class="img-title">背景图片:</p>
                  <div class="img-con"><img :src="configItem.bgImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBgImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                  <el-popover
                      placement="right-end"
                      title="背景图片说明"
                      width="300"
                      trigger="hover">
                    <img src="http://qoss.qrmkt.cn/common/ddshu/act_tpl_tip.png" width="300" alt="">
                    <!--<el-button slot="reference">?</el-button>-->
                    <div class="tip" slot="reference">?</div>
                  </el-popover>

                </div>
                <div class="edit-top-img" v-if="showEditConIndex == 2">
                  <p class="img-title">活动标题:</p>
                  <div class="img-con"><img :src="configItem.headerImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTopImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 3">
                  <div>
                    <p class="img-title">时间背景:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 113px;line-height: 113px"><img :src="configItem.clockImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upClockImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 4">
                  <div>
                    <p class="img-title">活动说明:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.actTip" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTipImgSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>

                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 5">
                  <div>
                    <p class="img-title">气球图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.balloonImgUrl[ballonIndex].src" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBalloonUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                  <p class="tips" v-if="showEditConIndex == 5">* 图片建议尺寸为 105*105px格式为jpg\bmp\png\gif</p>
                  <div>
                    <p class="img-title">击中图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.balloonImgUrl[ballonIndex].broken" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBalloonBrokenUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 6">
                  <div>
                    <p class="img-title">飞镖图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.starImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upStarImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>

                </div>

                <div class="edit-game-img" v-if="showEditConIndex == 7">
                  <div>
                    <p class="img-title">锤子图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.hammerUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upHammerUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>

                <p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 750*1600px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 696*194px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 120*96px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 4">* 图片建议尺寸为 108*100px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 5">* 图片建议尺寸为 213*136px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 6">* 图片建议尺寸为 44*123px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 7">* 图片建议尺寸为 130*124px格式为jpg\bmp\png\gif</p>
              </div>

            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="活动预热页" name="warm" class="clearfix">
          <div class="ipone">
            <div class="header">
              <p>{{addActParams.name}}</p>
            </div>
            <div class="content phone warm">
              <img :src="configItem.shareImgUrl" alt="">
              <img :src="configItem.shareBtnUrl" alt="">
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-winning">
                  <p class="img-title">背景图片:</p>
                  <div class="img-con"><img style="max-width: 100%; max-height: 100%" :src="configItem.shareImgUrl" alt=""></div>
                  <div class="btn-con" style="display: inline-block">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upShareBgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 750*1600px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-winning">
                  <p class="img-title">按钮图片:</p>
                  <div class="img-con center"><img style="max-width: 100%; max-height: 100%" :src="configItem.shareBtnUrl" alt=""></div>
                  <div class="btn-con" style="display: inline-block">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upShareBtnSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 448*240px格式为jpg\bmp\png\gif</p>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="活动说明页面" name="actDesc" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img src="http://qoss.qrmkt.cn/new_platform/pc_front/huodongshuoming.png"></div>
            </div>
            <div class="footer"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的奖品页面" name="myPrize" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img src="http://qoss.qrmkt.cn/new_platform/pc_front/wodedjiangpin.png"></div>
            </div>
            <div class="footer"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="中奖页面" name="winning" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg" style="background-color: #111;opacity: .7;"></div>
              <div class="winning">
                <div class="prize-con">
                  <div class="close"><img src="http://qoss.qrmkt.cn/new_platform/close_icon.png" alt=""></div>
                  <img class="pic" :src="configItem.drawImgUrl" alt="" style="margin-right: 0">
                  <p style="position: absolute;top: 265px;width: 100%;font-size: 10px;">请在24小时内领取</p>
                  <p style="position: absolute;top: 245px;width: 100%;font-size: 14px;">1.05红包+50积分</p>
                  <img class="prize-btn" :src="configItem.drawBtnUrl" alt="">
                </div>
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-winning-img">
                  <p class="img-title">中奖图片:</p>
                  <div class="img-con" style="width: 100px;height: 113px;line-height: 113px"><img :src="configItem.drawImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upDrawImgUrlSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-winning-img">
                  <p class="img-title">按钮图片:</p>
                  <div class="img-con" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.drawBtnUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upWinningBtnSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未中奖页面" name="notWinning" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg" style="background-color: #111;opacity: .7;"></div>
              <div class="not-winning">
                <div class="prize-con">
                  <div class="close"><img src="http://qoss.qrmkt.cn/new_platform/close_icon.png" alt=""></div>
                  <img class="pic" :src="configItem.cryImgUrl" alt="">
                  <div style="width: 100%;height: 20px;color:#5FC54D;line-height: 20px;text-align: center;position: absolute;left: 0;top: 285px">未中奖</div>
                  <img class="prize-btn" style="width: 112px;height: 24px;top: 315px" :src="configItem.cryBtnUrl" alt="">
                </div>
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">弹窗图片:</p>
                  <div class="img-con" style="width: 100px;height: 113px;line-height: 113px"><img :src="configItem.cryImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">按钮图片:</p>
                  <div class="img-con" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.cryBtnUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningBtnSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分享" name="share" class="clearfix">
          <div class="ipone" style="display: inline-block">
            <div class="header">
              <p>{{addActParams.name}}</p>
            </div>
            <div class="content phone share">
              <div class="text">
                <h3 class="title" v-html="configItem.share.shareTitle ? configItem.share.shareTitle : '扫码验真'"></h3>
                <div class="desc" v-html="configItem.share.shareDesc ? configItem.share.shareDesc : '扫码验真精彩送不停，更多好礼等你拿！'"></div>
                <div class="img"><img :src="configItem.shareIconUrl"></div>
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <share-conf style="width: 50%; display: inline-block" :editData="[{url: configItem.shareIconUrl}]" :shareConf="configItem.share" @shareChange="editPic"></share-conf>
        </el-tab-pane>
        <div class="btn">
          <p>是否投放: <el-switch v-model="isPut">
            </el-switch>
          </p>
          <el-button size="small" type="primary" @click="saveActTpl">保存</el-button>
        </div>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import shareConf from './components/shareConf'
export default {
  props: ['id', 'edit'],
  components: {
    shareConf
  },
  data() {
    return {
      activeName: 'home',
      addActParams: {
        conf: '',
        form: 'act-703',
        id: '',
        name: '',
        note: ''
      },
      addActRules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { max: 15, message: '长度不能超过 15 个字符', trigger: 'blur' }
        ]
      },
      ballonIndex:"",
      configItem: {
        title: '',
        description: '',
        headerImgUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/dqiqiu-title.png',
        bgImgUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-bg.png',
        actTip:'http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-tips.png',
        clockImgUrl:'http://qoss.qrmkt.cn/common/dqiqiu/clock.png',
        balloonImgUrl:[
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-red.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-red3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-blue.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-blue3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-yellow.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-yellow3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-blue.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-blue3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-red.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-red3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-green.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-green3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-blue.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-blue3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-green.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-green3.png"},
          { src:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-red.png",
            broken:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-balloon-red3.png"},
        ],
        starImgUrl:"http://qoss.qrmkt.cn/common/dqiqiu/daqiqiu-fb.png",
        drawImgUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/award-pop.png',
        drawBtnUrl:'http://qoss.qrmkt.cn/common/dqiqiu/award-btn.png',
        cryImgUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/dqiqiu-nolucky.png',
        cryBtnUrl:'http://qoss.qrmkt.cn/common/dqiqiu/nolucky-btn.png',
        shareImgUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/share-bg-img.png',
        shareBtnUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/share-btn-img.png',
        shareIconUrl: 'http://qoss.qrmkt.cn/common/dqiqiu/share-icon.png',
        share: {shareTitle: '', shareDesc: ''}
      },
      uploadURL: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      gameIndex: null, // 游戏区域图片索引
      showEditConIndex: 1, // 显示图片编辑器的序号
      isPut: true // 是否投放 默认投放
    }
  },
  computed: {},
  created() {
    this.getActDetail()
  },
  methods: {
    getActDetail() {
      if (this.id) {
        this.$request.post('/api/wiseqr/acttpl/detail', { id: this.id }, true, res => {
          if (res.ret === '200000') {
            this.addActParams = res.data
            this.configItem = JSON.parse(res.data.conf)
            if (res.data.statusName == '未投放') {
              this.isPut = false
            } else {
              this.isPut = true
            }
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.edit) {
        this.$request.post('/api/wiseqr/act/pubTpl', {actCode: this.edit}, true, res => {
            if (res.ret === '200000') {
            this.addActParams = res.data
            this.addActParams.name = JSON.parse(res.data.conf).title
            this.addActParams.note = JSON.parse(res.data.conf).description
            // this.defaultConf = JSON.parse(res.data.conf)
            this.configItem = JSON.parse(res.data.conf)
            if (res.data.statusName == '未投放') {
                this.isPut = false
            } else {
                this.isPut = true
            }
            } else {
            this.$message.error(res.message)
            }
        })
      }
    },
    // 上传背景
    upBgImgSuccess(resule) {
      console.log(resule)
      if (resule.ret === '200000') return (this.configItem.bgImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传头部标题
    upTopImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.headerImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 获取点击的游戏区域图片的索引
    getGameIndex(index) {
      this.gameIndex = index
    },
    // 上传活动锦囊图片
    upTipImgSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.actTip = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传抽奖按钮图片
    upBalloonUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.balloonImgUrl[this.ballonIndex].src = resule.data.accessUrl)
      this.$message.error(resule.message)
    },

    upClockImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.clockImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upStarImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.starImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upBalloonBrokenUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.balloonImgUrl[this.ballonIndex].broken = resule.data.accessUrl)
      this.$message.error(resule.message)
    },

    upHammerUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.hammerUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },

    // 上传未中奖图片
    upNotWinningImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.cryImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传未中奖按钮图片
    upNotWinningBtnSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.cryBtnUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传中奖图片
    upDrawImgUrlSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.drawImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传中奖按钮图片
    upWinningBtnSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.drawBtnUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upShareBgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.shareImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upShareBtnSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.shareBtnUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 分享图标上传
    editPic(e) {
      let url = e.url
      this.configItem.shareIconUrl = url
    },
    // 保存进入下一步
    saveActTpl() {
      if (!this.addActParams.name) return this.$message.warning('请输入模板名称')
      this.configItem.title=this.addActParams.name;
      this.configItem.description = this.addActParams.note
      this.addActParams.conf = JSON.stringify(this.configItem)
      if (this.edit) {
        this.$request.post('/api/wiseqr/act/mpubTpl', this.addActParams, true, res => {
            if (res.ret === '200000') {
              this.$message.success('保存成功')
              this.$router.push('/market/actMgr')
            } else {
              this.$message.error(res.message)
            }
        })
        return
      }
      this.$request.post('/api/wiseqr/acttpl/saveOrModify', this.addActParams, true, res => {
        if (res.ret === '200000') {
          // 投放
          if (this.isPut) {
            // 跳到活动基本信息页
            this.$router.push(
              '/market/actTpl/actSetConf?form=' + res.data.form + '&tplCode=' + res.data.tplCode
            )
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
.el-tabs {
  padding: 0 20px;
  .el-tab-pane {
    padding: 30px;
    .ipone {
      float: left;
      width: 299px;
      margin: 0 20px;
      .header {
        position: relative;
        width: 100%;
        height: 66px;
        background: url('https://qoss.qrmkt.cn/new_platform/pc_front/937@2x.png')
          center no-repeat;
        p {
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          color: #fff;
          margin: 0;
        }
      }
      .phone {
      	position: relative;
      }
      .content {
        position: relative;
        width: 100%;
        height: 480px;
        // background-color: red;
        overflow: hidden;
        .bg {
          width: 100%;
          height: 100%;
          transition: all 0.2s;
          img {
            width: 100%;
          }
        }
        .top {
          position: absolute;
          top: 62px;
          left: 50%;
          transform: translateX(-50%);
          width: 278px;
          height: 78px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .star{
          position: absolute;
          top: 439px;
          left: 166px;
          width: 18px;
          height: 49px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        @mixin balloon {
         position: absolute;
         width: 42px;
         height: 42px;
         z-index: 99;
         img {
           width: 100%;
           height: 100%;
         }
        }
        @for $i from 1 through 9{
          @if $i%3 == 1{
            .ps-#{$i}{
              @include balloon;
              left: 74px;
              top:173px + (($i)-1)/3*42px;
            }
          }
          @else if $i%3 == 2{
            .ps-#{$i}{
              @include balloon;
              left: 126px;
              top: 173px + (($i)-2)/3*42px;
            }
          }
          @else {
            .ps-#{$i}{
              @include balloon;
              left: 178px;
              top: 173px + (($i)-3)/3*42px;
            }
          }

        }
        .tip {
        	width:45px;
        	height: 45px;
        	position: absolute;
        	right:5px;
        	top:5px;
        	img {
        		width:100%;
        		height: 100%;
        		object-fit: contain;
        	}
        }
        .clock {
        	width:48px;
        	height: 38px;
        	position: absolute;
        	top:118px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 99;
        	img {
        		width:100%;
        		height: 100%;
        		object-fit: contain;

        	}
          &:after{
            content: "30s";
            width: 48px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            font-weight: bolder;
            display: block;
            color: #ffffff;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .btn {
        	width:140px;
          height: 56px;
        	position: absolute;
        	bottom:70px;
          left: 50%;
          transform: translateX(-50%);
        	img {
        		width:100%;
        		height: 100%;
        		object-fit: contain;
        	}
        }
        .game-con {
          position: absolute;
          left: 0;
          bottom: 42px;
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          .game-item {
            width: 33%;
            height: 50%;
            text-align:center;
            img {
              width: 70%;
              height: 100%;
            }
          }
        }
        .winning,
        .not-winning {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          .prize-con {
            width: 100%;
            height: 100%;
            color: #fff;
            text-align: center;
            .close {
              position: absolute;
              transform: translate(137px, 380px);
              width: 26px;
              height: 26px;
              line-height: 26px;
              text-align: center;
              img{
                width: 26px;
              }
            }
            .pic {
              max-width: 196px;
              // max-height: 200px;
              margin-top: 130px;
              margin-right: 20px;
            }
            p {
              color: #fff;
            }
            .prize-btn {
              position: absolute;
              top: 300px;
              left: 50%;
              transform: translateX(-50%);
              max-width: 138px;
              max-height: 34px;
            }
          }
        }
        .not-winning {
          .prize-con {
            .pic {
              margin-right: 0;
            }
          }
        }
      }
      .footer {
        width: 100%;
        height: 64px;
        background: url('https://qoss.qrmkt.cn/new_platform/pc_front/phone-footer@2x.png')
          center no-repeat;
      }
    }
    .edit-box {
      float: left;
      width: 50%;
      margin: 0 20px;
      .edit-con {
        // 公共样式
        .img-con {
          width: 100px!important;
          height: 100px!important;
          line-height: 100px!important;
          text-align: center;
          border: 1px dashed #d9d9d9;
    			border-radius: 6px;
          margin: 0 10px;
        }
        .act-tip-img {

        }
        .edit-winning{
          display: flex;
        }
        .btn-con {
          position: relative;
          .el-button {
            position: absolute;
            bottom: 0;
          }
        }
        .edit-bg-img {
          display: flex;
          position: relative;
          .tip{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #999;
            color: #999;
            line-height: 20px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 210px;
            font-size: 12px;
            transform: none;
            &:hover{
              border-color: #409EFF;
              color: #409EFF;
              box-sizing: content-box;
            }
            &:active{
              border-color: #409EFF;
              color: #409EFF;
            }
          }
          img {
            align-items: center;
            height: 100%;
          }
        }
        .edit-top-img {
          display: flex;
          .img-con {
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
        .edit-game-img > div {
          display: flex;
          margin-bottom: 10px;
          .img-con {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
        .edit-winning-img {
          display: flex;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .edit-notWinning-img {
          display: flex;
          .img-con {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
      .tips {
        color: #999;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
// 只有首页有效果
.el-tabs .el-tab-pane:first-child {
  .bg:hover,
  .tip:hover,
  .top:hover,
  .clock:hover,
  .balloon:hover,
  .star:hover,
  .box:hover{
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .top:hover,.btn:hover {
    transform: translateX(-50%) scale(0.99);

  }
  .clock:hover{
    transform: translateX(-50%) scale(1);
  }
  @for $i from 1 through 9 {
    .hole-#{$i}:hover{
      transform: scale(0.99);
      cursor: pointer;
      filter: brightness(60%);
      border: 2px dotted #fff;
      box-sizing: border-box;
    }
  }
}
.btn {
  text-align: center;
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .el-button {
    width: 130px;
    height: 40px;
  }
}
.share {
  background: url('http://qoss.qrmkt.cn/new_platform/red_share_bg.png') no-repeat center / 100% 100%;
  .text {
    position: absolute;
    top: 66px;
    left: 56px;
    width: 208px;
    height: 66px;
    color: #333;
    padding: 8px;
    box-sizing: border-box;
  }
  .title {
    margin: 0;
    font-size: 14px;
  }
  .desc {
    margin: 0;
    width: 150px;
    height: 32px;
    font-size: 12px;
    color: #898989;
    word-wrap: break-word;
    word-break: break-all;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .img {
    position: absolute;
    top: 18px;
    right: 6px;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.warm {
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
  }
  img:nth-child(1) {
    left: 0;
    top: 0;
    width: 100%;
  }
  img:nth-child(2) {
    top: 324px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 96px;
  }
}
.center {
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

