webpackJsonp([11],{Qeui:function(t,e){},cJCG:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("7w9a"),o=i("ifEn"),s=i("UJta"),n=i("9ijK"),c={props:["id","edit"],data:()=>({defaultActive:"1",editData:[n.a.img.ACT_FANPAIZI.normal.bg],editType:"normal",itemRepeat:!0,page:1,isPublish:!1,conf:{actCode:"",form:"act-104",id:"",description:"",title:"",img:JSON.parse(JSON.stringify(n.a.img.ACT_FANPAIZI)),commonImg:JSON.parse(JSON.stringify(n.a.commonImg)),conf:{img:"",commonImg:"",title:"",desc:""},name:"",note:""}}),components:{phoneModel:a.a,activityInfo:o.a,activityImageEditor:s.a},created(){this.getActDetail()},mounted(){console.log(this)},computed:{},methods:{switchMenu(t,e){let i=this;i.page=t,4==t?(i.editData=[i.conf.commonImg.getAwardBgPai,i.conf.commonImg.getBtnPai],i.editType="common"):1==t?(i.editData=[i.conf.img.normal.bg],i.editType="normal"):5==t&&(i.editData=[i.conf.commonImg.noAwardPai,i.conf.commonImg.knowBtnPai],i.editType="common")},titleInput(t){let e=t.value;e?this.conf.title=e:this.title="活动标题"},descInput(t){let e=t.value;e?this.conf.description=e:this.description=""},editPhone(t){let e=t.index,i=e.indexOf("item")>-1?"item":"normal";this.editType=i,this.editData="item"==i?this.itemRepeat?[this.conf.img[i].item0]:this.conf.img[i]:[this.conf.img[i][e]]},editPic(t){let e=t.type,i=t.index,a=t.url,o=t.itemRepeat,s=this.conf;if(a){if("item"==e&&o)for(let t in s.img[e])s.img[e][t].url=a;else"item"==e&&!o||"normal"==e?s.img[e][i].url=a:"common"==e&&(console.log(i),s.commonImg[i].url=a);this.conf=s}},getActDetail(){let t=this,e=null;t.edit?t.$request.post("/api/saotx/act/pubTpl",{actCode:this.edit},!0,i=>{"200000"===i.ret?(e=JSON.parse(i.data.conf),t.conf.img=JSON.parse(e.img),t.conf.commonImg=JSON.parse(e.commonImg),t.conf.description=e.desc,t.conf.title=e.title,t.conf.id=i.data.id,t.conf.actCode=i.data.actCode,"未投放"==i.data.statusName?t.isPublish=!1:t.isPublish=!0):this.$message.error(i.message)}):t.id&&t.$request.post("/api/saotx/acttpl/detail",{id:t.id},!0,i=>{"200000"===i.ret?(e=JSON.parse(i.data.conf),t.conf.img=JSON.parse(e.img),t.conf.commonImg=JSON.parse(e.commonImg),t.conf.description=i.data.note,t.conf.title=i.data.name,t.conf.id=i.data.id,"未投放"==i.data.statusName?t.isPublish=!1:t.isPublish=!0):this.$message.error(i.message)})},save(){let t=this;if(!t.conf.title)return this.$message.warning("请输入模板名称");t.conf.conf.img=JSON.stringify(t.conf.img),t.conf.conf.commonImg=JSON.stringify(t.conf.commonImg),t.conf.conf.title=t.conf.title,t.conf.conf.desc=t.conf.description,t.conf.conf=JSON.stringify(t.conf.conf),t.conf.name=t.conf.title,t.conf.note=t.conf.description,this.edit?this.$request.post("/api/saotx/act/mpubTpl",t.conf,!0,t=>{"200000"===t.ret?(this.$message.success("保存成功"),this.$router.push("/market/actMgr")):this.$message.error(t.message)}):t.$request.post("/api/saotx/acttpl/saveOrModify",t.conf,!0,e=>{if("200000"===e.ret)return t.isPublish?t.$router.push("/market/actTpl/actSetConf?form="+e.data.form+"&tplCode="+e.data.tplCode):t.$router.push("/market/actTpl"),void t.$message.success("保存成功!");t.$message.error(e.message)})}}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"root"}},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",[t._v("活动管理")]),t._v(" "),i("el-breadcrumb-item",[t._v("新建活动")]),t._v(" "),i("el-breadcrumb-item",[t._v("模板设置")])],1),t._v(" "),i("el-menu",{attrs:{mode:"horizontal","default-active":t.defaultActive},on:{select:t.switchMenu}},[i("el-menu-item",{attrs:{index:"1"}},[t._v("首页")]),t._v(" "),i("el-menu-item",{attrs:{index:"2"}},[t._v("活动说明页")]),t._v(" "),i("el-menu-item",{attrs:{index:"3"}},[t._v("我的奖品页")]),t._v(" "),i("el-menu-item",{attrs:{index:"4"}},[t._v("中奖页")]),t._v(" "),i("el-menu-item",{attrs:{index:"5"}},[t._v("未中奖页")])],1),t._v(" "),i("el-card",{attrs:{"body-style":{padding:"40px"}}},[i("el-row",[i("el-col",{attrs:{span:8}},[i("phone-model",{attrs:{title:t.conf.title,titleLength:30,page:t.page,imgKey:"ACT_FANPAIZI",imgData:t.conf.img,commonImg:t.conf.commonImg,flag:"pai"},on:{edit:t.editPhone}})],1),t._v(" "),i("el-col",{attrs:{span:14}},[1==t.page?i("activity-info",{attrs:{title:t.conf.title,desc:t.conf.description},on:{titleInput:t.titleInput,descInput:t.descInput}}):t._e(),t._v(" "),2!=t.page&&3!=t.page?i("activity-image-editor",{attrs:{editData:t.editData,type:t.editType,itemRepeat:t.itemRepeat},on:{picChange:t.editPic}}):t._e()],1)],1),t._v(" "),i("el-row",{staticClass:"tool-bar",staticStyle:{"margin-top":"20px"}},[i("el-col",{attrs:{span:8}},[i("div",{staticStyle:{height:"100px"}})]),t._v(" "),i("el-col",{attrs:{span:14}},[i("div",{staticClass:"publish"},[i("label",{attrs:{for:""}},[t._v("是否投放：")]),t._v(" "),i("el-switch",{model:{value:t.isPublish,callback:function(e){t.isPublish=e},expression:"isPublish"}})],1),t._v(" "),i("div",{staticClass:"save"},[i("el-button",{attrs:{type:"primary",size:"medium",width:"100"},on:{click:t.save}},[t._v("保存")])],1)])],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")(c,m,!1,function(t){i("Qeui")},null,null);e.default=r.exports}});
//# sourceMappingURL=11.0a7262bd1cd645e8d5cb.js.map