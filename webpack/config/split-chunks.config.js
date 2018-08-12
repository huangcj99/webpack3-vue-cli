const splitChunksConfig = {
  // 项目基础包
  'vendor': [
    'vue',
    'axios'
  ],
  /**
   * 可添加多个包，根据依赖顺序
   */
  // 用于单页面引入
  'spa-vendor': [
    'vue-router',
    // 下面两个文件一同打包，解决异步chunk样式抽取失败问题
    'css-loader/lib/css-base',
    'style-loader/lib/addStyles'
  ]
}

module.exports = splitChunksConfig
