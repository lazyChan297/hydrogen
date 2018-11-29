<template>
	<div>
		<div class="header">

			<div class="search">
				<search
      @on-change="getResult"
      v-model="keyword"
      auto-scroll-to-top
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      	<div class="select" slot="left">
      		<div @click="showSelects" class="sel-value">
      			{{ statusText }}
      			<x-icon class="arrow-down" type="ios-arrow-down" size="16"></x-icon>
      		</div>
      		<div v-if="isShowSelects" class="selector">
      			<span @click="selStatus(0)">待处理</span>
      			<span @click="selStatus(1)">已处理</span>
      			<span @click="selStatus(2)">已拒绝</span>
      		</div>
      	</div>
      </search>
			</div>
		</div>
		<div style="height: 10px;"></div>
		<div class="apply-list"
		v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">

			<router-link v-for="(item,index) in applierList" :key="index" :to="{ path: 'applyInfo', query: { id: item.id } }" tag="div" class="apply-item agentor">
				<div v-if="item.type == 1" class="type agentor">代理</div>
				<div v-else-if="item.type == 2" class="type distributor">分销</div>
				<div class="content">
					<div class="content-top">
						<h4>{{ item.nickname }}</h4>
						<p class="date">{{ item.appliedDate }}</p>
					</div>
					<div class="content-btm">
						<div class="tips">申请成为{{ item.type == 1?'代理商':'分销员' }}</div>
						<span v-if="item.status == 0" class="status">待处理</span>
						<span v-else-if="item.status == 1" class="status gray">已处理</span>
						<span v-else-if="item.status == 2" class="status gray">已拒绝</span>
					</div>
				</div>
			</router-link>

		</div>
		<!-- 无数据 -->
    <no-result v-if="applierList.length == 0" text="暂无更多数据~" :height="{ height: 'calc(100% - 160px)' }"></no-result>
    <div class="loading-wrapper" style="height: 42px; overflow: hidden;">
      <div v-show="loading && applierList.length > 0" class="loading-more">
        <inline-loading></inline-loading><span class="loading-text">加载中...</span>
      </div>
      <load-more v-if="nomore && applierList.length > 0" :show-loading="false" tip="暂无更多数据" background-color="#ffdfe0"></load-more>
    </div>
	</div>
</template>

<script>
import { Search, LoadMore, InlineLoading } from 'vux'
import http from '@/utils/http'
import NoResult from '@/components/public/NoResult'

export default {
	components: {
		Search,
		LoadMore,
		InlineLoading,
		NoResult
	},
	data () {
		return {
			keyword: '',
			isShowSelects: false,
			status: 0,
			page: 1,
			number: 10,
			loading: true,
			nomore: false,
			applierList: []
		}
	},
	computed: {
		statusText () {
			if (this.status == 0) return '待处理'
			return '已处理'	
		}
	},
	methods: {
		// 上拉加载更多
    loadMore () {
      if (!this.nomore) {     
        this.loading = true
        setTimeout(() => {
          this.getApplierList()
        }, 500)
      } 
		},
		getResult (val) {
			http.get('/applier/search', { keyword: val }, false, res => {
				this.applierList = res.data.applicationList
			})
		},
		onCancel () {
			this.page = 1
			this.applierList = []
			this.getApplierList()
		},
		getApplierList () {
			let params = {
				page: this.page,
				number: this.number,
				status: this.status
			}
			http.get('/applier/list', params, false, res => {
				if (res.status == 1 && res.data.applicationList.length > 0) {
					this.applierList = this.applierList.concat(res.data.applicationList)
					this.page ++
					this.loading = false
					if (res.data.applicationList.length < this.number) {
						this.nomore = true
					}else {
						this.nomore = false
					}
				}else {
					this.loading = false
          this.nomore = true
          return
				}
			})
		},
		showSelects () {
			this.isShowSelects = !this.isShowSelects
		},
		selStatus (index) {
			this.status = index
			this.isShowSelects = false
			this.page = 1
			this.applierList = []
			this.getApplierList()
		},
		onSubmit () {

		}
	},
	mounted () {
		this.getApplierList()
	}
}	 
</script>

<style scoped>
.header {
	height: 44px;
}
.search {
	position: fixed;
	left: 0;
	right: 0;
	z-index: 99;
}
.apply-list {
	background: #fff;
}	
.apply-item {
	position: relative;
	display: flex;
	align-items: center;
	padding: 15px;
}
.apply-item:after {
	content: '';
	display: block;
	position: absolute;
	left: 61px;
	right: 0;
	bottom: 0;
	border-bottom: 1px solid #e2e2e2;
}
.type {
	flex: 0 0 auto;
	width: 36px;
	height: 36px;
	border-radius: 100%;
	font-size: 14px;
	color: #fff;
	line-height: 36px;
	text-align: center;
	margin-right: 10px;
}
.agentor .type {
	background: #71ABFD;
}
.content {
	flex: 1;
}
.content-top,
.content-btm {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.content-top h4 {
	font-size: 14px;
	color: #38393C;
	padding-top: 2px;
}
.content-top .date,
.content-btm .tips {
	font-size: 12px;
	color: #9B9B9B;
}
.status {
	font-size: 12px;
	color: #FF7584;
}
.select {
	position: relative;
	flex: 0 0 auto;
}
.select .sel-value {
	position: relative;
	font-size: 12px;
	color: #9B9B9B;
	line-height: 28px;
	margin-right: 10px;
}
.selector {
	position: absolute;
	left: 0;
	right: 0;
	top: 28px;
	background: #fff;
	z-index: 5;
	border-radius: 3px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
} 
.selector span {
	display: block;
	text-align: center;
	line-height: 30px;
	font-size: 12px;
	color: #38393C;
	border-bottom: 1px solid #f5f5f5;
}
.selector span:last-child {
	border-bottom: 0;
}
.arrow-down {
	position: relative;
	margin-top: -2px;
	fill: #9B9B9B;
	display: inline-block;
	vertical-align: middle;
}
.gray {
	color: #999;
}
.agentor .distributor {
	background: #FDDA00; 
}
</style>