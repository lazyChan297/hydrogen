<template>
	<div style="position: relative; height: 100%">
		<div class="header">
			<h2>访客</h2>
			<span @click="back" class="back">返回</span>
		</div>
		<div style="height: 10px;"></div>
		<div class="customers"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
			<div v-for="(item,index) in customers" :key="index" class="customer-item">
				<div class="content">
					<div class="avatar"><img :src="item.avatar"></div>
					<div class="info">
						<h4 class="name">{{ item.nickname }}</h4>
						<p>访问时间：{{ item.visitedAt }}</p>
					</div>
				</div>
				
			</div>
		</div>
		<!-- 无数据 -->
    <no-result v-if="customers.length == 0" text="暂无更多数据~" :height="{ height: 'calc(100% - 160px)' }"></no-result>
    <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
      <div v-show="loading && customers.length > 0" class="loading-more">
        <inline-loading></inline-loading><span class="loading-text">加载中...</span>
      </div>
      <load-more v-if="nomore && customers.length > 0" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
    </div>
	</div>
</template>

<script>
import http from '@/utils/http'
import { LoadMore, InlineLoading } from 'vux'
import NoResult from '@/components/public/NoResult'

export default {
	components: {
		NoResult,
		LoadMore,
		InlineLoading
	},
	data () {
		return {
			page: 1,
			number: 10,
			loading: true,
			nomore: false,
			customers: []
		}
	},
	methods: {
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getQuasiCustormer()
        }, 500)
      } 
    },
		back () {
			this.$router.go(-1)
		},
		onTableSwith (index) {
			this.nowIndex = index
		},
		getQuasiCustormer () {
			let params = {
				page: this.page,
				number: this.number
			}
			http.get('/distributor/prospectiveCustomer', params, false, res => {
				if (res.status == 1 && res.data.length > 0) {
					this.customers = this.customers.concat(res.data)
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
		this.getQuasiCustormer()
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
.customers {
	background: #fff;
}
.customer-item {
	position: relative;
	padding: 25px 15px;
	display: flex;
	align-items: center;
}
.customer-item:after {
	content: '';
	display: block;
	position: absolute;
	bottom: 0;
	border-bottom: 1px solid #e2e2e2;
	left: 15px;
	right: 15px; 
}
.customer-item:last-child:after {
	display: none;
}
.content {
	flex: 1;
	display: flex;
	align-items: center;
}
.avatar {
	width: 50px;
	height: 50px;
	border-radius: 100%;
	margin-right: 10px;
	overflow: hidden;
}
.name {
	font-size: 14px;
	color: #38393C;
}
.customer-item p {
	font-size: 12px;
	color: #38393C;
	padding-top: 2px;
}
.status {
	color: #9B9B9B;
	padding-right: 12px;
}
</style>