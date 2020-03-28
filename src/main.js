import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import $ from 'jquery';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true ;

// router.beforeEach((to, from, next) => {
//   next()
// });

// 修复路由跳转的错误
import Router from 'vue-router'

import './plugins/element.js'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

