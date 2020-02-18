<template>
	<div class="category">
		<!--header搜索页面-->
		<Header></Header>
		<!--分类界面-->
		<div class="listWrapper" v-if="!showLoading">
			<!--左侧目录-->
			<div class="leftWrapper">
				<ul class="wrapper">
					<li class="categoryItem"
							v-for="(category,i) of categories"
							:key="i"
							:class="{selected:currentIndex===i}"
							@click="clickLeftLi(i)"
							ref="menuList"
					>
						<span class="textWrapper">{{category.name}}</span>
					</li>
				</ul>
			</div>
			<!--右侧详情-->
			<ContentView :categoriesDetail="categoriesDetail"></ContentView>
		</div>
		<!--加载动画-->
		<van-loading
				v-else type="spinner" color="#75a342" style="position:absolute;left:50%;top:40%;transform:translate(-50%);"
		>
			小赖正在拼命加载中...
		</van-loading>
	</div>
</template>

<script>
	import Header from "./components/Header";
	import ContentView from "./components/ContentView";

	// BScroll组件
	import BScroll from 'better-scroll'
	// 引入请求数据接口
	import {getCategories, getCategoriesDetail} from "../../service/api";

	// 引入通知插件
	import PubSub from 'pubsub-js'
	// 引入vant组件消息提示
	import {Toast} from 'vant'
	// 引入Vuex
	import {mapMutations} from 'vuex'
	import {Add_GOODS} from "../../store/mutations-type";

	export default {
		name: 'Category',
		data() {
			return {
				// 加载动画的显示与隐藏
				showLoading: true,
				// 左边分类目录
				categories: [],
				// 右边分类详情
				categoriesDetail: [],
				// 左侧分类列表当前li标签索引
				currentIndex: 0
			}
		},
		props: {},
		components: {
			Header,
			ContentView
		},
		created() {
			//获取分类数据
			this.initData()
		},
		mounted() {
			// 消息订阅, 添加到购物车
			PubSub.subscribe('categoryAddToCart', (msg, goods) => {
				if (msg === 'categoryAddToCart') {
					this.ADD_GOODS({
						goodsId: goods.id,
						goodsName: goods.name,
						smallImage: goods.small_image,
						goodsPrice: goods.price
					});
				}
				// 添加成功提示
				Toast({
					message: "商品成功加入购物车!",
					duration: 1000
				})
			})
		},
		methods: {
			// 一.发送异步请求获取分类数据
			async initData() {
				// 1.获取左边分类目录数据
				let leftRes = await getCategories();
				// console.log(leftRes);
				if (leftRes.success) {
					this.categories = leftRes.data.cate;
				}
				;
				// 2.获取右侧分类详情数据
				let rightRes = await getCategoriesDetail('/lk001')
				// console.log(rightRes);
				if (rightRes.success) {
					this.categoriesDetail = rightRes.data.cate;
				}
				// 3.隐藏加载动画界面
				this.showLoading = false;
				// 4.初始化滚动框架
				this.$nextTick(() => {
					this.leftScroll = new BScroll('.leftWrapper', {probeType: 3})
				})
			},
			// 二.处理左侧点击事件
			async clickLeftLi(i) {
				// 1.当前index赋值给动态class绑定selected
				this.currentIndex = i;
				// 2.获取当前点击元素
				let el = this.$refs.menuList[i];
				// 3.滚动到当前点击元素
				this.leftScroll.scrollToElement(el, 400);
				// 4.发送右侧详情页面数据请求
				// let rightRes=await getCategoriesDetail('/lk001');
				// console.log(rightRes);
				// if(rightRes.success){
				// 	this.categoriesDetail=rightRes.data.cate;
				// }
			},
			// 三.vuex
			...mapMutations(['ADD_GOODS'])
		},
	}
</script>

<style lang="less" scoped>
	.category {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #f5f5f5;
	}

	.listWrapper {
		position: absolute;
		display: flex;
		top: 3rem;
		bottom: 3rem;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.leftWrapper {
		background: #f4f4f4;
		flex: 0 0 5rem;
	}

	.wrapper {
		overflow-y: auto;
	}

	.categoryItem {
		padding: 0.75rem 0;
		border-bottom: 1px solid #e8e8e8;
	}

	.categoryItem .textWrapper {
		font-size: 0.875rem;
		line-height: 1.25rem;
		border-left: 0.125rem solid transparent;
		padding: 0 0.5rem;
		color: #666666;
	}

	.categoryItem.selected {
		background: #ffffff;
	}

	.categoryItem.selected .textWrapper {
		border-left-color: #3cb963;
		font-weight: bold;
		color: #333333;
	}

	@media (min-width: 960px) {
		.wrapper {
			border-right: 1px solid #E8E9E8;
		}

		.wrapper .categoryItem {
			background: #fff;
		}
	}
</style>