import axios from 'axios'

// 封装axios
export function requestLogin(config) {
   const instance = axios.create({
     baseURL:'http://47.106.33.12',
     timeout:5000,
     method:'post'
   });
  instance.interceptors.request.use(res=>{
    return res
  },err=>{
    console.log(err)
  })

  instance.interceptors.response.use(res=>{
        // console.log(res);
        return res.data;
      },err=>{
        console.log('用户名或密码不能为空');
      }
  ); //过滤掉axios本身携带的信息

  return instance(config);
}