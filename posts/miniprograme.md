---
title: 小程序开发流程
date: 2023-01-12 16:54:01
tags: 小程序
---

#### 小程序登录流程
1. 小程序是通过 wx.login 获取的 code, 然后通过 code 与后台服务器交互 
2. 后台服务器通过 appId + appSecret + code 获取 openID(同一个小程序同一个用户获取的openID不变)
3. appId与appSecret都是在小程序注册时生成在微信公众平台的后台管理系统中获取，后台可以写死
以上好处是appId与appSecret不会在前端丢失，会更安全