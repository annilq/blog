"use client"

import { Input, Modal, ModalClose, ModalDialog } from "@mui/joy";
import Fuse, { type IFuseOptions } from "fuse.js";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import type { StaticPostMeta } from "@/lib/static-posts";
import FuseHighlight from "./hightlight";

const options: IFuseOptions<StaticPostMeta> = {
  /*
   * 索引是 title + tags + excerpt（列表页已经在用的首段摘要）。
   * 之前只搜标题和标签 —— "记得正文里某个词"的读者搜不到任何东西。摘要既然已经算出来了，
   * 顺手进索引几乎免费（53 篇冷启动实测 109ms，且进程内缓存）。
   */
  keys: [
    { name: "title", weight: 0.7 },
    { name: "tags", weight: 0.2 },
    { name: "excerpt", weight: 0.1 },
  ],
  threshold: 0.1,
  minMatchCharLength: 1,
  /*
   * ignoreLocation 是必要的修复，不是调参。Fuse 默认 location=0 / distance=100 —— 命中位置
   * 离字符串开头越远扣分越重，配上 0.1 这么严的 threshold，"记得标题后半段那个词"的查询
   * 直接归零。实测（拿 53 篇标题里每段连续 2–6 字子串当查询，共 159 条）：
   *   不开 135/159（约 15% 找不到东西）→ 开了 159/159。
   * 长标题（"百度地图坐标与微信地图坐标转换" 搜 "坐标转换"）是重灾区。
   */
  ignoreLocation: true,
  includeMatches: true,
};

export default function SearchInput({ data }: { data: StaticPostMeta[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const titleId = useId();

  /*
   * 结果直接由 value 推导，不再用「effect 里 setState」：
   * 原来那个 useEffect 依赖 [value] 而不依赖 Fuse 实例，索引重建后旧结果会留在界面上；
   * 而且首次渲染时 matchPost 是空数组 —— 这就是"打开搜索先看到 No matches"的来源。
   * 推导式没有这一帧空窗，也不用担心 effect 顺序。
   */
  const fuse = useMemo(() => new Fuse<StaticPostMeta>(data, options), [data]);
  const query = value.trim();
  const results = useMemo(() => (query ? fuse.search(query) : []), [fuse, query]);

  /*
   * `/` 直达搜索。这是键盘用户找文章的捷径，也让那个可见的 "/" 提示名副其实。
   * 两处刻意不劫持：带修饰键（Cmd/Ctrl+/ 通常是别的应用的快捷键）和正在输入框里打字
   * （文章路径、正则、日期都含斜杠，抢了就是把人家打了一半的字吞掉）。
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || /^(input|textarea|select)$/i.test(target?.tagName ?? "")) return;
      // 不 preventDefault 的话斜杠会被打进页面，Firefox 还会顺手弹出"快速查找"。
      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="w-full">
      {/*
        触发器是个真 <button>，只是**长得像**输入框。
        没有采纳 critique 的 `readOnly <Input>` 建议，因为那是个假可供性：一个能聚焦、
        看起来能打字、其实吞掉所有按键、还不声明自己会开对话框的输入框 —— 键盘用户 Tab 到它
        之后会一直试图输入。它做的事就是"打开一个对话框"，所以用按钮表达，并声明
        aria-haspopup="dialog"。右侧那个 "/" 是可见的快捷键提示（GitHub、DocSearch 同款处理）。
      */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-keyshortcuts="/"
        className="mb-10 flex w-full items-center gap-2.5 rounded border border-rule/40 bg-surface-muted px-3 py-2 text-left text-meta text-muted transition-colors hover:border-rule/70 hover:bg-surface hover:text-foreground"
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="flex-1">搜索文章…</span>
        <kbd className="rounded border border-rule/40 bg-background px-1.5 text-caption">/</kbd>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} sx={{ bgcolor: "background.paper" }}>
        <ModalDialog
          aria-labelledby={titleId}
          sx={{
            // 手机 92vw（旧版 width:50% 在 375px 屏上是 187px 宽，只有巴掌大），桌面 32rem。
            width: { xs: "92vw", sm: "32rem" },
            /*
             * 贴着视口上方 10% 而不是垂直居中 —— 结果列表要从上往下长，居中的话输入框会随着
             * 结果条数上下跳。
             *
             * 关键是**不用 ModalOverflow**：它给 layoutCenter 写死了
             * `margin: auto; top: unset; maxHeight: unset`，选择器是
             * `.JoyModalOverflow-root .JoyModalDialog-layoutCenter`（特异度 0,2,0），
             * 会盖掉这里写在 ModalDialog 上的 top/maxHeight（0,1,0）——
             * 旧代码那两行 `top:"10%"`、`height:"70%"` 因此从来没生效过（源码实测，不是猜测）。
             * 现在 Modal 直接挂 ModalDialog，没有中间那层覆盖。
             */
            maxHeight: "70vh",
            top: "10%",
            transform: "translate(-50%, 0)",
            // flex 列 + 结果区 overflow：输入框钉在顶部，只有结果滚动。
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            overflow: "hidden",
          }}
        >
          {/* Joy 的 ModalClose 只有图标、没有名字，必须自己给 aria-label（同 harden 里抽屉那颗）。 */}
          <ModalClose aria-label="关闭搜索" />
          {/* 对话框需要一个可访问名；它同时也是这一页的检索区标题。视觉上文里已经说了，所以只给读屏。 */}
          <h2 id={titleId} className="sr-only">
            搜索文章
          </h2>

          <Input
            autoFocus
            startDecorator={<Search aria-hidden="true" />}
            placeholder="搜索标题、标签或摘要…"
            variant="soft"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            slotProps={{ input: { "aria-label": "搜索文章" } }}
          />

          <ul className="m-0 flex min-h-0 list-none flex-col overflow-y-auto p-0">
            {results.map(({ item, matches }) => {
              // 命中来自标签时把标签显示出来 —— 否则读者看不出这条为什么被搜出来。
              const tagMatched = matches?.some((match) => match.key === "tags");
              return (
                /* ul 的直接子元素必须是 li。原来写的是 <a> 直接包 <li>，浏览器会把 a 提到 ul
                   外面去，列表语义整个散掉。 */
                <li key={item.id}>
                  <Link
                    href={`/post/${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded px-2 py-2 hover:bg-foreground/5"
                  >
                    <span className="block text-title-4 text-foreground">
                      <FuseHighlight matches={matches} value={item.title} name="title" />
                    </span>
                    {(item.excerpt || (tagMatched && item.tags)) && (
                      <span className="mt-0.5 line-clamp-2 text-caption text-muted">
                        {tagMatched && item.tags && <span className="text-link">#{item.tags} </span>}
                        {item.excerpt && (
                          <FuseHighlight matches={matches} value={item.excerpt} name="excerpt" />
                        )}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/*
            空状态分两种，此前只有一种且写死为英文：
              · 还没输入 —— 给一行"这里能搜什么"，而不是宣布"没有匹配"。
                （Fuse 对空串返回 0 条，所以原来是打开即"No matches"，先在实测里确认过。）
              · 输入了但没有 —— 把关键词回显出来，读者才知道自己搜的是什么。
          */}
          {!query && (
            <p className="m-0 px-2 py-3 text-center text-meta text-muted">
              输入关键词，匹配标题、标签和摘要。
            </p>
          )}
          {query && results.length === 0 && (
            <p className="m-0 px-2 py-3 text-center text-meta text-muted">
              没有匹配「{query}」的文章。
            </p>
          )}
        </ModalDialog>
      </Modal>
    </div>
  );
}
