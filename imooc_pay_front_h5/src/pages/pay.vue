<template>
	<div>
		<h4>支付页面</h4>
		<input type="number" v-model="money"/>
		<span style="font-size:20px">{{money/100}}元</span>
		<button v-on:click="pay">支付</button>
	</div>
</template>

<script>
import API from '../api/index.js'
import wx from 'weixin-js-sdk'
export default {
  name: 'pay',
	data() {
		return {
			money: 0
		}
	},
	methods: {
		pay() {
			// H5支付
			if(this.money === 0 || this.money === undefined || this.money ===null) {
				alert("请输入正确得金额")
			}
			this.$http.get(API.payWallet, {
				params: {
					money: this.money
				}
			}).then((response)=> {
				let result = response.data
				if(result && result.code === 0) {
					// 请求成功就支付
					// 通过微信得JS-AP拉起微信支付
					let res = result.data
					wx.chooseWXPay({
						timestamp: res.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
						package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: res.paySign, // 支付签名
						success: function (res) {
							// 支付成功后的回调函数，支付成功和取消都算成功
							if(res.errMsg === 'chooseWXPay:ok') {
								// 用户端的支付成功，真正成功的表现时微信服务器去调用我们Node的回调地址
								alert('支付成功')
							} else if(res.errMsg === 'chooseWXPay:fail'){
								alert('支付取消')
							}
						},
						cancel: function() {
							alert("支付取消")
						},
						fail: function(res) {
							// 正儿八经得请求支付失败了
							alert("支付失败", res.errMsg)
						}
					});
				} else {
					alert(result.message)
				}
			})
		}
	}
}
</script>

<style scoped>

</style>