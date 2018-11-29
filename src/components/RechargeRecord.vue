<template>
	<div>
		<div class="header">
			<h2>充值记录</h2>
			<span @click="back" class="back">返回</span>
		</div>
		<div style="height: 10px"></div>
		<!-- 充值列表 -->
		<div class="recharge-list"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
			<div class="recharge-item" v-for="(item, i) in rechargeList" :key="i">
				<div class="user">
					<div class="avatar">
						<img :src="item.avatar">
					</div>
					<div class="info">
						<h4 class="nickname ellipsis">{{ item.nickname }}</h4>
						<p class="dtime">{{ item.rechargeDate }}</p>
					</div>				
				</div>
				<span class="amount">¥{{ item.amount }}</span>
			</div>
		</div>
		<!-- 无数据 -->
    <no-result v-if="rechargeList.length == 0" text="暂无更多数据~" :height="{ height: 'calc(100% - 150px)' }"></no-result>
    <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
      <div v-show="loading && rechargeList.length > 0" class="loading-more">
        <inline-loading></inline-loading><span class="loading-text">加载中...</span>
      </div>
      <load-more v-if="nomore && rechargeList.length > 0" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
    </div>  
	</div>
</template>

<script>
import { LoadMore, InlineLoading } from 'vux'
import { toDecimal } from '@/utils/mUtils'	
import http from '@/utils/http'
import NoResult from '@/components/public/NoResult'

export default {
	components: {
		LoadMore,
		InlineLoading,
		NoResult
	},
	data () {
		return {
			rechargeList: [],
			page: 1,
			number: 10,
			loading: true,
			nomore: false
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getRechargeList()
        }, 500)
      } 
    },
		getRechargeList () {
			let params = {
				page: this.page,
				number: this.number
			}
			http.get('/platform/rechargeList', params, false, res => {
				if (res.status == 1 && res.data.rechargeList.length > 0) {
					this.rechargeList = this.rechargeList.concat(res.data.rechargeList)
					this.page ++
					this.loading = false
          this.nomore = false
				}else {
					this.loading = false
          this.nomore = true
          return
				}
			})
		}
	},
	mounted () {
		this.getRechargeList()
	},
	filters: {
		toDecimal (x) {
			return toDecimal(x)
		}
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
.recharge-item {
	display: flex;
	background: #fff;
	align-items: center;
	padding: 15px;
}
.user {
	flex: 1;
	display: flex;
	align-items: center;
	overflow: hidden;
}
.user .avatar {
	width: 50px;
	height: 50px;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 8px;
	flex: 0 0 50px;
}
.user .info {
	flex: 1;
	overflow: hidden;
}
.user .nickname {
	color: #38393C;
}
.dtime {
	color: #4F5054;
}
.amount {
	flex: 0 0 auto;
	font-weight: bold;
	font-size: 20px;
	color: #71ABFD;
}
</style>