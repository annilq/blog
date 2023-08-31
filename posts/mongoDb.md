---
title: MongoDB小记
date: 2016-04-18 15:30:01
tags: MongoDB
---
### Install MongoDB with Homebrew

~~~
brew install mongodb
mkdir -p /data/db
~~~

### Set permissions for the data directory

Ensure that user account running mongod has correct permissions for the directory:

```sh
sudo chmod 0755 /data/db
sudo chown $USER /data/db
```

### start mongodb service to running on the mac.

```sh
brew services start mongodb
```

[参考链接](http://stackoverflow.com/questions/5596521/what-is-the-correct-way-to-start-a-mongod-service-on-linux-os-x)

#### window下面安装mongodb
参考链接[windows下MongoDB的安装及配置](https://jingyan.baidu.com/article/d5c4b52bef7268da560dc5f8.html)
1. 下载mongodb并安装比如d:/mongodb/,并加入到path
2. 创建数据库文件的存放位置，比如d:/mongodb/data/db
3. 手动开启mongo服务mongod --dbpath D:\mongodb\data\db
4. 设置windows服务开机自启动
  1. 在D:\mongodb\data下新建文件夹log（存放日志文件）并且新建文件mongodb.log
  2. 在d:\mongodb新建文件mongo.config并输入
    1. dbpath=D:\mongodb\data\db
    2. logpath=D:\mongodb\data\log\mongo.log
    3. 输入mongod --config D:\mongodb\mongo.config --install --serviceName "MongoDB" 将mongo服务加入到启动项
    4. 打开cmd输入services.msc查看服务可以看到MongoDB服务，点击启动并设置自动。
