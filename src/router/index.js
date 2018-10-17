import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login.vue'
import Find from '../pages/Login/Find.vue'
import TopMenu from '../components/TopMenu.vue'  //主体框架头部菜单
import Home from '../pages/Home/Home.vue'
import KPI from '../pages/Home/KPI/KPI.vue'
import NotFound from '../pages/404.vue'

//投放管理
import LandingPageSetting from '../pages/tfgl/LandingPageSetting.vue'
import SelectLandingPageTemplate from '../pages/tfgl/SelectLandingPageTemplate.vue'

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
      name: '首页',
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
      path: '/',
      name: '投放管理',
      component: TopMenu,
      children:[
        {
          path: '/LandingPageSetting',
          name: '落地页设置',
          component: LandingPageSetting,
        },
        {
          path: '/SelectLandingPageTemplate',
          name: '从模板中创建',
          // hidden:true,
          component: SelectLandingPageTemplate,
        },

      ]
    },
    {
      path: '/',
      name: '数据分析',
      component: TopMenu,
      children:[

      ]
    },
    {
      path: '/',
      name: '客户管理',
      component: TopMenu,
      children:[

      ]
    },
    {
      path: '/',
      name: '项目管理',
      component: TopMenu,
      children:[

      ]
    },
    {
      path: '/',
      name: '运营助手',
      component: TopMenu,
      children:[

      ]
    },
    {
      path: '/',
      name: '系统管理',
      component: TopMenu,
      children:[

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
