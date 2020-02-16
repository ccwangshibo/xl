<template>
  <div id="cart">
    <!--标题栏-->
    <div class="titleWrapper">
      <div class="title">购物车</div>
      <button class="clearCart">清空购物车</button>
    </div>
    <div class="contentWrapper">
      <!--商品界面-->
      <div class="productWrapper">
          <div class="left">
            <a href="" class="cartCheckbox"></a>
          </div>
          <div class="center">
            <img src="./images/detail1.jpg" alt="">
          </div>
          <div class="right">
            <div class="productName">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
            <div class="productControl">
              <div class="productPrice">12345.99</div>
              <div class="changeCount">
                <span>-</span>
                <input type="number" value="99" disabled>
                <span>+</span>
              </div>
            </div>
          </div>
      </div>
      <div class="productWrapper">
          <div class="left">
            <a href="" class="cartCheckbox"></a>
          </div>
          <div class="center">
            <img src="./images/detail1.jpg" alt="">
          </div>
          <div class="right">
            <div class="productName">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
            <div class="productControl">
              <div class="productPrice">12345.99</div>
              <div class="changeCount">
                <span>-</span>
                <input type="number" value="99" disabled>
                <span>+</span>
              </div>
            </div>
          </div>
      </div>
      <!--底部-->
      <div class="footer">
        <div class="footerLeft">
          <a href="" class="cartCheckbox"></a>
          <span>全选</span>
          <div class="totalPrice">
            合计:&nbsp;<span class="price">12345.99</span>
          </div>
        </div>
        <div class="footerRight">
          <button class="pay">去结算(13)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() { 
    return {

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
  .cart{
    background: #ccc;
  }
  .titleWrapper{
    height: 3rem;
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    text-align: center;
    position: relative;
  }
  .title{
    height: 3rem;
    line-height: 3rem;
    font-weight: bold;
  }
  .clearCart{
    position: absolute;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
    font-size: 0.75rem;
    background: #ffffff;
    color: #FE3824;
    right: 0;
    top: 0;
  }
  .contentWrapper{
    width: 100%;
  }
  .productWrapper{
    display: flex;
    margin-top: 0.125rem;
    background: #ffffff;
  }
  .left{
    width: 10%;
    height: 6rem;
    display: flex;
    padding-top: 2.25rem;
  }
  .center{
    width: 30%;
  }
  .center img{
    width: 6rem;
    height: 6rem;
    display: block;
  }
  .right{
    width: 60%;
    padding-left: 0.25rem;
  }
  .productName{
    padding-top: 0.125rem;
    width: 100%;
    height: 3rem;
    overflow: hidden;
    line-height: 1rem;
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .productControl{
    font-size: 0.875rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 1.25rem;
  }
  .productPrice{
    width: 50%;
  }
  .changeCount{
    display: flex;
    width: 50%;
    text-align: center;
  }
  .changeCount input{
    width: 2rem;
    text-align: center;
  }
  .changeCount span{
    width: 1.5rem;
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 100%;
    background: #ffffff;
    position: fixed;
    bottom: 2.875rem;
  }
  .footerLeft{
    width: 75%;
    display: flex;
    align-items: center;
  }
  .cartCheckbox{
    background: url("./images/shop-icon.png") no-repeat;
    background-size: 2.5rem 5rem;
    width: 1rem;
    height: 1rem;
    margin-left: 1rem;
  }
  .totalPrice{
    margin-left: 2rem;
  }
  .price{
    color: #FE3824;
  }
  .footerRight{
    width: 25%;
    padding: 0.5rem 0;
  }
  .footerRight .pay{
    height: 2rem;
    width: 90%;
    border-radius: 1rem;
    font-size: 0.75rem;
    background: #FE3824;
    color: #ffffff;
  }
</style>