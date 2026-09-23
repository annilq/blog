/*
 * 站点身份的单一事实源。
 *
 * 此前同一件事有三个互相矛盾的版本：app/layout.tsx 里是 create-next-app 的占位
 * （title "one piece" / description "write something..."），MobileHeader 里另有一份硬编码的
 * 标题字面量，lib/generate-static.ts 里还有第三份（"Your Blog" + yourdomain.com）。
 * 浏览器标签、分享卡片、RSS 各说一套，没有一处是站点真正的名字。
 */

/*
 * 站名（品牌）。
 * 注意：这是**有意的**站名，不是占位 —— public/images/sunny.jpg 是 Thousand Sunny 的渲染图，
 * 和 "one piece" 这个 title 是同一套东西。所以这里保留它，只修 description 和域名。
 */
export const SITE_NAME = "One Piece";

/*
 * 默认 <title>。给陌生人看的版本必须带名字：分享出去的链接卡片上只有标题和描述，
 * "one piece" 单独出现时没人知道这是谁。
 */
export const SITE_TITLE = "One Piece · 刘强";

// 描述此前是字面量 "write something..."。这里写站点真实有什么、是谁写的。
export const SITE_DESCRIPTION =
  "刘强的前端开发笔记：Web、React Native、跨平台与工程化，以及还没成文的碎碎念。";

/*
 * 站点的绝对地址。OG 图与 canonical 必须是绝对 URL，否则爬虫拿不到。
 * Vercel 会把部署域名注入 VERCEL_URL，所以线上不额外配置也已经是对的；
 * 绑了自定义域名再设 NEXT_PUBLIC_SITE_URL 覆盖。
 * 不编造域名 —— 写死一个猜的域名只会让分享卡片指向不存在的站点。
 */
export const SITE_URL = (() => {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  // 兜一层协议：new URL("blog.foo.com") 会抛，构建直接挂在一个配置拼写上不值得。
  return /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
})();

/*
 * 站点所有者（作者的 GitHub 登录名）。
 *
 * 碎碎念是按「谁写的」存在数据库里的（Thought.name）。这个值此前从**浏览者**的 session 取：
 * `where: { name: session?.user?.name }`。句尾那个 `!` 只骗过了 TypeScript，运行时什么也没做 ——
 * 未登录时表达式是 undefined，而 Prisma 把 undefined 当成「这个字段不参与筛选」，
 * 于是匿名访客拿到的是**全量**。它凑巧看起来是对的（库里只有作者一个人的数据），
 * 但这是巧合而不是设计：多一个作者就会互相看到彼此的碎碎念。
 *
 * 正确的划分是：读 = 公开（按所有者筛选，常量，与浏览者无关），写/删 = 仅所有者（鉴权时比对）。
 * 默认值取自库里既有的数据（prisma seed 里的 name），换作者时用 SITE_OWNER 覆盖即可。
 */
export const SITE_OWNER = process.env.SITE_OWNER ?? "annilq";

/*
 * 全站唯一一张大图，750×680（不是 1.91:1 的标准 OG 比例，爬虫会按需裁切）。
 * 它同时是站点的视觉母题，所以分享卡片沿用它。
 */
export const OG_IMAGE = "/images/sunny.jpg";
