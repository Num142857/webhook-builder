#! /bin/bash
cd /home/pi/workspace/Shanbay-Everyday
git reset --hard origin/master
git clean -f
git pull origin master
cnpm install
pm2 reload app
