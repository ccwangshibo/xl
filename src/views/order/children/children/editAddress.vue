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
				:area-list="areaList"
				show-postal
				show-delete
				show-set-default
				show-search-result
				:search-result="searchResult"
				:area-columns-placeholder="['请选择', '请选择', '请选择']"
				@save="onSave"
				@delete="onDelete"
				@change-detail="onChangeDetail"
		/>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		name: "editAddress",
		data() {
			return {
				areaList,
				searchResult: []
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			},
			onSave() {
				Toast('save');
			},
			onDelete() {
				Toast('delete');
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