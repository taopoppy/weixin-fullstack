/**
 * @author taopoppy
 * @description 公共函数定义
 */
export default {
	// 访问localhost:3000?a=1&b=2 getUrlParam('a')=1 getUrlParam('b')=2
	getUrlParam(name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)')
		let r = window.location.search.substr(1).match(reg)
		if(r!=null){
			return decodeURIComponent(r[2])
		}
	}
}