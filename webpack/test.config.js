const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');

// 项目配置
const config = require('./config/config')[process.env.NODE_ENV];
const utils = require('./config/utils');
const vendors = require('./config/vendor.config.js');
const postConfig = require('./config/postcss.config');
const resolveConfig = require('./config/resolve.config.js')

const entries = utils.getEntry('./src/pages/**/*.js');
const pages = utils.getEntry('./src/pages/**/*.html');
const htmlPlugins = utils.getHtmlPlugins(pages, entries);
const chunks = Object.keys(entries);

//基础库打包（持久化缓存，node_modules下的其他不是经常使用的包统一打包到common）
entries['vendor'] = vendors

module.exports = {
  devtool: '#eval-source-map',

  entry: entries,

  output: {
    path: config.outputDir,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: config.publicPath
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [ 'css-loader' ],
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: [
                'css-loader',
                'sass-loader?outputStyle=expanded',
                {
                  // 在vue文件中不需要@import来引入scss文件就可使用mixin.scss中的全局变量与mixin
                  loader: 'sass-resources-loader',
                  options: {
                    resources: path.resolve(__dirname, '../src/assets/sass/mixin.scss')
                  }
                }
              ],
              fallback: 'vue-style-loader'
            })
          },
          postcss: postConfig
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../src')
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postConfig
              }
            }
          ]
        })
      },
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
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postConfig
              }
            },
            'sass-loader?outputStyle=expanded'
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  resolve: resolveConfig,

  plugins: [
    //定义环境变量
    new webpack.DefinePlugin({
      __MODE__: JSON.stringify(process.env.NODE_ENV)
    }),

    //抽离CSS
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),

    //作用域提升，优化模块闭包的包裹数量，减少bundle的体积
    new webpack.optimize.ModuleConcatenationPlugin(),

    //稳定moduleId
    //避免引入了一个新模块后,导致模块ID变更使得vender和common的hash变化后缓存失效
    new webpack.HashedModuleIdsPlugin(),

    //稳定chunkId
    //避免异步加载chunk(或减少chunk)，导致的chunkId变化（做持久化缓存）
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }

      return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
    }),

    //引用数超过2次的模块将抽取到common中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks,
      minChunks: 2
    }),

    //将入口配置的基础库抽离到vendor.js里，其余的node_module中的库抽取到common中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //将有webpack-runtime相关的代码抽离成manifest，持久化存储vender
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // //命令行参数使用--optimize-minimize，开启tree-shaking精简没有使用到的module
    // //同时，babel的modules设置为false
    // new UglifyJSPlugin({
    //   sourceMap: true //devtool开启了sourceMap，不开启则报错
    // }),

    //图片优化
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

    // 允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),

    new vConsolePlugin({
        enable: true
    }),

    //html模板配置
    ...htmlPlugins,

    //添加manifest.json文件在输出根目录(用于查看路径映射)
    new ManifestPlugin(),

    //用于将manifest文件内联在html中，以减少一个请求
    new HtmlWebpackInlineSourcePlugin()
  ]
};
