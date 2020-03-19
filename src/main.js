import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');



// 修复路由跳转的错误
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};