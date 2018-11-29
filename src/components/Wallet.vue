<template>
	<div>
		<div class="wallet-head">
		  <div class="wallet-tips">我的余额（元）</div>
		  <div class="total-wallet">¥ 2000.00</div>
		  <div class="wallet-head-flex">
		    <div class="flex-item">利润：<span>¥ 1200.00</span></div>
		    <div class="flex-item">支出：<span>¥ 2000.00</span></div>
		  </div>
		</div>

		<div class="payments-detail">
		  <group gutter="0">
		  	<cell title="收支明细" is-link>
		  		<span style="font-size: 14px">更多</span>
		  	</cell>
		  </group>
		  <div class="payments-list">
		    <div class="payments-item bottom-1px">
		      <div class="content">
		        <div class="title">订货</div>
		        <span class="datetime">2018-06-05 08:04:02</span>
		      </div>
		      <div class="amount">-200.00</div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
import { Group, Cell } from 'vux'	

export default {
	components: {
		Group,
		Cell
	},
	data () {
		return {

		}
	}
}	
</script>

<style scoped>
.wallet-head {
  background: #e02e24;
  padding: 10px 0 0 0;
  text-align: center;
  color: #fff;
}
.total-wallet {
  font-size: 30px;
}
.wallet-head-flex {
  display: flex;
  background: rgba(255, 255, 255, .08);
  margin-top: 15px;
  padding: 10px 0;
}
.flex-item {
  flex: 1;
}
.flex-item:last-child {
  border-left: 1px solid rgba(255, 255, 255, .15);
}
.payments-detail {
  background: #fff;
}
.payments-title {
  display: flex;
  align-items: center;
  padding: 12px 15px;
}
.payments-title .text {
  position: relative;
  font-size: 16px;
  line-height: 16px;
  padding-left: 10px;
  flex: 1;
}
.payments-title .text::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  background: #e02e24;
  width: 4px;
  height: 100%;
  border-radius: 10px;
}
.payments-title .view-more {
  color: #999;
  line-height: 16px;
}
.payments-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.payments-item .content {
  flex: 1;
}
.payments-item .content .title {
  font-size: 16px;
}
.payments-item .content .datetime {
  color: #999;
}
.payments-item  .amount {
  flex: 0 0 auto;
  font-size: 24px;
}	
</style>