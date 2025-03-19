import { cn } from "@/utils/utils";
import ActiveLink from "./ActiveLink";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import ThemeToggle from "./ThemeToggle";
import SignIn from "./SignIn";

interface NavLinkItem {
  id: string;
  path: string;
  title: string;
}

const Navigation = () => {

  const { sm } = useResponsiveWidth();


  const navLinks: NavLinkItem[] = [
    {
      id: "header-home",
      path: "/",
      title: "主页",
    },
    {
      id: "header-post",
      path: "/post",
      title: "文章",
    },
    {
      id: "header-book",
      path: "/book",
      title: "书籍",
    },
    {
      id: "header-thoughts",
      path: "/thoughts",
      title: "碎碎念",
    },
    {
      id: "header-about",
      path: "/about",
      title: "关于本站",
    }
  ]

  return (
    <header
      className={cn(
        "flex py-4 z-30 hide-scrollbar sticky w-full font-bold text-lg ",
      )}
    >
      <div className={cn("flex-1 flex justify-start items-start ", sm ? "space-x-4" : "space-y-2 flex-col")}>
        {navLinks.map((navLink) => (
          <ActiveLink
            className={cn(
              "flex flex-row items-center text-foreground")}
            activeClassName="drop-shadow	"
            key={navLink.id}
            href={navLink.path}
          >
            {navLink.title}
          </ActiveLink>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {sm && <ThemeToggle />}
        {sm && <SignIn />}
      </div>
    </header >
  );
};

export default Navigation;
