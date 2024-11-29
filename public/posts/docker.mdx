---
title: 利用docker部署fastapi项目
date: 2024-11-29 09:46:01
tags: docker
---
之前在公司使用python开发了一个数据统计的项目不部署在测试服务器，目前服务器到期，希望能够迁移到其他服务器，因为本人不擅长python，而且python搭建环境的方案也是百花齐放，所以决定使用docker部署。

1. 本地安装docker，因为目前工作使用macOS，所以安装docker比较方便，直接安装Docker Desktop即可
2. 然后根据fastapi官网的deployment部分，使用dockerfile构建镜像,切记不要忘记遗漏任何文件
3. 不要忘记设置Expose不然本地访问不到
```dockerfile
#
FROM python:3.11
Expose 9000
#
WORKDIR /code
#
COPY ./requirements.txt /code/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

#
COPY config_dev.ini /code/config_dev.ini
COPY config_prod.ini /code/config_prod.ini
COPY .env /code/.env
COPY ./dist /code/dist
COPY ./app /code/app
COPY main.py /code/main.py

#
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]

```
构建镜像
```bash
docker build -t yq-monitor .

```
通过命令行运行容器
```bash
docker run -d -p 8000:9000 yq-monitor
# 其中8000为本地端口，9000为容器端口
```

参考
1. [FastAPI in Containers - Docker](https://fastapi.tiangolo.com/deployment/docker/#what-is-a-container-image)