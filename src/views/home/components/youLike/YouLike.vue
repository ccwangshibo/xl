<template>
	<div class="wrapper">
		<div class="titleWrapper">
			<div class="middleLine"></div>
			<div class="title">猜你喜欢</div>
		</div>
		<div class="itemWrapper">
			<YouLikeItem v-for="(product,i) in you_like_product_list" :key="i" :product="product"></YouLikeItem>
		</div>
	</div>
</template>

<script>
	import YouLikeItem from "./YouLikeItem";
	export default {
		name: "YouLike",
		props:{
			you_like_product_list:Array
		},
		components:{
			YouLikeItem,
		}
	}
</script>

<style lang="less" scoped>
	.wrapper{
		position: relative;
		margin-top: 0.625rem;
	}
	.titleWrapper{
		padding: 0 0.625rem;
		text-align: center;
		height: 2.1875rem;
	}
	.middleLine{
		padding-top: 1.25rem;
		border-bottom: 0.0625rem solid #D8D8D8;
	}
	.title{
		position: relative;
		top: -1.25rem;
		padding: 0 1rem;
		display: inline-block;
		font-size: 1rem;
		line-height: 2.1875rem;
		background: #f5f5f5;
	}
	.itemWrapper{
		margin-bottom: 3.5rem;
	}
</style>