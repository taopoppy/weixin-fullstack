/**
 * @author taopoppy
 * @description 项目入口执行文件
 */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios' // 帮助将axios挂载到vue上，每个页面通过this.$http请求
import VueCookie from 'vue-cookie' // 引入Vuecookie
import router from './router/index' // 引入路由文件
import './assets/css/base.css' // 引入清除默认样式文件
import './assets/css/commen.css' // 引入全局通用样式


Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueCookie)

axios.interceptors.request.use(function(request){
  // 请求地址的处理（修改替换），请求loading的处理都可以在这里进行
  return request
})

//{code: 0,data返回的是结果，message是报错原因}
axios.interceptors.response.use(
  function(response){// 请求响应的处理,请求成功了，但是请求结果出错
    let res = response.data
    if(res.code != 0) {
      // 统一处理
      alert(res.message)
    }
    return response
  },
  function(error){ // 网络请求发生错误,这样可以通过catch捕获到组件通过this.axios请求的异常
    return Promise.reject(error)
  }
)


new Vue({
  router, // 进行路由配置
  render: h => h(App),
}).$mount('#app')
