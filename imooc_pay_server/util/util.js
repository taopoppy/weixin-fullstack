/**
 * 公共函数定义
 */
let createHash = require('create-hash');
module.exports = {
  // 生成签名（支付）
  getSign(params, key){
    let string = this.raw(params) + '&key=' + key;
    let sign = createHash('md5').update(string).digest('hex');
    return sign.toUpperCase();
  },
  // 生成Node后端的交易订单号（支付）
  getTradeId(type='wx'){
    let date = new Date().getTime().toString();
    let text = ''; // 5位的随机数
    let possible = '0123456789';
    for(let i=0;i<5;i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return (type == 'wx'?'TaopoppyWxJuZi':'TaopoppyMpJuZi') + date + text;
  },
  // 生成随机数（分享）
  createNonceStr(){
    // toString(36)转化成为36进制的，substr(2,15)截取2-15位
    return Math.random().toString(36).substr(2,15);
  },
  // 生成时间戳（分享）
  createTimeStamp(){
    // getTime()/1000转换成秒
    return parseInt(new Date().getTime() / 1000) + ''
  },
  // Object 转换成json并排序（分享）
  // {c:3, b:2, d:4, a:1} => 'a=1&b=2&c=3&d=4'
  raw(args){
    let keys = Object.keys(args).sort();
    let obj = {};
    keys.forEach((key)=>{
      obj[key] = args[key];
    })
    // {a:1,b:2} =>  &a=1&b=2
    // 将对象转换为&分割的参数
    let val = '';
    for(let k in obj){
      val += '&' + k + '=' +obj[k];
    }
    return val.substr(1);
  },
  // 对请求结果统一封装处理
  // body实际上也是涵盖在response当中的
  handleResponse(err, response, body){
    if (!err && response.statusCode == '200') {
      let data = JSON.parse(body);

      if (data && !data.errcode){
        return this.handleSuc(data);
      }else{
        return this.handleFail(data.errmsg, data.errcode);
      }
    }else {
      return this.handleFail(err, 10009);
    }
  },
  // 处理成功响应
  handleSuc(data=''){
    return {
      code: 0,
      data,
      message: ''
    }
  },
  // 处理错误响应
  handleFail(message = '',code = 10001){
    return {
      code,
      data:'',
      message
    }
  }
}