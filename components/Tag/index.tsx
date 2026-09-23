"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/utils/utils";
import Icon from "../Icon";

// 定义标签类型
export interface TagType {
  id: string;
  name: string;
}

/*
 * 这里原来有个 stringToColour()：把标签名哈希成一个随机亮色，配 text-white。
 * 问题有两层 —— ① 颜色不编码任何信息（同一个标签每次刷新颜色一致，但和别的标签之间没有语义关系，
 * 读者学不到任何东西）；② 15 个真实标签里有 11 个对比度不到 4.5:1
 * （design-pattern #81f250 是 1.42:1，React #5fe9b2 是 1.52:1），白字根本读不清。
 *
 * 现在按「简约」的要求做成单色 chip：描边取 rule/40、文字取 muted（浅色 6.6:1 / 深色 8.5:1）。
 * 颜色不再承担分类语义，标签靠文字本身区分；数量用 tabular-nums 显示，只降字号、不降对比度
 * （用 opacity 淡化会把 6.6:1 压到 4.2:1，直接掉出 AA）。
 */
export const Tag = (props: { tag: TagType, count?: number, canClear?: boolean }) => {

  const { tag, count, canClear = false } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /*
   * 这里原来是 `<div onClick>` —— 键盘 Tab 不到、读屏不播报，等于「按 tag 找文章」这条
   * 唯一的发现机制对键盘用户完全不存在。清除按钮更糟：那是内层 `<svg>` 自己带 onClick。
   *
   * 换成真控件，且必须分成两个分支 —— 因为**不能把 button 套进 button**
   * （嵌套按钮是非法 HTML，浏览器会把内层挤出去，内层的点击区域随之消失）：
   *   · 非当前筛选 → 单个 `<button>`，`aria-pressed` 反映它此刻是否被选中；
   *   · 当前筛选（canClear）→ `<span>` 装名字 + 内层 `<button>` 负责清除。
   *
   * 为什么用 button 而不是 `<Link href="?query=…">`：这是原地筛选（`replace` 不压历史），
   * 不是一个导航目的地；button + aria-pressed 才讲得清「开/关」这个状态。
   * 注意 critique 建议的是写死 `aria-pressed={false}` —— 那会永远播报「未按下」，
   * 是换了个错法，所以这里取真实状态。
   */
  const chipClass =
    "inline-flex items-center gap-1.5 rounded border border-rule/40 px-2 py-0.5 text-caption leading-5 text-muted transition-colors";

  if (canClear) {
    return (
      <span className={cn(chipClass, "border-rule/70 bg-surface-muted text-foreground")}>
        {tag.name}
        <button
          type="button"
          onClick={() => replace(pathname)}
          aria-label={`清除「${tag.name}」筛选`}
          className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded hover:bg-foreground/10"
        >
          {/* 图标是装饰，名字由 aria-label 提供 —— 不屏蔽的话某些读屏会把 svg 一起念出来 */}
          <Icon.X className="w-3" aria-hidden="true" />
        </button>
      </span>
    );
  }

  const isActive = searchParams.get("query") === tag.id;

  return (
    <button
      type="button"
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("query", tag.id);
        replace(`${pathname}?${params.toString()}`);
      }}
      aria-pressed={isActive}
      // 描边而不是填充：surface-muted 在深色下与画布只差 1.2:1，填充几乎看不见，
      // 22 个 chip 会连成一行文字（"javascript8 summary6 …" 读不出边界）。
      // 描边在两种主题下都稳定可见，也最省视觉重量 —— 标签是元信息，不该抢标题。
      className={cn(chipClass, "cursor-pointer hover:border-rule/70 hover:bg-surface-muted hover:text-foreground")}
    >
      {tag.name}
      {typeof count === "number" && (
        <span className="tabular-nums text-[0.85em]">{count}</span>
      )}
    </button>
  )
}
