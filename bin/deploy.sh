#!/bin/bash
serverStaticPath="fun:~/test-scp/"

cd ../src

echo "开始安装依赖"
npm install

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
