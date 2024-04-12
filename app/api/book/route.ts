// get book info from https://weread.qq.com/


import { Book, books, getBookInfoById } from "./util"

export async function GET(request: Request) {
  let bookJson: Book[] = []
  try {
    bookJson = await Promise.all(books.map(getBookInfoById))
  } catch (error) {
    return Response.error()
  }

  return Response.json({ books: bookJson })
}
