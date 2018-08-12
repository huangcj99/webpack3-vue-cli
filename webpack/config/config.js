const path = require('path')

// 输出路径
const outputDirPath = path.join(__dirname, '../../public')
// 输出资源的前缀
const publicPath = '/'

// 研发/测试/线上构建配置项
const config = {
  development: {
    host: 'localhost',
    port: 9000,
    outputDir: outputDirPath,
    publicPath: publicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    proxy: {
      '/api/**': {
        target: 'http://test.weixin.api.renbo.dingdingyisheng.mobi', // 服务器地址
        changeOrigin: true
      }
    },
    vars: {
      __MODE__: JSON.stringify('development')
    }
  },

  test: {
    outputDir: outputDirPath,
    publicPath: publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    vars: {
      __MODE__: JSON.stringify('test')
    }
  },

  production: {
    outputDir: outputDirPath,
    publicPath: publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    vars: {
      __MODE__: JSON.stringify('production')
    }
  }
}

module.exports = config
