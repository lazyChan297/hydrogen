<template>
	<div>
		<div class="header">
			<img src="./../assets/images/about_hd.jpg">
			<div class="intro">
				<p>氢链是一个固体负氢离子产品新零售平台，坚持以用户为中心的理念，为消费者提供即时的线上+线下服务</p>
			</div>			
		</div>
		<div class="contact part">
			<h3 class="title">联系方式</h3>
			<div class="links-wrapper">
				<a class="link-item" href="http://gw.caomeng.me">
					<span class="label">官方网站</span>
					<span class="value">gw.caomeng.me</span>
				</a>
				<a class="link-item" href="tel:18577191364">
					<span class="label">招商电话</span>
					<span class="value">18577191364</span>
				</a>
				<router-link class="link-item" :to="{ path: '/' }">
					<span class="label">公众号</span>
					<span class="value">caomengmall</span>
				</router-link>
			</div>
		</div>
		<div class="companion part">
			<h3 class="title">合作伙伴</h3>
			<div class="companion-wrapper">
				<div class="company-item">
					<img src="./../assets/images/Group5@2x.png">
				</div>
				<div class="company-item">
					<img src="./../assets/images/Group6@2x.png">
				</div>
				<div class="company-item">
					<img src="./../assets/images/Group7@2x.png">
				</div>
			</div>
		</div>
		<router-link class="jump-index" :to="{ path: '/' }">进入氢链</router-link>
	</div>
</template>

<style scoped>
.intro {
	font-size: 14px;
	color: #fff;
	padding: 10% 30px;
	text-align: justify;
	text-align: center;
	background-image: linear-gradient(-180deg, #3778e3 0%, #2558C0 100%);
}	
.part {
	padding: 0 15px;
	margin-top: 20px;
}
.part .title {
	font-size: 20px;
	color: #4A4A4A;
	font-weight: 700;
	padding-bottom: 12px;
	line-height: 20px;
}
.link-item {
	position: relative;
	display: flex;
	justify-content: space-between;
	line-height: 22px;
	padding: 10px 0;
}
.link-item .label {
	color: #38393C;
}
.link-item .value {
	padding-right: 12px;
	font-size: 12px;
	color: #9B9B9B;
}
.link-item:after {
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
  right: 2px;
}
.companion {
	padding-bottom: 20px;
}
.companion-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.company-item {
	width: 31%;
	background: #fff;
	box-shadow: 0 5px 10px 0 rgba(0,0,0,0.08);
}
.jump-index {
	display: block;
	margin: 5px 15px 30px 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
</style>