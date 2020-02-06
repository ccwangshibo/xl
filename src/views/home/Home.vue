<template>
  <div id="home">
    <div v-if="!showLoading">
      <Header></Header>
      <Swiper :swiper_list="swiper_list"></Swiper> 
    </div>
    <van-loading v-else type="spinner" color="#75a342" style="position:absolute;left:50%;top:40%;transform:translate(-50%);">小赖正在拼命加载中...</van-loading>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Swiper from './components/swiper/Swiper'
import {getHomeData} from './../../service/api/index'
export default {
  name: 'Home',
  data() { 
    return {
      // 首页轮播图数据
      swiper_list:[],
      // 是否显示加载过程
      showLoading:true,
    }
  },
  components:{
    Header,
    Swiper
  },
  created(){
    // 接收请求
    getHomeData().then((response)=>{
      if(response.success){
        this.swiper_list=response.data.list[0].icon_list;
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