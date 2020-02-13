<template>
	<div class="header">
		<div class="searchWrapper">
			<div class="searchBox">
				<div class="iconSearchWrapper">
					<svg viewBox="0 0 32 32" class="icon iconSearch">
						<path fill="#999" fill-rule="evenodd"
									d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z"></path>
					</svg>
				</div>
				<span class="searchPrompt">请输入商品名称</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Header"
	}
</script>

<style lang="less" scoped>
	.icon {
		fill: #999;
		width: 1.25rem;
		height: 1.25rem;
	}

	.searchWrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0.5rem 1rem;
		background: #fff;
		border-bottom: solid 1px #E6E6E6;
		z-index: 999;
		height: 3rem;
	}

	.searchBox {
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		border-radius: 2rem;
		background: #f2f2f2;
		font-size: 0.875rem;
	}

	.iconSearchWrapper {
		display: inline-block;
		margin-left: 5.5rem;
		width: 1.5rem;
		height: 1.5rem;
		line-height: 2rem;
		vertical-align: middle;
	}

	.searchPrompt {
		color: #b5b5b5;
	}
</style>