import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("../views/management/Login.vue");
const Home = () => import("../views/home/Home");
const Admin = () => import("../views/management/Admin");

Vue.use(VueRouter);

const routes = [
  {
    path:'',
    redirect:'/login'
  },
    {
    path:'/login',
    component:Login,
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/admin',
    component:Admin
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router
