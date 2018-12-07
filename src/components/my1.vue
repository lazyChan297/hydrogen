<template lang="html">
  <div class="my-wrapper">
    <div class="header">
      <div class="title">
        <span class="text">我的</span>
        <span class="icon">
          <i class="icon-qiandao"></i>
        </span>
      </div>
      <div class="bg-img">
        <div class="userInfo">
          <img :src="userInfo.avatarUrl" alt="" width="53" height="53">
          <span class="nickName">{{userInfo.nickName}}</span>
          <router-link class="index" to="/userIndex1" tag="span">主页</router-link>
        </div>
        <ul>
          <li><p>15</p>关注</li>
          <li><p>15</p>粉丝</li>
          <li><p>15</p>我的赞</li>
        </ul>
      </div>
    </div>
    <!-- 查询订单 -->
    <ul class="searchBystatu">
      <router-link :to="{ name: '', params: {} }" tag="li">
        <div class="icon"><i class="icon-waitpay"></i></div>待付款
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="li">
        <div class="icon"><i class="icon-waittran"></i></div>待发货
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="li">
        <div class="icon"><i class="icon-get"></i></div>已发货
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="li">
        <div class="icon"><i class="icon-waitwrite"></i></div>待评价
      </router-link>
    </ul>
    <!-- 邀请好友 -->
    <router-link tag="div" to="/inviteJoin" class="share">
      <img src="../assets/images/share-banner.png" alt="">
    </router-link>
    <div class="">
      <div class="routerLink" @click="chooseAddress">
        <i class="icon-address"></i>
        <span class="text">我的地址</span>
        <i class="icon-arrow"></i>
      </div>
      <router-link to="/integral" tag="div" class="routerLink">
        <i class="icon-jifen"></i>
        <span class="text">我的积分</span>
        <span class="num">
          1
          <i class="icon-arrow"></i>
        </span>

      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="div" class="routerLink line">
        <i class="icon-friend"></i>
        <span class="text">邀请好友</span>
        <span class="num">
          10个
          <i class="icon-arrow"></i>
        </span>
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="div" class="routerLink">
        <i class="icon-mycase"></i>
        <span class="text">案例</span>
        <span class="num">
          10个
          <i class="icon-arrow"></i>
        </span>
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="div" class="routerLink line">
        <i class="icon-tiwen"></i>
        <span class="text">提问</span>
        <span class="num">
          10个
          <i class="icon-arrow"></i>
        </span>
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="div" class="routerLink">
        <i class="icon-fenxiao"></i>
        <span class="text">分销员中心</span>
        <i class="icon-arrow"></i>
      </router-link>
    </div>
    <tab-bar :currentIndex="currentIndex"></tab-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TabBar from './public/TabBar.vue'
export default {
  data() {
    return {
      currentIndex: 4
    }
  },
  methods: {
    // 打开微信地址
    chooseAddress () {
      this.$wechat.openAddress({
        success: res => {

        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    TabBar
  }
}
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  .my-wrapper
    background:#fff
    .header
      .title
        display:flex
        justify-content:space-between
        align-items:center
        height:60px
        padding:0 15px
        .text
          font-size:24px
          color:$color-title
          font-weight:bold
      .bg-img
        background:url('../assets/images/me-bg.png') no-repeat center
        box-shadow:0px 8px 25px 0px rgba(0,132,255,0.25)
        background-size:100%
        height:170px
        margin:0 15px
        border-radius:8px
        .userInfo
          display:flex
          align-items:center
          padding:0 20px
          padding-top:25px
          margin-bottom:27px
          img
            border-radius:50%
            border:4px solid #fff
          .nickName
            margin-left:15px
            color:#fff
            font-size:16px
            font-weight:bold
            flex:1
          .index
            color:#fff
            border-radius:50px
            border:4px solid #fff
            width:70px
            text-align:center
        ul
          display:flex
          color:#fff
          li
            flex:1
            text-align:center
            p
              font-size:16px
    .searchBystatu
      display:flex
      height:70px
      margin-top:20px
      align-items:center
      li
        flex:1
        text-align:center
        font-size:14px
        color:$color-title
      .icon
        width:35px
        height:32px
        margin:auto
    .share
      margin:15px
      height:76px
      background:#f2f1f5
      border-radius:8px
      box-shadow:0px 18px 11px -9px rgba(169,165,193,0.28)
      img
        display:block
        margin:auto
        height:100%
    .routerLink
      display:flex
      height:60px
      background:#fff
      align-items:center
      justify-content:space-between
      margin:0 15px
      .text
        flex:1
        font-weight:bold
        color:$color-title
        margin-left:10px
      .icon-arrow
        display: inline-block
        vertical-align: middle
      .num
        color:$color-text-ll
      &.line
        border-bottom:1px solid $color-line
      &:last-child
        margin-bottom:50px
</style>
