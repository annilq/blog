"use client"

import { Book } from "@/app/api/book/util";
import Icon from "@/components/Icon";
import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { Sheet } from "lucide-react";

import Link from "next/link";
import { useState } from "react";

export default function BookCard(props: { data: Book }) {
  const { data } = props
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="relative bg-background dark:bg-gray-800 rounded-2xl p-4 shadow flex gap-4 w-72 aspect-video">
        <Link href={data.href} target="_blank" title={data.title}> <Icon.Link className="absolute top-2 right-2 w-4 text-gray-600" /></Link>
        <img src={data.url} alt={data.title} className="shadow rounded-sm cursor-pointer" onClick={() => setOpen(true)} />
        <div className="flex-1 flex flex-col gap-4 justify-center ">
          <div className="font-bold line-clamp-2">
            {data.title}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {data.author}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ bgcolor: 'background.paper' }}
      >
        <ModalDialog>
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
      </Modal>
    </>
  );
}
