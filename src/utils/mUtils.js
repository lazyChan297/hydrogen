import Vue from 'vue'
import urls from 'url'
import webStorageCache from 'web-storage-cache'
import { cookie } from 'vux'

// 时间格式化
export function formatDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1 ? str : addZero(str)))
		}
	}
	return fmt
}

function addZero (str) {
	return ('00' + str).substr(str.length)
}

function padding (str) {
	if (str < 10) {
		str = '0' + str
	}
	return str
}

// 保留数字两位小数点
export function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
	return false;
  }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
	rs = s.length;
	s += '.';
  }
  while (s.length <= rs + 2) {
	s += '0';
  }
  return s;
}

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
              return window.setTimeout(callback, 1000/60)
          }
      );
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll(start, end, step) {
      if (start === end) {
          endCallback && endCallback()
          return
      }

      let d = (start + step > end) ? end : start + step
      if (start > end) {
          d = (start - step < end) ? end : start - step
      }

      if (el === window) {
          window.scrollTo(d, d)
      } else {
          el.scrollTop = d
      }
      window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

// 判断发表追评的时间
export function getDateDiff (firstTime, endTime) {
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var diffValue = endTime - firstTime
  var dayC = diffValue/day
  var hourC = diffValue/hour
  var minC = diffValue/minute
  if(dayC >= 1){
	return parseInt(dayC) +'天后'
  }
  else if(hourC >= 1){
	return parseInt(hourC) +"小时后"
  }
  else if(minC >= 1){
	return parseInt(minC) +"分钟后"
  }else {
	return "1分钟后"
  }
}

// 获取地址栏参数
export function getUrlParms(name) {
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}


// 存储localStorage
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

// 获取localStorage
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

//  删除localStorage
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

// token
export function checkToken (url) {
	let wsCache = new webStorageCache()
	//获取token
	global.token = wsCache.get('token')
	let urlObj = urls.parse(url)
	let pageUrl = urlObj.protocol + '//' + urlObj.host + '/' + urlObj.hash

	//如果token失效则重新获取
	setTimeout(() => {
	   window.location.reload()
	}, 60 *60 * 1000 * 2 )
	if (!global.token && !getUrlParms('token')) {
		window.onload = function () {
			window.location.href = global.serverHost + '/wechat/getUserInfo?url_befor_login=' + encodeURIComponent(url)
		}
	// 保存失效为两小时
	}else if (url != pageUrl && url != global.serverHost + '/newCart/pay/#/goods/payment/') {
		window.location.href = pageUrl
	}
	if (getUrlParms('token')) {
		wsCache.set('token', getUrlParms('token'), { exp : 60 * 60 * 2 } )
	}
}
