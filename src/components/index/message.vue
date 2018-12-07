<template lang="html">
  <div class="message-wrapper">
    <div class="header">
      <p class="title">消息</p>
      <span class="back">返回</span>
    </div>
    <ul class="tab">
      <li v-for="(item,index) in tabList" :class="{'active':currentIndex===index}" @click="selectTab(index)">{{item.name}}</li>
    </ul>
    <ul class="list">
      <li class="item">
        <div class="left">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="" width="36" height="36px">
        </div>
        <div class="center">
          <p class="title">
            <span class="user">张三</span>
            <span>评论了你</span>
          </p>
          <p class="content">评论内容</p>
          <p class="time">3天前</p>
        </div>
        <div class="right">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" width="60" height="60" alt="">
        </div>
      </li>
      <li class="item">
        <div class="left">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="" width="36" height="36px">
        </div>
        <div class="center">
          <p class="title">
            <span class="user">张三</span>
            <span>评论了你</span>
          </p>
          <p class="content">评论内容</p>
          <p class="time">3天前</p>
        </div>
        <div class="right">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" width="60" height="60" alt="">
        </div>
      </li>
      <li class="follow-item">
        <div class="left">
          <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="" width="40" height="40px">
        </div>
        <div class="center">
          <p class="title">
            <span class="user">张三</span>
          </p>
          <p class="follow">关注了你</p>
        </div>
        <div class="right">
            关注
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      tabList: [
        {name: '评论'},
        {name: '点赞'},
        {name: '粉丝'}
      ]
    }
  },
  methods: {
    selectTab(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/variable.styl'
  .message-wrapper
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
    .tab
      display:flex
      padding-left:15px
      padding-bottom:15px
      background:#fff
      li
        border-radius:50px
        width:54px
        text-align:center
        color:$color-text-ll
        font-size:12px
        line-height:27px
        &.active
          background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%)
          color:#fff
    .list .item
      display:flex
      height:100px
      background: #fff
      padding: 22px 15px 13px;
      .left img
        border-radius:50%
        margin-right:12px
      .center
        flex:1
        .title
          color:$color-text-ll
        .user
          color:$color-title
          font-weight:bold
        .content
          color: $color-title
        .time
          font-size:12px
          color:$color-text-ll
      .right img
        border-radius:5px
    .list .follow-item
      display:flex
      align-items:center
      background:#fff
      height:80px
      margin:0 15px 10px
      box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8)
      padding: 0 15px
      border-radius:5px
      img
        border-radius:50%
      .center
        flex:1
        margin-left:10px
        .user
          font-size:16px
          font-weight:bold
        .follow
          color:$color-text-ll
          font-size:12px
      .right
        width:55px
        height:28px
        border-radius:30px
        border:4px solid $color-line
        text-align:center
        line-height:28px
        font-size:12px

</style>
