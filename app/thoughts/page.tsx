import { Suspense } from "react";

import Layout from "@/components/layout";
import { getThoughts } from "./actions";
import ThoughtForm from "./ThoughtForm";
import ThoughtDelBtn from "./ThoughtDelBtn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "碎碎念",
  description: "短句、随记和还没成文的想法 —— 想到什么写什么。",
};

/*
 * createdAt 是数据库 now() 写入的真实 UTC 时刻。作者在中国（东八区），
 * 直接用 date-fns format() 会按运行时时区渲染 —— Vercel 上是 UTC，比作者
 * 当时看到的本地时间早 8 小时。不依赖 Intl / 本地时区（否则不同机器结果不一，
 * 且客户端水合会跟 SSR 对不上），改用 UTC 部件手动加 +8 偏移，
 * 让任何环境下显示的都是作者当时的北京时间。dateTime 仍用 toISOString() 给机器。
 */
function formatBeijingTime(d: Date): string {
  const beijing = new Date(d.getTime() + 8 * 60 * 60 * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${beijing.getUTCFullYear()}-${p(beijing.getUTCMonth() + 1)}-${p(
    beijing.getUTCDate(),
  )} ${p(beijing.getUTCHours())}:${p(beijing.getUTCMinutes())}:${p(
    beijing.getUTCSeconds(),
  )}`;
}

export default async function Thoughts() {
  return (
    <Layout>
      <header className="mb-10">
        <h1 className="m-0">碎碎念</h1>
        <p className="m-0 mt-2 text-meta text-muted">
          短句、随记和还没成文的想法 —— 想到什么写什么。
        </p>
      </header>
      <div className="space-y-4">
        {/*
         * 发帖表单只在已登录时显示：ThoughtForm 内部用 useSession() 自判，
         * 不在服务端读 cookie —— 整页因此可静态/ISR 生成，DB 查询不再每次请求都跑。
         */}
        <ThoughtForm />

        <Suspense fallback={<ThoughtsListSkeleton />}>
          <ThoughtsList />
        </Suspense>
      </div>
    </Layout>
  );
}

async function ThoughtsList() {
  const thoughts = await getThoughts();

  return (
    <>
      {thoughts.map((thought) => (
        <div
          className="bg-surface rounded-xl border border-rule/10 shadow-sm p-4 flex flex-col gap-3"
          key={thought.id}
        >
          <div className="whitespace-pre-wrap">{thought.content}</div>
          <div className="flex justify-between items-center text-meta text-muted">
            <time dateTime={thought.createdAt.toISOString()}>
              {formatBeijingTime(thought.createdAt)}
            </time>
            {/* 删除按钮只在已登录时显示：ThoughtDelBtn 内部用 useSession() 自判 */}
            <ThoughtDelBtn id={thought.id} />
          </div>
        </div>
      ))}
    </>
  );
}

function ThoughtsListSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          className="bg-surface rounded-xl border border-rule/10 shadow-sm p-4 flex flex-col gap-3 animate-pulse"
          key={i}
        >
          <div className="h-4 w-2/3 rounded bg-skeleton" />
          <div className="h-3 w-1/3 rounded bg-skeleton" />
        </div>
      ))}
    </div>
  );
}

export const revalidate = 60;
// export const runtime = "edge";
