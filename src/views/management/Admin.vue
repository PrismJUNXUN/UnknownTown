<template>
  <div>
    <navigation-bar-ele></navigation-bar-ele>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBarEle from "../../components/back_end/NavigationBarEle";

  export default {
    name: "Admin",
    components: {
      NavigationBarEle
    },
    // 登录验证
    created() {
      if (!window.sessionStorage.getItem('isLogin')){
        this.$router.push('/login')
      }
    }
  }

</script>

<style scoped>
@import "../../assets/css/normalize.css";
</style>