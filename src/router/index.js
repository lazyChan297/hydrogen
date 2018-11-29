import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('@/components/Index')), 'Index')
const ShopIndex = r => require.ensure([], () => r(require('@/components/shop/Index')), 'ShopIndex')
const UserIndex = r => require.ensure([], () => r(require('@/components/UserIndex')), 'UserIndex')
const Hydrogen = r => require.ensure([], () => r(require('@/components/Hydrogen')), 'Hydrogen')
const My = r => require.ensure([], () => r(require('@/components/My')), 'My')
const Setting = r => require.ensure([], () => r(require('@/components/Setting')), 'Setting')
const Message = r => require.ensure([], () => r(require('@/components/Message')), 'Message')
const ModifyMobile = r => require.ensure([], () => r(require('@/components/ModifyMobile')), 'ModifyMobile')
const Cart = r => require.ensure([], () => r(require('@/components/ShopCart')), 'Cart')
const GoodsDetail = r => require.ensure([], () => r(require('@/components/GoodsDetail')), 'GoodsDetail')
const MyOrder = r => require.ensure([], () => r(require('@/components/MyOrder')), 'MyOrder')
const Express = r => require.ensure([], () => r(require('@/components/Express')), 'Express')
const PostRating = r => require.ensure([], () => r(require('@/components/PostRating')), 'PostRating')
const DeliveryManage = r => require.ensure([], () => r(require('@/components/DeliveryManage')), 'DeliveryManage')
const DeliveryDetail = r => require.ensure([], () => r(require('@/components/DeliveryDetail')), 'DeliveryDetail')
const OrderDetail = r => require.ensure([], () => r(require('@/components/OrderDetail')), 'OrderDetail')
const GoodsPayment = r => require.ensure([], () => r(require('@/components/GoodsPayment')), 'GoodsPayment')
const CrazyBuying = r => require.ensure([], () => r(require('@/components/CrazyBuying')), 'CrazyBuying')
const Winners = r => require.ensure([], () => r(require('@/components/Winners')), 'Winners')
const WinningPrize = r => require.ensure([], () => r(require('@/components/WinningPrize')), 'WinningPrize')
const AgentPurchase = r => require.ensure([], () => r(require('@/components/AgentPurchase')), 'AgentPurchase')
const RechargeList = r => require.ensure([], () => r(require('@/components/RechargeList')), 'RechargeList')
const RechargeBalance = r => require.ensure([], () => r(require('@/components/RechargeBalance')), 'RechargeBalance')
const RechargeRecord = r => require.ensure([], () => r(require('@/components/RechargeRecord')), 'RechargeRecord')
const AgentApply = r => require.ensure([], () => r(require('@/components/AgentApply')), 'AgentApply') 
const Agentors = r => require.ensure([], () => r(require('@/components/Agentors')), 'Agentors')
const AgentorsCapitalDetail = r => require.ensure([], () => r(require('@/components/AgentorsCapitalDetail')), 'AgentorsCapitalDetail')
const ApplyList = r => require.ensure([], () => r(require('@/components/ApplyList')), 'ApplyList')  
const ArticleDetail = r => require.ensure([], () => r(require('@/components/ArticleDetail')), 'ArticleDetail') 
const ApplyInfo = r => require.ensure([], () => r(require('@/components/ApplyInfo')), 'ApplyInfo') 
const ApplyResult = r => require.ensure([], () => r(require('@/components/ApplyResult')), 'ApplyResult')
const UserPublishingCase = r => require.ensure([], () => r(require('@/components/UserPublishingCase')), 'UserPublishingCase')
const Distributor = r => require.ensure([], () => r(require('@/components/Distributor')), 'Distributor')
const AccumulativeCustomer = r => require.ensure([], () => r(require('@/components/AccumulativeCustomer')), 'AccumulativeCustomer')
const QuasiCustomer = r => require.ensure([], () => r(require('@/components/QuasiCustomer')), 'QuasiCustomer')
const CustomerDetail = r => require.ensure([], () => r(require('@/components/CustomerDetail')), 'CustomerDetail')
const IncomeList = r => require.ensure([], () => r(require('@/components/IncomeList')), 'IncomeList')
const BindPhone = r => require.ensure([], () => r(require('@/components/BindPhone')), 'BindPhone')
const Status = r => require.ensure([], () => r(require('@/components/Status')), 'Status')
const MarketingQrcode = r => require.ensure([], () => r(require('@/components/MarketingQrcode')), 'MarketingQrcode')
const MarketingConfirm = r => require.ensure([], () => r(require('@/components/MarketingConfirm')), 'MarketingConfirm')
const DataReport = r => require.ensure([], () => r(require('@/components/DataReport')), 'DataReport')
const PurchaseCenter = r => require.ensure([], () => r(require('@/components/PurchaseCenter')), 'PurchaseCenter')
const ReplenishmentCenter = r => require.ensure([], () => r(require('@/components/ReplenishmentCenter')), 'ReplenishmentCenter')
const AgentOrder = r => require.ensure([], () => r(require('@/components/AgentOrder')), 'AgentOrder')
const SupplyConfirm = r => require.ensure([], () => r(require('@/components/SupplyConfirm')), 'SupplyConfrim')
const AgentOrderDetail = r => require.ensure([], () => r(require('@/components/AgentOrderDetail')), 'AgentOrderDetail')
const JoinChat = r => require.ensure([], () => r(require('@/components/JoinChat')), 'JoinChat')

/*
* 公众号菜单链接
*/
const About = r => require.ensure([], () => r(require('@/components/About')), 'About')
const WechatPublicQrCode = r => require.ensure([], () => r(require('@/components/WechatPublicQrCode')), 'WechatPublicQrCode')
const Investment = r => require.ensure([], () => r(require('@/components/Investment')), 'Investment')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '氢链'
      }
    },
   	{
      path: '/shop/index',
      name: 'ShopIndex',
      component: ShopIndex,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/user/index',
      name: 'UserIndex',
      component: UserIndex,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/user/publishingCase',
      name: 'UserPublishingCase',
      component: UserPublishingCase,
      meta: {
        title: '主页编辑'
      }
    },
    {
      path: '/distributor',
      name: 'Distributor',
      component: Distributor,
      meta: {
        title: '分销员中心'
      }
    },
    {
      path: '/distributor/customer/accumulative',
      name: 'AccumulativeCustomer',
      component: AccumulativeCustomer,
      meta: {
        title: '累计客户'
      }
    },
    {
      path: '/distributor/customer/quasi',
      name: 'QuasiCustomer',
      component: QuasiCustomer,
      meta: {
        title: '准客户'
      }
    },
    {
      path: '/distributor/customer/detail',
      name: 'CustomerDetail',
      component: CustomerDetail,
      meta: {
        title: '客户明细'
      }
    },
    {
      path: '/distributor/incomeList',
      name: 'IncomeList',
      component: IncomeList,
      meta: {
        title: '收益明细'
      }
    },
    {
      path: '/distributor/orderList',
      name: 'DistributorOrders',
      component: IncomeList,
      meta: {
        title: '全部订单'
      }
    },
    {
    	path: '/hydrogen',
      name: 'Hydrogen',
      component: Hydrogen,
      meta: {
        title: '氢链'
      }
    },
    {
    	path: '/my',
      name: 'My',
      component: My,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/my/message',
      name: 'Message',
      component: Message,
      meta: {
        title: '我的消息'
      }
    },
    {
      path: '/my/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        title: '个人设置'
      }
    },
    {
      path: '/my/setting/mobile/:type',
      name: 'ModifyMobile',
      component: ModifyMobile,
      meta: {
        title: '修改手机号'
      },
    },
    {
    	path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        title: '购物车'
      }
    },
    {
    	path: '/goods/detail',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
    	path: '/my/order',
      name: 'MyOrder',
      component: MyOrder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/my/order/rating',
      name: 'PostRating',
      component: PostRating,
      meta: {
        title: '发表评价'
      }
    },
    {
      path: '/delivery/order',
      name: 'DeliveryManage',
      component: DeliveryManage,
      meta: {
        title: '发货管理'
      }
    },
    {
      path: '/delivery/detail',
      name: 'DeliveryDetail',
      component: DeliveryDetail,
      meta: {
        title: '发货'
      }
    },
    {
  		path: '/:type/order/detail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '订单详情'
      }
  	},
    {
      path: '/order/express',
      name: 'Express',
      component: Express,
      meta: {
        title: '物流信息'
      }
    },
  	{
  		path: '/:type/payment',
      name: 'GoodsPayment',
      component: GoodsPayment,
      meta: {
        title: '订单结算'
      }
  	},
    {
      path: '/crazyBuying',
      name: 'CrazyBuying',
      component: CrazyBuying,
      meta: {
        title: '好货0元抢'
      }
    },
    {
      path: '/winners',
      name: 'Winners',
      component: Winners,
      meta: {
        title: '获奖名单'
      }
    },
    {
      path: '/winningPrize',
      name: 'WinningPrize',
      component: WinningPrize,
      meta: {
        title: '好货0元抢'
      }
    },
    {
      path: '/agentPurchase',
      name: 'AgentPurchase',
      component: AgentPurchase,
      meta: {
        title: '代理商订货'
      }
    },
    {
      path: '/recharge/list',
      name: 'RechargeList',
      component: RechargeList,
      meta: {
        title: '余额充值'
      }
    },
    {
      path: '/recharge/Balance',
      name: 'RechargeBalance',
      component: RechargeBalance,
      meta: {
        title: '余额充值'
      }
    },
    {
      path: '/recharge/record',
      name: 'RechargeRecord',
      component: RechargeRecord,
      meta: {
        title: '充值记录'
      }
    },
    {
      path: '/agentApply',
      name: 'AgentApply',
      component: AgentApply,
      meta: {
        title: '代理商申请'
      }
    },
    {
      path: '/agentors',
      name: 'Agentors',
      component: Agentors,
      meta: {
        title: '代理商中心'
      }
    },
    {
      path: '/agentors/capital/detail',
      name: 'AgentorsCapitalDetail',
      component: AgentorsCapitalDetail,
      meta: {
        title: '明细'
      }
    },
    {
      path: '/applyList',
      name: 'ApplyList',
      component: ApplyList,
      meta: {
        title: '申请列表'
      }
    },
    {
      path: '/applyInfo',
      name: 'ApplyInfo',
      component: ApplyInfo,
      meta: {
        title: '代理商审核'
      }
    },
    {
      path: '/applyResult',
      name: 'ApplyResult',
      component: ApplyResult,
      meta: {
        title: '申请结果'
      }
    },
    {
      path: '/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/bindPhone',
      name: 'BindPhone',
      component: BindPhone,
      meta: {
        title: '绑定手机号'
      }
    },
    {
      path: '/:type/status',
      name: 'Status',
      component: Status,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/marketing/qrcode',
      name: 'MarketingQrcode',
      component: MarketingQrcode,
      meta: {
        title: '推广二维码'
      }
    },
    {
      path: '/marketing/confirm',
      name: 'MarketingConfirm',
      component: MarketingConfirm,
      meta: {
        title: '推广邀请'
      }
    },
    {
      path: '/dataReport',
      name: 'DataReport',
      component: DataReport,
      meta: {
        title: '代理商数据报告'
      }
    },
    {
      path: '/purchaseCenter',
      name: 'PurchaseCenter',
      component: PurchaseCenter,
      meta: {
        title: '进货中心'
      }
    },
    {
      path: '/replenishmentCenter',
      name: 'ReplenishmentCenter',
      component: ReplenishmentCenter,
      meta: {
        title: '补货中心'
      }
    },
    {
      path: '/:type/order',
      name: 'AgentOrder',
      component: AgentOrder,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/:type/confirm',
      name: 'SupplyConfirm',
      component: SupplyConfirm,
      meta: {
        title: '订单确认'
      }
    },
    {
      path: '/agent/:type/order/detail',
      name: 'AgentOrderDetail',
      component: AgentOrderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/qrcode',
      name: 'WechatPublicQrCode',
      component: WechatPublicQrCode,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/investment',
      name: 'Investment',
      component: Investment,
      meta: {
        title: '氢链'
      }
    },
    {
      path: '/joinChatCode',
      name: 'JoinChatCode',
      component: JoinChat,
      meta: {
        title: '氢链'
      }
    }
  ]
})
