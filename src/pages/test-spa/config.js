/**
 * 可覆盖html-webpack-plugin对每个页面的配置
 * webpack/config/utils.js中有相关配置选项
 */
let pageConfig = {
  inlineSource: 'manifest',
  /**
   * 不填写则默认匹配 manifest, vendor, common，页面的业务js默认插入
   */
  chunks: ['manifest', 'vendor', 'spa-vendor', 'common']
}

module.exports = pageConfig