"use client";

import { cn } from "@/utils/utils";
import { containerClass } from "@/components/SiteHeader";

// 仅负责页面内容容器；导航已提升到根 layout（components/SiteHeader），切换路由时不再随内容重载。
export default function Layout(props: { children: React.ReactNode; containerClassName?: string; headerClass?: string; showDivider?: boolean }) {
  const { containerClassName = containerClass } = props;
  return (
    <main className="min-h-screen flex flex-col">
      <div className={cn("w-full mx-auto px-2 lg:px-2 p-4 flex-1 flex flex-col pb-8", containerClassName)}>
        {props.children}
      </div>
    </main>
  );
}
