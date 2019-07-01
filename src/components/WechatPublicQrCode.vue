<template>
	<div class="qrcode">
		<div class="qrcode-box">
			<img src="./../assets/images/qr_code.png">
			<h4>氢量极品公众号</h4>
			<p>长按图片识别二维码，关注氢量极品公众号</p>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	}
}	
</script>

<style scoped>
.qrcode {
	position: absolute;
	width: 100%;
	bottom: 0;
	top: 0;
	background: #2E69FF;
	overflow-y: auto; 
}	
.qrcode-box {
	width: 80%;
	margin: 25% auto;
	text-align: center;
	background: #fff;
	border-radius: 8px;
	padding: 15px;
}
.qrcode h4 {
	font-size: 14px;
	color: #4A4A4A;
	font-weight: 700;
	padding: 8px 0 3px 0;
}
.qrcode p {
	font-size: 12px;
	color: #9B9B9B;
}
</style>