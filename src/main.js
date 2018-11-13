// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//兼容ie
import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入ElementUI
// import './assets/theme/theme-crm/index.css'
// import ElementUI from 'element-ui'
//引入api配置文件
import request from "./api/axios"
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'
// import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import "./common/js/dateFormat" //  时间类型格式化组件
import echarts from 'echarts'

import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Tooltip,
  TimeSelect,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Card,
  Steps,
  Step,
  Cascader,
  Container,
  Header,
  Aside,
  Main,
  Popover,
  Loading,
  MessageBox,
  Message,
  ColorPicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DatePicker,
  InputNumber,
  OptionGroup,
  Radio,
  TimePicker
} from 'element-ui'



// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器相关的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import Mock from './mock'
// Mock.bootstrap();
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$request = request;
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;
Vue.use(VueCookies)

Vue.use(VueQuillEditor)

Vue.use(VueCookies)

Vue.use(Pagination)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(OptionGroup)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(ColorPicker)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Cascader)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Loading.directive)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
// 全局设置 拥有size属性的尺寸均为 small
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000, align: 'center' }
// Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  //登录规则
  if (to.path === '/login' || to.path === '/find') {
    console.log('进来了')
    sessionStorage.removeItem('access_token');
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('access_token')
  if (!tokenStr) return next('/login')
  // console.log(to)
  // console.log(from)
  // if(!from.path){
  //   return next('/datas/kpi')
  // }
  const menu = JSON.parse(sessionStorage.getItem('menu'))
  if (JSON.stringify(menu).indexOf(to.path) !== -1) {
    next()
  } else {
    if(JSON.stringify(menu).indexOf(from.path) !==-1 && to.path.indexOf(from.path) !== -1 ){
      next()
    }else{
        next()
      // next('/datas/kpi')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

export {
  router,
  store
}
