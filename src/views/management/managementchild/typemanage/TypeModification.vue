<template>
  <div class="modifytype">
    <div class="typeinfo">
      <el-input v-model="typename" placeholder="分类名称">
        <template slot="prepend">名称</template>
      </el-input>
    </div>
    <div class="submit">
      <el-button type="warning" @click="modifyType">修改</el-button>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../../network/request";

  export default {
    name: "TypeModification",
    data(){
      return{
        typename:''
      }
    },
    methods:{
      modifyType(){
        this.$axios.put('http://yxgyg.xyz/api/admin/types',
            {
              id:this.$route.params.typeId,
              name: this.typename
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
    created()
    {
      request({
        method: 'get',
        url: '/admin/types/' + this.$route.params.typeId
      }).then(res => {
        this.typename = res.data.name
      })
    }
  }
</script>

<style scoped>
  .el-input {
    width: 100%;
  }
  .modifytype{
    width: 70%;
    margin: 50px auto;
  }
  .submit{
    margin-top: 20px;
    float: right;
  }
</style>