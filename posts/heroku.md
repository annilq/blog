---
title: 使用heroku部署nodejs项目
date: 2018-02-23 15:43:01
tags: heroku
---
### heroku参考文档
[getting-started-with-nodejs](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
### heroku 发布项目流程以及常用命令
1. heroku login //登录
2. git clone project
3. heroku create //创建heroku项目
4. git push heroku master //将代码提交到heroku服务器上
5. 声明一个Procfile 文件用来描述被执行的命令
	```
	web: node index.js //web 为程序类型，说明是web程序
	```
6. heroku ps:scale web=1 //确保有一个项目实例在运行
7. heroku open //打开项目
8. heroku logs --tail //查看项目运行状态

### 云服务使用数据库
[mlab链接](https://mlab.com/)

#### 连接数据库需要注意
1. 创建数据库时候也要为数据库创建一个数据库用户，否则会报验证错误
2. 将本地数据库链接改成远程连接

### 页面503问题
[参考链接](https://devcenter.heroku.com/articles/error-pages)
heroku config:set
```
heroku config:set ERROR_PAGE_URL=//sleepy-ravine-72939.herokuapp.com/
```