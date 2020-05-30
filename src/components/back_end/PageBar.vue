<template>
  <div class="page-bar">
    <div class="page-choice">
    <slot name="first" ></slot>
      <div class="interval"></div>
    <slot name="second"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageBar",
    computed:{
    }
  }
</script>

<style scoped>
.page-bar {
  width: 100%;
  height: 64px;
}
  .page-choice{
    display: flex;
    justify-content: center;

  }
 .choice{
   color: #97999b;
   font-family: 微软雅黑,serif;
   font-size: 15px;
   text-decoration: none;
   line-height: 30px;
   margin: 20px 30px 0 30px;
 }
  .choice:hover{
    color: #2794e9;
  }

.interval{
  margin-top: 26px;
  width: 1px;
  height: 20px;
  background-color: #cfcfd5;
}

  .active{
    color: #2794e9;
    border-bottom: 2px solid #2794e9;
  }
</style>