<template>
	<div class="editAddress">
		<!--导航条-->
		<van-nav-bar
				title="编辑地址"
				left-text="返回"
				left-arrow
				fixed
				@click-left="onClickLeft"
		></van-nav-bar>
		<!--编辑地址-->
		<van-address-edit
				style="margin-top: 3rem"
				:area-list=areaList
				:address-info="addressInfo"
				show-postal
				show-delete
				:area-columns-placeholder="['请选择', '请选择', '请选择']"
				@save="onSave"
				@delete="onDelete"
		/>
	</div>
</template>

<script>
	import areaList from "../../../../config/area";

	import {Toast} from 'vant';

	import {delUserAddress, getCurrentUserAddress, changeUserAddress} from "../../../../service/api";

	import PubSub from 'pubsub-js';

	import {mapState} from 'vuex';

	export default {
		name: "editAddress",
		data() {
			return {
				areaList: areaList,
				addressInfo: {}
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
					// 发送修改地址的数据请求
					let result = await changeUserAddress(
						this.addressInfo.id,
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
					// 地址修改成功
					if (result.success_code === 200) {
						Toast({
							message: "修改成功",
							duration: 1000
						});
						this.$router.back();
						// 发送订阅消息, 通知父组件
						PubSub.publish('regainAddress');
					}
				}
			},
			async onDelete() {
				// Toast('delete');
				// 删除当前地址
				if (this.userInfo.token) {
					let result = await delUserAddress(this.addressInfo.id);
					if (result.success_code === 200) {
						Toast({
							message: "删除成功",
							duration: 1000
						});
						this.$router.back();
						// 发送订阅消息, 通知父组件
						PubSub.publish('regainAddress');
					}
				}
			},
			// 1.获取单条的地址请求
			async getCurrentAddress(user_id, address_id) {
				if (this.userInfo.token) {
					// 1.1发送请求
					let result = await getCurrentUserAddress(user_id, address_id);
					if (result.success_code === 200) {
						// 1.2将获取到的地址id赋值给当前组件的addressInfo值进行加载
						this.addressInfo = {
							id: result.data._id,
							name: result.data.address_name,
							tel: result.data.address_phone,
							province: result.data.province,
							city: result.data.city,
							county: result.data.county,
							addressDetail: result.data.address_area_detail,
							areaCode: result.data.areaCode,
							postalCode: result.data.address_post_code,
							isDefault: result.data.address_tag
						}
					}
				}
			}
		},
		mounted() {
			// 获取到路由传参的地址ID
			if (this.$route.query.address_id) {
				if (this.userInfo.token) {
					// 调用请求
					this.getCurrentAddress(this.userInfo.token, this.$route.query.address_id);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.editAddress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f5f5f5;
		z-index: 10000;
	}
</style>