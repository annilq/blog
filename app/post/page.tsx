import { Suspense } from "react";
import Layout from "@/components/layout";
import SearchInput from "./components/SearchInput";
import PostList from "./components/PostList";
import { getAllStaticPostsMeta, getAllTags } from "@/lib/static-posts";

export default async function Post() {
  // 获取所有静态文章元数据（不解析内容，提升性能，已带进程内缓存）
  const allPosts = await getAllStaticPostsMeta();
  // 获取标签信息，用于客户端校验 tag 深链
  const tags = await getAllTags();

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        <SearchInput data={allPosts} />
        {/* 列表与 tag 深链过滤下沉到客户端，使整页可静态预取 */}
        <Suspense>
          <PostList posts={allPosts} allTags={tags} />
        </Suspense>
      </div>
    </Layout>
  );
}
