<template>
	<div class="myOrder">
		<!--导航条-->
		<van-nav-bar
				title="我的订单"
				left-text="返回"
				left-arrow
				fixed
				@click-left="$router.back()"
		></van-nav-bar>
		<!--选项卡-->
		<van-tabs v-model="active" class="orderDetails" color="#2eb257" @click="dealWithTabClick">
			<van-tab title="全部订单">
				<van-card
						v-for="(allOrderItem, i) of allOrderArr"
						:key="i"
						:num="allOrderItem.cart_shop[0].n"
						:price="(allOrderItem.shop_price/100).toFixed(2)"
						:title="`订单状态:  ${allOrderItem.order_status==='pay'?'待收货':'未支付'}`"
						:desc="`原定送达时间:  ${allOrderItem.arrive_time}`"
						thumb="https://img.ddimg.mobi/product/4513b9fc5935f1548406258985.jpg!deliver.product.list"
				/>
			</van-tab>
			<van-tab title="未支付">
				<van-card
						v-for="(willOrderItem, i) of willOrderArr"
						:key="i"
						:num="willOrderItem.cart_shop[0].n"
						:price="(willOrderItem.shop_price/100).toFixed(2)"
						:title="'未支付'"
						:desc="`原定送达时间:  ${willOrderItem.arrive_time}`"
						thumb="https://img.ddimg.mobi/product/4513b9fc5935f1548406258985.jpg!deliver.product.list"
				/>
			</van-tab>
			<van-tab title="待收货">
				<van-card
						v-for="(payOrderItem, i) of payOrderArr"
						:key="i"
						:num="payOrderItem.cart_shop[0].n"
						:price="(payOrderItem.shop_price/100).toFixed(2)"
						:title="'待收货'"
						:desc="`原定送达时间:  ${payOrderItem.arrive_time}`"
						thumb="https://img.ddimg.mobi/product/4513b9fc5935f1548406258985.jpg!deliver.product.list"
				/>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import {getOrder} from "../../../service/api";

	import {mapState} from 'vuex';

	import {Toast} from 'vant';

	export default {
		name: "MyOrder",
		data() {
			return {
				active: 0,
				allOrderArr:[], // 所有订单
				willOrderArr:[], // 未支付订单
				payOrderArr:[], // 已支付待收货
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods:{
			// 1.查询所有订单
			async initOrder() {
				let result = await getOrder(this.userInfo.token);
				if(result.success_code===200){
					this.allOrderArr=result.data;
				}else{
					Toast({
						message:"订单查询失败!",
						duration:1000
					})
				}
			},
			// 2.切换tab
			async dealWithTabClick(){
				if(this.active===0){
					return;
				}else if(this.active===1){
					this.willOrderArr=await this.getTabOrder('will');
				}else if(this.active===2){
					this.payOrderArr=await this.getTabOrder('pay');
				}
			},
			// 3.发送请求
			async getTabOrder(status){
				let result=await getOrder(this.userInfo.token,status);
				if(result.success_code===200){
					console.log(result.data)
					return result.data;
				}else{
					Toast({
						message:"查询失败",
						duration:1000
					})
				}
			}
		},
		mounted() {
			this.initOrder();
		},
		components:{

		}
	}
</script>

<style lang="less" scoped>
	.myOrder {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background-color: #f5f5f5;
	}

	.orderDetails {
		margin-top: 3rem;
		background: #fff;
		width: 100%;
		height: 100%;
	}
</style>