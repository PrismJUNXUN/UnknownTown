<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../../assets/icon.png" alt="logo">
    </div>
    <ul>
      <li><router-link to="/"><i class="iconfont icon-FamilyOutline"></i>首页</router-link></li>
      <li><router-link to="/type"><i class="iconfont icon-OpenfolderOutline"></i>分类</router-link></li>
      <li><router-link to="/tag"><i class="iconfont icon-EnshrineOutline"></i>标签</router-link></li>
      <li><router-link to="/file"><i class="iconfont icon-RocketOutline"></i>归档</router-link></li>
      <li><router-link to="/about"><i class="iconfont icon-PersonalOutline"></i>关于</router-link></li>
    </ul>
    <div><input class="searchbox" type="text" v-model="searchParams"></input><i class="iconfont icon-sousuo" @click="search()"></i></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "SideBar",
    data(){
      return{
        searchParams:''
      }
    },
    methods: {
      search() {
        if (this.searchParams !== '') {
          this.$router.push('/search/' + this.searchParams);
        } else {
          this.$message({
            message: '搜索内容不能为空',
            type: "warning"
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1687810_5505cbvexzj.css");
  @import "../../assets/css/normalize.css";
  @import url("//at.alicdn.com/t/font_1796117_yj9fjcd3rn.css");
  .sidebar{
    position: fixed;
    display: none;
    width: 254px;
    height: 100%;
    right: -254px;
    top: 0;
    background: #ffffff;
    z-index:1501;
    transition: .5s all ease;
  }
  .sidebar .logo{
    margin: 20px auto;
  }
  .sidebar .logo img{
    margin: 20px auto 20px auto;
    display: block;
    width: 100px;
    height: 100px;
    animation: circle linear 10s infinite;
    padding: 0;
  }
  @keyframes circle {
    25%{
      transform: rotate(90deg);
    }
    50%{
      transform: rotate(180deg);
    }
    75%{
      transform: rotate(270deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .sidebar ul{
    padding: 20px 0 0 0;
    margin:0;
  }
  .sidebar ul li{
    list-style: none;
    transition: .3s all ease;
  }
  .sidebar ul li:hover{
    background-color: #acdcff;
  }
  .sidebar ul li a{
    text-decoration: none;
    height: 50px;
    width: 100%;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    display: block;
    font-family: Lato, Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, "Microsoft YaHei", Helvetica Neue, Helvetica, Arial, sans-serif;
    color: #515151;
    letter-spacing: 4px;
  }
  .sidebar ul li a i{
    padding-right: 35px;
    font-weight: 600;
  }

  .sidebar .searchbox{
    width: 150px;
    height: 25px;
    border-radius: 2px;
    border: 1px #9f9f9f dashed;
    margin-top: 20px;
    margin-left: 40px;
    font-size: 14px;
  }
  .sidebar .icon-sousuo{
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
    transition: .2s all ease;
  }
  .sidebar .icon-sousuo:hover{
    color: #49b1f5;
  }
  .active{

  }

  @media screen and (max-width: 900px){
    .sidebar{
      display: block !important;
    }
  }
</style>