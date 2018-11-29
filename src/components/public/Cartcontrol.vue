<template>
	<div class="cartcontrol">
    <div @click.stop="_decrease" class="cart-decrease">-</div>
    <div class="cart-count">{{ quanyity }}</div>
    <div @click.stop="_add" class="cart-add">+</div>
  </div>
</template>

<script>
export default {
	props: {
		count: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: null
		}
	},
	data () {
		return {
			quanyity: null
		}
	},
	methods: {
		_decrease () {
			this.quanyity <= 0 ? this.quanyity = 0 : this.quanyity--
			let obj = {
				count: this.quanyity,
				index: this.index
			}
			this.$emit('decrease', obj)
		},
		_add () {
			this.quanyity ++
			let obj = {
				count: this.quanyity,
				index: this.index
			}
			this.$emit('add', obj)
		}
	},
	created () {
		this.quanyity = this.count
	}
}	
</script>

<style scoped>
.cartcontrol {
  display: flex;
  align-items: center;
}
.cart-decrease,
.cart-add {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  background: #eaeaea;
  color: #999;
}
.cart-count {
  padding: 0 15px;
  height: 26px;
  background: #eaeaea;
  line-height: 26px;
  text-align: center;
  margin: 0 1px;
}	
</style>