<template>
	<div class="bottom-wrapper">
		<div class="bottom-fixed">
			<ul class="bottom-nav" :style="{ background: bgColor }">
				<router-link class="bottom-nav-item" :to="{ path: '/' }" tag="li">
					<i class="i-shangc"></i>
					<h4>首页</h4>
				</router-link>
				<router-link class="bottom-nav-item" :to="{ path: '/hydrogen' }" tag="li">
					<i class="i-fax"></i>
					<h4>发现</h4>
				</router-link>
				<router-link class="bottom-nav-item" :to="{ path: '/shop/index' }" tag="li">
					<i class="i-shouy"></i>
					<h4>案例</h4>
				</router-link>
				<router-link class="bottom-nav-item" :to="{ path: '/cart' }" tag="li">
					<i class="i-gouwuc"><badge class="badge" :text="cartLen"></badge></i>
					<h4>购物车</h4>
				</router-link>
				<router-link class="bottom-nav-item" :class="{ 'router-link-exact-active': $route.path == '/user/index' }" :to="{ path: '/my' }" tag="li">
					<i class="i-wode"></i>			
					<h4>我的</h4>
				</router-link>
			</ul>
		</div>
	</div> 
</template>

<script>
import { Badge } from 'vux'
import { mapGetters, mapActions } from 'vuex'	
export default {
	props: {
		bgColor: {
			type: String,
			default: 'rgba(255, 255, 255, 1)'
		}
	},
  components: {
  	Badge
  },
  computed: {
  	...mapGetters(['cartLen'])
  },
  methods: {
  	...mapActions(['getCartLen'])
  },
  mounted () {
  	this.getCartLen()
  }
}
</script>

<style>
.bottom-wrapper {
	height: 56px;
}
.bottom-fixed {
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 640px;
	z-index: 98;
}
.bottom-nav {
	display: flex;
	height: 56px;
	box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
}
.bottom-nav-item {
	flex: 1;
	padding-top: 6px;
	font-size: 0;
	text-align: center;
	color: rgba(0, 0, 0, .54);
}
.bottom-nav-item:active {
	background: #f8f8f8;
} 
.bottom-nav-item h4 {
  font-size: 12px;
}
.bottom-nav-item i {
	position: relative;
  font-size: 20px;
  line-height: 20px;
  display: inline-block;
  width: 30px;
  height: 30px;
}
.bottom-nav-item i.i-shouy {
	background: url('./../../assets/images/foot/shouye@2x.png');
	background-size: 100% 100%;
}
.router-link-exact-active i.i-shouy {
	background: url('./../../assets/images/foot/shouy2x.png');
	background-size: 100% 100%;
}
.bottom-nav-item i.i-fax {
	background: url('./../../assets/images/foot/faxian@2x.png');
	background-size: 100% 100%;
}
.router-link-exact-active i.i-fax {
	background: url('./../../assets/images/foot/fax@2x.png');
	background-size: 100% 100%;
}
.bottom-nav-item i.i-shangc {
	background: url('./../../assets/images/foot/shangcheng@2x.png');
	background-size: 100% 100%;
}
.router-link-exact-active i.i-shangc {
	background: url('./../../assets/images/foot/shangc@2x.png');
	background-size: 100% 100%;
}
.bottom-nav-item i.i-gouwuc {
	background: url('./../../assets/images/foot/gouwuc@2x.png');
	background-size: 100% 100%;
}
.router-link-exact-active i.i-gouwuc {
	background: url('./../../assets/images/foot/gouwuche@2x.png');
	background-size: 100% 100%;
}
.bottom-nav-item i.i-wode {
	background: url('./../../assets/images/foot/w@2x.png');
	background-size: 100% 100%;
}
.router-link-exact-active i.i-wode {
	background: url('./../../assets/images/foot/wo@2x.png');
	background-size: 100% 100%;
}
.router-link-exact-active {
	color: #3484FF;
}
.badge {
	display: block;
	position: absolute;
	right: -5px;
	top: -0px;
	line-height: 10px !important;
	color: #fff !important;
	font-size: 10px !important;
	padding: 3px 0 !important;
}
</style>
