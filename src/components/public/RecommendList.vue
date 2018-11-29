<template>
	<div class="recommend-list clearfix">
    <div v-for="(item, index) in recommend" class="recommend-item" :class="{ 'p_right': index%2 == 0, 'p_left': index%2 !== 0 }">
      <router-link class="recommend-item-container" :to="{ path: '/goods/detail', query: { id: item.id } }" tag="div">
        <div class="goods-cover">
          <span class="img-holder">
            <img class="obj-cover" :src="item.img">
          </span>
        </div>
        <div class="name ellipsis">{{ item.name }}</div>
        <div class="recommend-flex">
          <p class="price">￥{{ item.price }}</p>
          <i v-if="type === 'index'" @click.stop.prevent="addCart(item.id)" class="cart-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gouwuche"></use>
            </svg>
          </i>
          <span v-else class="btn">马上抢</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import http from '@/utils/http'

export default {
	props: {
		recommend: {
			type: Array,
			default: []
		},
		type: {
			type: String,
			default: 'index'
		}
	},
	methods: {
		...mapActions(['getCartLen']),
    // 加入购物车
    addCart (goodsId) {
      let str = JSON.stringify({ "goods": [{ goodsId, "quantity": 1 }] });
      http.post('/cart', { cart: str, isHideLoad: true }, false, res => {
        if (res.status == 1) {
          this.getCartLen()
          this.$vux.toast.show({
            text: '加入购物车成功~',
            type: 'success',
            width: 'auto',
            position: 'middle'
          })
        }
      })
    },
	}
}	
</script>

<style scoped>
.recommend-item {
  float: left;
  width: 50%;
  margin-bottom: 10px;  
}
.p_right {
    padding-right: 5px;
}
.p_left {
    padding-left: 5px;
}
.recommend-item-container {
  background: #fff;
  box-shadow: 0 7px 10px 0 rgba(26,96,255,0.03);
  border-radius: 5px;
  padding: 10px;
}
.recommend-item .name {
  font-size: 14px;
  color: #38393C;
  font-weight: 700;
  margin: 5px 0 8px 0;
}
.recommend-flex {
  display: flex;
}
.recommend-flex .price {
  flex: 1;
  line-height: 24px;
}
.recommend-flex .btn {
  background: #FDDA00;
  line-height: 24px;
  color: #fff;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 12px;
}
.cart-icon {
  background: #FDDA00;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  text-align: center;
}
.cart-icon .icon {
  width: 18px;
  height: 18px;
  fill: #fff;
  margin: 3px 0;
}	
</style>