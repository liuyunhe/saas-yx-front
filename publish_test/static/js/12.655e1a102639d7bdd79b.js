webpackJsonp([12],{"62Tq":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("7w9a"),n=i("ifEn"),a=i("UJta"),s=i("9ijK"),c={props:["id"],data:()=>({defaultActive:"1",editData:[s.a.img.ACT_JIUGONGGE.normal.bg],editType:"normal",itemRepeat:!1,page:1,isPublish:!1,conf:{form:"act-104",id:"",description:"",title:"活动标题",img:s.a.img.ACT_JIUGONGGE,commonImg:s.a.commonImg,conf:{img:"",commonImg:"",title:"",desc:""},name:"",note:"",saleZone:1==sessionStorage.getItem("isAllSaleZone")?null:sessionStorage.getItem("saleZoneCode")}}),components:{phoneModel:o.a,activityInfo:n.a,activityImageEditor:a.a},created(){this.getActDetail()},mounted(){console.log(this)},computed:{},methods:{switchMenu(e,t){let i=this;i.page=e,4==e?(i.editData=[i.conf.commonImg.getBtn],i.editType="common"):1==e?(i.editData=[i.conf.img.normal.bg],i.editType="normal"):5==e&&(i.editData=[i.conf.commonImg.noAward,i.conf.commonImg.knowBtn],i.editType="common")},titleInput(e){let t=e.value;t?this.conf.title=t:this.title="活动标题"},descInput(e){let t=e.value;t?this.conf.description=t:this.description=""},saleZoneInput(e){let t=e.value;t?this.conf.saleZone=t:this.saleZone=""},edit(e){let t=e.index,i=t.indexOf("item")>-1?"item":"normal";this.editType=i,this.editData="item"==i?this.itemRepeat?[this.conf.img[i].item0]:this.conf.img[i]:[this.conf.img[i][t]]},editPic(e){let t=e.type,i=e.index,o=e.url,n=e.itemRepeat,a=this.conf;if(o){if("item"==t&&n)for(let e in a.img[t])a.img[t][e].url=o;else"item"==t&&!n||"normal"==t?a.img[t][i].url=o:"common"==t&&(console.log(i),a.commonImg[i].url=o);this.conf=a}},getActDetail(){let e=this,t=null;e.id&&e.$request.post("/api/wiseqr/acttpl/detail",{id:e.id},!0,i=>{"200000"===i.ret?(t=JSON.parse(i.data.conf),e.conf.img=JSON.parse(t.img),e.conf.commonImg=JSON.parse(t.commonImg),e.conf.description=i.data.note,e.conf.title=i.data.name,e.conf.id=i.data.id,"未投放"==i.data.statusName?e.isPublish=!1:e.isPublish=!0):this.$message.error(i.message)})},save(){let e=this;if(!e.conf.title)return this.$message.warning("请输入模板名称");e.conf.conf.img=JSON.stringify(e.conf.img),e.conf.conf.commonImg=JSON.stringify(e.conf.commonImg),e.conf.conf.title=e.conf.title,e.conf.conf.desc=e.conf.desc,e.conf.conf=JSON.stringify(e.conf.conf),e.conf.name=e.conf.title,e.conf.note=e.conf.description,e.$request.post("/api/wiseqr/acttpl/saveOrModify",e.conf,!0,t=>{if("200000"===t.ret)return e.isPublish?e.$router.push("/market/actTpl/actSetConf?form="+t.data.form+"&tplCode="+t.data.tplCode):e.$router.push("/market/actTpl"),void e.$message.success("保存成功!");e.$message.error(t.message)})}}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"root"}},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",[e._v("活动管理")]),e._v(" "),i("el-breadcrumb-item",[e._v("新建活动")]),e._v(" "),i("el-breadcrumb-item",[e._v("模板设置")])],1),e._v(" "),i("el-menu",{attrs:{mode:"horizontal","default-active":e.defaultActive},on:{select:e.switchMenu}},[i("el-menu-item",{attrs:{index:"1"}},[e._v("首页")]),e._v(" "),i("el-menu-item",{attrs:{index:"2"}},[e._v("活动说明页")]),e._v(" "),i("el-menu-item",{attrs:{index:"3"}},[e._v("我的奖品页")]),e._v(" "),i("el-menu-item",{attrs:{index:"4"}},[e._v("中奖页")]),e._v(" "),i("el-menu-item",{attrs:{index:"5"}},[e._v("未中奖页")])],1),e._v(" "),i("el-card",{attrs:{"body-style":{padding:"40px"}}},[i("el-row",[i("el-col",{attrs:{span:8}},[i("phone-model",{attrs:{title:e.conf.title,titleLength:30,page:e.page,imgKey:"ACT_JIUGONGGE",imgData:e.conf.img,commonImg:e.conf.commonImg},on:{edit:e.edit}})],1),e._v(" "),i("el-col",{attrs:{span:14}},[1==e.page?i("activity-info",{attrs:{title:e.conf.title,desc:e.conf.description,saleZone:e.conf.saleZone},on:{titleInput:e.titleInput,descInput:e.descInput,saleZoneInput:e.saleZoneInput}}):e._e(),e._v(" "),2!=e.page&&3!=e.page?i("activity-image-editor",{attrs:{editData:e.editData,type:e.editType,itemRepeat:e.itemRepeat},on:{picChange:e.editPic}}):e._e()],1)],1),e._v(" "),i("el-row",{staticClass:"tool-bar",staticStyle:{"margin-top":"20px"}},[i("el-col",{attrs:{span:8}},[i("div",{staticStyle:{height:"100px"}})]),e._v(" "),i("el-col",{attrs:{span:14}},[i("div",{staticClass:"publish"},[i("label",{attrs:{for:""}},[e._v("是否投放：")]),e._v(" "),i("el-switch",{model:{value:e.isPublish,callback:function(t){e.isPublish=t},expression:"isPublish"}})],1),e._v(" "),i("div",{staticClass:"save"},[i("el-button",{attrs:{type:"primary",size:"medium",width:"100"},on:{click:e.save}},[e._v("保存")])],1)])],1)],1)],1)},staticRenderFns:[]};var m=i("VU/8")(c,l,!1,function(e){i("A566")},null,null);t.default=m.exports},A566:function(e,t){}});
//# sourceMappingURL=12.655e1a102639d7bdd79b.js.map