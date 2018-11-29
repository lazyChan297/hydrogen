<template>
	<div class="status">
		<div class="status-wrapper">
			<icon type="success" style="color: #407CE6;" is-msg></icon>
			<h3 v-if="type == 'replenishment'">补货成功</h3>
			<h3 v-else>申请成功</h3>
			<p v-if="type == 'replenishment'">可在 <router-link class="color-blue" :to="{ path: '/replenishment/order', query: { type: 0 } }">补货订单</router-link> 中查看</p>
			<p v-else>等待资料审核</p>
		</div>
		<div class="status-btm">
			<div v-if="type == 'replenishment'">
				<x-button :link="{ path: '/replenishment/order', query: { type: 0 } }" class="back" mini plain type="primary">确定</x-button>
			</div>
			<div v-else>
				<x-button @click.native="back" class="back" mini plain type="primary">返回</x-button>
			</div>
			
		</div>

	</div>
</template>

<script>
import { Icon, XButton } from 'vux'
	
export default {
	components: {
		Icon,
		XButton
	},
	data () {
		return {

		}
	},
	computed: {
		type () {
			return this.$route.params.type
		}
	},
	methods: {
		back () {
			this.$router.push({ path: '/my' })
		}
	}
}	
</script>

<style scoped>
.status {
	position: fixed;
	width: 100%;
	height: 100%;
	background: #fff;
	text-align: center;
}	
.status-wrapper {
	padding-top: 15%;
}
h3 {
	font-size: 18px;
	color: #38393C;
	line-height: normal;
	padding-top: 10px;
}
p {
	font-size: 14px;
	color: #999;
}
.status-btm {
	position: absolute;
	width: 100%;
	bottom: 15%;
}
.back {
	color: #407CE6;
	border: 1px solid #407CE6;
	box-shadow: none !important;
}
.back:active {
  color: #407CE6 !important;
	border: 1px solid #407CE6 !important;
}
.color-blue {
	color: #71ABFD;
}
</style>