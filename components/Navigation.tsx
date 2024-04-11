import Icon from "./Icon";
import { cn } from "@/utils/utils";
import ActiveLink from "./ActiveLink";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import ThemeToggle from "./ThemeToggle";

interface NavLinkItem {
  id: string;
  path: string;
  title: string;
  icon: React.ReactNode;
}

const Navigation = () => {

  const { sm } = useResponsiveWidth();


  const navLinks: NavLinkItem[] = [
    {
      id: "header-home",
      path: "/",
      title: "主页",
      icon: <Icon.Home className="w-6 h-auto opacity-70" />,
    },
    {
      id: "header-post",
      path: "/post",
      title: "文章",
      icon: <Icon.Home className="w-6 h-auto opacity-70" />,
    },
    {
      id: "header-about",
      path: "/about",
      title: "关于本站",
      icon: <Icon.User2 className="w-6 h-auto opacity-70" />,
    }]

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
      {sm && <ThemeToggle />}
    </header >
  );
};

export default Navigation;
