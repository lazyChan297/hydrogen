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
          <div class="name">{{ addr.reciever ? addr.reciever + ', ' + addr.mobile : '请填写联系方式' }}</div>
          <div class="address-detail">{{ addr.reciever ? addr.details : '无地址'  }}</div>
        </div>
      </div>
    </div>
    <div style="height: 10px"></div>
    <!-- 商品 -->
    <div class="goods-wrapper">
    	<div class="goods-head">商品</div>
    	<div class="goods-item" v-for="(item, i) in goodsList" :key="i">
				<div class="goods-img">
					<span class="img-holder">
						<img class="obj-cover" :src="item.img">
					</span>
				</div>
				<div class="goods-content">
					<h4 class="goods-name">{{ item.name }}</h4>
					<span class="price">¥{{ item.price || item.tradePrice | toDecimal }}</span>
				</div>
				<span class="quantity">x{{ item.quantity }}</span>
			</div>
			<div class="params" v-if="type === 'purchase'">
				<div class="params-part">
					<span>总计</span>
					<span>￥{{ totalPrice | toDecimal }}</span>
				</div>
				<div class="params-part">
					<span>运费</span>
					<span>￥0.00</span>
				</div>
				<div class="params-part">
					<span>实付款</span>
					<span class="color-blue">￥{{ totalPrice | toDecimal }}</span>
				</div>
			</div>
    </div>
    <div v-if="type === 'purchase'" @click="submit" class="submit-btn">立即支付</div>
    <div v-else @click="submit" class="submit-btn">确认</div>

    <!-- 进货确认支付弹窗 -->
		<x-dialog v-model="showDialog" :hide-on-blur="true">
			<div class="dialog">
	    	<div class="dialog-head">
	    		<span>支付金额</span>
	    		<h4 class="total-price">¥{{ totalPrice | toDecimal }}</h4>
	    	</div>
	    	<div class="dialog-body">
	    		<p class="verify-tips">请进行手机验证：</p>
	    		<div class="form-container">
	    			<div class="input-item">
	    				<input type="text" class="mobile" disabled v-model="mobile" placeholder="请输入手机号">
	    				<span @click="sendCode" class="send-code" :class="{ success: canSendCode && isDisable }">{{ codeText }}</span>
	    			</div>
	    			<div class="input-item">
	    				<input type="text" v-model="code" placeholder="请输入验证码">
	    			</div>
	    		</div>
	    		<div @click="payment" class="submit">确认</div>
	    		<div @click="showDialog = false" class="cancel">取消</div>
	    	</div>
	    </div>
		</x-dialog> 
	</div>
</template>

<script>
import { mapGetters } from 'vuex'	
import http from '@/utils/http'
import { XDialog, trim } from 'vux'
import { toDecimal } from '@/utils/mUtils'
var maxTime = 60
var currentTime = maxTime

export default {
	components: {
		XDialog
	},
	data () {
		return {
			orderIds: '',
			goodsList: [],
			addr: {},
			mobile: '',
			code: '',
			number: currentTime,
			canSendCode: false,
			showDialog: false
		}
	},
	computed: {
		...mapGetters(['purchaseGoods', 'userInfo']),
		type () {
			return this.$route.params.type
		},
		isDisable () {
      if (this.codeText == '获取验证码') return true
      return false  
    },
		codeText () {
      if (this.number == maxTime) return '获取验证码'
      return this.number+'s后重发' 
    },
		totalPrice () {
			let t = 0
			this.goodsList.forEach(item => {
				t += item.amount
			})
			return t
		}
	},
	methods: {
		payment () {
			if (trim(this.mobile) == '') {
        this.$vux.toast.show({
          text: '手机号不能为空!',
          type: 'warn',
          width: 'auto',
          position: 'middle'
        })
        return
      }else if (!this.isPoneAvailable(this.mobile)) {
        this.$vux.toast.show({
          text: '手机号码格式不正确!',
          type: 'warn',
          width: 'auto',
          position: 'middle'
        })
        return
      }else if (trim(this.code) == '') {
        this.$vux.toast.show({
          text: '请输入验证码!',
          type: 'warn',
          width: 'auto',
          position: 'middle'
        })
        return
      }else if (!this.addr.id) {
      	this.$vux.toast.show({
          text: '请选择收货地址!',
          type: 'warn',
          width: 'auto',
          position: 'middle'
        })
        return	
      }
      // 提交进货商品
      let goods = [];
      this.goodsList.forEach(item => {
      	goods.push({
      		id: item.id,
      		quantity: item.quantity
      	})
      })
      let params = { goods: JSON.stringify(goods), code: this.code, addr: this.addr.id }
      http.post('/agent/stock', params, false, res => {
      	if (res.status == 1) {
      		this.$vux.toast.show({
      			type: 'success',
      			width: 'auto',
      			text: '购买成功!',
      			position: 'middle'
      		})
      		setTimeout(() => {
      			this.$router.push({ path: '/my/order', query: { type: 0 } })	
      		}, 2000)
      	}else {
      		this.$vux.toast.show({
      			type: 'warn',
      			width: 'auto',
      			text: res.info,
      			position: 'middle'
      		})
      	}
      })
		},
		// 验证是否为11位有效手机号
    isPoneAvailable (str) {
      var reg = /^1[345789][0-9]{9}$/
      if (!reg.test(str)) {
        return false
      } else {
        return true
      }
    },
		submit ()  {
			if (this.type == 'replenishment') {
				if (!this.addr.id) {
					this.$vux.toast.show({
	          text: '请选择收货地址!',
	          type: 'warn',
	          width: 'auto',
	          position: 'middle'
	        })
	        return	
				}
				this.$vux.confirm.show({
					title: '提示信息',
					content: '确定要补货吗？',
					onConfirm: () => {
						let params = {
							orderIds: this.orderIds,
							addr: this.addr.id
						}
						http.post('/agent/replenish', params, false, res => {
							if (res.status == 1) {
								this.$router.push({ path: '/replenishment/status' })
							}
						})
					}
				})					
			}else if (this.type == 'purchase') {
				this.showDialog = true
			}
		},
		sendCode () {
    	if (!this.canSendCode) return
    	if (!this.isDisable) return	
      let params = {
        mobile: this.mobile,
        type: 6
      }
      http.post('/users/sendSMS', params, false, res => {
        if (res.status == 1) {
          this.countDown()
          this.$vux.toast.show({
            text: '发送成功！',
            type: 'success',
            width: 'auto',
            position: 'middle'
          })
        }else {
        	this.$vux.toast.show({
            text: res.info,
            type: 'warn',
            width: 'auto',
            position: 'middle'
          })
        }
      })
    },
    countDown () {
      if (!this.isDisable) return
      currentTime = maxTime
      clearInterval(this.timer) 
      this.timer = setInterval(() => {
        currentTime--
        this.number = currentTime
        if (currentTime <= 0) {
          clearInterval(this.timer)
          this.number = maxTime
        }
      },1000)
    },
		getUserAddr () {
			http.get('/users/addrInfo', {}, false, res => {
				if (res.status == 1) {
					this.addr = res.data.addr
				}
			})
		},
		getOrder () {
			http.get('/agent/unreplenish', {}, false, res => {
				if (res.status == 1) {
					this.goodsList = res.data.goods,
					this.orderIds = res.data.orderIds
					this.addr = res.data.addr
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
              that.addr = result.data.addr
            }
          })
				}
			})
		},
	},
	mounted () {
		if (this.type == 'replenishment') {
			this.getOrder()
		}else if (this.type == 'purchase') {
			this.goodsList = this.purchaseGoods
			this.getUserAddr()
		}
		this.mobile = this.userInfo.mobile
	},
	filters: {
		toDecimal (x) {
			return toDecimal(x)
		}
	},
	beforeRouteLeave (to, from, next) {
    currentTime = maxTime
    clearInterval(this.timer) 
    next()
  },
  watch: {
  	mobile (val) {
  		this.canSendCode = this.isPoneAvailable(val)
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
.goods-wrapper {
	background: #fff;
	border-top: 1px solid #e2e2e2;
	border-bottom: 1px solid #e2e2e2;
}
.goods-head {
	padding: 10px 15px;
	font-size: 14px;
	color: #38393C;
	border-bottom: 1px solid #e2e2e2;
}
.goods-item {
	display: flex;
	padding: 15px;
	align-items: center;
}
.goods-img {
	flex: 0 0 80px;
	width: 80px;
	height: 80px;
	margin-right: 10px;
}
.goods-content {
	flex: 1;
}
.goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
}
.price {
	font-size: 12px;
	color: #9B9B9B;
}
.quantity {
	font-size: 14px;
	color: #9B9B9B;
}
.params-part {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	border-top: 1px solid #e2e2e2;
}
.color-blue {
	color: #71ABFD ;
}
.submit-btn {
	margin: 20px 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.dialog {
	text-align: left;
}
.dialog-head {
	background: #3484FF;
	text-align: center;
	padding: 15px 0;
	color: #fff;
}
.dialog-head span {
	font-size: 14px;
}
.dialog-head .total-price {
	font-size: 24px;
	font-weight: 700;
}
.dialog-body {
	padding: 15px;
}
.verify-tips {
	color: #4F5054;
	padding-bottom: 8px;
}
.input-item {
	display: flex;
	padding-bottom: 10px;
}
.input-item input {
	flex: 1;
	width: 100%;
	background: #F2F2F2;
	border-radius: 3px;
	height: 45px;
	line-height: 45px;
	padding-left: 15px;
	outline: none;
}
.send-code {
	flex: 0 0 auto;
	display: block;
	background: #ccc;
	border-radius: 3px;
	font-size: 12px;
	line-height: 45px;
	padding: 0 15px;
	color: #fff;
	margin-left: 10px;
}
.send-code.success{
	background: #71ABFD;
}
.submit {
	margin-top: 5px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.cancel {
	font-size: 14px;
	color: #9B9B9B;
	text-align: center;
	line-height: 40px;
}
.mobile {
	color: #999;
}
</style>