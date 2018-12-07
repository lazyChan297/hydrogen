// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store/index'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AlertPlugin, AjaxPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin } from 'vux'
import { InfiniteScroll } from 'mint-ui'
import VueClipboard from 'vue-clipboard2'
import http from '@/utils/http'
import { checkToken, setStore, getStore, removeStore, getUrlParms } from '@/utils/mUtils'
import "./assets/stylus/index.styl"
import Vuelazyload from 'vue-lazyload'
// mint-ui按需引入组件
Vue.use(InfiniteScroll)

//图片懒加载
Vue.use(Vuelazyload, {
  // loading: require('common/image/default_pic.jpg')
})

// 调用微信jssdk
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

Vue.use(VueAwesomeSwiper)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)

Vue.use(VueClipboard)

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

console.log(process.env.NODE_ENV)
// 服务器地址
if (process.env.NODE_ENV == 'development') {
  // 开发环境
  global.serverHost = ""
}else{
  // 生产服务器
  // global.serverHost = "https://caomeng.me"
  // 测服务器
  global.serverHost = "https://ceshi168.caomeng.me"
}

FastClick.attach(document.body)

Vue.config.productionTip = false

let url = window.location.href

router.beforeEach((to, from, next) => {
  // 获取微信jssdk配置项
  http.post('/jsconfig', {
    url: encodeURI(location.href.split('#')[0]),
    isHideLoad: true
  }, false, res => {
    if (res.status == 1) {
      Vue.wechat.config(res.data.jsConfig)
    }
  })

	NProgress.start()
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.dispatch('updateDialogStatus', { isShowDialog: true })
  next()
})

checkToken(url)

let minHeight = document.documentElement.clientHeight
document.body.style.minHeight = minHeight + 'px'

// 初始化用户信息
if (global.token) {
  http.get('/users/info', {}, false, res => {
    if (res.status == 1) {
      store.dispatch('saveUserInfo', res.data.userInfo)
    }
  })
}

router.afterEach(() => {
  setTimeout(() => {
    store.dispatch('updateDialogStatus', { isShowDialog: false })
  }, 6000)
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
