<template>
	<div class="mine" v-if="userInfo.token">
		<!--顶部标题-->
		<van-nav-bar
				title="个人中心"
				:border="false"
				fixed
		></van-nav-bar>
		<!--头像和昵称-->
		<van-cell-group>
			<van-cell
					style="background: #2EB257;color:#fff;margin-top: 2.5rem"
					@click="$router.push('/dashboard/mine/userCenter')">
				<!-- 使用 title 插槽来自定义标题 -->
				<template slot="title">
					<div class="personInfo">
						<img src="./images/touxiang.jpg" alt="">
						<div class="nameNum">
							<div class="name">鱼缸飞行计划</div>
							<div class="number">605080754</div>
						</div>
					</div>
				</template>
			</van-cell>
		</van-cell-group>
		<!--查看所有订单-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="我的订单" icon="label" value="查看所有订单" is-link/>
			<van-grid>
				<van-grid-item
						:icon="order.icon"
						:text="order.text"
						v-for="(order,index) of orderList"
						:key="index"
				/>
			</van-grid>
		</van-cell-group>
		<!--我的优惠券-->
		<van-cell-group style="margin-top:0.3rem">
			<van-cell title="我的优惠券" icon="gem" value="3张" is-link/>
			<van-cell title="我的收货地址" icon="location" value="" is-link/>
		</van-cell-group>
		<!--联系客服-->
		<van-cell-group style="margin-top:0.3rem">
			<van-cell title="联系客服" icon="phone" value="客服时间：09:00-22:30" is-link/>
			<van-cell title="意见反馈" icon="comment" value="" is-link/>
		</van-cell-group>
		<!--下载app-->
		<van-cell-group style="margin-top:0.3rem">
			<van-cell title="小赖买菜" icon="like" value="下载APP体验更佳" is-link/>
		</van-cell-group>
		<!--过渡跳转路由组件-->
		<transition model="out-in" name="router-slider">
			<router-view></router-view>
		</transition>
	</div>
	<select-login v-else></select-login>
</template>

<script>
	import SelectLogin from "../login/SelectLogin";
	import{ mapState } from 'vuex'
	export default {
		name: 'Mine',
		data() {
			return {
				orderList:[
					{icon:"balance-o",text:"待支付"},
					{icon:"gift-card-o",text:"待收货"},
					{icon:"more-o",text:"待评价"},
					{icon:"manager-o",text:"售后/退款"}
				]
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		components:{
			SelectLogin
		}
	}
</script>

<style lang="less" scoped>
	.mine {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	.van-nav-bar {
		background: #2EB257;
	}

	.van-nav-bar__title {
		color: #fff;
	}

	.personInfo img {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		border: 0.1rem solid #fff;
	}

	.personInfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.personInfo .nameNum {
		display: flex;
		flex-direction: column;
		margin-left: 3rem;
	}
	.van-cell__left-icon{
		color: orange;
		font-size: 1rem;
	}
	/*路由过渡动画*/
	.router-slider-enter-active, .router-slider-leave-active {
		transition: all 0.5s;
	}

	.router-slider-enter, .router-slider-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>