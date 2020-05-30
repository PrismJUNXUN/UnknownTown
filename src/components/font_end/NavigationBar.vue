<template>
  <header>
    <a href="#" class="logo">无名小镇</a>
    <ul>
      <li><router-link to="/"><i class="iconfont icon-FamilyOutline"></i>首页</router-link></li>
      <li><router-link to="/type"><i class="iconfont icon-OpenfolderOutline"></i>分类</router-link></li>
      <li><router-link to="/tag"><i class="iconfont icon-EnshrineOutline"></i>标签</router-link></li>
      <li><router-link to="/file"><i class="iconfont icon-RocketOutline"></i>归档</router-link></li>
      <li><router-link to="/about"><i class="iconfont icon-PersonalOutline"></i>关于</router-link></li>
      <li><i class="iconfont icon-sousuo" @click="search()"></i><input class="searchbox" type="text" v-model="searchParams"></input></li>
    </ul>
    <i class="iconfont icon-enabled" @click="sidebarShow()"></i>
  </header>
</template>

<script>
  export default {
    name: "NavigationBar",
    data(){
      return{
        searchParams:''
      }
    },
    mounted() {
      window.addEventListener("scroll",function () {
        let header = document.getElementsByTagName("header")[0];
        header.classList.toggle("sticky",window.scrollY > 0);
      });
    },
    methods:{
      search(){
        if (this.searchParams!==''){
          this.$router.push('/search/'+this.searchParams);
        }else {
          this.$message({
            message:'搜索内容不能为空',
            type:"warning"
          })
        }
      },
      sidebarShow(){
        let sidebar = document.getElementsByClassName('sidebar')[0];
        let mainPage = document.getElementById('mainPage');
        let header = document.getElementsByTagName('header')[0];
        let footer = document.getElementsByTagName('footer')[0];
        sidebar.classList.toggle('move');
        mainPage.classList.toggle('move');
        header.classList.toggle('move');
        footer.classList.toggle('move');
      }
    },

  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1687810_5505cbvexzj.css");
  @import url("//at.alicdn.com/t/font_1796117_pkj8y4kcqqj.css");
  @import "../../assets/css/normalize.css";

  *{
    margin: 0;
    padding: 0;
    font-family: "popping",sans-serif;
    box-sizing: border-box;
  }
  header{
    position:fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 2px;
    transition: .5s all ease;
    padding: 20px 100px;
    z-index: 1500;
  }

  header .logo{
    position: relative;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    font-size: 26px;
    letter-spacing: 2px;
    transition: .6s;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,sans-serif;
  }

  header.sticky {
    padding: 15px 100px;
    background: #fff;
    box-shadow: 1px 1px 5px #acacac;
  }

  header ul{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header ul li {
    position: relative;
    list-style: none;
    color: #fff;
    transition: .7s all;
  }

  header ul li a{
    position: relative;
    margin: 0 15px;
    padding-bottom: 5px;
    text-decoration: none;
    color: #fff;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 500;
    transition: .6s;
  }

  header .icon-enabled{
    color: #ffffff;
    font-size: 20px;
    transition: .2s all linear;
    display: none;
  }

  header.sticky .logo{
    color: #515151;
  }

  header.sticky ul li{
    color: #515151;
  }

  header.sticky ul li a{
    color: #515151;
  }
  header.sticky input{
    border: 1px solid rgba(75, 75, 75, 0.15);
  }
  header.sticky .icon-enabled{
    color: #515151;
  }

  header ul li a:before{
    content: '';
    position: absolute;
    border-bottom: 3px solid #29a3fd;
    bottom: 0;
    transition: .7s all;
    animation: linear .7s linear;
  }
  header ul li a:hover:before{
    width: 100%;
    animation: borderline 0.2s linear 1;
    -moz-animation: borderline 0.2s linear 1;
  }

  header ul li :hover{
    color: #29a3fd;
  }

  header .logo:hover{
    color: #29a3fd;
  }
  header ul li a:hover{
    color: #29a3fd;
  }
  header .icon-enabled:hover{
    color: #29a3fd;
  }
.icon-sousuo{
  font-size: 20px;
  font-weight: 600;
}
  @keyframes borderline {
    0%{width: 0;}
    30%{width: 30%;}
    60%{width: 60%;}
    100%{width: 100%;}

  }
  .searchbox{
    width: 120px;
    height: 25px;
    background-color: rgba(0,0,0,0);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    font-size: 14px;
    color: #7d7f81;
  }
  @media screen and (max-width: 900px){
    header{
      padding: 20px 30px;
    }
    header.sticky{
      padding: 20px 30px;
    }

    header ul{
      display: none;
    }
    header .icon-enabled{
      display: inline-block;
    }
  }
  @media screen and (max-width: 480px){
    header .logo{
      font-size: 22px;
    }
    header.sticky{}
  }
</style>
