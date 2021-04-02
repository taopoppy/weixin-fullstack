<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import API from './api/index'
import wx from 'weixin-js-sdk'
import util from './util/index'
export default {
  name: 'app',
  mounted() {
    this.checkUserAuth()
  },
  methods: {
    // 判断用户是否授权
    checkUserAuth() {
      // 第一次进来的时候需要授权，后面再进来就不需要了
      let openId = this.$cookie.get('openId') // 在node当中注入一个openId，写库
      if(!openId) {
        // 如果没有获取到openId,服务端会做重定向，进行微信授权，同时获取openid
        window.location.href = API.wechatRedirect
      } else {
        // 如果有openid，直接去获取配置
        this.getWechatConfig()
      }
    },
    // 获取微信的配置信息
    getWechatConfig() {
      // 请求后端地址，后端使用我们携带的query url进行签名，然后请求微信的配置，返回给我们
      let url = API.wechatConfig + '?url=' + location.href.split('#')[0]
      this.$http.get(url)
      .then((response)=> {
        let res = response.data
        if(res.code == 0) {
          let data = res.data

          // 成功返回配置，我们使用wx.config进行注入
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: data.jsApiList // 必填，需要使用的JS接口列表
          })

          // 注入后通过ready接口处理成功验证
          wx.ready(()=> {
            util.initShareInfo()
          })
        }
      })
    },
    test() {
      // setTimeout(()=> {
      //   let APPID = "wx1c9b84a50e29f2af"
      //   let REDIRECT_URI = encodeURIComponent("http://m.abcd.com/#/index")
      //   let SCOPE = "snsapi_userinfo"
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=STATE#wechat_redirect`
      // },5000)
    }
  }
}
</script>

<style>
</style>
