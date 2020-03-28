<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import $ from 'jquery'
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
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
</style>
