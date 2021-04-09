module.exports = {
  // 开发环境
  Dev: {
    baseApi: "http://localhost:3000"
  },
  // 测试环境
  Test: {
    baseApi: "http://test-node.abcd.com"
  },
  // 预发布环境
  Slave: {
    baseApi: "http://slave-node.abcd.com"
  }, 
  // 线上环境
  Prod: {
    baseApi: "http://m.abcd.com/api"
  },
}