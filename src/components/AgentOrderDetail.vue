<template>
	<div v-if="orderDetail">
		<div class="status">
			<span>状态</span>
			<span class="color-blue">{{ orderDetail.status }}</span>
		</div>
		<div v-if="orderDetail.lastExpressInfo.context" style="height: 10px"></div>
		<router-link v-if="orderDetail.lastExpressInfo.context" :to="{ path: '/order/express', query: { orderNo: orderDetail.no, type: 'replenishment' } }"  class="express detail-part" tag="div">
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
    <!-- 商品 -->
    <div class="goods-wrapper">
    	<div class="goods-item" v-for="(goods,i) in orderDetail.goods">
				<div class="goods-img">
					<span class="img-holder">
						<img class="obj-cover" :src="goods.img">
					</span>
				</div>
				<div class="goods-content">
					<h4 class="goods-name">{{ goods.name }}</h4>
					<span class="price">¥{{ goods.price }}</span>
				</div>
				<span class="quantity">x{{ goods.quantity }}</span>
			</div>
			<div v-if="type == 'purchase'" class="params">
				<div class="params-part">
					<span>总计</span>
					<span>￥368.00</span>
				</div>
				<div class="params-part">
					<span>运费</span>
					<span class="color-pink">￥0.00</span>
				</div>
				<div class="params-part">
					<span>实付款</span>
					<span class="color-pink">￥368.00</span>
				</div>
			</div>
    </div>
    <div class="height-10px"></div>
		<div class="order-number">
			<div class="order-nb">订单编号：<span>{{ orderDetail.orderNo }}</span></div>
			<div>下单时间：<span>{{ orderDetail.replenishedAt }}</span></div>
			<button v-clipboard:copy="orderDetail.orderNo" v-clipboard:success="onCopy" class="copy-order-number">复制</button>
		</div>
	</div>
</template>

<script>
import http from '@/utils/http'

export default {
	data () {
		return {
			orderDetail: null
		}
	},
	computed: {
		type () {
			return this.$route.params.type
		}
	},
	methods: {
		onCopy (e) {
      this.$vux.toast.show({
      	type: 'success',
        text: '复制成功！',
        width: 'auto',
        position: 'middle'
      })
    },
		getOrderDetail () {
			let params = {
				no: this.$route.query.no
			}
			http.get('/order/details ', params, false, res => {
				if (res.status == 1) {
					let orderDetail = res.data;
	        switch (orderDetail.status) {
	          case 1:
	            orderDetail.status = '已完成'
	            break
	          case 2:
	            orderDetail.status = '待发货'
	            break
	          case 3:
	            orderDetail.status = '待收货'
	            break
	        }; 
	        this.orderDetail = orderDetail
					}
			})
		}
	},
	mounted () {
		this.getOrderDetail()
	}
}	
</script>

<style scoped>
.status {
	padding: 12px 15px;
	display: flex;
	justify-content: space-between;
	background: #fff;
}
.color-blue {
	color: #71ABFD;
}	
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
.part-default {
  flex: 1;
  padding-left: 8px;
}
.part-default .text-large {
  font-size: 14px;
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
.ftime {
	font-size: 12px;
	color: #9B9B9B;
	padding-top: 3px;
}
.goods-wrapper {
	background: #fff;
}
.goods-item {
	display: flex;
	padding: 15px;
	align-items: center;
}
.goods-img {
	flex: 0 0 80px;
	width: 80px;
	height: 80px;
	margin-right: 10px;
}
.goods-content {
	flex: 1;
}
.goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
}
.price {
	font-size: 12px;
	color: #9B9B9B;
}
.quantity {
	font-size: 14px;
	color: #9B9B9B;
}
.params-part {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	border-top: 1px solid #e2e2e2;
}
.color-blue {
	color: #71ABFD ;
}
.color-pink {
	color: #FF7584;
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
</style>