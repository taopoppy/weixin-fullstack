// app.js
import Api from './http/api.js';
import request from './http/request.js';
import config from './env/index.js';
const env = 'Dev'                    // 可选的值有 Dev、Test、Slave、Prod

// 注意，只有页面才能通过const app = wx.getApp()的方式拿到App
// 所以普通的js文件要想获取只能通过全局变量App，所以这些信息直接通过App.xxx的方式挂载即可
App.version = "1.0.0",             // 定义开发版本
App.config = config[env]           // 根据不同的环境获取不同的配置
App.config.env = env               // 配置当中也加入环境的名称

App({
  config: config[env],             // 挂载不同环境的配置 
  Api:Api,                         // api信息全部挂载到app对象上
  get: request.fetch,              // get方法
  post: (url, data,option) => {    // post方法
    option.method = "post"
    return request.fetch(url, data,option)
  },
  onLaunch() {
    // 登录
  },
  globalData: {
    userInfo: null
  }
})
