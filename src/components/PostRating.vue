<template>
	<div>
		<div class="buy-goods bottom-1px">
		  <div class="goods-item">
		    <div class="goods-cover">
		      <div class="img-holder"><img v-if="goodsDateil.imgs && goodsDateil.imgs.length > 0" class="obj-cover" :src="goodsDateil.imgs[0].img" /></div>
		    </div>
		    <div class="goods-name">{{ goodsDateil.name }}</div>
		  </div>
		</div>
		<div class="rating-label">
		  <div class="label">综合评价：</div>
		  <div class="label-list">
		    <!-- <div class="label-item" v-for="(item,index) in ratingLabel" :key="index">{{ item }}</div> -->
        <checker v-model="selTags" type="checkbox" default-item-class="label-item" selected-item-class="selected">
          <checker-item v-for="(item,index) in ratingLabel" :key="index" :value="index + 1">{{ item }}</checker-item>
        </checker>
		  </div>
		</div>
		<div class="rating-textarea">
			<x-textarea :height="120" :max="140" show-counter class="textarea" v-model="content" placeholder="评价内容请在这里填写哦，最多不超过140个字！"></x-textarea>
		</div>
    <!-- 图片上传 -->
    <div class="upload-list">
      <div class="upload-item" v-for="(item,index) in uploadList" :key="index">
        <div class="img-holder">
          <x-icon @click="deleteImg(index)" class="delete-icon" type="ios-close-empty" size="18"></x-icon>
          <img class="obj-cover" :src="item" />
        </div>
      </div>
      <div class="upload-btn" v-if="showUploadBtn">
        <div @click="uploadImgs" class="img-holder iconfont">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangji"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="submit-btn-wrapper">
      <div @click="submit" class="submit-btn">发表评价</div>
    </div>
	</div>
</template>

<script>
import { Group, XTextarea, Checker, CheckerItem, trim } from 'vux'	
import http from '@/utils/http'

export default {
	components: {
		Group,
		XTextarea,
    Checker,
    CheckerItem
	},
	data () {
		return {
			content: '',
			ratingLabel: [ '送货快', '质量好', '效果明显', '包装好' ],
      uploadList: [], // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      serverId: [],
      selTags: [],
      maxLen: 9,
      goodsDateil: {}
		}
	},
  computed: {
    showUploadBtn () {
      if (this.uploadList.length > this.maxLen) return false
      return true 
    }
  },
  methods: {
    //上传图片 
    uploadImgs () {
      let that = this

      that.$wechat.chooseImage({
        count: that.maxLen,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          let i = 0, length = localIds.length
          // 限制图片上传张数
          if (that.uploadList.length + length > this.maxLen) {
            that.$vux.confirm.show({
              title: '提示信息',
              content: `上传的图片不能大于${ that.maxLen }张!`,
              showCancelButton: false
            })
            return
          }
          localIds.forEach((item, i) => {
            that.uploadList.push(item) 
          })
          
          // 上传图片到微信服务器
          function upload () {
            that.$wechat.uploadImage({
              localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: result => {
                i++
                // 获取serverId
                that.serverId.push(result.serverId)
                // alert('<========' + JSON.stringify(that.serverId) + '===========>')
                if (i < length) {
                  upload()
                }
              }
            })
          }
          upload()
        }
      })
      
    },
    // 删除
    deleteImg (index) {
      let that = this
      this.$vux.confirm.show({
        title: '提示信息',
        content: '确定要删除吗？',
        onConfirm () {
          that.uploadList.splice(index, 1)
          that.serverId.splice(index, 1)
        }
      })
    },
    // 发表评价
    submit () {
      if (trim(this.content) == '') {
        this.$vux.toast.show({
          type: 'warn',
          text: '评价内容不能为空!',
          width: 'auto',
          position: 'middle'
        })
        return
      }
      let params = {
        content: this.content,
        serverIds: JSON.stringify(this.serverId),
        orderNo: this.$route.query.orderNo,
        goodsId: this.$route.query.id,
        generalComment: JSON.stringify(this.selTags)
      }
      http.post('/comment/publish', params, false, res => {
        if (res.status == 1) {
          this.$vux.toast.show({
            text: '评价成功!',
            type: 'success',
            width: 'auto',
            position: 'middle'
          })
          setTimeout(() => {
            this.$router.push({ path: '/my/order', query: { type: 0 } })
          }, 2000)
        }else {
          this.$vux.toast.show({
            type: res.info,
            text: '评价内容不能为空!',
            width: 'auto',
            position: 'middle' 
          })
        }
      })
    },
    getGoodsDateil () {
      let id = this.$route.query.id
      http.get('/goods/details', { id }, false, res => {
        if (res.status == 1) {
          this.goodsDateil = res.data.goods
        }
      })
    }
  },
  mounted () {
    this.getGoodsDateil()
  }
}	
</script>

<style scoped>
.buy-goods {
  background: #fff;
  padding: 0 15px;
}
.goods-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.goods-cover {
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
.goods-name {
  flex: 1;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rating-label {
  display: flex;
  background: #fff;
  padding: 10px 15px;
}
.rating-label {
  flex: 0 0 auto;
}
.label-list {
  flex: 1;
  align-items: baseline;
  margin-bottom: -5px;
}
.label-item {
  display: inline-block;
  padding: 5px 8px;
  line-height: 12px;
  border-radius: 3px;
  border: 1px solid #999;
  color: #999;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 12px;
}
.label-item.selected {
  border: 1px solid #e02e24;
  color: #e02e24;
}
.rating-textarea {
  background: #fff;
  padding: 0 15px 15px 15px;
}
.rating-textarea .textarea {
  width: auto;
  background: #f5f5f5;
  padding: 10px;
  line-height: 18px;
  font-size: 14px;
}

.upload-list {
  background: #fff;
  padding: 0 15px 15px 15px;
  overflow: hidden;
  margin-right: -8px;
}
.upload-item,
.upload-btn {
  position: relative;
  width: 25%; 
  float: left;
  padding: 0 8px 8px 0;
  box-sizing: border-box;
}
.img-holder {
  position: relative;
  height: 0;
  padding-bottom: 100%;
  border: 1px solid #eaeaea;
}
.img-holder .icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
}
.upload-btn .iconfont::before {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 24px;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  line-height: 24px;
  color: #666;
}
.delete-icon {
  position: absolute;
  right: 5%;
  top: 5%;
  z-index: 5;
  border-radius: 100%;
  background: rgba(0, 0, 0, .5);
  width: 18px;
  height: 18px;
  fill: #fff;
}
.submit-btn-wrapper {
  height: 46px;
}
.submit-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(90deg, #EB3F52 0%, #FF7584 97%);
  color: #fff;
  height: 46px;
  text-align: center;
  font-size: 16px;
  line-height: 46px;
  z-index: 100;
}	
</style>