<template lang="html">
  <div class="index-wrapper">
    <!-- 搜索 -->
    <search></search>
    <!-- navbar -->
    <div class="navbar-wrapper">
      <ul>
        <router-link tag="li" to="/index/recommend">
          <span>推荐</span>
        </router-link>
        <router-link tag="li" to="/index/follow">
          <span>关注</span>
        </router-link>
        <router-link tag="li" to="/index/case">
          <span>案例</span>
        </router-link>
        <router-link tag="li" to="/index/question">
          <span>提问</span>
        </router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar :currentIndex="currentIndex"></tab-bar>
  </div>
</template>

<script>
import TabBar from './public/TabBar.vue'
import Search from './public/Search.vue'
export default {
  data() {
    return {
      currentIndex: 0,
      navbarList: [
        {name: '推荐',router:'recommend'},
        {name: '关注', router: 'follow'},
        {name: '案例', router: 'case'},
        {name: '提问', router: 'question'},
      ]
    }
  },
  mounted() {
    
  },
  components: {
    TabBar,
    Search
  },
  methods: {
    selectTab(item, index) {
      this.currentIndex = index
      this.$router.push(item.router)
    }
  }
}
</script>

<style lang="stylus">
  @import "../assets/stylus/variable.styl"
  .index-wrapper
    background:$color-bg
    .navbar-wrapper
      height:45px
      line-height:45px
      ul
        display:flex
        li
          flex: 0 0 20%
          text-align:center
          span
            font-size:16px
            font-weight:600
            color: $color-text-ll
          &.router-link-active
            span
              color: $color-title
            &:after
              content:''
              background:linear-gradient(left, $color-lg-d, $color-lg-l)
              display:block
              height:5px
              width:24px
              margin: -5px auto 0
              border-radius:3px
              box-shadow:0px 2px 7px 0px rgba(0,132,255,0.25)

</style>
