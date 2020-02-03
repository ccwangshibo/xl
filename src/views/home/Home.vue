<template>
  <div id="home">
    Home
  </div>
</template>

<script>
import {getHomeData} from './../../service/api/index'
export default {
  name: 'Home',
  data() { 
    return {

    }
  },
  created(){
    getHomeData().then((response)=>{
      console.log(response);
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
  
</style>