const path = require('path');

// 研发/测试/线上构建配置项
const config = {
  dev: {
    port: 9000,
    outputDir: path.join(__dirname, '../../build'),
    publicPath: '/',
    proxy: {
      '/api/**': {
        target: 'http://dev.api.cer.dingdingyisheng.mobi',
        changeOrigin: true
      }
    }
  },

  test: {
    outputDir: path.join(__dirname, '../../build'),
    publicPath: '/'
  },

  production: {
    outputDir: path.join(__dirname, '../../build'),
    publicPath: '/'
  }
};

module.exports = config;
