<template>
	<div>
		<div class="header">
			<h2>明细</h2>
			<span @click="back" class="back">返回</span>
		</div>
		<div style="height: 10px"></div>
		<div class="detail-wrapper"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
			<div class="detail-item" v-for="(item, i) in rechargeList" :key="i">
				<div class="detail-left">
					<h4>{{ item.typeName }}</h4>
					<p class="dtime">{{ item.date }}</p>
				</div>
				<div class="amount">{{ item.typeName == '充值'?'+':'-' }}{{ item.amont }}</div>
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
import http from '@/utils/http'
import { LoadMore, InlineLoading } from 'vux'
import { toDecimal } from '@/utils/mUtils'	
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
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getRechargeList()
        }, 500)
      } 
    },
		back () {
			this.$router.go(-1)
		},
		getRechargeList () {
			let params = {
				page: this.page,
				number: this.number
			}
			http.get('/agent/rechargeList',params, false, res => {
				if (res.status == 1 && res.data.rechargeList.length > 0) {
					this.rechargeList = this.rechargeList.concat(res.data.rechargeList)
					this.page ++
					this.loading = false
					if (res.data.rechargeList < this.number) {
						this.nomore = false
					}else {
						this.nomore = true
					}
          
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
.detail-item {
	position: relative;
	display: flex;
	align-items: center;
	padding: 12px 15px;
	background: #fff;
}
.detail-item:after {
	content: '';
	display: block;
	position: absolute;
	bottom: 0;
	left: 15px;
	right: 15px;
	border-bottom: 1px solid #e2e2e2;
}
.detail-item:last-child:after {
	display: none;
}
.detail-left {
	flex: 1;
	font-size: 12px;
	color: #9B9B9B;
}
.detail-left h4 {
	font-size: 16px;
	color: #38393C;
}
.detail-left .dtime {

}
.detail-left
.amount {
	flex: 0 0 auto;
	font-size: 16px;
	color: #38393C;
}
</style>