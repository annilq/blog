// get book info from https://weread.qq.com/


import { Book, BOOKS, getBookInfoById } from "./util"

export async function GET(request: Request) {
  let bookJson: Book[] = []
  try {
    bookJson = await Promise.all(BOOKS.map(getBookInfoById))
  } catch (error) {
    return Response.error()
  }

  return Response.json({ books: bookJson })
}
