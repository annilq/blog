---
title: SQL基础教程
date: 2023-08-29 10:30:40
tags: SQL
---

### SQL 语句可以分为以下三类

1. DDL(Data Definition language) 数据定义语言
   1. CREATE
   2. DROP
   3. ALTER
2. DML(Data Manipulation language) 数据操纵语言
   1. SELECT
   2. INSERT
   3. UPDATE
   4. DELETE
3. DCL (Data Control language) 数据控制语言
   1. COMMIT
   1. ROLLBACK
   1. GRANT
   1. REVOKE

### SQL 常见命令

```SQL
-- 创建数据库和表
CREATE DATABASE shop;
CREATE TABLE Product(
    product_id CHAR(10) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_type CHAR(10) NOT NULL,
    sale_price INTEGER ,
    purcharse_price INTEGER ,
    regist_date DATE ,
    PRIMARY KEY  (product_id)
);
-- 查询数据库
SELECT * FROM Product;
-- 新增以及删除列
ALTER TABLE Product ADD COLUMN product_name_pinyin VARCHAR(100);
ALTER TABLE Product DROP COLUMN product_name_pinyin;
-- 插入数据
INSERT INTO Product VALUES('0003','T shirts','cloe',1000,500,'2023-08-29')
-- 修改表名
ALTER TABLE Product RENAME TO Product_new

```
