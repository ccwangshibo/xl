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
		<!--送达时间-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="送达时间" value="请选择送达时间" is-link/>
			<van-cell value="共3件" is-link center>
				<!-- 使用 title 插槽来自定义标题 -->
				<template slot="title">
					<img src="./images/detail1.jpg" alt="" style="width: 3rem">
					<img src="./images/detail1.jpg" alt="" style="width: 3rem">
					<img src="./images/detail1.jpg" alt="" style="width: 3rem">
				</template>
			</van-cell>
		</van-cell-group>
		<!--支付方式-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="支付方式" value="支付宝"/>
		</van-cell-group>
		<!--备注-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="备注信息">
				<input type="text" placeholder="选填，请备注您的需求">
			</van-cell>
		</van-cell-group>
		<!--价格和配送费-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="商品金额" value="99.99"/>
			<van-cell title="配送费" value="0.00"/>
		</van-cell-group>
		<!--提交订单-->
		<van-submit-bar
				:price="3050"
				button-text="提交订单"
				@submit="onSubmit"
				label="实付："
		/>
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
			},
			onSubmit(){

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