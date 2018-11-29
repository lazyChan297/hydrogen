<template>
	<div class="choose-goods" v-if="isShow">
		<div class="header">
			<h2>选择产品</h2>
			<span @click="isShowPage" class="back">返回</span>
		</div>
		<!-- <div class="table-wrapper">
			<span class="table-item" @click="onTableSwith(0)" :class="{ active: nowIndex == 0 }">已买过的产品</span>
			<span class="table-item" @click="onTableSwith(1)" :class="{ active: nowIndex == 1 }">全部产品</span>
		</div> -->
		<div class="goods">
			<checker type="checkbox" v-model="selGoods" selected-item-class="goods-item-selected">
				<checker-item :value="item.id" class="goods-item" v-for="(item, index) in goods" :key="index">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" :src="item.img">
						</span>
					</div>
					<div class="goods-content">
						<h4 class="goods-name ellipsis">{{ item.name }}</h4>
						<p v-if="item.desc">{{ item.desc }}</p>
					</div>
					<div class="selected">
						<x-icon size="28" type="ios-checkmark-empty"></x-icon>
					</div>
				</checker-item>
			</checker>
		</div>
		<div class="submit-warpper">
			<div @click="submit" class="submit-btn">选好了</div>
		</div>
	</div>
</template>

<script>
import http from '@/utils/http'
import { Checker, CheckerItem } from 'vux'

export default {
	components: {
		Checker,
		CheckerItem
	},
	data () {
		return {
			goods: [],
			selGoods: [],
			isShow: false
		}
	},
	methods: {
		isShowPage () {
			this.isShow = !this.isShow
		},
		submit () {
			let selGoods = []
			this.selGoods.forEach(item => {
				let n = this.goods.find(n => n.id == item)
				selGoods.push({
					id: n.id,
					img: n.img,
					name: n.name
				})
			})
			this.$emit('sel-goods', selGoods)
			this.isShowPage()
		},
		getGoods (index) {
			http.get('/index', {}, false, res => {
				if (res.status == 1) {
					this.goods = res.data.goods

				}
			})
		}
	},
	mounted () {
		this.getGoods()
	}
}	
</script>

<style scoped>
.choose-goods {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #f5f5f5;
	z-index: 99;
	overflow: auto;
}
.header {
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 15px 30px 15px;
}	
.header h2 {
	font-size: 24px;
	color: #38393C;
	font-weight: 700;
}
.back {
	background: #fff;
	line-height: 14px;
	padding: 8px 15px;
	border-radius: 30px;
	color: #38393C;
	box-shadow: 0 14px 14px -8px rgba(56,57,60,0.15);
	border: 1px solid #C7C7C7;
}
.table-wrapper {
	display: flex;
	background: #fff;
	border-bottom: 1px solid #E2E2E2;
}
.table-item {
	flex: 1;
	position: relative;
	text-align: center;
	padding: 10px 0;
	font-size: 16px;
	color: #C7C7C7;
}
.table-item.active:after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	bottom: -1px;
	width: 100%;
	border-bottom: 3px solid #71ABFD;
}
.table-item.active {
	color: #38393C; 
}
.goods {
	padding: 0 15px;
	margin-bottom: 15px;
}
.goods-item {
	position: relative;
	display: flex;
	align-items: center;
	padding: 15px;
	background: #fff;
	border-radius: 5px;
	box-shadow: 0 3px 10px 0 rgba(0,0,0,0.10);
	margin-top: 15px;
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
	padding-right: 28px;
	overflow: hidden;
}
.goods-content .goods-name {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
}
.goods-content p {
	font-size: 12px;
	color: #4F5054;
	line-height: 17px;
}
.selected {
	position: absolute;
	right: 5px;
	bottom: 5px;
	width: 28px;
	height: 28px;
	border-radius: 5px;
	background: #DDEBFF; 
}
.selected svg {
	fill: #fff;
}
.submit-warpper {
	height: 45px;
}
.submit-btn {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	text-align: center;
	line-height: 45px;
}
.goods-item-selected:after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	border: 2px solid #71ABFD;
	border-radius: 5px;
}
.goods-item-selected .selected {
	background: #71ABFD;
}
</style>