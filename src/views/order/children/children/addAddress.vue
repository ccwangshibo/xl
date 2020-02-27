<template>
	<div class="addAddress">
		<!--导航条-->
		<van-nav-bar
				title="新增地址"
				left-text="返回"
				left-arrow
				fixed
				@click-left="onClickLeft"
		></van-nav-bar>
		<!--编辑地址-->
		<van-address-edit
				style="margin-top: 3rem"
				:area-list="areaList"
				show-postal
				show-set-default
				:search-result="searchResult"
				@save="onSave"
				@change-detail="onChangeDetail"
		/>
	</div>
</template>

<script>
	import areaList from "../../../../config/area";

	import {addUserAddress} from "../../../../service/api";

	import {Toast} from 'vant';

	import {mapState} from 'vuex';

	import PubSub from 'pubsub-js';


	export default {
		name: "addAddress",
		data() {
			return {
				areaList: areaList,
				searchResult: []
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			},
			async onSave(content) {
				if (this.userInfo.token) {
					// 调用保存地址的接口
					let result = await addUserAddress(
						this.userInfo.token,
						content.name,
						content.tel,
						content.province + content.city + content.county,
						content.addressDetail,
						content.postalCode,
						content.isDefault,
						content.province,
						content.city,
						content.county,
						content.areaCode);
					if (result.success_code === 200) {
						Toast({
							message: "添加成功",
							duration: 1000
						});
						this.$router.back();
						// 发送订阅消息
						PubSub.publish('regainAddress');
					} else {
						Toast({
							message: "添加失败!",
							duration: 1000
						})
					}
				}
			},
			onChangeDetail(val) {
				if (val) {
					this.searchResult = [{
						name: '黄龙万科中心',
						address: '杭州市西湖区'
					}];
				} else {
					this.searchResult = [];
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.addAddress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
		z-index: 9999;
	}
</style>