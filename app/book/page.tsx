import { BOOKS, getBookInfoById } from "../api/book/util";
import Layout from "@/components/layout";
import Book from "./components/book";
import Intro from "./intro.mdx";

export default async function Page() {
  const bookJson = await Promise.all(BOOKS.map(getBookInfoById));

  return (
    <Layout
      containerClassName="bg-[#f9f9fa] dark:bg-background"
      showDivider={false}
    >
      <div className="container max-w-4xl mx-auto">
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
export const runtime = "edge";
export const revalidate = 60;
