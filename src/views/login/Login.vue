<template>
	<div class="loginWrapper">
		<div class="loginInner">
			<!--头部-->
			<div class="loginHeader">
				<div class="loginLogo">
					<img src="./images/lk_logo_sm.png" alt="" width="300">
				</div>
				<div class="loginModel">
					<a href="javascript:;" :class="{current:loginModel}" @click="selectLoginModel(true)">手机登录</a>
					<a href="javascript:;" :class="{current:!loginModel}" @click="selectLoginModel(false)">密码登录</a>
				</div>
			</div>
			</div>
			<!--表单部分-->
			<div class="loginContent">
				<form action="">
					<!--手机号登录-->
					<div class="loginMessage" v-if="loginModel">
						<input type="text" maxlength="11" placeholder="手机号">
						<button class="getVerification">获取验证码</button>
						<button v-show="false" class="getVerification">验证码已发送</button>
						<input type="text" maxlength="6" placeholder="验证码">
						<div class="loginHint">
							温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示
						</div>
					</div>
					<!--用户名登录-->
					<div class="loginMessage" v-else>
						<input type="text" placeholder="请输入用户名">
						<input type="password" placeholder="请输入密码">
						<div class="showPwd">
							<img src="./images/show_pwd.png" alt="" width="20">
						</div>
						<input type="text" placeholder="请输入验证码">
						<img src="./images/captcha.svg" alt="" class="captcha">
					</div>
					<button class="loginSubmit">登录</button>
				</form>
				<button class="loginBack" @click.prevent="$router.back()">返回</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data(){
			return{
				loginModel:true, // 选择登录模式
			}
		},
		methods:{
			// 切换登录模式
			selectLoginModel(flag){
				this.loginModel=flag;
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginWrapper {
		width: 100%;
		height: 100%;
	}
	.loginInner{
		position: absolute;
		top: 6rem;
		margin-left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}
	.loginModel{
		margin-top: 1rem;
	}
	.loginModel a{
		color: #555555;
		font-size: 0.875rem;
	}
	.loginModel a+a{
		margin-left: 2rem;
	}
	.loginModel .current{
		font-weight: bold;
		color: #2EB257;
		border-bottom: 0.125rem solid #2EB257;
	}
	.loginContent{
		position: absolute;
		margin-top: 15rem;
		width: 100%;
		text-align: center;
	}
	.loginMessage{
		position: relative;
	}
	.loginMessage input{
		width: 16rem;
		height: 2.5rem;
		border: 1px solid #cccccc;
		border-radius: 2px;
		padding-left: 1rem;
		font-size: 0.875rem;
		margin-top: 1rem;
	}
	.loginMessage input:focus{
		border: 1px solid #2EB257;
	}
	.loginMessage .loginHint{
		width: 16rem;
		height: 2.5rem;
		line-height: 1.25rem;
		margin-top: 1rem;
		font-size: 0.75rem;
		display: inline-block;
		color: #ccc;
		text-align: left;
	}
	.getVerification{
		position: absolute;
		height: 2.5rem;
		background-color: transparent;
		margin-left: -5rem;
		margin-top: 1rem;
		font-size: 0.875rem;
		color: #ccc;
	}
	.loginSubmit, .loginBack{
		width: 16rem;
		margin-top: 1rem;
		height: 2.5rem;
		background-color: #2EB257;
		color: #fff;
		border-radius: 2px;
	}
	.loginBack{
		color: #2EB257;
		background-color: #ffffff;
		border: 1px solid #2EB257;
	}
	.showPwd{
		position: absolute;
		right: 0;
		margin-right: 4rem;
		margin-top: -1.8rem;
	}
	.captcha{
		position: absolute;
		right: 0;
		margin-right: 2rem;
		margin-top: 0.75rem;
	}
</style>