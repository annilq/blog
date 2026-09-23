import Link from "next/link";
import type { Metadata } from "next";
import Layout from "@/components/layout";

/*
 * 此前全仓没有 not-found.tsx：任何 404 都落到 Next 内置页面（英文 "This page could not be found."，
 * 没有站点的导航、没有排版、没有出口）。更糟的是 app/post/[id] 对不存在的文章返回 HTTP 200
 * 加一段并不居中的文案 —— 搜索引擎会把不存在的文章当正常页面收录（软 404）。
 *
 * 这里给真正的出口：两条路（回首页 / 看全部文章）而不是一句道歉。
 * 刻意左对齐：全站正文都是左对齐，一个突然居中的 404 只会显得是另一个站点的页面。
 */
export const metadata: Metadata = {
  title: "页面不存在",
};

export default function NotFound() {
  const linkClass =
    "rounded border border-rule/40 px-3 py-1.5 text-foreground transition-colors hover:border-rule/70 hover:bg-surface-muted";

  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <h1>页面不存在</h1>
        <p className="text-muted">
          这个地址没有对应的内容。可能是链接过期了，或者文章改了名字。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {/* 显式给 text-foreground：全局 a 的颜色是强调蓝，出口做成蓝色文字会被当成正文里的链接 */}
          <Link href="/" className={linkClass}>
            回首页
          </Link>
          <Link href="/post" className={linkClass}>
            看全部文章
          </Link>
        </div>
      </div>
    </Layout>
  );
}
