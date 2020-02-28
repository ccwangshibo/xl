<template>
	<div id="cart" v-if="userInfo.token">
		<!--标题栏-->
		<div class="titleWrapper">
			<div class="title">购物车</div>
			<button class="clearCart" @click="clearCart">清空购物车</button>
		</div>
		<div class="contentWrapper">
			<!--商品界面-->
			<div class="productWrapper" v-for="(product,i) of shopCart" :key="i">
				<div class="left">
					<a href="#" class="cartCheckbox" :checked="product.checked"
						 @click.stop="singleProductSelected(product.id)"></a>
				</div>
				<div class="center">
					<img :src="product.small_image" alt="">
				</div>
				<div class="right">
					<div class="productName">{{product.name}}</div>
					<div class="productControl">
						<div class="productPrice">{{product.price|moneyFormat}}</div>
						<div class="changeCount">
							<span @click="removeOutCart(product.id,product.num)">-</span>
							<input type="number" v-model="product.num" disabled>
							<span @click="addToCart(product.id,product.name,product.small_image,product.price)">+</span>
						</div>
					</div>
				</div>
			</div>
			<!--底部-->
			<div class="footer">
				<div class="footerLeft">
					<a href="#" class="cartCheckbox" :checked="isSelectedAll" @click.stop="allSelected(isSelectedAll)"></a>
					<span>全选</span>
					<div class="totalPrice">
						合计:&nbsp;<span class="price">{{totalPrice|moneyFormat}}</span>
					</div>
				</div>
				<div class="footerRight">
					<button class="pay" @click="$router.push('/confirmOrder')">去结算({{payCount}})</button>
				</div>
			</div>
		</div>
	</div>
	<select-login v-else></select-login>
</template>

<script>
	import SelectLogin from "../login/SelectLogin";

	import {Dialog, Toast} from 'vant';
	import {mapState, mapMutations} from 'vuex';

	import {changeCartNum, clearAllCart, allGoodsSelect, singleGoodsSelect} from "../../service/api";

	export default {
		name: 'Cart',
		data() {
			return {}
		},
		methods: {
			...mapMutations([
				'REDUCE_GOODS',
				'ADD_GOODS',
				'SELECT_SINGLE_GOODS',
				'SELECT_ALL_GOODS',
				'CLEAR_CART'
			]),
			// 1.移出购物车功能
			async removeOutCart(goodsId, goodsNum) {
				if (goodsNum > 1) {
					// 发送服务器请求
					let result = await changeCartNum(this.userInfo.token, goodsId, 'reduce');
					if (result.success_code === 200) {
						// 调用vuex中的移出购物车
						this.REDUCE_GOODS({goodsId});
					}
				} else {
					Dialog.confirm({
						title: '温馨提示',
						message: '确认将商品移出购物车?'
					}).then(async () => {
						// 发送服务器请求
						let result = await changeCartNum(this.userInfo.token, goodsId, 'reduce');
						console.log(result);
						if (result.success_code === 200) {
							this.REDUCE_GOODS({goodsId});
						}
					}).catch(() => {
						// on cancel
					});
				}
			},
			// 2.添加购物车
			async addToCart(goodsId, goodsName, smallImage, goodsPrice) {
				let result = await changeCartNum(this.userInfo.token, goodsId, 'add');
				if (result.success_code === 200) {
					// 本地添加
					this.ADD_GOODS({goodsId, goodsName, smallImage, goodsPrice});
				}
			},
			// 3.改变单个商品的选中状态
			async singleProductSelected(goodsId) {
				let result = await singleGoodsSelect(this.userInfo.token, goodsId);
				if (result.success_code === 200) {
					this.SELECT_SINGLE_GOODS({goodsId});
				}
			},
			// 4.全选和取消全选
			async allSelected(isSelected) {
				let result = await allGoodsSelect(this.userInfo.token, isSelected);
				if (result.success_code === 200) {
					this.SELECT_ALL_GOODS({isSelected});
				}
			},
			// 5.清空购物车
			clearCart() {
				Dialog.confirm({
					title: "温馨提示",
					message: "确定要清空购物车吗?"
				}).then(async () => {
					let result = await clearAllCart(this.userInfo.token);
					if (result.success_code === 200) {
						this.CLEAR_CART();
						Toast({
							message: "购物车已清空",
							duration: 1000
						})
					}
				}).catch(() => {
					// nothing to do
				})
			}
		},
		computed: {
			// 购物车和用户数据
			...mapState(['shopCart', 'userInfo']),
			// 0.计算结算商品数量(选中的商品)
			payCount() {
				let selectedGoodsCount = 0;
				Object.values(this.shopCart).forEach((goods, index) => {
					if (goods.checked) {
						selectedGoodsCount += 1
					}
				})
				return selectedGoodsCount
			},
			// 1.判断是否全选(全选按钮,与vuex无关)
			isSelectedAll() {
				// 判断当前结算商品数量是否为0
				let tag = this.payCount > 0;
				// 遍历购物车中的数据
				Object.values(this.shopCart).forEach((goods, index) => {
					if (!goods.checked) {
						tag = false
					}
				})
				return tag;
			},
			// 2.计算购物车中商品的总价
			totalPrice() {
				let selectedGoodsPrice = 0;
				// 2.1遍历购物车中的数据
				Object.values(this.shopCart).forEach((goods, index) => {
					if (goods.checked) {
						// 2.2如果选中就累加
						selectedGoodsPrice += goods.num * goods.price
					}
				})
				return selectedGoodsPrice;
			}
		},
		components: {
			SelectLogin
		}
	}
</script>

<style lang="less" scoped>
	.cart {
		background: #ccc;
	}

	.titleWrapper {
		height: 3rem;
		width: 100%;
		background: #ffffff;
		overflow: hidden;
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.title {
		height: 3rem;
		line-height: 3rem;
		font-weight: bold;
	}

	.clearCart {
		position: absolute;
		height: 3rem;
		line-height: 3rem;
		padding: 0 1rem;
		font-size: 0.75rem;
		background: #ffffff;
		color: #FE3824;
		right: 0;
		top: 0;
	}

	.contentWrapper {
		width: 100%;
		height: auto;
		position: absolute;
		top: 3rem;
		bottom: 5.875rem;
		overflow: auto;
		padding-bottom: 0.125rem;
	}

	.productWrapper {
		display: flex;
		margin-top: 0.125rem;
		background: #ffffff;
	}

	.left {
		width: 10%;
		height: 6rem;
		display: flex;
		padding-top: 2.25rem;
	}

	.center {
		width: 30%;
	}

	.center img {
		width: 6rem;
		height: 6rem;
		display: block;
	}

	.right {
		width: 60%;
		padding-left: 0.25rem;
	}

	.productName {
		margin-top: 0.25rem;
		padding-right: 0.5rem;
		width: 100%;
		height: 2rem;
		overflow: hidden;
		line-height: 1rem;
		font-size: 0.875rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.productControl {
		font-size: 0.875rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		margin-top: 2rem;
	}

	.productPrice {
		width: 50%;
	}

	.changeCount {
		display: flex;
		width: 50%;
		text-align: center;
	}

	.changeCount input {
		width: 2rem;
		text-align: center;
	}

	.changeCount span {
		width: 1.5rem;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		width: 100%;
		background: #ffffff;
		position: fixed;
		bottom: 2.875rem;
	}

	.footerLeft {
		width: 75%;
		display: flex;
		align-items: center;
	}

	.cartCheckbox {
		background: url("./images/shop-icon.png") no-repeat;
		background-size: 2.5rem 5rem;
		width: 1rem;
		height: 1rem;
		margin-left: 1rem;
	}

	.cartCheckbox[checked] {
		background-position: -1.2rem 0;
	}

	.totalPrice {
		margin-left: 2rem;
	}

	.price {
		color: #FE3824;
	}

	.footerRight {
		width: 25%;
		padding: 0.5rem 0;
	}

	.footerRight .pay {
		height: 2rem;
		width: 90%;
		border-radius: 1rem;
		font-size: 0.75rem;
		background: #FE3824;
		color: #ffffff;
	}
</style>