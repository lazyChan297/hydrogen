<template lang="html">
  <div class="questionList-wrapper">
    <ul>
      <li class="questionItem">
        <div class="left">
          <img :src="userInfo.avatarUrl" alt="" width="40" height="40">
        </div>
        <div class="right">
          <p class="title">
            <span class="name">{{userInfo.nickName}}</span>
            <span class="delete" @click="deleteItem">删除</span>
          </p>
          <p class="location">
            <span>8天前</span>
            <span class="icon">
              <i class="icon-locationgray"></i>
            </span>
            <span class="text">
              南宁市 青秀区
            </span>
          </p>
          <div class="comparebox">
            <div class="before">
              <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="">
            </div>
            <div class="after">
              <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="">
            </div>
          </div>
          <p class="desc">
            大王老师推荐的产品，用过以后确实很不错，给陈粒打call！！
          </p>
        </div>
      </li>
      <li class="questionItem">
        <div class="left">
          <img :src="userInfo.avatarUrl" alt="" width="40" height="40">
        </div>
        <div class="right">
          <p class="title">
            <span class="name">{{userInfo.nickName}}</span>
            <span class="delete">删除</span>
          </p>
          <p class="location">
            <span>8天前</span>
            <span class="icon">
              <i class="icon-locationgray"></i>
            </span>
            <span class="text">
              南宁市 青秀区
            </span>
          </p>
          <div class="comparebox">
            <div class="before">
              <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="">
            </div>
            <div class="after">
              <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="">
            </div>
          </div>
          <p class="desc">
            大王老师推荐的产品，用过以后确实很不错，给陈粒打call！！
          </p>
        </div>
      </li>
    </ul>
    <popup v-model="isShowPopup">
      <div class="popup-container">
        <p class="popup-title">内容删除后将不可恢复</p>
        <div class="popup-buttonGroup">
          <div class="popup-submit">
            确定
          </div>
          <div class="popup-cancel" @click="isShowPopup=false">
            取消
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { Popup } from 'vux'
export default {
  data() {
    return {
      isShowPopup: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    deleteItem() {
      this.isShowPopup = true
    }
  },
  components: {
    Popup
  }
}
</script>

<style lang="stylus">
 @import "../assets/stylus/variable.styl"
 @import "../assets/stylus/popup.styl"
  .questionItem
    display:flex
    background:#fff
    border-bottom:1px solid $color-line
    padding-bottom:16px
    padding-top:15px
    &:last-child
      border:none
    .left
      margin-right:15px
      img
        border-radius:50%
    .right
      flex:1
      .title
        display:flex
        justify-content:space-between
      .name
       color:$color-title
      .delete
        color:$color-blue-b
        font-size:12px
      .location
        color:$color-text-ll
        font-size:12px
      .comparebox
        display:flex
        margin-bottom:15px
        .after, .before
          flex:1
          position:relative
          img
            width:100%
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
      .desc
        color:$color-text-l
        font-size:13px

</style>
