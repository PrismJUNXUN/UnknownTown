<template>
  <div id="mainPage">
    <picture-wall
            picUrl='http://cdn.yxgyg.xyz/20200409203110.jpeg'>
      <div slot="pageName" class="pageName">归档</div>
    </picture-wall>
    <div class="content">
      <div class="container">
        <div class="sortTitle">File Pigeonhole</div>
        <div class="article-sort">
          <div class="sort-item" v-for="(year,index) in blogsByTime">
            <div class="sort-item-year">{{index}}</div>
            <div class="sort-item-article" v-for="(article) in year">
              <div class="article-picture"><img :src="article.firstPicture" alt=""></div>
              <div class="article-post">
                <router-link :to="/blog/+article.id"><div class="article-post-title">{{article.title}}</div></router-link>
                <i class="iconfont icon-clock"></i>
                <time class="article-post-time">{{article.updateTime}}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import {format} from "../../common/ultils";
  import PictureWall from "../../components/font_end/PictureWall";
  import {request} from "../../network/request";
  export default {
    name: "File",
    components: {PictureWall},
    data(){
      return{
        blogsByTime:[]
      }
    },
    methods:{
      getBlogByTime(){
        request({
          method:'get',
          url:'/blogs/archives'
        }).then(res=>{
          if (res.code===0){
            this.blogsByTime = res.data;
            for (let key in this.blogsByTime){
              for (let blog of this.blogsByTime[key]){
                blog.updateTime = format(blog.updateTime)
              }
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    computed:{
    },
    created() {
      this.getBlogByTime();
    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1752058_m1ht9lme6xf.css");
  #mainPage{
    min-height: 100vh;
  }

  .content{
    position: relative;
    width: 100%;
    min-height: 80vh;
    margin: 100px 0;
  }
  .container{
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
  }
  a{
    text-decoration: none;
  }
  .sortTitle{
    color: #49b1f5;
    padding-left: 25px;
    font-size: 28px;
    font-family: Corbel, sans-serif;
    font-weight: 600;
    position: relative;
    line-height: 1;
  }
  .sortTitle:before{
    position: absolute;
    top: 0.2rem;
    left: calc(-0.5rem);
    z-index: 1;
    width: 0.8rem;
    height: 0.8rem;
    border: 0.25rem solid #49b1f5 ;
    border-radius: 0.8rem;
    content: "";
    line-height: 0.5rem;
  }
  .sortTitle:after{
    position: absolute;
    top: 1.3rem;
    left: 0;
    z-index: 0;
    width: 0.2rem;
    height: 3rem;
    background: #a4d8fa;
    content: "";
  }
  .article-sort{
    width: 70%;
  }
  .sort-item{
    width: 100%;
  }
  .sort-item .sort-item-article .article-picture{
    width: 80px;
    height: 80px;
    display: inline-block;
    overflow: hidden;
  }
  .article-picture img{
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
    transition: all .6s ;
    border: 0;
  }
  .article-picture img:hover{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .sort-item-year{
    font-size: 20px;
    font-weight: 600;
    color: #f08327;
    position: relative;
    margin: 0 0 1rem 0.5rem;
  }
  .sort-item-year:before{
    position: absolute;
    top: calc(0.5rem - 2px);
    left: -65px;
    width: 0.4rem;
    height: 0.4rem;
    border: 0.2rem solid #f08327;
    border-radius: 0.4rem;
    background: #fff;
    content: "";
    line-height: 0.3rem;
  }
  .article-sort{
    margin-top: 40px;
    padding-left: 50px;
    border-left: 0.2rem solid #a4d8fa;
  }
  .sort-item{
    margin-bottom: 30px;
  }
  .sort-item-article{
    margin-top: 30px;
    position: relative;
  }
  .sort-item-article:before{
    position: absolute;
    top: calc(2rem);
    left: -57px;
    width: 0.4rem;
    height: 0.4rem;
    border: 0.2rem solid #49b1f5;
    border-radius: 0.4rem;
    background: #fff;
    content: "";
    line-height: 0.4rem;
  }
  .article-post{
    display: inline-block;
    position: absolute;
    top: 0.5rem;
    left: 7rem;
  }
  .article-post a{
    color: #515151;
  }
  .article-post .article-post-title{
    position: relative;
    height: 40px;
    transition: all .3s linear;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    line-height: 1.2;
    overflow: hidden;
  }
  .article-post-title:hover{
    color: #49b1f5;
    transform: translateX(20px);

  }
  .icon-clock{
    font-size: 16px;
    font-weight: 600;
    color: #7c7c7c;
    margin-right: 10px;
  }
  time{
    font-size: 14px;
    color: #7c7c7c;
  }
  @media screen and (max-width: 480px){
    .container{
      padding: 20px;
    }
  }
</style>