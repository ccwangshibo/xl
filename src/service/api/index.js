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
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'post');
// 2.3用户名密码登录
export const pwdLogin = (user_name, user_pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {
	user_name,
	user_pwd,
	captcha
}, 'post');
// 2.4自动登录
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo');
// 2.5退出登录
export const getLogout = () => ajax(BASE_URL + '/api/logout');

// 3.购物车接口
// 3.1添加商品到购物车
export const addGoodsToCart = (user_id, goods_id, goods_name, goods_price, small_image) => ajax(
	BASE_URL + '/api/cart/add', {
		user_id,
		goods_id,
		goods_name,
		goods_price,
		small_image
	}, 'post');
// 3.2获取购物车数据
export const getGoodsCart = (user_id) => ajax(BASE_URL + '/api/cart/search/' + user_id);
// 3.3修改购物车数据
export const changeCartNum = (user_id, goods_id, type) => ajax(
	BASE_URL + '/api/cart/num', {user_id, goods_id, type}, 'post');
// 3.4清空购物车数据
export const clearAllCart = (user_id) => ajax(BASE_URL + '/api/cart/clear/' + user_id);
// 3.5单个商品的选中
export const singleGoodsSelect = (user_id, goods_id) => ajax(BASE_URL + '/api/cart/singer_select', {
	user_id,
	goods_id
}, 'post');
// 3.6全选
export const allGoodsSelect = (user_id, flag) => ajax(BASE_URL + '/api/cart/all_select', {user_id, flag}, 'post');

// 4. 地址接口
// 4.1 获取当前用户的地址
export const getUserAddress = (user_id) => ajax(BASE_URL + '/api/address/search/' + user_id);
// 4.2 添加新的地址
export const addUserAddress = (
	user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode
) => ajax(BASE_URL + '/api/address/add', {
	user_id,
	address_name,
	address_phone,
	address_area,
	address_area_detail,
	address_post_code,
	address_tag,
	province,
	city,
	county,
	areaCode
}, 'post');
// 4.3 编辑用户的地址
export const changeUserAddress = (
	address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode
) => ajax(BASE_URL + '/api/address/edit', {
	address_id,
	user_id,
	address_name,
	address_phone,
	address_area,
	address_area_detail,
	address_post_code,
	address_tag,
	province,
	city,
	county,
	areaCode
}, 'post');
// 4.4 删除用户的地址
export const delUserAddress = (address_id) => ajax(BASE_URL + '/api/address/del/' + address_id);
// 4.5 获取单条地址
export const getCurrentUserAddress = (user_id, address_id) => ajax(BASE_URL + '/api/address/one', {
	user_id,
	address_id
}, 'post');
