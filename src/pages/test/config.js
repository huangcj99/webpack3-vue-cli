/**
 * 可覆盖html-webpack-plugin对每个页面的配置
 * webpack/config/utils.js中有相关配置选项
 */
let pageConfig = {
  /**
   * 正则匹配文件，选择需要内联的内容(小的业务文件可以选择内联，减少一个请求)
   * 不填写则默认匹配manifest（如果填写了，则会覆盖默认配置）
   * | 符号为正则内的或
   * 将匹配manifest、test.*\.css、test.*\.js这三个文件
   */
  inlineSource: 'manifest',
  /**
   * html-webpack-plugin@alpha版本chunks选择失败
   * 不填写则默认匹配 manifest, vendor, common
   */
  chunks: ['manifest', 'vendor', 'common']
}

module.exports = pageConfig