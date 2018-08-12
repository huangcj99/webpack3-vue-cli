const webpack = require('webpack')
const path = require('path')
const pkg = require('../package.json')

// //从package.json中将依赖的key数组作为vender打包的列表
const vendors = Object.keys(pkg.dependencies)

module.exports = {
  context: __dirname,
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  entry: {
    'vendor': vendors
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: /node_modules/,
      use: [
        'style-loader', 
        'css-loader'
      ]
    }]
  },
  plugins: [
    // 输出manifest
    new webpack.DllPlugin({
      path: path.join(__dirname, '../public', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
};