<template lang="html">
  <div class="editAgentInfo-wrapper">
    <div>
      <div class="input-item">
        <span class="label">姓名</span>
        <span class="value">{{ details.name }}</span>
      </div>
      <router-link to="/inviteList" tag="div" class="input-item">
        <span class="label">邀请人</span>
        <span class="value">
          <img src="../assets/images/customer.png" alt="" width="30" height="30">
          <span class="choose">请选择邀请人</span>
        </span>
      </router-link>
      <div class="input-item">
        <span class="label">代理级别</span>
        <span class="value" @click="showPopupPicker = true">{{ details.agentlevel }}</span>
      </div>
      <div class="input-item">
        <span class="label">代理区域</span>
        <span class="value" @click="showAddress = true">{{ details.agentDistrict }}</span>
      </div>
    </div>
    <div class="submit-btn">保存</div>
    <x-address style="display: none;"
               title="选择地区"
               v-model="district"
               raw-value
               :list="addressData"
               :show.sync="showAddress"
               @on-show="addressOpen"
               @on-hide="addressHide"
               @on-shadow-change="addrChange"
               ></x-address>
    <popup-picker @on-change="filterAddr" v-model="selRegion" v-show="showPopupPicker" :show-cell="false" :show.sync="showPopupPicker" :data="agentRegion"></popup-picker>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  PopupPicker,
  XAddress } from 'vux'
import {mapGetters} from 'vuex'
import http from '@/utils/http'
var addrArray = []
export default {
  data() {
    return {
      details: null,
      showAddress: false,
      showPopupPicker: false,
      addressData: [],
      district: [],
      agentRegion: [],
      selRegion: [],
      canChooseAddr: false
    }
  },
  created() {
    this.details = this.agent
  },
  mounted() {
    this.getForApplication()
  },
  computed: {
    ...mapGetters([
      'agent'
    ])
  },
  methods: {
    // 获取代理级别与地区信息
		getForApplication () {
			http.get('/agent/forApplication', {}, false, res => {
        if (res.status == 1) {
					let arr = []
					res.data.levels.forEach(item => {
						arr.push(item.name)
					})
        	this.agentRegion.push(arr)
					// this.selRegion[0] = this.agentRegion[0][0]
					this.addressData = res.data.districts
					addrArray = res.data.districts
				}

			})
		},
    addrChange(k, v) {
      if (!this.canChooseAddr) {
        return
      }
      this.details.agentDistrict = v.join(' ')
    },
    filterAddr() {

    },
    addressOpen() {
      this.canChooseAddr = true
    },
    addressHide() {
      this.canChooseAddr = false
    }
  },
  components: {
    PopupPicker,
    XAddress
  }
}
</script>

<style lang="css" scoped>
.input-item {
	display: flex;
	justify-content: space-between;
	background: #fff;
	padding: 12px 15px;
  border-bottom: 1px solid #d9d9d9
}
.input-item:last-child{
  border:none;
}
.input-item:before {
	display: none;
}
.input-item .weui-cell__hd {
	width: 70px;
}
.input-item .value{
  color: #999999;
}
.cell-item {
	font-size: 14px;
	padding: 12px 15px;
}
.input-item .value .choose::after{
  content:'';
  background:url('../assets/images/customer.png') no-repeat center;
  background-size:100%;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: sub;
  margin-left: 10px;
}
.submit-btn{
  margin: 30px 15px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
</style>
