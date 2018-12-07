<template lang="html">
  <div class="exchange-wrapper">
    <p class="title">积分兑换</p>
    <div class="content">
      <div class="goods">
        <img src="../assets/images/u=2547726376,1173683849&fm=27&gp=0.jpg" class="prodimg" alt="" width="60" height="60">
        <div class="center">
          <p class="name">每日复活素</p>
          <p class="desc">统一售价: ¥299.00</p>
        </div>
        <div class="quantity">
          1盒
        </div>
      </div>
      <div class="shadow-box">
        <div class="shadow">
          <div>
            <p class="shadow-title">3000</p>
            <p class="desc">本次兑换积分</p>
          </div>
          <div class="icon">
            <i class="icon-arrow-white"></i>
          </div>
        </div>
      </div>
      <div class="userInfo">
        <span>收货人</span>
        <span>张三</span>
      </div>
      <div class="userInfo">
        <span>联系电话</span>
        <span>13877414785</span>
      </div>
      <div class="userInfo address">
        <span>收货地址</span>
        <span>广西壮族自治区南宁市青秀区民族大道133号航洋国际B座2310</span>
      </div>
      <div class="button-group">
        <div class="change">
          <button type="button" name="button">更换地址</button>
        </div>
        <div class="submit">
          <button type="button" name="button">立即兑换</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  @import "../assets/stylus/variable.styl"
  .exchange-wrapper
    .title
      font-weight:bold
      font-size:24px
      color:$color-title
      padding:20px
    .content
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 25px 0px rgba(221,227,237,0.8);
      border-radius:5px;
      margin:0 15px
      padding-bottom:25px
    .goods
      display:flex
      padding:22px 15px
      .center
        margin-left:10px
        flex:1
      .quantity
        line-height:20px
        color:$color-text-ll
      .name
        font-size:16px
        font-weight:bold
        color:$color-title
        height:50%
        line-height:200%
      .desc
        color:#e68f00
        height:50%
        line-height:200%
    .shadow-box
      padding-bottom:25px
      margin:0 15px 15px
      border-bottom:1px solid $color-line
    .shadow
      display:flex
      justify-content:space-between
      align-items:center
      height:65px;
      padding:0 15px
      color:#fff
      background:rgba(255,213,158,1);
      box-shadow:0px 3px 8px 0px rgba(221,125,0,0.4);
      .shadow-title
        font-size:24px
        font-weight:bold
      .desc
        font-size:12px
    .userInfo
      display:flex
      justify-content:space-between
      margin:0 15px
      span
        margin-bottom:15px
      span:first-child
        color:$color-title
      span:last-child
        color:$color-text-ll
      &.address
        span:last-child
          font-size:12px
          text-align: right;
          max-width: 200px
    .button-group
      display:flex
      margin:20px 15px 0
      .submit,.change
        flex:1
        text-align:center
        button
          width:86px;
          height:40px;
          border-radius:5px;
          margin:0 auto
      .submit button
        background:rgba(255,201,4,1);
        box-shadow:0px 3px 8px 0px rgba(255,201,4,0.5);
        color:#fff
      .change button
        background:rgba(80,38,38,0.05);
        border:1px solid rgba(228,228,228,1)
        color:$color-text-ll
</style>
