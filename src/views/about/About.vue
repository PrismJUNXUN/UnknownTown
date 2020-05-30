<template>
  <div id="mainPage">
    <picture-wall
            picUrl='http://cdn.yxgyg.xyz/20200409203112.png'>
      <div slot="pageName">关于</div>
    </picture-wall>
    <div class="content">
      <div class="container">
        <div class="siteInfo">
          <h2>站点信息</h2>
          <p>站点：UnknownTown</p>
          <p>简介：技术分享，包括前后端在学习与开发过程所遇到的坑，一些解决方法和技术总结</p>
          <p>站长：knightyxgy and Karson</p>
          <p>后端框架：Springboot集成Spring Springmvc和Springdatajpa</p>
          <p>前端框架：Vue + Element UI</p>
        </div>
        <div class="Info">
          <div class="personalInfo yInfo">
            <div class="head-portrait"></div>
            <p class="name">Knightyxgy</p>
            <p class="introduce">{{yIntroduce}}</p>
            <p class="slogan">{{ySlogan}}</p>
            <div class="icons">
              <i class="iconfont iconQQ" index="0"></i>
              <i class="iconfont iconyouxiang" index="1"></i>
            </div>
            <div>
              <div class="iconInfo qqInfo">781978481</div>
              <div class="iconInfo emailInfo">781978481@qq.com</div>
            </div>
          </div>
          <div class="personalInfo kInfo">
            <div class="head-portrait"></div>
            <p class="name">Karson</p>
            <p class="introduce">{{kIntroduce}}</p>
            <p class="slogan">{{kSlogan}}</p>
            <div class="icons">
              <i class="iconfont iconQQ" index="0"></i>
              <i class="iconfont iconweixin" index="1"></i>
              <i class="iconfont iconyouxiang" index="2"></i>
              <a href="https://github.com/PrismJUNXUN"><i class="iconfont iconGit"></i></a>
            </div>
            <div>
              <div class="iconInfo qqInfo">362212966</div>
              <div class="iconInfo wechatInfo"><img src="../../assets/img/font_end/about/qrcode_wechat.jpg"></div>
              <div class="iconInfo emailInfo">junxun1022@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PictureWall from "../../components/font_end/PictureWall";
  export default {
    name: "About",
    components: {PictureWall},
    data(){
      return{
        kIntroduce:'前端：就读于南山黄桷垭职业技术学院，前端小白一枚，希望能不断进步...',
        kSlogan:'Enjoying yourself...',
        yIntroduce:'后端: 就读于南山黄桷垭职业技术学院，后端code农，啥都想学，啥也不会...',
        ySlogan:'Enjoying coding...'
      }
    },
    mounted: function () {
      let kicons = document.getElementsByClassName('kInfo')[0].getElementsByClassName('iconfont');
      let kiconsInfo = document.getElementsByClassName('kInfo')[0].getElementsByClassName('iconInfo');
      for (let i = 0; i < kicons.length - 1; i++) {
        kicons[i].onmouseover = function () {
          for (let j = 0; j < kicons.length - 1; j++) {
            let index = this.getAttribute("index");
            kiconsInfo[index].style.display = "block";
          }
        };
        kicons[i].onmouseout = function () {
          for (let j = 0;j<kicons.length-1;j++){
            let index = this.getAttribute("index");
            kiconsInfo[index].style.display = "none";
          }
        }
      }

      let yicons = document.getElementsByClassName('yInfo')[0].getElementsByClassName('iconfont');
      let yiconsInfo = document.getElementsByClassName('yInfo')[0].getElementsByClassName('iconInfo');
      for (let i = 0; i < yicons.length; i++) {
        yicons[i].onmouseover = function () {
          for (let j = 0; j < yicons.length; j++) {
            let index = this.getAttribute("index");
            yiconsInfo[index].style.display = "block";
          }
        };
        yicons[i].onmouseout = function () {
          for (let j = 0;j < yicons.length;j++){
            let index = this.getAttribute("index");
            yiconsInfo[index].style.display = "none";
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1737533_2jobmvl76rk.css");
  #mainPage{
    min-height: 78vh;
  }
 a{
   text-decoration: none;
 }
  .content{
    width: 100%;
    min-height: 80vh;
  }
  .container{
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  .siteInfo{
    overflow: hidden;
    max-width: 90%;
    margin: 50px auto;
    border-radius: 3px;
    border-left: 5px #29aae2 solid;
    box-shadow: 0 0 3px #dadcde;
    transition: .3s linear;
  }
  .siteInfo:hover{
    box-shadow: 0 0 10px #9fa1a3;
  }
  .siteInfo h2{
    color: #29aae2;
    margin-left: 20px;
    padding-top: 15px;
  }
  .siteInfo p{
    line-height: 2;
    font-size: 14px;
    margin: 10px 20px;
  }

  .Info{
    max-width: 1000px;
    margin: 50px auto;
    padding: 20px 40px 110px 40px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .yInfo{
  }
  .personalInfo{
    width: 400px;
    height: 500px;
    box-shadow: 0 0 3px #dadcde;
    border-radius: 3px;
    position: relative;
    transition: .3s linear;
  }
  .personalInfo:hover{
    box-shadow: 0 0 10px #9fa1a3;
  }

  .kInfo .head-portrait{
    width: 110px;
    height: 110px;
    margin: 20px auto;
    border-radius: 50%;
    background: url("../../assets/img/font_end/about/headicon_karson.jpg");
    background-size: cover;
    transition:all .2s linear;
  }
  .yInfo .head-portrait{
    width: 110px;
    height: 110px;
    margin: 20px auto;
    border-radius: 50%;
    background: url("../../assets/img/font_end/about/headicon_yxgy.jpg");
    background-size: cover;
    transition:all .2s linear;
  }
  .personalInfo .head-portrait:hover{
    transform: scale(1.1);
  }

  .personalInfo .name{
    font-size: 32px;
    color: #646365;
    text-align: center;
    font-family: Corbel, sans-serif;
  }

  .introduce{
    width: 90%;
    margin: 0 auto;
    line-height: 30px;
    font-size: 16px;
    font-family: 等线,sans-serif;
    color: #7d7f81;
  }
  .slogan{
    text-align: center;
    font-family:'Kunstler Script',sans-serif;
    font-size: 30px;
  }
  .icons{
    width: 90%;
    margin: 45px auto;
    display: flex;
  }
  .yInfo .icons{
    justify-content: space-around;

  }
  .kInfo .icons{
    justify-content: space-around;

  }
  .iconfont{
    font-size: 40px;
    /*margin-right: 45px;*/
    cursor: pointer;
  }
  .iconfont:hover{
    color: #f09a1f;
    transition: all .3s linear;
  }
  .iconQQ{
    color: #29aae2;
  }
  .iconGit{
    color: #00179a;
  }
  .iconyouxiang{
    color: #e0dd5c;
  }
  .iconweixin{
    color: #22c617;
  }
  .iconInfo{
    position: absolute;
    box-shadow: 0 2px 5px #bbbdbf;
    border-radius: 3px;
    top: 460px;
    font-size: 14px;
    display: none;
  }
  .wechatInfo img {
    width: 100px;
    height: 100px;
  }
  .kInfo .qqInfo{
    width: 120px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
  .yInfo .qqInfo{
    width: 120px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    left: 45px;
  }
  .kInfo .wechatInfo{
    left: 105px;
  }
  .kInfo .emailInfo{
    left: 140px;
    width: 220px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
  .yInfo .emailInfo{
    left: 165px;
    width: 220px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
  @media screen and (max-width: 900px){
    .personalInfo{
      width: 350px;
    }
    .yInfo .qqInfo{
      left: 35px;
    }
    .yInfo .emailInfo{
      left: 135px;
    }
    .kInfo .wechatInfo{
      left: 85px;
    }
    .kInfo .emailInfo{
      left: 105px;
    }
  }
  @media screen and (max-width: 768px){
     .Info{
       display: block;
       margin-top: 0;
       padding: 0 0 80px 0;
     }
    .personalInfo{
      margin: 15px auto 0 auto;
    }
  }
</style>