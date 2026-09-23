"use client";

import { useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/layout";

/*
 * 此前全仓没有 error.tsx：任何渲染期异常都由 Next 的默认错误页兜住
 * （英文 "Application error: a client-side exception has occurred"，生产环境连堆栈都不给），
 * 用户看到的是一个没有任何出口的死页面。
 *
 * 必须是客户端组件（App Router 的约定），因此不能 export metadata。
 * 必须提供 reset —— 「重试」是这个边界存在的意义，否则它只是换了张脸的崩溃页。
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // digest 是服务端错误对应到日志的唯一线索，报障时必须能对上号；
    // 界面上不展示它（对用户无意义），但一定要落进控制台。
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <h1>出了点问题</h1>
        <p className="text-muted">
          这个页面没能加载出来。可以重试一次；如果一直失败，请稍后再来。
        </p>
        {error.digest && (
          <p className="mt-2 text-meta text-muted">
            错误编号：<code>{error.digest}</code>
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded border border-rule/40 px-3 py-1.5 text-foreground transition-colors hover:border-rule/70 hover:bg-surface-muted"
          >
            重试
          </button>
          <Link
            href="/"
            className="rounded border border-rule/40 px-3 py-1.5 text-foreground transition-colors hover:border-rule/70 hover:bg-surface-muted"
          >
            回首页
          </Link>
        </div>
      </div>
    </Layout>
  );
}
