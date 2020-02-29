<template>
	<div class="orderDetail">
		<!--导航条-->
		<van-nav-bar
				title="订单详情"
				left-text="返回"
				left-arrow
				fixed
				@click-left="onClickLeft"
		></van-nav-bar>
		<!--商品详情-->
		<van-cell-group style="margin-top: 3rem">
			<van-cell title="商品总数" :value="`共${$route.query.payCount}件`"/>
			<van-card
					v-for="(goods, i) of payGoods"
					:key="i"
					:num="goods.num"
					:price="goods.price"
					:title="goods.name"
					:thumb="goods.small_image"
			></van-card>
		</van-cell-group>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: "OrderDetail",
		data() {
			return {}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			}
		},
		computed: {
			...mapState(['shopCart']),
			// 结算商品详情
			payGoods() {
				let goodsArr = [];
				Object.values(this.shopCart).forEach((goods, index) => {
					if (goods.checked) {
						goodsArr.push(goods);
					}
				});
				return goodsArr;
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderDetail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
		z-index: 100;
	}
</style>