const splitChunksConfig = {
  // 项目基础包
  vendor: [
    'vue',
    'axios'
  ],

  /**
   * 可添加多个包，根据依赖顺序
   */
}

module.exports = splitChunksConfig
