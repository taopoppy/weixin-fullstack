// pages/pay/index.js
const app = getApp()
let Api = app.Api
let store = require('../../utils/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: 0
  },
  bindKeyInput:function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  pay: function() {
    if(this.data.inputValue === 0) {
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none'
      })
      return
    }
    // 请求Node端，Node端请求微信服务器的统一下单接口
    app.get(Api.payWallet, {
      money: this.data.inputValue,
      openId: store.getItem("openId")
    }).then((res)=> {
      console.log("预支付信息",res)
        wx.requestPayment(
          {
            'timeStamp': res.timeStamp,
            'nonceStr': res.nonceStr,
            'package': res.package,
            'signType': 'MD5',
            'paySign': res.paySign,
            'success':function(res){
              console.log("支付成功",res)
              if(res.errMsg === 'requestPayment:ok'){
                wx.showToast({
                  title: '支付成功',
                  icon:'success'
                })
              }
            },
            'fail':function(res){
              console.log("支付失败",res)
              if(res.errMsg === 'requestPayment:fail cancel'){
                wx.showToast({
                  title: '支付失败',
                  icon:'none'
                })
              }
            },
            'complete':function(res){
              console.log("支付完成") // 接口调用结束的回调函数（调用成功、失败都会执行）
              this.setData({
                inputValue: 0
              })
            }
          })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})