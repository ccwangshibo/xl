import Vue from 'vue'
import App from './App.vue'

// 1. 配置FastClick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

// 2. 引入全局样式
import './style/common.less'

new Vue({
  render: h => h(App)
}).$mount('#app')
