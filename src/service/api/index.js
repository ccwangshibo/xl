import ajax from './ajax'
// http://demo.itlike.com/web/xlmc/api/homeApi
// 定义基础路径
const BASE_URL ='http://demo.itlike.com/web/xlmc'
// 发送请求
export const getHomeData =()=>ajax(BASE_URL+'/api/homeApi')