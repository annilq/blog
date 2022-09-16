---
title: 前端导出文件
date: 2022-09-16 14:38:01
tags: 前端导出文件
---
### 1. a 标签导出
```jsx
<a href={item.url} target="_blink" download={item.name}>{item.name}</a>
```
### 2. 接口返回数据流导出，需要约定好返回数据类型 
```javascript

const fileStream=await exportFn(params, { responseType: 'blob' })

const createFile = (fileStream, fileName = "导出文件") => {
  // 接口可能返回json也可能返回数据流
  if (fileStream.type === "application/json") {
    const reader = new FileReader();
    reader.readAsText(fileStream, 'utf-8');
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      notification.warn({ message: data.info })
    }
  } else {
    const blobUrl = window.URL.createObjectURL(fileStream);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.download = `${fileName}.xlsx`;
    a.href = blobUrl;
    a.click();
    a = null
  }
}
```
### 3. 利用xslx以及xlsx-js-style工具库导出
