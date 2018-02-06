const webpack = require('webpack');
const path = require('path');
const pkg = require('../package.json');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const os = require('os');

// //从package.json中将依赖的key数组作为vender打包的列表
const vendors = Object.keys(pkg.dependencies);

module.exports = {
    context: __dirname,
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    entry: {
        "vendor": vendors,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'style-loader', 'css-loader'
          ]
        }
      ]
    },
    plugins: [
        //多线程压缩
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            mangle: true,
            exclude: /\.min\.js$/,
            output: { comments: false },
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }),

        //输出manifest
        new webpack.DllPlugin({
            path:  path.join(__dirname, '../build', '[name]-manifest.json'),
            name: '[name]_[hash]',
        })
    ]
};
