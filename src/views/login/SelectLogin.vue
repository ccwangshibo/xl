<template>
	<div class="selectLogin">
		<router-link tag="button" to="/login" class="login">立即登录</router-link>
	</div>
</template>

<script>
	export default {
		name: "SelectLogin"
	}
</script>

<style lang="less" scoped>
	.selectLogin {
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%);
	}

	.login {
		width: 10rem;
		height: 3rem;
		color: #fff;
		background-color: #2EB257;
		line-height: 3rem;
	}
</style>