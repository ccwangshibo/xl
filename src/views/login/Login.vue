<template>
	<div class="loginWrapper">
		<div class="loginInner">
			<!--头部-->
			<div class="loginHeader">
				<div class="loginLogo">
					<img src="./images/like.png" alt="" width="300">
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
					<input type="text" maxlength="11" placeholder="手机号" v-model="phone">
					<button v-if="!countDown" class="getVerification" :class="{phoneRight:phoneReg}"
									@click.prevent="phoneReg && getVerifyCode()">获取验证码
					</button>
					<button v-else disabled class="getVerification">已发送({{countDown}}s)</button>
					<input type="text" maxlength="6" placeholder="验证码" v-model="code">
					<div class="loginHint">
						温馨提示: 此登录方式为测试环境, 手机验证码均为<span style="color:#2EB257">666666</span>, 请知悉
					</div>
				</div>
				<!--用户名登录-->
				<div class="loginMessage" v-else>
					<input type="text" placeholder="请输入用户名" v-model="userName">
					<input v-if="pwdModel" type="password" placeholder="请输入密码" v-model="pwd">
					<input v-else type="text" placeholder="请输入密码" v-model="pwd">
					<div class="showPwd">
						<img v-if="pwdModel" src="./images/hide_pwd.png" alt="" width="20" @click.prevent="dealPwdModel(true)">
						<img v-else src="./images/show_pwd.png" alt="" width="20" @click.prevent="dealPwdModel(false)">
					</div>
					<input type="text" placeholder="请输入验证码" v-model="captcha">
					<img src="http://demo.itlike.com/web/xlmc/api/captcha" alt="" class="captcha" width="30%"
							 @click.prevent="getCaptcha" ref="captcha">
				</div>
				<button class="loginSubmit" @click.prevent="login">登录</button>
			</form>
			<button class="loginBack" @click.prevent="$router.back()">返回</button>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'vant'

	import {getPhoneCode, phoneCodeLogin, pwdLogin} from "../../service/api";

	import {mapMutations, mapActions} from 'vuex'
	import {USER_INFO} from "../../store/mutations-type";

	export default {
		name: "Login",
		data() {
			return {
				loginModel: true, // 选择登录模式
				phone: null, // 手机号默认为空
				countDown: 0, // 倒计时
				code: null, // 手机验证码
				userInfo: null, // 用户信息

				userName: null, // 用户名
				pwd: null, // 密码
				pwdModel: true, // 密码显示方式
				captcha: null // 图形验证码
			}
		},
		computed: {
			phoneReg() {
				return /^[1][3-9][0-9]{9}$/.test(this.phone);
			}
		},
		methods: {
			...mapMutations(['USER_INFO']),
			...mapActions(['syncUserInfo']),
			// 1.切换登录模式
			selectLoginModel(flag) {
				this.loginModel = flag;
			},
			// 2.获取手机验证码
			async getVerifyCode() {
				// 2.1判断是否可以点击
				if (this.phoneReg) {
					this.countDown = 60;
					// 2.2设置定时器
					this.timer = setInterval(() => {
						this.countDown -= 1;
						if (this.countDown === 0) {
							clearInterval(this.timer)
						}
					}, 1000)
				}
				// 2.3验证码数据请求
				let result = await getPhoneCode(this.phone);
				console.log(result);
			},
			// 3.登录
			async login() {
				// 3.1判断登录方式
				if (this.loginModel) { // 3.2手机号登录
					// 3.2.1数据格式验证
					if (!this.phone) {
						Toast({
							message: '手机号不能为空!',
							duration: 500
						});
						return;
					}
					if (!this.phoneReg) {
						Toast({
							message: '手机号格式错误!',
							duration: 500
						});
						return;
					}
					if (!this.code) {
						Toast({
							message: '验证码不能为空!',
							duration: 500
						});
						return;
					}
					if (!/^\d{6}$/.test(this.code)) {
						Toast({
							message: '验证码格式错误!',
							duration: 500
						});
						return;
					}
					// 3.2.2登录
					let result = await phoneCodeLogin(this.phone, this.code);
					if (result.success_code === 200) {
						// 登录成功之后保存用户信息
						this.syncUserInfo(result.data);
						this.$router.back();
					} else {
						Toast({
							message: "登陆失败, 手机或验证码错误",
							duration: 500
						})
					}
				} else { // 3.3用户名密码登录
					if (!this.userName) {
						Toast({
							message: '用户名不能为空!',
							duration: 500
						});
						return;
					} else if (!this.pwd) {
						Toast({
							message: '密码不能为空!',
							duration: 500
						});
						return;
					} else if (!this.captcha) {
						Toast({
							message: '验证码不能为空!',
							duration: 500
						});
						return;
					}
					// 验证通过, 发送登录请求
					let result = await pwdLogin(this.userName, this.pwd, this.captcha);
					console.log(result)
					if (result.success_code === 200) {
						this.syncUserInfo(result.data);
					} else {
						Toast({
							message: '测试环境, 不允许此方式登录!',
							duration: 500
						});
					}
				}
			},
			// 4.切换密码显示方式
			dealPwdModel(flag) {
				this.pwdModel = !flag;
			},
			// 5.刷新图形验证码
			getCaptcha() {
				this.$set(this.$refs.captcha, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date())
			}
		}
	}
</script>

<style lang="less" scoped>
	.loginWrapper {
		width: 100%;
		height: 100%;
	}

	.loginInner {
		position: absolute;
		top: 6rem;
		margin-left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}

	.loginModel {
		margin-top: 1rem;
	}

	.loginModel a {
		color: #555555;
		font-size: 0.875rem;
	}

	.loginModel a + a {
		margin-left: 2rem;
	}

	.loginModel .current {
		font-weight: bold;
		color: #2EB257;
		border-bottom: 0.125rem solid #2EB257;
	}

	.loginContent {
		position: absolute;
		margin-top: 15rem;
		width: 100%;
		text-align: center;
	}

	.loginMessage {
		position: relative;
	}

	.loginMessage input {
		width: 16rem;
		height: 2.5rem;
		border: 1px solid #cccccc;
		border-radius: 2px;
		padding-left: 1rem;
		font-size: 0.875rem;
		margin-top: 1rem;
	}

	.loginMessage input:focus {
		border: 1px solid #2EB257;
	}

	.loginMessage .loginHint {
		width: 16rem;
		height: 2.5rem;
		line-height: 1.25rem;
		margin-top: 1rem;
		font-size: 0.75rem;
		display: inline-block;
		color: #ccc;
		text-align: left;
	}

	.getVerification {
		position: absolute;
		height: 2.5rem;
		background-color: transparent;
		margin-left: -5rem;
		margin-top: 1rem;
		font-size: 0.875rem;
		color: #ccc;
	}

	.phoneRight {
		color: #2EB257;
	}

	.loginSubmit, .loginBack {
		width: 16rem;
		margin-top: 1rem;
		height: 2.5rem;
		background-color: #2EB257;
		color: #fff;
		border-radius: 2px;
	}

	.loginBack {
		color: #2EB257;
		background-color: #ffffff;
		border: 1px solid #2EB257;
	}

	.showPwd {
		position: absolute;
		right: 0;
		margin-right: 4rem;
		margin-top: -1.8rem;
	}

	.captcha {
		position: absolute;
		right: 0;
		margin-right: 3rem;
		margin-top: 1rem;
	}
</style>