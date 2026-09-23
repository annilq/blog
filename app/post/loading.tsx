import { ArchiveListSkeleton } from "./components/Skeleton";

/*
 * 路由级骨架：页面标题 + 搜索 + 列表。
 *
 * 列表那段复用 ArchiveListSkeleton —— 它就是 PostList 的形状，加载态与页面内 Suspense 的
 * fallback 因此是同一份定义。这里只补上它上面那两块：h1（text-title-1 36px × 1.25 = 45px → h-11）、
 * 一行统计（text-meta 15px × 1.6 = 24px → h-6）、搜索触发器（py-2 ×2 + 一行 text-meta = 40px → h-10）。
 */
export default function PostLoading() {
  return (
    <div className="w-full mx-auto px-2 lg:px-2 p-4 flex-1 flex flex-col pb-8 container max-w-content">
      <div className="animate-pulse mb-10">
        <div className="h-11 w-24 rounded bg-skeleton" />
        <div className="h-6 w-48 mt-2 rounded bg-skeleton" />
      </div>
      <div className="animate-pulse h-10 w-full mb-10 rounded bg-skeleton" />
      <ArchiveListSkeleton />
    </div>
  );
}
