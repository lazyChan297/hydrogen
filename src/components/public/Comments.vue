<template>
	<div>
		<div v-for="(item,index) in comments" :key="index" class="comment-item bottom-1px">
	    <div class="comment-item-head">
	      <div class="user-info">
	        <div class="avatar"><img :src="item.avatar" /></div>
	        <span class="user-name">{{ item.username }}</span>
	      </div>
	      <div class="datetime">{{ item.datetime }}</div>
	    </div>
	    <div class="content">{{ item.content }}</div>
	    <div v-if="item.imgs.length > 0" class="comment-imgs">
	      <div class="comment-img-item" v-for="(img,idx) in item.imgs" :key="idx">
	        <div class="img-holder"><img class="obj-cover" @click.stop.prevent="previewImage(img.original, item.imgs)" :src="img.thumb" /></div>
	      </div>
	    </div>
	    <!-- 追评 -->
	    <div v-if="item.recomment.length > 0" class="recomment top-1px">
	    	<div class="recomment-item" v-for="(n,idx) in item.recomment" :key="idx">
	    		<h4 style="color: #ff6c00">用户 {{ n.time }}追评</h4>
					<div class="content">{{ n.content }}</div>
					<div v-if="n.imgs.length > 0" class="comment-imgs">
			      <div class="comment-img-item" v-for="(i,j) in n.imgs" :key="j">
			        <div class="img-holder"><img class="obj-cover" @click.stop.prevent="previewImage(i.original, n.imgs)" :src="i.thumb" /></div>
			      </div>
			    </div>
	    	</div>
	    </div>
	    <div class="comment-btm-flex">
	      <span class="buy-num">数量：{{ item.boughtQuantity ? item.boughtQuantity: '1' }}{{ item.goodsUnitName != ''?item.goodsUnitName: '盒' }}</span>
	      <div class="comment-action">
	        <div class="zan" @click="dianZan(index, item.id)">
	          <span class="zan-num">{{ item.likesQuantity }}</span>
	          <span class="iconfont">
	          	<svg class="icon" aria-hidden="true">
              	<use xlink:href="#icon-fenxiang1"></use>
            	</svg>
	          </span>
	        </div>
	        <div class="comment" @click="openComment(item.id, item.username, index)">
	          <span class="comment-num">{{ item.repliesQuantity }}</span>
	          <span class="iconfont">
	          	<svg class="icon" aria-hidden="true">
              	<use xlink:href="#icon-pinglun"></use>
            	</svg>
	          </span>
	        </div>
	      </div>
	    </div>

	    <!-- 回复 -->
	    <div v-if="item.replies && item.replies.length > 0" class="answer">
		    <div v-for="(n, i) in item.replies" :key="i">
		    	<div @click="openComment(n.id, n.username, index)" v-if="n.replyToUser == ''">
		    		<span class="color-blue">{{n.username}}</span>：{{ n.content }}</div>
		    	<div @click="openComment(n.id, n.username, index)" v-else><span class="color-blue">{{ n.username }}</span> 回复 <span class="color-blue">{{ n.replyToUser }}</span>：{{ n.content }}</div>
		    </div>
		  </div>

	  </div>

	  <!-- 发送评论区 -->
		<div v-if="showSendComment" class="send-comment-btm">
	    <x-textarea :max="140" :show-counter="false" class="textarea" :rows="1" :height="30" v-model="content" autosize :placeholder="placeholder"></x-textarea>
	    <span class="send-btn" :class="{ disabled: content == '' }" @click="sendComment">发送</span>
	  </div>
	  <div v-if="showSendComment" @click="showSendComment = false" class="mask"></div>
	</div>
</template>

<script>
import { XTextarea  } from 'vux'
import http from '@/utils/http'

export default {
	components: {
		XTextarea
	},
	props: {
		comments: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data () {
		return {
			showSendComment: false,
			content: '',
			replyTo: '',
			commentId: null,
			nowIndex: null
		}
	},
	computed: {
		placeholder () {
			return `回复${ this.replyTo }`
		}
	},
	methods: {
		// 点赞
		dianZan (index, id) {
			http.post('/comment/reply', { id: id, isHideLoad: true }, false, res => {
				if (res.status == 1) {
					if (!this.comments[index].selfLiked) {
						this.comments[index].selfLiked = !this.comments[index].selfLiked
						this.comments[index].likesQuantity ++
						this.$vux.toast.show({
							type: 'success',
							text: '您已赞~',
							width: 'auto',
							position: 'middle'
						})
						this.$emit('changeComments', this.comments)
					}else {
						this.comments[index].selfLiked = !this.comments[index].selfLiked
						this.comments[index].likesQuantity --
						this.$vux.toast.show({
							type: 'success',
							text: '取消点赞~',
							width: 'auto',
							position: 'middle'
						})
						this.$emit('changeComments', this.comments)
					}
				}
			})
		},
		sendComment () {
			if (this.content == '') return 
			let content = this.content
			// 提交的数据
			let params = {
				id: this.commentId,
				content: this.content
			}
			http.post('/comment/reply', params, false, res => {
				if (res.status == 1) {
					this.comments[this.nowIndex].replies.push(res.data.replyDetails)
					this.$emit('changeComments', this.comments)
				}
			}) 
			this.content = ''
			this.showSendComment = false
		},
		openComment (id, name, index) {
			this.replyTo = name
			this.commentId = id
			this.nowIndex = index
			this.showSendComment = !this.showSendComment
		},
		previewImage (current, urls) {
			let imgs = []
			urls.forEach(item => {
				imgs.push(item.original)
			})
			this.$wechat.previewImage({
				current: current, // 当前显示图片的http链接
    		urls: imgs // 需要预览的图片http链接列表
			})
		}
	}
}	
</script>

<style scoped>
.recomment {
	padding: 8px 0;
}
.recomment .content {
	padding: 5px 0;
}
.comment-imgs {
	position: relative;
}	
.imgs-length {
	display: block;
	position: absolute;
	right: 5px;
	bottom: 8px;
	padding: 3px 6px;
	color: #fff;
	background: rgba(0, 0, 0, .75);
	border-radius: 3px;
	line-height: 0;
}
.imgs-length .icon {
	width: 14px;
	height: 14px;
}

.send-comment-btm {
  display: flex;
  align-items: flex-end;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #f9f9f9;
  padding: 8px 10px;
  border-top: 1px solid #eaeaea;
}
.send-comment-btm .textarea {
  flex: 1;
  border-bottom: 1px solid #eaeaea;
  margin-right: 8px;
  min-height: 30px;
  padding: 0;
  line-height: 18px;
  padding-top: 4px;
}
.send-btn {
  flex: 0 0 auto;
  background: #1aac19;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  padding: 0 15px;
  border-radius: 5px;
}
.send-btn.disabled {
  background: #eaeaea;
  color: #999;
}
.answer {
  position: relative;
  background: #f5f5f5;
  margin-top: 8px;
  padding: 5px 10px;
  color: #666;
}
.color-blue {
	color: #5a8eee;
}
.answer::after {
  content: '';
  display: block;
  position: absolute;
  border: 6px solid transparent;
  border-top: 6 solid transparent;
  border-bottom: 6px solid #f5f5f5;
  left: 8px;
  top: -12px;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 9999;
}
.recomment {
	padding: 8px 0;
}
.recomment .content {
	padding: 5px 0;
}	
.comment-imgs {
	position: relative;
}	

</style>