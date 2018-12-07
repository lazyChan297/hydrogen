<template lang="html">
  <div class="tabBar-wrapper">
    <ul>
      <li @click="selectItem(index,item)" v-for="(item,index) in tabList" :class="{'active': currentIndex===index}">
          <i :class="[item.className,{'active': currentIndex===index}]">
            <span v-if="index===2" class="icon-add" :class="{'rotate': showSlide}"></span>
          </i>
        <p class="text">{{item.name}}</p>
      </li>
    </ul>
    <transition name="slide">
      <div class="slide-wrapper" v-show="showSlide">
        <div class="left">
          <router-link to="/releaseQuestion" tag="div">
            <i class="icon-bigtiwen"></i>
            <p>提问</p>
          </router-link>
        </div>
        <div class="right">
          <router-link to="/releaseCase" tag="div">
            <i class="icon-anli"></i>
            <p>案例</p>
          </router-link>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="showSlide"></div>
  </div>
</template>

<script>
export default {
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showSlide: false,
      tabList:[
        {
          className: 'icon-index',
          router: '/',
          name: '首页'
        },
        {
          className: 'icon-found',
          name: '发现'
        },
        {
          className: 'icon-oper'
        },
        {
          className: 'icon-mall',
          name: '商城'
        },
        {
          className: 'icon-my',
          router: '/my1',
          name: '我的'
        },
      ]
    }
  },
  methods: {
    selectItem(index, item) {
      if (index === 2) {
        this.showSlide = !this.showSlide
        return
      }
      // this.currentIndex = index
      this.$router.push(item.router)
    }
  }
}
</script>

<style lang="stylus">
  @import '../../assets/stylus/variable.styl'
  .tabBar-wrapper
    position:fixed
    bottom:0
    width:100%
    box-shadow:0px -16px 20px 0px rgba(221,227,237,0.3)
    background:#fff
    z-index:2
    ul
      display:flex
      height:50px
      position: relative;
      z-index: 5;
      background: #fff;
      li
        flex:1
        font-size:10px
        text-align:center
        color:$color-text-ll
        padding-top:7px
        .text
          margin-top:3px
        &.active
          color:$color-title
        .icon-oper
          background: -webkit-linear-gradient(left, #3e71ff, #5e9fff)
          display: block
          width: 38px
          height: 28px
          border-radius: 50px
          margin:5px auto
          padding-top: 7px
    .slide-enter, .slide-leave-to
      transform: translate3d(0,100%,0);
    .slide-enter-active, .slide-leave-active
      transition: all .5s
    .slide-enter-to, .slide-leave
      transform: translate3d(0,0,0)
    .slide-wrapper
      text-align: center;
      display: flex;
      height: 160px
      align-items: center
      justify-content: space-around;
      position: absolute;
      bottom: 100%;
      background: #fff;
      width: 100%;
      color: $color-text-l
      z-index:1
    .mask
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50px;
      background: rgba(0,0,0,.3)
      filter:blur(4px)
</style>
