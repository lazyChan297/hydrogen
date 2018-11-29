<template>
	<div>
		<div class="header">
			<h2>进货中心</h2>
			<span @click="back" class="back">返回</span>
			<p class="tips">温馨提示：订单总额满3000元包邮，未满3000不包邮</p>
		</div>
		<!-- 商品 -->
		<div class="goods-wrapper">
			<div class="goods-item" v-for="(item, i) in goodsList" :key="i">
				<div class="goods">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" :src="item.img">
						</span>
					</div>
					<div class="goods-content">
						<h4 class="goods-name ellipsis">{{ item.name }}</h4>
						<p class="market-price">¥{{ item.retailPrice | toDecimal }}</p>
						<div class="goods-content-flex">
							<span class="price">¥{{ item.tradePrice | toDecimal }}</span>
							<!-- <span class="stock">库存：9999</span> -->
						</div>
					</div>
				</div>
				<div class="goods-btm-flex">
					<span class="amount">¥{{ item.amount | toDecimal }}</span>
					<cartcontrol @decrease="onChange" @add="onChange" :count="item.quantity" :index="i"></cartcontrol>
				</div>
			</div>
		</div>
		<div class="fixBar-wrapper">
      <div class="fixBar">
        <div class="totalPrice">总计：<span>¥{{ totalPrice | toDecimal }}</span></div>
        <div @click="checkout" class="checkout">结算</div>
      </div>
    </div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'	
import Cartcontrol from '@/components/public/Cartcontrol'
import http from '@/utils/http'
import { toDecimal } from '@/utils/mUtils'

export default {
	components: {
		Cartcontrol
	},
	data () {
		return {
			goodsList: []
		}
	},
	computed: {
		totalPrice () {
			let t = 0;
			if (this.goodsList.length > 0) {
				this.goodsList.forEach(item => {
					t += item.amount 
				})
			}
			return t
		}
	},
	methods: {
		...mapActions(['savePurchaseGoods']),
		checkout () {
			// 判断是否已选择
			let s = this.goodsList.filter(n => n.quantity > 0)		
			if (s.length == 0) {
				this.$vux.toast.show({
					type: 'warn',
					text: '请选择购买数量!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			// 选中的商品保存到vuex
			this.savePurchaseGoods(this.goodsList)
			this.$router.push({ path: '/purchase/confirm' })
		},
		back () {
			this.$router.go(-1)
		},
		onChange (val) {  
      this.goodsList[val.index].quantity = val.count
      this.goodsList[val.index].amount = val.count * this.goodsList[val.index].tradePrice
    },
		getPurchaseGoods () {
			http.get('/agent/stock/goods', {}, false, res => {
				if (res.status == 1) {
					this.goodsList = res.data.goods.map(item => {
						item.quantity = 0
						item.amount = 0
						return item
					})
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
		this.getPurchaseGoods()
	}
}	
</script>

<style scoped>
.header {
	position: relative;
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
.tips {
	position: absolute;
	bottom: 0;
	left: 15px;
	bottom: 5px;
	font-size: 12px;
	color: #9b9b9b;
}
.goods-item {
	background: #fff;
	margin-top: 10px;
	border-top: 1px solid #e2e2e2;
	border-bottom: 1px solid #e2e2e2;  
}
.goods {
	display: flex;
	padding: 15px;
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
}
.goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
	padding-bottom: 10px;
}
.market-price {
	font-size: 14px;
	color: #9B9B9B;
	text-decoration: line-through;
}
.goods-content-flex {
	display: flex;
	justify-content: space-between;
}
.price {
	font-size: 14px;
	color: #38393C;
}
.stock {
	font-size: 14px;
	color: #9B9B9B;
}
.goods-btm-flex {
	display: flex;
	justify-content: space-between;
	padding: 12px 15px;
	border-top: 1px solid #e2e2e2;
}
.amount {
	font-size: 14px;
	color: #71ABFD;
	font-weight: 700;
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
	font-size: 16px;
  color: #71ABFD;
  font-weight: 700;
}
.checkout {
	font-size: 14px;
	color: #fff;
	width: 120px;
	text-align: center;
	line-height: 45px;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
}
</style>