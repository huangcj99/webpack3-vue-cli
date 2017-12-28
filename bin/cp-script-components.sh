#!/bin/bash

rootPath=`pwd`
buildPath=${rootPath}'/build'

### 无build文件夹则先创建再复制
if [ ! -d $buildPath ]; then
    mkdir $buildPath
    cp -r ./src/script_components/. ./build/script_components
  else
    cp -r ./src/script_components/. ./build/script_components
fi

### 删除多余文件
rm -rf ./build/script_components/uglify.config.js
