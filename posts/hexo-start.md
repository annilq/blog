---
title: 利用hexo github 搭建个人博客注意事项
date: 2015-12-25 21:44:20
tags: hexo github
---
安装[Git](https://git-scm.com/downloads),[Nodejs](https://nodejs.org/en/)之后依次执行下面代码安装hexo-cli,初始化博客
```
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```
日常用的命令下面几个就够了,具体的可以查看hexo官网的[常用命令](https://hexo.io/zh-cn/docs/commands.html)

```
hexo new <title>//创建文章
hexo server //开启服务器可以实时预览
hexo generate//生成静态文件
hexo deploy//部署文件
//上面两部可以一次性写成
hexo deploy --generate
```
最后可以将写好的博客部署到[github pages](https://help.github.com/articles/creating-pages-with-the-automatic-generator/)上面
首先注册一个github账号新建仓库名称为<code>username.github.io</code>,比如我的github账号是[annilq](https://github.com/annilq), 新建的仓库名则命名为<code>annilq.github.io</code>
最后修改博客根目录下面的_config.yml文件下的deploy部分如下(下面对应的用户名部分改成自己的用户名就可以)
``` 
deploy:
  type: git
  repo: https://github.com/annilq/annilq.github.io
  (https://github.com/<yourname>/<yourname>.github.io)
  branch: master

```
最后执行<code>hexo deploy</code>就可以将博客发布到github pages上面
访问[http://annilq.github.io](http://annilq.github.io)就可以看到
关于以上[hexo官方文档](https://hexo.io/zh-cn/docs/)都有详细说明
over...