<template>
  <div id="mainPage">
    <banner></banner>
    <home-content></home-content>
  </div>

</template>

<script>
  import NavigationBar from "../../components/font_end/NavigationBar";
  import Banner from "./home_component/Banner";
  import HomeContent from "./home_component/HomeContent";

  export default {
    name: "Home",
    components: {HomeContent, Banner, NavigationBar},
    mounted() {
      // const mainPage = document.getElementById('mainPage');
      // mainPage.style.height = (document.getElementsByClassName('displayPage')[0].offsetHeight + document.getElementsByClassName('main-content')[0].offsetHeight)+"px";
    }
  }
</script>

<style scoped>
  @import "../../assets/css/normalize.css";
  #mainPage{
    overflow: hidden;
  }
</style>