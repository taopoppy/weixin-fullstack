const envList = {
	env: {
		baseUrl: ''
	},
	test: {
		baseUrl: ''
	},
	prod: {
		domain: 'http://m.51purse.com',
		baseUrl: ''
	},
}

// 每次手工修改项目的环境变量
let currentEnv = 'prod'

// 根据当前浏览器环境动态设置环境变量
let params = {
	'dev-m.51purse.com': 'dev',
	'test-m.51purse.com': 'test',
	'm.51purse.com': 'prod',
}

// 根据浏览器当前域名选择环境变量
currentEnv = params[location.hostname]

export default envList[currentEnv]