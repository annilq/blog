"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function getThoughts() {
  const session = await auth()
  return await prisma.thought.findMany({
    where: {
      name: session?.user?.name!
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function addThought(formData: FormData) {
  const content = formData.get("content") as string
  const session = await auth()

  if (!session?.user?.name) {
    return { error: "Unauthorized" }
  }
  if (!content || content.trim() === "") {
    return { error: "Thought content cannot be empty" }
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
  } catch (error) {
    return { error: 'Failed to add thought' }
  }
}

export async function deleteThought(id: string) {
  const session = await auth()
  if (!session?.user?.name) {
    throw new Error("Unauthorized")
  }

  const thought = await prisma.thought.findUnique({ where: { id } })
  if (!thought || thought.name !== session.user.name) {
    throw new Error("Not found")
  }

  await prisma.thought.delete({
    where: { id },
  })

  revalidatePath("/thoughts")
  return { success: true }
}

