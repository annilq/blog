'use client'

import { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { PlusCircle } from "lucide-react"
import { Button, Textarea } from "@mui/joy"
import useSnackbar from "@/store/useSnackbar"
import { addThought } from "./actions"

export default function ThoughtForm() {
  const { status } = useSession()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const { setOpenSnackbar } = useSnackbar()

  // 未登录不渲染任何东西：发帖是仅所有者操作，鉴权判定放在客户端，
  // 避免服务端读 cookie 把整页逼成 dynamic 渲染。
  if (status !== "authenticated") return null

  /*
   * 原来失败时唯一的后果是「textarea 没被清空」—— 一个需要用户自己推断的信号。
   * 而 action 返回的 error 文案（"Thought content cannot be empty" 等）从写出来那天起
   * 没有任何一处读过它。
   *
   * 两件事一起补：失败要说出来（Snackbar 组件在 ClientContext 里挂了很久，全仓零处调用，
   * 这才是它真正该被用的地方）；提交中要有状态 —— 这是一次网络往返，按钮上毫无动静
   * 会让人以为没点上而重复提交。
   */
  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    try {
      const result = await addThought(formData)
      if (result?.success) {
        formRef.current?.reset()
        setOpenSnackbar(true, "已记录")
      } else {
        setOpenSnackbar(true, result?.error ?? "发布失败，请重试")
      }
    } catch {
      setOpenSnackbar(true, "发布失败，请重试")
    } finally {
      setSubmitting(false)
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
      <Button type="submit" className="self-end" loading={submitting}>
        <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
        确定
      </Button>
    </form>
  )
} 