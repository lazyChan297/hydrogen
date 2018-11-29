<template>
	<div>
		<div class="address-defalut-wrap">
      <div class="address-defalut" @click="chooseAddress">
        <span class="iconfont">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dizhi"></use>
          </svg>
        </span>
        <div class="address-content">
          <div  class="name">{{ addressData.reciever ? addressData.reciever + ', ' + addressData.mobile : '请填写联系方式' }}</div>
          <div class="address-detail">{{ addressData.reciever ? addressData.details : '无地址'  }}</div>
        </div>
      </div>
    </div>
    <div class="height-10px"></div>
		<!-- 结算商品 -->
    <div class="goods">
      <div class="goods-head bottom-1px">
        <span>商品：</span>
        <div class="goods-edit" v-if="type == 'goods'">
        	<router-link class="text" :to="{ path: '/cart' }">编辑</router-link>
        </div>
      </div>
      <div class="goods-list">
        <div class="goods-item bottom-1px" v-for="(item,index) in goodsList" :key="index">
          <div class="goods-cover">
            <div class="img-holder"><img :src="item.goodsImg" /></div>
          </div>
          <div class="goods-info">
            <div class="name">{{ item.goodsName }}</div>
            <div class="goods-btm-flex">
              <div class="price">¥{{ item.goodsPrice | toDecimal }}</div>
              <span class="count">{{ item.quantity }}件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
		<div class="height-10px"></div>
		<div class="checkout-section">
      <div class="params">
        <span class="title">商品金额</span>
        <span class="color-red">¥{{ totalPrice | toDecimal }}</span>
      </div>
      <div class="params">
        <span class="title">运费</span>
        <span class="color-red">¥0.00</span>
      </div>
			<div class="params" v-if="saves">
        <span class="title">优惠</span>
        <span class="color-red">活动买二免一，优惠{{saves}}元</span>
      </div>
      <div class="total-price">合计： <span class="color-red">¥{{ totalPrice | toDecimal }}</span></div>
    </div>
    <div class="payment-btn">
		  <x-button @click.native="toPayment" type="primary">{{ type == 'goods' ? '微信支付' : '余额支付' }}</x-button>
		</div>
	</div>
</template>

<script>
import { XButton } from 'vux'
import http from '@/utils/http'
import { toDecimal, getStore, removeStore } from '@/utils/mUtils'

export default {
	components: {
    XButton
  },
	data () {
		return {
      type: '',
			addressData: {},
			goodsList: [],
      cartNo: '',
      type: 'goods',
			saves: 0
		}
	},
  computed: {
    totalPrice () {
      let total = 0
      this.goodsList.forEach((n) => {
        total += n.goodsPrice * n.quantity
      })
			total = total - this.saves
      return total
    }
  },
	methods: {
		// 选择收货地址
		chooseAddress () {
      let that = this
		  this.$wechat.openAddress({
				success: res => {
					let addrInfo = {
						userName: res.userName,
            telNumber: res.telNumber,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countryName,
            detail: res.detailInfo,
            postalCode: res.postalCode
					}
					let addrInfoStr = JSON.stringify(addrInfo)
          http.post('/users/addAddr', { addrInfo: addrInfoStr }, false, result => {
            if (result.status == 1) {
              that.addressData = result.data.addr
            }
          })
				}
			})
		},
		// 微信支付
		toPayment () {
			if (!this.addressData.id) {
	      this.$vux.toast.show({
	  			text: '请选择收货地址!',
	  			type: 'warn',
          width: 'auto',
	  			position: 'middle'
  			})
	      return
	    }
      // 获取支付参数
      http.post('/cart/getPayArgs', { addr: JSON.stringify({ id: this.addressData.id }),
      cartNo: this.cartNo  }, false, res => {
        if (res.status == 1) {
          let that = this
          this.cartNo = res.data.cartNo
          // 判断是否为分销商品
          let userSn = getStore('userSn')
          if (userSn) {
            let params = {
              distributor: userSn,
              cartNo: res.data.cartNo
            }

            http.post('/users/setDistributor', params, false, res => {
              if (res.status == 1) {
                // ...
              }
            })
          }
          this.$wechat.chooseWXPay({
            timestamp: res.data.payargs.timeStamp,
            nonceStr: res.data.payargs.nonceStr +"",
            package: res.data.payargs.package +"",
            signType: res.data.payargs.signType +"",
            paySign: res.data.payargs.paySign +"",
            success: result => {
              if (result.errMsg == "chooseWXPay:ok") {
                removeStore('userSn')
                window.location.href = global.serverHost + '/#/my/order?type=0'
              }
            },
            cancel: result => {
              removeStore('userSn')
            }
          })

        }else {
          this.$vux.toast.show({
            type: 'warn',
            text: res.info,
            width: 'auto',
            position: 'middle'
          })
        }
      })
		},
    getGoodsConfirm () {
      http.get('/cart/confirm/', {}, false, res => {
        if (res.status == 1) {
          let cartObj = res.data.cart.goods
          let goodsList = []
					this.saves = res.data.cart.saves
          for (let i in cartObj) {
            goodsList.push(cartObj[i])
          }

          this.goodsList = goodsList
          this.addressData = res.data.addr
        }
      })
    }
	},
  created () {
    this.type = this.$route.params.type
    if (this.type == 'goods') {
      this.getGoodsConfirm()
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
.address-defalut {
  display: flex;
  align-items: center;
  position: relative;
  background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURf///4u16Oxtbezz/J3B7NDh9vvd3fSmprjS8vGNje57e/jDw/7w8IQ3dnAAAABSSURBVCjPY2CAAG4l7GADVJ4hUBArEIXJJ2HXrw6TZ8auX7ABKs+zCLsBE2AGmGDXLwKT58SuX+sATIEjdgOcYfJF2A1Qg8lz4PCBwWgQUiMIAWCaOFG2MdFRAAAAAElFTkSuQmCC) repeat-x bottom center;
  background-size: 60px 5px;
  padding: 15px 30px 20px 15px;
}
.address-defalut:before {
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
  right: 17px;
}
.address-defalut .iconfont {
  flex: 0 0 auto;
  font-size: 20px;
}
.address-content {
  flex: 1;
  padding-left: 8px;
}
.address-content .name {
  font-size: 16px;
}
.address-detail {
  color: #666;
}
.goods {
  background: #fff;
}
.goods-head {
  display: flex;
  align-items: center;
  padding: 8px 15px;
}
.goods-head span {
  flex: 1;
}
.goods-edit .text {
  font-size: 12px;
  color: #999;
  padding: 2px 10px;
  border: 1px solid #999;
  border-radius: 30px;
}

.goods-item {
  display: flex;
  padding: 15px;
}
.goods-item .goods-cover {
  flex: 0 0 80px;
  width: 80px;
  margin-right: 8px;
}
.goods-cover .img-holder {
  padding-bottom: 100%;
}
.goods-info {
  flex: 1;
}
.goods-info .name {
  font-size: 14px;
  line-height: 18px;
  min-height: 36px;
  margin-bottom: 8px;
}
.goods-btm-flex {
  display: flex;
  align-items: center;
}
.goods-btm-flex .price {
  flex: 1;
  font-size: 20px;
  color: #e02e24;
}
.goods-btm-flex .count {
  flex: 0 0 auto;
  font-size: 14px;
  color: #999;
}
.checkout-section {
  background: #fff;
  padding: 10px 15px;
}
.params {
  display: flex;
  align-items: center;
  font-size: 13px;
}
.params .title {
  flex: 1;
}
.color-red {
  color: #e02e24;
}
.total-price {
  text-align: right;
  font-size: 14px;
}
.payment-btn {
  padding: 15px;
}
</style>
