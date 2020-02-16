import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 1. 配置FastClick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

// 2. 引入全局样式
import '@/style/common.less'

// 3.引入全局组件-vant
import '@/plugins/vant'

// 4.引入rem
import '@/config/rem.js'

// 5.引入全局过滤器
import '@/config/filters.js'

new Vue({
  router,
  store, //挂载store对象
  render: h => h(App)
}).$mount('#app')
