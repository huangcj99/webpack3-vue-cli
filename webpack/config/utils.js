const path = require('path')
const fs = require('fs')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// project webpack config
const includeEntries = require('./include-entries.config')
const scriptComponents = require('./script_components.config')
const splitChunksConfig = require('./split-chunks.config')
const loading = require('./render-loading')

const getEntry = (globPath, exclude) => {
  const entries = {}
  let excludePaths = []
  let basename
  let tmp
  let pathname

  if (exclude) {
    exclude = (typeof exclude === 'string') ? [exclude] : exclude;
    for (let i = 0; i < exclude.length; i++) {
      excludePaths = excludePaths.concat(glob.sync(exclude[i]))
    }
  }

  glob.sync(globPath).forEach((entry) => {
    if (excludePaths.indexOf(entry) > -1) {
      return
    }

    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/')
    tmp.pop()
    tmp.shift()
    tmp.shift()
    tmp.shift()

    if (tmp[tmp.length - 1] === basename) {
      tmp = tmp.join('/')
      pathname = `${tmp}/${basename}` // 正确输出js和html的路径
      entries[pathname] = entry
    }

  })

  return entries
};

const getHtmlPlugins = (pages, entries) => {
  const confs = []

  for (let pathname in pages) {
    let pathnameCopy = pathname
    let tmp = pathnameCopy.split('/')
    let pageConfigPath = ''
    let pageConfig = null
    let pageConfigExists = false

    // js入口文件名部分去除
    tmp.pop()

    // 每个页面对应config文件路径
    pageConfigPath = path.resolve('.', 'src/pages', tmp.join('/'), 'config.js')

    // 文件存在则将相关配置取出
    pageConfigExists = fs.existsSync(pageConfigPath)

    if (pageConfigExists) {
      pageConfig = require(pageConfigPath)
    }

    if (Object.prototype.hasOwnProperty.call(pages, pathname)) {
      // 配置生成的html文件，定义路径等
      let conf = {
        filename: `${pathname}.html`,
        favicon: 'src/assets/imgs/favicon.ico',
        template: pages[pathname], // 模板路径
        inject: true, // js插入位置
        minify: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? false : {
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
          removeAttributeQuotes: true // 去除属性引用
        },
        inlineSource: 'manifest', // 内联manifest，减少一个请求
        chunks: ['manifest', ...Object.keys(splitChunksConfig), 'common'], // 依赖插入顺序
        chunksSortMode: function (chunk1, chunk2) {
          var dep1 = conf.chunks.indexOf(chunk1.names[0])
          var dep2 = conf.chunks.indexOf(chunk2.names[0])

          // 根据chunks顺序插入
          return dep1 - dep2
        },
        components: scriptComponents, // 需要以script链接的方式引入的模块用自定义模板引入
        loading: loading
      }

      // 配置页面文件
      if (pageConfig) {
        conf = Object.assign(conf, pageConfig)
      } else {
        conf = Object.assign(conf)
      }

      if (pathname in entries) {
        conf.chunks.push(pathname)
      }

      confs.push(new HtmlWebpackPlugin(conf))
    }
  }

  return confs
}

// 过滤入口
const filterEntries = (entries) => {
  if (includeEntries[0] === 'all') {
    return entries
  }

  let filterEntries = {}

  for (let key in entries) {
    for (let i = 0; i < includeEntries.length; i++) {
      let hasInclude = key.indexOf(includeEntries[i])

      if (hasInclude !== -1) {
        filterEntries[key] = entries[key]
      }
    }
  }

  return filterEntries
}

// options传入获取过滤后的入口
const getFilterEntries = (globPath, shouldFilter) => {
  if (shouldFilter && shouldFilter === 'filter') {
    return filterEntries(getEntry(globPath))
  } else {
    return getEntry(globPath)
  }
}

// 将单独打包的配置注入到入口当中
const setSplitChunksToEntry = (entries) => {
  for (let chunk in splitChunksConfig) {
    entries[chunk] = splitChunksConfig[chunk]
  }

  return entries
}

module.exports = {
  getEntry,
  getHtmlPlugins,
  getFilterEntries,
  setSplitChunksToEntry
}