<template>
	<div>
		<div class="header">
			<h2>代理商申请</h2>
			<span @click="back" class="back">返回</span>
		</div>
		<div style="height: 10px;"></div>
		<x-input ref="username" text-align="right" v-model="username" class="input-item" title="真实姓名" placeholder="姓名" :min="2" :max="5" required></x-input>

		<div class="input-item" @click="showPopupPicker = true">
			<span class="label">申请级别</span>
			<span v-if="selRegion[0]" class="value">{{ selRegion[0] }}</span>
			<span v-else class="no-value">级别</span>
		</div>

		<div class="input-item" @click="showAddress = true">
			<span class="label">选择地区</span>
			<span v-if="districtInfo" class="value">{{ districtInfo }}</span>
			<span v-else class="no-value">地区</span>
		</div>

		<x-address style="display: none;" title="选择地区" v-model="district" raw-value :list="addressData" :show.sync="showAddress"></x-address>
    </x-input>
		<div @click="submit" class="submit-btn">提交申请</div>
		<!-- 弹出 -->
		<popup-picker @on-change="filterAddr" v-model="selRegion" v-show="showPopupPicker" :show-cell="false" :show.sync="showPopupPicker" :data="agentRegion"></popup-picker>
	</div>
</template>

<script>
import { 
	Group, 
	Cell, 
	XInput, 
	XButton, 
	trim,
	PopupPicker,
	XAddress, 
	ChinaAddressV4Data, 
	Value2nameFilter as value2name 
} from 'vux'
import http from '@/utils/http'
var addrArray = []

export default {
	components: {
		Group,
		XInput,
		XAddress,
		XButton,
		PopupPicker
	},
	data () {
		return {
			username: '',
			district: [], 
			addressData: [],
			showAddress: false,
			showPopupPicker: false,
			agentRegion: [],
			selRegion: [],
		}
	},
	computed: {
		districtInfo: {
			get () {
				return this.areaDetail(this.district)
			},
			set () {
				return ''
			}
		}
	},
	methods: {
		filterAddr (v) {
			this.district = []
			let addressData = []
			if (v[0] === '省级') {
				addrArray.forEach(item => {
					if (item.parent == 0) {
						addressData.push(item)
					}
				})
				this.addressData = addressData
			}else if (v[0] === '市级') {
				addrArray.forEach((item) => {
					if (item.parent != 2) {
						addressData.push(item)
					}
				})
				this.addressData = addressData
			}else {
				this.addressData = addrArray
			}
		},
		// 获取代理级别与地区信息
		getForApplication () {
			http.get('/agent/forApplication', {}, false, res => {
				if (res.status == 1) {
					let arr = []
					res.data.levels.forEach(item => {
						arr.push(item.name)
					})
					this.agentRegion.push(arr)
					this.selRegion[0] = this.agentRegion[0][0]
					this.addressData = res.data.districts
					addrArray = res.data.districts
				}
			})
		},
		back () {
			this.$router.go(-1)
		},
		// 验证是否为11位有效手机号
    isPoneAvailable (str) {
      var reg = /^1[34578][0-9]{9}$/
      if (!reg.test(str)) {
        return false
      } else {
        return true
      }
    },
		areaDetail (value) {
      this.addressArr = (value2name(value, this.addressData)).split(' ')
    	return value2name(value, this.addressData)
    },
    submit () {
    	let isUserName = this.$refs.username.valid
    	if (this.username == '') {
				this.$vux.toast.show({
					text: '请输入您的真实姓名!',
					type: 'wran', 
					width: 'auto',
					position: 'middle'
				})
				return
			}else if (this.selRegion.length == 0) {
				this.$vux.toast.show({
					text: '请选择申请级别!',
					type: 'wran', 
					width: 'auto',
					position: 'middle'
				})
				return
			}else if (this.district.length == 0) {
				this.$vux.toast.show({
					text: '请选择代理地区!',
					type: 'wran', 
					width: 'auto',
					position: 'middle'
				});
				return
			}
			let params = {
				name: this.username,
				district: this.district[this.district.length - 1]
			}
			http.post('/agent/apply', params, false, res => {
				if (res.status == 1) {
					this.$router.push({ path: '/agent/status' })
				}else {
					this.$vux.toast.show({
						text: res.info,
						type: 'wran', 
						width: 'auto',
						position: 'middle'
					})
				}
			})
    }
	},
	mounted () {
		this.getForApplication()
	}
}	
</script>

<style scoped>
.header {
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 15px 30px 15px;
	border-bottom: 1px solid #e2e2e2;
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
.input-item {
	display: flex;
	justify-content: space-between;
	background: #fff;
	margin-bottom: 10px;
	padding: 12px 15px;
}	
.input-item:before {
	display: none;
}
.input-item .weui-cell__hd {
	width: 70px;
}
.submit-btn {
	margin: 30px 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.label {
	flex: 0 0 auto;
	margin-right: 10px;
}
.no-value {
	color: #ccc;
}
</style>