<template>
	<div>
		<h4>支付页面</h4>
		<input type="text" v-bind="money"/>
		<button v-on:click="pay">支付</button>
	</div>
</template>

<script>
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
		}
	}
}
</script>

<style scoped>

</style>