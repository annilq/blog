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

export const BOOKS: BookShort[] = [
  { id: "64e32bf071fd5a9164ece6b", title: "编码<<隐匿在计算机软硬件背后的语言>>" },
  { id: "f50321f0811e39167g014223", title: "深入理解计算机系统" },
  // { id: "d55320c0811e1b998g018315", title: "SQL基础教程" },
  // { id: "fbf32b80715c0184fbff41f", title: "算法图解" },
  // { id: "8bc329705e46708bcb0c164", title: "百年孤独" },
  { id: "66832530721e777066806c9", title: "蛤蟆先生去看心理医生" },
  { id: "5b9328f05dd9fb5b922d1eb", title: "黑客与画家" },
  { id: "55132b2071a122bc551ee6a", title: "凤凰项目：一个IT运维的传奇故事" },
  { id: "054329b0813ab80dfg016fde", title: "数学的雨伞下" }
]


export const bookBaseUrl = "https://weread.qq.com/web/bookDetail";


export async function getBookInfoById(book: BookShort) {

  const bookHref = `${bookBaseUrl}/${book.id}`
  const body = await fetch(bookHref).then(res => res.text())

  const dom = new JSDOM(body);

  const bookInfoSelector = dom.window.document.querySelector(".readerBookInfo");

  const title = bookInfoSelector?.querySelector(".bookInfo_right_header_title_text")?.textContent!;
  const author = bookInfoSelector?.querySelector(".bookInfo_author_container")?.textContent!;
  const description = bookInfoSelector?.querySelector(".bookInfo_intro")?.textContent!;
  const url = bookInfoSelector?.querySelector(".wr_bookCover_img")?.getAttribute("src")!;
  // console.log(dom.window.document);
  const bookInfo: Book = {
    id: book.id,
    title,
    author,
    description,
    href: bookHref,
    url
  }
  return bookInfo
}