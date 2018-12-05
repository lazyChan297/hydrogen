<template lang="html">
  <div class="chooseProd-wrapper">
    <div class="header">
      <p class="title">选择产品</p>
      <span class="back">返回</span>
    </div>
    <ul class="list">
      <li class="item">
        <div class="left">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="" width="60" height="60">
        </div>
        <div class="center">
          <p class="name">每日复活素</p>
          <p class="desc">每日复活素每日复活素每日复活素每日复活素每日复活素每日复活素</p>
        </div>
        <div class="right">
          <i class="icon-checked"></i>
        </div>
      </li>
      <li class="item active">
        <div class="left">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="" width="60" height="60">
        </div>
        <div class="center">
          <p class="name">每日复活素</p>
          <p class="desc">每日复活素每日复活素每日复活素每日复活素每日复活素每日复活素</p>
        </div>
        <div class="right">
          <i class="icon-checked"></i>
        </div>
      </li>
    </ul>
    <div class="submit">选好了</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/variable.styl'
  .chooseProd-wrapper
    .header
      display:flex
      height:79px
      align-items:center
      justify-content:space-between
      padding:0 15px
      background:#fff
      .title
        font-size:24px
        font-weight:bold
      .back
        height:30px
        width:60px
        text-align:center
        line-height:30px
        color:$color-text-ll
        background:#fff
        border-radius:50px
        box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8)
    .list
      padding-top:15px
      .item
        display:flex
        padding:15px
        margin:0 15px 15px
        background:#fff
        align-items:center
        box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8);
        border-radius:10px;
        .center
          flex:1
          margin-left:10px
          .name
            font-size:16px
            font-weight:bold
          .desc
            color:$color-text-l
            font-size:12px
        &.active
          border:2px solid $color-blue-a
    .submit
      height:45px;
      background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%);
      box-shadow:0px 12px 18px 0px rgba(0,132,255,0.25);
      border-radius:50px
      color:#FFFFFF
      text-align:center
      line-height:45px
      margin:30px 15px 0
</style>
