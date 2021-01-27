const path = require("path")
const port = process.env.port || 9527
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  publicPath: "./",
  outputDir: "build",
  assetsDir: "resource",
  productionSourceMap: process.env.NODE_ENV == "development",
  devServer: {
    port: port,
    open: true,
    overlay: {
      errors: true,
      warn: false
    }
  },
  configureWebpack: {
    name: "view_ui",
    resolve: {
      alias: {
        "@": resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 路由预加载
    config.plugin("preload")
      .tap(() => [
        {
          rel: "preload",
          fileBlackList: [/.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: ["initial"]
        }
      ])
    // 页面太多的时候，会产生无意思请求
    config.plugins.delete("prefetch")
    config.when(process.env.NODE_ENV != "development",config =>{
      // 生产模式使用
      /**
       * 根据驱动页面的runtime代码默认包含在build后的app.hash.js中
       * 如果改动其他路由，就会导致runtime代码改变，从而会导致其他页面js也会改变
       * 所以需要把runtime代码单独抽出来
       * runtime代码由于只是驱动不同的路由，代码量极少，请求js的时间先于执行时间
       * 需要把runtime代码内联到index.html中。需要使用script-ext-html-webpack-plugin
       * */ 
      // config => {
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()
        // 文件缓存
        config.optimization.splitChunks({
          chunks:"all",
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            elementUI: {
              name: 'chunk-elementUI', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            },
            commons: {
              name: 'chunks-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
          config.optimization.runtimeChunk('single')
    })
  }
}
