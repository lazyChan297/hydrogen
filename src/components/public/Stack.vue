<template>
    <div class="case-box stack">
      <router-link :to="{ path: '/user/index', query: { userSn: item.userSn } }" tag="div" class="case-item stack-item" v-for="(item, index) in pages" :key="index"
      :style="[transformIndex(index),transform(index)]"
      @touchmove.native="touchmove"
      @touchstart.native="touchstart"
      @touchend.native="touchend"
      @touchcancel.native="touchend"
      @mousedown.native="touchstart"
      @mouseup.native="touchend"
      @mousemove.native="touchmove"
      @mouseout.native="touchend"
      @webkit-transition-end.native="onTransitionEnd(index)"
      @transitionend.native="onTransitionEnd(index)">
        <div>
        <div class="case-imgs">
          <div class="after">
            <span class="img-holder">
              <img v-if="item.imgs[0]" class="obj-cover" :src="item.imgs[0].thumb">
            </span>
            <p class="days">第1天 {{ item.before }}</p>
          </div>
          <div class="before">
            <span class="img-holder">
              <img v-if="item.imgs[1]" class="obj-cover" :src="item.imgs[1].thumb">
            </span>
             <p class="days">第{{ item.days }}天 {{ item.after }}</p>
          </div>
        </div>
        <div class="container bottom-1px">
          <div class="time">
            <b>{{ item.days }}</b>
            <p>使用天数</p>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
        <div class="user-info">
          <div class="info">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="context">
              <h4>{{ item.nickname }} 的氢量极品</h4>
              <p>点击头像进入主页</p>
            </div>
          </div>
          <div class="user-qrcode">
            <img :src="item.qrCode">
          </div>
        </div>
        </div>
      </router-link>
    </div>
</template>
<script>
import detectPrefixes from '@/utils/detect-prefixes.js'
export default {
  props: {
    stackinit: {
      type: Object,
      default: []
    },
    pages: {
      type: Array,
      default: {}
    }
  },
  data () {
    return {
      basicdata: {
        start: {},
        end: {}
      },
      temporaryData: {
        prefixes: detectPrefixes(),
        offsetY: '',
        poswidth: 0,
        posheight: 0,
        lastPosWidth: '',
        lastPosHeight: '',
        lastZindex: '',
        rotate: 0,
        lastRotate: 0,
        visible: this.stackinit.visible || 3,
        tracking: false,
        animation: false,
        currentPage: this.stackinit.currentPage || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      }
    }
  },
  computed: {
    // 划出面积比例
    offsetRatio () {
      let width = document.body.clientWidth
      let height = document.body.clientHeight
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let offsetHeight = height - Math.abs(this.temporaryData.posheight)
      let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
      return ratio > 1 ? 1 : ratio
    },
    // 划出宽度比例
    offsetWidthRatio () {
      let width = this.$el.offsetWidth
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let ratio = 1 - offsetWidth / width || 0
      return ratio
    }
  },
  mounted () {
    // 绑定事件
    this.$on('next', () => {
      this.next()
    })
    this.$on('prev', () => {
      this.prev()
    })
    document.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    touchstart (e) {
      if (this.temporaryData.tracking) {
        return
      }
      // 是否为touch
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
          // offsetY在touch事件中没有，只能自己计算
          this.temporaryData.offsetY = e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop
        }
      // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
        this.temporaryData.offsetY = e.offsetY
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
    },
    touchmove (e) {
      // 记录滑动位置
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === 'touchmove') {
          e.preventDefault()
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          e.preventDefault()
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // 计算滑动值
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
        let rotateDirection = this.rotateDirection()
        let angleRatio = this.angleRatio()
        this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
      }
    },
    touchend (e) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.4
      if (this.offsetRatio >= 0.2) {
        // 计算划出后最终位置
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
        this.temporaryData.opacity = 0
        this.temporaryData.swipe = true
        this.nextTick()
      // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.swipe = false
        this.temporaryData.rotate = 0
      }
    },
    nextTick () {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth
      this.temporaryData.lastPosHeight = this.temporaryData.posheight
      this.temporaryData.lastRotate = this.temporaryData.rotate
      this.temporaryData.lastZindex = 20
      // 循环currentPage
      this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.opacity = 1
        this.temporaryData.rotate = 0
      })
    },
    onTransitionEnd (index) {
      let lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true
        this.temporaryData.lastPosWidth = 0
        this.temporaryData.lastPosHeight = 0
        this.temporaryData.lastOpacity = 0
        this.temporaryData.lastRotate = 0
        this.temporaryData.swipe = false
        this.temporaryData.lastZindex = -1
      }
    },
    prev () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = -width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '-3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    next () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.$el.offsetWidth
      this.temporaryData.poswidth = width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    rotateDirection () {
      if (this.temporaryData.poswidth <= 0) {
        return -1
      } else {
        return 1
      }
    },
    angleRatio () {
      let height = this.$el.offsetHeight
      let offsetY = this.temporaryData.offsetY
      let ratio = -1 * (2 * offsetY / height - 1)
      return ratio || 0
    },
    inStack (index, currentPage) {
      let stack = []
      let visible = this.temporaryData.visible
      let length = this.pages.length
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i)
        } else {
          stack.push(currentPage + i - length)
        }
      }
      return stack.indexOf(index) >= 0
    },
    // 非首页样式切换
    transform (index) {
      let currentPage = this.temporaryData.currentPage
      let length = this.pages.length
      let lastPage = currentPage === 0 ? this.pages.length - 1 : currentPage - 1
      let style = {}
      let visible = this.temporaryData.visible
      if (index === this.temporaryData.currentPage) {
        return
      }
      if (this.inStack(index, currentPage)) {
        let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
        style['opacity'] = '1'
        style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
        style['zIndex'] = visible - perIndex
        if (!this.temporaryData.tracking) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
        }
      } else if (index === lastPage) {
        style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
        style['opacity'] = this.temporaryData.lastOpacity
        style['zIndex'] = this.temporaryData.lastZindex
        style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
        style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
      } else {
        style['zIndex'] = '-1'
        style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
      }
      return style
    },
    // 首页样式切换
    transformIndex (index) {
      if (index === this.temporaryData.currentPage) {
        let style = {}
        style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
        style['opacity'] = this.temporaryData.opacity
        style['zIndex'] = 10
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
        }
        return style
      }
    }
  },
  watch: {
    'temporaryData.currentPage' (val) {
      this.$emit('currentPage', val + 1)
    }
  }
}
</script>
<style scoped>
.stack {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  perspective-origin: 50% 150%;
  -webkit-perspective: 1000px;
  -webkit-perspective-origin: 50% 150%;
  margin: 0;
  padding: 0;
}
.case-box {
  position: relative;
}
.stack-item{
  ackground: #fff;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  opacity: 0;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: auto;
}
.case-item {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 15px 0 rgba(0,0,0,0.10);
}
.case-imgs {
  display: flex;
}
.case-imgs div {
  flex: 1;
  position: relative;
}
.days {
  line-height: 14px;
  padding: 7px 0;
  background: #FDDA00;
  text-align: center;
}
.after .days {
  background: #CECECE;
}
.case-imgs .img-holder {
  padding-bottom: 120%;
}
.case-item .container {
  display: flex;
  padding: 15px 0;
}
.case-item .time {
  flex: 0 0 auto;
  margin-right: 15px;
}
.case-item .time b {
  display: block;
  font-size: 36px;
  color: #EE7D89;
  line-height: 36px;
  text-align: center;
}
.case-item .time p {
  color: #9B9B9B;
  font-size: 10px;
  text-align: center;
}
.case-item .content {
  font-size: 14px;
  line-height: 18px;
  height: 54px;
  color: #000;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.user-info {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  padding: 15px 0 5px 0;
}
.user-info .info {
  flex: 1;
  display: flex;
  align-items: center;
}
.user-info .avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 8px;
}
.user-info .context p {
  font-size: 10px;
  color: #9B9B9B;
}
.user-qrcode {
  width: 50px;
  height: 50px;
}
</style>
