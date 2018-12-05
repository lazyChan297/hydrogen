<template lang="html">
  <div class="audit-wrapper">
    <div class="header">
      <img src="../assets/images/success.png" alt="" width="50" height="50">
      <p class="btext">审核完成</p>
      <p class="stext">您已拒绝审核</p>
    </div>
    <router-link :to="{ name: '', params: {} }" tag="div" class="check">查看</router-link>
    <div class="back" @click="back">返回</div>
  </div>
</template>

<script>
export default {
  method: {
    back() {
      this.$router.go(-2)
    }
  }
}
</script>

<style lang="css" scoped>
  .header{
    text-align: center;
  }
  .header img{
    display: block;
    margin:30px auto 10px;
    border-radius: 50%;
  }
  .header .btext{
    font-size: 20px;
  }
  .header .stext{
    font-size: 14px;
    color: #9b9b9b;
  }
  .check,
  .back{
    margin:20px 15px 15px;
    text-align: center;
    line-height: 45px;
    border-radius: 3px;
    font-size:14px;
  }
  .check{
    background: #6DA6FE;
    color:#fff;
  }
  .back{
    margin-top:0;
    color: #9b9b9b;
    background:#fff;
  }
</style>
