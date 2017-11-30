#!/bin/bash

#脚本demo
serverStaticPath="fun:~/test-scp/"

cd ../

echo "please enter env(dev/test/prod):"
read -r env

rm -rf build/
npm run "$env"

if [ "$env" = "test" ];then
  echo "send to test-server?(yes or no)"
  read -r result

  if [ "$result" = "yes" ];then
    echo "开始发送"
    # cd ../build
    # scp -r * $serverStaticPath
  else
    exit -1
  fi

fi
