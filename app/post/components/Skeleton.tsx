/*
 * 归档骨架。
 *
 * 形状必须跟着 PostList 走 —— 骨架屏的全部价值在于"这就是马上要出现的那块内容的形状"，
 * 尺寸不对就退化成一块无意义的灰斑。所以这里**只有一份定义**，被两处消费：路由级
 * app/post/loading.tsx（h1 + 搜索 + 列表）和页面内 Suspense 的 fallback（只有列表）。
 * 两处各写一份迟早会漂移。
 *
 * 高度按角色字号 × 行高算，不用整数近似：
 *   年份   text-title-4 17px × 1.6  = 27px → h-7
 *   标题   text-title-3 21px × 1.45 = 30px → h-8
 *   摘要   text-meta    15px × 1.6 × 2 行 = 48px → h-12
 *   元信息 text-meta    15px × 1.6  = 24px → h-6
 */
export function ArchiveListSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="w-full flex flex-col animate-pulse"
    >
      <span className="sr-only">正在加载文章列表…</span>
      {/* 骨架条是装饰，别让读屏逐个念"空盒子"；加载这件事由上面的 status 说出来。 */}
      <div aria-hidden="true" className="flex flex-col gap-12">
        {[0, 1].map((group) => (
          <div key={group} className="flex flex-col gap-4">
            <div className="h-7 w-28 rounded bg-skeleton" />
            <div className="flex flex-col gap-6">
              {[0, 1].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="h-8 w-3/4 rounded bg-skeleton" />
                  <div className="h-12 w-full rounded bg-skeleton" />
                  <div className="h-6 w-32 rounded bg-skeleton" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
