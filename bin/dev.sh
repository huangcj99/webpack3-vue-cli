#!/bin/bash

rootPath=`pwd`
packagePath=${rootPath}'/package.json'
dllValidatePath=${rootPath}'/build/vendor.dll.validate.txt'

### 读取package.json的dependencies与devDependencies对应的行数
dependenciesRow=`grep -n "dependencies" $packagePath | cut  -d  ":"  -f  1`
devDependenciesRow=`grep -n "devDependencies" $packagePath | cut  -d  ":"  -f  1`

### 依赖行数（以此判断依赖是否增减）
rows=$[$devDependenciesRow-$dependenciesRow]

### 判断vendor.dll.validate.txt文件是否存在
if [ -e $dllValidatePath ]; then

  ### 获取之前的依赖行数
  oldRows=`cat $dllValidatePath`

  if [ $oldRows == $rows ]; then
    ### 依赖数量相等则直接构建
    npm run dev
  else
    echo $rows > $dllValidatePath
    ### 不等，重新创建vendor.dll.js，并将新的行数写到vendor.dll.validate.txt
    npm run dll
    npm run dev
  fi

else
  rm -rf build
  mkdir build
  touch $dllValidatePath
  echo $rows > $dllValidatePath
  npm run dll
  npm run dev
fi
