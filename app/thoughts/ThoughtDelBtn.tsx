'use client'

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy"
import { deleteThought } from "./actions"
import useSnackbar from "@/store/useSnackbar"

/*
 * 原来这一行是 `<Trash2 onClick={() => deleteThought(id)} />`：
 *   · 一个几何形状当成按钮 —— 键盘 Tab 不到，读屏播报不出来，没有可访问名；
 *   · 点了立刻删，没有确认（删除不可逆）；
 *   · `deleteThought` 失败时直接 throw，服务端 action 的异常不会自己跑到界面上 ——
 *     于是删除失败也是一声不响，用户以为删掉了。
 * 三点都补齐：真按钮 + 确认对话框 + 结果用 Snackbar 说出来。
 *
 * pending 用 useState 而不是 useTransition：本仓库实际跑的是 React 18.3.1
 * （`react: ^18`，锁文件解析到 18.3.1），而 useTransition 的 isPending 只跟踪回调里的
 * **同步**更新 —— 回调是 async、中间有 await 时，isPending 会在第一个 await 处就翻回 false，
 * 按钮上那个转圈就是假的。React 19 才修好这点。
 */
export default function ThoughtDelBtn({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { setOpenSnackbar } = useSnackbar()

  async function confirmDelete() {
    setDeleting(true)
    try {
      const result = await deleteThought(id)
      setOpen(false)
      setOpenSnackbar(true, result?.error ? `删除失败：${result.error}` : "已删除")
    } catch {
      // 兜底：action 本身抛了（网络中断等）也不能静默
      setOpen(false)
      setOpenSnackbar(true, "删除失败，请重试")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="删除这条碎碎念"
        title="删除"
        className="inline-flex h-6 w-6 items-center justify-center rounded text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        <Trash2 className="w-4 h-4" aria-hidden="true" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog aria-labelledby="delete-thought-title" sx={{ maxWidth: "26rem" }}>
          <ModalClose />
          <Typography id="delete-thought-title" level="title-md">
            删除这条碎碎念？
          </Typography>
          <Typography level="body-sm" textColor="text.tertiary">
            删除后无法恢复。
          </Typography>
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)} disabled={deleting}>
              取消
            </Button>
            <Button color="danger" loading={deleting} onClick={confirmDelete}>
              删除
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  )
} 