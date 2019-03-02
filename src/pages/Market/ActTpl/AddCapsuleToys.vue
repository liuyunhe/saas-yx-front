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
              <img :src="configItem.egg3ImgUrl" class="egg2" alt="" @click="showEditConIndex = 8">
              <img :src="configItem.egg3ImgUrl" class="egg4" alt="" @click="showEditConIndex = 8">
              <img :src="configItem.egg2ImgUrl" class="egg6" alt="" @click="showEditConIndex = 7">
              <img :src="configItem.egg1ImgUrl" class="egg1" alt="" @click="showEditConIndex = 6">
              <img :src="configItem.egg2ImgUrl" class="egg3" alt="" @click="showEditConIndex = 7">
              <img :src="configItem.egg1ImgUrl" class="egg5" alt="" @click="showEditConIndex = 6">
              <div class="box"><img :src="configItem.boxImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 3"></div>
              <div class="tip"><img :src="configItem.actTip" title="点击编辑" @click="showEditConIndex = 4"alt="" /></div>
              <div class="btn"><img :src="configItem.btnImgUrl" title="点击编辑" @click="showEditConIndex = 5"alt="" /></div>
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
                    <p class="img-title">扭蛋机背景</p>
                    <div class="img-con act-tip-img"><img :src="configItem.boxImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBoxImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 4">
                  <div>
                    <p class="img-title">活动说明</p>
                    <div class="img-con act-tip-img"><img :src="configItem.actTip" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTipImgSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 5">
                  <div>
                    <p class="img-title">抽奖按钮</p>
                    <div class="img-con act-tip-img"><img :src="configItem.btnImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBtnImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 6">
                  <div>
                    <p class="img-title">扭蛋一</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg1ImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg1ImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 7">
                  <div>
                    <p class="img-title">扭蛋二</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg2ImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg2ImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 8">
                  <div>
                    <p class="img-title">扭蛋三</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg3ImgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg3ImgUrlSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 750*1373px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 730*280px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 750*930px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 4">* 图片建议尺寸为 128*103px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 5">* 图片建议尺寸为 371*137px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 6">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 7">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 8">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>

                <div class="edit-game-img" v-if="showEditConIndex == 6">
                  <div>
                    <p class="img-title">扭蛋一开奖：左</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg1left" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg1leftSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 6">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <div class="edit-game-img" v-if="showEditConIndex == 6">
                  <div>
                    <p class="img-title">扭蛋一开奖：右</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg1right" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg1rightSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 6">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <div class="edit-game-img" v-if="showEditConIndex == 7">
                  <div>
                    <p class="img-title">扭蛋二开奖：左</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg2left" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg2leftSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 7">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <div class="edit-game-img" v-if="showEditConIndex == 7">
                  <div>
                    <p class="img-title">扭蛋二开奖：右</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg2right" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg2rightSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 7">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <div class="edit-game-img" v-if="showEditConIndex == 8">
                  <div>
                    <p class="img-title">扭蛋三开奖：左</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg3left" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg3leftSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 8">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
                <div class="edit-game-img" v-if="showEditConIndex == 8">
                  <div>
                    <p class="img-title">扭蛋三开奖：右</p>
                    <div class="img-con act-tip-img"><img :src="configItem.egg3right" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upEgg3rightSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 8">* 图片建议尺寸为 115*115px格式为jpg\bmp\png\gif</p>
              </div>

            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="活动说明页面" name="actDesc" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/huodongshuoming.png"></div>
            </div>
            <div class="footer"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的奖品页面" name="myPrize" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img src="https://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/wodedjiangpin.png"></div>
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
                  <div class="close">X</div>
                  <img class="pic" :src="configItem.drawImgUrl" alt="" style="margin-right: 0">
                  <h3 style="position: absolute;top: 126px;width: 100%">恭喜中奖</h3>
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
                  <div class="img-con" style="height: 148px;line-height: 148px"><img :src="configItem.drawImgUrl" alt=""></div>
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
                  <p class="img-title">按钮:</p>
                  <div class="img-con"><img :src="configItem.drawBtnUrl" alt=""></div>
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
                  <div class="close">X</div>
                  <img class="pic" :src="configItem.cryImgUrl" alt="">
                  <h3 style="position: absolute;top: 126px;width: 100%">很遗憾，未中奖</h3>
                  <img class="prize-btn" :src="configItem.cryBtnUrl" alt="">
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
                  <p class="img-title">图片:</p>
                  <div class="img-con" style="height: 148px;line-height: 148px"><img :src="configItem.cryImgUrl" alt=""></div>
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
                  <p class="img-title">按钮:</p>
                  <div class="img-con"><img :src="configItem.cryBtnUrl" alt=""></div>
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
export default {
  props: ['id', 'edit'],
  data() {
    return {
      activeName: 'home',
      addActParams: {
        conf: '',
        form: 'act-701',
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
      iconUrl: [
          {
            key: 1,
            imgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
            $$hashKey: 'object:378'
          },
          {
            key: 2,
            imgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
            $$hashKey: 'object:379'
          },
          {
            key: 3,
            imgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
            $$hashKey: 'object:380'
          },
          {
            key: 4,
            imgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
            $$hashKey: 'object:381'
          },
          {
            key: 5,
            imgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
            $$hashKey: 'object:382'
          },
          {
            key: 6,
            imgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/egg.png',
            $$hashKey: 'object:383'
          }
        ],
      configItem: {
        title: '',
        description: '',
        headerImgUrl:
          'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-title.jpg',
        bgImgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-bkg3.png',
        actTip:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/hdjn.png',
        boxImgUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/main.png',
        btnImgUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-btn.png',
        egg1ImgUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/ball1.png',
        egg2ImgUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/ball2.png',
        egg3ImgUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/ball3.png',
        egg1left:"http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-egg1-left.png",
        egg1right:"http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-egg1-right.png",
        egg2left:"http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-egg2-left.png",
        egg2right:"http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-egg2-right.png",
        egg3left:"http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-egg3-left.png",
        egg3right:"http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-egg3-right.png",
        awardUrl: [
          {
            imgUrl:
              'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/zhongjiang74@2x.png'
          }
        ],
        drawImgUrl:
          'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-award-pop.png',
        drawBtnUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/niudan-awardBtn.png',
        cryImgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-noaward.png',
        cryBtnUrl:'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/niudan/nd-zxNoAwardBtn.png'
      },
      uploadURL: '/api/saotx/attach/commonAliUpload',
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
        this.$request.post('/api/saotx/acttpl/detail', { id: this.id }, true, res => {
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
        this.$request.post('/api/saotx/act/pubTpl', {actCode: this.edit}, true, res => {
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
    upBtnImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.btnImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传抽奖按钮图片
    upBtnImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.btnImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传扭蛋机背景图片
    upBoxImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.boxImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传扭蛋一图片
    upEgg1ImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg1ImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upEgg1leftSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg1left = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upEgg1rightSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg1right = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传扭蛋二图片
    upEgg2ImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg2ImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upEgg2leftSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg2left = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upEgg2rightSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg2right = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传扭蛋三图片
    upEgg3ImgUrlSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg3ImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upEgg3leftSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg3left = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upEgg3rightSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.egg3right = resule.data.accessUrl)
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
    // 保存进入下一步
    saveActTpl() {
      if (!this.addActParams.name) return this.$message.warning('请输入模板名称')
      this.configItem.title=this.addActParams.name;
      this.configItem.description = this.addActParams.note
      this.addActParams.conf = JSON.stringify(this.configItem)
      if (this.edit) {
        this.$request.post('/api/saotx/act/mpubTpl', this.addActParams, true, res => {
            if (res.ret === '200000') {
              this.$message.success('保存成功')
              this.$router.push('/market/actMgr')
            } else {
              this.$message.error(res.message)
            }
        })
        return
      }
      this.$request.post('/api/saotx/acttpl/saveOrModify', this.addActParams, true, res => {
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
        background: url('http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/937@2x.png')
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
        height: 530px;
        // background-color: red;
        .egg1{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 61px;
          top:228px;
          z-index: 1;
        }
        .egg2{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 94px;
          top:246px;
          z-index: 1;
        }
        .egg3{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 131px;
          top:227px;
          z-index: 1;
        }
        .egg4{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 166px;
          top:242px;
          z-index: 1;
        }
        .egg5{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 187px;
          top:239px;
          z-index: 1;
        }
        .egg6{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 207px;
          top:230px;
          z-index: 1;
        }
        .bg {
          width: 100%;
          height: 100%;
          transition: all 0.2s;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .top {
          position: absolute;
          top: 30px;
          left: 49%;
          transform: translateX(-50%);
          width: 280px;
          height: 122px;
          img {
            width: 100%;
            height: 100%;
            
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
        .box {
        	width:100%;
        	height: 372px;
        	position: absolute;
        	bottom:20px;
        	img {
        		width:100%;
        		height: 100%;
        		object-fit: contain;
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
              transform: translate(220px, 140px);
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              border: 1px solid #fff;
              border-radius: 50%;
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
        background: url('http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/phone-footer@2x.png')
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
          width: 30%;
          height: 130px;
          line-height: 130px;
          text-align: center;
          border: 1px dashed #d9d9d9;
    			border-radius: 6px;
          margin: 0 10px;
        }
        .act-tip-img {
        	height: 100%;
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
              width: 100%;
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
              width: 100%;
            }
          }
        }
        .edit-winning-img {
          display: flex;
          img {
            width: 100%;
          }
        }
        .edit-notWinning-img {
          display: flex;
          .img-con {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
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
  .btn:hover,
  .egg1:hover,
  .egg2:hover,
  .egg3:hover,
  .egg4:hover,
  .egg5:hover,
  .egg6:hover,
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
</style>

