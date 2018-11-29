<template>
	<div v-if="express">
		<div class="express-info">
		  <div class="express-number">物流单号：{{ express.no }}</div>
		  <div class="express-company">快递公司：{{ express.company }}</div>
		</div>
		<div style="height: 10px;"></div>
		<div class="express-timeline">
			<div class="timeline">

				<div v-for="(item,index) in express.details" :key="index" class="timeline-item">
					<div class="timeline-item-color timeline-item-head">
		        <icon class="icon-success" type="success" size="20"></icon>
					</div>
					<div class="timeline-item-tail"></div>
					<div class="timeline-item-content">
						<div>{{ item.context }}</div>
						<div>{{ item.ftime }}</div>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
import { Timeline, TimelineItem, Icon } from 'vux'
import http from '@/utils/http'

export default {
	components: {
		Timeline,
		TimelineItem,
		Icon
	},
	data () {
		return {
			express: null
		}
	},
	methods: {
		getOrderExpress () {
			let url = ''
			if (this.$route.query.type == 'replenishment') {
				url = '/order/express'
			}else {
				url = '/supplier/express'
			}
			let no = this.$route.query.orderNo
			http.get(url, { no }, false, res => {
				if (res.status == 1) {
					this.express = res.data.express;
				}
			})
		}
	},
	mounted () {
		this.getOrderExpress()
	}
}	
</script>

<style scoped>
.express-info {
	background: #fff;
	padding: 12px 15px;
}
.express-info .express-number,
.express-info .express-company {
  font-size: 16px;
	color: #666;
}	
.express-timeline {
	background: #fff;
}

.timeline {
  padding: 15px;
  background: #fff;
}
.timeline-item {
  position: relative;
}
.timeline-item-color {
  background-color: #09BB07;
}
.timeline-item .weui-icon-success {
	display: none;
}
.timeline-item:first-child .weui-icon-success {
	display: block;
	font-size: 20px;
	line-height: 20px;
}
.timeline-item-head {
  position: absolute;
  content: '';
  z-index: 99;
  border-radius: 99px;
}
.timeline-item:first-child .timeline-item-head {
	width: 20px;
  height: 20px;
  left: -4px;
  top: 5px;
	background: #fff !important;
}
.timeline-item-head {
  width: 10px;
  height: 10px;
  left: 1px;
  top: 4px;
}
.timeline-item-tail {
  position: absolute;
  content: '';
  height: 100%;
  width: 2px;
  left: 5px;
  top: 5px;
  background-color: #09BB07;
}
.timeline-item:last-child .timeline-item-tail {
	display: none;
}
.timeline-item:last-child .timeline-item-content {
	padding-bottom: 0;
}
.timeline-item-content {
  padding: 0 0 1.5rem 1.8rem;
}
.timeline-item-content {
	color: #787878;
}
.timeline-item:first-child .timeline-item-content {
  color: #04be02;
}
.icon-success:before {
	margin: 0;
}
</style>