import { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "@/components/layout";
import SearchInput from "./components/SearchInput";
import PostList from "./components/PostList";
import { ArchiveListSkeleton } from "./components/Skeleton";
import { archiveRange } from "@/lib/archive";
import { getAllStaticPostsMeta, getTagIndex } from "@/lib/static-posts";

// 站名由根 layout 的 title.template 补（"文章 · One Piece"），这里只写自己的名字。
export const metadata: Metadata = {
  title: "文章",
  description: "按时间倒序的技术文章：JavaScript、CSS、React、工程化与移动端，也有少量后端和工具。",
};

export default async function Post() {
  // 获取所有静态文章元数据（不解析 markdown 成 HTML，提升性能，已带进程内缓存）
  const allPosts = await getAllStaticPostsMeta();
  // 标签索引（名字 + 篇数）：客户端用它校验 tag 深链，并在 chip 上显示篇数
  const tagIndex = await getTagIndex();
  const range = archiveRange(allPosts);

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        {/*
          归档页此前没有任何 h1 —— 直接就是一排文章标题，读者第一眼不知道自己落在哪。
          标题 + 一句"这里有多少东西、跨多久"是这一页唯一需要的自我介绍。
        */}
        <header className="mb-10">
          <h1 className="m-0">文章</h1>
          {range && (
            <p className="m-0 mt-2 text-meta text-muted tabular-nums">
              {range.count} 篇
              {range.from === range.to ? ` · ${range.from} 年` : ` · ${range.from}–${range.to}`}
            </p>
          )}
        </header>

        <SearchInput data={allPosts} />

        {/* 列表与 tag 深链过滤下沉到客户端，使整页可静态预取。
            给上 fallback：此前是个无 fallback 的 Suspense，等于把旁边那份骨架屏白白放着不用。 */}
        <Suspense fallback={<ArchiveListSkeleton />}>
          <PostList posts={allPosts} tagIndex={tagIndex} />
        </Suspense>
      </div>
    </Layout>
  );
}
