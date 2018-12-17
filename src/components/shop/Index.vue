<template>
  <div>
    <!-- 关注微信公众bar -->
    <follow-account></follow-account>
    <!-- <div :to="{ path: JumpPath }" tag="div" class="crazy-buying">

       <div class="crazy-buying-panel">
        <div class="crazy-buying-hd">
          <div class="timer">
            <span>距开奖：</span>
            <em>{{ hours }}</em>:<em>{{ minutes }}</em>:<em>{{ seconds }}</em>
          </div>
        </div>
        <div class="crazy-buying-bd">
          <div class="goods-img">
            <img :src="LuckyData.goods.img">
          </div>
          <div class="content">
            <div class="goods-name">{{ LuckyData.goods.name }}</div>
            <p class="price">¥ {{ LuckyData.goods.price | toDecimal }}</p>
            <div class="flex-btm-desc">
              <div class="winner-users">
                <p>当前排名：</p>
                <div class="user-avatar">
                  <span v-for="(item,index) in lastThree" :key="index">
                    <img :src="item.avatar">
                  </span>
                </div>
              </div>
              <div class="buying-btn">
                <x-button style="border-radius: 20px;" mini :gradients="['#FF2719', '#FF61AD']">马上抢</x-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  -->

    <div class="recommend">
      <div class="part-title">精品好货</div>
      <recommend-list :recommend="goodsList"></recommend-list>
    </div>
    <!-- <a class="toFuPing" href="https://fupin.caomeng.me">
      <img src="./../../assets/images/package.gif">
    </a> -->
    <footer-nav bottom-nav="首页" text-color="#999"></footer-nav>
  </div>
</template>

<script>
import FooterNav from '@/components/public/FooterNav'
import { toDecimal } from '@/utils/mUtils'
import http from '@/utils/http'
import RecommendList from '@/components/public/RecommendList'
import FollowAccount from '@/components/public/FollowAccount'

export default {
  components: {
    FooterNav,
    RecommendList,
    FollowAccount
  },
  data () {
    return {
      endTime: '',
      hours: '00',
      minutes: '00',
      seconds: '00',
      LuckyData: null,
      luckyType: 0,
      goodsList: [],
      lastThree: []
    }
  },
  computed: {
  },
  methods: {
    // 初始化当前时间
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
    // 倒计时
    countDown (serverTime) {
      this.initTime()
      let startTime = new Date().getTime()
      let endTime = this.endTime.getTime()
      let sysTime = endTime - startTime
      let totalTime = serverTime;
      let differTime = sysTime - totalTime
      totalTime = totalTime + differTime

      totalTime = totalTime - 1000
      let hours = parseInt(totalTime / 1000 / 60 / 60 % 24, 10)
      let minutes = parseInt(totalTime / 1000 / 60 % 60, 10)
      let seconds = parseInt(totalTime / 1000 % 60, 10)
      this.hours = addZero(hours.toString()),
      this.minutes = addZero(minutes.toString()),
      this.seconds = addZero(seconds.toString()),
      clearInterval(this.timer)
      this.timer = setInterval(()=> {
        this.countDown(serverTime)
        if (totalTime <= 1000) {
          this.hours = '00'
          this.minutes = '00'
          this.seconds = '00'
          this.initTime()
        }
      }, 1000)
      function addZero (str) {
        return ('00' + str).substr(str.length)
      }
    },
    initIndexData () {
      http.get('/index', {}, false, res => {
        if (res.status == 1) {
          this.goodsList = res.data.goods
          this.$wechat.ready(() => {
            this.$wechat.onMenuShareTimeline({
              title: res.data.shareTimeline.title,
              link: res.data.shareTimeline.link,
              imgUrl: res.data.shareTimeline.imgUrl,
              success: function () {

              },
              cancel: function () {
              }
            })

            this.$wechat.onMenuShareAppMessage({
              title: res.data.shareAppMessage.title, // 分享标题
              desc: res.data.shareAppMessage.desc, // 分享描述
              link: res.data.shareAppMessage.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: res.data.shareAppMessage.imgUrl, // 自定义图片
            })
          })
        }
      })
    }
  },
  mounted () {
    this.initIndexData()
  },
  filters: {
    toDecimal (val) {
      return toDecimal(val)
    }
  }
}
</script>

<style scoped>
.part-title {
  position: relative;
  padding: 15px 0 15px 10px;
  line-height: 18px;
  font-size: 18px;
  font-weight: 700;
}
.part-title:after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 15px;
  width: 5px;
  height: 18px;
  background-image: linear-gradient(0deg, #00D0FC 0%, #2524DA 100%);
}
.activity,
.recommend {
  padding: 0 15px;
}
.activity span {
  font-size: 10px;
  color:#9b9b9b;
  margin-left: 4px;
}
</style>
