import Vue from 'vue'

// 人民币符号过滤器
Vue.filter('moneyFormat',(value)=>{
	return '¥'+ Number(value).toFixed(2);
})