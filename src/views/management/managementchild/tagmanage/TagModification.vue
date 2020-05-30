<template>
  <div class="modifytag">
    <div class="taginfo">
      <el-input v-model="tagname" placeholder="标签名称">
        <template slot="prepend">名称</template>
      </el-input>
    </div>
    <div class="submit">
      <el-button type="warning" @click="modifyTag">修改</el-button>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../../network/request";

  export default {
    name: "TagModification",
    data(){
      return{
        tagname:''
      }
    },
    methods:{
      modifyTag(){
        this.$axios.put('http://yxgyg.xyz/api/admin/tags',
            {
              id:this.$route.params.tagId,
              name: this.tagname
            },{
              withCredentials:true
            }).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '修改成功',
              type: "success"
            })
          } else {
            this.$message({
              message:"修改失败",
              type:"warning"
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      request({
        method:'get',
        url:'/admin/tags/'+this.$route.params.tagId
      }).then(res=>{
        this.tagname = res.data.name
      })
    }
  }
</script>

<style scoped>
  .el-input {
    width: 100%;
  }
  .modifytag{
    width: 70%;
    margin: 50px auto;
  }
  .submit{
    margin-top: 20px;
    float: right;
  }
</style>