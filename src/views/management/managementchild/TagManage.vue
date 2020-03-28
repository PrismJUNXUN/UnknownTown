<template>
  <div class="main">
    <div class="main-page">
      <page-bar>
          <router-link slot="first" to="/admin/tags/list" class="choice choice-first">列表</router-link>
          <router-link slot="second" to="/admin/tags/add" class="choice">新增</router-link>
      </page-bar>
      <keep-alive include="TagAdd">
      <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import PageBar from "../../../components/back_end/PageBar";
  export default {
    name: "TagManage",
    components: {PageBar}
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