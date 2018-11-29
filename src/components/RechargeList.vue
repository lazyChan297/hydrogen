<template>
	<div>
		<div class="search-wrapper">
			<div class="search bottom-1px">
				<router-link class="toRecord" :to="{ path: '/recharge/record' }">
					充值记录
				</router-link>
				<x-input class="search-input" v-model="keyword" placeholder="请输入关键字...">
					<div slot="label" style="height: 20px; margin-right: 3px">
						<x-icon type="ios-search" size="20" fill="#999"></x-icon>
					</div>
				</x-input>
				<span @click="searchAgent" class="submit">搜索</span>
			</div>
		</div>	
		<div class="recharge-list">
			<router-link v-for="(item, i) in agentList" :to="{ path: '/recharge/Balance', query: { userSn: item.userSn, avatar: item.avatar, nickname: item.nickname} }" class="recharge-item" :key="i" tag="div">
				<div class="agent-info">
					<div class="avatar"><img :src="item.avatar"></div>
					<div class="content">
						<div class="name">{{ item.nickname }}</div>
					</div>
				</div>
				<span class="to-recharge" mini>充值</span>
			</router-link>
		</div>
		<!-- 无结果 -->
		<div class="noResult" v-if="isShowResult">
			<icon class="icon-warn" type="warn" is-msg></icon>
			<p>搜索无结果，请重新输入~</p>
		</div>	
	</div>
</template>

<script>
import { XInput, Icon, trim } from 'vux'
import http from '@/utils/http'

export default {
	components: {
		XInput,
		Icon
	},
	data () {
		return {
			keyword: '',
			agentList: [],
			isShowResult: false
		}
	},
	methods: {
		searchAgent () {
			if (!trim(this.keyword)) {
				this.agentList = []
				return
			}
			let params = {
				keyword: this.keyword
			}
			http.get('/agent/search', params, false, res => {
				if (res.status == 1) {
					this.agentList = res.data.agentList
					if (this.agentList.length > 0) {
						this.isShowResult = false
					}else {
						this.isShowResult = true
					}
				}else {
					this.$vux.toast.show({
						type: 'warn',
						text: res.info,
						width: 'auto',
						position: 'middle'
					})
				}
			})
		}
	},
	watch: {
		keyword (val) {
			this.searchAgent()
		}
	}	
}	
</script>

<style scoped>
.search-wrapper {
	height: 50px;
}
.search {
	position: fixed;
	top: 0;
	z-index: 99;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	background: #fff;
	padding: 10px 15px;
}
.search-input {
	flex: 1;
	background: #f5f5f5;
	padding: 0 10px;
	height: 30px;
	border-radius: 30px;
}	
.submit {
	flex: 0 0 auto;
	padding-left: 10px;
	color: #71ABFD;
	line-height: 30px;
	border-radius: 5px;
}
.recharge-item {
	display: flex;
	align-items: center;
	padding: 12px 15px;
	margin-bottom: 10px;
	background: #fff;
}
.agent-info {
	flex: 1;
	display: flex;
	align-items: center;
}
.agent-info .avatar {
	flex: 0 0 auto;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 8px;
}
.content {
	flex: 1;
	line-height: normal;
}
.content .district {
	color: #787878;
}
.to-recharge {
	background: #FDDA00;
	color: #fff;
	padding: 6px 15px;
	border-radius: 30px;
	font-size: 12px;
	line-height: 12px;
}
.noResult {
	padding-top: 30%;
	text-align: center;
}
.noResult .icon-warn {
	font-size: 62px;
	color: #D8D8D8;
}
.noResult p {
	font-size: 14px;
	color: #9B9B9B;
	padding-top: 8px;
}
.toRecord {
	color: #9B9B9B;
	margin-right: 8px;
}
.search-input:before {
	display: none;
}
</style>