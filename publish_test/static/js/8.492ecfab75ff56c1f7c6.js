webpackJsonp([8],{"4kdr":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ReportPage",data:()=>({listData:[]}),created(){this.init()},methods:{init(){this.allKeyWordList()},allKeyWordList(){this.$request.post("/api/saotx/report/list",{service:"browser"},!0,e=>{console.log(e.data),"200000"===e.ret&&(this.listData=e.data)})},handleClick(e){this.$router.push({path:e})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("固定报表列表")])])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{staticStyle:{width:"50%"},attrs:{label:"序号",type:"index",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.$index+1)+"\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"列表名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.handleClick(t.row.reportUrl)}}},[e._v(e._s(t.row.reportName))])]}}])})],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("oGwZ")},"data-v-83eda1d8",null);t.default=o.exports},"9dbp":function(e,t){},D3OD:function(e,t){},DBWJ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ScanWeekPage",data(){return{id:"",listData:[],allBrandsData:[],allProvinceData:[],allCityData:[],selectAllBrands:"",selectProvince:"",selectCity:"",statTimeName:"",defaultPrvCode:"",allBrandsLenth:0,form:{statDate:this.Format("yyyy-MM"),brandName:"全部",provinceCode:"",cityCode:"",statType:"m6"}}},created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.allBrandsLenth==e.length?(this.form.brandName="全部",this.form.statType="m6"):(this.form.brandName="",this.form.brandName=e.join(","),this.form.statType="m5"))},selectProvince(e,t){if(e&&e!=t){var a={name:[],code:[]};if(e.length>0){for(var l=0;l<e.length;l++)for(var r=e[l],s=0;s<this.allProvinceData.length;s++)r==this.allProvinceData[s].code&&a.name.push(this.allProvinceData[s].name);this.allCityList(a.name.join(","))}this.form.provinceCode="",this.form.provinceCode=e.join(",")}},selectCity(e,t){e&&e!=t&&(this.form.cityCode="",this.form.cityCode=e.join(","))}},methods:{init(){this.allDefaultProvinceList(),this.allBrandsList(),this.allProvinceList()},allDefaultProvinceList(){this.$request.post("/record/public/getDefaultProvByorgId",{},!0,e=>{let t=e||[];if(t.length>0)for(var a=0;a<t.length;a++)this.defaultPrvCode=t[a].orgRegion})},allBrandsList(){this.$request.post("/record/public/getUserBrandByUserId",{},!0,e=>{let t=e||[];this.allBrandsData=t,this.allBrandsLenth=t.length})},allProvinceList(){this.$request.post("/record/public/getUserProvByUserId",{},!0,e=>{let t=e||[];this.allProvinceData=t,this.selectProvince[0]=this.defaultPrvCode,this.form.provinceCode=this.defaultPrvCode;for(var a={name:[],code:[]},l=0;l<this.allProvinceData.length;l++)this.defaultPrvCode==this.allProvinceData[l].code&&a.name.push(this.allProvinceData[l].name);this.allCityList(a.name.join(","))})},allCityList(e){this.$request.post("/record/statistics/getCitysByProvince",{provinceName:e},!0,e=>{let t=e||[];this.allCityData=t})},allTableDataList(){this.$request.post("/record/fixatreport/getMonthGpsScanData",{brandName:this.form.brandName,cityCode:this.form.cityCode,provinceCode:this.form.provinceCode,statDate:this.form.statDate+"-01",statType:this.form.statType},!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form={brandName:this.form.brandName,cityCode:this.form.cityCode,provinceCode:this.form.provinceCode,statDate:this.form.statDate+"-01",statType:this.form.statType},this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/fixatreport/getMonthGpsScanDataExcel",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("区县扫码活跃度月报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"month",placeholder:"选择日期",format:"yyyy-MM","value-format":"yyyy-MM"},model:{value:e.form.statDate,callback:function(t){e.$set(e.form,"statDate",t)},expression:"form.statDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:""},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.brandCode,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"省",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectProvince,callback:function(t){e.selectProvince=t},expression:"selectProvince"}},e._l(e.allProvinceData,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"市",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectCity,callback:function(t){e.selectCity=t},expression:"selectCity"}},e._l(e.allCityData,function(e){return a("el-option",{key:e.cityId,attrs:{label:e.cityName,value:e.cityId}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"开启GPS用户区县扫码活跃度("+e.statTimeName+")"}},[a("el-table-column",{attrs:{prop:"brandName",label:"品牌"}}),e._v(" "),a("el-table-column",{attrs:{prop:"districtName",label:"区县"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanOpenidP",label:"扫码次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanNumP",label:"扫码人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanCodeP",label:"扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityName",label:"所在地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所在省"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanNum",label:"所在地市扫码次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanOpenid",label:"所在地市扫码人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanCode",label:"所在地市扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"toScanCodes",label:"区县扫码活跃度"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("UczW")},"data-v-530ca484",null);t.default=o.exports},Hm7e:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ScanWeekPage",data:()=>({id:"",listData:[],weekData:[],allBrandsData:[],allSpecisData:[],selectAllBrands:"",selectSpeciSns:"",statTimeName:"",form:{statTime:"",productBrand:"",productSn:"P001,P002,P003,P004,P005,P006,P007,P008,P009,P010,P011",staType:"week"}}),created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.form.productBrand="",this.form.productBrand=e.join(","),this.id="",this.allSpecisList(this.form.productBrand))},selectSpeciSns(e,t){e&&e!=t&&(this.form.productSn="",this.form.productSn=e.join(","))}},methods:{init(){this.allWeekList(),this.allBrandsList()},allWeekList(){this.$request.post("/record/statistics/getWeeks",{},!0,e=>{let t=e||[];this.weekData=t,this.form.statTime=t[0].weekId,this.statTimeName=t[0].weekNo,this.allTableDataList()})},allBrandsList(){this.$request.post("/record/fixatreport/getProductBrandDown",{},!0,e=>{let t=e||[];this.allBrandsData=t})},allSpecisList(e){this.$request.post("/record/fixatreport/getProductSnDown",{productBrand:e},!0,e=>{let t=e||[];this.allSpecisData=t})},allTableDataList(){this.$request.post("/record/fixatreport/rptScanNumDateWeek",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/fixatreport/getRptScanNumDateWeekExcel",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("扫码数据周报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.statTime,callback:function(t){e.$set(e.form,"statTime",t)},expression:"form.statTime"}},e._l(e.weekData,function(e){return a("el-option",{key:e.weekId,attrs:{label:e.weekNo,value:e.weekId}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.productBrand,attrs:{label:e.productBrandName,value:e.productBrand}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"规格选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",disabled:!!e.id,clearable:!!e.id,multiple:!0},model:{value:e.selectSpeciSns,callback:function(t){e.selectSpeciSns=t},expression:"selectSpeciSns"}},e._l(e.allSpecisData,function(e){return a("el-option",{key:e.productSn,attrs:{label:e.productName,value:e.productSn}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"扫码数据周报("+e.statTimeName+")"}},[a("el-table-column",{attrs:{prop:"col0",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col1",label:"销区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col2",label:"省份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col3",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col4",label:"本周通过GPS定位的扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col5",label:"本周扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col6",label:"上周扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col7",label:"截至本周末历史累计扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col8",label:"\t本周通过GPS定位的扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col9",label:"本周扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col10",label:"上周扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col11",label:"截至本周末历史累计扫码烟包数"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("9dbp")},"data-v-5a1dcc43",null);t.default=o.exports},I0kl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ScanWeekPage",data:()=>({id:"",listData:[],weekData:[],allBrandsData:[],allProvinceData:[],allCityData:[],selectAllBrands:"",selectProvince:"",selectCity:"",statTimeName:"",defaultPrvCode:"",allBrandsLenth:0,form:{statDate:"",brandName:"全部",provinceCode:"",cityCode:"",statType:"w6"}}),created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.allBrandsLenth==e.length?(this.form.brandName="全部",this.form.statType="w6"):(this.form.brandName="",this.form.brandName=e.join(","),this.form.statType="w5"))},selectProvince(e,t){if(e&&e!=t){var a={name:[],code:[]};if(e.length>0){for(var l=0;l<e.length;l++)for(var r=e[l],s=0;s<this.allProvinceData.length;s++)r==this.allProvinceData[s].code&&a.name.push(this.allProvinceData[s].name);this.allCityList(a.name.join(","))}this.form.provinceCode="",this.form.provinceCode=e.join(",")}},selectCity(e,t){e&&e!=t&&(this.form.cityCode="",this.form.cityCode=e.join(","))}},methods:{init(){this.allDefaultProvinceList(),this.allWeekList(),this.allBrandsList(),this.allProvinceList()},allDefaultProvinceList(){this.$request.post("/record/public/getDefaultProvByorgId",{},!0,e=>{let t=e||[];if(t.length>0)for(var a=0;a<t.length;a++)this.defaultPrvCode=t[a].orgRegion})},allWeekList(){this.$request.post("/record/statistics/getWeeks",{},!0,e=>{let t=e||[];this.weekData=t,this.form.statDate=t[0].weekId,this.statTimeName=t[0].weekNo,this.allTableDataList()})},allBrandsList(){this.$request.post("/record/public/getUserBrandByUserId",{},!0,e=>{let t=e||[];this.allBrandsData=t,this.allBrandsLenth=t.length})},allProvinceList(){this.$request.post("/record/public/getUserProvByUserId",{},!0,e=>{let t=e||[];this.allProvinceData=t,this.selectProvince[0]=this.defaultPrvCode,this.form.provinceCode=this.defaultPrvCode;for(var a={name:[],code:[]},l=0;l<this.allProvinceData.length;l++)this.defaultPrvCode==this.allProvinceData[l].code&&a.name.push(this.allProvinceData[l].name);this.allCityList(a.name.join(","))})},allCityList(e){this.$request.post("/record/statistics/getCitysByProvince",{provinceName:e},!0,e=>{let t=e||[];this.allCityData=t})},allTableDataList(){this.$request.post("/record/fixatreport/getWeekGpsScanData",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/fixatreport/getWeekGpsScanDataExcel",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("区县扫码活跃度周报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.statDate,callback:function(t){e.$set(e.form,"statDate",t)},expression:"form.statDate"}},e._l(e.weekData,function(e){return a("el-option",{key:e.weekId,attrs:{label:e.weekNo,value:e.weekId}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.brandCode,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"省",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectProvince,callback:function(t){e.selectProvince=t},expression:"selectProvince"}},e._l(e.allProvinceData,function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"市",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectCity,callback:function(t){e.selectCity=t},expression:"selectCity"}},e._l(e.allCityData,function(e){return a("el-option",{key:e.cityId,attrs:{label:e.cityName,value:e.cityId}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"开启GPS用户区县扫码活跃度("+e.statTimeName+")"}},[a("el-table-column",{attrs:{prop:"brandName",label:"品牌"}}),e._v(" "),a("el-table-column",{attrs:{prop:"districtName",label:"区县"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanOpenidP",label:"扫码次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanNumP",label:"扫码人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanCodeP",label:"扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cityName",label:"所在地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"provinceName",label:"所在省"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanNum",label:"所在地市扫码次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanOpenid",label:"所在地市扫码人数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"scanCode",label:"所在地市扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"toScanCodes",label:"区县扫码活跃度"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("gcJ4")},"data-v-22c6712f",null);t.default=o.exports},JOi3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ScanWeekPage",data(){return{id:"",listData:[],weekData:[],allBrandsData:[],allSpecisData:[],selectAllBrands:"",selectSpeciSns:"",statTimeName:"",form:{statTime:this.Format("yyyy-MM"),productBrand:"",productSn:"P001,P002,P003,P004,P005,P006,P007,P008,P009,P010,P011",staType:"month"}}},created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.form.productBrand="",this.form.productBrand=e.join(","),this.id="",this.allSpecisList(this.form.productBrand))},selectSpeciSns(e,t){e&&e!=t&&(this.form.productSn="",this.form.productSn=e.join(","))}},methods:{init(){this.allBrandsList(),this.allTableDataList()},allBrandsList(){this.$request.post("/record/fixatreport/getProductBrandDown",{},!0,e=>{let t=e||[];this.allBrandsData=t})},allSpecisList(e){this.$request.post("/record/fixatreport/getProductSnDown",{productBrand:e},!0,e=>{let t=e||[];this.allSpecisData=t})},allTableDataList(){this.$request.post("/record/fixatreport/rptScanNumDateMonth",{statTime:this.form.statTime+"-01",productBrand:this.form.productBrand,productSn:this.form.productSn,staType:"month"},!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form={statTime:this.form.statTime+"-01",productBrand:this.form.productBrand,productSn:this.form.productSn,staType:"month"},this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/fixatreport/getRptScanNumDateMonthExcel",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("扫码数据月报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"month",placeholder:"选择日期",format:"yyyy-MM","value-format":"yyyy-MM"},model:{value:e.form.statTime,callback:function(t){e.$set(e.form,"statTime",t)},expression:"form.statTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.productBrand,attrs:{label:e.productBrandName,value:e.productBrand,multiple:!0}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"规格选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",disabled:!!e.id,clearable:!!e.id,multiple:!0},model:{value:e.selectSpeciSns,callback:function(t){e.selectSpeciSns=t},expression:"selectSpeciSns"}},e._l(e.allSpecisData,function(e){return a("el-option",{key:e.productSn,attrs:{label:e.productName,value:e.productSn}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"扫码数据月报("+e.form.statTime+")"}},[a("el-table-column",{attrs:{prop:"col0",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col1",label:"销区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col2",label:"省份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col3",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col4",label:"本月通过GPS定位的扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col5",label:"本月扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col6",label:"上月扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col7",label:"截至本月末历史累计扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col8",label:"本月通过GPS定位的扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col9",label:"本月扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col10",label:"上月扫码烟包数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col11",label:"截至本月末历史累计扫码烟包数"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("D3OD")},"data-v-1b3b544a",null);t.default=o.exports},UczW:function(e,t){},gcJ4:function(e,t){},iosY:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ScanWeekPage",data(){return{id:"",listData:[],weekData:[],allBrandsData:[],allSpecisData:[],selectAllBrands:"",selectSpeciSns:"",statTimeName:"",form:{statTime:this.Format("yyyy-MM"),productBrand:"",productSn:"P001,P002,P003,P004,P005,P006,P007,P008,P009,P010,P011",staType:"month"}}},created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.form.productBrand="",this.form.productBrand=e.join(","),this.id="",this.allSpecisList(this.form.productBrand))},selectSpeciSns(e,t){e&&e!=t&&(this.form.productSn="",this.form.productSn=e.join(","))}},methods:{init(){this.allBrandsList(),this.allTableDataList()},allBrandsList(){this.$request.post("/record/fixatreport/getProductBrandDown",{},!0,e=>{let t=e||[];this.allBrandsData=t})},allSpecisList(e){this.$request.post("/record/fixatreport/getProductSnDown",{productBrand:e},!0,e=>{let t=e||[];this.allSpecisData=t})},allTableDataList(){this.$request.post("/record/fixatreport/rptScanRedDateMonth",{statTime:this.form.statTime+"-01",productBrand:this.form.productBrand,productSn:this.form.productSn,staType:"month"},!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form={statTime:this.form.statTime+"-01",productBrand:this.form.productBrand,productSn:this.form.productSn,staType:"month"},this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/fixatreport/getRptScanRedDateMonthExcel",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},Format(e){var t=new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var l in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+l+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[l]:("00"+a[l]).substr((""+a[l]).length)));return e},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("红包投入数据月报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-date-picker",{attrs:{type:"month",placeholder:"选择日期",format:"yyyy-MM","value-format":"yyyy-MM"},model:{value:e.form.statTime,callback:function(t){e.$set(e.form,"statTime",t)},expression:"form.statTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.productBrand,attrs:{label:e.productBrandName,value:e.productBrand}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"规格选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",disabled:!!e.id,clearable:!!e.id,multiple:!0},model:{value:e.selectSpeciSns,callback:function(t){e.selectSpeciSns=t},expression:"selectSpeciSns"}},e._l(e.allSpecisData,function(e){return a("el-option",{key:e.productSn,attrs:{label:e.productName,value:e.productSn}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"红包投入数据月报("+e.form.statTime+")"}},[a("el-table-column",{attrs:{prop:"col0",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col1",label:"销区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col2",label:"省份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col3",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col4",label:"本月通过GPS定位的扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col5",label:"本月扫码量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col6",label:"上月扫码量"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("mhN6")},"data-v-345c8e37",null);t.default=o.exports},"k/sA":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("DAYN"),r={components:{draggable:a.n(l).a},name:"ScanWeekPage",data:()=>({id:"",listData:[],weekData:[],allBrandsData:[],allSpecisData:[],selectAllBrands:"",selectSpeciSns:"",statTimeName:"",form:{statTime:"",productBrand:"",productSn:"P001,P002,P003,P004,P005,P006,P007,P008,P009,P010,P011",staType:"week"}}),created(){this.init()},watch:{selectAllBrands(e,t){e&&e!=t&&(this.form.productBrand="",this.form.productBrand=e.join(","),this.id="",this.allSpecisList(this.form.productBrand))},selectSpeciSns(e,t){e&&e!=t&&(this.form.productSn="",this.form.productSn=e.join(","))}},methods:{init(){this.allWeekList(),this.allBrandsList()},allWeekList(){this.$request.post("/record/statistics/getWeeks",{},!0,e=>{let t=e||[];this.weekData=t,this.form.statTime=t[0].weekId,this.statTimeName=t[0].weekNo,this.allTableDataList()})},allBrandsList(){this.$request.post("/record/fixatreport/getProductBrandDown",{},!0,e=>{let t=e||[];this.allBrandsData=t})},allSpecisList(e){this.$request.post("/record/fixatreport/getProductSnDown",{productBrand:e},!0,e=>{let t=e||[];this.allSpecisData=t})},allTableDataList(){this.$request.post("/record/fixatreport/rptScanRedDateWeek",this.form,!0,e=>{let t=e||[];this.listData=t})},queryData(){this.allTableDataList()},exportData(){var e=new XMLHttpRequest,t=new FormData;for(var a in this.form)t.append(a,this.form[a]);e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("POST","/record/fixatreport/getRptScanRedDateWeekExcel",!0),e.responseType="blob",e.responseType="arraybuffer",e.setRequestHeader("token",sessionStorage.getItem("access_token")),e.setRequestHeader("loginId",sessionStorage.getItem("access_loginId")),e.onload=function(t){if(200==this.status){var a=new Blob([this.response],{type:"application/vnd.ms-excel"}),l=e.getResponseHeader("Content-Disposition"),r=decodeURI(l.match(/filename=(.*?)(;|$)/)[1]);if(window.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(a,r);else{var s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=r,s.click(),window.URL.revokeObjectURL(s.href)}}},e.send(t)},rollBak(){this.$router.push({path:"/datas/Report"})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("红包投入数据周报")])]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.rollBak}},[e._v(" >返回")])],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("el-row",[a("el-form-item",{attrs:{label:"查询时间",size:"small"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.statTime,callback:function(t){e.$set(e.form,"statTime",t)},expression:"form.statTime"}},e._l(e.weekData,function(e){return a("el-option",{key:e.weekId,attrs:{label:e.weekNo,value:e.weekId}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",multiple:!0},model:{value:e.selectAllBrands,callback:function(t){e.selectAllBrands=t},expression:"selectAllBrands"}},e._l(e.allBrandsData,function(e){return a("el-option",{key:e.productBrand,attrs:{label:e.productBrandName,value:e.productBrand}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"规格选择",size:"small"}},[a("el-select",{attrs:{placeholder:"全部",disabled:!!e.id,clearable:!!e.id,multiple:!0},model:{value:e.selectSpeciSns,callback:function(t){e.selectSpeciSns=t},expression:"selectSpeciSns"}},e._l(e.allSpecisData,function(e){return a("el-option",{key:e.productSn,attrs:{label:e.productName,value:e.productSn}})}))],1)],1),e._v(" "),a("el-form-item",[a("el-row",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.queryData}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:""},on:{click:e.exportData}},[e._v("导出搜索结果")])],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"红包投入数据周报("+e.statTimeName+")"}},[a("el-table-column",{attrs:{prop:"col0",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col1",label:"销区"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col2",label:"省份"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col3",label:"地市"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col4",label:"本周红包投入（元）"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col5",label:"上周红包投入（元）"}}),e._v(" "),a("el-table-column",{attrs:{prop:"col6",label:"截至本周末历史累计红包投入（元）"}})],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,s,!1,function(e){a("o/Kk")},"data-v-a1037246",null);t.default=o.exports},mhN6:function(e,t){},"o/Kk":function(e,t){},oGwZ:function(e,t){}});
//# sourceMappingURL=8.492ecfab75ff56c1f7c6.js.map