import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import $ from 'jquery';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS);
Vue.use(mavonEditor);
Vue.config.productionTip = false

new Vue({
  router,
  store,
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
router.afterEach((to,from,next)=>{
  window.scrollTo(0,0);
  let sidebar = document.getElementsByClassName('sidebar')[0];
  let header = document.getElementsByTagName('header')[0];
  let footer = document.getElementsByTagName('footer')[0];
  sidebar.classList.remove('move');
  header.classList.remove('move');
  footer.classList.remove('move');
});
$(window).resize(function () {
  if($(window).width()>900){
    $('.sidebar').removeClass('move');
    $('header').removeClass('move');
    $('footer').removeClass('move');
    $('#mainPage').removeClass('move')
  }
})
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as hljs from "highlight.js";
Vue.use(ElementUI);

// highlight
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
});
import './js/ribbon'