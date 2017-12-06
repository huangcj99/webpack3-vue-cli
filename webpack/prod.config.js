const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');

//postcss_config
const postConfig = [
  require('autoprefixer')(),
  require('postcss-cssnext')()
];

const config = require('./config')[process.env.NODE_ENV];
const utils = require('./utils');

//html模板配置
const entries = utils.getEntry('./src/pages/**/*.js');
const pages = utils.getEntry('./src/pages/**/*.html');
const htmlPlugins = utils.getHtmlPlugins(pages, entries);
const chunks = Object.keys(entries);

module.exports = {
  devtool: false,

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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [ 'css-loader?minimize' ],
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
            'css-loader?minimize',
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

  resolve: {
    extensions: [ '.js', '.vue' ],
    //优先搜索src下的libs目录
    modules: [
      path.resolve(__dirname, "../src/libs"),
      "node_modules"
    ],
    alias: {
      'assets': path.resolve(__dirname, '../src/assets'),
      'libs': path.resolve(__dirname, '../src/libs'),
      'components': path.resolve(__dirname,'../src/components')
    }
  },

  plugins: [


    //定义环境变量
    new webpack.DefinePlugin({
      __MODE__: JSON.stringify(process.env.NODE_ENV)
    }),

    //抽离CSS
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),

    // 作用域提升，优化模块闭包的包裹数量，减少bundle的体积
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

    // 引用数超过2次的模块将抽取到common中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks,
      minChunks: 2
    }),

    // 将node_modules抽离到vendor.js里
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        //node_modules中被依赖的模块将被打包进vender
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),

    //将有webpack-runtime相关的代码抽离成manifest，持久化存储vender
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    //命令行参数使用--optimize-minimize，开启tree-shaking精简没有使用到的module
    //同时，.babelrc的modules设置为false
    //多线程执行压缩
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      exclude: /\.min\.js$/,
      output: {
        beautify: false,  //最紧凑的输出
        comments: false  //删除注释
      },
      compress: {
        warnings: false,  //删除没有用到的代码时不输出警告
        drop_console: true,  //删除打印
        collapse_vars: true,   //内嵌定义了但是只用到一次的变量
        reduce_vars: true,  //提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),

    // Make sure that the plugin is after any plugins that add images
    // These are the default options:
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

    //html模板配置
    ...htmlPlugins,

    //用于将manifest文件内联在html中，以减少一个请求
    new HtmlWebpackInlineSourcePlugin()
  ]
};
