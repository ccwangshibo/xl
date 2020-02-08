<template>
  <div class="wrapper">
    <div class="titleWrapper">
      <div class="title">限时抢购</div>
      <div class="actionStateText">07:00场</div>
      <div class="actionStateTextEnd">已结束</div>
      <span class="more">更多</span>
    </div>
    <div class="itemWrapper" >
      <FlashSaleItem v-for="(product, i) in flash_sale_product_list" :key="i"  :product="product"></FlashSaleItem>
    </div>
  </div>
</template>

<script>
  import FlashSaleItem from "./FlashSaleItem";
  export default {
    name: "FlashSale",
    props:{
      flash_sale_product_list:Array
    },
    components:{
      FlashSaleItem
    }
  }
</script>

<style lang="less" scoped>
  .wrapper{
    position: relative;
    background: #ffffff;
    margin-top: 0.625rem;
    padding: 0.625rem 0 0.625rem;
  }
  .titleWrapper{
    position: relative;
    margin: 0 0.625rem 0;
    height: 1.5625rem;
  }
  .title{
    float: left;
    border-left: 0.25rem #3cb963 solid;
    padding-left: 0.3125rem;
    height: 1.3125rem;
    line-height: 1.3125rem;
    vertical-align: middle;
    font-size: 1.25rem;
  }
  .actionStateText, .actionStateTextEnd{
    float: left;
    line-height: 1rem;
    font-size: 1rem;
    vertical-align: middle;
    border-radius: 0.1875rem;
    padding: 0.25rem;
    margin-left: 0.5rem;
    color: #FE3824;
  }
  .actionStateTextEnd{
    color: #666666;
  }
  .more{
    float: right;
    height: 1.5625rem;
    line-height: 1.5625rem;
    font-size: 0.875rem;
    color: #2EB257;
  }
  .itemWrapper{
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  .itemWrapper::-webkit-scrollbar{
    display: none;
  }
</style>