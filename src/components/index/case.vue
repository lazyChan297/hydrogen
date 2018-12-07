<template lang="html">
  <!-- 推荐列表 -->
  <div class="waterfall-wrapper">
    <ul class="tag-list" v-show="showtag">
      <li class="tag-item active">全部分类</li>
      <li class="tag-item">中性</li>
      <li class="tag-item">干性</li>
      <li class="tag-item">又性</li>
    </ul>
    <ul class="waterfall-list" :class="showtag?'case':'recommend'" ref="recommendList">
      <li class="recommend-item" ref="waterfallItem" v-for="(item, index) in caseList">
        <div class="local-container" v-if="index===0">
          <p class="back">返回全部</p>
          <p class="checkAll">查看所有人</p>
        </div>
        <div class="inner" v-else>
             <div class="case">
               <div class="compareBox">
                 <img :src="loadimg(k.thumb, v)" alt="" v-for="(k,v) in item.imgs">
               </div>
                <p class="desc" v-if="item.content"><span class="blue">#第{{item.days}}天#</span>{{item.content}}</p>
               <p class="location">南宁市 青秀区</p>
               <p class="ask">
                 <span class="user">
                   <img v-lazy="item.avatar" alt="" width="20" height="20">
                   <span>{{item.nickName}}</span>
                 </span>
                 <span class="icon">
                   <i class="icon-unlike"></i>
                   <span class="num">5</span>
                 </span>
               </p>
             </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/utils/http'
const padding_left = 5
const padding_right = 15
const COLUMNS = 2
const screenwight = window.innerWidth
let width = (screenwight - padding_left - padding_right) / 2
export default {
  data() {
    return {
      caseList: [{}],
      showtag: false,
      list: [
        {},
        {
          type: 'question',
          answer: 2,
          question: '第一次使用负氢离子,该如何使用'
        },
        {
          type: 'case',
          days: 12,
          desc: '修复痘痘，红血丝，激素脸，感觉良好超级超级长超级超级长超级超级长超级超级长超级超级长超级超级长超级超级长超',
          compareList: [
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg' },
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg'}
          ],
          location: '南宁市 青秀区'
        },
        {
          type: 'case',
          days: 12,
          desc: '修复痘痘，红血丝，激素脸，感觉良好',
          compareList: [
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg' },
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg'}
          ],
          location: '南宁市 青秀区'
        },
        {
          type: 'case',
          days: 10,
          desc: '修复痘痘，红血丝，激素脸，感觉良好',
          compareList: [
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg' },
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg'}
          ],
          location: '南宁市 青秀区'
        },
        {
          type: 'case',
          days: 17,
          desc: '修复痘痘',
          compareList: [
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg' },
            { src: 'https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg'}
          ],
          location: '南宁市 青秀区'
        },
        {
          type: 'question',
          answer: 23,
          question: '第一次使用负氢离子,该如何使用'
        },
        {
          type: 'question',
          answer: 4,
          question: '第一次使用负氢离子,该如何使用'
        }
      ],
      listType: 'recommend',
      imgHeightList: [ ]
    }
  },
  created() {
  },
  mounted() {
    this.getCaseList()
  },
  methods: {
    loadimg(src,index) {
      let that = this
      let list = this.$refs.waterfallItem
      let img = new Image()
      img.src = src

      img.onload = function() {
        that.imgHeightList.push(list[index].offsetHeight)
      }
      return src
    },
    // 计算宽度
    _initWidth() {
      let width = (screenwight - padding_left - padding_right) / 2
      let list = this.$refs.waterfallItem
      list.forEach((item) => {
        item.style.width = width + 'px'
      })
    },
    // 计算高度
    calculateHeight() {
      let list = this.$refs.waterfallItem, heightList = [],width = list[0].offsetWidth
      let imgHeightList = this.imgHeightList
      for (let i = 0; i < list.length; i++) {
        if (i < COLUMNS) {
          heightList.push(list[i].offsetHeight)
        } else {
          let min = Math.min.apply(null, heightList)
          let minIndex = this._findIndex(heightList, min)
          list[i].style.position = 'absolute'
          list[i].style.top = min + 'px'
          list[i].style.left = minIndex * width + 5 + 'px'
          heightList[minIndex] += list[i].offsetHeight
        }
      }
    },
    _findIndex(list, n) {
      for (let k = 0; k < list.length; k++) {
        if (list[k] === n) {
          return k
        }
      }
    },
    getCaseList () {
			let params = {
				page: this.page,
				number: this.number
			}
			http.get('/shows', params, false, res => {
				if (res.status == 1 ) {
          let list = this.$refs.waterfallItem
          let heightList = []
          this.caseList = this.caseList.concat(res.data.shows)
          this.$nextTick(() => {
            list.forEach((item, i) =>{
              if (i < COLUMNS) {
                heightList.push(list[i].offsetHeight)
              } else {
                let max = Math.max.apply(null, heightList)
                let min = Math.min.apply(null, heightList)
                let minIndex = this._findIndex(heightList, min)
                let dis = -(max - min)
                // console.log(max,min)
                // list[i].style.transform = `translate3D(0,${dis}px,0)`
              }
              console.log(item.offsetHeight)
            })
          })
				}
			})
		}
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>

@import "../../assets/stylus/variable.styl"
.tag-list
  padding-left: 15px
  height: 70px;
  display: flex;
  align-items: center
  font-size:12px
  color:$color-title
  .tag-item
    text-align:center
    line-height:24px
    margin-right:22px
    padding:0 12px
    &.active
      border-radius:50px
      background:$color-blue-a
      color:#fff
.waterfall-list
  position: relative
  margin-bottom:50px
  padding:0 15px 0 5px
  overflow:hidden
  &.recommend
    margin-top:26px
  .local-container, .back-container
    position:relative
    float:left
    width:100%
    background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%)
    border-radius:5px
    color:#fff
    .back
      font-size:16px
      margin:20px 0 0 15px
      font-weight:bold
    .checkAll
      font-size:10px
      margin-left:15px
  .local-container
    height:185px
    &:after
      content:''
      background-image:url('../../assets/svg/right-local.svg')
      background-size:100%
      display:block
      position:absolute
      width:69px
      height:74px
      right:0
      bottom:0
      opacity:0.8
  .back-container
    height:80px
    &:after
      content:''
      background-image:url('../../assets/svg/right-back.svg')
      background-size:100%
      display:block
      position:absolute
      width:69px
      height:50px
      right:0
      bottom:0
      opacity:0.8
  .recommend-item
    float:left
    padding-bottom:10px
    width:50%
    padding-left: 10px
    &:last-child
      margin-bottom: 50px
    .inner
      background:#fff
      border-radius:5px
      padding:5px
      box-shadow:0px 8px 25px 0px rgba(221,227,237,0.8)
      .userInfo
        img
          border-radius: 50%
        .name
          color:$color-title
          font-size:12px
          font-weight:bold
        .text
          color:$color-text-ll
          font-size:12px
    .compareBox
      width:100%
      font-size:0
      img
        width:50%
    .desc
      margin:8px 0 5px
      font-size:12px
      line-height:17px
      .blue
        color:$color-blue-a
        font-weight:bold
    .location
      color:$color-blue-b
      font-size:10px
      margin-bottom:10px
    .ask
      display: flex
      justify-content: space-between
      .user
        img
          border-radius:50%
        span
          color:#000
          font-size:12px
          font-weight:bold
    .question
      margin-top:8px
      span
        color:$color-title
        font-size:14px
        font-weight:bold

    .answer
      display:flex
      justify-content:space-between
      align-items:center
      margin-top:14px
      .num
        color:$color-text-ll
        font-size:13px
      .submit
        border:4px solid $color-line
        border-radius:50px
        width:50px
        text-align:center
        font-size:12px
</style>
