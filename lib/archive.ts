import type { StaticPostMeta } from "./static-posts";

export interface YearGroup {
  year: number;
  posts: StaticPostMeta[];
}

/*
 * 文章年份 —— 全站唯一一处把 Date 变成「年」的地方。
 *
 * 用 getUTCFullYear() 而不是 getFullYear()，理由和 components/post/Date 里的日期渲染一致：
 * front matter 写的是 `date: 2023-08-29 10:30:40`，gray-matter（js-yaml）把它解析成
 * 2023-08-29T10:30:40Z —— 那个字面量被当成 UTC。本地时区 API 会让「这篇文章算哪一年」
 * 取决于运行代码的机器在哪，于是同一个页面在服务端和浏览器上可以分到不同的组里。
 */
export const postYear = (date: Date): number => date.getUTCFullYear();

/*
 * 按年份分组。53 篇平铺成一列 ≈ 3400px 无特征滚动，年份是读者真的会用来定位的坐标
 * （"2021 那篇总结"）。分组本身是纯函数、不碰 React，所以可以直接拿真实语料在 node 里断言。
 *
 * 刻意不假设入参已排序：组内保持入参顺序（调用方已按日期倒序），组之间按年份倒序。
 * 依赖"入参一定有序"的写法一旦上游改了排序，症状是同一年的文章裂成两个组 —— 不值得省这几行。
 */
export function groupByYear(posts: StaticPostMeta[]): YearGroup[] {
  const byYear = new Map<number, StaticPostMeta[]>();

  for (const post of posts) {
    const year = postYear(post.date);
    const bucket = byYear.get(year);
    if (bucket) {
      bucket.push(post);
    } else {
      byYear.set(year, [post]);
    }
  }

  return Array.from(byYear, ([year, groupPosts]) => ({ year, posts: groupPosts })).sort(
    (a, b) => b.year - a.year,
  );
}

/*
 * 归档区间：只给首尾年份与总数，不做别的统计 —— 读者需要的是"这堆东西有多大、跨多久"。
 * 空数组返回 null，由调用方决定说什么。
 */
export function archiveRange(posts: StaticPostMeta[]): { count: number; from: number; to: number } | null {
  if (posts.length === 0) {
    return null;
  }

  const years = posts.map((post) => postYear(post.date));
  return {
    count: posts.length,
    from: Math.min(...years),
    to: Math.max(...years),
  };
}
