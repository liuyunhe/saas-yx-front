webpackJsonp([10],{"0QNg":function(e,t){},"35nJ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("405r"),r={components:{draggable:a.n(l).a},name:"KpiProDayPage",data(){return{flagA:!1,flagB:!1,listData:[],allBrandsData:[],allSpecisData:[],allProvinceData:[],allCityData:[],selectAllBrands:"",selectSpeciSns:"",selectSpeciName:"盒-黄金叶（爱尚）",selectProvince:"",selectCity:"",form:{dt:this.Format("yyyy-MM-dd"),cityName:"",productBrand:"",productSn:"",provinceName:""}}},created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.form.productBrand="",this.form.productBrand=e,this.allSpecisList(this.form.productBrand))},selectProvince(e,t){e&&e!=t&&(this.form.provinceName="",this.form.provinceName=e.join(","),this.allCityList(this.form.provinceName))},selectCity(e,t){e&&e!=t&&(this.form.cityName="",this.form.cityName=e.join(","))},selectSpeciSns(e,t){if(e&&e!=t&&this.allSpecisData.length>0)for(var a=0;a<this.allSpecisData.length;a++)e==this.allSpecisData[a].sn&&(this.selectSpeciName=this.allSpecisData[a].name)}},methods:{init(){this.allBrandsList(),this.allProvinceList()},allBrandsList(){this.$request.post("/record/public/getUserBrandByUserId",{},!0,e=>{let t=e||[];this.allBrandsData=t,t.length>0&&(this.selectAllBrands=t[0].name,this.form.productBrand=this.selectAllBrands,this.flagA=!0,this.allTableDataList(this.flagA,this.flagB))})},allSpecisList(e){this.$request.post("/record/statistics/getProduct",{productBrand:e},!0,e=>{let t=e||[];this.allSpecisData=t,t.length>0&&(this.selectSpeciSns=t[0].sn,this.form.productSn=this.selectSpeciSns,this.flagB=!0,this.allTableDataList(this.flagA,this.flagB))})},allProvinceList(){this.$request.post("/record/public/getUserProvByUserId",{},!0,e=>{let t=e||[];this.allProvinceData=t})},allCityList(e){this.$request.post("/record/statistics/getCitysByProvince",{provinceName:e},!0,e=>{let t=e||[];this.allCityData=t})},allTableDataList(e,t){e&&t&&this.$request.post("/record/henanreport/getProvReportData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList(this.flagA,this.flagB)},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/henanreport/importProvReportData",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("KPI数据分省统计日报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.form.dt,callback:function(t){e.$set(e.form,"dt",t)},expression:"form.dt"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.brandCode,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"规格选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectSpeciSns,callback:function(t){e.selectSpeciSns=t},expression:"selectSpeciSns"}},e._l(e.allSpecisData,function(e){return a("el-option",{key:e.sn,attrs:{label:e.name,value:e.sn}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"省",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectProvince,callback:function(t){e.selectProvince=t},expression:"selectProvince"}},e._l(e.allProvinceData,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"市",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectCity,callback:function(t){e.selectCity=t},expression:"selectCity"}},e._l(e.allCityData,function(e){return a("el-option",{key:e.cityId,attrs:{label:e.cityName,value:e.cityName}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"规格("+this.selectSpeciName+e.form.dt+")"}},[a("el-table-column",{attrs:{prop:"provinceName",label:"省份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityName",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanPv",label:"扫码次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"effectScanPv",label:"扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanUv",label:"扫码人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearScanPv",label:"本年累计扫码次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearEffectScanPv",label:"本年累计扫码包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearScanUv",label:"本年累计扫码人数\t"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rafflePv",label:"抽奖次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawPv",label:"中奖次数(包含实物和红包)\t"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawRate",label:"扫码中奖率(中奖次数/扫码烟包数)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawUv",label:"中奖人数\t"}}),e._v(" "),a("el-table-column",{attrs:{prop:"redpacketFee",label:"红包发放金额\t"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearRedpacketFee",label:"本年累计发放金额"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(e){a("p5yK")},"data-v-a6192724",null);t.default=o.exports},"3M9a":function(e,t){},NMDf:function(e,t){},NqZ0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("405r"),r={components:{draggable:a.n(l).a},name:"IntegralExchDayPage",data(){return{listData:[],form:{dt:this.Format("yyyy-MM-dd")}}},created(){this.init()},watch:{},methods:{init(){this.allTableDataList()},allTableDataList(){this.$request.post("/record/henanreport/getIntegralListReportData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/henanreport/importIntegralListReportData",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("积分兑换明细日报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.form.dt,callback:function(t){e.$set(e.form,"dt",t)},expression:"form.dt"}})],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"积分兑换明细("+e.form.dt+")"}},[a("el-table-column",{attrs:{prop:"resourceName",label:"资源名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityName",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"integralExchangeCnt",label:"本期兑奖数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addIntegralExchangeCnt",label:"本年累计兑奖数量"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(e){a("0QNg")},"data-v-f4ebec1e",null);t.default=o.exports},YLbx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("405r"),r={components:{draggable:a.n(l).a},name:"CashRedPackDayPage",data(){return{listData:[],allBrandsData:[],allSpecisData:[],selectAllBrands:"",selectSpeciSns:"",selectSpeciName:"盒-黄金叶（爱尚）",form:{dt:this.Format("yyyy-MM-dd"),productBrand:"黄金叶",productSn:"6901028165242"}}},created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.form.productBrand="",this.form.productBrand=e,this.allSpecisList(this.form.productBrand))},selectSpeciSns(e,t){if(e&&e!=t&&this.allSpecisData.length>0)for(var a=0;a<this.allSpecisData.length;a++)e==this.allSpecisData[a].sn&&(this.selectSpeciName=this.allSpecisData[a].name)}},methods:{init(){this.allBrandsList(),this.allTableDataList()},allBrandsList(){this.$request.post("/record/public/getUserBrandByUserId",{},!0,e=>{let t=e||[];this.allBrandsData=t,t.length>0&&(this.selectAllBrands=t[0].name,this.form.productBrand=this.selectAllBrands)})},allSpecisList(e){this.$request.post("/record/statistics/getProduct",{productBrand:e},!0,e=>{let t=e||[];this.allSpecisData=t,t.length>0&&(this.selectSpeciSns=t[0].sn,this.form.productSn=this.selectSpeciSns)})},allTableDataList(){this.$request.post("/record/henanreport/getRedPacketReportData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/henanreport/importRedPacketReportData",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("现金红包中奖统计日报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.form.dt,callback:function(t){e.$set(e.form,"dt",t)},expression:"form.dt"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.brandCode,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"规格选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectSpeciSns,callback:function(t){e.selectSpeciSns=t},expression:"selectSpeciSns"}},e._l(e.allSpecisData,function(e){return a("el-option",{key:e.sn,attrs:{label:e.name,value:e.sn}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"规格("+this.selectSpeciName+e.form.dt+")"}},[a("el-table-column",{attrs:{prop:"cityName",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"awardName",label:"奖品名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"awardPrice",label:"单价"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawPv",label:"本期中奖数量\t"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawFee",label:"本期中奖金额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearDrawPv",label:"本年累计中奖数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearDrawFee",label:"本年累计中奖金额"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(e){a("3M9a")},"data-v-1584e036",null);t.default=o.exports},fF6t:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("405r"),r={components:{draggable:a.n(l).a},name:"IntegralOperDayPage",data(){return{listData:[],form:{dt:this.Format("yyyy-MM-dd")}}},created(){this.init()},watch:{},methods:{init(){this.allTableDataList()},allTableDataList(){this.$request.post("/record/henanreport/getIntegralDarwReportData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/henanreport/importIntegralDarwReportData",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("积分操作情况统计日报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.form.dt,callback:function(t){e.$set(e.form,"dt",t)},expression:"form.dt"}})],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"活动积分情况("+e.form.dt+")"}},[a("el-table-column",{attrs:{prop:"cityName",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{label:"积分操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(0==t.row.integralType?"实物礼品":1==t.row.integralType?"盒包扫码获得积分":2==t.row.integralType?"条包扫码获得积分":3==t.row.integralType?"兑奖消耗积分":"抽奖消耗积分"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"integralValue",label:"当日积分值"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addIntegralValue",label:"累计积分值"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(e){a("oUpP")},"data-v-29355171",null);t.default=o.exports},gIlf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("405r"),r={components:{draggable:a.n(l).a},name:"RealDrawDayPage",data(){return{listData:[],allActData:[],allCityData:[],selectAllAct:"",selectCity:"",form:{awardName:"",cityName:"",dt:this.Format("yyyy-MM-dd"),activityId:"08e8736932104925be739eb49ccb9ade"}}},created(){this.init()},watch:{selectAllAct(e,t){e&&e!=t&&(this.form.activityId="",this.form.activityId=e)},selectCity(e,t){e&&e!=t&&(this.form.cityName="",this.form.cityName=e.join(","))}},methods:{init(){this.allActList(),this.allCityList()},allActList(){this.$request.post("/record/actAnalysis/getActyDownBox",{},!0,e=>{let t=e||[];this.allActData=t})},allCityList(){this.$request.post("/record/statistics/getCitysByProvince",{},!0,e=>{let t=e||[];this.allCityData=t})},allTableDataList(){this.$request.post("/record/henanreport/getObjectReportData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/henanreport/importObjectReportData",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("实物奖品中奖统计日报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.form.dt,callback:function(t){e.$set(e.form,"dt",t)},expression:"form.dt"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动名称",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectAllAct,callback:function(t){e.selectAllAct=t},expression:"selectAllAct"}},e._l(e.allActData,function(e){return a("el-option",{key:e.activityId,attrs:{label:e.activityName,value:e.activityId}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"地市",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectCity,callback:function(t){e.selectCity=t},expression:"selectCity"}},e._l(e.allCityData,function(e){return a("el-option",{key:e.cityId,attrs:{label:e.cityName,value:e.cityName}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"奖品",size:"small"}},[a("el-input",{model:{value:e.form.awardName,callback:function(t){e.$set(e.form,"awardName",t)},expression:"form.awardName"}})],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"实物中奖情况("+e.form.dt+")"}},[a("el-table-column",{attrs:{prop:"activityName",label:"活动名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityName",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"awardName",label:"奖品"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawPv",label:"本期中奖数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearDrawPv",label:"本年累计中奖数量"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(e){a("xVNZ")},"data-v-3c891b9c",null);t.default=o.exports},oUpP:function(e,t){},p5yK:function(e,t){},uQoA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("405r"),r={components:{draggable:a.n(l).a},name:"ActDrawDayPage",data(){return{listData:[],allActData:[],selectAllAct:"",selectSpeciName:"爱”尚“翻牌子--黄金叶（爱尚）条",form:{dt:this.Format("yyyy-MM-dd"),activityId:"08e8736932104925be739eb49ccb9ade"}}},created(){this.init()},watch:{selectAllAct(e,t){if(e&&e!=t){if(this.allActData.length>0)for(var a=0;a<this.allActData.length;a++)e==this.allActData[a].activityId&&(this.selectSpeciName=this.allActData[a].activityName);this.form.activityId="",this.form.activityId=e}}},methods:{init(){this.allActList(),this.allTableDataList()},allActList(){this.$request.post("/record/actAnalysis/getActyDownBox",{},!0,e=>{let t=e||[];this.allActData=t,t.length>0&&(this.selectAllAct=t[0].activityId,this.form.activityId=this.selectAllAct)})},allTableDataList(){this.$request.post("/record/henanreport/getActReportData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(e.open("POST","/record/henanreport/importActReportData",!0),e.responseType="blob",window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("活动中奖统计日报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.form.dt,callback:function(t){e.$set(e.form,"dt",t)},expression:"form.dt"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"活动名称",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectAllAct,callback:function(t){e.selectAllAct=t},expression:"selectAllAct"}},e._l(e.allActData,function(e){return a("el-option",{key:e.activityId,attrs:{label:e.activityName,value:e.activityId}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"规格("+this.selectSpeciName+e.form.dt+")"}},[a("el-table-column",{attrs:{prop:"provinceName",label:"省份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityName",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rafflePv",label:"参与活动次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawPv",label:"中奖次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"drawRate",label:"活动中奖率(中奖次数/参与活动次数)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addRafflePv",label:"累计参与活动次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addDrawPv",label:"累计中奖次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"addDrawRate",label:"平均中奖率"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("C7Lr")(r,s,!1,function(e){a("NMDf")},"data-v-f1a9811a",null);t.default=o.exports},xVNZ:function(e,t){}});
//# sourceMappingURL=10.1c6658a45a42b2ee9fe4.js.map