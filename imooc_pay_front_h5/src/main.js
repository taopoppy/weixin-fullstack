/**
 * @author taopoppy
 * @description 项目入口执行文件
 */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios' // 帮助将axios挂载到vue上，每个页面通过this.axios请求
import router from './router/index' // 引入路由文件
import './assets/css/commen.css' // 引入全局通用样式
Vue.config.productionTip = false

axios.interceptors.request.use(function(){
  // 请求地址的处理（修改替换），请求loading的处理都可以在这里进行
})

axios.interceptors.response.use(
  function(response){// 请求响应的处理,请求成功了，但是请求结果出错
    let res = response.data
    if(res.code != 0) {
      // 统一处理
      alert(res.message)
    }
  },
  function(error){ // 网络请求发生错误,这样可以通过catch捕获到组件通过this.axios请求的异常
    return Promise.reject(error)
  }
)

Vue.use(VueAxios, axios)
new Vue({
  router, // 进行路由配置
  render: h => h(App),
}).$mount('#app')
