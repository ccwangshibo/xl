<template>
	<div class="productItem">
		<div class="productWrapper" v-for="(product,i) of products" :key="i">
			<div class="imageWrapper">
				<img :src="product.small_image" alt="">
			</div>
			<div class="nameWrapper">
				<div class="name">
					<span class="nameTag nameText">{{product.name}}</span>
				</div>
				<div class="spec">
					{{product.spec}}
				</div>
			</div>
			<div class="priceWrapper">
				<div class="price">
					<span class="largePrice">{{product.price | moneyFormat}}</span>
				</div>
				<div class="iconCartWrapper" @click="addToCart(product)">
					<svg viewBox="0 0 52 52" class="icon iconCart">
		<defs>
				<radialGradient cx="27.0288363%" cy="10.3693483%" fx="27.0288363%"
												fy="10.3693483%" r="93.8427229%"
												id="radialGradient-1">
						<stop stop-color="#4ECA75" offset="0%"></stop>
						<stop stop-color="#39B460" offset="100%"></stop>
				</radialGradient>
		</defs>
		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g transform="translate(-678.000000, -2742.000000)">
						<g transform="translate(678.000000, 2742.000000)">
								<rect fill="url(#radialGradient-1)" x="0" y="0"
											width="51.8699976" height="51.8699976"
											rx="25.9349988"></rect>
								<path fill="#FFFFFF"
											d="M20.3666667,39 C19.1700497,39 18.2,38.0299503 18.2,36.8333333 C18.2,35.6367164 19.1700497,34.6666667 20.3666667,34.6666667 C21.5632836,34.6666667 22.5333333,35.6367164 22.5333333,36.8333333 C22.5333333,38.0299503 21.5632836,39 20.3666667,39 Z M33.3666667,38.1333333 C32.1700497,38.1333333 31.2,37.1632836 31.2,35.9666667 C31.2,34.7700497 32.1700497,33.8 33.3666667,33.8 C34.5632836,33.8 35.5333333,34.7700497 35.5333333,35.9666667 C35.5333333,37.1632836 34.5632836,38.1333333 33.3666667,38.1333333 Z"></path>
								<path stroke="#FFFFFF" stroke-width="2.6"
											stroke-linecap="round"
											d="M12.1333333,13.8666667 L13.6768756,13.8666667 C15.4621209,13.8666667 16.9554584,15.222463 17.1274221,16.9994069 L18.2224287,28.314386 C18.4068512,30.2200702 20.1012175,31.6154285 22.0069016,31.431006 C22.0111286,31.4305969 22.0153548,31.4301801 22.0195802,31.4297555 L33.2997819,30.296256 C34.7947282,30.1460352 36.0227397,29.0499108 36.3411182,27.581556 L37.8958814,20.4110205 C38.0987345,19.4754663 37.5047629,18.5526049 36.5692087,18.3497518 C36.3853963,18.3098964 36.1963225,18.3002236 36.0094025,18.3211126 L22.8968424,19.7864909"></path>
						</g>
				</g>
		</g>
</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入消息订阅插件
	import PubSub from 'pubsub-js'
	export default {
		name: "ProductItem",
		props:{
			products:Array
		},
		methods:{
			// 发送消息
			addToCart(goods){
				PubSub.publish('categoryAddToCart',goods)
			}
		}
	}
</script>

<style lang="less" scoped>
	.icon{
		width: 1.5rem;
	}
	.productWrapper{
		position: relative;
		height: 5rem;
		margin: 0.125rem 0;
		overflow: hidden;
	}
	.productWrapper+.productWrapper{
		border-top: 1px solid #e8e8e8;
	}
	.imageWrapper{
		position: absolute;
		width: 5rem;
		height: 5rem;
		padding: 0.125rem;
	}
	.imageWrapper img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.nameWrapper{
		position: absolute;
		padding: 0 0.125rem;
		left: 5rem;
		height: 3rem;
	}
	.nameWrapper .name{
		height: 2rem;
		line-height: 2rem;
		font-size: 0.75rem;
		width: 90%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.nameWrapper .spec{
		height: 1rem;
		line-height: 1rem;
		font-size: 0.5rem;
		color: #999999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}
	.priceWrapper{
		position: absolute;
		left: 5rem;
		top: 3rem;
		display: flex;
		height: 2rem;
		justify-content: space-between;
		align-items: center;
		width: 60%;
	}
	.priceWrapper .price{
		font-size: 0.75rem;
		color: #FE3824;
	}
	.priceWrapper .price .largePrice{
		font-size: 1rem;
	}
</style>