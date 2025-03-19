---
title: python 开发环境搭建(uv)
date: 2025-03-19 10:07:01
tags: Python
---
在进行任何项目开发中，环境管理（package,venv,python ,env）都是十分基础并且重要的一部分
### 新项目
1. 创建项目
```bash
uv init
```
2. 创建环境
```bash
uv venv
```
3. 新增package
```bash
uv add fastapi
```

### [迁移现有fastapi项目](https://docs.astral.sh/uv/guides/integration/fastapi/)

1. 使用<code>uv init</code>或者<code>uv init --app</code>初始化项目

2. 使用 uv add 一次性安装所有依赖，并将它们写入 pyproject.toml：
```bash
uv add $(cat requirements.txt)
```
