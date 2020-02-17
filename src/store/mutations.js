import {Add_GOODS, INIT_SHOP_CART} from './mutations-type'

import {setStorage, getStorage} from "../config/global";

export default {
	// 1.往购物车中添加数据
	[Add_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}) {
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
				"isChecked": true
			}
		}
		// 1.2返回新对象
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
	}
}