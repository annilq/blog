
import { books, getBookInfoById } from "../api/book/util";
import Book from "./components/book";
import Layout from "@/components/layout";

export default async function Page() {

  const bookJson = await Promise.all(books.map(getBookInfoById))

  return (
    <Layout containerClassName="bg-[#f9f9fa] dark:bg-background">
      <div className={"container max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        {bookJson?.map((book) => (
          <Book data={book} key={book.id} />
        ))}
      </div>
    </Layout>
  );
}
