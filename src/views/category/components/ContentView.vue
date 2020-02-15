<template>
	<div class="contentView">
		<div  v-for="(categoryDetail,i) of categoriesDetail" :key="i">
			<div class="categoryTitle">{{categoryDetail.name}}</div>
			<!--单个商品组件-->
			<ProductItem :products="categoryDetail.products"></ProductItem>
		</div>
	</div>
</template>

<script>
	import ProductItem from "./ProductItem";
	export default {
		name: "ContentView",
		components:{
			ProductItem
		},
		props:{
			categoriesDetail:Array
		}
	}
</script>

<style lang="less" scoped>
	.contentView{
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
		background: #ffffff;
		position: absolute;
		left: 5rem;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.categoryTitle{
		height: 1.25rem;
		line-height: 1.25rem;
		font-size: 0.75rem;
		color: #666666;
		background: #f8f8f8;
		padding: 0 0.375rem;
		text-align: center;
	}
</style>