const postcssConfig = [
  /**
   * browsersList在package.json中设置即可
   */
  require('autoprefixer')(),
  /**
   * viewportWidth: 375   // 设计图尺寸
   * selectorBlackList: []   // 需要匹配某一些类或者标签不进行vw的转换
   */
  require('postcss-px-to-viewport')({
     viewportWidth: 375,
     selectorBlackList: []
  })
];

module.exports = postcssConfig;
