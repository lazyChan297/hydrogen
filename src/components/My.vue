<template>
	<div v-if="user">
    <div class="my-box">
      <div class="top-info">
        <div class="user-info">
          <h4>你好，{{ user.nickname }}</h4>
          <p>今天是你来到氢量极品的第{{ user.days }}天</p>
        </div>
        <router-link class="i-setting" :to="{ path: '/my/setting' }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cloud-setting"></use>
          </svg>
        </router-link>
      </div>
      <div class="my-card" @click="toUserIndex">
        <div class="card-box">
          <div class="hydrogen">
            <div class="top-hydrogen">
              <div class="top-hydrogen-left">
                <div class="avatar"><img :src="user.avatar"></div>
                <div class="content">
                  <h4>我的氢量极品</h4>
                  <p>进入个人主页</p>
                </div>
              </div>
              <i @click.stop="toUserPublishingCase">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bianji"></use>
                </svg>
              </i>
            </div>
            <div class="my-tags">
              <span v-if="user.agentInfo.length > 0" v-for="(item,index) in user.agentInfo" :key="index">{{ item }}</span>
              <span v-if="userInfo.distributor">分销员</span>
              <span v-if="user.agentInfo.length == 0 && !userInfo.distributor">普通用户</span>
            </div>
          </div>
        </div>
      </div>
      <div class="my-link">
        <router-link :to="{path:'marketing/qrcode'}" class="my-link-item" tag="div">
          <div class="link-item-left">
            <i class="link-icon"><img src="./../assets/images/my_link_icon05.png"></i>
            <h4>我的二维码</h4>
          </div>
        </router-link>
        <router-link :to="{ path: '/my/order', query: { type: 0 } }" class="my-link-item" tag="div">
          <div class="link-item-left">
            <i class="link-icon"><img src="./../assets/images/my_link_icon01.png"></i>
            <h4>我的订单</h4>
          </div>
          <span class="link-tips">当前有{{ user.unshippedOrders }}个待发货订单</span>
        </router-link>
        <div @click="chooseAddress" class="my-link-item">
          <div class="link-item-left">
            <i class="link-icon"><img src="./../assets/images/my_link_icon02.png"></i>
            <h4>收货地址</h4>
          </div>
          <span class="link-tips">你有{{ user.addrs }}个收货地址</span>
        </div>
      </div>
    </div>
    <div style="height: 10px"></div>
    <div class="my-link admin-link">
      <router-link :to="{ path: '/dataReport' }" class="my-link-item" tag="div">
        <div class="link-item-left">
          <i class="link-icon"><img src="./../assets/images/report_icon.png"></i>
          <h4>代理商数据报告</h4>
        </div>
        <!-- <span class="link-tips">你有新的消息要处理</span> -->
      </router-link>
    </div>
    <div style="height: 10px"></div>
    <div v-if="userInfo.distributor" @click="handleDistributor('分销员')" class="my-distributor">
      <i class="icon"><img src="./../assets/images/date_icon.png"></i>
      <div class="content">
        <h4>分销员中心</h4>
        <p>您有{{ user.distributionOrders }}笔新的订单</p>
      </div>
      <span class="distributor-btn">进入</span>
    </div>
    <div style="height: 10px"></div>
    <div @click="handleAgentor('代理商')" class="my-distributor">
      <i class="icon"><img src="./../assets/images/agent_icon.png"></i>
      <div class="content">
        <h4>代理商中心</h4>
        <!-- <p>您有1个新的消息</p> -->
      </div>
      <span class="distributor-btn">进入</span>
    </div>
    <!-- 管理员中心 -->
    <div v-if="userInfo.applicationMangement" style="height: 10px"></div>
    <div v-if="userInfo.applicationMangement" class="mangement">
      <div class="mangement-top">
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cloud-setting"></use>
          </svg>
        </i>
        <h4>管理员中心</h4>
      </div>
      <div class="mangement-links">
        <router-link class="link-item" :to="{ path: '/applyList' }">
          <i><img src="./../assets/images/admin_icon01.png"></i>
          <h4>审核</h4>
        </router-link>
        <router-link class="link-item" :to="{ path: '/recharge/list' }">
          <i><img src="./../assets/images/admin_icon02.png"></i>
          <h4>充值</h4>
        </router-link>
      </div>
    </div>
    <footer-brand></footer-brand>
    <footer-nav bottom-nav="我的" text-color="#999"></footer-nav>
    <v-dialog ref="dialog">
      <div class="dialog-tips">{{ dialogTips }}</div>
      <div @click="handleSubmit" class="jump-btn">{{ dialogBtnText }}</div>
      <span @click="cancelDialog" class="cancel-dialog">以后再说</span>
    </v-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'  
import FooterNav from '@/components/public/FooterNav'	
import http from '@/utils/http'
import FooterBrand from '@/components/public/FooterBrand'
import VDialog from '@/components/public/VDialog'

export default {
	components: {
    FooterNav,
    FooterBrand,
    VDialog
  },
	data () {
		return {
      deliveryManage: false,
      user: null,
      type: null
		}
	},
  computed: {
    ...mapGetters(['userInfo']),
    dialogTips () {
      return `您还不是${ this.type }，该功能无法使用`
    },
    dialogBtnText () {
      return `申请成为${ this.type }`
    },
    jumpPath () {
      if (this.type == '分销员') {
        return { path: '/bindPhone', query: { type: 'distributor' } }
      }
      return { path: '/bindPhone', query: { type: 'agent' } }
    }
  },
  methods: {
    handleSubmit () {
      // 如果存在手机号则直接申请成为分销商
       /*
      * 暂时关闭分销商申请
      */
      // if (this.user.distributorApplication === 0) {
      //   this.$router.push({ path: '/distributor/status' })
      //   return
      // }
     
      // if (this.userInfo.mobile) {
      //   http.post('/distributor/apply', {}, false, res => {
      //     if (res.status == 1) {
      //       this.$router.push({ path: '/distributor/status' })
      //     }
      //   })  
      //   return   
      // }
      this.$router.push(this.jumpPath)
    },
    handleAgentor (type) {
      this.type = type
      if (this.user.agentApplication === 0) {
        this.$router.push({ path: '/agent/status' })
        return
      }
      if (this.user.agentInfo.length > 0) {
        this.$router.push({ path: '/agentors' })
        return
      }else if (this.user.agentInfo.length == 0 && this.userInfo.mobile == '') {
        this.$refs.dialog._show()
        return
      }
      this.$router.push({ path: '/agentApply' })
    },
    handleDistributor (type) {
      this.type = type
      if (!this.user.distributor) {
        this.$refs.dialog._show()
        return
      }
      this.$router.push({ path: '/distributor' })
    },
    cancelDialog () {
      this.$refs.dialog._cancel()
    },
    toUserIndex () {
      if (!this.user.distributor) {
        this.$vux.toast.show({
          type: 'warn',
          text: '您还不是分销员哦~',
          width: 'auto',
          position: 'middle'
        })
        return
      }
      this.$router.push({ path: '/user/index' }) 
    },
    toUserPublishingCase () {
      if (!this.user.distributor) {
        this.$vux.toast.show({
          type: 'warn',
          text: '您还不是分销员哦~',
          width: 'auto',
          position: 'middle'
        })
        return
      }
      http.get('/u/' + this.userInfo.userSn, {}, false, res => {
        if (res.status == 1 && res.data.imgs) {
          this.$router.push({ path: '/user/publishingCase', query: { type: 'edit' } }) 
        }else if (res.status == 1 && !res.data.imgs) {
          this.$router.push({ path: '/user/publishingCase' }) 
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
    getuser () {
      http.get('/home/myCenter', {}, false, res => {
        if (res.status == 1) {
          this.user = res.data
        }
      })
    },
    // 打开微信地址
    chooseAddress () {    
      this.$wechat.openAddress({
        success: res => {
          
        }
      })
    },
  },
  mounted () {
    this.getuser()
    http.get('/users/status', {}, false, res => {
      if (res.status == 1) {
        this.deliveryManage = res.data.deliveryManage 
      }
    })
  }
}	
</script>

<style scoped>
.my-box {
  background: #fff;
  border-bottom: 1px solid #E2E2E2;
}
.top-info {
  display: flex;
  padding: 30px 15px 0 15px;
  align-items: center;
}
.top-info .user-info {
  flex: 1;
}
.top-info h4 {
  font-size: 24px;
  color: #38393C;
  font-weight: 700;
  line-height: 24px;
}
.top-info p {
  font-size: 12px;
  color: #9B9B9B;
  padding-top: 6px;
}
.i-setting {
  position: relative;
  margin-top: -18px; 
}
.i-setting,
.i-setting .icon {
  display: block;
  width: 24px;
  height: 24px;
}
.my-card {
  padding: 0 15px;
  margin: 20px 0 25px 0;
}
.card-box {
  box-shadow: 0 2px 10px 0 #71ABFD;
  border-radius: 8px;
  background: #0091FF;
  padding: 15px;
}
.top-hydrogen {
  display: flex;
  align-items: center;
}
.top-hydrogen-left {
  flex: 1;
  display: flex;
  align-items: center;
}
.avatar {
  width: 42px;
  height: 42px;
  border: 2px solid #fff;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 10px;
}
.top-hydrogen-left .content h4 {
  font-size: 16px;
  color: #FFFFFF;
  font-weight: 700;
}
.top-hydrogen-left .content p {
  font-size: 10px;
  color: #fff;
}
.top-hydrogen i .icon {
  width: 24px;
  height: 24px;
  fill: #fff;
}
.my-tags {
  padding-top: 10px;
}
.my-tags span {
  font-size: 10px;
  line-height: 10px;
  color: #fff;
  padding: 5px 10px;
  background: #0083E6;
  border-radius: 20px;
  margin-right: 5px;
  display: inline-block;
}
.my-link {
  padding-bottom: 10px;
}
.my-link-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 15px;
}
.my-link-item:after {
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
  right: 17px
}
.link-item-left {
  display: flex;
  align-items: center;
  flex: 1;
}
.link-tips {
  font-size: 12px;
  line-height: 12px;
  color: #9B9B9B;
  padding-right: 10px;
}
.my-link-item .link-icon {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.my-link-item .link-icon img {
  display: block;
}
.link-item-left h4 {
  font-size: 14px;
  color: #38393C;
}
.my-distributor {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
}
.my-distributor .icon {
  width: 50px;
  height: auto;
  margin-right: 10px;
}
.my-distributor .icon img {
  display: block;
}
.my-distributor .content {
  flex: 1;
  padding-top: 2px;
}
.my-distributor .content h4 {
  font-size: 16px;
  color: #4F5054;
  font-weight: 700;
}
.my-distributor .content p {
  font-size: 12px;
  color: #9B9B9B;
}
.distributor-btn {
  padding: 8px 20px;
  font-size: 14px;
  line-height: 14px;
  color: #fff;
  border-radius: 30px;
  background: #FF7584;
}
.dialog-tips {
  font-size: 14px;
  color: #4F5054;
}
.jump-btn {
  margin: 15px 0;
  height: 45px;
  color: #fff;
  background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
  box-shadow: 0 7px 10px -5px #71ABFD;
  border-radius: 3px;
  text-align: center;
  line-height: 45px;
}
.cancel-dialog {
  display: block;
  font-size: 14px;
  color: #9B9B9B;
  padding-bottom: 15px;
}
.admin-link {
  padding-bottom: 0;
  background: #fff;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
}
.mangement {
  background: #fff;
}
.mangement-top {
  padding: 12px 15px;
  border-bottom: 1px solid #e2e2e2;
}
.mangement-top i,
.mangement-top h4 {
  display: inline-block;
  vertical-align: middle;
}
.mangement-top i {
  height: 20px;
}
.mangement-top i svg {
  fill: #71ABFD;
}
.mangement-top h4 {
  font-weight: 700;
  color: #38393C;
  font-size: 16px;
}
.mangement-links {
  display: flex;
  align-items: center;
}
.mangement-links .link-item {
  flex: 1;
  text-align: center;
}
.link-item {
  padding: 15px 0;
}
.link-item img {
  max-width: 36px;
}
.link-item h4 {
  padding-top: 3px;
  font-size: 14px;
  color: #38393C;
}
</style>