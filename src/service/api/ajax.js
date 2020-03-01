import axios from 'axios'

export default function ajax(url = '', params = {}, type = 'get') {
	// 定义一个变量接收
	let promise;
	// 1.返回Promise对象
	return new Promise((resolve, reject) => {
		// 1.1判断请求类型
		if (type === 'get') {
			// 2.2 拼接字符串
			let paramsStr = '';
			// 2.3 遍历
			Object.keys(params).forEach(key => {
				paramsStr += key + '=' + params[key] + '&';
			});
			// 2.4 过滤最后的&
			// 注意：为了防止请求缓存，在尾部加了时间戳
			if (paramsStr) {
				paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
				// 2.5 拼接完整路径
				if (url.indexOf('47.98.157.152') === -1) {
					url += '?' + paramsStr + '&itlike=' + randomCode(20);
				} else {
					url += '?' + paramsStr;
				}
			} else {
				if (url.indexOf('47.98.157.152') === -1) {
					url += '?itlike=' + randomCode(20)
				}
			}
			promise = axios.get(url);
		} else if (type === 'post') {
			// 发送post请求
			promise = axios.post(url, params);
		}
		// 2.接收结果并返回
		promise.then((response) => {
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
	});
}

/*生成指定长度的随机数*/
function randomCode(length) {
	let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let result = "";
	for (let i = 0; i < length; i++) {
		let index = Math.ceil(Math.random() * 9);
		result += chars[index];
	}
	return result;
}