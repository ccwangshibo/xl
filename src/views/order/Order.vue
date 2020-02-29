<template>
	<div class="order">
		<!--导航条-->
		<van-nav-bar
				title="订单确认"
				left-text="返回"
				left-arrow
				fixed
				@click-left="onClickLeft"
		></van-nav-bar>
		<!--添加地址-->
		<van-contact-card
				:type="address_type"
				:name="address_name"
				:tel="address_tel"
				add-text="选择收货地址"
				@click="chooseAddress"
				style="margin-top: 3rem"
		></van-contact-card>
		<!--送达时间-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="送达时间" :value="arriveDate" is-link @click="showDatePopUp"/>
			<van-cell :value="`共${payCount}件`" is-link center @click="orderDetail">
				<!-- 使用 title 插槽来自定义标题 -->
				<template slot="title">
					<img v-for="(goods,index) of showThreeGoods" :key="index" :src="goods.small_image" alt=""
							 style="width: 3rem">
				</template>
			</van-cell>
		</van-cell-group>
		<!--支付方式-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="支付方式" value="微信支付"/>
		</van-cell-group>
		<!--备注-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-field
					v-model="leaveMessage"
					rows="1"
					autosize
					label="备注"
					type="textarea"
					placeholder="请输入备注"
					input-align="right"
			/>
		</van-cell-group>
		<!--价格和配送费-->
		<van-cell-group style="margin-top: 0.3rem">
			<van-cell title="商品金额" :value="(totalPrice/100)|moneyFormat"/>
			<van-cell title="配送费" :value="expressPrice|moneyFormat"/>
		</van-cell-group>
		<!--提交订单-->
		<van-submit-bar
				:price="totalPrice"
				button-text="提交订单"
				@submit="onSubmit"
				label="实付："
		/>
		<!--日期选择器弹出层-->
		<van-popup
				v-model="dateShow"
				position="bottom"
				:style="{ height: '30%' }"
		>
			<van-datetime-picker
					v-model="currentDate"
					type="datetime"
					:min-date="minDate"
					:max-date="maxDate"
					@cancel="cancelDate"
					@confirm="confirmDate"
			/>
		</van-popup>
		<!--过渡跳转路由组件-->
		<transition model="out-in" name="router-slider">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import PubSub from 'pubsub-js';

	import Moment from 'moment';

	import {mapState} from 'vuex';

	export default {
		name: "Order",
		data() {
			return {
				// 1.地址
				address_type: "add", // 地址卡片类型
				address_name: null, // name
				address_tel: null, // phone
				address_id: null, // id
				// 2.日期
				dateShow: false, // 时间选择器的显示
				currentDate: new Date(),
				minDate: new Date(new Date().getTime()+3600*1000), // 最快一小时内送达
				maxDate: new Date(2021, 3, 15),
				// 3.送达时间
				arriveDate: "请选择送达时间",
				// 4.路由传参
				totalPrice: null,
				payCount: null,
				// 5.留言备注
				leaveMessage:null,
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			},
			// 选择地址
			chooseAddress() {
				this.$router.push('/confirmOrder/myAddress')
			},
			onSubmit() {

			},
			// 弹出时间选择器
			showDatePopUp() {
				this.dateShow = true;
			},
			// 取消选择时间
			cancelDate() {
				this.dateShow = false;
			},
			// 确认选择时间
			confirmDate(value) {
				// 格式化并赋值给送达时间
				this.dateShow = false;
				this.arriveDate = Moment(value).format('YYYY-MM-DD HH:mm');
			},
			// 查看订单详情
			orderDetail() {
				this.$router.push({
					path: "/confirmOrder/orderDetail",
					query: {payCount: this.payCount}
				})
			}
		},
		computed: {
			...mapState(['shopCart']),
			// 1.遍历购物车截取前三个商品
			showThreeGoods() {
				let shopCart = [];
				Object.values(this.shopCart).forEach((goods, index) => {
					if (goods.checked) {
						shopCart.push(goods);
					}
				});
				return shopCart.slice(0, 3)
			},
			// 2.计算配送费(超过60免费)
			expressPrice(){
				if(this.totalPrice>=6000){
					return 0;
				}else{
					return 6;
				}
			}
		},
		mounted() {
			// 1. 接收订阅消息
			PubSub.subscribe('getUserAddress', (msg, address) => {
				if (msg === 'getUserAddress') {
					// 更新地址列表数据
					this.address_type = 'edit';
					this.address_name = address.name;
					this.address_tel = address.tel;
					this.address_id = address.address_id;
				}
			});
			// 2.接收路由传参
			this.totalPrice = this.$route.query.totalPrice * 100;
			this.payCount = this.$route.query.payCount;
		},
		beforeDestroy() {
			PubSub.unsubscribe('getUserAddress')
		}
	}
</script>

<style lang="less" scoped>
	.order {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	/*.van-nav-bar__text{*/
	/*	color: #75a342;*/
	/*}*/
	.router-slider-enter-active, .router-slider-leave-active {
		transition: all 0.5s;
	}

	.router-slider-enter, .router-slider-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>