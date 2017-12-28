const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const scriptComponents = require('./script_components.config');

/**
 * 读取 html 文件
 * @param    {[type]}                pages   [description]
 * @param    {[type]}                entries [description]
 * @return   {[type]}                [description]
 * @datetime 2017-11-21T16:58:57+080
 * @author joe<smallcatcat.joe@gmail.com>
 */
const getEntry = (globPath, exclude) => {
  const entries = {};
  let excludePaths = [];
  let basename;
  let tmp;
  let pathname;

  if (exclude) {
    exclude = (typeof exclude === 'string') ? [exclude] : exclude;
    for (let i = 0; i < exclude.length; i++) {
      excludePaths = excludePaths.concat(glob.sync(exclude[i]));
    }
  }

  glob.sync(globPath).forEach((entry) => {
    if (excludePaths.indexOf(entry) > -1) {
      return;
    }

    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/');
    tmp.pop();
    tmp.shift();
    tmp.shift();
    tmp.shift();

    if (tmp[tmp.length - 1] === basename) {
      tmp = tmp.join('/');
      pathname = `${tmp}/${basename}`; // 正确输出js和html的路径
      entries[pathname] = entry;
    }

  });

  return entries;
};

/**
 * 读取 html 文件
 * @param    {[type]}                pages   [description]
 * @param    {[type]}                entries [description]
 * @return   {[type]}                [description]
 * @datetime 2017-11-21T16:58:57+080
 * @author joe<smallcatcat.joe@gmail.com>
 */
const getHtmlPlugins = (pages, entries) => {
  const confs = [];

  for (const pathname in pages) {

    if (Object.prototype.hasOwnProperty.call(pages, pathname)) {
      // 配置生成的html文件，定义路径等
      const conf = {
        filename: `${pathname}.html`,
        favicon: 'src/assets/imgs/favicon.ico', //favicon.ico路径
        template: pages[pathname], // 模板路径
        inlineSource:  'manifest',  //内联manifest，减少一个请求
        inject: true, // js插入位置
        minify: {
          minifyJS: true
        },
        chunks: ['manifest', 'vendor', 'common'],
        chunksSortMode: 'dependency',
        components: scriptComponents //需要以script链接的方式引入的模块用自定义模板引入
      };

      if (pathname in entries) {
        conf.chunks.push(pathname);
      }

      confs.push(new HtmlWebpackPlugin(conf));
    }
  }

  return confs;
};

module.exports = {
  getEntry,
  getHtmlPlugins
};
