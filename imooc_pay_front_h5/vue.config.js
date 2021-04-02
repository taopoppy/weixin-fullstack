module.exports = {
	devServer: {
		host: 'm.abcd.com', // 设置主机地址
		port: 80, // 设置默认端口
		proxy: {
			'/api': {
				// 设置目标API地址
				target: 'http://localhost:5000',
				// 如果要代理websockets
				ws:false,
				// 将主机标头的原点改为目标URL
				// changeOrigin:true表示比如我们访问/api/test,实际访问的是localhost:5000/test
				// changeOrigin:false表示比如我们访问/api/test,实际访问的是localhost:5000/api/test
				changeOrigin:false
			}
		}
	}
}