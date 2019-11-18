---
date: 2018-5-9
tag:
  - vue首页优化
author: shenmissing
location: ShangHai
---
# vue项目首页优化纪录 <small style="font-size:14px">（待更新到 vue/cli3 webpack4）</small>
## 1、起因
&emsp;&emsp;项目打包的时候发现部分文件过大：vender.js有400K，app.css高达1.6M。看着这个数值，瞬间凌乱。

## 2、优化vender.js
&emsp;&emsp;是因项目的依赖 vue、vue-router、vuex、axios 造成的，可使用cdn,注意更换对应版本号
```js
<script src="//cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>
<script src="//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
<script src="//cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
```
&emsp;&emsp;在 build/webpack.base.conf.js 中添加如下代码,使其不打包进文件
```js
module.exports = {
    //...
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex':'Vuex'
  },
    //...
}
```
&emsp;&emsp;去掉相关引用代码
```js
// import Vue from 'vue'
// import Router from 'vue-router'
// import Vuex from 'vuex'
```
## 3、优化app.css
&emsp;&emsp;是因项目css中使用的图片全部转成了base64写入了css中，导致app.css体积过大，首屏加载过慢，在 build/webpack.base.conf.js 中设置图片下的url-loader的大小限制
```js
module: {
    rules: [
        //...
        { 
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: utils.assetsPath('img/[name].[ext]'),
                    limit:5000  //<--添加此行，单位为 b，表示将图片大小 <=5000b 的图片转成base64格式
                }
            },
        }
        //...
    ]}
    
// ---------------------打包后可能会出现css中的图片路径不对的情况，修改如下代码：
// build/utils.js 中找到 vue-style-loader
if (options.extract) {
    return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath:'../../' // <--添加此行代码
    })
} else {
    return ['vue-style-loader'].concat(loaders)
}
```
## 4、启用Gzip压缩，一般浏览器都已支持.gz的资源文件，在http请求的Request Headers 中能看到 Accept-Encoding:gzip
```js
//config/index.js 中招到 productionGzip 设置为true
build: {
    //...
    productionGzip：true,
    productionGzipExtensions: ['js', 'css'],
}
//build/webpack.prod.conf.js 中添加以下代码
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
        ),
        threshold: 10240,
        // deleteOriginalAssets:true, //删除源文件，不建议
        minRatio: 0.8
    })
  )
}
```