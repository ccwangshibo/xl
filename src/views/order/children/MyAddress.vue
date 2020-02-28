<template>
	<div class="myAddress">
		<!--导航条-->
		<van-nav-bar
				title="选择地址"
				left-text="返回"
				left-arrow
				fixed
				@click-left="onClickLeft"
		></van-nav-bar>
		<!--地址列表-->
		<van-address-list
				style="margin-top: 3rem"
				v-model="chosenAddressId"
				:list="list"
				@add="onAdd"
				@edit="onEdit"
				@select="onBackAddress"
		></van-address-list>
		<!--过渡跳转路由组件-->
		<transition model="out-in" name="router-slider">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import {Toast} from 'vant';

	import {getUserAddress} from "../../../service/api";

	import {mapState} from 'vuex';

	import PubSub from 'pubsub-js';


	export default {
		name: "MyAddress",
		data() {
			return {
				chosenAddressId: '1',
				list: []
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			},
			onAdd() {
				// Toast('新增地址');
				this.$router.push('/confirmOrder/myAddress/addAddress')
			},
			onEdit(item, index) {
				// Toast('编辑地址:' + index);
				this.$router.push('/confirmOrder/myAddress/editAddress?address_id='+item.address_id);
			},
			// 1获取当前用户地址
			async initUserAddress() {
				// 1.1判断登录
				if (this.userInfo.token) {
					let result = await getUserAddress(this.userInfo.token);
					// 1.2遍历数组生成新对象
					let addressArr = result.data;
					// 1.3当前地址列表设置为空
					this.list=[];
					addressArr.forEach((address, index) => {
						let addressObj = {
							id: String(index + 1),
							name: address.address_name,
							tel: address.address_phone,
							address: address.address_area + address.address_area_detail,
							address_id: address._id,
							user_id: address.user_id
						};
						this.list.push(addressObj);
					})
				} else {
					Toast({
						message: "获取地址失败, 请重试",
						duration: 1000
					})
				}
			},
			// 2选择并发送地址对象
			onBackAddress(item,index){
				if(item){
					// 2.1发送订阅消息并返回
					PubSub.publish('getUserAddress',item);
					this.$router.back();
				}
			}
		},
		mounted() {
			this.initUserAddress();
			// 消息订阅, 增加地址成功
			PubSub.subscribe('regainAddress', (msg) => {
				if (msg === 'regainAddress') {
					// 重新获取当前地址
					this.initUserAddress();
				}
			})
		},
		beforeDestroy() {
			PubSub.unsubscribe('regainAddress');
		}
	}
</script>

<style lang="less" scoped>
	.myAddress {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
		z-index: 100;
	}

	.router-slider-enter-active, .router-slider-leave-active {
		transition: all 0.5s;
	}

	.router-slider-enter, .router-slider-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>