import booksData from "../../public/books.json";
import type { Book as BookData } from "@/app/api/book/util";
import Layout from "@/components/layout";
import Book from "./components/book";
import Intro from "./intro.mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "书籍",
  description: "在读和读过的书，以及从微信读书同步过来的划线笔记。",
};

export default function Page() {
  // 书籍数据来自构建期固化的 public/books.json（见 scripts/fetch-books.ts）。
  // weread.qq.com 是腾讯国内站点，Vercel 海外节点访问会 ETIMEDOUT，不能在运行时/构建期动态拉取，
  // 因此改为「本地抓一次、提交静态 JSON、页面直接 import」——整页纯静态，零运行时 I/O。
  const bookJson = booksData as BookData[];

  return (
    <Layout containerClassName="bg-surface-muted dark:bg-background">
      <header className="mb-10">
        <h1 className="m-0">书籍</h1>
        <p className="m-0 mt-2 text-meta text-muted">
          {bookJson.length} 本 · 在读与读完，以及从微信读书同步的划线笔记
        </p>
      </header>
      <div className="w-full">
        <div className="rounded-xl bg-surface p-6">
          <Intro />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {bookJson?.map((book) => (
            <Book data={book} key={book.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
