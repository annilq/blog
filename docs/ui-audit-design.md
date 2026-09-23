# ADR: 博客 UI/UE 统一与「新孟菲斯 · 极简」方向

- 状态：已实施（2026-09-23）
- 范围：`app/`、`components/layout.tsx` 全站内容容器与卡片系统

## 背景

一轮修整后页面出现两类可复现的问题：

1. **布局不统一**：内容容器宽度在页面间漂移——文章/主页/碎碎念走 `max-w-content`（44rem），书籍页因 `containerClassName` 覆盖默认值变成全宽，碎碎念页还套了一层冗余的 `container mx-auto`。
2. **卡片内容超出**：书籍卡片用 `w-72 aspect-video` 固定 16:9 盒，竖图封面（约 137px 高）超出约 130px 内高并从底部溢出（无 `overflow-hidden`）；`w-72`（288px）在窄屏不收缩，会撑出横向滚动。

附带问题：书籍卡（裸 `<div>`+`shadow`）与碎碎念卡（MUI `<Card variant="soft">` 无内边距）是两套系统，圆角无统一刻度（`rounded-2xl` / `rounded-sm` / `rounded` 混用）。

## 决策

- **单一内容宽度**：全站内容容器固定 `max-w-content`（44rem）。`Layout` 的 `containerClassName` 改为「追加」语义——调用方传 `bg` 等修饰不再覆盖 `max-w-content`（这是书籍页全宽的根因）。
- **统一卡片原语**：书籍卡与碎碎念卡都用 `bg-surface rounded-xl border border-rule/10 shadow-sm p-4`。书籍书架由 `flex-wrap` 改为 `grid grid-cols-1 sm:grid-cols-2`（bento 式均匀网格，无参差换行、无死格）。
- **修复溢出**：书籍封面改为固定缩略图 `w-20 h-28 object-cover`，卡片 `w-full overflow-hidden`，宽度随栅格自适应。
- **圆角刻度**：卡片 `rounded-xl`、控件/缩略图 `rounded-md`；移除 `rounded-2xl` / `rounded-sm` 混用。
- **新孟菲斯 · 极简点缀**：仅用现有 palette（`--link` 蓝、`--rule` 灰）的几何节点——年份分隔线末端加强调色圆点、书籍卡角落加小圆点。不引入新色、不用 stock 图、不做 GSAP 动效（与「内容为主」一致）。

## 后果

- 所有页面正文测量宽度一致（44rem），导航与内容对齐。
- 书籍卡片不再溢出；书架在手机 1 列、≥640px 2 列均匀排布。
- 卡片视觉统一，圆角有单一刻度。
- 取舍：书籍页改为 44rem 内 2 列书架（原全宽多列）。若日后要更宽的书架，应新增一个显式 token（如 `max-w-page`）而非回到 ad-hoc 全宽。

## 审计发现表

| 文件 | 问题 | 修复 |
| --- | --- | --- |
| `components/layout.tsx` | `px-2` 与 `p-4` 内边距互相覆盖；`containerClassName` 覆盖默认 `max-w-content` | 固定 `baseContainer`（`max-w-content` + `px-4`），`containerClassName` 仅追加 |
| `app/book/page.tsx` | `containerClassName` 覆盖 `max-w-content` → 全宽 | 改为追加；书架 `grid` 化 |
| `app/book/components/book.tsx` | `aspect-video` + `w-72` 溢出、窄屏不收缩 | `w-full` + `overflow-hidden` + 固定缩略图 |
| `app/thoughts/page.tsx` | 冗余 `container mx-auto`；MUI Card 与书籍卡两套 | 去掉冗余容器；统一 Tailwind 卡片 |
| `app/post/components/PostList.tsx` | 年份分隔仅为一条线 | 末端加 `--link` 强调色圆点节点 |

## Token 词汇表（沿用既有，未新增）

- 表面：`--background` 画布白 · `--surface` 卡面 · `--surface-muted` 填充层
- 文字：`--foreground` 正文 · `--muted` 次级 · `--rule` 线
- 强调：`--link` 强调蓝（全站唯一强调色，几何节点复用它）
- 尺度：`max-w-content` = 44rem 正文测量宽度；半径 `rounded-xl`（卡）/ `rounded-md`（控件）

## 后续已补（2026-09-23 第二轮）

首轮审计收尾时仍有两处 polish 缺口，本轮补齐：

| 文件 | 问题 | 修复 |
| --- | --- | --- |
| `app/thoughts/page.tsx` | 缺页面级 `<h1>`，读者不知道落在哪 | 加 `<header><h1>碎碎念</h1> + 描述</header>`，样式与 `/post` 一致（`mb-10`） |
| `app/book/page.tsx` | 缺页面级 `<h1>` | 加 `<header><h1>书籍</h1> + 本数/描述</header>` |
| `app/thoughts/page.tsx` | 日期时区错：`format()` 按运行时时区渲染，`createdAt` 为 DB 的 UTC 真实时刻，Vercel 上显示成 UTC，比作者北京时间早 8 小时 | 弃用 `date-fns format()`，新增 `formatBeijingTime()`：用 UTC 部件手动 +8 偏移，任何环境显示恒等于作者当时北京时间；`dateTime` 仍用 `toISOString()` 给机器。与 `app/post/components/Date.tsx`「不依赖本地时区」纪律同源 |

补完后全站页面均有一级标题：`/`（home）与 `/profile` 的 h1 由 `profile.mdx` 的 `# 刘强` 提供；`/post`、`/post/[id]` 上一轮已加；本轮补 `/thoughts`、`/book`。

## Hallmark 重构：页面布局结构重 design（2026-09-23 第三轮）

用 hallmark 技能审计「页面布局结构」并重新 design，约束：**保持既有轻快（light/breezy）风格，不套 catalog 主题、不新建调色板、不用 GSAP**。

### 审计：结构层问题（按严重度）

| 严重度 | 文件 | 问题 |
| --- | --- | --- |
| 高 | `components/SiteHeader.tsx:31` | 头部容器 `px-2 lg:px-2`（8px），正文 `Layout` 用 `px-4`（16px）——两者都 44rem 居中但导航文字比正文左偏 8px，全站每页都歪 |
| 高 | `app/page.tsx` | 首页直接渲染 `profile.mdx`，无站点级 h1、无去处引导，访客落地只见一段 bio——最弱的一页 |
| 中 | `app/layout.tsx` | 全站零 footer：无版权、无次级导航，结构不完整 |
| 中 | `components/Navigation.tsx` | nav 只有 主页/碎碎念/文章/书籍，没有「关于」入口，而 `/profile` 真实存在 → `/profile` 成孤儿 |
| 低 | `app/post/[id]/page.tsx:67-71` | 两层 `w-full h-auto flex flex-col justify-start items-start` 冗余包裹，无作用 |
| 低 | `app/loading.tsx` / `app/post/loading.tsx` / `tailwind.config.ts` 注释 | 加载骨架与首页同款 `px-2 lg:px-2 p-4` 冲突内边距，会复现头部偏移；config 注释仍写 `px-2` |

### 决策与修复

- **头部与正文对齐**：`SiteHeader` 容器 `px-2 lg:px-2` → `px-4`，与 `Layout` 完全一致（导航不再左偏）。加载骨架同步改为 `px-4 py-4`；更新 `tailwind.config.ts` 注释为 `px-4`。
- **首页导览式落地（Wayfinding Landing）**：`app/page.tsx` 改为站名作 h1 + 一句定位（`SITE_NAME` / `SITE_DESCRIPTION`），下面三块 wayfinding 卡片（文章 / 碎碎念 / 书籍），复用统一卡片原语。完整的自我介绍从首页移出，由 `/profile` 承载，避免首页出现两个 h1。
- **全站 footer**：新增 `components/SiteFooter.tsx`（版权年 + 次级导航），接入 `app/layout.tsx`，结构闭环。
- **导航补「关于」**：`Navigation.tsx` 追加 `关于` → `/profile`，`/profile` 不再是孤儿页。
- **文章详情去嵌套**：`app/post/[id]/page.tsx` 移除双层冗余包裹，直接 `<Layout><article>...</article></Layout>`。
- **移动端保险**：`app/globals.css` 加 `overflow-x: clip`，防止任何子元素溢出触发横向滚动条。

### 后果

- 头部 / 正文 / 加载态 / footer 四者内边距全部 `px-4`、宽度全部 `max-w-content`，全站左右基准线一致。
- 首页从「bio 片段」升级为可导航的落地页；`/profile` 有了入口。
- 全站具备 header + footer 完整结构；文章详情 DOM 更干净。
- 取舍：首页不再展示自我介绍正文（移到 `/profile`）。若你希望首页也保留一段 bio，可在 wayfinding 卡片前加一段 `text-meta` 引文，不破坏当前结构。
