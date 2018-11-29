<template>
	<div v-if="loaded" class="index">
		<div class="stack-wrapper">
			<stack 
			ref="stack" 
			@currentPage="getNowPage" 
			:pages="caseList" 
			:stackinit="stackinit"></stack>
		</div>
		<footer-nav bottom-nav="首页" bgColor="rgba(255, 255, 255, .75)"></footer-nav>
	</div>
</template>

<script>
import detectPrefixes from '@/utils/detect-prefixes.js'	
import Stack from '@/components/public/Stack'
import FooterNav from '@/components/public/FooterNav'
import http from '@/utils/http'
import { mapGetters } from 'vuex'
import { setStore } from '@/utils/mUtils'

export default {
	components: {
		FooterNav,
		Stack
	},
	data () {
		return {
			current: 1,
			page: 1,
			number: 10,
			nomore: false,
			loaded: false,
			stackinit: {
				visible: 2
			},
			caseList: []
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		getNowPage (val) {
			this.current = val
		},
		// 当用户访问分销商的主页时，记录用户的访问
		userAddViewer (userSn) {
      let params = {
        distributor: userSn
      }
      http.post('/users/addViewer', params, false, res => {
        if (res.status == 1) {
          // ...
        }
      })    
    },
		getCaseList () {
			let params = {
				page: this.page,
				number: this.number
			}
			http.get('/shows', params, false, res => {
				if (res.status == 1 ) {
					this.loaded = true
					if (res.data.shows.length > 0) {
						this.caseList = this.caseList.concat(res.data.shows)
						this.page ++
					}
					if (res.data.shows.length < this.number) {
						this.nomore = true
					}
					// 分享
					this.$wechat.ready(() => {
            this.$wechat.onMenuShareTimeline({
              title: '你的改变 价值百万',
              link: res.data.shareTimeline.link + '/#/?userSn=' + this.userInfo.userSn,
              imgUrl: this.userInfo.avatarUrl
            })

            this.$wechat.onMenuShareAppMessage({
              title: res.data.shareAppMessage.title, // 分享标题
              desc: res.data.shareAppMessage.desc, // 分享描述
              link: res.data.shareAppMessage.link + '/#/?userSn=' + this.userInfo.userSn, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: res.data.shareAppMessage.imgUrl // 自定义图片
            })
          })
				}else {
					this.nomore = true
				}
			})
		}
	},
	mounted () {
		this.getCaseList() 
		if (this.$route.query.userSn) {
			setStore('userSn', this.$route.query.userSn)
			this.userAddViewer(this.$route.query.userSn)
			let params = {
				distributor: this.$route.query.userSn
			}
			http.post('/users/setDistributor', params, false, res => {
	      if (res.status == 1) {
	        // ...
	      }
	    })
		}
	},
	watch: {
		current (val) {
			if (val > this.caseList.length - 2 && !this.nomore) {
				this.getCaseList()
			}
		}
	}
}	
</script>

<style scoped>
.index {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	background: url('./../assets/images/top_index.png') 0 5px no-repeat, linear-gradient(-90deg, #6B98FD 0%, #F3B8FF 100%);
	background-size: 100%;
}
.stack-wrapper{
	top: 13%;
  margin: 0 auto;
  position: relative;
  z-index: 1000;
  height: calc(100% - 13% - 80px);
  padding: 0;
  list-style: none;
  pointer-events: none;
  margin: 0 10px;
}	
</style>