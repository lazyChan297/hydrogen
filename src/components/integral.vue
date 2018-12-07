<template lang="html">
  <div class="integral-wrapper">
    <div class="bgImg">
      <div class="title">
        <p class="text">积分</p>
        <span class="icon">
          <i class="icon-qiandao"></i>
        </span>
      </div>
      <div class="date">
        <ul class="list">
          <li class="active">
            <p class="month">11月</p>
            <p class="day">29</p>
          </li>
          <li>
            <p class="month">11月</p>
            <p class="day">29</p>
          </li>
          <li>
            <p class="month">11月</p>
            <p class="day">29</p>
          </li>
          <li>
            <p class="month">11月</p>
            <p class="day">29</p>
          </li>
          <li>
            <p class="month">11月</p>
            <p class="day">29</p>
          </li>
          <li>
            <p class="month">11月</p>
            <p class="day">29</p>
          </li>
        </ul>
        <div class="total">
          <div class="left">
            <p class="num">2005</p>
            <p class="desc">
              <span>当前积分</span>
              <span>已连续签到<b>2</b>天</span>
            </p>
          </div>
          <div class="signIn" @click="isShowSignIn=true">
            签到领积分
          </div>
        </div>
      </div>
    </div>
    <div class="gift">
      <div class="img">
        <img src="../assets/images/u=2547726376,1173683849&fm=27&gp=0.jpg" class="prodimg" alt="" width="60" height="60">
      </div>
      <div class="center">
        <p class="prod-name">每日复活素</p>
        <p class="desc"><i class="icon-star"></i><span>300积分</span></p>
      </div>
      <div class="getGift">
        立即领取
      </div>
    </div>
    <p class="getmore-title">获取更多积分</p>
    <div class="getmore">
      <router-link to="" class="inviteJoin" tag="div">
        <img src="../assets/images/yaoqing.png" alt="">
      </router-link>
      <router-link to="" class="releaseCase" tag="div">
        <img src="../assets/images/fabuanli.png" alt="">
      </router-link>
      <router-link to="" class="comment" tag="div">
        <img src="../assets/images/pinglundianzan.png" alt="">
      </router-link>
    </div>
    <div class="details-title">
      积分收支明细
    </div>
    <ul class="integral-list">
      <li class="integral-item">
        <div>
          <p class="title">成功邀请1名好友</p>
          <p class="desc">2018-1-1 23:14</p>
        </div>
        <div class="add">
          +5
        </div>
      </li>
      <li class="integral-item">
        <div>
          <p class="title">成功邀请1名好友</p>
          <p class="desc">2018-1-1 23:14</p>
        </div>
        <div class="add">
          +5
        </div>
      </li>
      <li class="integral-item">
        <div>
          <p class="title">成功邀请1名好友</p>
          <p class="desc">2018-1-1 23:14</p>
        </div>
        <div class="add">
          +5
        </div>
      </li>
    </ul>
    <p class="loadmore">只显示最近5条记录,点击查看更多</p>
    <div class="popup-signIn-mask" v-show="isShowSignIn">
      <div class="window">
        <img src="../assets/images/star.png" width="70" height="70" alt="" class="logo">
        <p class="title">签到成功</p>
        <p class="desc">获得10积分</p>
        <router-link to="/exchange" tag="div" class="submit">去兑换产品</router-link>
        <div class="icon" @click.stop="isShowSignIn=false">
          <i class="icon-cancel"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowSignIn: false
    }
  }
}
</script>

<style lang="stylus">
  @import "../assets/stylus/variable.styl"
  .integral-wrapper
    background:#fff
    .bgImg
      background:url('../assets/images/integral-bg.png')no-repeat center
      background-size:100%
      padding:20px 15px 0
      height: 195px;
      margin-top: -1px
      margin-bottom:40px
      .title
        display:flex
        justify-content:space-between
        align-items:center
        .text
          font-size:24px
          color:#fff
          font-weight:bold
      .date
        .list
          display:flex
          li
            background:#4faaff
            color:#196fb1
            text-align:center
            height:45px
            flex:1
            margin-right:2px
            border-top-left-radius:2px
            border-top-right-radius:2px
            padding-top:5px
            .month
              font-size:10px
            &.active
              background:#fff
              color:$color-text-l
        .total
          display:flex
          background:#fff
          align-items:center
          padding:20px 15px
          border-bottom-left-radius:5px
          border-bottom-right-radius:5px
          box-shadow:0px 8px 25px 0px rgba(221,227,237,0.8);
          .left
            flex:1
            color:$color-text-l
            .num
              font-weight:bold
              font-size:40px
              line-height:54px
            .desc
              font-size:12px
              span:first-child
                border-right:1px solid $color-text-l
                padding-right: 4px
              b
                color:$color-blue-a
                margin:0 4px
          .signIn
            background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%);
            box-shadow:0px 6px 9px 0px rgba(0,132,255,0.25);
            border-radius:5px;
            color:#fff
            text-align:center
            width:86px
            line-height:40px
    .gift
      display:flex
      align-items:center
      padding:0 15px
      .prodimg
        border-radius:5px
      .center
        flex:1
        margin-left:10px
        .prod-name
          font-weight:bold
          color:$color-title
        .desc
          span
            display:inline-block
            vertical-align:middle
            color:$color-red
            font-size:14px
            margin-left:2px
      .getGift
        width:70px;
        text-align:center
        line-height:30px;
        height:30px
        color:#fff
        background:linear-gradient(90deg,rgba(253,79,15,1) 0%,rgba(255,172,15,1) 100%);
        box-shadow:0px 5px 15px 0px rgba(255,103,18,0.5);
        border-radius:18px;
    .details-title,
    .getmore-title
      color:$color-title
      font-weight:bold
      font-size:16px
      padding-left:15px
      margin-top:20px
    .getmore
      display:flex
      padding:0 15px
      .inviteJoin,.releaseCase,.comment
        flex:1
        margin-right:10px
        border-radius:5px
        max-width:120px
      .comment
        margin-right:0
      .inviteJoin
        box-shadow: 1px 4px 7px 0px #FF9C41
      .releaseCase
        box-shadow: 1px 4px 7px 0px #6995FF
      .comment
        box-shadow: 1px 4px 7px 0px #B14CCD
    .integral-list
      padding:0 15px
      background:#fff
      .integral-item
        display:flex
        justify-content:space-between
        height:70px
        align-items:center
        border-bottom:1px solid $color-line
        &:last-child
          border:none
        .title
          color:$color-text-l
        .desc
          color:$color-text-ll
          font-size:12px
        .add, .minus
          font-weight:bold
          font-size:16px
        .add
          color:$color-blue-a
        .minus
          color:$color-red
    .loadmore
      color:$color-text-ll
      text-align:center
      padding:15px 0 40px
      font-size:12px
    .popup-signIn-mask
      position:fixed
      background:rgba(0,0,0,0.5)
      width:100%
      height:100%
      top:0
      .window
        position:relative
        background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%);
        box-shadow:0px 6px 9px 0px rgba(0,132,255,0.25);
        border-radius:8px;
        margin:120px 54px
        height:200px
        padding:58px 0
        .logo
          position:absolute
          top:-35px
          left:50%
          margin-left:-35px
        .title
          text-align:center
          color:#fff
          font-size:18px
          font-weight:bold
        .desc
          text-align:center
          color:#fff
        .submit
          background:$color-yellow
          border-radius:50px
          width:130px
          height:40px
          line-height:40px
          text-align:center
          margin:30px auto 0
          color:#8E6400
          font-weight:bold
        .icon
          width:40px
          height:40px
          border-radius:50%
          margin:50px auto
          background:rgba(0,0,0,0.5)
</style>
