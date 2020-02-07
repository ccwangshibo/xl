<template>
  <div class="wrapper">
    <div class="itemWrapper" v-for="(nav,i) of nav_list" :key="i">
      <div class="imageWrapper">
        <img class="image" :src="nav.icon_url" :alt="nav.cid">
      </div>
      <div class="titleWrapper">
        <div class="title">{{nav.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    props:{
      nav_list:Array
    }
  }
</script>

<style lang="less" scoped>
  .wrapper{
    padding: 0.9375rem 0;
    background: #fff;
  }
  .wrapper::after{
    content: "";
    display: block;
    clear: both;
  }
  .itemWrapper{
    float: left;
    width: 20%;
    padding-top: 0.3rem;
  }
  .imageWrapper{
    overflow: hidden;
    text-align: center;
  }
  .image{
    width: 58%;
    height: auto;
  }
  .titleWrapper{
    padding: 0.0375rem 0.3125rem 0.375rem 0.3125rem;
  }
  .title{
    font-size: 0.7rem;
    color: #555555;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>