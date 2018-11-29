<template>
	<div v-if="custormerDetail">
		<div class="header">
			<div class="avatar">
				<img :src="custormerDetail.avatar">
			</div>
			<div class="user-info">
				<h3 class="name">{{ custormerDetail.nickname }}</h3>
				<p>绑定时间：{{ custormerDetail.boundAt }}</p>
			</div>
		</div>
		<group gutter="10px">
			<cell class="field-item" title="订单数量" :value="custormerDetail.totalOrders"></cell>
			<cell class="field-item" title="成交金额" >
				<span>￥{{ custormerDetail.amount }}</span>
			</cell>
		</group>
		<group gutter="10px">
			<cell class="field-item" title="失效时间" :value="custormerDetail.invalidedAt"></cell>
			<cell class="field-item" title="失效原因" :value="custormerDetail.invalidReason"></cell>
		</group>
	</div>
</template>

<script>	
import { Group, Cell } from 'vux'
import http from '@/utils/http'

export default {
	components: {
		Group,
		Cell
	},
	data () {
		return {
			custormerDetail: null
		}
	},
	methods: {
		getCustormerDetail () {
			let params = {
				sn: this.$route.query.sn
			}
			http.get('/distributor/customerDetails', params, false, res => {
				if (res.status == 1) {
					this.custormerDetail = res.data
				}
			})
		}
	},
	mounted () {
		this.getCustormerDetail()
	}
}	
</script>

<style scoped>
.header {
	display: flex;
	align-items: center;
	padding: 25px 15px;
	background: #fff;
	border-bottom: 1px solid #e2e2e2;
}
.avatar {
	width: 50px;
	height: 50px;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 10px;
}
.user-info .name {
	font-size: 24px;
	color: #38393C;
	line-height: 24px;
	font-weight: 700;
}
.user-info p {
	font-size: 12px;
	line-height: 12px;
	color: #4F5054;
	padding-top: 8px;
}
.field-item {
	padding: 15px;
}
.field-item:before {
	left: 15px !important;
	right: 15px;
}	
</style>