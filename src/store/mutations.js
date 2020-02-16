import {Add_GOODS} from './mutations-type'

export default {
	// 1.往购物车中添加数据
	[Add_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}){
		let shopCart=state.shopCart;
		// 1.1判断商品是否存在
		if(shopCart[goodsId]){ //商品存在,数量加1
			shopCart[goodsId]['num']++;
		}else{ //不存在,创建新对象
			shopCart[goodsId]={
				"num":1,
				"id":goodsId,
				"name":goodsName,
				"small_image":smallImage,
				"price":goodsPrice,
				"isChecked":true
			}
		}
		// 2.返回新对象
		state.shopCart={...shopCart}
	}
}