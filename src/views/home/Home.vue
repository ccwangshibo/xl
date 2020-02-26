<template>
	<div id="home">
		<div v-if="!showLoading">
			<!--头部导航-->
			<Header></Header>
			<!--轮播图-->
			<Swiper :swiper_list="swiper_list"></Swiper>
			<!--中间nav分类导航-->
			<Nav :nav_list="nav_list"></Nav>
			<!--限时抢购-->
			<FlashSale :flash_sale_product_list="flash_sale_product_list"></FlashSale>
			<!--猜你喜欢-->
			<YouLike :you_like_product_list="you_like_product_list"></YouLike>
			<!--回到顶部-->
			<MarkPage v-show="showBackStatus" :scrollToTop="scrollToTop"></MarkPage>
		</div>
		<van-loading v-else type="spinner" color="#75a342"
								 style="position:absolute;left:50%;top:40%;transform:translate(-50%);">小赖正在拼命加载中...
		</van-loading>
	</div>
</template>

<script>
	// 组件
	import Header from './components/header/Header';
	import Swiper from './components/swiper/Swiper';
	import Nav from './components/nav/Nav';
	import FlashSale from "./components/flashsale/FlashSale";
	import YouLike from "./components/youLike/YouLike";
	import MarkPage from "./components/markPage/MarkPage";

	// 全局函数
	import {showBack, animate} from "../../config/global";
	// 数据请求函数
	import {getHomeData, addGoodsToCart} from './../../service/api/index'
	// 引入通知插件
	import PubSub from 'pubsub-js'
	// 引入vant组件消息提示
	import {Toast} from 'vant'
	// 引入Vuex
	import {mapMutations, mapState} from 'vuex'
	import {Add_GOODS} from "../../store/mutations-type";

	export default {
		name: 'Home',
		data() {
			return {
				// 首页轮播图数据
				swiper_list: [],
				// nav导航数据
				nav_list: [],
				// 限时抢购数据
				flash_sale_product_list: [],
				// 猜你喜欢数据
				you_like_product_list: [],
				// 是否显示加载过程
				showLoading: true,
				// 是否显示返回顶部
				showBackStatus: false
			}
		},
		components: {
			Header,
			Swiper,
			Nav,
			FlashSale,
			YouLike,
			MarkPage
		},
		mounted() {
			// 1.消息订阅, 添加到购物车
			PubSub.subscribe('homeAddToCart', (msg, goods) => {
				if (msg === 'homeAddToCart') {
					// 1.1判断用户是否登录
					if (this.userInfo.token) {
						// 1.2调用处理添加购物车的函数
						this.dealGoodsAdd(goods);
					} else {
						// 1.3未登录 直接跳转到登录界面
						this.$router.push('/login');
					}
				}
			})
		},
		created() {
			// async实现接收请求
			this.reqData()
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			// vuex方式
			...mapMutations(['ADD_GOODS']),
			// 请求数据
			async reqData() {
				let res = await getHomeData();
				if (res.success) {
					// 轮播图数据
					this.swiper_list = res.data.list[0].icon_list;
					// nav导航数据
					this.nav_list = res.data.list[2].icon_list;
					// 限时抢购数据
					this.flash_sale_product_list = res.data.list[3].product_list;
					// 猜你喜欢数据
					this.you_like_product_list = res.data.list[12].product_list;

					// 数据请求完成,隐藏加载页面
					this.showLoading = false;

					// 执行判断是否显示回到顶部函数
					showBack((status) => {
						this.showBackStatus = status;
					})
				}
			},
			// 缓动动画滚回顶部
			scrollToTop() {
				let docB = document.documentElement || document.body;
				animate(docB, {scrollTop: '0'}, 800, 'ease-out');
			},
			// 处理添加购物车
			async dealGoodsAdd(goods){
				let result = await addGoodsToCart(this.userInfo.token,goods.id,goods.name,goods.price,goods.small_image);
				console.log(result);
				// 服务器增加成功 ,再添加到本地
				if(result.success_code === 200){
					this.ADD_GOODS({
						goodsId: goods.id,
						goodsName: goods.name,
						smallImage: goods.small_image,
						goodsPrice: goods.price
					});
					// 添加成功提示
					Toast({
						message: "商品成功加入购物车!",
						duration: 1000
					})
				}
			}
		},
		beforeDestroy() {
			PubSub.unsubscribe('homeAddToCart')
		}
	}
</script>

<style lang="less" scoped>
	#home {
		width: 100%;
		height: 300rem;
		background-color: #f5f5f5;
	}
</style>