<template>
  <!--
  Author: mgx
  Create Date: 2018-11-09
  Description: 新建点元宝活动模板
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
              <div class="bg"><img :src="defaultConf.img.bg.url" alt="" title="点击编辑" @click="showEditConIndex = 1"></div>
              <div class="top"><img :src="defaultConf.img.title.url" alt="" title="点击编辑" @click="showEditConIndex = 2" ></div>
              <div class="kits"><img :src="defaultConf.img.tips.url" alt="" title="点击编辑" @click="showEditConIndex = 3" ></div>
              <!--<div class="game-con">-->
              <!--<div class="" v-for="item in defaultConf.img.kists" :key="item.key" @click="showEditConIndex = 4"><img :src="item.url"  alt="" :style="item.style"></div>-->
              <img class="game-con" :src="item.url" v-for="item in defaultConf.img.kists" :key="item.key" @click="showEditConIndex = 4" alt="" title="点击编辑"  :style="item.style">
              <!--</div>-->
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
                  <div class="img-con"><img :src="defaultConf.img.bg.url" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBgImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-top-img" v-if="showEditConIndex == 2">
                  <p class="img-title">活动标题:</p>
                  <div class="img-con"><img :src="defaultConf.img.title.url" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTopImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-kits-img" v-if="showEditConIndex == 3">
                  <p class="img-title">活动锦囊：</p>
                  <div class="img-con"><img :src="defaultConf.img.tips.url" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTipsImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 4">
                  <div v-for="(item, index) in defaultConf.img.kists" :key="item.key">
                    <p class="img-title">{{'元宝' + (index + 1) + ':'}}</p>
                    <div class="img-con"><img :src="item.url" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upGameImgSuccess" :show-file-list="false">
                        <el-button size="small" type="primary" @click="getGameIndex(index)">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 640*1600px格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
                <p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 {{defaultConf.img.title.width}} x {{defaultConf.img.title.height}}px格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
                <p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 120*120*.jpg\ *.bmp\ *.png\ *.gif</p>
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
              <div class="bg"><img :src="defaultConf.img.bg.url"></div>
              <div class="winning">
                <div class="prize-con">
                  <div class="close">X</div>
                  <img class="pic" src="https://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/5279354775674C718BC4C6E46A963B72.png" alt="">
                  <h3>奖品名称</h3>
                  <p>请在24小时内领取</p>
                  <img class="prize-btn" :src="defaultConf.img.award.url" alt="">
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
                  <div class="img-con"><img :src="defaultConf.img.award.url" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upYesWinningImgBtn" :show-file-list="false">
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
              <div class="bg"><img :src="defaultConf.img.bg.url"></div>
              <div class="not-winning">
                <div class="prize-con">
                  <div class="close">X</div>
                  <img class="pic" :src="defaultConf.img.noAward.url" alt="">
                  <h3>很遗憾，未中奖</h3>
                  <img class="prize-btn" :src="defaultConf.img.zxNoAwardBtn.url" alt="">
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
                  <p class="img-title">未中奖图片：</p>
                  <div class="img-con"><img :src="defaultConf.img.noAward.url" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningImg" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 620 x 345*.jpg\ *.bmp\ *.png\ *.gif</p>
              </div>
            </el-card>
          </div>
          <div class="edit-box">
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">未中奖按钮：</p>
                  <div class="img-con"><img :src="defaultConf.img.zxNoAwardBtn.url" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningImgBtn" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 290 × 74px格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
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
  props: ['id'],
  data() {
    return {
        defaultConf: {
            title: null,
            description: "",
            ratio: 0.4,
            img: this.getAllImage()
        },
        activeName: 'home',
        addActParams: {
            conf: '',
            form: 'act-102',
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
      getImage(name, suffix) {
          var base= "https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/";
          var suffix = suffix ? suffix : this.suffix;
          return  base + name + "." + suffix;
      },
      getStyle(w, h, x, y) {
          var wp = w.toString().indexOf('%') > -1;
          var hp = h.toString().indexOf('%') > -1;
          var ratio= 0.4;
          var pcRatio= 0.5;
          return {
              style: {
                  "max-width": wp ? w : Math.floor(w * ratio) + 'px',
                  "max-height": hp ? h : Math.floor(h * ratio) + 'px',
                  transform: "translate(" + Math.floor(x * ratio) + "px," + Math.floor(y * ratio) + "px)"
              },
              'c-style': {
                  "max-width": wp ? w : Math.floor(w * pcRatio) + 'px',
                  "max-height": hp ? h : Math.floor(h * pcRatio) + 'px',
                  transform: "translate(" + Math.floor(x * pcRatio) + "px," + Math.floor(y * pcRatio) + "px)"
              }
          }
      },
      getAllImage() {
          var _this = this;
          var urls = {};
          var nameSuffix = "yuanbao0";
          var imgSize = [
              [111, 127],
              [130, 146],
              [123, 124],
              [125, 144],
              [114, 112],
              [147, 144]
          ];
          var imgPosition = [
              [41, 614],
              [207, 530],
              [317, 409],
              [348, 615],
              [484, 499],
              [547, 604]
          ];
          urls.kists=[];
          for (var i = 1; i <= imgSize.length; i++) {
              var width = imgSize[i - 1][0];
              var height = imgSize[i - 1][1];
              var left = imgPosition[i - 1][0];
              var top = imgPosition[i - 1][1];
              var ratio = 0.4;
              urls[nameSuffix + i]  = {
                  url: _this.getImage(nameSuffix + i,"png"),
                  width: width,
                  height: height,
                  left: left,
                  top: top,
                  style: _this.getStyle(width, height, left, top).style,
                  'c-style': _this.getStyle(width, height, left, top)["c-style"],
              };
              urls.kists.push(urls[nameSuffix + i])
          }
          urls.bg = {
              url: _this.getImage("yuanbao-bg", "jpg"),
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              style: _this.getStyle('100%', '100%', 0, 0)
          };
          urls.title = {
              url: _this.getImage("yuanbao-title","png"),
              width: 587,
              height: 244,
              left: 83,
              top: 57,
              style: _this.getStyle(587, 244, 83, 57).style,
              'c-style': _this.getStyle(587, 244, 83, 57)["c-style"],
          };
          urls.tips = {
              url: _this.getImage("JGG_HDJN","png"),
              width: 98,
              height: 103,
              left: 638,
              top: 38,
              style: _this.getStyle(98, 103, 638, 38).style,
              'c-style': _this.getStyle(98, 103, 638, 38)["c-style"],
          };
          urls.award = {
              url:
                  "https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/djlq_btn.png"
          };
          urls.noAward = {
              url:
                  "https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/cry75@2x.png"
          };
          urls.zxNoAwardBtn = {
              url: "https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/know-btn.png"
          }
          console.log(urls);
          return urls;
      },
    getActDetail() {
      if (this.id) {
        this.$request.post('/api/saotx/acttpl/detail', { id: this.id }, true, res => {
          if (res.ret === '200000') {
            this.addActParams = res.data
            this.defaultConf = JSON.parse(res.data.conf)
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
      if (resule.ret === '200000') return (this.defaultConf.img.bg.url = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传头部标题
    upTopImgSuccess(resule) {
      if (resule.ret === '200000') return (this.defaultConf.img.title.url = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传活动锦囊
    upTipsImgSuccess(resule) {
        if (resule.ret === '200000') return (this.defaultConf.img.tips.url = resule.data.accessUrl)
        this.$message.error(resule.message)
    },
    // 获取点击的游戏区域图片的索引
    getGameIndex(index) {
      this.gameIndex = index
    },
    // 上传游戏图片
    upGameImgSuccess(resule) {
      if (resule.ret === '200000')
        return (this.defaultConf.img.kists[this.gameIndex].url = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传中奖按钮图片
    upYesWinningImgBtn(resule) {
        if (resule.ret === '200000') return (this.defaultConf.img.award.url = resule.data.accessUrl)
        this.$message.error(resule.message)
    },
    // 上传未中奖图片
    upNotWinningImg(resule) {
      if (resule.ret === '200000') return (this.defaultConf.img.noAward.url = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传未中奖按钮图片
    upNotWinningImgBtn(resule) {
        if (resule.ret === '200000') return (this.defaultConf.img.zxNoAwardBtn.url = resule.data.accessUrl)
        this.$message.error(resule.message)
    },
    // 保存进入下一步
    saveActTpl() {
      if (!this.addActParams.name) return this.$message.warning('请输入模板名称')
      this.defaultConf.title = this.addActParams.name
      this.defaultConf.description = this.addActParams.note
      this.addActParams.conf = JSON.stringify(this.defaultConf)
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
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 234px;
          height: 97px;
         img {
            width: 100%;
            height: 100%;
          }
        }
        .kits{
          position: absolute;
          top: 15px;
          left: 92%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .game-con {
          position: absolute;
          left: 0;
          top: 0;
          /*bottom: 42px;
          width: 100%;
          height: 144px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;*/
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
              margin-top: 20px;
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
          width: 30%;
          height: 130px;
          line-height: 130px;
          text-align: center;
          border: 1px solid #ccc;
          margin: 0 10px;
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
        .edit-kits-img {
          display: flex;
          .img-con {
            width: 25%;
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
            width: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              // width: 100%;
              height: 120px;
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
  .game-item:hover,
  .top:hover {
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .top:hover {
    transform: translateX(-50%) scale(0.99);
  }
  .kits:hover {
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .kits:hover {
    transform: translateX(-50%) scale(0.99);
  }
  .game-con:hover {
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .game-con:hover {
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

