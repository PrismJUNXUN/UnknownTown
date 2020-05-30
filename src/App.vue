<template>
  <div id="app clearfix">
    <side-bar v-if="this.$route.path.indexOf('admin') === -1&&this.$route.path.indexOf('login') === -1"></side-bar>
    <navigation-bar v-if="this.$route.path.indexOf('admin') === -1&&this.$route.path.indexOf('login') === -1"></navigation-bar>
    <router-view :key="$route.fullPath"></router-view>
    <footer-content v-if="this.$route.path.indexOf('admin') === -1&&this.$route.path.indexOf('login') === -1"></footer-content>
  </div>
</template>

<script>
  import NavigationBar from "./components/font_end/NavigationBar";
  import FooterContent from "./components/font_end/FooterContent";
  import SideBar from "./components/font_end/SideBar";
  window.addEventListener("beforeunload",e=>{
    window.scrollTo(0,0);
  })
export default {
  name: 'app',
  components: {
    SideBar,
    FooterContent,
    NavigationBar
  },
  data(){
    return{

    }
  },
  mounted() {
  },
  created() {

  }
}

</script>

<style>
  body{
    overflow-x: hidden;
  }
  body.bg-login {
    background: url("./assets/img/management/login_bg.png") no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  body.bg-login::after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(3px);
    z-index: 1;
  }

  *::-webkit-scrollbar-thumb {
    background: #49b1f5;
  }
  *::-webkit-scrollbar-track {
    background-color: transparent;
  }
  *::selection {
    background: #00c4b6;
    color: #f7f7f7;
  }
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .move{
    transform: translateX(-254px);
    box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
  }
  #mainPage{
    transition: .5s all ease;
  }
</style>
