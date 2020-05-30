<template>
  <div class="displayPage clearfix">
    <section class="banner">
      <div class="banner-container">
        <wave-text></wave-text>
        <div class="tips">
          <i class="iconfont icon-arrow-lift"></i><p>“There will be no men tomorrow. Fuck ！”</p><i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
    </section>
    <a id="anchor" href="#content" @click.prevent="toMain()"><i class="iconfont icon-jiantou1"></i></a>
    <div class="waveAnimation">
      <div class="wave waveTop">
        <div class="bgTop wavePosition"></div>
      </div>
      <div class="wave waveMiddle">
        <div class="bgMiddle wavePosition"></div>
      </div>
      <div class="wave waveBottom">
        <div class="bgBottom wavePosition"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import WaveText from "../../../components/font_end/WaveText";
  export default {
    name: "Banner",
    components: {WaveText},
    mounted() {
      var document_width, document_height;
      $(document).ready(function () {
        document_width=window.innerWidth; document_height=window.innerHeight;
      });

      $(window).resize(function () {
        if(document_width!==$(document).width() || document_height!==$(document).height())
        {
          // console.log(document_height,document_width);
          // console.log($(document).width())
          // $('.displayPage').height(document_height);
          // Do something
        }
      })
    },
    methods:{
      toMain(){
        let height = $($('#anchor').attr("href")).offset().top-59;
        $('html,body').animate({
          scrollTop:height+"px"
        },1000);
      }
    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1687810_2onb6dts99p.css");
  .displayPage{
    /*width: 100%;*/
    height: 100vh;
  }
  .banner{
    width: 100%;
    height: 100%;
    background: url("../../../assets/img/font_end/home/font-end_bg1.jpeg") no-repeat fixed center center;
    background-size: cover;
    -webkit-background-clip: border-box;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    z-index: 99;
  }
  .banner-container{
    max-width: 800px;
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }

  .tips{
    margin: 40px auto;
    width: 600px;
    height: 100px;
    background-color: rgba(23, 23, 23, 0.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tips::before{
    content: "";
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left: -15px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent rgba(23, 23, 23, 0.5);
  }

  .tips p{
    display: inline-block;
    color: #ffffff;
    font-family: Corbel, sans-serif;
    font-size: 25px;
    font-weight: 600;
  }
  .icon-arrow-lift{
    font-size: 40px;
    color: #29aae2;
    cursor: pointer;
  }

  .icon-arrow-right{
    font-size: 40px;
    color: #29aae2;
    cursor: pointer;
  }


  .icon-jiantou1{
    display: inline-block;
    z-index: 999;
    font-size: 35px;
    color: #fff;
    position:absolute;
    left: 50%;
    bottom: 10%;
    transform:translateX(-50%) rotate(90deg);
    -moz-transform:translateX(-50%) rotate(90deg);
    -webkit-transform:translateX(-50%) rotate(90deg);
    animation: Updown .8s infinite alternate;
    -webkit-animation: Updown .8s infinite alternate;
    cursor: pointer;
  }
  @keyframes Updown {
    from {
      bottom: 9%;
    }
    to{
      bottom: 11%;
    }
  }

  .waveAnimation{

  }
  .wave {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: -1px;
    overflow: hidden;
    z-index: 100;
  }
  .wavePosition{
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    transform-origin: center bottom;
    background-repeat: repeat-x;
    background-position: 0 bottom;
  }
  .bgTop{
    background-image: url("../../../assets/img/font_end/home/wave_3.png");
    background-size:50% 100px ;
    animation: move-wave 10s linear infinite;

  }

  .bgMiddle{
    background-image: url("../../../assets/img/font_end/home/wave_2.png");
    background-size:50% 120px ;
    animation: move-wave 15s linear infinite;
    filter: alpha(opacity = 50);
    -moz-opacity: 0.5;
    opacity: 0.5;
  }

  .bgBottom{
    background-image: url("../../../assets/img/font_end/home/wave_1.png");
    background-size:50% 100px ;
    filter: alpha(opacity = 70);
    -moz-opacity: 0.7;
    opacity: 0.7;
  }


  @keyframes move-wave {
    from{
      background-position: 0 bottom;
    }
    to {
      background-position: 100% bottom;
    }
  }
  @media screen and (max-width: 650px){
    .tips{
      width: 95%
    }
  }
  @media screen and (max-width:480px){
    /*.tips{*/
    /*  width: 300px;*/
    /*}*/
    .tips p{
      font-size: 20px;
    }
    .tips:before{
      display: none;
    }
    .waveAnimation{
      /*display: none;*/
    }
    .banner{
      background-size: 350% 100%;
    }
  }
</style>