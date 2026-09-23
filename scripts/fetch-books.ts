// 本地抓取微信读书书籍信息，固化到 public/books.json。
//
// 为什么需要这一步：weread.qq.com 是腾讯国内站点，Vercel 海外构建节点访问会 ETIMEDOUT，
// 无法在 build 或运行时动态拉取。本脚本在能访问 weread 的网络下（通常是本机）跑一次，
// 把结果写成静态 JSON 并提交，书籍页即可纯静态渲染、书籍永远有数据。
//
// 用法：yarn fetch-books   （需要能访问 weread 的网络；跑完把 public/books.json 提交）

import { BOOKS, getBookInfoById } from "../app/api/book/util";
import fs from "fs";
import path from "path";

async function main() {
  console.log(`抓取 ${BOOKS.length} 本书的微信读书信息...`);
  const books = await Promise.all(BOOKS.map(getBookInfoById));
  const out = path.join(process.cwd(), "public", "books.json");
  fs.writeFileSync(out, JSON.stringify(books, null, 2) + "\n");
  console.log(`已写入 ${books.length} 本到 ${out}`);
}

main().catch((err) => {
  console.error("抓取失败：", err);
  process.exit(1);
});
