<template lang="html">
  <div class="UserIndex-wrapper">
    <!-- <div class="header" :style="background:userInfo.avatarUrl"> -->

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vux'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>

<style lang="css">
</style>
