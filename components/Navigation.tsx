import { useTranslate } from "@/utils/i18n";
import Icon from "./Icon";
import { cn } from "@/utils/utils";
import ActiveLink from "./ActiveLink";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";

interface NavLinkItem {
  id: string;
  path: string;
  title: string;
  icon: React.ReactNode;
}

const Navigation = () => {

  const t = useTranslate();
  const { sm } = useResponsiveWidth();


  const navLinks: NavLinkItem[] = [
    {
      id: "header-home",
      path: "/",
      title: t("common.home"),
      icon: <Icon.Home className="w-6 h-auto opacity-70" />,
    },
    {
      id: "header-post",
      path: "/post",
      title: t("common.post"),
      icon: <Icon.Home className="w-6 h-auto opacity-70" />,
    },
    {
      id: "header-profile",
      path: "/profile",
      title: t("common.profile"),
      icon: <Icon.User2 className="w-6 h-auto opacity-70" />,
    }]

  return (
    <header
      className={cn(
        "py-4 z-30 hide-scrollbar sticky w-full font-bold text-lg ",
      )}
    >
      <div className={cn("flex justify-start items-start ", sm ? "space-x-4" : "space-y-2 flex-col")}>
        {navLinks.map((navLink) => (
          <ActiveLink
            className={cn(
              "flex flex-row items-center text-foreground")}
            activeClassName="text-black"
            key={navLink.id}
            href={navLink.path}
          >
            {navLink.title}
          </ActiveLink>
        ))}
      </div>
    </header >
  );
};

export default Navigation;
