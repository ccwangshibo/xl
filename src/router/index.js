import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Dashboard from '../views/dashboard/Dashboard'
// 懒加载
const Home =()=>import('./../views/home/Home')
const Category =()=>import('./../views/category/Category')
const Cart =()=>import('./../views/cart/Cart')
const Mine =()=>import('./../views/mine/Mine')

export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/dashboard'
    },
    {
      path:'/dashboard',
      name:'dashborad',
      component:Dashboard,
      children:[
        {
          path:'/dashboard',
          redirect:'/dashboard/home'
        },
        {
          path:'home',
          name:'home',
          component:Home,
          // 添加meta属性, 避免不必要的请求
          meta:{keepAlive:true}
        },
        {
          path:"category",
          name:'category',
          component:Category,
          meta:{keepAlive:true}
        },
        {
          path:"cart",
          name:'cart',
          component:Cart
        },
        {
          path:"mine",
          name:'mine',
          component:Mine
        }
      ]
    }
  ]
})