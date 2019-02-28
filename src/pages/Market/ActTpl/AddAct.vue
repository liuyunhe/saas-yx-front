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
            <div class="content">
              <div class="bg"><img :src="configItem.bgImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 1"></div>
              <div class="top"><img :src="configItem.headerImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 2"></div>
              <div class="kits"><img :src="configItem.kitsUrl" alt="" title="点击编辑" @click="showEditConIndex = 3" ></div>
              <div class="game-con">
                <div class="game-item" v-for="item in configItem.iconUrl" :key="item.key" @click="showEditConIndex = 4"><img :src="item.imgUrl" alt=""></div>
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-form :model="addActParams" :rules="addActRules" ref="ruleForm" label-width="100px" label-position="top">
              <el-form-item label="模板名称" prop="name">
                <el-input v-model="addActParams.name" placeholder="请输入模板名称"></el-input>
              </el-form-item>
              <el-form-item label="模板说明">
                <el-input type="textarea" :rows="3" v-model="addActParams.note" placeholder="请输入模板描述" maxlength="50" resize="none"></el-input>
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
                    <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upBgImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-top-img" v-if="showEditConIndex == 2">
                  <p class="img-title">活动标题:</p>
                  <div class="img-con"><img :src="configItem.headerImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upTopImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-kits-img" v-if="showEditConIndex == 3">
                  <p class="img-title">活动锦囊:</p>
                  <div class="img-con"><img :src="configItem.kitsUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upKitsImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 4">
                  <div v-for="(item, index) in configItem.iconUrl" :key="item.key">
                    <p class="img-title">{{'钻石' + (index + 1) + ':'}}</p>
                    <div class="img-con"><img :src="item.imgUrl" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upGameImgSuccess" :show-file-list="false">
                        <el-button size="small" type="primary" @click="getGameIndex(index)">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 750*1208px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
                <p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 700*350px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
                <p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 120*120px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
                <p class="tips" v-if="showEditConIndex == 4">* 图片建议尺寸为 186*162px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
              </div>

            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="活动说明页面" name="actDesc" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img src="https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/huodongshuoming.png"></div>
            </div>
            <div class="footer"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的奖品页面" name="myPrize" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img src="https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/wodedjiangpin.png"></div>
            </div>
            <div class="footer"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="中奖页面" name="winning" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img :src="configItem.bgImgUrl"></div>
              <div class="winning">
                <div class="prize-con">
                  <div class="close">X</div>
                  <img class="pic" :src="configItem.drawImgUrl" alt="">
                  <h3>奖品名称</h3>
                  <p>请在24小时内领取</p>
                  <img class="prize-btn" :src="configItem.getBtn" alt="">
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
                  <p class="img-title">按钮:</p>
                  <div class="img-con"><img :src="configItem.getBtn" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upGetBtnImgSuccess" :show-file-list="false">
                      <el-button type="primary" size="small">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 344*84px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未中奖页面" name="notWinning" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img :src="configItem.bgImgUrl"></div>
              <div class="not-winning">
                <div class="prize-con">
                  <div class="close">X</div>
                  <img class="pic" :src="configItem.cryImgUrl" alt="">
                  <h3>很遗憾，未中奖</h3>
                  <img class="prize-btn" :src="configItem.knowBtn" alt="">
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
                  <div class="img-con"><img :src="configItem.cryImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upNotWinningImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 620*344px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">按钮:</p>
                  <div class="img-con"><img :src="configItem.knowBtn" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="headerObj" :on-success="upKnowBtnImgSuccess" :show-file-list="false">
                      <el-button type="primary" size="small">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 290*74px，格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
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
        form: 'act-100',
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
      configItem: {
        title: '',
        description: '',
        getBtn: 'https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/djlq_btn.png',
        knowBtn: 'https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/know-btn.png',
        headerImgUrl:
          'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi-header.png',
        bgImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi-bg.png',
        kitsUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/fanzuanshi-tips.png',
        iconUrl: [
          {
            key: 1,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:378'
          },
          {
            key: 2,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:379'
          },
          {
            key: 3,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:380'
          },
          {
            key: 4,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:381'
          },
          {
            key: 5,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:382'
          },
          {
            key: 6,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:383'
          },
          {
            key: 7,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:384'
          },
          {
            key: 8,
            imgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
            $$hashKey: 'object:385'
          }
        ],
        iconAwardImg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png',
        awardUrl: [
          {
            imgUrl:
              'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zhongjiang74@2x.png'
          }
        ],
        drawImgUrl:
          'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zhongjiang74@2x.png',
        cryImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/cry75@2x.png'
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
            console.log(this.configItem)
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
      if (resule.ret === '200000') return (this.configItem.bgImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传活动锦囊
    upTipsImgSuccess(resule) {
        if (resule.ret === '200000') return (this.defaultConf.img.tips.url = resule.data.accessUrl)
        this.$message.error(resule.message)
    },
    // 上传头部标题
    upTopImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.headerImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传活动锦囊
    upKitsImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.kitsUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 获取点击的游戏区域图片的索引
    getGameIndex(index) {
      this.gameIndex = index
    },
    upKnowBtnImgSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.knowBtn = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传点击领取图片
    upGetBtnImgSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.getBtn = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传游戏图片
    upGameImgSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.iconUrl[this.gameIndex].imgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传未中奖图片
    upNotWinningImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.cryImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    beforeAvatarUpload(file) {
      const IMGTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif'
      if (!IMGTYPE) {
        this.$message.error('上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!')
      }
      return IMGTYPE
    },
    // 保存进入下一步
    saveActTpl() {
      if (!this.addActParams.name) return this.$message.warning('请输入模板名称')
      this.configItem.title = this.addActParams.name
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
        background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/937@2x.png')
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
      .content {
        position: relative;
        width: 100%;
        height: 483px;
        // background-color: red;
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
          top: 118px;
          left: 50%;
          transform: translateX(-50%);
          width: 282px;
          height: 142px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .kits{
          position: absolute;
          top: 21px;
          left: 260px;
          width: 31px;
          height: 39px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .game-con {
          position: absolute;
          left: 0;
          bottom: 42px;
          width: 100%;
          height: 144px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          .game-item {
            width: 25%;
            height: 50%;
            img {
              width: 100%;
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
              transform: translate(232px, 56px);
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
              margin-top: 84px;
              margin-right: 20px;
            }
            p {
              color: #fff;
            }
            .prize-btn {
              margin-top: 46px;
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
        background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png')
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
          position: relative;
          width: 100px;
          height: 100px;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          margin: 0 10px;
          img {
            position: absolute;
            top:50%; 
            left:50%;
            transform: translate(-50%,-50%);
            max-width: 90%;
            max-height: 90%;
          }
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
        .edit-top-img,
        .edit-kits-img {
          display: flex;
          // .img-con {
          //   width: 40%;
          //   display: flex;
          //   justify-content: center;
          //   align-items: center;
          //   img {
          //     width: 90%;
          //   }
          // }
        }
        .edit-game-img > div {
          display: flex;
          margin-bottom: 10px;
          // .img-con {
          //   display: flex;
          //   justify-content: center;
          //   align-items: center;
          //   img {
          //     width: 150px;
          //   }
          // }
        }
        .edit-winning-img {
          display: flex;
          img {
            width: 100%;
          }
        }
        .edit-notWinning-img {
          display: flex;
          // .img-con {
          //   display: flex;
          //   justify-content: center;
          //   align-items: center;
          //   img {
          //     width: 100%;
          //   }
          // }
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
  .game-item:hover,
  .top:hover,
  .kits:hover {
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .top:hover {
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

