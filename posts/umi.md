---
title: umi是如何构建项目的
date: 2021-10-22 17:29:01
tags: umi
---

### 首先通过以下创建launch.json来调试umi项目
```
{
  "name": "Launch via npm",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceFolder}",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run-script", "start"]
}
```

to be continue.....