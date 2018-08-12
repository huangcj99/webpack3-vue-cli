const path = require('path')
const webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const Notifier = require('node-notifier')
const vConsolePlugin = require('vconsole-webpack-plugin')
const mockMiddleware = require('../mock/index')

// 判断是否开启mock服务
const openMock = () => {
  let open = false
  
  // 查看是否存在--mock参数，若有则开启mock服务器
  for (let i = 0, arg = ''; arg = process.argv[i++];) {
    if (process.env['mock']) {
      open = true
    }
  }

  if (open) {
    return function (app) {
      mockMiddleware(path.resolve(__dirname, '../mock/config.js'), app)
    }
  } else {
    return function () {}
  }
}

// 项目配置
const baseWebpackConfig = require('./base.config')
const config = require('./config/config')[process.env.NODE_ENV]
const utils = require('./config/utils')
const postcssConfig = require('./config/postcss.config')

// 配置入口与html生成模板
const entries = utils.getFilterEntries('./src/pages/**/*.js', 'filter')
const pages = utils.getFilterEntries('./src/pages/**/*.html', 'filter')
const htmlPlugins = utils.getHtmlPlugins(pages, entries)

module.exports = WebpackMerge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',

  entry: entries,

  // webpack-dev-server开启
  devServer: {
    port: config.port,
    contentBase: config.outputDir,
    watchContentBase: true, // 文件改动将触发整个页面重新加载
    quiet: true,
    proxy: config.proxy,
    // mock-server
    before: openMock()
  },

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader?sourceMap!css-loader?sourceMap',
            scss: [
              'vue-style-loader?sourceMap',
              'css-loader?sourceMap',
              'sass-loader?sourceMap',
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
            ]
          },
          postcss: postcssConfig
        }
      },
      {
        test: /\.css$/,
        include: /(node_modules|assets)/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssConfig,
              sourceMap: true
            }
          },
          'sass-loader?sourceMap',
          {
            // 在scss文件中不需要@import来引入scss文件就可使用mixin.scss中的全局变量与mixin
            loader: 'sass-resources-loader?sourceMap',
            options: {
              resources: [
                path.resolve(__dirname, '../src/assets/sass/mixin.scss'),
                path.resolve(__dirname, '../src/assets/sass/svg.scss')
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // 将文件同步输出到public
    new WriteFilePlugin(),

    // 定义环境变量
    new webpack.DefinePlugin(config.vars),

    // 稳定moduleId，避免引入了一个新模块后，导致模块ID变更使得vender和common的hash变化缓存失效
    new webpack.NamedModulesPlugin(),

    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name
      }

      return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
    }),

    // 指导webpack打包业务代码时，使用预先打包好的vender.dll.js
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../public/vendor-manifest.json'),
    }),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${config.host}:${config.port}`]
      },
      onErrors: () => {
        return (serverity, errors) => {
          const error = errors[0]
          const filename = error.file && error.file.split('!').pop

          Notifier.notify({
            title: '',
            message: serverity + ':' + error.name,
            subtitle: filename || ''
          })
        }
      }
    }),

    new vConsolePlugin({
      enable: true
    }),

    // html-Templlate
    ...htmlPlugins,

    // 给每一个入口添加打包好的vender.dll.js
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['vendor.dll.js'],
      append: false, // 在body尾部的第一条引入
      hash: true
    })
  ]
});