<template>
  <div id="mainPage">
    <div class="pictureWall">
      <div class="blogTitle">
        <div class="title">{{blogDetail.title}}</div>
        <i class="iconfont icon-rili"></i>
        <time>发表于{{blogDetail.updateTime}}</time>
        <span class="blog-meta">
          <span class="meta-separator">|</span>
          <i class="iconfont icon-category"></i>
          <router-link :to="/type/+blogType.id">{{blogType.name}}</router-link>
          <span class="meta-separator">|</span>
          <i class="iconfont icon-huohua-"></i>{{blogDetail.views}}
        </span>
        <div class="flag">{{blogDetail.flag}}</div>
        <div class="blog-tags">
          <div class="tag" v-for="tag in blogTag">{{tag.name}}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="content-box">
          <div class="introduce">
            <h2>简介</h2>
            {{blogDetail.description}}
          </div>
          <div class="text-box">
            <h2>正文</h2>
            <div class="main-text" v-html="blogDetail.content" v-highlight></div>
          </div>
          <div class="cutting-line"></div>
          <div class="author">
            <p><span>文章作者：</span><router-link to="/about">{{user.nickname}}</router-link></p>
            <p><span>作者邮箱：</span><a :href=email>{{user.email}}</a></p>
            <p><span>版权声明：</span>本博客所有文章除特别声明外，均采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> CC BY-NC-SA 4.0 </a>许可协议。转载请注明来自<strong> UnknownTown </strong> ！</p>
          </div>
          <div class="appreciation">
            <transition name="fade">
              <div class="appreciateQR" v-if="show"><img src="../../assets/img/font_end/blog/zhifubao.jpg"></div>
            </transition>
            <div class="appreciate-button" v-if="blogDetail.appreciation" @click="show=!show">赞赏</div>
          </div>
          <div class="cutting-line"></div>
          <div class="recommend">
            <div class="recommend-title">
            <i class="iconfont icon-tuijian"></i><span>推荐博文</span>
            </div>
            <div class="recommend-blog" v-for="blog in recommendBlogs">
              <router-link :to="/blog/+blog.id" :title="blog.title">
              <img :src="blog.firstPicture">
              <div>{{blog.title}}</div>
              </router-link>
            </div>
          </div>
          <div class="cutting-line"></div>
          <div class="post-comment">
            <div class="comment_headling">
              <i class="iconfont icon-FontAwesomecomments"></i><span> 评论 </span>
            </div>
            <div class="content-comment" id="content-comment">
              <div class="comment-card"  v-for="(item,index) in comments" :index="item.id">
                <img :src="item.avatar" class="avaimg">
                <div class="vh" :id="item.id">
                  <div class="vhead">
                    <span>{{item.nickname}}</span>
                  </div>
                  <div class="vmeta">
                    <span class="vtime">{{item.createTime}}</span>
                    <a href="#ceditor" class="reply" @click.prevent="reply(item.nickname,item.id)"><div>回复</div></a>
                  </div>
                  <div class="vcontent">
                    <p>{{item.content}}</p>
                  </div>
                  <div class="vquote">
                    <div class="comment-card" v-for="(quote,index) in item.replyComments">
                      <img :src="quote.avatar" class="avaimg">
                      <div class="vh" :id="quote.id">
                        <div class="vhead">
                          <span>{{quote.nickname}}</span>
                        </div>
                        <div class="vmeta">
                          <span class="vtime">{{quote.createTime}}</span>
                          <a class="reply" href="#ceditor" @click.prevent="reply(quote.nickname,quote.id)"><div>回复</div></a>
                        </div>
                        <div class="vcontent">
                          <span class="toParentId" @click="parentPosition(quote.parentId)">@{{quote.parentNickName}} </span><p>{{quote.content}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment c" id="comment" v-if="blogDetail.recommend">
              <div class="panel">
                <div class="wrap">
                  <div class="cheader item2">
                    <input name="nickname" placeholder="昵称" class="nickname cinput" type="text" v-model="nickname"></input>
                    <input name="mail" placeholder="邮箱" class="mail cinput" type="email" v-model="commentemail"></input>
                  </div>
                  <div class="cedit">
                    <textarea id="ceditor" class="ceditor cinput" placeholder="记得留邮箱哦" v-model="content" style="overflow: hidden;overflow-wrap: break-word;resize: none;height: 123px"></textarea>
                  </div>
                  <div class="crow">
                    <button type="button" class="submit btn" @click="submitComment">提交</button>
                  </div>
                </div>
              </div>
              <div class="empty" v-if="comments.length === 0">来发表评论吧~</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import PictureWall from "../../components/front_end/PictureWall";
  import {request} from "../../network/request";
  import {format} from "../../common/ultils";
  export default {
    name: "Blog",
    components: {PictureWall},
    data(){
      return{
        picUrl:'http://cdn.yxgyg.xyz/20200409203113.jpg',
        blogId:'',
        blogDetail:[],
        blogType:[],
        blogTag:[],
        user:[],
        show:false,
        recommendBlogs:[],
        parentId:'',
        commentContent:'',
        nickname:'',
        commentemail:'',
        content:'',
        comments:[]
      }
    },
    methods:{
      getBlogDetail(){
        request({
          method:'get',
          url:'/blogs/one/'+this.blogId
        }).then(res=>{
          if (res.code ===0){
            this.blogDetail = res.data;
            this.blogDetail.updateTime = format(this.blogDetail.updateTime);
            this.blogType = this.blogDetail.type;
            this.blogTag = this.blogDetail.tags;
            this.picUrl = this.blogDetail.firstPicture;
            this.user = this.blogDetail.user;
            this.setPictureWall();
          }
        }).catch(err=>{
          console.log(err);
        })
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
        }).catch(err=>{
          console.log(err);
        })
      },
      getComments(){
        request({
          method:'get',
          url:'/comments/'+this.blogId
        }).then(res=>{
          this.comments = res.data;
          for (let item of this.comments){
            item.createTime = new Date(parseInt(item.createTime)*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            for (let comment of item.replyComments){
              comment.createTime = new Date(parseInt(comment.createTime)*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      setPictureWall(){
        const pictureWall = document.getElementsByClassName('pictureWall')[0];
        pictureWall.style.backgroundImage=this.backgroundImg;
      },
      parentPosition(parentId){
        let id ='#'+parentId;
        let height = $(id).offset().top - 59;
        $('html,body').animate({
          scrollTop:height+"px"
        },500);
      },
      reply(commentNickname,commentId){
        this.parentnickname = '@'+commentNickname;
        this.parentId = commentId;

        $('.ceditor').attr('placeholder',this.parentnickname);
        let height = $($('.reply').attr("href")).offset().top;
        $('html,body').animate({
          scrollTop:height+"px"
        },500);
      },
      submitComment(){
        if (!this.nickname){
          this.$message.warning('昵称不能为空')
        }else if(!this.content){
          this.$message.warning('评论内容不能为空')
        }else {
          request({
            method:'post',
            url:'/comments',
            params:{
              nickname:this.nickname,
              email:this.commentemail,
              parentId:this.parentId,
              content:this.content,
              blogById:this.blogId
            }
          }).then(res=>{
            if (res.code===0){
              this.$message({
                message:'评论成功',
                type:'success'
              });
              this.content = '';
              this.getComments();
            }
          })
        }
      }
    },
    computed:{
      backgroundImg(){
        return "url("+this.picUrl+")"
      },
      email(){
        return "mailto:"+this.user.email
      }
    },
    mounted() {

    },
    created() {
      this.blogId = this.$route.params.blogId;
      this.getBlogDetail();
      this.getRecommendBlogs(3);
      this.getComments();
      $(document).ready(function () {
        $('.toParentId').click(function (event) {
          event.preventDefault();
          let height = $($(this).attr("href")).offset().top-59;
          $('html,body').animate({
            scrollTop:height+"px"
          },1000);
          return false
        })
      })
    }
  }
</script>

<style scoped>
  @import url("//at.alicdn.com/t/font_1742672_we879hgx6u.css");
  @import url("//at.alicdn.com/t/font_1762341_fry34uny9f.css");
  @import "../../assets/css/normalize.css";
  @import url("../../assets/css/markdown.css");
  .pictureWall{
    width: 100%;
    height: 35vh;
    overflow: hidden;
    position: relative;
    background: no-repeat 50% 25%;
    background-size: cover;
  }
  .pictureWall:before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.25);
  }
  .blogTitle{
    position: absolute;
    left: 20%;
    bottom: 10%;
    color: #eaeaea;
  }

  .title{
    font-size: 30px;
    color: #f0f0f0;
    letter-spacing: 2px;
    margin-bottom: 15px;
  }
  time{
    font-size: 14px;
  }
  a{
    text-decoration: none;
  }

  .blog-meta span{
    margin: 0 8px;
  }
  .blog-meta a{
    color:#eaeaea ;
  }
  .iconfont{
    margin-right: 4px;
  }
  .icon-huohua-{
    color: #ed7b1d;
  }
  .blog-tags{
    margin-top: 20px;
  }
  .tag{
    display: inline-block;
    background-color: #56a9cb;
    margin-right: 10px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    padding: 0 10px;
    border-radius: 5px;
  }
  .flag{
    margin-left: 15px;
    border: 1px solid #ffa320;
    padding: 0 10px;
    border-radius: 5px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #ffa622;
    width: 48px;
    text-align: center;
    display: inline-block;
  }
  @media screen and (max-width: 960px){
    .blogTitle{
      left: 10%;
      width: 80%;
    }
    .title{
      font-size: 20px;
      font-weight: 600;
    }
    .blog-meta span{
      display: none;
    }
    .blog-meta .iconfont{
      margin-left: 8px;
    }
  }
  .container{
    margin: 50px 0;
    width: 100%;
  }
    .content{
      background: #ffffff;
    width: 60%;
    min-height: 64vh;
    margin: 0 auto;
    box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
    transition: all .3s linear;
    border-radius: 8px;
  }
  .content:hover{
    box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
  }
  @media screen and (max-width: 960px){
    .content{
      width: 95%;
    }
  }
  .content-box{
    width: 90%;
    margin: 60px auto;
    position: relative;
    overflow: hidden;
  }
  .introduce{
    margin-top: 50px;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 5px;
    border-left: 5px solid #248ad5;
    padding: 0 20px 20px 20px;
  }
  .introduce h2{
    color: #248ad5;
  }
  .text-box{
    margin: 50px 0;
  }

  .cutting-line{
    width: 100%;
    border-bottom: 5px dashed #8ad0f4;
    margin: 25px 0;
  }
  .author{
    margin: 20px 0;
    border: 1px dashed rgb(138, 208, 244);
    overflow: hidden;
    border-radius: 3px;
  }
  .author p{
    margin:10px 0 10px 20px;
    font-size: 14px;
  }
  .author p span{
    color: #49b1f5;
    font-weight: 600;
  }
  .author p a{
    color: #b4b6b8;
  }
  .author p a:hover{
    color: #49b1f5;
  }
  .author p strong{
    color: #49b1f5;
    transition: all .3s ease;
  }
  .author p strong:hover{
    color: #ffa320;
  }
  .appreciateQR img{
    width: 100px;
    height: 100px;
    display: block;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .appreciateQR{
    position: absolute;
    left: 50%;
    top: -125px;
    transform: translateX(-50%);
    overflow: hidden;
    background: #ffffff;
    width: 110px;
    height: 110px;
    box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
    border-radius: 3px;
  }
 .appreciate-button{
   width: 80px;
   height: 30px;
   line-height: 30px;
   margin: 40px auto;
   border: 1px solid #f09a1f;
   color: #f09a1f;
   font-family: 等线,sans-serif;
   text-align: center;
   border-radius: 12px;
   transition: all .3s linear;
   cursor: pointer;
 }
  .appreciate-button:hover{
    background: #f09a1f;
    color: #ffffff;
  }
  .appreciation{
    position: relative;
  }
/* 评论区 */
  .post-comment{
    margin: 30px auto;
  }
  .comment_headling{
    margin-top: 10px;
    font-size:20px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #515151;
  }
  .comment_headling .icon-FontAwesomecomments{
    font-size: 24px;
    margin-left: 5px;
  }
  #comment {
    font-size: 14px;
  }
  .c{
    text-align: left;
  }
  .c *{
    box-sizing: border-box;
    line-height: 1.75;
    color: #555555;
  }
  .wrap{
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    padding: 10px;
  }
  .wrap .cheader input{
    width: 50%;
    border-bottom: 1px dashed #dedede;
    background: transparent;
  }
  .wrap .cheader input:focus{
    border-bottom-color: #eb5055;
  }
  .cinput{
    border: none;
    resize: none;
    outline: none;
    padding: 10px 5px;
    max-width: 100%;
  }
  .wrap .cedit{
    position: relative;
    padding-top: 10px;
  }
  .ceditor{
    background:url("../../assets/img/font_end/blog/comment_bg.png") 100% 100% no-repeat;
    min-height: 8.75em;
    transition: all .3s ease;
    width: 100%;
  }
  .crow{
    padding: 10px 0;
  }
  .wrap .crow button{
    padding: 0.6rem 2rem;
    background-color: #49b1f5;
    color: #ffffff;
    border-color: #fff;
    float: right;
  }
  .crow .btn{
    transition-duration: .4s;
    text-align: center;
    border: 1px solid #ededed;
    border-radius: .3em;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    white-space: nowrap;
    padding: .5em 1.25em;
    font-size: .875em;
    line-height: 1.42857143;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
  }
  .wrap .crow button:hover{
    background-color:  #eb5055;
  }
  .empty{
    padding: 1.25em;
    text-align: center;
    color: #999999;
  }
  .content-comment{
    width: 100%;
    position: relative;
  }
  .comment-card{
    padding-top: 1.25em;
    position: relative;
    display: block;
    font-size: 14px;
    box-sizing: border-box;
    line-height: 1.75;
    color: #555555;
  }
  .comment-card img{
    width: 3em;
    height: 3em;
    float: left;
    border-radius: 50%;
    margin-right: .7525em;
    padding: .125em;
    display: block;
    border: 0;
  }
  .vh{
    overflow: hidden;
    padding-bottom: 0.5em;
  }
  .vtime{
    font-size: 12px;
    color: #999999;
  }
  .vhead{
    position: relative;
    font-size: 1.1em;
    font-family: 微软雅黑, 等线,sans-serif;

    font-weight: 600;
    margin-right: .875em;
    cursor: pointer;
    color: #f5a82c;
    text-decoration: none;
    display: inline-block;
  }
  .vmeta div{
    color: #3b99cf;
    cursor: pointer;
    width: 30px;
  }
  .vmeta div:hover{
    color: #f56c6c;
  }
  .vcontent{
    font-size: 14px;
    color: #8ad0f4;
  }
  .vcontent .toParentId{
    cursor: pointer;
  }
  .vcontent .toParentId:hover{
    color: #f09a1f;
    cursor: pointer;
  }
  .vcontent p{
    display: inline-block;
    font-size: inherit;
    line-height: 1.75;
  }
  .recommend-title{
    margin-top: 20px;
    font-size:20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #515151;
  }
  .icon-tuijian{
    font-size: 24px;
    margin: 0;
  }
  .recommend-blog{
    width: calc(100% / 3 - 10px);
    height: 220px;
    display: inline-block;
    overflow: hidden;
    margin: 5px;
    position: relative;
    min-width: 250px;
    background: #000;
  }

  .recommend-blog img{
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
    transition: all .6s ;
    border: 0;
    opacity: 0.6;
  }
  .recommend-blog img:hover{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    opacity: 0.8;
  }
  .recommend-blog div{
    position: absolute;
    font-size: 14px;
    color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 0 10%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 100%;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  @media screen and (max-width: 1450px){
     .recommend-blog{
       width: 48%;
     }
  }
  @media screen and (max-width: 650px){
    .recommend-blog{
      width: 100%;
      margin: 5px auto;
    }
  }
  @media screen and (max-width: 480px){
    .flag{
      display: block !important;
      margin: 10px 0 0 0 ;
    }
  }
</style>