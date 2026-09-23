/* Hallmark · macrostructure: Wayfinding Landing · tone: light/breezy · anchor hue: cool (link blue) */
import Link from "next/link";
import Layout from "@/components/layout";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

// 首页此前直接渲染 profile.mdx（一份纯自我介绍），没有站点级 h1、也没有去处引导 ——
// 访客落地看到的是一段 bio，而不知道「这站有什么、点哪进」。改为轻量导览式落地：
// 站名作 h1 + 一句定位，下面三块 wayfinding 卡片分别指向文章/碎碎念/书籍；
// 完整的自我介绍移到 /profile（导航新增「关于」入口），避免首页出现两个 h1。
const waypoints = [
  { href: "/post", title: "文章", desc: "按时间倒序的技术笔记：Web、RN、跨平台与工程化。" },
  { href: "/thoughts", title: "碎碎念", desc: "还没成文的短句与随记，想到什么写什么。" },
  { href: "/book", title: "书籍", desc: "在读与读完的书，及微信读书的划线笔记。" },
];

export default async function Home() {
  return (
    <Layout>
      <header className="mb-10">
        <h1 className="m-0">{SITE_NAME}</h1>
        <p className="m-0 mt-2 text-meta text-muted">{SITE_DESCRIPTION}</p>
      </header>

      <nav
        aria-label="站内导览"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {waypoints.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            className="group block bg-surface rounded-xl border border-rule/10 shadow-sm p-4 transition-colors hover:border-link/40"
          >
            <div className="font-semibold text-title-4">{w.title}</div>
            <p className="m-0 mt-1 text-meta text-muted">{w.desc}</p>
          </Link>
        ))}
      </nav>
    </Layout>
  );
}

export const revalidate = 60;
