(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1:function(t,e,n){"use strict";n.r(e);var s=n(2),o=n.n(s);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);e.default=o.a},10:function(t,e,n){},2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},220:function(t,e,n){"use strict";n.r(e);var s=n(221),o=n.n(s);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);e.default=o.a},221:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(n(7)),o=a(n(53)),r=a(n(45)),i=a(n(51));function a(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{actCode:s.default.getQueryString("actCode"),mesSnArr:["6901028077903","6901028077910","1111111114"],hhySnArr:["1111111111133","6901028079990","1111111111135","6901028080743"],lsqSnArr:["6901028079020","6901028079051"],goldSnArr:["6901028250474","6901028250481"],doubleSnArr:["6901028107136","6901028107150"],sn:"",isReg:!1,isFollow:!0,conf:{getCoins:{bg:"",btn:"",color:"",bgColor:""},reg:{bg:"",qr:"",color:""},qr:{bg:""}},vcodeBtnMsg:"获取验证码",vcodeBtnDisable:!1,user:{phoneNo:"",userName:"",verifyCode:"",cardNo:"",shopName:""},coinSuccFlag:!1,regSuccFlag:!1,regPoints:0,unit:"",constants:{title:"提示",msg:"",type:"alert",text:["确定"]},load:!0,loadingAnimate:!1,saveParams:"wiseqr",isGetPoints:!1,points:0,getMsg:""}},components:{alertDialog:o.default,loading:r.default,loadingAnimate:i.default},created:function(){var t=JSON.parse(sessionStorage.getItem("info"));this.sn=t.product.sn,this.isReg=!1,this.isSn(),this.isGetFn()},methods:{alertFn:function(){this.$refs.alert.show=!1},blurEvent:function(){document.activeElement.scrollIntoViewIfNeeded(!0)},isRegFn:function(){var t=this;this.Fetch.get("/seller-web/seller/is",{}).then(function(e){e.ok?e.data?(t.isReg=!1,t.getPointFn()):t.isReg=!0:(t.$refs.alert.show=!0,t.constants={title:"提示",msg:e.msg,type:"alert",text:["确定"]})})},isGetFn:function(){var t=this;this.Fetch.get("/syx/hb/hehua/isGetPoints",{}).then(function(e){"200"==e.code?e.data.points?(t.isGetPoints=!0,t.points=e.data.points):(t.isGetPoints=!1,t.points=e.data.points):(t.points=0,t.getMsg=e.msg,t.$refs.alert.show=!0,t.constants={title:"提示",msg:e.msg,type:"alert",text:["确定"],flag:1}),t.isSn()})},getCoinFn:function(){this.isGetPoints?1==JSON.parse(sessionStorage.getItem("info")).product.unitType?this.getPointFn():this.isRegFn():(this.$refs.alert.show=!0,this.constants={title:"提示",msg:this.getMsg,type:"alert",text:["确定"],flag:1})},getPointFn:function(){var t=this;this.loadingAnimate=!0,this.Fetch.get("/syx/hb/hehua/get/point",{points:this.points}).then(function(e){t.loadingAnimate=!1,"200"==e.code?(e.data.issubscrible?t.isReg?t.regSuccFlag=!0:t.coinSuccFlag=!0:t.isFollow=!1,t.isGetPoints=!1,t.getMsg="已领取过积分"):(t.$refs.alert.show=!0,t.constants={title:"提示",msg:e.msg,type:"alert",text:["确定"],flag:1})})},handleToFlowerShop:function(){this.coinSuccFlag=!1,this.regSuccFlag=!1;location.href="/scoremall/index.html"},isSn:function(){-1!=this.hhySnArr.indexOf(this.sn)||-1!=this.goldSnArr.indexOf(this.sn)?this.conf={getCoins:{bg:"https://qoss.qrmkt.cn/common/hebei/y_getCoins_bg.png",btn:"https://qoss.qrmkt.cn/common/hebei/y_getCoin_btn.png",color:"#824917",bgColor:"#FEF8F0"},reg:{bg:"https://qoss.qrmkt.cn/common/hebei/y_reg_bg.png",qr:"https://qoss.qrmkt.cn/common/hebei/y_reg_qr.png",color:"#AB794D"},qr:{bg:"https://qoss.qrmkt.cn/common/hebei/y_qr.png"}}:-1!=this.mesSnArr.indexOf(this.sn)?this.conf={getCoins:{bg:"https://qoss.qrmkt.cn/common/hebei/m_getCoins_bg.png",btn:"https://qoss.qrmkt.cn/common/hebei/m_getCoins_btn.png",color:"#106961",bgColor:"#E2F2F2"},reg:{bg:"https://qoss.qrmkt.cn/common/hebei/m_reg_bg.png",qr:"https://qoss.qrmkt.cn/common/hebei/m_reg_qr.png",color:"#126561"},qr:{bg:"https://qoss.qrmkt.cn/common/hebei/m_qr.png"}}:-1!=this.lsqSnArr.indexOf(this.sn)?this.conf={getCoins:{bg:"https://qoss.qrmkt.cn/common/hebei/g_getCoins_bg.png",btn:"https://qoss.qrmkt.cn/common/hebei/g_getCoins_btn.png",color:"#1C5100",bgColor:"#F4F7EA"},reg:{bg:"https://qoss.qrmkt.cn/common/hebei/g_reg_bg.png",qr:"https://qoss.qrmkt.cn/common/hebei/g_reg_qr.png",color:"#008203"},qr:{bg:"https://qoss.qrmkt.cn/common/hebei/g_qr.png"}}:-1!=this.doubleSnArr.indexOf(this.sn)&&(this.conf={getCoins:{bg:"https://qoss.qrmkt.cn/common/hebei/g_getCoins_bg.png",btn:"https://qoss.qrmkt.cn/common/hebei/g_getCoins_btn.png",color:"#1C5100",bgColor:"#F4F7EA"},reg:{bg:"https://qoss.qrmkt.cn/common/hebei/d_reg_bg.png",qr:"https://qoss.qrmkt.cn/common/hebei/d_reg_qr.png",color:"#4EA882"},qr:{bg:"https://qoss.qrmkt.cn/common/hebei/g_qr.png"}}),this.load=!1},send:function(){""!==this.user.phoneNo&&/^1[0-9]{10}$/.test(this.user.phoneNo)?this.vcodeBtnDisable||(this.vcodeBtnDisable=!0,this.verify()):(this.$refs.alert.show=!0,this.constants={title:"提示",msg:"请输入正确的手机号码",type:"alert",text:["确定"]})},verify:function(){var t=this,e=this,n=60,s=window.setInterval(function(){0==n--?(n=60,e.vcodeBtnDisable=!1,e.vcodeBtnMsg="获取验证码",window.clearInterval(s)):e.vcodeBtnMsg=n+"秒"},1e3),o=(new Date).getTime();this.Fetch.post("/seller-web/sms/sendSMS",{mobile:this.user.phoneNo,t:o,encrypt:this.$md5(this.saveParams+o+this.user.phoneNo)},!1).then(function(e){e.ok&&e.data&&200==e.data.code?console.log("发送成功"):(t.$refs.alert.show=!0,t.constants={title:"提示",msg:e.message,type:"alert",text:["确定"]})})},submit:function(){return this.user.userName?this.user.phoneNo||/^1[0-9]{10}$/.test(this.user.phoneNo)?this.user.verifyCode?12!=this.user.cardNo.length?(this.$refs.alert.show=!0,void(this.constants={title:"提示",msg:"您填写的许可证号不正确，请重新输入！",type:"alert",text:["确定"]})):this.user.shopName?void this.checkCode():(this.$refs.alert.show=!0,void(this.constants={title:"提示",msg:"请输入店铺名称！",type:"alert",text:["确定"]})):(this.$refs.alert.show=!0,void(this.constants={title:"提示",msg:"请输入验证码！",type:"alert",text:["确定"]})):(this.$refs.alert.show=!0,void(this.constants={title:"提示",msg:"请输入正确的手机号码！",type:"alert",text:["确定"]})):(this.$refs.alert.show=!0,void(this.constants={title:"提示",msg:"请输入店主姓名！",type:"alert",text:["确定"]}))},checkCode:function(){var t=this;this.loadingAnimate=!0;var e=(new Date).getTime();this.Fetch.post("/seller-web/sms/checkSMS",{mobile:this.user.phoneNo,t:e,encrypt:this.$md5(this.saveParams+e+this.user.phoneNo),code:this.user.verifyCode},!1).then(function(e){e.ok?t.submitFn():(t.loadingAnimate=!1,t.$refs.alert.show=!0,t.constants={title:"提示",msg:e.message,type:"alert",text:["确定"]})})},submitFn:function(){var t=this;this.Fetch.post("/seller-web/seller/regist",{mobile:this.user.phoneNo,owner:this.user.userName,licence:this.user.cardNo,shopName:this.user.shopName},!0).then(function(e){e.ok?(t.getPointFn(),t.user.phoneNo="",t.user.userName="",t.user.cardNo="",t.user.shopName="",t.user.verifyCode="",t.regPoints=e.data.giveVal,t.unit=e.data.integrateUnit):(t.loadingAnimate=!1,t.$refs.alert.show=!0,t.constants={title:"提示",msg:e.msg,type:"alert",text:["确定"]})})}}}},222:function(t,e,n){},3:function(t,e,n){},34:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"root"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"confirm-alert-wrap"},[n("div",{staticClass:"confirm-mask border-box"},[n("p",{staticClass:"title"},[t._v(t._s(t.constants.title||"提示"))]),t._v(" "),n("p",{staticClass:"message",domProps:{innerHTML:t._s(t.constants.msg?t.constants.msg:"提示")}},[t._v(t._s(t.constants.msg||"提示"))]),t._v(" "),"confirm"===t.constants.type?n("div",{staticClass:"btn-double border-box"},[n("div",{staticClass:"btn-left border-box",on:{click:t.close}},[t._v("\n\t\t\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t\t\t")]),t._v(" "),n("div",{staticClass:"btn-right border-box",on:{click:t.close}},[t._v("\n\t\t\t\t\t"+t._s(t.constants.text[1]||"取消")+"\n\t\t\t\t")])]):t._e()]),t._v(" "),"alert"!==t.constants.type||t.constants.flag?"alert"===t.constants.type&&"1"==t.constants.flag?n("div",{staticClass:"btn-middle",on:{click:t.goHome}},[t._v("\n\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t")]):"alert"===t.constants.type&&"2"==t.constants.flag?n("div",{staticClass:"btn-middle",on:{click:t.callback}},[t._v("\n\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t")]):t._e():n("div",{staticClass:"btn-middle",on:{click:t.close}},[t._v("\n\t\t\t"+t._s(t.constants.text[0]||"确定")+"\n\t\t")])])])},o=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return o})},4:function(t,e,n){"use strict";(function(t,s){Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){return t&&t.__esModule?t:{default:t}}(n(7));var r=t.CancelToken.source();if(t.defaults.headers["X-Requested-With"]="XMLHttpRequest",!sessionStorage.getItem("token")){var i=o.default.getQueryString("token");sessionStorage.setItem("token",i)}function a(e,n,o,i){var a={method:e,url:n,cancelToken:r.token};return"get"===e?a.params=o:"post"===e&&(1==i?(a.headers={"Content-type":"application/json;charset=UTF-8"},a.data=JSON.stringify(o)):a.data=s.stringify(o)),new Promise(function(e,n){t(a).then(function(t){200==t.status&&null!=t.data&&e(t.data)}).catch(function(t){window.location.href="/yx/views/general/overtime-error.html",n(t)})})}t.defaults.headers.token=sessionStorage.getItem("token"),t.defaults.timeout=6e4;var c={get:function(t,e){return a("get",t,e)},post:function(t,e,n){return a("post",t,e,n)}};e.default=c}).call(this,n(79),n(80))},42:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var s=n(6),o=n(1);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n(46);var i=n(0),a=Object(i.a)(o.default,s.a,s.b,!1,null,"198118d4",null);a.options.__file="loading.directive.vue",e.default=a.exports},46:function(t,e,n){"use strict";var s=n(3);n.n(s).a},48:function(t,e,n){"use strict";!function(t,e){var n,s=t.document,o=s.documentElement,r=s.querySelector('meta[name="viewport"]'),i=s.querySelector('meta[name="flexible"]'),a=0,c=0,l=e.flexible||(e.flexible={});if(r){console.warn("将根据已有的meta标签来设置缩放比例");var u=r.getAttribute("content").match(/initial\-scale=([\d\.]+)/);u&&(c=parseFloat(u[1]),console.log("scale",c),a=parseInt(1/c))}else if(i){var d=i.getAttribute("content");if(d){var m=d.match(/initial\-dpr=([\d\.]+)/),g=d.match(/maximum\-dpr=([\d\.]+)/);m&&(a=parseFloat(m[1]),c=parseFloat((1/a).toFixed(2))),g&&(a=parseFloat(g[1]),c=parseFloat((1/a).toFixed(2)))}}if(!a&&!c){t.navigator.appVersion.match(/android/gi);var h=t.navigator.appVersion.match(/iphone/gi),f=t.devicePixelRatio;c=1/(a=h?f>=3&&(!a||a>=3)?3:f>=2&&(!a||a>=2)?2:1:1)}if(o.setAttribute("data-dpr",a),!r)if((r=s.createElement("meta")).setAttribute("name","viewport"),r.setAttribute("content","initial-scale="+c+", maximum-scale="+c+", minimum-scale="+c+", user-scalable=no"),o.firstElementChild)o.firstElementChild.appendChild(r);else{var p=s.createElement("div");p.appendChild(r),s.write(p.innerHTML)}function v(){var e=o.getBoundingClientRect().width;e/a>540&&(e=540*a);var n=e/10;o.style.fontSize=n+"px",l.rem=t.rem=n}t.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(v,300)},!1),t.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(n),n=setTimeout(v,300))},!1),"complete"===s.readyState?s.body.style.fontSize=12*a+"px":s.addEventListener("DOMContentLoaded",function(t){s.body.style.fontSize=12*a+"px"},!1),v(),l.dpr=t.dpr=a,l.refreshRem=v,l.rem2px=function(t){var e=parseFloat(t)*this.rem;return"string"==typeof t&&t.match(/rem$/)&&(e+="px"),e},l.px2rem=function(t){var e=parseFloat(t)/this.rem;return"string"==typeof t&&t.match(/px$/)&&(e+="rem"),e}}(window,window.lib||(window.lib={}))},49:function(t,e,n){"use strict";var s=n(5);n.n(s).a},5:function(t,e,n){},506:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root"},[n("alert-dialog",{ref:"alert",attrs:{constants:t.constants},on:{alertFn:t.alertFn}}),t._v(" "),t.load?n("loading"):t._e(),t._v(" "),n("loading-animate",{directives:[{name:"show",rawName:"v-show",value:t.loadingAnimate,expression:"loadingAnimate"}]}),t._v(" "),n("div",{staticClass:"content1"},[t.isReg?t._e():n("div",{staticClass:"getCoins",style:{backgroundImage:"url("+t.conf.getCoins.bg+")",backgroundColor:""+t.conf.getCoins.bgColor}},[n("div",{staticClass:"text"},[n("p",{style:{color:""+t.conf.getCoins.color}},[t._v("恭喜您获得"+t._s(t.points)+"荷石璧， ")]),t._v(" "),n("p",{style:{color:""+t.conf.getCoins.color}},[t._v(" 点击立刻领取按钮进行领取！")]),t._v(" "),n("div",{staticClass:"get-btn",style:{backgroundImage:"url("+t.conf.getCoins.btn+")"},on:{click:t.getCoinFn}})])]),t._v(" "),t.isReg?n("div",{staticClass:"reg",style:{backgroundImage:"url("+t.conf.reg.bg+")"}},[n("div",{staticClass:"signup-bg",attrs:{id:"signup"}},[n("h4",{style:{color:""+t.conf.reg.color}},[t._v("注册会员领荷石璧，专属好礼惊喜连连")]),t._v(" "),n("h2",{style:{color:""+t.conf.reg.color}},[t._v("注册会员")]),t._v(" "),n("span",{staticClass:"tips",style:{color:""+t.conf.reg.color}},[t._v("(零售户专区)")]),t._v(" "),n("form",{attrs:{name:"form"}},[n("div",{staticClass:"form-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.userName,expression:"user.userName"}],staticClass:"border-box",attrs:{maxlength:"5",type:"text",placeholder:"姓名：",required:""},domProps:{value:t.user.userName},on:{blur:t.blurEvent,input:function(e){e.target.composing||t.$set(t.user,"userName",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.phoneNo,expression:"user.phoneNo"}],staticClass:"border-box",attrs:{minlength:"11",maxlength:"11",type:"tel",placeholder:"手机号：",required:""},domProps:{value:t.user.phoneNo},on:{blur:t.blurEvent,input:function(e){e.target.composing||t.$set(t.user,"phoneNo",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-item vcode-wrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.verifyCode,expression:"user.verifyCode"}],staticClass:"border-box vcode",attrs:{minlength:"4",maxlength:"6",type:"tel",placeholder:"验证码：",required:""},domProps:{value:t.user.verifyCode},on:{blur:t.blurEvent,input:function(e){e.target.composing||t.$set(t.user,"verifyCode",e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.vcodeBtnMsg,expression:"vcodeBtnMsg"}],staticClass:"vcode-btn",style:{background:""+t.conf.reg.color},attrs:{type:"button",disabled:t.vcodeBtnDisable,readonly:""},domProps:{value:t.vcodeBtnMsg},on:{click:t.send,input:function(e){e.target.composing||(t.vcodeBtnMsg=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.cardNo,expression:"user.cardNo"}],staticClass:"border-box",attrs:{type:"tel",placeholder:"烟草证号：",required:""},domProps:{value:t.user.cardNo},on:{blur:t.blurEvent,input:function(e){e.target.composing||t.$set(t.user,"cardNo",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-item"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user.shopName,expression:"user.shopName"}],staticClass:"border-box",attrs:{maxlength:"5",type:"text",placeholder:"店铺名称：",required:""},domProps:{value:t.user.shopName},on:{blur:t.blurEvent,input:function(e){e.target.composing||t.$set(t.user,"shopName",e.target.value)}}})])]),t._v(" "),n("button",{staticClass:"submit",style:{background:""+t.conf.reg.color},attrs:{type:"submit"},on:{click:t.submit}},[t._v("注册")]),t._v(" "),n("div",{staticClass:"qrcode"},[n("img",{attrs:{src:t.conf.reg.qr,alt:""}})])])]):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isFollow,expression:"!isFollow"}],staticClass:"qr"},[n("img",{attrs:{src:t.conf.qr.bg,alt:""}})]),t._v(" "),t.coinSuccFlag?n("div",{staticClass:"hhy-succ-alert"},[n("div",{staticClass:"succ-alert-con"},[n("h2",{staticClass:"succ-alert-h2",style:{color:""+t.conf.getCoins.color}},[t._v("积分领取成功")]),t._v(" "),n("span",{staticClass:"succ-alert-tip",style:{color:""+t.conf.getCoins.color}},[t._v("赶快到积分商城兑换好礼吧！")]),t._v(" "),n("a",{attrs:{href:"javascript:;"}},[n("button",{staticClass:"succ-alert-btn",staticStyle:{border:"1px solid #fff"},on:{click:t.handleToFlowerShop}},[t._v("确定")])])])]):t._e(),t._v(" "),t.regSuccFlag?n("div",{staticClass:"pop-tip-wrap",attrs:{id:"pop_tips"}},[n("div",{staticClass:"pop-tips border-box"},[n("h4",{style:{color:""+t.conf.reg.color}},[t._v("注册成功")]),t._v(" "),n("p",{style:{color:""+t.conf.reg.color}},[t._v("恭喜您获得"),n("em",[t._v(t._s(t.points))]),t._v("荷石璧,"),n("br"),t._v("赶紧到积分商城兑换好礼吧!")])]),t._v(" "),n("div",{staticClass:"get",on:{click:t.handleToFlowerShop}},[t._v("确定")])]):t._e()])],1)},o=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return o})},51:function(t,e,n){"use strict";n.r(e);n(49);var s=n(0),o=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-animate-con"},[e("div",{staticClass:"loading-animate"},[e("p",[this._v("加载中,请稍后...")])])])}],!1,null,"3d8ba9ed",null);o.options.__file="loadingAnimate.directive.vue";e.default=o.exports},53:function(t,e,n){"use strict";n.r(e);var s=n(34),o=n(8);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n(54);var i=n(0),a=Object(i.a)(o.default,s.a,s.b,!1,null,"4aa05d76",null);a.options.__file="alert.directive.vue",e.default=a.exports},54:function(t,e,n){"use strict";var s=n(10);n.n(s).a},6:function(t,e,n){"use strict";var s=function(){var t=this.$createElement;this._self._c;return this._m(0)},o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-bg"},[e("div",{staticClass:"content"},[this._v("\n        正在加载中...\n    ")])])}];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return o})},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={getQuerys:function(){return window.location.search.substr(1)},getQueryString:function(t){return function(t){var e=new RegExp("(?:^|&)"+t+"=([^&]*)(?:&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[1]:null}(t)},remQueryString:function(t){return function(t){var e=window.location.search.substr(1);if(e.indexOf(t)>-1){for(var n={},s=e.split("&"),o=0;o<s.length;o++)s[o]=s[o].split("="),n[s[o][0]]=s[o][1];delete n[t],e=JSON.stringify(n).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&")}return e}(t)},getRandomStr:function(t,e,n){return function(t,e,n){var s="",o=e,r=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if("number"!=typeof o)return console.log("getRandomStr: min值应为Number类型");if(t){if("number"!=typeof n)return console.log("getRandomStr: max值应为Number类型");o=Math.round(Math.random()*(n-e))+e}for(var i=0;i<o;i++)s+=r[Math.round(Math.random()*(r.length-1))];return s}(t,e,n)},compare:function(t,e){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return function(n,s){var o=n[t],r=s[t];return e?o-r:r-o}}(t,e)}};e.default=s},8:function(t,e,n){"use strict";n.r(e);var s=n(9),o=n.n(s);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);e.default=o.a},82:function(t,e,n){"use strict";var s=function(t){return t&&t.__esModule?t:{default:t}}(n(4));!function(t,e){"undefined"==typeof wx?function(t){var e=window.document,n=e.getElementsByTagName("script")[0],s=e.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",s.onload=function(){t()},n.parentNode.insertBefore(s,n)}(e):e()}(0,function(){s.default.post("/syx/wx/jsapi",{url:location.href.split("#")[0]}).then(function(t){var e=t.appId,n=t.timestamp,s=t.nonceStr,o=t.signature;wx.config({debug:!1,appId:e,timestamp:n,nonceStr:s,signature:o,jsApiList:["hideMenuItems","translateVoice","scanQRCode"]}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:QZone","menuItem:share:email","menuItem:openWithSafari","menuItem:openWithQQBrowser","menuItem:favorite","menuItem:copyUrl"]})})})})},848:function(t,e,n){"use strict";n(81);var s=a(n(52)),o=a(n(849));n(42),n(48);var r=a(n(4));n(82);var i=a(n(596));function a(t){return t&&t.__esModule?t:{default:t}}s.default.prototype.Fetch=r.default,s.default.prototype.$md5=i.default,new s.default({render:function(t){return t(o.default)}}).$mount("#app")},849:function(t,e,n){"use strict";n.r(e);var s=n(506),o=n(220);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n(850);var i=n(0),a=Object(i.a)(o.default,s.a,s.b,!1,null,null,null);a.options.__file="getCoins.vue",e.default=a.exports},850:function(t,e,n){"use strict";var s=n(222);n.n(s).a},9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"alert",data:function(){return{show:!1}},props:{constants:{type:Object,required:!0}},methods:{close:function(){var t=event.currentTarget;this.show=!1,t.className.indexOf("btn-left")>=0?this.$emit("getAwardFn"):t.className.indexOf("btn-right")>=0?this.$emit("cancelFn"):t.className.indexOf("btn-middle")>=0&&this.$emit("alertFn")},goHome:function(){location.href="../../views/common/yz.html?t="+ +new Date+"&from=others"},callback:function(){this.show=!1,this.$emit("alertCallback")}}}}},[[848,1,0]]]);