(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1:function(t,e,n){"use strict";n.r(e);var a=n(2),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e.default=i.a},1111:function(t,e,n){"use strict";n(81);var a=u(n(52)),i=u(n(124)),r=u(n(1112));n(42);var s=u(n(4)),o=u(n(131));function u(t){return t&&t.__esModule?t:{default:t}}n(82),a.default.use(i.default),a.default.prototype.Fetch=s.default,a.default.prototype.actPath=o.default,new a.default({render:function(t){return t(r.default)}}).$mount("#app")},1112:function(t,e,n){"use strict";n.r(e);var a=n(479),i=n(405);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n(1116);var s=n(0),o=Object(s.a)(i.default,a.a,a.b,!1,null,null,null);o.options.__file="verification.vue",e.default=o.exports},1113:function(t,e,n){"use strict";n.r(e);var a=n(543),i=n(407);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n(1114);var s=n(0),o=Object(s.a)(i.default,a.a,a.b,!1,null,"559d0772",null);o.options.__file="alert.directive.vue",e.default=o.exports},1114:function(t,e,n){"use strict";var a=n(409);n.n(a).a},1116:function(t,e,n){"use strict";var a=n(410);n.n(a).a},131:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={"act-100":"fanzuanshi.html","act-101":"jiugongge.html","act-102":"yuanbao.html","act-103":"smash-egg.html","act-104":"fanpaizi.html","act-111":"hpiaoxiang.html","act-501":"question.html","act-301":"redPacked.html","act-105":"round.html","act-701":"niudan.html","act-702":"dadishu.html","act-703":"daqiqiu.html","act-704":"jiawawa.html","act-705":"dhongbao.html","act-601":"diy.html"}},2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},3:function(t,e,n){},4:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(n(7));var r=t.CancelToken.source();if(t.defaults.headers["X-Requested-With"]="XMLHttpRequest",!sessionStorage.getItem("token")){var s=i.default.getQueryString("token");sessionStorage.setItem("token",s)}function o(e,n,i,s){var o={method:e,url:n,cancelToken:r.token};return"get"===e?o.params=i:"post"===e&&(1==s?(o.headers={"Content-type":"application/json;charset=UTF-8"},o.data=JSON.stringify(i)):o.data=a.stringify(i)),new Promise(function(e,n){t(o).then(function(t){200==t.status&&null!=t.data&&e(t.data)}).catch(function(t){window.location.href="/yx/views/general/overtime-error.html",n(t)})})}t.defaults.headers.token=sessionStorage.getItem("token"),t.defaults.timeout=6e4;var u={get:function(t,e){return o("get",t,e)},post:function(t,e,n){return o("post",t,e,n)}};e.default=u}).call(this,n(79),n(80))},405:function(t,e,n){"use strict";n.r(e);var a=n(406),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e.default=i.a},406:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(n(45)),i=(r(n(7)),r(n(1113)));function r(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{tDate:(new Date).getTime(),inputValue:"",constants:{title:"提示",msg:"",type:"alert",text:["确定"]},unbind:!1,load:!0}},components:{loading:a.default,alertDialog:i.default},mounted:function(){this.load=!1},methods:{verify:function(){var t=this;this.unbind=!0;return 6!==this.inputValue.length?(this.unbind=!1,this.constants.msg="请正确输入包装内六位数验证码",void(this.$refs.alert.show=!0)):/^\d{6}$/.test(this.inputValue)?void this.Fetch.post("/syx/scan/out/check",{verifyCode:this.inputValue}).then(function(e){"200"==e.code?(t.unbind=!1,location.href="./yz.html?from=others"):"500"==e.code&&"验证码错误!"==e.msg?(t.unbind=!1,t.constants.msg=e.msg,t.$refs.alert.show=!0):500==e.code&&(t.unbind=!1,t.constants.msg=e.msg,t.$refs.alert.show=!0)}):(this.unbind=!1,this.constants.msg="请正确输入包装内六位数验证码",void(this.$refs.alert.show=!0))}}}},407:function(t,e,n){"use strict";n.r(e);var a=n(408),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e.default=i.a},408:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"alert",data:function(){return{show:!1}},props:{constants:{type:Object,required:!0}},methods:{close:function(){var t=event.currentTarget;this.show=!1,t.className.indexOf("btn-left")>=0?this.$emit("getAwardFn"):t.className.indexOf("btn-right")>=0?this.$emit("cancelFn"):t.className.indexOf("btn-middle")>=0&&this.$emit("alertFn")},goHome:function(){location.href="../../views/menus/home.html?t="+ +new Date}}}},409:function(t,e,n){},410:function(t,e,n){},42:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var a=n(6),i=n(1);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n(46);var s=n(0),o=Object(s.a)(i.default,a.a,a.b,!1,null,"198118d4",null);o.options.__file="loading.directive.vue",e.default=o.exports},46:function(t,e,n){"use strict";var a=n(3);n.n(a).a},479:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"root"}},[t.load?n("loading"):t._e(),t._v(" "),n("alert-dialog",{ref:"alert",attrs:{constants:t.constants}}),t._v(" "),n("div",{staticClass:"wrap border-box"},[t._m(0),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{type:"number",placeholder:"请输入包装内六位数验证码"},domProps:{value:t.inputValue},on:{input:function(e){e.target.composing||(t.inputValue=e.target.value)}}}),t._v(" "),n("p",[t._v("打开包装顶部即可查看验证码")])]),t._v(" "),n("div",{staticClass:"btn",on:{click:function(e){!t.unbind&&t.verify()}}},[t._v("\n        验  证\n    ")])],1)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/hebei/verification.png"}}),this._v(" "),e("span",[this._v("验真伪")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},543:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"root"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"confirm-alert-wrap"},[n("div",{staticClass:"confirm-mask border-box"},[n("p",{staticClass:"title"},[t._v(t._s(t.constants.title||"提示"))]),t._v(" "),n("p",{staticClass:"message"},[t._v(t._s(t.constants.msg||"提示"))]),t._v(" "),"alert"!==t.constants.type||t.constants.flag?"alert"===t.constants.type&&"1"==t.constants.flag?n("div",{staticClass:"btn-middle",on:{click:t.goHome}},[t._v("\n                "+t._s(t.constants.text[0]||"确定")+"\n            ")]):"confirm"===t.constants.type?n("div",{staticClass:"btn-double border-box"},[n("div",{staticClass:"btn-left border-box",on:{click:t.close}},[t._v("\n                    "+t._s(t.constants.text[0]||"确定")+"\n                ")]),t._v(" "),n("div",{staticClass:"btn-right border-box",on:{click:t.close}},[t._v("\n                    "+t._s(t.constants.text[1]||"取消")+"\n                ")])]):t._e():n("div",{staticClass:"btn-middle",on:{click:t.close}},[t._v("\n                "+t._s(t.constants.text[0]||"确定")+"\n            ")])])])])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},6:function(t,e,n){"use strict";var a=function(){var t=this.$createElement;this._self._c;return this._m(0)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-bg"},[e("div",{staticClass:"content"},[this._v("\n        正在加载中...\n    ")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={getQuerys:function(){return window.location.search.substr(1)},getQueryString:function(t){return function(t){var e=new RegExp("(?:^|&)"+t+"=([^&]*)(?:&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[1]:null}(t)},remQueryString:function(t){return function(t){var e=window.location.search.substr(1);if(e.indexOf(t)>-1){for(var n={},a=e.split("&"),i=0;i<a.length;i++)a[i]=a[i].split("="),n[a[i][0]]=a[i][1];delete n[t],e=JSON.stringify(n).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&")}return e}(t)},getRandomStr:function(t,e,n){return function(t,e,n){var a="",i=e,r=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if("number"!=typeof i)return console.log("getRandomStr: min值应为Number类型");if(t){if("number"!=typeof n)return console.log("getRandomStr: max值应为Number类型");i=Math.round(Math.random()*(n-e))+e}for(var s=0;s<i;s++)a+=r[Math.round(Math.random()*(r.length-1))];return a}(t,e,n)},compare:function(t,e){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return function(n,a){var i=n[t],r=a[t];return e?i-r:r-i}}(t,e)}};e.default=a},82:function(t,e,n){"use strict";var a=function(t){return t&&t.__esModule?t:{default:t}}(n(4));!function(t,e){"undefined"==typeof wx?function(t){var e=window.document,n=e.getElementsByTagName("script")[0],a=e.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",a.onload=function(){t()},n.parentNode.insertBefore(a,n)}(e):e()}(0,function(){a.default.post("/syx/wx/jsapi",{url:location.href.split("#")[0]}).then(function(t){var e=t.appId,n=t.timestamp,a=t.nonceStr,i=t.signature;wx.config({debug:!1,appId:e,timestamp:n,nonceStr:a,signature:i,jsApiList:["hideMenuItems","translateVoice","scanQRCode"]}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:QZone","menuItem:share:email","menuItem:openWithSafari","menuItem:openWithQQBrowser","menuItem:favorite","menuItem:copyUrl"]})})})})}},[[1111,1,0]]]);