const os = require('os')
const path = require('path')
const webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')
const vConsolePlugin = require('vconsole-webpack-plugin')

// 项目配置
const baseWebpackConfig = require('./base.config')
const config = require('./config/config')[process.env.NODE_ENV]
const utils = require('./config/utils')
const postcssConfig = require('./config/postcss.config')
const splitChunksConfig = require('./config/split-chunks.config')

// html模板配置
let entries = utils.getEntry('./src/pages/**/*.js')
let pages = utils.getEntry('./src/pages/**/*.html')
let htmlPlugins = utils.getHtmlPlugins(pages, entries)
let chunks = Object.keys(entries)

// chunks配置
entries = utils.setSplitChunksToEntry(entries)

module.exports = WebpackMerge(baseWebpackConfig, {
  devtool: '#eval-source-map',

  entry: entries,

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: ['css-loader'],
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: [
                'css-loader',
                'sass-loader?outputStyle=expanded',
                {
                  // 在vue文件中不需要引入全局的scss就可使用mixin.scss中的全局变量与mixin
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      path.resolve(__dirname, '../src/assets/sass/mixin.scss'),
                      path.resolve(__dirname, '../src/assets/sass/svg.scss')
                    ]
                  }
                }
              ],
              fallback: 'vue-style-loader'
            })
          },
          postcss: postcssConfig
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssConfig
              }
            }
          ]
        })
      },
      // 需要按需引入mint-ui库
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssConfig
              }
            },
            'sass-loader?outputStyle=expanded',
            {
              // 在vue文件中不需要@import来引入scss文件就可使用mixin.scss中的全局变量与mixin
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, '../src/assets/sass/mixin.scss'),
                  path.resolve(__dirname, '../src/assets/sass/svg.scss')
                ]
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin(config.vars),

    // 抽离CSS
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),

    // 作用域提升，优化模块闭包的包裹数量，减少bundle的体积
    new webpack.optimize.ModuleConcatenationPlugin(),

    // 稳定moduleId
    // 避免引入了一个新模块后,导致模块ID变更使得vender和common的hash变化后缓存失效
    new webpack.HashedModuleIdsPlugin(),

    // 引用数超过2次的模块将抽取到common中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks,
      minChunks: 3
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: [...Object.keys(splitChunksConfig)].reverse(),
      minChunks: Infinity
    }),

    // 将有webpack-runtime相关的代码抽离成manifest，持久化存储vender
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: [...Object.keys(splitChunksConfig)]
    }),

    // 图片优化
    new ImageminPlugin({
      disable: false,
      optipng: {
        optimizationLevel: 3
      },
      gifsicle: {
        optimizationLevel: 1
      },
      jpegtran: {
        progressive: false
      },
      svgo: {},
      pngquant: null, // pngquant is not run unless you pass options here
      plugins: []
    }),

    // 命令行参数使用--optimize-minimize，开启tree-shaking精简没有使用到的module
    // 同时，.babelrc的modules设置为false
    // 多线程执行压缩
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      exclude: /\.min\.js$/,
      output: {
        beautify: false, // 最紧凑的输出
        comments: false // 删除注释
      },
      compress: {
        warnings: false, // 删除没有用到的代码时不输出警告
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),

    new vConsolePlugin({
      enable: true
    }),

    //  html模板配置
    ...htmlPlugins,

    // //用于将manifest文件内联在html中，以减少一个请求
    new HtmlWebpackInlineSourcePlugin()
  ]
});