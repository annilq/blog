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

  if (!content || content.trim() === "") {
    return { error: "Thought content cannot be empty" }
  }

  try {
    await prisma.thought.create({
      data: {
        content: content.trim(),
        name: session?.user?.name!
      },
    })

    revalidatePath("/thoughts")
    return { success: true }
  } catch (error) {
    return { error: 'Failed to add thought' }
  }
}

export async function deleteThought(id: string) {

  await prisma.thought.delete({
    where: { id },
  })

  revalidatePath("/thoughts")
  return { success: true }
}

export async function clearAllThoughts() {
  await prisma.thought.deleteMany({})

  revalidatePath("/thoughts")
  return { success: true }
}

