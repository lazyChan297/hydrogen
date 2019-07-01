<template>
	<div class="investment">
		<div class="top-img">
			<img src="./../assets/images/investment_img.jpg">
		</div>	
		<div class="intro">
			<h4>招商政策</h4>
			<p>氢量极品目前招县（区）区域独家代理；县代必须是企业法人，是线上和线下的经营主体，自主纳税。</p>
			<router-link class="jump-btn" :to="jumpPath">申请代理</router-link>
		</div>
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
		...mapGetters(['userInfo']),
		jumpPath () {
			if (this.user && this.user.agentInfo.length == 0 && this.userInfo.mobile == '') {
				return { path: '/bindPhone', query: { type: 'agent' } }
			}else {
				return { path: '/agentApply' }
			}
		}
	},
	methods: {
		getUser () {
      http.get('/home/myCenter', {}, false, res => {
        if (res.status == 1) {
          this.user = res.data
        }
      })
    }
	},
	mounted () {
		this.getUser()
	}
}	
</script>

<style scoped>
.investment {
	position: absolute;
	width: 100%;
	bottom: 0;
	top: 0;
	background: #F8F9FD;
	overflow-y: auto; 
}	
.top-img {
	background: #fff;
	padding-top: 10%;
}
.intro {
	font-size: 14px;
	padding: 10% 30px;
	text-align: center;
}	
.intro h4 {
	font-size: 16px;
	color: #38393C;
	font-weight: 700;
}
.intro p {
	font-size: 14px;
	color: #38393C;
	padding: 5px 0 20px 0;
}
.jump-btn {
	display: inline-block;
	padding: 8px 30px;
	color: #fff;
	background: #FDDA00;
	box-shadow: 0 5px 20px -4px rgba(222,191,0,0.75);
	border-radius: 20px;
}
</style>