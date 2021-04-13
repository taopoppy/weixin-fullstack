<template>
	<div class="index">
		<img src="../assets/img/header.png" class="header" alt="">
		<div class="nickname" v-if="userInfo" v-text="userInfo.nickname"></div>
		<div class="btn-group">
			<button class="btn">分享</button>
			<button class="btn btn-primary" v-on:click="goToPay">充值</button>
			<button class="btn">活动详情</button>
		</div>
	</div>
</template>

<script>
import API from '../api/index'
export default {
  name: 'index',
	data() {
		return {
			userInfo: ''
		}
	},
	mounted() {
		if(this.$cookie.get('openId')){
			// 如果已经授权完成，我们就去获取获取用户信息
			this.getUserInfo()
		}
	},
	methods: {
		//跳转到支付页面
		// eslint-disable-next-line no-unused-vars
		goToPay: function(event) {
			this.$router.push({
				path: "/pay"
			})
		},
		// 获取用户信息
		getUserInfo() {
			this.$http.get(API.getUserInfo).then((response) => {
				let res = response.data
				this.userInfo = res.data
			})
		}
	}
}
</script>

<style scoped>
.index {
	height: 100vh;
	background-color: #ffc93a;
}
.btn-group {
	padding-top: .34rem;
	text-align: center;
}

</style>