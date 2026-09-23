"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DateLabel from "./Date";
import { Tag } from "@/components/Tag";
import { groupByYear } from "@/lib/archive";
import type { StaticPostMeta, TagCount } from "@/lib/static-posts";

/*
 * 归档列表。三层信息，按读者找东西的方式排：
 *   年份分组  —— 53 篇平铺成一列 ≈ 3400px 无特征滚动，"2021 那篇总结"只能靠日期顺序碰运气。
 *                年份是读者真的记得的坐标，所以它当标题（h2），也让读屏可以按标题跳年份。
 *   摘要      —— 标题独自承担回忆太吃力（"前端打印注意事项"是讲什么来着？）。
 *   日期 + 标签 —— 元信息，最小字号、次级颜色。
 *
 * 为什么分组不在这里算：groupByYear 是纯函数、放 lib/archive.ts，不碰 React，
 * 于是可以直接拿 53 篇真实语料在 node 里断言「组数、每组篇数、求和等于总数」，
 * 不用为了测这点逻辑把整棵树挂进浏览器。
 */
export default function PostList({
  posts,
  tagIndex,
}: {
  posts: StaticPostMeta[];
  tagIndex: TagCount[];
}) {
  const query = useSearchParams().get("query") || "";
  // 名字 → 篇数。静态预取时随 props 一起来，chip 上的数字不需要额外请求。
  const countByName = new Map(tagIndex.map((tag) => [tag.name, tag.count]));
  const filtered = query ? posts.filter((post) => post.tags === query) : posts;
  const groups = groupByYear(filtered);

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {/*
        筛选指示条。此前这里要求 `countByName.has(query)` 才显示 —— 那意味着一个不存在的
        tag 深链（?query=拼错的名字）会渲染出**空白页且没有任何清除入口**，读者看到的是
        "这个 tag 下什么都没有"和"这个 tag 我根本没法取消"两件事同时发生。
        现在任何 query 都渲染成一条可清除的指示，加上篇数，空结果由下面那句话说明。
        指示条本身不给篇数（它是"正在筛选"的状态，不是一条统计），篇数单独一格写着。
      */}
      {query && (
        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Tag tag={{ id: query, name: query }} canClear />
          <span className="text-meta text-muted tabular-nums">{filtered.length} 篇</span>
        </div>
      )}

      {query && filtered.length === 0 && (
        <p className="m-0 text-meta text-muted">没有标记为「{query}」的文章。</p>
      )}

      {groups.map((group, index) => (
        /*
         * 不挂 aria-labelledby：那会把每个年份变成一个 region 地标，一年一个，
         * 读屏的地标列表会凭空多出 9 项噪音。结构交给 h2 —— 按标题跳转是读屏找年份的
         * 常规做法，也已经够用了。
         */
        <section
          key={group.year}
          className={`w-full flex flex-col gap-4 ${index === 0 ? "" : "mt-12"}`}
        >
          <h2
            id={`year-${group.year}`}
            className="m-0 flex items-baseline gap-3 text-title-4 font-semibold text-foreground"
          >
            {group.year}
            <span className="text-meta font-normal text-muted tabular-nums">
              {group.posts.length} 篇
            </span>
            {/* 装饰性分隔：线 + 末端强调色圆点（新孟菲斯式几何节点），把年份分组分开；
                aria-hidden 免得被念成内容。 */}
            <span aria-hidden="true" className="h-px flex-1 self-center bg-rule/[0.12]" />
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 self-center rounded-full bg-link" />
          </h2>

          {/* 全局 CSS 给 ul 补了圆点和 padding（正文里需要），这里是不成句的条目列表，取消掉。 */}
          <ul className="m-0 flex list-none flex-col gap-6 p-0">
            {group.posts.map(({ id, date, title, tags, excerpt }) => (
              <li key={id} className="flex flex-col gap-1">
                <Link
                  href={`/post/${id}`}
                  className="text-title-3 font-semibold text-foreground hover:text-link"
                >
                  {title}
                </Link>
                {excerpt && <p className="m-0 line-clamp-2 text-meta text-muted">{excerpt}</p>}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-muted">
                  <DateLabel date={date} variant="compact" />
                  {tags && <Tag key={tags} tag={{ id: tags, name: tags }} count={countByName.get(tags)} />}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
