import axios from 'axios'

// 封装axios
export function requestLogin(config) {
   const instance = axios.create({
     baseURL:'http://yxgyg.xyz/api',
     timeout:10000,
     method:'post'
   });
  instance.interceptors.request.use(res=>{
    return res
  },err=>{
    console.log(err)
  });

  instance.interceptors.response.use(res=>{
        // console.log(res);
        return res.data;
      },err=>{
        console.log('用户名或密码不能为空');
        console.log(err)
      }
  ); //过滤掉axios本身携带的信息

  return instance(config);
}

export function request(config) {
  const instance2 = axios.create({
    baseURL:'http://yxgyg.xyz/api',
    timeout:10000,
    method:'post'
  });
  instance2.interceptors.request.use(res=>{
    return res
  },err=>{
    console.log(err)
  })

  instance2.interceptors.response.use(res=>{
        // console.log(res);
        return res.data;
      },err=>{
        console.log(err);
      }
  ); //过滤掉axios本身携带的信息

  return instance2(config);
}

export function requestSearch(config){
  const instance3 = axios.create({
    timeout:10000,
    method:'post'
  });
  instance3.interceptors.request.use(res=>{
    return res
  },err=>{
    console.log(err)
  })

  instance3.interceptors.response.use(res=>{
        // console.log(res);
        return res.data;
      },err=>{
       console.log(err)
      }
  ); //过滤掉axios本身携带的信息

  return instance3(config);
}