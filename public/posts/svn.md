---
title: svn 常用命令
date: 2024-10-18 16:26:01
tags: svn
---
最近公司配了个Mac开发，但是找不到合适的免费svn管理工具，只能用命令行来管理源代码，记录一下常用的命令。

1. 更新
```bash
svn update
```

2. 自动添加未版本化的文件
```bash
svn status | grep '^?' | awk '{print $2}' | xargs svn add
# 排除 node_modules 文件夹
svn status | grep '^?' | grep -v 'node_modules' | awk '{print $2}' | xargs svn add
```
  1. svn status：显示当前目录的状态。
  2. grep '^?'：筛选出标记为 ? 的未版本化文件。
  3. awk '\{print $2\}'：提取出文件路径。
  4. xargs svn add：将这些未版本化的文件逐一传递给 svn add 命令。

3. 处理已删除的文件
```bash
svn status | grep '^!' | awk '{print $2}' | xargs svn delete
```

4. 提交更改
```bash
svn commit -m "Add new files and remove deleted files"
```

5. 放弃当前修改
```bash
svn revert -R . 
```
