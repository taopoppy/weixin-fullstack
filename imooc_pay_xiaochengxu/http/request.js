// 公共请求方法

let store = require('../utils/store.js')
let systemInfo = store.getSystemInfo()
const clientInfo = {
  "clientType": "mp",         // 客户端类型
  "appName": "imoocpay",      // app名称
  "model": systemInfo.model,  // 系统型号
  "os": systemInfo.system,    // 操作系统和版本
  "screen": systemInfo.screenWidth + "*" + systemInfo.screenHeight, // 屏幕的尺寸信息
  "version": App.version,     // 开发版本 
  "channel": "miniprogram"    // 通道信息
}

const errMsg = "服务异常，请稍后重试"

module.exports = {
  // 可以选择是否显示请求过程loading 和 请求成功和失败的提示toast
  // get方法：get('/index',{a:1},{loading:false,toast:true})
  fetch: (url, data={}, option={}) => {
    let { loading=true, toast=true, method='get'} = option
    return new Promise((resolve, reject) => {
      if(loading) {
        wx.showLoading({
          title: 'loading...',
          mask: true
        })
      }
      let baseUrl = App.config.baseApi
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header: {
          clientInfo: JSON.stringify(clientInfo)
        },
        success: function(result){
          let res = result.data // {code: 0, data: message: xxx}
          if(res.code === 0) {
            if(loading) {
              wx.hideLoading()
            }
            resolve(res.data)
          } else {
            if(toast) {
              // 需要给用户报错的时候我们才报错
              // showToast显示的时候会自动关闭前一个loading，所以这里我们不需要先wx.hideLoading
              wx.showToast({
                title: res.message,
                icon: 'none',
                mask: true
              })
            } else {
              wx.hideLoading()
            }
            reject(res)
          }
        } ,
        fail:function(e={code:-1,msg:errMsg, errMsg}) {
          let msg = e.errMsg
          if(msg = 'request:fail timeout') {
            msg = "服务请求超时，请稍后处理"
          }
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          reject(e)
        }
      })
    })
  }
}