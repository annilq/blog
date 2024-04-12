"use client"

import Navigation from "@/components/Navigation";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";

import MobileHeader from "./MobileHeader";
import { Divider } from "@mui/joy";
import { cn } from "@/utils/utils";

export const containerClass = "container max-w-4xl"

function Layout(props: { children: React.ReactNode, containerClassName?: string, headerClass?: string }) {
  const { sm } = useResponsiveWidth();
  const { headerClass = containerClass, containerClassName = containerClass } = props
  return (
    <main className="min-h-screen flex flex-col">
      {sm && (
        <div className={cn("mx-auto px-2 lg:px-2",headerClass)}>
          <div
            className={"flexgroup justify-start items-start select-none z-2 py-4"}>
            <Navigation />
          </div>
          <Divider />
        </div>
      )}
      {!sm && <MobileHeader />}
      <div className={cn("w-full mx-auto px-2 lg:px-2 p-4 flex-1 flex flex-col pb-8 mt-4", containerClassName)}>
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
