title: 用 flask 创建 todo api
date: 2017-07-08 23:44:20
tags: python flask
---
#### 创建虚拟环境
1. 创建虚拟环境python-todo-app
```python
python3 -m venv python-todo-app
```
2. 进入python-todo-server并在当前目录激活环境(退出环境命令<code>deactivate</code>)
```python
source ./bin/activate
```
[用venv安装虚拟环境](https://docs.python.org/3/library/venv.html)

#### 安装项目依赖

```python
pip install Flask
pip install Flask-PyMongo
pip install flask-restful
## 记录第三方模块
pip freeze > requirements.txt
## 安装txt文件里所记录的所有第三方模块
pip install -r requirements.txt
```
#### 应用部分
项目d地址[python-todo-server](https://github.com/annilq/python-todo-server)
