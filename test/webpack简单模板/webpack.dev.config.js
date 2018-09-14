const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');


module.exports={
  entry:'./src/index.js',
  output:{
    path:__dirname,
    filename:'./release/boundle.js'
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        exclude:/(node_modules)/,
        loader:'babel-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ],
  devServer:{
    contentBase:path.join(__dirname,'./release'),//g根目录
    open:true,
    port:9000
  }
}