"use client";

import Navigation from "@/components/Navigation";
import MobileHeader from "@/components/MobileHeader";
import { Divider } from "@mui/joy";
import { cn } from "@/utils/utils";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";

export const containerClass = "container max-w-4xl";

// 全局站点头部：在根 layout 中只渲染一次，路由切换时不随页面内容一起挂起/重载。
export default function SiteHeader() {
  const { sm } = useResponsiveWidth();
  return (
    <>
      {sm && (
        <div className={cn("mx-auto px-2 lg:px-2", containerClass)}>
          <Navigation />
          <Divider />
        </div>
      )}
      {!sm && <MobileHeader />}
    </>
  );
}
