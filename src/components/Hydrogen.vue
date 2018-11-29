<template>
	<div v-if="videos.length > 0" class="hydrogen"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="articleParams.loading"
    infinite-scroll-distance="10">
		<!-- 视频列表 -->
		<!-- 视频播放 -->
		<sticky :check-sticky-support="false" :offset="0">
      <div class="video-container" v-if="playerOptions.sources[0].src">
				<video-player
					class="vjs-custom-skin"
			    ref="videoPlayer"
			    :options="playerOptions">
				</video-player>
			</div> 
    </sticky>
			
		<group gutter="0">
			<cell title="视频介绍"></cell>
		</group>
		<div class="videos">
			<div class="video-item" @click="playVideo(item)" :class="{ 'p_right': index%2 == 0, 'p_left': index%2 != 0 }" v-for="(item,index) in videos" :key="index">
				<div class="video-cover">
					<span class="img-holder">
						<img class="obj-cover" :src="item.cover">
					</span>
				</div>
				<p>{{ item.title }}</p>
			</div>
			<div class="view-more" v-if="!videoParams.nomore">
				<div @click="clickViewMore">点击加载更多</div>

			</div>
			<div v-else class="nomore">暂无更多数据~</div>
		</div>
		
		<group gutter="0">
			<cell title="文章介绍"></cell>
		</group>
		<div class="article-list">
			<router-link :to="{ path: 'articleDetail', query: { id: item.id } }" class="article-item bottom-1px" v-for="(item,index) in articleList" :key="index" tag="div">
				<div class="content">
					<h3>{{ item.title }}</h3>
					<p>{{ item.publishedAt }}</p>
				</div>
				<div class="article-cover">
					<span class="img-holder">
						<img class="obj-cover" :src="item.cover">
					</span>
				</div>				
			</router-link>
		</div>
		
		<div class="loading-wrapper" style="height: 42px; overflow: hidden;">
      <div v-show="articleParams.loading && articleList.length > 0" class="loading-more">
        <inline-loading></inline-loading><span class="loading-text">加载中...</span>
      </div>
      <load-more v-if="articleParams.nomore" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
    </div>
		<footer-nav bottom-nav="氢元素" text-color="#999"></footer-nav>
	</div>
</template>
<script>	
import FooterNav from '@/components/public/FooterNav'	
import { Group, Cell, XButton, LoadMore, InlineLoading, Sticky } from 'vux'
import http from '@/utils/http'
import { videoPlayer } from 'vue-video-player'
import { removeStore, getStore } from '@/utils/mUtils'
import 'video.js/dist/video-js.css'
import '@/assets/css/video-skin.css'

export default {
	components: {
    FooterNav,
    Group,
    Cell,
    XButton,
    videoPlayer,
    InlineLoading,
    LoadMore,
    Sticky
  },
	data () {
		return {
			playerOptions: {
        // videojs options
        muted: false,
        x5VideoPlayerFullscreen: true,
        language: 'en',
        playbackRates: [1.0, 2.0],
        width: '1080',
        height: '720',
        usingNativeControls: false,
        nativeControlsForTouch: false,
        preload: 'auto',
        aspectRatio:"16:9",
        sources: [{
          type: "video/mp4",
          src: null
        }],
        poster: null,
      },
			videoParams: {
				page: 1,
				number: 6,
				nomore: false
			},
			articleParams: {
				page: 1,
				number: 6,
				loading: true,
				nomore: false
			},
			videos: [],
			articleList: []
		}
	},
	computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
	methods: {
		clickViewMore () {
			this.getVideos()
		},
		getVideos () {
			let params = {
				page: this.videoParams.page,
				number: this.videoParams.number 
			}
			http.get('/qing/videos', params, false, res => {
				if (res.status == 1 && res.data.videos.length > 0 ) {
					this.videos = this.videos.concat(res.data.videos)
					if (this.videoParams.page == 1) {
						this.playerOptions.sources[0].src = this.videos[0].video
						this.playerOptions.poster = this.videos[0].cover
					}				
					this.videoParams.page ++
				}else {
					this.videoParams.nomore = true
				}
			})
		},
		playVideo (item) {
			this.playerOptions.sources[0].src = item.video
			this.playerOptions.poster = item.cover
			//this.player.play()
			// setTimeout(() => {
			// 	
			// }, 100)
		},
		// 上拉加载更多
    loadMore () {
      if (!this.articleParams.nomore) {     
        this.articleParams.loading = true
        setTimeout(() => {
          this.getArticleList()
        }, 500)
      } 
    },
		getArticleList () {
			let params = {
				page: this.articleParams.page,
				number: this.articleParams.number 
			}
			http.get('/qing/news', params, false, res => {
        if (res.status == 1 && res.data.news.length > 0) {
        	this.initShares(res.data.shareAppMessage, res.data.shareTimeline)
          this.articleList = this.articleList.concat(res.data.news)
          this.articleParams.page ++
          this.articleParams.loading = false
          this.articleParams.nomore = false
        }else {
          this.articleParams.loading = false
          this.articleParams.nomore = true
          return
        }
      })
		},
		initShares (shareAppConfig, timelineConfig) {
			this.$wechat.ready(() => {
        this.$wechat.onMenuShareAppMessage(shareAppConfig)
        this.$wechat.onMenuShareTimeline(timelineConfig) 
      })   
		}
	},
	mounted () {
		this.getVideos()
		this.getArticleList()
	}
}		
</script>
<style scoped>
.hydrogen {
	background: #fff;
	min-height: 100%;
}
.videos {
	padding-bottom: 15px;
}
.videos:before {
	content: '';
	display: block;
	width: 0;
	height: 0;
	clear: both;
}
.video-item {
	position: relative;
	display: block;
	width: 50%;
	float: left;
	margin-bottom: 10px;
}
.p_right {
	padding-right: 4px;
}
.p_left {
	padding-left: 4px;
}
.video-cover {
	position: relative;	
}
.video-cover .img-holder {
	padding-bottom: 60%;
}
.video-item p {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	padding: 5px 5px 0 5px;
}
.view-more {
	clear: both;
	padding: 10px 15px;
}
.view-more div {
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.article-item {
	padding: 15px;
	display: flex;
}
.article-item:after {
	left: 15px;
	right: 15px;
}
.article-item .content {
	flex: 1;
}
.article-item .content p {
	color: #999;
	padding-top: 12px;
	line-height: 14px;
}
.article-item .content h3 {
	font-size: 16px;
	line-height: 22px;
	height: 44px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article-cover {
	width: 100px;
}
.article-cover .img-holder {
	padding-bottom: 70%;
}
.video-fixed {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
}
.video-container {
	position: relative;
	width: 100%;
	z-index: 1001
}
.mask {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, .9);
	z-index: 1000;
}
.nomore {
	text-align: center;
	color: #787878;
	clear: both;
	line-height: 32px;
	padding: 10px 0;
}
</style>