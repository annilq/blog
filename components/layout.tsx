"use client"

import { Button, IconButton, Tooltip } from "@mui/joy";
import useLocalStorage from "react-use/lib/useLocalStorage";
import Icon from "@/components/Icon";
import Navigation from "@/components/Navigation";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";

import MobileHeader from "./MobileHeader";

function Layout(props: { children: React.ReactNode }) {
  const { sm } = useResponsiveWidth();

  return (
    <main className="container max-w-4xl transition-all mx-auto">
      {sm && (
        <div
          className={"group flex justify-start items-start select-none border-r z-2"}>
          <Navigation />
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
