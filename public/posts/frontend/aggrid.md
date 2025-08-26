---
title: ag-grid
date: 2025-08-26 15:36:01
tags: ag-grid
---
### 生成ag-grid授权码 license.cjs
```javascript
const crypto = require("crypto");

function md5(str) {
	const hash = crypto.createHash("md5");
	hash.update(str);
	return hash.digest("hex");
}

let expiredDate = new Date();
expiredDate.setFullYear(expiredDate.getFullYear() + 99);
const milliSeconds = expiredDate.getTime();
const expired = btoa(milliSeconds.toString());
const license = `[v3][RELEASE][0102]_${expired}`;
const hash = md5(license);
const licenseKey = `${license}${hash}`;
console.log(licenseKey);
```
- [ag-grid license](https://www.cnblogs.com/soarowl/p/18172779)
