"use client";

import { IconButton } from "@mui/joy";
import Icon from "./Icon";

// 原来「关于本站」页面只承载这一条地址（built with + source），页面已删除，改由图标承接。
// 想指向个人主页而不是仓库，把这里换成 https://github.com/annilq 即可。
export const GITHUB_URL = "https://github.com/annilq/blog";

/**
 * 头部 GitHub 图标。
 * `component="a"` 不能省：Joy 的 IconButton 运行时默认渲染 <button>，只加 href 不会跳转。
 */
export default function GitHubLink({ className }: { className?: string }) {
  return (
    <IconButton
      component="a"
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant="plain"
      aria-label="本站源码（GitHub）"
      title="本站源码 · GitHub"
      className={className}
    >
      <Icon.Github />
    </IconButton>
  );
}
