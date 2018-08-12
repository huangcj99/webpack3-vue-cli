const os = require('os')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')

const config = require('./config/config')[process.env.NODE_ENV]
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

const resolve = (src) => path.resolve(__dirname, src)

module.exports = {
  output: {
    path: config.outputDir,
    filename: config.filename,
    chunkFilename: config.chunkFilename,
    publicPath: config.publicPath
  },

  resolve: {
    extensions: ['.js', '.vue'],
    // 优先搜索src下的公共资源目录
    modules: [
      resolve('../src/assets'),
      resolve('../src/libs'),
      resolve('../src/components'),
      resolve('../src/plugin'),
      'node_modules'
    ],
    alias: {
      // 公共资源
      'assets': resolve('../src/assets'),
      'libs': resolve('../src/libs'),
      'components': resolve('../src/components'),
      'plugin': resolve('../src/plugin')
    }
  },

  module: {
    rules: [{
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        include: [
          resolve('../src')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'fonts/[name].[hash].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  plugins: [
    // 允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),

    // 多线程打包
    new HappyPack({
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}