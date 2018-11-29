<template>
	<div style="padding: 15px">
		<div class="bind-top">
			<h2>绑定手机号</h2>
			<span class="skip">跳过</span>
		</div>
		<p class="tips">根据国家互联网信息办公室颁布的《移动互联网应用程序信息服务管理规定》《互联网论坛社区服务管理规定》，互联网注册用户应当提供基于移动电话号码等方式的真实身份信息。</p>
		<div class="form-container">
			<div class="input-item">
				<input type="text" v-model="mobile" placeholder="请输入手机号">
			</div>	
			<div class="input-item">
				<input type="text" v-model="code"  placeholder="请输入验证码">
				<div>
          <span class="send-code" :class="{ success: canSendCode && isDisable }" @click="sendCode">{{ codeText }}</span>
        </div>
			</div>
			<div @click="submit" class="submit" :class="{ success: canSendCode && code }">绑定</div>
		</div>
	</div>	
</template>

<script>
import { trim } from 'vux'	
import http from '@/utils/http'	
var maxTime = 60
var currentTime = maxTime

export default {
	data () {
		return {
			mobile: '',
			code: '',
			number: currentTime,
			canSendCode: false
		}
	},
	computed: {
		isDisable () {
      if (this.codeText == '获取验证码') return true
      return false  
    },
		codeText () {
      if (this.number == maxTime) return '获取验证码'
      return this.number+'s后重发' 
    },
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
    sendCode () {
    	if (!this.canSendCode) return
    	if (!this.isDisable) return	
      let params = {
        mobile: this.mobile,
        type: 1
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
      let params = {
        mobile: this.mobile,
        code: this.code
      }
      http.post('/users/mobile', params, false, res => {
        if (res.status == 1) {
          this.showDialog = false
          if (this.$store.state.userInfo) {
            this.$store.state.userInfo.mobile = this.mobile 
          } 
          if (this.$route.query.type == 'distributor') {
            /**
             * 暂时关闭分销商申请页面 by 2018/10/15
             */
            this.$vux.toast.show({
              text: '该功能暂时关闭!',
              type: 'warn',
              width: 'auto',
              position: 'middle'
            })
            return
            
            // 申请成为分销商
            http.post('/distributor/apply', {}, false, res => {
              if (res.status == 1) {
                this.$router.push({ path: '/distributor/status' })
              }
            })          
            return
          }         
          this.$vux.toast.show({
            text: '绑定手机号成功！',
            type: 'success',
            width: 'auto',
            position: 'middle'
          })
          // 判断传过来的参数是代理申请并且没有手机号的绑定完需要跳转到代理商申请页面
          if (this.$route.query.type == 'agent') {
            setTimeout(() => {
              this.$router.push({ path: '/agentApply' })
            }, 2000)
          }else {
            setTimeout(() => {
              this.$router.go(-1)
            }, 2000)
          }      
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
.bind-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.bind-top h2 {
	font-size: 24px;
	color: #38393C;
	font-weight: 700;
}	
.bind-top .skip {
	font-size: 14px;
	color: #9B9B9B;
	text-decoration: underline;
}
.tips {
	font-size: 12px;
	color: #9B9B9B;
	line-height: 17px;
	padding: 5px 0 15px;
}
.form-container {
	background: #FFFFFF;
	box-shadow: 0 7px 10px -5px rgba(0,0,0,0.15);
	border-radius: 5px;
	padding: 15px;
}
.input-item {
	display: flex;
	padding-bottom: 15px;
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
	margin-left: 20px;
}
.submit {
	margin-top: 10px;
	background: #CCCCCC;
	border-radius: 3px;
	line-height: 50px;
	color: #fff;
	text-align: center;
}
.submit.success {
	background: #71ABFD;
}
.send-code.success{
	background: #71ABFD;
}
</style>