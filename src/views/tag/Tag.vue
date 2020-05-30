<template>
  <div id="mainPage">
    <picture-wall
            picUrl='http://cdn.yxgyg.xyz/20200409203113.jpg'>
      <div slot="pageName" class="pageName">标签</div>
    </picture-wall>
    <div class="content">
      <div class="container">
        <div class="tagBox">
          <div class="tag" v-for="(tag,index) in tags" :key="tag.id" :style="randomColor()" @click="tagClick(index)">{{tag.name}} ({{tag.blogSize}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PictureWall from "../../components/front_end/PictureWall";
  import {request} from "../../network/request";

  export default {
    name: "Tag",
    components: {PictureWall},
    data(){
      return {
        tags:[],
        colorSelect:['#29aae2','#8F3A8C8F','#41CCCADB','#60E070A3','#F14E4EFF','#F1B44EC2']
      }
    },
    methods:{
      randomColor(){
        let random = Math.floor(Math.random()*10)%6;
        return {
          background:this.colorSelect[random]
        }
      },
      tagClick(index){
        let tagId=this.tags[index].id;
        this.$router.push('/tag/'+tagId);
      }
    },
    computed:{

    },
    created() {
      request({
        method:'get',
        url:'/tags/top/list'
      }).then(res=>{
        this.tags=res.data;
      }).catch(err=>{
        console.log(err);
      })

    },

    mounted() {
      this.randomColor(this.colorSelect);
    }
  }
</script>

<style scoped>
  #mainPage{
    min-height: 78vh;
  }

  .content{
    width: 100%;
    height: 80vh;
  }
  .container{
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  .tagBox{
    max-width: 800px;
    margin: 60px auto;

  }
  .tag{
    float: left;
    /*width: 100px;*/
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    margin-left: 20px;
    margin-bottom: 20px;
    padding: 0 20px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;

  }
</style>