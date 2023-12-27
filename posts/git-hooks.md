---
title: use husky to add git pre-commit hook with husky
date: 2023-12-27 10:39:01
tags: git-hook husky
---

### 安装方式分为两种

1. 初始化

```javascript
npx husky-init && npm install

```

```javascript
npm install lint-staged --save-dev
```

2. 配置package.json

```json
{
  "lint-staged": {
    "*.{js,jsx,css,md}": [
      "echo 'git commit trigger husky pre-commit hook' ",
      "prettier --write",
      "eslint --cache --fix"
    ]
  }
}
```

3. 配置.husky/pre-commit

```javascript
npx lint-staged
```

4. 需要配置esconfig才能执行lint-staged

```javascript
npm init @eslint/config
```

#### 2. 手动安装

[husky get start](https://typicode.github.io/husky/getting-started.html)
[use lint-staged with husky](https://drag13.io/posts/create-new-nextjs-app-with-prettier-eslint-tests/index.html)
