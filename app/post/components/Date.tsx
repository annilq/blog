/*
 * 文章日期。两个变体：
 *   · full    —— 详情页，"2023年8月29日"
 *   · compact —— 列表页，"8月29日"（年份已由分组标题承担，53 行里重复 53 次没有信息）
 *
 * 一条纪律：只用 **UTC 部件**（getUTCFullYear / getUTCMonth / getUTCDate），不用
 * format() / getFullYear() / toLocaleDateString() 这些本地时区 API。
 *
 * 原因是实测出来的，不是洁癖：front matter 写的是 `date: 2023-08-29 10:30:40`，
 * gray-matter 底下的 js-yaml 把它解析成 2023-08-29T10:30:40**Z** —— 作者写的这个字面量
 * 被当作 UTC 时刻。于是任何本地时区 API 都在回答"东八区的你此刻看到的是几号"，而问题
 * 问的是"作者写的是哪一天"。两个后果：
 *   ① 服务端（容器普遍 UTC）与浏览器（可能 +8）会对同一篇文章渲染出**不同的日期**，
 *      React hydration 会因此报不一致；53 篇里有一批时分在 16:00Z 之后，在 +8 下整体
 *      后移一天，正好落在分歧区；
 *   ② 部署环境的 TZ 一改，全站日期跟着变。
 * 取 UTC 部件后，渲染结果在任何时区、任何机器上都恒等于 front matter 里那个字面量。
 *
 * <time dateTime> 用 ISO 而不是显示文本：显示文本是给中文读者看的人话，
 * dateTime 才是给机器（日历、爬虫、读屏）读的时区无歧义值。
 */
export default function DateLabel({
  date,
  variant = "full",
}: {
  date: Date;
  variant?: "full" | "compact";
}) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return (
    <time dateTime={date.toISOString()}>
      {variant === "compact" ? `${month}月${day}日` : `${year}年${month}月${day}日`}
    </time>
  );
}
