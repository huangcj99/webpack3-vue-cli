const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const os = require('os');

// 将script_components下的所有js文件进行压缩后放入build文件夹内
const getScriptComponentEntry = () => {
  let entries = {};

  glob.sync('./src/script_components/**/*.js').forEach((entry) => {
    let basename = path.basename(entry, path.extname(entry)),
        pathname = '',
        tmp = entry.split('/'),
        realEntry = entry.split('/');

    // 撇除配置文件
    if (basename.indexOf('uglify') > -1) {
      return
    }

    // min文件不压缩，避免压缩出错
    if (entry.indexOf('min') > -1) {
      return
    }

    // 拼装key为 script_components/lib-flexible/1.0.0/index
    tmp.pop();
    tmp.shift();
    tmp.shift();
    tmp.push(basename)
    tmp = tmp.join('/')
    console.log(tmp);

    // 拼装entry为 ./lib-flexible/1.0.0/index.js
    realEntry.shift();
    realEntry.shift();
    realEntry.shift();
    realEntry.unshift('.')
    realEntry = realEntry.join('/')

    entries[tmp] = realEntry;
  });

  return entries;
}

module.exports = {
    context: __dirname,
    output: {
        path: path.join(__dirname, '../../build'),
        filename: '[name].js'
    },
    entry: getScriptComponentEntry(),
    plugins: [
        //多线程压缩
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            mangle: true,
            output: { comments: false },
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        })
    ]
};
