#!/bin/bash

# 未压缩文件数量
originalFileCount=0

# 遍历script_components下的js文件，文件尾缀没有min的即为未压缩文件，originalFileCount加一
for file in ./src/script_components/*/*/*
do
    if [[ !( $file =~ "min" ) ]]; then
        (( originalFileCount++ ))
        echo 'originalFileCount:'${originalFileCount}
    fi
done

# 没有min文件则直接执行复制，否则执行压缩
if [[ $originalFileCount -eq 0 ]]; then
    sh bin/cp-script-components.sh
else 
    webpack --config ./src/script_components/uglify.config.js
fi

