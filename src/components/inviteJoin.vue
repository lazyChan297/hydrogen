<template lang="html">
  <div class="inviteJoin-wrapper">
    <img src="../assets/images/invent-banner.png"  alt="" class="bgImg">
    <div class="text-box">
      <p class="title">邀请好友</p>
      <p class="desc">每成功邀请1名好友注册，您将获得20积分，好友购买产品您将获得100积分  </p>
      <div class="submit">立即邀请</div>
      <div class="invitelist">
        <ul>
          <li class="user"><img :src="avatarUrl" alt="" width="25" height="25"></li>
          <li class="user"><img :src="avatarUrl" alt="" width="25" height="25"></li>
          <li class="user"><img :src="avatarUrl" alt="" width="25" height="25"></li>
          <li class="user"><img :src="avatarUrl" alt="" width="25" height="25"></li>
        </ul>
        <div class="num">
          已邀请22名好友
        </div>
      </div>
    </div>
    <div class="record">
      邀请记录
    </div>
  </div>
</template>

<script>
const URL = 'http://thirdwx.qlogo.cn/mmopen/vi_32/PpFLIPhXcATIhK1JxlBFYKqxpmEX3kibmss1m5RRtDicthrH5tvruYbdFgjGXX2Yt6pPHc4icu0ibfzxN1ajCZbQfw/132'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      avatarUrl: URL
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style lang="stylus">
  @import "../assets/stylus/variable.styl"
  .inviteJoin-wrapper
    .bgImg
      width: 90%;
      display: block;
      margin: 0 auto
    .text-box
      margin:0 15px
      padding: 25px 28px 0
      height:260px;
      background:#fff
      box-shadow:0px 8px 25px 0px rgba(221,227,237,0.8);
      border-radius:5px;
      text-align:center
      .title
        color:$color-title
        font-size:20px
        font-weight:bold
      .desc
        color:$color-text-ll
        padding-bottom:20px
        border-bottom:4px solid $color-bg
      .submit
        color:#fff
        text-align:center
        margin:25px auto 0
        line-height:48px;
        background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%);
        box-shadow:0px 6px 9px 0px rgba(0,132,255,0.25);
        border-radius:3px
      .invitelist
        display:flex
        justify-content:space-between
        align-items:center
        margin-top:15px
        ul
          display:flex
        .user
          margin-left:-10px
          border:1px solid #fff
          border-radius:50%
          &:first-child
            margin-left:0
          img
            border-radius:50%
        .num
          color:$color-text-ll
          text-decoration: underline;
    .record
      border-radius:50px
      border:4px solid $color-line
      color:$color-title
      width:85px
      margin:0 auto
      text-align:center
      margin-top:25px
</style>
