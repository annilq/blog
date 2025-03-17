"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export async function getThoughts() {
  return await prisma.thought.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function addThought(formData: FormData) {
  const content = formData.get("content") as string

  if (!content || content.trim() === "") {
    return { error: "Thought content cannot be empty" }
  }

  try {
    await prisma.thought.create({
      data: {
        content: content.trim(),
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

