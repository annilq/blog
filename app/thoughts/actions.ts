"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { SITE_OWNER } from "@/lib/site"

/*
 * 读：公开，按**所有者**筛选。
 *
 * 原来写的是 `where: { name: session?.user?.name! }` —— 按**浏览者**筛选。
 * 那个 `!` 只是让 TypeScript 闭嘴，运行时什么也没做：session 为 null 时表达式求值为
 * `undefined`，而 Prisma 把 `undefined` 当作「这个字段不参与筛选」，查询就退化成「取出全部」。
 * 它凑巧看着是对的（库里只有作者一个人的数据），但那是巧合：多一个作者就会互相看到彼此的碎碎念。
 *
 * 试图「修」成未登录返回空数组是更糟的错法 —— 碎碎念是公开内容（在导航里、在 sitemap 里，
 * 数据也来自 prisma seed），那样子页对所有访客都会变空。所有权是数据的属性，不是浏览者的。
 */
export async function getThoughts() {
  return await prisma.thought.findMany({
    where: { name: SITE_OWNER },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function addThought(formData: FormData) {
  const content = formData.get("content") as string
  const session = await auth()

  if (!session?.user?.name) {
    return { error: "请先登录" }
  }
  if (!content || content.trim() === "") {
    return { error: "内容不能为空" }
  }

  try {
    await prisma.thought.create({
      data: {
        content: content.trim(),
        name: session.user.name
      },
    })

    revalidatePath("/thoughts")
    return { success: true }
  } catch {
    return { error: "发布失败，请重试" }
  }
}

/*
 * 原来这里两处 `throw`（未登录 / 记录不存在）。Server Action 抛出的异常不会自己变成界面上的
 * 任何东西 —— 调用方 await 到的是一个 rejection，如果没有 try/catch 就是一条未处理的 rejection，
 * 而界面上什么都不发生。用户看到的是「点了删除，没反应，可能删了可能没删」。
 * 改成返回值：错误变成一个可以被渲染、被播报的对象，由 ThoughtDelBtn 弹 Snackbar 说出来。
 */
export async function deleteThought(id: string) {
  const session = await auth()
  if (!session?.user?.name) {
    return { error: "请先登录" }
  }

  const thought = await prisma.thought.findUnique({ where: { id } })
  if (!thought || thought.name !== session.user.name) {
    return { error: "这条碎碎念不存在，或不属于你" }
  }

  try {
    await prisma.thought.delete({
      where: { id },
    })
  } catch {
    return { error: "删除失败，请重试" }
  }

  revalidatePath("/thoughts")
  return { success: true }
}

