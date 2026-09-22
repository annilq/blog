"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DateLabel from "./Date";
import { Tag } from "@/components/Tag";
import type { StaticPostMeta } from "@/lib/static-posts";

export default function PostList({
  posts,
  allTags,
}: {
  posts: StaticPostMeta[];
  allTags: string[];
}) {
  const query = useSearchParams().get("query") || "";
  const category = query && allTags.includes(query) ? { id: query, name: query } : null;
  const data = query ? posts.filter((post) => post.tags === query) : posts;

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start">
      {category && <Tag tag={category} canClear />}
      <div
        className={`group relative flex flex-col justify-start items-start w-full gap-4`}
      >
        {data?.map(({ id, date, title, tags }) => (
          <div key={id}>
            <Link
              href={`/post/${id}`}
              className="block text-xl font-semibold text-foreground hover:text-link"
            >
              {title}
            </Link>
            <div className="flex items-center gap-2">
              {date && (
                <small className="text-sm text-gray-500">
                  <DateLabel date={date} />
                </small>
              )}
              {tags && (
                <Tag key={tags} tag={{ id: tags, name: tags }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
