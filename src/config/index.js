// axios跨域代理配置
module.exports = {
  dev :{
    proxyTable:{
      '/api':{
        target:'http://47.106.33.12',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },
  }
}