<template lang="html">
  <div class="invite-list-wrapper">
    <div class="search">
      <search
        @on-change="getResult"
        v-model="keyword"
        auto-scroll-to-top
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search">
      </search>
    </div>
    <ul class="search-result" v-show="showList">
      <li class="search-item">
        <img :src="userInfo.avatarUrl" alt="" width="50" height="50">
        <span class="nickName">{{userInfo.nickName}}</span>
        <span class="choose">选择</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Search} from 'vux'
export default {
  data() {
    return {
      keyword: '',
      userInfo: {},
      showList: true
    }
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo
  },
  methods: {
    getResult() {

    },
    onCancel() {
      this.showList = true
    },
    onSubmit() {

    },
    onFocus() {
      this.showList = false
    }
  },
  components: {
    Search
  }
}
</script>

<style scoped>
  .search-result .search-item{
    display: flex;
    height: 80px;
    align-items: center;
    background:#fff;
    padding: 0 15px 0 10px;
  }
  .search-item img {
    border-radius: 50%;
  }
  .search-item .nickName {
    flex:1;
    margin-left: 10px;
  }
  .search-item .choose {
    width: 70px;
    height: 25px;
    border-radius: 100px;
    border:1px solid #FF7584;
    color:#FF7584;
    text-align:center;
  }
</style>
