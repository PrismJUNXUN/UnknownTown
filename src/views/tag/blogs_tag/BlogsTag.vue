<template>
  <div id="mainPage">
    <picture-wall
            picUrl='http://cdn.yxgyg.xyz/20200409203113.jpg'>
      <div slot="pageName" class="pageName">{{tag.name}}</div>
    </picture-wall>
    <div class="content">
      <div class="container">
        <div class="sortTitle">标签 - {{tag.name}}</div>
        <div class="article-sort">
          <div class="sort-item" v-for="blog in blogsTag">
            <div class="article-picture"><img :src="blog.firstPicture" alt=""></div>
            <div class="article-post">
              <router-link :to="/blog/+blog.id"><div class="article-post-title">{{blog.title}}</div></router-link>
              <i class="iconfont icon-clock"></i>
              <time class="article-post-time">{{blog.updateTime}}</time>
            </div>
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
    </div>
  </div>
</template>

<script>
  import PictureWall from "../../../components/font_end/PictureWall";
  import {request} from "../../../network/request";
  import {format} from "../../../common/ultils";
  export default {
    name: "BlogsTag",
    components: {PictureWall},
    data(){
     return{
       blogsTag:[],
       tag:[],
       currentPage:1,
       pageSize:10,
       totalCount:1,
       tagId:''
     }
    },
    methods:{
      getBlogsTag(page,size){
        request({
          method:'get',
          url:'/blogs/page/tag',
          params:{
            page:page,
            size:size,
            tagId:this.tagId
          }
        }).then(res=>{
          if (res.code === 0){
            this.totalCount = res.data.totalElements;
            this.blogsTag = res.data.pageContent;
            for (let blog of this.blogsTag){
              blog.updateTime = format(blog.updateTime);
            }
            console.log(this.blogsTag)
            console.log(res)
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      getTag(){
        request({
          method:'get',
          url:'/tags/'+this.tagId,
        }).then(res=>{
          this.tag = res.data;
        })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getBlogsTag(val,this.pageSize)
      }
    },
    created() {
      this.tagId = this.$route.params.tagId;
      this.getBlogsTag(this.currentPage,this.pageSize);
      this.getTag();
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
    min-height: 64vh;
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
    font-family:"Fira Code" , sans-serif;
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
  .article-sort{
    margin-top: 40px;
    padding-left: 50px;
    border-left: 0.2rem solid #a4d8fa;
  }
  .sort-item{
    position: relative;
    margin-top: 30px;
  }
  .sort-item:before{
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
  .sort-item:hover:before{
    border-color: #f08327;
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
    overflow: hidden;
    line-height: 1.2;
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
  .pagination{
    position: absolute;
    margin-top: 100px;
    left: 50%;
    transform: translate(-50%,0);
  }
  @media screen and (max-width: 900px){
    .container{
      padding: 20px;
    }
  }
  @media screen and (max-width: 480px){
    .container{
      padding: 20px;
    }
  }
</style>