<template>
	<div>
  	<div class="order-nav-wrapper">
			<div class="my-order-nav bottom-1px">
				<div @click="toggleOrderTab(0)" class="order-nav-item" :class="{ active: type == 0 }">
					<span>全部</span>
				</div>
				<div @click="toggleOrderTab(1)" class="order-nav-item" :class="{ active: type == 1 }">
					<span>待发货</span>
				</div>
				<div @click="toggleOrderTab(2)" class="order-nav-item" :class="{ active: type == 2 }">
					<span>待收货</span>
				</div>
		    <div @click="toggleOrderTab(3)" class="order-nav-item" :class="{ active: type == 3 }">
		    	<span>待评价</span>
		    </div>
			</div>
		</div>
		<!-- 订单列表 -->

    <div class="order-part order-list-warpper"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
			<router-link class="order-item" v-for="(item,index) in orderData" :key="index" :to="{ path: '/my/order/detail', query: { orderNo: item.orderNo } }" tag="div">
				<div class="status">
					<span>状态</span>
					<span class="color-pink">{{ item.status }}</span>
				</div>
				<div class="goods">
					<div class="goods-item" v-for="(goods, i) in item.goods" :key="i">
						<div class="goods-img">
							<span class="img-holder">
								<img class="obj-cover" :src="goods.img">
							</span>
						</div>
						<div class="goods-content">
							<h4 class="goods-name">{{ goods.name }}</h4>
						</div>
						
						<div>
							<span v-if="item.status !== '确认收货'" class="quantity">X{{ goods.quantity }}</span>
							<router-link v-if="item.status == '确认收货'" :to="{ path: '/my/order/rating', query: { orderNo: item.orderNo, id: goods.id } }" class="to-rating" tag="span">评价</router-link>
              <router-link v-if="item.status == '已评价'" :to="{ path: '/my/order/rating', query: { orderNo: item.orderNo, id: goods.id } }" class="to-rating" tag="span">追评</router-link>
						</div>
					</div>
				</div>
				<div class="order-total">
					<span>实付款</span>
					<span class="color-pink">￥{{ item.amount }}</span>
				</div>
			</router-link>
    </div>
    <!-- 无数据 -->
    <no-result v-if="orderData.length == 0" :height="{ height: 'calc(100% - 86px)' }"></no-result>
    <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
      <div v-show="loading && orderData.length > 0" class="loading-more">
        <inline-loading></inline-loading><span class="loading-text">加载中...</span>
      </div>
      <load-more v-if="nomore && orderData.length > 0" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
    </div>
  </div>
</template>

<script>
import { LoadMore, InlineLoading } from 'vux'		
import http from '@/utils/http'
import NoResult from '@/components/public/NoResult'

export default {
	components: {
    NoResult,
    LoadMore,
    InlineLoading
  },
	data () {
		return {
			type: 0,
			page: 1,
			number: 5,
			loading: true,
			nomore: false,
			orderData: []
		}
	},
	methods: {
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getOrderList(this.type)
        }, 500)
      } 
		},
		toggleOrderTab (type) {
			this.type = type
			this.page = 1
			this.orderData = []
    	this.$router.push({ path: '/my/order', query: { type: type } })
		},
		getOrderList (type) {
			let method = type;
			// 初始化数据
	    switch (String(method)) {
	      case '0':
	        method = 'all'
	        break;
	      case '1':
	        method = 'unshipped'
	        break;
	      case '2':
	        method = 'shipped'
	        break;
	      case '3':
	        method = 'done'
	        break;
	    }
	    let params = {
	    	page: this.page,
	    	number: this.number
	    }
			http.get('/orders/' + method, params, false, res => {
				if (res.status == 1 && res.data.length > 0) {
					let orderData = JSON.parse(JSON.stringify(res.data))
					orderData.map(item => {
						switch (item.status) {
	            case 0:
	              item.status = '未支付'
	              break;
	            case 1:
	              item.status = '确认收货'
	              break;
	            case 2:
	              item.status = '已付款'
	              break;
	            case 3:
	              item.status = '已发货'
	              break;
	            case 8:
	              item.status = '已评价'
	              break;  
	          }
	          return item
					})
					this.orderData = this.orderData.concat(orderData)
					this.page ++
					this.loading = false
					if (res.data.length < this.number) {
						this.nomore = true
					}else {
						this.nomore = false
					}
				}else {
					this.loading = false
          this.nomore = true
          return
				}
			})
		}
	},
	watch: {
  	$route () {
  		this.type = this.$route.query.type
  		this.getOrderList(this.type)
  	}
  },
	mounted () {
		this.type = this.$route.query.type
    this.getOrderList(this.type)
	}
}	
</script>

<style scoped>
.order-nav-wrapper {
	height: 45px;
}
.my-order-nav {
	position: fixed;
	top: 0;
	width: 100%;
	max-width: 640px;
	display: flex;
	background: #fff;
	z-index: 98;
}
.my-order-nav::after {
  bottom: -2px;
}
.order-nav-item {
	flex: 1;
	text-align: center;
}
.order-nav-item span {
	position: relative;
	display: inline-block;
	font-size: 16px;
	padding: 10px 0;
	color: #333;
}
.order-nav-item.active span {
	color: #FF7584; 
}
.order-nav-item.active span:after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 2px;
	background: #FF7584;
	z-index: 5;
}
.order-item {
	position: relative;
	background: #fff;
	margin-top: 10px;
	border-top: 1px solid #e2e2e2;
	border-bottom: 1px solid #e2e2e2;
}

.status {
	padding: 10px 15px;
	border-bottom: 1px solid #e2e2e2;
	display: flex;
	justify-content: space-between;
}
.color-pink {
	color: #FF7584;
}
.goods-item {
	display: flex;
	align-items: center;
	padding: 10px 15px;
	border-bottom: 1px solid #e2e2e2;
}
.goods-item .goods-img {
	flex: 0 0 60px;
	width: 60px;
	height: 60px;
	margin-right: 10px;
	box-shadow: 0 14px 14px -8px rgba(242,251,255,1);
}
.goods-content {
	flex: 1;
	padding-right: 10px;
}
.goods-content .goods-name {
	color: #38393C;
	padding-bottom: 2px;
	line-height: 18px;
}
.goods-content p {
	font-size: 12px;
	color: #9B9B9B;
	line-height: 17px;
}
.order-total {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
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

.to-rating {
  display: block;
	background: #FF7584;
	color: #fff;
	padding: 4px 15px;
	border-radius: 3px;
	font-size: 12px;
}
</style>