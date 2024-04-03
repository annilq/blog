"use client"

import Navigation from "@/components/Navigation";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";

import MobileHeader from "./MobileHeader";
import ThemeToggle from "./ThemeToggle";

function Layout(props: { children: React.ReactNode }) {
  const { sm } = useResponsiveWidth();

  return (
    <main>
      {sm && (
        <div
          className={"flex"}>
          <div
            className={"flex flex-1 group justify-start items-start font-bold text-lg select-none z-2 py-6"}>
            <Navigation />
          </div>
          <ThemeToggle />
        </div>
      )}
      {!sm && <MobileHeader />}
      <div className="w-full min-h-full flex flex-col justify-start items-center pb-8">
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
