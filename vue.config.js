// module.exports={
// 	publicPath:'/',
// 	devServer:{
// 		proxy:{
// 			'/api':{ // 匹配请求地址
// 				target:'http://localhost:3000/web/xlmc', // 目标地址
// 				changeOrigin: true, // 允许跨域
// 				pathRewrite:{ // 路径重写
// 					'^/api':''
// 				}
// 			}
// 		}
// 	}
// }