webpackJsonp([11],{"/HTG":function(t,e){},"7BTO":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={data:()=>({actList:[],actTable:[]}),created(){this.getTaskList()},methods:{getTaskList(){this.$request.post("/sc/saotx/act/findList",{},!0,t=>{if("200000"===t.ret)return this.actList=t.data})},goToDetail(t){this.$router.push(`/customer/task/sign?code=${t.taskCode}&id=${t.id}`)},openOrClose(t,e){t?this.switchAPI(t,e):this.$confirm("是否关闭签到活动?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.switchAPI(t,e)}).catch(()=>{this.getTaskList(),this.$message({type:"info",message:"已取消关闭"})})},switchAPI(t,e){this.$request.post("/sc/saotx/act/update",{id:e,status:t},!0,e=>{"200000"===e.ret?this.$message.success(t?"开启成功":"关闭成功"):this.$message.error(e.msg)})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-card",[a("div",{staticClass:"conf-act-list"},[a("ul",t._l(t.actList,function(e,l){return a("li",{key:l},[a("div",{staticClass:"img",style:{background:"url("+e.taskImg+") no-repeat center / 100% 100%"},on:{click:function(a){t.goToDetail(e)}}}),t._v(" "),a("div",{staticClass:"con"},[a("div",{staticClass:"text"},[a("div",{staticClass:"title"},[t._v(t._s(e.taskName))]),t._v(" "),a("div",{staticClass:"switch"},[a("el-switch",{attrs:{"active-value":1,"inactive-value":0},on:{change:function(a){t.openOrClose(e.status,e.id)}},model:{value:e.status,callback:function(a){t.$set(e,"status",a)},expression:"item.status"}})],1)]),t._v(" "),a("div",{staticClass:"desc"},[t._v(t._s(e.taskDetail))])])])}))]),t._v(" "),a("el-table",{staticClass:"mt20",staticStyle:{width:"100%"},attrs:{border:"",data:t.actTable}},[a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"任务名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"获得积分数",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"获得成长值",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"更新时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text"}},[t._v("查看明细")])]}}])})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(t){a("/HTG")},"data-v-392a44a4",null);e.default=n.exports},"8cTO":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("VU/8")(null,null,!1,null,null,null);e.default=l.exports},"99ZA":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("el-card",[e("div",{staticClass:"item"})])],1)},staticRenderFns:[]};var s=a("VU/8")(null,l,!1,function(t){a("A9iH")},"data-v-da51881e",null);e.default=s.exports},A9iH:function(t,e){},TiiC:function(t,e){},U4iu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={data:()=>({currentPage4:10,total:100,load:!0}),methods:{handleCurrentChange(){}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("el-card",[a("el-form",{attrs:{inline:""}},[a("el-form-item",{attrs:{label:"昵称："}},[a("el-input")],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号："}},[a("el-input-number",{attrs:{controls:!1}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户等级："}},[a("el-input")],1)],1),t._v(" "),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{plain:""}},[t._v("重置")])],1)],1),t._v(" "),a("el-button",{staticClass:"mt20 mb20",attrs:{plain:""}},[t._v("导出")]),t._v(" "),a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.load,expression:"load"}],attrs:{border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"头像",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"手机号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"性别",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"等级",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"积分",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"成长值",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"地区",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"注册时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"}})],1),t._v(" "),a("el-pagination",{staticClass:"mt20",attrs:{background:"","current-page":t.currentPage4,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(t){a("TiiC")},"data-v-f11b8bb0",null);e.default=n.exports}});
//# sourceMappingURL=11.bbbd252eb62a6ea4d870.js.map