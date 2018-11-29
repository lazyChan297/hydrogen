<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'assets/css/default.css';

html, body {
	position: relative;
  overflow-x: hidden;
}
body {
	position: relative;
  font-family: Helvetica, PingFangSC-Regular, "Droid Sans", Arial, sans-serif;
  font-size: 14px;
  background-color: #f5f5f5;
  max-width: 640px;
  margin: 0 auto;
}
video {
  width: 100%;
}
img {
	max-width: 100%;
}
a,
a:active {
	color: #333;
}
textarea {
  background: none;
}
.img-holder {
  display: block;
  height: 0;
  position: relative;
}
.obj-cover {
	object-fit: cover;
	position: absolute;
	height: 100%;
	width: 100%;
	height: 100%;
}
.bottom-1px,.top-1px {
	position: relative;
}

.bottom-1px:after,.top-1px::before {
	content: " ";
	position: absolute;
	display: block;
	left: 0;
	right: 0;
	height: 1px;
	border-top: 1px solid #eee;
	color: #eee;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
  z-index: 0;
}

.bottom-1px:after {
	bottom: -1px;
}
.top-1px::before {
	top: -1px;
}
.height-10px {
  height: 10px;
}

.weui-cell:before {
  left: 0 !important;
}
.weui-cells {
  font-size: 16px !important;
}

/* 评论 */
.comments-container {
  background: #fff;
}
.comments-tags {
  padding: 10px 15px;
  font-size: 0;
}
.comments-tags .tag-item {
  display: inline-block;
  margin: 2px 5px 2px 0;
  padding: 5px 8px;
  background: #fceae8;
  font-size: 12px;
  border-radius: 3px;
  color: #787878;
}
.comment-item {
  display: block;
  padding: 10px 15px;
}
.comment-item::after {
  bottom: -2px;
}
.comment-item-head {
  display: flex;
  align-items: center;
}
.comment-item-head .user-info {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.comment-item-head .avatar {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 5px;
}
.comment-item-head .avatar img {
  width: 100%;
  height: 100%;
}
.comment-item-head .user-name {
  color: #333;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 8px;
}
.comment-item-head .datetime {
  color: #999;
  font-size: 13px;
}
.comment-item .content {
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 18px;
}
.comment-btm-flex {
  display: flex;
  align-items: center;
}
.comment-btm-flex .buy-num {
  flex: 1;
  font-size: 14px;
  color: #999;
}
.comment-btm-flex .comment-action {
  flex: 0 0 auto;
  display: flex;
  align-items: center; 
}
.comment-action div {
  margin-left: 10px;
  font-size: 0;
}
.comment-action span {
  color: #333;
  margin-left: 2px;
  font-size: 14px;
}
.comment-action .comment .iconfont {
  position: relative;
  top: 2px;
}
.comment-action .iconfont .icon {
  width: 18px;
  height: 18px;
}

.comment-imgs {
  overflow: hidden;
  margin: 0 -2px;
  padding-bottom: 5px;
}
.comment-img-item {
  float: left;
  width: 33.333%;
  padding: 0 2px;
  box-sizing: border-box;
  margin-bottom: 4px;
}
.img-holder {
  position: relative;
  height: 0;
  padding-bottom: 100%;
}
.img-holder img {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
}

/* 无数据 */
.no-result-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.no-result .text {
  font-size: 16px;
  color: #999;
}
.no-result-img {
  width: 120px;
  height: 120px;
}
.weui-toast_text .weui-toast__content {
	font-size: 14px; 	 	
}
.weui-toast__content {
	line-height: 16px !important;
}
.weui-toast__content {
  padding: 8px 15px !important;
  white-space: nowrap !important;
}
.weui-toast_text {
	width: auto !important;
}
.weui-toast.vux-toast-bottom {
	bottom: 30px !important;
}
.icon {
  width: 20px; 
  height: 20px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.weui-loadmore_line {
  margin-top: 1.65em !important;
  margin-bottom: 0 !important;
}
.loading-more {
  text-align: center;
  height: 42px;
  line-height: 42px;
}
.loading-text {
  color: #999;
  display: inline-block;
  vertical-align: middle;
  margin-left: 3px;
}
.weui-loading_toast,
.vux-loading {
  position: relative;
  z-index: 99999999;
}
.date-tips {
  position: absolute;
  background: rgba(0,0,0,.75);
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 3px;
  white-space: nowrap;
  top: -35px;
  left: -50%;
  margin-left: -10px;
}
.date-tips:after {
  content: '';
  display: block;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -8px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0,0,0,.75) transparent transparent transparent;
}
.vux-tap-active:active {
  background: none !important;
}
.weui-dialog {
  border-radius: 5px;
}
.weui-search-bar__label {
  line-height: 26px;
}
.weui-search-bar__label span {
  position: relative;
  line-height: 26px;
}
.weui-search-bar__label i.weui-icon-search {
  margin-right: 0;
}
</style>
