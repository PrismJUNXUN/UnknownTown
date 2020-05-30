<template>
  <div id="mainPage">
    <picture-wall
            picUrl='http://cdn.yxgyg.xyz/20200409203111.jpg'>
      <div slot="pageName" class="pageName">分类</div>
    </picture-wall>
    <div class="content">
      <div class="container">
        <div class="typeBox">
          <div class="type" v-for="(item,index) in types" :key="item.id" @click="typeClick(index)">{{item.name}} ({{item.blogSize}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PictureWall from "../../components/front_end/PictureWall";
  import {request} from "../../network/request";

  export default {
    name: "Type",
    components: {PictureWall},
    data(){
      return{
        types:[]
      }
    },
    methods:{
      typeClick(index){
        let typeId = this.types[index].id;
        this.$router.push('/type/'+typeId);
      }
    },
    created() {
      request({
        method:'get',
        url:'/types/top/list'
      }).then(res=>{
        this.types=res.data;
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  #mainPage{
    min-height: 78vh;
  }

  .content{
    width: 100%;
    min-height: 80vh;
  }
  .container{
    max-width: 1200px;
    height: 100%;
    margin: 20px auto;

  }
  .typeBox{
    max-width: 800px;
    margin: 60px auto;
    overflow: hidden;
  }
  .type{
    float: left;
    width: 160px;
    height: 75px;
    text-align: center;
    line-height: 75px;
    font-size: 15px;
    font-family: 等线,sans-serif;
    color: #7d7f81;
    font-weight: 800;
    margin-left: 35px;
    border-radius: 5px;
    margin-bottom: 25px;
    box-shadow: 0 0 3px #dadcde;
    transition: .5s linear;
  }
  .type:hover{
    box-shadow: 0 0 10px #9fa1a3;
    color: #ffffff;
    background: linear-gradient(#5dd8ff, #649bff);
    background: -webkit-linear-gradient(#5dd8ff, #649bff);
  }
  @media screen and (max-width: 480px){
    .typeBox{
      margin: 20px auto;
    }
    .type{
      width: 50%;
      float: none;
      margin: 25px auto;
    }
  }
</style>