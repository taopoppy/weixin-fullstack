// 路由集中管理
const routePath = {
  "index": "/pages/index/index",
  "pay":"/pages/pay/index",
  "activity":"/pages/activity/index",
}

module.exports = {
  // 页面跳转
  // 使用方式
  push(path, option={}) {
    if(typeof path === 'string') {
      option.path = path
    } else {
      option = path
    }
    let url = routePath[option.path]
    let { query={}, openType, duration } = option
    let params = this.parse(query)
    if(params) {
      url += "?" + params
    }
    duration
    ? setTimeout(()=> { this.to(openType, url)}, duration)
    : this.to(openType, url)
  },
  // 页面跳转辅助函数to
  to(openType, url) {
    let obj = { url }
    if(openType === "redirect") {
      wx.redirectTo(obj)
    } else if(openType === 'reLaunch'){
      wx.reLaunch(obj)
    } else if(openType === 'back') {
      wx.navigateBack({delta: 1,})
    } else {
      wx.navigateTo(obj)
    }

  },
  // 页面跳转辅助函数parse
  parse(data) {
    let arr =[]
    for(let key in data) {
      arr.push(key + '=' + data[key])
    }
    return arr.join('&')
  }
}