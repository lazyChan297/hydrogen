<template lang="html">
  <!-- 搜索 -->
  <div class="search-wrapper">
    <search
      @on-focus="onFocus"
      @on-cancel="onCancel">
      <div slot="right" class="slot-right" v-show="showMessage" @click="checkMessage">
        <i class="icon-message"></i>
        <span class="messagenum">1</span>
      </div>
    </search>
    <div class="search-content" v-show="!showMessage">
      <p class="title">热门案例</p>
      <ul class="list">
        <li>发炎</li>
        <li>过敏</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Search} from 'vux'
export default {
  data() {
    return {
      showMessage: true
    }
  },
  components: {
    Search
  },
  methods: {
    onFocus() {
      this.showMessage = false
    },
    onCancel() {
      this.showMessage = true
    },
    checkMessage() {
      this.$router.push('/userMessage')
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/stylus/variable.styl"
.search-content
  height: 100%;
  position: fixed;
  top: 80px;
  bottom: 0;
  width: 100%;
  background:#fff
  z-index: 10;
  padding:25px 0 0 15px
  .title
    color:$color-title
    font-size:16px
    font-weight:bold
  .list
    margin-top:14px
    overflow:hidden
    li
      float:left
      background:#f5f5f5
      border-radius:30px
      color:$color-title
      text-align:center
      height:32px
      line-height:32px
      min-width:75px
      margin-bottom:15px
      margin-right:15px
.messagenum
  position: absolute;
  top: 0;
  right: -6px;
  display:block
  width:16px
  height:16px
  border-radius:50%
  text-align:center
  background:$color-red
  color:#fff
  font-size:12px
.vux-search-box
  background:$color-bg
  border-bottom:none
  &.vux-search-fixed
    backdrop-filter:none
  .weui-search-bar__form
    background: #fff
    height: 40px
    border-radius: 5px
    line-height: 40px
    box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8)
  .weui-search-bar
    background-color:$color-bg
    padding:20px
    &:after
      display:none
    .weui-search-bar__box
      background:#fff
    .weui-icon-search
      height:40px
      margin:0 3px 0 6px
      &:before
        content: ''
    .weui-search-bar__label
      text-align:left
      span
        display: inline-block
        height: 40px
        line-height: 40px
        font-weight:bold
        color:$color-title
        font-size:16px
    .slot-right
      position:relative
      width:40px
      height:40px
      background:#fff
      box-shadow:0px 16px 50px 0px rgba(221,227,237,0.8)
      margin-left:10px
      border-radius:3px
    .weui-search-bar__cancel-btn
      line-height:40px
      color:$color-text-lll
    .weui-search-bar__box .weui-icon-search
      left:0
      display: inline-block;
      height: 40px;
      line-height: 40px
    .weui-icon-clear
      line-height:40px
</style>
