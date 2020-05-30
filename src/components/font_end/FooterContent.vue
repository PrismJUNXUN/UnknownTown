<template>
  <footer>
    <div class="footer">
      <div class="icon"><img src="../../assets/icon.png" alt=""></div>
      <div class="info-container">
        <p class="information">项目托管于阿里云</p>
        <p class="information copyright">Copyright © 2019 - 2020 yxgyg.xyz</p>
        <p class="information"><a href="http://www.beian.miit.gov.cn/">黔ICP备19012945号-1</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "FooterContent"
  }
</script>

<style scoped>
footer {
  width: 100%;
  height: 22vh;
  position: relative;

  z-index: 1499;

}
   .footer .icon img{
     width: 80px;
     height: 80px;
     display: block;
     margin: 0 ;
     padding: 0;

   }
   .footer .icon{
     width: 90px;
     margin: 0px auto;
     display: flex;
     justify-content: center;
     align-items: center;
     animation: circle 8s linear infinite;
   }
   @keyframes circle {
     0%{
       transform:rotate(0deg);
     }

     25%{
       transform:rotate(90deg);
     }

     50%{
       transform:rotate(180deg);
     }

     75%{
       transform:rotate(270deg);
     }

     100%{
       transform:rotate(360deg);
     }
   }

  .footer{
    max-width: 1200px;
    margin: 0 auto;
  }
  .info-container{
    margin-top: 30px;
  }
  .information{
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .information a{
    text-decoration: none;
    color: #97999b;
  }
  .information a:hover{
    color: #29a3fd;
    transition: .7s linear;
  }
</style>