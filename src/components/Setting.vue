<template>
	<div>
		<group v-if="userInfo" gutter="0" title="基本信息">
			<cell title="头像" class="item-cell">
				<span class="avatar"><img width="40" height="40" :src="userInfo.avatarUrl"></span>
			</cell>	
			<cell class="item-cell" title="昵称" :value="userInfo.nickName"></cell>
			<cell class="item-cell" title="手机号" :value="userInfo.mobile" :link="{ path: toPath }" is-link></cell>
			<cell v-if="invitorName" class="item-cell" title="邀请人" :value="invitorName"></cell>		
		</group>
	</div>
</template>

<script>
import http from '@/utils/http'
import { mapGetters } from 'vuex'	
import { Group, Cell } from 'vux'	
export default {
	components: {
		Group,
		Cell
	},
	data () {
		return {
			invitorName: null
		}
	},
	computed: {
		...mapGetters(['userInfo']),
		toPath () {
			if (this.userInfo.mobile == '') {
				return '/bindPhone'
			}
			return '/my/setting/mobile/old'
		}
	},
	mounted () {
		http.get('/users/getInvitorInfo', {}, false, res => {
			if (res.status == 1) {
				this.invitorName = res.data.nickname
			}
		})
	}
}	
</script>

<style scoped>
.avatar {
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	overflow: hidden;
}	
.item-cell {
	padding: 12px 15px;
	font-size: 14px;
}
</style>