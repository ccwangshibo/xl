<template>
  <div id="home">
    <Header></Header>
  </div>
</template>

<script>
import Header from './components/header/Header'
import {getHomeData} from './../../service/api/index'
export default {
  name: 'Home',
  data() { 
    return {

    }
  },
  components:{
    Header
  },
  created(){
    // 测试接收请求
    // getHomeData().then((response)=>{
    //   console.log(response);
    // }).catch(error=>{
    //   console.log(error);
    // })
  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style lang="less" scoped>
  
</style>