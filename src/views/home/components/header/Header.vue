<template>
	<div class="wrapper">
		<div class="locationWrapper">
			<svg viewBox="0 0 32 32" class="icon iconLocation">
				<path fill="#81838E" fill-rule="evenodd"
							d="M14.521 30.445c.817.738 2.142.75 2.958 0 0 0 11.521-9.82 11.521-17.158C29 5.95 23.18 0 16 0S3 5.949 3 13.287c0 7.339 11.521 17.158 11.521 17.158zM16 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10z">
				</path>
			</svg>
			<span class="address">{{address||city||'努力定位中...'}}</span>
			<svg viewBox="0 0 32 32" class="icon iconArrow">
				<path fill="#81838E" fill-rule="evenodd"
							d="M14.724 19.17c.783.784 2.05.788 2.837 0l5.047-5.047c1.173-1.172.776-2.123-.869-2.123H10.545c-1.652 0-2.04.952-.869 2.123l5.048 5.048z">
				</path>
			</svg>
		</div>
		<div class="searchWrapper" @click="toastMessage">
			<div class="searchContent">
				<div class="iconSearchWrapper">
					<svg viewBox="0 0 32 32" class="icon iconSearch">
						<path fill="#999" fill-rule="evenodd"
									d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z">
						</path>
					</svg>
				</div>
				<span class="searchPrompt">请输入商品名称</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'vant';

	export default {
		name: 'Header',
		data() {
			return {
				latitude:0, // 纬度
				longitude:0, // 经度
				address:'',
				city:'',

				i:0 // 定位次数
			}
		},
		mounted() {
			this.getLocation();
		},
		methods: {
		  toastMessage(){
		    Toast({
          message:"对不起, 此功能正在开发!",
          duration:1000
        })
      },
			// 获取定位信息
			getLocation(){
		  	let geolocation=new qq.maps.Geolocation("3PXBZ-DOQK6-FQISF-M2BXT-MOETT-L6FIM", 'mapqq');
		  	geolocation.getLocation(this.showLocation,this.showError)
			},
			showLocation(position){
				this.longitude=position.lng;
				this.latitude=position.lat;
				this.city=position.city;
				this.address=position.addr;
			},
			showError(){
		  	this.getLocation()
			}
    },
	}
</script>

<style lang="less" scoped>
	.icon {
		fill: #999;
		width: 1rem;
		height: 1rem;
	}

	.wrapper {
		width: 100%;
		height: 3.125rem;
		line-height: 3.125rem;
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
		background: white;
		border-bottom: 1px solid #eee;
		border-top: 1px solid #eee;
		z-index: 2;
	}

	.locationWrapper {
		float: left;
		width: 40%;
		height: 3.125rem;
		/* 文本不换行 */
		white-space: nowrap;
		/* opacity: 1; */
	}

	.locationWrapper .address {
		display: inline-block;
		font-size: 0.8rem;
		width: auto;
		max-width: 80%;
		padding-left: 2rem;
		white-space: nowrap;
		/* 超出显示省略符号 */
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.locationWrapper .iconArrow {
		vertical-align: middle;
		margin-top: -2.5rem;
	}

	.iconLocation {
		position: absolute;
		left: 0.3rem;
		top: 1.0625rem;
		width: 1.875rem;
		height: 1rem;
	}

	.searchWrapper {
		position: absolute;
		right: 2%;
		top: 0.625rem;
		width: 50%;
		height: 3.125rem;
		box-sizing: border-box;
	}

	.searchWrapper .searchContent {
		float: right;
		border-radius: 3.125rem;
		width: 100%;
		height: 1.875rem;
		line-height: 1.875rem;
		text-align: center;
		background: #F2F2F2;
	}

	.iconSearchWrapper {
		display: inline-block;
		width: 1.25rem;
		height: 100%;
	}

	.iconSearch {
		margin-top: 0.3125rem;
		width: 1.25rem;
		height: 1.25rem;
	}

	.searchPrompt {
		display: inline-block;
		font-size: 0.875rem;
		vertical-align: top;
		text-align: center;
		color: #999;
	}

	@media (min-width: 320px) {
		.searchWrapper {
			width: 55%;
		}
	}

	@media (min-width: 375px) {
		.searchWrapper {
			width: 57%;
		}
	}

	@media (min-width: 414px) {
		.searchWrapper {
			width: 62%;
		}
	}
</style>