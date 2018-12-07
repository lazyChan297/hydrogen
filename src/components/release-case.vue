<template lang="html">
  <div class="releaseCase-wrapper">
    <div class="submit-box">
      <img :src="userInfo.avatarUrl" width="35" height="35" alt="">
      <div class="submit" >发布</div>
    </div>
    <div class="uploadImg">
      <div class="before">
        <div class="icon">
          <i class="icon-img"></i>
        </div>
        <p>上传使用前照片</p>
      </div>
      <div class="after">
        <div class="icon">
          <i class="icon-img"></i>
        </div>
        <p>上传使用后照片</p>
      </div>
    </div>
    <div @click="showCalendar" class="time panel">
			<div class="after">
				<div class="year">{{ timeObj[0].year }} 年</div>
				<div class="month-day">{{ timeObj[0].month }}月{{ timeObj[0].day }}日</div>
				<span>使用产品前</span>
			</div>
			<div class="total-days">
				<div class="container">共<span> {{ days }} </span>天</div>
			</div>
			<div class="before">
				<div class="year">{{ timeObj[1].year }} 年</div>
				<div class="month-day">{{ timeObj[1].month }}月{{ timeObj[1].day }}日</div>
				<span>使用产品后</span>
			</div>
      <!-- 选择时间 -->
  		<popup :hide-on-blur="false" v-model="isShowCalendar">
  			<div class="popup-header">
  				<span @click="popupCancel" class="popup-cancel">取消</span>
  				<h4>选择日期</h4>
  			</div>
  			<inline-calendar
  			:render-function="buildSlotFn"
  			v-model="time"
  			disable-future
  			@on-change="onChange"></inline-calendar>
  		</popup>
		</div>
    <!-- 使用过的产品 -->
    <div class="used-box">
      <router-link to="/chooseProd" class="used" tag="div">
        <p class="text">选择使用过的产品</p>
        <div class="icon">
          <i class="icon-arrow"></i>
        </div>
      </router-link>
      <ul class="usedProd-list">
        <li class="usedProd-item">
          <img :src="userInfo.avatarUrl" alt="" width="30" height="30">
          <span class="prod-name">每日复活素</span>
          <span class="delete">删除</span>
        </li>
        <li class="usedProd-item">
          <img :src="userInfo.avatarUrl" alt="" width="30" height="30">
          <span class="prod-name">每日复活素</span>
          <span class="delete">删除</span>
        </li>
      </ul>
    </div>
    <!-- 使用体验 -->
    <div class="textarea-box">
      <textarea name="name" placeholder="写下你的使用体验吧" rows="8" cols="80"></textarea>
    </div>
    <p class="tag-title">肤质</p>
    <!-- 肤质 -->
    <ul class="tag-list">
      <li class="tag-item active">油性</li>
      <li class="tag-item">中性</li>
      <li class="tag-item">油性</li>
      <li class="tag-item">中性</li>
      <li class="tag-item">油性</li>
      <li class="tag-item">中性</li>
    </ul>
    <!-- 位置 -->
    <div class="location" @click="getLocation">
      <p class="text">
        <i class="icon-location"></i>
        <span>你在哪里？</span>
      </p>
      <div class="icon">
        <i class="icon-arrow"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {Popup, InlineCalendar} from 'vux'
export default {
  data() {
    return {
      isShowCalendar: false,
      time: [],
      buildSlotFn: () => ''
    }
  },
  created() {
  },
  methods: {
    showCalendar() {
      this.isShowCalendar = true
    },
    popupCancel () {
			if (this.time.length == 1) return
			this.isShowCalendar = false
		},
    onChange (val) {
      if (val.length === 2) {
				this.isShowCalendar = false
				if (val[0] > val[1]) {
					this.time = []
					this.time.push(val[1])
					this.time.push(val[0])
				}
			}
			if (val.length > 2) {
				this.time.splice(0, 1)
			}
		},
    getLocation() {
      this.$wechat.getLocation()
    }
  },
  components: {
    Popup,
    InlineCalendar
  },
  computed: {
    timeObj () {
			if (this.time.length == 2) {
				let arr = []
				this.time.forEach(item => {
					let temp = item.split('-')
					let obj = {
						year: temp[0],
						month: parseInt(temp[1]),
						day: parseInt(temp[2])
					}
					arr.push(obj)
				})
				return arr
			}
			return [
				{ year: '--', month: '-', day: '-' },
				{ year: '--', month: '-', day: '-' }
			]
		},
    days () {
			if (this.time.length == 2) {
				let start = new Date(this.time[0]).getTime()
				let end = new Date(this.time[1]).getTime()
				let days = (end - start) / 1000 / 60 / 60 / 24
				return parseInt(days) + 1
			}
			return '-'
		},
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "../assets/stylus/variable.styl"
.releaseCase-wrapper
  background:#fff
  padding-bottom:15px
  .submit-box
    position:fixed
    top:0
    background:#fff
    width:100%
    display: flex
    justify-content: space-between
    align-items: center
    height: 75px
    padding: 0 20px
    z-index:10
    img
      border-radius: 50%
    .submit
      width:70px;
      height:30px;
      background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%);
      box-shadow: 0px 9px 20px -3px rgba(0,0,0,0.15)
      border-radius:50px
      text-align: center
      line-height: 30px
      color: #fff
  .uploadImg
    display: flex
    height:170px
    padding: 0 15px
    margin-top:75px
    .before, .after
      flex:1
      background:#fff
      box-shadow: 0px 9px 20px -3px rgba(0,0,0,0.15)
      border-radius: 5px
      &.before
        margin-right:10px
      .icon
        width:30px
        margin:71px auto 46px
      p
        color:$color-text-ll
        text-align:center
  .time
    position: relative;
    display: flex;
    align-items: center
    .total-days
      flex: 1;
      position: relative;
      text-align: center;
      margin: 0 8px
      .container
        position: relative;
        text-align: center;
        display: inline-block;
        width: 80px;
        border: 1px solid #CCCCCC;
        font-size: 12px;
        color: #9B9B9B;
        border-radius: 30px;
        line-height: 26px;
        background: #fff;
        z-index: 1;
        span
          font-size: 16px;
          color: #1A1B00
    .year
      font-size: 12px;
      color: #4F5054;
      line-height: 12px
    .month-day
      font-size: 20px;
      color: #38393C;
      line-height: 20px;
      font-weight: 700
    .after, .before
      span
        display: inline-block;
        background: #F6F7F8;
        font-size: 10px;
        line-height: 10px;
        padding: 6px 10px;
        color: #4F5054;
        margin-top: 5px
    .popup-header
      position: relative;
      padding: 8px 15px;
      h4
        font-size: 14px;
        color: #38393C;
        text-align: center;
        font-size: 16px;
      .popup-cancel
        position: absolute;
        left: 15px;
        font-size: 12px;
        color: #04BE02;
        line-height: 25px;
  .panel
    margin: 15px
    padding:15px
    background: #FFFFFF;
    box-shadow: 0px 9px 20px -3px rgba(0,0,0,0.15)
    border-radius: 5px
  .used-box
    margin:15px
    box-shadow: 0px 9px 20px -3px rgba(0,0,0,0.15)
  .used
    display:flex
    justify-content:space-between
    background:#fff
    height:60px
    align-items:center
    padding:0 15px
    border-radius:5px
    color:$color-title
  .usedProd-list
    .usedProd-item
      background:#fff
      height:45px
      display:flex
      align-items:center
      padding:0 15px
      .prod-name
        margin-left:12px
        flex:1
        text-align:left
        color:$color-title
      .delete
        color:$color-red
  .location
    display:flex
    justify-content:space-between
    margin:15px
    background:#fff
    height:60px
    align-items:center
    padding:0 15px
    border-radius:5px
    color:$color-title
    margin:15px
    box-shadow: 0px 9px 20px -3px rgba(0,0,0,0.15)
  .textarea-box
    background:#fff
    height:180px
    box-shadow: 0px 9px 20px -3px rgba(0,0,0,0.15)
    padding:25px 15px 0
    border-radius:5px
    margin:15px 15px 0
    overflow:hidden
    textarea
      outline:none
      width:100%
  .tag-title
    margin:15px 15px 10px
    color:$color-title
    .icon-location
      margin-top:-4px
  .tag-list
    margin:15px
    overflow:hidden
    .tag-item
      float:left
      color:#fff
      border-radius:50px
      background:#e2e2e2
      padding:0 13px
      margin-right:10px
      margin-bottom:10px
      &.active
        background:$color-blue-a
</style>
