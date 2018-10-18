import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login.vue'
import Find from '../pages/Login/Find.vue'
import Home from '../pages/Home/Home.vue'
import KPI from '../pages/Home/KPI/KPI.vue'
import NotFound from '../pages/404.vue'

//产品-产品管理-烟草管理
import tobacco from '../pages/Product/ProductManagement/tobaccoMgr'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      leaf:true,
      component: Login
    },
    {
        path: '/find',
        name: 'Find',
        leaf:true,
        component: Find
    },
    {
      path: '/',
      name: 'Home',
      leaf: true,
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: '首页',
      leaf:true,    //没有子级菜单的标识
      component: Home,
      redirect: { path: '/kpi'},
      children:[
        {
          path:'/kpi',
          name:'kpi实时播报',
          component: KPI,
        }
      ]
    },
    {
      path: '/product',
      name: '产品',
      leaf:true,    //没有子级菜单的标识
      component: Home,
      redirect: { path: '/product/mgr/tobacco'},
      children:[
        {
          path:'/product/mgr/tobacco',
          name:'烟草管理',
          component: tobacco,
        }
      ]
    },
    {
      path:'/404',
      name:'404',
      leaf:true,
      component:NotFound
    },
    {
      path: '*',
      leaf: true,
      redirect: { path: '/404' }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
