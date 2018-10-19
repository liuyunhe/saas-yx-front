import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login.vue'
import Find from '../pages/Login/Find.vue'
// import TopMenu from '../components/TopMenu.vue'  //主体框架头部菜单
import Home from '../pages/Home.vue'
import KPI from '../pages/Datas/KPI/KPI.vue'
import NotFound from '../pages/404.vue'

// 产品-物料管理-实物礼品
import MaterielObject from '../pages/Product/Materiel/Object.vue'
// 产品-物料管理-虚拟礼品
import MaterielVirtual from '../pages/Product/Materiel/Virtual.vue'
// 产品-物料管理-红包礼品
import MaterielRedpack from '../pages/Product/Materiel/Redpack.vue'
// 产品-物料管理-积分礼品
import MaterielIntegral from '../pages/Product/Materiel/Integral.vue'
// 产品-物料管理-实物、虚拟、红包、积分表格展示公共页
import MaterielTable from '../pages/Product/Materiel/Table.vue'
import MaterielForm from '../pages/Product/Materiel/Form.vue'


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
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      // leaf:true,    //没有子级菜单的标识
      component: Home,
      redirect: '/datas',
      children: [
        // 数据
        { path: '/datas', name: '数据', redirect: '/datas/kpi' },
        { path: '/datas/kpi', name: 'kpi实时播报', component: KPI },
        { path: '/datas/multi', name: '多维查询', component: KPI },
        { path: '/datas/report', name: '固定报表', component: KPI },
        { path: '/datas/agree', name: '履约报表', component: KPI },
        { path: '/datas/visit', name: '回访报表', component: KPI },
        { path: '/datas/theme', name: '主题查询', redirect: '/datas/theme/kpiReview', },
        { path: '/datas/theme/kpiReview', name: 'KPI指标总览', component: KPI },
        { path: '/datas/theme/region', name: '地域查询', component: KPI },
        { path: '/datas/theme/spec', name: '规格查询', component: KPI },
        { path: '/datas/track', name: '活动追踪', redirect: '/datas/track/realtime' },
        { path: '/datas/track/realtime', name: '活动实时跟踪', component: KPI },
        { path: '/datas/track/dayanalysis', name: '活动日常分析', component: KPI },
        { path: '/datas/track/pathdetail', name: '页面路径转化信息', component: KPI },
        { path: '/datas/userAnalysis', name: '用户分析', redirect: '/datas/userAnalysis/analysis' },
        { path: '/datas/userAnalysis/analysis', name: '用户分析', component: KPI },
        { path: '/datas/userAnalysis/portraitu', name: '用户画像', component: KPI },
        { path: '/datas/userAnalysis/label', name: '用户标签', component: KPI },
        { path: '/datas/sellerDatas', name: '零售户', redirect: '/datas/sellerDatas/develop' },
        { path: '/datas/sellerDatas/develop', name: '发展情况概况', component: KPI },
        { path: '/datas/sellerDatas/search', name: '明细查询', component: KPI },
        { path: '/datas/operate', name: '运营小工具', redirect: '/datas/operate/steal' },
        { path: '/datas/operate/steal', name: '盗扫明细', component: KPI },
        { path: '/datas/fakeCode', name: '异常码明细', redirect: '/datas/fakeCode/report' },
        { path: '/datas/fakeCode/report', name: '假码举报', component: KPI },
        { path: '/datas/fakeCode/qrcodeActive', name: '二维码激活', component: KPI },
        // 微平台
        { path: '/weplat', name: '微平台', redirect: '/weplat/mgr' },
        { path: '/weplat/down', name: '扫码落地页', component: KPI },
        { path: '/weplat/style', name: '平台风格', component: KPI },
        { path: '/weplat/mgr', redirect: '/weplat/mgr/scanCheck' },
        { path: '/weplat/mgr/scanCheck', name: '验真首页', component: KPI },
        { path: '/weplat/mgr/actList', name: '活动中心', component: KPI },
        { path: '/weplat/mgr/mall', name: '积分商城', component: KPI },
        { path: '/weplat/mgr/personCenter', name: '个人中心', component: KPI },
        { path: '/weplat/mgr/menu', name: '菜单配置', component: KPI },
        // 产品
        {  path: '/product', name: '产品', redirect: '/product/mgr' },
        { path: '/product/supply', name: '供应商管理', component: KPI },
        { path: '/product/mgr', name: '产品管理', redirect: '/product/mgr/tobacco' },
        { path: '/product/mgr/tobacco', name: '卷烟管理', component: KPI },
        { path: '/product/mgr/liquor', name: '酒管理', component: KPI },
        { path: '/product/materiel', name: '物料管理', redirect: '/product/materiel/object' },
        { path: '/product/materiel/table', name: '物料礼品列表', component: MaterielTable, props: (route) => ({metraFlag:route.query.metraFlag})},
        { path: '/product/materiel/form', name: '物料表单管理', component: MaterielForm, props: (route) => ({metraFlag:route.query.metraFlag, id:route.query.id})},
        { path: '/product/materiel/object', name: '实物礼品', component: MaterielObject },
        { path: '/product/materiel/virtual', name: '虚拟礼品', component: MaterielVirtual },
        { path: '/product/materiel/redpack', name: '红包', component: MaterielRedpack },
        { path: '/product/materiel/integral', name: '积分', component: MaterielIntegral },
        // 营销
        { path: '/market', name: '营销', redirect: '/market/actTpl' },
        { path: '/market/actTpl', name: '活动模板', component: KPI },
        { path: '/market/actMgr', name: '活动管理', component: KPI },
        { path: '/orders', name: '订单', redirect: '/orders/act' },
        { path: '/orders/seller', name: '零售户订单', component: KPI },
        { path: '/orders/member', name: '权益订单', component: KPI },
        { path: '/orders/act', name: '活动订单', redirect: '/orders/act/object' },
        { path: '/orders/act/object', name: '实物领奖明细', component: KPI },
        { path: '/orders/act/virtual', name: '虚拟领奖明细', component: KPI },
        { path: '/orders/act/redpack', name: '红包领奖明细', component: KPI },
        { path: '/orders/act/integral', name: '积分领奖明细', component: KPI },
        { path: '/orders/mall', name: '商城订单', redirect: '/orders/mall/zj'},
        { path: '/orders/mall/zj', name: '自建商品订单', component: KPI },
        { path: '/orders/mall/jd', name: '京东商品订单', component: KPI },
        { path: '/orders/mall/integral', name: '积分活动订单', component: KPI },
        // 零售户
        { path: '/seller', name: '零售户', redirect: '/seller/review' },
        { path: '/seller/review', name: '审核管理', component: KPI },
        { path: '/seller/mgr', name: '零售户管理', component: KPI },
        { path: '/seller/tx', name: '提现审核', component: KPI },
        { path: '/seller/achievement', name: '零售户业绩', component: KPI },
        { path: '/seller/rebate', name: '返佣管理', redirect: '/seller/rebate/mgr' },
        { path: '/seller/rebate/mgr', name: '扫码返佣管理', component: KPI },
        // 商城
        { path: '/mall', name: '商城', redirect: '/mall/auth' },
        { path: '/mall/auth', name: '审核管理', component: KPI },
        { path: '/mall/category', name: '分类管理', component: KPI },
        { path: '/mall/recommend', name: '推荐位管理', component: KPI },
        { path: '/mall/banner', name: 'banner位管理', component: KPI },
        { path: '/mall/product', name: '商品管理', redirect: '/mall/product/zj' },
        { path: '/mall/product/zj', name: '自建商品管理', component: KPI },
        { path: '/mall/product/jd', name: '京东商品管理', component: KPI },
        // 设置
        { path: '/setting', name: '设置', redirect: '/setting/user'},
        { path: '/setting/user', name: '账户设置', component: KPI },
        { path: '/setting/logs', name: '日志管理', component: KPI },
        { path: '/setting/seller', name: '零售户管理', component: KPI },
        { path: '/setting/mall', name: '积分设置', component: KPI }
        // {
        //   path: 'datas',
        //   name: '数据',
        //   // component: Datas,
        //   redirect: '/datas/kpi',
        //   children: [
        //     { path: '/datas/kpi', name: 'kpi实时播报', component: KPI },
        //     { path: '/datas/multi', name: '多维查询', component: Multi },
        //     { path: '/datas/report', name: '固定报表', component: KPI },
        //     { path: '/datas/agree', name: '履约报表', component: KPI },
        //     { path: '/datas/visit', name: '回访报表', component: KPI },
        //     { 
        //       path: '/datas/theme',
        //       name: '主题查询',
        //       redirect: '/datas/theme/kpiReview',
        //       children: [
        //         { path: '/datas/theme/kpiReview', name: 'KPI指标总览', component: KPI },
        //         { path: '/datas/theme/region', name: '地域查询', component: KPI },
        //         { path: '/datas/theme/spec', name: '规格查询', component: KPI }
        //       ]
        //     },
        //     {
        //       path: '/datas/track',
        //       name: '活动追踪',
        //       redirect: '/datas/track/realtime',
        //       children: [
        //         { path: '/datas/track/realtime', name: '活动实时跟踪', component: KPI },
        //         { path: '/datas/track/dayanalysis', name: '活动日常分析', component: KPI },
        //         { path: '/datas/track/pathdetail', name: '页面路径转化信息', component: KPI }
        //       ]
        //     },
        //     {
        //       path: '/datas/userAnalysis',
        //       name: '用户分析',
        //       redirect: '/datas/userAnalysis/analysis',
        //       children: [
        //         { path: '/datas/userAnalysis/analysis', name: '用户分析', component: KPI },
        //         { path: '/datas/userAnalysis/portraitu', name: '用户画像', component: KPI },
        //         { path: '/datas/userAnalysis/label', name: '用户标签', component: KPI }
        //       ]
        //     },
        //     {
        //       path: '/datas/sellerDatas',
        //       name: '零售户',
        //       redirect: '/datas/sellerDatas/develop',
        //       redirect: [
        //         { path: '/datas/sellerDatas/develop', name: '发展情况概况', component: KPI },
        //         { path: '/datas/sellerDatas/search', name: '明细查询', component: KPI },
        //       ]
        //     },
        //     {
        //       path: '/datas/operate',
        //       name: '运营小工具',
        //       redirect: '/datas/operate/steal',
        //       children: [{ path: '/datas/operate/steal', name: '盗扫明细', component: KPI }]
        //     },
        //     {
        //       path: '/datas/fakeCode',
        //       name: '异常码明细',
        //       redirect: '/datas/fakeCode/report',
        //       children: [
        //         { path: '/datas/fakeCode/report', name: '假码举报', component: KPI },
        //         { path: '/datas/fakeCode/qrcodeActive', name: '二维码激活', component: KPI }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/weplat',
        //   name: '微平台',
        //   redirect: '/weplat/mgr',
        //   children: [
        //     { path: '/weplat/down', name: '扫码落地页', component: KPI },
        //     { path: '/weplat/style', name: '平台风格', component: KPI },
        //     {
        //       path: '/weplat/mgr',
        //       redirect: '/weplat/mgr/scanCheck',
        //       children: [
        //         { path: '/weplat/mgr/scanCheck', name: '验真首页', component: KPI },
        //         { path: '/weplat/mgr/actList', name: '活动中心', component: KPI },
        //         { path: '/weplat/mgr/mall', name: '积分商城', component: KPI },
        //         { path: '/weplat/mgr/personCenter', name: '个人中心', component: KPI },
        //         { path: '/weplat/mgr/menu', name: '菜单配置', component: KPI }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/product',
        //   name: '产品',
        //   redirect: '/product/mgr',
        //   children: [
        //     { path: '/product/supply', name: '供应商管理', component: KPI },
        //     {
        //       path: '/product/mgr',
        //       name: '产品管理',
        //       redirect: '/product/mgr/tobacco',
        //       children: [
        //         { path: '/product/mgr/tobacco', name: '卷烟管理', component: KPI },
        //         { path: '/product/mgr/liquor', name: '酒管理', component: KPI }
        //       ]
        //     },
        //     {
        //       path: '/product/materiel',
        //       name: '物料管理',
        //       redirect: '/product/materiel/object',
        //       children: [
        //         { path: '/product/materiel/object', name: '实物礼品', component: KPI },
        //         { path: '/product/materiel/virtual', name: '虚拟礼品', component: KPI },
        //         { path: '/product/materiel/redpack', name: '红包', component: KPI },
        //         { path: '/product/materiel/integral', name: '积分', component: KPI }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/market',
        //   name: '营销',
        //   redirect: '/market/actTpl',
        //   children: [
        //     { path: '/market/actTpl', name: '活动模板', component: KPI },
        //     { path: '/market/actMgr', name: '活动管理', component: KPI }
        //   ]
        // },
        // {
        //   path: '/orders',
        //   name: '订单',
        //   redirect: '/orders/act',
        //   children: [
        //     { path: '/orders/seller', name: '零售户订单', component: KPI },
        //     { path: '/orders/member', name: '权益订单', component: KPI },
        //     { 
        //       path: '/orders/act',
        //       name: '活动订单',
        //       redirect: '/orders/act/object',
        //       children: [
        //         { path: '/orders/act/object', name: '实物领奖明细', component: KPI },
        //         { path: '/orders/act/virtual', name: '虚拟领奖明细', component: KPI },
        //         { path: '/orders/act/redpack', name: '红包领奖明细', component: KPI },
        //         { path: '/orders/act/integral', name: '积分领奖明细', component: KPI }
        //       ]
        //     },
        //     {
        //       path: '/orders/mall',
        //       name: '商城订单',
        //       redirect: '/orders/mall/zj',
        //       children: [
        //         { path: '/orders/mall/zj', name: '自建商品订单', component: KPI },
        //         { path: '/orders/mall/jd', name: '京东商品订单', component: KPI },
        //         { path: '/orders/mall/integral', name: '积分活动订单', component: KPI }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/seller',
        //   name: '零售户',
        //   redirect: '/seller/review',
        //   children: [
        //     { path: '/seller/review', name: '审核管理', component: KPI },
        //     { path: '/seller/mgr', name: '零售户管理', component: KPI },
        //     { path: '/seller/tx', name: '提现审核', component: KPI },
        //     { path: '/seller/achievement', name: '零售户业绩', component: KPI },
        //     {
        //       path: '/seller/rebate',
        //       name: '返佣管理',
        //       redirect: '/seller/rebate/mgr',
        //       children: [{ path: '/seller/rebate/mgr', name: '扫码返佣管理', component: KPI }]
        //     }
        //   ]
        // },
        // {
        //   path: '/mall',
        //   name: '商城',
        //   redirect: '/mall/auth',
        //   children: [
        //     { path: '/mall/auth', name: '审核管理', component: KPI },
        //     { path: '/mall/category', name: '分类管理', component: KPI },
        //     { path: '/mall/recommend', name: '推荐位管理', component: KPI },
        //     { path: '/mall/banner', name: 'banner位管理', component: KPI },
        //     {
        //       path: '/mall/product',
        //       name: '商品管理',
        //       redirect: '/mall/product/zj',
        //       children: [
        //         { path: '/mall/product/zj', name: '自建商品管理', component: KPI },
        //         { path: '/mall/product/jd', name: '京东商品管理', component: KPI }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: '/setting',
        //   name: '设置',
        //   redirect: '/setting/user',
        //   children: [
        //     { path: '/setting/user', name: '账户设置', component: KPI },
        //     { path: '/setting/logs', name: '日志管理', component: KPI },
        //     { path: '/setting/seller', name: '零售户管理', component: KPI },
        //     { path: '/setting/mall', name: '积分设置', component: KPI }
        //   ]
        // }
      ]
    },
    // {
    //   path: '/datas',
    //   name: '数据',
    //   // component: DataTransfer,
    //   redirect: '/datas/kpi',
    //   children: [
    //     { path: '/datas/kpi', name: 'kpi', component: KPI }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: '投放管理',
    //   component: TopMenu,
    //   children:[
    //     {
    //       path: '/LandingPageSetting',
    //       name: '落地页设置',
    //       component: LandingPageSetting,
    //     },
    //     {
    //       path: '/SelectLandingPageTemplate',
    //       name: '从模板中创建',
    //       // hidden:true,
    //       component: SelectLandingPageTemplate,
    //     },

    //   ]
    // },
    // {
    //   path: '/',
    //   name: '数据分析',
    //   component: TopMenu,
    //   children:[

    //   ]
    // },
    // {
    //   path: '/',
    //   name: '客户管理',
    //   component: TopMenu,
    //   children:[

    //   ]
    // },
    // {
    //   path: '/',
    //   name: '项目管理',
    //   component: TopMenu,
    //   children:[

    //   ]
    // },
    // {
    //   path: '/',
    //   name: '运营助手',
    //   component: TopMenu,
    //   children:[

    //   ]
    // },
    // {
    //   path: '/',
    //   name: '系统管理',
    //   component: TopMenu,
    //   children:[

    //   ]
    // },
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
