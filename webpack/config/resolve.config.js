const path = require('path')

module.exports = {
  extensions: [ '.js', '.vue' ],
  //优先搜索src下的公共资源目录
  modules: [
    path.resolve(__dirname, "../../src/assets"),
    path.resolve(__dirname, "../../src/libs"),
    path.resolve(__dirname, "../../src/components"),
    "node_modules"
  ],
  alias: {
    // 公共资源
    'assets': path.resolve(__dirname, '../../src/assets'),
    'libs': path.resolve(__dirname, '../../src/libs'),
    'components': path.resolve(__dirname,'../../src/components')
  }
}
