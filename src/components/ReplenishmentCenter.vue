<template>
	<div>
		<router-link :to="{ path: '/replenishment/order', query: { type: 0 } }" tag="div" class="view-replenishment-order">
			补货订单
		</router-link>
		<img src="./../assets/images/Group 21 Copy 3@2x.png">
		<div class="panel">
			<div class="header">
				<span>产品</span>
				<span>数量</span>
			</div>
			<div class="goods-wrapper">
				<div class="goods-item" v-for="(item, i) in goodsList" :key="i">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" :src="item.img">
						</span>
					</div>
					<div class="goods-content">
						<h4 class="goods-name ellipsis">{{ item.name }}</h4>
						<span class="price">¥{{ item.price }}</span>
					</div>
					<span class="quantity">{{ item.quantity }}</span>
				</div>
				<div class="noResult" v-if="goodsList.length == 0">
					<img src="./../assets/images/Group 20 Copy@2x.png">
					<p>暂无更多数据~</p>
				</div>
			</div>
		</div>
		<div @click="submit" class="submit-btn" :class="{ disable: goodsList.length == 0 }">立即补货</div>
	</div>
</template>

<script>
import http from '@/utils/http'

export default {
	data () {
		return {
			goodsList: []
		}
	},
	methods: {
		submit () {
			if (this.goodsList.length == 0) return
			this.$router.push({ path: '/replenishment/confirm' })
		},
		getGoods () {
			http.get('/agent/unreplenish', {}, false, res => {
				if (res.status == 1) {
					this.goodsList = res.data.goods || []
				}
			})
		}
	},
	mounted () {
		this.getGoods()
	}
}
</script>

<style scoped>
.view-replenishment-order {
	position: absolute;
	right: 15px;
	top: 15px;
	background: #fff;
	border-radius: 30px;
	padding: 5px 15px;
	font-size: 12px;
	color: #3484FF;
}
.panel {
	padding: 0 15px;
}
.header {
	position: relative;
	margin-top: -45px;
	display: flex;
	justify-content: space-between;
	font-size: 16px;
	color: #38393C;
	background: #C9E0FF;
	padding: 10px 15px;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
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
	height: 80px;
	border-right: 1px solid #C9E0FF;
}
.goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
	padding: 17px 0 0 0;
}
.price {
	font-size: 12px;
	color: #9B9B9B;
}
.quantity {
	width: 32px;
	text-align: center;
	font-size: 24px;
	color: #3484FF;
	margin-left: 10px;
}
.submit-btn {
	margin: 20px 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.disable {
	background: #BDBFC1;
	box-shadow: 0 7px 10px -5px #BDBFC1;
}
.noResult {
	padding: 10% 0;
	text-align: center;
}
.noResult img {
	max-width: 160px;
}
.noResult p {
	font-size: 12px;
	color: #9B9B9B;
	padding-top: 10px;
}
</style>
