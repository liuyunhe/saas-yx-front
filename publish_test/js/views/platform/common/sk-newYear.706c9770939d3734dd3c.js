(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{1099:function(t,e,n){"use strict";n(81);var s=o(n(52)),i=o(n(1100)),r=o(n(4));function o(t){return t&&t.__esModule?t:{default:t}}n(151),s.default.prototype.Fetch=r.default,new s.default({render:function(t){return t(i.default)}}).$mount("#app")},1100:function(t,e,n){"use strict";n.r(e);var s=n(482),i=n(396);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n(1101);var o=n(0),a=Object(o.a)(i.default,s.a,s.b,!1,null,null,null);a.options.__file="sk-newYear.vue",e.default=a.exports},1101:function(t,e,n){"use strict";var s=n(398);n.n(s).a},151:function(t,e,n){"use strict";var s=function(t){return t&&t.__esModule?t:{default:t}}(n(4));!function(t,e){"undefined"==typeof wx?function(t){var e=window.document,n=e.getElementsByTagName("script")[0],s=e.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",s.onload=function(){t()},n.parentNode.insertBefore(s,n)}(e):e()}(0,function(){function t(t,e,n,i){s.default.post("/syx/wx/jsapi",{url:location.href.split("#")[0]}).then(function(s){var r=s.appId,o=s.timestamp,a=s.nonceStr,u=s.signature;wx.config({debug:!1,appId:r,timestamp:o,nonceStr:a,signature:u,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","showOptionMenu","translateVoice","scanQRCode"]}),wx.ready(function(){!function(t,e,n,s){wx.showOptionMenu(),wx.onMenuShareTimeline({title:t,link:n,imgUrl:s,success:function(){},error:function(t){alert(JSON.stringify(t))}}),wx.onMenuShareAppMessage({title:t,link:n,imgUrl:s,desc:e,success:function(t){},cancel:function(t){},fail:function(t){}}),wx.onMenuShareQQ({title:t,link:n,imgUrl:s,desc:e,success:function(t){},cancel:function(t){},fail:function(t){}}),wx.onMenuShareWeibo({title:t,link:n,imgUrl:s,desc:e,trigger:function(t){},success:function(t){},cancel:function(t){},fail:function(t){}}),wx.onMenuShareQZone({title:t,desc:e,link:n,imgUrl:s,success:function(){},cancel:function(){}})}(t,e,n,i)})})}!function(){if(sessionStorage.getItem("share")){var e=JSON.parse(sessionStorage.getItem("share")).shareConf,n=JSON.parse(sessionStorage.getItem("share")).prefix,i="",r="",o="",a="";e.forEach(function(t){"home"==t.menuType&&(i=t.title,r=t.content,o=n+"/syx/orgmenu/auth?menuCode="+t.menuCode,a=t.icon)}),t(i,r,o,a)}else s.default.get("/syx/cdomain/shareConf/org/all",{}).then(function(e){if(200==e.code){var n=e.data.prefix,s=e.data.shareConf;sessionStorage.setItem("share",JSON.stringify(e.data));var i="",r="",o="",a="";s.forEach(function(t){"home"==t.menuType&&(i=t.title,r=t.content,o=n+"/syx/orgmenu/auth?menuCode="+t.menuCode,a=t.icon)}),t(i,r,o,a)}})}()})},396:function(t,e,n){"use strict";n.r(e);var s=n(397),i=n.n(s);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);e.default=i.a},397:function(t,e,n){"use strict";var s=function(t){return t&&t.__esModule?t:{default:t}}(n(17));document.addEventListener("WeixinJSBridgeReady",function(){document.getElementById("musicBox").play()},!1),window.onload=function(){var t=(0,s.default)("#slide"),e=(0,s.default)(".slide_box"),n="";function i(){n=(0,s.default)(document).height(),t.css("height","500%"),e.css("height",100/e.length+"%"),e.find("img").css("height","100%")}i(),window.onresize=function(){i()},setTimeout(function(){(0,s.default)(".loading").hide(),(0,s.default)("#slide_wrap").add(".next").show()},1500);var r,o,a,u=!0,c=0;function l(t){(c+=t)>=e.length-1?(0,s.default)(".next").hide():(0,s.default)(".next").show(),c<0?c=0:c>=e.length?c=e.length-1:(u=!1,(0,s.default)("#slide").css({transform:"translate3d(0,"+-c*n+"px,0)",WebkitTransform:"translate3d(0,"+-c*n+"px,0)",transition:".5s ease",WebkitTransition:".5s ease"}),setTimeout(function(){u=!0},600))}t[0].addEventListener("touchstart",function(t){t.preventDefault(),r=t.touches[0].clientY}),t[0].addEventListener("touchmove",function(t){t.preventDefault();var i=(o=t.touches[0].clientY)-r;u&&(0==c?i<0&&(0,s.default)("#slide").css({transition:"",webkitTransition:"",transform:"translate3d(0,"+(-c*n+i)+"px,0)",webkitTransform:"translate3d(0,"+(-c*n+i)+"px,0)"}):c==e.length-1?i>0&&(0,s.default)("#slide").css({transition:"",webkitTransition:"",transform:"translate3d(0,"+(-c*n+i)+"px,0)",webkitTransform:"translate3d(0,"+(-c*n+i)+"px,0)"}):(0,s.default)("#slide").css({transition:"",webkitTransition:"",transform:"translate3d(0,"+(-c*n+i)+"px,0)",WebkitTransform:"translate3d(0,"+(-c*n+i)+"px,0)"}))}),t[0].addEventListener("touchend",function(t){t.preventDefault(),o&&((a=o-r)<-50&&u?l(1):a>50&&u?l(-1):u&&l(0),o="")})}},398:function(t,e,n){},4:function(t,e,n){"use strict";(function(t,s){Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(n(7));var r=t.CancelToken.source();if(t.defaults.headers["X-Requested-With"]="XMLHttpRequest",!sessionStorage.getItem("token")){var o=i.default.getQueryString("token");sessionStorage.setItem("token",o)}function a(e,n,i,o){var a={method:e,url:n,cancelToken:r.token};return"get"===e?a.params=i:"post"===e&&(1==o?(a.headers={"Content-type":"application/json;charset=UTF-8"},a.data=JSON.stringify(i)):a.data=s.stringify(i)),new Promise(function(e,n){t(a).then(function(t){200==t.status&&null!=t.data&&e(t.data)}).catch(function(t){window.location.href="/yx/views/general/overtime-error.html",n(t)})})}t.defaults.headers.token=sessionStorage.getItem("token"),t.defaults.timeout=6e4;var u={get:function(t,e){return a("get",t,e)},post:function(t,e,n){return a("post",t,e,n)}};e.default=u}).call(this,n(79),n(80))},482:function(t,e,n){"use strict";var s=function(){var t=this.$createElement;this._self._c;return this._m(0)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{attrs:{id:"slide_wrap"}},[e("div",{attrs:{id:"slide"}},[e("div",{staticClass:"slide_box"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/sk/newYearH1.jpg"}})]),this._v(" "),e("div",{staticClass:"slide_box"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/sk/newYearH2.jpg"}})]),this._v(" "),e("div",{staticClass:"slide_box"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/sk/newYearH3.jpg"}})]),this._v(" "),e("div",{staticClass:"slide_box"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/sk/newYearH4.jpg"}})]),this._v(" "),e("div",{staticClass:"slide_box"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/sk/newYearH5.png"}})])])]),this._v(" "),e("div",{staticClass:"next"},[e("img",{attrs:{src:"https://qoss.qrmkt.cn/common/sk/next.png"}})]),this._v(" "),e("audio",{attrs:{id:"musicBox",src:"https://qoss.qrmkt.cn/common/sk/newYear.mp3"}})])}];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={getQuerys:function(){return window.location.search.substr(1)},getQueryString:function(t){return function(t){var e=new RegExp("(?:^|&)"+t+"=([^&]*)(?:&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[1]:null}(t)},remQueryString:function(t){return function(t){var e=window.location.search.substr(1);if(e.indexOf(t)>-1){for(var n={},s=e.split("&"),i=0;i<s.length;i++)s[i]=s[i].split("="),n[s[i][0]]=s[i][1];delete n[t],e=JSON.stringify(n).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&")}return e}(t)},getRandomStr:function(t,e,n){return function(t,e,n){var s="",i=e,r=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if("number"!=typeof i)return console.log("getRandomStr: min值应为Number类型");if(t){if("number"!=typeof n)return console.log("getRandomStr: max值应为Number类型");i=Math.round(Math.random()*(n-e))+e}for(var o=0;o<i;o++)s+=r[Math.round(Math.random()*(r.length-1))];return s}(t,e,n)},compare:function(t,e){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return function(n,s){var i=n[t],r=s[t];return e?i-r:r-i}}(t,e)}};e.default=s}},[[1099,1,0]]]);