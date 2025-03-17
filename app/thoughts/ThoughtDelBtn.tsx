'use client'

import { Trash2 } from "lucide-react"
import { deleteThought } from "./actions"

export default function ThoughtDelBtn({ id }: { id: string }) {
  return (
    <Trash2 onClick={() => deleteThought(id)} className="cursor-pointer w-4 h-4" />
  )
} 