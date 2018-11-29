<template>
	<div v-if="qrcodeImg">
		<div class="tips">
			<h3>邀请卡</h3>
			<p>长按图片保存至相册</p>
		</div>
		<div class="qrcode-img">
			<img :src="qrcodeImg">
		</div>
	</div>
</template>

<script>
import http from '@/utils/http'

export default {
	data () {
		return {
			qrcodeImg: null
		}
	},
	mounted () {
		http.get('/distributor/qrcode', {}, false, res => {
			if (res.status == 1) {
				this.qrcodeImg = res.data.qrCode
			}
		})
	}
}	
</script>

<style scoped>
.tips {
	text-align: center;
	padding: 20px 0 15px 0;
}	
.tips h3 {
	font-size: 24px;
	color: #000000;
	font-weight: 700;
	line-height: 24px;
}
.tips p {
	font-size: 14px;
	color: #4A4A4A;
	padding-top: 8px;
}
.qrcode-img {
	padding: 0 20px 20px 20px;
}
</style>