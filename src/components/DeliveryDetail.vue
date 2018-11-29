<template>
	<div v-if="orderDetail">
		<div class="order-wrapper">
			<div class="status">
				<span>状态</span>
				<span class="color-pink">{{ orderDetail.status }}</span>
			</div>
			<div style="height: 10px; background: #f5f5f5;"></div>
			<div class="goods">
				<div class="goods-item" v-for="(goods, i) in orderDetail.goods" :key="i">
					<div class="goods-img">
						<span class="img-holder">
							<img class="obj-cover" :src="goods.img">
						</span>
					</div>
					<div class="goods-content">
						<h4 class="goods-name">{{ goods.name }}</h4>
					</div>
					<span class="quantity">X{{ goods.quantity }}</span>
				</div>
			</div>
			<div class="order-total">
				<span>实付款</span>
				<span class="color-pink">￥{{ orderDetail.amount }}</span>
			</div>

			<div class="address detail-part">
			  <span class="iconfont">
	        <svg class="icon" aria-hidden="true">
	          <use xlink:href="#icon-dizhi"></use>
	        </svg>
	      </span>
			  <div class="part-default">
			    <div class="arrive text-large">{{ orderDetail.reciever }}，{{ orderDetail.mobile }}</div>
			    <div class="address-detail">{{ orderDetail.address }}</div>
			  </div>
			</div>
		</div>
		<div style="height: 10px"></div>
		<!-- 发货方式 -->
		<div class="delivery-type">
			<h4>发货方式</h4>
			<div class="selector">
				<span class="select-item" @click="switchNowIndex(0)">
					<icon v-if="nowIndex == 0" class="select-icon color-pink" type="success"></icon>
					<icon v-else class="select-icon" type="circle"></icon>
					快递寄出
				</span>
				<span class="select-item" @click="switchNowIndex(1)">
					<icon v-if="nowIndex == 1" class="select-icon color-pink" type="success"></icon>
					<icon v-else class="select-icon" type="circle"></icon>
					送货上门
				</span>
			</div>
		</div>
		<div v-if="nowIndex == 0" style="height: 10px"></div>
		<!-- 录入运单号 -->
		<div @click="showPopupPicker = true" v-if="nowIndex == 0" class="select-express">
			<h4>快递公司</h4>
			<span v-if="!companyText">请选择</span>
			<span v-else>{{ companyText }}</span>
		</div>
		<div v-if="nowIndex == 0" class="expressNo">
			<input type="text" v-model="expressNo" placeholder="请输入物流单号">
		</div>
		<div @click="submit" class="submit-btn">立即发货</div>
		<!-- 物流公司 -->
		<popup-picker ref="picker" @on-change="onChange" :data="exCompanys" :show-name="false" v-model="expressCompany" v-show="showPopupPicker" :show-cell="false" :show.sync="showPopupPicker"></popup-picker>
	</div>
</template>

<script>
import http from '@/utils/http'
import { Icon, PopupPicker } from 'vux'

export default {
	components: {
		Icon,
		PopupPicker
	},
	data () {
		return {
			orderDetail: null,
			nowIndex: 0,
			expressNo: '',
			expressCompany: [],
			companyText: null,
			exCompanys: [],
			showPopupPicker: false
		}
	},
	methods: {
		onChange (val) {
			this.companyText = this.$refs.picker.getNameValues()
		},
		switchNowIndex (index) {
			this.nowIndex = index
		},
		// 获取物流公司
		getExpressCompanys () {
			http.get('/supplier/expressCompany', {}, false, res => {
				if (res.status == 1) {
					let arr = []
					res.data.forEach((item,i) => {
						arr.push({ name: item.name, value: item.code })
					})
					this.exCompanys.push(arr)
					console.log(this.exCompanys)
				}
			})
		},
		submit () {
			let params = {
				orderNo: this.orderDetail.orderNo
			}
			if (this.nowIndex == 0) {
				if (this.expressCompany.length == 0 && this.nowIndex == 0) {
					this.$vux.toast.show({
						type: 'warn',
						text: '请选择快递公司!',
						width: 'auto',
						position: 'middle'
					})
					return
				}
				if (!this.expressNo) {
					this.$vux.toast.show({
						text: '请填写快递单号!',
						type: 'warn',
						width: 'auto',
						position: 'middle'
					})
					return
				}
				let company = null
				params.expressNo = this.expressNo
				params.company = this.expressCompany[0]
			}
			this.$vux.confirm.show({
				title: '提示信息',
				content: '确定要发货吗?',
				onConfirm: () => {
					http.post('/supplier/expressNo', params, false, res => {
						if (res.status == 1) {
							this.$router.go(-1)
						}else {
							this.$vux.toast.show({
								text: res.info,
								type: 'warn',
								width: 'auto',
								position: 'middle'
							})
						}
					})
				}
			})
		}
	},
	mounted () {
		this.getExpressCompanys()
    http.get('/supplier/details', { no: this.$route.query.orderNo }, false, res => {
      if (res.status == 1) {
        let orderDetail = res.data;
        switch (orderDetail.status) {
          case 0:
            orderDetail.status = '未支付'
            break
          case 1:
            orderDetail.status = '确认收货'
            break
          case 2:
            orderDetail.status = '已付款'
            break
          case 3:
            orderDetail.status = '已发货'
            break
        };
        this.orderDetail = orderDetail
      }
    })
	}
}
</script>

<style scoped>
.order-wrapper {
	position: relative;
	background: #fff;
	border-bottom: 1px solid #e2e2e2;
}

.status {
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
}
.color-pink {
	color: #FF7584;
}
.goods-item {
	display: flex;
	align-items: center;
	padding: 10px 15px;
	border-bottom: 1px solid #e2e2e2;
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
}
.goods-content .goods-name {
	color: #38393C;
	padding-bottom: 2px;
	line-height: 18px;
}
.goods-content p {
	font-size: 12px;
	color: #9B9B9B;
	line-height: 17px;
}
.order-total {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	border-bottom: 1px solid #e2e2e2;
}

.part-default {
  flex: 1;
  padding-left: 8px;
}
.part-default .text-large {
  font-size: 14px;
}
.address {
  position: relative;
  display: flex;
  align-items: center;
  padding:12px 15px;
}
.address-detail {
  color: #666;
}
.delivery-type {
	padding: 12px 15px;
	display: flex;
	background: #fff;
	align-items: center;
	color: #38393C;
}
.delivery-type h4 {
	margin-right: 20px;
}
.select-item {
	margin-right: 8px;
}
.select-icon {
	width: 20px;
	height: 20px;
	font-size: 20px;
}
.select-icon:before {
	margin: 0;
}
.select-express {
	position: relative;
	padding: 12px 15px;
	display: flex;
	background: #fff;
	align-items: center;
	justify-content: space-between;
	color: #38393C;
	border-bottom: 1px solid #e2e2e2;
}
.select-express:after {
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
  right: 17px
}
.select-express span {
	color: #9B9B9B;
	padding-right: 12px;
}
.expressNo {
	background: #fff;
	padding: 10px 15px;
}
.expressNo input {
	width: 100%;
	border: 1px solid #9B9B9B;
	outline: none;
	line-height: 32px;
	padding: 0 10px;
	border-radius: 3px;
}
.submit-btn {
	margin: 20px 10px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #EB3F52 0%, #FF7584 97%);
	box-shadow: 0 7px 10px -5px rgba(234,3,3,0.50);
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
</style>
