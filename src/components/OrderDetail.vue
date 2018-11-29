<template>
	<div v-if="orderDetail">
    <div class="status">
      <span>状态</span>
      <span class="color-red">{{ orderDetail.status }}</span>
    </div>
    <div v-if="orderDetail.lastExpressInfo.context" style="height: 10px"></div>
    <router-link v-if="orderDetail.lastExpressInfo.context" :to="{ path: '/order/express', query: { orderNo: orderDetail.orderNo } }"  class="express detail-part bottom-1px" tag="div">
      <span class="iconfont ex-icon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daifahuo"></use>
        </svg>  
      </span>
      <div class="part-default">
        <div class="context">{{ orderDetail.lastExpressInfo.context }}</div>
        <p class="ftime">{{ orderDetail.lastExpressInfo.updatedAt }}</p>
      </div>
    </router-link>
    <div style="height: 10px"></div>
		<div class="address detail-part">
		  <span class="iconfont">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dizhi"></use>
        </svg>  
      </span>
		  <div class="part-default">
		    <div class="arrive text-large">{{ orderDetail.reciever }}，{{ orderDetail.mobile }}</div>
		    <div class="address-detail">{{ orderDetail.address }}</div>
		  </div>
		</div>
		<div class="height-10px"></div>
		<!-- 订单 -->
    <div class="order-part order-list-warpper">

      <div class="order-item">
        <div class="order-box-bd">
          <div class="order-box-block" v-for="(order,idx) in orderDetail.goods" :key="idx">
            <div class="order-cover">
              <img :src="order.img" />
            </div>
            <div class="order-content">
              <div class="order-name">{{ order.name }}</div>
              <div class="order-price">
                <div class="price">¥{{ order.price | toDecimal }}</div>
                <span class="count">{{ order.quantity }}件</span>
              </div>
          </div>
          </div>
        </div>
        
        <div class="params">
          <div class="params-part">
            <span>运费</span>
            <span class="color-red">￥0.00</span>
          </div>
          <div class="params-part">
            <span>实付款</span>
            <span class="color-red">￥{{ orderDetail.amount }}</span>
          </div>
          <div v-if="type == 'delivery'">
            <div class="params-part">
              <span>付款人</span>
              <div class="user">
                <span class="avatar">
                  <img :src="orderDetail.payerAvatar">
                </span>
                <span class="payer ellipsis">{{ orderDetail.payer }}</span>
              </div>
            </div>
            <div v-if="orderDetail.distributor" class="params-part">
              <span>分销员</span>
              <div class="user">
                <span class="avatar">
                  <img :src="orderDetail.distributorAvatar">
                </span>
                <span class="payer ellipsis">{{ orderDetail.distributor }}</span>
              </div>
            </div>
            <div v-if="orderDetail.agent" class="params-part">
              <span>代理商</span>
              <div class="user">
                <span class="avatar">
                  <img :src="orderDetail.agentAvatar">
                </span>
                <span class="payer ellipsis">{{ orderDetail.agent }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="height-10px"></div>
		<div class="order-number">
			<div class="order-nb">订单编号：<span>{{ orderDetail.orderNo }}</span></div>
			<div>下单时间：<span>{{ orderDetail.orderCreatedAt }}</span></div>
			<button v-clipboard:copy="orderDetail.orderNo" v-clipboard:success="onCopy" class="copy-order-number">复制</button>
		</div>
    <router-link class="to-index" :to="{ path: '/' }">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouye"></use>
      </svg>  
    </router-link>
    <div style="height: 10px"></div>
	</div>
</template>

<script>
import http from '@/utils/http'
import { toDecimal } from '@/utils/mUtils'

export default {
	data () {
		return {
			deliveryManage: true,
			type: '',
			orderDetail: null
		}
	},
	methods: {
    onCopy (e) {
      this.$vux.toast.show({
        text: '复制成功!',
        type: 'success',
        width: 'auto',
        position: 'middle'
      })
    }
	},
	mounted () {
		this.type = this.$route.params.type
		let method = ''
		if (this.type == 'delivery') {
      method = '/supplier'
    } else if (this.type == 'my') {
      method = '/orders'
    }
    http.get(method + '/details', { no: this.$route.query.orderNo }, false, res => {
      if (res.status == 1) {
        let orderDetail = res.data;
        switch (orderDetail.status) {
          case 0:
            orderDetail.status = '未支付'
            break
          case 1:
            orderDetail.status = '确认收货'
            break
          case 2:
            orderDetail.status = '已付款'
            break
          case 3:
            orderDetail.status = '已发货'
            break
        }; 
        this.orderDetail = orderDetail
      }
    })
	},
  filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  }
}	
</script>

<style scoped>
.detail-part {
  background: #fff;
}
.detail-part .iconfont {
  flex: 0 0 auto;
  font-size: 20px;
}
.express .iconfont {
  font-size: 16px;
  min-width: 20px;
}
.express {
  position: relative;
  display: flex;
  align-items: center;
  padding:12px 15px;
}
.express::after {
  content: '\e60b';
  position: absolute;
  right: 15px;
  color: #d2d2d2;
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.part-default {
  flex: 1;
  padding-left: 8px;
}
.part-default .text-large {
  font-size: 14px;
}
.address {
  position: relative;
  display: flex;
  align-items: center;
  padding:12px 15px;
}
.address-detail {
  color: #666;
}

.order-item {
	position: relative;
	background: #fff;
}
.order-item:after,
.order-item:before,
.order-info:after,
.order-info:before {
	content: " ";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.order-item:after,
.order-info:after {
	bottom: 0;
}
.order-item:before,
.order-info:before {
	top: -1px;
}
.status {
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  background: #fff;
}
.order-box-hd {
	display: flex;
  align-items: center;
	padding: 8px 15px;
}
.order-box-hd .title {
	flex: 1;
}
.order-status {
	color: #FF7584;
}
.order-box-bd {
	padding: 0 15px;
}
.order-box-block {
  display: flex;
  padding: 15px 0;
}
.order-box-bd .order-cover {
  flex: 0 0 70px;
	width: 70px;
	height: 70px;
	margin-right: 8px;
}
.order-box-bd .order-cover .img-holder {
	padding-bottom: 100%;
}
.order-content {
	flex: 1;
	overflow: hidden;
	color: #333;
}
.order-content .order-name,
.price {
  font-size: 14px;
  color: #333;
}
.order-content .order-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

}
.order-price {
	display: flex;
  align-items: center;
	color: #333;
  padding-top: 10px;
}
.order-price .price {
  flex: 1;
}
.order-price .count {
	color: #999;
	display: block;	
}
.order-btm-flex {
  display: flex;
  align-items: center;
	padding: 8px 15px;
}
.order-btm-flex .datetime {
  flex: 1;
	color: #999;
}
.params-part {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-top: 1px solid #e2e2e2;
}
.params-part span:first-child {
  flex: 0 0 auto;
}
.color-red {
  color: #FF7584;
}
.total-price {
  text-align: right;
  font-size: 14px;
}
.order-number {
	position: relative;
	background: #fff;
	padding: 10px 15px;
	color: #999;
	font-size: 13px;
}
.order-number .copy-order-number {
	position: absolute;
	right: 15px;
	top: 10px;
	font-size: 13px;
	color: #999;
	height: 24px;
	line-height: 24px;
	display:block;
	padding-left:14px;
	padding-right:14px;
	box-sizing:border-box;
	text-align:center;
	text-decoration:none;
	border-radius:5px;
	background: #f1f1f1;
	border: 1px solid #eaeaea;
  outline: none;
}
.delivery {
  padding: 10px 15px;
}

.back-index {
  position: fixed;
  bottom: 30px;
  right: 15px;
  z-index: 100;
  display: block;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: #fff;
  background: rgba(0, 0, 0, .5);
  border-radius: 100%;
  text-align: center;
  line-height: 40px;
}
.to-index {
  position: fixed;
  right: 15px;
  bottom: 56px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: rgba(0, 0, 0, .5);
  text-align: center;
  line-height: 40px;
}
.to-index .icon {
  fill: #fff;
}
.express {
  position: relative;
  background: #fff;
}
.express .part-default {
 padding-right: 15px;
}
.express:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 17px
}
.ex-icon {
  width: 20px;
  height: 20px;
}
.ex-icon .icon {
  width: 17px;
  height: 17px;
  fill: #38393C;
}
.ftime {
  font-size: 12px;
  color: #9B9B9B;
  padding-top: 3px;
}
.context {
  max-height: 40px;
  overflow: hidden;
  line-height: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #71ABFD; 
}
.user {
  display: flex;
  overflow: hidden;
  align-items: center;
}
.user .avatar {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 5px;
}
</style>