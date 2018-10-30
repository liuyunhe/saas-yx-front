import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login.vue'
import Find from '@/pages/Login/Find.vue'
// import TopMenu from '@/components/TopMenu.vue'  //主体框架头部菜单
import Home from '@/pages/Home.vue'
import KPI from '@/pages/Datas/KPI/KPI.vue'
//活动订单管理
import ObjectPage from '@/pages/Orders/ACT/ObjectPage.vue'
import ObjectPageDetail from  '@/pages/Orders/ACT/ObjectPageDetail.vue'
import VirtualPage from '@/pages/Orders/ACT/VirtualPage.vue'
import RedpackPage from '@/pages/Orders/ACT/RedpackPage.vue'
import IntegralPage from '@/pages/Orders/ACT/IntegralPage.vue'
//商城订单管理
import ZjOrderPage from '@/pages/Orders/mall/ZjOrderPage.vue'
import ZjOrderPageDetail from '@/pages/Orders/mall/ZjOrderPageDetail.vue'
import JdOrderPage from '@/pages/Orders/mall/JdOrderPage.vue'
//积分活动订单管理
import ScoreOrderPage from '@/pages/Orders/mall/ScoreOrderPage.vue'
//import Multi from '@/pages/Datas/Multi/Multi.vue'
import NotFound from '@/pages/404.vue'
// 营销
// const ActTpl = () => import(/* webpackChunkName: "login_home" */ '@/pages/Market/ActTpl/ActTpl')
// const ActMgc = () => import(/* webpackChunkName: "login_home" */ '@/pages/Market/ActMgr/ActMgr')
// const AddAct = () => import(/* webpackChunkName: "login_home" */ '@/pages/Market/ActTpl/AddAct')
// const ActSetConf = () => import(/* webpackChunkName: "login_home" */ '@/pages/Market/ActMgr/ActSetConf')
// const ActPutConf = () => import(/* webpackChunkName: "login_home" */ '@/pages/Market/ActMgr/ActPutConf')
import ActTpl from '@/pages/Market/ActTpl/ActTpl.vue'
import ActMgc from '@/pages/Market/ActMgr/ActMgr.vue'
import AddAct from '@/pages/Market/ActTpl/AddAct.vue'
import ActSetConf from '@/pages/Market/ActMgr/ActSetConf.vue'
import ActPutConf from '@/pages/Market/ActMgr/ActPutConf.vue'

// 数据-零售户-发展情况概况
import DataSellerOverview from '@/pages/Datas/SellerData/Overview.vue'
// 数据-零售户-明细查询
import DataSellerDetail from '@/pages/Datas/SellerData/DetailSearch.vue'
// 数据-履约报表
import DataAgree from '@/pages/Datas/Agree.vue'
// 数据-回访报表
import DataVisit from '@/pages/Datas/Visit.vue'

//产品-产品管理-烟草管理
import tobacco from '@/pages/Product/ProductManagement/TobaccoMgr'
import addTobaccoMr from '@/pages/Product/ProductManagement/AddTobaccoMgr'
import editTobaccoMr from '@/pages/Product/ProductManagement/EditTobaccoMgr'
//产品-供应商管理
import supply from '@/pages/Product/SupplyManagement/Supply'
import addSupplier from '@/pages/Product/SupplyManagement/AddSupplier'
import editSupplier from '@/pages/Product/SupplyManagement/EditSupplier'
// 产品-物料管理-实物礼品
import MaterielObject from '@/pages/Product/Materiel/Object.vue'
// 产品-物料管理-虚拟礼品
import MaterielVirtual from '@/pages/Product/Materiel/Virtual.vue'
// 产品-物料管理-红包礼品
import MaterielRedpack from '@/pages/Product/Materiel/Redpack.vue'
// 产品-物料管理-积分礼品
import MaterielIntegral from '@/pages/Product/Materiel/Integral.vue'
// 产品-物料管理-实物、虚拟、红包、积分表格展示公共页
import MaterielTable from '@/pages/Product/Materiel/Table.vue'
import MaterielForm from '@/pages/Product/Materiel/Form.vue'

// 设置-日志管理
import SettingLogs from '@/pages/Setting/Logs.vue'
// 设置-账号管理-修改密码
import ModPwd from '@/pages/Setting/User/ModPwd.vue'
// 设置-账号管理-成员管理
import SettingAccount from '@/pages/Setting/User/Account.vue'
// 设置-账号管理-角色管理
import SettingRole from '@/pages/Setting/User/Role.vue'
//菜单配置
import MenuConf from '@/pages/Wplat/MenuConf/MenuConf.vue'
//扫码落地页配置
import ScanConf from '@/pages/Wplat/ScanConf/ScanConf.vue'
//平台风格配置
import StyleConf from '@/pages/Wplat/StyleConf/StyleConf.vue'
//微平台管理的四个子菜单
import wplatHome from '@/pages/Wplat/WplatConf/WplatHome.vue'
import Activities from '@/pages/Wplat/WplatConf/Activities.vue'
import Shop from '@/pages/Wplat/WplatConf/Shop.vue'
import Person from '@/pages/Wplat/WplatConf/Person.vue'
//首页主题查询中的地域查询
import RegionSearch from '@/pages/Datas/ThemeSearch/RegionSearch.vue'
//首页主题查询中的规格查询
import SpecSearch from '@/pages/Datas/ThemeSearch/SpecSearch.vue'
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
//    redirect: '/datas',
      children: [
        // 数据
        { path: '/datas', name: '数据', redirect: '/datas/kpi' },
        { path: '/datas/kpi', name: 'kpi实时播报', component: KPI },
        { path: '/datas/multi', name: '多维查询', component: KPI },
        { path: '/datas/report', name: '固定报表', component: KPI },
        { path: '/datas/agree', name: '履约报表', component: DataAgree },
        { path: '/datas/visit', name: '回访报表', component: DataVisit },
        { path: '/datas/theme', name: '主题查询', redirect: '/datas/theme/kpiReview', },
        { path: '/datas/theme/kpiReview', name: 'KPI指标总览', component: KPI },
        { path: '/datas/theme/region', name: '地域查询', component: RegionSearch },
        { path: '/datas/theme/spec', name: '规格查询', component: SpecSearch },
        { path: '/datas/track', name: '活动追踪', redirect: '/datas/track/realtime' },
        { path: '/datas/track/realtime', name: '活动实时跟踪', component: KPI },
        { path: '/datas/track/dayanalysis', name: '活动日常分析', component: KPI },
        { path: '/datas/track/pathdetail', name: '页面路径转化信息', component: KPI },
        { path: '/datas/userAnalysis', name: '用户分析', redirect: '/datas/userAnalysis/analysis' },
        { path: '/datas/userAnalysis/analysis', name: '用户分析', component: KPI },
        { path: '/datas/userAnalysis/portraitu', name: '用户画像', component: KPI },
        { path: '/datas/userAnalysis/label', name: '用户标签', component: KPI },
        { path: '/datas/sellerDatas', name: '零售户', redirect: '/datas/sellerDatas/develop' },
        { path: '/datas/sellerDatas/develop', name: '发展情况概况', component: DataSellerOverview },
        { path: '/datas/sellerDatas/search', name: '明细查询', component: DataSellerDetail },
        { path: '/datas/operate', name: '运营小工具', redirect: '/datas/operate/steal' },
        { path: '/datas/operate/steal', name: '盗扫明细', component: KPI },
        { path: '/datas/fakeCode', name: '异常码明细', redirect: '/datas/fakeCode/report' },
        { path: '/datas/fakeCode/report', name: '假码举报', component: KPI },
        { path: '/datas/fakeCode/qrcodeActive', name: '二维码激活', component: KPI },
        // 微平台
        { path: '/weplat', name: '微平台', redirect: '/weplat/mgr' },
        { path: '/weplat/down', name: '扫码落地页', component: ScanConf },
        { path: '/weplat/style', name: '平台风格', component: StyleConf },
        { path: '/weplat/mgr', redirect: '/weplat/mgr/scanCheck' },
        { path: '/weplat/mgr/scanCheck', name: '验真首页', component: wplatHome },
        { path: '/weplat/mgr/actList', name: '活动中心', component: Activities },
        { path: '/weplat/mgr/mall', name: '积分商城', component: Shop },
        { path: '/weplat/mgr/personCenter', name: '个人中心', component: Person },
        { path: '/weplat/menu', name: '菜单配置', component: MenuConf },
        // 产品
        {  path: '/product', name: '产品', redirect: '/product/mgr' },
        { path: '/product/supply', name: '供应商管理', component: supply },
        { path: '/product/addSupplier', name: '供应商管理', component: addSupplier },
        { path: '/product/editSupplier', name: '供应商管理', component: editSupplier,props: (route) => ({id:route.query.id}) },
        { path: '/product/mgr', name: '产品管理', redirect: '/product/mgr/tobacco' },
        { path: '/product/mgr/tobacco', name: '卷烟管理', component: tobacco },
        { path: '/product/mgr/addTobaccoMr', name: '新建卷烟', component: addTobaccoMr },
        { path: '/product/mgr/editTobaccoMr', name: '编辑卷烟', component: editTobaccoMr,props: (route) => ({id:route.query.id}) },
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
        { path: '/market/actTpl', name: '活动模板', component: ActTpl },
        { path: '/market/actMgr', name: '活动管理', component: ActMgc },
        { path: '/market/actTpl/addAct', name: '新建活动模板配置', component: AddAct, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/actSetConf', name: '基础设置', component: ActSetConf, props: (router) => ({form: router.query.form, tplCode: router.query.tplCode}) },
        { path: '/market/actTpl/actPutConf', name: '投放设置', component: ActPutConf, props: (router) => ({id: router.query.form, actCode: router.query.actCode}) },
        { path: '/orders', name: '订单', redirect: '/orders/act' },
        { path: '/orders/seller', name: '零售户订单', component: KPI },
        { path: '/orders/member', name: '权益订单', component: KPI },
        { path: '/orders/act', name: '活动订单', redirect: '/orders/act/object' },
        { path: '/Orders/ACT/object', name: '实物领奖明细', component: ObjectPage },
        { path: '/Orders/ACT/objectDetail', name: '实物领奖订单详细', component: ObjectPageDetail,props: (route) => ({orderId:route.query.orderId})  },
        { path: '/Orders/ACT/virtual', name: '虚拟领奖明细', component: VirtualPage },
        { path: '/Orders/ACT/redpack', name: '红包领奖明细', component: RedpackPage },
        { path: '/Orders/ACT/integral', name: '积分领奖明细', component: IntegralPage },
        { path: '/Orders/mall', name: '商城订单', redirect: '/Orders/mall/zj'},
        { path: '/Orders/mall/zj', name: '自建商品订单', component: ZjOrderPage },
        { path: '/Orders/mall/zjOrderPageDetail', name: '自建商品订单详情',  component: ZjOrderPageDetail,props: (route) => ({orderCode:route.query.orderCode})  },
        { path: '/Orders/mall/jd', name: '京东商品订单', component: JdOrderPage },
        { path: '/Orders/mall/integral', name: '积分活动订单', component: ScoreOrderPage },
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
        { path: '/mall/auth', name: '审核管理', component: auditManage },
        { path: '/mall/systemLayout', name: '系统配置', component: systemLayout },
        { path: '/mall/category', name: '分类管理', component: sortManage },
        { path: '/mall/recommend', name: '推荐位管理', component: recommendManage },
        { path: '/mall/addCommendTpmA', name: '新增推荐位模板A', component: addCommendTpmA },
        { path: '/mall/addCommendTpmB', name: '新增推荐位模板B', component: addCommendTpmB },
        { path: '/mall/addCommendTpmC', name: '新增推荐位模板C', component: addCommendTpmC },
        { path: '/mall/editCommendTpmA', name: '编辑推荐位模板A', component: editCommendTpmA,props: (route) => ({id:route.query.id})},
        { path: '/mall/editCommendTpmB', name: '编辑推荐位模板B', component: editCommendTpmB,props: (route) => ({id:route.query.id})},
        { path: '/mall/editCommendTpmC', name: '编辑推荐位模板C', component: editCommendTpmC,props: (route) => ({id:route.query.id})},
        { path: '/mall/banner', name: 'banner位管理', component: bannerManage},
        { path: '/mall/banner/addBanner', name: '新增banner', component: addBanner},
        { path: '/mall/banner/editBanner', name: '编辑banner', component: editBanner,props: (route) => ({id:route.query.id})},
        { path: '/mall/product', name: '商品管理', redirect: '/mall/product/zj' },
        { path: '/mall/product/zj', name: '自建商品管理', component: buildProduct},
        { path: '/mall/product/addProduct', name: '新建自建商品', component: addProduct},
        { path: '/mall/product/editProduct', name: '编辑自建商品', component: editProduct,props: (route) => ({id:route.query.id})},
        { path: '/mall/product/jd', name: '京东商品管理', component: JDProduct },
        { path: '/mall/product/addJDProduct', name: '新建京东商品', component: addJDProduct },
        { path: '/mall/product/editJDProduct', name: '编辑京东商品', component: editJDProduct,props: (route) => ({id:route.query.id})},
        // 设置
        { path: '/setting', name: '设置', redirect: '/setting/user'},
        { path: '/setting/user', name: '账户设置', redirect: '/setting/user/modPwd' },
        { path: '/setting/user/modPwd', name: '密码修改', component: ModPwd },
        { path: '/setting/user/account', name: '成员管理', component: SettingAccount },
        { path: '/setting/user/role', name: '角色管理', component: SettingRole },
        { path: '/setting/logs', name: '日志管理', component: SettingLogs },
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
        //   path: '/Orders',
        //   name: '订单',
        //   redirect: '/Orders/ACT',
        //   children: [
        //     { path: '/orders/seller', name: '零售户订单', component: KPI },
        //     { path: '/orders/member', name: '权益订单', component: KPI },
        //     {
        //       path: '/orders/act',
        //       name: '活动订单',
        //       redirect: '/Orders/ACT/object',
        //       children: [
        //         { path: '/Orders/ACT/object', name: '实物领奖明细', component: KPI },
        //         { path: '/Orders/ACT/virtual', name: '虚拟领奖明细', component: KPI },
        //         { path: '/Orders/ACT/redpack', name: '红包领奖明细', component: KPI },
        //         { path: '/Orders/ACT/integral', name: '积分领奖明细', component: KPI }
        //       ]
        //     },
        //     {
        //       path: '/Orders/mall',
        //       name: '商城订单',
        //       redirect: '/Orders/mall/zj',
        //       children: [
        //         { path: '/Orders/mall/zj', name: '自建商品订单', component: KPI },
        //         { path: '/Orders/mall/jd', name: '京东商品订单', component: KPI },
        //         { path: '/Orders/mall/integral', name: '积分活动订单', component: KPI }
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

// 商城-审核管理
import auditManage from '../pages/Mall/AuditManage/AuditManage'
// 商城-系统设置
import systemLayout from '../pages/Mall/SystemLayout/SystemLayout'
// 商城-商品管理-自建商品管理
import buildProduct from '../pages/Mall/CommodityManage/BuildProduct/BuildProduct'
import addProduct from  '../pages/Mall/CommodityManage/BuildProduct/AddProduct'
import editProduct from  '../pages/Mall/CommodityManage/BuildProduct/EditProduct'
// 商城-商品管理-京东商品管理
import JDProduct from '../pages/Mall/CommodityManage/JDProduct/JDProduct'
import addJDProduct from '../pages/Mall/CommodityManage/JDProduct/AddJDProduct'
import editJDProduct from '../pages/Mall/CommodityManage/JDProduct/EditJDProduct'
// 商城-banner位管理
import bannerManage from '../pages/Mall/BannerManage/BannerManage'
import addBanner from '../pages/Mall/BannerManage/AddBanner'
import editBanner from '../pages/Mall/BannerManage/EditBanner'
// 商城-分类管理
import sortManage from '../pages/Mall/SortManage/SortManage'
// 商城-推荐位管理
import recommendManage from '../pages/Mall/RecommendManage/RecommendManage'
// 商城-推荐位管理-新增推荐位A
import addCommendTpmA from '../pages/Mall/RecommendManage/Template/AddCommendTpmA'
// 商城-推荐位管理-编辑推荐位A
import editCommendTpmA from '../pages/Mall/RecommendManage/Template/EditCommendTpmA'
// 商城-推荐位管理-新增推荐位B
import addCommendTpmB from '../pages/Mall/RecommendManage/Template/AddCommendTpmB'
// 商城-推荐位管理-编辑推荐位B
import editCommendTpmB from '../pages/Mall/RecommendManage/Template/EditCommendTpmB'
// 商城-推荐位管理-新增推荐位C
import addCommendTpmC from '../pages/Mall/RecommendManage/Template/AddCommendTpmC'
// 商城-推荐位管理-编辑推荐位C
import editCommendTpmC from '../pages/Mall/RecommendManage/Template/EditCommendTpmC'

