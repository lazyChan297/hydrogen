<template>
	<div v-if="articleDetail" class="detail">
		<div class="detail-top">
		  <h2>{{ articleDetail.title }}</h2>
		  <div class="datetime">
		    <i class="iconfont">
		    	<svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shijian"></use>
          </svg>
		    </i>
		    <span>{{ articleDetail.publishedAt }}</span>
		  </div>
		</div>
		<div class="content" v-html="articleDetail.content"></div>
	</div>
</template>

<script>
import http from '@/utils/http'

export default {
	data () {
		return {
			articleDetail: null
		}
	},
	methods: {
		getDetail () {
			let params = {
				id: this.$route.query.id
			}
			http.get('/news/details', params, false, res => {
				if (res.status == 1) {
					this.articleDetail = res.data
				}
			})
		}
	},
	mounted () {
		this.getDetail()
	}
}	
</script>

<style scoped>
.detail {
	min-height: 100%;
	background: #fff;
}
.detail-top .datetime i .icon {
	width: 14px;
	height: 14px;
}
.detail-top .datetime i,
.detail-top .datetime span {
	display: inline-block;
	vertical-align: middle;
	color: #999;
	font-size: 14px;
}
.detail-top {
	padding: 15px 15px 5px 15px;
	border-bottom: 1px solid #f1f1f1;
}
.detail-top h2 {
	font-size: 20px;
	color: #333;
	line-height: normal;
	padding-bottom: 5px;
}
.content {
	padding: 15px 0 0 0;
}	
</style>