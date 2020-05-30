<template>
  <div class="pictureWall">
    <div class="pageName">
      <slot name="pageName"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PictureWall",
    props:{
      picUrl:{
        type:String,
        default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585913023356&di=b1f183339f0fdc91b4e08a3761a2f417&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-12-27%2F5e05afa850414.jpg'
      }
    },
    computed:{
      backgroundImg(){
        return "url("+this.picUrl+")"
      }
    },
    mounted() {
      const pictureWall = document.getElementsByClassName('pictureWall')[0];
      pictureWall.style.backgroundImage=this.backgroundImg
    }
  }
</script>

<style scoped>
  .pictureWall{
    background-position: 50% 25%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 35vh;
    overflow: hidden;
    position: relative;
  }
  .pictureWall .pageName div{
    font-size: 35px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #ffffff;
    font-weight: 600;
    font-family: 微软雅黑, sans-serif;
    letter-spacing: 15px;
  }
  @media screen and (max-width: 480px){
    .pictureWall .pageName div{
      letter-spacing: 5px;
    }
  }
</style>