<template lang="html">
  <div class="questionDetail-wrapper">
    <div class="userInfo">
      <img :src="userInfo.avatarUrl" width="35" height="35" alt="">
      <div class="follow">关注</div>
    </div>
    <div class="question-content">
      <p class="question-title">第一次听负氢离子，什么概念都没有，安全吗？可靠吗？</p>
      <p class="question-desc">一直都是有小雀斑的皮肤，这段熬夜休息不好，肠胃也不好，额头，下巴出现了很多痘，皮肤也是用什么都不吸收，没有光泽度。</p>
      <ul class="img-list" ref="imgList">
        <li class="img-item" v-for="item in imgList" ref="imgItem">
          <img :src="userInfo.avatarUrl" alt="">
        </li>
      </ul>
      <p class="location">南宁市 青秀区</p>
    </div>
    <div class="answer">
      <p class="answer-title">
        <span class="text">1个回答</span>
        <span class="like">
          <span class="icon">
            <i class="icon-unlike"></i>
          </span>
          <span class="num">5</span>
        </span>
      </p>
      <ul class="answer-list">
        <li class="answer-item">
          <div class="left">
            <img :src="userInfo.avatarUrl" alt="" width="36" height="36">
          </div>
          <div class="right">
            <p class="user"><span class="userName">some</span> <span class="replay">回复</span> </p>
            <p class="content">一直都是有小雀斑的皮肤，这段熬夜休息不好，肠胃也不好，额头</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="fixedBottom">
      <div class="input-box">
        <input type="text" name="" value="" placeholder="输入评论内容">
      </div>
      <div class="replay">
        回答
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
const IMG_GAP = 10
export default {
  data() {
    return {
      imgList: [1,2,3,4,5,6,7,8,9]
    }
  },
  mounted() {
    this.calcuWidth()
  },
  methods: {
    calcuWidth() {
      let width_box = this.$refs.imgList.offsetWidth
      const img_width = (width_box - 2 * IMG_GAP) /3
      let imgList = this.$refs.imgItem
      imgList.forEach((item) => {
        item.style.width = img_width + 'px'
        item.style.height = img_width + 'px'
      })
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
  .questionDetail-wrapper
    background:#fff
    .userInfo
      display: flex
      justify-content: space-between
      align-items: center
      height: 75px
      padding: 0 20px
      img
        border-radius: 50%
      .follow
        width:70px;
        height:30px;
        border:4px solid $color-line
        border-radius:50px
        text-align: center
        line-height: 30px
        color:$color-title
        line-height:22px
    .question-content
      padding:15px
      .question-title
        color: #color-title
        font-size:16px
        font-weight:bold
      .question-desc
        margin-top:10px
        color:$color-text-ll
        font-size:12px
      .img-list
        font-size:0
        width:100%
        overflow:hidden
        .img-item
          float:left
          background:#fff
          margin-right:10px
          margin-bottom:10px
          &:nth-child(3n+3)
            margin-right:0
          img
            width:100%
            height:100%
      .location
        color:$color-blue-a
        font-size:12px
    .answer-title
      display:flex
      justify-content:space-between
      background:$color-bg
      line-height:35px
      .text
        color:$color-blue-a
        margin-left:15px
      .num
        display:inline-block
        line-height:16px
        vertical-align:sub
        margin-right:15px
        color:$color-text-l
    .answer-list
      margin-bottom:50px
      .answer-item
        display:flex
        padding:20px 15px
        .left
          img
            border-radius:50%
        .right
          flex:1
          margin-left:12px
          .user
            display:flex
            justify-content:space-between
            .userName
              color:#000
              font-weight:bold
            .replay
              color:$color-blue-a
          .content
            color:$color-text-l
    .fixedBottom
      position:fixed
      display:flex
      box-shadow:0px -16px 20px 0px rgba(221,227,237,0.3);
      bottom:0
      align-items:center
      width:100%
      padding:0 15px
      height:50px
      background:#fff
      .input-box
        flex:1
        background:$color-bg
        margin-right:17px
        height:36px
        line-height:36px
        padding-left:10px
        input
          width:100%
          outline:none
          background:$color-bg
      .replay
        color:$color-text-l
</style>
