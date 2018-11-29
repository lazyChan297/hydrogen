<template>
	<div v-if="loaded">
    <div class="goodsPicWrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in goodsDetail.imgs" :key="index">
          <div class="img-holder"><img class="obj-cover" :src="item.img"></div>
        </swiper-slide>
        <div class="swiper-pagination page-nub" slot="pagination"></div>
      </swiper>
    </div>

    <div class="detail-part detail-head">
      <div class="detail-head-info bottom-1px">
        <div class="detail-head-flex">
          <div class="price">¥{{ goodsDetail.price | toDecimal }}</div>
        </div>
        <div class="goods-name">{{ goodsDetail.name }}</div>
      </div> 
      <div class="labels">
        <div class="label-item">
          <span class="iconfont">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gouxuan"></use>
            </svg>
          </span>全场包邮(不含西藏新疆港澳台)
        </div>
      </div>
    </div>
    <div class="height-10px"></div>
    <div style="height: 44px;">
      <sticky :check-sticky-support="false" :offset="0">
        <tab :line-width=1 active-color="#e02e24">
          <tab-item :selected="nowLabel === item" v-for="(item, index) in tabLabels" @click.native="tabToggle(item,index)" :key="index">{{item}}<span v-if="index === 0">({{ totalComments <= 999 ? totalComments: '999+'}})</span></tab-item>
        </tab>
      </sticky>
    </div>
    <div v-if="nowIndex == 0" style="background: #fff">
      <!-- 商品评价 -->
      <div class="detail-part" v-if="comments.length > 0">
        
        <div class="comments-container">
          <!-- 评论列表模板 -->
          <div class="comments-list">
            <comments 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10" 
            @changeComments="changeComments" 
            :comments="comments"></comments>        
          </div>  
          <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
            <div v-show="loading && comments.length > 0" class="loading-more">
              <inline-loading></inline-loading><span class="loading-text">加载中...</span>
            </div>
            <load-more v-if="nomore" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
          </div>
        </div>
      </div>
      <div v-else class="no-comments">暂无更多评论~</div>
    </div>
    <div v-if="nowIndex == 1">
      <!-- 商品详情 -->
      <div class="detail-part">
        <div class="detail-content" v-html="goodsDetail.details"></div>
      </div>
    </div>

    <!-- 底部浮动按钮 -->
    <div class="cart-concert-wrapper">
      <div class="cart-concert-btm">
        <div class="concern-cart">
          <router-link class="concern-item" :to="{ path: '/' }" bindtap="toIndex">
            <div class="iconfont">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye"></use>
              </svg>
            </div>
            <span>首页</span>
          </router-link>
          <router-link class="concern-item" :to="{ path: '/cart' }">
            <div class="iconfont">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gouwuchezhengchang"></use>
              </svg>
              <div class="badge">{{ cartLen }}</div>
            </div>
            <span>购物车</span>
          </router-link>
        </div>
        <div class="action-btn">
          <div v-if="!disableCart" @click="addCart" class="yellow-color add_cart">加入购物车</div>
          <div @click="toogleChoosePen" class="red-color buy_product">立即购买</div>
        </div>
      </div>
    </div>

    <!-- 选择商品数量 -->
    <transition name="slide-top">
      <div class="popup-modal" v-if="isShow">
        <div class="choose-goods">
          <div @click="toogleChoosePen" class="close-modal">
            <x-icon type="ios-close-outline" size="24" fill="#e02e24"></x-icon>
          </div>
          <div class="choose-goods-container">

            <div class="show-goods bottom-1px">
              <div class="goods-cover">
                <div class="img-holder"><img :src="goodsDetail.imgs[0].img" /></div>
              </div>
              <div class="goods-info">
                <div class="name">{{ goodsDetail.name }}</div>
                <div class="price">¥ {{ goodsDetail.price | toDecimal }}</div>
              </div>
            </div>
            <div class="choose-acttion">
              <div class="choose-acttion-fl">
                <span class="text">数量</span>
                <cartcontrol @decrease="cartChange" @add="cartChange" :count="count"></cartcontrol>
              </div>
              <div class="total-price">总计：<span>¥{{ totalPrice | toDecimal }}</span></div>

            </div>
            <button @click="toCheckout" class="buy">确定</button>
          </div>
        </div>
      </div>
     </transition> 
    <!-- mask -->
    <transition name="fade">
      <div class="mask" v-if="isShow" @click="toogleChoosePen"></div>
    </transition>
    <!-- 临时显示的评价按钮 -->
    <router-link class="toRating" :to="{ path: '/my/order/rating', query: { orderNo: 88888888, id: goodsDetail.id  } }" tag="div">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangji"></use>
      </svg>
    </router-link>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from 'vuex'
import { Group, Cell, XButton, Sticky, Tab, TabItem, InlineLoading, LoadMore } from 'vux' 
import Cartcontrol from '@/components/public/Cartcontrol'
import Comments from '@/components/public/Comments'
import { toDecimal, getDateDiff, setStore } from '@/utils/mUtils'
import http from '@/utils/http'

export default {
  components: {
    swiper,
    swiperSlide,
    Cartcontrol,
    Comments,
    Group,
    Cell,
    XButton,
    Sticky,
    Tab,
    TabItem,
    InlineLoading,
    LoadMore
  },
	data () {
		return {
      nowIndex: 0,
      tabLabels: ['商品评价', '商品详情'],
      nowLabel: '商品评价',
      loaded: false,
      // 幻灯片的配置项
      swiperOption: {
        notNextTick: true,
        pagination: '.swiper-pagination',
        paginationType : 'fraction',
        paginationClickable: true,
        loop: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false      
      },
      isShow: false,
      count: 1,
			goodsDetail: {},
      totalComments: 0,
      comments: [],
      page: 1,
      loading: true,
      nomore: false,
      disableCart: false
		}
	},
  computed: {
    ...mapGetters(['cartLen', 'userInfo']),
    totalPrice () {
      return this.goodsDetail.price * this.count
    }
  },
  methods: {
    // 上拉加载评论列表
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getComments()
        }, 500)
      }      
    },
    ...mapActions(['getCartLen']),
    changeComments (val) {
      this.comments = val
    },
    tabToggle (item, index) {
      this.nowLabel = item
      this.nowIndex = index
    },
    toogleChoosePen () {
      this.isShow = !this.isShow
    },
    // 获取选择的商品数量
    cartChange (val) {
      this.count = val.count
    },
    // 加入购物车
    addCart () {
      let str = JSON.stringify({ "goods": [{ "goodsId": this.goodsDetail.id, "quantity": 1 }] });
      http.post('/cart', { cart: str, isHideLoad: true }, false, res => {
        if (res.status == 1) {
          this.getCartLen()
          this.$vux.toast.show({
            text: '加入购物车成功~',
            type: 'success',
            width: 'auto',
            position: 'middle'
          })
        }
      })
    },
    // 去结算
    toCheckout () {
      let str = JSON.stringify({ "goods": [{ "goodsId": this.goodsDetail.id, "quantity": this.count }], "type": 1 })
      http.post('/cart', { cart: str }, false, res => {
        if (res.status == 1) {
          this.getCartLen()
          window.location.href = global.serverHost + '/newCart/pay/#/goods/payment/'
        }
      })
    },
    // 获取详情
    getGoodsDetail () {
      let id = this.$route.query.id
      http.get('/goods/details', { id }, false, res => {
        if (res.status == 1) {
          this.loaded = true
          this.goodsDetail = res.data.goods
          let link = res.data.shareTimeline.link
          if (this.userInfo.distributor) {
            link = res.data.shareTimeline.link + `&type=share&userSn=${this.userInfo.userSn}`
          } 
          this.$wechat.ready(() => {
            this.$wechat.onMenuShareTimeline({
              title: res.data.shareTimeline.title,
              link,
              imgUrl: res.data.shareTimeline.imgUrl,
              success: function () { 

              },
              cancel: function () { 
                
              }
            })

            this.$wechat.onMenuShareAppMessage({
              title: res.data.shareAppMessage.title, // 分享标题
              desc: res.data.shareAppMessage.desc, // 分享描述
              link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: res.data.shareAppMessage.imgUrl, // 自定义图片
            })
          })
        }
      })
    },
    // 获取商品评论
    getComments () {
      let params = {
        goodsId: this.$route.query.id,
        page: this.page,
        number: 5
      }
      http.get('/comment/getDetailsByGoods', params, false, res => {
        if (res.status == 1 && res.data.comments.length > 0) {
          this.totalComments = res.data.totalComments
          let comments = res.data.comments
          comments.forEach(item => {
            item.recomment.map(n => {
              n.finishedTime = n.finishedTime * 1000
              n.recommentedTime = n.recommentedTime * 1000
              return n.time = getDateDiff(n.finishedTime, n.recommentedTime) 
            })
          })
          this.comments = this.comments.concat(comments)
          this.page ++
          this.loading = false
          this.nomore = false
        }else {
          this.loading = false
          this.nomore = true
          return
        }
      })
    },
    // 当用户访问分销商的主页时，记录用户的访问
    userAddViewer (userSn) {
      let params = {
        distributor: userSn
      }
      http.post('/users/addViewer', params, false, res => {
        if (res.status == 1) {
          // ...
        }
      })    
    }
  },
  mounted () {
    this.getGoodsDetail()
    this.getComments()
    this.getCartLen()
    if (this.$route.query.userSn) {
      this.disableCart = true
      setStore('userSn', this.$route.query.userSn)
      this.userAddViewer(this.$route.query.userSn)
      let params = {
        distributor: this.$route.query.userSn
      }
      http.post('/users/setDistributor', params, false, res => {
        if (res.status == 1) {
          // ...
        }
      })
    }
    if (this.$route.query.userSn && this.$route.query.type == 'share') {
      setStore('userSn', this.$route.query.userSn)
    }
  },
  filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  }
}	
</script>

<style scoped>
.goodsPicWrapper {
  position: relative;
}
.swiper-pagination {
  bottom: 3px !important;
}
.swiper-pagination-bullet {
  border: 1px solid #fff;
  opacity: 1 !important;
  margin: 0 3px !important;
  background: transparent !important;
}
.swiper-pagination-bullet-active {
  background: #fff !important;
}
.page-nub {
  position: absolute;
  bottom: 15px !important;
  right: 15px;
  left: auto !important;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, .3);
  border-radius: 100%;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  z-index: 99;
}
.detail-part {
  background: #fff;
}
.detail-part-title {
  padding: 8px 15px;
  display: flex;
  align-items: center;
}
.detail-part-title .text {
  flex: 1;
  font-size: 16px;
}
.view-more {
  color: #999;
}
.view-more .iconfont .icon {
  width: 16px;
  height: 16px;
}
.detail-head-info {
  padding: 10px 15px;
}
.detail-head-flex {
  display: flex;
}
.detail-head-flex .price {
  flex: 1;
  font-size: 20px;
  color: #e02e24;
  line-height: 20px;
  font-weight: 700;
}
.share-btn {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  line-height: normal;
  border: 0;
  background: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #787878;
}
.share-btn view {
  margin-right: 2px;
  color: #e02e24;
} 
.share-btn::after {
  border: 0;
}
.button-hover {
  background-color: none;
}
.goods-name {
  font-size: 14px;
  color: #333;
  font-size: 16px;
  line-height: 18px;
  padding-top: 8px;
}
.labels {
  padding: 5px 15px;
  color: #787878;
}
.labels .label-item {
  display: inline-block;
  margin-right: 8px;
}
.labels span .icon {
  width: 16px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  color: #e02e24;
  margin-right: 3px;
}

.cart-concert-wrapper {
  height: 46px;
}
.cart-concert-btm {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  max-width: 640px;
  z-index: 100;
  background: rgba(255, 255, 255, .95);
}
.concern-cart {
  flex: 0 0 auto;
  display: flex;
}
.action-btn {
  flex: 1;
  display: flex;
}
.concern-cart {
  border-top: 1px solid #f1f1f1;
}
.concern-item {
  min-width: 68px;
  flex: 1;
  text-align: center;
}
.concern-item .iconfont {
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin: 6px 0 2px 0;
  color: #333;
  font-size: 18px;
}
.concern-item span {
  font-size: 13px;
  color: #333;
  line-height: 13px;
  display: block;
}
.badge {
  display: block;
  position: absolute;
  right: -8px;
  top: -3px;
  line-height: 10px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  background: #f74c31;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-clip: padding-box;
  vertical-align: middle;
  padding: 3px 0 !important;
}
.action-btn div {
  flex: 1;
  font-size: 14px;
  color: #fff;
  text-align: center;
  height: 46px;
  line-height: 46px;
}
.yellow-color {
  background: #ffb03f;
}
.red-color {
  background: #e02e24;
}
.circle-container {
  display: flex;
  padding: 10px 15px;
}
.circle-item {
  flex: 1;
  text-align: center;
}
.circle-box {
  padding-bottom: 5px;
}
.circle-text {
  color: #999;
}
.canvas-circle {
  width: 72px;
  height: 72px;
  margin: 0 auto;
  font-size: 20px;
  line-height: 72px;
  text-align: center;
}
.detail-content {
  padding: 10px 15px;
  font-size: 14px;
  color: #666;
  line-height: 20px;
}
.wxParse-img {
  width: 100% !important;
  display: block;
}


.progress{
  width: 72px;
  height: 72px;
  line-height: 72px;
  background: none;
  margin: 0 auto;
  box-shadow: none;
  position: relative;
}
.progress .progress-left,
.progress .progress-right {
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
  
}
.progress .progress-left{
  left: 0;
}
.progress .progress-bar{
  width: 100%;
  height: 100%;
  background: none;
  border-width: 4px;
  border-style: solid;
  position: absolute;
  top: 0;
  box-sizing: border-box;
}
.progress .progress-left .progress-bar{
  left: 100%;
  border-top-right-radius: 72px;
  border-bottom-right-radius: 72px;
  border-left: 0;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.progress .progress-right{
  right: 0;
}
.progress .progress-right .progress-bar{
  left: -100%;
  border-top-left-radius: 72px;
  border-bottom-left-radius: 72px;
  border-right: 0;
  -webkit-transform-origin: center right;
  transform-origin: center right;
  
}
.progress .progress-value{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #ccc;
  font-size: 20px;
  line-height: 64px;
  text-align: center;
  position: absolute;
  top: 0;
  box-sizing: border-box;
}
.choose-goods {
  padding: 10px;
}
.choose-goods .close-modal {
  float: right; 
}
.choose-goods-container {
  clear: both;
}
.show-goods {
  display: flex;
  padding-bottom: 10px;
}
.show-goods .goods-cover {
  flex: 0 0 80px;
  width: 80px;
  margin-right: 8px;
}
.goods-cover .img-holder {
  padding-bottom: 100%;
}
.goods-info {
  flex: 1;
}
.goods-info .name {
  font-size: 14px;
  line-height: 18px;
  min-height: 36px;
  margin-bottom: 8px;
}
.goods-info .price {
  font-size: 20px;
  color: #e02e24;
}
.choose-acttion {
  display: flex;
  align-items: center;
  padding: 15px 0;
}
.choose-acttion-fl {
  flex: 1;
  display: flex;
  align-items: center;
}
.choose-acttion-fl .text {
  margin-right: 8px;
}
.total-price span {
  color: #e02e24;
}
.buy {
  position:relative;
  width: 100%;
  display:block;
  margin-left:auto;
  margin-right:auto;
  padding-left:14px;
  padding-right:14px;
  box-sizing:border-box;
  font-size:18px;
  text-align:center;
  text-decoration:none;
  line-height:2.55555556;
  -webkit-tap-highlight-color:transparent;
  overflow:hidden;
  background: #e02e24;
  color: #fff;
  border-radius: 50px;
  outline: none;
}
.buy::after {
  border: 0;
}
.popup-modal {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.slide-top-enter-active {
  transition: all .3s;
  transform: translateY(0);
}
.slide-top-leave-active {
  transition: all .3s;
  transform: translateY(100%);
}
.slide-top-enter,
.slide-top-leave {
  transform: translateY(100%);
}
.fade-enter-active {
  transition: all .3s;
  opacity: 1;
}
.fade-leave-active {
  transition: all .3s;
  opacity: 0;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  background: rgba(0, 0, 0, .5);
  z-index: 104;
}
.toRating {
  position: fixed;
  bottom: 56px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: linear-gradient(90deg, rgb(255, 39, 25), rgb(255, 97, 173));
  text-align: center;
  line-height: 46px;
  z-index: 99;
}
.toRating .icon {
  fill: #fff;
}
.no-comments {
  color: #999;
  text-align: center;
  padding: 10% 15px;
}
</style>