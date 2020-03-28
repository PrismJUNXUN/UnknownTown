<template>
  <div class="blog">
    <div class="title">
      <el-select v-model="flag" class="title-select">
        <el-option v-for="item in flags"
                   :value="item.value"></el-option>
      </el-select>
      <el-input placeholder="标题" class="title-input" v-model="title"></el-input>
    </div>
    <div class="content">
      <mavon-editor v-model="content" class="mavonEditor" placeholder="Enjoying Markdown! Code now..."></mavon-editor>
    </div>
    <div class="selectOther">
      <el-select v-model="typeId" placeholder="分类" class="type-select">
        <el-option v-for="item in types"
                   :value="item.id"
                   :key="item.id"
                   :label="item.name">
        </el-option>
      </el-select>
      <el-select v-model="tagIds" multiple placeholder="标签" class="tag-select">
        <el-option v-for="item in tags"
                   :value="item.id"
                   :key="item.id"
                   :label="item.name">
        </el-option>
      </el-select>
      <el-input v-model="firstPicture" placeholder="首图引用地址" class="firstpicture">
        <template slot="prepend">首图</template>
      </el-input>
    </div>
    <div class="description">
      <el-input type="textarea" :rows="4" v-model="description"></el-input>
    </div>
    <div class="checkbox">
      <el-checkbox v-model="recommend">推荐</el-checkbox>
      <el-checkbox v-model="shareStatement">转载声明</el-checkbox>
      <el-checkbox v-model="appreciation">赞赏</el-checkbox>
      <el-checkbox v-model="commentabled">评论</el-checkbox>
    </div>
    <div class="submit">
      <el-button type="primary" @click="saveBlog">保存</el-button>
      <el-button type="danger" @click="releaseBlog">发布</el-button>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../../network/request";

  export default {
    name: "BlogModification",
    data() {
      return {
        title: '',
        content: '',
        firstPicture: '',
        flag: '原创',
        description: '',
        appreciation: false,
        shareStatement: false,
        commentabled: false,
        published: false,
        recommend: false,
        typeId: [],
        tagIds: [],

        types: [],
        tags: [],

        flags: [
          {
            value: '原创'
          },
          {
            value: '转载'
          },
          {
            value: '翻译'
          }
        ]
      }
    },
    methods:{
      saveBlog(){
        let tagIds = this.tagIds.toString();
        request({
          method:'post',
          url:'/admin/blogs',
          params:{
            title: this.title,
            content: this.content,
            firstPicture: this.firstPicture,
            flag: this.flag,
            description: this.description,
            appreciation: this.appreciation,
            shareStatement: this.shareStatement,
            commentabled: this.commentabled,
            published: this.published,
            recommend: this.recommend,
            typeId: this.typeId,
            tagIds: tagIds
          }
        }).then(res=>{
          if (res.code === 0){
            this.$message({
              message:'保存成功',
              type:"success"
            })
          }else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
            console.log(res)
          }
        })
      },
      releaseBlog(){
        let tagIds = this.tagIds.toString();
        request({
          method:'post',
          url:'/admin/blogs',
          params:{
            title: this.title,
            content: this.content,
            firstPicture: this.firstPicture,
            flag: this.flag,
            description: this.description,
            appreciation: this.appreciation,
            shareStatement: this.shareStatement,
            commentabled: this.commentabled,
            published: !this.published,
            recommend: this.recommend,
            typeId: this.typeId,
            tagIds: tagIds
          }
        }).then(res=>{
          if (res.code === 0){
            this.$message({
              message:'发布成功',
              type:"success"
            })
          }else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
            console.log(res)
          }
        })
      }
    },
    created() {
      request({
        method: 'get',
        url: '/admin/types/list'
      }).then(res => {
        this.types = res.data;
      }).catch(err=>{
        console.log(err)
      });

      request({
        method: 'get',
        url: '/admin/tags/list'
      }).then(res => {
        this.tags = res.data;
      }).catch(err=>{
        console.log(err)
      })
    },
  }
</script>

<style scoped>
  .blog{
    width: 80%;
    margin: 20px auto;
    height: 1150px;
  }
  .title-select{
    width: 10%;
  }
  .title-input {
    width: 90%;
  }
  .content{
    margin-top: 20px;
  }
  .mavonEditor{
    height: 650px;
    z-index: 10;
  }
  .selectOther{
    margin-top: 20px;
  }
  .type-select{
    margin-right:5%;
    width: 25%;
  }
  .tag-select{
    width: 70%;
  }
  .firstpicture{
    margin-top: 20px;
  }
  .submit{
    margin-top: 30px;
    float: right;
  }
  .checkbox{
    margin-top: 20px;
  }
  .description{
    margin-top: 20px;
  }
</style>