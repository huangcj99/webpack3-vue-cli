#!/bin/bash

#脚本demo
serverStaticPath="fun:~/test-scp/"

cd ../src

rm -rf build/

# 实际上还需要让打包者输入分支再进行打包

echo "开始打包"
npm run prod

echo "send to test-server?(yes or no)"
read -r result

if [ "$result" = "yes" ];then
  echo "开始发送"
  cd ../build
  scp -r * $serverStaticPath
else
  exit -1
fi
