<template>
	<div>
		<!-- 评论消息 -->
		<group gutter="0">
			<cell :title="item.nickName" v-for="(item, index) in commentsMessage" :link="{ path: '/goods/comments/detail' }" is-link :key="index">
				<div slot="icon" class="avatar"><img :src="item.avatarUrl" /></div>
				<span class="message-cell-right">评论了你</span>
			</cell>
		</group>
		<!-- 获奖消息 -->
		<group gutter="10px">
			<cell v-for="(item, index) in winningMessage" :link="{ path: '/winningPrize' }" is-link :key="index" is-link>
				<span slot="title" style="color: #e02e24">获奖通知</span>
				<div class="winningTime">{{ item.winningTime }}期</div>
			</cell>
			<div class="winning-tips">	恭喜您，在0元抢活动中抢到了好货，请尽快完善个人收货信息，工作人员将尽快将商品寄出给您。
			</div>
		</group>
		<!-- 代理商申请结果 -->
		<group gutter="10px">
			<cell :link="{ path: '/applyResult' }" is-link is-link>
				<span slot="title" style="color: #e02e24">代理商申请结果</span>
				<span class="view-more">立即查看</span>
			</cell>
			<div class="winning-tips">恭喜您，管理员已同意您的申请，您已成为北京市-东城区-县代理商。</div>
		</group>
	</div>	
</template>

<script>
import { Group, Cell } from 'vux'

export default {
	components: {
		Group,
		Cell
	},
	data () {
		return {
			commentsMessage: [
				{
	        nickName: '张三丰',
	        avatarUrl: require('./../assets/images/timg.jpg')
      	},
	      {
	        nickName: '小龙女Ly~',
	        avatarUrl: require('./../assets/images/20161006102404_MjYJc.jpeg')
	      }
			],
			winningMessage: [
				{
	        nickName: '张三丰',
	        avatarUrl: '../../images/timg.jpg',
	        winningTime: '0512-12'
      	}
			]
		}
	}
}	
</script>

<style scoped>
.comments-message {
  background: #fff;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 5px;
}
.message-cell-right {
  font-size: 14px;
}
.winning-item {
  background: #fff;
}
.winning-message-head {
  display: flex;
  align-items: center;
  color: #e02e24;
  padding: 10px 15px;
}
.text {
  flex: 1;
  font-size: 16px;
}
.winningTime {
  display: inline-block;
  vertical-align: middle;
  font-size: 10px;
  background: #ffda00;
  padding: 1px 5px;
  border-radius: 20px;
  color: #333;
  margin-left: 3px;
  vertical-align: middle;
}
.winning-tips {
  border-top: 1px solid #ffebcc;
  border-bottom: 1px solid #ffebcc;
  background-color: #fff5e6;
  padding: 10px 15px;
  font-size: 12px;
  color: #666;
}	
</style>