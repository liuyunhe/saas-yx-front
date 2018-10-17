import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login.vue'
import Find from '../pages/Login/Find.vue'
import Home from '../pages/Home/Home.vue'
import KPI from '../pages/Home/KPI/KPI.vue'
import NotFound from '../pages/404.vue'



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
