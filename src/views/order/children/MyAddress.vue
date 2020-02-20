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
			:disabled-list="disabledList"
			disabled-text="以下地址超出配送范围"
			default-tag-text="默认"
			@add="onAdd"
			@edit="onEdit"
		></van-address-list>
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
				],
				disabledList: [
					{
						id: '3',
						name: '王五',
						tel: '1320000000',
						address: '浙江省杭州市滨江区江南大道 15 号'
					}
				]
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back()
			},
			onAdd() {
				Toast('新增地址');
			},
			onEdit(item, index) {
				Toast('编辑地址:' + index);
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
		z-index: 999;
	}

</style>