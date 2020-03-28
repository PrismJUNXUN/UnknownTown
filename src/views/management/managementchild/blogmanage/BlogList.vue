<template>
  <div class="content">
    <div class="search-bar">
      <el-input v-model="title" placeholder="标题" class="title-select select"></el-input>
      <el-select v-model="value" placeholder="分类" class="value-select select" >
        <el-option v-for="item in types"
                   :value="item.id"
                   :key="item.id"
                   :label="item.name">

        </el-option>
      </el-select>
      <el-button type="primary" plain class="remove select" @click="removeSelect">清除</el-button>
      <el-checkbox v-model="checked" class="select">推荐</el-checkbox>
      <el-button type="primary" icon="el-icon-search" @click="searchBlog">搜索</el-button>
    </div>
    <keep-alive>
    <div class="blog">
      <el-table :data="pageContent" stripe border>
        <el-table-column
                prop="title"
                label="标题"
                width="190"
        ></el-table-column>
        <el-table-column
                prop="type.name"
                label="类型"
                width="110"
        ></el-table-column>
        <el-table-column
                prop="recommend"
                label="推荐"
                width="60"
        ></el-table-column>
        <el-table-column
                prop="published"
                label="状态"
                width="80"
        ></el-table-column>
        <el-table-column
                prop="updateTime"
                label="更新时间"
                width="180"
        ></el-table-column>
        <el-table-column width="177" label="操作">
          <template slot-scope="scope">
          <el-button type="success" plain @click="textClick(scope.row)">编辑</el-button>
          <el-button type="danger" plain @click.native.prevent="delClick(scope.$index,pageContent)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
      <el-pagination
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
    </keep-alive>
  </div>
</template>

<script>
  import {request} from "../../../../network/request";
  import $ from 'jquery'
  export default {
    name: "BlogList",
    data(){
      return{
        title:'',
        value:'',
        checked:false,
        pageContent:[],
        types:[],

        currentPage:1,
        pageSize:8,
        totalCount:1
      }
    },
    methods:{
      removeSelect(){
        this.title = '';
        this.value = '';
      },
      searchBlog(){
        let recommend = this.recommend ? 0:1
      },
      textClick(row){

      },
      delClick(index,rows){
        let id1 = rows[index].id;
        // "http://47.106.33.12/admin/blogs/"+id1
        // request({
        //   method: 'delete',
        //   url: "http://47.106.33.12/admin/blogs/"+id1,
        //   withCredentials: true
        // }).then(res=>{
        //   if (res.code === 0 ){
        //     rows.splice(index,1);
        //   }
        // });
        this.$axios({
          method:'delete',
          url:'http://47.106.33.12/admin/blogs',
          data:id1
        })
            .then(res=>{
              if (res.code === 0 ){
                rows.splice(index,1);
              }
            });
        // $.ajax({
        //   type:"GET",
        //   // url:"http://47.106.33.12/blogs/1",
        //   // url:"http://47.106.33.12/admin/blogs/1",
        //   url:"http://47.106.33.12/admin/blogs/list",
        //   xhrFields:{withCredentials:true},
        //   success:function(data){
        //     console.log(data);
        //   }
        // });
      },
      getData(n1,n2){
        request({
          method:'get',
          url:'/admin/blogs/page',
          params:{
            page:n2,
            size:n1
          }
        }).then(res=>{
          this.pageContent = res.data.pageContent;
          this.totalCount = res.data.totalElements;
          for (let item of this.pageContent){
            if (item.published){
              item.published = "发布"
            }else {
              item.published = "未发布"
            }
            if (item.recommend){
              item.recommend = "是"
            }else {
              item.recommend = "否"
            }
            item.updateTime = new Date(parseInt(item.updateTime)*1000).toLocaleString().replace(/:\d{1,2}$/,' ');
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getData(this.pageSize,val)
      }
    },
    computed:{

    },
    created() {
      this.getData(this.pageSize,this.currentPage);

      request({
        method:'get',
        url:'/admin/types/list'
      }).then(res=>{
        this.types = res.data;
      })
    }
  }
</script>

<style scoped>
  .search-bar {
    width: 70%;
    height: 80px;
    border-radius: 5px;
    border: 1px solid #eeeeee;
    box-shadow:0 0 3px #dbdbdb;
    margin: 0 auto;
    background-color: #f5f7f9;
  }
  .select{
    margin-right: 40px;
  }

  .title-select{
    margin-top: 20px;
    width: 25%;
    margin-left: 20px;
  }
  .value-select{
    width: 15%;
  }

  .blog{
    width: 70%;
    margin: 20px auto;

  }
  .pagination{
    margin: 50px 0 0 40%;
    width: 20%;
  }
</style>