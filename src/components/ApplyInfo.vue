<template>
	<div v-if="details">
		<div class="title">申请人信息</div>
		<group gutter="0">
			<cell v-if="details.type == 1" class="cell-item" title="姓名" :value="details.name"></cell>
			<cell class="cell-item" title="微信" :value="details.nickname"></cell>
			<cell class="cell-item" title="手机号码" :value="details.mobile"></cell>			
		</group>
		<div class="title">代理信息</div>
		<group gutter="0">
			<cell v-if="details.agentlevel && details.type == 1" class="cell-item" title="申请级别" :value="details.agentlevel"></cell>
			<cell v-else-if="type == 2" class="cell-item" title="申请级别" value="分销员"></cell>
			<cell v-if="details.type == 1" class="cell-item" title="选择地区" :value="details.agentDistrict"></cell>
			<cell class="cell-item" title="申请日期" :value="details.appliedDate"></cell>			
		</group>


		<!-- 已处理 -->
		<div v-if="details.status > 0" class="processed">
			<div v-if="details.status == 1" class="apply-status success">已同意申请</div>
			<div v-else-if="details.status == 2" class="apply-status rejected">已拒绝申请</div>
			<div class="apply-time">
				<span class="label">审核时间</span>
				<span class="content">{{details.handledDate}}</span>
			</div>
		</div>

		<div v-else class="btns">
			<div @click="onSubmit" class="submit-btn">同意申请</div>
			<div @click="onReject" class="reject-btn">拒绝申请</div>
		</div>

	</div>
</template>

<script>
import { Group, Cell  } from 'vux'
import http from '@/utils/http'

export default {
	components: {
		Group,
		Cell
	},
	data () {
		return {
			status: 1,
			details: null,
			type: null
		}
	},
	methods: {
		// 获取详情
		getApplyDetail () {
			let params = {
				id: this.$route.query.id
			}
			http.get('/applier/details', params, false, res => {
				if (res.status == 1) {
					this.details = res.data.details
					this.type = res.data.details.type
				}
			})
		},
		handleApply (val) {
			let params = {
				id: this.details.id,
				value: val
			}
			let methods = null
			if (this.type == 1) {
				methods = '/agent/check'
			}else if (this.type == 2) {
				methods = '/distributor/check'
			}
			http.post(methods, params, false, res => {
				if (res.status == 1) {
					this.$vux.toast.show({
						type: 'success',
						text: '审核成功!',
						width: 'auto',
						position: 'middle'
					})
					setTimeout(() => {
						this.$router.push({ path: '/applyList' })
					}, 2000)
				}else {
					this.$vux.toast.show({
						type: 'warn',
						text: res.info,
						width: 'auto',
						position: 'middle'
					})
				}
			})
		},
		onSubmit () {
			let type = this.details.type == 1? '代理商': '分销员' 
			this.$vux.confirm.show({
				title: '提示信息',
				content: `确认同意该用户成为${ type }吗?`,
				onConfirm: () => {
					this.handleApply(1)
				}
			})
		},
		onReject () {
			let type = this.details.type == 1? '代理商': '分销员' 
			this.$vux.confirm.show({
				title: '提示信息',
				content: `确认拒绝该用户成为${ type }吗?`,
				onConfirm: () => {
					this.handleApply(2)
				}
			})
		}
	},
	mounted () {
		this.getApplyDetail()
	}
}	
</script>

<style scoped>
.title {
	margin: 0 15px;
	position: relative;
	padding: 15px 0 15px 10px;
	line-height: 18px;
	font-size: 18px;
	font-weight: 700;
}
.title:after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 15px;
	width: 5px;
	height: 18px;
	background-image: linear-gradient(0deg, #00D0FC 0%, #2524DA 100%);
}
.cell-item {
	font-size: 14px;
	padding: 12px 15px;
}
.apply-status {
	padding: 15px;
	border-bottom: 1px solid #e2e2e2;
}
.processed {
	margin-top: 10px;
}
.processed .success,
.processed .rejected {
	background: #fff;
	padding: 8px 15px;
	text-align: center;
	font-size: 14px;
}
.apply-status.success {
	color: #3484FF;
}
.apply-status.rejected {
	color: #FF7584;
}
.apply-time {
	display: flex;
	justify-content: space-between;
	background: #fff;
	padding: 10px 15px;
}
.apply-time .label {
	font-size: 14px;
	color: #38393C;
}
.apply-time .content {
	font-size: 14px;
	color: #9B9B9B;
}
.btns {
	padding: 20px 15px 0 15px;
}
.submit-btn {
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #407CE6 0%, #00ACFC 97%);
	box-shadow: 0 7px 10px -5px #71ABFD;
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
.reject-btn {
	font-size: 14px;
	color: #9B9B9B;
	text-align: center;
	line-height: 45px;
}
</style>