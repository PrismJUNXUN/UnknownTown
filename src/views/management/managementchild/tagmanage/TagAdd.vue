<template>
  <div class="addtag">
    <div class="taginfo">
      <el-input v-model="tagname" placeholder="标签名称">
        <template slot="prepend">名称</template>
      </el-input>
    </div>
    <div class="submit">
      <el-button type="primary" @click="submitTag">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../../network/request";

  export default {
    name: "TagAdd",
    data() {
      return {
        tagname: ''
      }
    },
    methods: {
      submitTag() {
        request({
          method: 'post',
          url: '/admin/tags',
          params: {
            name: this.tagname
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '添加成功',
              type: "success"
            })
          } else if (res.code ===1){
            this.$message({
              message:res.msg,
              type:"warning"
            })
          }else {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        }).catch(err => {
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
  .addtag{
    width: 70%;
    margin: 50px auto;
  }
  .submit{
    margin-top: 20px;
    float: right;
  }
</style>