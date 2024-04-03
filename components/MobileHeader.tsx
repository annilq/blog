import { useState } from "react";
import useWindowScroll from "react-use/lib/useWindowScroll";
// import { useGlobalStore } from "@/store/module";
import NavigationDrawer from "./NavigationDrawer";
import { cn } from "@/utils/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const MobileHeader = (props: Props) => {
  // const globalStore = useGlobalStore();
  // const { systemStatus } = globalStore.state;
  const { className, children } = props;

  const [titleText] = useState("One Piece");
  const { y: offsetTop } = useWindowScroll();

  return (
    <div
      className={cn(
        "sticky top-0 pt-3 pb-2 sm:pt-2 sm:mb-1 bg-opacity-80 bg-background backdrop-blur-lg flex md:hidden flex-row justify-between items-center w-full h-auto flex-nowrap shrink-0 z-10",
        offsetTop > 0 && "shadow-md",
        className,
      )}
    >
      <div className="flex flex-row justify-start items-center mr-2 shrink-0 overflow-hidden">
        <NavigationDrawer />
        <span
          className="font-bold text-lg leading-10 mr-1 text-ellipsis shrink-0 cursor-pointer overflow-hidden"
        >
          {titleText}
        </span>
      </div>
      <div className="flex flex-row justify-end items-center">{children}</div>
    </div>
  );
};

export default MobileHeader;
