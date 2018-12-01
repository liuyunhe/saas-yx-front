import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login/Login.vue'
import Find from '@/pages/Login/Find.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'

//活动订单管理
const ObjectPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/ACT/ObjectPage.vue')
const ObjectPageDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/ACT/ObjectPageDetail.vue')
const VirtualPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/ACT/VirtualPage.vue')
const RedpackPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/ACT/RedpackPage.vue')
const IntegralPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/ACT/IntegralPage.vue')
//商城订单管理
const ZjOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ZjOrderPage.vue')
const ZjOrderPageDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ZjOrderPageDetail.vue')
const JdOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/JdOrderPage.vue')
//积分活动订单管理
const ScoreOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ScoreOrderPage.vue')

//河北固定报表管理
const HbReportPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/ReportPage.vue')
const ScanWeekPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/hebei/ScanWeekPage.vue')
const ScanMonthPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/hebei/ScanMonthPage.vue')
const RedPacketWeekPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/hebei/RedPacketWeekPage.vue')
const RedPacketMonthPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/hebei/RedPacketMonthPage.vue')
const CountyWeekPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/hebei/CountyWeekPage.vue')
const CountyMonthPage = () => import(/* webpackChunkName: "hebeiReport" */ '@/pages/Report/hebei/CountyMonthPage.vue')
//河南固定报表管理
const KpiProDayPage = () => import(/* webpackChunkName: "henanReport" */ '@/pages/Report/henan/KpiProDayPage.vue')
const ActDrawDayPage = () => import(/* webpackChunkName: "henanReport" */ '@/pages/Report/henan/ActDrawDayPage.vue')
const CashRedPackDayPage = () => import(/* webpackChunkName: "henanReport" */ '@/pages/Report/henan/CashRedPackDayPage.vue')
const RealDrawDayPage = () => import(/* webpackChunkName: "henanReport" */ '@/pages/Report/henan/RealDrawDayPage.vue')
const IntegralOperDayPage = () => import(/* webpackChunkName: "henanReport" */ '@/pages/Report/henan/IntegralOperDayPage.vue')
const IntegralExchDayPage = () => import(/* webpackChunkName: "henanReport" */ '@/pages/Report/henan/IntegralExchDayPage.vue')

// 营销
const ActTpl = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/ActTpl')
const ActMgc = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/ActMgr')
const AddAct = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddAct')
const Fanpaizi = () => import(/*webpackChunkName: '"fanpaizi" */'@/pages/Market/ActTpl/Fanpaizi.ActTpl')
const Jiugongge = () => import(/*webpackChunkName: '"jiugongge" */'@/pages/Market/ActTpl/Jiugongge.ActTpl')
const AddActEgg = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddActEgg')
const AddWingAct = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddWingAct')
const AddActSudoku = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddActSudoku')
const ActSetConf = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/ActSetConf')
const ActPutConf = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/ActPutConf')

// 数据-零售户-发展情况概况
const DataSellerOverview = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/SellerData/Overview.vue')
// 数据-零售户-明细查询
const DataSellerDetail = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/SellerData/DetailSearch.vue')
// 数据-履约报表
const DataAgree = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/Agree.vue')
// 数据-回访报表
const DataVisit = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/Visit.vue')
// 数据-运营小工具-盗扫明细
const DataOperateSteal = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/Operate/Steal.vue')
// 数据-异常码管理-假码举报
const DataFakeCodeReport = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/FakeCode/Report.vue')
// 数据-异常码管理-二维码激活
const DataQrcodeActive = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/FakeCode/QrcodeActive.vue')
// 数据-主题查询-KPI指标总览
const DataThemeReview = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/ThemeSearch/Review.vue')
//首页主题查询中的地域查询
const RegionSearch = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/ThemeSearch/RegionSearch.vue')
//首页主题查询中的规格查询
const SpecSearch = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/ThemeSearch/SpecSearch.vue')
const MultiSearch = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/MultiSearch/MultiSearch.vue')
const KPI = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/KPI/KPI.vue')
//用户分析---画像
const UserPortrait = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/UserAnalysis/UserPortrait.vue')
//用户分析-用户群体分析
const AnalysisPage = () => import(/* webpackChunkName: "datas" */ '@/pages/Datas/UserAnalysis/AnalysisPage.vue')


//产品-产品管理-烟草管理
const tobacco = () => import(/* webpackChunkName: "product" */ '@/pages/Product/ProductManagement/TobaccoMgr')
const addTobaccoMr = () => import(/* webpackChunkName: "product" */ '@/pages/Product/ProductManagement/AddTobaccoMgr')
const editTobaccoMr = () => import(/* webpackChunkName: "product" */ '@/pages/Product/ProductManagement/EditTobaccoMgr')
//产品-供应商管理
const supply = () => import(/* webpackChunkName: "product" */ '@/pages/Product/SupplyManagement/Supply')
const addSupplier = () => import(/* webpackChunkName: "product" */ '@/pages/Product/SupplyManagement/AddSupplier')
const editSupplier = () => import(/* webpackChunkName: "product" */ '@/pages/Product/SupplyManagement/EditSupplier')
// 产品-物料管理-实物礼品
const MaterielObject = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Materiel/Object.vue')
// 产品-物料管理-虚拟礼品
const MaterielVirtual = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Materiel/Virtual.vue')
// 产品-物料管理-红包礼品
const MaterielRedpack = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Materiel/Redpack.vue')
// 产品-物料管理-积分礼品
const MaterielIntegral = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Materiel/Integral.vue')
// 产品-品牌管理
const prodBrand = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Brand.vue')


// 设置-日志管理
const SettingLogs = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Logs.vue')
// 设置-账号管理-修改密码
const ModPwd = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/User/ModPwd.vue')
// 设置-账号管理-成员管理
const SettingAccount = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/User/Account.vue')
// 设置-账号管理-角色管理
const SettingRole = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/User/Role.vue')
// 设置-账号管理-零售户管理
const SettingSeller = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Seller.vue')

//菜单配置
const MenuConf = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/MenuConf/MenuConf.vue')
//扫码落地页配置
const ScanConf = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/ScanConf/ScanConf.vue')
//平台风格配置
const StyleConf = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/StyleConf/StyleConf.vue')
//微平台管理的四个子菜单
const wplatHome = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/WplatHome.vue')
const Activities = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/Activities.vue')
const Shop = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/Shop.vue')
const Person = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/Person.vue')

// 商城-审核管理
const auditManage = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/AuditManage/AuditManage')
// 商城-系统设置
const systemLayout = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/SystemLayout/SystemLayout')
// 商城-商品管理-自建商品管理
const buildProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/BuildProduct/BuildProduct')
const addProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/BuildProduct/AddProduct')
const editProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/BuildProduct/EditProduct')
// 商城-商品管理-京东商品管理
const JDProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/JDProduct/JDProduct')
const addJDProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/JDProduct/AddJDProduct')
const editJDProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/JDProduct/EditJDProduct')
// 商城-商品管理-活动物料管理
const ActProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/ActProduct/ActProduct')
const AddActProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/ActProduct/AddActProduct')
const EditActProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/ActProduct/EditActProduct')
// 商城-banner位管理
const bannerManage = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/BannerManage/BannerManage')
const addBanner = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/BannerManage/AddBanner')
const editBanner = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/BannerManage/EditBanner')
// 商城-分类管理
const sortManage = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/SortManage/SortManage')
// 商城-推荐位管理
const recommendManage = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/RecommendManage')
// 商城-推荐位管理-新增推荐位A
const addCommendTpmA = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/AddCommendTpmA')
// 商城-推荐位管理-编辑推荐位A
const editCommendTpmA = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/EditCommendTpmA')
// 商城-推荐位管理-新增推荐位B
const addCommendTpmB = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/AddCommendTpmB')
// 商城-推荐位管理-编辑推荐位B
const editCommendTpmB = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/EditCommendTpmB')
// 商城-推荐位管理-新增推荐位C
const addCommendTpmC = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/AddCommendTpmC')
// 商城-推荐位管理-编辑推荐位C
const editCommendTpmC = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/EditCommendTpmC')
// 商城 - 积分活动
const scoreAct = () =>import(/* webpackChunkName: "mall" */ '../pages/Mall/ScoreAct/ActList')
// 商城 - 积分活动编辑
const scoreActEdit = () =>import(/* webpackChunkName: "mall" */ '../pages/Mall/ScoreAct/ActDetailEdit')
//零售户-审核管理
const reviewmanage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/Reviewmanage/ReviewManage')
//零售户-审核详情
const reviewDetail = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/Reviewmanage/ReviewDetail')
//零售户-零售户管理
const addSeller = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/AddSeller/AddSeller')
//零售户-零售户管理
const sellerManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/SellerManage/SellerManage')
//零售户-零售户管理-详情
const sellerDetail = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/SellerManage/SelllerDetail')
//零售户-提现审核
const amountExamine = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/AmountExamine/AmountExamine')
//零售户-返佣管理-扫码返佣管理
const rebateManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/RebateManage/RebateManage')
//零售户-业绩活动
const sellerAchievement = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/Achievement')
//零售户-初审管理
const sellerWhitelist = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/Audit/Whitelist')
//零售户-初审管理
const sellerAuditStep1 = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/Audit/Step1')
//零售户-终审管理
const sellerAuditStep2 = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/Audit/Step2')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      // leaf:true,
      component: Login
    },
    {
      path: '/find',
      name: 'Find',
      // leaf:true,
      component: Find
    },
    {
      path: '/',
      name: 'Home',
      // leaf: true,
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
        { path: '/datas', name: '数据', redirect: '/datas/kpi'},
        { path: '/datas/kpi', name: 'kpi实时播报', component: KPI },
        { path: '/datas/multi', name: '多维查询', component: MultiSearch },
        { path: '/datas/Report', name: '固定报表', component: HbReportPage },
        { path: '/datas/Report/ScanWeekPage', name: '扫码数据周报', component: ScanWeekPage },
        { path: '/datas/Report/ScanMonthPage', name: '扫码数据月报', component: ScanMonthPage },
        { path: '/datas/Report/RedPacketWeekPage', name: '红包投入数据周报', component: RedPacketWeekPage },
        { path: '/datas/Report/RedPacketMonthPage', name: '红包投入数据周报', component: RedPacketMonthPage },
        { path: '/datas/Report/CountyWeekPage', name: '红包投入数据周报', component: CountyWeekPage },
        { path: '/datas/Report/CountyMonthPage', name: '红包投入数据月报', component: CountyMonthPage },
        { path: '/datas/Report/KpiProDayPage', name: 'KPI数据分省统计日报', component: KpiProDayPage },
        { path: '/datas/Report/ActDrawDayPage', name: '活动中奖统计日报', component: ActDrawDayPage },
        { path: '/datas/Report/CashRedPackDayPage', name: '活动中奖统计日报', component: CashRedPackDayPage },
        { path: '/datas/Report/RealDrawDayPage', name: '实物奖品中奖统计日报', component: RealDrawDayPage },
        { path: '/datas/Report/IntegralOperDayPage', name: '积分操作情况统计日报', component: IntegralOperDayPage },
        { path: '/datas/Report/IntegralExchDayPage', name: '积分操作情况统计日报', component: IntegralExchDayPage },
        { path: '/datas/agree', name: '履约报表', component: DataAgree },
        { path: '/datas/visit', name: '回访报表', component: DataVisit },
        { path: '/datas/theme', name: '主题查询', redirect: '/datas/theme/region', },
        { path: '/datas/theme/kpiReview', name: 'KPI指标总览', component: KPI },
        { path: '/datas/theme/region', name: '地域查询', component: RegionSearch },
        { path: '/datas/theme/spec', name: '规格查询', component: SpecSearch },
        { path: '/datas/track', name: '活动追踪', redirect: '/datas/track/realtime' },
        { path: '/datas/track/realtime', name: '活动实时跟踪', component: KPI },
        { path: '/datas/track/dayanalysis', name: '活动日常分析', component: KPI },
        { path: '/datas/track/pathdetail', name: '页面路径转化信息', component: KPI },
        { path: '/datas/userAnalysis', name: '用户分析', redirect: '/datas/userAnalysis/analysis' },
        { path: '/datas/userAnalysis/analysis', name: '用户分析', component: AnalysisPage },
        { path: '/datas/userAnalysis/portraitu', name: '用户画像', component: UserPortrait ,props: (route) => ({mobileNo:route.query.mobileNo})},
        { path: '/datas/userAnalysis/label', name: '用户标签', component: KPI },
        { path: '/datas/sellerDatas', name: '零售户', redirect: '/datas/sellerDatas/develop' },
        { path: '/datas/sellerDatas/develop', name: '发展情况概况', component: DataSellerOverview },
        { path: '/datas/sellerDatas/search', name: '明细查询', component: DataSellerDetail },
        { path: '/datas/operate', name: '运营小工具', redirect: '/datas/operate/steal' },
        { path: '/datas/operate/steal', name: '盗扫明细', component: DataOperateSteal },
        { path: '/datas/fakeCode', name: '异常码明细', redirect: '/datas/fakeCode/report' },
        { path: '/datas/fakeCode/report', name: '假码举报', component: DataFakeCodeReport },
        { path: '/datas/fakeCode/qrcodeActive', name: '二维码激活', component: DataQrcodeActive },
        // 微平台
        { path: '/weplat', name: '微平台'},
        { path: '/weplat/down', name: '扫码落地页', component: ScanConf },
        { path: '/weplat/style', name: '平台风格', component: StyleConf },
        { path: '/weplat/mgr', redirect: '/weplat/mgr/scanCheck' },
        { path: '/weplat/mgr/scanCheck', name: '验真首页', component: wplatHome },
        { path: '/weplat/mgr/actList', name: '活动中心', component: Activities },
        { path: '/weplat/mgr/mall', name: '积分商城', component: Shop },
        { path: '/weplat/mgr/personCenter', name: '个人中心', component: Person },
        { path: '/weplat/menu', name: '菜单配置', component: MenuConf },
        // 产品
        {  path: '/product', name: '产品'},
        { path: '/product/supply', name: '供应商管理', component: supply },
        { path: '/product/supply/addSupplier', name: '供应商管理', component: addSupplier },
        { path: '/product/supply/editSupplier', name: '供应商管理', component: editSupplier,props: (route) => ({id:route.query.id}) },
        { path: '/product/mgr', name: '产品管理', redirect: '/product/mgr/tobacco' },
        { path: '/product/mgr/tobacco', name: '卷烟管理', component: tobacco },
        { path: '/product/mgr/tobacco/addTobaccoMr', name: '新建卷烟', component: addTobaccoMr },
        { path: '/product/mgr/tobacco/editTobaccoMr', name: '编辑卷烟', component: editTobaccoMr,props: (route) => ({id:route.query.id}) },
        { path: '/product/mgr/liquor', name: '酒管理', component: KPI },
        { path: '/product/materiel', name: '物料管理', redirect: '/product/materiel/object' },
        { path: '/product/materiel/object', name: '实物礼品', component: MaterielObject },
        { path: '/product/materiel/virtual', name: '虚拟礼品', component: MaterielVirtual },
        { path: '/product/materiel/redpack', name: '红包', component: MaterielRedpack },
        { path: '/product/materiel/integral', name: '积分', component: MaterielIntegral },
        { path: '/product/brand', name: '品牌管理', component: prodBrand },
        // 营销
        { path: '/market', name: '营销'},
        { path: '/market/actTpl', name: '活动模板', component: ActTpl },
        { path: '/market/actMgr', name: '活动管理', component: ActMgc },
        { path: '/market/actTpl/addAct', name: '新建活动模板配置', component: AddAct, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/addActEgg', name: '新建砸金蛋活动模板配置', component: AddActEgg, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/addActFanpaizi', name: '翻牌子活动', component: Fanpaizi, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/addActJiugongge', name: '九宫格活动', component: Jiugongge, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/addWingAct', name: '新建点元宝活动模板配置', component: AddWingAct, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/AddActSudoku', name: '新建九宫格活动模板配置', component: AddActSudoku, props: (router) => ({id: router.query.id})},
        { path: '/market/actTpl/actSetConf', name: '基础设置', component: ActSetConf, props: (router) => ({form: router.query.form, tplCode: router.query.tplCode, id: router.query.id, clone: router.query.clone,}) },
        { path: '/market/actTpl/actPutConf', name: '投放设置', component: ActPutConf, props: (router) => ({id: router.query.id, actCode: router.query.actCode}) },
        // 订单
        { path: '/orders', name: '订单' },
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
        { path: '/seller', name: '零售户'},
        { path: '/seller/review', name: '审核管理', component: reviewmanage},
        { path: '/seller/review/reviewDetail', name: '审核管理', component: reviewDetail,props: (route) => ({sellerId:route.query.sellerId})},
        { path: '/seller/review/addSeller', name: '新增零售户', component: addSeller},

        { path: '/seller/mgr', name: '零售户管理', component: sellerManage},
        { path: '/seller/mgr/addSeller', name: '新增零售户', component: addSeller},
        { path: '/seller/mgr/sellerDetail', name: '零售户管理', component: sellerDetail,props: (route) => ({sellerId:route.query.sellerId})},
        { path: '/seller/tx', name: '提现审核', component: amountExamine},
        { path: '/seller/tx/sellerDetail', name: '零售户管理', component: sellerDetail,props: (route) => ({sellerId:route.query.sellerId})},
        { path: '/seller/achievement', name: '业绩活动', component: sellerAchievement },
        { path: '/seller/rebate', name: '返佣管理', redirect: '/seller/rebate/mgr' },
        { path: '/seller/rebate/mgr', name: '扫码返佣管理', component: rebateManage },
        { path: '/seller/whitelist', name: '白名单管理', component: sellerWhitelist},
        { path: '/seller/audStep1', name: '初审管理', component: sellerAuditStep1},
        { path: '/seller/audStep2', name: '终审管理', component: sellerAuditStep2},
        // 商城
        { path: '/mall', name: '商城'},
        { path: '/mall/auth', name: '审核管理', component: auditManage },
        { path: '/mall/systemLayout', name: '系统配置', component: systemLayout },
        { path: '/mall/category', name: '分类管理', component: sortManage },
        { path: '/mall/recommend', name: '推荐位管理', component: recommendManage },
        { path: '/mall/recommend/addCommendTpmA', name: '新增推荐位模板A', component: addCommendTpmA },
        { path: '/mall/recommend/addCommendTpmB', name: '新增推荐位模板B', component: addCommendTpmB },
        { path: '/mall/recommend/addCommendTpmC', name: '新增推荐位模板C', component: addCommendTpmC },
        { path: '/mall/recommend/editCommendTpmA', name: '编辑推荐位模板A', component: editCommendTpmA,props: (route) => ({id:route.query.id})},
        { path: '/mall/recommend/editCommendTpmB', name: '编辑推荐位模板B', component: editCommendTpmB,props: (route) => ({id:route.query.id})},
        { path: '/mall/recommend/editCommendTpmC', name: '编辑推荐位模板C', component: editCommendTpmC,props: (route) => ({id:route.query.id})},
        { path: '/mall/banner', name: 'banner位管理', component: bannerManage},
        { path: '/mall/banner/addBanner', name: '新增banner', component: addBanner},
        { path: '/mall/banner/editBanner', name: '编辑banner', component: editBanner,props: (route) => ({id:route.query.id})},
        { path: '/mall/product', name: '商品管理', redirect: '/mall/product/zj' },
        { path: '/mall/product/zj', name: '自建商品管理', component: buildProduct},
        { path: '/mall/product/zj/addProduct', name: '新建自建商品', component: addProduct},
        { path: '/mall/product/zj/editProduct', name: '编辑自建商品', component: editProduct,props: (route) => ({id:route.query.id})},
        { path: '/mall/product/jd', name: '京东商品管理', component: JDProduct },
        { path: '/mall/product/jd/addJDProduct', name: '新建京东商品', component: addJDProduct },
        { path: '/mall/product/jd/editJDProduct', name: '编辑京东商品', component: editJDProduct,props: (route) => ({id:route.query.id})},
        { path: '/mall/product/act', name: '活动物料管理', component: ActProduct },
        { path: '/mall/product/act/addActProduct', name: '新建活动物料管理', component: AddActProduct },
        { path: '/mall/product/act/editActProduct', name: '编辑活动物料管理', component: EditActProduct,props: (route) => ({pid:route.query.pid})},
        { path: '/mall/score', name:'积分活动', component:scoreAct},
        { path: '/mall/score/edit', name:'活动编辑', component:scoreActEdit},
        // 设置
        { path: '/setting', name: '设置'},
        { path: '/setting/user', name: '账户设置', redirect: '/setting/user/modPwd' },
        { path: '/setting/user/modPwd', name: '密码修改', component: ModPwd },
        { path: '/setting/user/account', name: '成员管理', component: SettingAccount },
        { path: '/setting/user/role', name: '角色管理', component: SettingRole },
        { path: '/setting/logs', name: '日志管理', component: SettingLogs },
        { path: '/setting/seller', name: '零售户管理', component: SettingSeller },
        { path: '/setting/mall', name: '积分设置', component: KPI }
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
