webpackJsonp([11],{"/wGG":function(t,e){},"29a0":function(t,e){},"7BTO":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:()=>({actList:[],actTable:[]}),created(){},methods:{getTaskList(){this.$request.post("/sc/saotx/act/findList",{},!0,t=>{if("200000"===t.ret)return this.actList=t.data})},goToDetail(t){this.$router.push(`/customer/task/sign?code=${t.taskCode}&id=${t.id}`)},openOrClose(t,e){t?this.switchAPI(t,e):this.$confirm("是否关闭签到活动?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.switchAPI(t,e)}).catch(()=>{this.getTaskList(),this.$message({type:"info",message:"已取消关闭"})})},switchAPI(t,e){this.$request.post("/sc/saotx/act/update",{id:e,status:t},!0,e=>{"200000"===e.ret?this.$message.success(t?"开启成功":"关闭成功"):this.$message.error(e.msg)})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-card",[a("div",{staticClass:"conf-act-list"},[a("ul",t._l(t.actList,function(e,s){return a("li",{key:s},[a("div",{staticClass:"img",style:{background:"url("+e.taskImg+") no-repeat center / 100% 100%"},on:{click:function(a){t.goToDetail(e)}}}),t._v(" "),a("div",{staticClass:"con"},[a("div",{staticClass:"text"},[a("div",{staticClass:"title"},[t._v(t._s(e.taskName))]),t._v(" "),a("div",{staticClass:"switch"},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0},on:{change:function(a){t.openOrClose(e.status,e.id)}},model:{value:e.status,callback:function(a){t.$set(e,"status",a)},expression:"item.status"}})],1)]),t._v(" "),a("div",{staticClass:"desc"},[t._v(t._s(e.taskDetail))])])])}))]),t._v(" "),a("el-table",{staticClass:"mt20",staticStyle:{width:"100%"},attrs:{border:"",data:t.actTable}},[a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"任务名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"获得积分数",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"获得成长值",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"更新时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text"}},[t._v("查看明细")])]}}])})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(s,i,!1,function(t){a("M0L7")},"data-v-569a13dc",null);e.default=n.exports},"8cTO":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("VU/8")(null,null,!1,null,null,null);e.default=s.exports},"99ZA":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:()=>({defaultList:[{name:"普通用户"}],rigthsList:[],showListFlg:!1,listLen:0,defaultImgUrl:"http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/rifhts-default-img.png"}),created(){this.getRightsList()},methods:{getRightsList(){this.$request.post(`/api/saotx/mbgrade/lists?_=${(new Date).getTime()}`,{},!0,t=>{"200000"===t.ret&&(this.rigthsList=t.data,this.listLen=this.rigthsList.length,this.showListFlg=!0)})},openOrClose(t,e,a){if(t)this.switchAPI(t,e);else{if(this.rigthsList.length-1>a)return this.$alert("请先关闭高等级，在关闭当前等级。","提示",{confirmButtonText:"确定",type:"warning"}),void this.getRightsList();this.$confirm("关闭后消费者将不能享受当前的级别的权益，未避免投诉，请谨慎操作。","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.switchAPI(t,e)}).catch(()=>{this.getRightsList(),this.$message({type:"info",message:"已取消关闭"})})}},switchAPI(t,e){this.$request.post("/api/saotx/mbgrade/updateStatus",{id:e,status:t},!0,e=>{"200000"===e.ret?this.$message.success(t?"开启成功":"关闭成功"):this.$message.error(e.msg)})},edit(t,e){if(t)return this.$router.push(`/customer/lvl/edit?id=${t.id}`);if(0!=this.rigthsList.length){let t=this.rigthsList[e-1].gradeUpper;this.$router.push(`/customer/lvl/edit?lowGrowth=${t}`)}else this.$router.push("/customer/lvl/edit")}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-card",[t.showListFlg?a("div",{staticClass:"wrapper"},t._l(10,function(e,s){return a("div",{key:s,staticClass:"item"},[a("p",{staticClass:"name"},[t._v(t._s(e)+"."+t._s(t.rigthsList[s]?t.rigthsList[s].gradeName:"普通用户"))]),t._v(" "),a("img",{attrs:{src:t.rigthsList[s]?t.rigthsList[s].gradeImg:t.defaultImgUrl,width:"83",height:"83"}}),t._v(" "),a("p",{staticClass:"growth"},[t._v("需要"+t._s(t.rigthsList[s]?t.rigthsList[s].gradeUpper:"")+"成长值")]),t._v(" "),a("div",{staticClass:"rights"},[s<t.listLen?a("p",[a("span",[t._v("等级权益")]),a("span",[t._v(t._s(t.rigthsList[s]?t.rigthsList[s].rightsNum:0))])]):t._e()]),t._v(" "),s<=t.listLen?a("div",{staticClass:"btn"},[s<t.listLen?a("el-switch",{attrs:{"active-value":1,"inactive-value":0},on:{change:function(e){t.openOrClose(t.rigthsList[s].status,t.rigthsList[s].id,s)}},model:{value:t.rigthsList[s].status,callback:function(e){t.$set(t.rigthsList[s],"status",e)},expression:"rigthsList[index].status"}}):t._e(),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(e){t.edit(t.rigthsList[s],s)}}},[t._v("编辑")])],1):t._e()])})):t._e()])],1)},staticRenderFns:[]};var n=a("VU/8")(s,i,!1,function(t){a("bI1p")},"data-v-10a1cf48",null);e.default=n.exports},ICao:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("nxSO"),i={props:{conf:{type:Object,required:!0},page:{}},data:()=>({nowMonth:`${(new Date).getFullYear()}.${(new Date).getMonth()+1}`,weekArr:["日","一","二","三","四","五","六"],dayArr:[],days:null,activeStyle:{background:"#F0CB28",color:"#FCF8F8"},signDayArr:[1,2,4,5,6,7,10,20]}),watch:{},created(){this.days=new Date(this.nowMonth+".1").getDay(),this.handleDayNum()},methods:{handleDayNum(){let t=(new Date).getMonth()+1,e=(new Date).getFullYear(),a=0;switch(t){case 2:a=e%4!=0||e%100==0&&e%400!=0||e%3200==0?28:29;break;case 1:case 3:case 5:case 7:case 8:case 10:case 12:a=31;break;case 4:case 6:case 9:case 11:a=30}this.forDay(a)},forDay(t){this.dayArr=[];for(let e=1;e<=t;e++)this.dayArr.push(e)},handleImg(){},sendImgType(t){8!=this.page&&this.$emit("changeImg",t)}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t.conf.imgObj?a("div",{staticClass:"phone-wrapper"},[a("div",{staticClass:"phone-header"},[a("h4",[t._v(t._s(t.conf.title))])]),t._v(" "),a("div",{staticClass:"phone-body"},[1==t.page||8==t.page?a("div",[a("img",{staticClass:"bg page1-bg",style:{width:.4*t.conf.imgObj.page1.bg.size[0]+"px",height:.4*t.conf.imgObj.page1.bg.size[1]+"px",left:.4*t.conf.imgObj.page1.bg.pos[0]+"px",top:.4*t.conf.imgObj.page1.bg.pos[1]+"px"},attrs:{src:t.conf.imgObj.page1.bg.url},on:{click:function(e){t.sendImgType(t.conf.imgObj.page1.bg.type)}}}),t._v(" "),a("img",{staticClass:"rules-btn",style:{width:.4*t.conf.imgObj.page1.rulesBtn.size[0]+"px",height:.4*t.conf.imgObj.page1.rulesBtn.size[1]+"px",left:.4*t.conf.imgObj.page1.rulesBtn.pos[0]+"px",top:.4*t.conf.imgObj.page1.rulesBtn.pos[1]+"px"},attrs:{src:t.conf.imgObj.page1.rulesBtn.url},on:{click:function(e){t.sendImgType(t.conf.imgObj.page1.rulesBtn.type)}}}),t._v(" "),a("img",{staticClass:"draw-btn",style:{width:.4*t.conf.imgObj.page1.drawBtn.size[0]+"px",height:.4*t.conf.imgObj.page1.drawBtn.size[1]+"px",left:.4*t.conf.imgObj.page1.drawBtn.pos[0]+"px",top:.4*t.conf.imgObj.page1.drawBtn.pos[1]+"px"},attrs:{src:t.conf.imgObj.page1.drawBtn.url,alt:""},on:{click:function(e){t.sendImgType(t.conf.imgObj.page1.drawBtn.type)}}}),t._v(" "),a("div",{staticClass:"calendar",on:{click:function(e){t.sendImgType(t.conf.imgObj.page1.calendarHeader.type)}}},[a("div",{staticClass:"header",style:{width:.4*t.conf.imgObj.page1.calendarHeader.size[0]+"px",height:.4*t.conf.imgObj.page1.calendarHeader.size[1]+"px",left:.4*t.conf.imgObj.page1.calendarHeader.pos[0]+"px",top:.4*t.conf.imgObj.page1.calendarHeader.pos[1]+"px",background:"url("+t.conf.imgObj.page1.calendarHeader.url+") no-repeat center / 100% 100%","line-height":.4*t.conf.imgObj.page1.calendarHeader.size[1]+"px"}},[t._v("\n            您已经连续签到 "),a("span",[t._v("3")]),t._v(" 天\n          ")]),t._v(" "),a("div",{staticClass:"con",style:{width:.4*t.conf.imgObj.page1.calendarCon.size[0]+"px",height:.4*t.conf.imgObj.page1.calendarCon.size[1]+"px",left:.4*t.conf.imgObj.page1.calendarCon.pos[0]+"px",top:.4*t.conf.imgObj.page1.calendarCon.pos[1]+"px",background:"url("+t.conf.imgObj.page1.calendarCon.url+") no-repeat center / 100% 100%"}},[a("div",{staticClass:"data-module"},[a("div",{staticClass:"header"},[t._v(t._s(t.nowMonth))]),t._v(" "),a("div",{staticClass:"body"},[t._l(t.weekArr,function(e,s){return a("div",{key:s,staticClass:"item"},[t._v("\n                  "+t._s(e)+"\n                ")])}),t._v(" "),t._l(t.days,function(t,e){return a("div",{key:e,staticClass:"item"})}),t._v(" "),t._l(t.dayArr,function(e,s){return a("div",{key:s,staticClass:"item",style:t.signDayArr.includes(s+1)?t.conf.activeStyle:{}},[t._v("\n                  "+t._s(e)+"\n                ")])})],2)])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:8==t.page,expression:"page == 8"}],staticClass:"mask"})]):t._e(),t._v(" "),1!==t.page&&t.page<7?a("div",[a("div",{staticClass:"bg",style:{width:"300px",height:"484px",background:"rgba(0, 0, 0, 0.8)"}},t._l(t.conf.imgObj["page"+t.page],function(t,e){return a("img",{key:e,style:{width:.4*t.size[0]+"px",height:.4*t.size[1]+"px",left:.4*t.pos[0]+"px",top:.4*t.pos[1]+"px"},attrs:{src:t.url}})}))]):t._e(),t._v(" "),7==t.page?a("div",[a("div",{staticClass:"share-bg"},[a("div",{staticClass:"text"},[a("h3",{staticClass:"title",domProps:{innerHTML:t._s(t.conf.share.shareTitle?t.conf.share.shareTitle:"扫码验真")}}),t._v(" "),a("p",{staticClass:"desc",domProps:{innerHTML:t._s(t.conf.share.shareDesc?t.conf.share.shareDesc:"扫码验真精彩送不停，更多好礼等级拿！")}}),t._v(" "),a("dic",{staticClass:"img"},[a("img",{attrs:{src:t.conf.imgObj.page7.icon.url+"?"+(new Date).getTime()}})])],1)])]):t._e()]),t._v(" "),a("div",{staticClass:"phone-footer"})]):t._e()])},staticRenderFns:[]};var r=a("VU/8")(i,n,!1,function(t){a("fm0I")},"data-v-622a5e20",null).exports,l=a("ifEn"),o=a("UJta"),c=a("9ijK"),d=a("ehVw"),u={props:["data"],data:()=>({num:1,imgURL:"http://qoss.qrmkt.cn/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png"}),methods:{del(t){this.$confirm("是否删除该项?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.data.splice(t,1),this.$message({type:"success",message:"删除成功!"})}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},sync(t){this.data[t].quantity=this.data[t].allquantity},addRepertory(t){this.$prompt("请输入数字","增库",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^\d{1,}$/,inputErrorMessage:"请输入数字"}).then(({value:e})=>{if(0==e)return this.$message.error("数字不能为0");this.$request.post("/sc/saotx/game/addQuality",{id:this.data[t].id,shopQuantity:e},!0,a=>{200==a.code?(this.$message.success("增库成功"),this.data[t].allquantity+=Number(e),this.data[t].quantity+=Number(e)):this.$message.error(a.message)})}).catch(()=>{this.$message({type:"info",message:"取消输入"})})}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-form",{staticClass:"mb20"},t._l(t.data,function(e,s){return a("el-form-item",{key:s},[a("img",{attrs:{src:e.image,width:"40px"}}),t._v(" "),a("p",[t._v(t._s(e.productName))]),t._v("\n      奖品数量：\n      "),a("el-input-number",{attrs:{disabled:!!e.id,controls:!1,min:0,precision:0},on:{change:function(e){t.sync(s)}},model:{value:e.allquantity,callback:function(a){t.$set(e,"allquantity",a)},expression:"item.allquantity"}}),t._v("\n      个\n      "),a("span",[t._v("*")]),t._v("\n      中奖概率\n      "),a("el-input-number",{attrs:{controls:!1,min:0,max:100},model:{value:e.probability,callback:function(a){t.$set(e,"probability",a)},expression:"item.probability"}}),t._v("\n      %\n      "),a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.del(s)}}},[t._v("删除")]),t._v(" "),e.id?a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addRepertory(s)}}},[t._v("增库")]):t._e(),t._v(" "),a("span",{staticClass:"residual"},[t._v("剩余"+t._s(e.quantity)+"个")])],1)}))],1)},staticRenderFns:[]};var g=a("VU/8")(u,p,!1,function(t){a("xzLG")},"data-v-05dfa074",null).exports,m={props:{data:{type:Object,required:!0}},data:()=>({}),created(){},methods:{noRepeat(t,e){this.data.forEach((a,s)=>{e!=s&&a.continuSignDay==t&&this.$message.error("连续签到天数不能重复!")})},add(t){if(this.data.length>=10)return this.$message.error("连续签到设置不能超过10项!");this.data.push({continuSignDay:0,extraScore:0,extraGrowth:0})},del(t){this.$confirm("是否删除该项?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.data.splice(t,1),this.$message({type:"success",message:"删除成功!"})}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("ul",t._l(t.data,function(e,s){return a("li",{key:s},[t._v("\n      连续签到\n      "),a("el-input-number",{attrs:{controls:!1,min:0,precision:0},on:{change:function(a){t.noRepeat(e.continuSignDay,s)}},model:{value:e.continuSignDay,callback:function(a){t.$set(e,"continuSignDay",a)},expression:"item.continuSignDay"}}),t._v("\n      天，额外可获得\n      "),a("el-input-number",{attrs:{controls:!1,min:0,precision:0},model:{value:e.extraScore,callback:function(a){t.$set(e,"extraScore",a)},expression:"item.extraScore"}}),t._v("\n      积分\n      "),a("el-input-number",{attrs:{controls:!1,min:0,precision:0},model:{value:e.extraGrowth,callback:function(a){t.$set(e,"extraGrowth",a)},expression:"item.extraGrowth"}}),t._v("\n      成长值\n      "),a("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:function(e){t.add(s)}}}),t._v(" "),0!==s?a("el-button",{attrs:{icon:"el-icon-minus",circle:""},on:{click:function(e){t.del(s)}}}):t._e()],1)}))])},staticRenderFns:[]};var f=a("VU/8")(m,h,!1,function(t){a("v53L")},"data-v-13d68e90",null).exports,v=a("G0J2"),b={components:{prizeConf:g,signItem:f,quillEditor:v.quillEditor},props:{conf:{type:Object,required:!0}},data(){var t=(t,e,a)=>{};return{rules:{actName:[{required:!0,message:"请输入活动名称",trigger:"blur"}],signNote:[{required:!0,validator:(t,e,a)=>{this.conf.sactBset.signNote?a():a(new Error("请输入活动说明"))}}],signImg:[{required:!0,validator:t}],share:[{required:!0,validator:t}]},signRules:{awards:[{required:!0,validator:t}],signAwards:[{required:!0,validator:t}]},draw:{draw:[{required:!0,validator:t}],drawChanceFlg:[{required:!0,validator:t}],drawSignDay:[{required:!0,validator:t}]},prize:{selected:[{required:!0,validator:t}]},editorOption:{modules:{toolbar:[[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],["bold","italic","underline","strike",,"blockquote"],[{color:[]},{background:[]},{align:[]}]]},placeholder:"请输入活动说明"},uploadApi:"/api/saotx/attach/commonAliUpload",headerObj:{loginId:sessionStorage.getItem("access_loginId")||"2d07e7953a2a63ceda6df5144d1abec3",token:sessionStorage.getItem("access_token"),CLIENTSESSIONID:sessionStorage.getItem("CLIENTSESSIONID")},imgIndex:0,showFile:!1}},created(){},methods:{getPrize(){this.$emit("getPrize")},onEditorBlur(){},updataImg(t){},uploadSuccess(t,e,a){let s=t.data.accessUrl;1==this.imgIndex?this.conf.sactBset.initBtImage=s:this.conf.sactBset.pressBtImage=s},uploadError(t){console.log(t),this.$message.error("图片上传失败")},beforeAvatarUpload(t){const e="image/jpeg"===t.type||"image/png"===t.type||"image/bmp"===t.type||"image/gif"===t.type;return e||this.$message.error("上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!"),e}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"title ml20 mb20"},[t._v("基础设置")]),t._v(" "),a("el-form",{attrs:{"label-width":"100px",model:t.conf.sactBset,rules:t.rules}},[a("el-form-item",{attrs:{label:"活动名称：",prop:"actName"}},[a("el-input",{attrs:{max:15,min:1},model:{value:t.conf.sactBset.actName,callback:function(e){t.$set(t.conf.sactBset,"actName",e)},expression:"conf.sactBset.actName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"签到入口：",prop:"signImg"}},[a("div",{staticClass:"start ml20"},[a("p",[t._v("初始状态")]),t._v(" "),a("div",{staticClass:"con"},[a("img",{attrs:{src:t.conf.sactBset.initBtImage,title:"初始状态"}})]),t._v(" "),a("el-upload",{staticClass:"upload",attrs:{action:t.uploadApi,headers:t.headerObj,"show-file-list":!1,"on-success":t.uploadSuccess,"before-upload":t.beforeAvatarUpload,"on-error":t.uploadError}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.imgIndex=1}}},[t._v("更换图片")])],1)],1),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"end"},[a("p",[t._v("按下效果")]),t._v(" "),a("div",{staticClass:"con"},[a("img",{attrs:{src:t.conf.sactBset.pressBtImage,title:"按下效果"}})]),t._v(" "),a("el-upload",{staticClass:"upload",attrs:{action:t.uploadApi,headers:t.headerObj,"show-file-list":!1,"on-success":t.uploadSuccess,"before-upload":t.beforeAvatarUpload,"on-error":t.uploadError}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.imgIndex=2}}},[t._v("更换图片")])],1)],1)]),t._v(" "),a("el-form-item",{attrs:{label:"签到规则：",prop:"signNote"}},[a("quill-editor",{ref:"myTextEditor",attrs:{options:t.editorOption,placeholder:"请输入活动说明，300字以内"},on:{blur:function(e){t.onEditorBlur(e)}},model:{value:t.conf.sactBset.signNote,callback:function(e){t.$set(t.conf.sactBset,"signNote",e)},expression:"conf.sactBset.signNote"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"分享设置：",prop:"share"}},[a("el-radio",{attrs:{label:1},model:{value:t.conf.sactBset.share,callback:function(e){t.$set(t.conf.sactBset,"share",e)},expression:"conf.sactBset.share"}},[t._v("开启分享")]),t._v(" "),a("el-radio",{attrs:{label:0},model:{value:t.conf.sactBset.share,callback:function(e){t.$set(t.conf.sactBset,"share",e)},expression:"conf.sactBset.share"}},[t._v("关闭分享")])],1)],1),t._v(" "),a("div",{staticClass:"title ml20 mb20"},[t._v("签到设置")]),t._v(" "),a("el-form",{attrs:{"label-width":"130px",rules:t.signRules}},[a("el-form-item",{attrs:{label:"常规签到奖励：",prop:"awards"}},[t._v("\n      每日签到获得\n      "),a("el-input-number",{attrs:{controls:!1,min:0,precision:0},model:{value:t.conf.sactBset.score,callback:function(e){t.$set(t.conf.sactBset,"score",e)},expression:"conf.sactBset.score"}}),t._v("\n      积分\n      "),a("el-input-number",{attrs:{controls:!1,min:0,precision:0},model:{value:t.conf.sactBset.growth,callback:function(e){t.$set(t.conf.sactBset,"growth",e)},expression:"conf.sactBset.growth"}}),t._v("\n      成长值\n    ")],1),t._v(" "),a("el-form-item",{attrs:{label:"连续签到奖励：",prop:"signAwards"}},[a("el-radio",{attrs:{disabled:t.conf.sactBset.status,label:0},model:{value:t.conf.sactBset.continuSignFlg,callback:function(e){t.$set(t.conf.sactBset,"continuSignFlg",e)},expression:"conf.sactBset.continuSignFlg"}},[t._v("关闭")]),t._v(" "),a("el-radio",{attrs:{disabled:t.conf.sactBset.status,label:1},model:{value:t.conf.sactBset.continuSignFlg,callback:function(e){t.$set(t.conf.sactBset,"continuSignFlg",e)},expression:"conf.sactBset.continuSignFlg"}},[t._v("开启")]),t._v(" "),a("sign-item",{directives:[{name:"show",rawName:"v-show",value:1===t.conf.sactBset.continuSignFlg,expression:"conf.sactBset.continuSignFlg === 1"}],attrs:{data:t.conf.contItems}}),t._v(" "),a("div",{staticClass:"tips"},[t._v("发布后不可切换")])],1)],1),t._v(" "),a("div",{staticClass:"title ml20 mb20"},[t._v("抽奖设置")]),t._v(" "),a("el-form",{attrs:{"label-width":"130px",rules:t.draw}},[a("el-form-item",{attrs:{label:"是否关联抽奖：",prop:"drawChanceFlg"}},[a("el-radio",{attrs:{label:0},model:{value:t.conf.sactBset.drawChanceFlg,callback:function(e){t.$set(t.conf.sactBset,"drawChanceFlg",e)},expression:"conf.sactBset.drawChanceFlg"}},[t._v("不关联")]),t._v(" "),a("el-radio",{attrs:{label:1},model:{value:t.conf.sactBset.drawChanceFlg,callback:function(e){t.$set(t.conf.sactBset,"drawChanceFlg",e)},expression:"conf.sactBset.drawChanceFlg"}},[t._v("关联")])],1),t._v(" "),a("el-form-item",{attrs:{label:"抽奖要求：",prop:"drawSignDay"}},[t._v("\n        累计签到\n        "),a("el-input-number",{attrs:{controls:!1,min:1,precision:0},model:{value:t.conf.sactBset.drawSignDay,callback:function(e){t.$set(t.conf.sactBset,"drawSignDay",e)},expression:"conf.sactBset.drawSignDay"}}),t._v("\n        天，可参与抽奖\n      ")],1)],1),t._v(" "),a("div",{staticClass:"title ml20 mb20"},[t._v("奖项设置")]),t._v(" "),a("el-form",{attrs:{"label-width":"100px",rules:t.prize}},[a("el-form-item",{attrs:{label:"选择奖品：",prop:"selected"}},[a("el-button",{attrs:{icon:"el-icon-plus"},on:{click:t.getPrize}})],1)],1),t._v(" "),a("p",{staticClass:"ml20"},[t._v("所选礼品：")]),t._v(" "),t.conf.gameItems?a("prize-conf",{staticClass:"ml20",attrs:{data:t.conf.gameItems}}):t._e()],1)},staticRenderFns:[]};var y=a("VU/8")(b,_,!1,function(t){a("jf72")},"data-v-04f4b2d0",null).exports,C={data:()=>({queryParmes:{pageNo:1,pageSize:5,productId:null,productName:"",giftType:null},queryStr:"",optionArr:[{name:"礼品名称",id:1},{name:"礼品id",id:2}],giftTypeArr:[{name:"虚拟",code:1},{name:"实物",code:2},{name:"红包",code:3},{name:"积分",code:4}],selectedNum:1,selectedTotalGoods:0,selectedGoodsArr:[],dataObj:[{id:1,name:"123",pic:"http://qoss.qrmkt.cn/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png",type:"活动奖品",sort:"实物",stock:123},{id:1,name:"123",pic:"http://qoss.qrmkt.cn/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png",type:"活动奖品",sort:"实物",stock:123},{id:1,name:"123",pic:"http://qoss.qrmkt.cn/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png",type:"活动奖品",sort:"实物",stock:123}],total:3,prizeList:[],giftType:{1:"虚拟",2:"实物",3:"红包",4:"积分"},loading:!0}),created(){this.getPrize()},methods:{getPrize(){this.loading=!0,1==this.selectedNum?(this.queryParmes.productName=this.queryStr,this.queryParmes.productId=""):(this.queryParmes.productId=this.queryStr,this.queryParmes.productName=""),this.$request.post("/sc/saotx/mall/product/listActs",this.queryParmes,!0,t=>{"200000"===t.ret&&(this.loading=!1,this.prizeList=t.data.list,this.total=t.data.page.count)})},confirm(){this.$emit("getSelectedGoodsArr",this.selectedGoodsArr)},close(){this.$emit("close")},selected(t){this.selectedTotalGoods=t.length,this.selectedGoodsArr=t},handleCurrentChange(t){this.queryParmes.pageNo=t,this.getPrize()}}},w={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"关键词"}},[a("el-select",{model:{value:t.selectedNum,callback:function(e){t.selectedNum=e},expression:"selectedNum"}},t._l(t.optionArr,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.id}})})),t._v(" "),a("el-input",{model:{value:t.queryStr,callback:function(e){t.queryStr=e},expression:"queryStr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"礼品类型"}},[a("el-select",{staticClass:"type",attrs:{placeholder:"请选择礼品类型",clearable:""},model:{value:t.queryParmes.giftType,callback:function(e){t.$set(t.queryParmes,"giftType",e)},expression:"queryParmes.giftType"}},t._l(t.giftType,function(t,e){return a("el-option",{key:e,attrs:{label:t,value:e}})}))],1)],1),t._v(" "),a("el-button",{staticClass:"mb20",attrs:{type:"primary"},on:{click:t.getPrize}},[t._v("查询")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:!0,data:t.prizeList,"tooltip-effect":"dark"},on:{select:t.selected,"select-all":t.selected}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"productId",label:"礼品ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"productName",label:"礼品名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"礼品图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.image,height:"40px",alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"礼品类型",align:"center"}},[[t._v("\n        活动奖品\n      ")]],2),t._v(" "),a("el-table-column",{attrs:{label:"礼品分类",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.giftType[e.row.giftType])+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"shopQuantity",label:"库存",align:"center"}})],1),t._v(" "),a("el-pagination",{staticClass:"mt20",attrs:{background:"","current-page":t.queryParmes.pageNo,"page-size":t.queryParmes.pageSize,layout:"total, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("div",{staticClass:"selectedText"},[a("p",[t._v("当前已选"+t._s(t.selectedTotalGoods)+"个商品")])]),t._v(" "),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确定")]),t._v(" "),a("el-button",{attrs:{plain:""},on:{click:t.close}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var x=a("VU/8")(C,w,!1,function(t){a("29a0")},"data-v-b1efea86",null).exports,k={props:{imgObj:{type:Object,required:!0},type:{default:1},color:{required:!0}},data:()=>({uploadApi:"/api/saotx/attach/commonAliUpload",headerObj:{loginId:sessionStorage.getItem("access_loginId")||"2d07e7953a2a63ceda6df5144d1abec3",token:sessionStorage.getItem("access_token"),CLIENTSESSIONID:sessionStorage.getItem("CLIENTSESSIONID")},showFile:!1,editIndex:""}),methods:{uploadSuccess(t,e,a){let s=t.data.accessUrl;this.$emit("picChange",{url:s,index:this.editIndex})},uploadError(t){console.log(t),alert("图片上传失败")},onUploadClick(t){this.editIndex=t},beforeAvatarUpload(t){const e="image/jpeg"===t.type||"image/png"===t.type||"image/bmp"===t.type||"image/gif"===t.type;return e||this.$message.error("上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!"),e}}},I={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t.imgObj?a("el-card",{staticClass:"card"},[a("div",{staticClass:"header",attrs:{slot:"header"},slot:"header"},[a("h3",[t._v("编辑图片")])]),t._v(" "),a("div",{staticClass:"edit"},[t._l(t.imgObj,function(e,s){return a("div",{key:s,staticClass:"edit-container"},[e.type==t.type?a("div",[a("h4",[t._v("编辑"+t._s(e.name)+"：")]),t._v(" "),a("div",{staticClass:"img-container"},[a("img",{attrs:{src:e.url,alt:""}})]),t._v(" "),a("el-upload",{staticClass:"upload",attrs:{action:t.uploadApi,headers:t.headerObj,"show-file-list":t.showFile,"on-success":t.uploadSuccess,"before-upload":t.beforeAvatarUpload,"on-error":t.uploadError}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.onUploadClick(e.index)}}},[t._v("点击上传")])],1),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("* 图片建议尺寸为 "+t._s(e.size[0])+"*"+t._s(e.size[1])+"px，格式为*.jpg\\ *.bmp\\ *.png\\ *.gif")])],1):t._e()])}),t._v(" "),3==t.type?a("div",{staticClass:"edit-container"},[a("h4",[t._v("编辑日期背景：")]),t._v(" "),a("div",{staticClass:"img-container"},[a("el-color-picker",{attrs:{"show-alpha":""},model:{value:t.color.background,callback:function(e){t.$set(t.color,"background",e)},expression:"color.background"}})],1)]):t._e()],2)]):t._e()],1)},staticRenderFns:[]};var B=a("VU/8")(k,I,!1,function(t){a("/wGG")},"data-v-7ea59424",null).exports,S={props:["code","id"],components:{menuConf:s.a,phoneModule:r,activityInfo:l.a,activityImageEditor:o.a,shareConf:d.a,signConf:y,dialogModule:x,activityImgPage1:B},data(){return{menuArr:["首页","活动说明页","我的奖品页面","中奖页面","未中奖页面","签到成功弹窗","分享","活动设置"],nowMonth:`${(new Date).getFullYear()}.${(new Date).getMonth()+1}`,weekArr:["日","一","二","三","四","五","六"],page:1,days:null,dayArr:[],signDayArr:[1,2,4,5,6,7,10,20],conf:{description:"",title:"",imgObj:{},share:{shareTitle:"",shareDesc:""},actCode:"",activeStyle:{background:"rgba(240,203,40,1)",color:"#fff"}},dialogVisible:!1,imgType:1,editData:[],selectedGoodsArr:[],data:{},sactBset:{taskCode:this.code,actName:"",signNote:"",share:null,score:null,growth:null,drawChanceFlg:null,continuSignFlg:null,initBtImage:"http://qoss.qrmkt.cn/common/qd/center-sign-btn.png",pressBtImage:"http://qoss.qrmkt.cn/common/qd/center-signEnd-btn.png",drawSignDay:null,pageInfo:""},contItems:[{continuSignDay:null,extraScore:null,extraGrowth:null}],isShow:!1}},watch:{},created(){this.handleDayNum(),this.days=new Date(this.nowMonth+".1").getDay(),this.getPutDetail()},methods:{getPutDetail(){this.$request.post("/sc/saotx/act/bsDetail",{id:this.id},!0,t=>{"200000"===t.ret&&(this.data=t.data,this.data.contItems||(this.data.contItems=[],this.data.contItems.push({continuSignDay:0,extraScore:0,extraGrowth:0})),this.data.sactBset||this.$set(this.data,"sactBset",JSON.parse(JSON.stringify(this.sactBset))),t.data.sactBset.pageInfo?this.conf=JSON.parse(t.data.sactBset.pageInfo):this.conf.imgObj=JSON.parse(JSON.stringify(c.a.img.ACT_SIGN)),this.editData.push(this.conf.imgObj.page7.icon),this.isShow=!0)})},editPic(t){let e=t.index||"",a=t.url;this.page<=6?this.conf.imgObj["page"+this.page][e].url=a:7==this.page&&(this.conf.imgObj.page7.icon.url=a)},getPrize(){this.dialogVisible=!0},updataPage(t){this.page=t},a(){this.signDayArr.push(21)},getSelectedGoodsArr(t){this.selectedGoodsArr=t,this.dialogVisible=!1;let e=[];this.data.gameItems&&this.data.gameItems.length>0&&this.data.gameItems.forEach(t=>{e.push(t.id)}),this.selectedGoodsArr.map(t=>{if(-1!=e.indexOf(t.id))return this.$message.warning("请不要选择重复的奖品");this.data.gameItems||this.$set(this.data,"gameItems",[]),this.data.gameItems.push({orgId:t.orgId,gameId:this.code,gameName:"",productId:t.productId,productName:t.productName,image:t.image,status:t.status,probability:0,type:t.giftType,score:t.score,bingo_image:t.image,shopQuantity:t.shopQuantity,quantity:null,allquantity:0})})},close(){this.dialogVisible=!1},handleDayNum(){let t=(new Date).getMonth()+1,e=(new Date).getFullYear(),a=0;switch(t){case 2:a=e%4!=0||e%100==0&&e%400!=0||e%3200==0?28:29;break;case 1:case 3:case 5:case 7:case 8:case 10:case 12:a=31;break;case 4:case 6:case 9:case 11:a=30}this.forDay(a)},changeImg(t){this.imgType=t},forDay(t){this.dayArr=[];for(let e=1;e<=t;e++)this.dayArr.push(e)},titleInput(t){let e=t.value;this.conf.title=e||""},descInput(t){let e=t.value;e?this.conf.description=e:this.description=""},save(){if(""==this.conf.description||""==this.conf.title)return this.$message.error("首页/模板名称或描述不能为空!");if(this.isRepeat(this.data.contItems,"continuSignDay"))return this.$message.error("连续签到天数不能重复!");let t=JSON.stringify(this.conf);this.data.sactBset.pageInfo=t,this.$request.post("/sc/saotx/act/saveBSet",this.data,!0,t=>{"200000"===t.ret&&(this.$message.success("保存成功"),setTimeout(()=>{this.$router.push("/customer/task")},1e3))})},isRepeat(t,e){let a=[],s=!1;return t.forEach((t,i)=>{-1==a.indexOf(t[e])?a.push(t[e]):s=!0}),s}}},$={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("menu-conf",{attrs:{menuArr:t.menuArr,page:t.page},on:{updataPage:t.updataPage}}),t._v(" "),a("el-card",{attrs:{"body-style":{padding:"40px"}}},[a("el-row",[a("el-col",{attrs:{span:8}},[t.isShow?a("phone-module",{attrs:{conf:t.conf,page:t.page},on:{changeImg:t.changeImg}}):t._e()],1),t._v(" "),a("el-col",{staticClass:"ml20",attrs:{span:15}},[t.page<7?a("div",[1==t.page&&t.isShow?a("activity-info",{attrs:{title:t.conf.title,desc:t.conf.description},on:{titleInput:t.titleInput,descInput:t.descInput}}):t._e(),t._v(" "),t.page>3&&t.isShow?a("activity-image-editor",{attrs:{editData:t.conf.imgObj["page"+t.page],type:"normal",itemRepeat:!1},on:{picChange:t.editPic}}):t._e(),t._v(" "),1==t.page&&t.isShow?a("activity-img-page1",{attrs:{imgObj:t.conf.imgObj.page1,color:t.conf.activeStyle,type:t.imgType},on:{picChange:t.editPic}}):t._e()],1):t._e(),t._v(" "),7==t.page?a("div",[t.editData?a("share-conf",{attrs:{shareConf:t.conf.share,editData:t.editData},on:{shareChange:t.editPic}}):t._e()],1):t._e(),t._v(" "),8==t.page?a("div",[t.data.sactBset?a("sign-conf",{attrs:{conf:t.data},on:{getPrize:t.getPrize}}):t._e()],1):t._e()])],1),t._v(" "),a("div",{staticClass:"btn mt20"},[a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")]),t._v(" "),a("el-button",{attrs:{plain:""},on:{click:function(e){t.$router.go(-1)}}},[t._v("返回")])],1)],1),t._v(" "),a("el-dialog",{attrs:{width:"800px","close-on-click-modal":!1,visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("dialog-module",{on:{getSelectedGoodsArr:t.getSelectedGoodsArr,close:t.close}})],1)],1)},staticRenderFns:[]};var O=a("VU/8")(S,$,!1,function(t){a("okfk")},"data-v-510b2f28",null);e.default=O.exports},M0L7:function(t,e){},TiiC:function(t,e){},U4iu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:()=>({currentPage4:10,total:100,load:!0}),methods:{handleCurrentChange(){}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-card",[a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"昵称："}},[a("el-input")],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号："}},[a("el-input-number",{attrs:{controls:!1}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户等级："}},[a("el-input")],1)],1),t._v(" "),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{plain:""}},[t._v("重置")])],1)],1),t._v(" "),a("el-button",{staticClass:"mt20 mb20",attrs:{plain:""}},[t._v("导出")]),t._v(" "),a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.load,expression:"load"}],attrs:{border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"头像",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"手机号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"性别",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"等级",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"积分",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"成长值",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"地区",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"注册时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"}})],1),t._v(" "),a("el-pagination",{staticClass:"mt20",attrs:{background:"","current-page":t.currentPage4,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var n=a("VU/8")(s,i,!1,function(t){a("TiiC")},"data-v-f11b8bb0",null);e.default=n.exports},bI1p:function(t,e){},fm0I:function(t,e){},jf72:function(t,e){},nxSO:function(t,e,a){"use strict";var s={props:{menuArr:{type:[Object,Array],required:!0},page:{type:[String,Number],required:!0}},data:()=>({defaultActive:1}),methods:{switchMenu(t){this.$emit("updataPage",t)}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-menu",{attrs:{mode:"horizontal","default-active":t.defaultActive},on:{select:t.switchMenu}},t._l(t.menuArr,function(e,s){return a("el-menu-item",{key:s,attrs:{index:s+1}},[t._v(t._s(e))])}))],1)},staticRenderFns:[]},n=a("VU/8")(s,i,!1,null,null,null);e.a=n.exports},okfk:function(t,e){},v53L:function(t,e){},xzLG:function(t,e){}});
//# sourceMappingURL=11.873270700ba8809cf751.js.map