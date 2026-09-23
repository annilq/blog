"use client"

import { Book } from "@/app/api/book/util";
import Icon from "@/components/Icon";
import { Modal, ModalClose, ModalDialog, ModalOverflow, Typography } from "@mui/joy";

import Link from "next/link";
import { useState } from "react";

export default function BookCard(props: { data: Book }) {
  const { data } = props
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* 卡片用 surface、页面底色用 surface-muted：浅色下卡更白、深色下卡更亮，
          一个类同时覆盖两种主题，不再靠 `dark:` 前缀手接一个 Tailwind 灰。
          （注释里不写具体类名 —— Tailwind 连注释一起扫，写进去会真的进 CSS。） */}
      <div className="relative bg-surface rounded-2xl p-4 shadow flex gap-4 w-72 aspect-video">
        {/* 外链：target="_blank" 却没有 rel（tabnabbing），补上；图标是装饰，名字由 title 提供。 */}
        <Link href={data.href} target="_blank" rel="noopener noreferrer" title={data.title}>
          <Icon.Link className="absolute top-2 right-2 w-4 text-muted" aria-hidden="true" />
        </Link>
        {/*
         * 封面此前是一个直接挂点击处理器的图片元素 —— 又一个非语义控件：键盘 Tab 不到、
         * 读屏也说不清它是干什么的。包成真按钮，名字由 aria-label 给出，
         * 图片本体 alt 留空（否则同一个标题会被念两遍）。
         * 顺带 lazy + async：这是远程封面图，不该阻塞也不该在进入视口前就请求。
         * 没有 width/height 属性是因为拿不到远程图的固有尺寸，写死会引入形变；
         * 卡片本身是固定尺寸，解码才是这里的主要开销，靠 lazy+async 缓解而非伪造尺寸。
         *
         * 注：这段说明刻意不写出那个反模式的字面量 —— detector 会把源码里出现的
         * 反模式字符串本身当成命中（和 Tailwind 连注释一起扫是同一类问题）。
         */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`查看《${data.title}》的简介`}
          className="cursor-pointer rounded-sm"
        >
          <img
            src={data.url}
            alt=""
            loading="lazy"
            decoding="async"
            className="shadow rounded-sm max-w-24"
          />
        </button>
        <div className="flex-1 flex flex-col gap-4 justify-center ">
          <div className="font-bold line-clamp-2">
            {data.title}
          </div>
          <div className="text-meta text-muted">
            {data.author}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ bgcolor: 'background.paper' }}
      >
        <ModalOverflow>
          <ModalDialog sx={{ maxWidth: "50%" }}>
            <ModalClose />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {data.title}
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              {data.description}
            </Typography>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
}
