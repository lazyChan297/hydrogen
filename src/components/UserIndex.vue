<template>
	<div v-if="caseDeteil">
		<div class="header">
			<div class="user-info">
				<div class="avatar">
					<img :src="caseDeteil.avatar">
				</div>
				<h4>{{ caseDeteil.nickname }} 的氢量极品</h4>
			</div>
			<span @click="toPublishingCase" v-if="!userSn && caseDeteil.imgs || userSn == userInfo.userSn" class="handle-btn">编辑</span>
			<span @click="toPublishingCase" v-if="!userSn && !caseDeteil.imgs" class="handle-btn">发布</span>
		</div>
		<div class="container" v-if="caseDeteil.imgs.length">
			<div class="case-imgs">
				<div class="after" @click="previewImage(caseDeteil.imgs[0].original, caseDeteil.imgs)">
					<span class="img-holder">
						<img class="obj-cover" :src="caseDeteil.imgs[0].thumb">
					</span>
					<p class="days">第1天 {{ caseDeteil.start }}</p>
				</div>
				<div class="before" @click="previewImage(caseDeteil.imgs[1].original, caseDeteil.imgs)">
					<span class="img-holder">
						<img class="obj-cover" :src="caseDeteil.imgs[1].thumb">
					</span>
					<p class="days">第{{ caseDeteil.days }}天 {{ caseDeteil.end }}</p>
				</div>
			</div>
			<div class="content">{{ caseDeteil.content }}</div>
			<div class="labels-warpper">
				<p>标签：</p>
				<div class="labels">
					<span v-for="(item, index) in caseDeteil.selectedTags" :key="index">{{ item.name }}</span>
				</div>
			</div>
		</div>
		<div style="height: 10px;"></div>
		<div class="goods" v-if="caseDeteil.usedGoods">
			<div class="part-title">使用的产品</div>
			<div class="goods-list">
				<router-link :to="{ path: '/goods/detail', query: { id: item.goodsId, userSn: caseDeteil.userSn } }" class="goods-item" v-for="(item, index) in caseDeteil.usedGoods" :key="index">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" :src="item.img">
						</span>
					</div>
					<div class="goods-content">
						<h4 class="goods-name ellipsis">{{ item.goodsName }}</h4>
						<p v-if="item.desc">{{ item.desc }}</p>
					</div>
					<div class="price">￥{{ item.goodsPrice }}</div>
				</router-link>
			</div>
			<div class="buy-btn" @click="toCheckout">
				<span>一键购买</span>
				<i>
					<svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiang"></use>
          </svg>
				</i>
			</div>
		</div>
		<div style="height: 10px;"></div>
		<!-- 推荐 -->
		<div class="recommend" v-if="caseDeteil.imgs">
			<div class="part-title">氢量极品推荐</div>
			<recommend-list :recommend="recommends" type="page"></recommend-list>
		</div>
		<div  v-if="!userSn && !caseDeteil.imgs" class="no-diary">
			<img src="./../assets/images/no_diary.png">
			<div class="click-publish">
				<a @click="toPublishingCase">点击这里</a> 发布你的第一条护肤日记吧！</div>
		</div>
		<footer-brand></footer-brand>
		<!-- 绑定手机号提示 -->
		<div class="bindphone-tips">
			<x-dialog v-model="showDialog">
				<div class="bindphone-bd">
					<img src="./../assets/images/Artwork.png">
					<h4>请绑定手机号</h4>
					<p>根据相关法规政策，发布内容需绑定手机，请前往“我的-设置-绑定手机号”页面进行绑定。</p>
					<router-link :to="{ path: '/bindPhone' }" class="bindphone-btn" tag="div">去绑定</router-link>
					<span @click="showDialog = false" class="cancel-bind">以后再说</span>
				</div>
			</x-dialog>
		</div>
		<footer-nav bottom-nav="我的" text-color="#999"></footer-nav>
	</div>
</template>

<script>
import FooterNav from '@/components/public/FooterNav'	
import RecommendList from '@/components/public/RecommendList'	
import { mapGetters, mapActions } from 'vuex'
import { XDialog } from 'vux'
import FooterBrand from '@/components/public/FooterBrand'
import http from '@/utils/http'
import { setStore } from '@/utils/mUtils'

export default {
	components: {
		FooterNav,
		FooterBrand,
		XDialog,
		RecommendList
	},
	computed: {
		...mapGetters(['userInfo']),
		// 计算使用天数
		useDays () {
			if (this.caseDeteil.start) {
				let now = new Date().getTime()
				let start = new Date(this.caseDeteil.start).getTime()
				let diff = now - start
				let days = Math.floor( diff / (1000 * 60 * 60 * 24)) + 1
				return days
			}		
		}
	},
	data () {
		return {
			showDialog: false,
			caseDeteil: null,
			recommends: [],
			userSn: null
		}
	},
	methods: {
		...mapActions(['getCartLen']),
		// 一键购买商品
    toCheckout () {
    	let goods = []
    	this.caseDeteil.usedGoods.forEach(item => {
    		goods.push({
    			goodsId: item.goodsId,
    			quantity: 1
    		})
    	})
    	let params = { goods, type: 1 }
      http.post('/cart', { cart: JSON.stringify(params) }, false, res => {
        if (res.status == 1) {
        	if (this.userSn) {
        		setStore('userSn', this.userSn)
        	}
          this.getCartLen()
          window.location.href = global.serverHost + '/newCart/pay/#/goods/payment/'
        }
      })
    },
		// 预览大图
		previewImage (current, urls) {
			let imgs = []
			urls.forEach(item => {
				imgs.push(item.original)
			})
			this.$wechat.previewImage({
				current: current, // 当前显示图片的http链接
    		urls: imgs // 需要预览的图片http链接列表
			})
		},
		toPublishingCase () {
			if (this.userInfo.mobile == '') {
				this.showDialog = true
				return
			}
			if (this.caseDeteil.imgs) {
				this.$router.push({ path: '/user/publishingCase', query: { type: 'edit' } })
			}else {
				this.$router.push({ path: '/user/publishingCase' })
			}
			
		},
		getCaseDeteil (userSn) {
			http.get('/u/' + userSn, {}, false, res => {
				if (res.status == 1) {
					if (res.data.nickname) {
						this.caseDeteil = res.data
						let userSn = this.userSn ? this.userSn : this.userInfo.userSn
						let question = [];
						this.caseDeteil.tags['问题'].forEach(n => {
							if (n.selected == 1) {
								question.push(n.name)
							}
						});

						// 设置微信分享
						let shareAppConfig = {
							title: res.data.nickname,
			        desc: `修复${ question.join('、') }第${ this.useDays }天`,
			        link: global.serverHost + '/#/user/index?type=share&userSn=' + userSn + '&sharer=' + this.userInfo.userSn,
			        imgUrl: res.data.avatar
						}
						let shareTimelineConfig = {
							title: `${ res.data.nickname }修复${ question.join('、') }第${ this.useDays }天`,
			        link: global.serverHost + '/#/user/index?type=share&userSn=' + userSn + '&sharer=' + this.userInfo.userSn,
			        imgUrl: res.data.avatar
						}
						this.$wechat.ready(() => {
	            this.$wechat.onMenuShareTimeline(shareTimelineConfig)
	            this.$wechat.onMenuShareAppMessage(shareAppConfig)
	          })
					}else {
						this.caseDeteil = {
							avatar: this.userInfo.avatarUrl,
							nickname: this.userInfo.nickName
						}
					}
				}
			})
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
		}
	},
	mounted () {
		this.userSn = this.$route.query.userSn
		if (this.userSn) {
			this.getCaseDeteil(this.userSn)
			// 记录访问
			this.userAddViewer(this.$route.query.sharer)
		} else {
			if (this.userInfo) {
				this.getCaseDeteil(this.userInfo.userSn)
			}
		}
		if (this.userSn && this.$route.query.type == 'share'){
			setStore('userSn', this.userSn)
		}
		http.get('/index', {}, false, res => {
			if (res.status == 1) {
				this.recommends = res.data.goods
			}
		})
	},
	watch: {
		userInfo () {
			if (!this.userSn) {
				this.getCaseDeteil(this.userInfo.userSn)
			}
		}
	}
}
</script>

<style scoped>
.header {
	position: relative;
	background: url('./../assets/images/user_index_bg.png') no-repeat;
	background-size: cover; 
	text-align: center;
	padding: 40px 0 23px 0;
}
.user-info {
	display: inline-block;
}	
.user-info .avatar {
	width: 60px;
	height: 60px;
	border-radius: 100%;
	overflow: hidden;
	margin: 0 auto;
	margin-bottom: 5px;
}
.user-info h4 {
	color: #fff;
	text-shadow: 0 2px 2px rgba(0,0,0,0.50);
}
.handle-btn {
	position: absolute;
	right: 15px;
	top: 10px;
	background: #fff;
	line-height: 14px;
	padding: 8px 15px;
	border-radius: 30px;
	color: #EE7D89;
	box-shadow: 0 14px 14px -8px rgba(255,44,153,0.40);
}
.container {
	padding: 15px;
	background: #fff;
}
.case-imgs {
	display: flex;
}
.case-imgs div {
	flex: 1;
	position: relative;
}
.case-imgs .after {
	padding-right: 5px;
}
.case-imgs .before {
	padding-left: 5px;
}
.case-imgs .img-holder {
	padding-bottom: 120%;
}
.case-imgs div .days {
	line-height: 14px;
	padding: 7px 0;
	background: #FDDA00;
	text-align: center;
}
.content {
	font-size: 14px;
	color: #38393C;
	line-height: 18px;
	padding: 15px 0;
}
.labels-warpper {
	display: flex;
}
.labels-warpper p {
	flex: 0 0 auto;
}
.labels {
	flex: 1;
}
.labels span {
	display: inline-block;
	line-height: 22px;
	border-radius: 20px;
	background: #E8F2FF;
	color: #3484FF;
	padding: 0 10px;
	font-size: 12px;
	margin-right: 5px;
	margin-bottom: 5px;
}
.goods {
	padding: 0 15px;
	background: #fff;
	overflow: hidden;
}
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
.goods-item {
	display: flex;
	align-items: center;
	padding: 10px 0;
}
.goods-item .goods-img {
	flex: 0 0 60px;
	width: 60px;
	height: 60px;
	margin-right: 10px;
	box-shadow: 0 14px 14px -8px rgba(242,251,255,1);
}
.goods-content {
	flex: 1;
	padding-right: 10px;
	overflow: hidden;
}
.goods-content .goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
	padding-bottom: 2px;
}
.goods-content p {
	font-size: 12px;
	color: #4F5054;
	line-height: 17px;
	height: 34px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-item .price {
	flex: 0 0 auto;
	font-size: 18px;
	color: #0083E6;
	font-weight: 700;
}
.recommend {
	padding: 0 15px;
}
.no-diary {
	text-align: center;
	padding-top: 15%;
}
.no-diary img {
 max-width: 200px;
}
.click-publish {
	font-size: 14px;
	color: #002024;
	padding-top: 15px;
}
.click-publish a {
	color: #3484FF;
}
.bindphone-bd h4 {
	font-size: 18px;
	color: #38393C;
	font-weight: 700;
	padding: 10px 0;
}
.bindphone-bd p {
	font-size: 14px;
	color: #4F5054;
	padding: 0 15px;
	text-align: left;
	line-height: 20px;
}
.bindphone-btn {
	margin: 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.cancel-bind {
	display: block;
	font-size: 14px;
	color: #9B9B9B;
	padding-bottom: 15px;
}
.buy-btn {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 15px 0 30px;
	padding: 0 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.buy-btn .icon {
	width: 25px;
	height: auto;
}
</style>