<template>
	<div>
		<div class="purchase-list">
			<div class="purchase-item">
				<div class="purchase-goods bottom-1px">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" src="https://caomeng.me/img/goods/yan_tie_01.jpg">
						</span>
					</div>
					<div class="content">
						<div class="goods-name">负氢眼贴</div>
						<p class="market-price">零售价 ￥400.00</p>
						<div class="content-flex">
							<div class="purchase-price">订货价<b>￥200.00</b></div>
							<span class="stock">库存(10000件)</span>
						</div>
					</div>
				</div>	
				<div class="purchase-btm-flex">
					<span class="total-price">总价：0元</span>
					<cartcontrol @decrease="cartChange" @add="cartChange"></cartcontrol>
				</div>
			</div>
		</div>

		<div class="fixBar-wrapper">
      <div class="fixBar">
        <div class="totalPrice">总计：<span>¥{{ totalPrice | toDecimal }}</span></div>
        <div class="checkout">
          <span @click="toPayment" class="btn" :class="{ disabled: totalPrice == 0  }">结算</span>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import Cartcontrol from '@/components/public/Cartcontrol'
import { toDecimal } from '@/utils/mUtils'

export default {
	components: {
		Cartcontrol
	},
	data () {
		return {
			purchaseList: []
		}
	},
	computed: {
		totalPrice () {
			return 5000
		}
	},
	methods: {
		cartChange (val) {

		},
		toPayment () {
			if (this.totalPrice < 5000) {
				this.$vux.confirm.show({
					title: '提示信息',
					content: '您的起订价格为5000元，当前采购低于起订价，请重新采购!',
					showCancelButton: false
				})
				return
			}
			this.$router.push({ path: '/purchase/payment' })
		}
	},
	filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  }
}	
</script>

<style scoped>
.purchase-item {
	background: #fff;
}	
.purchase-goods {
	display: flex;
	padding: 15px;
}
.goods-img {
	width: 90px;
	height: 90px;
	margin-right: 8px;
}
.content {
	flex: 1;
}
.goods-name {
  color: #232326;
  font-size: 14px;
  display: block;
  height: 36px;
  line-height: 18px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
}
.market-price {
	color: #999;
	font-size: 13px;
}
.content-flex {
	display: flex;
	font-size: 13px;
	align-items: center;
}
.purchase-price {
	flex: 1;
	color: #e02e24;
}
.purchase-price b {
	font-size: 16px;
	font-weight: normal;
}
.stock {
	color: #999;
}
.purchase-btm-flex {
	display: flex;
	padding: 8px 15px;
}
.total-price {
	flex: 1;
	line-height: 26px;
	color: #e02e24; 
}

.fixBar-wrapper {
  height: 46px;
}
.fixBar {
  position:fixed;
  bottom:0;
  display:flex;
  width:100%;
  max-width:640px;
  z-index:100;
  background:rgba(255, 255, 255, .95);
}
.fixBar .totalPrice {
  flex: 1;
  border-top:1px solid #eaeaea;
  line-height: 45px;
  padding: 0 10px 0 15px;
  font-size: 16px;
}
.fixBar .totalPrice span {
  color: #e02e24;
  font-weight: 700;
}
.checkout {
  flex: 0 0 auto;
}
.checkout .btn {
  display: block;
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  background: #e02e24;
  min-width: 100px;
  height: 46px;
  color: #fff;
  border-radius: 0;
}
.checkout .btn::after {
  border: 0;
}
.checkout .disabled {
  background: #eaeaea;
  color: #999;
}
</style>