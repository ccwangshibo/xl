import {
	ADD_GOODS,
	INIT_SHOP_CART,
	REDUCE_GOODS,
	SELECT_SINGLE_GOODS,
	SELECT_ALL_GOODS,
	CLEAR_CART,
	USER_INFO,
	INIT_USER_INFO,
	RESET_USER_INFO
} from './mutations-type'

import Vue from 'vue'
import {setStorage, getStorage, removeStorage} from "../config/global";

export default {
	// 1.往购物车中添加数据
	[ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}) {
		let shopCart = state.shopCart;
		// 1.1判断商品是否存在
		if (shopCart[goodsId]) { //商品存在,数量加1
			shopCart[goodsId]['num']++;
		} else { //不存在,创建新对象
			shopCart[goodsId] = {
				"num": 1,
				"id": goodsId,
				"name": goodsName,
				"small_image": smallImage,
				"price": goodsPrice,
				"checked": true
			}
		}
		// 1.2返回新对象(对象解构形式)
		state.shopCart = {...shopCart};
		// 1.3添加数据到本地
		setStorage('shopCart', state.shopCart)
	},
	// 2.初始化购物车
	[INIT_SHOP_CART](state) {
		// 2.1获取本地存储的购物车数据
		let initCart = getStorage('shopCart');
		// 2.2如果本地数据存在, 转为对象赋值给shopCart
		if (initCart) {
			state.shopCart = JSON.parse(initCart)
		}
	},
	// 3.移出购物车数据
	[REDUCE_GOODS](state, {goodsId}) {
		let shopCart = state.shopCart;
		let goods = shopCart[goodsId];
		// 3.1判断商品数量
		if (goods['num'] > 1) {
			goods['num']--
		} else {
			delete shopCart[goodsId];
		}
		// 3.2更新数据
		state.shopCart = {...shopCart};
		// 3.3数据添加到本地
		setStorage('shopCart', state.shopCart)
	},
	// 4.单个商品的选中状态改变
	[SELECT_SINGLE_GOODS](state, {goodsId}) {
		let shopCart = state.shopCart;
		let goods = shopCart[goodsId];
		// 4.1如果被选中, 取反
		if (goods.checked) {
			goods.checked = !goods.checked;
		} else {
			// 设置属性为true
			Vue.set(goods, "checked", true);
		}
		// 4.2更新数据
		state.shopCart = {...shopCart};
		// 4.3数据添加到本地
		setStorage('shopCart', state.shopCart)
	},
	// 5.全选和取消全选
	[SELECT_ALL_GOODS](state, {isSelected}) {
		let shopCart = state.shopCart;
		// 5.1遍历购物车对象的值取反
		Object.values(shopCart).forEach((goods, index) => {
			goods.checked = !isSelected;
		});
		// 5.2更新数据
		state.shopCart = {...shopCart};
		// 5.3数据添加到本地
		setStorage('shopCart', state.shopCart)
	},
	// 6.清空购物车
	[CLEAR_CART](state) {
		let shopCart = null;
		state.shopCart = {...shopCart};
		setStorage('shopCart', state.shopCart)
	},
	// 7.保存用户信息到本地
	[USER_INFO](state, {userInfo}) {
		state.userInfo = userInfo;
		setStorage('userInfo', state.userInfo)
	},
	// 8.获取用户信息
	[INIT_USER_INFO](state) {
		let userInfo = getStorage('userInfo');
		// 如果用户信息存在, 字符串解析成对象
		if (userInfo) {
			state.userInfo = JSON.parse(userInfo);
		}
	},
	// 9.退出登录
	[RESET_USER_INFO](state){
		state.userInfo={};
		removeStorage('userInfo');
	}

}