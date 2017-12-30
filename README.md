# webpack3搭建vue脚手架，移动端

## 一、环境搭建
### [Node](https://nodejs.org/) 安装

> 项目基于 Node LTS V6.9.1 版本

推荐使用 [nvm](https://github.com/creationix/nvm) 管理 Node 版本

## 二、快速开始

### 本地开发/测试环境打包/线上环境打包

### 安装

```shell
$ git clone git@github.com:smallcatcat-joe/webpack3-vue-cli.git
```

#### 项目的目录结构如下：
```shell
├── bin # 编译部署等脚本
|
├── build # 编译输出
|
├── src # 源文件目录
|   ├── assets # 网站公共资源以及全局css
|   |
|   ├── components # 公共组件
|   |
|   ├── libs # 库
|   |
|   ├── script_components # 需要以script方式引入到html的模块
|   |          ├── ... # 相关模块
|   |          ├── uglify.config.js # 用于线上打包时对script_components进行压缩输出
|   |
|   ├── pages # 页面
|         ├── test # 页面文件夹
|               ├── components # 存放vue组件
|               ├── test.html # 模板html
|               ├── test.js # js入口
|               ├── test.scss # scss文件用于非单文件css编写
|               ├── app.vue # vue组件入口
|
├── webpack
|   ├── config # api 目录 （接口转发配置）
|   ├── dll.config.js #  用于打包开发vendor.dll.js的配置文件(本地开发时，避免重复编译vendor，节省时间)
|   ├── vendor.config.js # 线上打包的vendor列表
|   ├── dev.config.js # 本地开发配置
|   ├── test.config.js # 测试配置
|   ├── prod.config.js # 线上配置
|   ├── utils.js # 多入口html模板装配
|   ├── postcss.config.js # postcss插件配置
|
```

### 运行

#### 1. 本地开发

```
$ npm install #安装依赖
$ npm run start # 会根据依赖的增减判断是否需要重新创建dll文件
```

注：bin/dev.sh的脚本是根据依赖的增减来判断是否需要重复构建dll文件，如果增加了一个新的依赖，又删除了一个旧的，因为总的依赖数量不变，所以执行npm start后dll不会重新构建，此时可以删除build文件夹，再重新执行npm start


#### 2. 线上打包（与测试打包相同，测试包，不涉及压缩，用于测试环境下调试）

```
$ npm run prod
```

#### 3. 可进入bin文件夹下执行脚本打包，使用scp发送至测试服务器（自行编写）

```
$ cd bin
$ sh deploy.sh (./deploy.sh 需要修改该文件的权限为可执行)
```

### 移动端适配方案

#### lib-flexible(rem适配)

```
1. <head>中引入lib-flexible，参考test.html下的引入方式

2. 使用postcss-px2rem自动转换（通过注释的方式标记）
  .test {
    width: 100px;
    height: 100px;
    font-size: 20px;/*px*/
    border: 1px solid black;/*no*/
    color: red;
  }

  =========>

  .test {
    width: 1.33rem;
    height: 1.33rem;
    border: 1px solid black;
    color: red;
  }
  [data-dpr="1"] .test {
    font-size: 10px;
  }
  [data-dpr="2"] .test {
    font-size: 20px;
  }
  [data-dpr="3"] .test {
    font-size: 30px;
  }
```

### eslint代码检测

#### 仅对src/pages下的代码进行检测（.eslintignore可自行修改），已加入到webpack当中，也可以通过以下命令行手动检测

```
$ npm run lint
```

### 打包方案(适用于持续迭代)

#### 将node_modules下的库分成两类
```
1.vendor（如：vue，axios等，在增量开发时，此类模块打包成vendor做持久化存储）

2.common 在迭代的时候引入的模块(不常用，但是需要打包的，统一打包到common中，与src/libs自己写的模块做统一打包配置)
```
src/libs下放置团队根据业务编写的模块，src/components放置公共组件，统一打包到common中

注：需要打进vendor包的库，可在vendor.config.js文件中配置，此方案vendor打包的库版本最好在package.json设为指定版本（版本变更可能会导致vendor hash值变化）


### script_components配置

#### 详情查看html-webpack-plugin插件的自定义模板（webpack/utils.js下进行配置）

webpack/script_components.config.js
```
const scriptComponents = {
  flexible: '/script_components/lib-flexible/1.0.0/index.js',
  wxjssdk: '/script_components/wx-jssdk/1.2.0/wx-jssdk.min.js'
}
```
注：不需要压缩的模块文件名加上min

src/pages/test/test.html
```
<html>
  <head>
    <meta charset="UTF-8">
    <title>test</title>
    <script src="<%= htmlWebpackPlugin.options.components.flexible %>"></script>
  </head>
  <body>
    ...
    <script src="<%= htmlWebpackPlugin.options.components.wxjssdk %>"></script>
  </body>
</html>

```

npm run start 脚本会自动将src/script_components复制到build中供开发时使用

npm run prod  脚本会自动压缩模块并且将压缩后的模块输出到build中供生产环境使用

### window下（无bash命令行工具）

#### 本地开发

```
$ npm run dll
$ npm run dev  (删除package.json中script中的predev, 因为包含bash脚本)
```

因无法用bash，只能手动维护dll文件，如果需要用到script_components需要自己复制到build中，路径参照webpack/utils.js中的多入口html模板配置

#### 打包

```
$ npm run uglify (手动压缩并输出script_components到build中)
$ npm run prod (删除package.json中script中的preprod, 因为包含bash脚本)
```

推荐安装git bash或者是cmder命令行工具
