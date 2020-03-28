<template>
  <div class="main">
    <div class="main-page">
        <page-bar>
          <router-link slot="first" to="/admin/blog/list" class="choice choice-first">列表</router-link>
          <router-link slot="second" to="/admin/blog/release" class="choice">发布</router-link>
        </page-bar>
        <router-view></router-view>
      </div>
    </div>

</template>

<script>
  import PageBar from "../../../components/back_end/PageBar";
  export default {
    name: "BlogManage",
    components: {PageBar},

  }
</script>

<style scoped>
.main{
  margin-top: 64px;
  width: 100%;
}
  .main-page{
    width: 1140px;
    min-width: 1140px;
    margin: 0 auto;
  }
</style>