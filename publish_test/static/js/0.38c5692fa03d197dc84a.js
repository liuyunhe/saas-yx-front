webpackJsonp([0],{"7w9a":function(e,t,s){"use strict";var i={props:{title:{type:String,default:"活动标题"},imgData:{type:[Array,Object],default:null},imgKey:{type:String,default:""},page:{type:[Number,String],default:1},commonImg:{type:[Array,Object]},flag:{type:String,default:""}},data:()=>({hover:""}),created(){},mounted(){this.edit("bg")},computed:{},methods:{imgHover(e){this.hover=e},unHover(){this.hover=""},edit(e){this.$emit("edit",{index:e})}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"root"}},[s("div",{staticClass:"phone-wrapper"},[s("div",{staticClass:"phone-header"},[s("h4",[e._v(e._s(e.title))])]),e._v(" "),s("div",{staticClass:"phone-body"},[1!=e.page&&6!=e.page?s("div",{staticClass:"cover"},[2!=e.page&&3!=e.page&&4!=e.page&&7!=e.page?s("img",{staticClass:"close_icon",style:{width:.4*e.commonImg.close.size[0]+"px",height:.4*e.commonImg.close.size[1]+"px",left:.4*e.commonImg.close.pos[0]+"px",top:.4*e.commonImg.close.pos[1]+"px"},attrs:{src:e.commonImg.close.url,alt:""}}):e._e()]):e._e(),e._v(" "),s("div",{staticClass:"page1"},[e._l(e.imgData.normal,function(t,i){return e.imgData.normal?s("img",{key:i+t,class:[i,{imgHover:e.hover==i}],style:{width:.4*t.size[0]+"px",height:.4*t.size[1]+"px",left:.4*t.pos[0]+"px",top:.4*t.pos[1]+"px"},attrs:{src:t.url+"?v=1.1",title:"点击编辑"},on:{mouseover:function(t){e.imgHover(i)},mouseout:function(t){e.unHover()},click:function(t){e.edit(i)}}}):e._e()}),e._v(" "),e._l(e.imgData.item,function(t,i){return e.imgData.item?s("img",{key:i+t,class:[i,{imgHover:e.hover==i}],style:{width:.4*t.size[0]+"px",height:.4*t.size[1]+"px",left:.4*t.pos[0]+"px",top:.4*t.pos[1]+"px"},attrs:{src:t.url+"?v=1.1",title:"点击编辑"},on:{mouseover:function(t){e.imgHover(i)},mouseout:function(t){e.unHover()},click:function(t){e.edit(i)}}}):e._e()})],2),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:6==e.page,expression:"page == 6"}],staticClass:"page1"},[e._l(e.imgData.question,function(t,i){return e.imgData.question?s("img",{key:i+t,class:[i,{imgHover:e.hover==i}],style:{width:.4*t.size[0]+"px",height:.4*t.size[1]+"px",left:.4*t.pos[0]+"px",top:.4*t.pos[1]+"px"},attrs:{src:t.url+"?v=1.1",title:"点击编辑"},on:{mouseover:function(t){e.imgHover(i)},mouseout:function(t){e.unHover()},click:function(t){e.edit(i)}}}):e._e()}),e._v(" "),e._m(0)],2),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==e.page,expression:"page == 2"}],staticClass:"page page2"},[s("img",{attrs:{src:e.commonImg.actNotes.url,alt:""}})]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:3==e.page,expression:"page == 3"}],staticClass:"page page3"},[s("img",{attrs:{src:e.commonImg.myAward.url,alt:""}})]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:4==e.page&&"ques"==e.flag,expression:"page == 4 && flag=='ques'"}],staticClass:"page page4"},[s("img",{staticClass:"close_icon",style:{width:.4*e.commonImg.close.size[0]+"px",height:.4*e.commonImg.close.size[1]+"px",left:.4*e.commonImg.close.pos[0]+"px",top:.4*e.commonImg.close.pos[1]+"px"},attrs:{src:e.commonImg.close.url,alt:""}}),e._v(" "),s("img",{staticClass:"award-alert",style:{width:.4*e.commonImg.getAwardBg.size[0]+"px",height:.4*e.commonImg.getAwardBg.size[1]+"px"},attrs:{src:e.commonImg.getAwardBg.url,alt:""}}),e._v(" "),s("img",{staticClass:"award-pic",style:{width:.4*e.commonImg.award.size[0]+"px",height:.4*e.commonImg.award.size[1]+"px"},attrs:{src:e.commonImg.award.url,alt:""}}),e._v(" "),e._m(1),e._v(" "),s("img",{staticClass:"award-btn",style:{width:.4*e.commonImg.getBtn.size[0]+"px",height:.4*e.commonImg.getBtn.size[1]+"px",top:.42*e.commonImg.getBtn.pos[1]+"px"},attrs:{src:e.commonImg.getBtn.url,alt:""}})]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:4==e.page&&"pai"==e.flag,expression:"page == 4 && flag=='pai'"}],staticClass:"page page4"},[s("img",{staticClass:"close_icon",style:{width:.4*e.commonImg.close.size[0]+"px",height:.4*e.commonImg.close.size[1]+"px",left:.4*e.commonImg.close.pos[0]+"px",top:.4*e.commonImg.close.pos[1]+"px"},attrs:{src:e.commonImg.close.url,alt:""}}),e._v(" "),s("img",{staticClass:"award-alert",style:{width:.4*e.commonImg.getAwardBgPai.size[0]+"px",height:.4*e.commonImg.getAwardBgPai.size[1]+"px"},attrs:{src:e.commonImg.getAwardBgPai.url,alt:""}}),e._v(" "),s("img",{staticClass:"award-pic",style:{width:.4*e.commonImg.award.size[0]+"px",height:.4*e.commonImg.award.size[1]+"px"},attrs:{src:e.commonImg.award.url,alt:""}}),e._v(" "),e._m(2),e._v(" "),s("img",{staticClass:"award-btn",style:{width:.4*e.commonImg.getBtnPai.size[0]+"px",height:.4*e.commonImg.getBtnPai.size[1]+"px",top:.42*e.commonImg.getBtnPai.pos[1]+"px"},attrs:{src:e.commonImg.getBtnPai.url,alt:""}})]),e._v(" "),5==e.page&&"ques"==e.flag?s("div",{staticClass:"page page5"},[s("img",{staticClass:"award-alert",style:{width:.4*e.commonImg.noAward.size[0]+"px",height:.4*e.commonImg.noAward.size[1]+"px"},attrs:{src:e.commonImg.noAward.url,alt:""}}),e._v(" "),s("p",[e._v("很遗憾，未中奖")]),e._v(" "),s("img",{staticClass:"award-btn",style:{width:.4*e.commonImg.knowBtn.size[0]+"px",height:.4*e.commonImg.knowBtn.size[1]+"px",top:.42*e.commonImg.knowBtn.pos[1]+"px"},attrs:{src:e.commonImg.knowBtn.url,alt:""}})]):e._e(),e._v(" "),5==e.page&&"pai"==e.flag?s("div",{staticClass:"page page5"},[s("img",{staticClass:"award-alert",style:{width:.4*e.commonImg.noAwardPai.size[0]+"px",height:.4*e.commonImg.noAwardPai.size[1]+"px"},attrs:{src:e.commonImg.noAwardPai.url,alt:""}}),e._v(" "),s("p",[e._v("很遗憾，未中奖")]),e._v(" "),s("img",{staticClass:"award-btn",style:{width:.4*e.commonImg.knowBtnPai.size[0]+"px",height:.4*e.commonImg.knowBtnPai.size[1]+"px",top:.42*e.commonImg.knowBtnPai.pos[1]+"px"},attrs:{src:e.commonImg.knowBtnPai.url,alt:""}})]):e._e(),e._v(" "),7==e.page?s("div",{staticClass:"page page5"},[s("img",{staticClass:"award-pic no-award",style:{width:.4*e.commonImg.errorTip.size[0]+"px",height:.4*e.commonImg.errorTip.size[1]+"px",top:.32*e.commonImg.errorTip.pos[1]+"px"},attrs:{src:e.commonImg.errorTip.url,alt:""}}),e._v(" "),s("p",{staticClass:"error-text"},[e._v("时间到!")]),e._v(" "),s("img",{staticClass:"award-btn errorBtn",style:{width:.4*e.commonImg.errorBtn.size[0]+"px",height:.4*e.commonImg.errorBtn.size[1]+"px",top:.42*e.commonImg.errorBtn.pos[1]+"px"},attrs:{src:e.commonImg.errorBtn.url,alt:""}})]):e._e()]),e._v(" "),s("div",{staticClass:"phone-footer"})])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"text"},[t("div",[this._v("1.中国的五大名山被称为“中国五岳”，五岳 中哪座山位于山西省？")]),this._v(" "),t("div",{staticClass:"line"}),this._v(" "),t("div",{staticClass:"answer"},[t("p",[this._v("A. 西岳华山")]),this._v(" "),t("p",[this._v("B. 北岳衡山")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"award-text"},[t("h2",[this._v("奖品名称")]),this._v(" "),t("p",[this._v("请在24小时内领取")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"award-text"},[t("h2",[this._v("奖品名称")]),this._v(" "),t("p",[this._v("请在24小时内领取")])])}]};var a=s("VU/8")(i,n,!1,function(e){s("hBQV")},null,null);t.a=a.exports},"9ijK":function(e,t,s){"use strict";const i="http://qoss.qrmkt.cn",n="/new_platform/pc_front/",a="/new_platform/",r={getUrl:(e,t,s)=>e?(s=s?"."+s:".png",i+(1==(t=t||1)?n:a)+e+s):""},o={close:{name:"关闭按钮",index:"close",url:r.getUrl("close_icon",2),pos:[350,950],size:[65,65]},awardText:{name:"关闭按钮",index:"awardText",url:r.getUrl("award-text",2),pos:[0,0],size:[311,76]},award:{name:"中奖图片",index:"award",url:r.getUrl("award_img",2),pos:[0,0],size:[283,234]},noAward:{name:"未获奖图片",index:"noAward",url:r.getUrl("ques-no-award-bg",2),pos:[0,400],size:[562,638]},noAwardPai:{name:"未获奖图片",index:"noAwardPai",url:r.getUrl("pai-no-award-bg",2),pos:[0,400],size:[562,638]},getAwardBg:{name:"中奖弹框",index:"getAwardBg",url:r.getUrl("ques_award_bg",2),pos:[0,400],size:[562,638]},getBtn:{name:"领取按钮",index:"getBtn",url:r.getUrl("ques_award_btn",2),pos:[0,763],size:[280,60]},getAwardBgPai:{name:"中奖弹框",index:"getAwardBgPai",url:r.getUrl("pai-alert-bg",2),pos:[0,400],size:[562,638]},getBtnPai:{name:"领取按钮",index:"getBtnPai",url:r.getUrl("pai-btn",2),pos:[0,763],size:[280,60]},knowBtn:{name:"知道了按钮",index:"knowBtn",url:r.getUrl("ques-no-award-btn",2),pos:[0,763],size:[280,60]},knowBtnPai:{name:"知道了按钮",index:"knowBtnPai",url:r.getUrl("pai-no-award-btn",2),pos:[0,763],size:[280,60]},myAward:{name:"我的奖品",index:"myAward",url:r.getUrl("wodedjiangpin",2),pos:[0,0],size:[100,100]},actNotes:{name:"活动说明",index:"actNotes",url:r.getUrl("huodongshuoming",2),pos:[0,0],size:[100,100]},errorTip:{name:"异常弹框",index:"errorTip",url:r.getUrl("error_bg",2),pos:[85,373],size:[593,686]},errorBtn:{name:"异常弹框按钮",index:"errorBtn",url:r.getUrl("error_btn",2),pos:[231,905],size:[199,69]}},l={ACT_FANPAIZI:{normal:{bg:{name:"背景",index:"bg",url:r.getUrl("fanpaizi-bg1",2),pos:[0,0],size:[750,1208]},contentBg:{name:"牌子背景",index:"contentBg",url:r.getUrl("fanpaizi-bg2",2),pos:[32,400],size:[726,730]},title:{name:"标题",index:"title",url:r.getUrl("fanpaizi-title",2),pos:[30,100],size:[620,270]},tips:{name:"活动锦囊",index:"tips",url:r.getUrl("fanpaizi-tips",2),pos:[599,32],size:[120,160]}},item:{item0:{name:"牌子",url:r.getUrl("fanpaizi-card",2),pos:[89,571],size:[175,240]},item1:{name:"牌子2",url:r.getUrl("fanpaizi-card",2),pos:[287,571],size:[175,240]},item2:{name:"牌子3",url:r.getUrl("fanpaizi-card",2),pos:[486,571],size:[175,240]},item3:{name:"牌子4",url:r.getUrl("fanpaizi-card",2),pos:[89,826],size:[175,240]},item4:{name:"牌子5",url:r.getUrl("fanpaizi-card",2),pos:[287,826],size:[175,240]},item5:{name:"牌子6",url:r.getUrl("fanpaizi-card",2),pos:[486,826],size:[175,240]}}},ACT_JIUGONGGE:{normal:{bg:{name:"背景",index:"bg",url:r.getUrl("jiugongge-bg",2),pos:[0,0],size:[750,1208]},contentBg:{name:"牌子背景",index:"contentBg",url:r.getUrl("content-bg",1),pos:[35,600],size:[660,560]},title:{name:"标题",index:"title",url:r.getUrl("jgg-banner",2),pos:[63,130],size:[622,357]},subTitle:{name:"副标题",index:"subTitle",url:r.getUrl("JGG_title_text",1),pos:[80,500],size:[550,100]},tips:{name:"活动锦囊",index:"tips",url:r.getUrl("JGG_HDJN",1),pos:[638,38],size:[98,103]},drawBrn:{name:"抽奖按钮",index:"drawBtn",url:r.getUrl("jgg_ljcj",2),pos:[265,794],size:[195,162]}},item:{item0:{name:"格子1",url:r.getUrl("item_bg",2),pos:[70,632],size:[195,162]},item1:{name:"格子2",url:r.getUrl("item_bg",2),pos:[265,632],size:[195,162]},item2:{name:"格子3",url:r.getUrl("item_bg",2),pos:[460,632],size:[195,162]},item3:{name:"格子4",url:r.getUrl("item_bg",2),pos:[70,794],size:[195,162]},item4:{name:"格子5",url:r.getUrl("item_bg",2),pos:[460,794],size:[195,162]},item5:{name:"格子6",url:r.getUrl("item_bg",2),pos:[70,956],size:[195,162]},item6:{name:"格子7",url:r.getUrl("item_bg",2),pos:[265,956],size:[195,162]},item7:{name:"格子8",url:r.getUrl("item_bg",2),pos:[460,956],size:[195,162]}}},ACT_QUESTION:{normal:{bg:{name:"背景",index:"bg",url:r.getUrl("ques_bg__2",2),pos:[0,0],size:[750,1208]},contentBg:{name:"开始答题按钮",index:"contentBg",url:r.getUrl("ques_btn_2",2),pos:[80,1050],size:[318,102]},title:{name:"标题",index:"title",url:r.getUrl("ques_title",2),pos:[18,100],size:[720,468]},tips:{name:"活动规则",index:"tips",url:r.getUrl("ques_rule",2),pos:[620,32],size:[120,120]}},question:{Quesbg:{name:"答题背景",index:"Quesbg",url:r.getUrl("ques_bg_1",2),pos:[0,0],size:[750,1208]},QuesActive:{name:"选中标识",index:"QuesActive",url:r.getUrl("right_1",2),pos:[400,550],size:[59,34]},QuesWrong:{name:"选错标识",index:"QuesWrong",url:r.getUrl("wrong",2),pos:[410,650],size:[34,34]},QuesbtnBg:{name:"答题按钮",index:"QuesbtnBg",url:r.getUrl("ques_btn_1",2),pos:[220,1050],size:[318,102]}}},ACT_HONGBAOYU:{normal:{bg:{name:"背景",index:"bg",url:r.getUrl("red_bg",2),pos:[0,0],size:[750,1208]},redPacket:{name:"红包",index:"redPacket",url:r.getUrl("red_img",2),size:[240,265],style:[{w:"45px",h:"50px",t:"50px",l:"190px"},{w:"58px",h:"65px",t:"84px",l:"100px"},{w:"61px",h:"68px",t:"145px",l:"35px"},{w:"55px",h:"61px",t:"148px",l:"129px"},{w:"55px",h:"61px",t:"121px",l:"202px"},{w:"73px",h:"82px",t:"225px",l:"-21px"},{w:"69px",h:"76px",t:"213px",l:"60px"},{w:"72px",h:"79px",t:"241px",l:"134px"},{w:"68px",h:"75px",t:"194px",l:"211px"},{w:"91px",h:"100px",t:"321px",l:"33px"},{w:"75px",h:"82px",t:"321px",l:"190px"}]}},rules:{bg:{name:"背景",index:"bg",url:r.getUrl("red_rules_bg",2),pos:[0,0],size:[750,1208]},rulesBtn:{name:"规则按钮",index:"rulesBtn",url:r.getUrl("red_rules_btn",2),pos:[0,0],size:[130,36]},btnImg:{name:"按钮图片",index:"btnImg",url:r.getUrl("red_rules_btn_img",2),pos:[0,0],size:[540,96]}},downCount:{bg:{name:"背景",index:"bg",url:r.getUrl("red_downCount_bg",2),pos:[643,299],size:[750,1208]},num1:{name:"数字1",index:"num1",url:r.getUrl("red_num1",2),pos:[643,299],size:[150,214]},num2:{name:"数字2",index:"num2",url:r.getUrl("red_num2",2),pos:[639,303],size:[150,214]},num3:{name:"数字3",index:"num3",url:r.getUrl("red_num3",2),pos:[300,639],size:[150,214]}},tips:{winningImg:{name:"中奖弹窗",index:"winningImg",url:r.getUrl("red_winning_img",2),pos:[46,200],size:[610,500]},notWinImg:{name:"未中奖弹窗",index:"notWinImg",url:r.getUrl("red_notWin_img",2),pos:[46,200],size:[610,500]},drawBtn1:{name:"抽奖按钮1",index:"drawBtn1",url:r.getUrl("red_draw_btn1",2),pos:[246,754],size:[258,66]},drawBtn2:{name:"抽奖按钮2",index:"drawBtn2",url:r.getUrl("red_draw_btn1",2),pos:[246,754],size:[258,66]},tipsImg:{name:"提示语弹窗",index:"tipsImg",url:r.getUrl("red_tips_img",2),pos:[92,111],size:[528,462]},tipsBtn1:{name:"提示按钮1",index:"tipsBtn1",url:r.getUrl("red_tips_btn1",2),pos:[114,609],size:[230,66]},tipsBtn2:{name:"提示按钮2",index:"tipsBtn2",url:r.getUrl("red_tips_btn2",2),pos:[389,609],size:[230,66]}},share:{icon:{name:"分享图标",index:"icon",url:r.getUrl("red_share_img",2),pos:[],size:[]}}},ACT_SIGN:{page1:{bg:{name:"背景",index:"bg",url:"http://qoss.qrmkt.cn/common/qd/sign-bg.png",type:1,pos:[0,0],size:[750,1351]},drawBtn:{name:"抽奖按钮",index:"drawBtn",url:"http://qoss.qrmkt.cn/common/qd/sign-btn.png",type:2,pos:[153,1038],size:[461,87]},calendarHeader:{name:"日历头部背景",index:"calendarHeader",url:"http://qoss.qrmkt.cn/common/qd/sign-calendar-header.png",type:3,size:[630,87],pos:[0,0]},calendarCon:{name:"日历内容背景",index:"calendarCon",url:"http://qoss.qrmkt.cn/common/qd/sign-calendar-con.png",type:3,pos:[0,107],size:[630,486]},rulesBtn:{name:"规则按钮",index:"rulesBtn",url:"http://qoss.qrmkt.cn/common/qd/sign-rules-btn.png",type:4,pos:[583,5],size:[146,51]}},page2:{actNotes:{name:"活动说明",index:"actNotes",url:r.getUrl("huodongshuoming",2),pos:[0,0],size:[750,1208]}},page3:{myAward:{name:"我的奖品",index:"myAward",url:r.getUrl("wodedjiangpin",2),pos:[0,0],size:[750,1208]}},page4:{winningBg:{name:"中奖背景",index:"winningBg",url:"http://qoss.qrmkt.cn/common/qd/sign-winning-bg.png",pos:[105,131],size:[563,638]},btn:{name:"中奖按钮",index:"btn",url:"http://qoss.qrmkt.cn/common/qd/sign-get-btn.png",pos:[224,664],size:[316,72]},colseBtn:{name:"关闭按钮",index:"closeBtn",hidden:!0,url:"http://qoss.qrmkt.cn/common/qd/sign-close-btn.png",pos:[338,831],size:[78,78]}},page5:{notWinBg:{name:"未中奖背景",index:"notWinBg",url:"http://qoss.qrmkt.cn/common/qd/sign-notWin-bg.png",pos:[94,146],size:[563,638]},btn:{name:"未中奖按钮",index:"btn",url:"http://qoss.qrmkt.cn/common/qd/sign-konw-btn.png",pos:[213,679],size:[316,72]},colseBtn:{name:"关闭按钮",index:"closeBtn",hidden:!0,url:"http://qoss.qrmkt.cn/common/qd/sign-close-btn.png",pos:[338,831],size:[78,78]}},page6:{success:{name:"签到成功背景",index:"success",url:"http://qoss.qrmkt.cn/common/qd/sign-success-bg.png",pos:[105,128],size:[563,641]},close:{name:"关闭按钮",index:"closeBtn",hidden:!0,url:"http://qoss.qrmkt.cn/common/qd/sign-close-btn.png",pos:[338,831],size:[78,78]}},page7:{icon:{name:"分享图标",index:"icon",url:"http://qoss.qrmkt.cn/common/qd/sign-share-icon.png",pos:[],size:[]}}}};t.a={img:l,commonImg:o}},UJta:function(e,t,s){"use strict";var i={props:{editData:{type:[Object,Array]},type:{type:String},itemRepeat:{type:Boolean}},data:()=>({uploadApi:"/api/wiseqr/attach/commonAliUpload",headerObj:{loginId:sessionStorage.getItem("access_loginId")||"2d07e7953a2a63ceda6df5144d1abec3",token:sessionStorage.getItem("access_token"),CLIENTSESSIONID:sessionStorage.getItem("CLIENTSESSIONID")},showFile:!1,editIndex:""}),created(){},methods:{uploadSuccess(e,t,s){let i=e.data.accessUrl;this.$emit("picChange",{type:this.type,index:this.editIndex,url:i,itemRepeat:this.itemRepeat})},uploadError(e){console.log(e),alert("图片上传失败")},onUploadClick(e){this.editIndex=e},beforeAvatarUpload(e){const t="image/jpeg"===e.type||"image/png"===e.type||"image/bmp"===e.type||"image/gif"===e.type;return t||this.$message.error("上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!"),t}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"root"}},[e.editData?s("el-card",{staticClass:"card"},[s("div",{staticClass:"header",attrs:{slot:"header"},slot:"header"},[s("h3",[e._v("编辑图片")])]),e._v(" "),"normal"==e.type||"item"==e.type&&e.itemRepeat||"common"==e.type?s("div",{staticClass:"edit normal-pic"},e._l(e.editData,function(t,i){return s("div",{key:i+t,staticClass:"edit-container"},[t.hidden?e._e():s("div",[s("h4",[e._v(e._s(t.name)+"：")]),e._v(" "),s("div",{staticClass:"img-container"},[s("img",{attrs:{src:t.url,alt:""}})]),e._v(" "),s("el-upload",{staticClass:"upload",attrs:{action:e.uploadApi,headers:e.headerObj,"show-file-list":e.showFile,"on-success":e.uploadSuccess,"before-upload":e.beforeAvatarUpload,"on-error":e.uploadError}},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(s){e.onUploadClick(e.itemRepeat&&"item"==e.type?"item0":t.index)}}},[e._v("更换图片")])],1),e._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("* 图片建议尺寸为 "+e._s(t.size[0])+"*"+e._s(t.size[1])+"px，格式为*.jpg\\ *.bmp\\ *.png\\ *.gif")])],1)])})):e._e(),e._v(" "),"item"!=e.type||e.itemRepeat?e._e():s("div",{staticClass:"edit item-pic"},e._l(e.editData,function(t,i){return s("div",{key:i+t,staticClass:"edit-container"},[s("h4",[e._v(e._s(t.name)+"：")]),e._v(" "),s("div",{staticClass:"img-container"},[s("img",{attrs:{src:t.url,alt:""}})]),e._v(" "),s("el-upload",{staticClass:"upload",attrs:{action:e.uploadApi,headers:e.headerObj,"show-file-list":e.showFile,"on-success":e.uploadSuccess,"before-upload":e.beforeAvatarUpload,"on-error":e.uploadError}},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.onUploadClick(i)}}},[e._v("更换图片")])],1)],1)}))]):e._e()],1)},staticRenderFns:[]};var a=s("VU/8")(i,n,!1,function(e){s("eCLn")},null,null);t.a=a.exports},eCLn:function(e,t){},hBQV:function(e,t){},ifEn:function(e,t,s){"use strict";var i={props:{titleLength:{type:Number,default:15},descLength:{type:Number,default:50},title:{type:String},desc:{type:String}},data(){return{state:{require:!0},info:{title:"",desc:""},rules:{title:[{required:!0,message:"请输入活动标题",trigger:"blur"},{min:2,max:this.titleLength,message:`长度在2-${this.titleLength}个字符`,trigger:"blur"}],desc:[{min:0,max:this.descLength,message:`活动描述在0-${this.descLength}个字符之间`,trigger:"blur"}]}}},created(){this.info.title=this.title,this.info.desc=this.desc;let e=this;this.$watch("title",t=>{e.info.title=t}),this.$watch("desc",t=>{e.info.desc=t})},methods:{titleInput(e){this.$emit("titleInput",{value:e})},descInput(e){this.$emit("descInput",{value:e})}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"root"}},[s("el-form",{ref:"infoForm",attrs:{model:e.info,rules:e.rules,hideRequiredAsterisk:e.state.require,"label-width":"100px","label-position":"top"}},[s("el-form-item",{attrs:{label:"模板名称：",prop:"title"}},[s("el-input",{attrs:{placeholder:"请输入模板名称",maxlength:"15"},on:{input:e.titleInput},model:{value:e.info.title,callback:function(t){e.$set(e.info,"title",t)},expression:"info.title"}}),e._v(" "),s("span",{staticClass:"words-tips"},[e._v(e._s(e.info.title.length)+"/"+e._s(e.titleLength))])],1),e._v(" "),s("el-form-item",{attrs:{label:"模板描述：",prop:"desc"}},[s("el-input",{attrs:{placeholder:"请输入模板描述",type:"textarea",maxlength:"50",resize:"false"},on:{input:e.descInput},model:{value:e.info.desc,callback:function(t){e.$set(e.info,"desc",t)},expression:"info.desc"}}),e._v(" "),s("span",{staticClass:"words-tips"},[e._v(e._s(e.info.desc.length)+"/"+e._s(e.descLength))])],1)],1)],1)},staticRenderFns:[]};var a=s("VU/8")(i,n,!1,function(e){s("tIZb")},null,null);t.a=a.exports},tIZb:function(e,t){}});
//# sourceMappingURL=0.38c5692fa03d197dc84a.js.map