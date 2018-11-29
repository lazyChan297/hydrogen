<template>
	<div>
		<div class="header">
			<span class="logo">
				<img src="./../assets/images/logo_white_bg.png">
			</span>
			<img src="./../assets/images/Artwork@2x.png">
			<div class="context">
				<span class="live">LIVE</span>
				<h3>代理商&amp;分销员数据报告</h3>
				<p>氢链自2018年6月1日上线以来，累积帮助1000余人改善了自己的肤质，收集真实客户案例50余例。</p>
				<div class="scroll-btn" @click="scrollToTop()">
					<span>查看报告</span>
					<i>
						<svg class="icon" aria-hidden="true">
	            <use xlink:href="#icon-jiang"></use>
	          </svg>
					</i>
				</div>
			</div>
		</div>
		<!-- 01 -->
		<div class="section" ref="sectionOne">
			<div class="section-hd">
				<div class="section-title"><h3>以下区域有客户代理商仍空缺</h3></div>	
				<div class="section-no">
					<b>01</b>
					<span>SECTION</span>
				</div>
			</div>
			<div class="section-bd">
				<div class="city-item" v-for="(item, index) in districts" :key="index">
					<div class="city-name">
						<h4>{{ item.city }}</h4>
						<div class="customer-total">
							<b>{{ item.customers }}</b>
							<span>客户数量</span>
						</div>
					</div>
					<div class="district-item" v-for="(c, i) in item.children" :key="i">
						<div class="district-info">
							<span>{{ c.area }}</span>
							<b>{{ c.customers }}</b>
							<p>客户数量</p>
						</div>
						<div class="district-right">
							<span>代理商空缺</span>
							<router-link :to="{ path: '/agentApply' }" tag="div" class="btn">申请代理</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 02 -->
		<div class="section">
			<div class="section-hd">
				<div class="section-title"><h3>代理商&amp;分销员分布状况</h3></div>	
				<div class="section-no">
					<b>02</b>
					<span>SECTION</span>
				</div>
			</div>
			<div class="section-bd">
				<div class="distribution-top">
					<span class="tag">省份</span>
					<span class="amount">数量(人)</span>
					<div>
						<span>
							<i>
								<svg class="icon color-orange" aria-hidden="true">
			            <use xlink:href="#icon-paixing"></use>
			          </svg>
							</i>
							代理商
						</span>
						<span>
							<i>
								<svg class="icon color-green" aria-hidden="true">
			            <use xlink:href="#icon-paixing"></use>
			          </svg>
							</i>
							分销员
						</span>
					</div>						
				</div>
				<div id="agentChart" :style="{width: '100%', height: distributionHeight}"></div>
			</div>
		</div>
		<!-- 03 -->
		<div class="section">
			<div class="section-hd">
				<div class="section-title"><h3>截至当前网站用户总量</h3></div>	
				<div class="section-no">
					<b>03</b>
					<span>SECTION</span>
				</div>
			</div>
			<div class="section-bd">
				<div class="user-total">
					<h4>用户总量</h4>
					<b>{{ totalUsers }}</b>
					<p>已有{{ totalDistributors }}人申请成为分销员</p>
					<div id="userTotalChart" :style="{width: '100%', height: '200px'}"></div>
				</div>
				<div class="cooperatives">
					<h4>合作伙伴</h4>
					<div class="company-brand">
						<span><img src="./../assets/images/Group5@2x.png"></span>
						<span><img src="./../assets/images/Group6@2x.png"></span>
						<span><img src="./../assets/images/Group7@2x.png"></span>
					</div>
					<p>兹有北京日新康百科贸有限公司为大中华区固体负氢元素总代理商，开发的每日氢元素、肤活素、氢素护肤、H301等品牌产品为了市场的全面开拓与运营，经协商达成共识与品牌经营渠道领先的普朗瑞斯(北京)健康科技有限公司、网络推广销售国内优秀企业的广西草盟网络科技有限公司达成战略合作协议，建立统一销售渠道"氢链。委托广西草盟网络科技有限公司作为运营主体对外统一授权及协调运作事宜。</p>
				</div>
			</div>
		</div>			
	</div>
</template>

<script>
import http from '@/utils/http'	
import { scrollTop } from '@/utils/mUtils'
import Echarts from 'echarts'
var _ = require('lodash');

export default {
	data () {
		return {
			distributionArr: [],
			monthData: [],
			districts: [],
			totalUsers: null,
			totalDistributors: null,
			distributionHeight: '300px'
		}
	},
	methods: {
		agentChartInit () {
			let that = this
			let agentChart = Echarts.init(document.getElementById('agentChart'))
			agentChart.setOption({
		    grid: {
		    	top: '5%',
	        left: 0,
	        right: '0',
	        bottom: '3%',
	        containLabel: true
    		},
		    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        max: () => {
	        	let max = _.maxBy(that.distributionArr, function(o) { return o.agentQuantity; })
	        	return max.agentQuantity
	        },
	        splitLine: { show: false },
	        axisLine: { show: false },
	        axisTick: { show: false },
	        axisLabel: { show: false }
		    },
		    yAxis: {
	        type: 'category',
	        data: that.distributionArr.map(item => {
	        	if (item.name === '黑龙江省') {
	        		item.name = '黑龙江'
	        	}else {
	        		item.name = item.name.substr(0, 2)
	        	}
	        	return item.name
	        }),
	        axisLine: { show: false },
	        axisTick: { show: false }
		    },
		    series: [
			    // {
		     //    type: 'bar',
		     //    itemStyle: {
		     //        normal: {
		     //          color: '#E8F3FE',
		     //          barBorderRadius: [0, 10, 10, 0]
		     //      }
		     //    },
		     //    silent: true,
		     //    barWidth: 15,
		     //    data: [60, 60, 60, 60, 60]
			    // }, 
			    {
		        type: 'bar',
		        itemStyle: {
	            normal: {
	              color: new Echarts.graphic.LinearGradient(0, 0, 1, 1,
                [
                  {offset: 0, color: '#F27032'},
                  {offset: 0.75, color: '#F79844'}
                ]),
                barBorderRadius: [0, 10, 10, 0]
		          }
		        },
		        barWidth: 15,
		        z: 10,
		        label: {
						  show: true,
						  color: '#fff',
						  position: 'insideLeft'
						},
		        data: that.distributionArr.map(item => {
		        	return item.agentQuantity
		        })
			    },
			    {
		        type: 'bar',
		        itemStyle: {
	            normal: {
	              color: new Echarts.graphic.LinearGradient(0, 0, 1, 1,
                [
                  {offset: 0, color: '#34A2FE'},
                  {offset: 0.75, color: '#11DF77'}
                ]),
                barBorderRadius: [0, 10, 10, 0]
		          }
		        },
		        barWidth: 15,
		        z: 10,
		        label: {
						  show: true,
						  color: '#fff',
						  position: 'insideLeft'
						},
		        data: that.distributionArr.map(item => {
		        	return item.distributorQuantity
		        })
			    }
		    ]
      });
		},
		userChartInit () {
			let that = this
			let userChart = Echarts.init(document.getElementById('userTotalChart'))
			userChart.setOption({
		    grid: {
		    	top: '5%',
	        left: 0,
	        right: '0',
	        bottom: '3%',
	        containLabel: true
    		},
		    xAxis: {
	        type: 'category',
	        data: that.monthData.map(item => {
	        	return item.month
	        }),
	        splitLine: { show: false },
	        axisLine: { show: false },
	        axisTick: { show: false }
		    },
		    yAxis: {
	        type: 'value',
	        max: () => {
	        	let max = _.maxBy(that.monthData, function(o) { return o.quantity; })
	        	return max.quantity
	        },
	        boundaryGap: [0, 0.01],
	        splitLine: { show: false },
	        axisLine: { show: false },
	        axisTick: { show: false },
	        axisLabel: { show: false }
		    },
		    series: [
			    {
			        type: 'bar',
			        itemStyle: {
		            normal: {
		              color: new Echarts.graphic.LinearGradient(1, 1, 0, 0,
                  [
                    {offset: 0, color: '#34A2FE'},
                    {offset: 0.75, color: '#11DF77'}
                  ]),
                  barBorderRadius: [100, 100, 0, 0]
			          }
			        },
			        z: 10,
			        data: that.monthData.map(item => {
			        	return item.quantity
			        })
			    }
		    ]
      });
		},		
		scrollToTop() {
			let sTop = document.documentElement.scrollTop || document.body.scrollTop;
			let offsetTop = this.$refs.sectionOne.offsetTop
	    scrollTop(window, sTop, offsetTop)
		},
		getAgentDistricts () {
			http.get('/agent/districts', {}, false, res => {
				if (res.status == 1) {
					this.districts = res.data
				}
			})
		}, 
		getUsersStatistics () {
			http.get('/users/statistics', {}, false, res => {
				if (res.status == 1) {
					this.totalUsers = res.data.totalUsers
					this.totalDistributors = res.data.totalDistributors
					this.monthData = res.data.monthData			
					this.userChartInit()
				}
			})
		}, 
		getAgentStatistics () {
			http.get('/agent/statistics', {}, false, res => {
				if (res.status == 1) {
					for (let i = res.data.length - 1; i >= 0; i --) {
						this.distributionArr.push(res.data[i])
					}
					this.distributionHeight = res.data.length * 50 + 'px'	
					if (this.distributionHeight) {
						setTimeout(() => {
							this.agentChartInit()
						},1000)
					}
				}
			})
		},
		onShares () {
			let shareAppConfig = {
				title: '代理商数据报告',
        desc: '',
        link: global.serverHost + '/#/dataReport',
        imgUrl: 'https://caomeng.me/logo.jpg'
			}
			this.$wechat.ready(() => {
        this.$wechat.onMenuShareTimeline(shareAppConfig)
        this.$wechat.onMenuShareAppMessage(shareAppConfig)
      })
		}
	},
	mounted () {
		this.getUsersStatistics()
		this.getAgentStatistics()
		this.getAgentDistricts()
		this.onShares()

	}
}	
</script>

<style scoped>
.header {
	position: relative;
	background-image: linear-gradient(-135deg, #68E0CF 0%, #209CFF 100%);
}	
.logo {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 80px;
	height: 80px;
	box-shadow: 5px 5px 20px 0 rgba(113,171,253,0.20);
}
.context {
	position: relative;
	width: 75%;
	padding-left: 15px;
	padding-bottom: 50px;
	color: #fff;
	margin-top: -35px;
}
.context span.live {
	font-size: 16px;
	padding: 5px 15px;
	border: 1px solid #fff;
	border-radius: 5px;
}
.context h3 {
	position: relative;
	font-size: 30px;
	line-height: 36px;
	font-weight: 700;
	padding: 15px 0;
	margin-bottom: 15px;
}
.context h3:after {
	content: '';
	display: block;
	border-top: 1px solid #fff;
	width: 30px;
	position: absolute;
	left: 0;
	bottom: 0;
}
.scroll-btn {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	height: 36px;
	color: #fff;
	background: #fff;
	border-radius: 3px;
	text-align: center;
	line-height: 36px;
	color: #34A2FE;
	margin-top: 20px;
}
.scroll-btn i {
	height: 50px;
}
.scroll-btn .icon {
	width: 25px;
	height: 36px;
}
.section {
	background: #F1F8FF;
}
.section-hd {
	position: relative;
}
.section-hd .section-title {
	margin-right: 30px;
	background-image: linear-gradient(-135deg, rgba(149,206,252,0.00) 0%, rgba(219,234,247,0.90) 100%);
}
.section-hd h3 {
	font-size: 30px;
	color: #4A4A4A;
	font-weight: 700;
	line-height: 36px;
	padding: 25px 0 25px 15px;
	padding-right: 65px;
}
.section-no {
	position: absolute;
	right: 0;
	top: 0;
	background: #fff;
	width: 80px;
	height: 80px;
	text-align: right;
	padding-right: 9px;
	padding-top: 20px;
	box-shadow: -5px 5px 20px 0 rgba(113,171,253,0.25);
}
.section-no span {
	font-size: 14px;
	color: #D3DBE3;
	font-weight: 700;
}
.section-bd {
	padding: 15px;
}
.cooperatives h4 {
	font-size: 20px;
	color: #4A4A4A;
	font-weight: 700;
}
.company-brand {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
}
.company-brand span {
	display: block;
	width: 31%;
}
.cooperatives p {
	color: #6F80AE;
	line-height: 24px;
}
.user-total h4 {
	color: #4A4A4A;
}
.user-total b,
.user-total p {
	color: #71ABFD;
}
.user-total b {
	position: relative;
	font-size: 48px;
	line-height: 48px;;
}
.user-total b:after {
	content: '';
	display: block;
	width: 100%;
	border-top: 1px solid #71ABFD;
	position: absolute;
	left: 0;
	bottom: 0;
}
.user-total p {
	padding-top: 8px;
}
.city-item {
	background: #fff;
	margin-bottom: 15px;
}
.city-item:last-child {
	margin-bottom: 0
}
.city-name {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	box-shadow: 0 9px 15px -6px rgba(74,144,226,0.14);
}
.city-name h4 {
	font-size: 20px;
	color: #4A4A4A;
}
.customer-total {
	text-align: center;
}
.customer-total b {
	font-size: 24px;
	color: #4A4A4A;
	font-weight: 700;
	line-height: 24px;
}
.customer-total span {
	font-size: 10px;
	color: #9B9B9B;
	display: block;
	line-height: 10px;
}
.district-item {
	display: flex;
	justify-content: space-between;
	padding: 15px;
}
.district-info span {
	display: block;
	font-size: 14px;
	color: #4A4A4A;
}
.district-info b {
	display: block;
	font-size: 24px;
	color: #4A4A4A;
	line-height: 24px;
}
.district-info p {
	font-size: 10px;
	color: #9B9B9B;
}
.district-right {
	text-align: center;
}
.district-right span {
	font-size: 12px;
	color: #FF7584;
}
.district-right .btn {
	font-size: 14px;
	line-height: 26px;
	padding: 0 15px;
	color: #fff;
	background: #71ABFD;
	border-radius: 3px;
	margin-top: 10px;
}
.distribution-top {
	display: flex;
	font-size: 12px;
	color: #464542;
}
.distribution-top span i .icon {
	width: 12px;
	height: 14px;	
}
.color-orange {
	fill: #F27032;
}
.color-green {
	fill: #11DF77;
}
.distribution-top .tag {
	width: 50px;
}
.distribution-top .amount {
	flex: 1;
}
</style>