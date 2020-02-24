import ajax from './ajax'
// http://demo.itlike.com/web/xlmc/api/homeApi
// 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';

// 1.页面数据请求
// 1.1发送home页面的请求
export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
// 1.2发送分类页面的请求
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
// 1.3发送分类详情界面的请求
export const getCategoriesDetail = (params) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + params);

// 2.用户中心接口
// 2.1获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', {phone});
// 2.2验证码登录请求
export const phoneCodeLogin = (phone,code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'post');