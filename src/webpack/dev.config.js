const path = require('path');
const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

//postcss_config
const postConfig = [
  require('autoprefixer')(),
  require('postcss-cssnext')()
];

//项目配置
const config = require('./config')[process.env.NODE_ENV];
const utils = require('./utils');

const entries = utils.getEntry('./pages/**/*.js');
const pages = utils.getEntry('./pages/**/*.html');
const htmlPlugins = utils.getHtmlPlugins(pages, entries);
const chunks = Object.keys(entries);

module.exports = {
  devtool: '#eval-source-map',

  entry: entries,

  output: {
    path: config.outputDir,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: config.publicPath
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader?sourceMap!css-loader?sourceMap'
          },
          postcss: postConfig
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postConfig,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader', 'css-loader'
        ]
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

  //webpack-dev-server开启
  devServer: {
    contentBase: config.outputDir,
    port: config.port
  },

  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'assets': path.resolve(__dirname, '../assets'),
      'libs': path.resolve(__dirname, '../libs'),
      'components': path.resolve(__dirname,'../components')
    }
  },

  plugins: [
    //定义环境变量
    new webpack.DefinePlugin({
      __MODE__: JSON.stringify(process.env.NODE_ENV)
    }),

    // 作用域提升，优化模块闭包的包裹数量，减少bundle的体积
    new webpack.optimize.ModuleConcatenationPlugin(),

    //稳定moduleId，避免引入了一个新模块后，导致模块ID变更使得vender和common的hash变化缓存失效
    new webpack.NamedModulesPlugin(),

    //稳定chunkId
    //避免异步加载chunk(或减少chunk)，导致的chunkId变化（做持久化缓存）
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }

      return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
    }),

    // 抽取通用代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks,
      minChunks: 2
    }),

    // 公共库会被抽离到vendor.js里
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        // any required modules inside node_modules are extracted to vendor
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

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
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

    //html-Templlate
    ...htmlPlugins,

    //用于将manifest文件内联在html中，以减少一个请求
    new HtmlWebpackInlineSourcePlugin()
  ]
};
