## 一、快速开始

### 本地开发/测试环境打包/线上环境打包

### 安装
```shell
$ git clone git@github.com:smallcatcat-joe/webpack3-demo.git
```
#### 项目的目录结构如下：
```shell
├── bin # 部署脚本
|
├── build # 编译输出
|
├── src # 源文件目录
|   ├── assets # 网站公共资源以及全局css
|   |
|   ├── components # 公共组件
|   |
|   ├── libs # 库
|   |
|   ├── pages # 页面
|   
├── webpack
|   ├── config # api 目录
|   ├── dll.config.js #  用于打包开发vendor.dll.js的配置文件
|   ├── basic-vendor.config.js # 线上打包的基础库列表
|   ├── dev.config.js # 本地开发配置
|   ├── test.config.js # 测试配置
|   ├── prod.config.js # 线上配置
|   ├── utils.js # 多入口html模板装配工具
|
```

### 运行

#### 1. 本地开发

```shell
$ npm install #安装依赖
$ npm run dll #生成dll文件（加快开发时的编译速度）
$ npm run dev #启动webpack-dev-server进行开发

注意：dll需要人工维护，如果增加了文件依赖，需要重新打包一份dll
```

#### 2. 线上打包（与测试打包相同，测试包，不涉及压缩，用于测试环境下调试）

```shell
$ npm run prod
```

#### 3. 可进入bin文件夹下执行脚本打包

```shell
$ cd bin
$ sh deploy.sh (./deploy.sh 需要修改该文件的权限为可执行)
```

### 打包方案(适用于持续迭代)

将node_modules下的库分成两类
  1.基础模块（如：vue，axios等，在增量开发时，此类模块打包成vendor做持久化存储）
  2.在迭代的时候引入的模块(不常用，但是需要打包的，统一打包到common中，与src/libs自己写的模块做统一打包配置)

在src/libs下放置团队根据业务编写的模块，同样统一打包到common中
