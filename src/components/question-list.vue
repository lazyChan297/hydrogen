<template lang="html">
  <div class="">
    <ul class="questionList-wrapper">
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
          <p class="question">
            <i class="icon-ask"></i>大王老师推荐的产品，用过以后确实很不错，给陈粒打call！！
          </p>
          <p class="desc">
            17个回答
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
  components: {
    Popup
  },
  methods: {
    deleteItem() {
      this.isShowPopup = true
    }
  }
}
</script>

<style lang="stylus">
 @import "../assets/stylus/variable.styl"
  .questionItem
    display:flex
    background:#fff
    border-bottom:1px solid $color-line
    padding-bottom:14px
    padding-top:15px
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
      .question
        font-weight:bold
      .desc
        color:$color-text-ll
        font-size:13px
        margin-top:8px
</style>
