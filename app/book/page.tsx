import { BOOKS, getBookInfoById } from "../api/book/util";
import Layout from "@/components/layout";
import Book from "./components/book";
import Intro from "./intro.mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "书籍",
  description: "在读和读过的书，以及从微信读书同步过来的划线笔记。",
};

export default async function Page() {
  const bookJson = await Promise.all(BOOKS.map(getBookInfoById));

  return (
    <Layout
      containerClassName="bg-surface-muted dark:bg-background"
      showDivider={false}
    >
      <div className="w-full">
        <div className="rounded-sm bg-background px-4 overflow-auto">
          <Intro />
        </div>
        <div className={"flex flex-wrap gap-4 mt-4"}>
          {bookJson?.map((book) => (
            <Book data={book} key={book.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const revalidate = 60;
