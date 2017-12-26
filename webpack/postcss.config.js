const postcssConfig = [
  require('autoprefixer')(),
  require('postcss-px2rem')({ remUnit: 75 })
];

module.exports = postcssConfig;
