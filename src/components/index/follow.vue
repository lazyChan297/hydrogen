<template lang="html">
  <!-- 关注列表 -->
  <ul class="follow-list">
    <li class="follow-item">
      <div class="top">
        <img src="../../assets/images/df_user.jpg"  width="40" height="40" alt="">
        <p class="userName">
          <span class="name">username</span>
          <span class="updateTime">15:01</span>
        </p>
        <p class="followed">已关注</p>
      </div>
      <div class="middle">
        <div class="compare-box">
          <div class="before">
            <img src="../../assets/images/u=2547726376,1173683849&fm=27&gp=0.jpg" alt="">
          </div>
          <div class="after">
            <img src="../../assets/images/u=2547726376,1173683849&fm=27&gp=0.jpg" alt="">
          </div>
        </div>
        <div class="text-box">
          <div class="date">
            <span>31</span>
          </div>
          <p class="epl">行走的荷尔蒙天神，我的门面大人，撕漫少女，雕塑般的外貌持有者，行走的画报吴宣仪行走的荷尔蒙天神，我的门面大人，撕漫少女，雕塑般的外貌持有者，行走的画报吴宣仪</p>
        </div>
        <ul class="tag-list">
          <li class="tag-item">
            撕漫
          </li>
          <li class="tag-item">
            youxjij
          </li>
          <li class="tag-item">
            推荐
          </li>
          <li class="tag-item">
            推荐22
          </li>
          <li class="tag-item">
            推荐3w
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div>
          <span class="icon">
            <i class="icon-location"></i>
            <span class="text">南宁市 青秀区</span>
          </span>
        </div>
        <div class="right">
          <span class="icon">
            <i class="icon-comment"></i>
            <span class="num">2</span>
          </span>
          <span class="icon">
            <i class="icon-like"></i>
            <span class="num">5</span>
          </span>
        </div>
      </div>
    </li>
    <li class="follow-item">
      <div class="top">
        <img src="../../assets/images/df_user.jpg"  width="40" height="40" alt="">
        <p class="userName">
          <span class="name">username</span>
          <span class="updateTime">15:01</span>
        </p>
        <p class="followed">已关注</p>
      </div>
      <div class="middle">
        <div class="text-box">
          <div class="question">
            <span>问</span>
          </div>
          <p class="epl">行走的荷尔蒙天神，我的门面大人，撕漫少女，雕塑般的外貌持有者，行走的画报吴宣仪行走的荷尔蒙天神，我的门面大人，撕漫少女，雕塑般的外貌持有者，行走的画报吴宣仪</p>
        </div>
      </div>
      <div class="bottom answer">
        <span class="num">17个回答</span>
        <span class="submit">我来回答</span>
      </div>
    </li>
    <div class="no-more">
      <span class="text">已经到底了</span>
    </div>
  </ul>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>

@import "../../assets/stylus/variable.styl"
.follow-list
  margin-top:26px
  padding:0 15px
  .follow-item
    background:#fff
    padding:0 15px
    box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8)
    margin-bottom: 15px
    .top
      display:flex
      height:80px
      align-items: center
      img
        border-radius:50%
      .userName
        flex:1
        margin-left: 10px
        span
          display:block
        .name
          color:$color-title
          font-weight:bold
        .updateTime
          color:$color-text-ll
          font-size:12px
      .followed
        color:$color-text-lll
        font-size:12px
    .compare-box
      display:flex
      margin-bottom:15px
      .after, .before
        flex:1
        position:relative
        img
          border-radius:5px
      .before
        margin-right:10px
        &:after
          content:'之前'
          position:absolute
          background:rgba(0,0,0,.5)
          padding:0 10px 0 5px
          height:20px
          line-height:20px
          text-align:center
          left:0
          bottom:0
          font-size:10px
          display:block
          border-radius:0 200px 0 0
          color:#fff
      .after
        &:after
          content:'之后'
          position:absolute
          background:rgba(0,0,0,.5)
          padding:0 10px 0 5px
          height:20px
          line-height:20px
          text-align:center
          left:0
          bottom:0
          font-size:10px
          display:block
          border-radius:0 200px 0 0
          color:$color-yellow
    .text-box
      display:flex
      padding:10px
      background:$color-bg
      border-radius:5px
      .question,.date
        height:40px
        width:40px
        text-align:center
      .question
        color:#fff
        background:$color-blue-a
        font-size:18px
        border-radius:5px
        line-height:40px
      .date
        position:relative
        font-size:20px
        background:$color-blue-c
        color:$color-blue-a
        &:after
          content: 'Days'
          position:absolute
          font-size:10px
          color:$color-blue-a
          display:block
          bottom:2px
          left:50%
          transform:translate3D(-50%,0,0)
          line-height:14px
      .epl
        flex:1
        font-size:12px
        margin-left:10px
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
        overflow: hidden
      .question + p
        color:$color-title
        font-size: 14px
        line-height:20px
        font-weight:bold
    .tag-list
      margin-top:15px
      padding-bottom: 10px
      overflow:hidden
      .tag-item
        float:left
        background:$color-blue-c
        color:$color-blue-a
        padding:0 10px
        border-radius:100px
        margin-right:10px
        margin-bottom:10px
    .bottom
      display:flex
      justify-content:space-between
      padding-bottom: 10px
      align-items:center
      &.answer
        margin-top:25px
      &>div
        flex:1
        &.right
          text-align:right
          .icon
            margin-left:15px
      .num
        color:$color-text-ll
        font-size:14px
      .submit
        background:linear-gradient(left,rgba(0,132,255,1),rgba(69,165,255,1))
        border-radius:50px
        color:#fff
        font-size:12px
        width:70px
        height:26px
        text-align:center
        line-height:26px
        box-shadow:0px 6px 9px 0px rgba(0,132,255,0.25);
      .icon
        .text, .num
          font-size: 10px
          color:$color-text-ll
  .no-more
    text-align:center
    margin:35px 0 30px
    &:after,
    &:before
      content: ''
      display:inline-block
      height:2px
      background:$color-line
      width:58px
      vertical-align:middle
    .text
      color:$color-text-lll
      font-size:12px
      margin:0 15px
</style>
