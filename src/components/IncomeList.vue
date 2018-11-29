<template>
	<div style="position: relative; height: 100%">
		<div class="header">
			<h2>{{ title }}</h2>
			<span @click="back" class="back">返回</span>
		</div>
		<div class="orders"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
			<div class="order-item" v-for="(item,index) in orders" :key="index">
				<div class="orderNo">订单编号：{{ item.orderNo }}</div>
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
						<span class="quantity">X{{ goods.quantity }}</span>
					</div>
				</div>
				<div class="order-total">
					<span>订单总价</span>
					<span>+￥{{ item.orderAmount }}</span>
				</div>
				<div class="income">
					<span>佣金</span>
					<b>+￥{{ item.bonus | toDecimal }}</b>
				</div>
				<div class="order-btm-flex">
					<p>{{ item.boughtAt }}</p>
					<p>{{ item.buyer }}</p>
				</div>
			</div>
		</div>
		<!-- 无数据 -->
    <no-result v-if="orders.length == 0" text="暂无更多数据~" :height="{ height: 'calc(100% - 150px)' }"></no-result>
    <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
      <div v-show="loading && orders.length > 0" class="loading-more">
        <inline-loading></inline-loading><span class="loading-text">加载中...</span>
      </div>
      <load-more v-if="nomore && orders.length > 0" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
    </div>
	</div>
</template>

<script>
import { LoadMore, InlineLoading } from 'vux'
import http from '@/utils/http'
import { toDecimal } from '@/utils/mUtils'
import NoResult from '@/components/public/NoResult'

export default {
	components: {
		NoResult,
		LoadMore,
		InlineLoading
	},
	data () {
		return {
			page: 1,
			number: 5,
			loading: true,
			nomore: false,
			orders: []
		}
	},
	computed: {
		title () {
			if (this.$route.path == '/distributor/orderList') {
				return '全部订单'
			}else if (this.$route.path == '/distributor/incomeList') {
				return '收益明细'
			}

		}
	},
	methods: {
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getIncomeList()
        }, 500)
      } 
    },
		back () {
			this.$router.go(-1)
		},
		// 收益
		getIncomeList () {
			let params = {
				page: this.page,
				number: this.number
			}
			http.get('/distributor/incomeList', params, false, res => {
				if (res.status == 1 && res.data.length > 0) {
					this.orders = this.orders.concat(res.data)
					this.page ++
					this.loading = false
          this.nomore = false
				}else {
					this.loading = false
          this.nomore = true
          return
				}
			})
		}
	},
	mounted () {
		this.getIncomeList()
	},
	filters: {
		toDecimal (val) {
			return toDecimal(val)
		}
	}
}	
</script>

<style scoped>
.header {
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 15px 30px 15px;
	border-bottom: 1px solid #e2e2e2;
}	
.header h2 {
	font-size: 24px;
	color: #38393C;
	font-weight: 700;
}
.back {
	background: #fff;
	line-height: 14px;
	padding: 8px 15px;
	border-radius: 30px;
	color: #38393C;
	box-shadow: 0 14px 14px -8px rgba(56,57,60,0.15);
	border: 1px solid #C7C7C7;
}	
.order-item {
	position: relative;
	background: #fff;
	margin-top: 10px;
	border-top: 1px solid #e2e2e2;
	border-bottom: 1px solid #e2e2e2;
}
.orderNo {
	font-size: 12px;
  color: #9B9B9B;
	padding: 8px 15px;
	border-bottom: 1px solid #e2e2e2;
}
.goods {
	border-bottom: 1px solid #e2e2e2;
}
.goods-item {
	display: flex;
	align-items: center;
	padding: 10px 15px;
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
	font-size: 14px;
	color: #38393C;
	padding-bottom: 2px;
}
.goods-content p {
	font-size: 12px;
	color: #9B9B9B;
	line-height: 17px;
}
.income,
.order-total {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	border-bottom: 1px solid #e2e2e2;
}
.income b {
	font-size: 16px;
	color: #0091FF;
}
.order-btm-flex {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	font-size: 14px;
	color: #9B9B9B;
}
</style>


