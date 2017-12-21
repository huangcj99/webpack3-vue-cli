#!/bin/bash

rootPath=`pwd`
buildPath=${rootPath}'/build'

if [ ! -d $buildPath ]; then
    mkdir $buildPath
    cp -r ./src/script_components ./build/script_components
  else
    cp -r ./src/script_components ./build/script_components
fi
