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
              <div class="title-bg"><img :src="configItem.headerImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 2"></div>
              <div class="tip"><img :src="configItem.actTip" title="点击编辑" @click="showEditConIndex = 4"alt="" /></div>
              <div class="btn-active" @click="showEditConIndex = 5">
                <img :src="configItem.countBg" title="点击编辑"  alt="">
                <div>倒计时 : 60S</div>
              </div>
              <div class="food" ><img :src="configItem.food" title="点击编辑" alt="" @click="showEditConIndex = 3"/></div>
              <div class="food pos1" ><img :src="configItem.food" title="点击编辑" alt="" @click="showEditConIndex = 3"/></div>
              <div class="food pos2" ><img :src="configItem.food" title="点击编辑" alt="" @click="showEditConIndex = 3"/></div>
              <div class="food pos3" ><img :src="configItem.food" title="点击编辑" alt="" @click="showEditConIndex = 3"/></div>
              <div class="food pos4" ><img :src="configItem.food" title="点击编辑" alt="" @click="showEditConIndex = 3"/></div>
              <div class="boat"><img :src="configItem.boat" title="点击编辑" @click="showEditConIndex = 6" alt=""></div>
              <div class="leftArrow"><img :src="configItem.leftArrow" title="点击编辑" @click="showEditConIndex = 7" alt=""></div>
              <div class="rightArrow"><img :src="configItem.rightArrow" title="点击编辑" @click="showEditConIndex = 8" alt=""></div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-form :model="addActParams" :rules="addActRules" ref="ruleForm" label-width="100px" label-position="top">
              <el-form-item label="模板名称" prop="name">
                <el-input v-model="addActParams.name" placeholder="请输入模板名称"maxLength='15'></el-input>
              </el-form-item>
              <el-form-item label="销区：" prop="saleZoneCode">
                <el-select size="small" v-model="addActParams.saleZone" placeholder="请选择" clearable>
                  <el-option
                      v-for="(item,index) in saleZone"
                      :key="index"
                      :label="item.zoneName"
                      :value="item.zoneCode">
                  </el-option>
                </el-select>
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
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'bgImgUrl')}" :show-file-list="false">
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
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'headerImgUrl')}" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 3">
                  <div>
                    <p class="img-title">莲藕图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 113px;line-height: 113px"><img :src="configItem.food" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'food')}" :show-file-list="false">
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
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'actTip')}" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 5">
                  <div>
                    <p class="img-title">倒计时背景:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.countBg" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'countBg')}" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 6">
                  <div>
                    <p class="img-title">小船图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.boat" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'boat')}" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                  <p class="tips">* 图片建议尺寸为 300*290px格式为jpg\bmp\png\gif</p>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 7">
                  <div>
                    <p class="img-title">左箭头图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px;background: gainsboro;"><img :src="configItem.leftArrow" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'leftArrow')}" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                  <p class="tips">* 图片建议尺寸为 110*110px格式为jpg\bmp\png\gif</p>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 8">
                  <div>
                    <p class="img-title">右箭头图片:</p>
                    <div class="img-con act-tip-img" style="width: 100px;height: 100px;line-height: 100px;background: gainsboro;"><img :src="configItem.rightArrow" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'rightArrow')}" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                  <p class="tips">* 图片建议尺寸为 110*110px格式为jpg\bmp\png\gif</p>
                </div>

                <p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 750*1600px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 592*184px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 87*118px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 4">* 图片建议尺寸为 140*60px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 5">* 图片建议尺寸为 233*58px格式为jpg\bmp\png\gif</p>
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
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'shareImgUrl')}" :show-file-list="false">
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
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'shareBtnUrl')}" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 448*100px格式为jpg\bmp\png\gif</p>
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
                  <img src="http://qrmkt.oss-cn-beijing.aliyuncs.com/saas_platform/common/model-gift.png" alt=""
                       style="position: absolute;width: 94px;height: 77px;left: 50%;transform: translateX(-50%);top: 180px">
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
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'drawImgUrl')}" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 663*754px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-winning-img">
                  <p class="img-title">按钮图片:</p>
                  <div class="img-con" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.drawBtnUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'drawBtnUrl')}" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 312*95px格式为jpg\bmp\png\gif</p>
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
                  <div style="width: 100%;height: 20px;color:#fff;line-height: 20px;text-align: center;position: absolute;left: 0;top: 275px">未中奖</div>
                  <img class="prize-btn" style="width: 112px;;top: 300px" :src="configItem.cryBtnUrl" alt="">
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
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'cryImgUrl')}" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 663*754px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">按钮图片:</p>
                  <div class="img-con" style="width: 100px;height: 100px;line-height: 100px"><img :src="configItem.cryBtnUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="(res)=>{upLoadImgSuccess(res,'cryBtnUrl')}" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 312*95px格式为jpg\bmp\png\gif</p>
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
        form: 'act-113',
        id: '',
        name: '',
        note: '',
        saleZone: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode')
      },
      saleZone:[],
      addActRules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { max: 15, message: '长度不能超过 15 个字符', trigger: 'blur' }
        ]
      },
      extInfo:{
        winPert:0
      },
      ballonIndex:"",
      configItem: {
        title: '',
        description: '',
        headerImgUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/banner.png',
        bgImgUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/bg.png',
        actTip:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/tips.png',
        food:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/food.png',
        countBg:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/count-bg.png',
        boat:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/boat.png',
        leftArrow:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/left-arrow.png',
        rightArrow:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/right-arrow.png',

        drawImgUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/award-pop.png',
        drawBtnUrl:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/award-btn.png',
        cryImgUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/nolucky-bg.png',
        cryBtnUrl:'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/nolucky-btn.png',
        shareImgUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/yr-bg.png',
        shareBtnUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/share-btn-img.png',
        shareIconUrl: 'https://qrmkt.oss-cn-beijing.aliyuncs.com/common/boating/share-icon.png',
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
    this.getSaleZone()
  },
  methods: {
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
        if (res.code == '200') {
          this.saleZone = res.data || []
        }
      })
    },
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
    // 获取点击的游戏区域图片的索引
    getGameIndex(index) {
      this.gameIndex = index
    },
    upLoadImgSuccess(resule,name) {
      if (resule.ret === '200000')
        return (this.configItem[name] = resule.data.accessUrl)
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
          position: absolute;
          top: 0;
          left: 0;
          img {
            width: 100%;
          }
        }
        .title-bg{
          width: 237px;
          height: 74px;
          position: absolute;
          top: 29px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 39;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .top {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 134px;
          height: 26px;
          z-index: 49;
        }
        .tip {
        	width:56px;
        	height: 24px;
        	position: absolute;
        	right:2px;
        	top:8px;
          z-index: 59;
        	img {
        		width:100%;
        		height: 100%;
        		object-fit: contain;
        	}
        }
        .food {
        	width:35px;
        	height: 47px;
        	position: absolute;
        	top:185px;
          left: 142px;
          z-index: 99;
          &.pos1{
            top:234px;
            left: 46px;
          }
          &.pos2{
            top:240px;
            left: 246px;
          }
          &.pos3{
            top:350px;
            left: 48px;
          }
          &.pos4{
            top:374px;
            left: 246px;
          }
        	img {
        		width:100%;
        		height: 100%;
        		object-fit: contain;

        	}
        }
        .btn-active{
          position: absolute;
          width: 93px;
          height: 23px;
          top: 105px;
          left: 109px;
          color: white;
          line-height: 23px;
          font-size: 10px;
          text-align: center;
          img{
            position: absolute;
            width:100%;
            height: 100%;
            object-fit: contain;
            left: 0;
            right: 0;
          }
          div{
            position: absolute;
            width:100%;
            height: 100%;
          }
        }
        .leftArrow{
          width:44px;
          height:44px;
          position: absolute;
          top:420px;
          left: 81px;
          z-index: 109;
          img {
            width:100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .boat{
          width:100px;
          height: 95px;
          position: absolute;
          top:350px;
          left: 100px;
          z-index: 99;
          img {
            width:100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .rightArrow{
          width:44px;
          height:44px;
          position: absolute;
          top:420px;
          right: 81px;
          z-index: 99;
          img {
            width:100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .hook{
          position: relative;
          left: 50%;
          top: -108.8px;
          transform: translateX(-50%);
          width: 96px;
          height: 283.2px;
          z-index: 9;
          .hookPole{
            width: 32px;
            height: 233.2px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0px;
            z-index: 29;
            img {
              width:100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .hookLeft{
            position: absolute;
            width: 55px;
            height: 83px;
            left: 0;
            bottom: 0;
            z-index: 19;
            transform-origin: top right;
            img {
              width:100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .hookRight{
            position: absolute;
            width: 54px;
            height: 80px;
            right: 0;
            bottom: 0;
            z-index: 19;
            transform-origin: top left;
            img {
              width:100%;
              height: 100%;
              object-fit: contain;
            }
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
              margin-top: 115px;
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
  .food:hover,
  .leftArrow:hover,
  .boat:hover,
  .rightArrow:hover,
  .title-bg:hover,
  .food:hover,
  .btn-active:hover,
  .hook:hover{
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .title-bg:hover,.top:hover,.btn:hover,.hook:hover {
    transform: translateX(-50%) scale(0.99);
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
    width: 182px;
    height: 35px;
    top: 415px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
