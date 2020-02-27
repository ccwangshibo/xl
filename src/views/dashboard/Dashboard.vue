<template>
	<div id="dashboard">
		<van-tabbar v-model="active" active-color="#75a342">
			<van-tabbar-item replace to="/dashboard/home">
				<span>主页</span>
				<img
						slot="icon"
						slot-scope="props"
						:src="props.active ? home_icon.active : home_icon.inactive"
				>
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/category">
				<span>分类</span>
				<img
						slot="icon"
						slot-scope="props"
						:src="props.active ? category_icon.active : category_icon.inactive"
				>
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/cart" :info="goodsNum>0?goodsNum:''">
				<span>购物车</span>
				<img
						slot="icon"
						slot-scope="props"
						:src="props.active ? cart_icon.active : cart_icon.inactive"
				>
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/mine">
				<span>个人中心</span>
				<img
						slot="icon"
						slot-scope="props"
						:src="props.active ? mine_icon.active : mine_icon.inactive"
				>
			</van-tabbar-item>
		</van-tabbar>
		<!--判断当前路由路线是否有keepAlive属性并决定是否使用keep-alive路由-->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import {mapState, mapMutations, mapActions} from 'vuex';
	import {getGoodsCart} from "../../service/api";
	import {setStorage} from "../../config/global";

	export default {
		name: 'Dashboard',
		data() {
			return {
				active: parseInt(sessionStorage.getItem('tabBarItemIndex')) || 0,
				home_icon: {
					active: require('@/images/tabbar/home_selected.png'),
					inactive: require('@/images/tabbar/home_default.png')
				},
				category_icon: {
					active: require('@/images/tabbar/category_selected.png'),
					inactive: require('@/images/tabbar/category_default.png')
				},
				cart_icon: {
					active: require('@/images/tabbar/shoppingcart_selected.png'),
					inactive: require('@/images/tabbar/shoppingcart_default.png')
				},
				mine_icon: {
					active: require('@/images/tabbar/mine_selected.png'),
					inactive: require('@/images/tabbar/mine_default.png')
				},
			}
		},
		watch: {
			active(val) {
				// 设置当前tabBar索引缓存到本地
				sessionStorage.setItem('tabBarItemIndex', val)
			}
		},
		computed: {
			...mapState(['shopCart', 'userInfo']),
			goodsNum() {
				// shopCart数量不为空
				if (this.shopCart) {
					let num = 0;
					// 取对象的值Object.values()
					// 取对象的键Object.keys()
					Object.values(this.shopCart).forEach((goods, index) => {
						num += goods.num;
					})
					return num;
				} else {
					return 0;
				}
			}
		},
		mounted() {
			// 0.自动登录
			this.reqUserInfo();
			// 1. 挂载完成时触发初始化购物车
			this.initShopCart();
		},
		methods: {
			...mapMutations(['INIT_SHOP_CART']),
			...mapActions(['reqUserInfo']),
			// 1.加载购物车数据
			async initShopCart() {
				// 1.1判断用户是否登录
				if (this.userInfo.token) {
					// 1.2登录发起同步购物车的数据请求
					let result = await getGoodsCart(this.userInfo.token);
					if (result.success_code === 200) {
						let cartArr = result.data;
						let shopCart = {};
						// 1.3遍历将数组转为对象
						cartArr.forEach((value) => {
							shopCart[value.goods_id] = {
								"num": value.num,
								"id": value.goods_id,
								"name": value.good_name,
								"small_image": value.small_image,
								"price": value.goods_price,
								"checked": true
							}
						});
						// 1.4数据同步到本地
						setStorage('shopCart',shopCart)
						// 1.5调用vuex初始化购物车
						this.INIT_SHOP_CART()
					}
				}
			}
		},
	}
</script>

<style lang="less" scoped>
</style>