<template>
	<div class="shop-cart-wrapper">
    <div class="shop-cart" v-if="cartList.length > 0">

      <div class="cart-head bottom-1px">
        <div class="checkAll">
          <x-icon class="x-icon" v-if="checkAll" @click="checkAllStatus" type="ios-checkmark" size="22" fill="#e02e24"></x-icon>
          <x-icon class="x-icon" v-else @click="checkAllStatus" type="ios-circle-outline" fill="#999" size="22"></x-icon>
          <span>全选</span>
        </div>
        <div class="delete" v-if="sureClick" @click="deleteItem"><span>删除</span></div>
        <div v-else class="delete"><span style="border: 1px solid #999; color: #999">删除</span></div>
      </div>

      <div class="cart-item bottom-1px" v-for="(item, index) in cartList" :key="index">
        <div class="check">
          <x-icon class="x-icon" v-if="item.checked" @click="checkItem(index)" type="ios-checkmark" size="22" fill="#e02e24"></x-icon>
          <x-icon class="x-icon" v-else @click="checkItem(index)" type="ios-circle-outline" fill="#999" size="22"></x-icon>
        </div>
        <div class="goods-cover">
          <div class="img-holder"><img :src="item.goodsImg" /></div>
        </div>
        <div class="content">
          <div class="content-head">
            <div class="goods-name">{{ item.goodsName }}</div>
          </div>
          <div class="content-btm">
            <div class="price">¥{{ item.goodsPrice | toDecimal }}</div>
            <cartcontrol @decrease="cartChange" @add="cartChange" :count="item.quantity" :index="index"></cartcontrol>
          </div>
        </div>
      </div>
    </div>
    <div class="fixBar-wrapper" v-if="cartList.length > 0">
      <div class="fixBar">
        <div class="totalPrice">总计：<span>¥{{ totalPrice | toDecimal }}</span>
				<!-- <p class="activity" v-if="isActivity">活动买二免一,已优惠{{saves}}元</p> -->
				</div>
        <div class="checkout">
          <span @click="toPayment" class="btn" :class="{ disabled: totalPrice == 0  }">结算</span>
        </div>
      </div>
    </div>
    <!-- 无数据 -->
    <no-result v-if="cartList.length == 0" :showBtn="true"></no-result>
	</div>
</template>

<script>
import NoResult from '@/components/public/NoResult'
import Cartcontrol from '@/components/public/Cartcontrol'
import http from '@/utils/http'
import { toDecimal } from '@/utils/mUtils'
export default {
  components: {
    NoResult,
    Cartcontrol
  },
	data () {
		return {
			cartList: [],
      checkAll: true,
			isActivity: false,
		}
	},
  computed: {
    totalPrice () {
      let totalPrice = 0
      this.cartList.forEach((item) => {
        if (item.checked) {
          totalPrice += item.goodsPrice * item.quantity;
        }
      })
      return totalPrice
    },
    sureClick () {
      let item = this.cartList.find(n => n.checked == true);
      if (item) return true;
      return false;
    }
  },
  methods: {
    cartChange (val) {
      this.cartList[val.index].quantity = val.count
    },
    getCartList () {
      http.get('/cart', {}, false, res => {
        if (res.status == 1) {
          let cartList = res.data.goods;
					if (res.data.saves > 0) {
						this.isActivity = true
						this.saves = res.data.saves
					}
          let arr = [];
          for (let i in cartList) {
            cartList[i].id = i
            cartList[i].checked = true
            arr.push(cartList[i])
          }
          this.cartList = arr
        }
      })
    },
    // 去结算
    toPayment () {
      if (this.totalPrice == 0) return
      let select = [];
      this.cartList.forEach(item => {
        if (item.checked) {
          select.push({ goodsId: item.goodsId, quantity: item.quantity});
        }
      });
      let str = JSON.stringify({ goods: select })
      http.post('/cart', { cart: str }, false, res => {
        if (res.status == 1) {
          window.location.href = global.serverHost + '/newCart/pay/#/goods/payment/'
        }
      })
    },
    deleteItem () {
      let that = this
      that.$vux.confirm.show({
        title: '提示信息',
        content: '确定要删除吗？',
        onConfirm () {
          let cartList = []
          let selectDelete = []
          that.cartList.forEach((item) => {
            if (!item.checked) {
              cartList.push(item)
            }else {
              selectDelete.push({ goodsId: item.goodsId, quantity: 0})
            }
          })
          let str = JSON.stringify({ goods: selectDelete })
          http.post('/cart', { cart: str }, false, res => {
            if (res.status == 1) {
              that.cartList = cartList
              that.$vux.toast.show({
                text: '删除成功!',
                type: 'success',
                width: 'auto',
                position: 'middle'
              })
            }
          })
        }
      })
    },
    // 单选购物车
    checkItem (index) {
      this.cartList[index].checked = !this.cartList[index].checked
      let item = this.cartList.find(n => !n.checked )
      if (!item) {
        this.checkAll = true
      }else {
        this.checkAll = false
      }
    },
    // 全选购物车
    checkAllStatus () {
      this.checkAll = !this.checkAll
      this.cartList.forEach((item) => {
      if (this.checkAll) {
        item.checked = true
      }else {
        item.checked = false
      }
    });
    }
  },
  created () {
    this.getCartList()
  },
  filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  }
}
</script>

<style scoped>
.shop-cart-wrapper {
  position: relative;
  height: 100%;
}
.shop-cart {
  background: #fff;
}
.cart-head {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.checkAll {
  flex: 1;
  font-size: 0;
}
.checkAll .x-icon,
.checkAll span {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}
.checkAll span {
  font-size: 14px;
  color: #787878;
  padding-left: 5px;
}
.delete span {
  font-size: 12px;
  color: #e02e24;
  padding: 3px 10px;
  border: 1px solid #e02e24;
  border-radius: 30px;
}
.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
}
.goods-cover {
  flex: 0 0 76px;
  width: 76px;
  height: 76px;
  margin: 0 8px 0 10px;
}
.content-head {
  display: flex;
}
.goods-name {
  flex: 1;
  color:#232326;
  font-size:14px;
  display:block;
  height:36px;
  line-height:18px;
  overflow:hidden;
  display:-webkit-box;
  text-overflow:ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.content-btm {
  display: flex;
  align-items: center;
  padding-top: 14px;
}
.content-btm .price {
  flex: 1;
  font-size: 18px;
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
  padding: 0 10px 0 15px;
  font-size: 16px;
	line-height: 45px;
}
.fixBar .totalPrice span {
  color: #e02e24;
  font-weight: 700;
}
.fixBar .totalPrice .activity{
	font-size: 10px;
	color: #e02e24;
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
.cart-item .content {
  flex: 1;
}
</style>
