<template lang="html">
  <div class="UserIndex-wrapper">
    <div class="header" :style="bgStyle">
      <div class="mask"></div>
      <div class="userinfo">
        <img :src="userInfo.avatarUrl" width="80" height="80" alt="">
        <div class="">
          <span class="icon">
            <a href="tel:18677180030">
              <i class="icon-call"></i>
            </a>
          </span>
          <!-- <span class="edit-box">
            <i class="icon-edit"></i>
            编辑
          </span> -->
          <span class="follow" @click="isFollow">+ 关注</span>
        </div>
      </div>
      <p class="username">{{userInfo.nickName}}</p>
      <div class="gender">
        <i class="icon-nan"></i>
      </div>
      <ul class="list">
        <li class="item">
          <p class="num">45</p>
          <p class="text">我关注的</p>
        </li>
        <li class="item">
          <p class="num">45</p>
          <p class="text">关注我的</p>
        </li>
        <li class="item">
          <p class="num">45</p>
          <p class="text">我的评论</p>
        </li>
        <li class="item">
          <p class="num">45</p>
          <p class="text">我的赞</p>
        </li>
      </ul>
      <ul class="tab-list">
        <router-link to="/userIndex1/case" tag="li" class="tab-item">案例(1)</router-link>
        <router-link to="/userIndex1/question" tag="li" class="tab-item">提问(1)</router-link>
      </ul>
    </div>
    <div class="article">
      <router-view></router-view>
    </div>
    <popup v-model="isShowFollow">
      <div class="popup-container">
        <div class="popup-buttonGroup">
          <div class="popup-submit" @click="cancelFollow">
            不再关注
          </div>
          <div class="popup-cancel" @click="isShowFollow=false">
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
      isShowFollow: false
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    isFollow() {
      this.isShowFollow = true
    },
    cancelFollow() {
      this.isShowFollow = false
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.userInfo.avatarUrl})`
    },
    ...mapGetters(['userInfo'])
  },
  components: {
    Popup
  }
}
</script>

<style lang="stylus">
  @import "../assets/stylus/variable.styl"
  @import "../assets/stylus/popup.styl"
  .UserIndex-wrapper
    .header
      position:relative
      width:100%
      height: 320px;
      background-size: cover
      color:#fff
      .mask
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(0,0,0,0.5)
      .userinfo
        position:relative
        display:flex
        z-index:1
        justify-content:space-between
        align-items:center
        padding:40px 15px 0
        img
          border-radius:50%
        .icon
          display:inline-block
          width:35px
          height:35px
          background:rgba(199,199,199,0.5)
          border-radius:50%
          vertical-align: bottom
          margin-right:10px
        .follow, .edit-box
          width: 80px
          height: 35px
          display:inline-block
          text-align: center
          line-height:35px
          border-radius:50px
        .follow
          background: rgba(4,169,245,1)
          box-shadow: 0px 6px 9px 0px rgba(0,132,255,0.25)
        .edit-box
          border:1px solid #fff
      .username
        position:relative
        font-size:18px
        font-weight:bold
        padding-left:15px
        margin-top:5px
      .gender
        position:relative
        padding-top:5px
        margin-left:15px
        margin-top:15px
        width:30px;
        height:20px;
        background:rgba(88,98,107,0.75);
        border-radius:10px;
      .list
        display:flex
        position:relative
        text-align:center
        color:#fff
        margin-top:46px
        .item
          flex:1
          .num
            font-size:18px
            font-weight:bold
          .text
            font-size:12px
      .tab-list
        position:relative
        margin-top:10px
        background:#fff
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        height: 60px
        display:flex
        .tab-item
          flex:1
          color:$color-text-ll
          font-weight:bold
          text-align:center
          padding-top:20px
          line-height:40px
          &.router-link-active
            color:$color-title
            &:after
              content:''
              display:block
              width:24px;
              height:5px;
              background:linear-gradient(90deg,rgba(62,113,255,1) 0%,rgba(94,159,255,1) 100%);
              box-shadow:0px 3px 7px 0px rgba(52,132,255,0.71);
              border-radius:3px;
              margin:-5px auto
    .article
      margin-top:30px
      background:#fff
      padding:10px 15px
</style>
