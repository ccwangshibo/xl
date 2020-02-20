<template>
	<div class="order">
		<!--导航条-->
		<van-nav-bar
				title="订单确认"
				left-text="返回"
				left-arrow
				fixed
				@click-left="onClickLeft"
		></van-nav-bar>
		<!--添加地址-->
		<van-contact-card
				type="add"
				add-text="选择收货地址"
				@click="chooseAddress"
				style="margin-top: 3rem"
		></van-contact-card>
		<!--过渡跳转路由组件-->
		<transition model="out-in" name="router-slider">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "Order",
		methods: {
			onClickLeft() {
				this.$router.back()
			},
			// 选择地址
			chooseAddress() {
				this.$router.push('/confirmOrder/myAddress')
			}
		}
	}
</script>

<style lang="less" scoped>
	.order {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	/*.van-nav-bar__text{*/
	/*	color: #75a342;*/
	/*}*/
	.router-slider-enter-active, .router-slider-leave-active {
		transition: all 0.5s;
	}

	.router-slider-enter, .router-slider-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>