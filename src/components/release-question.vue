<template lang="html">
  <div class="releaseQuestion-wrapper">
    <div class="submit-box">
      <img :src="userInfo.avatarUrl" width="35" height="35" alt="">
      <div class="submit">发布</div>
    </div>
    <div class="inputTitle-wrapper">
      <input type="text" name="" placeholder="输入问题并以问好结尾" value="">
    </div>
    <div class="inputDesc-wrapper">
      <div class="inputDesc-inner">
        <ul class="uploadImg-box">
          <li class="uploadImg" @click="uploadImg">
            <div class="iconBox">
              <i class="icon-cam"></i>
            </div>
          </li>
          <li class="imgbox" v-for="(item,index) in uploadImgs">
            <div class="icon">
              <i class="icon-delete" @click="deleteItem(index)"></i>
            </div>
            <div class="image-box" >
              <img :src="item" alt="" width="45">
            </div>

          </li>
          <!-- <li class="imgbox">
            <div class="icon">
              <i class="icon-delete"></i>
            </div>
            <div class="image-box" style="width:45px;height:45px">
              <img src="https://wx2.sinaimg.cn/mw690/879a982egy1fxomneheavj21og2inq8p.jpg" alt="" width="45">
            </div>
          </li> -->
        </ul>
        <textarea name="name" rows="8" cols="80" placeholder="问题描述(选填)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      uploadImgs: []
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    uploadImg () {
			let that = this
			that.$wechat.chooseImage({
			  count: 9,
			  sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			  success: (res) => {

          console.log('res',res)
			    let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			    that.uploadImgs.push(localIds)

			    // 上传图片到微信服务器
			    // that.$wechat.uploadImage({
		      //   localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
		      //   isShowProgressTips: 1, // 默认为1，显示进度提示
		      //   success: result => {
		      //     that.serverId[type] = result.serverId
		      //   }
		      // })

			  }
			})
		},
    deleteItem(index) {
      this.uploadImgs.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  .releaseQuestion-wrapper
    .submit-box
      display: flex
      justify-content: space-between
      align-items: center
      height: 75px
      padding: 0 20px
      img
        border-radius: 50%
      .submit
        width:70px;
        height:30px;
        background:linear-gradient(90deg,rgba(0,132,255,1) 0%,rgba(69,165,255,1) 100%);
        box-shadow:0px 6px 9px 0px rgba(0,132,255,0.25);
        border-radius:50px
        text-align: center
        line-height: 30px
        color: #fff
    .inputDesc-wrapper,
    .inputTitle-wrapper
      margin-top:15px
      padding: 0 15px
      input, .inputDesc-inner
        width: 100%
        padding:0 15px
        box-shadow: 0px 8px 25px 0px rgba(221,227,237,0.8)
        border-radius: 5px
    .inputTitle-wrapper
      input
        height: 60px;
    .inputDesc-wrapper
      .inputDesc-inner
        padding-top: 25px
      .uploadImg-box
        display:flex
        align-items: center
        flex-wrap:wrap
        .uploadImg
          width: 45px;
          height: 45px;
          margin-right: 15px;
        .iconBox
          margin:0 auto
        .image-box
          width:45px
          height:45px
          overflow:hidden
          img
            display: inline-block;
            vertical-align: text-top
        .imgbox
          position:relative
          margin-right:15px
          width:45px
          height:45px
          margin-bottom:15px
          .icon
            position:absolute
            right:-8px
            top:-8px
            z-index:1
      .iconBox
        background: #e2e2e2
        border-radius: 5px
        width: 31px
        height: 31px
        padding-top: 6px
        /* margin-bottom: 25px */
      textarea
        width: 100%
        outline: none
        resize: none;
</style>
