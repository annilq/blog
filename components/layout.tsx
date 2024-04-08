"use client"

import Navigation from "@/components/Navigation";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";

import MobileHeader from "./MobileHeader";
import { Divider } from "@mui/joy";

function Layout(props: { children: React.ReactNode }) {
  const { sm } = useResponsiveWidth();

  return (
    <main>
      {sm && (
        <>
          <div
            className={"flex flex-1 group justify-start items-start select-none z-2 py-4"}>
            <Navigation />
          </div>
          <Divider />
        </>
      )}
      {!sm && <MobileHeader />}
      <div className="w-full min-h-full flex flex-col pb-8 mt-4">
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
