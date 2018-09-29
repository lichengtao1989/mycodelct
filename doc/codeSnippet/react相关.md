## Create-react-app 脚手架中配置本地代理

## proxy

在`create-react-app`搭建的项目中,修改`node_modules/react-scripts/config/webpackDevServer.config.js`文件中的`proxy`部分的设置，仿照vue的改法，如下：

```
proxy: {
  '/api': {
    target: 'https://h5.ele.me/restapi/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
},
```