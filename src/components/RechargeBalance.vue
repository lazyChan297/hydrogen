<template>
	<div v-if="user">
		<div class="recharge-item">
			<div class="agent-info">
				<div class="avatar"><img :src="user.avatar"></div>
				<div class="content">
					<div class="name">{{ user.nickname }}</div>
				</div>
			</div>
		</div>
		<div style="height: 10px"></div>
		<div class="recharge-panel">
			<x-input class="input-amount" v-model="amount" placeholder="请输入充值金额..."></x-input>
			<div class="quick-container">
				<span class="quick-item" @click="selectAmount(item)" v-for="(item,index) in quickSelect" :key="index">{{ item }}</span>
			</div>
		</div>
		<div style="height: 10px"></div>
		<div class="total-amount">充值金额：{{ amount ? amount : '0.00' | toDecimal }}</div>
		<div class="recharge-btn">
		  <div :class="{ disabled: !amount }" @click="payConfirm" class="submit-btn">充值</div>
		</div>
		<!-- 弹窗 -->
		<x-dialog v-model="showDialog" :hide-on-blur="true">
			<div class="dialog">
	    	<div class="dialog-head">
	    		<span>支付金额</span>
	    		<h4 class="total-price">¥{{ amount | toDecimal }}</h4>
	    	</div>
	    	<div class="dialog-body">
	    		<p class="verify-tips">请进行手机验证：</p>
	    		<div class="form-container">
	    			<div class="input-item">
	    				<input class="mobile" type="text" disabled v-model="mobile" placeholder="请输入手机号">
	    				<span @click="sendCode" class="send-code" :class="{ success: canSendCode && isDisable }">{{ codeText }}</span>
	    			</div>
	    			<div class="input-item">
	    				<input type="text" v-model="code" placeholder="请输入验证码">
	    			</div>
	    		</div>
	    		<div @click="submit" class="submit">确认</div>
	    		<div @click="showDialog = false" class="cancel">取消</div>
	    	</div>
	    </div>
		</x-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'	
import { XInput, XButton, XDialog, trim } from 'vux'
import { toDecimal } from '@/utils/mUtils'
import http from '@/utils/http'
var maxTime = 60
var currentTime = maxTime

export default {
	components: {
		XInput,
		XButton,
		XDialog
	},
	data () {
		return {
			showDialog: false,
			amount: null,
			user: null,
			mobile: '',
			code: '',
			number: currentTime,
			canSendCode: false,
			quickSelect: [1000, 2000, 3000, 4000, 5000, 10000]
		}
	},
	computed: {
		...mapGetters(['userInfo']),
		isDisable () {
      if (this.codeText == '获取验证码') return true
      return false  
    },
		codeText () {
      if (this.number == maxTime) return '获取验证码'
      return this.number+'s后重发' 
    }
	},
	methods: {
		// 验证是否为11位有效手机号
    isPoneAvailable (str) {
      var reg = /^1[345789][0-9]{9}$/
      if (!reg.test(str)) {
        return false
      } else {
        return true
      }
    },
    submit () {
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
      }
      // 提交...
      let params = {
      	recharge: JSON.stringify({ userSn: this.user.userSn, amount: this.amount }),
      	code: this.code
      }
      http.post('/platform/recharge', params, false, res => {
      	if (res.status == 1) {
      		this.$vux.toast.show({
      			type: 'success',
      			text: '充值成功!',
      			width: 'auto',
      			position: 'middle'
      		})
      		setTimeout(() => {
      			this.$router.push({ path: '/recharge/record' })
      		}, 2000)
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
    sendCode () {
    	if (!this.canSendCode) return
    	if (!this.isDisable) return	
      let params = {
        mobile: this.mobile,
        type: 5
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
		statusChange (val) {
			this.showDialog = val
		},
		selectAmount (val) {
			this.amount = val
		},
		payConfirm () {
			if (!this.amount) {
				this.$vux.toast.show({
					type: 'warn',
					text: '请输入充值金额!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			this.showDialog = true
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
    }
	},
	mounted () {
		this.user = {
			avatar: this.$route.query.avatar,
			nickname: this.$route.query.nickname,
			userSn: this.$route.query.userSn
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
.recharge-item {
	display: flex;
	align-items: center;
	padding: 8px 15px;
	background: #fff;
}
.agent-info {
	flex: 1;
	display: flex;
	align-items: center;
}
.agent-info .avatar {
	flex: 0 0 auto;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 8px;
}
.content {
	flex: 1;
	line-height: normal;
}
.content .district {
	color: #787878;
}
.to-recharge {
	border-radius: 30px;
	line-height: 24px;
}	
.tips {
	padding: 12px 15px;
	color: #787878;
	line-height: 12px;
	font-size: 12px;
}
.tips span {
	color: #e02e24;
}
.recharge-panel {
	padding: 15px;
	background: #fff;
}
.input-amount {
	padding: 0 10px;
	height: 40px;
	border-radius: 5px;
	border: 1px solid #71ABFD;
}	
.quick-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-top: 10px;
	margin-bottom: -5px;
}
.quick-item {
	width: 30%;
	text-align: center;
	font-size: 16px;
	line-height: 34px;
	background: #fff;
	border: 1px solid #71ABFD;
	border-radius: 3px;
	margin: 5px 0;
}
.total-amount {
	background: #fff;
	padding: 10px 15px;
}
.submit-btn {
	margin: 30px 15px 0 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.disabled {
	background: #9B9B9B;
	box-shadow: 0 7px 10px -5px #9B9B9B;
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
	border-radius: 3px;
	font-size: 12px;
	line-height: 45px;
	padding: 0 15px;
	color: #fff;
	margin-left: 10px;
	background: #ccc;
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