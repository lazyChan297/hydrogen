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
		    	<span>已完成</span>
		    </div>
			</div>
		</div>
		<div class="order-list-warpper"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
			<router-link :to="{ path: jumpPath, query: { no: item.orderNo } }" v-for="(item,index) in orderData" :key="index" class="order-item" tag="div">
				<div class="status">
					<span>状态</span>
					<span class="color-blue">{{ item.status }}</span>
				</div>
				<div class="goods-wrapper">
					<div class="goods-item" v-for="(goods, i) in item.goods" :key="i">
						<div class="goods-img">
							<span class="img-holder">
								<img class="obj-cover" :src="goods.img">
							</span>
						</div>
						<div class="goods-content">
							<h4 class="goods-name">{{ goods.name }}</h4>
							<span class="price">￥{{ goods.price }}</span>
						</div>
						<span class="quantity">x{{ goods.quantity }}</span>
					</div>
				</div>
				<div v-if="paramType == 'purchase'" class="order-total">
					<span>实付款</span>
					<span class="color-blue">￥368.00</span>
				</div>
				<!-- <div class="handle-btns">
					<router-link :to="{ path: '/express', query: { orderNo: item.no, type: 'replenishment' } }" class="view-express">查看物流</router-link>
				</div> -->
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
		LoadMore,
		InlineLoading,
		NoResult
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
	computed: {
		jumpPath () {
			return `/agent/${ this.$route.params.type }/order/detail`
		},
		paramType () {
			return this.$route.params.type
		}
	},
	methods: {
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getOrders()
        }, 500)
      } 
		},
		toggleOrderTab (type) {
			this.type = type
			this.page = 1
			this.orderData = []
    	this.$router.push({ path: this.$route.path, query: { type: type } })
		},
		getOrders () {
			let type = ''
			switch (parseInt(this.type)) {
				case 0:
					type = 0
					break;
				case 1:
					type = 2
					break;
				case 2:
					type = 3
					break;	
				case 3:
					type = 1
					break;					
			}		
					
			let params = {
				page: this.page,
				number: this.number,
				type: type
			}
			http.get('/agent/replenishOrders', params, false, res => {
				if (res.status == 1 && res.data.orders.length > 0) {
					let orderData = JSON.parse(JSON.stringify(res.data.orders))
					//1已完成;2待发货;3待收货
					orderData.map(item => {
						switch (item.status) {
	            case 1:
	              item.status = '已完成'
	              break;
	            case 2:
	              item.status = '待发货'
	              break;
	            case 3:
	              item.status = '待收货'
	              break;  
	          }
	          return item
					})
					this.orderData = this.orderData.concat(orderData)
					this.page ++
					this.loading = false
					if (res.data.orders.length < this.number) {
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
  		this.getOrders()
  	}
  },
	mounted () {
		this.type = this.$route.query.type
		if (this.paramType == 'replenishment') {
			this.getOrders()
		}		   
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
	color: #71ABFD; 
}
.order-nav-item.active span:after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 2px;
	background: #71ABFD;
	z-index: 5;
}	
.status {
	padding: 10px 15px;
	border-bottom: 1px solid #e2e2e2;
	display: flex;
	justify-content: space-between;
}
.color-blue {
	color: #71ABFD ;
}
.order-item {
	position: relative;
	background: #fff;
	margin-top: 10px;
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
.order-total {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	border-top: 1px solid #e2e2e2;
}
.handle-btns {
	padding: 10px 15px;
	text-align: right;
	border-top: 1px solid #e2e2e2;
}
.handle-btns span {
	display: inline-block;
	padding: 2px 10px;
	font-size: 14px;
	border-radius: 3px;
	margin-left: 5px;
}
.view-express {
	color: #9B9B9B;
	border: 1px solid #9B9B9B;
}
.delivery {
	color: #71ABFD;
	border: 1px solid #71ABFD;
}
</style>