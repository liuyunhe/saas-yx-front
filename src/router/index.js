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
//私域活动订单管理
const HbSellerObjectPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/HbSellerAct/ObjectPage.vue')
const HbSellerRedpackPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/HbSellerAct/RedpackPage.vue')
const HbSellerIntegralPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/HbSellerAct/IntegralPage.vue')
const HbSellerObjectPageDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/HbSellerAct/ObjectPageDetail.vue')
//商城订单管理
const ZjOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ZjOrderPage.vue')
const ZjOrderPageDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ZjOrderPageDetail.vue')

// const JdOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/JdOrderPage.vue')
const SnOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/SnOrderPage.vue')
// 权益订单
const RightsOrder = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/Rights/RightsOrder.vue')
const RightsOrderDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/Rights/RightsOrderDetail.vue')
//积分活动订单管理
const ActOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ActOrderPage.vue')
const ActOrderPageDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ActOrderPageDetail.vue')
// const ScoreOrderPage = () => import(/* webpackChunkName: "activity" */ '@/pages/Orders/mall/ScoreOrderPage.vue')

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
const Hongbaoyu = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddRedPacked')
const redPut = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/RedPacket/RedPacketPut')
const Fanpaizi = () => import(/*webpackChunkName: '"fanpaizi" */'@/pages/Market/ActTpl/Fanpaizi.ActTpl')
const Jiugongge = () => import(/*webpackChunkName: '"jiugongge" */'@/pages/Market/ActTpl/Jiugongge.ActTpl')
const AddActEgg = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddActEgg')
const AddCapsuleToys = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddCapsuleToys')
const AddDadishu = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddDadishu')
const AddDaqiqiu = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddDaqiqiu')
const AddJiawawa = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddJiawawa')
const AddRockPaperScissors = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddRockPaperScissors')
const AddBoating = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddBoating')
const AddDiaohongbao = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddDiaohongbao')
const AddHePiaoXiang = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddHePiaoXiang')
const AddWingAct = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddWingAct')
const AddActSudoku = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddActSudoku')
const AddRound = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddRound')
const AddActQuestion = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActTpl/AddQuestion.ActTpl')
const ActSetConf = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/ActSetConf')
const ActPutConf = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/ActPutConf')
const QuesEdit = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/QuesAct/QuesEdit')
const QuesList = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/QuesAct/QuesList')
const ActSetConfSelf = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/ActSetConfSelf')
const HPXSetConf = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/HPXSetConf')




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
// 产品-物料管理-折扣卡
const MaterielCardDiscount = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Materiel/cardDiscount.vue')
// 产品-物料管理-翻倍卡
const MaterielCardDouble = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Materiel/cardDouble.vue')
// 产品-品牌管理
const prodBrand = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Brand.vue')
// 产品-预算管理
const BudgetObject = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Budget/Object.vue')
const BudgetRedpack = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Budget/Redpack.vue')
const BudgetIntegral = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Budget/Integral.vue')
const BudgetExpenses = () => import(/* webpackChunkName: "product" */ '@/pages/Product/Budget/Expenses.vue')


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
// 积分设置
const PointsConf = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/PointsConf.vue')
// 设置-资源管理-系统菜单管理
const SettingSystemMenu = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Resources/SystemMenu.vue')
// 设置-资源管理-企业授权src\pages\Setting\Sign\Sign.vue
const SettingSystemAuth = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Resources/SystemAuth.vue')
const Sign = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Sign/Sign.vue')
const SignDetail = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Sign/signActEdit.vue')
const ActSetting = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/Act.vue')
const BrandGroup = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/BrandGroup.vue')
const CodeLimit = () => import(/* webpackChunkName: "setting" */ '@/pages/Setting/CodeLimit.vue')

//菜单配置
const MenuConf = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/MenuConf/MenuConf.vue')
//扫码落地页配置
const ScanConf = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/ScanConf/ScanConf.vue')
const ScanConf2 = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/ScanConf/ScanConf2.vue')
//平台风格配置
const StyleConf = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/StyleConf/StyleConf.vue')
//微平台管理的四个子菜单
const wplatHome = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/WplatHome.vue')
const Activities = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/Activities.vue')
const Shop = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/Shop.vue')
const Person = () => import(/* webpackChunkName: "wplat" */ '@/pages/Wplat/WplatConf/Person.vue')

// 商城-审核管理
const auditManage = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/AuditManage/AuditManage')
// 商城-折扣管理
const discountManage = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/DiscountManage/DiscountManage')
// 商城-新增折扣
const addDiscount = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/DiscountManage/AddDiscount')
// 商城-编辑折扣
const editDiscount = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/DiscountManage/EditDiscount')
// 商城-系统设置
const systemLayout = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/SystemLayout/SystemLayout')
// 商城-商品管理-自建商品管理
const buildProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/BuildProduct/BuildProduct')
const addProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/BuildProduct/AddProduct')
const editProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/BuildProduct/EditProduct')
// 商城-商品管理-京东商品管理
// const JDProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/JDProduct/JDProduct')
// const addJDProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/JDProduct/AddJDProduct')
// const editJDProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/JDProduct/EditJDProduct')

// 商城-商品管理-苏宁商品管理
const SNProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/SNProduct/SNProduct')
const AddSNProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/SNProduct/AddSNProduct')
const EditSNProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/SNProduct/EditSNProduct')
// 商城-商品管理-第三方商品管理
const ThirdProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/ThirdProduct/ThirdProduct')
const AddThirdProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/ThirdProduct/AddThirdProduct')
const EditThirdProduct = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/CommodityManage/ThirdProduct/EditThirdProduct')
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
// 商城-推荐位管理-新增推荐位B2
const addCommendTpmD = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/AddCommendTpmD')
// 商城-推荐位管理-编辑推荐位B2
const editCommendTpmD = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/EditCommendTpmD')
// 商城-推荐位管理-新增爆款推荐位
const addCommendTpmH = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/AddCommendTpmH')
// 商城-推荐位管理-编辑爆款推荐位
const editCommendTpmH = () => import(/* webpackChunkName: "mall" */ '../pages/Mall/RecommendManage/Template/EditCommendTpmH')
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
const fansManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/FansManage/FansManage')
const inviteManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/InviteManage/InviteManage')
const groupManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/GroupManage/GroupManage')
const levelManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/LevelManage/LevelManage')
const iconManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/IconManage/IconManage')
const feedbackManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/FeedbackManage/FeedbackManage')
const SellerRank = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/DataManage/SellerRank')
const FansRank = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/DataManage/FansRank')
const FansAge = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/DataManage/FansAge')
const SellerNumber = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/DataManage/SellerNumber')
const FansNumber = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/DataManage/FansNumber')
const editLevel = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/LevelManage/EditLevel')
const messageManage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/MessageManage/MessageManage')
const addMessage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/MessageManage/AddMessage')
const editMessage = () => import(/* webpackChunkName: "seller" */ '../pages/Seller/MessageManage/EditMessage')
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
//零售户-助力活动
const sellerHelp = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/Help')
//零售户-图片审核
const ImgReview = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/ImgReview/ImgReview')
//零售户-零售户审核
const SellerReview = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/SellerReview/SellerReview')
//零售户-零售户提现
const SellerTx = () => import(/* webpackChunkName: "seller" */ '@/pages/Seller/SellerTx/SellerTx')


// 会员日
const Draw = () => import(/* webpackChunkName: "member" */ '@/pages/Member/DrawALottery/Draw')
const BaseAward = () => import(/* webpackChunkName: "member" */ '@/pages/Member/WinningList/BaseAward')
const CommonAwardDetail = () => import(/* webpackChunkName: "member" */ '@/pages/Member/WinningList/CommonAwardDetail')
const ScanAward = () => import(/* webpackChunkName: "member" */ '@/pages/Member/WinningList/ScanAward')
const SuperAward = () => import(/* webpackChunkName: "member" */ '@/pages/Member/WinningList/SuperAward')
const SuperAwardDetail = () => import(/* webpackChunkName: "member" */ '@/pages/Member/WinningList/SuperAwardDetail')
const MemberSetting = () => import(/* webpackChunkName: "member" */ '@/pages/Member/MemberSetting/MemberSetting')
const PrizeConf = () => import(/* webpackChunkName: "member" */ '@/pages/Member/PrizeConf/PrizeConf')
const PrizeList = () => import(/* webpackChunkName: "member" */ '@/pages/Member/PrizeConf/PrizeList')
const Turn = () => import(/* webpackChunkName: "member" */ '@/pages/Member/GameConf/TurnConf')
const Answer = () => import(/* webpackChunkName: "member" */ '@/pages/Member/GameConf/AnswerConf')
const HeSheng = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeSheng')
const HeShengAward = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeShengAward')
const HeShengND = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeShengND')
const HeShengMusic = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeShengMusic')
const HePiaoXiang = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HePiaoXiang')
const HeFood = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeFood')
const HeShengLC = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeShengLC')
const HeYearEndRun = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeYearEndRun')
const HeYearEndFishing = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeYearEndFishing')
const HeSheng2021Diy = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeSheng2021Diy')
const HeSheng2021Light = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/HeSheng/HeSheng2021Light')
const JH2021Round = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/Jihe/RoundMgr')
const NianhuoMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/Jihe/NianhuoMgr')

const ScanMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/ScanMgr')
const CardCollectingMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/CardCollectingMgr')
const QAMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/QAMgr')
const ARMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/ARMgr')
const PartyMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/PartyMgr')
const ParkourMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/ParkourMgr')
const MineMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/MineMgr')
const SignMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/SignMgr')
const WinningPrizeMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/WinningPrizeMgr')
const PicturePuzzleMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/PicturePuzzleMgr')
const LetterCubeMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/LetterCubeMgr')
const PatchMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Member/2019memberDay/PatchMgr')

// 用户
const Mgr = () => import(/* webpackChunkName: "customer" */ '@/pages/Customer/Mgr/Mgr')
const Black = () => import(/* webpackChunkName: "customer" */ '@/pages/Customer/Black/Black')
const Task = () => import(/* webpackChunkName: "customer" */ '@/pages/Customer/Task/TaskList')
const Rights = () => import(/* webpackChunkName: "customer" */ '@/pages/Customer/Rights/Rights')
const RightsDetail = () => import(/* webpackChunkName: "customer" */ '@/pages/Customer/Rights/RightsDetail')
// 用户详情
const PersonalDeatail = () =>import(/* webpackChunkName: "customer" */ '@/pages/Customer/components/personalDeatail')
// 会员任务设置
const TaskDetail = () =>import(/* webpackChunkName: "customer" */ '@/pages/Customer/Task/TaskDetail')
const ScanEdit = () =>import(/* webpackChunkName: "customer" */ '@/pages/Customer/Task/ScanEdit')
const MarketQr = () => import(/* webpackChunkName: "activity" */ '@/pages/Market/ActMgr/MarketQr')

//分销
const DistributionMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/DistributionMgr')
const OrderMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/OrderMgr')
const OrderDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/OrderDetail')
const AmountExamine = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/AmountExamine')
const DealerMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/DealerMgr')
const DealerDetail = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/DealerDetail')
const SystemMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/Distribution/SystemMgr')

//成码
const Application = () => import(/* webpackChunkName: "activity" */ '@/pages/Code/Application')

//消费者活动

const CustomerScanMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/ScanMgr')
const CustomerSignMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/SignMgr')
const CustomerRankMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/RankMgr')
const CustomerRankConf = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/RankConf')
const BindFanConf = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/BindFanConf')
const RebateMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/RebateMgr')
const ScanCodeRankMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/ScanCodeRankMgr')
const ScanCodeListMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/ScanCodeListMgr')
const CustomerSetting = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/Setting')
const CustomerRedpackListMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/RedpackListMgr')
const CustomerPointsListMgr = () => import(/* webpackChunkName: "activity" */ '@/pages/CustomerAct/PointsListMgr')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      // leaf:true,
      component: Login,
      props: (route) => ({message:route.query.message})
    },
    {
      path: '/find',
      name: 'Find',
      // leaf:true,
      component: Find,
      props: (route) => ({f:route.query.f, account:route.query.account})
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
      // redirect: '/datas',
      children: [
        // 数据
        { path: '/datas', name: '数据'},
        // { path: '/datas', name: '数据', redirect: '/datas/kpi'},
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
        { path: '/datas/theme', name: '主题查询'},
        // { path: '/datas/theme', name: '主题查询', redirect: '/datas/theme/region', },
        { path: '/datas/theme/kpiReview', name: 'KPI指标总览', component: KPI },
        { path: '/datas/theme/region', name: '地域查询', component: RegionSearch },
        { path: '/datas/theme/spec', name: '规格查询', component: SpecSearch },
        { path: '/datas/track', name: '活动追踪'},
        // { path: '/datas/track', name: '活动追踪', redirect: '/datas/track/realtime' },
        { path: '/datas/track/realtime', name: '活动实时跟踪', component: KPI },
        { path: '/datas/track/dayanalysis', name: '活动日常分析', component: KPI },
        { path: '/datas/track/pathdetail', name: '页面路径转化信息', component: KPI },
        { path: '/datas/userAnalysis', name: '用户分析'},
        // { path: '/datas/userAnalysis', name: '用户分析', redirect: '/datas/userAnalysis/analysis' },
        { path: '/datas/userAnalysis/analysis', name: '用户分析', component: AnalysisPage },
        { path: '/datas/userAnalysis/portraitu', name: '用户画像', component: UserPortrait ,props: (route) => ({mobileNo:route.query.mobileNo})},
        { path: '/datas/userAnalysis/label', name: '用户标签', component: KPI },
        { path: '/datas/sellerDatas', name: '零售户'},
        // { path: '/datas/sellerDatas', name: '零售户', redirect: '/datas/sellerDatas/develop' },
        { path: '/datas/sellerDatas/develop', name: '发展情况概况', component: DataSellerOverview },
        { path: '/datas/sellerDatas/search', name: '明细查询', component: DataSellerDetail },
        { path: '/datas/operate', name: '运营小工具'},
        // { path: '/datas/operate', name: '运营小工具', redirect: '/datas/operate/steal' },
        { path: '/datas/operate/steal', name: '盗扫明细', component: DataOperateSteal },
        { path: '/datas/fakeCode', name: '异常码明细'},
        // { path: '/datas/fakeCode', name: '异常码明细', redirect: '/datas/fakeCode/report' },
        { path: '/datas/fakeCode/report', name: '假码举报', component: DataFakeCodeReport },
        { path: '/datas/fakeCode/qrcodeActive', name: '二维码激活', component: DataQrcodeActive },
        // 微平台
        { path: '/weplat', name: '微平台'},
        { path: '/weplat/down', name: '扫码落地页', component: ScanConf },
        { path: '/weplat/down2', name: '扫码落地页模板2设置', component: ScanConf2,props: (route) => ({id:route.query.id,type:route.query.type}) },
        { path: '/weplat/style', name: '平台风格', component: StyleConf },
        { path: '/weplat/mgr'},
        // { path: '/weplat/mgr', redirect: '/weplat/mgr/scanCheck' },
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
        { path: '/product/mgr', name: '产品管理'},
        // { path: '/product/mgr', name: '产品管理', redirect: '/product/mgr/tobacco' },
        { path: '/product/mgr/tobacco', name: '卷烟管理', component: tobacco },
        { path: '/product/mgr/tobacco/addTobaccoMr', name: '新建卷烟', component: addTobaccoMr },
        { path: '/product/mgr/tobacco/editTobaccoMr', name: '编辑卷烟', component: editTobaccoMr,props: (route) => ({id:route.query.id}) },
        { path: '/product/mgr/liquor', name: '酒管理', component: KPI },
        { path: '/product/materiel', name: '物料管理',redirect:'/product/materiel/object'},
        // { path: '/product/materiel', name: '物料管理', redirect: '/product/materiel/object' },
        { path: '/product/materiel/object', name: '实物礼品', component: MaterielObject },
        { path: '/product/materiel/virtual', name: '虚拟礼品', component: MaterielVirtual },
        { path: '/product/materiel/redpack', name: '红包', component: MaterielRedpack },
        { path: '/product/materiel/integral', name: '积分', component: MaterielIntegral },
        { path: '/product/materiel/cardDiscount', name: '折扣卡', component: MaterielCardDiscount },
        { path: '/product/materiel/cardDouble', name: '翻倍卡', component: MaterielCardDouble },
        { path: '/product/brand', name: '品牌管理', component: prodBrand },
        { path: '/product/budget', name: '预算管理',redirect:'/product/budget/redpack'},
        { path: '/product/budget/object', name: '预算管理-实物', component: BudgetObject },
        { path: '/product/budget/redpack', name: '预算管理-红包', component: BudgetRedpack },
        { path: '/product/budget/integral', name: '预算管理-积分', component: BudgetIntegral },
        { path: '/product/budget/expenses', name: '预算管理-费用', component: BudgetExpenses },
        // 营销
        { path: '/market', name: '营销'},
        { path: '/market/actTpl', name: '活动模板', component: ActTpl },
        { path: '/market/actMgr', name: '活动管理', component: ActMgc },
        { path: '/market/qr', name: '体验码', component: MarketQr },
        { path: '/market/actTpl/addAct', name: '新建活动模板配置', component: AddAct, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addActRedPacked', name: '新建红包雨配置', component: Hongbaoyu, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addActEgg', name: '新建砸金蛋活动模板配置', component: AddActEgg, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addCapsuleToys', name: '新建扭蛋机活动模板配置', component: AddCapsuleToys, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addDadishu', name: '新建打地鼠活动模板配置', component: AddDadishu, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addDaqiqiu', name: '新建打气球活动模板配置', component: AddDaqiqiu, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addJiawawa', name: '新建夹娃娃活动模板配置', component: AddJiawawa, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addRockPaperScissors', name: '新建石头剪刀布活动模板配置', component: AddRockPaperScissors, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addBoating', name: '新建划船活动模板配置', component: AddBoating, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addDiaohongbao', name: '新建钓红包活动模板配置', component: AddDiaohongbao, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addHePiaoXiang', name: '新建荷飘香活动模板配置', component: AddHePiaoXiang, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addActFanpaizi', name: '翻牌子活动', component: Fanpaizi, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addActJiugongge', name: '九宫格活动', component: Jiugongge, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addWingAct', name: '新建点元宝活动模板配置', component: AddWingAct, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/AddActSudoku', name: '新建九宫格活动模板配置', component: AddActSudoku, props: (router) => ({id: router.query.id, edit: router.query.edit})},

        { path: '/market/actTpl/AddRound', name: '新建大转盘活动模板配置', component: AddRound, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/addActQuestion', name: '新建答题活动模板配置', component: AddActQuestion, props: (router) => ({id: router.query.id, edit: router.query.edit})},
        { path: '/market/actTpl/actSetConf', name: '基础设置', component: ActSetConf, props: (router) => ({form: router.query.form, tplCode: router.query.tplCode, id: router.query.id, clone: router.query.clone,}) },
        { path: '/market/actTpl/actSetConfSelf', name: '自定义活动基础设置', component: ActSetConfSelf, props: (router) => ({form: router.query.form, tplCode: router.query.tplCode, id: router.query.id, clone: router.query.clone,}) },
        { path: '/market/actTpl/HPXSetConf', name: '荷飘香活动设置', component: HPXSetConf, props: (router) => ({id: router.query.id, actCode: router.query.actCode,form: router.query.form,budgetTime: router.query.budgetTime,saleZone: router.query.saleZone}) },
        { path: '/market/actTpl/quesActSetConf', name: '题目设置', component: QuesList, props: (router) => ({id: router.query.id, actCode: router.query.actCode,form: router.query.form}) },
        { path: '/market/actTpl/quesEdit', name: '题目编辑', component: QuesEdit, props: (router) => ({quesId: router.query.quesId,id: router.query.id, actCode: router.query.actCode,form: router.query.form}) },
        { path: '/market/actTpl/actPutConf', name: '投放设置', component: ActPutConf, props: (router) => ({id: router.query.id, actCode: router.query.actCode,form: router.query.form}) },
        { path: '/market/actTpl/redPut', name: '投放设置', component: redPut, props: (router) => ({id: router.query.id, actCode: router.query.actCode,form: router.query.form}) },
        // 订单
        { path: '/orders', name: '订单' },
        { path: '/orders/seller', name: '零售户订单', component: KPI },
        { path: '/orders/member', name: '权益订单', component: RightsOrder },
        { path: '/orders/member/detail', name: '权益订单', component: RightsOrderDetail, props: (route) => ({id:route.query.id}) },
        { path: '/orders/act', name: '活动订单'},
        // { path: '/orders/act', name: '活动订单', redirect: '/orders/act/object' },
        { path: '/Orders/ACT/object', name: '实物领奖明细', component: ObjectPage },
        { path: '/Orders/ACT/objectDetail', name: '实物领奖订单详细', component: ObjectPageDetail,props: (route) => ({orderId:route.query.orderId})  },
        { path: '/Orders/ACT/virtual', name: '虚拟领奖明细', component: VirtualPage },
        { path: '/Orders/ACT/redpack', name: '红包领奖明细', component: RedpackPage },
        { path: '/Orders/ACT/integral', name: '积分领奖明细', component: IntegralPage },
        { path: '/Orders/mall', name: '商城订单'},

        { path: '/Orders/HbSellerAct', name: '实物领奖明细', redirect: '/Orders/HbSellerAct/object'},
        { path: '/Orders/HbSellerAct/object', name: '实物领奖明细', component: HbSellerObjectPage },
        { path: '/Orders/HbSellerAct/objectDetail', name: '实物领奖订单详细', component: HbSellerObjectPageDetail,props: (route) => ({orderId:route.query.orderId})  },
        { path: '/Orders/HbSellerAct/redpack', name: '红包领奖明细', component: HbSellerRedpackPage },
        { path: '/Orders/HbSellerAct/integral', name: '积分领奖明细', component: HbSellerIntegralPage },
        // { path: '/Orders/mall', name: '商城订单', redirect: '/Orders/mall/zj'},
        { path: '/Orders/mall/zj', name: '自建商品订单', component: ZjOrderPage },
        { path: '/Orders/mall/zjOrderPageDetail', name: '自建商品订单详情',  component: ZjOrderPageDetail,props: (route) => ({orderCode:route.query.orderCode})  },
        // { path: '/Orders/mall/jd', name: '京东商品订单', component: JdOrderPage },
        { path: '/Orders/mall/sn', name: '苏宁商品订单', component: SnOrderPage },
        // { path: '/Orders/mall/integral', name: '积分活动订单', component: ScoreOrderPage },
        { path: '/Orders/mall/act', name: '积分活动订单', component: ActOrderPage },
        { path: '/Orders/mall/actOrderPageDetail', name: '积分活动订单详情', component: ActOrderPageDetail,props: (route) => ({orderCode:route.query.orderCode})  },
        // 零售户
        { path: '/seller', name: '零售户'},
        { path: '/seller/review', name: '审核管理', component: reviewmanage},
        { path: '/seller/review/reviewDetail', name: '审核管理', component: reviewDetail,props: (route) => ({sellerId:route.query.sellerId})},
        { path: '/seller/review/addSeller', name: '新增零售户', component: addSeller},

        { path: '/seller/mgr', name: '零售户管理', component: sellerManage},
        { path: '/seller/mgr/sellerDetail', name: '零售户管理', component: sellerDetail,props: (route) => ({sellerId:route.query.sellerId})},
        { path: '/seller/mgr/addSeller', name: '新增零售户', component: addSeller},

        { path: '/seller/fansMgr', name: '粉丝管理', component: fansManage},
        { path: '/seller/inviteMgr', name: '邀约管理', component: inviteManage},
        { path: '/seller/levelMgr', name: '等级管理', component: levelManage},
        { path: '/seller/editLevel', name: '编辑等级', component: editLevel,props: (route) => ({id:route.query.id})},
        { path: '/seller/groupMgr', name: '分组管理', component: groupManage},
        { path: '/seller/iconMgr', name: 'icon管理', component: iconManage},
        { path: '/seller/feedbackMgr', name: '意见反馈', component: feedbackManage},
        { path: '/seller/messageMgr', name: '消息管理', component: messageManage},
        { path: '/seller/sellerData', name: '零售户排行', component: SellerRank},
        { path: '/seller/sellerData/sellerRank', name: '零售户排行', component: SellerRank},
        { path: '/seller/sellerData/sellerNumber', name: '零售户分布', component: SellerNumber},
        { path: '/seller/fansData', name: '粉丝排行', component: FansRank},
        { path: '/seller/fansData/fansRank', name: '粉丝排行', component: FansRank},
        { path: '/seller/fansData/fansAge', name: '粉丝占比', component: FansAge},
        { path: '/seller/fansData/fansNumber', name: '粉丝分布', component: FansNumber},
        { path: '/seller/addMessage', name: '消息管理', component: addMessage},
        { path: '/seller/editMessage', name: '消息管理', component: editMessage,props: (route) => ({id:route.query.id})},


        { path: '/seller/tx', name: '提现审核', component: amountExamine},
        { path: '/seller/tx/sellerDetail', name: '零售户管理', component: sellerDetail,props: (route) => ({sellerId:route.query.sellerId})},
        { path: '/seller/achievement', name: '业绩活动', component: sellerAchievement },
        { path: '/seller/rebate', name: '返佣管理'},
        // { path: '/seller/rebate', name: '返佣管理', redirect: '/seller/rebate/mgr' },
        { path: '/seller/rebate/mgr', name: '扫码返佣管理', component: rebateManage },
        { path: '/seller/whitelist', name: '白名单管理', component: sellerWhitelist},
        { path: '/seller/audStep1', name: '初审管理', component: sellerAuditStep1},
        { path: '/seller/audStep2', name: '终审管理', component: sellerAuditStep2},
        { path: '/seller/help', name: '助力活动', component: sellerHelp},
        { path: '/seller/imgReview', name: '图片审核', component: ImgReview},
        { path: '/seller/sellerReview', name: '图片审核', component: SellerReview},
        { path: '/seller/sellerTx', name: '零售户提现', component: SellerTx},
        // 商城
        { path: '/mall', name: '商城'},
        { path: '/mall/auth', name: '审核管理', component: auditManage },
        { path: '/mall/discount', name: '折扣管理', component: discountManage },
        { path: '/mall/addDiscount', name: '新增折扣', component: addDiscount },
        { path: '/mall/editDiscount', name: '编辑折扣', component: editDiscount,props: (route) => ({id:route.query.id,disable:route.query.disable}) },
        { path: '/mall/systemLayout', name: '系统配置', component: systemLayout },
        { path: '/mall/category', name: '分类管理', component: sortManage },
        { path: '/mall/recommend', name: '推荐位管理', component: recommendManage },
        { path: '/mall/recommend/addCommendTpmA', name: '新增推荐位模板A', component: addCommendTpmA },
        { path: '/mall/recommend/addCommendTpmB', name: '新增推荐位模板B', component: addCommendTpmB },
        { path: '/mall/recommend/addCommendTpmC', name: '新增推荐位模板C', component: addCommendTpmC },
        { path: '/mall/recommend/addCommendTpmD', name: '新增推荐位模板B2', component: addCommendTpmD },
        { path: '/mall/recommend/addCommendTpmH', name: '新增推荐位爆款模板', component: addCommendTpmH },
        { path: '/mall/recommend/editCommendTpmA', name: '编辑推荐位模板A', component: editCommendTpmA,props: (route) => ({id:route.query.id})},
        { path: '/mall/recommend/editCommendTpmB', name: '编辑推荐位模板B', component: editCommendTpmB,props: (route) => ({id:route.query.id})},
        { path: '/mall/recommend/editCommendTpmC', name: '编辑推荐位模板C', component: editCommendTpmC,props: (route) => ({id:route.query.id})},
        { path: '/mall/recommend/editCommendTpmD', name: '编辑推荐位模板B2', component: editCommendTpmD,props: (route) => ({id:route.query.id})},
        { path: '/mall/recommend/editCommendTpmH', name: '编辑推荐位爆款模板', component: editCommendTpmH,props: (route) => ({id:route.query.id})},
        { path: '/mall/banner', name: 'banner位管理', component: bannerManage},
        { path: '/mall/banner/addBanner', name: '新增banner', component: addBanner},
        { path: '/mall/banner/editBanner', name: '编辑banner', component: editBanner,props: (route) => ({id:route.query.id})},
        { path: '/mall/product', name: '商品管理'},
        // { path: '/mall/product', name: '商品管理', redirect: '/mall/product/zj' },
        { path: '/mall/product/zj', name: '自建商品管理', component: buildProduct},
        { path: '/mall/product/zj/addProduct', name: '新建自建商品', component: addProduct},
        { path: '/mall/product/zj/editProduct', name: '编辑自建商品', component: editProduct,props: (route) => ({id:route.query.id})},
        // { path: '/mall/product/jd', name: '京东商品管理', component: JDProduct },
        // { path: '/mall/product/jd/addJDProduct', name: '新建京东商品', component: addJDProduct },
        // { path: '/mall/product/jd/editJDProduct', name: '编辑京东商品', component: editJDProduct,props: (route) => ({id:route.query.id})},
        { path: '/mall/product/sn', name: '苏宁商品管理', component: SNProduct },
        { path: '/mall/product/sn/addSNProduct', name: '新建苏宁商品', component: AddSNProduct },
        { path: '/mall/product/sn/editSNProduct', name: '编辑苏宁商品', component: EditSNProduct,props: (route) => ({id:route.query.id})},
        { path: '/mall/product/third', name: '第三方商品管理', component: ThirdProduct },
        { path: '/mall/product/third/addThirdProduct', name: '新建第三方商品', component: AddThirdProduct },
        { path: '/mall/product/third/editThirdProduct', name: '编辑第三方商品', component: EditThirdProduct,props: (route) => ({id:route.query.id})},
        { path: '/mall/product/act', name: '活动物料管理', component: ActProduct },
        { path: '/mall/product/act/addActProduct', name: '新建活动物料管理', component: AddActProduct },
        { path: '/mall/product/act/editActProduct', name: '编辑活动物料管理', component: EditActProduct,props: (route) => ({pid:route.query.pid})},
        { path: '/mall/score', name:'积分活动', component:scoreAct},
        { path: '/mall/score/edit', name:'积分活动', component:scoreActEdit},
        // 设置
        { path: '/setting', name: '设置'},
        { path: '/setting/user', name: '账户设置' },
        // { path: '/setting/user', name: '账户设置', redirect: '/setting/user/modPwd' },
        { path: '/setting/user/modPwd', name: '密码修改', component: ModPwd },
        { path: '/setting/user/account', name: '成员管理', component: SettingAccount },
        { path: '/setting/user/role', name: '角色管理', component: SettingRole },
        { path: '/setting/logs', name: '日志管理', component: SettingLogs },
        { path: '/setting/seller', name: '零售户管理', component: SettingSeller },
        { path: '/setting/mall', name: '积分设置', component: PointsConf },
        { path: '/setting/act', name: '活动设置' },
        { path: '/setting/act/setting', name: '活动类型管理', component: ActSetting },
        { path: '/setting/act/brandGroup', name: '规格设置', component: BrandGroup },
        { path: '/setting/act/codeLimit', name: '规格设置', component: CodeLimit },

        { path: '/setting/resource/smenu', name: '菜单管理', component: SettingSystemMenu },
        { path: '/setting/resource/smgrOrgRole', name: '菜单管理', component: SettingSystemAuth },
        { path: '/setting/sign', name: '菜单管理', component: Sign },
        { path: '/setting/sign/detail', name: '菜单管理', component: SignDetail,  props: (route) => ({code:route.query.code, id:route.query.id})},
        // 会员日
        { path: '/memberday', name: '会员日' },
        // { path: '/memberday', name: '会员日', redirect: '/memberday/material' },
        { path: '/memberday/material', name: '物料', props: (route) => ({type: '1'}) },
        // { path: '/memberday/material', name: '物料', redirect: '/memberday/material/prizeList', props: (route) => ({type: '1'}) },
        { path: '/memberday/draw', name: '会员日开奖', component: Draw },
        { path: '/memberday/order'},
        // { path: '/memberday/order', redirect: '/memberday/order/baseAward'},
        { path: '/memberday/order/baseAward', name: '中奖名单-常规', component: BaseAward },
        { path: '/memberday/order/commonAwardDetail', name: '常规奖详情', component: CommonAwardDetail, props: (route) => ({orderCode: route.query.orderCode, tsUuid: route.query.tsUuid}) },
        { path: '/memberday/order/scanAward', name: '中奖名单-扫码贡献奖', component: ScanAward },
        { path: '/memberday/order/superAward', name: '中奖名单-超级金荷奖', component: SuperAward },
        // { path: '/memberday/order/superAwardDetail', name: '金荷奖详情', component: SuperAwardDetail, props: (route) => ({orderCode: route.query.orderCode}) },
        { path: '/memberday/memberSetting', name: '会员日设置', component: MemberSetting },

        { path: '/memberday/turn', name: '大转盘活动管理', component: Turn },
        { path: '/memberday/qa', name: '大转盘活动管理', component: Answer },
        { path: '/memberday/HeSheng', name: '大转盘活动管理', component: HeSheng },
        { path: '/memberday/HePiaoXiang', name: '荷飘香', component: HePiaoXiang },
        { path: '/memberday/HeFood', name: '荷美食', component: HeFood },
        { path: '/memberday/HeShengLC', name: '荷开九州', component: HeShengLC },

        { path: '/actall', name: '活动汇总'},
        { path: '/actall/HeYearEndRun', name: '集荷跑步', component: HeYearEndRun },
        { path: '/actall/HeYearEndFishing', name: '集荷跑步', component: HeYearEndFishing },
        { path: '/actall/JH2021Round', name: '集荷跑步', component: JH2021Round },
        { path: '/actall/NianhuoMgr', name: '集荷年货', component: NianhuoMgr },
        { path: '/actall/HeSheng2021Diy', name: '集荷跑步', component: HeSheng2021Diy },
        { path: '/actall/HeSheng2021Light', name: '荷灯', component: HeSheng2021Light },
        { path: '/actall/HeShengFuKa', name: '荷声福卡', component: HeShengAward },
        { path: '/actall/HeShengND', name: '荷声扭蛋', component: HeShengND },
        { path: '/actall/HeShengMusic', name: '荷声音符', component: HeShengMusic },

        { path: '/memberday/ScanMgr', name: '每日扫码', component: ScanMgr },
        { path: '/memberday/CardCollectingMgr', name: '社区卡', component: CardCollectingMgr },
        { path: '/memberday/QAMgr', name: '钻石学堂', component: QAMgr },
        { path: '/memberday/ARMgr', name: 'AR识钻', component: ARMgr },
        { path: '/memberday/MineMgr', name: '钻石矿场', component: MineMgr },
        { path: '/memberday/PartyMgr', name: '钻石Party', component: PartyMgr },
        { path: '/memberday/ParkourMgr', name: '钻石Party', component: ParkourMgr },
        { path: '/memberday/WinningPrizeMgr', name: '中奖风采', component: WinningPrizeMgr },
        { path: '/memberday/SignMgr', name: '社区打卡', component: SignMgr },
        { path: '/memberday/PicturePuzzleMgr', name: '钻石拼图', component: PicturePuzzleMgr },
        { path: '/memberday/LetterCubeMgr', name: '文字魔方', component: LetterCubeMgr },
        { path: '/memberday/PatchMgr', name: '文字魔方', component: PatchMgr },

        { path: '/memberday/material/prizeConf', name: '会员日实物奖品配置', component: PrizeConf, props: (route) => ({type: route.query.type, id: route.query.id}) },
        { path: '/memberday/material/prizeList', name: '会员日实物奖品列表', component: PrizeList, props: (route) => ({type: route.query.type}) },


        // 用户
        { path: '/customer', name: '用户' },
        { path: '/customer/mgr', name: '用户管理', component: Mgr },
        { path: '/customer/lvl', name: '等级权益管理', component: Rights },
        { path: '/customer/lvl/edit', name: '编辑等级', component: RightsDetail, props: (route) => ({id: route.query.id, lowGrowth: route.query.lowGrowth, highGrowth: route.query.highGrowth}) },
        { path: '/customer/task', name: '任务管理', component: Task },
        { path: '/customer/task/detail', name: '任务明细', component: TaskDetail, props: (route) => ({id: route.query.id}) },
        { path: '/customer/task/scanEdit', name: '编辑扫码赚成长值', component: ScanEdit, props: (route) => ({id: route.query.id}) },
        { path: '/customer/black', name: '黑名单管理', component: Black },
        // { path: '/customer/task/sign', name: '会员签到任务设置', component: memberTaskSign, props: (route) => ({code:route.query.code, id:route.query.id}) },
        { path: '/customer/mgr/detail', name: '用户详情', component: PersonalDeatail, props: (route) => ({code:route.query.code, id:route.query.id}) },

        //分销
        { path: '/distribution/distributionMgr', name: '审核管理', component: DistributionMgr },
        { path: '/distribution/orderMgr', name: '订单管理', component: OrderMgr },
        { path: '/distribution/orderDetail', name: '订单详情', component: OrderDetail ,props: (route) => ({orderId:route.query.orderId}) },
        { path: '/distribution/amountExamine', name: '提现管理', component: AmountExamine },
        { path: '/distribution/dealerMgr', name: '经销商管理', component: DealerMgr },
        { path: '/distribution/dealerDetail', name: '经销商详情', component: DealerDetail ,props: (route) => ({salerId:route.query.salerId}) },
        { path: '/distribution/systemMgr', name: '系统设置', component: SystemMgr },

        //成码
        { path: '/code/application', name: '成码申请', component: Application },

        //私域-消费者活动
        { path: '/customerAct/scanMgr', name: '扫码活动', component: CustomerScanMgr },
        { path: '/customerAct/signMgr', name: '签到活动', component: CustomerSignMgr },
        { path: '/customerAct/rankMgr', name: '排行活动列表', component: CustomerRankMgr },
        { path: '/customerAct/rankConf', name: '排行活动配置', component: CustomerRankConf,props: (route) => ({actCode:route.query.actCode,type:route.query.type})  },
        { path: '/customerAct/bindFanConf', name: '拉新设置', component: BindFanConf,},
        { path: '/customerAct/rebateMgr', name: '返佣设置', component: RebateMgr,},
        { path: '/customerAct', name: '数据', redirect: '/customerAct/scanCodeRankMgr'},
        { path: '/customerAct/scanCodeRankMgr', name: '扫码返现排名', component: ScanCodeRankMgr,},
        { path: '/customerAct/scanCodeListMgr', name: '扫码返现列表', component: ScanCodeListMgr,},
        { path: '/customerAct/setting', name: '零售户设置', component: CustomerSetting,},
        { path: '/customerAct/redpackListMgr', name: '红包提现', component: CustomerRedpackListMgr,},
        { path: '/customerAct/pointsListMgr', name: '积分提现', component: CustomerPointsListMgr,},
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
