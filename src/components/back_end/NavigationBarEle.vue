<template>
  <keep-alive>
    <div class="header">
      <div class="container">

        <el-menu :default-active="this.$route.matched[1].path" class="el-menu" mode="horizontal" router>
          <img src="../../assets/logo.png" class="icon" alt="">
          <span class="icon-text">后台管理</span>
          <el-menu-item :index="'/admin/blog'" :key="1" class="menu-item" >
            <i class="el-icon-receiving"></i>
            <span>博客</span>
          </el-menu-item>
          <el-menu-item :index="'/admin/type'" :key="2" class="menu-item">
            <i class="el-icon-files"></i>
            <span>分类</span>
          </el-menu-item>
          <el-menu-item :index="'/admin/tags'" :key="3" class="menu-item">
            <i class="el-icon-collection-tag"></i>
            <span>标签</span>
          </el-menu-item>
          <li class="head-portrait"><img :src = this.avatar  alt=""></li>
          <el-submenu index="user" class="userInfo">
            <template slot="title" >{{nickname}}</template>
            <el-menu-item index="4-1" @click="logOut">注销</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </keep-alive>
</template>

<script>

  import {request} from "../../network/request";

  export default {
    name: "NavigationBarEle",
    data(){
     return{
       avatar:sessionStorage.getItem('avatar'),
       nickname:sessionStorage.getItem('nickname')
     }
    },
    methods:{
      logOut(){
        request({
          method:'get',
          url:'/admin/users/logout'
        }).then(res=>{
          if (res.code === 0){
            window.sessionStorage.removeItem('isLogin');
            this.$router.push('/login');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .header{
    position: fixed;
    width: 100%;
    height: 64px;
    z-index: 100;
    padding: 0;
    top: 0;
    border-bottom: 1px solid #dcdfe6;

  }

  .container{
    width: 1140px;
    min-width: 1140px;
    margin: 0 auto;
    padding: 0;
    height: 100%;
  }

  .icon {
    float: left;
    position: relative;
    display: inline-block;
    height: 50px;
    width: 50px;
    z-index: 100;
    top: 7px;
  }

  .icon-text{
    float: left;
    color: #2794e9;
    font-size: 25px;
    font-weight: bold;
    line-height: 64px;
    margin: 0 50px 0 30px;
  }

  .el-menu{
    line-height: 64px;
    height: 100%;

  }
  .menu-item{
    float: left;
    margin-left: 20px;
    height: 64px;
    position: relative;
  }
  .head-portrait img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex inline;
    align-items: center;
    justify-content: center;

  }

  .head-portrait{
    position: relative;
    top: 12px;
    float: left;
    margin-left: 400px;
  }

  .userInfo{
    float: left;
  }


</style>