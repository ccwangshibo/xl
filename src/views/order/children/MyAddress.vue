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
			default-tag-text="默认"
			@add="onAdd"
			@edit="onEdit"
		></van-address-list>
		<!--过渡跳转路由组件-->
		<transition model="out-in" name="router-slider">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import {Toast} from 'vant'
	export default {
		name: "MyAddress",
		data() {
			return {
				chosenAddressId: '1',
				list: [
					{
						id: '1',
						name: '张三',
						tel: '13000000000',
						address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
					},
					{
						id: '2',
						name: '李四',
						tel: '1310000000',
						address: '浙江省杭州市拱墅区莫干山路 50 号'
					}
				]
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back()
			},
			onAdd() {
				// Toast('新增地址');
				this.$router.push('myAddress/addAddress')
			},
			onEdit(item, index) {
				// Toast('编辑地址:' + index);
				this.$router.push('myAddress/editAddress')
			}
		}
	}
</script>

<style lang="less" scoped>
	.myAddress{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
	}
	.router-slider-enter-active, .router-slider-leave-active {
		transition: all 0.5s;
	}

	.router-slider-enter, .router-slider-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>