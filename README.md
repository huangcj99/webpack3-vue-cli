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
|   ├── dev.config.js # 本地开发配置
|   ├── test.config.js # 测试配置
|   ├── prod.config.js # 线上配置
|   ├── utils.js # 多入口html模板装配工具
|
```

### 运行

#### 1. 本地开发

```shell
$ cd src
$ npm install #安装依赖
$ npm run dev #启动webpack-dev-server进行开发
```

#### 2. 线上打包（与测试打包相同）

```shell
$ npm run prod
```

#### 3. 可进入bin文件夹下执行脚本打包

```shell
$ cd bin
$ sh deploy.sh (./deploy.sh 需要修改该文件的权限为可执行)
```
