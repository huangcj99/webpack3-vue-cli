const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pageRootPath = path.resolve(__dirname, '../pages');
const outputPath = path.resolve(__dirname, '../../build')



module.exports = {
  entry: {
    test: '../pages/test/test.js',
    index: '../pages/test/index.js'
  },
  output: {
    filename: '[name].boundle.js',
    path: outputPath
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  devServer: {
    contentBase: outputPath,
    port: 9000
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      'assets': path.resolve(__dirname, '../assets'),
      'libs': path.resolve(__dirname, '../libs'),
      'components': path.resolve(__dirname,'../components')
    }
  },

  plugins: [
    new CleanWebpackPlugin(['../../build']),

    new HtmlWebpackPlugin()
  ]
};
