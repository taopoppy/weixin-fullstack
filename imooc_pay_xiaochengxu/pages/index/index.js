// index.js
// 获取应用实例
const app = getApp()
let Api = app.Api
let store = require('../../utils/store.js')
let router = app.router

Page({
  data:{
    userId: store.getItem('userId')
  },
  onLoad:function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    // 判断用户是否登录
    if(!this.data.userId) {
      // 没有登录就去登录，获取code，再获取openid
      this.getSession()
    }
  },
  // 根据code去获取session
  getSession() {
    wx.login({
      success: res => {
        console.log("登录成功",res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code) {
          // 请求node后端，node后端再请求微信服务器获取到openid
          app.get(Api.getSession, {
            code:res.code
          }).then((res)=> {
            console.log("getSession的结果",res)
            // 拿到openid，小程序端保存
            store.setItem('openId',res.openid)
          }).catch((res)=> {
            console.log('error:'+ res.message)
          })
        }
      }
    })
  },
  // 获取用户信息并请求后端Node登录接口
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('用户信息',res)
        let userInfo = res.userInfo
        userInfo.openid = store.getItem("openId")
        // 请求Node后端登录接口
        app.get(Api.login,{userInfo}).then((res)=> {
          store.setItem("userId", res.userId)
          this.setData({
            userId:res.userId
          })
        })
      }
    })
  },

  // 充值按钮
  recharge:function() {
    router.push('pay')
  },
  // 活动详情按钮
  activity:function() {
    router.push('activity')
  },
  // 分享逻辑
  onShareAppMessage() {
    return {
      title: "欢迎来到taopoppy的music",
      path: "/pages/index/index",
      imageUrl: "/assets/images/header.png"
    }
  }
})
