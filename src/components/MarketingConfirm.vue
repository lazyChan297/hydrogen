<template>
	<div class="wrapper" v-if="user">
		<div class="user">
			<div class="avatar">
				<img :src="user.avatar">
			</div>
			<p>{{ user.nickname }}邀请你</p>
		</div>
		<div class="img">
			<img src="./../assets/images/marketimg_img.png">
		</div>
		<div @click="submit" class="submit-btn">接受邀请</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'	
import http from '@/utils/http'

export default {
	data () {
		return {
			user: null
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		getUserInfo () {
			let userSn = this.$route.query.userSn
			let params = { userSn }
			http.post('/users/getSharerInfo', params, false, res => {
				if (res.status == 1) {
					this.user = res.data
				}
			})
		},
		submit () {
			if (this.userInfo.invitor == 1) {
				this.$vux.toast.show({
					type: 'warn',
					text: '您已绑定了邀请关系~',
					width: 'auto',
					position: 'middle'
				})
				return
			}
			let userSn = this.$route.query.userSn
			http.post('/users/setInvitor', { invitor: userSn }, false, res => {
				if (res.status == 1) {
					this.$vux.toast.show({
						text: '设置成功！',
        		type: 'success',
        		width: 'auto',
						position: 'middle'
					})
					setTimeout(() => {
						this.$router.push({ path: '/shop/index' })
					}, 2000)					
				}else {
					this.$vux.toast.show({
						text: res.info,
        		type: 'warn',
        		width: 'auto',
						position: 'middle'
					})
				}
			})
		}
	},
	mounted () {
		this.getUserInfo()
	}
}	
</script>

<style scoped>
.wrapper {
	padding: 0 15px;
}
.user {
	padding: 20px 0 30px 0;
	text-align: center;
}
.user .avatar {
	width: 50px;
	height: 50px;
	border-radius: 100%;
	overflow: hidden;
	margin: 0 auto;
}
.user p {
	font-size: 14px;
	color: #4A4A4A;
	padding-top: 8px;
	line-height: 18px;
}
.img {
	width: 74%;
	margin: 0 auto;
}
.submit-btn {
	margin: 20px 10px;
	height: 45px;
	color: #fff;
	background-image: linear-gradient(90deg, #FF7EA8 0%, #FFB57D 97%);
	box-shadow: 0 7px 10px -5px rgba(234,3,3,0.50);
	border-radius: 3px;
	text-align: center;
	line-height: 45px;
}
</style>