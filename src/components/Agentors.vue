<template>
	<div>
		<div class="header">
			<h2>代理商中心</h2>
			<div class="avatar">
				<img v-if="userInfo" :src="userInfo.avatarUrl">
			</div>
		</div>
		<div class="distributor">
			<div class="income">
				<div class="content">
					<p>我的余额（元）</p>
					<h3>{{ balance | toDecimal }}</h3>
				</div>
				<router-link :to="{ path: '/agentors/capital/detail' }" class="income-btn">明细</router-link>
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

		<div class="agentor-link">

			<router-link :to="{ path: '/purchaseCenter' }" class="agentor-link-item">
				<span class="icon">
					<img src="./../assets/images/agentor_link_icon02.png">
				</span>
				<h4>进货中心</h4>
			</router-link>

		</div>
		<div style="height: 10px;"></div>
		<div class="agentor-link">
			<router-link :to="{ path: '/replenishmentCenter' }" class="agentor-link-item" tag="div">
				<span class="icon">
					<img src="./../assets/images/Group 26@2x.png">
				</span>
				<h4>补货中心</h4>
			</router-link>
			<router-link :to="{ path: '/delivery/order', query: { type: 0 } }" class="agentor-link-item" tag="div">
				<span class="icon">
					<img src="./../assets/images/deliver_icon.png">
				</span>
				<h4>发货管理</h4>
			</router-link>
			<router-link :to="{ path: '/agentApply' }" class="agentor-link-item"  tag="div">
				<span class="icon">
					<img src="./../assets/images/agent_icon.png">
				</span>
				<h4>申请其他区域代理商</h4>
			</router-link>
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
			balance: 0
		}
	},
	methods: {
		getAgentInfo () {
			http.get('/agent/info', {}, false, res => {
				if (res.status == 1) {
					this.balance = res.data.balance
				}
			})
		}	
	},
	filters: {
		toDecimal (x) {
			return toDecimal(x)
		}
	},
	mounted () {
		this.getAgentInfo()
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
.agentor-link {
	background: #fff;
}
.agentor-link-item {
	position: relative;
	padding: 15px;
	display: flex;
	align-items: center;
}
.agentor-link-item:after {
	content: '';
	display: block;
	position: absolute;
	left: 15px;
	right: 15px;
	bottom: 0;
	border-bottom: 1px solid #E2E2E2;
}
.agentor-link-item:last-child:after {
	display: none;
}
.agentor-link-item:before {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 17px
}
.agentor-link-item .icon {
	display: block;
	width: 22px;
	height: auto;
	margin-right: 10px;
}
.agentor-link-item h4 {
	font-size: 14px;
	color: #38393C;
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