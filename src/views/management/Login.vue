<template>
  <keep-alive>
  <div class="container">
    <img src="../../assets/img/management/loginbar_bg.png" alt="">
    <div class="panel">
      <div class="content">
        <div class="switch">
          <span id="login" class="active">Login</span>
        </div>
        <form action="">
          <div class="input" placeholder="Username" ><input type="text" v-model="loginForm.username"></div>
          <div class="input" placeholder="Password" ><input type="password" v-model="loginForm.password"></div>
          <span class="message-box" v-show="isShow">你输入的账号或密码错误，请重新输入</span>
          <button type="button" @click="LoginIn">LOGIN</button>
        </form>
      </div>
    </div>
  </div>
  </keep-alive>
</template>

<script>
  import $ from 'jquery';
  import {requestLogin} from "../../network/request";

  export default {
    name: "Login",
    data(){
      return {
        loginStatus:false,
        isShow:false,
        loginForm:{

        }
      }
    },
    beforeCreate() {
        document.getElementsByTagName("body")[0].className="bg-login";
    },
    beforeDestroy () {
      document.body.removeAttribute("class");
    },
    mounted() {
      $('.input input').on({
        focus:function () {
          $(this).parent().addClass('focus');
        },
        blur:function () {
          if($(this).val() === '') {
            $(this).parent().removeClass('focus');
          }
        }
      });
      $('.container').fadeIn(1500);

    },
    computed:{

    },
    methods:{
      LoginIn(){
        let loginParams = {username:this.loginForm.username, password: this.loginForm.password};
        requestLogin({
          url:'/admin/users/login',
          data:loginParams
        })
            .then(res=>{
              if (res.code === 1){
                console.log(res);
                this.isShow = true;
              }else if (res.code ===0){
                sessionStorage.setItem('isLogin','true');
                sessionStorage.setItem('nickname',res.data.nickname);
                sessionStorage.setItem('avatar',res.data.avatar);
                this.loginStatus = true;
                this.$router.push('/admin')
              }
            }).catch(err=>{
          this.isShow = true;
          console.log(err);
          console.log(sessionStorage.getItem('nickname'))
        })
      }
    }
  }
</script>


<style scoped>
@import "../../assets/css/normalize.css";

.container{
  display: none;
  position: relative;
  width: 70rem;
  box-shadow: 0 0 15px rgba(100, 100, 100, 0.25);
  background-color: white;
  z-index: 2;

}

 .container img{
   width: 40rem;
   height: 100%;
   margin: 0;
   padding: 0;
   display: block;
 }



  .switch span{
    font-size: 5rem;
    color: rgb(110, 169, 239);
    font-family: "Trebuchet MS",serif ;
    font-weight: bold;
    position: relative;
    top: -2.5rem;
  }


.panel{
  width: 42.9%;
  margin: 10rem 0 0;
  position: absolute;
  right: 0;
  top:0;

  display: flex;
  justify-content: center;
}

   form{
     width: 15rem;
     margin: 3rem 0 0;
     position: relative;
   }

   form .input{
     position: relative;
     width: 100%;
     height: 3rem;
     margin: 2rem 0;
     transition: .6s;
   }

  .input input{
    outline: none;
    width: 100%;
   border: none;
    border-bottom: .1rem solid rgb(110, 169, 239);
  }

input::-webkit-input-placeholder, .input input {
  color: rgb(110, 169, 239);
}

  .input::after{
    content: attr(placeholder);
    position: absolute;
    left: 0;
    top: -20%;
    font-size: 1.3rem;
    color: rgb(110, 169, 239);
    transition: .3s;
  }
    .input.focus::after{
      top: -70%;
      font-size: 1rem;
    }

  form button{
    margin: 2rem 0 0;
    position: absolute;
    width: 100%;
    height: 3.5rem;
    border-radius: 3rem;
    outline: none;
    border: none;
    background: linear-gradient(90deg, rgb(23, 93, 213), rgb(113, 164, 217));
    box-shadow: 0 0 8px rgb(2, 73, 162);
    cursor: pointer;
    color: white;
  }

/* 错误提示 */
  .message-box{
    font-size: 14px;
    color: #1c52cf;
    position: absolute;
    bottom: 0;
  }
</style>