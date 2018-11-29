<template>
	<div v-if="LuckyData" class="panic-buying"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <!-- 关注微信公众bar -->
    <follow-account></follow-account>
    <div style="padding: 15px">
  		<div class="header-btns">
  	    <router-link class="header-btn-item" :to="{ path: '/winners' }">获奖名单</router-link>
        <div @click ="showActivityDialog = true" class="header-btn-item">活动规则</div>
    	</div>
    	<!-- 面板 -->
    	<div class="panic-panel">
  	    <div class="user-info">
  	      <div class="avatar">
  	        <img v-if="!shareUserData" :src="userInfo.avatarUrl" />
            <img v-else :src="shareUserData.avatar" />
  	      </div>
  	      <span class="user-name">{{ !shareUserData ? userInfo.nickName : shareUserData.name }}</span>
  	    </div>
  	    <router-link v-if="LuckyData.goods.id != 4" class="panic-product" :to="{ path: '/goods/detail', query: { id: LuckyData.goods.id } }">
  	      <div class="product-cover">
  	        <div class="img-holder">
  	        	<img :src="LuckyData.goods.img" />
  	        </div>
  	      </div>
  	      <div class="panic-info">
            <div v-if="!shareUserData" class="join-text">{{ LuckyData.goods.name }}</div>
  	        <div v-else class="join-text">
  	          我发现一件好货
  	          <div>来一起参与0元抢吧！</div>
  	        </div>
  	        <div class="price">¥ {{ LuckyData.goods.price | toDecimal }}</div>
  	        <!-- <span class="tips">15人已0元拿</span> -->
  	      </div>
  	    </router-link>
        <div v-else class="panic-product">
          <div class="product-cover">
            <div class="img-holder">
              <img :src="LuckyData.goods.img" />
            </div>
          </div>
          <div class="panic-info">
            <div v-if="!shareUserData" class="join-text">{{ LuckyData.goods.name }}</div>
            <div v-else class="join-text">
              我发现一件好货
              <div>来一起参与0元抢吧！</div>
            </div>
            <div class="price">¥ {{ LuckyData.goods.price | toDecimal }}</div>
            <!-- <span class="tips">15人已0元拿</span> -->
          </div>
        </div>
  	  </div>
  	  <!-- 分享按钮 -->
  	  <div class="join-btn">
  	    <span v-if="!shareUserData && LuckyData.type == 0 || !shareUserData && LuckyData.type == 2" @click="panicBuying" class="btn">好货0元抢</span>
        <span v-else-if="!shareUserData && LuckyData.type == 3" @click="onShares" class="btn">分享到群，让好友助力排名</span>
  	    <span v-else-if="shareUserData" @click="showFriendDialog" class="btn">帮他上榜首</span>
    	</div>
    	<!-- 活动倒计时 -->
    	<div class="prize-wrapper">
  	    <div class="text">活动即将开奖，赶快参与好货0元抢吧</div>
  	    <div class="prize-container">
  	      <div class="prize-step">
  	      
  	      </div>
  	      <div class="prize-nodes">
  	        <div class="time-item">
  	          <div class="color-red">即将开奖</div>
  	          <div class="time-text">倒计时</div>
              <div>{{date}}</div>
  	          <div class="time">{{ hours }}:{{ minutes }}:{{ seconds }}.{{ times }}</div>
  	        </div>
  	        <div class="time-item">
  	          <div class="color-red">下一轮开奖</div>
  	          <div class="time-text">开奖时间</div>
  	          <div class="time">明天 21:00</div>
  	        </div>
  	      </div>
  	      <div class="prize-tips">
  	        <span>获奖提示</span>请保持排行榜第一名，大奖非你莫属。
  	      </div>
  	    </div>
  	  </div>
  	    <!-- 排行榜 -->
      <div class="ranking-panel">
        <div class="ranking-title"><span>排行榜</span></div>
        <div class="ranking-list">
          <div class="ranking-item" v-for="(item, index) in rankingList" :key="index">
            <span class="number">{{ index + 1 }}</span>
            <div class="user">
              <div class="avatar"><img :src="item.avatar" /></div>
              <div class="content">
                <div class="name">{{ item.name }}</div>
                <span class="message">来一起分享0元抢</span>
              </div>
            </div>
            <div class="persons">{{ item.quantity }}人</div> 
          </div>
        </div>
        <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
          <div v-show="loading && rankingList.length > 0" class="loading-more">
            <inline-loading></inline-loading><span class="loading-text">加载中...</span>
          </div>
          <load-more v-if="nomore" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
        </div>
      </div>
    </div>

		<!-- 活动规则 -->
		<x-dialog v-model="showActivityDialog" :dialog-style="{ borderRadius: '10px', overflow: 'inherit' }" hide-on-blur>
			<div class="panic-dialog activity">
		    <div @click="showActivityDialog = false" class="close-dialog">
		    	<x-icon type="ios-close-empty" size="28" fill="#999"></x-icon>
		    </div>
		    <div class="panic-dialog-body">
		      <div class="title"><span>活动规则</span></div>
		      <div class="content">
		        <p>1、每天21:00开奖，每次开奖获奖者只有一名；</p>
		        <p>2、用户得奖后，将不参与接下来的开奖活动；</p>
		        <p>3、分享给好友，好友帮忙助力排名，排名越前越能   0元拿到商品，一个用户，只能助力一次；</p>
		        <p>4、每期开始助力人数清零，同时参与过、且未得奖的人，不需点击可自动参与下一期；</p>
		        <p>5、活动解释权归活动方解释。</p>
		      </div>
		    </div>
		  </div>
		</x-dialog>

		<!-- 参与0元抢 -->
		<x-dialog v-model="showPanicDialog" :dialog-style="{ borderRadius: '10px', overflow: 'inherit' }" hide-on-blur>
			<div class="panic-dialog success">
		    <div class="close-dialog" @click="showPanicDialog = false">
		    	<x-icon type="ios-close-empty" size="28" fill="#e02e24"></x-icon>
		    </div>
		    <div class="panic-dialog-body">
		      <img src="./../assets/images/success_img_03.jpg" />
		      <div class="success-tips">
		        <div>恭喜你，你已成功参与0元抢</div>
		        <div v-if="ranking">目前排名第<span class="color-red">{{ ranking }}</span>位，排名越前机会越大哦！</div>
		      </div>
		      <div class="share-btn tada animated" @click="onShares">
		        <span class="btn">分享到群，让好友助力排名</span>
		      </div>
		    </div>
		  </div>
		</x-dialog>

    <!-- 好友助力 -->
    <x-dialog v-model="friendHelpDialog" :dialog-style="{ borderRadius: '10px', overflow: 'inherit' }" hide-on-blur>
      <div class="panic-dialog friend-help" v-if="shareUserData">
        <div class="close-dialog" @click="friendHelpDialog = false">
          <x-icon type="ios-close-empty" size="28" fill="#e02e24"></x-icon>
        </div>
        <div class="panic-dialog-body">
          <div class="user-say">
            <div v-if="shareUserData.avatar" class="avatar"><img :src="shareUserData.avatar" /></div>
            <span>谢谢你帮我助力</span>
          </div>
          <div v-if="LuckyData.type == 0">你也可以0元拿到商品哦，快去参与吧！</div>
          <div v-if="LuckyData.type == 3" class="btn" @click="friendHelpDialog = false">
            <span class="btn">确定</span>
          </div>
          <div v-if="LuckyData.type == 0 || LuckyData.type == 2" @click="panicBuying" class="btn tada animated">
            <span class="btn">我也要0元抢</span>
          </div>
        </div>
      </div>
    </x-dialog>
    <!-- 右上角分享提示 -->
    <div class="share-tips" @click="showShareTips = false" v-if="showShareTips">
      <span class="share-tips-text">
        <img src="./../assets/images/share_tips.png">
      </span>
    </div>
	</div>	
</template>

<script>
import { dateFormat, XDialog, Icon, InlineLoading, LoadMore } from 'vux'
import { mapGetters } from 'vuex'
import http from '@/utils/http'
import { toDecimal, getUrlParms, removeStore, getStore } from '@/utils/mUtils'
import QS from 'qs'
import { cookie } from 'vux'
import FollowAccount from '@/components/public/FollowAccount'
let times = 10

export default {
	components: {
		XDialog,
		Icon,
    InlineLoading,
    LoadMore,
    FollowAccount
	},
	data () {
		return {
			endTime: '',
    	hours: '00',
    	minutes: '00',
    	seconds: '00',
    	times: '',
      showNoLuckyDialog: true,
      showShareTips: false,
    	showPanicDialog: false,
    	showActivityDialog: false,
      friendHelpDialog: false,
      LuckyData: null,
      ranking: null, // 提交返回当前的排名
      rankingList: [],
      page: 1,
      loading: true,
      nomore: false,
			shareUserData: null,
      time: 0,
      date: null,
      type: 0
		}
	},
	computed: {
    ...mapGetters(['userInfo'])
	},
	methods: {
    // 分享
    onShares () {
      this.showShareTips = true
      this.showPanicDialog = false
    },
		// 抢购
		panicBuying () {
      http.post('/lucky/participate', {}, false, res => {
        if (res.status == 1) {
          this.LuckyData.type = 3
          this.ranking = res.data.ranking
          this.friendHelpDialog = false
          this.showPanicDialog = !this.showPanicDialog
          this.rankingList = []
          this.page = 1
          this.getRanking()
        }else if (res.status == 0) {
          this.$vue.toast.show({
            text: res.info,
            type: 'warn',
            width: 'auto',
            position: 'middle'
          })
        }
      })
		},
    // 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getRanking()
        }, 500)
      } 
    },
		showFriendDialog () {
      http.post('/lucky/hasHelped', { invitor: this.shareUserData.userSn }, false, res => {
        if (res.status == 1) {
          if (res.data.canHelp == 1) {          
            http.post('/lucky/help', { invitor: this.shareUserData.userSn }, false, res => {
              if (res.status == 1) {
                this.friendHelpDialog = !this.friendHelpDialog
              }
            })
          }else {
            this.$vux.toast.show({
              text: res.info,
              type: 'warn',
              width: 'auto',
              position: 'middle'
            })
          }
        }else {
          this.$vux.toast.show({
            text: res.info,
            type: 'warn',
            width: 'auto',
            position: 'middle'
          })
        }
      })
		},
		initTime () {
			let startTime = new Date()
	    let nowYear = startTime.getFullYear()
	    let nowMon = startTime.getMonth() + 1
	    let nowDate = startTime.getDate()
      let endTime = new Date(nowYear + '/' + nowMon + '/' + nowDate + ' ' + '21:00:00')
      if (endTime < startTime) {
        endTime = new Date(endTime.getTime() + 60 * 60 * 1000 * 24)
      }
	    
    	this.endTime = endTime
		},
		countDown (serverTime) {   

      this.initTime()
      let startTime = new Date().getTime()
      let endTime = this.endTime.getTime()
      let sysTime = endTime - startTime
      let totalTime = serverTime;
      let differTime = sysTime - totalTime
      totalTime = totalTime + differTime

      totalTime = totalTime - 100
      let hours = parseInt(totalTime / 1000 / 60 / 60 % 24, 10)
      let minutes = parseInt(totalTime / 1000 / 60 % 60, 10)
      let seconds = parseInt(totalTime / 1000 % 60, 10)
      if (times <= 0) {
        times = 9
      }
      times--
      this.hours = addZero(hours.toString()),
      this.minutes = addZero(minutes.toString()),
      this.seconds = addZero(seconds.toString()),
      this.times = times 
      clearInterval(this.timer)
	    this.timer = setInterval(()=> {
        this.countDown(serverTime)
	      if (totalTime <= 100) {
          this.hours = '00'
          this.minutes = '00'
          this.seconds = '00'
          this.initTime()      
          this.getLuckyData()
          if (this.type == 1) {
            this.$router.push({ path: '/winningPrize' })
          }else {
            this.$vux.confirm.show({
              title: '提示信息',
              content: '您参与过0元抢，点击左上角 获奖名单 可查看是谁中奖了。同时您也可以继续参与0元抢',
              showCancelButton: false
            })
          }          
	      }
	    }, 100)
	    function addZero (str) {
	      return ('00' + str).substr(str.length)
	    }
	  },
    // 获取抢购的数据
    getLuckyData () {
      http.get('/lucky', {}, false, res => {
        if (res.status == 1) {
          this.LuckyData = res.data
          this.type = res.data.type
          this.countDown(res.data.countDown * 1000)
          this.getRanking() 
          // 分享
          let params = {
            userSn: res.data.userSn,
            name: this.userInfo.nickName,
            avatar: this.userInfo.avatarUrl 
          }
          let link = global.serverHost + '/#/crazyBuying?' + QS.stringify(params)
          let shareConfig = {
            title: `【${this.userInfo.nickName}】在0元抢货，帮他上榜首!`,
            desc: res.data.goods.name,
            link: link,
            imgUrl: res.data.goods.img 
          }
          let timelineConfig = {
            title: `${this.LuckyData.participatorCount}人在参与0元抢“${res.data.goods.name}”`,
            link: link,
            imgUrl: res.data.goods.img
          }
          this.$wechat.ready(() => {
            this.$wechat.onMenuShareAppMessage(shareConfig)
            this.$wechat.onMenuShareTimeline(timelineConfig) 
          })   
        }
      })
    },
    // 获取排行榜
    getRanking () {
      let params = {
        page: this.page,
        number: 10,
        periodId: this.LuckyData.periodId
      } 
      http.get('/lucky/top', params, false, res => {
        if (res.status == 1 && res.data.users.length > 0) {
          this.rankingList = this.rankingList.concat(res.data.users)
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
  filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  },
	mounted () {  
    this.getLuckyData()
    if (!this.shareUserData && getUrlParms('userSn')) {
      this.shareUserData = {
        userSn: getUrlParms('userSn'),
        name: getUrlParms('name'),
        avatar: getUrlParms('avatar')
      }      
    }
	}
}	
</script>

<style scoped>
.panic-buying {
  position: relative;
  box-sizing: border-box;
  background: #f84a49 url('./../assets/images/panicBuying_bg.jpg') no-repeat;
  background-size: 100%;
  min-height: 100%;
  overflow: hidden;
}
.header-btns {
 display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
}
.header-btn-item {
  padding: 6px 10px;
  color: #fff;
  background: rgba(0, 0, 0, .5);
  border-radius: 20px;
  font-size: 13px;
  line-height: 13px;
}
.panic-panel {
  background: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 2px 10px rgba(224, 46, 36, 1);
}
.panic-panel .user-info,
.friend-help .user-say {
  text-align: center;
  font-size: 0;
}
.panic-panel .avatar,
.friend-help .avatar {
  flex: 0 0 auto;
  position: relative;
  margin-top: -25px;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid #fff;
  overflow: hidden;
  background: #e5e5e5;
}
.panic-panel .user-name {
  font-size: 14px;
  display: block;
  line-height: normal;
  color: #787878;
}
.panic-product {
  display: flex;
  padding: 10px;
  margin-bottom: 15px;
}
.product-cover {
  flex: 0 0 100px;
  width: 100px;
  overflow: hidden;
}
.product-cover .img-holder {
  padding-bottom: 100%;
}
.panic-info {
  margin-left: 8px;
}
.panic-info .join-text {
  font-size: 16px;
  color: #333;
  line-height: normal;
}
.panic-info .tips {
  font-size: 12px;
  color: #999;
  line-height: 12px;
}
.panic-info .price {
  font-size: 20px;
  color: #e02e24;
  font-weight: 500;
  padding-top: 5px;
}
.join-btn {
  position: relative;
  margin-bottom: 15px;
}
.join-btn::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f28e05;
  bottom: -3px;
  z-index: 0;
  border-radius: 50px;
}
.join-btn .btn {
  position: relative;
  display: block;
  text-align: center;
  border-radius: 50px;
  background: #ffc825;
  background: linear-gradient(#f9f647, #ffc825);
  color: #e02e24;
  font-size: 18px;
  line-height:2.55555556;
  font-weight: 500; 
  z-index: 2;
  cursor: pointer;
  -webkit-animation: my-scale .3s infinite linear;
}
.join-btn:active::after {
	display: none;
}
.join-btn:active .btn {
	top: 3px;
}
.join-btn .btn::after {
  border: 0;
}
.prize-wrapper {
  margin-bottom: 15px;
}
.prize-wrapper .text {
  color: #fff;
  text-align: center;
  padding-bottom: 8px;
}
.prize-container {
  background: #fff;
  border-radius: 5px;
  padding:  10px 10px 15px 10px;
  box-shadow: 0 2px 10px rgba(224, 46, 36, 1);
}
.prize-nodes {
  position: relative;
  display: flex;
  padding-top: 20px;
  padding-bottom: 10px;
}
.prize-nodes::after {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: #dbdbdb;
}
.prize-nodes .time-item {
  position: relative;
  flex: 1;
  text-align: center;
}
.prize-nodes .time-item::after {
  content: '';
  display: block;
  position: absolute;
  left: 50%;
  top: -14px;
  margin-left: -4px;
  width: 9px;
  height: 9px;
  background: #f28e05;
  border-radius: 100%;
  z-index: 5;
}
.time-item div {
  color: #787878;
  font-size: 13px;
}
.time-item .time-text {
  padding: 3px 0 5px 0;
}
.time-item .color-red {
  font-size: 16px;
  color: #e02e24;
}
.prize-tips {
  font-size: 12px;
  color: #a6937c;
}
.prize-tips span {
  display: inline-block;
  background: #a6937c;
  padding: 1px 5px;
  font-size: 12px;
  color: #fff;
  border-radius: 5px;
  margin-right: 3px;
}
.ranking-panel {
  background: #ffdfe0;
  border-radius: 5px;
  padding: 10px;
}
.ranking-title {
  position: relative;
  text-align: center; 
}
.ranking-title span {
  position: relative;
  display: inline-block;
  font-size: 18px;
  color: #e02e24;
  background: #ffdfe0;
  z-index: 5;
  padding: 5px 15px;
}
.ranking-title::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 0; 
  border-top: 1px solid #e02e24;
}
.ranking-item {
  display: flex;
  padding: 5px 0;
  align-items: center;
}
.ranking-item .number {
  width: 20px;
}
.ranking-item .number,
.ranking-item .persons {
  flex: 0 0 auto;
  font-size: 16px;
  color: #e02e24;
}
.ranking-item .user {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
  overflow: hidden;
}
.ranking-item .user .content {
  flex: 1;
  padding-right: 10px;
  overflow: hidden;
}
.ranking-item .user .avatar {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #e02e24;
  margin-right: 8px;
}
.ranking-item .user .name {
  color: #e02e24;
  line-height: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.ranking-item .user .message {
  color: #999;
  font-size: 12px;
  display: block;
  line-height: 12px;
  padding-top: 3px;
}

.panic-dialog {
  position: relative;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;
}
.close-dialog {
  position: absolute;
  width: 28px;
  height: 28px;
  top: -8px;
  right: -8px;
  background: #e5e5e5;
  border-radius: 100%;
}
.activity .title {
  position: relative;
  text-align: center; 
  margin-bottom: 5px;
}
.activity .title span {
  position: relative;
  display: inline-block;
  font-size: 16px;
  color: #e02e24;
  background: #fff;
  z-index: 5;
  padding: 0 15px;
}
.activity .title::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 0; 
  border-top: 1px solid #e02e24;
}
.activity .content p {
  color: #666;
  margin-top: 5px;
}
.success {
  background: #ffe7dc;
  padding: 0;
  border-radius: 10px;
}
.success img {
  display: block;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.success-tips {
  text-align: center;
}
.success-tips .color-red {
  color: #e02e24
}
.share-btn {
  padding: 15px;
}
.share-btn .btn,
.friend-help .btn span {
	display: block;
  font-size: 16px;
  border-radius: 50px;
  text-align: center;
  line-height:2.55555556;
  background: #e02e24;
  background: linear-gradient(#fe7777, #e02e24);
  color: #fff;
  -webkit-animation: my-scale .3s infinite linear;
  margin-top: 15px;
}
.share-btn .btn::after,
.friend-help .btn button::after {
  border: 0;
}
@-webkit-keyframes  my-scale {
  0% {
     -webkit-transform: scale(1);
  }
  50% {
     -webkit-transform: scale(1.02);
  }
  100% {
     -webkit-transform: scale(1);
  }
}

.friend-help {
  text-align: center;
}
.friend-help .user-say {
  padding-bottom: 10px;
}
.friend-help .avatar {
  width: 64px;
  height: 64px;
  margin-top: -45px;
}
.friend-help span {
  display: block;
  font-size: 13px;
  color: #787878;
}
.share-tips {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, .75);
  z-index: 99;
}
.share-tips .share-tips-text {
  float: right;
  width: 75%;
  padding: 10px 15px 0 0;
}
</style>