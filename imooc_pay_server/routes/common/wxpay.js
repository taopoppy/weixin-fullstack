/**
 * 微信小程序、H5通用支付封装
 */
let config = require('./../pay/config')
let request = require('request')
let util = require('../../util/util')
let createHash = require('create-hash')
let xml = require('xml2js')
config = config.mch; // 商户的信息

module.exports = {
  // 统一下单接口
  order: function (appid,attach, body, openid, total_fee, notify_url, ip){
    return new Promise((resolve,reject)=>{
      let nonce_str = util.createNonceStr(); // 生成随机字符串
      let out_trade_no = util.getTradeId('mp'); // 生成商户订单号
      // 支付前需要先获取支付签名
      let sign = this.getPrePaySign(appid, attach, body, openid, total_fee, notify_url, ip, nonce_str, out_trade_no);
      // 通过参数和签名组装xml数据，用以调用统一下单接口
      let sendData = this.wxSendData(appid, attach, body, openid, total_fee, notify_url, ip, nonce_str, out_trade_no, sign);
      let self = this;
      let url = 'https://api.mch.weixin.qq.com/pay/unifiedorder'; // 微信统一下单地址
      request({
        url,
        method: 'POST',
        body: sendData
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          // 返回的reponse.body是xml的格式，所以要解析
          xml.parseString(body.toString('utf-8'),(error,res)=>{
            if(!error){
              let data = res.xml;
              console.log('data:' + JSON.stringify(data));
              if (data.return_code[0] == 'SUCCESS' && data.result_code[0] == 'SUCCESS'){
                // 获取预支付的ID
                let prepay_id = data.prepay_id || [];
                // 组装要返回给小程序的支付参数
                let payResult = self.getPayParams(appid, prepay_id[0]);
                resolve(payResult);
              }
            }
          })
        } else {
          resolve(util.handleFail(err));
        }
      })
    })
  },
  // 生成预支付的签名
  getPrePaySign: function (appid, attach, body, openid, total_fee, notify_url, ip, nonce_str, out_trade_no) {
    let params = {
      appid,
      attach,
      body,
      mch_id: config.mch_id,
      nonce_str,
      notify_url,
      openid,
      out_trade_no,
      spbill_create_ip: ip,
      total_fee,
      trade_type: 'JSAPI'
    }
    let string = util.raw(params) + '&key=' + config.key; // 按照官网要求要拼接商户key(也叫作商户秘钥)
    let sign = createHash('md5').update(string).digest('hex');
    return sign.toUpperCase();
  },

  // 签名成功后 ，根据参数拼接组装XML格式的数据，调用下单接口
  wxSendData: function (
    appid,        // appid
    attach,       // 附加数据
    body,         // 商品描述
    openid,       // 用户标识
    total_fee,    // 标价金额
    notify_url,   // 通知地址
    ip,           // 微信支付API的机器IP
    nonce_str,    // 随机字符串
    out_trade_no, // 商户订单号（自己服务器生成的要保存在自己数据库的订单号）
    sign          // 预支付的签名 =》 getPrePaySign获得
  ) {
    let data = '<xml>' +
      '<appid><![CDATA[' + appid + ']]></appid>' +
      '<attach><![CDATA[' + attach + ']]></attach>' +
      '<body><![CDATA[' + body + ']]></body>' +
      '<mch_id><![CDATA[' + config.mch_id + ']]></mch_id>' +
      '<nonce_str><![CDATA[' + nonce_str + ']]></nonce_str>' +
      '<notify_url><![CDATA[' + notify_url + ']]></notify_url>' +
      '<openid><![CDATA[' + openid + ']]></openid>' +
      '<out_trade_no><![CDATA[' + out_trade_no + ']]></out_trade_no>' +
      '<spbill_create_ip><![CDATA[' + ip + ']]></spbill_create_ip>' +
      '<total_fee><![CDATA[' + total_fee + ']]></total_fee>' +
      '<trade_type><![CDATA[JSAPI]]></trade_type>' +
      '<sign><![CDATA['+sign+']]></sign>' +
    '</xml>'
    return data;
  },

  // 解析统一下单返回的结果，返回给小程序5个参数，参照https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5
  getPayParams:function(appId,prepay_id){
    let params = {
      appId,                              // appid
      timeStamp:util.createTimeStamp(),   // 时间戳
      nonceStr:util.createNonceStr(),     // 随机字符串
      package: 'prepay_id=' + prepay_id,  // 数据包
      signType:'MD5'                      // 签名方式
    }
    let paySign = util.getSign(params,config.key);
    params.paySign = paySign; // paySign实际上是对其他所有参数的签名
    return params;  // 返回给小程序，小程序拿这个信息去直接请求微信服务器
  }
}