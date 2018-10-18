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
import './assets/theme/theme-crm/index.css'
import ElementUI from 'element-ui';
//引入api配置文件
import request from "./api/axios";
import md5 from 'js-md5';
import VueCookies from 'vue-cookies'

// import Mock from './mock'
// Mock.bootstrap();
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$request = request;
Vue.prototype.$md5 = md5;
Vue.use(VueCookies)


Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  //登录规则
  if (to.path === '/login' || to.path === '/find'){
    sessionStorage.removeItem('access_token');
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('access_token')
  if (!tokenStr) return next('/login')
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export {router,store}
