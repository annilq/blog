// get book info from https://weread.qq.com/

import jsdom from "jsdom";

const { JSDOM } = jsdom;

export type BookShort = Pick<Book, "title" | "id">

export interface Book {
  title: string
  id: string
  author: string
  description: string
  url: string
  href: string
}

export const books: BookShort[] = [
  { id: "64e32bf071fd5a9164ece6b", title: "编码<<隐匿在计算机软硬件背后的语言>>" },
  { id: "f50321f0811e39167g014223", title: "深入理解计算机系统" },
  { id: "5b9328f05dd9fb5b922d1eb", title: "黑客与画家" },]


const bookBaseUrl = "https://weread.qq.com/web/bookDetail";


export async function getBookInfoById(book: BookShort) {

  const bookHref=`${bookBaseUrl}/${book.id}`
  const body = await fetch(bookHref).then(res => res.text())

  const dom = new JSDOM(body);

  const bookInfoSelector = dom.window.document.querySelector(".readerBookInfo");

  const title = bookInfoSelector.querySelector(".bookInfo_right_header_title_text").textContent;
  const author = bookInfoSelector.querySelector(".bookInfo_author_container").textContent;
  const description = bookInfoSelector.querySelector(".bookInfo_intro").textContent;
  const url = bookInfoSelector.querySelector(".wr_bookCover_img").src;
  // console.log(dom.window.document);
  const bookInfo: Book = {
    id: book.id,
    title,
    author,
    description,
    href:bookHref,
    url
  }
  return bookInfo
}

export async function GET(request: Request) {
  let bookJson: Book[] = []
  try {
    bookJson = await Promise.all(books.map(getBookInfoById))
  } catch (error) {
    return Response.error()
  }

  return Response.json({ books: bookJson })
}
