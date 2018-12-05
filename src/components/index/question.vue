<template lang="html">
  <ul class="question-list">
    <li class="question-item">
      <div class="top">
        <img src="../../assets/images/df_user.jpg"  width="40" height="40" alt="">
        <p class="userName">
          <span class="name">张三<span>提了问题</span></span>
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
    <li class="question-item">
      <div class="top">
        <img src="../../assets/images/df_user.jpg"  width="40" height="40" alt="">
        <p class="userName">
          <span class="name">张三<span>提了问题</span></span>
          <span class="updateTime">15:01</span>
        </p>
        <p class="unfollow">关注</p>
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
  </ul>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable.styl"
  .question-list
    margin-top:26px
    padding:0 15px
    margin-bottom:65px
    .question-item
      background:#fff
      padding:0 15px
      box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8)
      margin-bottom: 15px
      .top
        display:flex
        height:80px
        align-items: center
        margin-bottom:15px
        img
          border-radius:50%
        .userName
          flex:1
          margin-left: 10px
          font-size:14px
          span
            display:block
          .name
            color:$color-title
            font-weight:bold
            span
              color:$color-text-ll
              display:inline-block
          .updateTime
            color:$color-text-ll
            font-size:12px
        .followed
          color:$color-text-lll
          font-size:12px
        .unfollow
          border:4px solid $color-line
          border-radius: 100px
          width:55px
          text-align:center
          font-size:12px
      .middle
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
</style>
