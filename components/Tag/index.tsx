"use client"

import { Prisma } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/utils/utils";
import Icon from "../Icon";

const stringToColour = (str: string) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}


export const Tag = (props: { tag: Prisma.CategoryCreateInput, canClear?: boolean }) => {

  const { tag, canClear = false } = props;
  const color = stringToColour(tag.name);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div
      className={cn("rounded-xl px-2 text-sm text-white relative flex", !canClear && "cursor-pointer")}
      style={
        {
          backgroundColor: color
        }}
      onClick={() => {
        if (canClear) {
          return
        }
        const params = new URLSearchParams(searchParams);
        params.set('query', tag.id!);
        replace(`${pathname}?${params.toString()}`);
      }}
    >
      {tag.name}
      {canClear && (
        <Icon.X
          className="cursor-pointer w-3"
          onClick={() => {
            replace(pathname);
          }}
        />
      )}
    </div>
  )
}
