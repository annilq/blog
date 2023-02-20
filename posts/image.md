---
title: base64格式转file格式
date: 2023-02-20 10:48:01
tags: base64格式转file格式
---

```javascript
export const base64toFile = (dataurl, filename) => {

  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {

  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}


```