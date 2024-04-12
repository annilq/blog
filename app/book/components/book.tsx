
import { Book } from "@/app/api/book/route";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function BookCard(props: { data: Book }) {
  const { data } = props

  return (
    <div className="relative bg-background dark:bg-gray-800 rounded-2xl p-4 shadow flex gap-4 w-72 aspect-video">
      <Link href={data.href} target="_blank" title={data.title}> <Icon.Link className="absolute top-2 right-2 w-4 text-gray-600" /></Link>
      <div className="w-20 shadow">
        <img src={data.url} alt={data.title} />
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-center ">
        <div className="font-bold line-clamp-2">
          {data.title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {data.author}
        </div>
      </div>
    </div>
  );
}
