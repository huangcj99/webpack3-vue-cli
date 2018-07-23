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
        target: '', // 服务器地址
        changeOrigin: true
      }
    }
  },

  test: {
    outputDir: outputDirPath,
    publicPath: publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  production: {
    outputDir: outputDirPath,
    publicPath: publicPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }
};

module.exports = config
