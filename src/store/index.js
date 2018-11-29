import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/http'

Vue.use(Vuex)

const GET_CART_LENGTH = 'GET_CART_LENGTH'
const SAVE_USER_INFO = 'SAVE_USER_INFO'
const UPDATE_DIALOG_STATUS = 'UPDATE_DIALOG_STATUS'
const SAVE_PURCHASE_GOODS = 'SAVE_PURCHASE_GOODS'

const state = {
	cartLen: 0,
	userInfo: null,
	isShowDialog: false,
	isFollower: true,
	purchaseGoods: [] //进货商品
}


const actions = {
	getCartLen ({commit}) {
		commit(GET_CART_LENGTH)
	},
	saveUserInfo ({commit}, data) {
		console.log(data)
		commit(SAVE_USER_INFO, data)
	},
	updateDialogStatus ({commit}, data) {
		commit(UPDATE_DIALOG_STATUS, data)
	},
	savePurchaseGoods ({commit}, data) {
		commit(SAVE_PURCHASE_GOODS, data)
	}
}

const mutations = {
	[SAVE_PURCHASE_GOODS] (state, data) {
		state.purchaseGoods = data.filter(n => n.quantity > 0)
	},
	[GET_CART_LENGTH] (state) {
		http.get('/cart', { isHideLoad: true }, false, res => {
  		if (res.status == 1) {
  			let cartList = res.data.goods;
        let arr = [];
        for (let i in cartList) {
          cartList[i].id = i
          cartList[i].checked = true
          arr.push(cartList[i])
        }
        state.cartLen = arr.length
  		}
  	})
	},
	[SAVE_USER_INFO] (state, data) {
		state.userInfo = data
	},
	[UPDATE_DIALOG_STATUS] (state, payload) {
		state.isShowDialog = payload.isShowDialog
	}
}

const getters = {
	cartLen: state => {
		return state.cartLen
	},
	userInfo: state => {
		return state.userInfo
	},
	isShowDialog: state => {
		return state.isShowDialog
	},
	purchaseGoods: state => {
		return state.purchaseGoods
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
