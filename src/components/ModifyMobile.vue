<template>
	<div class="router-fixed" style="z-index: 101">
		<group gutter="0">
			<x-input class="input-cell" ref="mobile" is-type="china-mobile" :placeholder="placeholder" v-model="mobile"></x-input>
			<x-input class="input-cell" ref="code" :min="4" placeholder="请输入验证码" v-model="code">
				<span @click="sendCode" slot="right">{{ codeText }}</span>
			</x-input>
		</group>
		<div class="btn">
			<div @click="submit" class="submit-btn">确认</div>
		</div>
	</div>
</template>

<script>
import http from '@/utils/http'	
import { Group, XInput, XButton } from 'vux'	

var maxTime = 60
var currentTime = maxTime
export default {
	components: {
		Group,
		XInput,
		XButton
	},
	data () {
		return {
			mobile: '',
			code: '',
			number: currentTime
		}
	},
	computed: {
		codeText () {
      if (this.number == maxTime) return '获取验证码'
      return this.number+'s后重发' 
    },
    isDisable () {
      if (this.codeText == '获取验证码') return true
      return false  
    },
    placeholder () {
    	let type = this.$route.params.type 
    	if ( type == 'old') {
    		return '请输入旧手机号码'
    	}else if ( type == 'new' ) {
    		return '请输入新手机号码'
    	}
    }
	},
	methods: {
		// 提交
		submit () {
			let isMobile = this.$refs.mobile.valid,
			isCode = this.$refs.code.valid
			let type = this.$route.params.type
			if (this.mobile == '') {
				this.$vux.toast.show({
					type: 'warn',
					text: '请输入手机号码!',
					width: 'auto',
					position: 'middle'
				})
				return
			}else if (this.code == '') {
				this.$vux.toast.show({
					type: 'warn',
					text: '请输入验证码!',
					width: 'auto',
					position: 'middle'
				})
				return
			}else if (!isMobile) {
				this.$vux.toast.show({
					type: 'warn',
					text: '手机号码格式有误!',
					width: 'auto',
					position: 'middle'
				})
				return
			}else if (!isCode) {
				this.$vux.toast.show({
					type: 'warn',
					text: '验证码格式有误!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			let params = {
				mobile: this.mobile,
				code: this.code
			}
			http.post('/users/mobile', params, false, res => {
				if (res.status == 1) {
					if (type == 'new') {
						this.$vux.toast.show({
							text: '操作成功',
							width: 'auto',
							type: 'success',
							position: 'middle'
						})
						if (this.$store.state.userInfo) {
							this.$store.state.userInfo.mobile = this.mobile
						}					
						this.mobile = ''
						this.code = ''
						this.$router.push({ path: '/my' })
					}else if (type == 'old') {
						this.mobile = ''
						this.code = ''
						this.$router.push({ path: '/my/setting/mobile/new' })
						currentTime = maxTime
						this.number = maxTime
						clearInterval(this.timer) 
					}					
				}else {
					this.mobile = ''
					this.code = ''
					this.$vux.toast.show({
						text: res.info,
						width: 'auto',
						type: 'warn',
						position: 'middle'
					})
				}
			})	
			
		},
    sendCode () {
    	// 发送短信验证码
    	let type = this.$route.params.type
    	let codeType = ''
    	if (type == 'old') {
    		codeType = 2
    	}else if (type == 'new') {
    		codeType = 3
    	}
    	let params = {
        mobile: this.mobile, // 提交的手机号
        type: codeType
      } 
      http.post('/users/sendSMS', params, false, res => {
        if (res.status == 1) {
        	this.countDown()
          this.$vux.toast.show({
          	type: 'success',
            text: '发送成功!',
            width: 'auto',
            position: 'middle'
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
  beforeRouteLeave (to, from, next) {
		currentTime = maxTime
		clearInterval(this.timer) 
		next()
  }
}	
</script>

<style scoped>
.btn {
	padding: 15px;
}	
.input-cell {
	padding: 12px 15px;
	font-size: 14px;
}
.submit-btn {
	margin: 10px 0 0 0;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
</style>