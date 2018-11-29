<template>
	<div class="winners" :style="{ height: winHeight }">
		<img ref="winnersImg" class="winners-head-img" src="./../assets/images/winners_bg_02.jpg">
		<div v-if="offsetHeight"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    class="winners-scroll" :style="{ top: offsetHeight + 'px' }">
			<div class="winners-list">
	      <div class="winner-item" :class="{ 'first': index == 0 }" v-for="(item,index) in winners" :key="index">
	        <div class="periods">第{{ item.no }}期</div>
	        <div class="user">
	          <div class="avatar"><img :src="item.avatar" /></div>
	          <span class="name">{{ item.name }}</span>
	        </div>
	      </div>
	    </div>
	    <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
        <div v-show="loading && winners.length > 0" class="loading-more">
          <inline-loading></inline-loading><span class="loading-text">加载中...</span>
        </div>
        <load-more v-if="nomore" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
      </div>
		</div>
	</div>
</template>

<script>
import { InlineLoading, LoadMore } from 'vux'
import http from '@/utils/http'

export default {
	components: {
		InlineLoading,
		LoadMore
	},
	data () {
		return {
			offsetHeight: 0,
			page: 1,
			loading: true,
      nomore: false,
			winners: [],
      winHeight: ''
		}
	},
	methods: {
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getLuckyList()
        }, 500)
      } 
    },
		// 获取获奖名单
		getLuckyList () {
			let params = {
				page: this.page,
				number: 10
			}
			http.get('/lucky/nameList', params, false, res => {
				if (res.status == 1 && res.data.users.length > 0) {
					this.winners = this.winners.concat(res.data.users)
					this.page ++
          this.loading = false
          if (res.data.users.length < 10) {
            this.nomore = true
          }else {
            this.nomore = false
          }     
				}else {
					this.loading = false
          this.nomore = true
          return
				}
			})
		}
	},
	mounted () {
		let times = 750 / 186	
		let winWidth = document.documentElement.clientWidth
    this.winHeight = document.documentElement.clientHeight + 'px'
		this.offsetHeight = parseInt(winWidth / times)	
		this.getLuckyList()
	}
}	
</script>

<style scoped>
.winners {
  position: relative;
  background: #f84a49;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.winners .winners-head-img {
  width: 100%;
  display: block;
}
.winners-scroll {
  position: absolute;
  width: auto;
  top: auto;
  bottom: 15px;
  right: 15px;
  left: 15px;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: -4%;
  overflow: scroll;
}
.winner-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 0;
}
.first::after {
  content: '最新';
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -6px;
  font-size: 8px;
  background: #ffda00;
  padding: 0 5px;
  border-radius: 20px;
}
.first .periods {
  font-size: 16px;
}
.periods {
  flex: 0 0 120px;
  padding-left: 30px;
}
.winner-item .user {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.winner-item .user .avatar {
	flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 8px;
  overflow: hidden;
}	
.winner-item .user .name {
	display: block;
	white-space:nowrap; 
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>