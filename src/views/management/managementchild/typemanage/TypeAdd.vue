<template>
  <div class="addtype">
    <div class="typeinfo">
        <el-input v-model="typename" placeholder="分类名称">
          <template slot="prepend">名称</template>
        </el-input>
    </div>
    <div class="submit">
      <el-button type="primary" @click="submitType">提交</el-button>
    </div>
  </div>

</template>

<script>
  import {request} from "../../../../network/request";

  export default {
    name: "TypeAdd",
    data(){
      return{
        typename:''
      }
    },
    methods:{
      submitType(){
        request({
          method:'post',
          url:'/admin/types',
          params:{
            name:this.typename
          }
        }).then(res=>{
          if (res.code === 0){
            this.$message({
              message:'添加成功',
              type:"success"
            })
          }else {
            this.$message({
              message:'添加失败',
              type:'error'
            })
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.el-input {
  width: 100%;
}
  .addtype{
    width: 70%;
    margin: 50px auto;
  }
  .submit{
    margin-top: 20px;
    float: right;
  }
</style>