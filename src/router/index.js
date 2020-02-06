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
          component:Home
        },
        {
          path:"category",
          name:'category',
          component:Category
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