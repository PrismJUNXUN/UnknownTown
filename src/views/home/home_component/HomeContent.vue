<template>
  <div id="content" class="content">
    <div id="container">
      <div id="recent-posts" class="recent-posts">
        <div class="blog-container" v-for="(blog) in blogs" :key="blog.id">
          <div class="firstPicture">
            <router-link :to="/blog/+blog.id" :title="blog.title"><img :src="blog.firstPicture"></router-link>
          </div>
          <div class="blog-info" style="margin-top:48px;">
            <router-link class="blog-title" :to="/blog/+blog.id" :title="blog.title">{{blog.title}}</router-link>
            <time class="post-date">
              <i class="iconfont icon-rili"></i>{{blog.updateTime}}
            </time>
            <span class="blog-meta">
              <span class="meta-separator">|</span>
              <i class="iconfont icon-category"></i>
              <router-link :to="/type/+blog.type.id">{{blog.type.name}}</router-link>
              <span class="meta-separator">|</span>
              <i class="iconfont icon-huohua-"></i>{{blog.views}}
            </span>
            <div class="blog-content">{{blog.description}}</div>
          </div>
        </div>
        <el-pagination class="pagination"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="totalCount"
                layout="prev,pager,next"
                background
        >
        </el-pagination>
      </div>
      <div id="aside-content" class="aside-content">

      <div class="card card-tags">
        <div class="title">
          <i class="iconfont icon-tag"></i><span>标签</span>
        </div>
          <div class="tags-container">
            <div class="top-tag" v-for="(tag,index) in topTags" :key="tag.id" @click="tagClick(index)" :style="randomColor()">{{tag.name}}</div>
          </div>
        </div>
        <div class="card card-types">
          <div class="title">
            <i class="iconfont icon-type"></i><span>分类</span>
          </div>
          <ul>
            <li v-for="(type,index) in topTypes" :key="type.id" @click="typeClick(index)">{{type.name}}</li>
          </ul>
        </div>
        <div class="card card-notice">
          <div class="title">
            <i class="iconfont icon-bell-bold"></i><span>公告</span>
          </div>
          <div class="notice">{{notice}}</div>
        </div>
        <div class="card card-recommend">
          <div class="title">
            <i class="iconfont icon-tuijian"></i><span>推荐</span>
          </div>
          <div class="recommend">
            <div class="sort-item" v-for="blog in recommendBlogs">
              <div class="article-picture"><img :src="blog.firstPicture" alt=""></div>
              <div class="article-post">
                <router-link :to="/blog/+blog.id"><div class="article-post-title">{{blog.title}}</div></router-link>
                <i class="iconfont icon-clock"></i>
                <time class="article-post-time">{{blog.updateTime}}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../network/request";
  import $ from 'jquery'
  import {format,add0} from "../../../common/ultils";

  export default {
    name: "Content",
    data(){
      return {
        blogs:[],
        topTypes:[],
        topTags:[],
        colorSelect:['#2ecc71','#3498db','#9b59b6','#f1c40f','#34495e','#e74c3c'],
        notice:"欢迎各位来到UnknownTown博客，希望大家多多交流",
        recommendBlogs:[],

        currentPage:1,
        pageSize:8,
        totalCount:1
      }
    },
    methods:{
      getBlogs(npage,nsize){
        request({
          method:'get',
          url:'/blogs/page',
          params:{
            page:npage,
            size:nsize
          }
        }).then(res=>{
          this.totalCount = res.data.totalElements;
          this.blogs = res.data.pageContent;
          for (let blog of this.blogs){
            blog.updateTime = format(blog.updateTime);
          }
        })
      },
      randomColor(){
        let random = Math.floor(Math.random()*10)%6;
        let randomSize = Math.floor(Math.random()*10)%3;
        let fontsize = [4,8,12];
        return {
          color:this.colorSelect[random],
          fontSize:(14+fontsize[randomSize])+"px"
        }
      },
      tagClick(index){
        let tagId=this.topTags[index].id;
        this.$router.push('/tag/'+tagId);
      },
      typeClick(index){
        let typeId = this.topTypes[index].id;
        this.$router.push('/type/'+typeId);
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getBlogs(val,this.pageSize);
        let height = $('.content').offset().top-59;
        $('html,body').animate({
          scrollTop:height+"px"
        });
      },
      getRecommendBlogs(size){
        request({
          method:'get',
          url:'/blogs/top/list',
          params:{
            size:size
          }
        }).then(res=>{
          this.recommendBlogs = res.data;
          for (let blog of this.recommendBlogs){
            blog.updateTime = format(blog.updateTime)
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
      this.getBlogs(1,8);
      request({
        method:'get',
        url:'/types/top/list'
      }).then(res=>{
        this.topTypes = res.data;
      }).catch(err=>{
        console.log(err);
      });
      request({
        method:'get',
        url:'/tags/top/list',
      }).then(res=>{
        this.topTags = res.data;
      }).catch(err=>{
        console.log(err);
      })
      this.getRecommendBlogs(5);
    },
    mounted() {

    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1742672_ouv4mkw4ri.css");
  @import "../../../assets/css/normalize.css";
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
    cursor: pointer;
  }
.content{
  position: relative;
  width: 100%;
  min-height: 78vh;
  z-index: 999;
  flex: 1 auto;
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -moz-box-flex: 1;
  box-sizing: border-box;
}
  #container{
    flex-grow: 2;
    display: flex;
    margin: 0 auto;
    max-width: 1200px;
    align-items: flex-start;
    padding: 100px 15px;
    -webkit-box-align: start;
    -moz-box-align: start;
    overflow: hidden;
  }
  #recent-posts{
    width: 75%;
    position: relative;
  }
  #aside-content{
    width: 25%;
  }

  /*右侧边栏*/
  .card{
    width: 95%;
    box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
    border-radius: 8px;
    transition: .3s linear;
    margin-bottom: 25px;
  }
  .card:hover{
    box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
    background: #ffffff;

  }
  .card-tags{
     overflow: hidden;
  }
  .tags-container{
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 20px;
    text-align: center;
  }
  .tags-container .top-tag{
    height: 30px;
    display: inline-block;
    margin: 5px 5px;
    line-height: 30px;
    transition: all .3s linear;
  }
  .tags-container .top-tag:hover{
    color: #f39c12 !important;
    transform: scale(1.1);
  }
  .title{
    margin: 15px 5px;
    height: 30px;
  }
  .title span{
    position: relative;
    height: 30px;
    font-size: 16px;
    display: inline-block;
    bottom: 3px;
  }
  .icon-tag{
    font-size: 28px;
    margin: 0 10px 0 10px;
    color: #515151;
  }
  .icon-type{
    font-size: 26px;
    margin: 0 10px 0 10px;
    color: #515151;
  }
  .icon-bell-bold{
    font-size: 26px;
    margin: 0 10px 0 10px;
    color: #fc342b;
    animation: bell 2s infinite alternate;
    -webkit-animation: bell 4s infinite alternate;
    display: inline-block;
  }
  @keyframes bell {
    0%{transform: scale(1)}
    25%{transform: scale(1.1)}
    50%{transform: scale(1)}
    75%{transform: scale(1.1)}
  }
  @-webkit-keyframes bell {
    0%{transform: scale(1)}
    25%{transform: scale(1.1)}
    50%{transform: scale(1)}
    75%{transform: scale(1.1)}
  }
  .card-types{
    overflow: hidden;
  }
  .card-notice{
    overflow: hidden;
  }
  .card-notice .notice{
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
    color: #515151;
    line-height: 30px;
    font-size: 14px;
  }
  .card-types{
    padding-bottom: 10px;
  }
  .card-types li {
    width: 90%;
    height: 40px;
    line-height: 40px;
    margin-left: -15px;
    padding-left: 10px;
    font-size: 14px;
    color: #515151;
  }
  .card-types li:hover{
    background-color: #51ccff;
    transition: .2s all linear;
  }
  .card-recommend {
    overflow: hidden;
  }
  .icon-tuijian{
    font-size: 26px;
    margin: 0;
    color: #515151;
    display: inline-block;
  }
  /*左侧博客内容*/
  .blog-container{
    padding: 0;
    width: 98%;
    box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 25px;
    background-color: #ffffff;
    transition: all .3s linear;
  }
  .blog-container:hover{
    box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
  }
  .blog-container .firstPicture{
    width: 45%;
    height: 280px;
    overflow: hidden;
    display: block;
    float: left;
  }

  .blog-container .firstPicture img{
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
    transition: all .6s ;
    border: 0;
  }
  .blog-container .firstPicture img:hover{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .blog-info{
    display: block;
    width: 40%;
    overflow: hidden;
    float: right;
    padding: 0 7.5%;


  }
  .blog-container a {
    color: #5c5e60;
    transition: all .3s linear;
  }
  .blog-container a:hover{
    color: #37c1ff;
  }
  .blog-title{
    overflow: hidden;
     font-size: 26px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    margin-bottom: 10px;
  }
  .blog-container .iconfont{
    font-size: 15px;
    color: #848688;
    margin-right: 5px;
  }
  time{
    color:#848688 ;
    font-size: 14px;
  }
  .blog-meta .icon-huohua-{
    color: #e65730;
  }
  .meta-separator{
    margin: 0 8px 0 5px;
    color: #848688;
  }
  .blog-meta{
    font-size: 14px;
    color: #848688;
    line-height: 2;
  }
  .blog-content{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    overflow: hidden;
    height: 90px;
    margin-top: 1rem;
    color: #6d6f71;
    font-size: 14px;
    line-height: 2;
  }
  .pagination{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
  }
  .blog-container:nth-child(even) .firstPicture{
    float: right;

}
  .blog-container:nth-child(even) .blog-info{
    float: left;
  }
  @media screen and (max-width: 900px){
    #aside-content{
      display: none;
    }
    #recent-posts{
      width: 100%;
    }
    .blog-container{
      width: 100%;
    }
    .blog-container .firstPicture{
      float: none;
      width: 100%;
    }
    .blog-container .blog-info{
      float: none;
      width: 90%;
      margin: 15px auto !important;
    }
  }
/* 推荐 */
  .recommend{
    width: 85%;
    margin: 20px auto;
  }
  .sort-item{
    position: relative;
    margin-top: 30px;
  }
  .article-post{
    display: inline-block;
    position: absolute;
    top: 1rem;
    left: 7rem;
    overflow: hidden;
  }
  .article-post a{
    color: #515151;
  }
  .article-post .article-post-title{
    overflow: hidden;
    font-size: 14px;
    line-height: 2;
    position: relative;
    height: 30px;
    transition: all .3s linear;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:1
  }
  .article-post-title:hover{
    color: #49b1f5;
    transform: translateX(10px);

  }
  .icon-clock{
    font-size: 14px;
    font-weight: 600;
    color: #7c7c7c;
    margin-right: 5px;
  }
  time{
    font-size: 12px;
    color: #7c7c7c;
  }
  a{
    text-decoration: none;
  }
  .sort-item{
    width: 100%;
  }
  .sort-item .article-picture{
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
</style>