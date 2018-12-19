<template>
	<div v-if="userInfo && userInfo.isFollower == 0 && isFollower">
		<div class="topfixed-wrapper">
			<div class="topfixed-bar" :class="{ fadeDown: fadeDown }" @click="showQrcode = true">
				<x-icon @click.stop="closeFixedBar" type="ios-close-outline" size="20" style="fill: #fff"></x-icon>
				<span class="follow-tips">关注氢链服务号</span>
				<div class="follow-btn">立即关注</div>
			</div>
		</div>
		<!-- 二维码 -->
		<x-dialog v-model="showQrcode" hide-on-blur :dialog-style="{ 'background-color': 'transparent' }">
			<div class="qrcode">
				<img src="./../../assets/images/qrcode.gif">
			</div>
			<x-icon @click="showQrcode = false" type="ios-close-outline" size="30" style="fill: #fff" ></x-icon>
		</x-dialog>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'	
import { XDialog } from 'vux'

export default {
	components: {
		XDialog
	},
	data () {
		return {
			isShowBar: true,
			showQrcode: false,
			fadeDown: false
		}
	},
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState(['isFollower'])
  },
  methods: {
  	closeFixedBar () {
  		this.$store.state.isFollower = false
  	}
  },
	mounted () {
		window.addEventListener('scroll', () => {
			let scroll = document.documentElement.scrollTop || document.body.scrollTop
			if (scroll > 45) {
				this.fadeDown = true
			}else {
				this.fadeDown = false
			}
		})
	}
}	
</script>

<style scoped>
.topfixed-wrapper {
	height: 45px;
}	
.topfixed-bar {
	height: 45px;
	background: #333;
	display: flex;
	align-items: center;
	color: #fff;
	padding: 3px 10px;
}
.follow-tips {
	line-height: 16px;
	flex: 1;
	padding: 0 8px;
}
.follow-btn {
	flex: 0 0 auto;
	background: #e02e24;
	color: #fff;
	padding: 4px 8px;
	border-radius: 3px;
}
.qrcode {
	margin-bottom: 15px;
	background: #fff;
	padding: 10px 5px;
	border-radius: 8px;
}
.fadeDown {
	position: fixed;
	z-index: 99;
	-webkit-animation: ani-fadeDown .5s ease forwards;
	-moz-animation: ani-fadeDown .5s ease forwards;
	-o-animation: ani-fadeDown .5s ease forwards;
	animation: ani-fadeDown .5s ease forwards
}

@-webkit-keyframes ani-fadeDown {
	0% {
		top: -45px
	}

	100% {
		top: 0
	}
}
</style>