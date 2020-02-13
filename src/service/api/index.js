import ajax from './ajax'
// http://demo.itlike.com/web/xlmc/api/homeApi
// 定义基础路径
const BASE_URL ='http://demo.itlike.com/web/xlmc';
// 发送home页面的请求
export const getHomeData =()=>ajax(BASE_URL+'/api/homeApi');
// 发送分类页面的请求
export const getCategories =()=>ajax(BASE_URL+'/api/homeApi/categories');
// 发送分类详情界面的请求
export const getCategoriesDetail =(params)=>ajax(BASE_URL+'/api/homeApi/categoriesdetail'+params);