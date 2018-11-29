<template>
	<div>
		<div class="apply-result-item bottom-1px">
			<span class="label">真实姓名：</span>
			<span class="content">张三丰</span>
		</div>
		<div class="apply-result-item bottom-1px">
			<span class="label">申请级别：</span>
			<span class="content">县代理</span>
		</div>
		<div class="apply-result-item bottom-1px">
			<span class="label">选择地区：</span>
			<span class="content">北京市 北京市 东城区</span>
		</div>
		<div class="apply-result-item bottom-1px">
			<span class="label">申请结果：</span>
			<span class="content color-green">已同意申请</span>
		</div>
		<div class="apply-result-item bottom-1px">
			<span class="label">审核日期：</span>
			<span class="content">2018-07-23</span>
		</div>
		<div class="apply-result-item">
			<span class="label">拒绝原因：</span>
			<span class="content">不符合代理商条件</span>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	}
}	
</script>

<style scoped>
.apply-result-item {
	background: #fff;
	display: flex;
	padding: 10px 15px;
}	
.apply-result-item:after {
	bottom: 0;
}
.apply-result-item .label {
	flex: 0 0 auto;
	color: #787878;
}
.apply-result-item .content {
	flex: 1;
	color: #333;
}
.apply-result-item .color-green {
	color: #1aac19;
}
.apply-result-item .color-red {
	color: #e02e24;
}
</style>