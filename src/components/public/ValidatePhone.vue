<template>
	<div>
		<!-- 绑定手机号 -->
    <x-dialog v-model="showDialog" class="dialog-demo" hide-on-blur>
      <div class="bind-dialog">
        <div class="bind-dialog-hd">
          <h3>{{ title }}</h3>
          <div class="amount">{{ amount }}元</div>
          <x-icon class="close" @click="showDialog = false" type="ios-close-outline" size="24" fill="#e02e24"></x-icon>
        </div>
        <div class="bind-dialog-bd">
          <div class="bind-dialog-form">
            <div class="dialog-input-group">
              <i class="iconfont">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shoujihao"></use>
                </svg>
              </i>
              <input type="text" v-model="mobile" placeholder="请输入手机号">
            </div>
            <div class="dialog-input-flex">
              <div class="dialog-input-group">
                <i class="iconfont">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanzhengma"></use>
                  </svg>
                </i>
                <input type="text" v-model="code"  placeholder="请输入验证码">
              </div>
              <div>
                <span class="send-code" @click="sendCode">{{ codeText }}</span>
              </div>
            </div>
            <div class="dialog-submit">
              <x-button type="warn" @click.native="submit">确定</x-button>
            </div>
          </div>
        </div>
      </div>  
    </x-dialog>
	</div>
</template>

<script>
import { XDialog, XButton, trim } from 'vux'
import { mapGetters } from 'vuex'
import http from '@/utils/http'

var maxTime = 60
var currentTime = maxTime
export default {
	components: {
    XDialog,
    XButton
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '支付金额'
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showDialog: false,
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
    }
  },
  methods: {
    // 验证是否为11位有效手机号
    isPoneAvailable (str) {
      var reg = /^1[34578][0-9]{9}$/
      if (!reg.test(str)) {
        return false
      } else {
        return true
      }
    },
    sendCode () {
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
      }
      let params = {
        phone: this.mobile,
        type: 1
      }
      http.post('/users/sendSMS', params, false, res => {
        if (res.status == 1) {
          this.countDown()
          this.$vux.toast.show({
            text: '发送成功!',
            type: 'success',
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
        phone: this.mobile,
        code: this.code
      }
      http.post('/users/mobile', params, false, res => {
        if (res.status == 1) {
          this.showDialog = false
          if (this.$store.state.userInfo) {
            this.$store.state.userInfo.mobile = this.mobile 
          }          
          this.$vux.toast.show({
            text: '操作成功!',
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
    }
  },
  beforeRouteLeave (to, from, next) {
    currentTime = maxTime
    clearInterval(this.timer) 
    next()
  },
  watch: {
    isShow (val) {
      this.showDialog = val
      this.$emit('statusChange', this.showDialog)
    },
    showDialog (val) {
      this.$emit('statusChange', val)
    }
  }
}	
</script>

<style scoped>
.bind-dialog {
  padding: 15px;
}
.bind-dialog-hd {
  position: relative;
}
.bind-dialog-hd h3 {
  flex: 1;
  font-size: 16px;
  line-height: normal;
}
.bind-dialog-bd {
  padding: 10px 0 0 0;
}
.dialog-input-group {
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
}
.dialog-input-group i {
  height: 24px;
  font-size: 18px;
  color: #999;
  margin-right: 3px;
}
.dialog-input-group input {
  flex: 1;
  width: 100%;
  outline: none;
  line-height: 24px;
}
.dialog-input-flex {
  display: flex;
}
.bind-dialog .send-code {
  flex: 0 0 auto;
  display: block;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  border: 1px solid #e4e4e4;
  width: 100px;
  border-radius: 3px;
  text-align: center;
  margin-left: 8px;
  background: #eeeeee;
  color: #787878;
}
.bind-dialog .send-code.disabled {
  color: #999;
}
.dialog-submit {
  margin-top: 5px;
}	
.amount {
  text-align: center;
  color: #e02e24;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

