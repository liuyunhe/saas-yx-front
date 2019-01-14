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
                            <img class="bg" :src="defaultConf.img.bg.url" alt="" title="点击编辑" @click="showEditConIndex = 1":style="defaultConf.img.bg.style"/>
                            <img class="top" :src="defaultConf.img.title.url" alt="" title="点击编辑" @click="showEditConIndex = 2" :style="defaultConf.img.title.style"/>
                            <img class="subTitle" :src="defaultConf.img.subTitle.url" alt="" title="点击编辑" @click="showEditConIndex = 3" :style="defaultConf.img.subTitle.style" />
                            <img class="kits" :src="defaultConf.img.tips.url" alt="" title="点击编辑" @click="showEditConIndex = 4" :style="defaultConf.img.tips.style"/>
                            <img class="game-con" :src="defaultConf.img.yxContentBg.url"  @click="showEditConIndex = 5" alt="" title="点击编辑"  :style="defaultConf.img.yxContentBg.style"/>
                            <img class="game-con" :src="item.url" v-for="item in defaultConf.img.kists" :key="item.key" @click="showEditConIndex = 6" alt="" title="点击编辑"  :style="item.style"/>
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
                                <div class="edit-subTitle-img" v-if="showEditConIndex == 3">
                                    <p class="img-title">活动标题：</p>
                                    <div class="img-con"><img :src="defaultConf.img.subTitle.url" alt=""></div>
                                    <div class="btn-con">
                                        <el-upload :action="uploadURL" :headers="headerObj" :on-success="upSubTitleImgSuccess" :show-file-list="false">
                                            <el-button size="small" type="primary">更换图片</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="edit-kits-img" v-if="showEditConIndex == 4">
                                    <p class="img-title">活动锦囊：</p>
                                    <div class="img-con"><img :src="defaultConf.img.tips.url" alt=""></div>
                                    <div class="btn-con">
                                        <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTipsImgSuccess" :show-file-list="false">
                                            <el-button size="small" type="primary">更换图片</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="edit-kits-img" v-if="showEditConIndex == 5">
                                    <p class="img-title">操作区背景图：</p>
                                    <div class="img-con"><img :src="defaultConf.img.yxContentBg.url" alt=""></div>
                                    <div class="btn-con">
                                        <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBGridImgSuccess" :show-file-list="false">
                                            <el-button size="small" type="primary">更换图片</el-button>
                                        </el-upload>
                                    </div>
                                </div>
                                <div class="edit-game-img" v-if="showEditConIndex == 6">
                                    <div v-for="(item, index) in defaultConf.img.kists" :key="item.key">
                                        <p class="img-title">{{index==4?'抽奖按钮:':'方格' + (index + 1) + ':'}}</p>
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
                                <p class="tips" v-if="showEditConIndex == 3">* * 图片建议尺寸为 550 x 100px格式为*.jpg\ *.bmp\ *.png\ *.gif</p>
                                <p class="tips" v-if="showEditConIndex == 4">* 图片建议尺寸为 120*120*.jpg\ *.bmp\ *.png\ *.gif</p>

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
                    form: 'act-101',
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
            getNewImage: function(name, suffix) {
                var newBase="https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/";
                var suffix = suffix ? suffix : this.suffix;
                return newBase + name + "." + suffix;
            },
            getStyle(w, h, x, y) {
                var ratio=0.4;
                var pcRatio=0.5;
                var wp = w.toString().indexOf('%') > -1;
                var hp = h.toString().indexOf('%') > -1;
                return {
                    style: {
                        "max-width": wp ? w : Math.floor(w * ratio) + 'px',
                        "max-height": hp ? h :Math.floor(h * ratio) + 'px',
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
                var nameSuffix = "item0";
                var imgSize = [
                    [195, 162],
                    [130, 146],
                    [123, 124],
                    [125, 144],
                    [114, 112],
                    [147, 144]
                ];
                var imgPosition = [
                    [70, 632],
                    [265, 632],
                    [460, 632],
                    [70, 794],
                    [265, 794],
                    [460, 794],
                    [70, 956],
                    [265, 956],
                    [460, 956]
                ];
                urls.kists=[];
                for (var i = 1; i <= imgPosition.length; i++) {
                    var width = imgSize[0][0];
                    var height = imgSize[0][1];
                    var left = imgPosition[i - 1][0];
                    var top = imgPosition[i - 1][1];
                    var pos = 0;
                    i == 1 || i == 2 || i == 3 || i == 7
                    ? pos = i : i == 6
                    ? pos = 4 : i == 9
                    ? pos = 5 : i == 8
                    ? pos = 6 : i == 4
                    ? pos = 8 : i == 5
                    ? pos = 9 : '';
                    var ratio = 0.4;
                    if(i != 5 ){
                        urls[nameSuffix + i] = {
                            url: _this.getNewImage('item_bg',"png"),
                            width: width,
                            height: height,
                            left: left,
                            top: top,
                            pos: pos,
                            style:  _this.getStyle(width, height, left, top).style,
                            'c-style': _this.getStyle(width, height, left, top)["c-style"],
                        };
                        urls.kists.push(urls[nameSuffix + i])
                    }else {
                        urls[nameSuffix + i] = {
                            url: _this.getNewImage("jgg_ljcj","png"),
                            width: width,
                            height: height,
                            left: left,
                            top: top,
                            pos: pos,
                            style:  _this.getStyle(width, height, left, top).style,
                            'c-style': _this.getStyle(width, height, left, top)["c-style"],
                        };
                        urls.kists.push(urls[nameSuffix + i])
                    }

                }
                urls.bg = {
                    url: _this.getNewImage("jiugongge-bg","png"),
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    style: _this.getStyle('100%', '100%', 0, 0)
                };
                urls.title = {
                    url: _this.getNewImage("jgg-banner","png"),
                    width: 622,
                    height: 357,
                    left: 63,
                    top: 130,
                    style: _this.getStyle(622, 357, 63, 130).style,
                    'c-style':  _this.getStyle(622, 357, 63, 130)["c-style"],
                };
                urls.subTitle = {
                    url: _this.getImage("JGG_title_text","png"),
                    width: 550,
                    height: 100,
                    left: 80,
                    top: 500,
                    style: _this.getStyle(550, 100, 80, 500).style,
                    'c-style':  _this.getStyle(550, 100, 80, 500)["c-style"],
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
                urls.yxContentBg = {
                    url: _this.getImage("content-bg","png"),
                    width: 650,
                    height: 550,
                    left: 35,
                    top: 600,
                    style: _this.getStyle(650, 550, 35, 600).style,
                    'c-style': _this.getStyle(650, 550, 35, 600)["c-style"],
                };

                urls.award = {
                    url: _this.getImage("djlq_btn","png")
                };
                urls.noAward = {
                    url: _this.getImage("cry75@2x","png")
                };
                urls.zxNoAwardBtn = {
                    url: _this.getNewImage("know-btn","png")
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
            // 上传头部副标题
            upSubTitleImgSuccess(resule) {
                if (resule.ret === '200000') return (this.defaultConf.img.subTitle.url = resule.data.accessUrl)
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
            // 上传操作区背景图片
            upBGridImgSuccess(resule) {
                if (resule.ret === '200000')
                    return (this.defaultConf.img.yxContentBg.url = resule.data.accessUrl)
                this.$message.error(resule.message)
            },

            // 上传游戏图片
            upGameImgSuccess(resule) {
                if (resule.ret === '200000'){
                    this.defaultConf.img['item0'+[this.gameIndex+1]].url = resule.data.accessUrl
                    return (this.defaultConf.img.kists[this.gameIndex].url = resule.data.accessUrl)
                }else{
                    this.$message.error(resule.message)
                }
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
                          left: 0;
                          top:0;
                       /* top: 30px;
                          left: 50%;*/
                          transform: translateX(-50%);
                          /*width: 275px;
                          height: 144px;*/
                          img {
                              width: 100%;
                              height: 100%;
                          }
                      }
                    .subTitle {
                        position: absolute;
                        left: 0;
                        top:0;
                  /*      top: 200px;
                        left: 50%;*/
                        transform: translateX(-50%);
                    /*    width: 220px;
                        height: 33px;*/
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .kits{
                        position: absolute;
                        left: 0;
                        top:0;
                   /*     top: 15px;
                        left: 92%;*/
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
                        top:0;
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
                    .edit-subTitle-img {
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
                            width: 25%;
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
        .subTitle:hover {
            transform: scale(0.99);
            cursor: pointer;
            filter: brightness(60%);
            border: 2px dotted #fff;
            box-sizing: border-box;
        }
        .subTitle:hover {
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

