#

## 一、快速开始

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
|   ├── dll.config.js #  用于打包开发vendor.dll.js的配置文件(本地开发时，避免重复编译vender，节省时间)
|   ├── vendor.config.js # 线上打包的vender列表
|   ├── dev.config.js # 本地开发配置
|   ├── test.config.js # 测试配置
|   ├── prod.config.js # 线上配置
|   ├── utils.js # 多入口html模板装配
|   ├── postcss.config.js # postcss插件配置
|
```

### 运行

#### 1. 本地开发

```shell
$ npm install #安装依赖
$ npm run start # 会根据依赖的增减判断是否需要重新创建dll文件
```

注：脚本是根据依赖的增减来判断是否需要重复构建dll文件，如果增加了一个新的依赖，又删除了一个旧的，因为总的依赖数量不变，所以执行npm start后dll不会重新构建，此时可以删除build文件夹，再重新执行npm start


#### 2. 线上打包（与测试打包相同，测试包，不涉及压缩，用于测试环境下调试）

```shell
$ npm run prod
```

#### 3. 可进入bin文件夹下执行脚本打包

```shell
$ cd bin
$ sh deploy.sh (./deploy.sh 需要修改该文件的权限为可执行)
```

### 移动端适配方案

#### lib-flexible(rem适配)

```
<head>中引入lib-flexible，参考test.html下的引入方式
```

### eslint代码检测

#### 仅对src/pages下的代码进行检测，已加入到webpack当中，也可以通过以下命令行手动检测

```
$ npm run lint
```

### 打包方案(适用于持续迭代)

#### 将node_modules下的库分成两类
```
1.基础模块（如：vue，axios等，在增量开发时，此类模块打包成vendor做持久化存储）
2.在迭代的时候引入的模块(不常用，但是需要打包的，统一打包到common中，与src/libs自己写的模块做统一打包配置)

在src/libs下放置团队根据业务编写的模块，同样统一打包到common中

注：此方案vendor打包的库版本最好在package.json设为指定版本（版本变更可能会导致vendor hash值变化）
```
