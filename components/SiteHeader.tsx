"use client";

import Navigation from "@/components/Navigation";
import MobileHeader from "@/components/MobileHeader";
import GitHubLink from "@/components/GitHubLink";
import ThemeToggle from "@/components/ThemeToggle";
import SignIn from "@/components/SignIn";
import { Divider } from "@mui/joy";
import { cn } from "@/utils/utils";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";

// 正文测量宽度是全站唯一的：header、内容、骨架屏都从这里取，改一处全站对齐。
export const containerClass = "container max-w-content";

// 全局站点头部：在根 layout 中只渲染一次，路由切换时不随页面内容一起挂起/重载。
export default function SiteHeader() {
  /*
   * 断点必须是 md(768)，不能是 sm(640)。
   *
   * 理由不是"会渲染出两排导航"—— 下面两个分支是互斥的，两排结构上不可能同时出现（实测过）。
   * 真正的问题是**两处断点不一致**：父组件在这里选分支，而 MobileHeader 自己类里还写着
   * `flex md:hidden`，那是第二个、独立的断点。父用 sm(640)、子用 md(768)，中间 640–767px
   * 这一段的归属就由父组件独家决定，子组件自己的类形同虚设 —— 于是
   *   640–767px（平板 / 手机横屏）拿到的是为宽屏设计的桌面横排行，抽屉那套布局在整个区间里走不到。
   * 视口的宽窄只能有一个答案，取子组件已有的那个（md），父子的判断从此重合。
   */
  const { md } = useResponsiveWidth();
  return (
    <>
      {md && (
        <div className={cn("mx-auto px-4", containerClass)}>
          <Navigation variant="row" />
          <Divider />
        </div>
      )}
      {!md && (
        <MobileHeader>
          {/* 三个工具窄屏都得落在这里 —— 桌面那一排（Navigation 的 isRow 分支）在 <768px 全不渲染。
              少了 SignIn，「手机上没有登录入口」；少了 ThemeToggle，「手机上没有主题开关」。 */}
          <GitHubLink />
          <ThemeToggle />
          <SignIn />
        </MobileHeader>
      )}
    </>
  );
}
