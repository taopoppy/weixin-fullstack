/**
 * @author taopoppy
 * @description 公共函数定义
 */
import wx from 'weixin-js-sdk'

export default {
	// 访问localhost:3000?a=1&b=2 getUrlParam('a')=1 getUrlParam('b')=2
	getUrlParam(name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)')
		let r = window.location.search.substr(1).match(reg)
		if(r!=null){
			return decodeURIComponent(r[2])
		}
	},

	// 定义分享功能
	initShareInfo() {
		let shareInfo = {
			title: '支付和分享课程', // 分享标题
			desc: '欢迎学习', // 分享描述
			link: 'http://m.abcd.com/#/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: '', // 分享图标
		}
		wx.onMenuShareTimeline(shareInfo) // 即将废弃的API
		wx.onMenuShareAppMessage(shareInfo)// 即将废弃的API
		wx.onMenuShareQQ(shareInfo)// 即将废弃的API
		wx.onMenuShareQZone(shareInfo)// 即将废弃的API
		wx.updateAppMessageShareData(shareInfo) // 分享给朋友，分享给QQ
		wx.updateTimelineShareData(shareInfo) // 分享到朋友圈，分享到QQ空间
	}
}