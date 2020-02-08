<template>
  <div id="home">
    <div v-if="!showLoading">
      <!--头部导航-->
      <Header></Header>
      <!--轮播图-->
      <Swiper :swiper_list="swiper_list"></Swiper>
      <!--中间nav分类导航-->
      <Nav :nav_list="nav_list"></Nav>
      <!--限时抢购-->
      <FlashSale :flash_sale_product_list="flash_sale_product_list"></FlashSale>
    </div>
    <van-loading v-else type="spinner" color="#75a342" style="position:absolute;left:50%;top:40%;transform:translate(-50%);">小赖正在拼命加载中...</van-loading>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Swiper from './components/swiper/Swiper'
import Nav from './components/nav/Nav'
import FlashSale from "./components/flashsale/FlashSale";


import {getHomeData} from './../../service/api/index'
export default {
  name: 'Home',
  data() { 
    return {
      // 首页轮播图数据
      swiper_list:[],
      // nav导航数据
      nav_list:[],
      // 限时抢购数据
      flash_sale_product_list:[],
      // 是否显示加载过程
      showLoading:true,
    }
  },
  components:{
    Header,
    Swiper,
    Nav,
    FlashSale
  },
  created(){
    // 接收请求
    getHomeData().then((response)=>{
      if(response.success){
        console.log(response.data)
        // 轮播图数据
        this.swiper_list=response.data.list[0].icon_list;
        // nav导航数据
        this.nav_list=response.data.list[2].icon_list;
        // 限时抢购数据
        this.flash_sale_product_list=response.data.list[3].product_list;
        // 数据请求完成,隐藏加载页面
        this.showLoading=false;
      }
    }).catch(error=>{
      console.log(error);
    })
  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
  #home {
    width: 100%;
    height: 300rem;
    background-color: #f5f5f5;
  }
</style>