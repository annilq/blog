"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { cn } from "@/utils/utils";

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
};

/*
 * 三处修正：
 *
 * 1. 原来在 useEffect 里算 className 再存进 state —— 首帧一定不带 active（服务端也没有这个词），
 *    挂载后才补上，当前位置会闪一下。usePathname() 在渲染期就有值，直接算，state 和 effect 都不需要。
 *
 * 2. 原来只做全等匹配（linkPathname === pathname）。于是 /post/2025-03-14 这种详情页上
 *    「文章」不再算当前，位置反馈在站点最深、最需要它的页面上整段消失。改成前缀匹配；
 *    "/" 例外 —— 只有首页自身算当前，否则它会在每一个页面上都亮着。
 *
 * 3. 补 aria-current="page"。这是视觉之外的唯一位置反馈，读屏用户此前完全拿不到。
 */
const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const pathname = usePathname();
  const href = (props.as || props.href) as string;
  // 去掉查询串与 hash 再比，`/post?query=react` 也算「文章」。
  const target = href.split(/[?#]/)[0];
  const isActive =
    pathname != null &&
    (target === "/" ? pathname === "/" : pathname === target || pathname.startsWith(`${target}/`));

  return (
    <Link
      // cn 走 tailwind-merge：active 的 color/decoration 会覆盖 base 的，不靠 CSS 里的先后顺序碰运气。
      className={cn(className, isActive && activeClassName)}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
