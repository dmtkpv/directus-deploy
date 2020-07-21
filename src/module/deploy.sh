#!/bin/bash

#command=$1
##command='node /Users/dmitriykarpov/Sketches/my-module/command/deploy.js'
#logFile=$PWD'/Users/dmitriykarpov/Sketches/my-module/command/status/log'
#pidFile='/Users/dmitriykarpov/Sketches/my-module/command/status/pid'
#codeFile='/Users/dmitriykarpov/Sketches/my-module/command/status/code'
codeFile="${$PWD}/logs/code"
#
#pid=$(head -n 1 $pidFile)
#
#if [ $pid ]
#then kill $pid
#fi
#
#${command} > ${logFile} 2>&1 &
#
#echo $! > $pidFile;
#wait $!
#echo $? > $codeFile;

echo 12 > $codeFile