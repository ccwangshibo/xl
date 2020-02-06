<template>
  <swiper id="swiper" :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(swiper,i) of swiper_list" :key="i">
      <img :src="swiper.icon_url" :alt="swiper.public_name">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
// 引入样式和组件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Swiper',
  data() { 
    return {
      // swiper参数
      swiperOption:{
        notNextTick:true,
        // 分页
        pagination:{
          el:'.swiper-pagination',
          clickable :true,
        },
        loop:true,
        autoplay:true,
        speed:600,
        // 滑动后回调
        // on:{
        //   slideChangeTransitionEnd(){
        //     console.log(this.activeIndex)
        //   }
        // },
      }
    }
  },
  props: {
    swiper_list:Array
  },
  computed: {
    // swiper(){
    //   return this.$refs.mySwiper.swiper;
    // }
  },
  components:{
    swiper,
    swiperSlide
  },
  mounted() {
    // 默认轮播项
    // this.swiper.slideTo(1,1000,false);
  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
  #swiper{
    width: 100%;
    height: 14rem;
  }
  #swiper img{
    width: 100%;
    height: 100%;
  }
  // deep样式穿透
  #swiper /deep/ .swiper-pagination-bullet-active{
    background-color: #75a342;
  }
</style>