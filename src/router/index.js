import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 重写路由的push方法
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

// 一级组件
import Dashboard from '../views/dashboard/Dashboard'
// 懒加载
const Home = () => import('./../views/home/Home');
const Category = () => import('./../views/category/Category');
const Cart = () => import('./../views/cart/Cart');
const Mine = () => import('./../views/mine/Mine');

// 其他组件
const Order = () => import('../views/order/Order');
const MyAddress = () => import('../views/order/children/MyAddress');
const AddAddress = () => import('../views/order/children/children/addAddress');
const EditAddress = () => import('../views/order/children/children/editAddress');

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/dashboard'
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			children: [
				{
					path: '/dashboard',
					redirect: '/dashboard/home'
				},
				{
					path: 'home',
					name: 'home',
					component: Home,
					// 添加meta属性, 避免不必要的请求
					meta: {keepAlive: true}
				},
				{
					path: "category",
					name: 'category',
					component: Category,
					meta: {keepAlive: true}
				},
				{
					path: "cart",
					name: 'cart',
					component: Cart
				},
				{
					path: "mine",
					name: 'mine',
					component: Mine
				}
			]
		},
		// 订单路由
		{
			path: '/confirmOrder',
			name: 'order',
			component: Order,
			children: [
				// 我的地址
				{
					path: 'myAddress',
					name: 'myAddress',
					component: MyAddress,
					children:[
						{path:'addAddress',name:'addAddress',component:AddAddress},
						{path:'editAddress',name:'addAddress',component:EditAddress}
					]
				}
			]
		}
	]
})