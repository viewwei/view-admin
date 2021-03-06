const path = require('path')
const port = process.env.port || 9527
const zipPlugin = require('./src/webpackPlugin/zip')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: 'build',
  assetsDir: 'resource',
  productionSourceMap: false,

  devServer: {
    port: port,
    open: true,
    overlay: {
      errors: true,
      warn: false
    }
  },
  css: {
  },
  configureWebpack: {
    // externals: {
    //   twaver: 'twaver'
    // },
    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },

    name: 'view_ui',
    plugins:[
      new zipPlugin({
        filePath:path.resolve(__dirname,"build"),
        zipPath:path.resolve(__dirname,"target"),
        zipName:"view"
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack (config) {
    
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 配置 scss 变量共享
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局变量文件路径，只有一个时可将数组省去
          resources: ['./src/styles/variables.scss']
        })
        .end()
    })
    // 路由预加载
    config.plugin('preload')
      .tap(() => [
        {
          rel: 'preload',
          fileBlackList: [/.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: ['initial']
        }
      ])
    // 页面太多的时候，会产生无意思请求
    config.plugins.delete('prefetch')
    config.when(process.env.NODE_ENV != 'development', config => {
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
        chunks: 'all',
        cacheGroups: {
          // 单独打包库文件
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            // 单独打包饿了么框架
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            // 打包项目文件
            name: 'chunks-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single') // 单独打包 runtime
    })
  }
}
