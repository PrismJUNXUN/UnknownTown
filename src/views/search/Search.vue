<template>
  <div id="mainPage">
    <div class="container">
      <div class="content">
        <div class="searchParam">搜索结果：{{searchParam}}</div>
        <div class="tips" v-if="isShow">很高兴你翻到这里，但是真的没有了...</div>
        <div class="search-result">
          <div class="sort-item" v-for="blog in result">
            <div class="article-picture"><img :src="blog.firstPicture" alt=""></div>
            <div class="article-post">
              <router-link :to="/blog/+blog.id"><div class="article-post-title">{{blog.title}}</div></router-link>
              <i class="iconfont icon-clock"></i>
              <time class="article-post-time">{{blog.updateTime}}</time>
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
  </div>
</template>

<script>
  import {request} from "../../network/request";
  import {format} from "../../common/ultils";

  export default {
    name: "Search",
    data(){
      return{
        searchParam:'',
        result:[],

        isShow:false,
        currentPage:1,
        pageSize:8,
        totalCount:1
      }
    },
    methods:{
      Search(page,size){
        this.searchParam = this.$route.params.searchParams;
        request({
          method: 'get',
          url:'/blogs/search',
          params:{
            query:this.searchParam,
            page:page,
            size:size
          }
        }).then(res=>{
            this.totalCount = res.data.totalElements;
            if (this.totalCount!==0){
             this.result = res.data.pageContent;
             for (let blog of this.result){
               blog.updateTime = format(blog.updateTime)
             }
            }else {
              this.isShow = true;
            }
        })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.Search(val,this.pageSize)
      }
    },
    created() {
      this.Search(this.currentPage,this.pageSize);
    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1752058_m1ht9lme6xf.css");
  #mainPage{
    width: 100%;
  }
 .container{
   max-width: 800px;
   position: relative;
   margin: 0 auto;
 }
 .content{
   width: 90%;
   min-height: 64vh;
   padding: 100px 0;
 }
 .searchParam{
   width: 100%;
   height: 50px;
   margin-bottom: 50px;
   border: 3px dashed #bbbdbf;
   border-radius: 10px;
   text-align: center;
   line-height: 50px;
   color: #7d7f81;
   font-size: 20px;
   font-weight: 600;
   font-family:"Fira Code" , sans-serif;
   transition: all .3s linear;
 }
 .searchParam:hover{
   border: 3px dashed #a4d8fa;
   color:#49b1f5 ;
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
  .search-result{
    margin-top: 40px;
    padding-left: 50px;
    border-left: 0.2rem solid #a4d8fa;
    width: 70%;
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
    margin-top: 80px;
    left: 50%;
    transform: translate(-50%,0);
  }
  .tips{
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    color: #7d7f81;
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