"use client";

import { cn } from "@/utils/utils";

// 全站唯一内容容器：44rem 测量宽度 + 居中。containerClassName 只做「追加」，
// 调用方传 bg 等修饰不会再像以前那样把 max-w-content 整个覆盖掉（书籍页曾因此变成全宽）。
const baseContainer = "mx-auto w-full max-w-content px-4 py-4 flex-1 flex flex-col pb-8";

// 仅负责页面内容容器；导航已提升到根 layout（components/SiteHeader），切换路由时不再随内容重载。
export default function Layout(props: { children: React.ReactNode; containerClassName?: string; headerClass?: string; showDivider?: boolean }) {
  const { containerClassName = "" } = props;
  return (
    <main className="min-h-screen flex flex-col">
      <div className={cn(baseContainer, containerClassName)}>
        {props.children}
      </div>
    </main>
  );
}
