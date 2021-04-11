/**
 * @author taopoppy
 * @description 微信接口统一封装处理
 */
let request = require('request');
let config = require('./../pay/config');
let util = require('./../../util/util')
config = config.wx;

// 获取网页授权access_token(H5)
exports.getAccessToken = function(code){
  let token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`;
  return new Promise((resolve, reject) => {
    request.get(token_url, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      resolve(result);
    })
  });
}

// 获取用户信息(H5)
exports.getUserInfo = function (access_token,openId){
  let userinfo = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openId}&lang=zh_CN`;
  return new Promise((resolve,reject)=>{
    request.get(userinfo, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      resolve(result);
    })
  })
}

// 获取基础接口的Token（有效期7200秒，开发者必须在自己的服务全局缓存access_token）(H5)
exports.getToken = function(){
  let token = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`;
  return new Promise((resolve, reject)=>{
    request.get(token, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      resolve(result);
    })
  })
}

// 根据Token获取Ticket(H5)
// 频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket
// 建议也是两个小时，因为jsapi_ticket由access_token决定
exports.getTicket = function (token) {
  let tokenUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
  return new Promise((resolve, reject) => {
    request.get(tokenUrl, function (err, response, body) {
      let result = util.handleResponse(err, response, body);
      resolve(result);
    })
  })
}