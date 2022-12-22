const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
    // disableHostCheck: true,
    host: 'localhost',
    port: 9000,
    proxy: {                 //设置代理，必须填
      '/universal-prefix': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://localhost:8080',     //代理的目标地址
        changeOrigin: true,
        pathRewrite: {                   //路径重写
          '^/universal-prefix': ''                     //选择忽略拦截器里面的内容
        }
      },
    },
  }
})
