import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-joy-color-scheme="dark"]'],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // RGB 三元组以空格分隔，才能用 `<alpha-value>` 拿到透明度修饰符（bg-foreground/10）。
        // 具体色值全部在 app/globals.css，与 @mui/joy 的灰阶/强调色同源。
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--surface-muted) / <alpha-value>)",
        skeleton: "rgb(var(--skeleton) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        // 强调色。此前这里没有 link，PostList 的 `hover:text-link` 是个生成不出任何东西的死类。
        link: "rgb(var(--link) / <alpha-value>)",
      },
      fontFamily: {
        // 真身在 app/globals.css 的 :root —— 只在这里引用，避免字体栈出现第二份。
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      maxWidth: {
        // 正文测量宽度。44rem = 704px，扣掉 Layout 的 px-4 后可用 672px：
        // 17px 正文下约 40 个汉字/行、等宽 14px 下约 82 列/行。
        content: "44rem",
      },
      fontSize: {
        // 角色化字号：字号 + 配套行高写在一起，页面里不再各自猜 leading。
        // 阶梯比例 ≈ 1.24；h4 与正文同号，靠字重和间距区分，不用字号硬撑。
        "title-1": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "title-2": ["1.625rem", { lineHeight: "1.35", letterSpacing: "-0.015em" }],
        "title-3": ["1.3125rem", { lineHeight: "1.45", letterSpacing: "-0.01em" }],
        "title-4": ["1.0625rem", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        body: ["1.0625rem", { lineHeight: "1.8" }],
        meta: ["0.9375rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
      },
    }
  },
  plugins: [],
};
export default config;
