(window.webpackJsonp=window.webpackJsonp||[]).push([[25,3],{1:function(t,e,n){"use strict";n.r(e);var a=n(2),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},10:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(n(32)),i=s(n(56));function s(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{isZS:-1!=sessionStorage.getItem("prefix").indexOf("hbz"),isHH:-1!=sessionStorage.getItem("prefix").indexOf("hbh"),isSK:-1!=sessionStorage.getItem("prefix").indexOf("sk")}},components:{codePrompt:i.default},props:{codeImg:{type:String,required:!0}},mounted:function(){(0,a.default)("html,body").css({overflow:"hidden",height:"100%"})},methods:{handleClose:function(){this.$emit("codeClose"),(0,a.default)("html,body").css({overflow:"auto",height:"100%"})}}}},11:function(t,e,n){"use strict";n.r(e);var a=n(12),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},12:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},components:{},methods:{}}},1205:function(t,e,n){"use strict";n(84);var a=o(n(77)),i=o(n(1206));n(42),n(44);var s=o(n(5));function o(t){return t&&t.__esModule?t:{default:t}}o(n(158)).default.attach(document.body),a.default.prototype.Fetch=s.default,new a.default({render:function(t){return t(i.default)}}).$mount("#app")},1206:function(t,e,n){"use strict";n.r(e);var a=n(728),i=n(326);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(1207);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"7a1ee6be",null);r.options.__file="voice6.vue",e.default=r.exports},1207:function(t,e,n){"use strict";var a=n(328);n.n(a).a},13:function(t,e,n){},14:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var a=n(16),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},16:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(n(63)),i=o(n(32)),s=o(n(5));function o(t){return t&&t.__esModule?t:{default:t}}e.default={props:["msg"],components:{agreePolicy:a.default},data:function(){return{count:0,phone:"",code:"",reg:/^1[3456789]\d{9}$/,codeReg:/^(\d){6}$/,yzm:"",errFlag:!1,disFlag:!1,confirmBtnStatus:!1,bgColor:"#bebebe"}},mounted:function(){var t=this;(0,i.default)("html,body").css({overflow:"hidden",height:"100%"});var e=JSON.parse(sessionStorage.getItem("theme"));null!=e?this.bgColor=e.bgColor:this.getStyle().then(function(e){var n=e.conf;sessionStorage.setItem("theme",n);var a=JSON.parse(sessionStorage.getItem("theme"));t.bgColor=a.bgColor})},methods:{getStyle:function(){return s.default.get("/syx/org/style?_="+Date.parse(new Date))},changeCheck:function(t){this.confirmBtnStatus=!t},blurEvent:function(){document.activeElement.scrollIntoViewIfNeeded(!0)},handleGetCode:function(){this.disFlag=!0;var t=this,e=null,n=event.target;this.$data.count=59;var a=this.$refs.phone.value;this.reg.test(this.phone)?(this.$refs.telErr.style.display="none",n.innerText="重新发送(60)",e=setInterval(function(){n.innerText="重新发送("+t.$data.count--+")",t.$data.count||(clearInterval(e),e=null,t.disFlag=!1,n.innerText="获取验证码")},1e3),this.$emit("getcode",{phone:a})):(this.$refs.telErr.style.display="block",this.disFlag=!1)},handleValidate:function(t){this.phone=this.$refs.phone.value,this.code=this.$refs.code.value,0==t&&(this.phone&&this.reg.test(this.phone)?this.$refs.telErr.style.display="none":this.$refs.telErr.style.display="block"),1==t&&(this.code?this.codeReg.test(this.code)?(this.errFlag=!1,this.yzm="1"):(this.errFlag=!0,this.yzm="2"):(this.errFlag=!0,this.yzm="0"))},showCodeErr:function(){this.errFlag=!0,this.yzm="3"},handleSubmit:function(){var t=this.phone,e=this.code;this.msg;this.reg.test(this.phone)?(this.errFlag=!0,this.code?this.codeReg.test(this.code)?this.$emit("submitcode",{phone:t,code:e}):this.yzm="2":this.yzm="0"):this.$refs.telErr.style.display="block"},handleCannelBtn:function(){this.$refs.phone.value="",this.$refs.code.value="",this.$refs.telErr.style.display="none",this.yzm="",this.$refs.agree.setChecked(),this.confirmBtnStatus=!1,this.$emit("handlecannel"),(0,i.default)("html,body").css({overflow:"auto",height:"100%"})}}}},17:function(t,e,n){"use strict";n.r(e);var a=n(18),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},18:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(n(64));e.default={data:function(){return{isChecked:!0,ifPolicyShow:!1}},components:{policyPage:a.default},methods:{changeCheck:function(){this.isChecked=!this.isChecked,this.$emit("changeCheck",this.isChecked)},setChecked:function(){this.isChecked=!0},policyShow:function(){this.ifPolicyShow=!0},policyClose:function(){this.ifPolicyShow=!1}}}},19:function(t,e,n){"use strict";n.r(e);var a=n(20),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},20:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},methods:{policyClose:function(){this.$emit("policyClose")},policyBtn:function(){this.$emit("policyClose")}}}},21:function(t,e,n){},22:function(t,e,n){},23:function(t,e,n){},24:function(t,e,n){"use strict";n.r(e);var a=n(25),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},25:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(n(32));e.default={data:function(){return{}},mounted:function(){(0,a.default)("html,body").css({overflow:"hidden",height:"100%"})},methods:{handleClose:function(){this.$emit("closeCZqrcode"),(0,a.default)("html,body").css({overflow:"auto",height:"100%"})}}}},26:function(t,e,n){},27:function(t,e,n){"use strict";n.r(e);var a=n(28),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},28:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){t&&t.__esModule}(n(32));e.default={props:{duration:{type:Number,default:3e3},list:{type:[Object,Array],default:null},background:{type:String,default:""},textColor:{type:String,default:"#fff"},border:{type:String,default:"1px solid rgba(255, 255, 255,0)"},awdNameStyle:{type:Object,default:function(){return{color:"#fff"}}},showDrawTime:{type:Boolean,default:!0}},data:function(){return{top:0,anim:!0}},created:function(){var t=this;if(this.list){var e=this.list[0];this.list.push(e);setInterval(function(){t.marque()},this.duration)}},methods:{marque:function(){var t=this;this.list,this.top;if(Math.abs(this.top.toFixed(3))>=(.666*(this.list.length-1)).toFixed(3)-0)return this.top=0,this.anim=!1,void setTimeout(function(){t.top-=.666,t.anim=!0},100);this.top-=.666,this.anim=!0}}}},29:function(t,e,n){},3:function(t,e,n){},30:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={getQuerys:function(){return window.location.search.substr(1)},getQueryString:function(t){return function(t){var e=new RegExp("(?:^|&)"+t+"=([^&]*)(?:&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[1]:null}(t)},remQueryString:function(t){return function(t){var e=window.location.search.substr(1);if(e.indexOf(t)>-1){for(var n={},a=e.split("&"),i=0;i<a.length;i++)a[i]=a[i].split("="),n[a[i][0]]=a[i][1];delete n[t],e=JSON.stringify(n).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&")}return e}(t)},getRandomStr:function(t,e,n){return function(t,e,n){var a="",i=e,s=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if("number"!=typeof i)return console.log("getRandomStr: min值应为Number类型");if(t){if("number"!=typeof n)return console.log("getRandomStr: max值应为Number类型");i=Math.round(Math.random()*(n-e))+e}for(var o=0;o<i;o++)a+=s[Math.round(Math.random()*(s.length-1))];return a}(t,e,n)},compare:function(t,e){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return function(n,a){var i=n[t],s=a[t];return e?i-s:s-i}}(t,e)}};e.default=a},31:function(t,e,n){"use strict";var a=function(){var t=this.$createElement;this._self._c;return this._m(0)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-bg"},[e("div",{staticClass:"content"},[this._v("\n        正在加载中...\n    ")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},326:function(t,e,n){"use strict";n.r(e);var a=n(327),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},327:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(n(76)),i=s(n(30));s(n(32));function s(t){return t&&t.__esModule?t:{default:t}}var o=["今日荷花别样红","荷花梦","荷花盛开","心正气和","福到荷家","荷家欢乐","新年开运","福气满满","新年新气象","健康是福","新年礼遇","新篇章"];e.default={mixins:[a.default],data:function(){return{actForm:"act-601",actCode:i.default.getQueryString("actCode"),title:"",loadingAnimate:!1,preloading:!1,accepted:!1,hookStatus:0,time:30,timeCounter:"",timeOut:!1,isShare:sessionStorage.getItem("shareAct"),shareFlg:!1,shareInfo:"",shareObj:{},domain:"http://"+sessionStorage.getItem("prefix"),clickAble:!1,showLayer:!1,showTips:!1,showAward:!1,showNoAward:!1,showRecording:!1,weixin_token:{},stepAct:"",setTimeoutFlag:""}},created:function(){var t=this;this.title=o[Math.floor(Math.random()*o.length)],this.Fetch.post("/syx/wx/jsapi",{url:location.href.split("#")[0]}).then(function(e){t.weixin_token=e,wx.config({debug:!1,appId:e.appId,timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["hideMenuItems","startRecord","onVoiceRecordEnd","stopRecord","translateVoice"]}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:QZone","menuItem:share:email","menuItem:openWithSafari","menuItem:openWithQQBrowser","menuItem:favorite","menuItem:copyUrl"]})})})},mounted:function(){var t=this;window.onload=function(){t.load=!1}},methods:{getAwardList:function(){},alertFn:function(){this.$refs.alert.show=!1},goToNext:function(){this.showLayer=!1,this.showAward=!1,this.showNoAward=!1,this.canDraw=!1,window.location="/yx/views/hesheng2021/niudan.html"},handleStartSounding:function(){if(clearTimeout(this.setTimeoutFlag),this.canDraw){console.log("录音开始");var t=this;wx.startRecord(),this.showRecording=!0,wx.onVoiceRecordEnd({complete:function(e){var n=e.localId;wx.translateVoice({localId:n,isShowProgressTips:1,success:function(e){var n=e.translateResult.split(""),a=t.title.split(""),i=0;n.forEach(function(t,e){a.includes(t)&&(i+=1)}),i>=2?t.drawAward():(t.$refs.alert.show=!0,t.clickFlag=!1,t.constants={title:"提示",msg:"语音识别失败，请再试一次或在公众号后台回复“荷声”，获取详细参与攻略~",type:"alert",text:["知道了"]})}})}})}},handleEndSounding:function(){if(this.canDraw){this.showRecording=!1,console.log("录音结束"),this.loadingAnimate=!0;var t=this,e=!0;wx.stopRecord({success:function(n){e=!1,t.loadingAnimate=!1;var a=n.localId;wx.translateVoice({localId:a,isShowProgressTips:1,success:function(e){var n=e.translateResult.split(""),a=t.title.split(""),i=0;n.forEach(function(t,e){a.includes(t)&&(i+=1)}),i>=2?(this.loadingAnimate=!0,t.drawAward()):(t.$refs.alert.show=!0,t.clickFlag=!1,t.constants={title:"提示",msg:"语音识别失败，请再试一次或在公众号后台回复“荷声”，获取详细参与攻略~",type:"alert",text:["知道了"]})}})}}),this.setTimeoutFlag=setTimeout(function(){e&&(t.loadingAnimate=!1,t.$refs.alert.show=!0,t.clickFlag=!1,t.constants={title:"提示",msg:"语音识别失败，请再试一次或在公众号后台回复“荷声”，获取详细参与攻略~",type:"alert",text:["知道了"]})},8e3)}},closeBtn:function(){this.state.page=1},goHome:function(){location.href="../../views/common/yz.html?t="+ +new Date},drawAward:function(){var t=this;this.Fetch.get("/syx/act/pr/draw",{actCode:this.actCode,ticket:this.ticket}).then(function(e){t.loadingAnimate=!1,"200"===e.code?e.data&&null!=e.data?(t.state.award=!0,t.drawData=e.data,t.showLayer=!0,t.showAward=!0):(t.showLayer=!0,t.showNoAward=!0):(t.$refs.alert.show=!0,t.clickFlag=!1,t.constants={title:"提示",msg:e.msg,type:"alert",text:["知道了"]})})}}}},328:function(t,e,n){},33:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"root"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"confirm-alert-wrap"},[n("div",{staticClass:"confirm-mask border-box"},[n("p",{staticClass:"title"},[t._v(t._s(t.constants.title||"提示"))]),t._v(" "),n("p",{staticClass:"message",domProps:{innerHTML:t._s(t.constants.msg?t.constants.msg:"提示")}},[t._v(t._s(t.constants.msg||"提示"))]),t._v(" "),"confirm"===t.constants.type?n("div",{staticClass:"btn-double border-box"},[n("div",{staticClass:"btn-left border-box",on:{click:t.close}},[t._v("\n\t\t\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"btn-right border-box",on:{click:t.close}},[t._v("\n\t\t\t\t\t"+t._s(t.constants.text[1]||"取消")+"\n\t\t\t\t")])]):t._e()]),t._v(" "),"alert"!==t.constants.type||t.constants.flag?"alert"===t.constants.type&&"1"==t.constants.flag?n("div",{staticClass:"btn-middle",on:{click:t.goHome}},[t._v("\n\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t")]):"alert"===t.constants.type&&"2"==t.constants.flag?n("div",{staticClass:"btn-middle",on:{click:t.callback}},[t._v("\n\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t")]):t._e():n("div",{staticClass:"btn-middle",on:{click:t.close}},[t._v("\n\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t")])])])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},34:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"crCode-ui",staticStyle:{"z-index":"10000"}},[a("div",{staticClass:"crCode-container"},[a("img",{staticClass:"crCode-bgc",attrs:{src:n(55)}}),t._v(" "),a("img",{staticClass:"crCode-close",attrs:{src:n(41)},on:{click:t.handleClose}}),t._v(" "),a("div",{staticClass:"crCode-info"},[t.isZS?a("p",[t._v("请长按以下二维码图片进行关注（如无法关注，请保存二维码图片自行关注），活动奖励将发放至"),a("em",[t._v("公众号--本自在--个人中心--我的礼品")]),t._v("中，请尽快领取！逾期不再重新发放！")]):t._e(),t._v(" "),t.isHH?a("p",[t._v("请长按以下二维码图片进行关注（如无法关注，请保存二维码图片自行关注），活动奖励将发放至"),a("em",[t._v("公众号--我与荷--个人中心--我的礼品")]),t._v("中，请尽快领取！逾期不再重新发放！")]):t._e(),t._v(" "),t.isSK?a("p",[t._v("请长按以下二维码图片进行关注（如无法关注，请保存二维码图片自行关注），活动奖励将发放至"),a("em",[t._v("公众号--消费者--个人中心--我的礼品")]),t._v("中，请尽快领取！逾期不再重新发放！")]):t._e(),t._v(" "),a("p")]),t._v(" "),a("div",{staticClass:"crCode-pic"},[a("img",{attrs:{src:t.codeImg}})]),t._v(" "),a("p",[t._v("长按扫描二维码，关注公众号")]),t._v(" "),a("codePrompt")],1)])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},35:function(t,e,n){"use strict";var a=function(){var t=this.$createElement;this._self._c;return this._m(0)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"toba_prompt"},[e("img",{attrs:{src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/common/code-prompt-icon.png"}}),this._v("本平台含烟草内容，18周岁以下人士请勿关注；\n        "),e("p",[this._v("每周将推送相关信息，若不愿接受请勿关注")])])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},36:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"valiadate_wrap",staticStyle:{"z-index":"40"}},[n("div",{staticClass:"tel border-box"},[n("img",{staticClass:"close",attrs:{src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/common/phone/phone_close.png"},on:{click:t.handleCannelBtn}}),t._v(" "),n("p",[t._v("验证手机")]),t._v(" "),n("div",{staticClass:"login_tel border-box"},[n("span",{staticClass:"phone-icon"}),t._v(" "),n("input",{ref:"phone",staticClass:"code",attrs:{type:"tel",placeholder:"手机号",id:"telephone",maxlength:"11"},on:{change:function(e){t.handleValidate(0)},blur:t.blurEvent}}),t._v(" "),n("div",{ref:"telErr",staticClass:"tel-err"},[t._v("请输入正确的手机号")])]),t._v(" "),n("div",{staticClass:"login_tel message border-box"},[n("span",{staticClass:"code-icon"}),t._v(" "),n("input",{ref:"code",staticClass:"code",attrs:{type:"tel",placeholder:"验证码",id:"yan",maxlength:"6"},on:{change:function(e){t.handleValidate(1)},blur:t.blurEvent}}),t._v(" "),n("button",{staticClass:"send gray_btn",style:{color:t.bgColor},attrs:{disabled:t.disFlag},on:{click:t.handleGetCode}},[t._v("获取验证码")]),t._v(" "),"0"===t.msg?n("div",{ref:"yan-err",staticClass:"yan-err"},[t._v("请输入验证码")]):"2"===t.msg?n("div",{staticClass:"yan-err"},[t._v("验证码不匹配")]):t._e(),t._v(" "),t.errFlag?n("div",{ref:"err-con"},["0"==t.yzm?n("div",{ref:"yan-err",staticClass:"yan-err"},[t._v("请输入验证码")]):t._e(),t._v(" "),"2"==t.yzm?n("div",{staticClass:"yan-err"},[t._v("请输入正确的验证码")]):t._e(),t._v(" "),"3"==t.yzm?n("div",{staticClass:"yan-err"},[t._v("验证码不匹配")]):t._e(),t._v(" "),"1"==t.yzm?n("div",{staticClass:"yan-err"}):t._e()]):t._e()]),t._v(" "),n("agree-policy",{ref:"agree",on:{changeCheck:t.changeCheck}}),t._v(" "),n("button",{staticClass:"verify",style:{background:t.bgColor},attrs:{disabled:t.confirmBtnStatus},on:{click:t.handleSubmit}},[t._v("确认")])],1)])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},37:function(t,e,n){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"crCode-ui",staticStyle:{"z-index":"10000"}},[e("div",{staticClass:"crCode-container"},[e("img",{staticClass:"crCode-bgc",attrs:{src:"https://qrmkt.oss-cn-beijing.aliyuncs.com/common/cangzhou.qr.png"}}),this._v(" "),e("img",{staticClass:"crCode-close",attrs:{src:n(41)},on:{click:this.handleClose}})])])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},38:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"validate"},[n("label",{attrs:{for:""}},[n("input",{attrs:{type:"checkbox"},domProps:{checked:t.isChecked},on:{click:t.changeCheck}}),t._v("我已阅读并同意“"),n("a",{attrs:{href:"javascript:;"},on:{click:t.policyShow}},[t._v("验真平台隐私政策")]),t._v("”")])]),t._v(" "),t.ifPolicyShow?n("policyPage",{on:{policyClose:t.policyClose}}):t._e()],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},39:function(t,e,n){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"root"},[e("div",{staticClass:"policy-close",on:{click:this.policyBtn}}),this._v(" "),this._m(0)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"policy"}},[n("h2",[t._v("验真平台隐私政策")]),t._v(" "),n("p",[t._v("尊敬的用户：")]),t._v(" "),n("p",[t._v("我们非常重视您的隐私和个人信息保护。您在使用我们的产品与/或服务时，我们可能会收集和使用您的相关信息。我们希望通过《验真平台隐私政策（“本隐私政策”）向您说明我们在您使用我们的产品与/或服务时如何收集、使用、保存这些信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。如果您不同意本隐私政策的任何内容，您应立即停止使用手机验证服务。当您使用我们提供的任一服务时，即表示您已同意我们按照本隐私政策来合法使用和保护您的个人信息。")]),t._v(" "),n("p",[t._v("我们的产品与/或服务包括一些核心功能，这些功能包含了实现扫码验真所必须的功能、改进我们的产品与/或服务所必须的功能及保障交易安全所必须的功能。我们可能会收集、保存和使用下列与您有关的信息才能实现上述这些功能。如果您不提供相关信息，您将无法享受我们提供的产品与/或服务。")]),t._v(" "),n("h3",[t._v("一、您须授权我们收集和使用您的个人信息包括：")]),t._v(" "),n("ol",[n("li",[t._v("（1）手机号注册。您首先需要验证手机号注册一个账户。当您注册时，您需要至少向我们提供您本人的手机号码，我们将通过发送短信验证码的方式来验证您的身份是否有效。您的账户名为您的微信默认昵称。")]),t._v(" "),n("li",[t._v("（2）您的位置信息。当您使用我们的验真平台相关服务时，我们可能会读取您的位置（大多数移动设备将允许您关闭定位服务，具体建议您联系您的移动设备的服务商或生产商）。")]),t._v(" "),n("li",[t._v("（3）您的设备信息。我们可能会读取您或使用验真服务时所使用的终端设备的信息，包括但不限于设备型号、设备识别码、操作系统、分辨率、电信运营商等。")]),t._v(" "),n("li",[t._v("（4）您的行为或相关访问信息。我们可能会记录您使用验真服务时所进行的操作以及您在平台上进行访问的相关信息。")])]),t._v(" "),n("h3",[t._v("二、来自第三方的信息")]),t._v(" "),n("p",[t._v("指在您注册验真平台账户和使用服务过程中，您授权验真平台可向验真平台的关联方、合作伙伴获取其所收集的相关信息。这些信息包括但不限于您的身份信息、行为信息、设备信息等，我们会将此类信息汇总，用于帮助您提供更好以及更加个性化的服务或更好的预防互联网欺诈。")]),t._v(" "),n("h3",[t._v("三、我们对您个人信息的管理和使用")]),t._v(" "),n("p",[t._v("为向您提供服务、提升我们的服务质量以及优化您的服务体验，我们会在符合法律规定下使用您的个人信息，并主要用于下列用途：")]),t._v(" "),n("ol",[n("li",[t._v("1、向您提供您使用的各项服务，并维护、改进这些服务。")]),t._v(" "),n("li",[t._v("2、我们可能会将来自某项服务的个人信息与来自其他服务所获得的信息结合起来，用于为了给您提供更加个性化的服务使用。")]),t._v(" "),n("li",[t._v("3、经您同意或授权的其他用途。")])]),t._v(" "),n("h3",[t._v("四、您个人信息的分享")]),t._v(" "),n("p",[t._v("您的个人信息是我们为您提供服务的重要部分，我们会遵循法律规定对您的信息承担保密义务。除以下情形外，我们不会将您的个人信息披露给第三方：")]),t._v(" "),n("ol",[n("li",[t._v("1、征得您的同意或授权。")]),t._v(" "),n("li",[t._v("2、根据法律法规的规定或行政或司法机构的要求。")]),t._v(" "),n("li",[t._v("3、只有共享您的信息，才能提供您需要的服务，或处理您与他人的纠纷或争议。")]),t._v(" "),n("li",[t._v("4、您出现违反中国有关法律、法规规定或者违反您与我们签署的相关协议（包括在线签署的电子协议）。")])]),t._v(" "),n("h3",[t._v("五、您个人信息的安全")]),t._v(" "),n("p",[t._v("我们严格保护您的个人信息安全。我们使用各种制度、安全技术和程序等措施来保护您的个人信息不被未经授权的访问、篡改、披露或破坏。")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},4:function(t,e,n){},40:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.list?n("div",{staticClass:"marque",style:{background:t.background,color:t.textColor,border:t.border}},[n("ul",{class:{"marque-list":!0,anim:t.anim},style:{transform:"translateY("+t.top+"rem)"}},t._l(t.list,function(e,a){return n("li",{key:a},[t._v("恭喜 "+t._s(e.nickname)+" 获得 "),n("span",{style:t.awdNameStyle},[t._v(t._s(e.awdName))]),t._v(" "+t._s(t.showDrawTime?e.drawTime:""))])}))]):t._e()},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},41:function(t,e,n){t.exports=n.p+"assets/close.png"},42:function(t,e,n){},44:function(t,e,n){"use strict";!function(t,e){var n,a=t.document,i=a.documentElement,s=a.querySelector('meta[name="viewport"]'),o=a.querySelector('meta[name="flexible"]'),r=0,c=0,l=e.flexible||(e.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var u=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);u&&(c=parseFloat(u[1]),console.log("scale",c),r=parseInt(1/c))}else if(o){var d=o.getAttribute("content");if(d){var f=d.match(/initial\-dpr=([\d\.]+)/),h=d.match(/maximum\-dpr=([\d\.]+)/);f&&(r=parseFloat(f[1]),c=parseFloat((1/r).toFixed(2))),h&&(r=parseFloat(h[1]),c=parseFloat((1/r).toFixed(2)))}}if(!r&&!c){t.navigator.appVersion.match(/android/gi);var v=t.navigator.appVersion.match(/iphone/gi),m=t.devicePixelRatio;c=1/(r=v?m>=3&&(!r||r>=3)?3:m>=2&&(!r||r>=2)?2:1:1)}if(i.setAttribute("data-dpr",r),!s)if((s=a.createElement("meta")).setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+c+", maximum-scale="+c+", minimum-scale="+c+", user-scalable=no"),i.firstElementChild)i.firstElementChild.appendChild(s);else{var g=a.createElement("div");g.appendChild(s),a.write(g.innerHTML)}function p(){var e=i.getBoundingClientRect().width;e/r>540&&(e=540*r);var n=e/10;i.style.fontSize=n+"px",l.rem=t.rem=n}t.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(p,300)},!1),t.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(n),n=setTimeout(p,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*r+"px":a.addEventListener("DOMContentLoaded",function(t){a.body.style.fontSize=12*r+"px"},!1),p(),l.dpr=t.dpr=r,l.refreshRem=p,l.rem2px=function(t){var e=parseFloat(t)*this.rem;return"string"==typeof t&&t.match(/rem$/)&&(e+="px"),e},l.px2rem=function(t){var e=parseFloat(t)/this.rem;return"string"==typeof t&&t.match(/px$/)&&(e+="rem"),e}}(window,window.lib||(window.lib={}))},45:function(t,e,n){"use strict";n.r(e);var a=n(31),i=n(1);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(46);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"a64a99d6",null);r.options.__file="loading.directive.vue",e.default=r.exports},46:function(t,e,n){"use strict";var a=n(3);n.n(a).a},48:function(t,e,n){"use strict";n.r(e);n(49);var a=n(0),i=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-animate-con"},[e("div",{staticClass:"loading-animate"},[e("p",[this._v("加载中,请稍后...")])])])}],!1,null,"f0af2562",null);i.options.__file="loadingAnimate.directive.vue";e.default=i.exports},49:function(t,e,n){"use strict";var a=n(4);n.n(a).a},5:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(n(30));var s=t.CancelToken.source();if(t.defaults.headers["X-Requested-With"]="XMLHttpRequest",!sessionStorage.getItem("token")){var o=i.default.getQueryString("token");sessionStorage.setItem("token",o)}function r(e,n,i,o){var r={method:e,url:n,cancelToken:s.token};return"get"===e?r.params=i:"post"===e&&(1==o?(r.headers={"Content-type":"application/json;charset=UTF-8"},r.data=JSON.stringify(i)):r.data=a.stringify(i)),new Promise(function(e,n){t(r).then(function(t){200==t.status&&null!=t.data&&e(t.data)}).catch(function(t){window.location.href="/yx/views/general/overtime-error.html",n(t)})})}t.defaults.headers.token=sessionStorage.getItem("token"),t.defaults.timeout=6e4;var c={get:function(t,e){return r("get",t,e)},post:function(t,e,n){return r("post",t,e,n)}};e.default=c}).call(this,n(79),n(80))},51:function(t,e,n){"use strict";n.r(e);var a=n(33),i=n(6);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(52);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"43654d65",null);r.options.__file="alert.directive.vue",e.default=r.exports},52:function(t,e,n){"use strict";var a=n(8);n.n(a).a},54:function(t,e,n){"use strict";n.r(e);var a=n(34),i=n(9);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(59);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"d7dee012",null);r.options.__file="crCode.directive.vue",e.default=r.exports},55:function(t,e,n){t.exports=n.p+"assets/background.png"},56:function(t,e,n){"use strict";n.r(e);var a=n(35),i=n(11);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(57);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"546b8592",null);r.options.__file="zsCodePrompt.directive.vue",e.default=r.exports},57:function(t,e,n){"use strict";var a=n(13);n.n(a).a},59:function(t,e,n){"use strict";var a=n(14);n.n(a).a},6:function(t,e,n){"use strict";n.r(e);var a=n(7),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},61:function(t,e,n){"use strict";n.r(e);var a=n(36),i=n(15);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(69);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"a362e416",null);r.options.__file="validateMobile.vue",e.default=r.exports},62:function(t,e,n){"use strict";n.r(e);var a=n(37),i=n(24);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(71);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"23f76964",null);r.options.__file="crCode.cangzhou.vue",e.default=r.exports},63:function(t,e,n){"use strict";n.r(e);var a=n(38),i=n(17);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(67);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"bba52672",null);r.options.__file="agreePolicy.directive.vue",e.default=r.exports},64:function(t,e,n){"use strict";n.r(e);var a=n(39),i=n(19);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(65);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,"7fdc367c",null);r.options.__file="policyPage.directive.vue",e.default=r.exports},65:function(t,e,n){"use strict";var a=n(21);n.n(a).a},67:function(t,e,n){"use strict";var a=n(22);n.n(a).a},69:function(t,e,n){"use strict";var a=n(23);n.n(a).a},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"alert",data:function(){return{show:!1}},props:{constants:{type:Object,required:!0}},methods:{close:function(){var t=event.currentTarget;this.show=!1,t.className.indexOf("btn-left")>=0?this.$emit("getAwardFn"):t.className.indexOf("btn-right")>=0?this.$emit("cancelFn"):t.className.indexOf("btn-middle")>=0&&this.$emit("alertFn")},goHome:function(){location.href="../../views/common/yz.html?t="+ +new Date+"&from=others"},callback:function(){this.show=!1,this.$emit("alertCallback")}}}},71:function(t,e,n){"use strict";var a=n(26);n.n(a).a},728:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.load?n("loading"):t._e(),t._v(" "),n("loading-animate",{directives:[{name:"show",rawName:"v-show",value:t.loadingAnimate,expression:"loadingAnimate"}]}),t._v(" "),n("validate-mobile",{directives:[{name:"show",rawName:"v-show",value:t.valiadateFlag,expression:"valiadateFlag"}],ref:"validatePhone",attrs:{msg:t.message},on:{getcode:t.handleGetCode,submitcode:t.handleSubmitCode,handlecannel:t.handleCannelBtn}}),t._v(" "),n("alert-dialog",{ref:"alert",attrs:{constants:t.constants},on:{alertFn:t.alertFn,alertCallback:t.goToNext}}),t._v(" "),t.codeFlag?n("crCode",{attrs:{codeImg:t.codeImg},on:{codeClose:t.codeClose}}):t._e(),t._v(" "),n("div",{staticClass:"page page1"},[n("div",{staticClass:"tips",on:{click:function(e){t.showTips=!0,t.showLayer=!0}}}),t._v(" "),n("div",{staticClass:"title"},[t._v("“ "+t._s(t.title)+" ”")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showRecording,expression:"showRecording"}],staticClass:"recording-pop"},[t._m(0),t._v(" "),n("div",{staticClass:"recording-tips"},[t._v("录音中...")])]),t._v(" "),n("div",{staticClass:"sound-recording"},[n("div",{staticClass:"recording-btn",on:{touchstart:t.handleStartSounding,touchend:t.handleEndSounding}})]),t._v(" "),t.showLayer?n("div",{staticClass:"layer"},[n("div",{staticClass:"bg"}),t._v(" "),t.showTips?n("div",{staticClass:"tips"},[t._m(1)]):t._e(),t._v(" "),t.showTips?n("div",{staticClass:"close",staticStyle:{top:"1.4rem"},on:{click:function(e){t.showTips=!1,t.showLayer=!1}}}):t._e(),t._v(" "),t.showAward?n("div",{staticClass:"award",class:{hb:3==t.drawData.awdType}},[n("div",{staticClass:"money"},[t._v(t._s(t.drawData.awdName))]),t._v(" "),n("div",{staticClass:"get-award",on:{click:function(e){t.gotoReceive(t.drawData)}}})]):t._e(),t._v(" "),t.showNoAward?n("div",{staticClass:"no-award"},[n("div",{staticClass:"text"},[t._v("未中奖")]),t._v(" "),n("div",{staticClass:"ok",on:{click:t.goToNext}})]):t._e(),t._v(" "),t.showAward||t.showNoAward?n("div",{staticClass:"close",staticStyle:{top:"1.4rem"},on:{click:t.goToNext}}):t._e()]):t._e()])],1)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex"},[e("div",{staticClass:"recording-icon"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{height:"5.3rem",overflow:"scroll",color:"#fff"}},[e("p",[this._v("1、长按屏幕说出语音口令，系统成功识别后即有机会获得荷石璧与鼓励金奖励，更有精彩游戏等您来玩。使用标准普通话说出语音口令可提高识别效率哦~")]),this._v(" "),e("p",[this._v("2、活动期间多多扫码，红包领不停，还有机会一起瓜分全国大奖，获得实物奖品，快来挑战吧！")]),this._v(" "),e("p",[this._v("3、活动时间：1月5日10:00-1月10日20:00")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},73:function(t,e,n){"use strict";n.r(e);var a=n(40),i=n(27);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(74);var o=n(0),r=Object(o.a)(i.default,a.a,a.b,!1,null,null,null);r.options.__file="marque.vue",e.default=r.exports},74:function(t,e,n){"use strict";var a=n(29);n.n(a).a},76:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=d(n(30)),i=d(n(51)),s=d(n(54)),o=d(n(73)),r=d(n(61)),c=d(n(45)),l=d(n(48)),u=d(n(62));function d(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{score_valid_time:sessionStorage.score_valid_time||"",conf:"",load:!0,loadingAnimate:!1,state:{page:1,tab:1,award:!1,running:!1},actCode:a.default.getQueryString("actCode"),valiadateFlag:!1,constants:{title:"提示",msg:"",type:"alert",text:["确定"]},codeFlag:!1,codeImg:"",canDraw:!1,myAward:null,ticket:"",ticketMsg:"",drawData:{awdName:"1111",awdType:1},message:"",awardList:null,actDesc:null,currItem:0,step:1,awdPos:null,award:null,itemImg:null,showAward:!1,clickFlag:!0,jinfo:!0,tipsObj:{200:"领取成功",4001:'每日最多可领取"10"个红包，您已达到领取上限，次日0点之后可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。',4002:"您还未进行微信实名认证，请先进行微信实名认证再领取红包！<br />奖品可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。",4003:"系统异常，请稍后重试<br />领取失败可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。"},showDouble:!1,doubleLog:"",MEMBERDAY_ACTIVE:!0,showAdvance:!1,showCZqrcode:!1}},components:{ValidateMobile:r.default,alertDialog:i.default,crCode:s.default,hMarque:o.default,loading:c.default,loadingAnimate:l.default,CZqrcode:u.default},mounted:function(){this.getAwardList(),this.jinfo&&this.getJinfo()},methods:{getJinfo:function(t){var e=this,n=this;this.Fetch.get("/syx/act/pr/jinfo",{actCode:this.actCode}).then(function(a){return"200"!==a.code?(e.$refs.alert.show=!0,e.constants={title:"提示",msg:a.msg,type:"alert",text:["知道了"]},e.canDraw=!1,n.clickFlag=!0,void(e.loadingAnimate=!1)):(e.ticketMsg=a.data.showMsg,a.data.canDraw?a.data.drawed?(e.$refs.alert.show=!0,e.constants={title:"提示",msg:a.data.showMsg,type:"alert",text:["知道了"]},e.canDraw=!1,n.clickFlag=!0,void(e.loadingAnimate=!1)):(e.canDraw=!0,e.ticket=a.data.ticket,void("function"==typeof t&&t(!0))):(e.$refs.alert.show=!0,e.constants={title:"提示",msg:a.data.showMsg,type:"alert",text:["知道了"]},e.canDraw=!1,e.loadingAnimate=!1,void(n.clickFlag=!0)))})},clickglist:function(t){0==t.awdStatus?this.gotoReceive(t):(1==t.awdStatus&&2==t.awdType||1==t.awdStatus&&1==t.awdType)&&this.gotoReceive(t)},gotoReceive:function(t){if(this.loadingAnimate=!0,9==t.awdType){this.loadingAnimate=!1;return this.$refs.alert.show=!0,void(this.constants={title:"提示",msg:"领取成功！",type:"alert",text:["确定"],flag:2})}return 0===t.awdStatus?(this.drawData=t,void(1!=t.awdType?this.getGift(t):(this.loadingAnimate=!1,window.location.href.indexOf("memberDay")>-1||window.location.href.indexOf("jihe")>-1?window.location="/yx/views/general/order-preview.html?uaId="+t.uaId+"&memberday=1":window.location="/yx/views/general/order-preview.html?uaId="+t.uaId))):1===t.awdStatus||0===t.awdStatus?2==t.awdType&&t.awdJumpurl?(this.loadingAnimate=!1,void(window.location=t.awdJumpurl)):(this.loadingAnimate=!1,void(window.location="/yx/views/general/gift-detail.html?uaId="+t.uaId)):void 0},getGift:function(t){var e=this;1==t.awdType&&(this.loadingAnimate=!1,window.location="/yx/views/general/order-preview.html"),1!=t.awdType?this.Fetch.post("/syx/awd/rcv/virtual",{uaId:t.uaId}).then(function(t){if(e.loadingAnimate=!1,"701"===t.code)return e.state.page=1,void(e.valiadateFlag=!0);if("702"===t.code)return e.state.page=1,void(e.showCZqrcode=!0);if("700"===t.code)return e.state.page=1,e.codeImg=t.data.qrUrl,void(e.codeFlag=!0);if(2==e.drawData.awdType&&e.drawData.awdJumpurl)var n={title:"提示",msg:"",type:"alert",text:["确定"],flag:2};else{if(t.data&&t.data.doubleLog)return e.showLayer&&(e.$refs.layerPage?e.$refs.layerPage.closeLayer():e.showLayer=!1),e.showDouble=!0,void(e.doubleLog=t.data.doubleLog);if(e.actForm&&"act-601"==e.actForm)n={title:"提示",msg:"",type:"alert",text:["确定"],flag:2};else if(e.actForm)if(e.MEMBERDAY_ACTIVE)n={title:"提示",msg:"",type:"alert",text:["确定"],flag:2};else n={title:"提示",msg:"",type:"alert",text:["确定"],flag:1};else var n={title:"提示",msg:"",type:"alert",text:["确定"],flag:2}}switch(t.code){case"200":case"4001":case"4002":case"4003":n.msg=e.tipsObj[t.code];break;default:n.msg=t.msg}e.$refs.alert.show=!0,e.constants=n,e.showRulePage&&e.$refs.rulesPage.getMyAward()}):this.loadingAnimate=!1},alertFn:function(){this.canDraw=!1,this.$refs.alert.show=!1},handleGetCode:function(t){var e=this,n=t.phone;this.Fetch.post("/syx/user/bind/svcode",{mobile:n}).then(function(t){"200"===t.code?console.log("发送成功"):(e.$refs.alert.show=!0,e.constants={title:"提示",msg:t.msg,type:"alert",text:["确定"]})})},handleSubmitCode:function(t){var e=this;this.loadingAnimate=!0;var n=t.phone,a=t.code;this.Fetch.post("/syx/user/bind/mobile",{mobile:n,vcode:a}).then(function(t){e.loadingAnimate=!1,"200"===t.code?(console.log("验证成功"),e.valiadateFlag=!1,e.getGift(e.drawData)):"500"===t.code&&"验证码错误，请稍后再试!"==t.msg?e.$refs.validatePhone.showCodeErr():(e.$refs.alert.show=!0,e.constants={title:"提示",msg:t.msg,type:"alert",text:["确定"]})})},getAwardList:function(){var t=this,e=this.actCode;this.Fetch.get("/syx/awd/act/awdList",{actCode:e}).then(function(e){if(200==e.code&&e.data.length>0){var n=e.data;n=n.map(function(t){return JSON.parse(t)}),t.awardList=n}})},handleCannelBtn:function(){this.valiadateFlag=!1},codeClose:function(){this.codeFlag=!this.codeFlag},gotoAwdJumpurl:function(){this.drawData.awdJumpurl&&(window.location=this.drawData.awdJumpurl),this.MEMBERDAY_ACTIVE&&(this.state.page=1,this.showMemberDayAdvance())},showMemberDayAdvance:function(){-1!=sessionStorage.getItem("prefix").indexOf("hbz")&&(this.showAdvance=!0)},closeCZqrcode:function(){this.showCZqrcode=!1}}}},8:function(t,e,n){},9:function(t,e,n){"use strict";n.r(e);var a=n(10),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a}},[[1205,1,0]]]);