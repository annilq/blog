'use client'

import { PlusCircle } from "lucide-react"
import { Button, Textarea } from "@mui/joy"
import { useRef } from "react"

export default function ThoughtForm({ addThought }: { addThought: (formData: FormData) => Promise<any> }) {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const result = await addThought(formData)
    if (result.success) {
      formRef.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col space-y-2">
      <Textarea
        placeholder="碎碎念..."
        name="content"
        minRows={3}
        className="resize-none"
      />
      <Button type="submit" className="self-end">
        <PlusCircle className="mr-2 h-4 w-4" />
        确定
      </Button>
    </form>
  )
} 