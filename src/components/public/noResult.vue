<template>
  <div class="block-no-results" :style="height">
    <div class="no-results-wrapper">
      <img src="../../assets/images/no_results.svg">
      <div class="text">{{ text }}</div>
      <x-button :link="{ path: '/shop/index' }" v-if="showBtn" class="btn" mini type="primary">现在就去购买</x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'

export default {
  components: {
    XButton
  },
  props: {
    height: {
      type: Object,
      default () {
        return { 
          height: 'calc(100% - 86px)'
        }
      }
    },
    text: {
      type: String,
      default: '空空如也~'
    },  
    showBtn: {
      type: Boolean,
      default: false
    }
  }
}  
</script>
<style scoped>
.block-no-results {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  font-size: 16px;
  color: #999;
  text-align: center;
}
.btn {
  margin-top: 8px;
  background: #e02e24;
}
.btn:active {
  background: #e02e24 !important;
}
</style>
