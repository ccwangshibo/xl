import {USER_INFO} from './mutations-type'
import {getStorage} from "../config/global";
import {getUserInfo} from "../service/api";

export default {
	// 1. 同步用户信息
	syncUserInfo({commit}, userInfo) {
			commit(USER_INFO, {userInfo})
	},
	// 2. 自动登录
	async reqUserInfo({commit}){
		// 2.1从本地获取
		let userInfo=JSON.parse(getStorage('userInfo'));
		if(userInfo){
			commit(USER_INFO,{userInfo});
		}else{
			// 从服务器端验证
			let result=await getUserInfo();
			// console.log(result);
			if(result.success_code===200){
				commit(USER_INFO,{userInfo:result.data});
			}
		}
	}
}