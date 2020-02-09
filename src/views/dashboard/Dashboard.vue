<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#75a342">
      <van-tabbar-item replace to="/dashboard/home">
        <span>主页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? home_icon.active : home_icon.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/category">
        <span>分类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? category_icon.active : category_icon.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/cart">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? cart_icon.active : cart_icon.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/mine">
        <span>个人中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? mine_icon.active : mine_icon.inactive"
        >
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() { 
    return {
      active: 0,
      home_icon: {
      active: require('@/images/tabbar/home_selected.png'),
      inactive: require('@/images/tabbar/home_default.png')
      },
      category_icon: {
      active: require('@/images/tabbar/category_selected.png'),
      inactive: require('@/images/tabbar/category_default.png')
      },
      cart_icon: {
      active: require('@/images/tabbar/shoppingcart_selected.png'),
      inactive: require('@/images/tabbar/shoppingcart_default.png')
      },
      mine_icon: {
      active: require('@/images/tabbar/mine_selected.png'),
      inactive: require('@/images/tabbar/mine_default.png')
      },
    }
  },
  props: {

  },
  components:{

  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
</style>