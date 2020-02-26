<template>
	<div class="userCenter">
		<!--导航条-->
		<van-nav-bar
				title="用户中心"
				left-text="返回"
				left-arrow
				fixed
				@click-left="$router.back()"
		></van-nav-bar>
		<div class="logout">
			<button @click="logout">退出登录</button>
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';

	import {getLogout} from "../../../service/api";

	import {Toast} from 'vant';

	export default {
		name: "UserCenter",
		methods:{
			...mapMutations(['RESET_USER_INFO','CLEAR_CART']),
			async logout(){
				// 服务器端退出登录
				let result = await getLogout();
				if(result.success_code === 200){
					// 本地删除用户信息
					this.RESET_USER_INFO();
					// 本地删除购物车数据
					this.CLEAR_CART();
					Toast({
						message:"退出成功!",
						duration:500
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.userCenter{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background-color: #f5f5f5;
	}
	.logout{
		height: 2.5rem;
		margin-top: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
	}
	.logout button{
		background-color: transparent;
	}
</style>