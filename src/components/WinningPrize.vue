<template>
	<div class="winning-prize" v-if="LuckyData">
		<div class="winning-head-img">
    	<img src="./../assets/images/winning_title.png" />
  	</div>
  	<div class="winning-hint">
	    <div class="text-large">在第{{ LuckyData.luckyNo }}期活动0元抢到商品</div>
	    <span v-if="LuckyData.orderNo == ''">请填写您的信息以便我们将奖品寄出</span>
      <span v-else>感谢您的支持，更多信息请点击查看订单</span>
  	</div>
  	<!-- 抢购的商品信息 -->
	  <router-link v-if="LuckyData.goods.id != 4" class="panic-product" :to="{ path: '/goods/detail', query: { id: LuckyData.goods.id } }">
	    <div class="product-cover">
	      <div class="img-holder"><img :src="LuckyData.goods.img"></div>
	    </div>
	    <div class="panic-info">
	      <div class="join-text">{{ LuckyData.goods.name }}</div>
	      <div class="price">¥ {{ LuckyData.goods.price | toDecimal }}</div>
	      <!-- <span class="tips">15人已0元拿</span> -->
	    </div>
	  </router-link>
    <div v-else class="panic-product">
      <div class="product-cover">
        <div class="img-holder"><img :src="LuckyData.goods.img"></div>
      </div>
      <div class="panic-info">
        <div class="join-text">{{ LuckyData.goods.name }}</div>
        <div class="price">¥ {{ LuckyData.goods.price | toDecimal }}</div>
        <!-- <span class="tips">15人已0元拿</span> -->
      </div>
    </div>
		<!-- 填写收货地址 -->
	  <div class="choose-address" @click="chooseAddress">
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
		<!-- 按钮 -->
	  <div class="submit-btn">
	    <span v-if="LuckyData.orderNo == ''" @click="submit" class="btn">确认</span>
	    <router-link v-else class="btn" :to="{ path: '/my/order/detail', query: { orderNo: LuckyData.orderNo } }" tag="span">查看订单</router-link>
  	</div>
	</div>
</template>

<script>
import http from '@/utils/http'  
import { toDecimal } from '@/utils/mUtils'

export default {
	data () {
		return {
			showSubmitBtn: true,
      LuckyData: null,
			addressData: {},
      load: true
		}
	},
	methods: {
		// 提交
		submit () {
			if (this.LuckyData.addressData == {}) {
				this.$vux.toast.show({
          type: 'warn',
          text: '请选择收货地址!',
          width: 'auto',
          position: 'middle'
        })
				return
			}
      http.post('/lucky/getPrize', { addrId: this.addressData.id }, false, res => {
        if (res.status == 1) {
          this.LuckyData.orderNo = res.data.orderNo
          this.$vux.confirm.show({
            title: '提示信息',
            content: '收货信息已收到，我们将火速寄出，敬请期待!',
            showCancelButton: false
          })
        }
      })
  			
		},
    // 获取抢购的数据
    getLuckyData () {
      http.get('/lucky', {}, false, res => {
        if (res.status == 1) {
          this.LuckyData = res.data 
          // 没有获奖不能进入该页面
          if (res.data.type != 1) {
            this.$router.push({ path: '/' })
          }
          this.addressData = {
            id: res.data.addrId,
            reciever: res.data.reciever,
            mobile: res.data.mobile,
            details: res.data.address 
          }
        }
      })
    },
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
            }else {
              that.$vux.toast.show({
                type: 'warn',
                text: '输入的地址有误!',
                width: 'auto',
                position: 'middle'
              })
            }
          })
        }
      })
    },
	},
  filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  },
  mounted () {
    this.getLuckyData()
  }
}	
</script>

<style scoped>
.winning-prize {
  position: relative;
  height: 100%;
  background: #f84a49 url('./../assets/images/winning_bg_01.png') no-repeat;
  background-size: 100%;
  padding: 0 15px;
  overflow: hidden;
}
.winning-head-img {
  width: 180px;
  height: 60px;
  margin: 10% auto 10px auto;
}
.winning-hint {
  text-align: center;
  color: #fff;
  font-size: 13px;
  margin-bottom: 15px;
}
.winning-hint .text-large {
  font-size: 18px;
}
.panic-product {
  display: flex;
  padding: 10px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 5px;
}
.product-cover {
  flex: 0 0 100px;
  width: 100px;
  overflow: hidden;
}
.product-cover .img-holder {
  padding-bottom: 100%;
}
.panic-info {
  margin-left: 8px;
}
.panic-info .join-text {
  font-size: 16px;
  color: #333;
  line-height: normal;
}
.panic-info .tips {
  font-size: 12px;
  color: #999;
  line-height: 12px;
}
.panic-info .price {
  font-size: 20px;
  color: #e02e24;
  font-weight: 500;
  padding-top: 6px;
}
.choose-address {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
}
.choose-address::after {
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
.choose-address .iconfont {
  flex: 0 0 auto;
  font-size: 20px;
}
.address-content {
  flex: 1;
  padding-left: 8px;
  padding-right: 15px;
}
.address-content .name {
  font-size: 16px;
}
.address-detail {
  color: #666;
}
.submit-btn {
  position: relative;
  margin-bottom: 15px;
}
.submit-btn::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f28e05;
  bottom: -3px;
  z-index: 0;
  border-radius: 50px;
}
.submit-btn .btn {
  position: relative;
  display: block;
  text-align: center;
  border-radius: 50px;
  background: #ffc825;
  background: linear-gradient(#f9f647, #ffc825);
  color: #e02e24;
  font-size: 18px;
  line-height:2.55555556;
  font-weight: 500; 
  z-index: 2;
  cursor: pointer;
}
.submit-btn:active::after {
	display: none;
}
.submit-btn:active .btn {
	top: 3px;
}
.submit-btn .btn::after {
  border: 0;
}	
</style>