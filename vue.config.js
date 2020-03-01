module.exports={
	publicPath:'/',
	devServer:{
		proxy:{
			'/pay':{ // 匹配请求地址
				target:'http://47.98.157.152/WXPayProject/pay', // 目标地址
				changeOrigin: true, // 允许跨域
				pathRewrite:{ // 路径重写
					'^/pay':''
				}
			}
		}
	}
}