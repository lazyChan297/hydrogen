<template>
	<div>
		<x-dialog v-model="showDialog" class="dialog-demo" hide-on-blur>
			<div class="dialog-wrapper">
				<div class="dialog-head">提示信息</div>
				<div class="dialog-body">
					<slot></slot>
				</div>
			</div>
		</x-dialog>
	</div>
</template>

<script>
import { XDialog } from 'vux'

export default {
	components: {
		XDialog
	},
	data () {
		return {
			showDialog: false
		}
	},
	methods: {
		_show () {
			this.showDialog = !this.showDialog
		},
		_cancel () {
			this.showDialog = false
		}
	}
}	
</script>

<style scoped>
.dialog-wrapper {
	padding: 15px;
}
.dialog-head {
	font-size: 16px;
	color: #38393C;
	padding-bottom: 10px;
}
</style>