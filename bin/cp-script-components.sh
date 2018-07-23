#!/bin/bash

rootPath=`pwd`
publicPath=${rootPath}'/public'

### 无build文件夹则先创建再复制
if [ ! -d $publicPath ]; then
    mkdir $publicPath
    cp -r ./src/script_components/. ./public/script_components
  else
    cp -r ./src/script_components/. ./public/script_components
fi

### 删除多余文件
rm -rf ./public/script_components/uglify.config.js
