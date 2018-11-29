<template>
	<div style="padding: 0 15px;" v-if="userInfo">
		<div class="user">
			<div class="avatar">
				<img :src="userInfo.avatarUrl">
			</div>
			<div @click="back" class="cancel">取消</div>
		</div>
		<div class="info panel">
			<div class="upload-wrapper">
				<!-- <div class="upload-btn" v-if="uploadImgs.length < 2">
	        <div @click="uploadImgs" class="iconfont">
	          <svg class="icon" aria-hidden="true">
	            <use xlink:href="#icon-xiangji"></use>
	          </svg>
	        </div>
	      </div> -->

	      <div class="upload-box upload-before">
	      	<div @click="uploadImg('before')" v-if="!uploadImgs.before" class="btn">
	      		<span class="img-holder">
		      		<x-icon class="plus-icon" size="26" type="ios-plus"></x-icon>
		      		<p>使用前</p>
	      		</span>
	      	</div>
	      	<div v-else class="img">
	      		<x-icon @click="deleteImg('before')" class="delete-icon" type="ios-close-empty" size="18"></x-icon>
	      		<span class="img-holder">
	      			<img class="obj-cover" :src="uploadImgs.before">
	      		</span>
	      	</div>
	      </div>

	      <div class="upload-box upload-after">
	      	<div  @click="uploadImg('after')" v-if="!uploadImgs.after" class="btn">
	      		<span class="img-holder">
		      		<x-icon class="plus-icon" size="26" type="ios-plus"></x-icon>
		      		<p>使用后</p>
	      		</span>
	      	</div>
	      	<div v-else class="img">
	      		<x-icon @click="deleteImg('after')" class="delete-icon" type="ios-close-empty" size="18"></x-icon>
	      		<span class="img-holder">
	      			<img class="obj-cover" :src="uploadImgs.after">
	      		</span>
	      	</div>
	      </div>

				<!-- <div class="upload-item" v-for="(item,index) in uploadImgs" :key="index">
	        <div class="img-holder">
	          <x-icon @click="deleteImg(index)" class="delete-icon" type="ios-close-empty" size="18"></x-icon>
	          <img class="obj-cover" :src="item" />
	        </div>
      	</div> -->
			</div>
			<div class="content">
				<x-textarea :height="120" class="textarea" v-model="content" placeholder="写下你的使用体验吧~"></x-textarea>
			</div>
		</div>
		<div style="height: 15px;"></div>
		<div class="choose-goods panel">
			<div @click="showChooseGoods" class="choose-goods-title">选择使用过的产品</div>
			<div class="use-goods">
				<div class="goods-item" v-for="(item, index) in usedGoods">
					<div class="goods-img">
						<span class="img-holder">
							<img :src="item.img">
						</span>
					</div>
					<h4 class="goods-name ellipsis">{{ item.name }}</h4>
					<span @click="deleteGoods(index)" class="delete">删除</span>
				</div>
			</div>
		</div>
		<div style="height: 15px;"></div>
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
		<!-- <calendar :hide-on-blur=false title="" class="select-date" @on-change="onChange" v-model="time" popup-header-title="请选择日期"></calendar> -->
		</div>
		<div style="height: 15px;"></div>
		<div class="label-wrapper">
			<div class="label-item" v-for="(item, key) in tags">
				<h4>{{ key }}</h4>
				<checker @on-change="getSelTags" type="checkbox" v-model="selTags" selected-item-class="label-item-selected">
					<checker-item class="labels" :value="label.id" v-for="(label, index) in item" :key="index">
						<span>{{ label.name }}</span>
					</checker-item>
				</checker>
			</div>
		</div>
		<div class="isShow-index panel">
			<x-switch class="switch" title="首页展示" v-model="isShowIndex"></x-switch>
		</div>
		<div @click="submit" class="submit-btn">立即发布</div>
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
		<!-- 选择产品 -->
		<choose-goods ref="chooseGoods" @sel-goods="getSelGoods"></choose-goods>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { XSwitch, XTextarea, Popup, InlineCalendar, Checker, CheckerItem } from 'vux'
import http from '@/utils/http'
import ChooseGoods from '@/components/ChooseGoods'

export default {
	components: {
		XTextarea,
		Popup,
		InlineCalendar,
		Checker,
		CheckerItem,
		ChooseGoods,
		XSwitch
	},
	computed: {
		...mapGetters(['userInfo']),
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
		// 计算天数
		days () {
			if (this.time.length == 2) {
				let start = new Date(this.time[0]).getTime()
				let end = new Date(this.time[1]).getTime()
				let days = (end - start) / 1000 / 60 / 60 / 24
				return parseInt(days) + 1
			}
			return '-'
		}
	},
	data () {
		return {
			isShowIndex: true,
			isShowCalendar: false,
			buildSlotFn: () => '',
			content: '',
			uploadImgs: {
				before: null,
				after: null
			}, // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      serverId: {
      	before: null,
				after: null
      },
      selTags: [],
      tags: {},
      time: [],
      usedGoods: [],
      maxLen: 1,
      id: null
		}
	},
	methods: {
		popupCancel () {
			if (this.time.length == 1) return
			this.isShowCalendar = false
		},
		getSelTags (val) {
			val.forEach (item => {
				for (let i in this.tags) {
					for (let j = 0; j < this.tags[i].length; j ++) {
						if (this.tags[i][j].id == item) {
							this.tags[i][j].selected = 1
						}else {
							this.tags[i][j].selected = 0
						}
					}
				}
			})
			console.log(this.tags)
		},
		// 获取用户已发布的案例数据
		getUserCase () {
			let userSn = this.userInfo.userSn
			http.get('/u/' + userSn, {}, false, res => {
				if (res.status == 1) {
					this.id = res.data.id
					this.uploadImgs.before = res.data.imgs[0].original
					this.uploadImgs.after = res.data.imgs[1].original
					this.content = res.data.content
					this.tags = res.data.tags
					this.isShowIndex = res.data.status ? true : false
					res.data.selectedTags.forEach(item => {
						this.selTags.push(item.id)
					})
					res.data.usedGoods.forEach(item => {
						this.usedGoods.push({
							id: item.goodsId,
							name: item.goodsName,
							img: item.img
						})
					})
					let start = res.data.start.replace(/\//g, '-')
					let end = res.data.end.replace(/\//g, '-')
					this.time.push(start)
					this.time.push(end)
				}
			})
		},
		back () {
			this.$router.go(-1)
		},
		// 提交案例发布
		submit () {
			let hasQuestion = false;
			this.tags['问题'].forEach (item => {
				if (item.selected) {
					hasQuestion = true
				}
			})

			if (!this.uploadImgs.before) {
				this.$vux.toast.show({
					type: 'warn',
					text: '请上传使用前图片!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			if (!this.uploadImgs.after) {
				this.$vux.toast.show({
					type: 'warn',
					text: '请上传使用后图片!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			if (this.content == '') {
				this.$vux.toast.show({
					type: 'warn',
					text: '输入的内容不能为空!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			if (this.time.length == 0) {
				this.$vux.toast.show({
					type: 'warn',
					text: '请选择使用日期!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			if (!hasQuestion) {
				this.$vux.toast.show({
					type: 'warn',
					text: '请选择修复的问题!',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			let usedGoods = [];
			let type = this.$route.query.type
			this.usedGoods.forEach(item => {
				usedGoods.push(item.id)
			})
			let start = this.time[0].replace(/-/g, '')
			let end = this.time[1].replace(/-/g, '')
			let serverIds = []
			// 循环上传的图片到数组
			for (let i in this.serverId) {
				serverIds.push(this.serverId[i])
			}

			let params = {
				content: this.content,
				serverIds: JSON.stringify(serverIds),
				tags: JSON.stringify(this.selTags),
				start,
				end,
				status: this.isShowIndex ? 1 : 0,
				usedGoods: JSON.stringify(usedGoods)
			}
			if (type == 'edit') {
				if (this.serverId.before && !this.serverId.after) {
					params.serverIds = { first: this.serverId.before }
				}else if (this.serverId.after && !this.serverId.before) {
					params.serverIds = { second: this.serverId.after }
				}else {
					params.serverIds = { first: this.serverId.before, second: this.serverId.after }
				}
				params.serverIds = JSON.stringify(params.serverIds)
				params.id = this.id
			}
			let method = type == 'edit' ? '/show/update' : '/show/publish'
			http.post(method, params, false, res => {
				if (res.status == 1) {
					this.$router.push({ path: '/user/index' })
				}else {
					this.$vux.toast.show({
						type: 'warn',
						text: res.info,
						width: 'auto',
						position: 'middle'
					})
				}
			})
		},
		// 删除选择的商品
		deleteGoods (index) {
			this.$vux.confirm.show({
				title: '提示信息',
				content: '确定要删除吗？',
				onConfirm: () => {
					this.usedGoods.splice(index, 1)
				}
			})
		},
		showChooseGoods () {
			this.$refs.chooseGoods.isShowPage()
		},
		// 获取使用的商品
		getSelGoods (data) {
			this.usedGoods = data
		},
		showCalendar () {
			this.isShowCalendar = true
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
		//上传图片
		uploadImg (type) {
			let that = this

			that.$wechat.chooseImage({
			  count: that.maxLen,
			  sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			  success: (res) => {
			    let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			    that.uploadImgs[type] = localIds

			    // 上传图片到微信服务器
			    that.$wechat.uploadImage({
		        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
		        isShowProgressTips: 1, // 默认为1，显示进度提示
		        success: result => {
		          that.serverId[type] = result.serverId
		        }
		      })

			  }
			})

		},
		// 删除
		deleteImg (type) {
			let that = this
			this.$vux.confirm.show({
			  title: '提示信息',
			  content: '确定要删除吗？',
			  onConfirm () {
			    that.uploadImgs[type] = null
			    that.serverId[type] = null
			  }
			})
		},
		getShowTags () {
			http.get('/show/tags', {}, false, res => {
				if (res.status == 1) {
					this.tags = res.data.tags
				}
			})
		}
	},
	mounted () {
		this.getShowTags()
		if (this.$route.query.type == 'edit' && this.userInfo) {
			this.getUserCase()
		}
	},
	watch: {
		userInfo () {
			if (this.$route.query.type == 'edit') {
				this.getUserCase()
			}
		},
		time (val) {
			if (val.length < 2) {
				this.buildSlotFn = (line, index, date) => {
					if (val[0] == date.formatedDate) {
						if (date.weekDay == 0) {
							return '<div style="left: 0; margin: 0" class="date-tips">请选择使用后日期</div>'
						}else if (date.weekDay == 6) {
							return '<div style="right: 0; left: auto; margin: 0" class="date-tips">请选择使用后日期</div>'
						}else {
							return '<div class="date-tips">请选择使用后日期</div>'
						}
					}else {
						return ''
					}
				}
			}else {
				this.buildSlotFn = (line, index, date) => {
					if (val[0] == date.formatedDate) {
						return ''
					}
				}
			}
		}
	}
}
</script>

<style scoped>
.user {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 0;
}
.avatar {
	width: 35px;
	height: 35px;
	border-radius: 100%;
	overflow: hidden;
}
.cancel {
	background: #fff;
	line-height: 14px;
	padding: 8px 15px;
	border-radius: 30px;
	color: #38393C;
	box-shadow: 0 14px 14px -8px rgba(56,57,60,0.15);
}
.panel {
	padding: 15px;
	background: #FFFFFF;
	box-shadow: 0 7px 10px -5px rgba(0,0,0,0.15);
	border-radius: 5px;
}
.upload-wrapper {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.upload-box {
	flex: 1;
	background: #f1f1f1;
	text-align: center;
}
.upload-box .img {
	position: relative;
}
.upload-box .img-holder {
	border-radius: 5px;
	overflow: hidden;
	padding-bottom: 120%;
}
.upload-before {
	margin-right: 8px;
}
.upload-after {
	margin-left: 8px;
}
.upload-box .plus-icon {
	fill: #71ABFD;
	margin-top: 40%;
}
.upload-box p {
	font-size: 12px;
	color: #9B9B9B;
	line-height: 12px;
}

.upload-btn {
	flex: 0 0 auto;
	width: 32px;
	height: 32px;
	background: #E2E2E2;
	border-radius: 5px;
	line-height: 36px;
	text-align: center;
	margin-right: 20px;
}
.delete-icon {
	position: absolute;
	right: -6px;
	top: -6px;
	width: 18px;
	height: 18px;
	background: #FF7584;
	border-radius: 100%;
	fill: #fff;
	z-index: 1;
}
.textarea {
	padding: 0;
}
.choose-goods-title {
	position: relative;
	font-size: 14px;
	color: #71ABFD;
}
.choose-goods-title:after {
	content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px
}
.time {
	position: relative;
	display: flex;
	align-items: center;
}
.time .year {
	font-size: 12px;
	color: #4F5054;
	line-height: 12px;
}
.time .month-day {
	font-size: 20px;
	color: #38393C;
	line-height: 20px;
	font-weight: 700;
}
.time .after span,
.time .before span {
	display: inline-block;
	background: #F6F7F8;
	font-size: 10px;
	line-height: 10px;
	padding: 6px 10px;
	color: #4F5054;
	margin-top: 5px;
}
.total-days {
	flex: 1;
	position: relative;
	text-align: center;
	margin: 0 8px;
}
.total-days:after {
	content: '';
	display: block;
	border-top: 1px solid #ccc;
	position: absolute;
	top: 50%;
	width: 100%;
}
.total-days .container {
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
}
.total-days span {
	font-size: 16px;
	color: #1A1B00;
}
.label-item {
	padding-top: 15px;
}
.label-item h4 {
	font-size: 14px;
	color: #38393C;
	line-height: 14px;
	padding-bottom: 10px;
}
.label-item .labels span {
	display: inline-block;
	font-size: 14px;
	line-height: 14px;
	color: #FFFFFF;
	background: #ccc;
	border-radius: 30px;
	margin-right: 5px;
	padding: 6px 10px;
	margin-bottom: 5px;
}
.submit-btn {
	margin: 30px 0 50px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.popup-header {
	position: relative;
	padding: 8px 15px;
}
.popup-header h4 {
	font-size: 14px;
	color: #38393C;
	text-align: center;
	font-size: 16px;
}
.popup-cancel {
	position: absolute;
	left: 15px;
	font-size: 12px;
	color: #04BE02;
	line-height: 25px;
}

.label-item .label-item-selected span {
	background: #71ABFD;
	color: #fff;
}
.goods-item {
	margin-top: 10px;
	display: flex;
	padding: 5px 0;
	align-items: center;
}
.goods-img {
	flex: 0 0 auto;
	width: 30px;
	height: 30px;
	margin-right: 10px;
	box-shadow: 0 2px 2px 2px rgba(242,251,255,1);
}
.goods-name {
	flex: 1;
	overflow: hidden;
	padding-right: 10px;
	font-size: 14px;
	color: #38393C;
}
.goods-item .delete {
	color: #FF7584;
}
.isShow-index {
	padding: 10px 15px;
	margin-top: 15px;
	font-size: 14px;
	color: #38393C;
}
.switch {
	padding: 0;
}
</style>
