// 小程序没有cookie，通过storage来进行存储管理
const STORAGE_KEY = "imooc-pay"
module.exports = {
  // 设置存储
  setItem(key, value, module_name) {
    if(module_name) {
      // 模块存储，比如 userinfo : { username: 'taopopy', userage: 25}
      let module_name_info = this.getItem(module_name)
      module_name_info[key] = value
      wx.setStorageSync(module_name, module_name_info)
    } else {
      // 非模块存储，比如 name : 'taopopy'
      wx.setStorageSync(key, value)
    }
  },
  // 获取存储
  getItem(key, module_name) {
    if(module_name) {
      let val = this.getItem(module_name)
      if(val) {
        return val[key]
      }
      return ''
    } else {
      return wx.getStorageSync(key)
    }
  },
  // 删除存储
  delelte(key,module_name) {
    if(module_name) {
      let module_name_info = this.getItem(module_name)
      if(module_name_info[key]) {
        delete module_name_info[key]
        wx.setStorageSync(module_name, module_name_info)
      }
    } else {
      wx.removeStorageSync(key)
    }
  },
  // 清空存储
  clear(key) {
    key? wx.removeStorageSync(key): wx.clearStorageSync()
  },
  // 获取系统信息
  getSystemInfo() {
    return wx.getSystemInfoSync
  }
}