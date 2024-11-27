---
title: shell 常用命令
date: 2024-05-11 16:26:01
tags: shell
---

查看当前目录中文件和子目录的磁盘使用量按照磁盘使用量的大小进行排序
```bash
du -h --max-depth=1 | sort -h
```
复制文件
```bash
cp file1 file2
```
复制目录下所有文件
```bash
cp -r dir1 dir2
```

```bash
nohup python3 main.py > output.log 2>&1 &
vicorn.run("main:app", host="0.0.0.0", port=8008,workers=3, reload=True)
```

#### 关闭指定端口进程

```bash
sudo lsof -i :8008
```
```bash
sudo kill PID_NUMBER
```
### 参考链接
- [How to Install Python 3.10 (or 3.11) on CentOS](https://linuxstans.com/how-to-install-python-centos/)
- [Linux编译安装安Python3.7/3.8出现_ssl模块错误](https://www.cnblogs.com/yuxiuyan/p/13591854.html)
- [centos 安装python3时遇到 ssl报错](https://www.cnblogs.com/presleyren/p/13931911.html)