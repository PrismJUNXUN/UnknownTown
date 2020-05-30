<template>
  <div class="content">
    <keep-alive>
      <div class="type">
        <el-table :data="pageContent" stripe border>
          <el-table-column
                  prop="name"
                  label="名称"
                  width="399"
          ></el-table-column>
          <el-table-column width="398" label="操作">
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

  export default {
    name: "TypeList",
    data(){
      return {
        totalCount:1,
        pageContent:[],
        currentPage:1,
        pageSize:8
      }
    },
    methods:{
      getData(n1,n2){
        request({
          method:'get',
          url:'/admin/types/page',
          params:{
            page:n2,
            size:n1
          }
        }).then(res=>{
          this.pageContent = res.data.pageContent;
          this.totalCount = res.data.totalElements;
        }).catch(err=>{
          console.log(err)
        })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.getData(this.pageSize,val)
      },
      delClick(index,rows){
        let id1 = rows[index].id;
        this.$axios({
          method:'delete',
          url:'http://yxgyg.xyz/admin/api/types/'+id1,

        })
            .then(res=>{
              if (res.data.code === 0 ){
                rows.splice(index,1);
              }else {
                this.$message({
                  message: "删除失败",
                  type: "warning"
                });
              }
            });
      },
      textClick(row){
        let typeId = row.id;
        this.$router.push('/admin/type/modification/'+typeId)
      }
    },

    created() {
      this.getData(this.pageSize,this.currentPage)
    }
  }
</script>

<style scoped>
  .type{
    width: 70%;
    margin: 20px auto;

  }
  .pagination{
    margin: 50px 0 0 40%;
    width: 20%;
  }

</style>