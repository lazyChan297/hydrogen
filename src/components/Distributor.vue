<template>
	<div v-if="distributor">
		<div class="header">
			<h2>分销员中心</h2>
			<div class="avatar">
				<img v-if="userInfo" :src="userInfo.avatarUrl">
			</div>
		</div>
		<div class="distributor">
			<div class="income">
				<div class="content">
					<p>累计收益（元）</p>
					<h3>{{ distributor.totalIncome | toDecimal }}</h3>
				</div>
				<router-link :to="{ path: '/distributor/incomeList' }" class="income-btn">明细</router-link>
			</div>
			<div class="distributor-links">
				<router-link :to="{ path: '/distributor/customer/accumulative' }" class="distributor-link-item" tag="div">
					<h4>{{ distributor.totalCustomers }}</h4>
					<p>客户</p>
				</router-link>
				<router-link :to="{ path: '/distributor/customer/quasi' }" class="distributor-link-item" tag="div">
					<h4>{{ distributor.totalProspectiveCustomers }}</h4>
					<p>访客</p>
				</router-link>
				<router-link :to="{ path: '/distributor/orderList' }" class="distributor-link-item" tag="div">
					<h4>{{ distributor.totalOrders }}</h4>
					<p>全部订单</p>
				</router-link>
			</div>
		</div>
		<router-link :to="{ path: '/marketing/qrcode' }" class="invitation" tag="div">
			<span class="icon"><img src="./../assets/images/qrcode_icon.png"></span>
			<div class="content">
				<h4>邀请好友</h4>
				<p>齐推广</p>
			</div>
			<span class="invitation-btn">推广</span>
		</router-link>
		<div style="height: 15px"></div>
		<!-- 推广产品 -->
		<div class="goods">
			<div class="part-title">推广产品</div>
			<div class="goods-list">

				<router-link :to="{ path: '/goods/detail', query: { id: item.id } }" class="goods-item" v-for="(item, index) in distributor.goods" :key="index">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" :src="item.img">
						</span>
					</div>
					<div class="goods-content">
						<h4 class="goods-name ellipsis">{{ item.name }}</h4>
						<p>{{ item.desc }}</p>
					</div>
					<div class="price">￥{{ item.price }}</div>
				</router-link>

			</div>
		</div>
		<footer-brand></footer-brand>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import FooterBrand from '@/components/public/FooterBrand'
import http from '@/utils/http'
import { toDecimal } from '@/utils/mUtils'

export default {
	components: {
		FooterBrand
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	data () {
		return {
			distributor: null
		}
	},
	methods: {
		getUserDistributor () {
			http.get('/distributor/center', {}, false, res => {
				if (res.status == 1) {
					this.distributor = res.data
				}
			})
		}
	},
	mounted () {
		this.getUserDistributor()
		// 当分销商浏览“分销商中心”时
		http.post('/users/viewDistributionCenter', {}, false, res => {
			if (res.status == 1) {
				// ...
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
.header {
	display: flex;
	justify-content: space-between;
	padding: 30px 15px 15px 15px;
	height: 160px;
	background-image: linear-gradient(-135deg, #3054DD 0%, #59A1FF 100%); 
}	
.header .avatar {
	width: 32px;
	height: 32px;
	border-radius: 100%;
	overflow: hidden;
}
.header h2 {
	font-size: 24px;
	line-height: 32px;
	color: #fff;
	font-weight: 700;
}
.distributor {
	position: relative;
	margin: 0 15px;
	margin-top: -85px;
	background: #fff;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 10px 15px -5px rgba(113,171,253,0.20);
	margin-bottom: 20px;
}
.income {
	padding: 30px 15px;
	display: flex;
	align-items: center;
}
.income .content {
	flex: 1;
}
.income .content p{
	font-size: 14px;
	color: #9B9B9B;
	padding-bottom: 5px;
}
.income .content h3 {
	font-size: 36px;
	color: #38393C;
	line-height: 36px;
	font-weight: 700;
}
.income-btn {
	background: #FDDA00;
	line-height: 12px;
	padding: 8px 15px;
	border-radius: 30px;
	color: #fff;
	margin-top: 26px;
}
.distributor-links {
	display: flex;
	background-image: linear-gradient(-180deg, #F4F9FF 3%, #FFFFFF 100%);
}
.distributor-link-item {
	flex: 1;
	text-align: center;
	padding: 15px 0;
}
.distributor-link-item h4 {
	font-size: 24px;
	color: #71ABFD;
	line-height: 24px;
}
.distributor-link-item p {
	color: #4F5054; 
}
.goods {
	padding: 0 15px;
	background: #fff;
}
.part-title {
	position: relative;
	padding: 15px 0 15px 10px;
	line-height: 18px;
	font-size: 18px;
	font-weight: 700;
}
.part-title:after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 15px;
	width: 5px;
	height: 18px;
	background-image: linear-gradient(0deg, #00D0FC 0%, #2524DA 100%);
}
.goods-item {
	display: flex;
	align-items: center;
	padding: 10px 0;
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
	overflow: hidden;
}
.goods-content .goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
	padding-bottom: 2px;
}
.goods-content p {
	font-size: 12px;
	color: #4F5054;
	line-height: 17px;
	height: 34px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-item .price {
	flex: 0 0 auto;
	font-size: 18px;
	color: #0083E6;
	font-weight: 700;
}

.invitation {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
}
.invitation .icon {
  width: 50px;
  height: auto;
  margin-right: 10px;
}
.invitationr .icon img {
  display: block;
}
.invitation .content {
  flex: 1;
  padding-top: 2px;
}
.invitation .content h4 {
  font-size: 16px;
  color: #4F5054;
  font-weight: 700;
}
.invitation .content p {
  font-size: 12px;
  color: #9B9B9B;
}
.invitation-btn {
  padding: 8px 20px;
  font-size: 14px;
  line-height: 14px;
  color: #fff;
  border-radius: 30px;
  background: #FF7584;
}
</style>